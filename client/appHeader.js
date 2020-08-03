import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import StyledContainer from './components/layouts/styledContainer';
import MediaQueryFlex from './components/layouts/mediaQueryFlex';
import { ImageMercuryLogo } from './ui/image';
import mercuryDrugLogo from '../assets/md-main-logo.png';

// misc
import { main as logout } from '../model/main';
import { 
  GUEST_USER_SET_CART_ITEM_FROM_LOCAL_STORAGE,
  COMPUTE_SET_PAYMENT_SUMMARY,
} from '../redux/actions/cart';
import { LOGOUT_ACCOUNT_TO_APP } from '../redux/actions/account';

const AccountOptionsContainer = styled.div`
  width: inherit;
  button.btn {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.account.authenticated) {
      this.props.setCartCountItems();
      this.props.setComputedPaymentSummary();
    }
  }
  render() {
    return (
      <StyledContainer marginTop="xs" marginBottom="sm">
        <MediaQueryFlex>
          <div>
            <Link to="/">
              <ImageMercuryLogo src={mercuryDrugLogo} />
            </Link>
          </div><br />
          <div className="my-auto ml-auto">
            <AccountOptionsContainer>
              <Link to="/cart">
                <button className="btn" type="button">
                  <span className="mr-2">
                    <i className="fa fa-cart-plus" />
                  </span>
                  My Cart
                  { this.props.account.authenticated ?
                    <span className="ml-2 badge badge-light">
                      { (this.props.cart.inItemsCount > 0) ? this.props.cart.inItemsCount : null }
                    </span>
                    :
                    <span className="ml-2 badge badge-light">
                      { (this.props.cart.guestInItemsCount > 0) ? this.props.cart.guestInItemsCount : null }
                    </span>
                  }
                </button>
              </Link>
              { this.props.account.authenticated &&
                <React.Fragment>
                  &nbsp;
                  <button 
                    className="btn dropdown-toggle" 
                    type="button" 
                    id="dropdownMenu2" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                  >
                    <span className="mr-2">
                      <i className="fa fa-user" />
                    </span>
                    My Account
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                    <a className="dropdown-item disabled" href="#">
                      {this.props.account.userData.firstName}
                    </a>
                    <Link to="/my-account">
                      <button
                        className="dropdown-item" 
                        type="button"
                      >
                        <span className="mr-2">
                          <i className="fa fa-id-badge" />
                        </span>
                        Profile
                      </button>
                    </Link>
                    <button 
                      className="dropdown-item"
                      type="button"
                      onClick={e => { 
                        this.props.logoutAccount();
                        window.location = '/';
                      }}>
                      <span className="mr-2">
                        <i className="fa fa-sign-out" />
                      </span>
                      Logout
                    </button>
                  </div>
                </React.Fragment>
              }
              { !this.props.account.authenticated &&
                <React.Fragment>
                  &nbsp;
                  <Link to="/login">
                    <button 
                      className="btn" 
                      type="button"
                    >
                      <span className="mr-2">
                        <i className="fa fa-user" />
                      </span>
                      Login
                    </button>
                  </Link>
                </React.Fragment>
              }
            </AccountOptionsContainer>
          </div>
        </MediaQueryFlex>
      </StyledContainer>
    )
  }
}

// REDUX
const mapStateToProps = state => ({
  account: state.account,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  logoutAccount: () => dispatch({ type: LOGOUT_ACCOUNT_TO_APP }),
  setCartCountItems: () => dispatch({ type: GUEST_USER_SET_CART_ITEM_FROM_LOCAL_STORAGE }),
  setComputedPaymentSummary: () => dispatch({ type: COMPUTE_SET_PAYMENT_SUMMARY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppHeader));