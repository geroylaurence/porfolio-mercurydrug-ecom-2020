import {
  ADD_ADDRESS_LOADING,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,

  LIST_ADDRESS_LOADING,
  LIST_ADDRESS_SUCCESS,
  LIST_ADDRESS_ERROR,

  SET_VIEW_ADDRESS,
} from '../actions/address';

const initialState = {
  list: {
    loading: false,
    data: null,
    error: null,
  },
  add: {
    loading: false,
    data: null,
    error: null,
  },
  delete: {
    loading: false,
    data: null,
    error: null,
  },
  setView: null,
};

function addressDataMapping({
  id,
  contactName,
  addressLine1,
  addressLine2,
  barangay,
  city,
  zipCode,
  province,
  contactNumber,
  secondaryContact,
  country,
}) {
  return {
    id: `${id}`,
    contactName,
    addressLine1,
    addressLine2,
    barangay,
    city,
    zipCode,
    province,
    contactNumber,
    secondaryContact,
    country,
  };
};

function address(state = initialState, action) {
  switch (action.type) {
    case ADD_ADDRESS_LOADING: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: true,
          erro: null,
        },
      };
    };
    case ADD_ADDRESS_SUCCESS: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          data: action.data,
        },
      };
    };
    case ADD_ADDRESS_ERROR: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.error,
        },
      };
    };

    case LIST_ADDRESS_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: null,
        },
      };
    };
    case LIST_ADDRESS_SUCCESS: {
      const mappedAddressList = action.data.map(address => addressDataMapping(address));

      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          data: mappedAddressList,
        },
      };
    };
    case LIST_ADDRESS_ERROR: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.error,
        },
      };
    };

    case SET_VIEW_ADDRESS: {
      // get id
      const addressForView = state.list.data.find(addressData => `${addressData.id}` === `${action.data}`);
      return {
        ...state,
        setView: addressForView,
      };
    };

    default: 
      return state;
  }
}

export default address;