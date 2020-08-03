import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { HrLight } from '../../ui/hr';
import { BsBtnPrimary } from '../../ui/bootstrap/bsButton';

// misc
import { list, listState, listBranch } from '../../../model/locations';
import { proceedPayment } from '../../../model/checkout';
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
} from '../../../redux/actions/locations';
import {
  PROCEED_PAYMENT_LOADING,
  PROCEED_PAYMENT_SUCCESS,
  PROCEED_PAYMENT_ERROR,
} from '../../../redux/actions/checkout';

class BranchPickup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formApprove: false,
    };
    this.nodeSelectRegion = null;
    this.nodeSelectState = null;
    this.nodeSelectBranch = null;

    this.locationList = this.locationList.bind(this);
    this.locationStateList = this.locationStateList.bind(this);
    this.locationBranchesList = this.locationBranchesList.bind(this);
    this.proceedPayment = this.proceedPayment.bind(this);
  }
  locationList() {
    this.props.dispatch({ type: LOCATIONS_LIST_LOADING });
    list()
    .then(result => {
      this.props.dispatch({ type: LOCATIONS_LIST_SUCCESS, data: result.data });
    })
    .catch(err => {
      this.props.dispatch({ type: LOCATIONS_LIST_ERROR, error: err });
    });
  }
  locationStateList(regionId) {
    this.props.dispatch({ type: LOCATION_STATES_LIST_LOADING });
    listState(regionId)
    .then(result => {
      this.props.dispatch({ 
        type: LOCATION_STATES_LIST_SUCCESS, 
        data: {
          statesList: result.data,
          regionId,
        }
      });
    })
    .catch(err => {
      this.props.dispatch({ type: LOCATION_STATES_LIST_ERROR, error: err });
    });
  }
  locationBranchesList(stateId) {
    this.props.dispatch({ type: LOCATION_BRANCHES_LIST_LOADING });
    listBranch(stateId)
    .then(result => {
      this.props.dispatch({ type: LOCATION_BRANCHES_LIST_SUCCESS, data: { stateId, branchList: result.data } });
    })
    .catch(err => {
      this.props.dispatch({ type: LOCATION_BRANCHES_LIST_ERROR });
    });
  }
  proceedPayment() {
    const inputData = {};
    inputData.deliveryType = this.props.checkout.serviceOption;
    inputData.addressId = this.props.checkout.address.id;
    inputData.branchId = this.nodeSelectBranch.value;
    inputData.rewardPointsRedemption = this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet;

    this.props.dispatch({ type: PROCEED_PAYMENT_LOADING });
    proceedPayment(inputData)
    .then(result => this.props.dispatch({ type: PROCEED_PAYMENT_SUCCESS, data: result.data }))
    .catch(err => this.props.dispatch({ type: PROCEED_PAYMENT_ERROR, error: err }));
  }
  componentDidMount() {
    if (this.props.locations.list.data === null) {
      this.locationList();
    }
  }
  render() {
    return (
      <div className="d-block">
        <div className="d-block mb-4">
          <h5 className="my-auto text-danger">
            SKIP THIS STEP IF YOU PREFER DELIVERY OF YOUR ORDER.
          </h5>
        </div>
        <div className="d-flex mb-2">
          <h5 className="my-auto text-danger">
            <span className="my-auto mr-2 text-danger">
              <i className="fa fa-cart-plus" />
            </span>
            BRANCH SELECTION
          </h5>
        </div>
        <div className="d-block mb-2">
          <HrLight />
        </div>
        <div className="d-block mb-2">
          <h6 className="text-danger">
            Select Mercury Drug to serve your order
          </h6>
        </div>
        <div className="d-block">
          <div className="d-block mb-1" style={{width: '80%'}}>
            <label htmlFor="region">
              <span className="text-danger">*</span>
              Region
            </label>
            <select
              className="form-control"
              id="region"
              onChange={e => {
                const { text, value, id, ...otherProps } = e.target;

                if (value !== '') {
                  if (
                    this.props.locations.listState.data === null ||
                    !(this.props.locations.listState.data.hasOwnProperty(value))
                  ) {
                    this.locationStateList(value);
                  }
                } else {
                  this.props.dispatch({ type: CLEAR_LOCATION_STATES_LIST });
                }
                this.props.dispatch({ type: SET_VIEW_REGION_ID, data: value });
                this.props.dispatch({ type: SET_VIEW_STATE_ID, data: '' });
              }}
              disabled={this.props.locations.listState.loading || this.props.locations.listBranches.loading}
              ref={node => this.nodeSelectRegion = node}
            >
              <option value="" selected disabled>Select Region</option>
              { this.props.locations.list.data !== null &&
                this.props.locations.list.data.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))
              }
            </select>
          </div>
          <div className="d-block mb-1" style={{width: '80%'}}>
            <label htmlFor="provinceCity">
              <span className="text-danger">*</span>
              Province/City
            </label>
            <select
              className="form-control"
              id="provinceCity"
              onChange={e => {
                const { value, id } = e.target;

                if (value !== '') {
                  if (
                    this.props.locations.listBranches.data === null ||
                    !(this.props.locations.listBranches.data.hasOwnProperty(value))
                  ) {
                    this.locationBranchesList(value)
                  }
                }
                this.props.dispatch({ type: SET_VIEW_STATE_ID, data: value });
              }}
              disabled={this.props.locations.listState.loading || this.props.locations.listBranches.loading}
              ref={node => this.nodeSelectState = node}
            >
              <option value="" selected disabled>Select State</option>
              { this.props.locations.listState.data !== null &&
                this.props.locations.listState.data.hasOwnProperty(this.props.locations.list.viewRegionId) &&
                this.props.locations.listState.data[this.props.locations.list.viewRegionId].map(state => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))
              }
            </select>
          </div>
          <div className="d-block mb-1" style={{width: '80%'}}>
            <label htmlFor="storeBranch">
              <span className="text-danger">*</span>
              Branch
            </label>
            <select
              className="form-control"
              id="storeBranch"
              disabled={this.props.locations.listState.loading || this.props.locations.listBranches.loading}
              ref={node => this.nodeSelectBranch = node}
            >
              <option value="" selected disabled>Select Branch</option>
              { this.props.locations.listBranches.data !== null &&
                this.props.locations.listBranches.data.hasOwnProperty(this.props.locations.listState.viewStateId) &&
                this.props.locations.listBranches.data[this.props.locations.listState.viewStateId].map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <hr />
        <div className="d-block" align="right">
          { this.props.checkout.proceedPayment.loading &&
            <div className="spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          { !this.props.checkout.proceedPayment.loading &&
            <div className="d-inline-flex">
              <NavLink className="mr-2 my-auto" to="/checkout/receiver">
                <BsBtnPrimary className="btn btn-md">
                  Previous
                </BsBtnPrimary>
              </NavLink>
              <BsBtnPrimary 
                className="btn btn-lg"
                onClick={e => {
                  if ((
                      this.nodeSelectRegion.value !== '' &&
                      this.nodeSelectState.value !== '' &&
                      this.nodeSelectBranch.value !== ''
                     ) && (
                      !this.props.checkout.newAddress.loading &&
                      !this.props.checkout.cartInitiateRedeemPoints.loading && 
                      !this.props.checkout.proceedPayment.loading
                     )) {
                      this.proceedPayment();
                  } else {
                    alert("Please Complete the Pick-up Address Information.");
                  }
                }}
                disabled={this.props.checkout.proceedPayment.loading}
              >
                Proceed Payment
              </BsBtnPrimary>
            </div>
          }
        </div> 
      </div>
    )
  }
}

// redux
const mapStateToProps = state => ({
  locations: state.locations,
  checkout: state.checkout,
  address: state.address,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BranchPickup);