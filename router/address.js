const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/list', (req, res, next) => {
  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.addressList()
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
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

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.addressAdd({
    contactName,
    contactNumber: `+63${contactNumber}`,
    secondaryContact: (secondaryContact && secondaryContact !== '' && secondaryContact !== null) ? `+63${secondaryContact}` : undefined,
    addressLine1,
    addressLine2,
    barangay,
    province,
    city,
    zipCode,
    country,
  })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;