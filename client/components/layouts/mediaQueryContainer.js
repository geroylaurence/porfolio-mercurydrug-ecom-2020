import React from 'react';
import styled from 'styled-components';

const MediaQueryContainer = styled(({
  desktopQuery,
  mobileQuery,
  width,
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({
  width: (props.width ? `${props.width}` : '100%'),
}))`
  position: relative;
  width: ${props => props.width};

  ${props => props.desktopQuery && `
    display: none;
    @media screen and (min-width: ${props.theme.webScreenContent.pointer_desktop}) {
      display: block;
    }
  `}

  ${props => props.mobileQuery && `
    display: block;
    @media screen and (min-width: ${props.theme.webScreenContent.pointer_desktop}) {
      display: none;
    }
  `}
`;

export default MediaQueryContainer;