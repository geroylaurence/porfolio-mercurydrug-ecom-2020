import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactJSPagination from "react-js-pagination";

const PaginatorContainer = styled.div`
  .pagination {
    justify-content: center;
    display: flex;
    padding: 0!important;
    margin: ${props => props.theme.margin.xl}!important;
  }
  .pagination > li > a {
    color: ${props => props.theme.colors.grey};
    padding: 8px 16px;
    text-decoration: none;
    :hover { background-color: ${props => props.theme.colors.shadowColor};}
  }
  .pagination > li.active {
    a {
      background-color: ${props => props.theme.colors.shadowColor};
      color: ${props => props.theme.colors.primary};
    }
  } 
`;

class Paginator extends React.Component {
  constructor(props) {
    super(props);

    // totalItemsCount -> integer
    // callBackEffect -> function
    this.state = {
      activePage: 1
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.setDataCountCeil = this.setDataCountCeil.bind(this);
  }
  setDataCountCeil() {
    const parsedTotalItems = parseInt(this.props.totalItemsCount) || 0;
    return Math.ceil(this.props.totalItemsCount / this.props.itemsCountPerPage)
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, () => {
      if (this.props.callBackEffect && this.props.callBackEffect !== null) this.props.callBackEffect(pageNumber);
    });
  }
  render() {
    return (
      <PaginatorContainer>
        <ReactJSPagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={this.props.totalItemsCount || 1}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </PaginatorContainer>
    );
  }
}

Paginator.propTypes = {
  totalItemsCount: PropTypes.number,
  callBackEffect: PropTypes.func,
}

// redux
const mapStateToProps = state => ({
  itemsCountPerPage: 9
});

export default connect(mapStateToProps, null, null, {forwardRef : true})(Paginator);