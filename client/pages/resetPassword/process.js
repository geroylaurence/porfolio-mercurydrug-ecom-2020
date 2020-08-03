import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import StyledContainer from '../../components/layouts/styledContainer';
import { CardDefault } from '../../ui/cards';
import { H3Grey } from '../../ui/headers';
import CbButton from '../../ui/classBase/cbButton';
import { TextGreen, TextFailed } from '../../ui/text';

// misc
import { processResetPassword } from '../../../model/account';

class ProcessResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      input: {
        password: '', 
        passwordConfirm: ''
      },
      errorInput: false,
      errorFeedback: false,
    };
    this.handlerInputPassword = this.handlerInputPassword.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.processResetPassword = this.processResetPassword.bind(this);
  }
  processResetPassword() {
    const urlLocation = this.props.location;
    const parseQuery = queryString.parse(urlLocation.search);

    const {
      user,
      check,
      token,
    } = parseQuery;

    this.props.dispatch({ type: 'PROCESS_RESET_PASSWORD_LOADING' });
    processResetPassword({
      check,
      token,
      email: user,
      newPassword: this.state.input.password,
    })
    .then(result => { 
      this.props.dispatch({ type: 'PROCESS_RESET_PASSWORD_SUCCESS', data: result.data });
    })
    .catch(err => {
      this.props.dispatch({ type: 'PROCESS_RESET_PASSWORD_ERROR', error: err.error });
    });
  }
  handlerInputPassword(e) {
    const { id, value } = e.target;
    this.setState({ 
      input: {
        ...this.state.input,
        [id]: `${value}` 
      }
    });
  }
  handlerSubmit(e) {
    e.preventDefault();

    if (
      (this.state.input.password !== '' && this.state.input.passwordConfirm !=='') &&
      this.state.input.password === this.state.input.passwordConfirm
    ) {
      this.processResetPassword();
    } else {
      this.setState({ errorInput: true });
    }
  }
  render() {
    return (
      <StyledContainer marginTop="sm">
        <CardDefault className="mx-auto">
          <H3Grey marginBottom="30px">Reset Password</H3Grey>
          { !this.props.processResetPassword.successful && !this.props.processResetPassword.error &&
            <React.Fragment>
              <form method="POST" autocomplete="off">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={this.handlerInputPassword}
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <label  htmlFor="passwordConfirm">Confirm Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    onChange={this.handlerInputPassword}
                    value={this.state.passwordConfirm}
                  />
                </div>
                { this.state.errorInput &&
                  <StyledContainer itemsCenter>
                    <TextFailed>
                      Invalid Password, Make sure the password is match and not empty
                    </TextFailed>
                  </StyledContainer>
                }
                <StyledContainer itemsCenter paddingTop="md">
                  { this.props.processResetPassword.loading &&
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  }
                  { !this.props.processResetPassword.loading &&
                    <CbButton
                      className="btn btn-md"
                      type="submit"
                      disabled={!(this.state.password === this.state.passwordConfirm)}
                      onClick={this.handlerSubmit}
                    >
                      &nbsp;&nbsp;Submit&nbsp;&nbsp;
                    </CbButton>
                  }
                </StyledContainer>
              </form> 
            </React.Fragment>
          }
          { this.props.processResetPassword.data && 
            <StyledContainer itemsCenter>
              <TextGreen>
                The password was successfully updated!
              </TextGreen><br />
              <Link to="/">
                <CbButton 
                  className="btn btn-md"
                  type="submit"
                >
                  &nbsp;&nbsp;OK&nbsp;&nbsp;
                </CbButton>
              </Link>
            </StyledContainer>
          }
          { this.props.processResetPassword.error &&
            <StyledContainer itemsCenter>
              <TextFailed>
                The data reference you submitted is invalid!, Please go to your email and proceed to
                the link we sent for reset password processing.
              </TextFailed><br />
              <Link to="/">
                <CbButton 
                  className="btn btn-md"
                  type="submit"
                >
                  &nbsp;&nbsp;OK&nbsp;&nbsp;
                </CbButton>
              </Link>
            </StyledContainer>
          }   
        </CardDefault>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  processResetPassword: state.account.processResetPassword,
});

export default connect(mapStateToProps)(withRouter(ProcessResetPassword));