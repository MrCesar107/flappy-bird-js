export default class Pipe {
  constructor(x, y, width, height, direction, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.isScored = false;
    this.image = image;
  }

  update(ctx) {
    this.x -= 2;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();

    if (this.direction === "up") {
      ctx.drawImage(
        this.image,
        84,
        323,
        26,
        12,
        this.x - 10,
        this.y,
        this.width + 20,
        50
      );
      ctx.drawImage(
        this.image,
        57,
        324,
        24,
        50,
        this.x,
        this.y + 50,
        this.width,
        this.height
      );
    }

    if (this.direction === "down") {
      ctx.drawImage(
        this.image,
        57,
        324,
        24,
        50,
        this.x,
        this.y,
        this.width,
        this.height - 50
      );

      ctx.drawImage(
        this.image,
        84,
        323,
        26,
        12,
        this.x - 10,
        this.y + this.height - 50,
        this.width + 20,
        50
      );
    }

    ctx.closePath();
  }
}
