import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  ${props => `
    position: relative;
    background-color: ${props.theme.colors.primary};
    border-radius: 30px!important;
    border-color: transparent!important;
    margin-bottom: -${props.theme.margin.md};
    z-index: 1;
    width: 100%;
    height: 50px;
    padding: 10px 10px;

    display: none;
    @media screen and (min-width: ${props.theme.webScreenContent.pointer_tablet}) {
      display: block;
    }
  `}
`;

export const NavigationUl = styled.ul`
  list-style-type:none;
  padding: 0px;
  margin: 0px;
  float: left;
  width: 100%;
`;

export const NavigationTopItem = styled.li`
  color: ${p => p.theme.colors.white};
  float: left;
  position: relative;
  padding: 5px 25px;
  text-align: center;
  width: calc(100%/5);
`;

export const NavigationTopLink = styled(Link)`
  &:link, &:visited {
    color: white;
    text-decoration: none;
    display: block;
  }

  &:hover {
    background: ${p => p.theme.colors.primaryLight};
    border-radius: 20px;
  }
`;

export const NavigationTopExternalLink = styled.a`
  &:link, &:visited {
    color: white;
    text-decoration: none;
    display: block;
  }

  &:hover {
    background: ${p => p.theme.colors.primaryLight};
    border-radius: 20px;
  }
`;

export const NavigationSubMenu = styled.ul`
  margin-top: 18px;
  background: ${p => p.theme.colors.white};
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,.15);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  position: absolute;
  transform: translate3d(0px, 34px, 0px)!important;
  z-index: 1000;
  width: 100%;
`;

export const NavigationSubMenuItem = styled.li`
  padding: 5px 20px;
  
  &:hover {
    background: ${p => p.theme.colors.whiteSmoke};
    color: ${p => p.theme.colors.nero};
  }
`;

export const NavigationSubMenuLink = styled.a`
  color: ${p => p.theme.colors.nightRaider};
  line-height: 2.5;
  font-weight: ${p => p.theme.font.weight.normal};
  font-size: 0.929em;
`;