import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './landingPage';
import SuccessPage from './success';
import FailedPage from './failed';

class ValidateEmail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={LandingPage} />
        <Route path={`${this.props.match.path}/success`} component={SuccessPage} />
        <Route path={`${this.props.match.path}/failed`} component={FailedPage} />
      </Switch>
    )
  }
}

export default ValidateEmail;