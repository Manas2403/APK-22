import { updatePlayer } from "./playerUpdate";

const createAnimation = (canvas, ctx, player, platform, barriers) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayer(canvas, player, platform, barriers);
  platform.draw();

  barriers.forEach((barrier) => {
    barrier.draw();
  });

  requestAnimationFrame(() => {
    createAnimation(canvas, ctx, player, platform, barriers);
  });
};

export { createAnimation };
