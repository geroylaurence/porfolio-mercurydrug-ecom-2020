import {
  SEND_PRODUCT_INQUIRY_LOADING,
  SEND_PRODUCT_INQUIRY_SUCCESS,
  SEND_PRODUCT_INQUIRY_ERROR,

  SEND_GENERAL_INQUIRY_LOADING,
  SEND_GENERAL_INQUIRY_SUCCESS,
  SEND_GENERAL_INQUIRY_ERROR,
} from '../actions/message';

const initialState = {
  productInquiry: {
    loading: false,
    data: null,
    error: null,
  },
  generalInquiry: {
    loading: false,
    data: null,
    error: null,
  }
};

function message(state = initialState, action) {
  switch (action.type) {
    case SEND_PRODUCT_INQUIRY_LOADING: {
      return {
        ...state,
        productInquiry: {
          ...state.productInquiry,
          loading: true,
          error: null,
        }
      };
    }
    case SEND_PRODUCT_INQUIRY_SUCCESS: {
      return {
        ...state,
        productInquiry: {
          ...state.productInquiry,
          loading: false,
          data: action.data
        },
      };
    }
    case SEND_PRODUCT_INQUIRY_ERROR: {
      return {
        ...state,
        productInquiry: {
          ...state.productInquiry,
          loading: false,
          error: action.error,
        }
      };
    }

    case SEND_GENERAL_INQUIRY_LOADING: {
      return {
        ...state,
        generalInquiry: {
          ...state.generalInquiry,
          loading: true,
          error: null,
        }
      }
    };
    case SEND_GENERAL_INQUIRY_SUCCESS: {
      return {
        ...state,
        generalInquiry: {
          ...state.generalInquiry,
          loading: false,
          data: action.data,
        }
      }
    };
    case SEND_GENERAL_INQUIRY_ERROR: {
      return {
        ...state,
        generalInquiry: {
          ...state.generalInquiry,
          loading: false,
          error: action.error,
        }
      }
    };

    default:
      return state;
  }
}

export default message;