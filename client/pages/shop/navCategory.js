import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ChevronDown } from '../../ui/fas/chevron';
import { H5Grey } from '../../ui/headers';
import {
  NavContainer,
  BrandShopCategory,
  ItemShopCategory,
  NavShopCategory,
  SelectShopCategory,
} from '../../ui/navShopCategory';

class NavCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: {},
    };
  }
  renderItemShopCategory(category = {}) {
    let NestedNavShopCategory = null;
    let ExpandNavShopCategory = null;
    let setSelectedCategory = () => this.props.setSelectedCategory(category);
    let NavItemContainer = props => (<Link onClick={e => setSelectedCategory()} to={`/shop/category/${category.categoryKey}`}>{props.children}</Link>);

    return (
      <ItemShopCategory key={category.categoryKey}>
        <NavItemContainer>
          <SelectShopCategory>
            <div className="d-flex align-items-stretch">
              <span>
                { category.name }
              </span>
              { ExpandNavShopCategory }
            </div>
          </SelectShopCategory>
        </NavItemContainer>
      </ItemShopCategory>
    )
  }
  render() {
    return (
      <NavContainer className="d-flex flex-column mb-4">
        <H5Grey bold>
          Shop by Category
        </H5Grey>
        <NavShopCategory>
          { this.props.shopCategory.data !== null && 
            this.props.shopCategory.data.length > 0 &&
            this.props.shopCategory.data.map((category, i) => this.renderItemShopCategory(category))
          }
        </NavShopCategory>
      </NavContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavCategory);