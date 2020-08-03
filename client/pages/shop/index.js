import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import universal from 'react-universal-component';

import StyledContainer from '../../components/layouts/styledContainer';
import MediaQueryContainer from '../../components/layouts/mediaQueryContainer';
import MediaQueryFlex from '../../components/layouts/mediaQueryFlex';
import NavCategory from './navCategory';
import NavGenericBrand from './navGenericBrand';
import NavOrderHistory from './navOrderHistory';
import SideWidget from './sideWidget';

// child-pages
const List = universal(import('./items/list'));
const SKU = universal(import('./items/sku'));
const Search = universal(import('./items/search'));
const SearchTitle = universal(import('./items/searchTitle'));

import MobileMedia from './mobileMedia';

// misc
import { categoryList } from '../../../model/products';

class Shop extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.shopCategory.loading) {
      this.props.categoryListLoading();
      categoryList()
      .then(result => {
        this.props.categoryListSuccess(result.data);
      })
      .catch(err => {
        this.props.categoryListError(err.error);
      });
    }
  }
  render() {
    return (
      <StyledContainer marginTop="sm">
        <MediaQueryFlex minHeight="1000px">
          { this.props.shopCategory.loading &&
            <div className="spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          { !this.props.shopCategory.loading && this.props.shopCategory.data !== null &&
            <React.Fragment>
              <MediaQueryContainer desktopQuery width="200px">
                <NavCategory /><hr />
                <NavGenericBrand /><hr />
                { this.props.account.authenticated && 
                  <React.Fragment>
                    <NavOrderHistory /><hr />
                  </React.Fragment>
                }
              </MediaQueryContainer>
              <MediaQueryContainer mobileQuery>
                <MobileMedia />
              </MediaQueryContainer>
              <StyledContainer>
                <Switch>
                  <Route key="list-main" exact path={`${this.props.match.path}`} component={List} />
                  <Route key="list-query" path={`${this.props.match.path}/category/:categoryId`} component={List} />
                  <Route path={`${this.props.match.path}/view/:id`} component={SKU} />
                  <Route path={`${this.props.match.path}/search/:searchTerm`} component={Search} />
                  <Route path={`${this.props.match.path}/search-title/:id`} component={SearchTitle} />
                  <Route component={null} />
                </Switch>
              </StyledContainer>
              <MediaQueryContainer desktopQuery width="250px">
                <SideWidget />
              </MediaQueryContainer>
            </React.Fragment>
          }
        </MediaQueryFlex>  
      </StyledContainer>
    );
  }
}

// redux
const mapStateToProps = state => ({
  account: state.account,
  shopCategory: state.shopCategory,
});

const mapDispatchToProps = dispatch => ({
  categoryListLoading: () => dispatch({ type: 'CATEGORY_LIST_LOADING' }),
  categoryListSuccess: (data) => dispatch({ type: 'CATEGORY_LIST_SUCCESS', data }),
  categoryListError: (error) => dispatch({ type: 'CATEGORY_LIST_ERROR', error }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
