// The fixed set of items on the Daily Laboratory SOP Checklist.
// This list is intentionally hard-coded (not editable through the UI) —
// it matches the checklist exactly as specified.
const CHECKLIST_SECTIONS = [
  {
    section: '1. Disinfection',
    items: [{ key: 'disinfection_completed', label: 'Completed' }],
  },
  {
    section: '2. Waste Disposal',
    items: [
      { key: 'waste_chemistry', label: 'Chemistry Analyzer' },
      { key: 'waste_hematology', label: 'Hematology Analyzer' },
    ],
  },
  {
    section: '3. Charting of Logs',
    items: [
      { key: 'log_disinfection', label: 'Disinfection Log' },
      { key: 'log_fridge_temp', label: 'Fridge Temperature' },
      { key: 'log_room_temp', label: 'Room Temperature' },
      { key: 'log_centrifuge', label: 'Centrifuge' },
      { key: 'log_microscope', label: 'Microscope' },
      { key: 'log_analyzer', label: 'Analyzer' },
    ],
  },
  {
    section: '4.',
    items: [{ key: 'fbc_entered', label: 'FBC entered into Hematology Book' }],
  },
  {
    section: '5.',
    items: [{ key: 'waiting_time_log', label: 'Waiting Time Log completed' }],
  },
  {
    section: '6.',
    items: [
      {
        key: 'outsourced_results',
        label: 'Outsourced laboratory results received and recorded',
      },
    ],
  },
];

function flattenItems() {
  const flat = [];
  for (const section of CHECKLIST_SECTIONS) {
    for (const item of section.items) {
      flat.push({ section: section.section, key: item.key, label: item.label });
    }
  }
  return flat;
}

module.exports = { CHECKLIST_SECTIONS, flattenItems };
