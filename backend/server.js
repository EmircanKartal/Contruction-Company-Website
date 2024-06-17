const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 8080;
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key', // Use a real secret in production
  resave: false,
  saveUninitialized: false, // This should be false to avoid storing too much session data on the server
  cookie: { secure: false } // Set to true if your production environment uses HTTPS
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Veritabanı bağlantısını oluşturma
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('SQLite veritabanına bağlandı.');
  }
});

// Enable Write-Ahead Logging mode
db.run("PRAGMA journal_mode=WAL;");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Configure Multer middleware
const upload = multer({
  storage,
  limits: {
    fieldSize: 25 * 1024 * 1024, // 25 MB
    files: 75, // Maximum number of files
  },
});

// Login endpoint
const jwtSecret = 'yuzyapi'; // This should be a secure, environment-specific secret

// Login endpoint modification
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM Login WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '40m' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


// Modify /api/verifySession to check token validity
app.get('/api/verifySession', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expected "Bearer [token]"
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.status(200).json({ message: "Session is active", user: decoded });
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

// Get admin credentials endpoint
app.get('/api/admin', (req, res) => {
  const query = `SELECT * FROM Login WHERE username = 'admin'`;

  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(row);
  });
});

// Update admin credentials endpoint
app.put('/api/admin', (req, res) => {
  const { username, password } = req.body;

  const query = `UPDATE Login SET username = ?, password = ? WHERE username = 'admin'`;
  db.run(query, [username, password], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Admin credentials updated successfully' });
  });
});

// Projects tablosu için endpointler
app.post('/api/projects', upload.array('photos', 10), (req, res) => {
  const { title, date, location, catalog, description, type, firm, coverPhotoId } = req.body;
  const photos = req.files;

  db.run(`INSERT INTO Projects (title, date, location, catalog, description, type, firm) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
  [title, date, location, catalog, description, type, firm], function (err) {
      if (err) {
          return res.status(400).json({ error: err.message });
      }
      const projectId = this.lastID;

      // Insert images into Images table
      photos.forEach((photo, index) => {
          const customPhotoId = req.body.customPhotoIds[index]; // This assumes customPhotoIds are sent as an array
          const isCover = parseInt(customPhotoId) === parseInt(coverPhotoId);
          fs.readFile(photo.path, (err, data) => {
              if (err) {
                  return res.status(500).json({ error: err.message });
              }
              db.run(`INSERT INTO Images (project_id, image, isCoverPhoto) VALUES (?, ?, ?)`, [projectId, data, isCover], function (err) {
                if (err) {
                      return res.status(400).json({ error: err.message });
                  }
              });
          });
      });

      res.json({ message: 'Proje ve resimler başarıyla oluşturuldu', id: projectId });
  });
});


const bufferToBase64 = (buffer) => {
return buffer.toString('base64');
};

// Endpoint to set an image as cover photo
app.put('/api/set-cover/:photoId', (req, res) => {
  const { photoId } = req.params;

  // Get the project_id of the specified photo
  db.get('SELECT project_id FROM Images WHERE id = ?', [photoId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const projectId = row.project_id;

    // Set isCoverPhoto to 0 for all images in the project
    db.run('UPDATE Images SET isCoverPhoto = 0 WHERE project_id = ?', [projectId], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Set isCoverPhoto to 1 for the specified image
      db.run('UPDATE Images SET isCoverPhoto = 1 WHERE id = ?', [photoId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cover photo updated successfully!' });
      });
    });
  });
});



app.get('/api/projects', (req, res) => {
  const query = `
    SELECT p.id, p.title, p.date, p.location, p.catalog, p.description, p.type, p.firm, i.image, i.isCoverPhoto
    FROM Projects p
    LEFT JOIN Images i ON p.id = i.project_id
    ORDER BY p.id DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Group images by project id
    const projects = {};
    rows.forEach(row => {
      const { id, image, isCoverPhoto, ...project } = row;
      if (!projects[id]) {
        projects[id] = { id, ...project, images: [], isCoverPhoto: [] };
      }
      if (image) {
        projects[id].images.push(bufferToBase64(image));
        projects[id].isCoverPhoto.push(isCoverPhoto);
      }
    });

    res.json(Object.values(projects));
  });
});


// Fetch specific project details including images
app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT p.*, i.image
    FROM Projects p
    LEFT JOIN Images i ON p.id = i.project_id
    WHERE p.id = ?
  `;
  
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (rows.length === 0) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const project = {
      ...rows[0],
      images: rows.map(row => row.image ? bufferToBase64(row.image) : null).filter(img => img != null)
    };

    res.json(project);
  });
});


app.put('/api/projects/:id', upload.array('photos', 40), (req, res) => {
  const { title, date, location, catalog, description, type, firm } = req.body;
  const id = req.params.id;
  const photos = req.files;

  db.run(`UPDATE Projects SET title = ?, date = ?, location = ?, catalog = ?, description = ?, type = ?, firm = ? WHERE id = ?`, 
  [title, date, location, catalog, description, type, firm, id], function (err) {
      if (err) {
          return res.status(400).json({ error: err.message });
      }

      if (photos && photos.length > 0) {
          // Delete existing images for the project
          db.run(`DELETE FROM Images WHERE project_id = ?`, [id], function (err) {
              if (err) {
                  return res.status(400).json({ error: err.message });
              }

              // Insert new images into Images table
              photos.forEach(photo => {
                  const imagePath = `/uploads/${photo.filename}`;
                  fs.readFile(photo.path, (err, data) => {
                      if (err) {
                          return res.status(500).json({ error: err.message });
                      }
                      db.run(`INSERT INTO Images (project_id, image) VALUES (?, ?)`, [id, data], function (err) {
                          if (err) {
                              return res.status(400).json({ error: err.message });
                          }
                      });
                  });
              });
          });
      }

      res.json({ message: 'Proje ve resimler başarıyla güncellendi' });
  });
});


app.delete('/api/projects/:id', (req, res) => {
    const id = req.params.id;

    // Delete images associated with the project
    db.run(`DELETE FROM Images WHERE project_id = ?`, [id], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Delete the project itself
        db.run(`DELETE FROM Projects WHERE id = ?`, [id], function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: 'Proje ve ilgili resimler başarıyla silindi' });
        });
    });
});

// Endpoint for submitting a new entry to the Inbox table
app.post('/api/inbox', (req, res) => {
  const { Name, Surname, Email, Phone, Message, EmailSubject, Time } = req.body;


  console.log("Received data:", req.body);

  const query = `INSERT INTO Inbox (Name, Surname, Email, Phone, Message, EmailSubject, Time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [Name, Surname, Email, Phone, Message, EmailSubject, Time], function (err) {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(400).json({ error: err.message });
    }
    console.log("Entry successfully added to Inbox, ID:", this.lastID);
    res.json({ message: 'Entry successfully added to Inbox', id: this.lastID });
  });
});

// Endpoint to fetch all entries from the Inbox table
app.get('/api/inbox', (req, res) => {
  const query = `SELECT * FROM Inbox`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

// Endpoint to delete a specific entry by ID from the Inbox table
app.delete('/api/inbox/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM Inbox WHERE ID = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message successfully deleted' });
  });
});

// Endpoint to delete multiple entries by their IDs from the Inbox table
app.post('/api/inbox/delete-multiple', (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Invalid request: no IDs provided' });
  }

  const placeholders = ids.map(() => '?').join(',');
  const query = `DELETE FROM Inbox WHERE ID IN (${placeholders})`;

  db.run(query, ids, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Messages successfully deleted' });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
