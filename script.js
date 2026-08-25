/**
 * ADITYA SINGLA - CLIENT PORTFOLIO INTERACTIVE ENGINE
 * Features: Dynamic Canvas Node Mesh, Filterable Skills, 
 * Copy-to-Clipboard Toasts, Navigation Controller & Inquiry Form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvasNetwork();
  initSkillTabs();
  initScrollSpy();
  initMobileNav();
  initContactForm();
});

/* ==========================================================================
   1. CANVAS DATA MESH BACKGROUND
   ========================================================================== */
function initCanvasNetwork() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 16000), 75);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(0, 245, 160, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 135) {
          const alpha = (1 - dist / 135) * 0.2;
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '0.7)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. SKILLS TABS FILTER
   ========================================================================== */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillBoxes = document.querySelectorAll('.skill-box[data-category]');

  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillBoxes.forEach((box) => {
        if (filter === 'all' || box.getAttribute('data-category') === filter) {
          box.style.display = 'block';
          box.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
window.copyToClipboard = function (text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
};

function showToast(message) {
  let container = document.querySelector('.toast-area');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-area';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>✔</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   4. SCROLL SPY & MOBILE NAV
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 140;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* ==========================================================================
   5. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value || 'Consulting / Role Inquiry';
    const message = document.getElementById('form-message').value;

    const mailtoUrl = `mailto:adityasingla505@gmail.com?subject=${encodeURIComponent(
      `[Consulting Inquiry] ${subject} - ${name}`
    )}&body=${encodeURIComponent(`Client / Name: ${name}\nEmail: ${email}\n\nProject Scope & Message:\n${message}`)}`;

    window.location.href = mailtoUrl;
    showToast('Opening your email client to send inquiry...');
  });
}
