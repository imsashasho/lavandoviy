
export default function clipPathEntry(selector, scroller, effectConfig = {}, gsap) {
    const startClip = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
    const endClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%';
    document.querySelectorAll(selector).forEach(text => {
        let tl = gsap
        .timeline({
            // paused: true,
            scrollTrigger: {
                trigger: text,
                scroller: scroller ? scroller : null,
                once: true,
            },
        })
        .fromTo(
            text,
            { clipPath: startClip, webkitClipPath: startClip },
            { 
                clipPath: endClip, 
                webkitClipPath: endClip, 
                duration: 2.25, 
                delay: 0.5,
                ease: 'power4.out', 
                clearProps: 'transform',
                ...effectConfig
            },
          );
      });
}