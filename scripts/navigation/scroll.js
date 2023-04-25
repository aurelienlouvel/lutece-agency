import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scroll = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 2,
  smoothTouch: true,
  effects: true,
  normalizeScroll: true,
});

export function StopScroll() {
  scroll.paused(true);
}

export function StartScroll() {
  scroll.paused(false);
}

// PAGE STRUCTURE

ScrollTrigger.create({
  trigger: "header",
  start: "top top",
  pin: true,
  pinSpacing: false,
});

gsap.set("footer", { yPercent: -100 });

ScrollTrigger.create({
  trigger: "footer",
  start: "top top",
  end: "100% top",
  pin: true,
  pinSpacing: false,
});

let footer = gsap.timeline({
  scrollTrigger: {
    trigger: "main",
    start: "bottom top",
    end: `+=${document.querySelector("footer .card .space").offsetHeight}`,
    scrub: true,
  },
  defaults: { ease: "none" },
});

footer.to("footer .card .content", {
  yPercent: 100,
});

//SCROLL TO

export function ScrollTo(element, position) {
  scroll.scrollTo(element, true, position);
}
export function ScrollUp() {
  scroll.scrollTo("header", true, "top top");
}

export function ScrollDown() {
  scroll.scrollTo("main", true, "top top");
}
