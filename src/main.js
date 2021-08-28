import Player from "./entities/player.js";
import Pipe from "./entities/pipe.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();

let player;
console.log(canvas.height);

let pipes;
let animationId;
let isOver = false;
var pipesInterval;

addEventListener("resize", () => {
  resizeCanvas();
});

addEventListener("click", (event) => {
  player.jump();
});

addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    player.jump();
  }
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
  pipes = [];

  pipesInterval = setInterval(generatePipes, 2000);

  animate();
}

function generatePipes() {
  const pipesHeight = calculatePipesHeight();
  pipes.push([
    new Pipe(canvas.width + 200, 0, 80, pipesHeight.h1, "green"),
    new Pipe(
      canvas.width + 200,
      canvas.height - pipesHeight.h2,
      80,
      pipesHeight.h2,
      "green"
    ),
  ]);

  pipes.forEach((pipesPair, idx) => {
    if (pipesPair[0].x < -pipesPair[0].width) {
      pipes.splice(idx, 1);
    }
  });

  console.log(pipes.length);
}

function calculatePipesHeight() {
  const h1 = Math.floor(Math.random() * (canvas.height - 200));
  const h2 = canvas.height - h1 - 200;

  return {
    h1: h1,
    h2: h2,
  };
}

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update(ctx);

  pipes.forEach((pipesPair) => {
    pipesPair.forEach((pipe) => {
      pipe.update(ctx);

      if (player.isOver || player.isColliding(pipe)) {
        gameOver();
      }
    });
  });
}

function gameOver() {
  cancelAnimationFrame(animationId);
  clearInterval(pipesInterval);
  isOver = true;
}

init();
