import React from 'react';
import { connect } from 'react-redux';

import StyledContainer from '../../components/layouts/styledContainer';
import CbContainer from '../../ui/classBase/cbContainer';
import { ESukitPointsItemWrapper } from './styled';

// misc
import { cartInitiateRedeemPoints } from '../../../model/checkout';
import {
  CART_INITIATE_REDEEM_POINTS_LOADING,
  CART_INITIATE_REDEEM_POINTS_SUCCESS,
  CART_INITIATE_REDEEM_POINTS_ERROR,
} from '../../../redux/actions/checkout';
import{ CART_GET_ITEMS_SUCCESS, COMPUTE_GRANDTOTAL_DELIVERYFEE } from '../../../redux/actions/cart';

class ESukiPoints extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redeemPoints: 0,
    };

    // props
    // pointsLatest -> string;
    // onControl -> boolean;
    this.pointsLatest = props.pointsLatest;
    this.onControl = props.onControl;

    this.initiateRedeemPoints = this.initiateRedeemPoints.bind(this);
    this.cancelRedeemPoints = this.cancelRedeemPoints.bind(this);
  }
  initiateRedeemPoints(e) {
    const inputRedeemPoints = document.getElementById('e-suki-pts-redeem');
  
    const validRedeemPointsInput = parseFloat(inputRedeemPoints.value);

    if ( validRedeemPointsInput && 
         !this.props.checkout.cartInitiateRedeemPoints.loading &&
         !this.props.checkout.newAddress.loading &&
         !this.props.checkout.proceedPayment.loading
       ) {
      this.props.cartInitiateRedeemPointsLoading();
      cartInitiateRedeemPoints(validRedeemPointsInput)
      .then(result => {
        this.props.cartInitiateRedeemPointsSuccess(result.data);
        this.props.cartRerenderSummary(result.data);
        this.props.setGrandTotalWithDeliveryFee();
        this.setState({ redeemPoints: this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet })
      })
      .catch(err => {
        this.props.cartInitiateRedeemPointsError(err.error);
      });
    }
  }
  cancelRedeemPoints(e) {
    if ( !this.props.checkout.cartInitiateRedeemPoints.loading &&
         !this.props.checkout.newAddress.loading &&
         !this.props.checkout.proceedPayment.loading
     ) {
      this.props.cartInitiateRedeemPointsLoading();
      cartInitiateRedeemPoints(0)
      .then(result => {
        this.props.cartInitiateRedeemPointsSuccess(result.data);
        this.props.cartRerenderSummary(result.data);
        this.props.setGrandTotalWithDeliveryFee();
        this.setState({ redeemPoints: this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet })
      })
      .catch(err => {
        this.props.cartInitiateRedeemPointsError(err.error);
      });
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card">
          <CbContainer 
            applyBgPrimary
            className="card-header"
          >
            <h4 className="text-white">e-Suki Points Details</h4>
          </CbContainer>
          <div className="card-body">
            <ESukitPointsItemWrapper className="row">
              <div className="col-md-7">
                <span>
                  e-Suki Points Latest
                </span>
              </div>
              <div className="col-md my-auto">
                <span className="float-right badge badge-pill badge-danger">
                  &nbsp;&nbsp;{this.pointsLatest}&nbsp;&nbsp;
                </span>
              </div>
            </ESukitPointsItemWrapper>
            <ESukitPointsItemWrapper className="row">
              <div className="col-md-7">
                <span>
                  e-Suki Points to be Redeemed
                </span>
              </div>
              <div className="col-md-4 offset-md-1 my-auto">
                <input 
                  id="e-suki-pts-redeem" 
                  className="form-control" 
                  type="number" 
                  readOnly={this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet > 0}
                  value={this.state.redeemPoints}
                  onChange={e => { this.setState({ redeemPoints: e.target.value }) }}
                />
              </div>
            </ESukitPointsItemWrapper>
            { this.onControl &&
              <ESukitPointsItemWrapper className="row">
                <div className="col-md">
                  <StyledContainer itemsCenter>
                    { this.props.checkout.cartInitiateRedeemPoints.loading &&
                      <div className="spinner-border mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    }
                    { ( this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet < 1 &&
                        !this.props.checkout.cartInitiateRedeemPoints.loading
                      ) &&
                      <button 
                        className="btn btn-secondary" 
                        type="button"
                        onClick={this.initiateRedeemPoints}
                      >
                        APPLY REDEEM POINTS
                      </button>
                    }
                    { ( this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet > 0 &&
                        !this.props.checkout.cartInitiateRedeemPoints.loading
                      ) &&
                      <button 
                        className="btn btn-secondary" 
                        type="button"
                        onClick={this.cancelRedeemPoints}
                      >
                        CANCEL REDEEM POINTS
                      </button>
                    }
                  </StyledContainer>
                </div>
              </ESukitPointsItemWrapper>

            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  checkout: state.checkout,
});

const mapDispatchToProps = dispatch => ({
  cartRerenderSummary: data => dispatch({ type: CART_GET_ITEMS_SUCCESS, data }),
  cartInitiateRedeemPointsLoading: () => dispatch({ type: CART_INITIATE_REDEEM_POINTS_LOADING }),
  cartInitiateRedeemPointsSuccess: data => dispatch({ type: CART_INITIATE_REDEEM_POINTS_SUCCESS, data }),
  cartInitiateRedeemPointsError: error => dispatch({ type: CART_INITIATE_REDEEM_POINTS_ERROR, error }),
  setGrandTotalWithDeliveryFee: () => dispatch({ type: COMPUTE_GRANDTOTAL_DELIVERYFEE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ESukiPoints);