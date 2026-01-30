// Typewriter Effect
const phrases = [
    "I am a Data Scientist",
    "I build ML/AI Models",
    "I turn Ideas into Code",
    "I create Data Pipelines",
    "I solve complex problems"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect when page loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('.theme-icon');

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Smooth scrolling
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

// Scroll effect for nav
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.project-card, .skill-category, .timeline-item, .recommendation-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
