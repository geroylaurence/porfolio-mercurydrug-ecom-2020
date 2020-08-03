const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  res.status(200).json({ data: {} });
});

router.post('/location-list', (req, res, next) => {
  const {body} = req;

  res.status(200).json({ data: {} });
});

module.exports = router;