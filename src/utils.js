function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadImage(imagePath) {
  const image = new Image();
  image.src = imagePath;
  return image;
}

function loadSound(soundPath) {
  const sound = document.createElement("audio");
  sound.src = soundPath;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  document.body.appendChild(sound);

  return sound;
}

export { randomInRange, loadImage, loadSound };
