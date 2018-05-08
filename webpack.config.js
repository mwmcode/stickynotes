const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const portNo = 4040;

module.exports = (env, argv) => {
  const mutualPlugins = [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(argv.mode), // access NODE_ENV anywhere
    })
  ];

  const config = {
    context: __dirname,

    entry: {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:4040/public',
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
          use: ['style-loader', 'css-loader']
        }
      ]
    },

    plugins: [
      ...mutualPlugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new OpenBrowserPlugin({ url: `http://localhost:${portNo}/public` })
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

  if (argv.mode === 'production') {
    config.entry = { app: ['babel-polyfill', './src/main.js'] };
    config.devtool = false;
    config.plugins = [
      ...mutualPlugins,
      new UglifyJSPlugin()
    ];
  }

  return config;
};
