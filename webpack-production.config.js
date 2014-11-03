var path = require('path');
var webpack = require('webpack');

module.exports = {
    
  target: "web",

  debug: false,
  
  minimize: true,
  
  entry: "./client/app/main.jsx",
  
  output: {
      path: "./public/scripts",
      filename: "bundle.prod.js"
  },
  
  resolve: {
      modulesDirectories: ['bower_components', 'node_modules']
  },
  
  stats: {
    colors: true,
    reasons: true
  },
  
  module: {
      loaders: [
          { test: /\.css$/, loader: "style!css" },
          { test: /\.jsx$/, loader: "jsx-loader?harmony&insertPragma=React.DOM" },
          { test: /\.less$/, loader: "style-loader!css-loader!less-loader" }
      ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]

};
