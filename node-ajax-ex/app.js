/* global Buffer */
/* global __dirname */
const express = require("express");
const url = require("url");
const http = require("http");

const port = 3010;
const app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

let psvrGames = [
	{
		title: "Iron Man VR",
		rating: "Teen",
		price: "$39"
	},
	{
		title: "Fruit Ninja",
		rating: "",
		price: "$28"
	},
	{
		title: "Creed: Rise to Glory",
		rating: "Teen",
		price: "$19.99"
	}
];


//clients requests the list of games
app.get("/psvrGames", function (req, res) {
	console.log("PSVR games requested!");
	res.json(psvrGames);
});

//add a game
app.get("/addPsvrGame", function (req, res) {
	let query = url.parse(req.url, true).query;

	let newGame = {
		title: query["title"],
		rating: query["rating"],
		price: query["price"]
	}

	if( newGame.title == undefined || newGame.title.length==0)
		res.end("Each new game needs to have at least a title.");

	psvrGames.push(newGame);

	console.log("Game " + newGame.title + " added.");
	res.end("Todo added successfully");
});
