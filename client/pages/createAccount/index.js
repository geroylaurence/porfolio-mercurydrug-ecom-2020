import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import StyledContainer from '../../components/layouts/styledContainer';
import { CardDefault } from '../../ui/cards';

// misc 
import {
  register,
  registerWithPushCart
} from '../../../model/account';
import {
  CREATE_ACCOUNT_LOADING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  CLEAR_CREATE_ACCOUNT_ERROR,
} from '../../../redux/actions/account';
import {
  SET_CART_ITEM_COUNT_FROM_GUEST_TO_LOGIN,
  GUEST_USER_CLEAR_CART_ITEMS,
} from '../../../redux/actions/cart';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: ''
      },
    };

    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.errorSubmit = this.errorSubmit.bind(this);
    this.checkEmptyInputs = this.checkEmptyInputs.bind(this);

    this.nodeDateComponent = null;
    this.nodeTermsAndConditions = null;
    this.nodeDataPolicyPrivacy = null;
  }
  checkEmptyInputs() {
    return (
      this.state.form.email !== '' &&
      this.state.form.password !== '' &&
      this.state.form.passwordConfirm !== '' &&
      this.state.form.firstName !== '' &&
      this.state.form.lastName !== ''
    );
  }
  handlerOnChange(e) {
    const { name, value, checked, type } = e.target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    }); 
  }
  handlerSubmit(e) {
    e.preventDefault();
    let accountEntry = this.state.form;

    if (
      !this.props.register.loading &&
      this.nodeTermsAndConditions.checked &&
      this.nodeDataPolicyPrivacy.checked
    ) {
      this.props.registerAccountLoading();

      let registerProcessor = this.props.cart.guestInItemsCount === 0 ? {
        def: register,
        params: accountEntry,
        execActions: result => {
          this.props.registerAccountSuccess(result.data);
        }
      } : {
        def: registerWithPushCart,
        params: { 
          form: accountEntry,
          cartItems: ((items) => {
          let itemsParams = items.map(item => ({ productId: `${item.id}`, quantity: `${item.quantity}` }))
            return itemsParams
          })(this.props.cart.guestCart) 
        },
        execActions: result => {
          this.props.registerAccountSuccess(result.registerData);
          this.props.setCartCountItemsFromGuestToLogin(result.cartData);
          this.props.guestUserClearCartItems();
        }
      };

      registerProcessor.def(registerProcessor.params)
      .then(result => {
        registerProcessor.execActions(result);
      })
      .catch(err => {
        this.props.registerAccountError(err.error);
      });
    }
  }
  errorSubmit(field) {
    const checkError = this.props.register.error;
    let errorRef;

    if (checkError !== null) {
      errorRef = checkError.find(elem => elem.property === field);
    }

    if (errorRef) {
      return {
        isValid: false,
        errorRef,
      }
    }

    return {
      isValid: true,
    }
  }
  componentDidMount() {
    this.props.registerAccountClearError();
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
                CREATE ACCOUNT
              </h3>
            </StyledContainer>
            <StyledContainer>
              <form method="POST">
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        className={`form-control ${(this.errorSubmit('email').isValid) ? `` : `is-invalid`}`}
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={this.state.form.email}
                        onChange={this.handlerOnChange}
                      />
                      <div className="invalid-feedback">
                        Invalid Email Address or Email is already used.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        className={`form-control ${(this.errorSubmit('password').isValid) ? `` : `is-invalid`}`}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.form.password}
                        onChange={this.handlerOnChange}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        className={`form-control ${(this.errorSubmit('password').isValid) ? `` : `is-invalid`}`}
                        type="password"
                        placeholder="Password Confirm"
                        name="passwordConfirm"
                        value={this.state.form.passwordConfirm}
                        onChange={this.handlerOnChange}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        className={`form-control ${(this.errorSubmit('firstName').isValid) ? `` : `is-invalid`}`}
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={this.state.form.firstName}
                        onChange={this.handlerOnChange}
                      />
                      <div className="invalid-feedback">
                        First Name is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md">
                    <div className="form-group">
                      <input
                        className={`form-control ${(this.errorSubmit('lastName').isValid) ? `` : `is-invalid`}`}
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={this.state.form.lastName}
                        onChange={this.handlerOnChange}
                      />
                      <div className="invalid-feedback">
                        Last Name is required
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="form-group">
                  <div className="form-check">
                    <input
                      ref={node => this.nodeTermsAndConditions = node}
                      className="form-check-input"
                      type="checkbox"
                      id="termsAndConditions" 
                      name="termsAndConditions"
                    />
                    <label 
                      className="form-check-label"
                      htmlFor="termsAndConditions"
                    >
                      I agree to
                      &nbsp;
                      <Link 
                        onClick={e=> {$('#create-account').modal('toggle')}} 
                        to="/terms-conditions"
                      >
                        Mercury Drug Online Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      ref={node => this.nodeDataPolicyPrivacy = node}
                      className="form-check-input"
                      type="checkbox"
                      id="dataPrivacyPolicy" 
                      name="dataPrivacyPolicy" 
                    />
                    <label 
                      className="form-check-label"
                      htmlFor="dataPrivacyPolicy"
                    >
                      I accept and agree to be bound by terms and conditions of Mercury Drug's
                      &nbsp;
                      <Link 
                        onClick={e=> {$('#create-account').modal('toggle')}} 
                        to="/data-privacy"
                      >
                        Data Privacy Policy
                      </Link> for the purpose of administration of my account and processing 
                      of my Mercury Drug Online transactions.
                    </label>
                  </div>
                </div>
                { !this.props.register.loading &&
                  <div className="form-group row justify-content-center">
                    <div className="col-sm-5">
                        <button
                          type="button" 
                          className="btn btn-danger"
                          style={{width: '100%'}}
                          disabled={!this.checkEmptyInputs()}
                        >
                          SIGN UP
                        </button>
                    </div>
                  </div>
                }
                { this.props.register.loading &&
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
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
  register: state.account.register,
  cart: state.cart,
});

const mapStateToDispatch = dispatch => ({
  registerAccountLoading: () => dispatch({ type: CREATE_ACCOUNT_LOADING }),
  registerAccountSuccess: (data) => dispatch({ type: CREATE_ACCOUNT_SUCCESS, data }),
  registerAccountError: (error) => dispatch({ type: CREATE_ACCOUNT_ERROR, error }),
  registerAccountClearError: () => dispatch({ type: CLEAR_CREATE_ACCOUNT_ERROR }),

  setCartCountItemsFromGuestToLogin: data => dispatch({ type: SET_CART_ITEM_COUNT_FROM_GUEST_TO_LOGIN, data }),
  guestUserClearCartItems: () => dispatch({ type: GUEST_USER_CLEAR_CART_ITEMS }),
});

export default connect(mapStateToProps, mapStateToDispatch)(CreateAccount);
