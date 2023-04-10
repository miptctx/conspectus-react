const webpack = require('webpack');
const path = require('path');
const HWP = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const marked = require('marked');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  //entry: {
  //  index: './src/index.js'
    /*
    setup: './src/components/SetupPage/index.js',
    mobilesetup: './src/components/MobileSetupPage/index.js',
    subscribe: './src/components/SubscribePage/index.js',
    survey: './src/components/Survey/index.js',
    feedback: './src/components/FeedbackPage.js',
    404: './src/components/404/index.js',
    faq: './src/components/FAQ/index.js',
    test: './src/components/Test/index.js'
    */
  //},
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.md$/i,
        use: 'raw-loader',
      },
      /*
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer: new marked.Renderer()
            }
          }
        ]
      }
      */
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new HWP(
      {
        title: 'Main Page',
        template: path.join(__dirname, '/public/index.html'),
        inject: 'body',
        filename: 'index.html'
      }
    ),
    /*
    new HWP(
      {
        title: 'Tested Component Page',
        chunks: ['test'],
        template: path.join(__dirname, '/public/index.html'),
        inject: 'body',
        filename: 'test/index.html'
      }
    ),
    */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'favicon.png')
        },
        {
          from: path.join(__dirname, 'src', 'assets', 'md'), to: "assets/md"
        }
      ]
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  /*
  optimization: {
    concatenateModules: true,
    mangleWasmImports: true,
    moduleIds: 'deterministic'
  },
  */
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true
    },
    hot: true,
    https: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/*.md$/, to: '/index.html' },
        { from: /^\/md\/index\.md$/, to: '/index.html' },
        { from: /^\/md\/advanced_graphs\/\w*.md$/, to: '/index.html' },
        { from: /^\/md\/hypergraphs\/\w*.md$/, to: '/index.html' },
        { from: /^\/md\/statistics\/\w*.md$/, to: '/index.html' },
        { from: /favicon.png$/, to: '/favicon.png' }
      ]
    }
  }
};
