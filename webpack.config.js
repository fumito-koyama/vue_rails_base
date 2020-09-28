const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const LiveReloadPlugin = require("webpack-livereload-plugin");


module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    context: path.resolve(__dirname, 'frontend/packs'),
    entry: {
      javascript: './entry.js',
      stylesheet: './application.scss'
    },
    output: {
      path: path.resolve(__dirname, 'public/packs'),
      filename: isProduction ? '[name]-[contentHash].js' : '[name]-[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'app'),
          use: 'babel-loader',
        },
        { test: /\.(css|scss|sass)$/, use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']},
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images/',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            extractCSS: true,
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new ManifestPlugin(),
      new MiniCssExtractPlugin({filename: '[name]-[contentHash].css'}),
    ],
    devServer: {
      host: '0.0.0.0',
      publicPath: 'http://0.0.0.0:3035/public/packs/',
      historyApiFallback: true,
      disableHostCheck: true,
      // inline: false, //(デフォルトがtrue)
      // hot: true,
      port: 3035,
    },    
  };
}