import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StyledContainer from '../../../components/layouts/styledContainer';
import { HrLight } from '../../../ui/hr';
import SubHeader from '../../../ui/subheader';

import ProductListComponent from '../productListComponent/listPaginated';
import ProductDisplay from './productDisplay';
import BannerCarousel from './bannerCarousel';
import { ItemsContentMediaQuery } from './styled';

// misc
import { categoryBanner, productListByCategory } from '../../../../model/products';

import {
  PRODUCT_LIST_BY_CATEGORY_LOADING,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_ERROR,
} from '../../../../redux/actions/products';
import {
  SET_SELECTED_CATEGORY_ONSUCCESS_CATEGORY_LIST,
  SET_CATEGORY_BANNER_TOP,
  SET_CATEGORY_BANNER_BOTTOM,
  categoryBannerType,
} from '../../../../redux/actions/shopCategory';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.tag = { productList: 'product-list', bannerTop: 'banner-top', bannerBottom: 'banner-bottom' };
    this.generalDataFetching = this.generalDataFetching.bind(this);
    this.generalDataIteration = this.generalDataIteration.bind(this);
    this.beginComponentAction = this.beginComponentAction.bind(this);
  }
  generalDataFetching({
    categoryKey = null,
    categoryId,
  }) {
    // product-list
    // banners
    const FetchInterface = function() { this.tag='';this.success=false;this.data=null;this.error=null };

    const fetchProductList = new Promise((resolve, reject) => {
      const itfFetchProductList = new FetchInterface();
      itfFetchProductList.tag = this.tag.productList;
      productListByCategory(categoryKey)
      .then(result => {
        // const [{products}] = result.data;
        // itfFetchProductList.success = true;  
        // itfFetchProductList.data = products;
        itfFetchProductList.success = true;  
        itfFetchProductList.data = result.data;
        resolve(itfFetchProductList);
      })
      .catch(err => {
        itfFetchProductList.success = false;
        itfFetchProductList.error = err.error;
        resolve(itfFetchProductList);
      });
    });

    const categoryBannerTop = {
      bannerType: categoryBannerType.categoryTop,
      categoryBanner,
    };
    const categoryBannerBottom = {
      bannerType: categoryBannerType.categoryBottom,
      categoryBanner,
    };

    const fetchCategoryBannerTop = new Promise((resolve, reject) => {
      const itfFetchCategoryBannerTop = new FetchInterface();
      itfFetchCategoryBannerTop.tag = this.tag.bannerTop;
      categoryBannerTop.categoryBanner({
        categoryId: categoryId,
        bannerType: categoryBannerTop.bannerType
      })
      .then(result => {
        itfFetchCategoryBannerTop.success = true;
        itfFetchCategoryBannerTop.data = result.data;
        resolve(itfFetchCategoryBannerTop);
      })
      .catch(err => {
        itfFetchCategoryBannerTop.success = false;
        itfFetchCategoryBannerTop.error = err.error;
        resolve(itfFetchCategoryBannerTop);
      });
    });

    const fetchCategoryBannerBottom = new Promise((resolve, reject) => {
      const itfFetchCategoryBannerBottom = new FetchInterface();
      itfFetchCategoryBannerBottom.tag = this.tag.bannerBottom;
      categoryBannerBottom.categoryBanner({
        categoryId: categoryId,
        bannerType: categoryBannerBottom.bannerType
      })
      .then(result => {
        itfFetchCategoryBannerBottom.success = true;
        itfFetchCategoryBannerBottom.data = result.data;
        resolve(itfFetchCategoryBannerBottom);
      })
      .catch(err => {
        itfFetchCategoryBannerBottom.success = false;
        itfFetchCategoryBannerBottom.error = err.error;
      });
    });

    this.props.productListByCategoryLoading();
    Promise.all([
      fetchProductList,
      fetchCategoryBannerTop,
      fetchCategoryBannerBottom,
    ])
    .then(result => {
      result.forEach(this.generalDataIteration);
    })
    .catch(err => {
      console.log(err);
    });
  }
  generalDataIteration(result) {
    if (result.tag === this.tag.productList) {
      if (result.success) this.props.productListByCategorySuccess(result.data);
      else this.props.productListByCategoryError(result.error);
    }

    if (result.tag === this.tag.bannerTop && result.success) {
      this.props.setCategoryBannerTop(result.data);
    }
    if (result.tag === this.tag.bannerBottom && result.success)
      this.props.setCategoryBannerBottom(result.data);
  }
  beginComponentAction(updatedPropsMountedOrReceived) {
    this.generalDataFetching({
      categoryKey: updatedPropsMountedOrReceived.categoryId,
      categoryId: updatedPropsMountedOrReceived.categoryId,
    });
  }
  componentDidUpdate(prevProps) {
    // product-list new-set
    if (this.props.match.params.categoryId) {
      if (prevProps.match.params.categoryId !== this.props.match.params.categoryId) {
        const params = this.props.match.params;
        this.beginComponentAction(params);
      }
    }
  }
  componentDidMount() {
    // product-list
    if (this.props.shopCategory.data !== null) {
      let { categoryId = `12` } = this.props.match.params;
      this.props.setSelectCategoryOnSuccessCategoryList(categoryId);
      this.beginComponentAction({ categoryId });
    }
  }
  render() {
    return (
      <ItemsContentMediaQuery>
        { this.props.shopCategory.bannerTop !== null &&
          this.props.shopCategory.bannerTop.length > 0 &&
          <StyledContainer marginBottom="sm">
            <StyledContainer>
              <BannerCarousel
                key={new Date().getTime()}
                id="categoryBannerTop"
                banners={this.props.shopCategory.bannerTop.map(({imageFile, linkUrl}) => ({imageFile, linkUrl}))}
              />
            </StyledContainer>
          </StyledContainer>
        }
        <StyledContainer marginBottom="sm">
          <StyledContainer>
            <SubHeader bold>
              { (this.props.shopCategory.selectedCategory !== null) &&
                this.props.shopCategory.selectedCategory.name
              }
            </SubHeader>
            <HrLight />
          </StyledContainer>
          { this.props.products.loading &&
            <div className="spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
        </StyledContainer>
        { !this.props.products.loading &&
          this.props.products.data !== null &&
          <StyledContainer marginBottom="sm">
            <ProductListComponent items={this.props.products.data} />
          </StyledContainer>
        }
        { this.props.shopCategory.bannerBottom !== null &&
          this.props.shopCategory.bannerBottom.length > 0 &&
          <StyledContainer marginBottom="sm">
            <StyledContainer>
              <BannerCarousel
                key={new Date().getTime()}
                id="categoryBannerBottom"
                banners={this.props.shopCategory.bannerBottom.map(({imageFile, linkUrl}) => ({imageFile, linkUrl}))}
              />
            </StyledContainer>
          </StyledContainer>
        }
      </ItemsContentMediaQuery>
    );
  }
}

// REDUX
const mapStateToProps = state => ({
  app: state.app,
  shopCategory: state.shopCategory,
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  setSelectedCategory: (data = {}) => dispatch({ type: 'SET_SELECTED_CATEGORY', data }),
  setSelectCategoryOnSuccessCategoryList: data => dispatch({ type: SET_SELECTED_CATEGORY_ONSUCCESS_CATEGORY_LIST, data }),

  productListByCategoryLoading: () => dispatch({ type: PRODUCT_LIST_BY_CATEGORY_LOADING }),
  productListByCategorySuccess: (data) => dispatch({ type: PRODUCT_LIST_BY_CATEGORY_SUCCESS, data }),
  productListByCategoryError: (error) => dispatch({ type: PRODUCT_LIST_BY_CATEGORY_ERROR, error }),

  setCategoryBannerTop: (data) => dispatch({ type: SET_CATEGORY_BANNER_TOP, data }),
  setCategoryBannerBottom: (data) => dispatch({ type: SET_CATEGORY_BANNER_BOTTOM, data }),

  productSelectView: (data) => dispatch({ type: 'SET_PRODUCT_SELECT_VIEW', data }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
