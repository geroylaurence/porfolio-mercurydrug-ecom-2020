import React from 'react';
import styled from 'styled-components';

export const CheckoutContentContainer = styled.div`
  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    width: 900px;
  };
`;

export const CheckoutMediaQuerySizing = styled(({
  width,
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({
  width: (props.width ? `${props.width}` : 'inherit'),
}))`
  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    width: ${props => props.width};
  };
`;

export const ESukitPointsItemWrapper = styled.div`
  color: ${p => p.theme.colors.greyDark};
  font-size: 1.3em;
  margin-bottom: ${p => p.theme.margin.sm};
`;