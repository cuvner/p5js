let customFont, img;
let letters = [];
let letterPositions = [];
let startAnimation = false;
let imgScale = 1;
let imgScaleDirection = 1;

// Preload assets
function preload() {
  customFont = loadFont('font/surfing.otf');
  img = loadImage('images/jako.png');
}

function setup() {
  // Set up the canvas with an A4 aspect ratio (1:1.414)
  let canvasWidth = 600; // Adjust this value for larger screens, if needed
  let canvasHeight = canvasWidth * 1.414;
  	createCanvas(canvasWidth, canvasHeight, document.getElementById('canvas-ar')) // poster aspect
  pixelDensity(1);
  frameRate(10);

  // Initialize text and image properties
  setupLetters();
  setupTextStyle();
}

function draw() {
  background(0);

  // Timer for starting the animation after 5 seconds
  if (millis() > 5000) {
    startAnimation = true;
  }

  // Update and display the letters if animation has started
  if (startAnimation) {
    animateLetters();
  } else {
    displayLetters(); // Display initial positions before animation
  }

  // Animate the "jako" image with z-axis effect
  animateImage();
}

// Detect 's' key press to save the canvas as an image
// function keyPressed() {
//   if (key === 's' || key === 'S') {
//     save('AR_Poster_Frame.png');
//   }
// }

// Setup text properties
function setupTextStyle() {
  textFont(customFont);
  textSize(width / 10); // Make text size relative to canvas width
  fill(255);
}

// Initialize letters' positions and properties
function setupLetters() {
  let xStart = width / 2 - (width / 18) * 4; // Center horizontally
  let yStart = height / 8; // Start height for letters, relative to canvas height

  for (let i = 0; i < "HACKATHON".length; i++) {
    letters.push("HACKATHON"[i]);
    letterPositions.push({
      x: xStart + i * (width / 18), // Spacing relative to width
      y: yStart,
      speed: random(height * 0.005, height * 0.02) // Speed relative to height
    });
  }
}

// Display the letters in their initial positions
function displayLetters() {
  for (let i = 0; i < letters.length; i++) {
    text(letters[i], letterPositions[i].x, letterPositions[i].y);
  }
}

// Animate each letter and reset once all are off-screen
function animateLetters() {
  let allOffScreen = true;

  for (let i = 0; i < letters.length; i++) {
    let pos = letterPositions[i];
    text(letters[i], pos.x, pos.y);

    // Bleeding effect: increase y position over time
    pos.y += pos.speed;

    // Check if any letter is still on-screen
    if (pos.y < height) {
      allOffScreen = false;
    }
  }

  // If all letters are off-screen, reset their positions
  if (allOffScreen) {
    resetLetters();
  }
}

// Reset letters' positions to initial values
function resetLetters() {
  let yStart = height / 8; // Starting y position
  for (let i = 0; i < letters.length; i++) {
    letterPositions[i].y = yStart;
  }
}

// Animate the "jako" image with a z-axis scaling effect
function animateImage() {
  push();
  translate(width / 2, height / 2);
  scale(imgScale);
  imageMode(CENTER);
  
  let imgSize = width / 4; // Image size relative to canvas width
  image(img, 0, 0, imgSize, imgSize * (img.height / img.width)); // Maintain aspect ratio
  pop();

  // Update image scale for z-axis effect
  imgScale += imgScaleDirection * 0.02;
  if (imgScale > 1.2 || imgScale < 0.8) {
    imgScaleDirection *= -1; // Reverse scaling direction
  }
}
