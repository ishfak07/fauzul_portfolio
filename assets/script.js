let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
};

const sr = ScrollReveal({
  distance: '60px',
  duration: 2500,
  reset: true,
});

sr.reveal('.home-text', { delay: 200, origin: 'top' });
sr.reveal('.home-img', { delay: 400, origin: 'top' });
sr.reveal('.about, .cta, .resume, .contact, .footer', { delay: 200, origin: 'top' });

// Letter Animation Script
const nameElement = document.querySelector('.home-text h1');
if (nameElement) {
  const text = nameElement.innerText;
  nameElement.innerHTML = text.split('').map((char, index) => 
    `<span class="animated-letter" style="animation-delay: ${index * 0.1}s">${char === ' ' ? '&nbsp;' : char}</span>`
  ).join('');
}

