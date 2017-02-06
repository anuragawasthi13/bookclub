var path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/'),
    publicPath: "/"
  },

  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'] ,exclude: /node_modules/, include: __dirname },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};