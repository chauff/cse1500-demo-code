/* global __dirname */
/* global process */
const express = require("express");
const url = require("url");
const http = require("http");

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const port = process.argv[2];
const app = express();
http.createServer(app).listen(port, function () {
  console.log("Ready on port " + port);
});

const wishlist = [];
wishlist.push({ name: "Wingspan", type: "game night" });
wishlist.push({ name: "Munchkin", type: "party game" });
wishlist.push({ name: "Scrabble", type: "game night" });
wishlist.push({ name: "Uno", type: "party game" });

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/wishlist", function (req, res) {
  res.render("wishlist", { title: "Game wishlist", input: wishlist });
});
