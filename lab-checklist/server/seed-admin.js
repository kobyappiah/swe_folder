// One-time setup script to create the Administrator account.
// Usage: node server/seed-admin.js "Admin Name" "password"
const bcrypt = require('bcryptjs');
const { db } = require('./db');

const [, , name, password] = process.argv;

if (!name || !password) {
  console.error('Usage: node server/seed-admin.js "Admin Name" "password"');
  process.exit(1);
}

const passwordHash = bcrypt.hashSync(password, 10);

const existing = db.prepare('SELECT id FROM staff WHERE name = ?').get(name);
if (existing) {
  db.prepare('UPDATE staff SET is_admin = 1, password_hash = ? WHERE id = ?').run(
    passwordHash,
    existing.id
  );
  console.log(`Updated existing account "${name}" to Administrator.`);
} else {
  db.prepare(
    'INSERT INTO staff (name, is_admin, password_hash) VALUES (?, 1, ?)'
  ).run(name, passwordHash);
  console.log(`Administrator account "${name}" created.`);
}
