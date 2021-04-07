const express = require("express");
const http = require("http");

const port = process.argv[2];
const app = express();

app.use(express.static(__dirname + "/client"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/colors/:bg/:fg", function (req, res) {
  res.render('colors', {bg: req.params.bg,
  fg: req.params.fg});
});

app.get("/keypress", function (req, res) {
  res.render('keypress', {title: "Keypress demo"});
});

app.get("/getTime", function(r,p){
  let date = new Date();
  p.send(date);
})

http.createServer(app).listen(port, function () {
  console.log("Ready on port " + port);
});
