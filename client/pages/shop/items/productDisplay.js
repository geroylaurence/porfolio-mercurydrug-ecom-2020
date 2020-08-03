import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { TextPrimary, TextGrey } from '../../../ui/text';
import CbContainer from '../../../ui/classBase/cbContainer';
import CbImage from '../../../ui/classBase/cbImage';
import SmallText from '../../../ui/smallText';

import ProductBoxImage from '../../../../assets/images/dummy/product-box.png';

function ProductDisplay(props) {
  return (
    <CbContainer 
      key={props.id}
      className="card text-center border-0 mx-auto mb-2" 
      width="250px"
    >
      <NavLink 
        className="text-decoration-none"
        to={`/shop/view/${props.id}`}
        onClick={props.onClick}
      >
        <CbImage 
          src={ProductBoxImage} 
          className="card-img-top"
          alt="..."
          width="200px"
          height="200px"
        />
        <CbContainer className="mx-4">
          {/*{ props.generics !== null &&*/}
          {/*  <SmallText*/}
          {/*    large*/}
          {/*    bold*/}
          {/*    withDefaultBorder*/}
          {/*    verticalPadding="xs"*/}
          {/*  >*/}
          {/*    { props.generics.genericName }*/}
          {/*  </SmallText>*/}
          {/*}*/}
          <TextGrey>
            {props.name}
          </TextGrey>
          <TextPrimary>
            <span className="mr-2">
              P
            </span>
            { props.pricePresentable }
          </TextPrimary>
        </CbContainer>
      </NavLink>
    </CbContainer>
  );
}

export default withRouter(ProductDisplay);
