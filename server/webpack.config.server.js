const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const {getBuildVariables} = require('../src/utils/build-variables');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode !== 'production';
  const BUILD_IS_SERVER = true;
  const buildVariables = getBuildVariables(process.env.NODE_ENV, {BUILD_IS_SERVER});

  return {
    target: 'node',
    externals: nodeExternals(),
    entry: path.resolve(__dirname, 'bundle', 'server-bundle.js'),
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      filename: 'server-bundle.js',
      libraryTarget: 'umd',
      globalObject: 'this',
      library: 'server-bundle'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '..'),
        exclude: path.join(__dirname, '..', 'node_modules'),
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /(\.s(a|c)ss$)|(\.css$)/,
        loader: [
          {
            loader: 'css-loader',
            options: {
              modules: false,
              onlyLocals: true
            }
          },
          'sass-loader'
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
                  emitFile: false,
                  publicPath: 'images'
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
    plugins: [
      new webpack.DefinePlugin(buildVariables),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
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
