function animateCursor() {
    const $cursor = createCursor();
    document.body.append($cursor);

    document.addEventListener("mousemove", mousemoveCursorHandler);
    document.addEventListener("mouseover", mouseoverLinkHandler);
    document.addEventListener("mouseout", mouseoutLinkHandler);
    document.addEventListener("mousedown", mouseDownCursorHandler);
    document.addEventListener("mouseup", mouseUpCursorHandler);

    // события входа и выхода с пределов документа
    document.addEventListener("mouseenter", mouseenterDocumentHandler);
    document.addEventListener("mouseleave", mouseleaveDocumentHandler);

    let $currentElem = null;
    function mouseoverLinkHandler(event) {
        if ($currentElem) return;
    
        if (event.target.closest("[data-cursor='cursorScale']")) {
            const $target = event.target.closest("[data-cursor='cursorScale']");
            $currentElem = $target;
            $cursor.classList.add("cursor_scale");
        }
        else if (event.target.closest("[data-cursor='cursorArrowPrev']")) {
            const $target = event.target.closest("[data-cursor='cursorArrowPrev']");
            $currentElem = $target;
            $cursor.classList.add("cursor_arrow-prev");
        }
        else if (event.target.closest("[data-cursor='cursorArrowNext']")) {
            const $target = event.target.closest("[data-cursor='cursorArrowNext']");
            $currentElem = $target;
            $cursor.classList.add("cursor_arrow-next");
        }

        return;
    }
    function mouseoutLinkHandler(event) {
        if (!$currentElem) return;

        let $relatedTarget = event.relatedTarget;

        while($relatedTarget) {
            if ($relatedTarget === $currentElem) return;
            $relatedTarget = $relatedTarget.parentElement;
        }

        $currentElem = null;

        $cursor.classList.remove("cursor_scale");
        $cursor.classList.remove("cursor_arrow-prev");
        $cursor.classList.remove("cursor_arrow-next");
    }
    function mousemoveCursorHandler(event) {
        const cursorProperties = {
            currentPosX: event.x - $cursor.offsetWidth / 2,
            currentPosY: event.y - $cursor.offsetHeight / 2,
            width: $cursor.offsetWidth,
            height: $cursor.offsetHeight,
            centerX: $cursor.offsetWidth / 2,
            centerY: $cursor.offsetHeight / 2,
        }

        if (event.target.closest("[data-cursor-effect='cursorGravity']")) {
            const $target = event.target.closest("[data-cursor-effect='cursorGravity']");
            const targetProperties = {
                left: $target.getBoundingClientRect().left,
                top: $target.getBoundingClientRect().top,
                width: $target.offsetWidth,
                height: $target.offsetHeight,
                centerX: $target.offsetWidth / 2,
                centerY: $target.offsetHeight / 2,
            }

            const offsetXTargetCenter = (targetProperties.left + targetProperties.centerX - event.x) / 2;
            const offsetYTargetCenter = (targetProperties.top + targetProperties.centerY - event.y) / 2;

            $cursor.animate({left: `${cursorProperties.currentPosX + offsetXTargetCenter}px`, top: `${cursorProperties.currentPosY + offsetYTargetCenter}px`}, {duration: 2400, fill: "forwards"});
        }
        else $cursor.animate({left: `${cursorProperties.currentPosX}px`, top: `${cursorProperties.currentPosY}px`}, {duration: 1200, fill: "forwards"});
    }
    function mouseDownCursorHandler() {
        $cursor.classList.add("cursor_active");
    }
    function mouseUpCursorHandler() {
        $cursor.classList.remove("cursor_active");
    }

    // обработчики входа и выхода с пределов документа
    function mouseenterDocumentHandler() {
        $cursor.classList.remove("cursor_hidden");
    }
    function mouseleaveDocumentHandler() {
        $cursor.classList.add("cursor_hidden");
    }

    function createCursor() {
        const $cursor = document.createElement("div");
        $cursor.className = "cursor";
        const $circle = document.createElement("span");
        $circle.className = "cursor__circle";

        $cursor.append($circle);

        for (let i = 0; i < 4; i++) {
            const $line = document.createElement("span");
            $line.className = "cursor__line";
            $cursor.append($line);
        }

        return $cursor;
    }
}

export default animateCursor;