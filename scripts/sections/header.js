import Matter, {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  World,
  Composite,
  Query,
  Mouse,
  MouseConstraint,
  Events,
} from "matter-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createShape, addShape, getParams } from "../utils/physics";
import { ScrollDown } from "../navigation/scroll";
import {onMouseHover, onMouseHoverOut} from "../navigation/cursor";

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

gsap.registerPlugin(ScrollTrigger);

function init() {
  let lang = document.documentElement.lang.toString();

  let params = getParams();

  //CANVAS

  let canvas = document.body.querySelector(".header");
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  //SETUP

  let engine = Engine.create();

  let render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: width,
      height: height,
      background: "transparent",
      wireframes: false,
      showAngleIndicator: false,
    },
  });

  Render.setPixelRatio(render, window.devicePixelRatio);

  //COLLISION FILTER

  let defaultCategory = 0x0001;
  let navigationCategory = 0x0002;

  //STATIC

  let Static = Composite.create({ label: "Static" });
  World.add(engine.world, Static);

  //WALLS

  let Walls = Composite.create({ label: "Walls" });
  Composite.add(Static, Walls);

  //TITLE

  let Title = Composite.create({ label: "Title" });
  Composite.add(Static, Title);

  let dimension = 2000;
  let margin = dimension / 2;

  function createStatic() {
    Composite.clear(Walls, false, true);
    Composite.clear(Title, false, true);

    let walls = [
      {
        label: "floor",
        x: width / 2,
        y: height + margin,
        width: width,
        height: dimension,
      },
      {
        label: "left",
        x: -margin,
        y: height,
        width: dimension,
        height: height * 4,
      },
      {
        label: "right",
        x: width + margin,
        y: height,
        width: dimension,
        height: height * 4,
      },
    ];

    walls.forEach((wall) => {
      let body = Bodies.rectangle(wall.x, wall.y, wall.width, wall.height, {
        isStatic: true,
        label: wall.label,
        render: {
          fillStyle: "transparent",
        },
        collisionFilter: {
          category: defaultCategory,
        },
      });
      Composite.add(Walls, body);
    });

    document.querySelectorAll("header .title .line").forEach((element) => {
      let height = element.offsetHeight;
      let width = element.offsetWidth;
      let x = element.offsetLeft;
      let y = element.offsetTop;
      let options = {
        isStatic: true,
        slop: 1,
        render: {
          fillStyle: "transparent",
        },
        collisionFilter: {
          category: defaultCategory,
        },
        offsetTop: y + height / 2,
        offsetLeft: x + width / 2,
      };
      let shape = Bodies.rectangle(
        x + width / 2,
        y + height / 2,
        width,
        height,
        options
      );
      Composite.add(Title, shape);
    });
  }

  createStatic();

  //DYNAMIC

  let Dynamic = Composite.create({ label: "Dynamic" });
  World.add(engine.world, Dynamic);

  //SHAPES

  const lines_shapes = [
    {
      label: 0,
      path: "M31.0381 160C8.94061 160 -6.06415 137.932 2.39219 117.869L28.1539 56.7483C31.3008 49.2821 37.3369 43.3503 44.9342 40.2577L138.135 2.31944C145.732 -0.773149 154.268 -0.773147 161.866 2.31945L255.066 40.2577C262.663 43.3503 268.699 49.2821 271.846 56.7483L297.608 117.869C306.064 137.932 291.059 160 268.962 160L31.0381 160Z",
    },
    {
      label: 1,
      path: "M39.3484 8.7868C45.056 3.16071 52.7971 0 60.8688 0H279.131C287.203 0 294.944 3.16071 300.652 8.7868L331.086 38.7868C342.971 50.5025 342.971 69.4975 331.086 81.2132L300.652 111.213C294.944 116.839 287.203 120 279.131 120H60.8688C52.7971 120 45.056 116.839 39.3484 111.213L8.91403 81.2132C-2.97134 69.4975 -2.97135 50.5025 8.91402 38.7868L39.3484 8.7868Z",
    },
    {
      label: 2,
      path: "M25.6193 17.0429C28.9205 7.02669 40.7851 0 54.3964 0H225.604C239.215 0 251.079 7.02669 254.381 17.0429L279.1 92.043C283.78 106.244 269.62 120 250.323 120H29.6774C10.3796 120 -3.78013 106.244 0.900269 92.043L25.6193 17.0429Z",
    },
    {
      label: 3,
      path: "M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90Z",
    },
    {
      label: 4,
      path: "M31.503 11.5891C35.0444 4.48655 42.2834 0 50.2021 0H149.798C157.717 0 164.956 4.48653 168.497 11.5891L197.792 70.3442C201.817 78.4154 200.239 88.1635 193.876 94.5444L114.783 173.86C106.619 182.047 93.3815 182.047 85.2171 173.86L6.12386 94.5444C-0.239156 88.1635 -1.81662 78.4154 2.2077 70.3442L31.503 11.5891Z",
    },
    {
      label: 5,
      path: "M111 118C49.6964 118 0 65.1696 0 0H222C222 65.1696 172.304 118 111 118Z",
    },
    {
      label: 6,
      path: "M0 30C0 13.4315 13.4315 0 30 0H150C166.569 0 180 13.4315 180 30V150C180 166.569 166.569 180 150 180H30C13.4315 180 0 166.569 0 150V30Z",
    },
    {
      label: 7,
      path: "M58.3556 16.2866C70.1577 -5.42887 103.842 -5.42884 115.644 16.2866L170.578 117.361C181.225 136.951 165.74 160 141.933 160H32.0668C8.25963 160 -7.22454 136.951 3.42234 117.361L58.3556 16.2866Z",
    },
    {
      label: 8,
      path: "M71.8047 6.62244C83.8468 -2.20747 100.153 -2.20748 112.195 6.62243L169.835 48.8866C181.877 57.7165 186.916 73.3679 182.316 87.655L160.3 156.04C155.7 170.327 142.508 180 127.623 180H56.3769C41.492 180 28.2999 170.327 23.7002 156.04L1.68396 87.655C-2.91573 73.3679 2.12318 57.7165 14.1653 48.8866L71.8047 6.62244Z",
    },
    {
      label: 9,
      path: "M0 30C0 13.4315 13.4315 0 30 0H270C286.569 0 300 13.4315 300 30V130C300 146.569 286.569 160 270 160H30C13.4315 160 0 146.569 0 130V30Z",
    },
    {
      label: 10,
      path: "M36.2132 8.78679C41.8393 3.1607 49.4699 0 57.4264 0H242.574C250.53 0 258.161 3.1607 263.787 8.7868L291.213 36.2132C296.839 41.8393 300 49.4699 300 57.4264V102.574C300 110.53 296.839 118.161 291.213 123.787L263.787 151.213C258.161 156.839 250.53 160 242.574 160H57.4264C49.4699 160 41.8393 156.839 36.2132 151.213L8.78679 123.787C3.1607 118.161 0 110.53 0 102.574V57.4264C0 49.4699 3.1607 41.8393 8.7868 36.2132L36.2132 8.78679Z",
    },
    {
      label: 11,
      path: "M380 70C380 108.66 294.934 140 190 140C85.0659 140 0 108.66 0 70C0 31.3401 85.0659 0 190 0C294.934 0 380 31.3401 380 70Z",
    },
    {
      label: 12,
      path: "M41.2132 8.7868C46.8393 3.16071 54.4699 0 62.4264 0H117.574C125.53 0 133.161 3.1607 138.787 8.7868L171.213 41.2132C176.839 46.8393 180 54.4699 180 62.4264V117.574C180 125.53 176.839 133.161 171.213 138.787L138.787 171.213C133.161 176.839 125.53 180 117.574 180H62.4264C54.4699 180 46.8393 176.839 41.2132 171.213L8.7868 138.787C3.16071 133.161 0 125.53 0 117.574V62.4264C0 54.4699 3.1607 46.8393 8.7868 41.2132L41.2132 8.7868Z",
    },
    {
      label: 13,
      path: "M150 0C67.1573 0 0 71.6344 0 160H300C300 71.6344 232.843 0 150 0Z",
    },
    {
      label: 14,
      path: "M31.503 11.5891C35.0444 4.48655 42.2834 0 50.2021 0H149.798C157.717 0 164.956 4.48653 168.497 11.5891L197.792 70.3442C201.817 78.4154 200.239 88.1635 193.876 94.5444L114.783 173.86C106.619 182.047 93.3815 182.047 85.2171 173.86L6.12386 94.5444C-0.239156 88.1635 -1.81662 78.4154 2.2077 70.3442L31.503 11.5891Z",
    },
    {
      label: 15,
      path: "M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90Z",
    },
    {
      label: 16,
      path: "M0 30C0 13.4315 13.4315 0 30 0H150C166.569 0 180 13.4315 180 30V150C180 166.569 166.569 180 150 180H30C13.4315 180 0 166.569 0 150V30Z",
    },
    {
      label: 17,
      path: "M0 30C0 13.4315 13.4315 0 30 0H270C286.569 0 300 13.4315 300 30V130C300 146.569 286.569 160 270 160H30C13.4315 160 0 146.569 0 130V30Z",
    },
  ];

  //NAVIGATION SHAPES

  const navigationShapes = [
    {
      label: 0,
      path: "M41.2132 8.7868C46.8393 3.16071 54.4699 0 62.4264 0H117.574C125.53 0 133.161 3.1607 138.787 8.7868L171.213 41.2132C176.839 46.8393 180 54.4699 180 62.4264V117.574C180 125.53 176.839 133.161 171.213 138.787L138.787 171.213C133.161 176.839 125.53 180 117.574 180H62.4264C54.4699 180 46.8393 176.839 41.2132 171.213L8.7868 138.787C3.16071 133.161 0 125.53 0 117.574V62.4264C0 54.4699 3.1607 46.8393 8.7868 41.2132L41.2132 8.7868Z",
    },
    {
      label: 1,
      path: "M58.3556 16.2866C70.1577 -5.42887 103.842 -5.42884 115.644 16.2866L170.578 117.361C181.225 136.951 165.74 160 141.933 160H32.0668C8.25963 160 -7.22454 136.951 3.42234 117.361L58.3556 16.2866Z",
    },
  ];

  //SHAPE

  //SHAPES LOADED

  let linesLoaded = [];
  let linesShapes = Composite.create({ label: "lines" });
  Composite.add(Dynamic, linesShapes);

  lines_shapes.forEach((shape) => {
    let shapeLoaded = createShape(
      shape.label,
      shape.path,
      shape.label,
      params.shapes.scale,
      params.shapes.restitution,
      defaultCategory,
      "lines",
      params.shapes.size,
      params.shapes.imgSize,
      lang
    );
    linesLoaded.push(shapeLoaded);
  });

  //NAVIGATION SHAPES LOADED

  let navigationLoaded = [];
  let NavigationShapes = Composite.create({ label: "Navigation" });
  Composite.add(Dynamic, NavigationShapes);

  navigationShapes.forEach((shape) => {
    let shapeLoaded = createShape(
      shape.label,
      shape.path,
      shape.label,
      params.shapes.scale,
      params.shapes.restitution,
      navigationCategory,
      "navigation",
      params.shapes.size,
      params.shapes.imgSize,
      lang
    );
    navigationLoaded.push(shapeLoaded);
  });

  navigationLoaded.forEach((shape, index) => {
    addShape(
      NavigationShapes,
      shape,
      width,
      Composite.allBodies(Walls).find(({ label }) => label === "floor").position
        .y -
        margin -
        height -
        100
    );
  });

  //MOUSE CONSTRAINT

  let mouse = Mouse.create(render.canvas);
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  mouse.pixelRatio = window.devicePixelRatio;

  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
      render: {
        visible: false,
      },
    },
    collisionFilter: {
      mask: defaultCategory,
    },
  });

  World.add(engine.world, mouseConstraint);

  render.mouse = mouse;
  Events.on(mouseConstraint, "mousedown", function (event) {
    //NAVIGATION SHAPES
    let foundNav = Query.point(NavigationShapes.bodies, event.mouse.position);
    if (foundNav.length > 0) {
      switch (foundNav[0].label) {
        case 0:
          ScrollDown();
          break;
      }
    } else if (!mouseConstraint.body || mouseConstraint.body.isStatic) {
      if (shapeNumber < linesLoaded.length) {
        let mousePosition = mouse.position;
        let mouseX = mousePosition.x;
        let mouseY =
          Composite.allBodies(Walls).find(({ label }) => label === "floor")
            .position.y -
          margin -
          height -
          100;
        let shape = linesLoaded[shapeNumber];
        addShape(linesShapes, shape, mouseX, mouseY);
        shapeNumber++;
      } else {
        //NO MORE SHAPES
      }
    } else {
      //SHAPES
      if (Composite.get(linesShapes, mouseConstraint.body.id, "body")) {
        grabbing = true;
        document.body.style.cursor = "grabbing";
      }
    }
  });

  //MOUSE UP

  Events.on(mouseConstraint, "mouseup", function (event) {
    if (grabbing) {
      grabbing = false;
      document.body.style.cursor = "inherit";
    }
  });

  //MOUSE MOVE

  Events.on(mouseConstraint, "mousemove", function (event) {
    let foundText = Query.point(linesShapes.bodies, event.mouse.position);
    let foundNav = Query.point(NavigationShapes.bodies, event.mouse.position);
    if (foundText.length > 0) {
      if (!grabbing) {
        document.body.style.cursor = "grab";
      }
      onMouseHover()
    } else if (foundNav.length > 0) {
      document.body.style.cursor = "pointer";
      onMouseHover()
    } else {
      document.body.style.cursor = "inherit";
      onMouseHoverOut() 
    }
  });

  //RUNNER

  Render.run(render);
  var runner = Runner.create();
  Runner.run(runner, engine);

  //EVENTS

  //MOUSE DOWN
  let shapeNumber = 0;
  let grabbing = false;

  //SCROLL
  ScrollTrigger.create({
    trigger: ".header",
    start: "top top",
    scrub: true,
    onUpdate: function (self) {
      let position = self.progress.toFixed(4) * height;
      Title.bodies.forEach((body) => {
        Body.set(body, "position", {
          x: body.offsetLeft,
          y: position + body.offsetTop,
        });
      });
    },
  });

  // if (canHover) {
  window.addEventListener("resize", () => {
    render.bounds.max.x = canvas.offsetWidth;
    render.bounds.max.y = canvas.offsetHeight;
    render.options.width = canvas.offsetWidth;
    render.options.height = canvas.offsetHeight;
    render.canvas.width = canvas.offsetWidth;
    render.canvas.height = canvas.offsetHeight;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    Render.setPixelRatio(render, window.devicePixelRatio);
    mouse.pixelRatio = window.devicePixelRatio;
    setTimeout(() => {
      createStatic();
    }, 500);
  });
  // }
}

window.addEventListener("load", (event) => {
  init();
});
