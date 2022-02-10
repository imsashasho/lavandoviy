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
