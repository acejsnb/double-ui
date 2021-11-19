const { resolve } = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件

const baseConfig = require('./base');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const config = {
    mode: 'production',
    entry: resolve(__dirname, '../src/multiple.ts'),
    output: {
        path: resolve(__dirname, '../lib'),
        // assetModuleFilename: 'static/[name].[hash:5][ext][query]',
        assetModuleFilename: './static/[name][ext]',
        filename: 'index.js',
        library: 'double-ui',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    plugins: [
        new MiniCssExtractPlugin({ // 分离css
            filename: 'style.css'
        }),
        new CleanWebpackPlugin({
            verbose: true,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: (
                [resolve(__dirname, '../lib')]
            )
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({ target: 'es2015', css: true })
        ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        'react-router-dom': {
            root: 'ReactRouterDOM',
            commonjs2: 'react-router-dom',
            commonjs: 'react-router-dom',
            amd: 'react-router-dom'
        },
        'react-transition-group': {
            root: 'ReactTransitionGroup',
            commonjs2: 'react-transition-group',
            commonjs: 'react-transition-group',
            amd: 'react-transition-group'
        }
    },
    target: ['web', 'es5']
};

module.exports = merge(baseConfig, config);
