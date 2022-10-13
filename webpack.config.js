const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const srcPath = path.join(__dirname, '/src');

module.exports = {
  entry: path.resolve(__dirname, './src/App.js'),
  //Where files should be sent once they are bundled
  mode: "development",
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].bundle.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].bundle.js',
    // `path` is the folder where Webpack will place your bundles
    path: path.resolve(__dirname, './dist')
  },
  //webpack 5 comes with devServer which loads in development mode
  devServer: {
    host: '0.0.0.0',
    port: 7860,
    writeToDisk: true,
    hot: true,
    contentBase: './dist',
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  //Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
    }),
    new MiniCssExtractPlugin()
  ],
};
