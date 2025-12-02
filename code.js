document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('logoInput');
  const img = document.getElementById('logoImg');
  const STORAGE_KEY = 'customLogoDataURL';

  // load saved logo (if any)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && img) img.src = saved;

  input && input.addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (img) img.src = reader.result;
      try { localStorage.setItem(STORAGE_KEY, reader.result); } catch (err) { /* ignore storage errors */ }
    };
    reader.readAsDataURL(file);
  });

  window.resetLogo = function(){
    localStorage.removeItem(STORAGE_KEY);
    if (img) img.src = 'dolp.jpg';
  };

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      alert('Thank you for signing in! We are now tracking your location :) ');
      try {
        const res = await fetch('main.html', { method: 'HEAD' });
        if (res.ok) { window.location.href = 'main.html'; return; }
      } catch (err) { /* ignore */ }
      window.location.href = 'main_site.html';
    });
  }
});