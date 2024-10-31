const osc = require("osc");
const WebSocket = require("ws");
const os = require("os");

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

// Create a UDP port for receiving OSC messages
const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 57121  // Port for incoming OSC messages
});

udpPort.on("ready", () => {
  const ipAddresses = getIPAddresses();
  console.log("Listening for OSC over UDP on port 57121");
  ipAddresses.forEach((address) => {
    console.log(`Server IP: ${address}, UDP Port: 57121`);
  });
});

// Open the UDP port for OSC
udpPort.open();

// Send an OSC message to a specified IP and port (e.g., to TouchOSC)
const sendOscMessage = (address, args, targetIP, targetPort) => {
  const message = {
    address: address,
    args: args
  };

  udpPort.send(message, targetIP, targetPort);
};

// Example of sending a test message
sendOscMessage("/test", [123], "192.168.8.238", 57121); // Replace with target IP and port

// Create a WebSocket server for the browser
const wss = new WebSocket.Server({ port: 8081 });
console.log("WebSocket server running on ws://localhost:8081");

wss.on("connection", (socket) => {
  console.log("A WebSocket connection has been established!");

  // Set up an OSC WebSocket port
  const socketPort = new osc.WebSocketPort({ socket: socket });

  // Relay OSC messages between UDP and WebSocket
  const relay = new osc.Relay(udpPort, socketPort, { raw: true });
});

