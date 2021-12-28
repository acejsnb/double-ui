const { resolve } = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base');
const EntryObj = require('../src/single.ts');

const entry = {}, patterns = [];
// eslint-disable-next-line no-restricted-syntax
for (const key of Object.keys(EntryObj)) {
    entry[key] = resolve(__dirname, `${EntryObj[key]}/build.ts`);
    patterns.push(
        {
            from: resolve(__dirname, `${EntryObj[key]}/index.ts`),
            to: resolve(__dirname, `../lib/${key}/index.d.ts`)
        }
    );
}

const config = {
    mode: 'production',
    entry,
    output: {
        path: resolve(__dirname, '../lib'),
        // assetModuleFilename: 'static/[name].[hash:5][ext][query]',
        assetModuleFilename: '../static/[name][ext]',
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
        /*new webpack.BannerPlugin({
            banner: '@import "../base/style.css";',
            raw: true,
            test: /\.css$/
        }),*/
        new CopyPlugin({
            patterns
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
