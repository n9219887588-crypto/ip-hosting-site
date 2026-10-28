const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('requestForm');
const hint = document.getElementById('formHint');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const service = data.get('service') || 'Не указано';
  const city = data.get('city') || 'Не указан';
  const dates = data.get('dates') || 'Не указаны';
  const details = data.get('details') || 'Без дополнительных комментариев';

  const text = [
    'Заявка с сайта',
    '',
    'Услуга: ' + service,
    'Город: ' + city,
    'Сроки: ' + dates,
    'Описание: ' + details
  ].join('\n');

  try {
    await navigator.clipboard.writeText(text);
    hint.textContent = 'Готово: текст заявки скопирован в буфер обмена.';
  } catch {
    hint.textContent = 'Заявка сформирована. Скопируйте данные из формы и отправьте по контактам компании.';
  }
});
