const bcrypt = require('bcryptjs');
const { db } = require('./db');

// Creates the Administrator account if it doesn't exist, or updates its
// password if it does. Shared by the local seed script and the optional
// env-var based auto-seed used on hosted deployments.
function upsertAdmin(name, password) {
  const passwordHash = bcrypt.hashSync(password, 10);
  const existing = db.prepare('SELECT id FROM staff WHERE name = ?').get(name);
  if (existing) {
    db.prepare('UPDATE staff SET is_admin = 1, password_hash = ? WHERE id = ?').run(
      passwordHash,
      existing.id
    );
  } else {
    db.prepare('INSERT INTO staff (name, is_admin, password_hash) VALUES (?, 1, ?)').run(
      name,
      passwordHash
    );
  }
}

module.exports = { upsertAdmin };
