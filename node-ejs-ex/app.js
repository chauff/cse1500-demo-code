/* global __dirname */
/* global process */
var express = require("express");
var url = require("url");
var http = require("http");
var app;

var port = process.argv[2];
app = express();
http.createServer(app).listen(port, function () {
  console.log("Ready on port " + port);
});

var wishlist = [];
wishlist.push({ name: 'Wingspan', type: 'game night'  });
wishlist.push({ name: 'Munchkin', type: 'party game' });
wishlist.push({ name: 'Scrabble', type: 'game night' });
wishlist.push({ name: 'Uno', type: 'party game' });
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/wishlist", function (req, res) {
  res.render('wishlist', { title: 'Game wishlist', input: wishlist });
});
