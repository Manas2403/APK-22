const createPlayerControl = (canvas, player) => {
  addEventListener("keydown", ({ code }) => {
    if (code === "Space") {
      if (player.position.y >= canvas.height / 2) {
        player.velocity.y -= 10;
      }
    }
  });
};

export { createPlayerControl };
