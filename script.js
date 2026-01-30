// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Typewriter Effect with colored words
    const phrases = [
        "Hi, I'm <span class='highlight'>Varun Vaddi</span>",
        "I'm a <span class='highlight'>Data Scientist</span>",
        "I build <span class='highlight'>ML/AI Models</span>",
        "I also build <span class='highlight'>Data Pipelines</span>"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const typedTextElement = document.getElementById('typed-text');
        
        if (!typedTextElement) {
            return;
        }

        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = currentPhrase;
            const textOnly = tempDiv.textContent || tempDiv.innerText;
            
            const currentDisplay = typedTextElement.textContent || typedTextElement.innerText;
            const newText = textOnly.substring(0, currentDisplay.length - 1);
            
            let charCount = 0;
            let htmlOutput = '';
            let inTag = false;
            
            for (let i = 0; i < currentPhrase.length; i++) {
                if (currentPhrase[i] === '<') {
                    inTag = true;
                    htmlOutput += currentPhrase[i];
                } else if (currentPhrase[i] === '>') {
                    inTag = false;
                    htmlOutput += currentPhrase[i];
                } else if (inTag) {
                    htmlOutput += currentPhrase[i];
                } else {
                    if (charCount < newText.length) {
                        htmlOutput += currentPhrase[i];
                        charCount++;
                    }
                }
            }
            
            typedTextElement.innerHTML = htmlOutput;
            currentCharIndex--;
            typingSpeed = 50;
            
            if (newText.length === 0) {
                currentCharIndex = 0;
            }
        } else {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = currentPhrase;
            const textOnly = tempDiv.textContent || tempDiv.innerText;
            
            let charCount = 0;
            let htmlOutput = '';
            let inTag = false;
            
            for (let i = 0; i < currentPhrase.length; i++) {
                if (currentPhrase[i] === '<') {
                    inTag = true;
                    htmlOutput += currentPhrase[i];
                } else if (currentPhrase[i] === '>') {
                    inTag = false;
                    htmlOutput += currentPhrase[i];
                } else if (inTag) {
                    htmlOutput += currentPhrase[i];
                } else {
                    if (charCount < currentCharIndex) {
                        htmlOutput += currentPhrase[i];
                        charCount++;
                    }
                }
            }
            
            typedTextElement.innerHTML = htmlOutput;
            currentCharIndex++;
            typingSpeed = 100;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentPhrase;
        const textLength = (tempDiv.textContent || tempDiv.innerText).length;

        if (!isDeleting && currentCharIndex > textLength) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typewriter
    setTimeout(typeText, 500);

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('.theme-icon');

    if (themeToggle && themeIcon) {
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
            
            console.log('Theme changed to:', newTheme); // Debug log
        });
    } else {
        console.error('Theme toggle elements not found');
    }

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
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    }

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

    document.querySelectorAll('.project-card, .skill-category, .timeline-item, .recommendation-card, .education-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
