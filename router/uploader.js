const express = require('express');
const router = express.Router();

router.post('/prescription-for-checkout', (req, res, next) => {
  const {
    prescription,
  } = req.files;

  res.status(200).json({ data: {} });
});

module.exports = router;