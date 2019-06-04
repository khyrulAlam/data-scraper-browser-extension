const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var commonConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }
    ]
  }
};

var rootScript = {
  entry: {
    "content-script": "./src/content-script.js",
    "background-script": "./src/background-script.js"
  },
  output: {
    path: path.resolve(__dirname, "app"),
    filename: "[name].js"
  }
};
var popupScript = {
  ...commonConfig,
  entry: "./src/popup/popup.js",
  output: {
    path: path.resolve(__dirname, "app/popup"),
    filename: "popup.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/popup/index.html"
    })
  ]
};

var optionScript = {
  ...commonConfig,
  entry: "./src/client/app.js",
  output: {
    path: path.resolve(__dirname, "app/client"),
    filename: "app.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/client/index.html"
    })
  ]
};

module.exports = [rootScript, popupScript, optionScript];
