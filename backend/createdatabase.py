import sqlite3

# Veritabanı bağlantısını oluşturma
conn = sqlite3.connect('database.db')
c = conn.cursor()

# Login tablosunu oluşturma
c.execute('''
CREATE TABLE IF NOT EXISTS Login (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
)
''')

# Projects tablosunu oluşturma
c.execute('''
CREATE TABLE IF NOT EXISTS Projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT,
    date DATE,
    location TEXT,
    catalog TEXT,
    description TEXT,
    type TEXT,
    firm TEXT
)
''')

# Değişiklikleri kaydetme ve bağlantıyı kapatma
conn.commit()
conn.close()

print("Veritabanı ve tablolar başarıyla oluşturuldu.")
