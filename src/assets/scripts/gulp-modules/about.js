// Клик по выбору типа иконок карты
const iconsElements = document.querySelectorAll('.js-icons-element');
iconsElements.forEach(elem => {
  elem.addEventListener('click', () => {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
    } else {
      iconsElements.forEach(elem => {
        elem.classList.remove('active');
      });
      elem.classList.add('active');
    }
  });
});
