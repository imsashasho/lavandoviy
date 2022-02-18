document.addEventListener('DOMContentLoaded', () => {
  // Движение кастомного курсора по слайдеру
  // const $slider = $('.swiper');
  // const $slider = document.querySelector('.swiper');
  // $slider.addEventListener('mouseover', startMoveInCursor);
  // $slider.addEventListener('mouseout', stopMoveInCursor);
  // $slider.on('mouseover', startMoveInCursor);
  // $slider.on('mouseout', stopMoveInCursor);
  const $customCursor = $('.js-slider-controller');
  // let slider = null;

  const sliderConfig = {
    speed: 400,
    autoHeight: true,
    slidesPerView: 1.15,
    freeMode: true,
    adaptiveHeight: true,
    allowTouchMove: true,
  };

  slider = new Swiper('.swiper', sliderConfig);

  // function startMoveInCursor(e) {
  //   $customCursor.addClass('active');

  //   document.onmousemove = function(e) {
  //     $customCursor.css({ left: `${e.offsetX}px`, top: `${e.clientY}px` });
  //   };
  // }

  // function stopMoveInCursor(e) {
  //   e.stopPropagation();
  //   $customCursor.removeClass('active');
  //   document.onmousemove = null;
  // }

//   sideSwitchArrow(
//     {
//       onNext: () => {
//         slider.slideNext();
//       },
//       onPrev: () => {
//         slider.slidePrev();
//       },
//     },
//     $customCursor[0],
//     document.querySelector('.swiper-page-wrapper'),
//   );
//   // function stopMoveInCursor(e) {
//   //   e.stopPropagation();
//   //   $customCursor.removeClass('active');
//   //   document.onmousemove = null;
//   // }
// });

// function sideSwitchArrow(opts, arrowArgs, conArgs) {
//   const isMobile = window.matchMedia('(max-width:1024px)').matches;
//   const arrow = arrowArgs;
//   const container = conArgs;
//   const mediumCordValue = document.documentElement.clientWidth / 2;
//   document.body.append(arrow);
//   container.style.cursor = 'none';
//   arrow.style.cursor = 'none';
//   arrow.style.zIndex = 10;
//   arrow.__proto__.hide = function some() {
//     this.style.opacity = '0';
//     this.style.pointerEvents = 'none';
//   };
//   arrow.__proto__.show = function some() {
//     this.style.opacity = '1';
//     // this.style.pointerEvents = 'auto';
//   };
//   arrow.dataset.side = 'leftSide';
//   arrow.hide();

//   container.addEventListener('mousemove', desktopNavButtonHandler);
//   container.addEventListener('mouseenter', () => {
//     arrow.show();
//   });
//   container.addEventListener('mouseleave', () => {
//     arrow.hide();
//   });
//   if (document.documentElement.clientWidth < 1025) {
//     window.removeEventListener('mousemove', desktopNavButtonHandler);
//     arrow.remove();
//   }

//   /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
//   /** ms ---> main-screen */

//   function desktopNavButtonHandler(evt) {
//     // arrow.style.position = 'fixed';
//     // arrow.style.left = `${evt.clientX - 18}px`;
//     // arrow.style.top = `${evt.clientY - 18}px`;
//     arrow.style.transform = `translate(${evt.clientX - 18}px, ${evt.clientY - 18}px)`;
//     arrow.classList.add('active');
//     getCursorSide(evt.clientX);
//     handleArrowVisibility(evt);
//   }

//   function handleArrowVisibility() {}

//   function getCursorSide(x) {
//     if (x < mediumCordValue) {
//       arrow.classList.add('left-side');
//       arrow.dataset.side = 'leftSide';
//       // switchGallerySlide('leftSide');
//     } else {
//       arrow.classList.remove('left-side');
//       arrow.dataset.side = 'rightSide';
//       // switchGallerySlide('rightSide')
//     }
//   }
//   container.addEventListener('click', () => {
//     if (isMobile && !opts.notOnMobile) return;
//     switchGallerySlide(arrow.dataset.side);
//   });
//   const navigate = {
//     leftSide: () => {
//       opts.onPrev();
//     },
//     rightSide: () => {
//       opts.onNext();
//     },
//   };

//   function switchGallerySlide(side) {
//     navigate[side]();
//     return navigate.side;
//   }

//   // eslint-disable-next-line no-unused-vars
// }
