const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/prescription-for-checkout', (req, res, next) => {
  const {
    prescription,
  } = req.files;

  console.log(prescription);

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.uploadPrescriptionCheckout({
    fileName: prescription.name,
    contentType: prescription.mimetype,
    data: prescription.data,
  })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;