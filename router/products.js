const express = require('express');
const router = express.Router();

router.post('/category-banner', (req, res, next) => {
  res.status(200).json({ data: [] });
});

router.post('/category-list', (req, res, next) => {
  const categoryList = require('../json-data/category-list');

  setTimeout(() => {
    res.status(200).json({ data: categoryList });
  }, 3000);
});

router.post('/by-category', (req, res, next) => {
  const {
    categoryId
  } = req.body;

  let sendData = [];
  let productList = {
    [`${1}`]: require('../json-data/product-list-by-category/[1]baby-childcare.json'),
    [`${2}`]: require('../json-data/product-list-by-category/[2]beauty-personal-care.json'),
    [`${3}`]: require('../json-data/product-list-by-category/[3]diabetes-care.json'),
    [`${4}`]: require('../json-data/product-list-by-category/[4]diet-fitness.json'),
    [`${5}`]: require('../json-data/product-list-by-category/[5]food-beverages.json'),
    [`${7}`]: require('../json-data/product-list-by-category/[7]home-health-care.json'),
    [`${8}`]: require('../json-data/product-list-by-category/[8]household.json'),
    [`${9}`]: require('../json-data/product-list-by-category/[9]medicine.json'),
    [`${10}`]: require('../json-data/product-list-by-category/[10]senior-care.json'),
    [`${11}`]: require('../json-data/product-list-by-category/[11]-vitamins-supplements.json'),
    [`${12}`]: require('../json-data/product-list-by-category/[12]features.json'),
  };

  if (productList.hasOwnProperty(`${categoryId}`)) {
    sendData = productList[`${categoryId}`];
  }

  setTimeout(() => {
    res.status(200).json({ data: sendData });
  }, 3000);
});

router.post('/by-purchased', (req, res, next) => {
  res.status(200).json({ data: {} });
});

router.post('/search-all', (req, res, next) => {
  const {
    searchTerm
  } =  req.body;

  res.status(200).json({ data: {} });
});

router.post('/search-by-brand-generics', (req, res, next) => {
  const {
    searchTerm
  } =  req.body;

  res.status(200).json({ data: {} });
});

router.post('/inquiry', (req, res, next) => {
  const {
    searchTerms,
    message
  } =  req.body;

  res.status(200).json({ data: {} });
});

module.exports = router;