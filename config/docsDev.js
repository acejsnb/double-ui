const { resolve } = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./docsBase');
// 获取本机ip
const getIp = require('../get_ip');

const port = 6008;

const config = {
    output: {
        path: resolve(__dirname, '../docs/dist'),
        filename: '[name].js', // [name] 是entry的key
        publicPath: '/',
        assetModuleFilename: 'images/[name].[ext][query]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../docs/index.html'), // 引入模版
            favicon: resolve(__dirname, '../docs/public/favicon.ico'),
            filename: 'index.html',
            minify: { // 对index.html压缩
                collapseWhitespace: false, // 去掉index.html的空格
                removeAttributeQuotes: false // 去掉引号
            },
            hash: true, // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
            inlineSource: '.(js|css)'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../node_modules/react/umd/react.development.js'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../node_modules/react-dom/umd/react-dom.development.js'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../node_modules/react-router-dom/umd/react-router-dom.js'),
                    to: 'modules'
                },
                {
                    from: resolve(__dirname, '../node_modules/react-transition-group/dist/react-transition-group.js'),
                    to: 'modules'
                }
            ]
        }),
        new ProgressBarPlugin(
            {
                format: chalk.blue(`[  build :bar ${chalk.green.bold(':percent')} (:elapsed seconds) ]`),
                clear: true,
                summary: false,
                customSummary: () => {
                    console.log(
                        chalk.blueBright.bold('Your application is running here: '),
                        '\n',
                        chalk.greenBright.bold(`http://${getIp()}:${port}/`),
                        '\n',
                        chalk.greenBright.bold(`http://localhost:${port}/`)
                    );
                }
            }
        )
    ],
    devServer: {
        static: {
            directory: resolve(__dirname, '../docs/dist'),
        },
        compress: true, // 开启Gzip压缩
        host: '0.0.0.0', // 设置服务器的ip地址，默认localhost
        port, // 端口号
        hot: true,
        client: {
            overlay: true,
            progress: false
        }
    }
};

module.exports = merge(baseConfig, config);
