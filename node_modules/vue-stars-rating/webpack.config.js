var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var tran = process.hrtime()[1];
var files = '';
var config = {
  entry: process.env.NODE_ENV !== 'production'?path.resolve(__dirname, 'src', 'main.js') : {
    stars: path.resolve(__dirname, 'src', 'Stars.vue'),
    'stars-half': path.resolve(__dirname, 'src', 'StarsHalf.vue') },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production'?'[name].bundle.js':'main.js',
    chunkFilename: `[name].lazy.[hash].${tran}.js`,
    publicPath: '/dist/',
  },
  plugins: process.env.NODE_ENV === 'production' ? [
     new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ] : [],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        exclude: /(node_modules)/,
        loader: 'url-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: /(node_modules)/,
        options: {
                name: '[name].[ext]?[hash]'
        }
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          exclude: /(node_modules)/
      },
      {
        test: /\.scss$/, 
        loader: ["style", "css?sourceMap", "sass?sourceMap"],
      }
    ]
  },
  externals: process.env.NODE_ENV === 'production'?{
    vue: 'vue'
  }:{},
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}//end config
var mergeWithConfigWindowTarget = merge(config, {
    devtool: '#source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ],
    output: {
      filename: '[name].min.js',
      libraryTarget: 'window',
      library: 'Vue-[name]-RatingWindow'
    }
});
var mergeWithConfigUMDTarget = merge(config, {
    devtool: '#source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ],
    output: {
      filename: '[name].umd.js',
      libraryTarget: 'umd',
      // These options are useful if the user wants to load the module with AMD
      library: 'vue-[name]-rating-umd',
      umdNamedDefine: true
    }
});
var mergeWithConfigCommonJs2Target = merge(config, {
    devtool: '#source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ],
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      library: 'vue-[name]-rating'
    }
});
if(process.env.NODE_ENV !== 'production'){
  module.exports = config;
}else{
  module.exports = [mergeWithConfigCommonJs2Target,mergeWithConfigUMDTarget, mergeWithConfigWindowTarget];
}
