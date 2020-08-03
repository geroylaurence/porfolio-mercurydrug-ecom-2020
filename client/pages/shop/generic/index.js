import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './list';
import GenericItems from '../genericItems';

function Generic(props) {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={List} />
      <Route path={`${props.match.path}/:id`} component={GenericItems} />
      <Route component={null} />
    </Switch>
  )
}

export default Generic;