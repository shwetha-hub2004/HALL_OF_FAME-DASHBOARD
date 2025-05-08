// Main JavaScript for site-wide features: dark/light mode toggle and scroll to top button

// Dark/Light mode toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
        toggleBtn.textContent = savedTheme === 'dark' ? '🌞' : '🌙';
    }
}

// Scroll to top button
function setupScrollTopButton() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Setup theme toggle button event
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        toggleTheme();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        toggleBtn.textContent = currentTheme === 'dark' ? '🌞' : '🌙';
    });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeToggle();
    setupScrollTopButton();
});
