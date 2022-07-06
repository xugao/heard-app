const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].[contenthash].js',
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [
        {
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
    { test: /\.tsx?$/, loader: 'ts-loader' },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
