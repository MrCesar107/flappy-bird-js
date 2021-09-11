function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadImage(imagePath) {
  const image = new Image();
  image.src = imagePath;
  return image;
}

export { randomInRange, loadImage };
