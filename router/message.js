const express = require('express');
const router = express.Router();

router.post('/general-inquiry', (req, res, next) => {
  const {
    message,
  } = req.body;

  res.status(200).json({ data: {} });
});

module.exports = router;