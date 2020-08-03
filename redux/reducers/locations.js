import {
  LOCATIONS_LIST_LOADING,
  LOCATIONS_LIST_SUCCESS,
  LOCATIONS_LIST_ERROR,
  SET_VIEW_REGION_ID,

  LOCATION_STATES_LIST_LOADING,
  LOCATION_STATES_LIST_SUCCESS,
  LOCATION_STATES_LIST_ERROR,
  SET_VIEW_STATE_ID,
  CLEAR_LOCATION_STATES_LIST,

  LOCATION_BRANCHES_LIST_LOADING,
  LOCATION_BRANCHES_LIST_SUCCESS,
  LOCATION_BRANCHES_LIST_ERROR,
} from '../actions/locations';

const initialState = {
  list: {
    loading: false,
    data: null,
    error: null,
    viewRegionId: '',
  },
  listState: {
    loading: false,
    data: null,
    error: null,
    viewStateId: '',
  },
  listBranches: {
    loading: false,
    data: null,
    error: null,
    viewBranchesId: '',
  },
};

function dataMappingLocations({
  id,
  name,
}) {
  return {
    id,
    name,
  };
}

function dataMappingStates({
  id,
  name
}) {
  return {
    id,
    name
  };
};

function dataMappingBranches({
  id,
  name,
}) {
  return {
    id,
    name
  };
}

function absorbDataBranches({
  address,
  branchesListKey,
  city,
  code,
  contactNumbers,
  createdAt,
  id,
  is24hrs,
  latitude,
  longitude,
  location,
  name,
  province,
  status,
  storeCloses,
  storeOpens,
  type,
  updatedAt,
}) {
  return {
    address,
    branchesListKey,
    city,
    code,
    contactNumbers,
    createdAt,
    id,
    is24hrs,
    latitude,
    longitude,
    location,
    name,
    province,
    status,
    storeCloses,
    storeOpens,
    type,
    updatedAt,
  };
}

function locations(state=initialState, action) {
  switch (action.type) {
    case SET_VIEW_REGION_ID: {
      return {
        ...state,
        list: {
          ...state.list,
          viewRegionId: action.data,
        }
      };
    }
    case LOCATIONS_LIST_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          error: null,
        },
      };
    }
    case LOCATIONS_LIST_SUCCESS: {
      const {
        locations,
      } = action.data;

      const mappedLocations = Object.entries(locations)
                              .map(([id, name]) => dataMappingLocations({
                                id,
                                name,
                              }));

      return {
        ...state,
        list: {
          ...state.loading,
          loading: false,
          data: mappedLocations,
        },
      };
    }
    case LOCATIONS_LIST_ERROR: {
      return {
        ...state,
        list: {
          loading: false,
          error: action.error,
        }
      };
    }

    case SET_VIEW_STATE_ID: {
      return {
        ...state,
        listState: {
          ...state.listState,
          viewStateId: action.data,
        },
      };
    }
    case LOCATION_STATES_LIST_LOADING: {
      return {
        ...state,
        listState: {
          ...state.listState,
          loading: true,
          error: null,
        },
      };
    }
    case LOCATION_STATES_LIST_SUCCESS: {
      const {
        regionId,
        statesList,
      } = action.data;

      const mappedStatesList = statesList.map(({
        branchesListKey,
        city,
      }) => (dataMappingStates({id: branchesListKey, name: city })));

      return {
        ...state,
        listState: {
          ...state.listState,
          loading: false,
          data: {
            ...state.listState.data,
            [regionId]: mappedStatesList
          },
        },
      };
    }
    case LOCATION_STATES_LIST_ERROR: {
      return {
        ...state,
        listState: {
          ...state.listState,
          loading: false,
          error: action.error,
        },
      };
    }
    case CLEAR_LOCATION_STATES_LIST: {
      return {
        ...state,
        listState: {
          ...state.listState,
          data: null,
          error: null,
        },
      };
    }

    case LOCATION_BRANCHES_LIST_LOADING: {
      return {
        ...state,
        listBranches: {
          ...state.listBranches,
          loading: true,
          error: null,
        },
      };
    }
    case LOCATION_BRANCHES_LIST_SUCCESS: {
      const {
        stateId,
        branchList,
      } = action.data;
      const mapBranchList = branchList.map(branch => {
        let absorbData = absorbDataBranches(branch);
        return dataMappingBranches({ 
          id: absorbData.id,
          name: absorbData.name,
        });
      });

      return {
        ...state,
        listBranches: {
          ...state.listBranches,
          loading: false,
          data: {
            ...state.listBranches.data,
            [stateId]: mapBranchList,
          },
        },
      };
    }
    case LOCATION_BRANCHES_LIST_ERROR: {
      return {
        ...state,
        listBranches: {
          ...state.listBranches,
          loading: false,
          error: action.error,
        },
      };
    }

    default:
      return state;
  }
}

export default locations;