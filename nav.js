document.addEventListener("DOMContentLoaded", async () => {
  if (!document.querySelector("link[rel='icon']")) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "KSA/favicon.png"; // change to KSA/favicon.png if that's where you put it
    document.head.appendChild(favicon);
  }

  const navTarget = document.getElementById("site-nav");
  if (!navTarget) return;

  try {
    const response = await fetch("nav.html");
    const html = await response.text();
    navTarget.innerHTML = html;

    const menuToggle = document.getElementById("menuToggle");
    const navDropdown = document.getElementById("navDropdown");
    const projectsToggle = document.getElementById("projectsToggle");
    const projectsSubmenu = document.getElementById("projectsSubmenu");

    if (menuToggle && navDropdown) {
      menuToggle.addEventListener("click", () => {
        const isOpen = navDropdown.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    if (projectsToggle && projectsSubmenu) {
      projectsToggle.addEventListener("click", () => {
        const isOpen = projectsSubmenu.classList.toggle("open");
        projectsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-menu-wrap")) {
        if (navDropdown) navDropdown.classList.remove("open");
        if (projectsSubmenu) projectsSubmenu.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        if (projectsToggle) projectsToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (navDropdown) navDropdown.classList.remove("open");
        if (projectsSubmenu) projectsSubmenu.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        if (projectsToggle) projectsToggle.setAttribute("aria-expanded", "false");
      }
    });
  } catch (error) {
    console.error("Failed to load nav:", error);
  }
});
