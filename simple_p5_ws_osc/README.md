
# Simple p5.js + WebSocket + OSC Project

This project combines p5.js, WebSockets, and OSC to create an interactive environment where OSC messages control animations in a p5.js sketch. It serves the web page over Express, so you can access it from any device on the same network.

## Project Structure

```
project-folder/
├── README.md                # Project instructions
├── app.js                   # Node.js server for Express, WebSocket, and OSC
├── index.html               # Main HTML file for the p5.js sketch
├── package.json             # Project dependencies and start script
└── web/
    ├── osc-browser.js       # Browser-compatible version of osc.js for OSC handling
    ├── p5.js                # p5.js library
    ├── p5.dom.min.js        # p5 DOM library
    ├── p5.sound.min.js      # p5 Sound library
    ├── sketch.js            # Main p5.js sketch file
    └── style.css            # Optional CSS file for styling
```

## Prerequisites

- **Node.js**: Download and install Node.js from [https://nodejs.org](https://nodejs.org).
- **TouchOSC or another OSC client** (if you want to send OSC messages).

## Setup Instructions

1. **Download or Clone the Repository**

   You can download the project folder as a ZIP file or clone it from the repository. Extract the ZIP file if you downloaded it.

2. **Navigate to the Project Directory**

   Open a terminal and navigate to the project directory:
   ```bash
   cd project-folder
   ```

3. **Install Dependencies**

   Run the following command to install all required Node.js packages:
   ```bash
   npm install
   ```

## Running the Project

1. **Start the Server**

   Start the Node.js server with:
   ```bash
   npm start
   ```

   The server will:
   - Host the `index.html` file at `http://localhost:8081`.
   - Open a WebSocket on the same port (`8081`) for OSC communication.
   - Listen for OSC messages on UDP port `57121`.

   After starting, the server will display your local IP addresses in the terminal. For example:
   ```
   Web server running. Access it at one of the following URLs:
     http://192.168.x.x:8081
   ```

2. **Access the Web Page**

   Open a browser on any device connected to the same network and navigate to `http://<your-ip>:8081` (replace `<your-ip>` with the IP address printed by the server). This will load the p5.js sketch in `index.html`.

## Configuring an OSC Client (e.g., TouchOSC)

If you want to control the p5.js sketch with OSC messages:

1. **Set the Host IP**: In TouchOSC, set the **Host** to the IP address of the computer running the server.
2. **Set the Outgoing Port**: Set the **Outgoing Port** to `57121` to send OSC messages to the server.
3. **Set the Incoming Port**: Set the **Incoming Port** to `8081` to receive messages from the server.

Now, you should be able to control the p5.js sketch from TouchOSC by sending OSC messages to the specified addresses (e.g., `/1/fader1`).

## Customizing the p5.js Sketch

The p5.js sketch is in `web/sketch.js`. You can open this file in any text editor and modify it as needed to change the behavior, visuals, and OSC message handling.

## Troubleshooting

- **Server Not Accessible**: Ensure all devices are on the same network.
- **CSP Errors**: The server is configured to allow loading local resources, but if errors occur, check `app.js` for the Content-Security-Policy configuration.

## License

This project is open-source and available for educational use.

