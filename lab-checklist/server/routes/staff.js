const express = require('express');
const { db } = require('../db');
const { requireAdmin } = require('./auth');

const router = express.Router();

// Public: list of active, non-admin staff, for the login name-picker.
router.get('/', (req, res) => {
  const staff = db
    .prepare('SELECT id, name FROM staff WHERE is_admin = 0 AND active = 1 ORDER BY name')
    .all();
  res.json(staff);
});

// Admin only: add a staff member (or reactivate a previously removed one).
router.post('/', requireAdmin, (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  const trimmed = name.trim();
  const existing = db.prepare('SELECT id, active FROM staff WHERE name = ?').get(trimmed);
  if (existing && existing.active) {
    return res.status(409).json({ error: 'A staff member with this name already exists.' });
  }
  if (existing) {
    db.prepare('UPDATE staff SET active = 1 WHERE id = ?').run(existing.id);
    return res.status(200).json({ id: existing.id, name: trimmed });
  }
  const info = db.prepare('INSERT INTO staff (name, is_admin) VALUES (?, 0)').run(trimmed);
  res.status(201).json({ id: info.lastInsertRowid, name: trimmed });
});

// Admin only: remove a staff member. This deactivates the account rather
// than deleting the row, so past checklist records still show who
// completed them even after that person is no longer on staff.
router.delete('/:id', requireAdmin, (req, res) => {
  const staff = db.prepare('SELECT * FROM staff WHERE id = ?').get(req.params.id);
  if (!staff) {
    return res.status(404).json({ error: 'Staff member not found.' });
  }
  if (staff.is_admin) {
    return res.status(400).json({ error: 'Cannot remove the Administrator account.' });
  }
  db.prepare('UPDATE staff SET active = 0 WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
