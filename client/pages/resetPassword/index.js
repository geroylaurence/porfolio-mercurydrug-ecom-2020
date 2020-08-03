import React from 'react';
import universal from 'react-universal-component';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';

const RequestResetPassword = universal(import('./request'));
const ProcessResetPassword = universal(import('./process'));

function ResetPasswordRoute(props) {
  const urlLocation = props.location;
  const parseQuery = queryString.parse(urlLocation.search);

  const ScreenResetPassword = (
    ({}).hasOwnProperty.bind(parseQuery)('user') &&
    ({}).hasOwnProperty.bind(parseQuery)('check') &&
    ({}).hasOwnProperty.bind(parseQuery)('token')
  ) ? ProcessResetPassword : RequestResetPassword;

  return <ScreenResetPassword />;
}

export default ResetPasswordRoute;