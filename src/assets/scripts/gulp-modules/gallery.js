// Инициализируем слайдер
const sliderConfigTop = {
  speed: 400,
  autoHeight: true,
  slidesPerView: 1,
  freeMode: true,
  adaptiveHeight: true,
  allowTouchMove: true,
};

const sliderConfigBottom = {
  speed: 400,
  autoHeight: true,
  slidesPerView: 'auto',
  freeMode: true,
  adaptiveHeight: true,
  allowTouchMove: true,
};

const swiperGalleryTop = new Swiper('.swiper-gallery-top', sliderConfigTop);

const swiperGalleryBottom = new Swiper('.swiper-gallery-bottom', sliderConfigBottom);

// Вызов поп-апа
const galleryFigures = document.querySelectorAll('.gallery__figure');
const galleryPopUp = document.querySelector('.gallery-pop-up');
const closePopUp = document.querySelector('.js-close-pop-up');

galleryFigures.forEach(figure => {
  figure.addEventListener('click', () => {
    galleryPopUp.classList.add('active');
    body.classList.add('disabled-scroll');
  });
});

closePopUp.addEventListener('click', () => {
  galleryPopUp.classList.remove('active');
  body.classList.remove('disabled-scroll');
});
