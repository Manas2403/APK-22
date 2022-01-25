let ctx;

class Player {
  constructor(ctxRef) {
    ctx = ctxRef;
    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 10,
      y: 0,
    };
    this.gravity = 0.5;

    this.width = 30;
    this.height = 30;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Player };
