const path = require("path");
const libraryName = "lazyloadPicturefillBackground";

module.exports = {
  entry: "./src/lazyload-picturefill-background.js",
  output: {
    filename: "lazyload-picturefill-background.min.js",
    path: path.resolve(__dirname, "dist"),
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
