import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import StyledContainer from '../../components/layouts/styledContainer';
import { H6Primary, H5Primary } from '../../ui/headers';
import SmallText from '../../ui/smallText';
import { HrLight } from '../../ui/hr';
import { BsBtnPrimary } from '../../ui/bootstrap/bsButton';

import provinces from '../../local_data/places/provinces.json';
import cities from '../../local_data/places/cities.json';

import {
  objectGetField,
  nameToAsc,
} from '../../utils/helper';

// misc
import { proceedPayment } from '../../../model/checkout';
import {
  createNew,
  list,
  validatorCreateNew,
} from '../../../model/address';
import {
  SET_CHECKOUT_ADDRESS_DATA,
  ADD_CHECKOUT_ADDRESS_LOADING,
  ADD_CHECKOUT_ADDRESS_SUCCESS,
  ADD_CHECKOUT_ADDRESS_ERROR,
  FINALIZE_ADDRESS,
  PROCEED_PAYMENT_LOADING,
  PROCEED_PAYMENT_SUCCESS,
  PROCEED_PAYMENT_ERROR,
  serviceOption,
} from '../../../redux/actions/checkout';
import {
  LIST_ADDRESS_LOADING,
  LIST_ADDRESS_SUCCESS,
  LIST_ADDRESS_ERROR,
} from '../../../redux/actions/address';

