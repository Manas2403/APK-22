let ctx;
let canvas;
class Barrier {
  constructor(canvasRef, ctxRef, playerRef, platformRef) {
    canvas = canvasRef;
    ctx = ctxRef;

    this.width = 50 * Math.random() + 20;
    this.height = 50 * Math.random() + 40;

    this.position = {
      x:
        (platformRef.width - canvas.width / 2) * Math.random() +
        canvas.width / 2,
      y: platformRef.position.y - this.height,
    };
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Barrier };
