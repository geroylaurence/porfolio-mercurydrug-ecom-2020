const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/', (req, res, next) => {
  res.status(200).json({
    data: []
  });
});

router.post('/location-list', (req, res, next) => {
  const {body} = req;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.locationList()
  .then(data => {
    res.status(200).json({ data });
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;