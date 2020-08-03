import 'babel-polyfill';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './app';
import theme from './ui/styles/theme';
import './ui/styles/fonts';

import '../assets/lib/inputmask/dist/inputmask.min';

// REDUX CONS
import appReducers from '../redux/reducers';

const history = createBrowserHistory();

// testing, when new page make auto scroll on top
history.listen(arg => {
  if (arg.pathname !== '/login' && arg.pathname !== '/create-account') {
    reduxStore.dispatch({
      type: 'SET_LOGIN_LAST_PAGE', 
      data: arg.pathname,
    });
  }
  window.scrollTo(0, 0);
});

// redux
const initialReduxState = window.__REDUX_STATE__;
delete window.__REDUX_STATE__;

// DEFAULT REDUX STORE
const reduxStore = createStore(
  appReducers,
  initialReduxState
);

// FOR REDUX STORE WITH FETCH API
// const routingMiddleware = routerMiddleware(history);
// const reduxStore = createStore(
//   appReducers,
//   initialReduxState,
//   composeWithDevTools(applyMiddleware(routingMiddleware, thunk)),
// );

// Check for an error.
const errorCode = window.__ERROR_CODE__;
delete window.__ERROR_CODE__;

const render = (AppComponent) => {
  ReactDOM.hydrate(
     (<Provider store={reduxStore}>
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <AppComponent />
          </ThemeProvider>
        </Router>
      </Provider>
     )
    , document.getElementById('app'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app.js', () => {
    const AppHMR = require('./app').default;
    render(AppHMR);
  });
}

render(App);