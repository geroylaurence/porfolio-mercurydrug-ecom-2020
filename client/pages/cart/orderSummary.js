import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SmallText from '../../ui/smallText';
import CbContainer from '../../ui/classBase/cbContainer';

// misc
import { serviceOption } from '../../../redux/actions/checkout';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.thead`
  tr {
    color: ${p => p.theme.colors.shadowColor};
    font: icon;
    font-size: 1em;
  };
  th {
    padding-bottom: ${p => p.theme.padding.sm};
    padding-top: ${p => p.theme.padding.sm};

    &: first-child {
      padding-right: ${p => p.theme.padding.sm}; 
      width: 70%;
    }
    &: second-child {
      width: 30%;
    }
  };
`;

const TableBody = styled.tbody`
  tr {
    color: ${p => p.theme.colors.grey};
  };
  td {
    padding-bottom: ${p => p.theme.padding.sm};
    padding-top: ${p => p.theme.padding.sm};
    height: 2em;

    &: first-child {
      padding-right: ${p => p.theme.padding.sm}; 
      width: 70%;
    }
    &: second-child {
      width: 30%;
    }
  };
`;

const GrandTotalWrapper = styled.div`
  color: ${p => p.theme.colors.primary};
  font: icon;
  font-size: 1.3em;
  margin-bottom: ${p => p.theme.margin.sm};
`;
const DeliveryWrapper = styled.div`
  color: ${p => p.theme.colors.greyDark};
  font-size: 1.1em;
  margin-bottom: ${p => p.theme.margin.sm};
`;
const SavingsPointWrapper = styled.div`
  color: ${p => p.theme.colors.greyDark};
  font-size: 1.3em;
  margin-bottom: ${p => p.theme.margin.sm};
`;
const ESukiWrapper = styled.div`
  color: ${p => p.theme.colors.greyDark};
  font-size: 1.1em;
  margin-bottom: ${p => p.theme.margin.sm};
`;

function OrderSummary(props) {
  return (
    <div className="card">
      <CbContainer 
        applyBgPrimary
        className="card-header"
      >
        <h4 className="text-white">Order Summary</h4>
      </CbContainer>
      <div className="card-body">
        <Table>
          <TableBody>
            <tr>
              <td>
                <strong>
                  Sub-Total
                </strong>
              </td>
              <td>
                <div className="d-block">
                  <span>
                    Php
                  </span>
                  <span className="float-right">
                    { props.cart.subTotalPresentable }
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  Less Previous Earned Discount
                </strong>
              </td>
              <td>
                <div className="d-block">
                  <span>
                    Php
                  </span>
                  <span className="float-right">
                    {props.cart.redeemUserWalletPresentable}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  Less Redeemed e-Suki Points
                </strong>
              </td>
              <td>
                <div className="d-block">
                  <span>
                    Php
                  </span>
                  <span className="float-right">
                    { props.cart.redeemRewardsWalletPresentable }
                  </span>
                </div>
              </td>
            </tr>
          </TableBody>
        </Table>
        <hr />
        { props.checkout.serviceOption === serviceOption.delivery &&
          <DeliveryWrapper className="row">
            <div className="col-md-7">
              <span>
                Delivery Fee
              </span>
            </div>
            <div className="col-md">
              <span>
                Php
              </span>
              <span className="float-right">
                { props.cart.deliveryFeePresentable }
              </span>
            </div>
          </DeliveryWrapper>
        }
        <GrandTotalWrapper className="row">
          <div className="col-md-7">
            <span>
              Grand Total
            </span>
          </div>
          <div className="col-md">
            <span>
              Php
            </span>
            <span className="float-right">
              { (props.checkout.serviceOption === serviceOption.delivery) ? props.cart.computedGrandTotalWithDeliveryFeePresentable : props.cart.grandTotalPresentable }
            </span>
          </div>
        </GrandTotalWrapper>
        {/*<SavingsPointWrapper className="row">*/}
        {/*  <div className="col-md-7">*/}
        {/*    <span>*/}
        {/*      Your Total Savings*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className="col-md">*/}
        {/*    <span>*/}
        {/*      Php*/}
        {/*    </span>*/}
        {/*    <span className="float-right">*/}
        {/*      { props.cart.totalSavingsPresentable }*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*</SavingsPointWrapper>*/}
        <ESukiWrapper className="row">
          <div className="col-md-7">
            <span>
              e-Suki Points Earned
            </span>
          </div>
          <div className="col-md">
            <span className="float-right">
              { props.cart.eSukiToEarn }
            </span>
          </div>
        </ESukiWrapper>
        {/*<ESukiWrapper className="row">*/}
        {/*  <div className="col-md-7">*/}
        {/*    <span>*/}
        {/*      e-Suki Bonus Points Earned*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className="col-md">*/}
        {/*    <span className="float-right">*/}
        {/*      { props.cart.eSukiBonus }*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*</ESukiWrapper>*/}
      </div>
    </div>
  );
}

// REDUX
const mapStateToProps = state => ({
  cart: state.cart,
  checkout: state.checkout,
});

export default connect(mapStateToProps)(OrderSummary);
