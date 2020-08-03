import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import StyledContainer from '../../../components/layouts/styledContainer';
import ProductListComponent from '../productListComponent/listPaginated';
import SmallText from '../../../ui/smallText';
import SubHeader from '../../../ui/subheader';
import { TextPrimary, TextGrey } from '../../../ui/text';
import { HrLight } from '../../../ui/hr';
import ProductDisplay from './productDisplay';
import Inquiry from '../inquiry';
import { 
  ResultsTitleList,
  ItemsContentMediaQuery,
} from './styled';

//misc
import { 
  productSearchAll,
  productSearchByBrandOrGenerics,
} from '../../../../model/products';
import {
  PRODUCT_SEARCH_ALL_LOADING,
  PRODUCT_SEARCH_ALL_SUCCESS,
  PRODUCT_SEARCH_ALL_FAILED,
  CLEAR_PRODUCT_SEARCH_ALL,
} from '../../../../redux/actions/products';

class Search extends React.Component {
  constructor(props) {
    super(props);

    /*route query*/
    // *byBrand -> string -> default 'yes'
    // *byGenerics -> string -> default 'yes'

    this.productSearchAll = this.productSearchAll.bind(this);
  }
  productSearchAll(searchTerm) {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const byBrand = params.get('byBrand');
    const byGenerics = params.get('byGenerics');

    let apiProductSearch = (byBrand && byBrand !== '' && byGenerics && byGenerics !== '') ? productSearchByBrandOrGenerics : productSearchAll;

    this.props.dispatch({ type: CLEAR_PRODUCT_SEARCH_ALL }); 
    this.props.dispatch({ type: PRODUCT_SEARCH_ALL_LOADING });
    apiProductSearch(searchTerm)
    .then(result => {
      this.props.dispatch({ type: PRODUCT_SEARCH_ALL_SUCCESS, data: result.data });
    })
    .catch(err => {
      this.props.dispatch({ type: PRODUCT_SEARCH_ALL_FAILED, error: err });
    });
  }
  componentDidUpdate(prevProps) {
    if(this.props.match.params.searchTerm !== prevProps.match.params.searchTerm) {
      const { searchTerm } = this.props.match.params; 
      this.productSearchAll(searchTerm);
    }
  }
  componentDidMount() {
    if (!this.props.products.loading && this.props.shopCategory.data !== null) {
      const { searchTerm } = this.props.match.params; 
      this.productSearchAll(searchTerm);
    }
  }
  render() {
    return (
      <ItemsContentMediaQuery>
        { !this.props.products.loading &&
          <StyledContainer marginBottom="md">
            <StyledContainer>
              <TextPrimary>
                Search Result(s): {this.props.products.search.searchTerm}
              </TextPrimary>
              { this.props.products.search.resultsByBrands !== null &&
                <StyledContainer marginLeft="md">
                  <StyledContainer>
                    <SmallText primary bold>
                      Brand(s):
                    </SmallText>
                    <StyledContainer>
                      <ResultsTitleList>
                        { this.props.products.search.resultsByBrands.map((data, i) => (
                            <li key={i}>
                              <Link to={`/shop/search-title/${data.brandId}?resultBy=brand`}>
                                <SmallText primary bold>
                                  { data.brandName }
                                </SmallText>
                              </Link>
                            </li>
                          ))
                        }
                      </ResultsTitleList>
                    </StyledContainer>
                  </StyledContainer>
                </StyledContainer>
              }
              { this.props.products.search.resultsByGenericNames !== null &&
                <StyledContainer marginLeft="md">
                  <StyledContainer>
                    <SmallText primary bold>
                      Generic Name(s):
                    </SmallText>
                    <StyledContainer>
                      <ResultsTitleList>
                        { this.props.products.search.resultsByGenericNames.map((data, i) => (
                            <li key={i}>
                              <Link to={`/shop/search-title/${data.genericId}?resultBy=genericName`}>
                                <SmallText primary bold>
                                  { data.genericName }
                                </SmallText>
                              </Link>
                            </li>
                          ))
                        }
                      </ResultsTitleList>
                    </StyledContainer>
                  </StyledContainer>
                </StyledContainer>
              }
            </StyledContainer>
          </StyledContainer>
        }
        { !this.props.products.loading &&
           this.props.products.search.resultsByProducts !== null &&
            <StyledContainer>
              <StyledContainer>
                <ProductListComponent items={this.props.products.search.resultsByProducts} />
              </StyledContainer>
            </StyledContainer>
        }
        { !this.props.products.loading &&
          this.props.products.search.hasResults === 0 &&
          <StyledContainer marginBottom="md">
            <StyledContainer>
              <TextGrey>
                Apoligies, no match found.
              </TextGrey>
              <TextGrey>
                For assistance, please message us.
              </TextGrey>
              <Inquiry />
            </StyledContainer>
          </StyledContainer>
        }
        { this.props.products.loading &&
          <StyledContainer>
            <div className="spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </StyledContainer>
        }
      </ItemsContentMediaQuery>
    )
  }
}

// redux
const mapStateToProps = state => ({
  app: state.app,
  shopCategory: state.shopCategory,
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  productSelectView: (data) => dispatch({ type: 'SET_PRODUCT_SELECT_VIEW', data }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);