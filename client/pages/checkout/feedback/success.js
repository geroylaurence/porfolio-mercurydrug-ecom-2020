import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import Container from '../../../components/layouts/container';
import { TextGreen } from '../../../ui/text';
import { H3Grey } from '../../../ui/headers';

import OrderSummary from '../../cart/orderSummary';

import { updateStatus } from '../../../../model/checkout';
import { checkoutFeedBackStatus } from '../../../../redux/actions/checkout';

class SuccessLandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.updateStatus = this.updateStatus.bind(this);
  }
  updateStatus() {
    const { params } = this.props.match;
    updateStatus({
      status: checkoutFeedBackStatus.success,
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
            <TextGreen>
              <i className="fa fa-check-circle-o fa-4x" />
            </TextGreen>
            <Container color="grey">
              <H3Grey><FormattedMessage id="CHECKOUT_FEEDBACK_SUCCESS_MESSAGE_SUBHEADER" /></H3Grey>
              <FormattedHTMLMessage id="CHECKOUT_FEEDBACK_SUCCESS_MESSAGE_PARA1" />
            </Container>
          </Container>
        </Container>
        {/* FOR REVIEW
          <Container flexDirection="row">
            <Container>
              Name
            </Container>
            <Container width="400px">
              <OrderSummary />
            </Container>
          </Container>
        */}
      </Container>
    );
  }
}

export default injectIntl(SuccessLandingPage);