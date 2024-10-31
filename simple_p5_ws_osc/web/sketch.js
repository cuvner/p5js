let oscPort;
let ellipseX, ellipseY;
let ellipseW, ellipseH;
let ellipseColor;
let velocityX, velocityY;
let bouncing = false;

function setup() {
  createCanvas(400, 400);
  
  // Initialize ellipse properties
  ellipseX = width / 2;
  ellipseY = height / 2;
  ellipseW = 50;
  ellipseH = 50;
  ellipseColor = color(255, 255, 255);
  velocityX = 3;
  velocityY = 3;
  
  // Prompt for server IP or use localhost
  let serverIP = prompt("Enter the server IP address (or leave blank for localhost):", "localhost");
  
  // Set up WebSocket connection for OSC communication
  oscPort = new osc.WebSocketPort({
    url: `ws://${serverIP}:8081`
  });
  
  // Listen for incoming OSC messages
  oscPort.on("message", (msg) => {
    console.log("Received OSC message:", msg);
    handleOscMessage(msg);
  });
  
  // Open the WebSocket connection
  oscPort.open();
}

function draw() {
  background(220);
  
  // Move the ellipse if bouncing is enabled
  if (bouncing) {
    ellipseX += velocityX;
    ellipseY += velocityY;
    
    // Check for collision with canvas edges and reverse velocity
    if (ellipseX > width - ellipseW / 2 || ellipseX < ellipseW / 2) {
      velocityX *= -1;
    }
    if (ellipseY > height - ellipseH / 2 || ellipseY < ellipseH / 2) {
      velocityY *= -1;
    }
  }
  
  // Draw the ellipse
  fill(ellipseColor);
  ellipse(ellipseX, ellipseY, ellipseW, ellipseH);
}

function handleOscMessage(msg) {
  // Map OSC messages to control ellipse properties
  switch (msg.address) {
    case '/1/fader1': // Width control
      ellipseW = map(msg.args[0], 0, 1, 20, 200);
      break;
    case '/1/fader2': // Height control
      ellipseH = map(msg.args[0], 0, 1, 20, 200);
      break;
    case '/1/fader3': // X position
      ellipseX = map(msg.args[0], 0, 1, 0, width);
      break;
    case '/1/fader4': // Y position
      ellipseY = map(msg.args[0], 0, 1, 0, height);
      break;
    case '/1/fader5': // Color control (changing color with RGB components)
      let red = map(msg.args[0], 0, 1, 0, 255);
      let green = map(msg.args[0], 0, 1, 255, 0);
      let blue = map(msg.args[0], 0, 1, 128, 255);
      ellipseColor = color(red, green, blue);
      break;
    case '/1/button1': // Toggle bouncing
      if (msg.args[0] === 1) { // Button pressed
        bouncing = !bouncing;
      }
      break;
  }
}

