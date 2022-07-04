import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { fadeUpLines, splitToLines } from '../modules/effects/animationHelpers';
import clipPathEntry from '../modules/effects/clipPathEntry';

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
  `[data-span-fade-up], 
  .about__header,
  h3, 
  .about-headers,
  .philosophy__right-text,
  .philosophy__left-text,
  .describe__right-text,
  [data-split-fade-up], 
  .description__marker-text, 
  .describe__figcaption, 
  .infra__right-text, .charact__figcaption, .infra__subheader, .infra__element`,
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
  slidesPerView: 1.75,
  lazy: true,
  height: 600,
  centeredSlides: false,
  watchSlidesVisibility: true,
  speed: 300,
  breakpoints: {
    1400: {
      autoHeight: true,
      slidesPerView: 1.85,
    },
    768: {
      initialSlide: 1,
      autoHeight: true,
      slidesPerView: 1.85,
      centeredSlides: false,
    },
    360: {
      spaceBetween: 0,
      slidesPerView: 1,
      autoHeight: true,
      centeredSlides: false,
    },
  },
  on: {
    init: (e) => {
      let { slides } = e;
      slides = slides.filter(el => !el.classList.contains('swiper-slide-duplicate'));
      document.querySelector('.advantages__all-slides').textContent = slides.length;
      document.querySelector('.advantages__btn-wrapper-mobile .advantages__all-slides').textContent = slides.length;
    },
    activeIndexChange: (e) => {
      document.querySelector('.advantages__curr-slide').textContent = e.realIndex + 1;
      document.querySelector('.advantages__btn-wrapper-mobile .advantages__curr-slide').textContent = e.realIndex + 1;
    }
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
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
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
  on: {
    init: (e) => {
      e.slidesForAnimation = [];
      document.querySelectorAll('.advantages__content-wrapper .advantages__text').forEach(text => {
        splitToLines(text);
        e.slidesForAnimation.push(text);
      })
    },
    activeIndexChange: (e) => {
      if (!e.slidesForAnimation) return;
      const currentText = e.slidesForAnimation[e.activeIndex];
      if (!currentText) return;
      fadeUpLines(currentText, { duration: 0.5, stagger: 0.025 });

    }
  }
});

if (!window.matchMedia('(max-width: 575px)').matches) {
  // paralax('.describe__img_right', document.body, 100)
}
function paralax(selector, scroller, amplitude = 35) {
  // gsap.registerPlugin(ScrollTrigger)
  const paralaxImages = document.querySelectorAll(selector);
  paralaxImages.forEach((image) => {
     gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: '20% bottom',
        once: true,
        scroller: scroller ? scroller : null,
      }
    })
      // .to(curtain, { scaleY: 1, duration: 1,  ease: 'expo.out' })
      // .to(curtain, { scaleY: 0, duration: 1,  ease: 'expo.out', transformOrigin: '50% 0%' })
      .to(image, { autoAlpha: 1 }, '<')
    // .add(() => curtain.remove())
    gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: image,
        scrub: 0.5,
        scroller: scroller ? scroller : null,
        // markers: true,
      },
    })
      .fromTo(image, {
        y: amplitude,
      }, {
        y: amplitude * -1,
        ease: 'linear',
      });
  });
}


document.querySelectorAll(`.infra, .philosophy__img, .describe__img_left, .infra__img, .advantages`).forEach(el => {
  console.log(el);
  gsap.from(el, {
    autoAlpha: 0,
    y:50,
    scrollTrigger: {
      trigger: el,
      start: '0 bottom',
      end: '150px bottom',
      scrub: true,
    }
  })
})

clipPathEntry(`
  .philosophy__img, 
  .advantages-slider__item img,
  .describe__img_left,
  .infra__img
  `, 
  document.body, 
  {}, 
  gsap
);





function infraDropdownHandler() {
  if (window.matchMedia('(min-width: 576px)').matches) return;
  const $opener = document.querySelector('[data-infra-dropdown]');
  const openerHeight = $opener.getBoundingClientRect().height;
  const $dropdown = document.querySelector('.infra__map-icons-list');
  const dropdownHeight = $dropdown.getBoundingClientRect().height;
  let isOpened = true;
  $dropdown.dataset.opened = isOpened;
  $opener.addEventListener('click', () => {
    if (isOpened) {
      gsap.to($dropdown, { height: openerHeight })
      isOpened = false;
      $dropdown.dataset.opened = isOpened;
      return;
    }
    gsap.to($dropdown, { height: dropdownHeight });
    isOpened = true;
    $dropdown.dataset.opened = isOpened;
  })
}
infraDropdownHandler();