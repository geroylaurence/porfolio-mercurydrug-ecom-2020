import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StyledContainer from '../../components/layouts/styledContainer';
import CbButton from '../../ui/classBase/cbButton';

// misc
import { list } from '../../../model/address';
import {
  LIST_ADDRESS_LOADING,
  LIST_ADDRESS_SUCCESS,
  LIST_ADDRESS_ERROR,
  SET_VIEW_ADDRESS,
} from '../../../redux/actions/address';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.list = this.list.bind(this);
  }
  list() {
    this.props.dispatch({ type: LIST_ADDRESS_LOADING });
    list()
    .then(result => {
      this.props.dispatch({ type: LIST_ADDRESS_SUCCESS, data: result.data });
    })
    .catch(err => {
      this.props.dispatch({ type: LIST_ADDRESS_ERROR, error: err });
    });
  }
  componentDidMount() {
    this.list();
  }
  render() {
    return (
      <StyledContainer marginLeft="sm" marginBottom="lg">
        <StyledContainer>
          <h4>
            ADDRESS BOOK
          </h4>
        </StyledContainer>
        <StyledContainer>
          <p>
            Set default Address for order checkout.  
          </p>
        </StyledContainer>
        <StyledContainer width="500px">
          <StyledContainer  
            height="500px" 
            overflowYScroll
            marginBottom="md"
          >
            <ul className="list-group">
              { this.props.address.list.data !== null && this.props.address.list.data.map((address, i) => (
                  <li key={i} className="list-group-item">
                    <StyledContainer>
                      <label>
                        <span className="d-block">{address.contactName}</span>
                        <span className="d-block">{address.addressLine1}</span>
                        <span className="d-block">{address.addressLine2}</span>
                        <span className="d-block">{address.barangay}</span>
                        <span className="d-block">{address.city}</span>
                        <span className="d-block">{address.province}</span>
                      </label>
                    </StyledContainer>
                    <StyledContainer flexDirection="row-reverse">
                      <Link to={`${this.props.match.path}/${address.id}/edit`}>
                        <CbButton 
                          type="button" 
                          className="btn btn-md"
                          onClick={e => { this.props.dispatch({ type: SET_VIEW_ADDRESS, data: address.id }) }}
                        >
                          &nbsp;&nbsp;Edit&nbsp;&nbsp;
                        </CbButton>
                      </Link>
                    </StyledContainer>
                  </li>
                ))
              }
            </ul>
          </StyledContainer>
          <StyledContainer itemsCenter>
            <Link to={`${this.props.match.path}/add`}>
              <CbButton type="button" className="btn btn-md">
                &nbsp;&nbsp;New Address&nbsp;&nbsp;
              </CbButton>
            </Link>
          </StyledContainer>
        </StyledContainer>
      </StyledContainer>
    );
  }
}

// redux
const mapStateToProps = state => ({
  address: state.address,
});

export default connect(mapStateToProps)(List);