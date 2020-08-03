import React from 'react';
import styled from 'styled-components'; 

import {
  NavigationContainer,
  NavigationUl,
  NavigationTopItem,
  NavigationTopLink,
  NavigationTopExternalLink,

  NavigationSubMenu,
  NavigationSubMenuItem,
  NavigationSubMenuLink,
} from './styled';

function NavigationMenu(props) {
  return (
    <NavigationContainer>
      <NavigationUl>
        <NavigationTopItem>
          <NavigationTopLink to="/">
            HOME
          </NavigationTopLink>
        </NavigationTopItem>
        <NavigationTopItem>
          <NavigationTopExternalLink 
            href="#"
            data-toggle="dropdown"
          >
            STORE SERVICES
            <span className="ml-2">
              <i className="fa fa-chevron-down" />
            </span>
          </NavigationTopExternalLink>
          <NavigationSubMenu className="dropdown-menu">
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/gamot-padala.html" target="_blank">Gamot Padala</NavigationSubMenuLink>
            </NavigationSubMenuItem>
            {/*<NavigationSubMenuItem>*/}
            {/*  <NavigationSubMenuLink href="https://www.mercurydrug.com/bantay-kalusugan.html" target="_blank"> Bantay Kalusugan Free Clinics</NavigationSubMenuLink>*/}
            {/*</NavigationSubMenuItem>*/}
            {/*<NavigationSubMenuItem>*/}
            {/*  <NavigationSubMenuLink href="https://www.mercurydrug.com/discount-coupons.html" target="_blank">Discount Coupons</NavigationSubMenuLink>*/}
            {/*</NavigationSubMenuItem>*/}
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/drug-info-center.html" target="_blank"> Drug Information</NavigationSubMenuLink>
            </NavigationSubMenuItem>
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/gift-certificate.html" target="_blank"> Gift Certificates</NavigationSubMenuLink>
            </NavigationSubMenuItem>
          </NavigationSubMenu>
        </NavigationTopItem>
        <NavigationTopItem>
          <NavigationTopExternalLink 
            href="#"
            data-toggle="dropdown"
          >
            VALUE CARDS
            <span className="ml-2">
              <i className="fa fa-chevron-down" />
            </span>
          </NavigationTopExternalLink>
          <NavigationSubMenu className="dropdown-menu">
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/suki-card.html" target="_blank">Suki Card</NavigationSubMenuLink>
            </NavigationSubMenuItem>
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/suki-card-query.html" target="_blank">Suki Points Query</NavigationSubMenuLink>
            </NavigationSubMenuItem>
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/mercury-citicard.html" target="_blank">Mercury Drug CitiCard</NavigationSubMenuLink>
            </NavigationSubMenuItem>
          </NavigationSubMenu>
        </NavigationTopItem>
        <NavigationTopItem>
          <NavigationTopExternalLink 
            href="#"
            data-toggle="dropdown"
          >
            ABOUT US
            <span className="ml-2">
              <i className="fa fa-chevron-down" />
            </span>
          </NavigationTopExternalLink>
          <NavigationSubMenu className="dropdown-menu">
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/corporate-information.html" target="_blank">Corporate Information</NavigationSubMenuLink>
            </NavigationSubMenuItem>
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/social-responsibility.html" target="_blank">Social Responsibility</NavigationSubMenuLink>
            </NavigationSubMenuItem>
            <NavigationSubMenuItem>
              <NavigationSubMenuLink href="https://www.mercurydrug.com/careers.html" target="_blank">Career Opportunities</NavigationSubMenuLink>
            </NavigationSubMenuItem>
          </NavigationSubMenu>
        </NavigationTopItem>
        <NavigationTopItem>
          <NavigationTopExternalLink href="https://www.mercurydrug.com/contact-us.html" target="_blank">
            CONTACT US
          </NavigationTopExternalLink>
          {/*<NavigationTopExternalLink */}
          {/*  href="#"*/}
          {/*  data-toggle="dropdown"*/}
          {/*>*/}
          {/*  CONTACT US*/}
          {/*  <span className="ml-2">*/}
          {/*    <i className="fa fa-chevron-down" />*/}
          {/*  </span>*/}
          {/*</NavigationTopExternalLink>*/}
          {/*<NavigationSubMenu className="dropdown-menu">*/}
          {/*  <NavigationSubMenuItem>*/}
          {/*    <NavigationSubMenuLink href="https://www.mercurydrug.com/reach-us.html" target="_blank">Reach Us</NavigationSubMenuLink>*/}
          {/*  </NavigationSubMenuItem>*/}
          {/*  <NavigationSubMenuItem>*/}
          {/*    <NavigationSubMenuLink href="https://www.mercurydrug.com/doctalk.html" target="_blank">DocTalk</NavigationSubMenuLink>*/}
          {/*  </NavigationSubMenuItem>*/}
          {/*  <NavigationSubMenuItem>*/}
          {/*    <NavigationSubMenuLink href="https://www.mercurydrug.com/pharmrs.html" target="_blank">PharMrs</NavigationSubMenuLink>*/}
          {/*  </NavigationSubMenuItem>*/}
          {/*  <NavigationSubMenuItem>*/}
          {/*    <NavigationSubMenuLink href="https://www.mercurydrug.com/price-inquiry.html" target="_blank">Price Inquiry</NavigationSubMenuLink>*/}
          {/*  </NavigationSubMenuItem>*/}
          {/*  <NavigationSubMenuItem>*/}
          {/*    <NavigationSubMenuLink href="https://www.mercurydrug.com/customer-feedback.html" target="_blank">Customer Feedback</NavigationSubMenuLink>*/}
          {/*  </NavigationSubMenuItem>*/}
          {/*</NavigationSubMenu>*/}
        </NavigationTopItem>
      </NavigationUl>
    </NavigationContainer>
  )
}

export default NavigationMenu;
