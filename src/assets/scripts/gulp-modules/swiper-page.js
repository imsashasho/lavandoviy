document.addEventListener('DOMContentLoaded', () => {
  // Движение кастомного курсора по слайдеру
  const $slider = $('.swiper');
  // const $slider = document.querySelector('.swiper');
  // $slider.addEventListener('mouseover', startMoveInCursor);
  // $slider.addEventListener('mouseout', stopMoveInCursor);
  $slider.on('mouseover', startMoveInCursor);
  $slider.on('mouseout', stopMoveInCursor);
  const $customCursor = $('.js-slider-controller');
  let slider = null;

  const sliderConfig = {
    speed: 400,
    autoHeight: true,
    slidesPerView: 1.15,
    freeMode: true,
    adaptiveHeight: true,
    allowTouchMove: true,
  };

  slider = new Swiper('.swiper', sliderConfig);

  function startMoveInCursor(e) {
    $customCursor.addClass('active');

    document.onmousemove = function(e) {
      $customCursor.css({ left: `${e.clientX}px`, top: `${e.clientY}px` });
    };
  }

  function stopMoveInCursor(e) {
    e.stopPropagation();
    $customCursor.removeClass('active');
    document.onmousemove = null;
  }

  // function stopMoveInCursor(e) {
  //   e.stopPropagation();
  //   $customCursor.removeClass('active');
  //   document.onmousemove = null;
  // }
});
