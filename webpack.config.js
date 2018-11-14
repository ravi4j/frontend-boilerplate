const path = require('path');
const webpack = require('webpack');

module.exports = {
   mode:  'development',
   entry: ['webpack-hot-middleware/client' , 
            './src/index.js'
           ],
   devtool: 'inline-source-map',
   devServer: {
        contentBase: './html',
        hot: true
    },
    module: {
         rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            } 
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: "style-loader" // creates style nodes from JS strings
              },
              {
                loader: "css-loader" // translates CSS into CommonJS
              },
              {
                loader: "sass-loader" // compiles Sass to CSS
              }
            ]
          },
           {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
           },
           { 
             test: /\.(png|svg|jpg|gif)$/,
             use: ['file-loader']
           },
           { 
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
          },
          { 
            test: /\.(csv|tsv)$/,
            use: ['cvs-loader']
          },
          { 
            test:  /\.xml$/,
            use: ['xml-loader']
          },
        ]
    },
   plugins: [
       new webpack.NamedModulesPlugin(),
       new webpack.HotModuleReplacementPlugin()
    ],
   
  output: {
    path: path.resolve(__dirname, 'html'),
    filename: 'bundle.js',
    publicPath: '/'
  }
};