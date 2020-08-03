import React from 'react';
import styled from 'styled-components';

export const H6Primary = styled.h6`
  color: ${p => p.theme.colors.primary};
`;

export const H6Grey = styled(({
  bold,
  ...otherProps,
}) => <h6 {...otherProps} />).attrs(props => ({}))`
  color: ${p => p.theme.colors.grey};
  ${p => (p.bold && `font-weight: ${p.theme.font.weight.bold};`)}
`;

export const H5Primary = styled.h5`
  color: ${p => p.theme.colors.primary};
`;

export const H5Grey = styled(({
  bold,
  marginVerticalAuto,
  ...otherProps,
}) => <h5 {...otherProps} />).attrs(props => ({}))`
  color: ${p => p.theme.colors.grey};
  ${p => (p.bold && `font-weight: ${p.theme.font.weight.bold};`)}
  ${p => (p.marginVerticalAuto) && `
    margin-top: auto;
    margin-bottom: auto;
  `}
`;

export const H4Primary = styled.h4`
  color: ${p => p.theme.colors.primary};
`;

export const H4Grey = styled(({
  bold,
  paddingHorizontal,
  withDefaultBorder,
  widthFitContent,
  ...otherProps,
}) => <h4 {...otherProps} />).attrs(props => ({}))`
  color: ${props => props.theme.colors.grey};
  ${props => (props.withDefaultBorder) && 'border: 1px solid;'}
  ${props => (props.bold && `font-weight: ${props.theme.font.weight.bold};`)}
  ${props => (props.paddingHorizontal) && `
    padding-left: ${props.theme.padding[props.paddingHorizontal]};
    padding-right: ${props.theme.padding[props.paddingHorizontal]};
  `}
  ${props => (props.widthFitContent && `width: fit-content;`)}
`;

export const H3Grey = styled(({
  bold,
  marginBottom,
  withDefaultBorder,
  ...otherProps,
}) => <h3 {...otherProps} />).attrs(props => ({}))`
  ${props => (props.withDefaultBorder) && 'border: 1px solid;'}
  ${props => (props.bold && `font-weight: ${props.theme.font.weight.bold};`)}

  color: ${props => props.theme.colors.grey};
  margin-bottom: ${props => (props.marginBottom) ? props.marginBottom : `initial`};
`;