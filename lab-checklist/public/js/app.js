const loginView = document.getElementById('login-view');
const checklistView = document.getElementById('checklist-view');
const staffSelect = document.getElementById('staff-select');
const loginBtn = document.getElementById('login-btn');
const loginEmptyMessage = document.getElementById('login-empty-message');
const todayDateEl = document.getElementById('today-date');
const currentUserNameEl = document.getElementById('current-user-name');
const switchUserBtn = document.getElementById('switch-user-btn');
const statusBadge = document.getElementById('status-badge');
const progressText = document.getElementById('progress-text');
const completionSummary = document.getElementById('completion-summary');
const sectionsContainer = document.getElementById('sections-container');

const lateReasonOverlay = document.getElementById('late-reason-overlay');
const lateReasonText = document.getElementById('late-reason-text');
const lateReasonCancel = document.getElementById('late-reason-cancel');
const lateReasonSubmit = document.getElementById('late-reason-submit');

let currentStaff = null;
let pendingItemKey = null;

function getStoredStaff() {
  const raw = sessionStorage.getItem('staff');
  return raw ? JSON.parse(raw) : null;
}

function setStoredStaff(staff) {
  if (staff) {
    sessionStorage.setItem('staff', JSON.stringify(staff));
  } else {
    sessionStorage.removeItem('staff');
  }
}

async function loadStaffList() {
  let staff;
  try {
    const res = await fetch('/api/staff');
    staff = await res.json();
  } catch (err) {
    loginEmptyMessage.textContent = 'Could not reach the server. Please check your connection and reload.';
    loginEmptyMessage.hidden = false;
    staffSelect.hidden = true;
    return;
  }
  staffSelect.innerHTML = '<option value="">-- Select your name --</option>';
  staff.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    staffSelect.appendChild(opt);
  });
  loginEmptyMessage.textContent = 'No staff accounts have been set up yet. Please contact the Administrator.';
  loginEmptyMessage.hidden = staff.length > 0;
  staffSelect.hidden = staff.length === 0;
}

staffSelect.addEventListener('change', () => {
  loginBtn.disabled = !staffSelect.value;
});

loginBtn.addEventListener('click', () => {
  const option = staffSelect.options[staffSelect.selectedIndex];
  currentStaff = { id: Number(staffSelect.value), name: option.textContent };
  setStoredStaff(currentStaff);
  showChecklistView();
});

switchUserBtn.addEventListener('click', () => {
  currentStaff = null;
  setStoredStaff(null);
  showLoginView();
});

function closeLateReasonModal() {
  lateReasonOverlay.hidden = true;
  lateReasonText.value = '';
  pendingItemKey = null;
}

function showLoginView() {
  closeLateReasonModal();
  loginView.hidden = false;
  checklistView.hidden = true;
  loginBtn.disabled = true;
  loadStaffList();
}

function showChecklistView() {
  loginView.hidden = true;
  checklistView.hidden = false;
  currentUserNameEl.textContent = currentStaff.name;
  todayDateEl.textContent = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  loadToday();
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

async function loadToday() {
  try {
    const res = await fetch('/api/checklist/today');
    const data = await res.json();
    render(data);
  } catch (err) {
    alert('Could not reach the server. Please check your connection and reload.');
  }
}

function render(data) {
  statusBadge.textContent = data.status === 'completed' ? 'Completed' : 'In Progress';
  statusBadge.className = 'badge ' + (data.status === 'completed' ? 'completed' : 'in-progress');
  progressText.textContent = `${data.completedCount} of ${data.totalItems} completed`;

  if (data.status === 'completed') {
    completionSummary.hidden = false;
    completionSummary.className = 'completion-summary' + (data.isLate ? ' late' : '');
    let text = `Completed by ${data.completedBy} at ${formatTime(data.completedAt)}.`;
    if (data.isLate) {
      text += ` Completed after 5:00 PM. Reason: ${data.lateReason}`;
    }
    completionSummary.textContent = text;
  } else {
    completionSummary.hidden = true;
  }

  sectionsContainer.innerHTML = '';
  const sections = new Map();
  data.items.forEach((item) => {
    if (!sections.has(item.section)) sections.set(item.section, []);
    sections.get(item.section).push(item);
  });

  sections.forEach((items, sectionName) => {
    const block = document.createElement('div');
    block.className = 'section-block';

    const title = document.createElement('div');
    title.className = 'section-title';
    title.textContent = sectionName;
    block.appendChild(title);

    items.forEach((item) => {
      const row = document.createElement('label');
      row.className = 'item-row' + (item.completed_at ? ' checked' : '');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !!item.completed_at;
      checkbox.disabled = data.status === 'completed';
      checkbox.addEventListener('change', () => toggleItem(item.item_key, checkbox));

      const label = document.createElement('span');
      label.className = 'item-label';
      label.textContent = item.label;

      row.appendChild(checkbox);
      row.appendChild(label);

      if (item.completed_at) {
        const time = document.createElement('span');
        time.className = 'item-time';
        time.textContent = `✓ ${formatTime(item.completed_at)}`;
        row.appendChild(time);
      }

      block.appendChild(row);
    });

    sectionsContainer.appendChild(block);
  });
}

async function toggleItem(itemKey, checkboxEl, lateReason) {
  if (!currentStaff) {
    showLoginView();
    alert('Your session was reset. Please select your name again.');
    return;
  }

  const body = { staffId: currentStaff.id };
  if (lateReason) body.lateReason = lateReason;

  let res;
  let data;
  try {
    res = await fetch(`/api/checklist/today/items/${itemKey}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    data = await res.json();
  } catch (err) {
    if (checkboxEl) checkboxEl.checked = !checkboxEl.checked;
    alert('Could not reach the server. Please check your connection and try again.');
    return;
  }

  if (res.status === 422 && data.requiresLateReason) {
    if (checkboxEl) checkboxEl.checked = false;
    pendingItemKey = itemKey;
    lateReasonText.value = '';
    lateReasonOverlay.hidden = false;
    return;
  }

  if (!res.ok) {
    if (checkboxEl) checkboxEl.checked = !checkboxEl.checked;
    alert(data.error || 'Something went wrong.');
    return;
  }

  render(data);
}

lateReasonCancel.addEventListener('click', () => {
  closeLateReasonModal();
});

lateReasonSubmit.addEventListener('click', async () => {
  const reason = lateReasonText.value.trim();
  if (!reason) {
    alert('Please enter a reason.');
    return;
  }
  const itemKey = pendingItemKey;
  closeLateReasonModal();
  await toggleItem(itemKey, null, reason);
});

// Init
currentStaff = getStoredStaff();
if (currentStaff) {
  showChecklistView();
} else {
  showLoginView();
}
