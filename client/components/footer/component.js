import React from 'react';

import StyledContainer from '../layouts/styledContainer';
import ScreenContent from '../screenContent';
import theme from '../../ui/styles/theme';

import {
  FooterContainer,
  FooterItemLinks,
  FooterItemToConnect,
  FooterExternalLink,
  FaStack,
  MdText,
} from './styled';

function Footer(props) {
  return (
    <StyledContainer backgroundColor={theme.colors.grey}>
      <ScreenContent>
        <FooterContainer>
          <FooterItemLinks>
            <MdText>
              STORE SERVICES
            </MdText>
            <StyledContainer paddingTop="sm">
              <ul style={{'list-style-type': 'none', padding: '0px'}}>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/gamot-padala.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Gamot Padala
                  </FooterExternalLink>
                </li>
                {/*<li>*/}
                {/*  <FooterExternalLink href="https://www.mercurydrug.com/bantay-kalusugan.html" target="_blank"> */}
                {/*    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
                {/*    &nbsp;*/}
                {/*    Bantay Kalusugan Free Clinics*/}
                {/*  </FooterExternalLink>*/}
                {/*</li>*/}
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/discount-coupons.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Discount Coupons
                  </FooterExternalLink>
                </li>
                {/*<li>*/}
                {/*  <FooterExternalLink href="https://www.mercurydrug.com/drug-info-center.html" target="_blank"> */}
                {/*    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
                {/*    &nbsp;*/}
                {/*    Drug Information*/}
                {/*  </FooterExternalLink>*/}
                {/*</li>*/}
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/gift-certificate.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Gift Certificate
                  </FooterExternalLink>
                </li>
              </ul>
            </StyledContainer>
          </FooterItemLinks>
          <FooterItemLinks>
            <MdText>
              VALUE CARDS
            </MdText>
            <StyledContainer paddingTop="sm">
              <ul style={{'list-style-type': 'none', padding: '0px'}}>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/suki-card.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Suki Card
                  </FooterExternalLink>
                </li>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/suki-card-query.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Suki Points Query
                  </FooterExternalLink>
                </li>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/mercury-citicard.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Mercury Drug
                  </FooterExternalLink>
                </li>
              </ul>
            </StyledContainer>
          </FooterItemLinks>
          <FooterItemLinks>
            <MdText>
              ABOUT US
            </MdText>
            <StyledContainer paddingTop="sm">
              <ul style={{'list-style-type': 'none', padding: '0px'}}>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/corporate-information.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Corporate Information
                  </FooterExternalLink>
                </li>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/social-responsibility.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Social Responsibility
                  </FooterExternalLink>
                </li>
                <li>
                  <FooterExternalLink href="https://www.mercurydrug.com/careers.html" target="_blank"> 
                    <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>
                    &nbsp;
                    Career Opportunities
                  </FooterExternalLink>
                </li>
              </ul>
            </StyledContainer>
          </FooterItemLinks>
          {/*<FooterItemLinks>*/}
          {/*  <MdText>*/}
          {/*    CONTACT US*/}
          {/*  </MdText>*/}
          {/*  <StyledContainer paddingTop="sm">*/}
          {/*    <ul style={{'list-style-type': 'none', padding: '0px'}}>*/}
          {/*      <li>*/}
          {/*        <FooterExternalLink href="https://www.mercurydrug.com/reach-us.html" target="_blank"> */}
          {/*          <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
          {/*          &nbsp;*/}
          {/*          Reach Us*/}
          {/*        </FooterExternalLink>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <FooterExternalLink href="https://www.mercurydrug.com/doctalk.html" target="_blank"> */}
          {/*          <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
          {/*          &nbsp;*/}
          {/*          DocTalk*/}
          {/*        </FooterExternalLink>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <FooterExternalLink href="https://www.mercurydrug.com/pharmrs.html" target="_blank"> */}
          {/*          <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
          {/*          &nbsp;*/}
          {/*          PharMrs*/}
          {/*        </FooterExternalLink>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <FooterExternalLink href="https://www.mercurydrug.com/price-inquiry.html" target="_blank"> */}
          {/*          <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
          {/*          &nbsp;*/}
          {/*          Price Inquiry*/}
          {/*        </FooterExternalLink>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <FooterExternalLink href="https://www.mercurydrug.com/customer-feedback.html" target="_blank"> */}
          {/*          <i className= "fa fa-chevron-right"  style={{color: theme.colors.primary}}></i>*/}
          {/*          &nbsp;*/}
          {/*          Customer Feedback*/}
          {/*        </FooterExternalLink>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </StyledContainer>*/}
          {/*</FooterItemLinks>*/}
          {/*<FooterItemLinks>*/}
          {/*  <div id="fb-root"></div>*/}
          {/*  <script>*/}
          {/*      (function(d, s, id) {*/}
          {/*      var js, fjs = d.getElementsByTagName(s)[0];*/}
          {/*      if (d.getElementById(id)) return;*/}
          {/*      js = d.createElement(s);*/}
          {/*      js.id = id;*/}
          {/*      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";*/}
          {/*      fjs.parentNode.insertBefore(js, fjs);*/}
          {/*    }(document, 'script', 'facebook-jssdk'));*/}
          {/*  </script>*/}
          {/*  <div className="fb-page" data-adapt-container-width="true" data-height="70" data-hide-cover="false"*/}
          {/*       data-href="https://www.facebook.com/mercurydrugph/?fref=ts" data-show-facepile="true"*/}
          {/*       data-small-header="false" data-tabs="timeline">*/}
          {/*    <div className="fb-xfbml-parse-ignore">*/}
          {/*      <blockquote cite="https://www.facebook.com/mercurydrugph/?fref=ts">*/}
          {/*        <a href="https://www.facebook.com/mercurydrugph/?fref=ts">Mercury Drug Corporation</a>*/}
          {/*      </blockquote>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</FooterItemLinks>*/}
          <FooterItemLinks>
            <MdText>
              CONNECT WITH US
            </MdText>
            <StyledContainer paddingTop="sm">
              <ul style={{'list-style-type': 'none', padding: '0px'}}>
                <li>
                  <FooterExternalLink href="mailto:info@mercurydrug.com"> 
                    <FaStack>
                      <i className="fa fa-square fa-stack-2x email bg"></i> 
                      <i className="fa fa-envelope fa-stack-1x fa-inverse white"></i>
                    </FaStack>
                    info@mercurydrug.com
                  </FooterExternalLink>
                </li>
                <li>
                  <FooterExternalLink href="https://www.facebook.com/mercurydrugph" target="_blank">
                    <FaStack>
                      <i className="fa fa-square fa-stack-2x facebook" /> 
                      <i className="fa fa-facebook fa-stack-1x fa-inverse white" />
                    </FaStack>
                    /mercurydrugph
                  </FooterExternalLink>
                </li>
                <li>
                  <FooterExternalLink href="https://twitter.com/mercurydrugph" target="_blank">
                    <FaStack>
                      <i className="fa fa-square fa-stack-2x twitter"></i> 
                      <i className="fa fa-twitter fa-stack-1x fa-inverse white"></i>
                    </FaStack>
                    /mercurydrugph
                  </FooterExternalLink>
                </li>
              </ul>
            </StyledContainer>
          </FooterItemLinks>
        </FooterContainer>
      </ScreenContent>
    </StyledContainer>
  );
}

export default Footer;
