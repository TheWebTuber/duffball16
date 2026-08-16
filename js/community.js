document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.milestone-card');
  cards.forEach(card => {
    card.addEventListener('focusin', () => card.classList.add('is-focused'));
    card.addEventListener('focusout', () => card.classList.remove('is-focused'));
  });
});
