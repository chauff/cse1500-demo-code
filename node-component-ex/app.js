/* global Buffer */
/* global __dirname */
const express = require("express");
const url = require("url");
const http = require("http");

const port = 3000; //hardcoded port

const app = express();
app.use(express.static(__dirname + "/client"));

//logger component
app.use(function (req, res, next) {
	console.log("[LOG] %s %s", new Date(), req.url);
	next();
});

//authorization component
app.use(function (req, res, next) {
	var auth = req.headers.authorization;
	if (!auth) {
		return next(new Error("Unauthorized access!"));
	}
	var parts = auth.split(' ');
	var buf = new Buffer(parts[1], 'base64');
	var login = buf.toString().split(':');
	var user = login[0];
    var password = login[1];
    
    //hardcoded for demonstration purposes
    if (user === "user" && password === "password") {
        next();
    }
	else {
		return next(new Error("Wrong username/password combination!"));
	}
});

http.createServer(app).listen(port);

const wishlist = [];
let w1 = { type: "video game", name: "Hogwarts Legacy", priority: "high"};
let w2 = { type: "board game", name: "Sushi Go", priority: "medium"};
wishlist.push(w1);
wishlist.push(w2);

//clients requests her wishlist
app.get("/wishlist", function (req, res) {
	console.log("wishlist requested!");
	res.json(wishlist);
});

//add wishlist item to the server
app.get("/addWish", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	
	if(query["name"]==undefined){
		res.end("Error: the name of the wish has to be specified.");
	}
	else{
		let w = {type: "", name: query["name"], priority: ""};

		if(query["type"]!==undefined)
			w.type = query["type"];

		if(query["priority"]!==undefined)
			w.priority = query["priority"];

		wishlist.push(w);
		console.log("Added " + w.name);
		res.end("Wish added successfully");
	}
});
