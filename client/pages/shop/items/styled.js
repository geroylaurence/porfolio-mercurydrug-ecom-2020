import React from 'react';
import styled from 'styled-components';

export const ItemsContentMediaQuery = styled(({
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({}))`
  display: flex;
  flex: initial;
  flex-direction: column;
  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    width: 900px;
    padding-left: ${props => props.theme.padding.sm};
    padding-right: ${props => props.theme.padding.sm};
  };
`;

export const ResultsTitleList = styled.ul`
  li {
    color: ${props => props.theme.colors.primary};

    @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
      width: 100%;
    };
    @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
      width: 100%;
    };
    @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
      float: left;
      width: 50%;
    };
  }
`;

