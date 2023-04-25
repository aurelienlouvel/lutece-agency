import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StopScroll, StartScroll, ScrollTo } from "../navigation/sscroll";

gsap.registerPlugin(ScrollTrigger);

//NAVIGATION

let menu_open = false;

const logo_button = document.querySelector("nav .logo");
const menu_button = document.querySelector(".menu .button");
const contact_button = document.querySelector("nav .contact");

menu_button.addEventListener("click", () => {
  if (menu_open) {
    StartScroll();
    CloseMenu();
    menu_open = false;
  } else {
    StopScroll();
    OpenMenu();
    menu_open = true;
  }
});

logo_button.addEventListener("click", () => {
  if (menu_open) {
    CloseMenu();
    menu_open = false;
  } else {
    console.log("clicked");
    OpenMenu();
    menu_open = true;
  }
});

contact_button.addEventListener("click", () => {
  ScrollTo("main", "bottom top");
});

function getMenuPosition() {
  let height =
    document.querySelector("nav").offsetHeight -
    document.querySelector(".menu").offsetHeight;
  return height;
}

let menuTimeline = gsap.timeline({
  paused: true,
});

let menu_height = getMenuPosition();

gsap.set(".menu", { y: menu_height });

menuTimeline
  .to(".menu", {
    duration: 1.2,
    y: 0,
    pointerEvents: "all",
    ease: "back.out(1)",
  })
  .from(
    ".menu .content",
    {
      duration: 0.3,
      opacity: 0,
    },
    "<"
  )
  .to(
    ".menu .button svg",
    {
      duration: 0.3,
      opacity: 0.95,
    },
    "<"
  )
  .from(
    ".filter",
    {
      duration: 1.2,
      opacity: 0,
      pointerEvents: "none",
    },
    "<"
  );

export function OpenMenu() {
  menuTimeline.play();
  menu_open = true;
}

export function CloseMenu() {
  menuTimeline.reverse();
  menu_open = false;
}

//MENU CHANGE COLOR

let nav_color = gsap.timeline({
  scrollTrigger: {
    trigger: "main",
    start: "-48  top",
    end: "99% top",
    toggleActions: "complete reset complete reset",
  },
  defaults: { duration: 0.1 },
});

nav_color
  .to("nav", {
    color: "#1c1c1c",
  })
  .to(
    ".menu .button svg",
    {
      fill: "#1c1c1c",
    },
    "<"
  );

//NAVIGATION

document.querySelectorAll(".menu .nav p").forEach((e) => {
  e.addEventListener("click", () => {
    let target = e.getAttribute("target");
    let position = e.getAttribute("position");
    if (position === undefined) {
      position = "top top";
    }
    ScrollTo(target, position);
    StartScroll();
    CloseMenu();
    menu_open = false;
  });
});
