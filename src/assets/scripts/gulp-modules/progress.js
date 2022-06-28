// Инициализация rangeSlider

document.querySelectorAll('.js-range-slider').forEach(el => {
  const defaultValue = el.dataset.value;
  $(el).ionRangeSlider({
    type: 'single',
    min: 0,
    max: 100,
    from: +defaultValue
  });
  
})




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
const sliderConfig = {
  speed: 400,
  autoHeight: true,
  slidesPerView: 1,
  freeMode: true,
  spaceBetween: 50,
  centeredSlides: true,
  watchSlidesVisibility: true,
  adaptiveHeight: true,
  allowTouchMove: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
};

const swiperProgress = new Swiper('.pop-up__slider', sliderConfig);

// Переключение слайдер по клику
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

leftBtn.addEventListener('click', () => {
  swiperProgress.slidePrev();
});

rightBtn.addEventListener('click', () => {
  swiperProgress.slideNext();
});
