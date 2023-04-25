import { Bodies, Body, Svg, Composite, Common } from "matter-js";
import pathseg from "pathseg";

export function createShape(
  label,
  path,
  textureName,
  scale,
  restitution,
  constraintCategory,
  textureType,
  textureSize,
  textureRatio,
  lang
) {
  let randomScale = (Math.random() * 0.5 + 0.75) * scale;
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.setAttribute("d", path);
  let vertices = Svg.pathToVertices(svg, 10);
  let options = {
    label: label,
    restitution: restitution,
    collisionFilter: {
      category: constraintCategory,
    },
    render: {
      sprite: {
        texture: `./assets/images/physics/${lang}/${textureType}/${textureSize}-${textureName}.png`,
        xScale: randomScale / textureRatio,
        yScale: randomScale / textureRatio,
      },
    },
  };

  let shape = Bodies.fromVertices(0, 0, vertices, options);
  Body.scale(shape, randomScale, randomScale);
  return shape;
}

export function addShape(composite, shape, x, y) {
  Body.rotate(shape, Common.random(Math.PI / 6, -Math.PI / 6));
  Body.setPosition(shape, { x: x, y: y });
  Composite.add(composite, shape);
}

export function getParams() {
  let params = {
    shapes: {
      restitution: 0.5,
      friction: 0.5,
      frictionStatic: 0,
      frictionAir: 0.1,
      scale: 1,
      size: "medium",
      imgSize: 1,
    },
  };

  let size = window.innerWidth;

  switch (true) {
    case size <= 480:
      params.shapes.scale = 0.4 + 0.2 * (size / 300);
      params.shapes.imgSize = 1;
      params.shapes.size = "small";
      break;
    case size <= 1024:
      params.shapes.scale = 0.6 + 0.2 * (size / 480);
      params.shapes.imgSize = 1.25;
      params.shapes.size = "medium";
      break;
    case size <= 1512:
      params.shapes.scale = 0.6 + 0.2 * (size / 1024);
      params.shapes.imgSize = 2;
      params.shapes.size = "large";
      break;
    case size < 1920:
      params.shapes.scale = 0.8 + 0.2 * (size / 1512);
      params.shapes.imgSize = 2;
      params.shapes.size = "large";
      break;
    default:
      params.shapes.scale = 1 + 0.2 * (size / 1920);
      params.shapes.imgSize = 2;
      params.shapes.size = "large";
      break;
  }
  return params;
}
