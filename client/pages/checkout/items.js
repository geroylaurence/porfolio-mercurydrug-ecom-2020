import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StyledContainer from '../../components/layouts/styledContainer';
import MediaQueryFlex from '../../components/layouts/mediaQueryFlex';
import ItemsTable from '../cart/itemsTable';
import RxUploader from './rxUploader';
import { BsBtnPrimary } from '../../ui/bootstrap/bsButton';
import CbContainer from '../../ui/classBase/cbContainer';
import Container from '../../components/layouts/container';
import { CbH6 } from '../../ui/classBase/cbHeader';
import SmallText from '../../ui/smallText';
import { HighLightPrimary } from '../../ui/span';
import { H5Primary } from '../../ui/headers';
import { CheckoutMediaQuerySizing } from './styled';

import {
  SET_SERVICE_OPTION_PICKUP,
  SET_SERVICE_OPTION_DELIVERY,
  FINALIZE_CART,
  serviceOption,
} from '../../../redux/actions/checkout';
import { COMPUTE_GRANDTOTAL_DELIVERYFEE } from '../../../redux/actions/cart';
import MediaQueryContainer from '../../components/layouts/mediaQueryContainer';

function Items(props) {
  let rxChecker = props.cart.getItems.data !== null &&
                  props.cart.getItems.data.find(item => item.isRxFlag);
  
  return (
    <StyledContainer>
      <ItemsTable forCheckOut /><br />
      <StyledContainer marginTop="sm" flexDirection="row-reverse">
        <Link to="/shop">
          <BsBtnPrimary className="btn btn-lg mr-2">
            Continue Shopping
          </BsBtnPrimary>
        </Link>
        { props.cart.getItems.data !== null ?
          <Link to="/cart">
            <BsBtnPrimary className="btn btn-lg mr-2">
              Change Items
            </BsBtnPrimary>
          </Link>
          :
          <p>
            Cart is empty
          </p>
        }
      </StyledContainer><br /><br />
      <StyledContainer marginBottom="sm">
        <MediaQueryFlex applyChildsHzMargin>
          <CheckoutMediaQuerySizing width="400px">
            <div className="card">
              <CbContainer 
                applyBgPrimary
                className="card-header"
              >
                <CbH6 className="text-white" noMargin>Service Option</CbH6>
              </CbContainer>
              <div className="card-body">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="pickup"
                      name="services"
                      type="radio"
                      checked={props.checkout.serviceOption === serviceOption.pickUp}
                      value={serviceOption.pickUp}
                      onChange={e => {props.setServiceOptionPickup()}}
                    />
                    <label className="form-check-label" htmlFor="pickup">
                      <SmallText>
                        Pick-up  
                      </SmallText>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="delivery"
                      name="services"
                      type="radio"
                      checked={props.checkout.serviceOption === serviceOption.delivery}
                      value={serviceOption.delivery}
                      onChange={e => {
                          props.setServiceOptionDelivery();
                          props.setGrandTotalWithDeliveryFee();
                      }}
                    />
                    <label 
                      className="form-check-label" 
                      htmlFor="delivery"
                    >
                      <SmallText noMargin>
                        Delivery (with a delivery fee of P{props.cart.deliveryFeePresentable})
                      </SmallText>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </CheckoutMediaQuerySizing><br />
          { rxChecker && rxChecker.hasOwnProperty('id') &&
            <CheckoutMediaQuerySizing width="400px">
              <RxUploader />
            </CheckoutMediaQuerySizing>
          }
        </MediaQueryFlex>
      </StyledContainer>
      <StyledContainer marginBottom="sm">
        <H5Primary>
          Notes:
        </H5Primary>
        <SmallText>
          1. Doctor's prescription is required for prescription medicines.
        </SmallText>
        <SmallText>
          2. Senior Citizen and/or PWD discount will be computed at the time 
          of serving the order, subject to presentation of Suki Senior Card or 
          PWD card on claiming of order. All discounts will be credited to your 
          personal account and will be credited on your next purchase.
        </SmallText>
        <SmallText>
          3. For first-time Mercury Drug Online Suki Senior customers, please upload 
          your Suki Senior Card <HighLightPrimary>here</HighLightPrimary>. If you do 
          not have a Suki Senior Card, <HighLightPrimary>click to register&nbsp;</HighLightPrimary>
          or visit your nearest Mercury Drug store to apply.
        </SmallText>
        <SmallText>
          4. For first-time Mercury Drug Online PWD customers, please register at 
          your nearest Mercury Drug store.
        </SmallText>
      </StyledContainer>
      <StyledContainer flexDirection="row-reverse">
        <Link to="/checkout/receiver">
          <BsBtnPrimary 
            className="btn btn-md mr-2"
            disabled={props.checkout.rxUpload.required && !props.checkout.rxUpload.files.length > 0}
            onClick={e => {
              props.dispatch({ type: FINALIZE_CART });
            }}
          >
            &nbsp;&nbsp;Next&nbsp;&nbsp;
          </BsBtnPrimary>
        </Link>
        <Link to="/cart">
          <BsBtnPrimary className="btn btn-lg mr-2">
            &nbsp;&nbsp;Back To Cart&nbsp;&nbsp;
          </BsBtnPrimary>
        </Link>
      </StyledContainer>
    </StyledContainer>
  );
}

// redux
const mapStateToProps = state => ({
  cart: state.cart,
  checkout: state.checkout
});

const mapDispatchToProps = dispatch => ({
  setServiceOptionPickup: () => dispatch({ type: SET_SERVICE_OPTION_PICKUP }),
  setServiceOptionDelivery: () => dispatch({ type: SET_SERVICE_OPTION_DELIVERY }),
  setGrandTotalWithDeliveryFee: () => dispatch({ type: COMPUTE_GRANDTOTAL_DELIVERYFEE }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
