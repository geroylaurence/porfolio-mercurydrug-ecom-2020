import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import BreadCrumbUI from '../ui/breadcrumb';
  
const BreadCrumbContainer = styled.div`
  background-color: ${props => props.theme.colors.greySky};
  z-index: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  height: 36px;
  margin-top: -36px;

  > div {
    padding: 7px 15px ;
  }
`;

function BreadCrumb(props) {
  return (
    <BreadCrumbContainer>
      <BreadCrumbUI />
    </BreadCrumbContainer>
  );
}

export default BreadCrumb;