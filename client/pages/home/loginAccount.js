import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import CbButton from '../../ui/classBase/cbButton';

import { login } from '../../../model/account';
import { SET_CART_ITEM_COUNT } from '../../../redux/actions/cart';

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
    this.handlerToggelCreateAccount = this.handlerToggelCreateAccount.bind(this);
    this.nodeInputEmail = null;
    this.nodeInputPassword = null;
  }
  handlerSubmit(e) {
    e.preventDefault()

    this.props.loginAccountLoading();
    login({
      email: this.nodeInputEmail.value,
      password: this.nodeInputPassword.value,
    })
    .then(result => {
      $('#login-account').modal('toggle');
      this.props.loginAccountSuccess(result.data);
      this.props.setCartCountItems(result.data);
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
  handlerToggelCreateAccount(e) {
    if (this.props.account.login.loading) {
      return false;
    } else {
      $('#login-account').modal('toggle');
      $('#create-account').modal('toggle');
    }
  }
  componentDidMount() {
    this.props.loginAccountClearError();
  }
  render() {
    return (
      <React.Fragment>
        <CbButton 
          type="button"
          className="btn"
          data-toggle="modal"
          data-target="#login-account"
          data-backdrop="static"
          data-keyboard="false"
          style={{height: '100%'}}
          onClick={e => {
            this.props.loginAccountClearError();
            this.setState({
              ...this.state,
              form: {
                email: '',
                password: ''
              },
            });
          }}
        >
          Log In to Mercury Drug Online
        </CbButton>
        <div 
          className="modal fade" 
          id="login-account" 
          tabIndex="-1" 
          role="dialog"
        >
          <div 
            className="modal-dialog modal-md" 
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button" 
                  className="close" 
                  data-dismiss="modal" 
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h3 align="center">
                  LOG IN
                </h3><br /><br />
                <div className="container-fluid">
                  <form onSubmit={this.handlerSubmit} method="POST">
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
                      <div className="form-row">
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
                          type="submit" 
                          className="btn btn-danger w-70"
                        >
                          &nbsp;&nbsp;LOG IN&nbsp;&nbsp;
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
                        <Link 
                          to="/reset-password"
                          onClick={e=> {$('#login-account').modal('toggle')}}
                        >
                          <label>
                            Forgot your Password
                          </label>
                        </Link>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-check">
                        <a href="#" onClick={this.handlerToggelCreateAccount}>
                          <label>
                            I want to create an account
                          </label>
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginAccountLoading: () => dispatch({ type: 'LOGIN_ACCOUNT_LOADING' }),
    loginAccountSuccess: (userData) => dispatch({ type: 'LOGIN_ACCOUNT_SUCCESS', data: userData }),
    loginAccountError: (error) => dispatch({ type: 'LOGIN_ACCOUNT_ERROR', error }),
    loginAccountClearError: () => dispatch({ type: 'CLEAR_LOGIN_ACCOUNT_ERROR' }),

    setCartCountItems: userData => dispatch({ type: SET_CART_ITEM_COUNT, data: userData.cartItemCount }),
  }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
