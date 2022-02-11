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
    .addClass('active');
});

$('.js-purple-close').on('click', event => {
  $(event.target)
    .closest('.purple-block')
    .removeClass('active');
});
