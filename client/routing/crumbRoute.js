import React from 'react';
import { Route } from 'react-router-dom';
import { Breadcrumb } from 'react-breadcrumbs';

function CrumbRoute({
  component: Component,
  render,
  ...props
}) {
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

export default CrumbRoute;