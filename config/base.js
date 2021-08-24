const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const {
    name, version, author, license
} = require('../package.json');

const { WEBPACK_SERVE } = process.env;

// 获取时间
const TimeFn = require('../get_time');

const banner = `@${name} v${version}
(c) 2020-2021 ${author}
Released under the ${license} License.
${TimeFn()}`;

/**
 * 判断是生产环境还是开发环境
 * @type {boolean}
 * isProd为true表示生产
 */
const isProd = !WEBPACK_SERVE;

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */
const cssConfig = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: !isProd
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !isProd
        }
    }
];
const stylusConfig = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: !isProd
        }
    },
    {
        loader: 'stylus-loader',
        options: {
            sourceMap: !isProd
        }
    }
];

const config = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssConfig,
                exclude: /node_modules/
            },
            {
                test: /\.styl(us)?$/,
                use: stylusConfig,
                include: [resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.tsx$/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.svg$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true
                        }
                    }
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.(png|jpe?g|gif|bmp|webm|mp4)$/,
                // type: 'asset/resource',
                type: 'asset/inline',
                include: [resolve(__dirname, '../src/assets')]
            }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
        modules: [
            'node_modules',
            resolve(__dirname, '../src/assets'),
            resolve(__dirname, '../src/static'),
            resolve(__dirname, '../src/utils')
        ],
        alias: {
            '@': resolve(__dirname, '../src')
        }
    },
    plugins: [
        new webpack.BannerPlugin({
            banner,
            test: /\.js$/
        }),
        new ProgressBarPlugin(
            {
                format: chalk.blue(`[  build :bar ${chalk.green.bold(':percent')} (:elapsed seconds) ]`),
                clear: true,
                summary: true
            }
        )
    ],
    bail: true, // 在第一个错误出现时抛出失败结果
    target: 'web'
};

module.exports = config;
