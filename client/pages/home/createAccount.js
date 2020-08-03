import React from 'react';
import { connect } from 'react-redux';

import Link from '../../ui/link';
import CbButton from '../../ui/classBase/cbButton';

// misc 
import {
  CREATE_ACCOUNT_LOADING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  CLEAR_CREATE_ACCOUNT_ERROR,
  register,
} from '../../../redux/actions/account';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createAccount: {
        loading: false,
        data: null,
        error: null,
      },
      form: {
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: ''
      },
    }

    this.handlerOnChange = this.handlerOnChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.errorSubmit = this.errorSubmit.bind(this);

    this.nodeDateComponent = null;
    this.nodeTermsAndConditions = null;
    this.nodeDataPolicyPrivacy = null;
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

    let accountEntry = this.state.form
    
    if (
      !this.props.register.loading &&
      this.nodeTermsAndConditions.checked &&
      this.nodeDataPolicyPrivacy.checked
    ) {
      this.props.registerAccountLoading();
      register(accountEntry)
      .then(result => {
        $('#create-account').modal('toggle');
        this.props.registerAccountSuccess(result.data);
        $('#create-account-notif').modal('toggle');

        window.location = '/';
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
    return (
      <React.Fragment>
        <CbButton
          type="button"
          className="btn"
          data-toggle="modal"
          data-target="#create-account"
          data-backdrop="static"
          data-keyboard="false"
          style={{height: '100%'}}
          onClick={e => {
            this.props.registerAccountClearError();
            this.setState({
              form: {
                ...this.state.form,
                email: '',
                password: '',
                passwordConfirm: '',
                firstName: '',
                lastName: ''
              }
            });
            this.nodeTermsAndConditions.checked = false;
            this.nodeDataPolicyPrivacy.checked = false;
          }}
        >
          Create Mercury Drug Online Account
        </CbButton>
        <div 
          className="modal fade" 
          id="create-account" 
          tabIndex="-1" 
          role="dialog" 
          // aria-labelledby="exampleModalLabel" 
          // aria-hidden="true"
        >
          <div 
            className="modal-dialog modal-md" 
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3 className="mb-4"align="center">
                  CREATE ACCOUNT
                </h3>
                <div className="row mx-4">
                  <div className="container-fluid">
                    <form onSubmit={this.handlerSubmit} method="POST">
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
                                type="submit" 
                                className="btn btn-danger"
                                style={{width: '100%'}}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="modal fade" 
          id="create-account-notif" 
          tabIndex="-1" 
          role="dialog" 
          // aria-labelledby="exampleModalLabel" 
          // aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3 className="text-center">You have successfully created an account</h3>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  register: state.account.register,
});

const mapStateToDispatch = dispatch => ({
  registerAccountLoading: () => dispatch({ type: CREATE_ACCOUNT_LOADING }),
  registerAccountSuccess: (data) => dispatch({ type: CREATE_ACCOUNT_SUCCESS, data }),
  registerAccountError: (error) => dispatch({ type: CREATE_ACCOUNT_ERROR, error }),
  registerAccountClearError: () => dispatch({ type: CLEAR_CREATE_ACCOUNT_ERROR }),
});

export default connect(mapStateToProps, mapStateToDispatch)(CreateAccount);
