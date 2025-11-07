document.addEventListener('DOMContentLoaded', (event) => {
            
    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden', !isMenuOpen);
            menuIconClose.classList.toggle('hidden', isMenuOpen);
        });
    }
    
    // --- Close mobile menu when a link is clicked ---
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });
    }
    
    // --- Set Current Year in Footer ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Fade-in Sections on Scroll ---
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

});
