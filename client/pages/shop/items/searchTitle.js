import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import ProductListComponent from '../productListComponent/listPaginated';
import ProductDisplay from './productDisplay';
import SubHeader from '../../../ui/subheader';
import { HrLight } from '../../../ui/hr';

class SearchTitle extends React.Component {
  constructor(props) {
    super(props);

    // route query
    // *resultBy -> string

    this.renderProductsByTitle = this.renderProductsByTitle.bind(this);
  }
  renderProductsByTitle() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const resultBy = params.get('resultBy');
    const resultOptions = {
      brand: 'resultsByBrands',
      genericName: 'resultsByGenericNames'
    };

    if (
      (resultBy && resultBy !== `` && resultBy !== null && resultBy !== undefined) &&
      (resultOptions.hasOwnProperty(resultBy)) &&
      (this.props.products.search.resultsByBrands !== null || this.props.products.search.resultsByGenericNames !== null)
    ) {
      let productsByResult = this.props.products.search[resultOptions[resultBy]].find(result => `${result.id}` === `${this.props.match.params.id}`);
      
      if (productsByResult === null) return null;
      return (
        <div className="row mb-4">
          <div className="col-md-12">
            <SubHeader bold>
              { productsByResult.defaultName }
            </SubHeader>
            <HrLight />
          </div>
          <div className="col-md-12">
            <ProductListComponent items={productsByResult.products} />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }
  render() {
    return (
      <div className="container">
        { this.renderProductsByTitle() }
      </div>
    );
  }
}

// redux
const mapStateToProps = state => ({
  products: state.products,
  shopCategory: state.shopCategory,
});

const mapDispatchToProps = dispatch => ({
  productSelectView: (data) => dispatch({ type: 'SET_PRODUCT_SELECT_VIEW', data }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTitle);