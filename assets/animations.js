// ========================
// ANIMATIONS.JS - 3D Animation Suite
// ========================

// ========================
// MOBILE & PERFORMANCE DETECTION
// ========================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================
// PRELOADER
// ========================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
      // Initialize 3D reveals after preloader
      setTimeout(() => init3DReveals(), 300);
    }, 1200);
  }
});

// ========================
// Initialize AOS (Animate On Scroll)
// ========================
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  mirror: false,
  offset: 80,
  disable: prefersReducedMotion
});

// ========================
// PARTICLES.JS BACKGROUND
// ========================
const particleCount = isMobile ? 30 : 80;

particlesJS('particles-js', {
  particles: {
    number: {
      value: particleCount,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#9370DB'
    },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#000000' }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: !isMobile,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#9370DB',
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: isMobile ? 1 : 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: !isTouchDevice,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: { opacity: 1 }
      },
      push: {
        particles_nb: isMobile ? 2 : 4
      }
    }
  },
  retina_detect: true
});

// ========================
// TYPED.JS - Auto-typing Effect
// ========================
const typed = new Typed('#typed-role', {
  strings: [
    'Aspiring Audit & Finance Professional.',
    'AAT Finalist.',
    'ACCA Student.',
    'Financial Analyst.',
    'Problem Solver.'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

// ========================
// TILT EFFECT (Desktop Only)
// ========================
if (!isTouchDevice) {
  VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
    perspective: 800
  });
}

// ========================
// CUSTOM CURSOR (Desktop Only)
// ========================
if (!isTouchDevice) {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');

  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    // Dot follows immediately
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  // Smooth cursor follow with lerp
  function animateCursor() {
    dotX += (cursorX - dotX) * 0.15;
    dotY += (cursorY - dotY) * 0.15;
    cursor.style.left = dotX + 'px';
    cursor.style.top = dotY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .row, .box, .info-card, .social-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.borderColor = '#9370DB';
      cursor.style.background = 'rgba(147, 112, 219, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = '#fff';
      cursor.style.background = 'transparent';
    });
  });
}

// ========================
// MOUSE FOLLOW LIGHT (Desktop Only)
// ========================
if (!isTouchDevice) {
  const mouseLight = document.getElementById('mouse-light');
  if (mouseLight) {
    document.addEventListener('mousemove', (e) => {
      mouseLight.style.left = e.clientX + 'px';
      mouseLight.style.top = e.clientY + 'px';
    });
  }
}

// ========================
// 3D MOUSE PARALLAX (Desktop Only)
// ========================
if (!isTouchDevice && !prefersReducedMotion) {
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate3DParallax() {
    // Smooth lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    const homeText = document.querySelector('.home-text');
    const homeImg = document.querySelector('.home-img');

    if (homeText && isElementInView(homeText)) {
      homeText.style.transform = `translateZ(30px) rotateY(${targetX * 2}deg) rotateX(${-targetY * 2}deg)`;
    }

    if (homeImg && isElementInView(homeImg)) {
      homeImg.style.transform = `translateZ(-10px) rotateY(${targetX * 4}deg) rotateX(${-targetY * 3}deg)`;
    }

    requestAnimationFrame(animate3DParallax);
  }

  animate3DParallax();
}

// Helper: Check if element is approximately in viewport
function isElementInView(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// ========================
// 3D CARD TILT ON HOVER (Desktop Only)
// ========================
if (!isTouchDevice && !prefersReducedMotion) {
  function init3DCardTilt() {
    const cards = document.querySelectorAll('.row, .box, .info-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.03)`;
        card.style.transition = 'transform 0.1s ease';

        // Dynamic light reflection
        const gradX = (x / rect.width) * 100;
        const gradY = (y / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${gradX}% ${gradY}%, rgba(147, 112, 219, 0.15) 0%, rgba(11, 11, 19, 0.8) 80%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.background = 'rgba(11, 11, 19, 0.7)';
      });
    });
  }

  // Init after a small delay to allow DOM to be ready
  setTimeout(init3DCardTilt, 500);
}

// ========================
// 3D SECTION REVEAL ON SCROLL
// ========================
function init3DReveals() {
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll('.reveal-3d, .card-reveal-3d, .slide-left-3d, .slide-right-3d, .pop-3d');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible-3d');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// Also init on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(init3DReveals, 100);
});

// ========================
// SCROLL PROGRESS BAR
// ========================
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

// ========================
// SMOOTH SCROLL with Animation
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile nav if open
      const navbar = document.querySelector('.navbar');
      const menuIcon = document.getElementById('menu-icon');
      if (navbar && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
      }
    }
  });
});

// ========================
// NAVBAR ACTIVE STATE
// ========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// ========================
// HEADER SCROLL EFFECT
// ========================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========================
// GLITCH EFFECT
// ========================
const glitchTexts = document.querySelectorAll('.glitch');
glitchTexts.forEach(text => {
  // Auto-trigger glitch periodically
  setInterval(() => {
    text.classList.add('glitch-active');
    setTimeout(() => {
      text.classList.remove('glitch-active');
    }, 400);
  }, 5000);

  text.addEventListener('mouseenter', function() {
    this.classList.add('glitch-active');
    setTimeout(() => {
      this.classList.remove('glitch-active');
    }, 500);
  });
});

// ========================
// TEXT REVEAL ON SCROLL
// ========================
const revealTexts = document.querySelectorAll('.about-text p, .home-text p');
revealTexts.forEach(text => {
  text.style.opacity = '0';
  text.style.transform = 'translateY(30px)';
});

const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

revealTexts.forEach(text => textObserver.observe(text));

// ========================
// BUTTON RIPPLE EFFECT
// ========================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    setTimeout(() => ripple.remove(), 600);
  });
});

// ========================
// SCROLL TO TOP BUTTON
// ========================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// IMAGE FADE IN ON LOAD
// ========================
const images = document.querySelectorAll('img[src]');
images.forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});

// ========================
// MAGNETIC BUTTONS (Desktop Only)
// ========================
if (!isTouchDevice) {
  const magneticButtons = document.querySelectorAll('.btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `perspective(500px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg) translateZ(10px)`;
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
  });
}

// ========================
// 3D SCROLL DEPTH EFFECT
// ========================
if (!isMobile && !prefersReducedMotion) {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;

        // Subtle parallax depth on about image
        const aboutImg = document.querySelector('.about-img img');
        if (aboutImg && isElementInView(aboutImg.parentElement)) {
          const rect = aboutImg.parentElement.getBoundingClientRect();
          const progress = (rect.top / window.innerHeight);
          aboutImg.style.transform = `perspective(800px) rotateY(${progress * 5}deg) translateZ(${Math.abs(progress) * 10}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

// ========================
// FLOATING ANIMATION ENHANCEMENT
// ========================
function createFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating');
  floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.3}s`;
  });
}
createFloatingAnimation();

// ========================
// RESIZE HANDLER
// ========================
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Refresh AOS on resize
    AOS.refresh();
  }, 250);
});

// ========================
// CONSOLE MESSAGE
// ========================
console.log('%c Welcome to Fawzul Islam\'s Portfolio! ',
  'background: linear-gradient(135deg, #9370DB, #ff6ec4); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Powered by 3D animations & effects! ',
  'background: #10101a; color: #9370DB; font-size: 14px; padding: 5px; border: 1px solid #9370DB; border-radius: 3px;');

// ========================
// PERFORMANCE OPTIMIZED DEBOUNCE
// ========================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const optimizedScroll = debounce(() => {
  setActiveNav();
}, 10);

window.addEventListener('scroll', optimizedScroll);
