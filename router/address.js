const express = require('express');
const router = express.Router();

router.post('/list', (req, res, next) => {
  res.status(200).json({ data: {} });
});

router.post('/add', (req, res, next) => {
  // schema
  const {
    contactName,
    contactNumber,
    secondaryContact,
    addressLine1,
    addressLine2,
    barangay,
    province,
    city,
    zipCode,
    country = '[PH] Philippines',
  } = req.body;

  res.status(200).json({ data: {} });
});

module.exports = router;