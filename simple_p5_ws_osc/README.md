
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
- **TouchOSC access some phone sensors too. One time cost of £14 or another OSC client** [TouchOsc](https://apps.apple.com/us/app/touchosc/id1569996730) (if you want to send OSC messages).

- **Android Users** Alternatives however untested [Google play app](https://play.google.com/store/apps/details?id=com.ffsmultimedia.osccontroller&hl=en_GB)

  <img width="997" alt="Screenshot 2024-10-31 at 18 16 48" src="https://github.com/user-attachments/assets/3d7bb9ec-3a75-43ef-8906-ba0fd4179f21">


## Setup Instructions

Clone this repo and run npm to get required libraries.

	$ git clone https://github.com/cuvner/p5js.git
	$ cd p5js-main/simple_p5_ws_osc
	$ npm install

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

CMD/CTRL click the ip-addr link to open webpage
``` terminal
WebSocket server running on ws://<your IP>:8081
Web server running. Access it at one of the following URLs:
  http://192.168.8.238:8081
Listening for OSC over UDP on port 57121
A WebSocket connection has been established!
```

## Configuring an OSC Client (e.g., TouchOSC)

If you want to control the p5.js sketch with OSC messages:

![IMG_1AB63D273DA2-1](https://github.com/user-attachments/assets/bf8614d5-69c5-4ec8-8441-06c1272adf95)

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

