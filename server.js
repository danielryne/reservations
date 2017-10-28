// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Intial data 
// =============================================================
var reservations = [];

var tables = [
  {
    name: "Daniel",
    number: "555-555-5555",
    email: "daniel@fakemail.com",
    ID: 105 
  },
  {
    name: "Forrest",
    number: "444-444-4444",
    email: "forrest@fakemail.com",
    ID: 104
  },
  {
    name: "Miguel",
    number: "333-333-3333",
    email: "miguel@fakemail.com",
    ID: 103
  },
  {
    name: "Sharad",
    number: "222-222-2222",
    email: "sharad@fakemail.com",
    ID: 102
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(reservations);
});

// Create reservations (takes in JSON input) 
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  //verifying what was sent from the html
  console.log(newReservation);

  // Sees if there are tables available 
  if (tables.length < 5){

    //puts new reservation in the tables array 
    tables.push(newReservation);

    //If the table was reserved, sends back true 
    res.json(true);
  }
  else{

    //puts new reservation in the tables array 
    reservations.push(newReservation);

    // If there are too many reservations, send back false 
    res.json(false); 
  }

});

// Clears the data in the table 
app.post("/api/clear", function(req, res) {

  reservations = [];
  tables = [];

});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
