import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const OptNavContent = styled(({
  medScrollY,
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({}))`
  height: inherit;
  margin: 0 auto;

  ${props => props.medScrollY && `
    height: 400px!important;
    overflow-y: auto;
  `}
`;

export const OptNavUl = styled.ul`
  list-style-type:none;
  padding: 0px;
  margin: 0px;
`;

export const OptNavItem = styled.li`
  color: white;
  padding: 14px 0px;
  text-decoration: none;
  font-size: 17px;
  display: block;
`;

export const OptNavHRef = styled(({
  withPaddingY,
  ...otherProps,
}) => <a {...otherProps} />).attrs(props => ({}))`
  cursor: pointer;
  &:hover { text-decoration: none; }
  &:link, &:visited {
    color: white;
    display: block;
    font-size: 17px;
    height: inherit;
    width: inherit;
    text-decoration: none;
    ${props => props.withPaddingY && `padding: 14px 0px;`}
  }
`;

export const OptReactLink = styled(({
  withPaddingY,
  ...otherProps,
}) => <Link {...otherProps} />).attrs(props => ({}))`
  cursor: pointer;
  &:hover { text-decoration: none; }
  &:link, &:visited {
    color: white;
    display: block;
    font-size: 17px;
    height: inherit;
    width: inherit;
    text-decoration: none;
    ${props => props.withPaddingY && `padding: 14px 0px;`}
  }
`

export const BlackSpace = styled.span`
  width: 14px;
  display: inline-block;
`;