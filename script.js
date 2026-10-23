document.addEventListener('DOMContentLoaded', function () {

    // ── Theme toggle ───────────────────────────────────────────
    var html = document.documentElement;
    var themeBtn = document.getElementById('theme-toggle');

    function syncThemeLabel() {
        if (!themeBtn) return;
        var isDark = html.getAttribute('data-theme') === 'dark';
        themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    syncThemeLabel();

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            syncThemeLabel();
        });
    }


    // ── Mobile menu ────────────────────────────────────────────
    var menuBtn = document.getElementById('menu-toggle');
    var nav = document.getElementById('site-nav');

    function setMenu(open) {
        if (!menuBtn || !nav) return;
        nav.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () {
            setMenu(!nav.classList.contains('open'));
        });
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setMenu(false);
        });
    }


    // ── Project filter ─────────────────────────────────────────
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projects = document.querySelectorAll('.project');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = btn.dataset.filter;

            filterButtons.forEach(function (b) {
                b.setAttribute('aria-pressed', String(b === btn));
            });

            projects.forEach(function (project) {
                var roles = (project.dataset.roles || '').split(' ');
                project.hidden = !(filter === 'all' || roles.indexOf(filter) !== -1);
            });
        });
    });


    // ── Highlight current section in the nav ───────────────────
    var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    var sectionMap = {};
    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if (section) sectionMap[id] = link;
    });

    if ('IntersectionObserver' in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (l) { l.classList.remove('active'); });
                var link = sectionMap[entry.target.id];
                if (link && !link.classList.contains('nav-cta')) link.classList.add('active');
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        Object.keys(sectionMap).forEach(function (id) {
            spy.observe(document.getElementById(id));
        });
    }

});
