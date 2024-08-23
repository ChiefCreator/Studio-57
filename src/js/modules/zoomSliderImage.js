import gsap from "gsap";

function zoomSliderImage() {
    const $slider = document.querySelector(".fullscreen-slider");

    let $currentElem = null;
    let $zoomBlock = null;
    const timeline = gsap.timeline({paused: true});

    $slider.addEventListener("mousemove", mousemoveZoomImageHandler);
    $slider.addEventListener("mouseover", mouseoverAppearText);
    $slider.addEventListener("mouseout", mouseoutAppearText);
  
    function mousemoveZoomImageHandler(event) {
        if (event.target.closest(".fullscreen-slider__slide")) {
            const $slide = event.target.closest(".fullscreen-slider__slide");
            const $zoomBlock = $slide.querySelector(".zoom-block");
            const $zoomBlockWrapper = $zoomBlock.querySelector(".zoom-block__img-wrapper");
            const $zoomBlockImg = $zoomBlock.querySelector(".zoom-block__img");
            
            const settings = {
                x: event.x,
                y: event.y,
                imgBlockWidth: $slide.offsetWidth,
                imgBlockHeight: $slide.offsetHeight,
                xPerc: event.x / $slide.offsetWidth * 100,
                yPerc: event.y / $slide.offsetHeight * 100,
            }

            $zoomBlockWrapper.animate({left: `${settings.x - settings.imgBlockWidth / 2}px`, top: `${settings.y - settings.imgBlockHeight / 2}px`}, {duration: 1200, fill: "forwards"});
            $zoomBlockImg.animate({objectPosition: `${settings.xPerc}% ${settings.yPerc}%`}, {duration: 1200, fill: "forwards"});
        }
    }
    function mouseoverAppearText(event) {
        if ($currentElem) return;
            if (event.target.closest(".zoom-block__event-arrea")) {
                const $slide = event.target.closest(".fullscreen-slider__slide");
                $zoomBlock = $slide.querySelector(".zoom-block");

                $currentElem = event.target.closest(".zoom-block__event-arrea");
                const $title = $zoomBlock.querySelector(".zoom-block__title");
                const $line = $zoomBlock.querySelector(".zoom-block__line");

                $zoomBlock.classList.add("zoom-block_active");

                timeline.clear();

                timeline
                    .fromTo($title, {transform: "translateY(100%)"}, {transform: "translateY(0)", duration: .5})
                    .fromTo($line, {width: "0"}, {width: "120%", duration: .5})

                timeline.play();
            }
    
    }
    function mouseoutAppearText(event) {
        if (!$currentElem) return;

        let $relatedTarget = event.relatedTarget;

        while($relatedTarget) {
            if ($relatedTarget === $currentElem) return;
            $relatedTarget = $relatedTarget.parentElement;
        }

        $zoomBlock.classList.remove("zoom-block_active");
        timeline.reverse();    
        $currentElem = null;
    }
}

export default zoomSliderImage;