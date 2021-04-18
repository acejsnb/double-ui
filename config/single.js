const { resolve } = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件

const baseConfig = require('./base');

const EntryObj = require('../src/single.ts');

const objEntry = {};
// eslint-disable-next-line no-restricted-syntax
for (const key of Object.keys(EntryObj)) {
    objEntry[key] = EntryObj[key];
}

const config = {
    mode: 'production',
    entry: objEntry,
    output: {
        path: resolve(__dirname, '../lib'),
        assetModuleFilename: 'images/[name].[hash:5][ext][query]',
        filename: '[name]/index.js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    plugins: [
        new MiniCssExtractPlugin({ // 分离css
            filename: '[name]/style.css'
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
            new TerserPlugin({
                extractComments: false, // 不生成LICENSE.txt
                terserOptions: {
                    toplevel: true, // 最高级别，删除无用代码
                    // ie8: true,
                    safari10: true
                }
            }),
            new CssMinimizerPlugin()
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
            root: 'ReactDom',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
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
