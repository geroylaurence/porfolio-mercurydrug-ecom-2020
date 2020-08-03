import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import StyledContainer from '../../components/layouts/styledContainer';
import { CardDefault } from '../../ui/cards';

// misc
import { login, loginWithPushCart } from '../../../model/account';
import { 
  SET_CART_ITEM_COUNT, 
  SET_CART_ITEM_COUNT_FROM_GUEST_TO_LOGIN,
  GUEST_USER_CLEAR_CART_ITEMS,
} from '../../../redux/actions/cart';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: ''
      },
    }

    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.nodeInputEmail = null;
    this.nodeInputPassword = null;
  }
  handlerSubmit(e) {
    e.preventDefault()

    this.props.loginAccountLoading();
    let loginProcessor = this.props.cart.guestInItemsCount === 0 ? {
      def: login,
      params: { email: this.nodeInputEmail.value, password: this.nodeInputPassword.value },
      execActions: (result) => {
        this.props.loginAccountSuccess(result.data);
        this.props.setCartCountItems(result.data);
        // this.props.history.push(this.props.app.appLoginLastPage);
      }
    } : {
      def: loginWithPushCart,
      params: { 
        email: this.nodeInputEmail.value, 
        password: this.nodeInputPassword.value, 
        cartItems: ((items) => {
          let itemsParams = items.map(item => ({ productId: `${item.id}`, quantity: `${item.quantity}` }))
          return itemsParams
        })(this.props.cart.guestCart) },
      execActions: (result) => {
        this.props.loginAccountSuccess(result.loginData);
        this.props.setCartCountItemsFromGuestToLogin(result.cartData);
        this.props.guestUserClearCartItems();
        // this.props.history.push(this.props.app.appLoginLastPage);
      }
    };

    loginProcessor.def(loginProcessor.params)
    .then(result => {
      loginProcessor.execActions(result);
    })
    .catch(err => {
      this.props.loginAccountError(err.error);
    });
  }
  handlerOnChange(e) {
    const { name, value } = e.target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }
  render() {
    if (this.props.account.authenticated) {
      return <Redirect to={this.props.app.appLoginLastPage} />
    }

    return (
      <StyledContainer marginTop="sm" itemsCenter>
        <StyledContainer width="400px">
          <CardDefault>
            <StyledContainer marginBottom="sm">
              <h3 align="center">
                <FormattedMessage id="LOGIN_CARD_HEADER" />
              </h3>
            </StyledContainer>
            <StyledContainer>
              <form method="POST">
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        ref={node => this.nodeInputEmail = node}
                        className="form-control"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={this.state.form.email}
                        onChange={this.handlerOnChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        ref={node => this.nodeInputPassword = node}
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.form.password}
                        onChange={this.handlerOnChange}
                      />
                    </div>
                  </div>
                </div>
                { this.props.account.login.error !== null &&
                  <div className="form-row mb-4">
                    <div className="col-md">
                      <input type="hidden" className="form-control is-invalid" />
                      <div className="invalid-feedback">
                        Email and Password is invalid
                      </div>
                    </div>
                  </div>
                }
                <div className="form-row justify-content-md-center mb-4">
                  { !this.props.account.login.loading &&
                    <button
                      type="button" 
                      className="btn btn-danger w-70"
                    >
                      &nbsp;&nbsp;<FormattedMessage id="LOGIN_SUBMIT_LABEL" />&nbsp;&nbsp;
                    </button>
                  }
                  { this.props.account.login.loading &&
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  }
                </div>
                <div className="form-row">
                  <div className="form-check">
                    <Link to="/reset-password">
                      <label>
                        <FormattedMessage id="LOGIN_LINK_FORGOT_PASSWORD"/>
                      </label>
                    </Link>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-check">
                    <Link to="/create-account">
                      <label>
                        <FormattedMessage id="LOGIN_LINK_REGISTER"/>
                      </label>
                    </Link>
                  </div>
                </div>
              </form>
            </StyledContainer>
          </CardDefault>
        </StyledContainer>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  account: state.account,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  loginAccountLoading: () => dispatch({ type: 'LOGIN_ACCOUNT_LOADING' }),
  loginAccountSuccess: userData => dispatch({ type: 'LOGIN_ACCOUNT_SUCCESS', data: userData }),
  loginAccountError: error => dispatch({ type: 'LOGIN_ACCOUNT_ERROR', error }),
  loginAccountClearError: () => dispatch({ type: 'CLEAR_LOGIN_ACCOUNT_ERROR' }),

  setCartCountItems: userData => dispatch({ type: SET_CART_ITEM_COUNT, data: userData.cartItemCount }),
  setCartCountItemsFromGuestToLogin: data => dispatch({ type: SET_CART_ITEM_COUNT_FROM_GUEST_TO_LOGIN, data }),
  guestUserClearCartItems: () => dispatch({ type: GUEST_USER_CLEAR_CART_ITEMS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);