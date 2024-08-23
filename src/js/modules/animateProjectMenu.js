import gsap from 'gsap';

function animateProjectMenu() {
    const $menu = document.querySelector(".projects-menu");
    const $titleList = $menu.querySelector(".projects-menu__title-list");

    const titleListProperties = {
        offsetTop: $titleList.getBoundingClientRect().top - document.body.clientHeight * 2,
        height: $titleList.offsetHeight,
        hiddenHeight: $titleList.scrollHeight - $titleList.offsetHeight,
    }

    document.addEventListener("click", clickButtonOpenHandler);
    $titleList.addEventListener("mousemove", mousemoveHandler);
    const decoratedMouseoverTitleHandler = debounce(function(event) {mouseoverTitleHandler(event)}, 500);
    $menu.addEventListener("mouseover", decoratedMouseoverTitleHandler);
    $menu.addEventListener("mouseout", mouseoutTitleHandler);

    let $currentElem = null;
    function clickButtonOpenHandler(event) {
        event.preventDefault();
        if (event.target.closest(".projects-menu-button-open")) $menu.classList.add("projects-menu_active");
        if (event.target.closest(".projects-menu-button-close")) $menu.classList.remove("projects-menu_active");
    }
    function mousemoveHandler(event) {
        const cursorY = event.y - titleListProperties.offsetTop;
        const speed = titleListProperties.hiddenHeight / titleListProperties.height;
        $titleList.scrollTo(0, cursorY * speed);
    }
    function mouseoverTitleHandler(event) {
        if ($currentElem) return;
    
        if (event.target.closest(".project-menu-title")) {
            $currentElem = event.target.closest(".project-menu-title");
            const $prevElement = document.querySelector(".project-menu-title_active");

            $currentElem.classList.add("project-menu-title_active");
            if ($currentElem === $prevElement) return;
            $prevElement.classList.remove("project-menu-title_active");

            const $imgWrapper = $menu.querySelector($currentElem.dataset.img);
            const $prevImgWrapper = $menu.querySelector($prevElement.dataset.img);
            
            if (isImgLoaded($imgWrapper)) animateImage($imgWrapper, $prevImgWrapper);
            else {
                const imgSrc = $imgWrapper.dataset.src;
                const imagePromises = createArrayPromises($imgWrapper.querySelectorAll(".project-menu-img__img"), imgSrc);
                Promise.all(imagePromises).then(() => animateImage($imgWrapper, $prevImgWrapper));
            }
        }

        return;
    }
    function mouseoutTitleHandler(event) {
        if (!$currentElem) return;

        let $relatedTarget = event.relatedTarget;

        while($relatedTarget) {
            if ($relatedTarget === $currentElem) return;
            $relatedTarget = $relatedTarget.parentElement;
        }

        $currentElem = null;
    }
    function debounce(cb, delay = 500) {
        let timeout = null;
  
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => cb(...args), delay);
        }
    }
    function createArrayPromises(collection, imgSrc) {
        return Array.from(collection).map($img => {
            $img.src = imgSrc;
            return new Promise(resolve => $img.onload = resolve);
        })
    }
    function isImgLoaded($imgWrapper) {
        return Array.from($imgWrapper.children).filter($img => $img.getAttribute("src") !== "").length
    }
    function animateImage($imgWrapper, $prevImgWrapper) {
        document.querySelectorAll(".project-menu-img").forEach($imgWrapper => {
            $imgWrapper.classList.remove("project-menu-img_active");
            $imgWrapper.classList.remove("project-menu-img_prev");
        })

        $imgWrapper.classList.add("project-menu-img_active");
        $prevImgWrapper.classList.add("project-menu-img_prev");

        gsap.set($imgWrapper.querySelectorAll(".project-menu-img__img"), {transform: "translateY(100%)"});
        gsap.to($imgWrapper.querySelector(".project-menu-img__img_left"), {transform: "translateY(0)", duration: 2, ease: "power4.inOut"});
        gsap.to($imgWrapper.querySelector(".project-menu-img__img_right"), {transform: "translateY(0)", duration: 2.2, ease: "power4.inOut"});
    }
}

export default animateProjectMenu;