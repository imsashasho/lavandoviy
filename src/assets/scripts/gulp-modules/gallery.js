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

// Вставляем слайды в поп-ап
const swiperWrapper = document.querySelector('.swiper-wrapper');
const slidesContent = document.querySelector('.js-slides-content');

// Новые изображения слайдера и нижних слайдов вставляем сюда

let images = [
  './assets/images/gallery/slider/1.jpg',
  './assets/images/gallery/slider/2.jpg',
  './assets/images/gallery/slider/3.jpg',
  './assets/images/gallery/slider/4.jpg',
  './assets/images/gallery/slider/5.jpg',
  './assets/images/gallery/slider/6.jpg',
  './assets/images/gallery/slider/7.jpg',
];

images.forEach(img => {
  swiperWrapper.append(getSwiperSlide(img));
  slidesContent.append(getImage(img));
});

function getImage(img) {
  const image = document.createElement('img');
  image.className = 'slide-img';
  image.src = `${img}`;
  image.alt = 'Gallery slide img';
  return image;
}

function getSwiperSlide(img) {
  const div = document.createElement('div');
  div.className = 'swiper-slide swiper-gallery__slide';
  div.append(getImage(img));
  return div;
}

// Инициализируем слайдер
const sliderConfig = {
  speed: 400,
  autoHeight: true,
  slidesPerView: 1,
  freeMode: true,
  adaptiveHeight: true,
  allowTouchMove: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
};

const swiperGallery = new Swiper('.swiper-gallery', sliderConfig);
const $customCursor = $('.js-slider-controller');

// Реализация клика по слайдеру и кастомного курсора
sideSwitchArrow(
  {
    onNext: () => {
      swiperGallery.slideNext();
    },
    onPrev: () => {
      swiperGallery.slidePrev();
    },
  },
  $customCursor[0],
  document.querySelector('.js-slider-wrapper'),
);

function sideSwitchArrow(opts, arrowArgs, conArgs) {
  const isMobile = window.matchMedia('(max-width:1024px)').matches;
  const arrow = arrowArgs;
  const container = conArgs;
  const mediumCordValue = document.documentElement.clientWidth / 2;
  container.style.cursor = 'none';
  arrow.style.cursor = 'none';
  arrow.style.zIndex = 10;
  arrow.__proto__.hide = function some() {
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
  };
  arrow.__proto__.show = function some() {
    this.style.opacity = '1';
  };
  arrow.dataset.side = 'leftSide';
  arrow.hide();

  container.addEventListener('mousemove', desktopNavButtonHandler);
  container.addEventListener('mouseenter', () => {
    arrow.show();
    arrow.classList.add('active');
  });
  container.addEventListener('mouseleave', () => {
    arrow.hide();
    arrow.classList.remove('active');
  });
  if (document.documentElement.clientWidth < 1025) {
    window.removeEventListener('mousemove', desktopNavButtonHandler);
    arrow.remove();
  }

  function desktopNavButtonHandler(evt) {
    arrow.style.transform = `translate(${evt.clientX - 120}px, ${evt.offsetY}px)`;

    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);
  }

  function handleArrowVisibility() {}

  function getCursorSide(x) {
    if (x < mediumCordValue) {
      arrow.classList.add('left-side');
      arrow.dataset.side = 'leftSide';
    } else {
      arrow.classList.remove('left-side');
      arrow.dataset.side = 'rightSide';
    }
  }
  container.addEventListener('click', () => {
    if (isMobile && !opts.notOnMobile) return;
    switchGallerySlide(arrow.dataset.side);
  });
  const navigate = {
    leftSide: () => {
      opts.onPrev();
    },
    rightSide: () => {
      opts.onNext();
    },
  };

  function switchGallerySlide(side) {
    navigate[side]();
    return navigate.side;
  }
}
