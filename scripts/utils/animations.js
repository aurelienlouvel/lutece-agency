import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function AnimateText(element, trigger, start, delay = 0) {
  const child = new SplitText(element, {
    type: "lines",
    linesClass: "split-child",
  });
  const parent = new SplitText(element, { linesClass: "split-parent" });

  gsap.from(child.lines, {
    scrollTrigger: {
      trigger: trigger,
      start: start,
    },
    duration: 1,
    delay: delay,
    yPercent: 100,
    ease: "power4",
    stagger: 0.1,
  });
}
