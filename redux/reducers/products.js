import {
  PRODUCT_LIST_BY_CATEGORY_LOADING,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_ERROR,

  PRODUCT_SEARCH_ALL_LOADING,
  PRODUCT_SEARCH_ALL_SUCCESS,
  PRODUCT_SEARCH_ALL_FAILED,
  CLEAR_PRODUCT_SEARCH_ALL,
} from '../actions/products';

import { decimalPresentable } from '../../client/utils/helper';
import ProductBoxImage from '../../assets/images/dummy/product-box.png';

const initialState = {  
  loading: false,
  data: null,  
  search: {
    searchTerm: '',
    hasResults: null, // <- default value 0 and 1
    resultsByProducts: null,
    resultsByBrands: null,
    resultsByGenericNames: null,
  },
  error: null,
};

function productsDataMapping({
  id,
  sku,
  name,
  price,
  isRxFlag,
  generics,
  ...others
}) {
  const [image] = others.images;
  let productData = {
    id,
    sku,
    name,
    price,
    pricePresentable: decimalPresentable(price.toFixed(2)),
    isRxFlag,
    generics,
    image: ProductBoxImage,
  }
  return productData;
}

function resultsByBrandsMapping({
  brandName,
  brandId,
  productCount,
  products,
}) {
  return {
    brandName,
    brandId,
    productCount,
    products: products.map(productsDataMapping),
    defaultName: brandName,
    id: brandId,
  };
}

function resultsByGenericNamesMapping({
  genericName,
  genericId,
  productCount,
  products,
}) {
  return {
    genericName,
    genericId,
    productCount,
    products: products.map(productsDataMapping),
    defaultName: genericName,
    id: genericId,
  };
}

function products(state = initialState, action) {
  switch(action.type) {
    case PRODUCT_LIST_BY_CATEGORY_LOADING: 
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_LIST_BY_CATEGORY_SUCCESS: {
      const reMapProducts = action.data.map(productsDataMapping);

      return {
        ...state,
        loading: false,
        data: reMapProducts,
      };
    }
    case PRODUCT_LIST_BY_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case PRODUCT_SEARCH_ALL_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case PRODUCT_SEARCH_ALL_SUCCESS: {
      const {
        searchTerms,
        hasResults,
        resultsByProducts,
        resultsByBrands,
        resultsByGenericNames,
      } = action.data;

      let searchData = { searchTerm: searchTerms, hasResults: 0 };
      if (resultsByBrands && resultsByBrands !== null && resultsByBrands !== undefined) {
        let doc = resultsByBrands.map(resultsByBrandsMapping);
        searchData = {
          ...searchData,
          resultsByBrands: doc,
          hasResults: 1
        };
      }
      if (resultsByGenericNames && resultsByGenericNames !== null && resultsByGenericNames !== undefined) {
        let doc = resultsByGenericNames.map(resultsByGenericNamesMapping);
        searchData = {
          ...searchData,
          resultsByGenericNames: doc,
          hasResults: 1
        };
      }
      if (resultsByProducts && resultsByProducts !== null && resultsByProducts !== undefined) {
        searchData = {
          ...searchData,
          resultsByProducts: resultsByProducts.map(productsDataMapping),
          hasResults: 1
        };
      }

      return {
        ...state,
        loading: false,
        search: {
          ...state.search,
          ...searchData,
        },
      };
    }
    case PRODUCT_SEARCH_ALL_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case CLEAR_PRODUCT_SEARCH_ALL: 
      return initialState;
    default:
      return state;
  }
}

export default products;
