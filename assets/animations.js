// ========================
// ANIMATIONS.JS - Complete Animation Suite
// ========================

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: false,
  mirror: true
});

// ========================
// PARTICLES.JS BACKGROUND
// ========================
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
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
      stroke: {
        width: 0,
        color: '#000000'
      }
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
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#9370DB',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
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
        enable: true,
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
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
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
// TILT EFFECT
// ========================
VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3
});

// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

// Cursor effects on interactive elements
const links = document.querySelectorAll('a, button, .btn, input, textarea');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursor.style.borderColor = '#9370DB';
  });
  
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.borderColor = '#fff';
  });
});

// ========================
// SCROLL PROGRESS BAR
// ========================
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
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
    const sectionHeight = section.clientHeight;
    
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
// ANIMATED SKILL CARDS
// ========================
const skillCards = document.querySelectorAll('.row');
skillCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ========================
// FLOATING ANIMATION
// ========================
function createFloatingAnimation() {
  const floatingElements = document.querySelectorAll('.floating');
  floatingElements.forEach((el, index) => {
    el.style.animation = `floating 3s ease-in-out infinite`;
    el.style.animationDelay = `${index * 0.2}s`;
  });
}

createFloatingAnimation();

// ========================
// GLITCH EFFECT
// ========================
const glitchTexts = document.querySelectorAll('.glitch');
glitchTexts.forEach(text => {
  text.addEventListener('mouseenter', function() {
    this.classList.add('glitch-active');
    setTimeout(() => {
      this.classList.remove('glitch-active');
    }, 500);
  });
});

// ========================
// FORM VALIDATION & ANIMATION
// ========================
const form = document.querySelector('.contact-form form');
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
    this.style.transform = 'scale(1.02)';
    this.style.boxShadow = '0 0 20px rgba(147, 112, 219, 0.3)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
  });
});

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation animation
    const submitBtn = this.querySelector('.send-btn');
    submitBtn.style.transform = 'scale(0.95)';
    submitBtn.value = 'Sending...';
    
    // Simulate sending
    setTimeout(() => {
      submitBtn.value = 'Sent! ✓';
      submitBtn.style.background = '#4CAF50';
      
      // Reset after delay
      setTimeout(() => {
        submitBtn.value = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.style.transform = 'scale(1)';
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// ========================
// PARALLAX EFFECT
// ========================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.home-img img, .about-img img');
  
  parallaxElements.forEach(el => {
    const speed = 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
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

const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px'
};

const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'all 0.6s ease-out';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

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
// COUNTER ANIMATION FOR STATS
// ========================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ========================
// SCROLL TO TOP BUTTON
// ========================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
scrollTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================
// IMAGE LAZY LOADING
// ========================
const images = document.querySelectorAll('img[src]');
images.forEach(img => {
  img.style.opacity = '1';
  img.classList.add('loaded');
});

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.animation = 'fadeInScale 0.6s ease-out';
      img.style.opacity = '1';
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ========================
// SECTION FADE IN
// ========================
const sections_animated = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'sectionFadeIn 0.8s ease-out forwards';
    }
  });
}, { threshold: 0.1 });

sections_animated.forEach(section => sectionObserver.observe(section));

// ========================
// MAGNETIC BUTTONS
// ========================
const magneticButtons = document.querySelectorAll('.btn');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translate(0, 0)';
  });
});

// ========================
// CONSOLE MESSAGE
// ========================
console.log('%c Welcome to Fawzul Islam\'s Portfolio! ', 
  'background: #9370DB; color: white; font-size: 20px; padding: 10px;');
console.log('%c Designed with ❤️ and powered by advanced animations! ', 
  'background: #10101a; color: #9370DB; font-size: 14px; padding: 5px;');

// ========================
// PERFORMANCE OPTIMIZATION
// ========================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const optimizedScroll = debounce(() => {
  setActiveNav();
}, 10);

window.addEventListener('scroll', optimizedScroll);
