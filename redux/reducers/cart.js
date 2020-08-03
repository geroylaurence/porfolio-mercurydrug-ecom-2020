import {
  COMPUTE_CART_SUB_TOTAL,
  COMPUTE_ITEM_TOTAL_PRICE,

  COMPUTE_GRANDTOTAL_DELIVERYFEE,
  COMPUTE_SET_PAYMENT_SUMMARY,

  ADD_ITEM_CART_LOADING,
  ADD_ITEM_CART_SUCCESS,
  ADD_ITEM_CART_ERROR,

  CART_UPDATE_ITEM_QUANTITY_LOADING,
  CART_UPDATE_ITEM_QUANTITY_SUCCESS,
  CART_UPDATE_ITEM_QUANTITY_ERROR,

  CART_DELETE_ITEM_LOADING,
  CART_DELETE_ITEM_SUCCESS,
  CART_DELETE_ITEM_ERROR,

  SET_CART_ITEM_COUNT,
  SET_CART_ITEM_COUNT_FROM_GUEST_TO_LOGIN,
  CART_ITEMS_COUNT_LOADING,
  CART_ITEMS_COUNT_SUCCESS,
  CART_ITEMS_COUNT_ERROR,

  CART_GET_ITEMS_LOADING,
  CART_GET_ITEMS_SUCCESS,
  CART_GET_ITEMS_ERROR,

  GUEST_USER_SET_CART_ITEM,
  GUEST_USER_SET_CART_ITEM_FROM_LOCAL_STORAGE,
  GUEST_USER_UPDATE_CART_ITEM_FROM_LOCAL_STORAGE,
  GUEST_USER_DELETE_CART_ITEM_FROM_LOCAL_STORAGE,
  GUEST_USER_CLEAR_CART_ITEMS,
} from '../actions/cart';

import { decimalPresentable } from '../../client/utils/helper';

const initialState = {
  // remove soon, for observation
  // removing, must refactor ui-component notification-add-cart, render the data from addedItem
  inCart: [],

  inCartItemCount: 0,
  getCartItemCount: {
    loading: false,
    data: null,
    error: null,
  },

  inItemsCount: 0,
  getItems: {
    loading: false,
    data: null,
    error: null,
  },
  
  addedItem: null,
  addItem: {
    loading: false,
    data: null,
    error: null,
  },

  updateItemQuantity: {
    loading: false,
    data: null,
    error: null,
  },

  deleteItem: {
    loading: false,
    data: null,
    error: null,
  },

  guestInItemsCount: 0,
  guestCart: [], // array object

  computeItemTotalPrice: 0,
  computeCartSubTotal: 0,

  computedGrandTotalWithDeliveryFee: 0.00,
  computedGrandTotalWithDeliveryFeePresentable: '0.00',

  subTotal: 0.00,
  subTotalPresentable: '0.00',
  grandTotal: 0.00,
  grandTotalPresentable: '0.00',
  deliveryFee: 0.00,
  deliveryFeePresentable: '0.00',
  totalSavings: 0,
  totalSavingsPresentable: '0.00',
  eSukiToEarn: 0,
  eSukiBonus: 0,

  redeemRewardsWallet: 0,
  redeemRewardsWalletPresentable: '0',
  redeemUserWallet: 0,
  redeemUserWalletPresentable: '0',
}

function addToCartDataMapping({
  id,
  name,
  image,
  quantity,
  price,
  pricePresentable,
}) {
  return {
    id: id,
    image: image,
    price: parseFloat(price),
    pricePresentable: decimalPresentable(parseFloat(price).toFixed(2)),
  };
}

function feedBackDataMapping({
  cartId,
  productId,
  quantity,
  total,
}) {
  return {
    cartId: cartId,
    productId: productId,
    quantity: quantity,
    totalPrice: parseFloat(total),
    totalPricePresentable: decimalPresentable(parseFloat(total).toFixed(2)),
  }
}

