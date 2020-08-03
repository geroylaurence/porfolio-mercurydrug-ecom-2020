import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import SuccessLandingPage from './success';
import FailedLandingPage from './failed';
import CancelledLandingPage from './cancelled';
import NotFound from '../../errorCodes/404';


function FeedBack(props) {
  return (
    <div className="d-flex mb-5">
      <Switch>
        <Route exact path={`${props.match.path}/success/:orderId/:referenceKey`} component={SuccessLandingPage} />
        <Route path={`${props.match.path}/failed/:orderId/:referenceKey`} component={FailedLandingPage} />
        <Route path={`${props.match.path}/cancelled/:orderId/:referenceKey`} component={CancelledLandingPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default FeedBack;