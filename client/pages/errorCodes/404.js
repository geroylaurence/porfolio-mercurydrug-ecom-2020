import React from 'react';
import { Route } from 'react-router-dom';

function NotFound() {
  return (
    <Route
      render={({ staticContext }) => {
        // Set 404 status for SSR.
        if (staticContext) {
          staticContext.status = 404;
        }
        return <h1>404 Not Found</h1>
      }}
    />
  );
}

export default NotFound;