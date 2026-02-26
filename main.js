document.addEventListener('DOMContentLoaded', () => {
    // ============ MOBILE MENU TOGGLE ============
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (btn && menu) {
        btn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                menu.classList.remove('pointer-events-none', 'opacity-0');
                menu.classList.add('pointer-events-auto', 'opacity-100');
                document.body.style.overflow = 'hidden';

                // Animate hamburger to X
                const lines = btn.querySelectorAll('.hamburger-line');
                if (lines.length >= 3) {
                    lines[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                    lines[1].style.opacity = '0';
                    lines[1].style.transform = 'translateX(-10px)';
                    lines[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';
                    lines[2].style.width = '20px';
                    lines[2].classList.remove('bg-yellow-400');
                    lines[2].classList.add('bg-white');
                }

                // Stagger animate nav items
                const navItems = menu.querySelectorAll('.mobile-nav-item');
                navItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.transform = 'translateY(0)';
                        item.style.opacity = '1';
                    }, 100 + (i * 80));
                });
            } else {
                closeMenu();
            }
        });

        // Close menu on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    closeMenu();
                }
            });
        });
    }

    function closeMenu() {
        if (!menu) return;
        const navItems = menu.querySelectorAll('.mobile-nav-item');
        navItems.forEach(item => {
            item.style.transform = 'translateY(32px)';
            item.style.opacity = '0';
        });

        const lines = btn.querySelectorAll('.hamburger-line');
        if (lines.length >= 3) {
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[1].style.transform = '';
            lines[2].style.transform = '';
            lines[2].style.width = '';
            lines[2].classList.add('bg-yellow-400');
            lines[2].classList.remove('bg-white');
        }

        setTimeout(() => {
            menu.classList.add('pointer-events-none', 'opacity-0');
            menu.classList.remove('pointer-events-auto', 'opacity-100');
            document.body.style.overflow = '';
        }, 200);
    }

    // ============ HEADER SCROLL EFFECT ============
    const siteHeader = document.getElementById('siteHeader');
    const topBar = document.getElementById('topBar');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;

        // Collapse top info bar on scroll
        if (topBar) {
            if (scrolled) {
                topBar.style.maxHeight = '0';
                topBar.style.opacity = '0';
                topBar.style.borderBottomWidth = '0';
            } else {
                topBar.style.maxHeight = '40px';
                topBar.style.opacity = '1';
                topBar.style.borderBottomWidth = '';
            }
        }

        // Tighten nav on scroll
        if (navbar) {
            const inner = navbar.querySelector('.container');
            if (scrolled) {
                navbar.style.background = 'rgba(15, 23, 42, 0.97)';
                navbar.classList.add('shadow-lg', 'shadow-black/20');
                if (inner) inner.classList.replace('py-3', 'py-2');
            } else {
                navbar.style.background = '';
                navbar.classList.remove('shadow-lg', 'shadow-black/20');
                if (inner) inner.classList.replace('py-2', 'py-3');
            }
        }
    });

    // ============ SCROLL REVEAL ============
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    if (scrollRevealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 100);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        scrollRevealElements.forEach(el => revealObserver.observe(el));
    }

    // ============ FADE-IN ANIMATION ============
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .animate-fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
