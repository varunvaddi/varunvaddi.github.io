// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ── Typewriter Effect ──────────────────────────────────────────
    const phrases = [
        "Hi, I'm <span class='highlight'>Varun Vaddi</span>",
        "I'm a <span class='highlight'>Data & AI Engineer</span>",
        "I build <span class='highlight'>Data Pipelines</span>",
        "I also build <span class='highlight'>AI/ML Models</span>",
        "I'm looking for <span class='highlight'>Full-Time Opportunities</span>"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const typedTextElement = document.getElementById('typed-text');
        if (!typedTextElement) return;

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
                if (currentPhrase[i] === '<') { inTag = true; htmlOutput += currentPhrase[i]; }
                else if (currentPhrase[i] === '>') { inTag = false; htmlOutput += currentPhrase[i]; }
                else if (inTag) { htmlOutput += currentPhrase[i]; }
                else {
                    if (charCount < newText.length) { htmlOutput += currentPhrase[i]; charCount++; }
                }
            }

            typedTextElement.innerHTML = htmlOutput;
            currentCharIndex--;
            typingSpeed = 50;
            if (newText.length === 0) currentCharIndex = 0;

        } else {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = currentPhrase;

            let charCount = 0;
            let htmlOutput = '';
            let inTag = false;

            for (let i = 0; i < currentPhrase.length; i++) {
                if (currentPhrase[i] === '<') { inTag = true; htmlOutput += currentPhrase[i]; }
                else if (currentPhrase[i] === '>') { inTag = false; htmlOutput += currentPhrase[i]; }
                else if (inTag) { htmlOutput += currentPhrase[i]; }
                else {
                    if (charCount < currentCharIndex) { htmlOutput += currentPhrase[i]; charCount++; }
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

    setTimeout(typeText, 500);


    // ── Theme Toggle ───────────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

    if (themeToggle && themeIcon) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
        });
    }


    // ── Mobile Menu ────────────────────────────────────────────────
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }


    // ── Smooth Scrolling ───────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                const navHeight = 120;
                window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
            }
        });
    });


    // ── Capsule Nav Scroll ─────────────────────────────────────────
    const capsuleNav = document.querySelector('.capsule-nav');
    if (capsuleNav) {
        window.addEventListener('scroll', () => {
            // shadow logic here if needed
        });
    }


    // ── Active Section Highlight ───────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) item.classList.add('active');
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);


    // ── Role Toggle ────────────────────────────────────────────────
    let currentRole = 'de';

    function applyRole(role, animate) {
        const cards = document.querySelectorAll('#projectsGrid .project-card');
        cards.forEach(card => {
            const roles = card.dataset.roles ? card.dataset.roles.split(' ') : [];
            if (roles.includes(role)) {
                card.classList.remove('role-hidden');
                if (animate) {
                    card.classList.remove('role-visible');
                    void card.offsetWidth; // reflow to retrigger animation
                    card.classList.add('role-visible');
                } else {
                    card.classList.add('role-visible');
                }
            } else {
                card.classList.remove('role-visible');
                card.classList.add('role-hidden');
            }
        });
    }

    window.switchRole = function(role) {
        if (role === currentRole) return;
        currentRole = role;

        // Move pill
        document.getElementById('toggleSlider').classList.toggle('slide-right', role === 'ds');

        // Button states
        document.getElementById('btn-de').classList.toggle('active', role === 'de');
        document.getElementById('btn-ds').classList.toggle('active', role === 'ds');

        applyRole(role, true);
    };

    // Init toggle on load (no animation on first paint)
    applyRole('de', false);


    // ── Fade-in on Scroll (skips role-hidden cards) ────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Don't reveal cards that are hidden by the role toggle
            if (entry.isIntersecting && !entry.target.classList.contains('role-hidden')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.project-card, .skill-category, .timeline-item, .recommendation-card, .education-card, .certification-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


    // ── Brand → Scroll to Top ──────────────────────────────────────
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


});
