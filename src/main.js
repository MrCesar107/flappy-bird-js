import { randomInRange, loadImage } from "./utils.js";
import Player from "./entities/player.js";
import Pipe from "./entities/pipe.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const spriteSheet = await loadImage(document.querySelector("#spritesImage").src);
const scoreElement = document.querySelector("#scoreEl");
const scoreLabelElement = document.querySelector("#scoreLabel");
const highScoreLabelElement = document.querySelector("#highScoreLabel");
const titleElement = document.querySelector("#titleEl");
const modalElement = document.querySelector("#modalEl");
const startGameButton = document.querySelector("#startGameBtn");
const trophyElement = document.querySelector("#trophyEl");

resizeCanvas();
ctx.fillStyle = "#299bd9";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let player;
let pipes;
let animationId;
let score;
let highScore = 0;
let gameStarted = false;
var pipesInterval;

addEventListener("resize", () => {
  resizeCanvas();
});

addEventListener("click", () => {
  player.jump();
});

startGameButton.addEventListener("click", startGame);

addEventListener("keydown", (event) => {
  if (event.code == "Space" && gameStarted) {
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
  score = 0;
  scoreElement.innerHTML = score;
  scoreElement.classList.remove("hidden");

  pipesInterval = setInterval(generatePipes, 2500);
  animate();
}

function generatePipes() {
  const pipesHeight = calculatePipesHeight();
  pipes.push([
    new Pipe(
      canvas.width + 200,
      -500,
      80,
      pipesHeight.h1 + 500,
      "down",
      spriteSheet
    ),
    new Pipe(
      canvas.width + 200,
      canvas.height - pipesHeight.h2,
      80,
      pipesHeight.h2,
      "up",
      spriteSheet
    ),
  ]);

  pipes.forEach((pipesPair, idx) => {
    if (pipesPair[0].x < -pipesPair[0].width) {
      pipes.splice(idx, 1);
    }
  });
}

function calculatePipesHeight() {
  const h1 = Math.floor(randomInRange(100, canvas.height - 300));
  const h2 = canvas.height - h1 - 200;

  return {
    h1: h1,
    h2: h2,
  };
}

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#299bd9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update(ctx);

  pipes.forEach((pipesPair) => {
    pipesPair.forEach((pipe) => {
      pipe.update(ctx);

      if (player.isOver || player.isColliding(pipe)) {
        gameOver();
      }
    });

    updateScore(pipesPair[0]);
  });
}

function gameOver() {
  cancelAnimationFrame(animationId);
  clearInterval(pipesInterval);
  gameStarted = false;
  updateScoreLabel();
  updateHighScoreLabel();
  selectTrophyByScore();
  appearGameOverUI();
}

function updateScore(pipe) {
  if (pipe.x < player.x && !pipe.isScored) {
    score++;
    pipe.isScored = true;
    scoreElement.innerHTML = score;
  }
}

function updateScoreLabel() {
  scoreLabelElement.innerHTML = score;
}

function updateHighScoreLabel() {
  if (score > highScore) {
    highScore = score;
  }

  highScoreLabelElement.innerHTML = highScore;
}

function disappearUI() {
  titleElement.classList.add("hidden");
  startGameButton.classList.add("hidden");
  modalElement.classList.add("hidden");
}

function appearGameOverUI() {
  scoreElement.classList.add("hidden");
  titleElement.innerHTML = "Game Over";
  titleElement.classList.remove("hidden");
  startGameButton.classList.remove("hidden");
  modalElement.classList.remove("hidden");
}

function selectTrophyByScore() {
  if (score >= 10 && score < 30) {
    showSilverTrophy();
  }

  if (score >= 30) {
    showGoldTrophy();
  }

  if (score >= 0 && score < 10) {
    showNoTrophy();
  }
}

function showSilverTrophy() {
  trophyElement.classList.remove("no-trophy");
  trophyElement.classList.remove("gold-trophy");
  trophyElement.classList.add("silver-trophy");
}

function showGoldTrophy() {
  trophyElement.classList.remove("no-trophy");
  trophyElement.classList.remove("silver-trophy");
  trophyElement.classList.add("gold-trophy");
}

function showNoTrophy() {
  trophyElement.classList.remove("gold-trophy");
  trophyElement.classList.remove("silver-trophy");
  trophyElement.classList.add("no-trophy");
}

function startGame() {
  gameStarted = true;
  disappearUI();
  init();
}
