// Modules
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function makeWebpackConfig (options) {
  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  const BUILD = !!options.BUILD;
  const TEST = !!options.TEST;

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  const config = {
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    entry: {
      app: './client/src/js/main.js'
    },

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output: {
      // Absolute output directory
      path: __dirname + '/dist',

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: BUILD ? '/' : 'http://localhost:3000/',

      // Filename for entry points
      // Only adds hash in build mode
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    },

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      contentBase: './dist',
      port: 3000,
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false
      }
    },

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    devtool: 'eval',

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    module: {
      noParse: [],
      preLoaders: [],
      loaders: [
        {
          // JS LOADER
          // Reference: https://github.com/babel/babel-loader
          // Transpile .js files using babel-loader
          // Compiles ES6 and ES7 into ES5 code
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          // ASSET LOADER
          // Reference: https://github.com/webpack/file-loader
          // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
          // Rename the file using the asset hash
          // Pass along the updated reference to your code
          // You can add here any file extension you want to get copied to your output
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file'
        },
        {
          // HTML LOADER
          // Reference: https://github.com/webpack/raw-loader
          // Allow loading html through js
          test: /\.html$/,
          loader: 'raw'
        }
      ]
    },

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
      // Reference: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new webpack.optimize.OccurenceOrderPlugin(),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].[hash].css', {
        disable: !BUILD || TEST
      })
    ],

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],

    resolve: {alias: {}}
  };


  if (TEST) {
    config.entry = {};

    config.output = {};

    config.devtool = 'inline-source-map';

    // ISPARTA LOADER
    // Reference: https://github.com/ColCh/isparta-instrumenter-loader
    // Instrument JS files with Isparta for subsequent code coverage reporting
    // Skips node_modules and files that end with .test.js
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.test\.js$/
      ],
      loader: 'isparta-instrumenter'
    })
  }

  if (BUILD) {
    config.devtool = 'source-map';

    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  // CSS LOADER
  // Reference: https://github.com/webpack/css-loader
  // Allow loading css through js
  //
  // Reference: https://github.com/postcss/postcss-loader
  // Postprocess your css with PostCSS plugins
  var cssLoader = {
    test: /\.css$/,
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files in production builds
    //
    // Reference: https://github.com/webpack/style-loader
    // Use style-loader in development for hot-loading
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  };

  var lessLoader = {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less')
  };

  // Skip loading css in test mode
  if (TEST) {
    // Reference: https://github.com/webpack/null-loader
    // Return an empty module
    cssLoader.loader = 'null';
    lessLoader.loader = 'null';
  }

  // Add cssLoader to the loader list
  config.module.loaders.push(cssLoader);

  // Add lessLoader to the loader list
  config.module.loaders.push(lessLoader);

  // Skip rendering index.html in test mode
  if (!TEST) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './client/src/index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: BUILD
        }
      })
    );
  }

  if (!BUILD) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  function addVendor(name, path) {
    config.resolve.alias[name] = path;
    config.module.noParse.push(new RegExp(path));
  }

  return config;
};
