CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT OR IGNORE INTO users (name, email)
VALUES ('Usuario de ejemplo', 'ejemplo@iteso.mx');
