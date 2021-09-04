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
    this.currentFrame = 1;
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
    const frameWidth = 17;
    const frameHeight = 12;

    ctx.beginPath();
    //ctx.clearRect(this.x, this.y, this.width, this.height);
    this.selectFrame(ctx, this.currentFrame, frameWidth, frameHeight);
    ctx.closePath();
  }

  animate() {
    const frames = 3;

    this.currentFrame++;

    if (this.currentFrame > frames) {
      this.currentFrame = 1;
    }
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

  selectFrame(ctx, frame, frameWidth, frameHeight) {
    let positionFrameY;

    if (frame === 1) {
      positionFrameY = 381;
    } else if (frame == 2) {
      positionFrameY = 407;
    } else if (frame == 3) {
      positionFrameY = 433;
    }

    ctx.drawImage(
      this.image,
      115,
      positionFrameY,
      frameWidth,
      frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
