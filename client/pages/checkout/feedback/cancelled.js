import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import Container from '../../../components/layouts/container';
import { TextFailed } from '../../../ui/text';
import { H3Grey } from '../../../ui/headers';

import { updateStatus } from '../../../../model/checkout';
import { checkoutFeedBackStatus } from '../../../../redux/actions/checkout';

class CancelledLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.updateStatus = this.updateStatus.bind(this);
  }
  updateStatus() {
    const { params } = this.props.match;
    updateStatus({
      status: checkoutFeedBackStatus.cancelled,
      orderId: params.orderId,
      referenceKey: params.referenceKey,
    });
  }
  componentDidMount() {
    this.updateStatus();
  }
  render() {
    return (
      <Container>
        <Container align="center">
          <Container width="750px">
            <TextFailed>
              <i className="fa fa-ban fa-4x" />
            </TextFailed>
            <Container color="grey">
              <H3Grey><FormattedMessage id="CHECKOUT_FEEDBACK_CANCELLED_MESSAGE_SUBHEADER" /></H3Grey>
              <FormattedHTMLMessage id="CHECKOUT_FEEDBACK_CANCELLED_MESSAGE_PARA1" />
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default CancelledLandingPage;