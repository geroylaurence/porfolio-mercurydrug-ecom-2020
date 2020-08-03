import request from '../middleware/request';

const endPoint = 'uploader';

function prescriptionForCheckout(file) {
  return request(`${endPoint}/prescription-for-checkout`, { prescription: file });
}

export {
  prescriptionForCheckout,
};