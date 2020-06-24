const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const safeParser = require('postcss-safe-parser')
const pkg = require('./package.json')

const themeConfig = require(pkg.theme)

let commonPlugins = []
const theme = themeConfig()
const clientIsDev = process.env.NODE_ENV

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devServer: {
    compress: true,
    inline: true,
    hot: true,
    port: 8888,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    noInfo: false,
    // proxy URLs to backend development server
    proxy: {
      '/api': 'http://localhost:6868',
    },
  },
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist/web'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/] || src\//,
          chunks: 'all',
          name: 'common',
          minSize: 0,
          minChunks: 2,
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          parser: safeParser,
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.styl$/,
        use: [clientIsDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          clientIsDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          `less-loader?{"sourceMap":true, "modifyVars":${JSON.stringify(theme)}, "javascriptEnabled": true}`,
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        exclude: [path.resolve(__dirname, './src/icon')],
        use: [
          {
            loader: 'url-loader',
            query: {
              name: '[name].[hash:8].[ext]',
              limit: 1024 * 10,
            },
          },
        ],
      },
      {
        test: /^((?!\.color).)*((?!\.color).)\.svg$/,
        include: [path.resolve(__dirname, './src/icon')],
        use: [
          { loader: 'svg-sprite-loader' },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: true } },
                { convertPathData: true },
                { removeComments: true },
                { removeDesc: true },
                { removeUselessDefs: true },
                { removeEmptyAttrs: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { removeUselessStrokeAndFill: true },
                { moveElemsAttrsToGroup: true },
                { removeStyleElement: true },
                { cleanupEnableBackground: true },
                { removeAttrs: { attrs: '(stroke|fill)' } },
              ],
            },
          },
        ],
      },
      {
        test: /[A-Za-z0-9-.]+\.color\.svg$/,
        include: [path.resolve(__dirname, './src/icon')],
        use: [
          { loader: 'svg-sprite-loader' },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: true } },
                { convertPathData: true },
                { removeComments: true },
                { removeDesc: true },
                { removeUselessDefs: true },
                { removeEmptyAttrs: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { removeUselessStrokeAndFill: true },
                { moveElemsAttrsToGroup: true },
                { removeStyleElement: true },
                { cleanupEnableBackground: true },
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: clientIsDev,
      __PRO__: !clientIsDev,
    }),
    new webpack.ProvidePlugin({
      lodash: '_',
      moment: 'moment',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
}
if (process.env.NODE_ENV !== 'development') {
  // 线上环境
  commonPlugins = [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
    /**
     * ! 一般不需要开启, 默认打包出来的 stats.json 文件会随着项目增大而变大
     *   如果发现项目中出现某些文件打包很大时, 执行 npm run build 之后执行 npm run analyzer 进行文件分析和打包优化
     */
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled',
    //   generateStatsFile: true,
    // }),
  ]
  // module.exports.devtool = 'source-map'
} else {
  // 开发环境
  commonPlugins = [new webpack.HotModuleReplacementPlugin()]
  module.exports.devtool = 'cheap-module-eval-source-map'
}

module.exports.plugins = module.exports.plugins.concat(commonPlugins)
