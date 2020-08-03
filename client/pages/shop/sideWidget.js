import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// misc
import {
  productSearchAll,
} from '../../../model/products';
import {
  generalInquiry,
} from '../../../model/message';
import {
  SEND_GENERAL_INQUIRY_LOADING,
  SEND_GENERAL_INQUIRY_SUCCESS,
  SEND_GENERAL_INQUIRY_ERROR,
} from '../../../redux/actions/message';

const ColSpan4 = styled.div`
  clear: both;

  *{
    box-sizing: border-box;
  }

  .search-btn {
    background-color: #ec1d23;
    border-color: #ec1d23;
    border-radius: 0 30px 30px 0;
    padding: 4px 7px;
    position: absolute;
  }

  .concern-text {
    color: #a2a2a2;
    font-size: 1rem;
    padding: 10px;
    text-align: center;
  }

  .submit-btn {
    background-color: #ec1d23;
    border-color: #ec1d23;
    border-radius: 5px;
    margin: 0 auto;
    width: 100%;
  }

  .textarea-input {
    resize: none;
  }

  .box-textarea {
    background: #ec1d23;
    color: #fff;
    height: 290px;
    margin-top: 20px;
    padding: 10px 20px;
  }

  .order-btn {
    margin: 0 auto;
    width: 100%;
  }
`;

const SearchBox = styled.input`
    border-radius: 30px 0px 0px 30px;
    outline: none;
    padding: 3px 5px 3px;
    width: 90%;
`;

class SideWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      generalMessage: '',
    };

    this.sendGeneralInquiry = this.sendGeneralInquiry.bind(this);
  }
  sendGeneralInquiry() {
    this.props.dispatch({ type: SEND_GENERAL_INQUIRY_LOADING });
    generalInquiry(this.state.generalMessage)
    .then(result => {
      this.props.dispatch({ type: SEND_GENERAL_INQUIRY_SUCCESS, data: result.data });
      alert('General inquiry sent!');
    })
    .catch(err => {
      this.props.dispatch({ type: SEND_GENERAL_INQUIRY_ERROR, error: err });
      alert('General inquiry failed to send, Please try again.');
    });
  }
  render(){
    return (
      <ColSpan4>
        <form method="GET">
          <div className="col-md-12">
            <div className="cards">
              <SearchBox 
                onChange={e => {
                  const {value} = e.target;
                  this.setState({
                    searchTerm: `${value}`
                  });
                }}
                placeholder="Search..."
              />
              <span>
                <button 
                  type="button" 
                  className="btn btn-primary search-btn"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>   
              <p className="concern-text">
                Cannot find the product you need? Tell us and we will assist you to look for it.
              </p>
              <div className="form-group input-group"> 
                <textarea 
                  className="form-control textarea-input" 
                  rows="8" 
                  cols="12" 
                  placeholder="Message"
                  onChange={e => {
                    const {value} = e.target;
                    this.setState({
                      generalMessage: `${value}`
                    });
                  }}
                />
              </div>
              <button 
                type="button" 
                className="btn btn-primary submit-btn"
                disabled={this.props.message.generalInquiry.loading}
              >
                Submit
              </button>
              <div className="form-group input-group box-textarea">
                NOTE: <br />
                A valid doctor's prescription
                must be presented for orders
                of prescription medicines.
                You can upload a copy of your
                prescription on checkout.
                In case your prescription does
                not match your order, you
                will be notified by text or
                email before you order will
                be served.
              </div>
              <button 
                className="order-btn" 
                disabled
              >
                My Order History
              </button>
            </div>
          </div>
        </form>
      </ColSpan4>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  message: state.message,
});

export default connect(mapStateToProps)(SideWidget);