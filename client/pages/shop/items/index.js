import React from 'react';
import { Switch, Route } from 'react-router-dom';
import universal from 'react-universal-component';

const List = universal(import('./list'));
const SKU = universal(import('./sku'));
const Search = universal(import('./search'));
const SearchTitle = universal(import('./searchTitle'));
const OrderHistory = universal(import('../orderHistory'));

function Items(props) {
  return (
    <Switch>
      <Route key="list-main" exact path={`${props.match.path}`} component={List} />
      <Route key="list-query" path={`${props.match.path}/category/:categoryId`} component={List} />
      <Route path={`${props.match.path}/order-history`} component={OrderHistory} />
      <Route path={`${props.match.path}/view/:id`} component={SKU} />
      <Route path={`${props.match.path}/search/:searchTerm`} component={Search} />
      <Route path={`${props.match.path}/search-title/:id`} component={SearchTitle} />
      <Route component={null} />
    </Switch>
  );
}

export default Items;