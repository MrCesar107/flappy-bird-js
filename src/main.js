import Player from "./entities/player.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let player;

resizeCanvas();

addEventListener("resize", () => {
  resizeCanvas();
});

function resizeCanvas() {
  if (innerWidth < 500) {
    canvas.width = innerWidth;
  } else {
    canvas.width = 500;
  }

  canvas.height = innerHeight;
}

function init() {
  player = new Player(canvas.width / 2 - 32, canvas.height / 2 - 32, 2, "red");
  console.log(player);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update(ctx);
}

init();
