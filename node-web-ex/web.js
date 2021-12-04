const http = require("http");

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const port = process.argv[2];

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!");
  console.log("HTTP response sent");
});

server.listen(port, function () {
  console.log("Listening on port " + port);
});
