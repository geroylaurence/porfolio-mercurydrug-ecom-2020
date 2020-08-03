import request from '../middleware/request';

function main(data) {
  return request(`test`, data);
}

export {
  main
};