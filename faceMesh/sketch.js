let faceMesh;
let video;
let faces = [];
let img; // Variable to hold the image
let options = { maxFaces: 2, refineLandmarks: false, flipHorizontal: false };
let padding = 20; // Padding of 20 pixels around the canvas
let mySound;

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);

  soundFormats("mp3", "ogg");
  mySound = loadSound("eric.mp3");

  // Load the image you want to follow the face
  img = loadImage("dinohead.png"); // Replace with the path to your image
}

function setup() {
  // Create a canvas with padding around the edges
  createCanvas(windowWidth - 2 * padding, windowHeight - 2 * padding);
  noLoop(); // Stop draw loop temporarily

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
  loop(); // Start draw loop again
}

function draw() {
  // Clear the canvas before drawing
  clear();

  // Draw the webcam video scaled to the current canvas size
  image(video, 0, 0, width, height);

  // Draw all the tracked face points and the image
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    if (face.keypoints.length > 0) {
      playSoundIfNotPlaying();
      // Choose keypoints for scaling and positioning
      let forehead = face.keypoints[10]; // Forehead point
      let leftEye = face.keypoints[33]; // Left eye corner
      let rightEye = face.keypoints[263]; // Right eye corner

      // Calculate the distance between the eyes
      let eyeDistance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);

      // Scale factor based on eye distance
      let scaleFactor = eyeDistance / 170;

      // Draw the image centered on the forehead and scaled
      let imgWidth = img.width * scaleFactor;
      let imgHeight = img.height * scaleFactor;
      image(
        img,
        forehead.x - imgWidth / 2,
        forehead.y - imgHeight / 2.8,
        imgWidth,
        imgHeight
      );
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

// Function to reset the sketch on mouse click and resize canvas
function mousePressed() {
  // Resize the canvas with padding
  resizeCanvas(windowWidth - 2 * padding, windowHeight - 2 * padding);
  video.size(width, height);
  faces = []; // Clear face data
  faceMesh.detectStart(video, gotFaces); // Restart face detection
}

// Resize the canvas and video when the window is resized
function windowResized() {
  // Resize the canvas with padding
  resizeCanvas(windowWidth - 2 * padding, windowHeight - 2 * padding);
  video.size(width, height);
}

function playSoundIfNotPlaying() {
  // Check if the sound is playing
  if (!mySound.isPlaying()) {
    // If it's not playing, play the sound
    //mySound.play();
  }
}
