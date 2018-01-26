const merge = require('webpack-merge')
const common = require('./webpack.config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(common, {
    output: {
        filename: 'static/js/[name].bundle.[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'librarys'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ]
})