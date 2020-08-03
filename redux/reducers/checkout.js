import {
  SET_SERVICE_OPTION_PICKUP,
  SET_SERVICE_OPTION_DELIVERY,
  serviceOption,

  SET_RX_UPLOAD_REQUIRED_TRUE,
  SET_RX_UPLOAD_REQUIRED_FALSE,
  SET_RX_UPLOAD_FILES_UPDATED,
  SET_RX_UPLOAD_FILE_REMOVE,

  RX_UPLOAD_FILE_LOADING,
  RX_UPLOAD_FILE_SUCCESS,
  RX_UPLOAD_FILE_ERROR,

  RX_REMOVE_UPLOAD_FILE_LOADING,
  RX_REMOVE_UPLOAD_FILE_SUCCESS,
  RX_REMOVE_UPLOAD_FILE_ERROR,

  ESUKI_PTS_GET_LOADING,
  ESUKI_PTS_GET_SUCCESS,
  ESUKI_PTS_GET_ERROR,

  CART_INITIATE_REDEEM_POINTS_LOADING,
  CART_INITIATE_REDEEM_POINTS_SUCCESS,
  CART_INITIATE_REDEEM_POINTS_ERROR,

  FINALIZE_CART,
  FINALIZE_ADDRESS,
  FINALIZE_BRANCH,

  SET_CHECKOUT_ADDRESS_DATA,
  ADD_CHECKOUT_ADDRESS_LOADING,
  ADD_CHECKOUT_ADDRESS_SUCCESS,
  ADD_CHECKOUT_ADDRESS_ERROR,

  PROCEED_PAYMENT_LOADING,
  PROCEED_PAYMENT_SUCCESS,
  PROCEED_PAYMENT_ERROR,

  CLEAR_CHECKOUT_DATA,
} from '../actions/checkout';

import { decimalPresentable } from '../../client/utils/helper';

function rxFileDataMapping({
  id, 
  name,
  thumbnail,
}) {
  return {
    id, 
    name,
    thumbnail,
  };
}

const initialState = {
  serviceOption: serviceOption.pickUp,
  rxUpload: {
    required: false,
    files: [],
  },
  address: null,
  processing: {
    cartFinalization: false,
    addressFinalization: false,
    branchFinalization: false,
    checkoutFeedBack: false,
  },
  newAddress: {
    loading: false,
    data: null,
    error: null,
  },
  fileUploader: {
    loading: false,
    data: null,
    error: null,
  },
  proceedPayment: {
    loading: false,
    data: null,
    error: null,
  },
  eSukiPointsLatest: {
    loading: false,
    data: null,
    error: null,

    eSukiPoints: 0,
    eSukiPointPresentable: '0',
  },
  cartInitiateRedeemPoints: {
    loading: false,
    data: null,
    error: null,

    redeemRewardsWallet: 0,
    redeemRewardsWalletPresentable: '0',
    redeemUserWallet: 0,
    redeemUserWalletPresentable: '0',
  }
};

