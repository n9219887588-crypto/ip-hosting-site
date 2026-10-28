const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('request');
const hint = document.getElementById('formHint');
const copyButton = document.getElementById('copyRequest');

function buildRequestText() {
  if (!form) return '';
  const data = new FormData(form);
  const value = (key, fallback = 'не указано') => String(data.get(key) || '').trim() || fallback;

  return [
    'Здравствуйте! Заявка с сайта «Командировка Сервис».',
    '',
    'Услуга: ' + value('service'),
    'Город: ' + value('city'),
    'Сроки: ' + value('dates'),
    'Количество людей: ' + value('people'),
    'Бюджет: ' + value('budget'),
    '',
    'Описание задачи:',
    value('details', 'без дополнительных комментариев')
  ].join('\n');
}

form?.addEventListener('submit', event => {
  event.preventDefault();
  const text = buildRequestText();
  const url = 'https://wa.me/79219887588?text=' + encodeURIComponent(text);
  window.open(url, '_blank', 'noopener,noreferrer');
  if (hint) hint.textContent = 'WhatsApp открыт с заполненной заявкой.';
});

copyButton?.addEventListener('click', async () => {
  const text = buildRequestText();
  try {
    await navigator.clipboard.writeText(text);
    if (hint) hint.textContent = 'Текст заявки скопирован в буфер обмена.';
  } catch {
    if (hint) hint.textContent = 'Не удалось скопировать автоматически. Вы можете отправить данные из формы по телефону или e-mail.';
  }
});