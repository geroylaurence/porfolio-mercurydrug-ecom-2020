import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import StyledContainer from '../../../components/layouts/styledContainer';
import { TextPrimary, TextGrey } from '../../../ui/text';
import SmallText from '../../../ui/smallText';
import Paginator from '../../../ui/paginator';

class ProductListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paginatedData: null,
    };

    // items -> array object
    this.nodePaginator = null;
    this.paginatedData = null;
  }
  componentDidMount() {
    if (this.props.items) {
      const ceilMarker = this.nodePaginator.setDataCountCeil();
      this.paginatedData = parseInt(ceilMarker) ? 
        ((inBoundData) => {
          let marker = 0;
          const pushNUmber = this.nodePaginator.props.itemsCountPerPage;
          const groups = {};

          do {
            groups[`${Object.entries(groups).length + 1}`] = inBoundData.slice(marker, (marker + pushNUmber));
            marker += pushNUmber
          }
          while(inBoundData.slice(marker, (marker + pushNUmber)).length !== 0)

          return groups;
        })(this.props.items) : null;

      if (this.paginatedData !== null) this.setState({ paginatedData: this.paginatedData[`1`] })
    }
  }
  render() {
    return (
      <StyledContainer>
        <StyledContainer
          itemsCenter
          flexDirection="row"
          flexWrap
          width="inherit"
          marginBottom="lg"
          // width="870px"
        >
          { this.state.paginatedData !== null &&
            this.state.paginatedData.map((item, i) => (
              <NavLink
                key={i}
                className="text-decoration-none"
                to={`/shop/view/${item.id}`}
                onClick={e => { this.props.productSelectView(item) }}
              >
                <StyledContainer
                  width="290px"
                  itemsCenter
                  marginBottom="lg"
                  dontGrow
                >
                  <img 
                    width="200px" 
                    src={item.image} 
                  />
                  <StyledContainer
                    marginLeft="md"
                    marginRight="md"
                    dontGrow
                   >
                    {/*{ item.generics !== null &&*/}
                    {/*  <SmallText*/}
                    {/*    large*/}
                    {/*    bold*/}
                    {/*    withDefaultBorder*/}
                    {/*    verticalPadding="xs"*/}
                    {/*  >*/}
                    {/*    { item.generics.genericName }*/}
                    {/*  </SmallText>*/}
                    {/*}*/}
                    <TextGrey textCentered>
                      {item.name}
                    </TextGrey>
                    <TextPrimary textCentered>
                      <span className="mr-2">
                        P
                      </span>
                      { item.pricePresentable }
                    </TextPrimary>
                  </StyledContainer>
                </StyledContainer>
              </NavLink>
            ))
          }
        </StyledContainer>
        <Paginator 
          ref={node => this.nodePaginator = node}
          totalItemsCount={(this.props.items && this.props.items !== null) ? this.props.items.length : 0}
          callBackEffect={pageNumber => this.setState({ paginatedData: this.paginatedData[`${pageNumber}`] })}
        />
      </StyledContainer>
    );
  }
}

ProductListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// redux
const mapStateToProps = state => ({
  app: state.app,
});
const mapDispatchToProps = dispatch => ({
  productSelectView: (data) => dispatch({ type: 'SET_PRODUCT_SELECT_VIEW', data }),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListComponent);
