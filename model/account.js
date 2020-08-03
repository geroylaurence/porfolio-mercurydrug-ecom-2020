import request from '../middleware/request';

import { addBulkItems } from './cart';

const endPoint = 'account';

function login(account) {
  return request(`${endPoint}/login`, account);
}

function logout() {
  return request(`${endPoint}/logout`);
}

function register(data) {
  return request(`${endPoint}/register`, data);
}

function validateEmail({
    user,
    check,
    validation,
  }) {
  return request(`${endPoint}/validate-email`, {
    user,
    check,
    validation,
  });
}

function resendProcessingValidateEmail() {
  return request(`${endPoint}/resend-processing-validate-email`);
}

function requestResetPassword(email) {
  return request(`${endPoint}/request-reset-password`, { email });
}

function processResetPassword({
  email,
  check,
  token,
  newPassword,
}) {
  return request(`${endPoint}/process-reset-password`, {
    email,
    check,
    token,
    newPassword,
  });
}

function registerWithPushCart({
  form,
  cartItems
}) {
  let jar = {registerData: null, cartData: null};
  return new Promise((resolve, reject) => {
    registerDataHandler.bind(null, jar)(form)
    .then(cartDataHandler.bind(null, cartItems))
    .then(result => resolve(result))
    .catch(err => reject(err));
  });
}

function registerDataHandler(jar, formParams) {
  return new Promise((resolve, reject) => {
    register(formParams)
    .then(result => {
      jar.registerData = result.data;
      resolve(jar);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function loginWithPushCart({
  email,
  password,
  cartItems,
}) {
  let jar = {loginData: null, cartData: null};
  return new Promise((resolve, reject) => {
    loginDataHandler.bind(null, jar)({email, password})
    .then(cartDataHandler.bind(null, cartItems))
    .then(result => resolve(result))
    .catch(err => reject(err));
  });
}

function loginDataHandler(jar, loginParams) {
  return new Promise((resolve, reject) => {
    login(loginParams)
    .then(result => {
      jar.loginData = result.data;
      resolve(jar);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function cartDataHandler(cartItems, jar) {
  return new Promise((resolve, reject) => {
    addBulkItems(cartItems)
    .then(result => {
      jar.cartData = result.data;
      resolve(jar);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export {
  login,
  loginWithPushCart,
  logout,
  register,
  registerWithPushCart,
  validateEmail,
  resendProcessingValidateEmail,
  requestResetPassword,
  processResetPassword,
};
