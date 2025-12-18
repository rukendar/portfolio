// script.js
// Interactive features for the portfolio:
// 1. Fade-in animation on scroll for sections
// 2. Smooth scrolling for any future links
// 3. Dark mode toggle (adds a button to header)
// 4. Mobile menu toggle for sidebar (enhances responsiveness)

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // 1. Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section, .sidebar > div');
    sections.forEach(section => {
        observer.observe(section);
    });

    // 2. Smooth scrolling (if links are added later)
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

    // 3. Dark mode toggle
    // Add toggle button to header
    const header = document.querySelector('header');
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🌙 Dark Mode';
    toggleBtn.classList.add('dark-toggle');
    toggleBtn.style.cssText = 'position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 0.5rem; border-radius: 5px; cursor: pointer;';
    header.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.innerHTML.includes('🌙') ? '☀️ Light Mode' : '🌙 Dark Mode';
        this.innerHTML = icon;
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load saved theme
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '☀️ Light Mode';
    }

    // 4. Mobile menu toggle (for sidebar on small screens)
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    let isMobileMenuOpen = false;

    // Add mobile toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.innerHTML = '☰ Menu';
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.style.cssText = 'display: none; background: #3498db; color: white; border: none; padding: 0.5rem; font-size: 1rem; cursor: pointer; position: fixed; top: 1rem; left: 1rem; z-index: 1000; border-radius: 5px;';
    document.body.appendChild(mobileToggle);

    function updateMobileToggle() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
        } else {
            mobileToggle.style.display = 'none';
            sidebar.classList.remove('mobile-hidden');
            isMobileMenuOpen = false;
        }
    }

    mobileToggle.addEventListener('click', function() {
        isMobileMenuOpen = !isMobileMenuOpen;
        sidebar.classList.toggle('mobile-hidden', !isMobileMenuOpen);
        this.innerHTML = isMobileMenuOpen ? '✕ Close' : '☰ Menu';
    });

    // Initial check and resize listener
    updateMobileToggle();
    window.addEventListener('resize', updateMobileToggle);
});