const express = require("express");
const http = require("http");

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const port = process.argv[2];
const app = express();

app.use(express.static(__dirname + "/client"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/colors/:bg/:fg", function (req, res) {
  res.render("colors", { bg: req.params.bg, fg: req.params.fg });
});

app.get("/keypress", function (req, res) {
  res.render("keypress", { title: "Keypress demo" });
});

app.get("/time", function (req, res) {
  res.render("time");
});

app.get("/getTime", function (req, res) {
  let date = new Date();
  res.send(date);
});

app.get("*", function (req, res) {
  res.render("index", { route: req.path });
});

http.createServer(app).listen(port, function () {
  console.log("Ready on port " + port);
});
