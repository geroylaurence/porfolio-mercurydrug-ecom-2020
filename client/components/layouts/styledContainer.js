import React from 'react';
import styled from 'styled-components';

const Container = styled(({
  addSideMarginForChildren,
  backgroundColor,
  backgroundGradiant,
  bottomBorder,
  clickable,
  color,
  disableFlex,
  display,
  dontGrow,
  dottedBg,
  fixed,
  flex,
  flexDirection,
  flexGrow,
  flexWrap,
  fontFamily,
  fullHeight,
  grayBorder,
  height,
  itemsCenter,
  itemsVerticalCenter,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  newMargin,
  newPadding,
  overflowYScroll,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  pinCenter,
  pinBottom,
  pinItemsBottom,
  pinItemsRight,
  position,
  width,
  withHorizontalPadding,
  withPadding,
  withVerticalPadding,
  zIndex,
  ...otherProps
}) => <div {...otherProps} />).attrs(props => ({
  backgroundColor: props.backgroundColor || 'initial',
  color: props.color || 'initial',
  display: (props.disableFlex ? 'block' : props.display ? props.display : 'flex'),
  flexDirection: props.flexDirection || 'column',
  flexGrow: (props.dontGrow || props.width ? 0 : props.flexGrow ? props.flexGrow : 1),
  fontFamily: props.fontFamily || props.theme.font.family.primary,
  marginTop: (() => {
    const { marginTop, pinBottom } = props;

    if (pinBottom) {
      return 'auto';
    }

    return props.theme.marginNew[marginTop] || props.marginTop || 'initial';
  })(),
  width: (props.width ? `${props.width}` : 'initial'),
  withPadding: props.theme.padding[props.withPadding] || 0,
  withHorizontalPadding: props.theme.padding[props.withHorizontalPadding] || 0,
  withVerticalPadding: props.theme.padding[props.withVerticalPadding] || 0,
}))`
  position: ${props => (props.position ? props.position : 'initial')};
  bottom: ${props => (props.position === 'absolute' && props.pinBottom ? '0' : 'initial')};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: ${props => props.display};
  flex-direction: ${props => props.flexDirection};
  flex: ${props => (props.flex ? props.flex : 'initial')};
  flex-grow: ${props => props.flexGrow};
  font-family: ${props => props.fontFamily};
  height: ${props => (props.fullHeight ? '100%' : props.height ? props.height : 'auto')};
  margin-top: ${(props) => {
    const themeMargin = props.newMargin ? props.theme.marginNew : props.theme.margin;
    return themeMargin[props.marginTop] ? themeMargin[props.marginTop] : props.marginTop; 
  }};
  margin-bottom: ${(props) => {
    const themeMargin = props.newMargin ? props.theme.marginNew : props.theme.margin;
    return themeMargin[props.marginBottom] ? themeMargin[props.marginBottom] : props.marginBottom; 
  }};
  margin-left: ${(props) => {
    const themeMargin = props.newMargin ? props.theme.marginNew : props.theme.margin;
    return themeMargin[props.marginLeft] ? themeMargin[props.marginLeft] : props.marginLeft; 
  }};
  margin-right: ${(props) => {
    const themeMargin = props.newMargin ? props.theme.marginNew : props.theme.margin;
    return themeMargin[props.marginRight] ? themeMargin[props.marginRight] : props.marginRight; 
  }};
  overflow-y: ${props => (props.overflowYScroll ? 'scroll' : 'initial')};
  padding: ${(props) => {
    if (props.withPadding) {
      return props.withPadding;
    }

    const horizontalPadding = props.withHorizontalPadding;
    const verticalPadding = props.withVerticalPadding;
    return `${verticalPadding} ${horizontalPadding}`;
  }};
  ${(props) => {
    const themePadding = props.newPadding ? props.theme.paddingNew : props.theme.padding;
    return (props.paddingRight && `padding-right: ${themePadding[props.paddingRight]} !important;`);
  }}
  ${(props) => {
    const themePadding = props.newPadding ? props.theme.paddingNew : props.theme.padding;
    return (props.paddingLeft && `padding-left: ${themePadding[props.paddingLeft]} !important;`);
  }}
  ${(props) => {
    const themePadding = props.newPadding ? props.theme.paddingNew : props.theme.padding;
    return (props.paddingTop && `padding-top: ${themePadding[props.paddingTop]} !important;`);
  }}
  ${(props) => {
    const themePadding = props.newPadding ? props.theme.paddingNew : props.theme.padding;
    return (props.paddingBottom && `padding-bottom: ${themePadding[props.paddingBottom]} !important;`);
  }}
  width: ${props => props.width};
  align-items: ${(props) => {
    if (props.pinItemsRight) {
      return 'flex-end';
    }

    if (props.itemsCenter && !props.flexWrap) {
      return 'center';
    }

    return 'initial';
  }};

  ${props => (props.itemsCenter) && `
    p, h1, h2, h3, h4, h5, h6 {
      text-align: center;
    };
  `}
  ${props => ((props.flexWrap && props.itemsCenter) && 'justify-content: center;')}
  ${props => (props.flexWrap && 'flex-wrap: wrap;')}
  ${props => (props.pinItemsBottom && 'justify-content: flex-end;')}
  ${props => ((props.grayBorder && !props.bottomBorder) && `border: 1px solid ${props.theme.colors.gray};`)}
  ${props => (props.bottomBorder && `border-bottom: 1px solid ${props.theme.colors.black};`)}
  ${props => (props.clickable && 'cursor: pointer;')}
  ${props => (props.itemsVerticalCenter && 'justify-content: center;')}
  ${props => (props.zIndex && `z-index: ${props.zIndex};`)}
  ${props => (props.backgroundGradiant && `background: ${props.backgroundGradiant};`)}
  ${props => (props.pinCenter) && `margin-left: auto; margin-right: auto;`}

  // @media (max-width: ${props => props.theme.deviceWidth.mobile}) {
  //   padding: ${props => (props.smartPaddingOnMobile ? `${props.theme.paddingNew.sm} !important` : '')};
  // }

  ${props => props.addSideMarginForChildren && `
    > * {
      &:not(:last-child) {
        margin-right: ${props.addSideMarginForChildren};
      }
    }
  `}
`;

export default Container;
