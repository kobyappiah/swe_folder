const path = require('path');
const express = require('express');
require('./db'); // ensures schema is created on startup

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Lab checklist app running at http://localhost:${PORT}`);
});
