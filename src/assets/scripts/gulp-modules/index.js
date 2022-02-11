// Реализация кнопки "Вверх" в футере
const footerToTop = document.querySelector('.footer-to-top');
footerToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Вызов меню
const menuBtn = document.querySelector('.header-btn-menu');
const menu = document.querySelector('.menu');
const body = document.querySelector('body');
const menuCloseBtn = document.querySelector('.js-menu-close');

menuBtn.addEventListener('click', () => {
  menu.classList.add('active');
  body.classList.add('disabled-scroll');
});

menuCloseBtn.addEventListener('click', () => {
  menu.classList.remove('active');
  body.classList.remove('disabled-scroll');
});

// Вызов колл-пейджа
const call = document.querySelector('.call');
const btnsCall = document.querySelectorAll('.js-btn-call');

btnsCall.forEach(btn => {
  btn.addEventListener('click', () => {
    call.classList.add('active');
    body.classList.add('disabled-scroll');
  });
});

// Отправить форму колл-пейджа
const submitCall = document.querySelector('.js-call-submit');
const callBlock = document.querySelector('.call-block');
const callThanksBlock = document.querySelector('.call-thanks-block');

submitCall.addEventListener('click', e => {
  e.preventDefault();
  callBlock.classList.add('hidden');
  callThanksBlock.classList.add('active');
  callThanksBlock.classList.remove('hidden');
});

// Закрытие колл-пейджа
const callCloseBtn = document.querySelector('.js-call-close');
const callThanksCloseBtn = document.querySelector('.js-call-thanks-close');

callCloseBtn.addEventListener('click', () => {
  call.classList.remove('active');
  body.classList.remove('disabled-scroll');
});

callThanksCloseBtn.addEventListener('click', () => {
  call.classList.remove('active');
  body.classList.remove('disabled-scroll');

  setTimeout(() => {
    callBlock.classList.remove('hidden');
    callThanksBlock.classList.add('hidden');
    callThanksBlock.classList.remove('active');
  }, 500);
});
