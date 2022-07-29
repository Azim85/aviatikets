const path = require("path");
const loader = require("sass-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { watch } = require("fs");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: "development",

  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
    chunkFilename: "[id].css",
  },

  devtool: "source-map",

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    watchFiles: ["./src/*"],
  },
  target: "web",

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader", // compiles SASS to CSS
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({
      title: "Aviasales",
      filename: "index.html",
      template: "./src/index.html",
      inject: true,
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
};
