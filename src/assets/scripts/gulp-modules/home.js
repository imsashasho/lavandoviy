document.addEventListener('DOMContentLoaded', () => {
  // Движение кастомного курсора по слайдеру
  const $slider = $('.js-slider');
  $slider.on('mouseover', startMoveInCursor);
  $slider.on('mouseout', stopMoveInCursor);
  // const $customCursor = $('.js-slider-controller');
  let slider = null;

  const sliderConfig = {
    speed: 400,
    // autoHeight: true,
    autoHeight: false,
    slidesPerView: 1.15,
    freeMode: true,
    adaptiveHeight: true,
    allowTouchMove: true,
  };

  // slider = new Swiper($('.js-slider')[0], sliderConfig);
  slider = new Swiper('.swiper', sliderConfig);

  function startMoveInCursor(e) {
    // e.stopPropagation();

    // const maxOffsetTop = $(container)
    //   .find('.swiper-slide img')[0]
    //   .getBoundingClientRect().height;

    // customCursor.css({ opacity: 1, display: 'flex', width: '150px', height: '150px' });
    // $customCursor.css({ left: `${e.offsetX}px`, top: `${e.offsetY}px` });
    // $customCursor.addClass('active');

    document.onmousemove = function(e) {
      // $customCursor.css({ left: `${e.offsetX}px`, top: `${e.offsetY}px` });
      // $customCursor.addClass('active');
      // currentCordX = e.clientX;
    };
  }

  function stopMoveInCursor(e) {
    e.stopPropagation();
    // $customCursor.removeClass('active');
    document.onmousemove = null;
  }

  // Заполнение повторяющегося текста в секции Акции
  const stocksTextWrapper = document.querySelector('.js-stocks-text-wrapper');
  const stocksText = document.querySelector('.js-stocks-text');
  let insertTimes = parseInt(getWidth(stocksTextWrapper) / getWidth(stocksText));

  function getWidth(elem) {
    return elem.getBoundingClientRect().width;
  }

  function insertText() {
    for (let i = 0; i < insertTimes; i++) {
      stocksTextWrapper.innerHTML += stocksTextWrapper.innerHTML;
    }
  }

  insertText();

  // ИЗ-ЗА ЭТОЙ СТРОЧКИ ТОРМОЗИТ АДАПТИВ
  window.addEventListener('resize', insertText);
});
