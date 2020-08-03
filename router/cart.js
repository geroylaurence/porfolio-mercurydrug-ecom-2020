const express = require('express');
const router = express.Router();

router.post('/add-item', (req, res, next) => {
  // schema
  const {
    productId,
    quantity,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/add-bulk-items', (req, res, next) => {
  const { items } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/update-item-quantity', (req, res, next) => {
  // schema
  const {
    cartId,
    quantity,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/delete-item', (req, res, next) => {
  // schema
  const {
    cartId,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/count-items', (req, res, next) => {
  // schema
  res.status(200).json({ data: {} });
});

router.post('/get-items', (req, res, next) => {
  // schema
  res.status(200).json({ data: {} });
});

module.exports = router;