const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
    name, version, author, license
} = require('../package.json');

const { WEBPACK_SERVE } = process.env;

// 获取时间
const TimeFn = require('../get_time');

const banner = `@${name}-docs v${version}
(c) 2020-2021 ${author}
Released under the ${license} License.
${TimeFn()}`;

const isProd = !WEBPACK_SERVE;
const cssConfig = (step = 1) => [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: step,
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

const config = {
    entry: {
        index: resolve(__dirname, '../docs/main.tsx') // 入口文件
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssConfig(1),
                exclude: /node_modules/
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    ...cssConfig(2),
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: !isProd
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            },
            {
                test: /\.tsx$/,
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
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
                ]
            },
            {
                test: /\.(png|jpe?g|gif|bmp|webm|mp4)$/,
                type: 'asset/inline'
            },
            {
                test: /\.mdx?$/,
                use: [
                    'babel-loader',
                    'md-util-loader'
                ],
                include: [resolve(__dirname, '../docs')]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner,
            test: /\.js$/
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../docs/public/light.css'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../docs/public/dark.css'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../docs/posts/images'),
                    to: 'images'
                }
            ]
        }),
        new ProgressBarPlugin(
            {
                format: chalk.blue(`[  build :bar ${chalk.green.bold(':percent')} (:elapsed seconds) ]`),
                clear: true,
                summary: true
            }
        )
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
        alias: {
            '@': resolve(__dirname, '../src'),
            'docs': resolve(__dirname, '../docs')
        },
        /*fallback: {
            fs: false,
            path: require.resolve('path-browserify'),
            crypto: require.resolve('crypto-browserify'),
            assert: require.resolve('assert/'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
            constants: require.resolve('constants-browserify'),
        }*/
    },
    cache: true,
    devtool: 'inline-source-map',
    bail: true, // 在第一个错误出现时抛出失败结果
    target: 'web'
};

module.exports = config;
