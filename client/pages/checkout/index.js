import React from 'react';
import { connect } from 'react-redux';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import universal from 'react-universal-component';

const Items = universal(import('./items'));
const Receiver = universal(import('./receiver'));
const BranchPickup = universal(import('./branchPickup'));

import StyledContainer from '../../components/layouts/styledContainer';
import MediaQueryFlex from '../../components/layouts/mediaQueryFlex'; 
import ESukiPoints from './eSukiPoints';
import WizardSteps from './wizardSteps';
import OrderSummary from '../cart/orderSummary';
import FeedbackFailed from './feedback/failed';
import { CheckoutContentContainer } from './styled';

// misc
import { getItems } from '../../../model/cart';
import { eSukiPtsTotal } from '../../../model/checkout';
import {
  CART_GET_ITEMS_LOADING,
  CART_GET_ITEMS_SUCCESS,
  CART_GET_ITEMS_ERROR,
} from '../../../redux/actions/cart';
import {
  ESUKI_PTS_GET_LOADING,
  ESUKI_PTS_GET_SUCCESS,
  ESUKI_PTS_GET_ERROR,
} from '../../../redux/actions/checkout';
import {
  CLEAR_CHECKOUT_DATA
} from '../../../redux/actions/checkout';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eSukiPointsControlOn: false, 
    };

    this.renderValidatedPage = this.renderValidatedPage.bind(this);
  }
  renderValidatedPage(path, component) {
    if (
      path === 'receiver' && 
      this.props.checkout.processing.cartFinalization
    ) {
      return <Route path={`${this.props.match.path}/${path}`} component={component} />
    }
    if (
      path === 'branch-pickup' && 
      this.props.checkout.processing.cartFinalization &&
      this.props.checkout.processing.addressFinalization
    ) {
      return <Route path={`${this.props.match.path}/${path}`} component={component} />
    }
    return <Redirect to={this.props.match.path} />
  }
  componentDidUpdate(prevProps) {
    // if (newProps.checkout.proceedPayment.data !== null) {
    //   window.location = newProps.checkout.proceedPayment.data.paymentRedirectUrl;
    // }
    if (this.props.checkout.proceedPayment.data !== null) {
      window.location = this.props.checkout.proceedPayment.data.paymentRedirectUrl;
    }
  }
  componentDidMount() {
    this.props.cartGetItemsLoading();
    this.props.eSukiPtsTotalLoading();
    const FetchInterface = function() { this.tag='';this.success=false;this.data=null;this.error=null };
    const cartGetItems = new Promise((resolve, reject) => {
      const fetchOnCartItems = new FetchInterface();
      fetchOnCartItems.tag = 'cart-items';
      getItems()
      .then(result => {
        fetchOnCartItems.success=true;
        fetchOnCartItems.data=result.data;
        resolve(fetchOnCartItems);
      })
      .catch(err => {
        fetchOnCartItems.error = err.error;
        resolve(fetchOnCartItems);
      });
    });

    const eSukiPtsTotalGet = new Promise((resolve, reject) => {
      const fetchOnEsukiPtsTotal = new FetchInterface();
      fetchOnEsukiPtsTotal.tag = 'esuki-points';
       eSukiPtsTotal()
      .then(result => {
        fetchOnEsukiPtsTotal.success=true;
        fetchOnEsukiPtsTotal.data=result.data;
        resolve(fetchOnEsukiPtsTotal);
      })
      .catch(err => {
        fetchOnEsukiPtsTotal.error=err.error;
        resolve(fetchOnEsukiPtsTotal);
      });
    });

    Promise.all([cartGetItems, eSukiPtsTotalGet])
    .then(result => {
      const resCartItems = result.find(item => item.tag === 'cart-items');
      const dpResCartItems = resCartItems.success ? this.props.cartGetItemsSuccess(resCartItems.data) : this.props.cartGetItemsError(resCartItems.error);

      const resEsukiPtsTotal = result.find(item => item.tag === 'esuki-points');
      const dpResEsukiPtsTotal = resEsukiPtsTotal.success ? this.props.eSukiPtsTotalSuccess(resEsukiPtsTotal.data) : this.props.eSukiPtsTotalError(resEsukiPtsTotal.error);
    })
    .catch(err => {
      this.props.cartGetItemsError(err.error);
      this.props.eSukiPtsTotalError(err.error);
    });
  }
  render() {
    if (this.props.cart.inItemsCount === 0) {
      return <Redirect to="/" />
    }

    if (this.props.checkout.proceedPayment.error !== null) {
      return <FeedbackFailed default />
    }

    return (
      <StyledContainer marginTop="sm">
        { (this.props.cart.getItems.loading || this.props.checkout.eSukiPointsLatest.loading) &&
          <div className="spinner-border mx-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        }
        { (!this.props.cart.getItems.loading && !this.props.checkout.eSukiPointsLatest.loading) &&
          <MediaQueryFlex applyChildsHzMargin>
            <CheckoutContentContainer>
              <StyledContainer>
                <WizardSteps />
              </StyledContainer>
              <StyledContainer>
                <Switch>
                  <Route 
                    exact 
                    path={this.props.match.path}
                    component={Items}  
                  />
                  { this.renderValidatedPage(`receiver`, Receiver) }
                  { this.renderValidatedPage(`branch-pickup`, BranchPickup) }
                </Switch>
              </StyledContainer><br />
            </CheckoutContentContainer>
            <StyledContainer>
              <ESukiPoints 
                pointsLatest={this.props.checkout.eSukiPointsLatest.eSukiPointPresentable}
                onControl
              /><br />
              <OrderSummary /><br />
            </StyledContainer>
          </MediaQueryFlex>
        }
      </StyledContainer>
    );
  }
}

// redux
const mapStateToProps = state => ({
  cart: state.cart,
  checkout: state.checkout,
});

const mapDispatchToProps = dispatch => ({
  cartGetItemsLoading: () => dispatch({ type: CART_GET_ITEMS_LOADING }),
  cartGetItemsSuccess: (data) => dispatch({ type: CART_GET_ITEMS_SUCCESS, data }),
  cartGetItemsError: (error) => dispatch({ type: CART_GET_ITEMS_SUCCESS, error }),
  eSukiPtsTotalLoading: () => dispatch({ type: ESUKI_PTS_GET_LOADING }),
  eSukiPtsTotalSuccess: (data) => dispatch({ type: ESUKI_PTS_GET_SUCCESS, data }),
  eSukiPtsTotalError: (error) => dispatch({ type: ESUKI_PTS_GET_ERROR, error }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);