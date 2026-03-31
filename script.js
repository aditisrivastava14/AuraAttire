(() => {

  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    const toggle = document.querySelector(".nav-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("page-ready");

    // mobile nav toggle
    const toggle = document.querySelector(".nav-toggle");
    toggle?.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;

      const navLink = t.closest(".nav-links a");
      if (navLink) closeMobileNav();
    });

    // scroll effect
    const root = document.documentElement;
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (y > 10) root.classList.add("is-scrolled");
      else root.classList.remove("is-scrolled");

      const parallax = Math.min(y * 0.25, 140);
      root.style.setProperty("--hero-parallax", `${parallax}px`);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // reveal animation
    const revealables = Array.from(
      document.querySelectorAll(".hero, .section, .card, .panel, .footer")
    );
    revealables.forEach((el) => el.classList.add("reveal-on-scroll"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.12 });

    revealables.forEach((el) => observer.observe(el));
  });

})();