// id -> relevance (id, productId, cartId)
function cart(state = initialState, action) {
  switch(action.type) {
    case ADD_ITEM_CART_LOADING: {
      return {
        ...state,
        addItem: {
          ...state.addItem,
          loading: true,
          error: null,
        }
      }
    };
    case ADD_ITEM_CART_SUCCESS: {
      const {
        addedToCart,
        feedBack,
      } = action.data;

      const addedToCartMappedData = addToCartDataMapping(addedToCart);
      const feedBackMappedData = feedBackDataMapping(feedBack);

      const addedItem = {
        id: addedToCartMappedData.id,
        name: addedToCartMappedData.name,
        image: addedToCartMappedData.image,
        price: addedToCartMappedData.price,
        pricePresentable: addedToCartMappedData.pricePresentable,

        quantity: feedBackMappedData.quantity,
        totalPrice: feedBackMappedData.total,
        totalPricePresentable: feedBackMappedData.totalPricePresentable,

        cartId: feedBackMappedData.cartId,
        productId: feedBackMappedData.productId,
      };

      return {
        ...state,
        addItem: {
          ...state.addItem,
          loading: false,
          data: feedBack,
        },
        addedItem: addedItem,
        
        inItemsCount: feedBack.totalCartItems,
        inCart: [
          ...state.inCart,
          addedItem,
        ],
      };
    };
    case ADD_ITEM_CART_ERROR: {
      return {
        ...state,
        addItem: {
          ...state.addItem,
          loading: false,
          error: action.error,
        },
      };
    };

    case CART_UPDATE_ITEM_QUANTITY_LOADING: {
      return {
        ...state,
        updateItemQuantity: {
          ...state.updateItemQuantity,
          loading: true,
          error: null,
        },
      };
    };
    case CART_UPDATE_ITEM_QUANTITY_SUCCESS: {
      const {
        item,
        summary,
      } = action.data;
      const {
        cartId,
        productId,
        quantity,
        total,
        totalCartItems,
      } = item;
      const productList = state.getItems.data;
      const updatedList = productList.map(product => {
        let mappedData = product;
        if (mappedData.id === cartId) {
          mappedData = {
            ...mappedData,
            quantity: quantity,
            totalPrice: parseFloat(total),
            totalPricePresentable: decimalPresentable(parseFloat(total).toFixed(2)),
          };
        }

        return mappedData;
      });
      // summary
      const mappedSummary = {
        subTotal: summary.subTotal,
        subTotalPresentable: decimalPresentable(parseFloat(summary.subTotal).toFixed(2)),
        grandTotal: summary.grandTotal,
        grandTotalPresentable: decimalPresentable(parseFloat(summary.grandTotal).toFixed(2)),
        eSukiToEarn: summary.eSukiToEarn,
        eSukiBonus: summary.eSukiBonus,
        totalSavings: summary.totalSavings,
        totalSavingsPresentable: decimalPresentable(parseFloat(summary.totalSavings).toFixed(2)),
      };

      return {
        ...state,
        updateItemQuantity: {
          ...state.updateItemQuantity,
          loading: false,
          data: action.data,
        },
        getItems: {
          ...state.getItems,
          data: updatedList,
        },
        ...mappedSummary,
      };
    };
    case CART_UPDATE_ITEM_QUANTITY_ERROR: {
      return {
        ...state,
        updateItemQuantity: {
          ...state.updateItemQuantity,
          loading: false,
          error: action.error,
        },
      };
    };

    case CART_DELETE_ITEM_LOADING: {
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          loading: true,
          error: null,
        },
      };
    };
    case CART_DELETE_ITEM_SUCCESS: {
      const {
        item,
        summary,
      } = action.data;
      const {
        cartId,
        isDeleted,
        quantity,
        totalCartItems,
      } = item;
      const productList = state.getItems.data;
      const updatedProductList = productList.reduce((list, product) => {
        if (product.id !== cartId) {
          return [
            ...list,
            product,
          ]
        }
        return list
      }, []);
      // summary
      const mappedSummary = {
        subTotal: summary.subTotal,
        subTotalPresentable: decimalPresentable(parseFloat(summary.subTotal).toFixed(2)),
        grandTotal: summary.grandTotal,
        grandTotalPresentable: decimalPresentable(parseFloat(summary.grandTotal).toFixed(2)),
        eSukiToEarn: summary.eSukiToEarn,
        eSukiBonus: summary.eSukiBonus,
        totalSavings: summary.totalSavings,
        totalSavingsPresentable: decimalPresentable(parseFloat(summary.totalSavings).toFixed(2)),
      };

      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          loading: false,
          data: action.data,
        },
        getItems: {
          ...state.getItems,
          data: updatedProductList,
        },
        inItemsCount: totalCartItems,
        ...mappedSummary,
      };
    };
    case CART_DELETE_ITEM_ERROR: {
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          loading: false,
          error: null,
        },
      };
    };

    case COMPUTE_CART_SUB_TOTAL: {
      let startTotal = 0.00;
      try {
        startTotal = action.data.reduce((init, item) => {
          init += item.totalPrice;
          return parseFloat(init);
        }, 0.00);
      } catch(err) {
        console.log(err);
      }

      return {
        ...state,
        computeCartSubTotal: startTotal,
      };
    };
    case COMPUTE_ITEM_TOTAL_PRICE: {
      let startTotal = 0.00;
      startTotal = action.data.price * action.data.quantity;
      return {
        ...state,
        computeItemTotalPrice: parseFloat(startTotal),
      }
    };
    
    case COMPUTE_GRANDTOTAL_DELIVERYFEE: {
      let grandTotal = state.grandTotal;
      let deliveryFee = state.deliveryFee;
      let grandTotalSumDeliveryFee = parseFloat(grandTotal + deliveryFee);

      return {
        ...state,
        computedGrandTotalWithDeliveryFee: grandTotalSumDeliveryFee,
        computedGrandTotalWithDeliveryFeePresentable: decimalPresentable(grandTotalSumDeliveryFee.toFixed(2)),
      }
    };

    case COMPUTE_SET_PAYMENT_SUMMARY: {
      let startTotal = 0.00;
      try {
        startTotal = state.guestCart.reduce((init, item) => {
          let itemTotalPrice = parseFloat(item.unitPrice) * parseInt(item.quantity);
          init += itemTotalPrice;
          return parseFloat(init);
        }, 0.00);
      } catch(err) {
        startTotal = 0.00;
        console.log(err);
      }

      let computedSubTotal = startTotal ? startTotal : 0.00;
      let computedSubTotalPresentable = decimalPresentable(computedSubTotal);

      return {
        ...state,
        subTotal: computedSubTotal,
        subTotalPresentable: computedSubTotalPresentable,
        grandTotal: computedSubTotal,
        grandTotalPresentable: computedSubTotalPresentable,
      };
    }

    case SET_CART_ITEM_COUNT: {
      return {
        ...state,
        inItemsCount: action.data,
      };
    };
    case SET_CART_ITEM_COUNT_FROM_GUEST_TO_LOGIN: {
      // from cartData
      const {items} = action.data;
      let lastItem = items[items.length -1].message;

      return {
        ...state,
        inItemsCount: lastItem.totalCartItems,
      };
    };

    case CART_ITEMS_COUNT_LOADING: {
      return {
        ...state,
        getCartItemCount: {
          ...state.getCartItemCount,
          loading: true,
          error: null,
        }
      };
    };
    case CART_ITEMS_COUNT_SUCCESS: {
      return {
        ...state,
        getCartItemCount: {
          ...state.getCartItemCount,
          loading: false,
          data: action.data,
        },
        inCartItemCount: action.data,
      };
    };
    case CART_ITEMS_COUNT_ERROR: {
      return {
        ...state,
        getCartItemCount: {
          ...state.getCartItemCount,
          loading: false,
          error: action.error,
        }
      };
    };

    case CART_GET_ITEMS_LOADING: {
      return {
        ...state,
        getItems: {
          ...state.getItems,
          loading: true,
          error: null,
        }
      };
    };
    case CART_GET_ITEMS_SUCCESS: {
      const {
        items,
        summary,
      } = action.data;
      const mappedItems = items.map(item => {
        let itemProduct = {};
        const { product, ...inCartInfo } = item;
        const [image] = product.images;

        itemProduct = {
          ...itemProduct,
          id: inCartInfo.cartId,
          productId: inCartInfo.productId,
          name: product.name,
          image: image.path,
          isRxFlag: product.isRxFlag,

          quantity: parseInt(inCartInfo.quantity),
          unitPrice: parseFloat(product.price),
          unitPricePresentable: decimalPresentable(parseFloat(product.price).toFixed(2)),
          totalPrice: parseFloat(inCartInfo.total),
          totalPricePresentable: decimalPresentable(parseFloat(inCartInfo.total).toFixed(2)),
        };

        return itemProduct;
      });

      // summary
      const redeemRewardsWallet = summary.redeemRewardsWallet;
      const redeemRewardsWalletPresentable = decimalPresentable(parseFloat(summary.redeemRewardsWallet).toFixed(2));
      const redeemUserWallet = summary.redeemUserWallet;
      const redeemUserWalletPresentable = decimalPresentable(parseFloat(summary.redeemUserWallet).toFixed(2));

      const mappedSummary = {
        subTotal: summary.subTotal,
        subTotalPresentable: decimalPresentable(parseFloat(summary.subTotal).toFixed(2)),
        grandTotal: summary.grandTotal,
        grandTotalPresentable: decimalPresentable(parseFloat(summary.grandTotal).toFixed(2)),
        deliveryFee: summary.deliveryFee,
        deliveryFeePresentable: decimalPresentable(parseFloat(summary.deliveryFee).toFixed(2)),
        eSukiToEarn: summary.eSukiToEarn,
        eSukiBonus: summary.eSukiBonus,
        totalSavings: summary.totalSavings,
        totalSavingsPresentable: decimalPresentable(parseFloat(summary.totalSavings).toFixed(2)),
        redeemRewardsWallet: redeemRewardsWallet,
        redeemRewardsWalletPresentable: redeemRewardsWalletPresentable,
        redeemUserWallet: redeemUserWallet,
        redeemUserWalletPresentable: redeemUserWalletPresentable,
      };

      return {
        ...state,
        getItems: {
          ...state.getItems,
          loading: false,
          data: mappedItems,
        },
        inItemsCount: mappedItems.length,
        ...mappedSummary,
      };
    };
    case CART_GET_ITEMS_ERROR: {
      return {
        ...state,
        getItems: {
          ...state.getItems,
          loading: false,
          error: action.error,
        }
      };
    };

    case GUEST_USER_SET_CART_ITEM: {
      const guestForAddItem = action.data;

      const checkIndex = state.guestCart.findIndex(item => item.id === guestForAddItem.id);
      const updatedQty = (checkIndex !== -1) ? 
                         (parseInt(state.guestCart[checkIndex].quantity + guestForAddItem.quantity))
                         :
                         parseInt(guestForAddItem.quantity);

      const toAddItem = {
        id: guestForAddItem.id,
        name: guestForAddItem.name,
        image: guestForAddItem.image,
        unitPrice: guestForAddItem.price,
        unitPricePresentable: guestForAddItem.pricePresentable,
        price: guestForAddItem.price,
        pricePresentable: guestForAddItem.pricePresentable,
        quantity: updatedQty,
      };

      let updatedItems = state.guestCart;
      if (checkIndex !== -1) {
        updatedItems[checkIndex] = toAddItem;
      } else {
        updatedItems = [
          ...updatedItems,
          toAddItem
        ];
      }

      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
      localStorage.setItem('guestInItemsCount', `${updatedItems.length}`);

      return {
        ...state,
        addedItem: toAddItem,
        guestInItemsCount: updatedItems.length,
        guestCart: updatedItems,
      };
    };
    case GUEST_USER_SET_CART_ITEM_FROM_LOCAL_STORAGE: {
      let guestCart = localStorage.getItem("guestCart");
      let guestInItemsCount = localStorage.getItem("guestInItemsCount");

      let updatedItems = [];
      let updateItemsCount = 0;
      let valitedItemsCount = parseInt(guestInItemsCount);
      let valitedGuestCart = JSON.parse(guestCart);

      if (valitedItemsCount) {
        updateItemsCount = valitedItemsCount;
        updatedItems = valitedGuestCart;
      }

      return {
        ...state,
        guestInItemsCount: updateItemsCount,
        guestCart: updatedItems,
      };
    };
    case GUEST_USER_UPDATE_CART_ITEM_FROM_LOCAL_STORAGE: {
      const {
        cartId,
        quantity
      } = action.data;

      let updatedItems = state.guestCart.map(item => {
        let mappedData = item;
        if (mappedData.id === cartId) {
          mappedData.quantity = quantity;
        }

        return mappedData;
      });
      
      localStorage.setItem('guestCart', JSON.stringify(updatedItems));

      return {
        ...state,
        guestCart: updatedItems,
      }; 
    }
    case GUEST_USER_DELETE_CART_ITEM_FROM_LOCAL_STORAGE: {
      const cartId = action.data;
      let updatedItems = state.guestCart.reduce((list, item) => {
        if (item.id !== cartId) {
          return [
            ...list,
            item,
          ];
        }
        return list;
      }, []);
      let updateItemsCount = updatedItems.length;

      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
      localStorage.setItem('guestInItemsCount', `${updateItemsCount}`);

      return {
        ...state,
        guestCart: updatedItems,
        guestInItemsCount: updateItemsCount,
      };
    }
    case GUEST_USER_CLEAR_CART_ITEMS: {
      let updatedItems = [];
      let updateItemsCount = 0;

      localStorage.setItem('guestCart', JSON.stringify(updatedItems));
      localStorage.setItem('guestInItemsCount', `${updateItemsCount}`);

      return {
        ...state,
        guestCart: updatedItems,
        guestInItemsCount: updateItemsCount,
      };
    }

    default:
      return state;
  }
}

export default cart;