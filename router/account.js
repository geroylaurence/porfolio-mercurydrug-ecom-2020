const express = require('express');
const router = express.Router();

const DB = require('../api_services/mercurydrug');

router.post('/login', (req, res, next) => {
  const {body} = req;

  const MercuryDrug = new DB();
  MercuryDrug.accountLogin(body)
  .then(result => {
    res.cookie('accessToken', result.accessToken, {path: '/'});
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/register', (req, res, next) => {
  const {body} = req;

  const MercuryDrug = new DB();
  MercuryDrug.accountRegister(body)
  .then(result => {
    res.cookie('accessToken', result.accessToken, {path: '/'});
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/validate-email', (req, res, next) => {
  const {
    user,
    check,
    validation,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug.accountValidateEmail({
    email: user,
    check: check,
    validation: validation
  })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/resend-processing-validate-email', (req, res, next) => {
  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.accountResendProcessingValidateEmail()
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/request-reset-password', (req, res, next) => {
  const { email } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.accountRequestResetPassword(email)
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

router.post('/process-reset-password', (req, res, next) => {
  const { 
    email,
    check,
    token,
    newPassword,
  } = req.body;

  const MercuryDrug = new DB();
  MercuryDrug._authorization = req.cookies.accessToken;
  MercuryDrug.accountProcessResetPassword({
    email,
    check,
    token,
    newPassword,
  })
  .then(result => {
    res.status(200).json({ data: result });
  })
  .catch(err => {
    next(err);
  });
});

module.exports = router;