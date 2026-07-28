const express = require('express');
const { db, getOrCreateDay } = require('../db');
const { todayStr, isPastDeadline } = require('../dateUtils');

const router = express.Router();

function dayWithItems(day) {
  const items = db
    .prepare(
      'SELECT item_key, section, label, completed_at FROM checklist_items WHERE checklist_day_id = ? ORDER BY id'
    )
    .all(day.id);
  const completedCount = items.filter((i) => i.completed_at).length;

  let completedByName = null;
  if (day.completed_by_staff_id) {
    const staff = db.prepare('SELECT name FROM staff WHERE id = ?').get(day.completed_by_staff_id);
    completedByName = staff ? staff.name : null;
  }

  return {
    date: day.date,
    status: day.status,
    completedBy: completedByName,
    completedAt: day.completed_at,
    isLate: !!day.is_late,
    lateReason: day.late_reason,
    totalItems: items.length,
    completedCount,
    items,
  };
}

router.get('/today', (req, res) => {
  const day = getOrCreateDay(todayStr());
  res.json(dayWithItems(day));
});

router.patch('/today/items/:itemKey', (req, res) => {
  const { staffId, lateReason } = req.body || {};
  if (!staffId) {
    return res.status(400).json({ error: 'staffId is required.' });
  }
  const staff = db.prepare('SELECT * FROM staff WHERE id = ?').get(staffId);
  if (!staff) {
    return res.status(400).json({ error: 'Unknown staff member.' });
  }

  const day = getOrCreateDay(todayStr());
  if (day.status === 'completed') {
    return res.status(409).json({ error: "Today's checklist is already completed and locked." });
  }

  const item = db
    .prepare('SELECT * FROM checklist_items WHERE checklist_day_id = ? AND item_key = ?')
    .get(day.id, req.params.itemKey);
  if (!item) {
    return res.status(404).json({ error: 'Checklist item not found.' });
  }

  if (item.completed_at) {
    // Untick — allowed only while the day is still in progress (checked above).
    db.prepare('UPDATE checklist_items SET completed_at = NULL WHERE id = ?').run(item.id);
    return res.json(dayWithItems(getOrCreateDay(todayStr())));
  }

  const now = new Date();
  const nowIso = now.toISOString();

  const remaining = db
    .prepare(
      'SELECT COUNT(*) AS c FROM checklist_items WHERE checklist_day_id = ? AND completed_at IS NULL AND id != ?'
    )
    .get(day.id, item.id).c;
  const isLastItem = remaining === 0;

  if (isLastItem && isPastDeadline(now) && !lateReason) {
    return res.status(422).json({
      requiresLateReason: true,
      error: "Reason required: today's checklist was not completed before 5:00 PM.",
    });
  }

  db.prepare('UPDATE checklist_items SET completed_at = ? WHERE id = ?').run(nowIso, item.id);

  if (isLastItem) {
    const late = isPastDeadline(now);
    db.prepare(
      'UPDATE checklist_days SET status = ?, completed_by_staff_id = ?, completed_at = ?, is_late = ?, late_reason = ? WHERE id = ?'
    ).run('completed', staffId, nowIso, late ? 1 : 0, late ? lateReason : null, day.id);
  }

  res.json(dayWithItems(getOrCreateDay(todayStr())));
});

module.exports = router;
