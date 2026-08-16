const slides = Array.from(document.querySelectorAll('.slider .list .item'));
const thumbnails = Array.from(document.querySelectorAll('.thumbnail .item'));
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const slider = document.querySelector('.slider');

let activeIndex = 0;
let rotationTimer;
const AUTO_ROTATE_MS = 30000;

function showSlide(index) {
  if (!slides.length) return;
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => slide.classList.toggle('active', i === activeIndex));
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === activeIndex);
    thumb.setAttribute('aria-pressed', i === activeIndex ? 'true' : 'false');
  });

  const currentThumb = thumbnails[activeIndex];
  if (currentThumb) currentThumb.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
}

function restartRotation() {
  window.clearInterval(rotationTimer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    rotationTimer = window.setInterval(() => showSlide(activeIndex + 1), AUTO_ROTATE_MS);
  }
}

nextButton?.addEventListener('click', () => { showSlide(activeIndex + 1); restartRotation(); });
prevButton?.addEventListener('click', () => { showSlide(activeIndex - 1); restartRotation(); });

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => { showSlide(index); restartRotation(); });
});

slider?.addEventListener('mouseenter', () => window.clearInterval(rotationTimer));
slider?.addEventListener('mouseleave', restartRotation);
slider?.addEventListener('focusin', () => window.clearInterval(rotationTimer));
slider?.addEventListener('focusout', restartRotation);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') { showSlide(activeIndex + 1); restartRotation(); }
  if (event.key === 'ArrowLeft') { showSlide(activeIndex - 1); restartRotation(); }
});

showSlide(0);
restartRotation();
