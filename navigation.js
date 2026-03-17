// Navigation Bar Scroll Behavior
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

// Scroll event listener
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling changes
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop) {
        // Scrolling DOWN
        navbar.classList.add('hide');
        navbar.classList.remove('show');
    } else {
        // Scrolling UP
        navbar.classList.remove('hide');
        navbar.classList.add('show');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Check if hamburger exists, if not create it
    let hamburger = document.querySelector('.hamburger');
    let mobileMenu = document.querySelector('.mobile-menu');

    // Create hamburger if it doesn't exist
    if (!hamburger) {
        const navList = document.querySelector('.navbar ul');
        const hamburgerHTML = `
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        navList.insertAdjacentHTML('beforebegin', hamburgerHTML);
        hamburger = document.querySelector('.hamburger');
    }

    // Create mobile menu if it doesn't exist
    if (!mobileMenu) {
        const navList = document.querySelector('.navbar ul');
        const mobileMenuHTML = `
            <div class="mobile-menu">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Project</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', mobileMenuHTML);
        mobileMenu = document.querySelector('.mobile-menu');
    }

    // Hamburger toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Update active menu item based on current page
    updateActiveMenuItem();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Update active menu item based on current page
function updateActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update desktop menu
    const desktopLinks = document.querySelectorAll('.navbar ul li');
    desktopLinks.forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link.href.includes(currentPage)) {
            li.classList.add('active');
        }
    });

    // Update mobile menu
    const mobileLinks = document.querySelectorAll('.mobile-menu li');
    mobileLinks.forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link.href.includes(currentPage)) {
            li.classList.add('active');
        }
    });
}

// Handle window resize for menu adjustments
window.addEventListener('resize', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Close mobile menu on larger screens
    if (window.innerWidth > 768) {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    }
});
