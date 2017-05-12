'use strict';
const path = require('path');
const webpack = require('webpack');
const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];
const devPlugins = [
    new webpack.NoEmitOnErrorsPlugin(),
];
const prodPlugins = [
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
            context: __dirname
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false,
            screw_ie8: true
        },
        comments: false
    })
];
const plugins = basePlugins
    .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
    .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

module.exports = {
    entry: {
        viewer: './src/main.tsx'
    },
    output: {
        libraryTarget: "var",
        library: "MapGuide",
        path: path.join(__dirname, 'dist'),
        //filename: '[name].[hash].js',
        filename: '[name].js',
        publicPath: '/',
        //sourceMapFilename: '[name].[hash].js.map',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {},
        modules: [
            'node_modules'
        ],
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules|test-utils|\.test\.ts$)/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]",
                    publicPath: "./dist/"
                }
            }
        ]
    }
};