import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import StyledContainer from '../../../components/layouts/styledContainer';
import MediaQueryFlex from '../../../components/layouts/mediaQueryFlex';
import SubHeader from '../../../ui/subheader';
import { H5Primary } from '../../../ui/headers';
import { BsBtnPrimary } from '../../../ui/bootstrap/bsButton';

// misc
import { SET_LOGIN_LAST_PAGE } from '../../../../redux/actions/app';

class NotifAddedToCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div 
        className="modal fade" 
        id="notifCartModal" 
        tabIndex="-1" 
        role="dialog" 
        aria-labelledby="notifCartModalLabel" 
        aria-hidden="true"
      >
        <div 
          className="modal-dialog modal-lg" 
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <SubHeader className="mx-auto">
                1 new item has been added to your cart
              </SubHeader>
            </div>
            <div className="modal-body">
              { this.props.cart.addedItem !== null && 
                <MediaQueryFlex applyChildsHzMargin>
                  <StyledContainer itemsCenter>
                    <img style={{ width: '250px' }} src={this.props.cart.addedItem.image} />
                  </StyledContainer>
                  <StyledContainer marginRight="sm">
                    <div className="row mb-2">
                      <div className="col-md">
                        <h4>{this.props.cart.addedItem.name}</h4>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md">
                        <h5>Quantity:</h5>
                      </div>
                      <div className="col-md">
                        <h5 className="float-right">{this.props.cart.addedItem.quantity}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md">
                        <h5>Price:</h5>
                      </div>
                      <div className="col-md">
                        <h5 className="float-right">
                          <span className="mr-3">P</span>
                          {this.props.cart.addedItem.pricePresentable}
                        </h5>
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-4">
                      <div className="col-md">
                        <h5 className=" text-danger">Total:</h5>
                      </div>
                      <div className="col-md">
                        <h5 className="float-right text-danger">
                          <span className="mr-3">P</span>
                          {this.props.cart.addedItem.totalPricePresentable || this.props.cart.addedItem.pricePresentable}
                        </h5>
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <StyledContainer
                        flexDirection="row-reverse"
                        addSideMarginForChildren="30px"
                      >
                        { this.props.account.authenticated &&
                          <NavLink to="/checkout">
                            <BsBtnPrimary 
                              className="btn"
                              onClick={e => {
                                $('#notifCartModal').modal('toggle');
                              }}
                            >
                              Proceed Checkout
                            </BsBtnPrimary>
                          </NavLink>
                        }
                        { !this.props.account.authenticated &&
                          <NavLink to="/login">
                            <BsBtnPrimary 
                              className="btn"
                              onClick={e => {
                                this.props.setLoginLastPage();
                                $('#notifCartModal').modal('toggle');
                              }}
                            >
                              Login to Checkout
                            </BsBtnPrimary>
                          </NavLink>
                        }
                        <button 
                          className="btn btn-light mr-2"
                          onClick={e => {
                            $('#notifCartModal').modal('toggle');
                          }}
                        >
                          Continue Shopping
                        </button>
                      </StyledContainer>
                    </div>  
                  </StyledContainer>
                </MediaQueryFlex>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
  cart: state.cart,
  sku: state.sku,
});
const mapDispatchToProps = dispatch => ({
  setLoginLastPage: () => dispatch({ type: SET_LOGIN_LAST_PAGE, data: '/checkout' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotifAddedToCart);