class Receiver extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      places: {
        province: { id: '', name: '' },
        city: { id: '', name: '' },
        barangay: '',
      },
      address: { 
        id: 'new-address',
      },
      formApprove: false,
    };

    this.nodeNameRecipient = null;
    this.nodeAddressLine1 = null;
    this.nodeContactNumber1 = null;
    this.nodeContactNumber2 = null;
    this.nodeProvince = null;
    this.nodeCity = null;
    this.nodeBarangay = null;
    this.nodeZipcode = null;

    this.radioSelectAddressHandler = this.radioSelectAddressHandler.bind(this);
    this.selectPlacesHandler = this.selectPlacesHandler.bind(this);

    this.initiateFormAddress = this.initiateFormAddress.bind(this);
    this.list = this.list.bind(this);
    this.setCheckoutAddress = this.setCheckoutAddress.bind(this);
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
  initiateFormAddress(bool) {
    this.nodeNameRecipient.value = '';
    this.nodeAddressLine1.value = '';
    this.nodeBarangay.value = '';
    this.nodeCity.value = '';
    this.nodeZipcode.value = '';
    this.nodeProvince.value = '';
    this.nodeContactNumber1.value = '';
    this.nodeContactNumber2.value = '';
  }
  setCheckoutAddress() {
    if (this.state.address.id !== 'new-address') {
      let selectedAddress = this.props.address.list.data.find(address => address.id === this.state.address.id);
      this.props.setAddressData({
        id: selectedAddress.id,
        name: selectedAddress.contactName,
        addressLine1: selectedAddress.addressLine1,
        barangay: selectedAddress.barangay,
        city: selectedAddress.city,
        province: selectedAddress.province,
        contactNumber1: selectedAddress.contactNumber,
        contactNumber2: '',
      });

      if (this.props.checkout.serviceOption === serviceOption.delivery) {
        this.proceedPayment();
      } else {
        this.props.dispatch({ type: FINALIZE_ADDRESS });
        this.setState({ formApprove: true });
      }
    } else {
      // new address
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
        this.createNew();
        this.props.setAddressData({
          id: this.state.address.id,
          name: this.nodeNameRecipient.value,
          addressLine1: this.nodeAddressLine1.value,
          city: this.nodeCity.value,
          barangay: this.nodeBarangay.value,
          province: this.state.places.province.name,
          contactNumber1: this.nodeContactNumber1.value,
          contactNumber2: this.nodeContactNumber2.value,
        });
      } else {
        alert("Please Complete your Address Information");
      }
    }
  }
  createNew() {
    this.props.dispatch({ type: ADD_CHECKOUT_ADDRESS_LOADING });
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
      this.props.dispatch({ type: ADD_CHECKOUT_ADDRESS_SUCCESS, data: result.data });
      
      if (this.props.checkout.serviceOption === serviceOption.delivery) {
        this.proceedPayment();
      } else {
        this.list();
        this.setState({ formApprove: true });
      }
    })
    .catch(err => {
      this.props.dispatch({ type: ADD_CHECKOUT_ADDRESS_ERROR, error: err });
    });
  }
  proceedPayment() {
    const inputData = {};
    inputData.deliveryType = this.props.checkout.serviceOption;
    inputData.addressId = (this.props.checkout.address !== null) ? this.props.checkout.address.id : this.state.address.id;
    inputData.rewardPointsRedemption = this.props.checkout.cartInitiateRedeemPoints.redeemRewardsWallet;

    this.props.dispatch({ type: PROCEED_PAYMENT_LOADING });
    proceedPayment(inputData)
    .then(result => this.props.dispatch({ type: PROCEED_PAYMENT_SUCCESS, data: result.data }))
    .catch(err => this.props.dispatch({ type: PROCEED_PAYMENT_ERROR, error: err }));
  }
  radioSelectAddressHandler(e) {
    const { name, id, value } = e.target;
    let selectedAddressState = {id: value};

    this.setState({
      address: selectedAddressState,
    }, () => { this.initiateFormAddress() });
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
    if (this.props.address.list.data === null) {
      this.list();
    }

    if (this.props.checkout.address !== null && this.props.checkout.address.hasOwnProperty('id')) {
      const {
        id,
        name,
        addressLine1,
        province,
        city,
        barangay,
        contactNumber1,
        contactNumber2,
      } = this.props.checkout.address;

      if (id !== 'new-address') {
        this.setState({ address: {id} });
      }
    }
  }
  render() {
    if (this.state.formApprove) {
      return <Redirect to="/checkout/branch-pickup" />
    }

    return (
      <StyledContainer>
        <StyledContainer flexDirection="row">
          <H5Primary>
            <span className="my-auto mr-2 text-danger">
              <i className="fa fa-cart-plus" />
            </span>
            RECIPIENT INFORMATION
          </H5Primary>
        </StyledContainer>
        <HrLight />
        <StyledContainer>
          <H6Primary>
            Please process this order for
          </H6Primary>
        </StyledContainer>
        <StyledContainer height="500px" overflowYScroll>
          { this.props.address.list.loading &&
            <div className="spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          { !this.props.address.list.loading && 
            this.props.address.list.data !== null && 
            this.props.address.list.data.map((address, i) => (
              <StyledContainer key={i} marginBottom="sm">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`radio-select-address${i}`}
                    value={`${address.id}`}
                    checked={this.state.address.id === `${address.id}`}
                    onChange={this.radioSelectAddressHandler}
                  />
                  <label className="form-check-label" htmlFor={`radio-select-address${i}`}>
                    <span className="d-block">{address.contactName}</span>
                    <span className="d-block">{address.addressLine1}</span>
                    <span className="d-block">{address.addressLine2}</span>
                    <span className="d-block">{address.barangay}</span>
                    <span className="d-block">{address.city}</span>
                    <span className="d-block">{address.province}</span>
                  </label>
                </div>
              </StyledContainer>
            ))
          }
        </StyledContainer><hr />
        <StyledContainer>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="radio-new-address"
              value="new-address"
              checked={this.state.address.id === 'new-address'}
              onChange={this.radioSelectAddressHandler}
            />
            <label className="form-check-label" htmlFor="radio-new-address">
              <SmallText primary large bold letterSpacing="0px">
                New Recipient
              </SmallText>
            </label>
          </div>
        </StyledContainer>
        <StyledContainer paddingLeft="sm" itemsCenter>
          <StyledContainer width="100%" marginBottom="sm">
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
              readOnly={!(this.state.address.id === 'new-address')}
            />
          </StyledContainer>
          <StyledContainer width="100%" marginBottom="sm">
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
              readOnly={!(this.state.address.id === 'new-address')}
            />
          </StyledContainer>
          <StyledContainer width="100%" marginBottom="sm">
            <label htmlFor="barangay">
              <span className="text-danger">*</span>
              Barangay
            </label>
            <input
              type="text"
              className="form-control"
              id="barangay"
              ref={node => this.nodeBarangay = node}
              readOnly={!(this.state.address.id === 'new-address')}
            />
          </StyledContainer>
          <StyledContainer 
            width="100%" 
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
                readOnly={!(this.state.address.id === 'new-address')}
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
                readOnly={!(this.state.address.id === 'new-address')}
              />
            </StyledContainer>
          </StyledContainer>
          <StyledContainer width="100%" marginBottom="sm">
            <label htmlFor="province">
              <span className="text-danger">*</span>
              Province
            </label>
            <select 
              id="province" 
              name="province"
              className="form-control"
              onChange={this.selectPlacesHandler}
              disabled={!(this.state.address.id === 'new-address')}
              ref={node => this.nodeProvince = node}
            >
              <option selected value="">Select Province</option>
              { provinces.sort(nameToAsc).map(province => (
                  <option key={province.id} value={JSON.stringify(province)}>{province.name}</option>
                ))
              }
            </select>
          </StyledContainer>
          <StyledContainer width="100%" marginBottom="sm">
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
                readOnly={!(this.state.address.id === 'new-address')}
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
                readOnly={!(this.state.address.id === 'new-address')}
              />
            </div>
          </StyledContainer>
        </StyledContainer>
        <StyledContainer flexDirection="row-reverse">
          { this.props.checkout.newAddress.loading &&
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          { this.props.checkout.proceedPayment.loading &&
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          { !this.props.checkout.newAddress.loading &&
            !this.props.checkout.proceedPayment.loading &&
            <React.Fragment>
              { this.props.checkout.serviceOption === serviceOption.pickUp &&
                <BsBtnPrimary 
                  className="btn btn-md"
                  onClick={e => {
                    if (
                      !this.props.checkout.newAddress.loading &&
                      !this.props.checkout.cartInitiateRedeemPoints.loading && 
                      !this.props.checkout.proceedPayment.loading
                    ) {
                      this.setCheckoutAddress();
                    }
                  }}
                >
                  Next
                </BsBtnPrimary>
              }
              { this.props.checkout.serviceOption === serviceOption.delivery &&
                <BsBtnPrimary 
                  className="btn btn-lg"
                  onClick={e => {
                    if (
                      !this.props.checkout.newAddress.loading &&
                      !this.props.checkout.cartInitiateRedeemPoints.loading && 
                      !this.props.checkout.proceedPayment.loading
                    ) {
                      this.setCheckoutAddress();
                    }
                  }}
                  disabled={this.props.checkout.proceedPayment.loading}
                >
                  Proceed Payment
                </BsBtnPrimary>
              }
              <NavLink className="mr-2" to="/checkout">
                <BsBtnPrimary className="btn btn-md">
                  Previous
                </BsBtnPrimary>
              </NavLink>
            </React.Fragment>
          }
        </StyledContainer>
      </StyledContainer>
    );
  }
}

// REDUX
const mapStateToProps = state => ({
  account: state.account,
  checkout: state.checkout,
  address: state.address,
}); 

const mapDispatchToProps = dispatch => ({
  setAddressData: (data) => dispatch({ type: SET_CHECKOUT_ADDRESS_DATA, data }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Receiver);