const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "src"),
  build: path.join(__dirname, "build")
};

module.exports = {
  entry: {
    app: PATHS.src + '/index',
  },

  output: {
    path: PATHS.build,
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|public)/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractText.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2($|\?))$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.(otf|ttf|eot?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ],
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: './src/index.html'
    }),
    new ExtractText('[name].css')
  ],

  devServer: {
    inline: true,
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
