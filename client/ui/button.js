import React from 'react';
import styled from 'styled-components';

export const ButtonDefault = styled.button`
  background-color: #dc3545;
  border-color: #dc3545;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 400;
  padding: .2rem 1.2rem;
  margin: 0.2rem 0.05rem 0.2rem 0;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`

export const ButtonPlainWhite = styled(({
  ...otherProps,
}) => <button {...otherProps} />).attrs(props => ({}))`
  background-color: ${props => props.theme.colors.white }};
  border: 0.5px solid grey;;
  border-radius: 5px;
  color: ${props => props.theme.colors.grey};
  padding: 5px 7px;

  ${props => (props.width && `width: ${props.width};`)}
  ${props => (props.pinTo && `float: ${props.pinTo};`)}
`;