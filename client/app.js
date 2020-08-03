import React from 'react';
import * as Promise from 'bluebird';

import { withRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import messagesEn from '../i18n/en';

import AppRoutes from './appRoutes';

// i18n
const messages = {
  en: messagesEn,
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <IntlProvider
        messages={messages.en}
        locale="en"
      >
        <AppRoutes />
      </IntlProvider>
    )
  }
}

export default withRouter(App);