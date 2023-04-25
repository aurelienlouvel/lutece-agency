import gsap from "gsap";

const $bigBall = document.querySelector(".cursor__ball--big");
const $smallBall = document.querySelector(".cursor__ball--small");
const $hoverables = document.querySelectorAll(".hoverable");

// Listeners
document.body.addEventListener("mousemove", onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener("mouseenter", onMouseHover);
  $hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
}

// Move the cursor

function onMouseMove(e) {
  gsap.to($bigBall, {
    duration: 0.4,
    x: e.x - 15,
    y: e.y - 15,
  });
  gsap.to($smallBall, {
    duration: 0.1,
    x: e.x - 5,
    y: e.y - 7,
  });
}

// Hover an element
export function onMouseHover() {
  gsap.to($bigBall, {
    duration: 0.3,
    scale: 4,
  });
}

export function onMouseHoverOut() {
  gsap.to($bigBall, {
    duration: 0.3,
    scale: 1,
  });
}
