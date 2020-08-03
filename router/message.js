const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/general-inquiry', (req, res, next) => {
  const {
    message,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.messageGeneralInquiry({
    message,
  })
  .then(data => {
    res.status(200).json({ data });
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;