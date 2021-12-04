"use strict";

function addGamesToList(games) {
  console.log("Loading games from server.");

  let gamesList = document.querySelector("ul");
  for (let key in games) {
    let game = games[key];
    let li = document.createElement("li");
    li.innerHTML = game.title + " (" + game.price + ")";
    gamesList.appendChild(li);
  }
}

/*
 * retrieve the games from the server once;
 * use setInterval to do this regularly
 */
axios
  .get("/psvrGames")
  .then(function (res) {
    //success
    console.log(res.status);
    console.log(res.data);
    addGamesToList(res.data);
  })
  .catch(function (err) {
    //error
    console.log(err);
  });
