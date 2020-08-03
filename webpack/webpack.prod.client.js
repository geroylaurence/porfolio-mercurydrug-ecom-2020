const config = require('config');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'client',
  target: 'web',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../client/index.js'),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/',
  },
  module: {
    rules: [
      { // Javascript
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      { // CSS
        test: /\.(css|scss)$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
      { // Assets
        // test: /\.(png|svg|jpg|otf|mp4)$/,
        test: /\.(png|svg|jpg|otf|mp4|gif|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/static',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        screw_ie8: true,
        comments: false,
      },
      sourceMap: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SERVER_SIDE_ADDRESS: JSON.stringify(`${config.get('app')['server-side-address']}:${process.env.PORT}`)
      },
    }),
  ],
};
