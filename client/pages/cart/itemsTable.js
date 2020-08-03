import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import StyledContainer from '../../components/layouts/styledContainer';
import { HrLight } from '../../ui/hr';
import { TextPrimary } from '../../ui/text';
import { BsBtnPrimary } from '../../ui/bootstrap/bsButton';
import SmallText from '../../ui/smallText';
import BsQuantityModifier from '../../ui/bootstrap/bsQuantityModifier';

// misc
import { updateItemQuantity, deleteItem } from '../../../model/cart';
import {
  CART_UPDATE_ITEM_QUANTITY_LOADING,
  CART_UPDATE_ITEM_QUANTITY_SUCCESS,
  CART_UPDATE_ITEM_QUANTITY_ERROR,

  CART_DELETE_ITEM_LOADING,
  CART_DELETE_ITEM_SUCCESS,
  CART_DELETE_ITEM_ERROR,

  GUEST_USER_UPDATE_CART_ITEM_FROM_LOCAL_STORAGE,
  GUEST_USER_DELETE_CART_ITEM_FROM_LOCAL_STORAGE,
  COMPUTE_SET_PAYMENT_SUMMARY,
} from '../../../redux/actions/cart';

import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TDDelete,
  ItemsTableMediaQuery,
} from './styled';

class ItemTable extends React.Component {
  constructor(props) {
    super(props);

    this.forCheckOut = props.forCheckOut ? true : false;
    this.renderTableRows = this.renderTableRows.bind(this);
    this.updateItemQuantity = this.updateItemQuantity.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.nodeItemQtyModifiers = {};
  }
  updateItemQuantity(cartId, quantity) {
    if (this.props.account.authenticated) {
      this.props.cartUpdateItemQuantityLoading();
      updateItemQuantity({
        cartId,
        quantity
      })
      .then(result => {
        this.props.cartUpdateItemQuantitySuccess(result.data);
        alert("Your Cart is updated!");
      })
      .catch(err => {
        this.props.cartUpdateItemQuantityError(err);
        alert("Cart updated failed, Please try again.");
      });
    } else {
      this.props.cartUpdateItemQuatityOnLocalStorage({
        cartId,
        quantity
      });
      this.props.setComputedPaymentSummary();
    }
  }
  deleteItem(cartId) {
    if (this.props.account.authenticated) {
      this.props.cartDeleteItemLoading();
      deleteItem(cartId)
      .then(result => {
        this.props.cartDeleteItemSuccess(result.data);
      })
      .catch(err => {
        this.props.cartDeleteItemError(err);
      });
    } else {
      this.props.cartDeleteItemQuatityOnLocalStorage(cartId);
      this.props.setComputedPaymentSummary();
    }
  }
  renderTableRows() {
    let itemsInCart = this.props.cart.guestCart;
    if (this.props.account.authenticated) {
      itemsInCart = this.props.cart.getItems.data;
    }
    return itemsInCart !== null && itemsInCart.map((item, i) => (
      <tr key={i}>
        <td>
          <img
            style={{
              height: '90px',
              weight: '90px',
            }}
            src={item.image}
          />
        </td>
        <td>{ item.name }</td>
        <td>
          <span className="mr-2">
            P
          </span>
          { item.unitPricePresentable }
        </td>
        <td>
          <StyledContainer pinCenter width="106px">
            { this.forCheckOut && 
              <SmallText noMargin large>
                { item.quantity }
              </SmallText>
            }
            { !this.forCheckOut &&
              <BsQuantityModifier ref={node => {
                if (node !== null && !this.props.cart.updateItemQuantity.loading) {
                  this.nodeItemQtyModifiers[`cart${item.id}`] = node;
                  node.setState({ qtyValue: item.quantity });
                }
              }} />
            }
          </StyledContainer>
        </td>
        {/*<td></td>*/}
        {/*<td>&nbsp;</td>*/}
        <td>
          <SmallText primary noMargin large>
            <span>
              PHP
            </span>
            <br />
            { item.totalPricePresentable || item.unitPricePresentable }
          </SmallText>
        </td>
        { !this.forCheckOut &&
          <td>
            { (this.props.cart.updateItemQuantity.loading || this.props.cart.deleteItem.loading) &&
              <div className="spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
            { !this.props.cart.updateItemQuantity.loading &&
              !this.props.cart.deleteItem.loading && 
              <React.Fragment>
                <BsBtnPrimary 
                  type="button"
                  className="btn"
                  onClick={e => {
                    const { state } = this.nodeItemQtyModifiers[`cart${item.id}`];
                    this.updateItemQuantity(item.id, state.qtyValue);
                  }}
                >
                  update
                </BsBtnPrimary>
                &nbsp;&nbsp;
                <BsBtnPrimary
                  type="button"
                  className="btn"
                  onClick={e => {
                    const confirmDelete = confirm("Remove Item from Cart?");
                    if (confirmDelete) {
                      this.deleteItem(item.id);
                    }
                  }}
                >
                  <i className="fa fa-trash"></i>
                </BsBtnPrimary>
              </React.Fragment>
            }
          </td>
        }
      </tr>
    ))
  }
  render() {
    return (
      <ItemsTableMediaQuery>
        <div className="d-flex mb-2">
          <h5 className="my-auto text-danger">
            <span className="my-auto mr-2 text-danger">
              <i className="fa fa-cart-plus" />
            </span>
            REVIEW ITEMS
          </h5>
        </div>
        <HrLight />
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <th id="image"></th>
                <th id="name">Product Name</th>
                <th id="unit-price">Unit Price</th>
                <th id="quantity">Quantity</th>
                {/*<th id="savings">Savings</th>*/}
                {/*<th id="e-suki">e-Suki Points</th>*/}
                <th id="total">Total</th>
                { !this.forCheckOut &&
                  <th id="updater"></th>
                }
              </tr>
            </TableHeader>
            <TableBody>
              { this.renderTableRows() }
            </TableBody>
          </Table>
        </TableContainer>
      </ItemsTableMediaQuery>
    )
  }
}

// REDUX
const mapStateToProps = state => ({
  account: state.account,
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  cartUpdateItemQuantityLoading: () => dispatch({ type: CART_UPDATE_ITEM_QUANTITY_LOADING }),
  cartUpdateItemQuantitySuccess: (data) => dispatch({ type: CART_UPDATE_ITEM_QUANTITY_SUCCESS, data }),
  cartUpdateItemQuantityError: (error) => dispatch({ type: CART_UPDATE_ITEM_QUANTITY_SUCCESS, error }),

  cartDeleteItemLoading: () => dispatch({ type: CART_DELETE_ITEM_LOADING }),
  cartDeleteItemSuccess: (data) => dispatch({ type: CART_DELETE_ITEM_SUCCESS, data }),
  cartDeleteItemError: (error) => dispatch({ type: CART_DELETE_ITEM_ERROR, error }),

  cartUpdateItemQuatityOnLocalStorage: data => dispatch({ type: GUEST_USER_UPDATE_CART_ITEM_FROM_LOCAL_STORAGE, data }),
  cartDeleteItemQuatityOnLocalStorage: data => dispatch({ type: GUEST_USER_DELETE_CART_ITEM_FROM_LOCAL_STORAGE, data }),
  setComputedPaymentSummary: () => dispatch({ type: COMPUTE_SET_PAYMENT_SUMMARY }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemTable); 
