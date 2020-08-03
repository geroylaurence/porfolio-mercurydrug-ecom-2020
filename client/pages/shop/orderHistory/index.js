import React from 'react';
import { connect } from 'react-redux';

import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
} from '../../../ui/secondaryTable';
import { StickerPlain } from '../../../ui/text';
import { ButtonPlainWhite } from '../../../ui/button';
import { HrLight } from '../../../ui/hr';
import { SpinnerDefault } from '../../../ui/bootstrap/spinner';
import SubHeader from '../../../ui/subheader';
import { findFromArray } from '../../../utils/helper';

// misc
import { productListByPurchased } from '../../../../model/products';
import { addItem } from '../../../../model/cart';
import {
  ORDER_HISTORY_LIST_LOADING,
  ORDER_HISTORY_LIST_SUCCESS,
  ORDER_HISTORY_LIST_ERROR,
} from '../../../../redux/actions/order';
// misc
import { 
  ADD_ITEM_CART_LOADING,
  ADD_ITEM_CART_SUCCESS,
  ADD_ITEM_CART_ERROR,
} from '../../../../redux/actions/cart';

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCart: null,
    };

    this.productListByPurchased = this.productListByPurchased.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.btnAddToCartHandler = this.btnAddToCartHandler.bind(this);
  }
  productListByPurchased() {
    this.props.dispatch({ type: ORDER_HISTORY_LIST_LOADING });
    productListByPurchased()
    .then(result => this.props.dispatch({ type: ORDER_HISTORY_LIST_SUCCESS, data: result.data }))
    .catch(err => this.props.dispatch({ type: ORDER_HISTORY_LIST_ERROR, error: err }));
  }
  addToCart(id, qty) {
    this.props.addItemToCartLoading();
    addItem({
      productId: id,
      quantity: qty,
    })
    .then(result => {
      let addedItem = findFromArray(this.props.order.history.data, {id});
      this.props.addItemToCartSuccess({
        addedToCart: {
          id: addedItem.id,
          name: addedItem.name,
          image: addedItem.image,
          price: addedItem.unitPrice,
          pricePresentable: addedItem.unitPricePresentable,
        },
        feedBack: result.data,
      });

      let stateAddToCart = (this.state.addToCart !== null) ? this.state.addToCart : {};
      this.setState({
        addToCart: {
          ...stateAddToCart,
          [`${id}`]: 1
        }
      });
    })
    .catch(err => {
      this.props.addItemToCartError(err);
    });
  }
  btnAddToCartHandler(e) {
    const itemIdRef = $(e.target).data("id");
    const inputQty = document.getElementById(`order-history-qty-${itemIdRef}`);

    if (inputQty && inputQty.value !== null && inputQty.value !== '' && inputQty.value > 0) {
      this.addToCart(itemIdRef, parseInt(inputQty.value) || 1);
    }
  }
  componentDidMount() {
    let selector = document.getElementsByClassName("order-history-qty");
    let im = new Inputmask('integer', {
      rightAlign: false,
      integerDigits: 3,
      digitsOptional: false,
      numericInput: true,
      placeholder: '',
    });
    im.mask(selector);

    this.productListByPurchased();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <SubHeader bold>
              Order History
            </SubHeader>
            <HrLight />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <th id="name" width="300px">Latest Purchased Products</th>
                    <th id="unit-price" width="150px">Unit Price</th>
                    <th id="quantity" width="150px">Quantity</th>
                    <th id="item-options" width="150px"></th>
                  </tr>
                </TableHeader>
                <TableBody>
                  { this.props.order.history.data !== null &&
                    this.props.order.history.data.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <img
                            style={{ height: '60px', weight: '60px' }}
                            src={item.image}
                          />&nbsp;&nbsp;
                          <span>
                            {item.name}
                          </span>
                        </td>
                        <td>
                          { `P ${item.unitPricePresentable}` }
                        </td>
                        <td>
                          <input 
                            type="text"
                            id={`order-history-qty-${item.id}`}
                            className="order-history-qty"
                            style={{ 
                              width: '60px',
                              float: 'center',
                              'textAlign': 'center'
                            }}
                            maxLength="2"
                            disabled={(this.state.addToCart !== null && this.state.addToCart[`${item.id}`])}
                          />
                        </td>
                        <td>
                          { ( this.state.addToCart !== null &&
                              this.state.addToCart[`${item.id}`]
                            ) ? 
                              <StickerPlain>
                                ADDED
                              </StickerPlain>
                            :
                              ( (this.props.cart.addItem.loading) ?
                                  <SpinnerDefault />
                                :
                                  <ButtonPlainWhite 
                                    data-id={`${item.id}`}
                                    onClick={this.btnAddToCartHandler}
                                  >
                                    <span className="mr-2">
                                      <i className="fa fa-cart-plus" />
                                    </span>
                                    ADD TO CART
                                  </ButtonPlainWhite>
                              )
                          }
                        </td>
                      </tr>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  }
}

// redux
const mapStateToProps = state => ({
  cart: state.cart,
  order: state.order,
  shopCategory: state.shopCategory,
});

const mapDispatchToProps = dispatch => ({
  computeItemTotalPrice: data => dispatch({ type: 'COMPUTE_ITEM_TOTAL_PRICE', data }),

  addItemToCartLoading: () => dispatch({ type: ADD_ITEM_CART_LOADING, }), 
  addItemToCartSuccess: data => dispatch({ type: ADD_ITEM_CART_SUCCESS, data }), 
  addItemToCartError: error => dispatch({ type: ADD_ITEM_CART_ERROR, error }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
