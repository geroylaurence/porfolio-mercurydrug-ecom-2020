const path = require('path');
const webpack = require('webpack');

const res = p => path.resolve(__dirname, p);

const entry = res('../server/render.js');
const output = res('../buildServer');

module.exports = {
  name: 'server',
  target: 'node',
  entry: [
    'babel-polyfill',
    entry,
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: output,
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
