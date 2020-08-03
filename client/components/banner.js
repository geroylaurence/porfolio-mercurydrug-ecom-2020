import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import bannerMyAccount from '../../assets/banner/my-account.jpg';
import ScreenContent from './screenContent';

// LABEL
import LABEL_TEMPLATE from '../assets/labelTemplate';

const BannerHeader = styled.h1`
  color: #fff;
  font-family: 'proxima_nova_alt_rgbold';
  font-size: 45px;
  text-shadow: 1px 1px 7px rgba(150, 150, 150, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const BannerWrapper = styled.div`
  position: relative;
  z-index: -1;
  height: 200px;
  width: 100%;
  background: url(${bannerMyAccount}) no-repeat;
  padding-top: 5em;
  // margin-bottom: 2em;
`;

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.renderBannerWrapper = this.renderBannerWrapper.bind(this);
  }
  renderBannerWrapper() {
    // switch (this.props.location.pathname) {
    //   case `/my-account`:
    //     return (
    //       <BannerHeader>
    //         My Account 
    //       </BannerHeader>
    //     )
    //   ;
    //   default: 
    //     return (
    //       <BannerHeader>
    //         Mercury Drug Online Store 
    //       </BannerHeader>
    //     )
    // }
    let masterPath = this.props.location.pathname;
    if (RegExp("my-account").test(masterPath)) {
      return (
        <BannerHeader>
          My Account 
        </BannerHeader>
      )
    }
    if (RegExp("checkout").test(masterPath)) {
      return (
        <BannerHeader>
          Mercury Drug Online Checkout
        </BannerHeader>
      )
    }

    return (
      <BannerHeader>
        { LABEL_TEMPLATE.SHOP_BANNER_TITLE }
      </BannerHeader>
    );
  }
  render() {
    return (
      <BannerWrapper>
        <ScreenContent>
          { this.renderBannerWrapper() }
        </ScreenContent>
      </BannerWrapper>
    )
  }
}

export default withRouter(Banner);
