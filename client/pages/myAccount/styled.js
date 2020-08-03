import React from 'react';
import styled from 'styled-components';

export const NavLinkWrapper = styled(({
  active,
  ...otherProps
}) => <div {...otherProps} />).attrs(props => ({}))`
  color: grey;
  display: block;
  padding: 5px;
  text-decoration: none;

  &:hover {
    background-color: #ccc;
  }

  ${props =>  props.active && `background-color: #ccc;`}
`;