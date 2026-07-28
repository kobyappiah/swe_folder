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

// Returns the last `count` weekday dates (as YYYY-MM-DD strings, newest
// first), including today if today is a weekday.
function generateRecentWeekdays(count, referenceDate = new Date()) {
  const dates = [];
  const cursor = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  while (dates.length < count) {
    if (isWeekday(cursor)) dates.push(toDateStr(cursor));
    cursor.setDate(cursor.getDate() - 1);
  }
  return dates;
}

module.exports = { toDateStr, todayStr, isWeekday, isPastDeadline, generateRecentWeekdays };
