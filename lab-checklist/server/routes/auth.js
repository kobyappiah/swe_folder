const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { db } = require('../db');

const router = express.Router();

// Simple in-memory admin session store: token -> staff id.
// Fine for a single-instance internal tool; sessions reset on server restart.
const sessions = new Map();

router.post('/login', (req, res) => {
  const { name, password } = req.body || {};
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required.' });
  }

  const admin = db.prepare('SELECT * FROM staff WHERE name = ? AND is_admin = 1').get(name);
  if (!admin || !admin.password_hash || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Invalid name or password.' });
  }

  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, admin.id);
  res.json({ token, name: admin.name });
});

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  const staffId = token && sessions.get(token);
  if (!staffId) {
    return res.status(401).json({ error: 'Admin login required.' });
  }
  req.adminStaffId = staffId;
  next();
}

module.exports = { router, requireAdmin };
