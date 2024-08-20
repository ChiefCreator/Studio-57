import gsap from "gsap";

function hoverLink() {
    const $links = document.querySelectorAll(".link");
    $links.forEach($link => {
        splitTitle($link);

        const timeline = gsap.timeline({paused: true});
        timeline.add(animateLetter($link, timeline));

        $link.addEventListener("mouseenter", () => {
            timeline.restart()
        }
        );
        $link.addEventListener("mouseleave", () => {
            timeline.reverse()
    });
    });

    function splitTitle($link) {
        const $linkWrapper = $link.firstElementChild;
        const title = $link.dataset.title;

        title.split(" ").forEach(word => {
            const $word = document.createElement("span");
            $word.classList.add("link__word");

            Array.from(word).forEach(letter => {
                const $letter = document.createElement("span");
                $letter.classList.add("link__letter");
                $letter.textContent = letter;
                $letter.dataset.letter = letter;
                $word.append($letter);
            })

            $linkWrapper.append($word);
        })
    }
    function animateLetter($link, timeline) {
        $link.querySelectorAll(".link__letter").forEach(item => timeline.add(gsap.to(item, {transform: `translate(0, -100%)`, duration: .5, ease: "power1.inOut"}), "<0.03"));
        return timeline;
    }
}

export default hoverLink;