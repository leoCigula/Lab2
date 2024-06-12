/*const express = require("express");
const router = express.Router();
const data = require('../data/mydata.js'); // Pretpostavimo da su podaci u mydata.js

// Ruta za dohvat kategorija
router.get("/getCategories", function (req, res, next) {
  res.render("home", {
    session: req.session,
    categories: data.categories
  });
});

// Ruta za dohvat proizvoda po kategoriji
router.get("/getProducts/:id([0-9]{1,10})", function (req, res, next) {
  const categoryId = req.params.id;
  const products = data.products.filter(product => product.categoryId == categoryId);
  res.render("home", {
    session: req.session,
    products: products
  });
});

module.exports = router;
*/


/*const express = require("express");
const router = express.Router();
const data = require('../data/mydata.js');

// Route to get categories
router.get('/', (req, res) => {
  res.render('home', { categories: data.categories });
});

router.get('/getProducts/:categoryId', (req, res) => {
  const category = data.categories.find(cat => cat.id === req.params.categoryId);
  if (category) {
      res.json(category.products);
  } else {
      res.status(404).json({ error: 'Category not found' });
  }
});

module.exports = router;



// Route to get products by category ID
router.get("/getProducts/:id([0-9]{1,10})", function (req, res, next) {
  const categoryId = parseInt(req.params.id);
  const category = data.categories.find(cat => cat.id === categoryId);

  if (category) {
    res.render("home", {
      session: req.session,
      products: category.products
    });
  } else {
    res.status(404).send("Category not found");
  }
});



module.exports = router;

*/

const express = require("express");
const router = express.Router();
const data = require('../data/mydata.js');

// Route to get categories
router.get('/', (req, res) => {
  res.render('home', { session: req.session, categories: data.categories });
});

// Route to get products by category ID
router.get('/getProducts/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const category = data.categories.find(cat => cat.id === categoryId);

  if (category) {
    res.json(category.products);
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

module.exports = router;
