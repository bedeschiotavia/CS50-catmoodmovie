// webpack.config.js
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './main.js',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv(),
  ],
};