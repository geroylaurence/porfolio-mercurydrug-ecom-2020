import React from 'react';
// import { NavLink as RRLink } from 'react-router-dom';
import styled from 'styled-components';

const SmallText = styled(({
  large,
  smallVerticalMargin,
  smallLineHeight,
  noMargin,
  lightGray,
  letterSpacing,
  secondFont,
  pinToBottom,
  primary,
  bold,
  tableCell,
  textVerticalCenter,
  underLine,
  verticalPadding,
  withDefaultBorder,
  ...otherProps
}) => <p {...otherProps} />).attrs(props => ({}))`
  font-weight: ${props => (props.bold ? '600' : '200')};
  letter-spacing: ${props => (props.letterSpacing ? props.letterSpacing : '1px')};
  font-size: ${props => (props.large ? '14px' : '12px')};
  margin: ${props => (props.noMargin ? 0 : props.smallVerticalMargin ? '3px' : 'initial')} 0;
  color: ${props => {
    if (props.primary) return props.theme.colors.primary;
    if (props.lightGray) return props.theme.colors.lightGray;
    return props.theme.colors.grey;
  }};
  cursor: inherit;
  ${props => (props.smallLineHeight && 'line-height: 24px;')}
  ${props => (props.secondFont && `font-family: ${props.theme.font.family.secondary};`)}
  ${props => (props.pinToBottom && 'align-self: flex-end;')}
  ${props => (props.tableCell && 'display:table-cell;')}
  ${props => (props.textVerticalCenter && 'vertical-align: middle;')}
  ${props => (props.underLine && 'text-decoration: underline;')}
  ${props => (props.withDefaultBorder) && 'border: 1px solid;'}
  ${props => (props.verticalPadding) && `
    padding-top: ${props.theme.padding[props.verticalPadding]};
    padding-bottom: ${props.theme.padding[props.verticalPadding]};
  `}
`;

export default SmallText;
