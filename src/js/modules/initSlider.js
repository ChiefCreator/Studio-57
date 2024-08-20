import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import gsap from 'gsap';

function initSlider() {
    let activeIndex = 0;
    
    const mainSlider = new Swiper('.fullscreen-slider', {
        speed: 2000,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.fullscreen-slider__button_next',
            prevEl: '.fullscreen-slider__button_prev',
          },
        on: {
            slideChangeTransitionStart: function() {this.el.querySelector('.swiper-wrapper').style.transition = 'transform 2s linear( 0, 0.0012 14.95%, 0.0089 22.36%, 0.0297 28.43%, 0.0668 33.43%, 0.0979 36.08%, 0.1363 38.55%, 0.2373 43.07%, 0.3675 47.01%, 0.5984 52.15%, 0.7121 55.23%, 0.8192 59.21%, 0.898 63.62%, 0.9297 66.23%, 0.9546 69.06%, 0.9733 72.17%, 0.9864 75.67%, 0.9982 83.73%, 1 )'},
            slideChangeTransitionEnd: function() {this.el.querySelector('.swiper-wrapper').style.transition = 'none'},
            slideNextTransitionStart: () => changeSlide("next"),
            slidePrevTransitionStart: () => changeSlide("prev"),
        }
    });

    function changeSlide(direction) {
        const slides = Array.from(document.querySelectorAll(".fullscreen-slider__slide")).sort((item1, item2) => parseInt(item1.dataset.index) - parseInt(item2.dataset.index));

        activeIndex = direction === 'next' ? (activeIndex + 1) % slides.length : (activeIndex - 1 + slides.length) % slides.length;
        const prevIndex = (0 <= activeIndex - 1) ? activeIndex - 1 : slides.length - 1;
        const nextIndex = (slides.length - 1 >= activeIndex + 1) ? activeIndex + 1 : 0;

        const activeSlide = slides[activeIndex];
        const prevSlide = slides[prevIndex];
        const nextSlide = slides[nextIndex];

        const bgActive = document.getElementById(activeSlide.dataset.bg);
        const bgPrev = document.getElementById(prevSlide.dataset.bg);
        const bgNext = document.getElementById(nextSlide.dataset.bg);

        document.querySelectorAll(".fullscreen-slider__bg").forEach(bg => {
            bg.classList.remove("fullscreen-slider__bg_act");
            bg.classList.remove("fullscreen-slider__bg_prev");
            bg.classList.remove("fullscreen-slider__bg_next");
        })

        bgActive.classList.add("fullscreen-slider__bg_act");
        bgNext.classList.add("fullscreen-slider__bg_next");
        bgPrev.classList.add("fullscreen-slider__bg_prev");

        gsap.set(bgActive.querySelectorAll(".fullscreen-slider__img"), {transform: (direction === 'next') ? "translateX(100%)" : "translateX(-100%)", zIndex: 10});
        gsap.to(bgActive.querySelector(".fullscreen-slider__img_top"), {transform: "translateX(0)", duration: 2, ease: "power4.inOut"});
        gsap.to(bgActive.querySelector(".fullscreen-slider__img_bottom"), {transform: "translateX(0)", duration: 2.2, ease: "power4.inOut"});
        
        if (direction === "next") gsap.set(bgPrev.querySelectorAll(".fullscreen-slider__img"), {transform: "translateX(100%)", zIndex: 9});
        else gsap.set(bgNext.querySelectorAll(".fullscreen-slider__img"), {transform: "translateX(-100%)", zIndex:9});
        
        gsap.set(activeSlide, {transform: (direction === 'next') ? "translateX(100%)" : "translateX(-100%)"});
        gsap.to(activeSlide, {transform: "translateX(0%)", duration: 2, delay: .3, ease: "power4.inOut"});
    }
}

export default initSlider;