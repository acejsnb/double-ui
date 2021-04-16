const { resolve } = require('path');
// const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
    mode: 'production',
    entry: { index: resolve(__dirname, '../src/components/base/index.js') },
    // entry: { index: resolve(__dirname, '../src/components/base/base.styl') },
    output: {
        path: resolve(__dirname, '../lib'),
        filename: 'base/index.js',
        library: 'base',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ],
                include: [resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                include: [resolve(__dirname, '../src')]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 分离css
            filename: 'base/style.css'
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
    target: ['web', 'es5']
};

module.exports = config;
