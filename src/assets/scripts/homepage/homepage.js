import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { intersectionObserver, throttle } from '../common/intersectionObserver';
import { fadeUpLines, splitToLines } from '../modules/effects/animationHelpers';
import clipPathEntry from '../modules/effects/clipPathEntry';

gsap.registerPlugin(ScrollTrigger);

{

  document.querySelector('[data-scroll-down]').addEventListener('click',function(evt){
    document.querySelector('.lavanda-park').scrollIntoView({ behavior: 'smooth' })
  });
  const animationItemSelectors = [
    // '.first-column__header',
    '.section-text:not(.first-column__text)',
    '.left-side__header',
    '.slider-section__header',
    '.third-column__text'
  ];

  animationItemSelectors.forEach(selector => {
    intersectionObserver(selector, () => {
      splitToLinesAndFadeUp(selector);
    });
  });

  function splitToLinesAndFadeUp(selector) {
    const elementRef = document.querySelector(selector);
    let mathM = elementRef.innerHTML.match(
      /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g,
    );
    if (mathM === null) return;
    mathM = mathM.map(el => `<span style="display:inline-flex"><span>${el}</span></span>`);
    elementRef.innerHTML = mathM.join(' ');
    gsap.set(elementRef, { overflow: 'hidden', opacity: 1 });
    gsap.set(elementRef.children, { overflow: 'hidden' });
    gsap.set(elementRef.querySelectorAll('span>span'), {
      overflow: 'initial',
      display: 'inline-block',
    });
    let tl = gsap
      .timeline()
      .fromTo(
        elementRef.querySelectorAll('span>span'),
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.05, duration: 1, ease: 'power4.out' },
      )
      .add(() => {
        // elementRef.innerHTML = elementRef.textContent;
      });
  }

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  let tl2 = gsap.timeline();
  tl2.to('#scrollingText', {
    x: 100,
    duration: 20,
    repeat: -1,
    ease: 'linear',
  });
  let tl = gsap.timeline();
  tl.to('#scrollingText', {
    xPercent: 30,
    scrollTrigger: {
      trigger: '.stocks-section',
      scrub: 1,
    },
  });

  // gsap.to(document.querySelectorAll('img'), {
  //   yPercent: 10,
  //   ease: 'none',
  //   scrollTrigger: {
  //     trigger: '.start-section',
  //     // start: "top bottom", // the default values
  //     // end: "bottom top",
  //     scrub: true,
  //   },
  // });

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
      navigation: {
        nextEl: '.slider-section-next',
        prevEl: '.slider-section-prev',
      },
      on: {
        init: (e) => {
          let { slides } = e;
          slides = slides.filter(el => !el.classList.contains('swiper-slide-duplicate'));
          document.querySelector('.slider-section .slider-section__all-slides').textContent = slides.length;
        },
        activeIndexChange: (e) => {
          document.querySelector('.slider-section .slider-section__curr-slide').textContent = e.realIndex + 1;
        }
      },
      breakpoints: {
        360: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 1.15,
          spaceBetween: 50,
        },
      },
    };

    const slider = new Swiper('.swiper', sliderConfig);

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
        // arrow.style.transform = `translate(${evt.clientX - 120}px, ${evt.offsetY}px)`;
        arrow.style.left = `${evt.clientX - 120}px`;
        arrow.style.top = `${evt.offsetY}px`;

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
  let prevIndex = 0;
  const swiper1 = new Swiper('.advantages-slider', {
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
    allowTouchMove: false,
    speed: 1250,
    on: {
      init: (e) => {
        let { slides } = e;
        slides = slides.filter(el => !el.classList.contains('swiper-slide-duplicate'));
        document.querySelector('.advantages-section .first-column__all-slides').textContent = slides.length;
      },
      beforeTransitionStart: (e) => {
        
        // console.log(e);
        // console.log(prevIndex, e.realIndex);
        // console.log((prevIndex < e.realIndex) ? 'next' : 'prev');
        
        // const direction = e.touches.startX > e.touches.currentX ? 'forward' : 'backward';
        // console.log(direction);
        // // debugger
        // const item = document.querySelector('.advantages-slider .swiper-slide-prev img');
        // item.style.transition = '.1s ease-out';
        // item.style.opacity = 0;
        // setTimeout(() => {
        //   item.style.opacity = 1;
        // }, 1000);
        // prevIndex = e.realIndex;

      },
      activeIndexChange: (e) => {
        // console.log(e);
        document.querySelector('.advantages-section .first-column__curr-slide').textContent = e.realIndex + 1;
      }
    },
    breakpoints: {
      1400: {
        autoHeight: true,
        slidesPerView: 1.75,
      },
      768: {
        initialSlide: 1,
        autoHeight: true,
        slidesPerView: 1.75,
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
      nextEl: '.advantages-slider-next',
      prevEl: '.advantages-slider-prev',
    },
    pagination: {
      el: '.second-column__nav-wrapper',
      clickable: true,
      type: 'progressbar',
    },
  });
  document.querySelector('.advantages-slider-next').addEventListener('click',function(evt){
    const item = document.querySelector('.advantages-slider .swiper-slide-prev img');
    item.style.transition = '.1s ease-out';
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.opacity = '';
    }, 1000);
  });
  document.querySelector('.advantages-slider-prev').addEventListener('click',function(evt){
    const item = document.querySelector('.advantages-slider .swiper-slide-active img');
    console.log(item);
    item.style.transition = '.2s ease-out';
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.opacity = '';
    }, 1000);
  });
  const swiper2 = new Swiper('.advantages-text-slider', {
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
    speed: 750,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
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
      nextEl: '.advantages-slider-next',
      prevEl: '.advantages-slider-prev',
    },
    on: {
      init: (e) => {
        e.slidesForAnimation = [];
        e.titlesForAnimation = [];
        document.querySelectorAll('.advantages-section .first-column__text.section-text').forEach(text => {
          splitToLines(text);
          e.slidesForAnimation.push(text);
          console.log(e);
        })
        document.querySelectorAll('.advantages-section .first-column__header').forEach(text => {
          splitToLines(text);
          e.titlesForAnimation.push(text);
          console.log(e);
        })
      },
      activeIndexChange: (e) => {
        if (!e.slidesForAnimation) return;
        const currentText = e.slidesForAnimation[e.activeIndex];
        const currentTitle = e.titlesForAnimation[e.activeIndex];
        if (!currentText) return;
        fadeUpLines(currentText);
        fadeUpLines(currentTitle);
      }
    }
  });
  // function fadeUpLines(element) {
  //   gsap
  //     .timeline()
  //     .fromTo(
  //       element.querySelectorAll('span>span'),
  //       { yPercent: 100 },
  //       { yPercent: 0, stagger: 0.05, duration: 1, ease: 'power2.out' },
  //     )
  //     .add(() => {
  //       // elementRef.innerHTML = elementRef.textContent;
  //     });
  // }
  // function splitToLines(selector) {
  //   const elementRef = typeof selector === 'string' ? document.querySelector(selector) : selector;
  //   let mathM = elementRef.innerHTML.match(
  //     /<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g,
  //   );
  //   if (mathM === null) return;
  //   mathM = mathM.map(el => `<span style="display:inline-flex"><span>${el}</span></span>`);
  //   elementRef.innerHTML = mathM.join(' ');
  //   gsap.set(elementRef, { overflow: 'hidden', opacity: 1 });
  //   gsap.set(elementRef.children, { overflow: 'hidden' });
  //   gsap.set(elementRef.querySelectorAll('span>span'), {
  //     overflow: 'initial',
  //     display: 'inline-block',
  //   });
  // }




  var init = false;

  let swiper3 = Swiper;

  function swiperMode() {
    let tablet = window.matchMedia('(max-width: 1024px)');
    let desktop = window.matchMedia('(min-width: 1025px)');

    // Enable (for mobile)
    if (desktop.matches) {
      if (!init) {
        init = true;
        swiper3 = new Swiper('.stocks-section-slider', {
          grabCursor: true,
          loop: true,
          keyboard: true,
          spaceBetween: 50,
          direction: 'vertical',
          mousewheel: true,
          // initialSlide: 0,
          preloadImages: false,
          lazy: true,
          height: 620,
          centeredSlides: false,
          watchSlidesVisibility: true,
          speed: 300,
          breakpoints: {
            1024: {
              autoHeight: true,
              slidesPerView: 1,
            },
            768: {
              initialSlide: 1,
              slidesPerView: 2,
              loop: false,
              autoHeight: false,
            },
            360: {
              spaceBetween: 0,
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 50,
              loop: false,
              autoHeight: false,
            },
          },
          simulateTouch: true,
        });
      }
      return;
    }

    // Disable (for tablet)
    if (tablet.matches) {
      init = false;
    }
  }

  intersectionObserver('.lavanda-park', () => {

    const digits = document.querySelectorAll('.lavanda-park [data-count]');
    digits.forEach(digitForAnim => {
      const isDigitInteger = Number.isInteger(+digitForAnim.dataset.count);
      gsap.fromTo(digitForAnim, {
        textContent: 0,
      },{
        textContent: (e, target) => {
          console.log(target);
          return target.dataset.count;
        },
        duration: 4,
        ease: 'power1.out',
        snap: { textContent: isDigitInteger ? 1 : 0.1 },
        stagger: 0,
        // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      });
    })
    })
  /* On Load
   **************************************************************/
  window.addEventListener('load', function() {
    swiperMode();
  });

  /* On Resize
   **************************************************************/
  window.addEventListener('resize', function() {
    swiperMode();
  });

  calmPlaceAnimation();
  function calmPlaceAnimation() {
    gsap.set('.calm-place__img', { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' });
    intersectionObserver('.calm-place__header', () => {
      setTimeout(() => {
          gsap.timeline()
            .to(
              '.calm-place__img', 
              {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.8,
                stagger: 0.15,
                transformOrigin: 'center',
                clear: 'all',
                ease: 'expo.out'
              }
            )
            .fromTo(
              '.calm-place__img img', 
              {
                scale: 1.5
              },
              {
                scale: 1,
                duration: 2.25,
                stagger: 0.15,
                transformOrigin: 'center',
                clear: 'all',
                ease: 'expo.out'
              },
              '<'
            )
      }, 750);
    })
  }

  
  clipPathEntry('.slider-section img', document.body, {}, gsap);

  function screen1Animation() {
    const startClip = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
    const endClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%';
    const title = document.querySelector('.first-column__text');
    const text = document.querySelector('.first-column__header')
    splitToLines(title);
    splitToLines(text);

    gsap
      .set(
        title.querySelectorAll('span>span'),
        { yPercent: 100 }
      )
    gsap
      .set(
        text.querySelectorAll('span>span'),
        { yPercent: 100 }
      )
    gsap.timeline()
      .add(() => {
        window.dispatchEvent(new Event('preloader-off'))
      })
      .fromTo(
        '.second-column__img, .third-column__img', 
        { clipPath: startClip, webkitClipPath: startClip },
        { 
          clipPath: endClip, 
          webkitClipPath: endClip, 
          duration: 2.25, 
          delay: 0.5,
          ease: 'power4.out', 
          clearProps: 'transform',
        }
      )
      .from('.first-column__btn-link', {
          autoAlpha: 0,
          y: 50
        },
        '<'
      )
      .add(() => {
        fadeUpLines(title);
        fadeUpLines(text);
      }, '<')
  }
  screen1Animation();
}

