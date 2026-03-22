
  // Loader
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hide');
    }, 1800);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // Counter animation
  function animateCounter(el, target) {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + (el.dataset.target == '95' ? '%' : '+');
    }, 20);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-target]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target));
        });
        statsObserver.disconnect();
      }
    });
  });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // Scroll top button
  window.addEventListener('scroll', () => {
    const st = document.getElementById('scrollTop');
    if (window.scrollY > 400) st.classList.add('show');
    else st.classList.remove('show');
  });

  // Form submit
  function handleSubmit(btn) {
    btn.textContent = '✅ Demo Booked! We\'ll call you soon!';
    btn.style.background = 'linear-gradient(135deg, #00C853, #00A040)';
    btn.style.color = 'white';
    // sparkle effect
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.textContent = ['⭐','🏆','✨','🎯','🌟'][Math.floor(Math.random()*5)];
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;position:absolute;font-size:1.5rem;z-index:999;animation-delay:${Math.random()*0.5}s`;
      btn.parentElement.style.position = 'relative';
      btn.parentElement.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }
  }

  // Smooth nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });