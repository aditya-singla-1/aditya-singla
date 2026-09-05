/**
 * ADITYA SINGLA — MINIMALIST PORTFOLIO SCRIPT
 * Taste-Skill / Anti-Slop principles: clean, lightweight, purpose-driven interactions.
 */

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });
}

// Copy to Clipboard Helper with Minimalist Toast
function copyToClipboard(text, label = 'Content') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard`);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function showToast(message) {
  const existing = document.querySelector('.toast-box');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-box';
  toast.innerHTML = `<i class="fa-solid fa-check" style="color: var(--text-emerald)"></i> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

// Scroll Spy for Navigation Links
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');

    const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value || 'Tech Solutions Discussion';
    const message = document.getElementById('form-message').value;

    const mailtoUrl = `mailto:aditya.singla.techie@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
    window.location.href = mailtoUrl;
    showToast('Redirecting to your mail client...');
    contactForm.reset();
  });
}
