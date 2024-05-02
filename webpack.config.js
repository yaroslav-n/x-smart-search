const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    inject: "./src/inject/inject.ts",
    background: "./src/background/background.ts",
    settings: "./src/settings/index.tsx",
  },
  optimization: {
    minimize: false
  },
  output: {
    path: path.resolve(__dirname, './extension/lib'),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};