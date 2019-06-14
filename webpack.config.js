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
        test: /\.js$/,
        exclude: /(node_modules|utils)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
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
  entry: {
    app: "./src/client/app.js",
    "download-app": "./src/client/download/download-app.js"
  },
  output: {
    path: path.resolve(__dirname, "app/client"),
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: "index.html",
      template: "src/client/index.html"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: "download.html",
      template: "src/client/download/download.html"
    })
  ]
};

module.exports = [rootScript, popupScript, optionScript];
