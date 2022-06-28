import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

const iconsElements = document.querySelectorAll('.js-icons-element');
iconsElements.forEach(elem => {
  elem.addEventListener('click', () => {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
    } else {
      iconsElements.forEach(elem => {
        elem.classList.remove('active');
      });
      elem.classList.add('active');
    }
  });
});

gsap.registerPlugin(ScrollTrigger);
splitToLinesAndFadeUp(
  '[data-span-fade-up], p, h3, [data-split-fade-up], .description__marker-text',
  document.body,
);
function splitToLinesAndFadeUp(selector, $scroller) {
  document.querySelectorAll(selector).forEach(text => {
    let mathM = text.innerHTML.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
    if (mathM === null) return;
    mathM = mathM.map(el => `<span style="display:inline-flex"><span>${el}</span></span>`);
    text.innerHTML = mathM.join(' ');
    gsap.set(text.children, { overflow: 'hidden' });
    gsap.set(text.querySelectorAll('span>span'), {
      overflow: 'initial',
      display: 'inline-block',
    });
    let tl = gsap
      .timeline({
        // paused: true,
        scrollTrigger: {
          scroller: $scroller ? $scroller : null,
          trigger: text,
          once: true,
        },
      })
      .fromTo(
        text.querySelectorAll('span>span'),
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.05, duration: 1, ease: 'power4.out' },
      )
      .add(() => {
        text.innerHTML = text.textContent;
      });

    // text.addEventListener('click',function(evt){
    //   tl.progress(0).play();
    // });
  });
}

const swiper1 = new Swiper('.about-slider', {
  grabCursor: true,
  loop: true,
  keyboard: true,
  spaceBetween: 50,
  // initialSlide: 0,
  preloadImages: false,
  lazy: true,
  height: 600,
  centeredSlides: false,
  watchSlidesVisibility: true,
  speed: 300,
  breakpoints: {
    1400: {
      autoHeight: true,
      slidesPerView: 2,
    },
    768: {
      initialSlide: 1,
      autoHeight: true,
      slidesPerView: 1,
      centeredSlides: false,
    },
    360: {
      spaceBetween: 0,
      slidesPerView: 1,
      autoHeight: true,
      centeredSlides: false,
    },
  },
  simulateTouch: true,
  navigation: {
    nextEl: '.about-slider-next',
    prevEl: '.about-slider-prev',
  },
  pagination: {
    el: '.advantages__nav-wrapper',
    clickable: true,
    type: 'progressbar',
  },
});

const swiper2 = new Swiper('.about-text-slider', {
  grabCursor: true,
  loop: true,
  keyboard: true,
  spaceBetween: 50,
  // initialSlide: 0,
  preloadImages: false,
  lazy: true,
  height: 600,
  centeredSlides: false,
  watchSlidesVisibility: true,
  speed: 300,
  breakpoints: {
    1400: {
      autoHeight: true,
      slidesPerView: 1,
      noSwiping: false,
    },
    768: {
      initialSlide: 1,
      autoHeight: true,
      slidesPerView: 1,
      centeredSlides: false,
      init: false,
    },
    360: {
      spaceBetween: 0,
      slidesPerView: 1,
      autoHeight: true,
      centeredSlides: false,
      init: false,
    },
  },
  simulateTouch: true,
  navigation: {
    nextEl: '.about-slider-next',
    prevEl: '.about-slider-prev',
  },
});
