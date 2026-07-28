const path = require('path');
const express = require('express');
require('./db'); // ensures schema is created on startup

const { upsertAdmin } = require('./adminSetup');
const { router: authRouter } = require('./routes/auth');
const staffRouter = require('./routes/staff');
const checklistRouter = require('./routes/checklist');

// Optional: on hosted deployments where running the seed script by hand
// isn't convenient, set ADMIN_NAME + ADMIN_PASSWORD env vars to have the
// Administrator account created automatically on startup.
if (process.env.ADMIN_NAME && process.env.ADMIN_PASSWORD) {
  upsertAdmin(process.env.ADMIN_NAME, process.env.ADMIN_PASSWORD);
}

const app = express();
app.use(express.json());

app.use('/api/admin', authRouter);
app.use('/api/staff', staffRouter);
app.use('/api/checklist', checklistRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Lab checklist app running at http://localhost:${PORT}`);
});
