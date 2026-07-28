const path = require('path');
const Database = require('better-sqlite3');
const { flattenItems } = require('./checklistItems');

const db = new Database(path.join(__dirname, '..', 'data.sqlite'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    is_admin INTEGER NOT NULL DEFAULT 0,
    password_hash TEXT
  );

  CREATE TABLE IF NOT EXISTS checklist_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'in_progress',
    completed_by_staff_id INTEGER REFERENCES staff(id),
    completed_at TEXT,
    is_late INTEGER,
    late_reason TEXT
  );

  CREATE TABLE IF NOT EXISTS checklist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    checklist_day_id INTEGER NOT NULL REFERENCES checklist_days(id),
    item_key TEXT NOT NULL,
    section TEXT NOT NULL,
    label TEXT NOT NULL,
    completed_at TEXT,
    UNIQUE(checklist_day_id, item_key)
  );
`);

// Returns the checklist_days row for the given date (YYYY-MM-DD),
// creating it (and seeding its items) on first access.
function getOrCreateDay(dateStr) {
  let day = db.prepare('SELECT * FROM checklist_days WHERE date = ?').get(dateStr);
  if (!day) {
    const insert = db.prepare(
      'INSERT INTO checklist_days (date, status) VALUES (?, ?)'
    );
    const info = insert.run(dateStr, 'in_progress');
    const itemInsert = db.prepare(
      'INSERT INTO checklist_items (checklist_day_id, item_key, section, label) VALUES (?, ?, ?, ?)'
    );
    for (const item of flattenItems()) {
      itemInsert.run(info.lastInsertRowid, item.key, item.section, item.label);
    }
    day = db.prepare('SELECT * FROM checklist_days WHERE id = ?').get(info.lastInsertRowid);
  }
  return day;
}

module.exports = { db, getOrCreateDay };
