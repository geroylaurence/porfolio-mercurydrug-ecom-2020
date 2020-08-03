import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import StyledContainer from '../../components/layouts/styledContainer';
import CbButton from '../../ui/classBase/cbButton';
import { H4Grey, H5Grey } from '../../ui/headers';

import {
  resendProcessingValidateEmail
} from '../../../model/account';

class AccountUnverified extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCounter: 0
    };

    this.resendHandler = this.resendHandler.bind(this);
  }
  resendHandler(e) {
    window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_TIMER = new Date();
    window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_PROCESSING_TIME = this.props.app.appTimer['validate-email-resend-processing'];

    this.setState({ currentCounter: window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_PROCESSING_TIME });

    resendProcessingValidateEmail();
  }
  componentDidMount() {
    if (
      window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_TIMER !== undefined &&
      window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_TIMER !== null
    ) {
      const currentTime = new Date();
      const seconds = Math.floor((currentTime.getTime() - window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_TIMER.getTime()) / 1000);
      this.setState({ currentCounter: (window.ACCOUNT_UNVERIFIED_RESEND_EMAIL_VALIDATION_PROCESSING_TIME - seconds) });
    }
  }
  render() {
    if (this.props.account.verified) {
      return <Redirect to="/" />
    }
    
    return (
      <StyledContainer marginTop="sm">
        <div className="container">
          <div className="row">
            <h1>Your Account is not yet verified</h1>
          </div><br />
          <div  className="row">
            <p>
              You need to verify your email address <strong>‘{`${this.props.account.userData.email}`}’</strong> to continue 
              to Checkout and Payments.  Please check your email for the Email Validation link. 
              Or you can try to resend the Email Validation by clicking the button below.
            </p>
          </div>
          <div className="row">
            <CbButton 
              className="btn" 
              type="button"
              onClick={this.resendHandler}
              disabled={(this.state.currentCounter > 0)}
            >
              Resend Email Validation
            </CbButton>
            &nbsp;&nbsp;&nbsp;
            { this.state.currentCounter > 0 &&
              <H5Grey marginVerticalAuto>
                Try again in {this.state.currentCounter} secs.
              </H5Grey>
            }
          </div>
        </div>
      </StyledContainer>
    )
  }
}

// redux
const mapStateToProps = state => ({
  account: state.account,
  app: state.app,
});

export default connect(mapStateToProps)(AccountUnverified);