const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const {body} = req;

  res.status(200).json({ data: {} });
});

router.post('/state-list', (req, res, next) => {
  const {
    regionId
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/branch-list', (req, res, next) => {
  const {
    stateId,
  } = req.body;

  res.status(200).json({ data: {} });
});

module.exports = router;