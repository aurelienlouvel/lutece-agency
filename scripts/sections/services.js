import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
    if ($(window).width() >= 992) {
        gsap.to(".service:nth-child(2)", {
            yPercent: -150,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=2000",
            },
        });

        gsap.to(".service:nth-child(3)", {
            yPercent: -300,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=2400",
            },
        });

        gsap.to(".service:nth-child(4)", {
            yPercent: -450,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=2800",
            },
        });

        gsap.to(".service:nth-child(5)", {
            yPercent: -600,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=3200",
            },
        });

        gsap.to(".service:nth-child(6)", {
            yPercent: -750,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=3500",
            },
        });
    }
    else if ($(window).width() < 992 && $(window).width() >= 768) {
        gsap.to(".service:nth-child(2)", {
            yPercent: -60,
            ease: "none",
            scrollTrigger: {
              trigger: ".container__services",
              scrub: true,
              end: "+=1000",
            },
          });
        
          gsap.to(".service:nth-child(3)", {
            yPercent: -120,
            ease: "none",
            scrollTrigger: {
              trigger: ".container__services",
              scrub: true,
              end: "+=1200",
            },
          });
        
          gsap.to(".service:nth-child(4)", {
            yPercent: -180,
            ease: "none",
            scrollTrigger: {
              trigger: ".container__services",
              scrub: true,
              end: "+=1400",
            },
          });
        
          gsap.to(".service:nth-child(5)", {
            yPercent: -240,
            ease: "none",
            scrollTrigger: {
              trigger: ".container__services",
              scrub: true,
              end: "+=1600",
            },
          });
        
          gsap.to(".service:nth-child(6)", {
            yPercent: -300,
            ease: "none",
            scrollTrigger: {
              trigger: ".container__services",
              scrub: true,
              end: "+=1800",
            },
          });
    }
    else {
        gsap.to(".service:nth-child(2)", {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=700",
            },
        });

        gsap.to(".service:nth-child(3)", {
            yPercent: -200,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=800",
            },
        });

        gsap.to(".service:nth-child(4)", {
            yPercent: -300,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=900",
            },
        });

        gsap.to(".service:nth-child(5)", {
            yPercent: -400,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=1000",
            },
        });

        gsap.to(".service:nth-child(6)", {
            yPercent: -500,
            ease: "none",
            scrollTrigger: {
                trigger: ".container__services",
                scrub: true,
                end: "+=1100",
            },
        });
    }
});