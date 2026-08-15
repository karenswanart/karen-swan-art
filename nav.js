document.addEventListener("DOMContentLoaded", async () => {
  if (!document.querySelector("link[rel='icon']")) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "KSA/favicon.png";
    document.head.appendChild(favicon);
  }

  const navTarget = document.getElementById("site-nav");

  if (navTarget) {
    try {
      const response = await fetch("nav.html");
      const html = await response.text();
      navTarget.innerHTML = html;

      const menuToggle = document.getElementById("menuToggle");
      const navDropdown = document.getElementById("navDropdown");
      const projectsToggle = document.getElementById("projectsToggle");
      const projectsSubmenu = document.getElementById("projectsSubmenu");

      const closeMenus = () => {
        if (navDropdown) navDropdown.classList.remove("open");
        if (projectsSubmenu) projectsSubmenu.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        if (projectsToggle) projectsToggle.setAttribute("aria-expanded", "false");
      };

      if (menuToggle && navDropdown) {
        menuToggle.addEventListener("click", (event) => {
          event.stopPropagation();
          const isOpen = navDropdown.classList.toggle("open");
          menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
      }

      if (projectsToggle && projectsSubmenu) {
        projectsToggle.addEventListener("click", (event) => {
          event.stopPropagation();
          const isOpen = projectsSubmenu.classList.toggle("open");
          projectsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
      }

      document.addEventListener("click", (event) => {
        if (!event.target.closest(".site-nav")) closeMenus();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenus();
      });

      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const projectPages = [
        "lifecycle.html",
        "swan-mandala.html",
        "eragon-triptych.html",
        "octopuss-garden.html",
        "mandalas.html",
        "counting-book.html",
        "marys-peace.html",
        "library-portal.html",
        "friends.html",
        "wedding-portal.html",
        "baby-blankets.html",
        "other-fabric-projects.html",
        "other-mediums.html"
      ];

      navTarget.querySelectorAll("a[href]").forEach((link) => {
        if (link.getAttribute("href") === currentPage) link.classList.add("current");
      });

      if (projectPages.includes(currentPage) && projectsToggle) {
        projectsToggle.classList.add("current");
      }
    } catch (error) {
      console.error("Failed to load nav:", error);
    }
  }

  try {
    const footerResponse = await fetch("footer.html");
    if (footerResponse.ok) {
      const footerHtml = await footerResponse.text();
      document.body.insertAdjacentHTML("beforeend", footerHtml);
      const year = document.querySelector("[data-current-year]");
      if (year) year.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error("Failed to load footer:", error);
  }
});
