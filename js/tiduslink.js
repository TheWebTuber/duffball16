const year = document.querySelector('[data-year]');
const toast = document.querySelector('[data-toast]');
const copyStatus = document.querySelector('[data-copy-status]');
if (year) year.textContent = new Date().getFullYear();

let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

async function copyText(value) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      const field = document.createElement('textarea');
      field.value = value;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    showToast(`Copied: ${value}`);
    if (copyStatus) copyStatus.textContent = `Copied: ${value}`;
    return true;
  } catch {
    showToast(`Copy manually: ${value}`);
    if (copyStatus) copyStatus.textContent = `Copy manually: ${value}`;
    return false;
  }
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const originalLabel = button.textContent;
    const copied = await copyText(button.dataset.copy);

    if (button.classList.contains('command-copy')) {
      button.textContent = copied ? 'Copied!' : 'Copy manually';
      button.classList.toggle('is-copied', copied);
      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.classList.remove('is-copied');
      }, 1800);
    }
  });
});
