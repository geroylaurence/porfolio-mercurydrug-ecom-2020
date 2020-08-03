const express = require('express');
const router = express.Router();

router.post('/remove-prescription-image', (req, res, next) => {
  // schema
  const {
    imageId,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/proceed-payment', (req, res, next) => {
  // schema
  const {
    deliveryType,
    addressId,
    branchId,
    rewardPointsRedemption = 0,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/update-status', (req, res, next) => {
  // schema
  const {
    status,
    orderId,
    referenceKey,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/esuki-points-total', (req, res, next) => {
  res.status(200).json({ data: {} });
});

router.post('/cart-initiate-redeem-points', (req, res, next) => {
  const { redeemPoints } = req.body;

  res.status(200).json({ data: {} });
});

module.exports = router;