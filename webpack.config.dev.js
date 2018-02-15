const merge = require('webpack-merge')
const common = require('./webpack.config')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
    devtool:'cheap-module-source-map',
    output: {
        filename: 'static/js/[name].bundle.[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})