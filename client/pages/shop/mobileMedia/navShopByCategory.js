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

class NavShopByCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: {},
      collapse: false,
    };

    this.renderItemShopCategory = this.renderItemShopCategory.bind(this);
  }
  renderItemShopCategory(category = {}) {
    let NestedNavShopCategory = null;
    let ExpandNavShopCategory = <React.Fragment><BlackSpace />&nbsp;&nbsp;</React.Fragment>;
    let setSelectedCategory = () => this.props.setSelectedCategory(category);
    let NavItemContainer = props => {
      if (props.setSelectedCategory === null) {
        return (
          <ShopOptNavHRef 
            onClick={e => {
              this.setState({
                selectedCategory: {
                  ...this.state.selectedCategory,
                  [`${category.categoryKey}`]: !this.state.selectedCategory[`${category.categoryKey}`],
                }
              });
            }}
          >
            <H6Grey>
              { ExpandNavShopCategory }
              { category.name }
            </H6Grey>
          </ShopOptNavHRef>
        )
      }

      return (
        <ShopOptReactLink 
          to={`/shop/category/${category.categoryKey}`}
          onClick={e => {
            this.setState({
              selectedCategory: {
                ...this.state.selectedCategory,
                [`${category.categoryKey}`]: !this.state.selectedCategory[`${category.categoryKey}`],
              },
              collapse: props.setSelectedCategory !== null
            });

            props.setSelectedCategory();
          }}
        >
          <H6Grey>
            {props.children}
          </H6Grey>
        </ShopOptReactLink>
      )
    };

    if (category.hasOwnProperty('subCategories') && category.subCategories.length > 0) {
      NestedNavShopCategory = (
        <StyledContainer paddingLeft="sm">
          <ShopOptNavUl>
            { category.subCategories.map((subCategory, key) => this.renderItemShopCategory(subCategory)) }
          </ShopOptNavUl>
        </StyledContainer>
      );
      ExpandNavShopCategory = <React.Fragment><ChevronDown />&nbsp;&nbsp;</React.Fragment>

      setSelectedCategory = null;
    }

    return (
      <ShopOptNavItem key={category.categoryKey}>
        <NavItemContainer {...{setSelectedCategory, }}>
          { ExpandNavShopCategory }
          { category.name }
        </NavItemContainer>
        { this.state.selectedCategory && 
          this.state.selectedCategory[`${category.categoryKey}`] &&
          NestedNavShopCategory
        }
      </ShopOptNavItem>
    )
  }
  render() {
    return (
      <React.Fragment>
        { !this.state.collapse &&
          <ShopOptNavContent medScrollY>
            <ShopOptNavUl>
              { this.props.shopCategory.data !== null && 
                this.props.shopCategory.data.length > 0 &&
                this.props.shopCategory.data.map((category, i) => this.renderItemShopCategory(category))
              }
            </ShopOptNavUl>
          </ShopOptNavContent>
        }
        <StyledContainer itemsCenter>
          <H6Grey bold>
            <ShopOptNavHRef onClick={e => { this.setState({ collapse: !this.state.collapse }) }}>
              { (this.state.collapse) ? 
                <span className="fa fa-angle-double-down" />
                :
                <span className="fa fa-angle-double-up" />
              }
            </ShopOptNavHRef>
          </H6Grey>
        </StyledContainer>
      </React.Fragment>
    );
  }
}

// REDUX
const mapStateToProps = state => ({
  app: state.app,
  shopCategory: state.shopCategory,
});

const mapDispatchToProps = dispatch => ({
  setSelectedCategory: (data = {}) => dispatch({ type: 'SET_SELECTED_CATEGORY', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavShopByCategory);