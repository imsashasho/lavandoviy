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
const callPage = document.querySelector('.call-page');
const body = document.querySelector('body');
const callPageCloseBtn = document.querySelector('.js-cp-close');

menuBtn.addEventListener('click', () => {
  callPage.classList.add('active');
  body.classList.add('disabled-scroll');
});

callPageCloseBtn.addEventListener('click', () => {
  callPage.classList.remove('active');
  body.classList.remove('disabled-scroll');
});
