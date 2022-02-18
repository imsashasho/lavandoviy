document.addEventListener('DOMContentLoaded', () => {
  // Движение кастомного курсора по слайдеру
  // const $slider = $('.js-slider');
  // $slider.on('mouseover', startMoveInCursor);
  // $slider.on('mouseout', stopMoveInCursor);
  const $customCursor = $('.js-slider-controller');
  // let slider = null;

  const sliderConfig = {
    speed: 400,
    // autoHeight: true,
    autoHeight: false,
    slidesPerView: 1.15,
    freeMode: true,
    adaptiveHeight: true,
    allowTouchMove: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
  };

  // slider = new Swiper($('.js-slider')[0], sliderConfig);
  slider = new Swiper('.swiper', sliderConfig);

  // function startMoveInCursor(e) {
  //   // e.stopPropagation();

  //   // const maxOffsetTop = $(container)
  //   //   .find('.swiper-slide img')[0]
  //   //   .getBoundingClientRect().height;

  //   // customCursor.css({ opacity: 1, display: 'flex', width: '150px', height: '150px' });
  //   // $customCursor.css({ left: `${e.offsetX}px`, top: `${e.offsetY}px` });
  //   // $customCursor.addClass('active');

  //   document.onmousemove = function(e) {
  //     // $customCursor.css({ left: `${e.offsetX}px`, top: `${e.offsetY}px` });
  //     // $customCursor.addClass('active');
  //     // currentCordX = e.clientX;
  //   };
  // }

  // function stopMoveInCursor(e) {
  //   e.stopPropagation();
  //   // $customCursor.removeClass('active');
  //   document.onmousemove = null;
  // }

  // Заполнение повторяющегося текста в секции Акции
  // const stocksTextWrapper = document.querySelector('.js-stocks-text-wrapper');
  // const stocksText = document.querySelector('.js-stocks-text');

  // stocksTextWrapper.width = getWidth(stocksTextWrapper);
  // stocksText.width = getWidth(stocksText);

  // // let clear;

  // function getWidth(elem) {
  //   return elem.getBoundingClientRect().width;
  // }

  // function insertText() {
  //   /* FIRST */
  //   // if (clear) {
  //   //   clearTimeout(clear);
  //   //   stocksTextWrapper.innerHTML = '';
  //   // }
  //   // clear = setTimeout(() => {
  //   //   let insertTimes = parseInt(getWidth(stocksTextWrapper) / getWidth(stocksText));
  //   //   for (let i = 0; i < insertTimes; i++) {
  //   //     stocksTextWrapper.innerHTML += stocksTextWrapper.innerHTML;
  //   //   }
  //   // }, 1);
  //   /* SECOND */
  //   // let stocksText = document.querySelector('.js-stocks-text');
  //   // let insertTimes = getWidth(stocksTextWrapper) / getWidth(stocksText);
  //   // console.log(getWidth(stocksTextWrapper), getWidth(stocksText));
  //   // for (let i = 0; i < insertTimes; i++) {
  //   //   stocksTextWrapper.innerHTML += stocksTextWrapper.innerHTML;
  //   // }
  //   /* THIRD */
  //   // stocksText = document.querySelector('.js-stocks-text');
  //   // let insertTimes = parseInt(getWidth(stocksTextWrapper) / getWidth(stocksText));
  //   // for (let i = 0; i < insertTimes; i++) {
  //   //   stocksTextWrapper.innerHTML += stocksTextWrapper.innerHTML;
  //   // }
  // }

  // insertText();

  // // ОСТОРОЖНО! ИЗ-ЗА ЭТОЙ СТРОЧКИ МОЖЕТ ТОРМОЗИТЬ АДАПТИВ
  // // window.addEventListener('resize', insertText);

  // class WideText {
  //   constructor(wrapper, text) {
  //     this.stocksTextWrapper = document.querySelector(wrapper);
  //     this.stocksTextWrapper.width = this.getWidth(this.stocksTextWrapper);
  //     this.stocksText = document.querySelector(text);
  //     this.stocksText.width = this.getWidth(this.stocksText);
  //   }

  //   getWidth(elem) {
  //     return elem.getBoundingClientRect().width;
  //   }
  // }

  // function insertText() {
  //   let textObj = new WideText('.js-stocks-text-wrapper', '.js-stocks-text');
  //   let insertTimes = parseInt(textObj.stocksTextWrapper.width / textObj.stocksText.width);
  // }

  // insertText();

  sideSwitchArrow(
    {
      onNext: () => {
        slider.slideNext();
      },
      onPrev: () => {
        slider.slidePrev();
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
      // arrow.style.transform = `translate(${evt.clientX - 18}px, ${evt.clientY - 18}px)`;
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
});
