import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'react-breadcrumbs';

function PrivateCrumbRoute({
  component: Component,
  render,
  ...props
}) {
  const { account, path } = props;

  if (account.authenticated) {
    if (!account.verified && path === '/my-account') {
      return <Redirect to="/account-unverified" />
    }
    if (!account.verified && path === '/checkout') {
      return <Redirect to="/account-unverified" />
    }

    return (
      <Route
        {...props}
        render={routeProps => (
          <Breadcrumb data={{
            title: props.title,
            pathname: routeProps.match.url,
            search: routeProps.location.search,
          }}
          >
            <Component {...routeProps} />
          </Breadcrumb>
        )}
      />
    )
  }

  return <Redirect to="/" />
}

// Redux
const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps)(PrivateCrumbRoute);