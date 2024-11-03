
# AR Poster with p5.js, A-Frame, and MindAR

This project creates an interactive augmented reality (AR) poster using **p5.js**, **A-Frame**, and **MindAR**. By scanning a predefined image, users can view animated content overlaying the poster through their device.

This setup is based on the workflow described in [Ted Davis's Generative AR website](https://gen-ar.github.io/).

## Project Workflow

Follow these steps to set up the project:

### 1. Create Project Structure

Start by creating the following directory structure:

```
project-folder/
├── index.html           # Main HTML file
├── js/
│   └── sketch.js        # p5.js sketch
└── data/
    └── targets.mind     # Generated MindAR target file from your poster image
```

### 2. Generate the Tracking File

1. Use the [MindAR Image Target Compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile) to convert your target image (e.g., the poster) into a `.mind` file.
2. Save the generated file as `targets.mind` in the `data` folder.

### 3. Setup `index.html`

In `index.html`, add the following essential elements:

#### `<head>` Section

Load **A-Frame**, **MindAR**, and **p5.js** libraries. Also, load your custom `sketch.js` file for the p5.js sketch.

```html
<head>
    <!-- Load A-Frame, MindAR, and p5.js libraries -->
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.3/dist/mindar-image-aframe.prod.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>

    <!-- Load your sketch -->
    <script src="js/sketch.js?1"></script>

    <!-- A-Frame component to continuously update the canvas as texture -->
    <script type="text/javascript">
        AFRAME.registerComponent('canvas-updater', {
            dependencies: ['geometry', 'material'],
            tick: function () {
                var material = this.el.getObject3D('mesh').material;
                if (!material.map) { return; }
                material.map.needsUpdate = true;
            }
        });
    </script>
</head>
```

#### `<body>` Section

1. **Create a Canvas for p5.js Content**:
   - The canvas is hidden from direct display and is used as a texture for the AR experience.

   ```html
   <canvas id="canvas-ar" style="display:none;"></canvas>
   ```

2. **MindAR and A-Frame Setup**:
   - Use the `mindar-image` component to specify your tracking target.
   - Create an `a-plane` entity to apply the p5.js canvas as a texture, with the correct aspect ratio for an A4 poster.

   ```html
   <body>
       <a-scene mindar-image="imageTargetSrc: data/targets.mind?1; filterMinCF:0.0005; filterBeta: .1;" 
                vr-mode-ui="enabled: false" 
                device-orientation-permission-ui="enabled: false">
           <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
           <a-entity id="example-target" mindar-image-target="targetIndex: 0">
               <!-- Apply p5.js canvas as texture -->
               <a-plane width="1" height="1.4145" position="0 0 0" scale="1.05 1.05 1.05" rotation="0 0 0" 
                        material="src:#canvas-ar;transparent: true;" canvas-updater></a-plane>
           </a-entity>
       </a-scene>
   </body>
   ```

### 4. Set Up `sketch.js`

In `sketch.js`, initialize the p5.js canvas to render on the existing A-Frame canvas. Adjust settings for optimal performance.

```javascript
function setup() {
    // Create canvas with aspect ratio for A4 poster
    createCanvas(895, 1280, document.getElementById('canvas-ar'));
    pixelDensity(1); // Prevent high PPI for better performance on mobile
}

// Additional p5.js code for your sketch
function draw() {
    background(0);
    fill(255, 0, 0);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("HACKATHON", width / 2, height / 4);
}
```

### 5. Deploy on GitHub Pages

1. Push your project to GitHub.
2. In your repository, go to **Settings > Pages**.
3. Set the source to the main branch and the appropriate folder.
4. Your project will be hosted on GitHub Pages, allowing users to access it directly.

### Hosting

This workflow uses only static HTML pages, so it can be uploaded to just about any webhosting service. One free option is to host it using GitHub's own Pages feature:

1. Create a Github Account
2. Download Github Desktop App and launch, sign-in
3. File Menu » New Repository... » select directory
4. Publish Repository to GitHub
5. Github Repo » Settings » Pages » Default Branch select Main
6. Visit https://username.github.io/reponame
7. Create QR code for easy referral on smartphone » [QR-CODES](https://www.qrcode-monkey.com/)

Alternatively, [glitch.com](https://glitch.com/) can be a great free place to host your projects. For the simplest workflow, upload to GitHub, then within glitch.com create a glitch-hello-website (static html) project. Use their Tools » Import/Export » Import from GitHub to pull in your project.

## Usage

Once deployed, users can access the AR poster page on GitHub Pages. They simply need to scan the poster through their device to see the interactive AR content.

## References

- [Ted Davis's Generative AR](https://gen-ar.github.io/)
- [MindAR Documentation](https://hiukim.github.io/mind-ar-js-doc/)
- [A-Frame Documentation](https://aframe.io/docs/1.4.0/)

## License

This project is open-source and intended for educational and creative purposes.
