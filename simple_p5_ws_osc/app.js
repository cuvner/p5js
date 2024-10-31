const osc = require("osc");
const WebSocket = require("ws");
const express = require("express");
const path = require("path");
const os = require("os");

const app = express();
const PORT = 8081;

// Serve static files from the root directory (including index.html)
app.use(express.static(__dirname));

// Serve additional static files from the 'web' folder
app.use(express.static(path.join(__dirname, "web")));

// Start the server and listen on the specified port
const server = app.listen(PORT, () => {
  const ipAddresses = getIPAddresses();
  console.log(`Web server running. Access it at one of the following URLs:`);
  ipAddresses.forEach((address) => {
    console.log(`  http://${address}:${PORT}`);
  });
});

// Function to get local IP addresses
const getIPAddresses = () => {
  const interfaces = os.networkInterfaces();
  const ipAddresses = [];
  for (let deviceName in interfaces) {
    const addresses = interfaces[deviceName];
    for (let i = 0; i < addresses.length; i++) {
      const addressInfo = addresses[i];
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        ipAddresses.push(addressInfo.address);
      }
    }
  }
  return ipAddresses;
};

// Set up OSC UDP port
const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57121
});

udpPort.on("ready", () => {
  console.log("Listening for OSC over UDP on port 57121");
});

udpPort.open();

// Set up WebSocket server for OSC communication
const wss = new WebSocket.Server({ server });
console.log(`WebSocket server running on ws://<your IP>:${PORT}`);

wss.on("connection", (socket) => {
  console.log("A WebSocket connection has been established!");
  const socketPort = new osc.WebSocketPort({ socket: socket });
  const relay = new osc.Relay(udpPort, socketPort, { raw: true });
});

