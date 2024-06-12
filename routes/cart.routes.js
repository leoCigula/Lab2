/*
const express = require("express");
const router = express.Router();

// Dodavanje proizvoda u košaricu
router.post("/add/:id([0-9]{1,10})", function (req, res, next) {
  let id = parseInt(req.params.id);
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(id);
  res.sendStatus(204); // Server ne renderira novu stranicu
});

// Uklanjanje proizvoda iz košarice
router.post("/remove/:id([0-9]{1,10})", function (req, res, next) {
  let id = parseInt(req.params.id);
  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(productId => productId !== id);
  }
  res.sendStatus(204);
});

// Dohvat svih proizvoda u košarici
router.get("/getAll", function (req, res, next) {
  res.render("cart", {
    session: req.session,
    cart: req.session.cart || []
  });
});

module.exports = router;
*/

/*
const express = require('express');
const router = express.Router();
const data = require('../data/mydata.js');

let cart = {};

router.get('/', (req, res) => {
    res.render('cart', { cart });
});

router.post('/add/:productId', (req, res) => {
    const productId = req.params.productId;
    cart[productId] = (cart[productId] || 0) + 1;
    res.status(200).json({ success: true });
});

router.get('/getAll', (req, res) => {
    res.json(cart);
});

module.exports = router;
*/

/*
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cart');
});


// Dodavanje proizvoda u košaricu
router.post("/add/:productId", function (req, res, next) {
  const productId = req.params.productId;
  if (!req.session.cart) {
    req.session.cart = {};
  }
  req.session.cart[productId] = (req.session.cart[productId] || 0) + 1;
  res.status(200).json({ success: true });
});

// Uklanjanje proizvoda iz košarice (nije implementirano u ovom primjeru)
router.post("/remove/:productId", function (req, res, next) {
  // Implementirajte kod za uklanjanje proizvoda iz sesije
});

// Dohvat svih proizvoda u košarici
router.get("/getAll", function (req, res, next) {
  res.json(req.session.cart || {});
});

module.exports = router;

*/

/*
const express = require('express');
const router = express.Router();
const data = require('../data/mydata.js');

// Adding a product to the cart
router.post("/add/:productId", function (req, res, next) {
  const productId = req.params.productId;
  if (!req.session.cart) {
    req.session.cart = {};
  }
  req.session.cart[productId] = (req.session.cart[productId] || 0) + 1;
  res.status(205).json({ success: true });
});

router.post("/update/:productId", (req, res) => {
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  if (!req.session.cart) {
    req.session.cart = {};
  }
  if (quantity <= 0) {
    delete req.session.cart[productId];
  } else {
    req.session.cart[productId] = quantity;
  }
  res.status(200).json({ success: true, cart: req.session.cart });
});

// Removing a product from the cart (not implemented in this example)
router.post("/remove/:productId", function (req, res, next) {
  const productId = req.params.productId;
  if(req.session.cart && req.session.cart[productId] >=1 )
      req.session.cart[productId]--;
  else 
    delete req.session.cart[productId];
  res.status(205).json({ success: true });
});


router.get("/getAll", function (req, res, next) {
  res.json(req.session.cart || {});
});

router.get('/', (req, res) => {
  res.render('cart');
});


module.exports = router;

*/
const express = require('express');
const router = express.Router();
const data = require('../data/mydata.js');

// Adding a product to the cart
router.post("/add/:productId", (req, res) => {
  const productId = req.params.productId;
  if (!req.session.cart) {
    req.session.cart = {};
  }
  req.session.cart[productId] = (req.session.cart[productId] || 0) + 1;
  res.status(200).json({ success: true, cart: req.session.cart });
});

// Updating the quantity of a product in the cart
router.post("/update/:productId", (req, res) => {
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  if (!req.session.cart) {
    req.session.cart = {};
  }
  if (quantity <= 0) {
    delete req.session.cart[productId];
  } else {
    req.session.cart[productId] = quantity;
  }
  res.status(200).json({ success: true, cart: req.session.cart });
});

// Removing a product from the cart
router.delete("/remove/:productId", (req, res) => {
  const productId = req.params.productId;
  if (req.session.cart && req.session.cart[productId]) {
    delete req.session.cart[productId];
  }
  res.status(200).json({ success: true, cart: req.session.cart });
});

// Getting all items in the cart
router.get("/getAll", (req, res) => {
  res.json(req.session.cart || {});
});

// Render cart view
router.get('/', (req, res) => {
  res.render('cart', { cart: req.session.cart || {} });
});

module.exports = router;
