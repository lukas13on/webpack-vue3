const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => ({
  cache: false,
  watch: true,
  mode: 'development',
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, './src/main.js')
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, './public_html'),
    publicPath: '/public_html/'
  },
  resolve: {
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      'vue': '@vue/runtime-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.prod }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public_html"),
      serveIndex: true,
    },
    watchFiles: {
      paths: [path.join(__dirname, "src/**/*")]
    },
    client: {
      progress: true,
      reconnect: true,
      overlay: true
    },
    hot: true,
    server: 'http',
    https: false,
    compress: true,
    liveReload: true,
    port: 3010
  }
});
