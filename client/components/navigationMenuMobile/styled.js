import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  ${props => `
    position: relative;
    background-color: ${props.theme.colors.primary};
    width: 100%;

    display: none;
    @media screen and (max-width: ${props.theme.webScreenContent.pointer_tablet}) {
      display: block;
    }
  `}
`;

export const NavigationContent = styled.div`
  height: inherit;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: ${props => props.theme.webScreenContent.mobile};
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: ${props => props.theme.webScreenContent.tablet};
  };
`;

export const NavigationBurger = styled.a`
  &:link, &:visited {
    color: white;
    padding: 14px 0px;
    text-decoration: none;
    font-size: 17px;
    display: block;
    background-color: ${props => props.theme.colors.primary};
  }
`;

export const NavigationLink = styled(Link)`
  &:link, &:visited {
    color: white;
    text-decoration: none;
    font-size: 17px;
    display: block;
    background-color: ${props => props.theme.colors.primary};
  }
`;

export const NavigationExternalLink = styled.a`
  &:link, &:visited {
    color: white;
    text-decoration: none;
    font-size: 17px;
    display: block;
    background-color: ${props => props.theme.colors.primary};
  }
`;

export const NavigationUl = styled.ul`
  display: none;
  list-style-type:none;
  padding: 0px;
  margin: 0px;
`;

export const NavigationItem = styled.li`
  color: white;
  padding: 14px 0px;
  text-decoration: none;
  font-size: 17px;
  display: block;
  background-color: ${props => props.theme.colors.primary};

  &:hover {
    > ul {
      display: block;
    }
  }
`;

export const SubUlLinks = styled.ul`
  display: none;
  list-style-type:none;
  padding: 0px 0px 0px 15px;
  margin: 0px; 
`;