import React from 'react';
import styled from 'styled-components';

export const CardDefault = styled(({
  height,
  width,
  ...otherProps
}) => <div {...otherProps} />).attrs(props => ({}))`
  padding: 50px 25px;
  background-color: ${props => props.theme.colors.greySky};
  height: ${props => (props.height) ? props.height : `initial`};
  width: ${props => (props.width) ? props.width : `450px`};
`;