const express = require('express');
const { db } = require('../db');
const { requireAdmin } = require('./auth');
const { todayStr, isPastDeadline, generateRecentWeekdays } = require('../dateUtils');

const router = express.Router();

const HISTORY_WINDOW_DAYS = 30;

// Admin view of previous working days: who completed each checklist, when,
// whether it was before 5 PM, the late reason if any, and which days were
// missed entirely.
router.get('/history', requireAdmin, (req, res) => {
  const dates = generateRecentWeekdays(HISTORY_WINDOW_DAYS);
  const today = todayStr();
  const now = new Date();

  const rows = dates.map((date) => {
    const day = db.prepare('SELECT * FROM checklist_days WHERE date = ?').get(date);

    if (day && day.status === 'completed') {
      const staff = db.prepare('SELECT name FROM staff WHERE id = ?').get(day.completed_by_staff_id);
      return {
        date,
        status: 'completed',
        completedBy: staff ? staff.name : null,
        completedAt: day.completed_at,
        beforeFivePM: !day.is_late,
        lateReason: day.is_late ? day.late_reason : null,
      };
    }

    const deadlinePassed = date < today || (date === today && isPastDeadline(now));
    return {
      date,
      status: deadlinePassed ? 'missed' : 'in_progress',
      completedBy: null,
      completedAt: null,
      beforeFivePM: null,
      lateReason: null,
    };
  });

  res.json(rows);
});

module.exports = router;
