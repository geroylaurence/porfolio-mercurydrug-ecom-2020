import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import medDefault from '../../../../assets/med-default.png';
import prescriptionDefault from '../../../../assets/prescription-default.png';

import { ItemsContentMediaQuery } from './styled';
import MediaQueryFlex from '../../../components/layouts/mediaQueryFlex';
import StyledContainer from '../../../components/layouts/styledContainer';

import NotifAddedToCart from './notifAddedToCart';
import BsQuantityModifier from '../../../ui/bootstrap/bsQuantityModifier';
import CbContainer from '../../../ui/classBase/cbContainer';
import CbButton from '../../../ui/classBase/cbButton';
import { H4Primary, H4Grey, H3Grey } from '../../../ui/headers';
import SmallText from '../../../ui/smallText';

import LABEL_TEMPLATE from '../../../assets/labelTemplate';

// misc
import { addItem, countItems } from '../../../../model/cart';
import { 
  ADD_ITEM_CART_LOADING,
  ADD_ITEM_CART_SUCCESS,
  ADD_ITEM_CART_ERROR,
  CART_ITEMS_COUNT_LOADING,
  CART_ITEMS_COUNT_SUCCESS,
  CART_ITEMS_COUNT_ERROR,
  GUEST_USER_SET_CART_ITEM,
  COMPUTE_SET_PAYMENT_SUMMARY,
} from '../../../../redux/actions/cart';

class SKU extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: {
        loading: false,
        data: null,
        error: null,
      },
      cart: {
        added: false,
        quantity: 0,
      },
      showDrugInfo: false,
    }

    this.refSelectQuantity = React.createRef();
    this.addToCart =  this.addToCart.bind(this);
  }
  addToCart() {    
    if (this.props.account.authenticated) {
      this.props.addItemToCartLoading();
      addItem({
        productId: this.props.sku.getData.data.id,
        quantity: parseInt(this.refSelectQuantity.current.state.qtyValue) || 1,
      })
      .then(result => {
        this.props.addItemToCartSuccess({
          addedToCart: {
            id: this.props.sku.getData.data.id,
            name: this.props.sku.getData.data.name,
            image: this.props.sku.getData.data.image,
            quantity: parseInt(this.refSelectQuantity.current.state.qtyValue) || 1,
            price: this.props.sku.getData.data.price,
            pricePresentable: this.props.sku.getData.data.pricePresentable,
          },
          feedBack: result.data,
        });

        $('#notifCartModal').modal();
      })
      .catch(err => {
        this.props.addItemToCartError(err);
      });
    } else {
      this.props.guestAddItem({
        id: this.props.sku.getData.data.id,
        name: this.props.sku.getData.data.name,
        image: this.props.sku.getData.data.image,
        quantity: parseInt(this.refSelectQuantity.current.state.qtyValue) || 1,
        price: this.props.sku.getData.data.price,
        pricePresentable: this.props.sku.getData.data.pricePresentable,
      });
      this.props.setComputedPaymentSummary();
      $('#notifCartModal').modal();
    }

  }
  render() {
    if (this.props.products.loading || this.props.sku.getData.data === null) {
      return (
        <Redirect to="/shop" />
      )
    }

    return (
      <ItemsContentMediaQuery>
        <StyledContainer 
          marginLeft="md"
          marginRight="md"
          marginBottom="md"
        >
          <div className="card mb-2 border-0">
            <MediaQueryFlex childDivsFullWidth>
              <StyledContainer width="50%">
                <img src={this.props.sku.getData.data.image} className="card-img" alt="..." />
                { this.props.sku.getData.data.generics !== null && this.props.sku.getData.data.isRxFlag &&
                  <SmallText noMargin align="center">
                    { LABEL_TEMPLATE.SKU_RX_REMARKS }
                  </SmallText>
                }
              </StyledContainer>
              <StyledContainer width="50%">
                <div className="card-body">
                  { this.props.sku.getData.data.generics !== null && this.props.sku.getData.data.isRxFlag &&
                    <H4Grey
                      paddingHorizontal="sm"
                      withDefaultBorder
                      widthFitContent
                    >
                      { this.props.sku.getData.data.generics.genericName }
                    </H4Grey>
                  }
                  <H3Grey>
                    {this.props.sku.getData.data.name}
                  </H3Grey>
                  <H4Primary>
                    <span className="mr-3">P</span>
                    {this.props.sku.getData.data.pricePresentable}
                  </H4Primary>
                  <H4Grey>
                    { this.props.sku.getData.data.available &&
                      `Available`
                    }
                  </H4Grey>
                </div>
                <div className="card-body">
                  <MediaQueryFlex>
                    <StyledContainer width="200px">
                      <BsQuantityModifier 
                        ref={this.refSelectQuantity} 
                        withLabel="Quantity"
                      />
                    </StyledContainer>
                    &nbsp;&nbsp;
                    <StyledContainer width="200px">
                      <button 
                        className="btn btn-light mr-2"
                        disabled={this.props.cart.addItem.loading}
                        onClick={e => {
                          this.addToCart();
                        }}
                      >
                        ADD TO CART
                      </button>
                    </StyledContainer>
                  </MediaQueryFlex>
                </div>
              </StyledContainer>
            </MediaQueryFlex>
          </div>
        </StyledContainer>
        { this.props.sku.getData.data.generics !== null &&
          this.props.sku.getData.data.generics.pdfFile !== null &&
          <React.Fragment>
            <StyledContainer marginBottom="md">
              <CbButton
                className="btn mx-auto"
                type="button"
                onClick={e=> { this.setState({ showDrugInfo: !this.state.showDrugInfo }) }}
              >
                Drug Info&nbsp;
                <span>
                  { !this.state.showDrugInfo ?
                    <i className="fa fa-angle-double-down" />
                    :
                    <i className="fa fa-angle-double-up" />
                  }
                </span>
              </CbButton>
            </StyledContainer>
            { this.state.showDrugInfo &&
              <StyledContainer 
                marginLeft="md"
                marginRight="md"
                marginBottom="md"
              >
                <embed src={`${this.props.sku.getData.data.generics.pdfFile}#toolbar=0`} width="100%" height="700px" />
              </StyledContainer>
            }
          </React.Fragment>
        }
        {/*{ this.props.sku.getData.data.generics !== null &&*/}
        {/*  this.props.sku.getData.data.generics.pdfFile === null &&*/}
        {/*  <StyledContainer marginBottom="md">*/}
        {/*    <CbButton className="btn mx-auto" type="button">*/}
        {/*      No Drug Info*/}
        {/*    </CbButton>*/}
        {/*  </StyledContainer>*/}
        {/*}*/}
        <NotifAddedToCart />
      </ItemsContentMediaQuery>
    )
  }
}

// REDUX
const mapStateToProps = state => ({
  sku: state.sku,
  cart: state.cart,
  products: state.products,
  account: state.account,
});

const mapDispatchToProps = dispatch => ({
  addItemToCartLoading: () => dispatch({ type: ADD_ITEM_CART_LOADING, }), 
  addItemToCartSuccess: data => dispatch({ type: ADD_ITEM_CART_SUCCESS, data }), 
  addItemToCartError: error => dispatch({ type: ADD_ITEM_CART_ERROR, error }),
  guestAddItem: data => dispatch({ type: GUEST_USER_SET_CART_ITEM, data }),
  setComputedPaymentSummary: () => dispatch({ type: COMPUTE_SET_PAYMENT_SUMMARY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SKU);
