import { Barrier } from "./components/barriers";
import { Platform } from "./components/platform";
import { Player } from "./components/player";
import { createAnimation } from "./systems/controls";
import { createPlayerControl } from "./systems/playerControl";

let ctx;

class World {
  constructor(canvas) {
    ctx = canvas.getContext("2d");
    const player = new Player(ctx);
    const platform = new Platform(canvas, ctx);
    let barriers = [];

    for (let i = 0; i < Math.random() * 5 + 10; ++i) {
      barriers.push(new Barrier(canvas, ctx, player, platform));
    }

    createAnimation(canvas, ctx, player, platform, barriers);
    createPlayerControl(canvas, player);
  }
}

export { World };
