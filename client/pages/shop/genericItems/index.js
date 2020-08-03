import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './list';

function GenericItems(props) {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={List} />
      <Route component={null} />
    </Switch>
  )
}

export default GenericItems;