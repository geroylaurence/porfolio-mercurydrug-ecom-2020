import React from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Profile from './profile';
import Loyalty from './loyalty';
import AddressBook from '../addressBook';

import NavigationMobileMedia from './mobileMedia';
import StyledContainer from '../../components/layouts/styledContainer';
import MediaQueryFlex from '../../components/layouts/mediaQueryFlex';
import MediaQueryContainer from '../../components/layouts/mediaQueryContainer';
import { NavLinkWrapper } from './styled';

function MyAccount(props) {
  return (
    <MediaQueryFlex>
      <MediaQueryContainer desktopQuery width="250px">
        <StyledContainer paddingRight="sm">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/my-account">
                <NavLinkWrapper active={props.location.pathname === `${props.match.path}`}>
                  Profile
                </NavLinkWrapper>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-account/address-book">
                <NavLinkWrapper active={props.location.pathname === `${props.match.path}/address-book`}>
                  Address Book
                </NavLinkWrapper>
              </Link>
            </li>
          </ul>
        </StyledContainer>
      </MediaQueryContainer>
      <MediaQueryContainer mobileQuery>
        <NavigationMobileMedia />
      </MediaQueryContainer>
      <StyledContainer>
        <Switch>
          <Route exact path={`${props.match.path}`} component={Profile} />
          <Route path={`${props.match.path}/address-book`} component={AddressBook} />
        </Switch>
      </StyledContainer>
    </MediaQueryFlex>
  );
}

export default MyAccount;