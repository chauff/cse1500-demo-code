//load http and express modules
const express = require("express");
var bodyParser = require("body-parser");
const http = require("http");
var parser = bodyParser.urlencoded({ extended: false});

//we can also load cookie, session, body parser, etc. middleware here

const port = 3000;
const app = express();

//set up the path to the folder containing all static content
app.use(express.static(__dirname + "/client"));

//set up the template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

let currentPattern = "/ab*cd";
let router;

//set up route definitions (also known as URL paths)
function setRouter() {

    router = new express.Router();

    /*
    * Retrieve the currently set pattern.
    * Define the callback function to invoke when a HTTP GET request
    * is made to /retrieveStringPattern.
    */
    router.get("/retrievePattern", function (req, res) {
        //res.render => EJS template engine
        //without a template engine we would use res.send()
        res.render('retrieve', { pattern: currentPattern });
    })

    /*
     * Dynamic route.
     */
    router.get(currentPattern, function (req, res) {
        res.render('valid', { pattern: currentPattern, path: req.url });
    });

    /*
    * Set the string pattern via a HTTP POST request
    */
    router.post("/setStringPattern", parser, function (req, res) {
        if (req.body.pattern.length > 0) {
            currentPattern = "/" + req.body.pattern;
            setRouter();
            res.render('set', { pattern: currentPattern });
        }
        else {
            res.render('error', { pattern: currentPattern, path: req.url });
        }
    })

    /*
    * Invalid route.
    */
    router.get("/*", function (req, res) {
        res.render('invalid', { pattern: currentPattern, path: req.url });
    })


    app.use(function (req, res, next) {
        router(req, res, next);
    })
}

setRouter(currentPattern);

//create an http server
http.createServer(app).listen(port);