
# FaceMesh Sketch with p5.js

This sketch demonstrates real-time facial feature detection using p5.js and the [FaceMesh API](https://google.github.io/mediapipe/solutions/face_mesh). It identifies facial landmarks, enabling interactive experiences that respond to facial movements and expressions.

*[See it working here ](https://editor.p5js.org/cuvner/full/PURyyCwCW)*

## Acknowledgments

This sketch builds on the work by [Daniel Shiffman](https://www.youtube.com/user/shiffman) and his tutorial, [Using FaceMesh with ml5.js](https://www.youtube.com/watch?v=EA3-k9mnLHs). It uses the [ml5.js FaceMesh model](https://ml5js.org/) for easy integration with p5.js, simplifying real-time facial landmark detection.

## Project Structure

```
faceMesh/
├── sketch.js          # Main p5.js sketch file with FaceMesh integration
├── index.html         # HTML file to run the sketch in a browser
└── style.css          # Optional CSS for additional styling
```

## How It Works

The `faceMesh` sketch uses the MediaPipe FaceMesh model, available in ml5.js, which detects key points on the face in real time via the webcam. This allows for tracking facial expressions, movements, and specific facial features (e.g., eyes, mouth, and nose). This sketch can be the foundation for interactive applications like facial filters, gesture-based controls, and augmented reality experiences.

### Key Features

- **Real-Time Facial Tracking**: Detects over 400 facial landmarks in real time using the webcam.
- **Interactive Capabilities**: Can be customized to respond to facial movements (e.g., raise eyebrows to trigger an event).
- **Visual Overlay**: Draws landmarks and outlines directly onto the face in the video feed.

## Dependencies

This sketch relies on the following libraries:

- **p5.js**: A JavaScript library for creative coding. Download from [p5js.org](https://p5js.org/).
- **ml5.js**: Simplifies the use of machine learning models, including FaceMesh. Check out [ml5.js](https://ml5js.org/).

## Setup Instructions

1. **Clone or Download the Repository**

   Clone this repository or download it as a ZIP file, and navigate to the `faceMesh` folder.

2. **Run the Sketch Locally or Online**

   You can choose one of the following methods to run the sketch:

   ### Option A: Run Locally Using VSCode Live Server
   - Install the **Live Server** extension in Visual Studio Code.
   - Open the `faceMesh` folder in VSCode.
   - Right-click `index.html` and select **Open with Live Server**.

   ### Option B: Run Locally Using Node.js (HTTP Server)
   - Install [Node.js](https://nodejs.org/).
   - Use `http-server` to serve the sketch locally:
     ```bash
     npm install -g http-server
     http-server .
     ```
   - Open `http://localhost:8080` in your browser.

   ### Option C: Run Locally Using MAMP
   - [Download and install MAMP](https://www.mamp.info/).
   - Move the `faceMesh` folder into the `MAMP/htdocs` directory.
   - Start MAMP, then open `http://localhost:8888/faceMesh/index.html` in your browser.

   ### Option D: Upload to p5js.org
   - Go to [p5js.org](https://editor.p5js.org/).
   - Create a new sketch and copy the contents of `index.html` and `sketch.js` into the editor.
   - Save and run the sketch in the online editor.

3. **Enable Webcam Access**

   The sketch will prompt for access to your webcam. Grant permission to allow the FaceMesh model to access video input.

## Usage

1. **Open the Web Page**: Access the page in your web browser, and ensure your webcam is enabled.
2. **View Real-Time Face Tracking**: As the sketch runs, it will detect facial landmarks and display them as points or lines on your face.
3. **Customize the Sketch**: Modify `sketch.js` to add custom interactions, visual effects, or responses to specific facial expressions.

## Customization Ideas

- **Add Filters**: Create a filter effect that moves with the user's face.
- **Gesture Controls**: Map specific facial movements (e.g., mouth open, raise eyebrows) to trigger events in the sketch.
- **Augmented Reality Effects**: Add graphics, such as hats or glasses, that follow the face in real time.

## Troubleshooting

- **Webcam Issues**: Ensure the browser has permission to access your webcam and that it’s not being used by another application.
- **Performance**: FaceMesh is CPU-intensive; closing other applications may help improve performance.

## License

This project is open-source and intended for educational and creative purposes.
