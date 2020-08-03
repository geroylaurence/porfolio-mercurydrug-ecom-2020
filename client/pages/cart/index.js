import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import ItemTable from './itemsTable';
import OrderSummary from './orderSummary';

import StyledContainer from '../../components/layouts/styledContainer';
import MediaQueryFlex from '../../components/layouts/mediaQueryFlex';
import MediaQueryContainer from '../../components/layouts/mediaQueryContainer';
import { BsBtnPrimary } from '../../ui/bootstrap/bsButton';

// misc
import { getItems } from '../../../model/cart';
import {
  CART_GET_ITEMS_LOADING,
  CART_GET_ITEMS_SUCCESS,
  CART_GET_ITEMS_ERROR,
} from '../../../redux/actions/cart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.renderCheckOutBtn = this.renderCheckOutBtn.bind(this);
  }
  componentDidMount() {
    if (this.props.account.authenticated) {
      this.props.cartGetItemsLoading();
      getItems()
      .then(result => {
        this.props.cartGetItemsSuccess(result.data);
      })
      .catch(err => {
        this.props.cartGetItemsError(err);
      });
    }
  }
  renderCheckOutBtn() {
    if (this.props.account.authenticated) {
      return (
        <Link to="/checkout">
          <BsBtnPrimary className="btn btn-lg">
            Checkout
          </BsBtnPrimary>
        </Link>
      );
    }
    return (
      <Link to="/login">
        <BsBtnPrimary className="btn btn-lg">
          Login to Checkout
        </BsBtnPrimary>
      </Link>
    );
  }
  render() {
    let accessType = this.props.account.authenticated ? {
      tag: `user`,
      nCart: this.props.cart.inItemsCount
    } : {
      tag: `guest`,
      nCart: this.props.cart.guestInItemsCount
    };

    let renderCartContent = (
      <React.Fragment>
        <MediaQueryFlex applyChildsHzMargin>
          <StyledContainer dontGrow>
            <ItemTable />
            <MediaQueryContainer desktopQuery>
              <StyledContainer itemsCenter marginTop="sm">
                { this.renderCheckOutBtn() }
              </StyledContainer>
            </MediaQueryContainer><br />
          </StyledContainer>
          <StyledContainer>
            <OrderSummary />
          </StyledContainer>
        </MediaQueryFlex>
        <MediaQueryContainer mobileQuery>
          <StyledContainer itemsCenter>
            { this.renderCheckOutBtn() }
          </StyledContainer>
        </MediaQueryContainer>
      </React.Fragment>
    )

    let renderCartEmpty = (
      <React.Fragment>
        <StyledContainer marginBottom="sm">
          <h3 align="center">
            Cart is Empty
          </h3>
        </StyledContainer>
        <StyledContainer itemsCenter>
          <Link to="/">
            <BsBtnPrimary className="btn" type="button">
              Go to Shop
            </BsBtnPrimary>
          </Link>
        </StyledContainer>
      </React.Fragment>
    );

    return (
      <StyledContainer marginTop="sm">
        { accessType.tag === 'user' ?
          (accessType.nCart > 0 ? renderCartContent : renderCartEmpty) 
          :
          (accessType.nCart > 0 ? renderCartContent : renderCartEmpty)
        }
      </StyledContainer>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  cartGetItemsLoading: () => dispatch({ type: CART_GET_ITEMS_LOADING }),
  cartGetItemsSuccess: (data) => dispatch({ type: CART_GET_ITEMS_SUCCESS, data }),
  cartGetItemsError: (error) => dispatch({ type: CART_GET_ITEMS_SUCCESS, error }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);