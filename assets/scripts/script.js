document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');
  const main = document.getElementById('main');
  const tabBtns = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // nav gets solid background when scrolled past hero
  const navObserver = new IntersectionObserver(([entry]) => {
    nav.classList.toggle('scrolled', !entry.isIntersecting);
  }, { threshold: 0.1 });

  navObserver.observe(hero);

  // tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tab}`).classList.add('active');

      // scroll to main content if hero is still in view
      const mainRect = main.getBoundingClientRect();
      if (mainRect.top > 100) {
        main.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // form handling
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form && submitBtn) {
    form.addEventListener('submit', () => {
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      const btnArrow = submitBtn.querySelector('.btn-arrow');

      if (btnText && btnLoading) {
        btnText.style.display = 'none';
        if (btnArrow) btnArrow.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
      }
    });
  }
});
