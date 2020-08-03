import {
  SET_PRODUCT_SELECT_VIEW,
} from '../actions/sku';

const initialState = {
  getData: {
    loading: false,
    data: null,
    error: null,
  },
  pushToCart: {
    loading: false,
    data: null,
    error: null,
  }
};

function sku(state = initialState, action) {
  switch(action.type) {
    case SET_PRODUCT_SELECT_VIEW:
      const {
        id,
        sku,
        name,
        generics,
        image,
        price,
        pricePresentable,
        isRxFlag,
      } = action.data;

      return {
        ...state,
        getData: {
          ...state.getData,
          data: {
            id,
            sku,
            name,
            generics,
            image,
            price,
            pricePresentable,
            isRxFlag,
          }
        }
      };
    default:
      return state;
  }
}

export default sku;