function checkout(state = initialState, action) {
  switch (action.type) {
    case SET_SERVICE_OPTION_PICKUP: {
      return {
        ...state,
        serviceOption: serviceOption.pickUp,
      };
    };
    case SET_SERVICE_OPTION_DELIVERY: {
      return {
        ...state,
        serviceOption: serviceOption.delivery,
      };
    };

    case SET_RX_UPLOAD_REQUIRED_TRUE: {
      return {
        ...state,
        rxUpload: {
          ...state.rxUpload,
          required: true,
        },
      };
    };
    case SET_RX_UPLOAD_REQUIRED_FALSE: {
      return {
        ...state,
        rxUpload: {
          ...state.rxUpload,
          required: false,
        },
      };
    };
    case SET_RX_UPLOAD_FILES_UPDATED: {
      return {
        ...state,
        rxUpload: {
          ...state.rxUpload,
          files: action.data,
        },
      };
    };

    case RX_UPLOAD_FILE_LOADING: {
      return {
        ...state,
        fileUploader: {
          ...state.fileUploader,
          loading: true,
          error: null,
        },
      };
    };
    case RX_UPLOAD_FILE_SUCCESS: {
      const {
        prescriptionImage,
        status
      } = action.data;

      // from api
      const {
        createdDate,
        filename,
        imageId,
        imageSize,
        mimeType,
        modifiedDate,
        thumbnail,
        url, 
      } = prescriptionImage;

      // set updated rx-files
      const listRxFiles = new Array(1).fill().map(item => rxFileDataMapping({
        id: imageId,
        name: filename,
        thumbnail: thumbnail,
      }));

      return {
        ...state,
        fileUploader: {
          ...state.fileUploader,
          loading: false,
          data: [],
        },
        rxUpload: {
          ...state.rxUpload,
          // remove this soon
          // files: listRxFiles,
          files: [
            ...state.rxUpload.files,
            ...listRxFiles
          ]
        },
      };
    };
    case RX_UPLOAD_FILE_ERROR: {
      return {
        ...state,
        fileUploader: {
          ...state.fileUploader,
          loading: false,
          error: action.error,
        },
      };
    };

    case RX_REMOVE_UPLOAD_FILE_LOADING: {
      return {
        ...state,
        fileUploader: {
          ...state.fileUploader,
          loading: true,
          error: null,
        },
      };
    };
    case RX_REMOVE_UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        fileUploader: {
          ...state.fileUploader,
          loading: false,
          data: action.data,
        },
      };
    };
    case RX_REMOVE_UPLOAD_FILE_ERROR: {
      return {
        ...state,
        fileUploader: {
          ...state.fileUploader,
          loading: false,
          error: action.error,
        },
      };
    };

    case SET_CHECKOUT_ADDRESS_DATA: {
      const {
        id,
        name,
        addressLine1,
        addressLine2,
        province,
        city,
        barangay,
        contactNumber1,
        contactNumber2,
      } = action.data;

      return {
        ...state,
        address: {
          id,
          name,
          addressLine1,
          addressLine2,
          province,
          city,
          barangay,
          contactNumber1,
          contactNumber2,
        },
        // processing: {
        //   ...state.processing,
        //   addressFinalization: true,
        // },
      };
    }
    case ADD_CHECKOUT_ADDRESS_LOADING: {
      return {
        ...state,
        newAddress: {
          ...state.add,
          loading: true,
          erro: null,
        },
      };
    }
    case ADD_CHECKOUT_ADDRESS_SUCCESS: {
      const {
        id,
        contactName,
        contactNumber,
        addressLine1,
        addressLine2,
        barangay,
        city,
        province,
        zipCode,
        country,
      } = action.data;

      return {
        ...state,
        newAddress: {
          ...state.add,
          loading: false,
          data: action.data,
        },
        address: {
          ...state.address,
          id: `${id}`,
        },
        processing: {
          ...state.processing,
          addressFinalization: true,
        },
      };
    }
    case ADD_CHECKOUT_ADDRESS_ERROR: {
      return {
        ...state,
        newAddress: {
          ...state.add,
          loading: false,
          error: action.error,
        },
      };
    };

    case FINALIZE_CART: {
      return {
        ...state,
        processing: {
          ...state.processing,
          cartFinalization: true,
        },
      };
    };
    case FINALIZE_ADDRESS: {
      return {
        ...state,
        processing: {
          ...state.processing,
          addressFinalization : true,
        },
      };
    };
    case FINALIZE_BRANCH: {
      return {
        ...state,
        processing: {
          ...state.processing,
          branchFinalization: true,
        },
      };
    };

    // esuki
    case ESUKI_PTS_GET_LOADING: {
      return {
        ...state,
        eSukiPointsLatest: {
          ...state.eSukiPointsLatest,
          loading: true,
          erro: null,
        }
      };
    };
    case ESUKI_PTS_GET_SUCCESS: {
      const { type, totalValue, lastTransaction } = action.data;
      return {
        ...state,
        eSukiPointsLatest: {
          ...state.eSukiPointsLatest,
          loading: false,
          data: action.data,
          eSukiPoints: totalValue,
          eSukiPointPresentable: `${totalValue}`, 
        },
      };
    };
    case ESUKI_PTS_GET_LOADING: {
      return {
        ...state,
        eSukiPointsLatest: {
          ...state.eSukiPointsLatest,
          loading: false,
          erro: action.error,
        }
      };
    };

    case CART_INITIATE_REDEEM_POINTS_LOADING: {
      return {
        ...state,
        cartInitiateRedeemPoints: {
          ...state.cartInitiateRedeemPoints,
          loading: true,
          error: null,
        }
      };
    };
    case CART_INITIATE_REDEEM_POINTS_SUCCESS: {
      const {
        items,
        summary,
      } = action.data;
      const redeemRewardsWallet = summary.redeemRewardsWallet;
      const redeemRewardsWalletPresentable = decimalPresentable(parseFloat(summary.redeemRewardsWallet).toFixed(2));

      const redeemUserWallet = summary.redeemUserWallet;
      const redeemUserWalletPresentable = decimalPresentable(parseFloat(summary.redeemUserWallet).toFixed(2));

      return {
        ...state,
        cartInitiateRedeemPoints: {
          ...state.cartInitiateRedeemPoints,
          loading: false,
          data: summary,

          redeemRewardsWallet: redeemRewardsWallet,
          redeemRewardsWalletPresentable: redeemRewardsWalletPresentable,
          redeemUserWallet: redeemUserWallet,
          redeemUserWalletPresentable: redeemUserWalletPresentable,
        }
      };
    };
    case CART_INITIATE_REDEEM_POINTS_ERROR: {
      return {
        ...state,
        cartInitiateRedeemPoints: {
          ...state.cartInitiateRedeemPoints,
          loading: false,
          error: action.error,
        }
      };
    };

    case PROCEED_PAYMENT_LOADING: {
      return {
        ...state,
        proceedPayment: {
          ...state.proceedPayment,
          loading: true,
          error: null,
        },
      };
    }
    case PROCEED_PAYMENT_SUCCESS: {
      return {
        ...state,
        proceedPayment: {
          ...state.proceedPayment,
          loading: false,
          data: action.data,
        },
      };
    }
    case PROCEED_PAYMENT_ERROR: {
      return {
        ...state,
        proceedPayment: {
          ...state.proceedPayment,
          loading: false,
          error: action.error,
        },
      };
    }

    case CLEAR_CHECKOUT_DATA: {
      return initialState;
    };

    default: 
      return state;
  }
}

export default checkout;