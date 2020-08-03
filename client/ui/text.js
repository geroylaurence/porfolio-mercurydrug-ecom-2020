import React from 'react';
import styled from 'styled-components';

export const TextPrimary = styled(({
  textCentered,
  ...otherProps,
}) => <p {...otherProps}/>)`
  text-align: ${p => {
    if (p.textCentered) return `center`;
    return `left`;
  }};
  color: ${p => p.theme.colors.primary};
  font-weight: 600;
  font-size: 1.2em;
`;

export const TextGrey = styled(({
  fontWeight,
  textCentered,
  ...otherProps,
}) => <p {...otherProps}/>).attrs(props => ({}))`
  text-align: ${p => {
    if (p.textCentered) return `center`;
    return `left`;
  }};
  color: ${p => p.theme.colors.grey};
  font-weight: ${props => {
    if (props.fontWeight) {
      return `${props.theme.font.weight[props.fontWeight]}`
    };
    return `600`;
  }};
  margin: 0;
`;

export const TextGreen = styled.p`
  color: ${p => p.theme.colors.success};
  font-weight: 600;
  font-size: 1.2em;
  margin: 0;
`;

export const TextFailed = styled.p`
  color: ${p => p.theme.colors.failed};
  font-weight: 600;
  font-size: 1.2em;
  margin: 0;
`;

export const StickerPlain = styled.p`
  color: ${p => p.theme.colors.grey};
  font-weight: 600;
  margin: 0;
`;