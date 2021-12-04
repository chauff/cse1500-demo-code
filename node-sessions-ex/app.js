const express = require("express");
const http = require("http");

/* Cookie and session setup */
const credentials = require("./credentials");
const cookies = require("cookie-parser");
const sessions = require("express-session");
/* Setup complete */
const app = express();

app.use(cookies(credentials.cookieSecret));
const sessionConfiguration = {
  // Code is slightly adjusted to avoid deprecation warnings when running the code.
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: true,
};
app.use(sessions(sessionConfiguration));
http.createServer(app).listen(3000);

app.get("/countMe", function (req, res) {
  /* session object available on req object only */
  const session = req.session;

  if (session.views) {
    /* the session exists! */
    session.views++;
    res.send(
      "You have been here " +
        session.views +
        " times (last visit: " +
        session.lastVisit +
        ")"
    );
    session.lastVisit = new Date().toLocaleDateString();
  } else {
    /* the session does not exist */
    session.views = 1;
    session.lastVisit = new Date().toLocaleDateString();
    res.send("This is your first visit!");
  }
});
