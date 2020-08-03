import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import StyledContainer from '../../../components/layouts/styledContainer';
import { H3Grey } from '../../../ui/headers';

import {
  validateEmail
} from '../../../../model/account';
import {
  VALIDATE_EMAIL_ACCOUNT_LOADING,
  VALIDATE_EMAIL_ACCOUNT_SUCCESS,
  VALIDATE_EMAIL_ACCOUNT_FAILED,
} from '../../../../redux/actions/account';


class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);
  }
  componentDidMount() {
    if (this.props.account.validateEmail.data === null) {
      this.validateEmail();
    }
  }
  validateEmail() {
    const { search } = this.props.location;

    const params = new URLSearchParams(search);
    const user = params.get('user'); 
    const check = params.get('check');
    const validation = params.get('validation');

    this.props.dispatch({ type: VALIDATE_EMAIL_ACCOUNT_LOADING });
    validateEmail({
      user,
      check,
      validation,
    })
    .then(result => {
      this.props.dispatch({ type: VALIDATE_EMAIL_ACCOUNT_SUCCESS, data: result.data });
    })
    .catch(err => {
      this.props.dispatch({ type: VALIDATE_EMAIL_ACCOUNT_FAILED, error: err });
    });
  }
  render() {
    if (
     this.props.account.validateEmail.data !== null &&
     this.props.account.validateEmail.data.isVerified
    ) {
      return <Redirect to="/validate-email/success" />
    }

    if (
     (
      this.props.account.validateEmail.data !== null &&
      !this.props.account.validateEmail.data.isVerified &&
      !this.props.account.validateEmail.data.validationSuccess
    ) ||
     (
      this.props.account.validateEmail.data &&
      this.props.account.validateEmail.data.invalidEmail
    ) ||
     this.props.account.validateEmail.error !== null
    ) {
      return <Redirect to="/validate-email/failed" />
    }

    return (
      <StyledContainer marginTop="sm">
        <div className="container-fluid">
          <div className="row mt-5 mb-4">
            <H3Grey className="mx-auto">
              <FormattedMessage id="VALIDATE_EMAIL_PROCESSING_H3_MESSAGE" />
            </H3Grey>
          </div>
          { this.props.account.validateEmail.loading &&
            <div className="row mb-4">
              <div className="spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        </div>
      </StyledContainer>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps)(LandingPage);