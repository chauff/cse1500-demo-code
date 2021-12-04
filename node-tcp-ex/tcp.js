const fs = require("fs");
const net = require("net");

if (process.argv.length < 4) {
  console.log("Usage: node app.js <filename> <port>");
  process.exit(1);
}
//command line arguments: file to watch and port number
const filename = process.argv[2];
const port = process.argv[3];

const server = net.createServer(function (connection) {
  //what to do on connect
  console.log("Subscriber connected");
  connection.write("Now watching " + filename + " for changes\n");

  const watcher = fs.watch(filename, function () {
    connection.write(
      "File " +
        filename +
        " has changed: " +
        new Date(Date.now()).toString() +
        "\n"
    );
  });

  //what to do on disconnect
  connection.on("close", function () {
    console.log("Subscriber disconnected");
    watcher.close();
  });
});

server.listen(port, function () {
  console.log("Listening to subscribers...");
});
