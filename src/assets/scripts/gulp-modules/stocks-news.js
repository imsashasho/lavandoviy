// Клик по кнопкам
const stocksNewsBtns = document.querySelectorAll('.js-stocks-news-btn');

stocksNewsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterValue = btn.dataset.filter;
    filterCards(filterValue);
    stocksNewsBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');
  });
});


function filterCards(filterValue) {
  console.log(filterValue);
  const cards  = document.querySelectorAll('.card-link[data-type]');
  if (!filterValue) {
    cards.forEach(card => card.style.display = '');
    return;
  }
  cards.forEach(card => {
    card.style.display = card.dataset.type === filterValue ? '' : 'none';
  })

}
