import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import StyledContainer from '../../../components/layouts/styledContainer';
import { H3Grey } from '../../../ui/headers';
import CbButton from '../../../ui/classBase/cbButton';

class Success extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.account.validateEmail.data === null) {
      return <Redirect to="/" />
    }

    return (
      <StyledContainer marginTop="sm">
        <div className="container-fluid">
          <div className="row mt-5 mb-4">
            { this.props.account.validateEmail.data.validationSuccess &&
              this.props.account.validateEmail.data.isVerified &&
              <H3Grey className="mx-auto">
                <FormattedMessage id="VALIDATE_EMAIL_SUCCESS_ISVERIFIED_H3_MESSAGE" />
              </H3Grey>
            }
            { !this.props.account.validateEmail.data.validationSuccess &&
              this.props.account.validateEmail.data.isVerified &&
              <H3Grey className="mx-auto">
                <FormattedMessage id="VALIDATE_EMAIL_SUCCESS_ISALREADY_H3_MESSAGE" />
              </H3Grey>
            }
          </div>
          <div className="row mb-4 justify-content-md-center">
            { this.props.account.authenticated &&
              <Link to="/">
                <CbButton className="btn" width="170px">
                  Continue with Order Online
                </CbButton>
              </Link>
            }
            { !this.props.account.authenticated &&
              <Link to="/">
                <CbButton className="btn" width="170px">
                  Back to Main Page
                </CbButton>
              </Link>
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
});

export default connect(mapStateToProps)(Success);