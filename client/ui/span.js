import React from 'react';
import styled from 'styled-components';

export const TextContainer = styled(({
  color,
  fontSize,
  ...otherProps,
}) => <span {...otherProps} />).attrs(props => ({}))`
  font-size: ${p => p.theme.font.size.sm};
`;

export const SpanFailed = styled.span`
  color: ${props => props.theme.colors.failed};
`;

export const HighLightPrimary = styled.span`
  color: ${props => props.theme.colors.primary};
`;