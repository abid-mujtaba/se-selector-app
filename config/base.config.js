// Define this constant for easier usage
// Source: https://viblo.asia/p/quick-webpack-set-up-for-single-page-applications-aWj53Xk8K6m
// with customizations on top (including webpack v4 to v5 migration)
const isProd = process.env.NODE_ENV === 'production'

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    // Include source maps in development files
    devtool: isProd ? false : 'cheap-module-source-map',

    entry: {
        // Main entry point of our app
        app: resolve(__dirname, '..', 'src', 'index.js'),
    },

    output: {
        // As mentioned before, built files are stored in dist
        path: resolve(__dirname, '..', 'dist'),

        // In our case we serve assets directly from root
        publicPath: '/',

        // We add hash to filename to avoid caching issues
        filename: '[name].[contenthash].js',
    },

    resolve: {
        extensions: ['*', '.js'],
        modules: [
            resolve(__dirname, '..', 'node_modules'),
        ],
    },

    module: {
        rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',

              // Dependencies do not require transpilation
              exclude: /node_modules/
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'SE Selector App',
            template: resolve(__dirname, '..', 'src', 'html', 'index.ejs'),
        }),
    ],
}

if (!isProd) {
    config.devServer = {
        hot: true,
        devMiddleware: {
            publicPath: '/',
        },
        static: {
            directory: resolve(__dirname, '..', 'static'),
        },
        historyApiFallback: true,
    }
    config.mode = 'development';
}

module.exports = config
