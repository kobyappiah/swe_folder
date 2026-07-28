// One-time setup script to create the Administrator account.
// Usage: node server/seed-admin.js "Admin Name" "password"
const { upsertAdmin } = require('./adminSetup');

const [, , name, password] = process.argv;

if (!name || !password) {
  console.error('Usage: node server/seed-admin.js "Admin Name" "password"');
  process.exit(1);
}

upsertAdmin(name, password);
console.log(`Administrator account "${name}" is ready.`);
