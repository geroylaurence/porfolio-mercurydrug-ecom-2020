const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
  const {body} = req;

  res.status(200).json({ data: {} });
});

router.post('/register', (req, res, next) => {
  const {body} = req;

  res.status(200).json({ data: {} });
});

router.post('/validate-email', (req, res, next) => {
  const {
    user,
    check,
    validation,
  } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/resend-processing-validate-email', (req, res, next) => {
  res.status(200).json({ data: {} });
});

router.post('/request-reset-password', (req, res, next) => {
  const { email } = req.body;

  res.status(200).json({ data: {} });
});

router.post('/process-reset-password', (req, res, next) => {
  const { 
    email,
    check,
    token,
    newPassword,
  } = req.body;

  res.status(200).json({ data: {} });
});

module.exports = router;