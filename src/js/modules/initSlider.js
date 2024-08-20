import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import gsap from 'gsap';

function initSlider() {
    let activeIndex = 0;
    let prevIndex = 0;
    let nextIndex = 0;
    let slides = Array.from(document.querySelectorAll(".fullscreen-slider__slide")).sort((item1, item2) => item1.dataset.bg[item1.dataset.bg.length - 1] > item2.dataset.bg[item2.dataset.bg.length - 1])
    
    const mainSlider = new Swiper('.fullscreen-slider', {
        speed: 1300,
        parallax: true,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.fullscreen-slider__button_next',
            prevEl: '.fullscreen-slider__button_prev',
          },
        on: {
            slideChangeTransitionStart: function () {this.el.querySelector('.swiper-wrapper').style.transition = 'transform 1.3s cubic-bezier(1,.01,.81,.66)';},
            slideChangeTransitionEnd: function () {this.el.querySelector('.swiper-wrapper').style.transition = 'none';},
            slideNextTransitionStart: function() {
                activeIndex = (slides.length - 1 > activeIndex) ? activeIndex + 1 : 0;
                prevIndex = (0 <= activeIndex - 1) ? activeIndex - 1 : slides.length - 1;
                nextIndex = (slides.length - 1 >= activeIndex + 1) ? activeIndex + 1 : 0;

                const activeSlide = slides[activeIndex]
                const prevSlide = slides[prevIndex]
                const nextSlide = slides[nextIndex]

                const bgActive = document.getElementById(activeSlide.dataset.bg)
                const bgPrev = document.getElementById(prevSlide.dataset.bg)
                const bgNext = document.getElementById(nextSlide.dataset.bg)

                document.querySelectorAll(".fullscreen-slider__bg").forEach(bg => {
                    bg.classList.remove("fullscreen-slider__bg_act")
                    bg.classList.remove("fullscreen-slider__bg_prev")
                    bg.classList.remove("fullscreen-slider__bg_next")
                })

                bgActive.classList.add("fullscreen-slider__bg_act");
                bgNext.classList.add("fullscreen-slider__bg_next");
                bgPrev.classList.add("fullscreen-slider__bg_prev");

                gsap.set(bgActive.querySelectorAll(".fullscreen-slider__img"), {transform: "translateX(100%)"})
                gsap.to(bgActive.querySelector(".fullscreen-slider__img_top"), {transform: "translateX(0)", duration: 1.3, ease: "power4.in"})
                gsap.to(bgActive.querySelector(".fullscreen-slider__img_bottom"), {transform: "translateX(0)", duration: 1.5, ease: "power4.in"})

                gsap.set(bgPrev.querySelectorAll(".fullscreen-slider__img"), {transform: "translateX(100%)"})
                gsap.to(bgPrev.querySelector(".fullscreen-slider__img_top"), {transform: "translateX(0)", duration: 1.3, ease: "power4.in"})
                gsap.to(bgPrev.querySelector(".fullscreen-slider__img_bottom"), {transform: "translateX(0)", duration: 1.5, ease: "power4.in"})

                gsap.set(activeSlide, {transform: "translateX(100%)"})
                gsap.to(activeSlide, {transform: "translateX(0%)", duration: 1.3, delay: .3, ease: "power4.in"})
            },
            slidePrevTransitionStart: function() {
                const slides = Array.from(document.querySelectorAll(".fullscreen-slider__slide")).sort((item1, item2) => {
                    return parseInt(item1.dataset.index) - parseInt(item2.dataset.index)
                })

                activeIndex = (0 < activeIndex) ? activeIndex - 1 : slides.length - 1;
                prevIndex = (0 <= activeIndex - 1) ? activeIndex - 1 : slides.length - 1;
                nextIndex = (slides.length - 1 >= activeIndex + 1) ? activeIndex + 1 : 0;

                const activeSlide = slides[activeIndex]
                const prevSlide = slides[prevIndex]
                const nextSlide = slides[nextIndex]

                const bgActive = document.getElementById(activeSlide.dataset.bg)
                const bgPrev = document.getElementById(prevSlide.dataset.bg)
                const bgNext = document.getElementById(nextSlide.dataset.bg)

                document.querySelectorAll(".fullscreen-slider__bg").forEach(bg => {
                    bg.classList.remove("fullscreen-slider__bg_act")
                    bg.classList.remove("fullscreen-slider__bg_prev")
                    bg.classList.remove("fullscreen-slider__bg_next")
                })

                bgActive.classList.add("fullscreen-slider__bg_act");
                bgNext.classList.add("fullscreen-slider__bg_next");
                bgPrev.classList.add("fullscreen-slider__bg_prev");

                gsap.set(bgActive.querySelectorAll(".fullscreen-slider__img"), {transform: "translateX(-100%)"})
                gsap.to(bgActive.querySelector(".fullscreen-slider__img_top"), {transform: "translateX(0)", duration: 1.3, ease: "power4.in"})
                gsap.to(bgActive.querySelector(".fullscreen-slider__img_bottom"), {transform: "translateX(0)", duration: 1.5, ease: "power4.in"})

                gsap.set(bgNext.querySelectorAll(".fullscreen-slider__img"), {transform: "translateX(-100%)"})
                gsap.to(bgNext.querySelector(".fullscreen-slider__img_top"), {transform: "translateX(0)", duration: 1.3, ease: "power4.in"})
                gsap.to(bgNext.querySelector(".fullscreen-slider__img_bottom"), {transform: "translateX(0)", duration: 1.5, ease: "power4.in"})

                gsap.set(activeSlide, {transform: "translateX(-100%)"})
                gsap.to(activeSlide, {transform: "translateX(0%)", duration: 1.3, delay: .3, ease: "power4.in"})
            }
        },
    });
}

export default initSlider;