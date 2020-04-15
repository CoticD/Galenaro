//jshint esversion: 6

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const request = require('request');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


const con = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7331254",
  password: "VgpUJpQ1eI",
  database: "sql7331254"
});

app.get("/", function(req, res) {
  if(req.session.loggedin){
    console.log("Uporabnik je prijavljen");
  }else{
    console.log("Uporabnik ni prijavljen");
  }
  res.render('index');
});

app.get("/tabela", function(req, res) {
  if(req.session.loggedin){
    console.log("Uporabnik je prijavljen");
    res.render('tabela');
  }else{
    console.log("Uporabnik ni prijavljen");
  }
});

app.post("/prijava", function(req, res) {

  const username = req.body.email;
  const password = req.body.geslo;

  con.query('SELECT password FROM customers WHERE email = ?', [username],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        bcrypt.compare(password, result[0].password, function(err, res1) {
          if (err) {
            console.log(err);
          }
          else if (res1) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/tabela');
          }else{
            console.log("uporabnik s tem imenom ne obstaja");
            res.redirect("/");
          }
        });
      }

    });
});

app.post("/registracija", function(req, res) {


  const username = req.body.email;
  const password = req.body.geslo;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    con.query('INSERT INTO customers (email, password) VALUES (?, ?)', [username, hash],
      function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(hash);
          console.log("1 record inserted");
          res.redirect("/");
        }
      });
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");

});
