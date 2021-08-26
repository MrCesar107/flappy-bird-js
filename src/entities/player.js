export default class Player {
  constructor(x, y, dy, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.color = color;
    this.width = 64;
    this.height = 64;
    this.gravity = 0.5;
    this.friction = 0.98;
  }

  update(ctx) {
    if (this.y + this.height > canvas.height) {
      this.dy = 0;
    } else {
      this.dy += this.gravity;
    }

    this.y += this.dy;
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 64, 64);
    ctx.closePath();
  }
}
