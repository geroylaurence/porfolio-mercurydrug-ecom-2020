import {
	SET_API_URL,
  SET_LOGIN_LAST_PAGE,
} from '../actions/app';

const initialState = {
  apiURL: '',
  appLoginLastPage: '/',
  appRoute: {
    'shop': '/shop',
    'validate-email': '/validate-email',
  },
  appTimer: {
    'validate-email-resend-processing': 120,
  },
  shop: {
    'category-default-query': '12',
  },
};

function appReducer(state = initialState, action) {
  switch(action.type) {
    case SET_API_URL: 
      return {
        ...state,
        apiURL: action.url,
      };
    case SET_LOGIN_LAST_PAGE: {
      let indexRoute = '/';
      if (action.data) {
        indexRoute = action.data;
      }

      return {
        ...state,
        appLoginLastPage: indexRoute
      };
    }
    default: 
      return state;
  }
}

export default appReducer;