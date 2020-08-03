import { createMemoryHistory } from 'history';
import { parsePath } from 'history';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { flushChunkNames } from 'react-universal-component/server';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import flushChunks from 'webpack-flush-chunks';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../redux/reducers';
import { setAPIURL } from '../redux/actions/app';

import App from '../client/app';
import theme from '../client/ui/styles/theme';
import fonts from '../client/ui/styles/fonts';

const fs = require('fs');
const config = require('config');
const normalizeCSS = require('normalize.css/normalize.css').toString();
const wizardStepsCheckout = require('../assets/css/wizard-steps-checkout.css').toString();

const DB = require('../api_services/mercurydrug');

function sendResponse(res, history, clientStats, reduxStore) {
  const context = {};
  const stylesheet = new ServerStyleSheet();

  const markup = (hasError = false) => (
    <Provider store={reduxStore}>
      <StaticRouter location={history.location.pathname} context={context}>
        <StyleSheetManager sheet={stylesheet.instance}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyleSheetManager>
      </StaticRouter>
    </Provider>
  );
  let app;
  try {
    // Render the app.
    app = ReactDOMServer.renderToString(markup());
  } catch (error) {
    console.log(error);
    // Render the app but mark that there is an error.
    app = ReactDOMServer.renderToString(markup(true));
  }

  if (context.url) {
    console.log(`Redirecting to: ${context.url}`);

    res.redirect(302, context.url);
  } else {
    const styleTags = stylesheet.getStyleTags();
    const chunkNames = flushChunkNames();

    // REDUX
    const reduxState = reduxStore.getState(); 

    const {
      js,
      // styles,
      // cssHash,
      scripts,
      // stylesheets,
    } = flushChunks(clientStats, {
      before: ['common'],
      chunkNames,
    });

    // console.log('PATH', req.path);
    console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
    console.log('SCRIPTS SERVED', scripts);
    // console.log('STYLESHEETS SERVED', stylesheets);

    // Check for changed status code.
    if (context.status) {
      res.status(context.status);
    }

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
          <meta charset="utf-8">
          <title>${config.get("app")['web-title']}</title>
          <style>
            ${fonts}
            ${normalizeCSS}
            ${wizardStepsCheckout}
  
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed,
            figure, figcaption, footer, header, hgroup,
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
              font-size: 100%;
              font-family: 'proxima_nova_alt_rgregular';
            }
            html {
              background-color: '#FFFFFF';
              box-sizing: border-box;
              font-size: 14px;
              margin: 0;
              padding: 0;
            }
            *, *:before, *:after {
              box-sizing: inherit;
            }
            #app, body, html {
              height: 100%;
            }
          </style>
          ${styleTags}
          
          <!-- jQuery -->
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

          <!-- Bootstrap -->
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

          <!-- Font Awesome -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


        </head>
        <body>
          <div id="app">${app}</div>
          <script>
            ${context.status ? `window.__ERROR_CODE__ = ${context.status};` : ''}
            window.__REDUX_STATE__ = ${JSON.stringify(reduxState).replace(/</g, '\\u003c')};
            window.__APP_STATE__ = ${JSON.stringify({
              auth: {}
            })};
          </script>
          ${js}
        </body>
      </html>
    `);
  }
}

export default ({ clientStats }) => (req, res) => {
  console.log(`Request for: ${req.url}`);

  const initialLocation = parsePath(req.url);

  const history = createMemoryHistory({
    initialEntries: [initialLocation],
    initialIndex: 0,
  });

  // REDUX
  const reduxStore = createStore(
    appReducer,
    history
  );

  // REDUX, SETUP APP REDUCERS
  reduxStore.dispatch(setAPIURL('https://sample.com'));

  sendResponse(res, history, clientStats, reduxStore);
}
