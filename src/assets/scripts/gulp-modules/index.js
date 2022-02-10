// Реализация кнопки "Вверх" в футере
const footerToTop = document.querySelector('.footer-to-top');
footerToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
