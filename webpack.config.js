const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        entry: './src/main.js',
        mode: 'development',
        output: {
            filename: 'widget.js',
            path: path.resolve(bundleOutputDir),
        },
        devServer: {
            static: './'
        },
        module: {
            rules: [
                { test: /\.html$/i, use: 'html-loader' },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: "svg-url-loader",
                        options: {
                            // make all svg images to work in IE
                            iesafe: true,
                        },
                    },
                },
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/env', {
                                'targets': {
                                    'browsers': ['ie 6', 'safari 7']
                                }
                            }]]
                        }
                    }
                }
            ]
        },
        plugins: isDevBuild
            ? [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin({
                patterns: [{ from: 'demo/' }]
            })]
            : [new webpack.optimize.UglifyJsPlugin()]
    }];
};
