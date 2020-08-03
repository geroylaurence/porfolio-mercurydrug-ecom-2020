import React from 'react';
import styled from 'styled-components';

const Container = styled(({
  addSideMarginForChildren,
  backgroundColor,
  color, 
  disableFlex,
  display, 
  flex, 
  flexDirection, 
  flexGrow, 
  flexWrap,
  fullWidth,
  height,
  pinBottom,
  pinCenter,
  position,
  width,
  ...otherProps
}) => <div {...otherProps} />).attrs(props => ({
  backgroundColor: props.backgroundColor || 'initial',
  color: props.color || 'initial',
  display: (props.disableFlex ? 'block' : props.display ? props.display : 'flex'),
  flexDirection: props.flexDirection || 'column',
  flexGrow: (props.dontGrow || props.width ? 0 : props.flexGrow ? props.flexGrow : 1),
  height: (props.height) ? props.height : 'initial',
  width: (props.width) ? props.width : 'initial',
}))`
  background-color: ${props => props.backgroundColor};
  color: ${props => {
    if (props.theme.colors.hasOwnProperty(props.color)) {
      return props.theme.colors[props.color];
    }
    return 'initial';
  }};
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  flex: ${props => (props.flex ? props.flex : 'initial')};
  flex-grow: ${props => props.flexGrow};

  position: ${props => (props.position ? props.position : 'initial')};
  bottom: ${props => (props.position === 'absolute' && props.pinBottom ? '0' : 'initial')};

  width: ${props => {
    if (props.fullWidth) {
      return `100%`
    }
    return props.width;
  }};
  height: ${props => props.height};

  ${props => (props.pinCenter) && `margin-left: auto; margin-right: auto;`}
  ${props => props.addSideMarginForChildren && `
    > * {
      &:not(:last-child) {
        margin-right: ${props.addSideMarginForChildren};
      }
    }
  `}
`;

export default Container;
