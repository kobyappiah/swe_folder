const TOKEN_KEY = 'adminToken';
const NAME_KEY = 'adminName';

const loginView = document.getElementById('admin-login-view');
const dashboardView = document.getElementById('admin-dashboard-view');
const nameInput = document.getElementById('admin-name');
const passwordInput = document.getElementById('admin-password');
const loginError = document.getElementById('admin-login-error');
const loginBtn = document.getElementById('admin-login-btn');
const logoutBtn = document.getElementById('admin-logout-btn');
const nameLabel = document.getElementById('admin-name-label');

const todayStatus = document.getElementById('admin-today-status');
const todayProgress = document.getElementById('admin-today-progress');
const todayItems = document.getElementById('admin-today-items');

const staffList = document.getElementById('staff-list');
const newStaffName = document.getElementById('new-staff-name');
const addStaffBtn = document.getElementById('add-staff-btn');

const historyTableBody = document.querySelector('#history-table tbody');

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setSession(token, name) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(NAME_KEY, name);
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}

function showLoginView(message) {
  loginView.hidden = false;
  dashboardView.hidden = true;
  if (message) {
    loginError.textContent = message;
    loginError.hidden = false;
  } else {
    loginError.hidden = true;
  }
}

function showDashboardView() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  nameLabel.textContent = `Logged in as ${localStorage.getItem(NAME_KEY)}`;
  loadTodayChecklist();
  loadStaff();
  loadHistory();
}

// Wraps fetch with the admin token header; on 401 (expired/invalid
// session) it logs out and bounces back to the login screen.
async function adminFetch(url, options = {}) {
  const headers = Object.assign({}, options.headers, { 'x-admin-token': getToken() });
  const res = await fetch(url, Object.assign({}, options, { headers }));
  if (res.status === 401) {
    clearSession();
    showLoginView('Your session expired (often because the server restarted). Please log in again.');
    throw new Error('Session expired. Please log in again.');
  }
  return res;
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

loginBtn.addEventListener('click', async () => {
  const name = nameInput.value.trim();
  const password = passwordInput.value;
  loginError.hidden = true;
  if (!name || !password) return;

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      loginError.textContent = data.error || 'Login failed.';
      loginError.hidden = false;
      return;
    }
    passwordInput.value = '';
    setSession(data.token, data.name);
    showDashboardView();
  } catch (err) {
    loginError.textContent = 'Could not reach the server. Please check your connection.';
    loginError.hidden = false;
  }
});

logoutBtn.addEventListener('click', () => {
  clearSession();
  showLoginView();
});

async function loadTodayChecklist() {
  try {
    const res = await fetch('/api/checklist/today');
    const data = await res.json();
    todayStatus.textContent = data.status === 'completed' ? 'Completed' : 'In Progress';
    todayStatus.className = 'badge ' + (data.status === 'completed' ? 'completed' : 'in-progress');
    todayProgress.textContent = `${data.completedCount} of ${data.totalItems} completed`;

    todayItems.innerHTML = '';
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
        const row = document.createElement('div');
        row.className = 'item-row' + (item.completed_at ? ' checked' : '');

        const mark = document.createElement('span');
        mark.textContent = item.completed_at ? '✓' : '—';

        const label = document.createElement('span');
        label.className = 'item-label';
        label.textContent = item.label;

        row.appendChild(mark);
        row.appendChild(label);

        if (item.completed_at) {
          const time = document.createElement('span');
          time.className = 'item-time';
          time.textContent = formatTime(item.completed_at);
          row.appendChild(time);
        }

        block.appendChild(row);
      });

      todayItems.appendChild(block);
    });
  } catch (err) {
    todayItems.innerHTML = '<p class="hint">Could not load today\'s checklist.</p>';
  }
}

async function loadStaff() {
  try {
    const res = await fetch('/api/staff');
    const staff = await res.json();
    staffList.innerHTML = '';
    if (staff.length === 0) {
      staffList.innerHTML = '<p class="hint">No staff members added yet.</p>';
      return;
    }
    staff.forEach((s) => {
      const row = document.createElement('div');
      row.className = 'item-row';

      const label = document.createElement('span');
      label.className = 'item-label';
      label.textContent = s.name;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-secondary btn-small';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => removeStaff(s.id, s.name));

      row.appendChild(label);
      row.appendChild(removeBtn);
      staffList.appendChild(row);
    });
  } catch (err) {
    staffList.innerHTML = '<p class="hint">Could not load staff list.</p>';
  }
}

addStaffBtn.addEventListener('click', async () => {
  const name = newStaffName.value.trim();
  if (!name) return;
  try {
    const res = await adminFetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Could not add staff member.');
      return;
    }
    newStaffName.value = '';
    loadStaff();
  } catch (err) {
    alert(err.message || 'Could not reach the server.');
  }
});

async function removeStaff(id, name) {
  if (!confirm(`Remove ${name} from staff?`)) return;
  try {
    const res = await adminFetch(`/api/staff/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) {
      const data = await res.json();
      alert(data.error || 'Could not remove staff member.');
      return;
    }
    loadStaff();
  } catch (err) {
    alert(err.message || 'Could not reach the server.');
  }
}

function statusLabel(status) {
  if (status === 'completed') return 'Completed';
  if (status === 'missed') return 'Missed';
  return 'In Progress';
}

async function loadHistory() {
  try {
    const res = await adminFetch('/api/admin/history');
    const rows = await res.json();
    historyTableBody.innerHTML = '';
    rows.forEach((row) => {
      const tr = document.createElement('tr');
      tr.className = 'history-row-' + row.status;
      tr.innerHTML = `
        <td>${row.date}</td>
        <td>${statusLabel(row.status)}</td>
        <td>${row.completedBy || '-'}</td>
        <td>${row.completedAt ? formatTime(row.completedAt) : '-'}</td>
        <td>${row.beforeFivePM === null ? '-' : row.beforeFivePM ? 'Yes' : 'No'}</td>
        <td>${row.lateReason || '-'}</td>
      `;
      historyTableBody.appendChild(tr);
    });
  } catch (err) {
    historyTableBody.innerHTML = '<tr><td colspan="6" class="hint">Could not load history.</td></tr>';
  }
}

// Init
if (getToken()) {
  showDashboardView();
} else {
  showLoginView();
}
