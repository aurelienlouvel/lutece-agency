import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//FOOTER CARD

let card_animation = gsap.timeline({ defaults: { ease: "Back.inOut(0.8)" } });

ScrollTrigger.create({
  animation: card_animation,
  trigger: "main",
  start: "bottom top",
  end: `+=${
    document.querySelector("footer .card .space").offsetHeight +
    document.querySelector("footer .bottom").offsetHeight
  }`,
  scrub: 1,
});

let orientation =
  (screen.orientation || {}).type ||
  screen.mozOrientation ||
  screen.msOrientation;

// portrait.addEventListener("change", function (e) {
//   if (e.matches) {
//     console.log("portrait");
//     // Portrait mode
//     card_animation
//       .fromTo(
//         "footer .card-scene",
//         { rotate: 0 },
//         {
//           top: "20%",
//           rotate: "0",
//           duration: 1.4,
//         }
//       )
//       .to("footer .card-scene", {
//         top: "10%",
//       });
//   } else {
//     // Landscape
//     console.log("landscape");
//     card_animation
//       .fromTo(
//         "footer .card-scene",
//         { rotate: -90 },
//         {
//           top: "20%",
//           rotate: "0",
//           duration: 1.4,
//         }
//       )
//       .to("footer .card-scene", {
//         top: "10%",
//       });
//   }
// });

card_animation
  .fromTo(
    "footer .card-scene",
    { rotate: -90 },
    {
      top: "20%",
      rotate: "0",
      duration: 1.4,
    }
  )
  .to("footer .card-scene", {
    top: "10%",
  });

//FLIP CARD

let flip_card = gsap.timeline({
  paused: true,
  defaults: { ease: "none" },
});

flip_card.to(".flip-card .inner", {
  rotateX: -180,
});

let flip_toogle = false;

document.querySelector(".flip-card").addEventListener("click", () => {
  if (flip_toogle) {
    flip_card.reverse();
    flip_toogle = false;
  } else {
    flip_card.play();
    flip_toogle = true;
  }
});
