const express = require('express');
const { db } = require('../db');
const { requireAdmin } = require('./auth');

const router = express.Router();

// Public: list of non-admin staff, for the login name-picker.
router.get('/', (req, res) => {
  const staff = db.prepare('SELECT id, name FROM staff WHERE is_admin = 0 ORDER BY name').all();
  res.json(staff);
});

// Admin only: add a staff member.
router.post('/', requireAdmin, (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  const trimmed = name.trim();
  const existing = db.prepare('SELECT id FROM staff WHERE name = ?').get(trimmed);
  if (existing) {
    return res.status(409).json({ error: 'A staff member with this name already exists.' });
  }
  const info = db.prepare('INSERT INTO staff (name, is_admin) VALUES (?, 0)').run(trimmed);
  res.status(201).json({ id: info.lastInsertRowid, name: trimmed });
});

// Admin only: remove a staff member.
router.delete('/:id', requireAdmin, (req, res) => {
  const staff = db.prepare('SELECT * FROM staff WHERE id = ?').get(req.params.id);
  if (!staff) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }
  if (staff.is_admin) {
    return res.status(400).json({ error: 'Cannot remove the Administrator account.' });
  }
  db.prepare('DELETE FROM staff WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
