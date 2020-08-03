import React from 'react';
import { connect } from 'react-redux';

import { H5Grey } from '../../ui/headers';
import Link from '../../ui/link';

class NavOrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="d-flex flex-column mb-4">
        <H5Grey bold>
          <Link inheritColor to="/shop/order-history">
            Shop by Order History
          </Link>
        </H5Grey>
      </div>
    )
  }
}

export default NavOrderHistory;