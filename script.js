// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Typewriter Effect with colored words
    const phrases = [
        "Hi, I'm <span class='highlight'>Varun Vaddi</span>",
        "I'm a <span class='highlight'>Data Scientist</span>",
        "I build <span class='highlight'>AI/ML Models</span>",
        "I also build <span class='highlight'>Data Pipelines</span>",
        "I'm looking for <span class='highlight'>Full-Time Opportunities</span>"
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
            
            console.log('Theme changed to:', newTheme);
        });
    } else {
        console.error('Theme toggle elements not found');
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll to target with offset for fixed nav
                const navHeight = 120;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll effect for capsule nav
    const capsuleNav = document.querySelector('.capsule-nav');
    if (capsuleNav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow on scroll
            //if (currentScroll > 50) {
             //   capsuleNav.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
            //} else {
              //  capsuleNav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
           // }
            
            lastScroll = currentScroll;
        });
    }

    // Active section highlighting
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
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);

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

    document.querySelectorAll('.project-card, .skill-category, .timeline-item, .recommendation-card, .education-card, .certification-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Brand circle click to scroll to top
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
