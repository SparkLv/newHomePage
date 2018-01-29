const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/index.js',
        home: './src/pages/home/home.js',
        article:'./src/pages/home/article/article.js',
        library: './src/pages/library/library.js',
        others: './src/pages/others/others.js',
        librarys: ['jquery']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|eot|woff|ttf|)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contentehash:8].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/index.html",
            inject: "body",
            favicon: __dirname + "/favicon.ico",
            title: "spark's blog",
            chunks: ['common', 'librarys', 'main']
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            template: __dirname + "/src/pages/home/home.html",
            inject: "body",
            favicon: __dirname + "/favicon.ico",
            title: "spark's blog",
            chunks: ['common', 'librarys', 'home']
        }),
        new HtmlWebpackPlugin({
            filename: 'article.html',
            template: __dirname + "/src/pages/home/article/article.html",
            inject: "body",
            favicon: __dirname + "/favicon.ico",
            title: "spark's blog",
            chunks: ['common', 'librarys', 'article']
        }),
        new HtmlWebpackPlugin({
            filename: 'library.html',
            template: __dirname + "/src/pages/library/library.html",
            inject: "body",
            favicon: __dirname + "/favicon.ico",
            title: "spark's blog",
            chunks: ['common', 'librarys', 'library']
        }),
        new HtmlWebpackPlugin({
            filename: 'others.html',
            template: __dirname + "/src/pages/others/others.html",
            inject: "body",
            favicon: __dirname + "/favicon.ico",
            title: "spark's blog",
            chunks: ['common', 'librarys', 'others']
        })
    ]
}