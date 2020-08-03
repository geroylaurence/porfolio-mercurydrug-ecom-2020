import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import StyledContainer from '../../components/layouts/styledContainer';
import CbButton from '../../ui/classBase/cbButton';

import provinces from '../../local_data/places/provinces.json';
import cities from '../../local_data/places/cities.json';

import { nameToAsc } from '../../utils/helper';

// misc
import {
  createNew,
  list,
  validatorCreateNew,
} from '../../../model/address';
import {
  ADD_ADDRESS_LOADING,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
} from '../../../redux/actions/address';

class CreateForm extends React.Component {
	constructor(props) {
    super(props);
    const { id } = props.match.params;
    const addMode = typeof id === 'undefined';

    this.state = {
      places: {
        province: { id: '', name: '' },
        city: { id: '', name: '' },
        barangay: '',
      },
      formApprove: false,
      addMode,
    };

    this.nodeNameRecipient = null;
    this.nodeAddressLine1 = null;
    this.nodeBarangay = null;
    this.nodeCity = null;
    this.nodeZipcode = null;
    this.nodeProvince = null;
    this.nodeContactNumber1 = null;
    this.nodeContactNumber2 = null;

    this.createNew = this.createNew.bind(this);
    this.selectPlacesHandler = this.selectPlacesHandler.bind(this);
  }
  createNew() {
    this.props.dispatch({ type: ADD_ADDRESS_LOADING });

    let validateForm = validatorCreateNew({
      contactName: this.nodeNameRecipient.value,
      addressLine1: this.nodeAddressLine1.value,
      barangay: this.nodeBarangay.value,
      city: this.nodeCity.value,
      zipCode: this.nodeZipcode.value,
      province: this.state.places.province.name,
      contactNumber: this.nodeContactNumber1.value,
      secondaryContact: this.nodeContactNumber2.value,
    });

    if (validateForm.length === 0) {
      createNew({
        contactName: this.nodeNameRecipient.value,
        addressLine1: this.nodeAddressLine1.value,
        barangay: this.nodeBarangay.value,
        city: this.nodeCity.value,
        zipCode: this.nodeZipcode.value,
        province: this.state.places.province.name,
        contactNumber: this.nodeContactNumber1.value,
        secondaryContact: this.nodeContactNumber2.value,
      })    
      .then(result => {
        this.props.dispatch({ type: ADD_ADDRESS_SUCCESS, data: result.data });
        this.setState({ formApprove: true });
      })
      .catch(err => {
        this.props.dispatch({ type: ADD_ADDRESS_ERROR, error: err });
      });
    } else {
      alert("Please Complete your Address Information");
      this.props.dispatch({ type: ADD_ADDRESS_ERROR, error: 'Please Complete your Address Information' });
    }
  }
  selectPlacesHandler(e) {
    const { name, id, value } = e.target;
    let placesState = {};

    if (id==='province') {
      let jsonProvince = JSON.parse(value);
      placesState = {
        ...placesState,
        places: {
          ...this.state.places,
          province: { id: jsonProvince.id, name: jsonProvince.name },
        }
      };
    }
    if (id==='city') {
      let jsonCity = JSON.parse(value);
      placesState = {
        ...placesState,
        places: {
          ...this.state.places,
          city: { id: jsonCity.id, name: jsonCity.name },
        }
      };
    }

    this.setState({
      ...this.state,
      ...placesState,
    });
  }
  componentDidMount() {
    if (!this.state.addMode) {
      this.nodeNameRecipient.value = this.props.address.setView.contactName;
      this.nodeAddressLine1.value = this.props.address.setView.addressLine1;
      this.nodeBarangay.value = this.props.address.setView.barangay;
      this.nodeCity.value = this.props.address.setView.city;
      this.nodeZipcode.value = this.props.address.setView.zipCode;
      this.nodeContactNumber1.value = this.props.address.setView.contactNumber;
      this.nodeContactNumber2.value = this.props.address.setView.secondaryContact;
    }
  }
  render() {
    if (this.state.formApprove || (!this.state.addMode && this.props.address.setView === null)) {
      return <Redirect to="/my-account/address-book" />
    }

    return (
      <StyledContainer marginLeft="sm">
        <StyledContainer>
          <h4>
            ADDRESS BOOK
          </h4>
        </StyledContainer>
        <StyledContainer>
          <StyledContainer width="450px" marginBottom="sm">
            <label htmlFor="recipientName">
              <span className="text-danger">*</span>
              Name of Recipient
            </label>
            <input
              type="text"
              className="form-control"
              id="recipientName"
              name="recipientName"
              ref={node=> this.nodeNameRecipient = node}
            />
          </StyledContainer>
          <StyledContainer width="450px" marginBottom="sm">
            <label htmlFor="addressLine1">
              <span className="text-danger">*</span>
              Number / Street or Unit Number / Building
            </label>
            <input
              type="text"
              className="form-control"
              id="addressLine1"
              name="addressLine1"
              ref={node=> this.nodeAddressLine1 = node}
            />
          </StyledContainer>
          <StyledContainer width="450px" marginBottom="sm">
            <label htmlFor="barangay">
              <span className="text-danger">*</span>
              Barangay
            </label>
            <input
              type="text"
              className="form-control"
              id="barangay"
              ref={node => this.nodeBarangay = node}
            />
          </StyledContainer>
          <StyledContainer 
            width="450px" 
            marginBottom="sm"
            flexDirection="row"
          >
            <StyledContainer width="50%">
              <label htmlFor="city">
                <span className="text-danger">*</span>
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                ref={node => this.nodeCity = node}
              />
            </StyledContainer>
            &nbsp;&nbsp;
            <StyledContainer width="50%">
              <label htmlFor="zipcode">
                <span className="text-danger">*</span>
                Zipcode
              </label>
              <input
                type="text"
                className="form-control"
                id="zipcode"
                ref={node => this.nodeZipcode = node}
              />
            </StyledContainer>
          </StyledContainer>
          <StyledContainer width="450px" marginBottom="sm">
            <label htmlFor="province">
              <span className="text-danger">*</span>
              Province
            </label>
            <select 
              id="province" 
              name="province"
              className="form-control"
              onChange={this.selectPlacesHandler}
              ref={node => this.nodeProvince = node}
            >
              <option selected value="">Select Province</option>
              { provinces.sort(nameToAsc).map(province => (
                  <option key={province.id} value={JSON.stringify(province)}>{province.name}</option>
                ))
              }
            </select>
          </StyledContainer>
          <StyledContainer width="450px" marginBottom="sm">
            <label htmlFor="contactNumber">
              <span className="text-danger">*</span>
              Contact Numbers
            </label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">+63</span>
              </div>
              <input 
                type="text" 
                className="form-control" 
                ref={node => this.nodeContactNumber1 = node}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">+63</span>
              </div>
              <input 
                type="text" 
                className="form-control"
                ref={node => this.nodeContactNumber2 = node}
              />
            </div>
          </StyledContainer>
          <StyledContainer 
            flexDirection="row-reverse"
            marginBottom="sm"
            width="450px" 
          >
            { this.props.address.add.loading &&
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
            { !this.props.address.add.loading && this.state.addMode &&
              <CbButton 
                className="btn btn-md"
                onClick={e => {
                  this.createNew();
                }}
              >
                Save
              </CbButton>
            }
            { !this.props.address.delete.loading && !this.state.addMode &&
              <CbButton 
                className="btn btn-md"
              >
                Delete
              </CbButton>
            }
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

export default connect(mapStateToProps)(CreateForm);
