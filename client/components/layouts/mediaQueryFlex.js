import React from 'react';
import styled from 'styled-components';

const MediaQueryFlex = styled(({
  applyChildsHzMargin,
  childDivsFullWidth,
  minHeight,
  height,
  width,
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({
  width: (props.width ? `${props.width}` : '100%'),
  height: (props.height ? `${props.height}` : 'initial'),
}))`
  display: flex;
  flex-direction: column;
  height: ${props => props.height};
  width: ${props => props.width};

  ${props => props.minHeight && `min-height: ${props.minHeight};`}
  ${props => props.childDivsFullWidth && `
    > div {
      width: 100%!important;
    }
  `}

  @media screen and (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    flex-direction: row;

    ${props => props.applyChildsHzMargin && `
      > * {
        &:not(:last-child) {
          margin-right: ${props.theme.margin.md};
        }  
      }
    `}
  }
`;

export default MediaQueryFlex;