//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
