import './style.css';

// Typewriter effect for the header
const headerTextElement = document.getElementById('typewriter-text');
const textToType = "Hybe Latin America";
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Speed in milliseconds
let deleteSpeed = 100;
let pauseBeforeDelete = 1000; // Pause before deleting

function typeWriter() {
  const currentText = textToType.substring(0, charIndex);
  headerTextElement.textContent = currentText;

  if (!isDeleting && charIndex < textToType.length) {
    // Typing
    charIndex++;
    typingSpeed = 150; // Normal typing speed
  } else if (isDeleting && charIndex > 0) {
    // Deleting
    charIndex--;
    typingSpeed = deleteSpeed;
  } else if (!isDeleting && charIndex === textToType.length) {
    // Pause after typing
    isDeleting = true;
    typingSpeed = pauseBeforeDelete;
  } else if (isDeleting && charIndex === 0) {
    // Pause after deleting and start typing again
    isDeleting = false;
    typingSpeed = 150; // Normal typing speed
  }

  setTimeout(typeWriter, typingSpeed);
}

// Random Blink Effect
const body = document.body;
let blinkTimeout;

function randomBlink() {
  // Check if prefers-reduced-motion is enabled
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const currentTheme = body.dataset.theme;
    if (currentTheme === 'light') {
      body.dataset.theme = 'dark';
    } else {
      body.dataset.theme = 'light';
    }
  }

  const randomInterval = Math.random() * (2000 - 200) + 200; // Random interval between 200ms and 2000ms
  blinkTimeout = setTimeout(randomBlink, randomInterval);
}

// Stop blink effect if prefers-reduced-motion is enabled
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
  if (event.matches) {
    clearTimeout(blinkTimeout);
    // Reset theme to light if motion is reduced
    body.dataset.theme = 'light';
  } else {
    randomBlink(); // Restart blink if motion is preferred again
  }
});


// Hexagon click and password protection
document.querySelectorAll('.hexagon').forEach(hexagon => {
  hexagon.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior

    const stone = hexagon.dataset.stone;
    let password = '';
    let correctPassword = '';
    let redirectUrl = '';
    let action = 'alert'; // 'alert' or 'redirect'

    switch (stone) {
      case 'datahub':
        correctPassword = 'DATA';
        redirectUrl = 'http://v2datahub.hybelatinamerica.com/';
        action = 'redirect';
        break;
      case 'rh':
        correctPassword = 'BLUE';
        redirectUrl = 'https://calculadora.hybelatinamerica.com/';
        action = 'redirect';
        break;
      default:
        correctPassword = 'LOCKED'; // Generic password for others
        action = 'alert';
        break;
    }

    password = prompt('Please enter the password:');

    if (password === correctPassword) {
      if (action === 'redirect') {
        window.location.href = redirectUrl;
      } else {
        alert('Próximamente');
      }
    } else {
      alert('Contraseña incorrecta');
    }
  });
});

// Fire Particle Effect (JavaScript) - Removed
/*
function addFireEffect(hexagonElement) {
  const stone = hexagonElement.dataset.stone;
  const fireColor = getComputedStyle(document.documentElement).getPropertyValue(`--${stone}-color`).trim();

  const fireContainer = document.createElement('div');
  fireContainer.classList.add('fire-container');
  hexagonElement.appendChild(fireContainer);

  const particles = [];
  const particleCount = 400; // Increased particle count further
  const maxParticleSize = 10; // Adjusted max particle size
  const maxParticleLife = 90; // Adjusted max particle life

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('fire-particle');
    particle.style.backgroundColor = fireColor;
    fireContainer.appendChild(particle);

    particles.push({
      element: particle,
      x: 0,
      y: 0,
      size: 0,
      opacity: 0,
      velocity: { x: 0, y: 0 },
      life: 0,
      maxLife: 0
    });
  }

  function resetParticle(p) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 10 + 20; // Position particles closer to the center
    p.x = fireContainer.offsetWidth / 2 + Math.cos(angle) * radius;
    p.y = fireContainer.offsetHeight / 2 + Math.sin(angle) * radius;
    p.size = Math.random() * maxParticleSize + 2; // Adjusted size range
    p.opacity = Math.random() * 0.6 + 0.4; // Adjusted initial opacity range
    p.velocity.x = (Math.random() - 0.5) * 1.2; // Adjusted horizontal velocity range
    p.velocity.y = Math.random() * -1.0 - 0.8; // Adjusted upward velocity range
    p.life = 0;
    p.maxLife = Math.random() * maxParticleLife + 50; // Adjusted max life
  }

  particles.forEach(resetParticle);

  function animateFire() {
    particles.forEach(p => {
      p.x += p.velocity.x;
      p.y += p.velocity.y;
      p.life++;

      // Fade out
      p.opacity = (1 - p.life / p.maxLife) * (Math.random() * 0.4 + 0.6); // Adjust fade out and flicker

      // Update element style
      p.element.style.left = `${p.x - p.size / 2}px`;
      p.element.style.top = `${p.y - p.size / 2}px`;
      p.element.style.width = `${p.size}px`;
      p.element.style.height = `${p.size}px`;
      p.element.style.opacity = p.opacity;

      // Reset if dead
      if (p.life >= p.maxLife) {
        resetParticle(p);
      }
    });

    requestAnimationFrame(animateFire);
  }

  // Start animation only if motion is preferred
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
     animateFire();
  }

  // Stop animation if prefers-reduced-motion is enabled later
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
    if (event.matches) {
      // Hide particles if motion is reduced
      fireContainer.style.display = 'none';
    } else {
      // Show particles and restart animation if motion is preferred again
      fireContainer.style.display = 'block';
      animateFire();
    }
  });
}
*/


// Start the effects
document.addEventListener('DOMContentLoaded', () => {
  // Set initial theme
  body.dataset.theme = 'dark'; // Set initial theme to dark for better contrast with videos
  typeWriter();
  randomBlink();

  // Add fire effect to each hexagon - Removed
  // document.querySelectorAll('.hexagon').forEach(addFireEffect);
});
