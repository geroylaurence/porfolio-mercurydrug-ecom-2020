import React from 'react';
import { connect } from 'react-redux';

import CbButton from '../../ui/classBase/cbButton';

// misc
import {
  productInquiry
} from '../../../model/products';
import {
  SEND_PRODUCT_INQUIRY_LOADING,
  SEND_PRODUCT_INQUIRY_SUCCESS,
  SEND_PRODUCT_INQUIRY_ERROR,
} from '../../../redux/actions/message';

class Inquiry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inquiryText: ''
    };

    this.sendProductInquiry = this.sendProductInquiry.bind(this);
  }
  sendProductInquiry() {
    this.props.dispatch({ type: SEND_PRODUCT_INQUIRY_LOADING });
    productInquiry({
      searchTerm: this.props.products.search.searchTerm,
      message: this.state.inquiryText,
    })
    .then(result => {
      this.props.dispatch({ type: SEND_PRODUCT_INQUIRY_SUCCESS, data: result.data });
      alert('Product inquiry sent!');
    })
    .catch(err => {
      this.props.dispatch({ type: SEND_PRODUCT_INQUIRY_ERROR, error: err });
      alert('Product inquiry failed to send, Please try again.');
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12 mt-2">
          <textarea 
            className="form-control" 
            rows="6"
            onChange={e => {
              const { value } = e.target;
              this.setState({ inquiryText: value });
            }}
          ></textarea>
          <br />
          <CbButton 
            className="btn"
            disabled={this.props.message.productInquiry.loading}
            type="button"
            pinTo="right"
            onClick={e => {
              if (this.state.inquiryText !== '') {
                this.sendProductInquiry();
              }
            }}
          >&nbsp;&nbsp;Submit&nbsp;&nbsp;
          </CbButton>
        </div>
      </div>
    );
  }
}

// redux
const mapStateToProps = state => ({
  products: state.products,
  message: state.message,
});

export default connect(mapStateToProps)(Inquiry);