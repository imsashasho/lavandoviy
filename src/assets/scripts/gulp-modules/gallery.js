// Инициализируем слайдер
const sliderConfig = {
  speed: 400,
  // autoHeight: true,
  autoHeight: false,
  slidesPerView: 1,
  freeMode: true,
  adaptiveHeight: true,
  allowTouchMove: true,
};

const swiper = new Swiper('.swiper', sliderConfig);
