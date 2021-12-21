const http = require("http");
const url = require("url");

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const port = process.argv[2];

function simpleHTTPResponder(req, res) {
  //parse the URL
  const uParts = url.parse(req.url, true);

  //implemented path
  if (uParts.pathname == "/greetme") {
    res.writeHead(200, { "Content-Type": "text/plain" });

    //parse the query
    const query = uParts.query;
    let name = "Anonymous";

    if (query["name"] != undefined) {
      name = query["name"];
    }

    res.end(" Greetings " + name);
  }
  //all other paths
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Only /greetme is implemented.");
  }
}

const server = http.createServer(simpleHTTPResponder);

server.listen(port, function () {
  console.log("Listening on port " + port);
});
