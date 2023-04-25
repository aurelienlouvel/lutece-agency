import $ from "jquery";
import gsap from "gsap";
import { SlowMo } from "gsap/EasePack";
gsap.registerPlugin(SlowMo);

// $(window).on("load", function () {
$("body").delay(3000).css({ overflow: "visible" });
gsap.to(".loader", {
  duration: 0.8,
  top: "-100%",
  ease: "sine.inOut",
  delay: 3,
});
gsap.utils.toArray(".frame path").forEach(function (el, i) {
  gsap.set(el, { y: "100vh" });
  gsap.to(el, {
    duration: 2,
    ease: "slow(0.7,0.7, false)",
    y: "-100vh",
  });
});

// gsap.to(".frame path:nth-child(2)", { duration: 2, ease: "slow(0.9, 0.9, false)", y: "-100vh"});
// gsap.to(".frame path:nth-child(3)", { duration: 3, ease: "slow(0.9, 0.9, false)", y: "-100vh"});
// gsap.to(".frame path:nth-child(4)", { duration: 2, ease: "slow(0.9, 0.9, false)", y: "-100vh"});
// gsap.to(".frame path:nth-child(5)", { duration: 3, ease: "slow(0.9, 0.9, false)", y: "-100vh"});
// gsap.to(".frame path:nth-child(6)", { duration: 2, ease: "slow(0.9, 0.9, false)", y: "-100vh"});
// gsap.to(".frame path:nth-child(7)", { duration: 3, ease: "slow(0.9, 0.9, false)", y: "-100vh"});
// });
