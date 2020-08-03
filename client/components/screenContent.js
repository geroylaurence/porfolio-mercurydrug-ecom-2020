import React from 'react';
import styled from 'styled-components';

const ScreenContent = styled(({
  backgroundColor,
  ...otherProps
}) => <div {...otherProps} />).attrs(props => ({}))`
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: ${props => props.theme.webScreenContent.mobile};
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: ${props => props.theme.webScreenContent.tablet};
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    width: ${props => props.theme.webScreenContent.desktop};
    padding-left: 0px;
    padding-right: 0px;
  };
  ${props => props.backgroundColor && `background-color: ${props.backgroundColor};`}
`;

export default ScreenContent;