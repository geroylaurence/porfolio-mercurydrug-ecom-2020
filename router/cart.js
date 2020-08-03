const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/add-item', (req, res, next) => {
  // schema
  const {
    productId,
    quantity,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartAddItem({
    productId,
    quantity,
  })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/add-bulk-items', (req, res, next) => {
  const { items } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartAddBulkItems({ items })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/update-item-quantity', (req, res, next) => {
  // schema
  const {
    cartId,
    quantity,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartUpdateItemQuantity({
    cartId,
    quantity,
  })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/delete-item', (req, res, next) => {
  // schema
  const {
    cartId,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartDeleteItem(cartId)
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/count-items', (req, res, next) => {
  // schema
  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartCountItems()
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/get-items', (req, res, next) => {
  // schema
  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartGetItems()
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
})

module.exports = router;