import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import StyledContainer from '../../../components/layouts/styledContainer';
import { H3Grey } from '../../../ui/headers';
import { SpanFailed } from '../../../ui/span';

function Failed(props) {
  return (
    <StyledContainer marginTop="sm">
      <div className="container-fluid">
        <div className="row mt-5 mb-4">
          <H3Grey className="mx-auto">
            <SpanFailed>
              <i className="fa fa-times-circle-o" />
            </SpanFailed>
            &nbsp;
            { props.account.validateEmail.data &&
              !props.account.validateEmail.data.validationSuccess &&
              !props.account.validateEmail.data.isVerified &&
              props.account.validateEmail.data.invalidEmail &&
              <span>
                { `${props.intl.formatMessage({ id: 'VALIDATE_EMAIL_FAILED_INVALID_EMAIL_H3_MESSAGE' })}`
                  .replace('@', `${props.account.validateEmail.data.email}`)
                }
              </span>
            }
            { props.account.validateEmail.data && 
              !props.account.validateEmail.data.validationSuccess &&
              !props.account.validateEmail.data.isVerified &&
              !props.account.validateEmail.data.invalidEmail &&
              <FormattedMessage id="VALIDATE_EMAIL_FAILED_INVALID_CODE_H3_MESSAGE" />
            }
            { props.account.validateEmail.data === null &&
              <FormattedMessage id="ERROR_SYSTEM" />
            }
          </H3Grey>
        </div>
      </div>
    </StyledContainer>
  )
}

const mapStateToProps = state => ({
  account: state.account,
});

export default injectIntl(connect(mapStateToProps)(Failed));