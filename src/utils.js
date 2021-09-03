function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// async function loadImage(imagePath) {
//   return new Promise((resolve, reject) => {
//     let image = new Image();
//     image.onload = () => resolve(image);
//     image.onerror = () => reject("Could not load image: " + imagePath);
//     image.src = imagePath;
//   });
// }

function loadImage(imagePath) {
  const image = new Image();
  image.src = imagePath;
  return image;
}

export { randomInRange, loadImage };
