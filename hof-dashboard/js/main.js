document.addEventListener("DOMContentLoaded", () => {
    // 🌗 Theme Toggle
    const themeSwitch = document.getElementById("themeSwitch");
    const body = document.body;
  
    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark");
      if (themeSwitch) themeSwitch.checked = true;
    }
  
    // Toggle on change
    if (themeSwitch) {
      themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
          body.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          body.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      });
    }
  
    // 🌠 Scroll fade-in animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1,
    });
  
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
  });
  