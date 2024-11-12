
# Face-Tracking Particle System with Attraction and Repulsion

This project creates an interactive particle system that uses face-tracking to follow the midpoint between the eyes and applies attraction and repulsion forces between particles. Built using p5.js and ml5.js libraries, this system dynamically generates particles based on face tracking data and smoothly follows the eyes' center. I have based this on project by [Jason Lee](https://openprocessing.org/sketch/2427952) 

---

### Demo

- **Red Eye Markers**: Red dots mark the detected eye positions.
- **Particle System**: Particles spawn at the midpoint between the eyes, moving based on attraction-repulsion forces and centered with easing.

---

### How to Use

1. Clone the repository or download the files.
2. Ensure you have internet access to load the `ml5.js` and `p5.js` libraries.

---

### Download the Full Project

You can clone the repository with Git:

```bash
git clone https://github.com/cuvner/p5js.git
```

---

### Step-by-Step Guide

#### Step 1: Set Up Face Tracking

1. **Environment Setup**  
   - Open the [p5.js Web Editor](https://editor.p5js.org/) or your preferred environment.
   - Include ml5 library:
     ```html
     <script src="https://unpkg.com/ml5@1/dist/ml5.min.js"></script>
     ```

2. **Define Global Variables**  
   ```javascript
   let faceMesh, video, faces = [];
   let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };
   ```

3. **Load FaceMesh in `preload()`**  
   ```javascript
   function preload() {
     faceMesh = ml5.faceMesh(options);
   }
   ```

4. **Set Up Canvas and Video in `setup()`**  
   ```javascript
   function setup() {
     createCanvas(640, 480);
     video = createCapture(VIDEO);
     video.size(640, 480);
     video.hide();
     faceMesh.detectStart(video, gotFaces);
   }
   ```

5. **Define `gotFaces` Callback**  
   ```javascript
   function gotFaces(results) {
     faces = results;
   }
   ```

6. **Draw Face Data**  
   ```javascript
   function draw() {
     background(0);
     if (faces.length > 0) console.log(faces[0]);
   }
   ```

#### Step 2: Draw Red Dots on Eyes

```javascript
function draw() {
  background(0);
  if (faces.length > 0) {
    let face = faces[0];
    let leftEye = face.keypoints[159], rightEye = face.keypoints[386];
    fill(255, 0, 0); noStroke();
    circle(leftEye.x, leftEye.y, 10);
    circle(rightEye.x, rightEye.y, 10);
  }
}
```

#### Step 3: Create Particle System

1. **Define `Particle` Class**  
   ```javascript
   class Particle {
     constructor(x, y, col) { this.position = createVector(x, y); this.velocity = createVector(random(-1, 1), random(-1, 1)); this.col = col; }
     updatePosition() { this.position.add(this.velocity); }
     display() { fill(this.col); noStroke(); ellipse(this.position.x, this.position.y, 10, 10); }
   }
   ```

2. **Set Up Particles Array**  
   ```javascript
   let particles = [], maxParticles = 100;
   ```

3. **Add Particles at Midpoint**  
   ```javascript
   function draw() {
     background(0);
     if (faces.length > 0) {
       let face = faces[0];
       let leftEye = face.keypoints[159], rightEye = face.keypoints[386];
       let centerX = (leftEye.x + rightEye.x) / 2, centerY = (leftEye.y + rightEye.y) / 2;
       if (particles.length < maxParticles) particles.push(new Particle(centerX, centerY, color(255, 200, 200)));
     }
     for (let p of particles) { p.updatePosition(); p.display(); }
   }
   ```

#### Step 4: Center with Easing

1. **Define Smoothing Variables**  
   ```javascript
   let smoothedCenterX, smoothedCenterY, easing = 0.1;
   ```

2. **Initialize Smoothed Center**  
   ```javascript
   function setup() { smoothedCenterX = width / 2; smoothedCenterY = height / 2; }
   ```

3. **Smooth Midpoint**  
   ```javascript
   function draw() {
     background(0, 20);
     let targetCenterX = width / 2, targetCenterY = height / 2;
     if (faces.length > 0) {
       let face = faces[0], leftEye = face.keypoints[159], rightEye = face.keypoints[386];
       targetCenterX = (leftEye.x + rightEye.x) / 2;
       targetCenterY = (leftEye.y + rightEye.y) / 2;
       fill(255, 0, 0); circle(leftEye.x, leftEye.y, 10); circle(rightEye.x, rightEye.y, 10);
       if (particles.length < maxParticles) particles.push(new Particle(smoothedCenterX, smoothedCenterY, color(255, 200, 200)));
     }
     smoothedCenterX += (targetCenterX - smoothedCenterX) * easing;
     smoothedCenterY += (targetCenterY - smoothedCenterY) * easing;
     push(); translate(smoothedCenterX - width / 2, smoothedCenterY - height / 2);
     for (let p of particles) { p.updatePosition(); p.display(); }
     pop();
   }
   ```

#### Step 5: Add Attraction-Repulsion Forces

1. **Update `Particle` Class**  
   ```javascript
   class Particle {
     constructor(x, y, col) {
       this.position = createVector(x, y);
       this.velocity = createVector(random(-1, 1), random(-1, 1));
       this.mass = random(0.003, 0.03);
       this.col = col;
     }
     applyForcesFromOthers(particles) {
       let accelerationX = 0, accelerationY = 0;
       for (let other of particles) {
         if (other !== this) {
           let distanceX = other.position.x - this.position.x;
           let distanceY = other.position.y - this.position.y;
           let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
           distance = max(distance, 1);
           let force = (distance - 150) * other.mass / distance;
           accelerationX += force * distanceX; accelerationY += force * distanceY;
         }
       }
       this.velocity.x = this.velocity.x * 0.99 + accelerationX * this.mass;
       this.velocity.y = this.velocity.y * 0.99 + accelerationY * this.mass;
     }
     updatePosition() { this.position.add(this.velocity); }
     display() { fill(this.col); noStroke(); ellipse(this.position.x, this.position.y, this.mass * 1000, this.mass * 1000); }
   }
   ```

2. **Apply Forces in `draw()`**  
   ```javascript
   for (let particle of particles) {
     particle.applyForcesFromOthers(particles);
     particle.updatePosition();
     particle.display();
   }
   ```

---

### Notes

Experiment with different values for easing, mass, and maxParticles to customize the behavior of the particle system.

---

