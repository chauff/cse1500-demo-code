const express = require("express");
const http = require("http");
const websocket = require("ws");

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const port = process.argv[2];
const app = express();

app.use("/", function (req, res) {
  res.sendFile("client/index.html", { root: "./" });
});

const server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", function (ws) {
  /*
   * let's slow down the server response time a bit to
   * make the change visible on the client side
   */
  setTimeout(function () {
    console.log("Connection state: " + ws.readyState);
    ws.send("Thanks for the message. --Your server.");
    ws.close();
    console.log("Connection state: " + ws.readyState);
  }, 2000);

  ws.on("message", function incoming(message) {
    console.log("[LOG] " + message);
  });
});

server.listen(port);
