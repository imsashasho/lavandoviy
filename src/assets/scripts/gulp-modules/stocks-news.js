// Клик по кнопкам
const stocksNewsBtns = document.querySelectorAll('.js-stocks-news-btn');

stocksNewsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    stocksNewsBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');
  });
});
