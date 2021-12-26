const express = require("express");
const http = require("http");
const credentials = require("./credentials");
const cookies = require("cookie-parser");

console.log("credentials: " + credentials.cookieSecret);
const app = express();
app.use(cookies(credentials.cookieSecret));

if (process.argv.length < 3) {
  console.log("Usage: node app.js <port>");
  process.exit(1);
}
const port = process.argv[2];
http.createServer(app).listen(port, function () {
  console.log("Listening on port " + port);
});

app.get("/sendMeCookies", function (req, res) {
  console.log("Handing out cookies");
  res.cookie("chocolate", "kruemel");
  res.cookie("signed_chocolate", "monster", { signed: true });
  res.send("Cookies received. Head to your web developer tools and take a look at the 'Storage' tab. Inside this tab, locate the 'Cookies' storage.");
});

app.get("/listAllCookies", function (req, res) {
  console.log("++ unsigned ++");
  console.log(req.cookies);
  console.log("++ signed ++");
  console.log(req.signedCookies);
  res.clearCookie("chocolate");
  res.send();
});
