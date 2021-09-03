export default class Player {
  constructor(x, y, dy, image) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.image = image;
    this.width = 64;
    this.height = 64;
    this.gravity = 0.5;
    this.friction = 0.98;
    this.isOver = false;
  }

  update(ctx) {
    if (this.y + this.height >= canvas.height) {
      this.dy = 0;
      this.y = canvas.height - this.height;
      this.isOver = true;
    } else {
      this.dy += this.gravity;
    }

    this.y += this.dy;
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(
      this.image,
      115,
      381,
      17,
      12,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.closePath();
  }

  jump() {
    if (this.y > -200) {
      this.dy = -10 * this.friction;
    }
  }

  isColliding(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    );
  }
}
