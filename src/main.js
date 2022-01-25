import { World } from "./gameWorld/World";

const main = () => {
  const canvas = document.querySelector("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const gameWorld = new World(canvas);
};

main();
addEventListener("resize", () => {
  main();
});
