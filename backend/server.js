const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Veritabanı bağlantısını oluşturma
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('SQLite veritabanına bağlandı.');
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

const upload = multer({
  storage,
  limits: {
    fieldSize: 25 * 1024 * 1024, // 25 MB
    files: 75, // Maximum number of files
  },
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM Login WHERE username = ? AND password = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      // User found
      res.json({ message: 'Login successful' });
    } else {
      // User not found
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
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
    const { title, date, location, catalog, description, type, firm } = req.body;
    const photos = req.files;

    db.run(`INSERT INTO Projects (title, date, location, catalog, description, type, firm) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
    [title, date, location, catalog, description, type, firm], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const projectId = this.lastID;

        // Insert images into Images table
        photos.forEach(photo => {
            const imagePath = `/uploads/${photo.filename}`;
            fs.readFile(photo.path, (err, data) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                db.run(`INSERT INTO Images (project_id, image) VALUES (?, ?)`, [projectId, data], function (err) {
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

app.get('/api/projects', (req, res) => {
  const query = `
    SELECT p.id, p.title, p.date, p.location, p.catalog, p.description, p.type, p.firm, i.image
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
      const { id, image, ...project } = row;
      if (!projects[id]) {
        projects[id] = { id, ...project, images: [] };
      }
      if (image) {
        projects[id].images.push(bufferToBase64(image));
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
