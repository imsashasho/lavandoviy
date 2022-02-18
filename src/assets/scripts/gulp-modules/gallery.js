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

// const sliderConfigBottom = {
//   speed: 400,
//   autoHeight: true,
//   slidesPerView: 'auto',
//   freeMode: true,
//   adaptiveHeight: true,
//   allowTouchMove: true,
// };

const swiperGallery = new Swiper('.swiper-gallery', sliderConfig);
const $customCursor = $('.js-slider-controller');

// const swiperGalleryBottom = new Swiper('.swiper-gallery-bottom', sliderConfigBottom);

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
// function stopMoveInCursor(e) {
//   e.stopPropagation();
//   $customCursor.removeClass('active');
//   document.onmousemove = null;
// }

function sideSwitchArrow(opts, arrowArgs, conArgs) {
  const isMobile = window.matchMedia('(max-width:1024px)').matches;
  const arrow = arrowArgs;
  const container = conArgs;
  const mediumCordValue = document.documentElement.clientWidth / 2;
  // document.body.append(arrow);
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

  /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
  /** ms ---> main-screen */

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

  // eslint-disable-next-line no-unused-vars
}
