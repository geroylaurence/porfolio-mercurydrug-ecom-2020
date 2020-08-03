import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { account, component, path, ...otherProps } = this.props;

    if (account.authenticated) {
      if (!account.verified && path === '/my-account') {
        return <Redirect to="/account-unverified" />
      }
      if (!account.verified && path === '/checkout') {
        return <Redirect to="/account-unverified" />
      }

      return <Route {...otherProps} component={component} />
    }

    return <Redirect to="/" />
  }
}

// Redux
const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps, {})(PrivateRoute);