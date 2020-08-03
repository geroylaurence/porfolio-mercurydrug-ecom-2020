import React from 'react';
import {Switch, Route} from 'react-router-dom';

import List from './list';
import Add from './createForm';

function AddressBook(props) {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`} component={List} />
      <Route path={`${props.match.path}/add`} component={Add} />
      <Route path={`${props.match.path}/:id/edit`} component={Add} />
    </Switch>
  )
}

export default AddressBook;