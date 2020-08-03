import {
  ORDER_HISTORY_LIST_LOADING,
  ORDER_HISTORY_LIST_SUCCESS,
  ORDER_HISTORY_LIST_ERROR,
} from '../actions/order';
import {
  cartItemListMapping
} from '../actions/cart';

import { decimalPresentable } from '../../client/utils/helper';

const initialState = {  
  history: {
    loading: false,
    data: null,
    error: null,
  }
};

function order(state = initialState, action) {
  switch(action.type) {
    case ORDER_HISTORY_LIST_LOADING: {
      return {
        ...state,
        history: {
          ...state.history,
          loading: true,
          error:  null
        }
      };
    };
    case ORDER_HISTORY_LIST_SUCCESS: {
      const updatedList = action.data.map(cartItemListMapping);
      return {
        ...state,
        history: {
          ...state.history,
          loading: false,
          data: updatedList,
        }
      };
    };
    case ORDER_HISTORY_LIST_ERROR: {
      return {
        ...state,
        history: {
          ...state.history,
          loading: false,
          error: action.error,
        }
      };
    };

    default:
      return state;
  }
}

export default order;