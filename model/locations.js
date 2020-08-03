import request from '../middleware/request';

const endPoint = 'locations';

function list() {
  return request(`${endPoint}`);
}

function listState(regionId) {
  return request(`${endPoint}/state-list`, { regionId });
}

function listBranch(stateId) {
  return request(`${endPoint}/branch-list`, { stateId });
}

export {
  list,
  listState,
  listBranch,
};
