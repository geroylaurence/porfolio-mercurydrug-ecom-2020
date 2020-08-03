import request from '../middleware/request';

const endPoint = 'message';

function generalInquiry(message) {
  return request(`${endPoint}/general-inquiry`, {
    message
  });
}

export {
  generalInquiry,
};