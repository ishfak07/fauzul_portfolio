/* ============================================
   FAWZUL ISLAM PORTFOLIO - Main Script
   Three.js 3D Scene + GSAP Animations + Interactions
   ============================================ */

(() => {
  'use strict';

  // ========================
  // DETECTION & CONFIG
  // ========================
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mark touch devices so CSS can hide custom cursor
  if (isTouch) document.body.classList.add('touch');

  // ========================
  // PRELOADER
  // ========================
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => preloader.classList.add('loaded'), 1400);
    }
  });

  // ========================
  // THEME TOGGLE (Dark / Light)
  // ========================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  // Restore saved theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.classList.remove('bx-moon');
      themeIcon.classList.add('bx-sun');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('portfolio-theme', 'light');
        if (themeIcon) {
          themeIcon.classList.remove('bx-sun');
          themeIcon.classList.add('bx-moon');
        }
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
        if (themeIcon) {
          themeIcon.classList.remove('bx-moon');
          themeIcon.classList.add('bx-sun');
        }
      }
    });
  }

  // ========================
  // THREE.JS - 3D BACKGROUND
  // ========================
  function init3DScene() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particleCount = isMobile ? 40 : 120;
    const particles = [];
    const group = new THREE.Group();

    const colors = [
      new THREE.Color(0x7c3aed), // purple
      new THREE.Color(0xa78bfa), // light purple
      new THREE.Color(0xec4899), // pink
      new THREE.Color(0x06b6d4), // cyan
    ];

    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.25, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.SphereGeometry(0.15, 8, 8),
    ];

    for (let i = 0; i < particleCount; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.18,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const speed = {
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.002,
        rotX: (Math.random() - 0.5) * 0.008,
        rotY: (Math.random() - 0.5) * 0.008,
      };

      particles.push({ mesh, speed });
      group.add(mesh);
    }

    scene.add(group);

    // Mouse tracking for parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    if (!isTouch) {
      document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    // Animate
    function animate() {
      requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;

      group.rotation.y = targetX * 0.15;
      group.rotation.x = targetY * 0.1;

      particles.forEach(p => {
        p.mesh.rotation.x += p.speed.rotX;
        p.mesh.rotation.y += p.speed.rotY;
        p.mesh.position.y += p.speed.y;
        p.mesh.position.x += p.speed.x;

        // Wrap around
        if (p.mesh.position.y > 25) p.mesh.position.y = -25;
        if (p.mesh.position.y < -25) p.mesh.position.y = 25;
        if (p.mesh.position.x > 35) p.mesh.position.x = -35;
        if (p.mesh.position.x < -35) p.mesh.position.x = 35;
      });

      renderer.render(scene, camera);
    }

    if (!prefersReduced) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  init3DScene();

  // ========================
  // GSAP + SCROLLTRIGGER
  // ========================
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animation
  function initHeroAnimation() {
    const tl = gsap.timeline({ delay: 1.6 });

    tl.to('.hero-greeting', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
      .to('.hero-name .name-line', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.3')
      .to('.hero-role', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.3')
      .to('.hero-desc', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2')
      .to('.hero-actions', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2')
      .to('.hero-image', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
  }

  if (!prefersReduced) {
    // Set initial states
    gsap.set('.hero-greeting', { opacity: 0, y: 20 });
    gsap.set('.hero-name .name-line', { opacity: 0, y: 40 });
    gsap.set('.hero-role', { opacity: 0, y: 20 });
    gsap.set('.hero-desc', { opacity: 0, y: 20 });
    gsap.set('.hero-actions', { opacity: 0, y: 20 });
    gsap.set('.hero-image', { opacity: 0, scale: 0.9 });

    initHeroAnimation();
  } else {
    // Show everything immediately
    gsap.set(['.hero-greeting', '.hero-name .name-line', '.hero-role', '.hero-desc', '.hero-actions', '.hero-image'], { opacity: 1, y: 0, scale: 1 });
  }

  // Scroll-triggered reveals
  function initScrollAnimations() {
    if (prefersReduced) return;

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out'
        }
      );
    });

    // About - left reveal
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });

    // About - right reveal
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });

    // Skill cards stagger
    const skillCards = gsap.utils.toArray('.skill-card');
    if (skillCards.length) {
      gsap.fromTo(skillCards,
        { opacity: 0, y: 50, rotateX: 15 },
        {
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out'
        }
      );
    }

    // Skill bars
    gsap.utils.toArray('.skill-fill').forEach(bar => {
      const width = bar.getAttribute('data-width');
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        width: width + '%',
        duration: 1.2,
        ease: 'power3.out'
      });
    });

    // CTA banner
    gsap.fromTo('.cta-content',
      { opacity: 0, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.cta-banner',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out'
      }
    );

    // Timeline cards stagger
    gsap.utils.toArray('.resume-column').forEach(col => {
      const cards = col.querySelectorAll('.timeline-item');
      gsap.fromTo(cards,
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: col,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out'
        }
      );
    });

    // Contact cards
    const contactCards = gsap.utils.toArray('.contact-card');
    if (contactCards.length) {
      gsap.fromTo(contactCards,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out'
        }
      );
    }

    // Social buttons
    gsap.fromTo('.social-btn',
      { opacity: 0, y: 20 },
      {
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }
    );
  }

  initScrollAnimations();

  // Counter animation for about stats
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10);
      gsap.to(counter, {
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        innerText: target,
        duration: 1.5,
        ease: 'power3.out',
        snap: { innerText: 1 },
        onUpdate: function () {
          counter.textContent = Math.round(parseFloat(counter.textContent));
        }
      });
    });
  }
  initCounters();

  // ========================
  // TYPED.JS
  // ========================
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-role', {
      strings: [
        'Aspiring Audit &amp; Finance Professional.',
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
  }

  // ========================
  // CUSTOM CURSOR (Desktop)
  // ========================
  if (!isTouch) {
    const ring = document.getElementById('cursorRing');
    const dot = document.getElementById('cursorDot');
    const glow = document.getElementById('cursorGlow');

    if (ring && dot && glow) {
      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;
      let glowX = 0, glowY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Dot snaps immediately
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      });

      function animateCursor() {
        // Ring follows with lag
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        // Glow trails even slower
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // Hover state for all 3 layers
      const hoverElements = document.querySelectorAll('a, button, .btn, .skill-card, .timeline-card, .contact-card, .social-btn');
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('hover');
          dot.classList.add('hover');
          glow.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('hover');
          dot.classList.remove('hover');
          glow.classList.remove('hover');
        });
      });
    }
  }

  // ========================
  // 3D CARD TILT (Desktop)
  // ========================
  if (!isTouch && !prefersReduced) {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
      });
    });
  }

  // ========================
  // MOBILE NAV
  // ========================
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================
  // ACTIVE NAV STATE
  // ========================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) {
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

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ========================
  // HEADER SCROLL
  // ========================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });

  // ========================
  // SCROLL PROGRESS
  // ========================
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ========================
  // SCROLL TO TOP
  // ========================
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================
  // BUTTON RIPPLE
  // ========================
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========================
  // SMOOTH SCROLL
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================
  // CONSOLE
  // ========================
  console.log(
    '%c Fawzul Islam Portfolio ✨ ',
    'background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; font-size: 18px; padding: 10px 20px; border-radius: 8px; font-family: Inter, sans-serif;'
  );

})();
