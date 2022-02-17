// Инициализация rangeSlider
$('.js-range-slider').ionRangeSlider({
  type: 'single',
  min: 0,
  max: 100,
});

// Реализация появляющегося purple block
$('.js-filter-text').on('click', event => {
  $(event.target)
    .siblings('.purple-block')
    .toggleClass('active');
});

$('.js-purple-close').on('click', event => {
  $(event.target)
    .closest('.purple-block')
    .removeClass('active');
});

// Вызов поп-апа
const progressCards = document.querySelectorAll('.progress-card');
const progressPopUp = document.querySelector('.progress-pop-up');
const closeProgressBtn = document.querySelector('.js-close-progress-pop-up');

progressCards.forEach(card => {
  card.addEventListener('click', () => {
    progressPopUp.classList.add('active');
    body.classList.add('disabled-scroll');
  });
});

closeProgressBtn.addEventListener('click', () => {
  progressPopUp.classList.remove('active');
  body.classList.remove('disabled-scroll');
});

// Инициализация слайдера в поп-апе
const sliderConfigTop = {
  speed: 400,
  autoHeight: true,
  slidesPerView: 1,
  freeMode: true,
  adaptiveHeight: true,
  allowTouchMove: true,
};

const swiperProgress = new Swiper('.pop-up__slider', sliderConfigTop);
