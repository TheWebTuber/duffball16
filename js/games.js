// Paste the complete MC SMP website address between the quotes.
// Example: const SMP_WEBSITE_URL = "https://example.com";
const SMP_WEBSITE_URL = "https://duffball16.com/minecraft";

const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const revealItems = [...document.querySelectorAll(".reveal")];
const cards = [...document.querySelectorAll("[data-card]")];
const smpLinks = [...document.querySelectorAll("[data-smp-link]")];
const copyButton = document.querySelector("[data-copy-code]");
const toast = document.querySelector("[data-toast]");

if (year) year.textContent = new Date().getFullYear();

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -45px" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 75}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  });
});

let toastTimer;

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
};

const smpUrlIsReady =
  SMP_WEBSITE_URL.startsWith("https://") || SMP_WEBSITE_URL.startsWith("http://");

smpLinks.forEach((link) => {
  if (smpUrlIsReady) {
    link.href = SMP_WEBSITE_URL;
  } else {
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Add the MC SMP website URL on line 3 of script.js to activate this link.");
    });
  }
});

copyButton?.addEventListener("click", async () => {
  const code = "DUFFBALL16";

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code);
    } else {
      const field = document.createElement("textarea");
      field.value = code;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    showToast("Creator code copied: DUFFBALL16");
  } catch {
    showToast("Creator code: DUFFBALL16");
  }
});
