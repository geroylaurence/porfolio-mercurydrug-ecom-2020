const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/', (req, res, next) => {
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

router.post('/state-list', (req, res, next) => {
  const {
    regionId
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.locationProvinceCityList(regionId)
  .then(data => {
    res.status(200).json({ data });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/branch-list', (req, res, next) => {
  const {
    stateId,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.locationBranchList(stateId)
  .then(data => {
    res.status(200).json({ data });
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;