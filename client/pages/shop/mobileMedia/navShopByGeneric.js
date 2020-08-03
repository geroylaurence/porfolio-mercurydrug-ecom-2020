import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StyledContainer from '../../../components/layouts/styledContainer';
import { H6Grey } from '../../../ui/headers';
import { ChevronDown } from '../../../ui/fas/chevron';
import { 
  ShopOptNavContent,
  ShopOptNavUl,
  ShopOptNavItem,
  ShopOptNavHRef,
  ShopOptReactLink,
  BlackSpace,
} from './styled';
import theme from '../../../ui/styles/theme';

class ShopByGeneric extends React.Component {
	constructor(props) {
    super(props);

    this.state = { searchTerm: '' };
  }
  render() {
    return (          
      <StyledContainer itemsCenter>
        <StyledContainer width="inherit" marginBottom="sm">
          <input 
            className="form-control" 
            onChange={e => {
              const { value } = e.target;
              this.setState({ searchTerm: value });
            }}
          />
        </StyledContainer>
        <StyledContainer marginBottom="sm">
          <Link to={`${(this.state.searchTerm !== '') ? `/shop/search/${this.state.searchTerm}?byBrand=yes&byGenerics=yes` : `#`}`}>
            <button type="button">
              &nbsp;&nbsp;Search&nbsp;&nbsp;
            </button>
          </Link>
        </StyledContainer>
      </StyledContainer>
    )
  }
}

export default ShopByGeneric;
