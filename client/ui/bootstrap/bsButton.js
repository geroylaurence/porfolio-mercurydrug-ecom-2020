import React from 'react';
import styled from 'styled-components';

export const BsBtnPrimary = styled(({
  pinTo,
  width,
  ...otherProps,
}) => <button {...otherProps} />).attrs(props => ({}))`
  background-color: ${props => props.theme.colors.primary}!important;
  color: white;

  ${props => (props.width && `width: ${props.width || `initial`};`)}
  ${props => (props.pinTo && `float: ${props.pinTo};`)}

  &:hover {
    background-color: ${props => props.theme.colors.primaryLight}!important;
    color: white!important;
  }
`;