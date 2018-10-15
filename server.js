// External Dependencies
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// models for Mongo DB
var db = require("./models/Articles");


// Web Ports
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
//app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.get("/", function(req, res) {
    res.render("index");
})

app.get("/scrape", function(req, res) {
    axios.get("https://www.reuters.com/finance/markets/us").then(function(res) {
    var $ = cheerio.load(res.data);
    //console.log("res.data", res.data.children("a").children("h3").text())
    // Store $crape results
    var result = {};

    // Add the text and href of every link, and save them as properties of the result object
    //.children("a").children("h3").text()
    result.title = $(this).children();
    result.link = $(this).children("a").attr("href");

     console.log("testing results", result)

     // $crape results go into the DB for displaying to the DOM later
     db.Article.create(result)
     .then(function(dbArticle) {
       // View the added result in the console
       console.log("Trying`````````````", dbArticle);
     })
     .catch(function(err) {
       // If an error occurred, send it to the client
       return res.json(err);
     });
 });
res.send("Complete")
});



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });