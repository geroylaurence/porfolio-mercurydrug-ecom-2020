import appReducer from './app';
import accountReducer from './account';
import addressReducer from './address';
import cartReducer from './cart';
import checkoutReducer from './checkout';
import locationsReducer from './locations';
import messageReducer from './message';
import orderReducer from './order';
import productsReducer from './products';
import shopCategoryReducer from './shopCategory';
import skuReducer from './sku';

function stateForKey(state, key) {
	if (state) {
    return state[key];
  }

  return undefined;
}

export default (state, action) => {
  let s = state;

  // FOR LOGIN PURPOSE
  if (action.type === 'LOGOUT_ACCOUNT_SUCCESS' || action.type === 'LOGOUT_ACCOUNT_TO_APP') {
    s = undefined;
  }

  return {
    app: appReducer(stateForKey(state, 'app'), action),

    account: accountReducer(stateForKey(s, 'account'), action),
    address: addressReducer(stateForKey(s, 'address'), action),
    cart: cartReducer(stateForKey(s, 'cart'), action),
    checkout: checkoutReducer(stateForKey(s, 'checkout'), action),
    locations: locationsReducer(stateForKey(s, 'locations'), action),
    message: messageReducer(stateForKey(s, 'message'), action),
    order: orderReducer(stateForKey(s, 'order'), action),
    products: productsReducer(stateForKey(s, 'products'), action),
    shopCategory: shopCategoryReducer(stateForKey(s, 'shopCategory'), action),
    sku: skuReducer(stateForKey(s, 'sku'), action),
  };
}