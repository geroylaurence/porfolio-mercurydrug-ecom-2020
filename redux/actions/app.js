/* TYPES */
const SET_API_URL = 'SET_API_URL';
const SET_LOGIN_LAST_PAGE = 'SET_LOGIN_LAST_PAGE';

/* CREATORS */
function setAPIURL(url) {
	return {
    type: SET_API_URL,
    url
  }
}

export {
  // TYPES
  SET_API_URL,
  SET_LOGIN_LAST_PAGE,

  // CREATORS
  setAPIURL,
};