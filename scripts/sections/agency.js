import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { AnimateText } from "../utils/animations";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger, SplitText);

// LINE TEXT

for (let i = 0; i < 30; i++) {
  var text = "<span>- Only the best ones please &nbsp;</span>";
  $(".ribbon").append(text);
}

for (let i = 0; i < 30; i++) {
  var text = "<span>- Seulement vos meilleures svp &nbsp;</span>";
  $(".ribbon.fr").append(text);
}

// LINE APPEARANCE

$(document).ready(function () {
  if ($(window).width() > 992) {
    $(".ideas").hover(
      function () {
        $(".ribbon").css("width", "205%");
      },
      function () {
        $(".ribbon").css("width", "0%");
      }
    );
  }
});

gsap.from(".vision .mask", {
  scrollTrigger: {
    trigger: ".vision",
    start: "top bottom",
    end: "30% center",
    scrub: true,
    toggleActions: "start restart pause pause",
  },
  y: +40,
});

gsap.from(".vision .mask img", {
  scrollTrigger: {
    trigger: ".vision",
    start: "10% bottom",
    end: "75% bottom",
    scrub: true,
    toggleActions: "start restart none none",
  },
  ease: "power1.out",
  width: "130%",
  height: "130%",
});

//TEXT ANIMATIONS

AnimateText(".intro .section__name", ".intro", "20% bottom");
AnimateText(".intro .top", ".intro", "50% bottom");
AnimateText(".intro .bottom", ".intro", "90% bottom");

AnimateText(".vision .you", ".vision", "30% bottom");
AnimateText(".vision .we", ".vision", "90% bottom");

gsap.to(".vision .you .bright", {
  scrollTrigger: {
    trigger: ".vision",
    start: "30% bottom",
  },
  color: "rgb(250, 225, 90, 1)",
  duration: 1,
  delay: 0.5,
});

gsap.to(".vision .we .creative", {
  scrollTrigger: {
    trigger: ".vision",
    start: "30% bottom",
  },
  fontVariationSettings: '"wght" 700, "wdth" 100',
  duration: 2,
  delay: 0.5,
  ease: "none",
});

gsap.to(".vision .we .simple", {
  scrollTrigger: {
    trigger: ".vision",
    start: "30% bottom",
  },
  fontVariationSettings: '"wght" 100, "wdth" 100',
  duration: 2,
  delay: 0.5,
  ease: "none",
});
gsap.to(".vision .we .open-minded", {
  scrollTrigger: {
    trigger: ".vision",
    start: "30% bottom",
  },
  fontVariationSettings: '"wght" 900, "wdth" 200',
  duration: 2,
  delay: 0.5,
  ease: "none",
});

//SPLIT TEXT ANIMATION

function setupSplits() {
  const targets = gsap.utils.toArray("#about-text");
  targets.forEach((target) => {
    let SplitClient = new SplitText(target, { type: "chars, words" });
    let chars = SplitClient.chars;
    gsap.from(chars, {
      duration: 2,
      opacity: 0.1,
      ease: "none",
      stagger: 0.2,
      scrollTrigger: {
        trigger: target,
        start: "top 75%",
        end: "bottom center",
        scrub: true,
      },
    });
  });
}

setupSplits();

$(document).ready(function () {
  if ($(window).width() > 992) {
    $(".innovation").hover(
      function () {
        $(this).css("color", "var(--orange-light)");
        $(this).css("border-color", "var(--orange-light)");
        $(".innovation-stars").css("display", "block");
      },
      function () {
        $(this).css("color", "var(--black)");
        $(this).css("border-color", "var(--black)");
        $(".innovation-stars").css("display", "none");
      }
    );

    $(".entrepreuneurship").hover(
      function () {
        $(this).css("color", "var(--green-medium)");
        $(this).css("border-color", "var(--green-medium)");
      },
      function () {
        $(this).css("color", "var(--black)");
        $(this).css("border-color", "var(--black)");
      }
    );
  }
});
