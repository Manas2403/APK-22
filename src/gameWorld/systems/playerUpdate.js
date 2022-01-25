const updatePlayer = (canvas, player, platform, barriers) => {
  player.draw();
  player.position.y += player.velocity.y;

  platform.position.x -= player.velocity.x;
  barriers.forEach((barrier) => {
    barrier.position.x -= player.velocity.x;
  });

  if (
    player.position.y + player.height + player.velocity.y + platform.height <=
      canvas.height ||
    platform.position.x + platform.width <= player.position.x
  ) {
    player.velocity.y += player.gravity;
  } else {
    player.velocity.y = 0;
  }
};

export { updatePlayer };
