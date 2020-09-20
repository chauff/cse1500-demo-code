var express = require("express");
var http = require("http");

/* Cookie and session setup */
var credentials = require("./credentials");
var cookies = require("cookie-parser");
var sessions = require("express-session");
/* Setup complete */
var app = express();

app.use(cookies(credentials.cookieSecret));
var sessionConfiguration = {
	// Code is slightly adjusted to avoid deprecation warnings when running the code.
	secret: credentials.cookieSecret,
	resave: false,
	saveUninitialized: true,
};
app.use(sessions(sessionConfiguration));
http.createServer(app).listen(3000);

app.get("/countMe", function (req, res) {

  /* session object available on req object only */
	var session = req.session;

	if (session.views) { /* the session exists! */
		session.views++;
		res.send("You have been here " + session.views + " times (last visit: " + session.lastVisit + ")");
		session.lastVisit = new Date().toLocaleDateString();
	}
	else { /* the session does not exist */
		session.views = 1;
		session.lastVisit = new Date().toLocaleDateString();
		res.send("This is your first visit!");
	}
});
