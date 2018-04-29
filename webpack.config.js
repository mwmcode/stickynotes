const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const portNo = 4040;

const config = {
  context: __dirname,

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:4040',
      'webpack/hot/only-dev-server',
      './src/main.js'
    ]
  },

  output: {
    path: resolve(__dirname, 'public'),
    filename: 'js/[name].js',
    publicPath: '/public/js/'
  },

  devtool: 'cheap-eval-source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${portNo}` })

  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },

  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },

  devServer: {
    hot: true,
    port: portNo,
    publicPath: '/public/',
    historyApiFallback: true
  }
};

const appEntry = { app: './src/main.js' };

if ( process.env.NODE_ENV === 'production' ) {
  config.entry = appEntry;
  config.devtool = false;
  config.plugins = [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ];
}
else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV==='server') {
  config.entry = appEntry;
}

module.exports = config;
