import { randomInRange, loadImage } from "./utils.js";
import Player from "./entities/player.js";
import Pipe from "./entities/pipe.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const spriteSheet = loadImage(document.querySelector("#spritesImage").src);
const scoreElement = document.querySelector("#scoreEl");
const scoreLabelElement = document.querySelector("#scoreLabel");
const highScoreLabelElement = document.querySelector("#highScoreLabel");
const titleElement = document.querySelector("#titleEl");
const modalElement = document.querySelector("#modalEl");
const startGameButton = document.querySelector("#startGameBtn");
const trophyElement = document.querySelector("#trophyEl");
const restrictMessageElement = document.querySelector("#restrictMessageEl");
const dataModalElement = document.querySelector("#dataModalEl");

let player;
let pipes;
let animationId;
let score;
let highScore = 0;
let gameStarted = false;
var pipesInterval;
var playerAnimation;

resizeCanvas();

addEventListener("resize", () => {
  resizeCanvas();
});

addEventListener("touchstart", (event) => {
  event.preventDefault();
  player.jump();
});

if (isMobileBrowser()) {
  addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
} else {
  addEventListener("click", (event) => {
    event.preventDefault();
    player.jump();
  });
}

startGameButton.addEventListener("click", startGame);

addEventListener("keydown", (event) => {
  if (event.code == "Space" && gameStarted) {
    player.jump();
  }
});

function isMobileBrowser() {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|iP(hone|od|ad)|Android/.test(ua);
  return isMobile;
}

function resizeCanvas() {
  if (innerWidth < 500) {
    canvas.width = innerWidth;
  } else {
    canvas.width = 500;
  }

  canvas.height = innerHeight;
  clearCanvas();
  restartGame();
}

function init() {
  player = new Player(
    canvas.width / 2 - 32,
    canvas.height / 2 - 32,
    2,
    spriteSheet
  );
  pipes = [];
  score = 0;
  scoreElement.innerHTML = score;
  scoreElement.classList.remove("hidden");

  pipesInterval = setInterval(generatePipes, 2500);
  playerAnimation = setInterval(animationPlayer, 150);
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

function animationPlayer() {
  player.animate();
}

function calculatePipesHeight() {
  const h1 = Math.floor(randomInRange(100, canvas.height - 300));
  const h2 = canvas.height - h1 - 200;

  return {
    h1: h1,
    h2: h2,
  };
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#299bd9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  clearCanvas();

  player.update(ctx);

  if (player.isOver) {
    gameOver();
  }

  pipes.forEach((pipesPair) => {
    pipesPair.forEach((pipe) => {
      pipe.update(ctx);

      if (player.isColliding(pipe)) {
        gameOver();
      }
    });

    updateScore(pipesPair[0]);
  });
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

function appearNotPortraitUI() {
  titleElement.classList.add("hidden");
  modalElement.classList.remove("mt-64", "hidden");
  modalElement.classList.add("mt-16");
  restrictMessageElement.classList.remove("hidden");
}

function disappearNotPortraitUI() {
  titleElement.classList.remove("hidden");
  modalElement.classList.remove("mt-16");
  modalElement.classList.add("mt-64");
  restrictMessageElement.classList.add("hidden");
  restrictMessageElement.classList.add("hidden");
}

function appearUI() {
  titleElement.classList.remove("hidden");
  titleElement.classList.add("mt-36");
  titleElement.innerHTML = "Flappy Bird";
  scoreElement.classList.add("hidden");
  dataModalElement.classList.remove("hidden");
  scoreLabelElement.innerHTML = "0";
  highScoreLabelElement.innerHTML = "0";
  modalElement.classList.remove("hidden");
  showNoTrophy();
}

function disappearUI() {
  titleElement.classList.add("hidden");
  modalElement.classList.add("hidden");
  dataModalElement.classList.add("hidden");
}

function appearGameOverUI() {
  dataModalElement.classList.remove("hidden");
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

function deleteIntervals() {
  cancelAnimationFrame(animationId);
  clearInterval(pipesInterval);
  clearInterval(playerAnimation);
}

function gameOver() {
  deleteIntervals();
  gameStarted = false;
  updateScoreLabel();
  updateHighScoreLabel();
  selectTrophyByScore();
  appearGameOverUI();
}

function startGame() {
  gameStarted = true;
  disappearUI();
  init();
}

function restartGame() {
  gameStarted = false;
  player = null;
  pipes = null;
  score = null;
  highScore = null;
  deleteIntervals();

  if (canvas.width > canvas.height && canvas.width < 1024) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    disappearUI();
    appearNotPortraitUI();
  } else {
    disappearNotPortraitUI();
    appearUI();
  }
}
