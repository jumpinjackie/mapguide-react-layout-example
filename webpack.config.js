'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePlugins = [
    // This will copy required mapguide-react-layout assets to the right location (relative to the location of viewer.js bundle)
    new CopyWebpackPlugin([
        { from: path.join(__dirname, 'node_modules/mapguide-react-layout/viewer/strings/**/*'), to: path.join(__dirname, 'strings'), flatten: true },
        { from: path.join(__dirname, 'node_modules/mapguide-react-layout/viewer/server/TaskPane.html'), to: path.join(__dirname, 'server/TaskPane.html') },
        { from: path.join(__dirname, 'node_modules/mapguide-react-layout/viewer/stdicons/**/*'), to: path.join(__dirname, 'stdicons'), flatten: true }
    ]),
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
                test: /\.js$/,
                loader: "source-map-loader",
                include: [ //These libraries have source maps, use them
                    path.resolve(__dirname, "node_modules/@blueprintjs"),
                    path.resolve(__dirname, "node_modules/mapguide-react-layout")
                ],
                enforce: "pre"
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /(node_modules|test-utils|\.test\.ts$)/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            //These loader configurations are required to ensure bundled content assets from the node module are copied to the expected path
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "stdassets/images/icons/[name].[ext]",
                    publicPath: "./dist/"
                }
            },
            {
                test: /\.cur$/,
                loader: "file-loader",
                options: {
                    name: "stdassets/cursors/[name].[ext]",
                    publicPath: "./dist/"
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: "file-loader",
                options: {
                    name: "stdassets/fonts/[name].[ext]",
                    publicPath: "./dist/"
                }
            }
        ]
    }
};