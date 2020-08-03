import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import Container from '../../../components/layouts/container';
import { TextFailed } from '../../../ui/text';
import { H3Grey } from '../../../ui/headers';

import { updateStatus } from '../../../../model/checkout';
import { checkoutFeedBackStatus } from '../../../../redux/actions/checkout';

class FailedLandingPage extends React.Component {
  constructor(props) {
    super(props);

    /* props */
    // default -> boolean -> no applied event handler on rendered
    this.updateStatus = this.updateStatus.bind(this);
  }
  updateStatus() {
    const { params } = this.props.match;
    updateStatus({
      status: checkoutFeedBackStatus.failed,
      orderId: params.orderId,
      referenceKey: params.referenceKey,
    });
  }
  componentDidMount() {
    if (!this.props.default) {
      this.updateStatus();
    }
  }
  render() {
    return (
      <Container>
        <Container align="center">
          <Container width="750px">
            <TextFailed>
              <i className="fa fa-times-circle-o fa-4x" />
            </TextFailed>
            <Container color="grey">
              <H3Grey><FormattedMessage id="CHECKOUT_FEEDBACK_FAILED_MESSAGE_SUBHEADER" /></H3Grey>
              <FormattedHTMLMessage id="CHECKOUT_FEEDBACK_FAILED_MESSAGE_PARA1" />
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default FailedLandingPage;