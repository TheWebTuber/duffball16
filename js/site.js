(() => {
  const MOBILE_MAX = 700;

  // Automatically update copyright year everywhere.
  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-mobile-nav]").forEach((header) => {
    const toggle = header.querySelector(".mobile-nav-toggle");
    const nav = header.querySelector(".topnav");
    const current = header.querySelector(".mobile-nav-current");
    const active = nav?.querySelector('[aria-current="page"]');

    if (!toggle || !nav) return;

    if (current && active) {
      current.textContent = active.textContent.trim();
    }

    const setOpen = (open) => {
      header.classList.toggle("mobile-nav-open", open);

      toggle.setAttribute("aria-expanded", String(open));

      toggle.setAttribute(
        "aria-label",
        open ? "Close website pages" : "Open website pages"
      );
    };

    toggle.addEventListener("click", () => {
      setOpen(!header.classList.contains("mobile-nav-open"));
    });

    nav.addEventListener("click", (event) => {
      if (
        event.target.closest("a") &&
        window.innerWidth <= MOBILE_MAX
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (
        window.innerWidth <= MOBILE_MAX &&
        header.classList.contains("mobile-nav-open") &&
        !header.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const wasOpen =
          header.classList.contains("mobile-nav-open");

        setOpen(false);

        if (wasOpen) {
          toggle.focus();
        }
      }
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > MOBILE_MAX) {
          setOpen(false);
        }
      },
      { passive: true }
    );
  });
})();