import React from 'react';

import StyledContainer from '../../../components/layouts/styledContainer';
import { H5Grey } from '../../../ui/headers';
import { 
  ShopOptNavContent,
  ShopOptNavUl,
  ShopOptNavItem,
  ShopOptNavHRef,
  ShopOptReactLink,
} from './styled';
import theme from '../../../ui/styles/theme';

import NavShopByCategory from './navShopByCategory';
import NavShopByGeneric from './navShopByGeneric';

class MobileMedia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shopOptSelected: null,
      shopOptCaption: null,  
    }
  }
  render() {
    return (
      <StyledContainer 
        disableFlex 
        backgroundColor={theme.colors.greySky}
        paddingLeft="sm"
        marginBottom="sm"
      >
        <ShopOptNavContent>
          { this.state.shopOptSelected !== null && this.state.shopOptCaption !== null &&
            <React.Fragment>
              <ShopOptNavHRef 
                href="#" 
                onClick={e => this.setState({ shopOptSelected: null, shopOptCaption: null })}
                withPaddingY
              >
                <H5Grey>
                  <span className="fa fa-minus" />
                  &nbsp;&nbsp;
                  { this.state.shopOptCaption }
                </H5Grey>
              </ShopOptNavHRef>
              { this.state.shopOptSelected === 'by-category' &&
                <NavShopByCategory />
              }
              { this.state.shopOptSelected === 'by-generic-brand' &&
                <NavShopByGeneric />
              }
            </React.Fragment>
          }
          { this.state.shopOptCaption === null &&
            <ShopOptNavUl>
              <ShopOptNavItem>
                <ShopOptNavHRef href="#" onClick={e => this.setState({ shopOptSelected: 'by-category', shopOptCaption: 'Shop by Category' })}>
                  <H5Grey>
                    <span className="fa fa-plus" />
                    &nbsp;&nbsp;
                    Shop by Category
                  </H5Grey>
                </ShopOptNavHRef>
              </ShopOptNavItem>
              <ShopOptNavItem>
                <ShopOptNavHRef href="#" onClick={e => this.setState({ shopOptSelected: 'by-generic-brand', shopOptCaption: 'Shop by Generic or Brand' })}>
                  <H5Grey>
                    <span className="fa fa-plus" />
                    &nbsp;&nbsp;
                    Shop by Generic or Brand
                  </H5Grey>
                </ShopOptNavHRef>
              </ShopOptNavItem>
            </ShopOptNavUl>
          }
        </ShopOptNavContent>
      </StyledContainer>
    );
  }
}

export default MobileMedia;