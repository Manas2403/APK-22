let ctx;
let canvas;
class Platform {
  constructor(canvasRef, ctxRef) {
    canvas = canvasRef;
    ctx = ctxRef;
    this.width = canvas.width * 4;
    this.height = 50;
    this.position = {
      x: 0,
      y: canvas.height - this.height,
    };
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export { Platform };
