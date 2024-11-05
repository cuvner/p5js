let faceMesh; // For the FaceMesh model
let video; // Webcam video feed
let faces = []; // Array to store detected face data
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };


let particles = [];
let maxParticles = 100; // Maximum particle count

let smoothedCenterX, smoothedCenterY;
let easing = 0.1; // Easing factor



function preload() {
  faceMesh = ml5.faceMesh(options); // Load the face tracking model
}


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);

  // Start smoothed center at canvas center
  smoothedCenterX = width / 2;
  smoothedCenterY = height / 2;
}



function draw() {
  background(0, 20); // Semi-transparent for trailing effect

  let targetCenterX = width / 2;
  let targetCenterY = height / 2;

  if (faces.length > 0) {
    let face = faces[0];
    let leftEye = face.keypoints[159];
    let rightEye = face.keypoints[386];

    targetCenterX = (leftEye.x + rightEye.x) / 2;
    targetCenterY = (leftEye.y + rightEye.y) / 2;

    fill(255, 0, 0);
    noStroke();
    circle(leftEye.x, leftEye.y, 10);
    circle(rightEye.x, rightEye.y, 10);

    if (particles.length < maxParticles) {
      let colPicker = frameCount % 2 === 0 ? color(255, 200, 200) : color(200, 200, 255);
      particles.push(new Particle(smoothedCenterX, smoothedCenterY, colPicker));
    }
  }

  smoothedCenterX += (targetCenterX - smoothedCenterX) * easing;
  smoothedCenterY += (targetCenterY - smoothedCenterY) * easing;

  push();
  translate(smoothedCenterX - width / 2, smoothedCenterY - height / 2);

for (let particle of particles) {
  particle.applyForcesFromOthers(particles);
  particle.updatePosition();
  particle.display();
}

  pop();
}




class Particle {
  constructor(x, y, col) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.mass = random(0.003, 0.03);
    this.col = col;
  }

  applyForcesFromOthers(particles) {
    let accelerationX = 0;
    let accelerationY = 0;

    for (let other of particles) {
      if (other !== this) {
        let distanceX = other.position.x - this.position.x;
        let distanceY = other.position.y - this.position.y;
        let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);

        distance = max(distance, 1);

        let force = (distance - 150) * other.mass / distance;
        accelerationX += force * distanceX;
        accelerationY += force * distanceY;
      }
    }

    this.velocity.x = this.velocity.x * 0.99 + accelerationX * this.mass;
    this.velocity.y = this.velocity.y * 0.99 + accelerationY * this.mass;
  }

  updatePosition() {
    this.position.add(this.velocity);
  }

  display() {
    fill(this.col);
    noStroke();
    let size = this.mass * 1000;
    ellipse(this.position.x, this.position.y, size, size);
  }
}



function gotFaces(results) {
  faces = results; // Store the detected faces in the global array
}

