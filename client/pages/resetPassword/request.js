import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import StyledContainer from '../../components/layouts/styledContainer';
import { CardDefault } from '../../ui/cards';
import { H3Grey } from '../../ui/headers';
import CbButton from '../../ui/classBase/cbButton';
import { TextGrey } from '../../ui/text';

// misc
import { requestResetPassword } from '../../../model/account'; 

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.handlerBtnResetPassword = this.handlerBtnResetPassword.bind(this);
  }
  handlerBtnResetPassword(e) {
    e.preventDefault();
    const getEmail = document.getElementById('email').value;

    this.props.dispatch({ type: 'REQUEST_RESET_PASSWORD_LOADING' });
    requestResetPassword(getEmail)
    .then(result => {
      this.props.dispatch({ type: 'REQUEST_RESET_PASSWORD_SUCCESS', data: result });
    })
    .catch(err => {
      this.props.dispatch({ type: 'REQUEST_RESET_PASSWORD_ERROR', error: err });
    });
  }
  render() {
    return (
      <StyledContainer marginTop="sm">
        <CardDefault className="mx-auto">
          <H3Grey marginBottom="30px">Reset Password</H3Grey>
          { this.props.resetPassword.data &&
            <React.Fragment>
              <TextGrey>
                Thank you! You will receive a link in your email address to reset your password
              </TextGrey><br />
              <StyledContainer itemsCenter>
                <Link to="/">
                  <CbButton 
                    className="btn btn-md"
                    type="submit"
                  >
                    &nbsp;&nbsp;OK&nbsp;&nbsp;
                  </CbButton>
                </Link>
              </StyledContainer>
            </React.Fragment>
          }
          { !this.props.resetPassword.data &&
            <form method="POST">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="email"
                />
              </div><br />
              <StyledContainer itemsCenter>
                { !this.props.resetPassword.loading &&
                  <CbButton 
                    className="btn btn-md"
                    type="submit"
                    onClick={this.handlerBtnResetPassword}
                  >
                    Reset Password
                  </CbButton>
                }
                { this.props.resetPassword.loading &&
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                }
              </StyledContainer>
            </form>
          }
        </CardDefault>
      </StyledContainer>
    );
  }
}

const mapStateToProps = state => ({
  resetPassword: state.account.resetPassword
});

export default connect(mapStateToProps)(ResetPassword);
