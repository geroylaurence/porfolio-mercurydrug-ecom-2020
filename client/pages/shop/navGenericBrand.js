import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { H5Grey } from '../../ui/headers';

class NavGenericBrand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }
  render() {
    return (
      <div className="d-flex flex-column mb-4">
        <H5Grey bold>
          Shop by Generic or Brand
        </H5Grey>
        <div className="mx-1">
          <div className="input-group input-group-sm mb-2">
            <input 
              className="form-control" 
              onChange={e => {
                const { value } = e.target;
                this.setState({ searchTerm: value });
              }}
            />
          </div>
          <div className="input-group input-group-sm mb-2 justify-content-center">
            <button type="button">
              &nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default NavGenericBrand;
