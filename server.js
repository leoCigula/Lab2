
/*
const express = require('express');
const session = require("express-session");
const path = require("path");

const app = express();

app.use(function(req, res, next) {
    console.log('Incoming request:', req.url);
    next();
});

app.use(function(req, res, next) {
    // zamislimo da ovdje provjeravamo u bazi podataka
    // je li (a) korisnik postojeći.
    //       (b/c) ako je postojeći, je li: admin ili user?
    let i = Math.floor(Math.random() * 3);
    if (i == 2) {
        res.status(403).send('Unknown user');
    } else {
        req.user = ["user", "admin"][i];
        next();
    }
});

app.get('/', function(req, res) {
    if (req.user === 'admin') {
        res.send('Hello Admin!');
    } else {
        res.send('This page is for admins only.');
    }
});

app.listen(3000);

*/

var path = require("path");
var express = require("express");
var session = require("express-session");
const hr = require("./routes/home.routes.js");
var cr = require("./routes/cart.routes");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
      secret: "anything",
      resave: false,
      saveUninitialized: true,
    })
  );
  
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
//


app.use('/', hr);
app.use('/cart', cr);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });