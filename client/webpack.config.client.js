const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// eslint-disable-next-line no-unused-vars
const zlib = require('zlib');
const webpack = require('webpack');
const {getBuildVariables} = require('../src/utils/build-variables');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  const BUILD_IS_SERVER = false;
  const buildVariables = getBuildVariables(process.env.NODE_ENV, {BUILD_IS_SERVER});

  const compressionPlugins = isDevelopment ? [] : [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 1000,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 1000,
      minRatio: 0.8,
    })
  ];

  return {
    entry: path.resolve(__dirname, 'client.js'),
    output: {
      path: path.resolve(__dirname, '..', 'public'),
      filename: isDevelopment ? 'scripts/client.js' : 'scripts/client.[chunkhash].js',
      chunkFilename: isDevelopment ? 'scripts/[name].js' : 'scripts/[name].[chunkhash].js',
      publicPath: '/'
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        chunks: "all"
      },
      usedExports: true
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '..'),
        exclude: path.join(__dirname, '..', 'node_modules'),
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /(\.s(a|c)ss$)|(\.css$)/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'styles'
            } 
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: isDevelopment ? true : 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  publicPath: 'images',
                  outputPath: 'images',
                  emitFile: true
                }
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }]
    },
    devtool: isDevelopment ? 'source-map' : '(none)',
    plugins: [
      ...compressionPlugins,
      // new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? 'styles/[name].css' : 'styles/[name].[chunkhash].css',
        chunkFilename: isDevelopment ? 'styles/[name].css' : 'styles/[name].[chunkhash].css'
      }),
      new webpack.DefinePlugin(buildVariables),
      new LoadablePlugin()
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        Components: path.resolve(__dirname, "..", "src", "components"),
        Images: path.resolve(__dirname, "..", "assets", "images"),
        Pages: path.resolve(__dirname, "..", "src", "pages"),
        Services: path.resolve(__dirname, "..", "src", "services"),
        Shell: path.resolve(__dirname, "..", "src", "shell"),
        Source: path.resolve(__dirname, "..", "src")
      }
    }
  };
};
