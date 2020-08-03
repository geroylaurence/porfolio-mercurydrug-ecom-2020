const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/remove-prescription-image', (req, res, next) => {
  // schema
  const {
    imageId,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.removePrescriptionCheckout(imageId)
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/proceed-payment', (req, res, next) => {
  // schema
  const {
    deliveryType,
    addressId,
    branchId,
    rewardPointsRedemption = 0,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.checkoutProceedPayment({
    deliveryType,
    addressId: parseInt(addressId),
    branchId: parseInt(branchId),
    rewardPointsRedemption: parseFloat(rewardPointsRedemption),
  })
  .then(result => res.status(200).json({ data: result }))
  .catch(err => {
    next(err);
  });
});

router.post('/update-status', (req, res, next) => {
  // schema
  const {
    status,
    orderId,
    referenceKey,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.checkoutUpdateStatus({
    status,
    orderId,
    referenceKey,
  })
  .then(result => res.status(200).json({ data: result }))
  .catch(err => next(err));
});

router.post('/esuki-points-total', (req, res, next) => {
   const MercuryDrug = new DB();
   MercuryDrug._authorization = req.cookies.accessToken;
   MercuryDrug.walletEsukiPtsTotal()
  .then(result => res.status(200).json({ data: result }))
  .catch(err => next(err));
});

router.post('/cart-initiate-redeem-points', (req, res, next) => {
  const { redeemPoints } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.cartInitiateRedemeemPoints(redeemPoints)
  .then(result => res.status(200).json({ data: result }))
  .catch(err => next(err));
});

module.exports = router;