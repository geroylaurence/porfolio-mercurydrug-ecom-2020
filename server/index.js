require('isomorphic-fetch');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');

const webpack = require('webpack');
const noFavicon = require('express-no-favicons');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

// router controller
const routerMain = require('../router/main');
const routerAccount = require('../router/account');
const routerAddress = require('../router/address');
const routerCart = require('../router/cart');
const routerCheckout = require('../router/checkout');
const routerLocations = require('../router/locations');
const routerMessage = require('../router/message');
const routerProducts = require('../router/products');
const routerUploader = require('../router/uploader');
const errorResponse = require('../http/errorResponse');

// development
const clientConfig = require('../webpack/webpack.dev.client.js');
const serverConfig = require('../webpack/webpack.dev.server.js');
// production
const clientConfigProd = require('../webpack/webpack.prod.client.js');
const serverConfigProd = require('../webpack/webpack.prod.server.js');

// eslint-disable-next-line prefer-destructuring
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const {NODE_ENV} = process.env;
const app = express();
app.use(noFavicon());

// file-uploader-middleware
app.use(fileUpload({
  createParentPath: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let isBuilt = false;
const PORT = process.env.PORT || 3000;

// middleware router
app.use('/test', routerMain);
app.use('/account', routerAccount);
app.use('/address', routerAddress);
app.use('/cart', routerCart);
app.use('/checkout', routerCheckout);
app.use('/locations', routerLocations);
app.use('/message', routerMessage);
app.use('/products', routerProducts);
app.use('/uploader', routerUploader);
app.use(errorResponse);

const done = () =>
  !isBuilt &&
  app.listen(PORT, () => {
    isBuilt = true;
    console.log(`${NODE_ENV} BUILD COMPLETE -- Listening @ http://localhost:${PORT}`);
  });

// DEVELOPMENT INTEGRATIONS
if (NODE_ENV === 'development') {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  compiler.plugin('done', done);
}

// PRODUCTION INTEGRATIONS
if (NODE_ENV === 'production') {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../buildServer/main.js').default;

    // Static files.
    app.use(publicPath, express.static(outputPath));

    // Render the app.
    app.use(serverRender({ clientStats }));

    done();
  });
}