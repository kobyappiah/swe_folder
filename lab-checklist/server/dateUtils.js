function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

// Formats using the server's local time/timezone (server time is the
// agreed source of truth for the 5 PM deadline).
function toDateStr(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function todayStr() {
  return toDateStr(new Date());
}

function isWeekday(d) {
  const day = d.getDay();
  return day >= 1 && day <= 5;
}

// True once the 5:00 PM Mon-Fri deadline has passed for the given moment.
function isPastDeadline(d = new Date()) {
  if (!isWeekday(d)) return false;
  const minutesSinceMidnight = d.getHours() * 60 + d.getMinutes();
  return minutesSinceMidnight > 17 * 60;
}

module.exports = { toDateStr, todayStr, isWeekday, isPastDeadline };
