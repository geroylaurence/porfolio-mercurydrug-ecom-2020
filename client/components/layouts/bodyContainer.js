import React from 'react';
import styled from 'styled-components';

// 1.0
// const BodyContainer = styled(({
//   ...otherProps
// }) => <div {...otherProps} />).attrs(props => ({}))`
//   display: flex;
//   flex-direction: column;
//   position: relative;
// `;

const BodyContainer = styled(({
  ...otherProps
}) => <div {...otherProps} />).attrs(props => ({}))`
  display: block;
  position: relative;
`;

export default BodyContainer;