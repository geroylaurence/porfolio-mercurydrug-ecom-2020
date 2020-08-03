import React from 'react';
import styled from 'styled-components';

const CBButton = styled(({
  pinTo,
  width,
  ...otherProps,
}) => <button {...otherProps} />).attrs(props => ({}))`
  background-color: ${props => {
    return props.theme.colors.primary
  }}!important;
  color: white;

  ${props => (props.width && `width: ${props.width};`)}
  ${props => (props.pinTo && `float: ${props.pinTo};`)}

  &:hover {
    background-color: ${props => {
      return props.theme.colors.primaryLight
    }}!important;
    color: white!important;
  }
`;

export default CBButton;