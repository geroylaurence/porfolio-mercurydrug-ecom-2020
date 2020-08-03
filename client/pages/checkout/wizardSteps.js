import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

const UlContainer = styled.ul`
  counter-reset: step;

  li {
    list-style-type: none;
    float: left;
    width: 33.33%;
    position: relative;
    text-align: center;
    color: ${p => p.theme.colors.grey};
  }

  li:before {
    color: ${p => p.theme.colors.black};
    content: counter(step);
    counter-increment: step;
    width: 55px;
    height: 55px;
    line-height: 55px;
    border: 1px solid ${p=> p.theme.colors.grey};
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: ${p=> p.theme.colors.white};
  }

  li:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${p=> p.theme.colors.grey};
    left: -50%;
    top: 27.77px;
    z-index: -1;
  }

  li:first-child:after {
    content: none;
  }
`;

// *params
// active
// complete
const StepItem = styled.li`
  ${p => p.active && `&:before { background-color: ${p.theme.colors.primary}!important; }`}
  ${p => (!p.active && p.complete) && `
    &:before { background-color: ${p.theme.colors.success}!important; }
    + li:after { background-color: ${p.theme.colors.success}!important; }
  `}
`;

function WizardSteps(props) {
  let masterPath = props.location.pathname;

  return (
    <UlContainer>
      <StepItem active={masterPath === '/checkout'} complete={props.checkout.processing.cartFinalization}>Review Items</StepItem>
      <StepItem active={masterPath === '/checkout/receiver'} complete={props.checkout.processing.addressFinalization}>Recipient Information</StepItem>
      <StepItem active={masterPath === '/checkout/branch-pickup'}>Branch Selection</StepItem>
    </UlContainer>
  )
}

const mapStateToProps = state => ({
  checkout: state.checkout,
});

export default withRouter(connect(mapStateToProps, {})(WizardSteps));
