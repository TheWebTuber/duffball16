const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll('.topnav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const copyButtons = [...document.querySelectorAll("[data-copy-code]")];
const copyStatus = document.querySelector("#copy-status");
const toast = document.querySelector("[data-toast]");
const year = document.querySelector("[data-year]");
const hero = document.querySelector("[data-hero]");
const leftCar = document.querySelector("[data-car-left]");
const rightCar = document.querySelector("[data-car-right]");
const tiltCard = document.querySelector("[data-tilt-card]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMenu = () => {
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", () => {
  const willOpen = !nav?.classList.contains("is-open");
  nav?.classList.toggle("is-open", willOpen);
  navToggle.setAttribute("aria-expanded", String(willOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -45px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-30% 0px -58%", threshold: 0 },
  );

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

let toastTimer;

const showCopiedState = () => {
  copyButtons.forEach((button) => {
    const label = button.querySelector("[data-copy-label]");
    if (label) label.textContent = "Copied!";
  });

  if (copyStatus) copyStatus.textContent = "Copied to your clipboard.";
  toast?.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    copyButtons.forEach((button) => {
      const label = button.querySelector("[data-copy-label]");
      if (label) label.textContent = "Copy code";
    });
    if (copyStatus) copyStatus.textContent = "";
    toast?.classList.remove("is-visible");
  }, 2600);
};

const fallbackCopy = (text) => {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
};

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const code = "DUFFBALL16";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else if (!fallbackCopy(code)) {
        throw new Error("Clipboard unavailable");
      }
      showCopiedState();
    } catch {
      if (copyStatus) copyStatus.textContent = `Copy this code: ${code}`;
      toast.textContent = `Copy this code: ${code}`;
      toast?.classList.add("is-visible");
    }
  });
});

const updateHeroMotion = (event) => {
  if (reduceMotion.matches || !hero) return;
  const bounds = hero.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  leftCar?.style.setProperty("--car-x", `${x * 15}px`);
  leftCar?.style.setProperty("--car-y", `${y * 10}px`);
  rightCar?.style.setProperty("--car-x", `${x * -15}px`);
  rightCar?.style.setProperty("--car-y", `${y * -10}px`);

  if (tiltCard) {
    tiltCard.style.transform = `perspective(1100px) rotateX(${y * -2.2}deg) rotateY(${x * 3}deg)`;
  }
};

hero?.addEventListener("pointermove", updateHeroMotion);
hero?.addEventListener("pointerleave", () => {
  leftCar?.style.setProperty("--car-x", "0px");
  leftCar?.style.setProperty("--car-y", "0px");
  rightCar?.style.setProperty("--car-x", "0px");
  rightCar?.style.setProperty("--car-y", "0px");
  if (tiltCard) tiltCard.style.transform = "";
});
