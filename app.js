document.addEventListener('DOMContentLoaded', () => {
  const navItems = Array.from(document.querySelectorAll('.nav-item'));
  const views = Array.from(document.querySelectorAll('.view'));

  function activateView(id) {
    views.forEach(v => v.classList.toggle('active', v.id === id));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.target === id));
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => activateView(item.dataset.target));
  });

  // Modal logic for Assign on Post-Call Summaries
  const overlay = document.getElementById('modal-overlay');
  const btnCancel = document.getElementById('btn-cancel-modal');
  const btnConfirm = document.getElementById('btn-confirm-assign');

  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList && target.classList.contains('btn-assign')) {
      overlay.classList.remove('hidden');
      overlay.dataset.summaryId = target.getAttribute('data-summary-id') || '';
    }
  });

  btnCancel.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.add('hidden');
    }
  });

  btnConfirm.addEventListener('click', () => {
    const assignee = document.getElementById('assignee-select').value;
    const priority = document.getElementById('priority-select').value;
    console.log('Assigned summary', overlay.dataset.summaryId, 'to', assignee, 'with priority', priority);
    overlay.classList.add('hidden');
  });

  // Quick create & Create buttons (non-blocking demos)
  document.getElementById('btn-quick-add').addEventListener('click', () => activateView('post-call-summaries'));
  document.getElementById('btn-create').addEventListener('click', () => activateView('integrations'));
});
