const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
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
        plugins: [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin({
            patterns: [{ from: 'demo/' }]
        })]
    }];
};
