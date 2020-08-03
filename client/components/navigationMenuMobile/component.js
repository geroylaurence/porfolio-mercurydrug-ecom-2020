import React from 'react';
import {
  NavigationContainer,
  NavigationContent,
  NavigationBurger,
  NavigationLink,
  NavigationExternalLink,
  NavigationUl,
  NavigationItem,

  SubUlLinks,
} from './styled';
import {NavigationTopExternalLink, NavigationTopItem} from '../navigationMenu/styled';

function NavigationMenuMobile(props) {
  return (
    <NavigationContainer>
      <NavigationContent>
        <NavigationBurger 
          href="#"
          onClick={toggleMyLinks}
        >
          <i className="fa fa-bars"></i>
        </NavigationBurger>
        <NavigationUl id="nav-ul">
          <NavigationItem>
            <NavigationLink to="/" onClick={toggleMyLinks}>HOME</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            STORE SERVICES
            <SubUlLinks>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/gamot-padala.html" target="_blank">Gamot Padala</NavigationExternalLink>
              </NavigationItem>
              {/*<NavigationItem>*/}
              {/*  <NavigationExternalLink href="https://www.mercurydrug.com/bantay-kalusugan.html" target="_blank">Bantay Kalusugan Free Clinics</NavigationExternalLink>*/}
              {/*</NavigationItem>*/}
              {/*<NavigationItem>*/}
              {/*  <NavigationExternalLink href="https://www.mercurydrug.com/discount-coupons.html" target="_blank">Discount Coupons</NavigationExternalLink>*/}
              {/*</NavigationItem>*/}
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/drug-info-center.html" target="_blank">Drug Information</NavigationExternalLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/gift-certificate.html" target="_blank">Gift Certificates</NavigationExternalLink>
              </NavigationItem>
            </SubUlLinks>
          </NavigationItem>
          <NavigationItem>
            VALUE CARDS
            <SubUlLinks>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/suki-card.html" target="_blank">Suki Card</NavigationExternalLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/suki-card-query.html" target="_blank">Suki Points Query</NavigationExternalLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/mercury-citicard.html" target="_blank">Mercury Drug CitiCard</NavigationExternalLink>
              </NavigationItem>
            </SubUlLinks>
          </NavigationItem>
          <NavigationItem>
            ABOUT US
            <SubUlLinks>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/corporate-information.html" target="_blank">Corporate Information</NavigationExternalLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/social-responsibility.html" target="_blank">Social Responsibility</NavigationExternalLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationExternalLink href="https://www.mercurydrug.com/careers.html" target="_blank">Career Opportunities</NavigationExternalLink>
              </NavigationItem>
            </SubUlLinks>
          </NavigationItem>
          <NavigationItem>
            <NavigationExternalLink href="https://www.mercurydrug.com/contact-us.html" target="_blank">CONTACT US</NavigationExternalLink>
            {/*CONTACT US*/}
            {/*<SubUlLinks>*/}
            {/*  <NavigationItem>*/}
            {/*    <NavigationExternalLink href="https://www.mercurydrug.com/reach-us.html" target="_blank">Reach Us</NavigationExternalLink>*/}
            {/*  </NavigationItem>*/}
            {/*  <NavigationItem>*/}
            {/*    <NavigationExternalLink href="https://www.mercurydrug.com/doctalk.html" target="_blank">DocTalk</NavigationExternalLink>*/}
            {/*  </NavigationItem>*/}
            {/*  <NavigationItem>*/}
            {/*    <NavigationExternalLink href="https://www.mercurydrug.com/pharmrs.html" target="_blank">PharMrs</NavigationExternalLink>*/}
            {/*  </NavigationItem>*/}
            {/*  <NavigationItem>*/}
            {/*    <NavigationExternalLink href="https://www.mercurydrug.com/price-inquiry.html" target="_blank">Price Inquiry</NavigationExternalLink>*/}
            {/*  </NavigationItem>*/}
            {/*  <NavigationItem>*/}
            {/*    <NavigationExternalLink href="https://www.mercurydrug.com/customer-feedback.html" target="_blank">Customer Feedback</NavigationExternalLink>*/}
            {/*  </NavigationItem>*/}
            {/*</SubUlLinks>*/}
          </NavigationItem>
        </NavigationUl>
      </NavigationContent>
    </NavigationContainer>
  )
}

function toggleMyLinks(e) {
  let x = document.getElementById("nav-ul");
  if (x.style.display === "block")
    x.style.display = "none";
  else
    x.style.display = "block";
}

export default NavigationMenuMobile;
