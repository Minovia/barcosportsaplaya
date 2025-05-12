// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    } else {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
    }
});

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
    });
});

// FAQ toggle
function toggleFAQ(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    
    content.classList.toggle('hidden');
    icon.classList.toggle('transform');
    icon.classList.toggle('rotate-180');
}

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});









///// LANGUAGE MENU DROP //////// Language switcher toggle for desktop
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('show-language');
}

// Language switcher toggle for mobile
function toggleLanguageDropdownMobile() {
    const dropdown = document.getElementById('languageDropdownMobile');
    dropdown.classList.toggle('show-language');
}

// Function to change language (placeholder)
function changeLanguage(lang) {
    // Implement language switching logic here
    // This could involve:
    // 1. Redirecting to a different URL (e.g., /en/index.html)
    // 2. Loading content dynamically via JavaScript/AJAX
    // 3. Using a translation library
    console.log(`Changing language to: ${lang}`); // Placeholder action

    // Close dropdowns after selection
    document.getElementById('languageDropdown').classList.remove('show-language');
    document.getElementById('languageDropdownMobile').classList.remove('show-language');
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    // Check if the click is outside any language switcher button or dropdown
    if (!event.target.closest('.language-switcher')) {
        const dropdowns = document.getElementsByClassName("language-dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-language')) {
                openDropdown.classList.remove('show-language');
            }
        }
    }
}

// Optional: Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
        // Also close the mobile menu button icon change if you have that logic
        // const icon = document.getElementById('mobile-menu-icon');
        // icon.classList.remove('fa-times');
        // icon.classList.add('fa-bars');
    });
});

// Optional: Close language dropdowns when mobile menu is toggled
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    // Close desktop dropdown if open (unlikely, but safe)
    document.getElementById('languageDropdown').classList.remove('show-language');
    // Close mobile dropdown if open
    document.getElementById('languageDropdownMobile').classList.remove('show-language');
});