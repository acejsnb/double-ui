module.exports = {
    presets: [
        [
            '@babel/preset-env'
            // https://babeljs.io/docs/en/babel-polyfill#docsNav
            // 本项目 - 不需要处理兼容
            /* {
                loose: true,
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3
            } */
        ],
        ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }]
    ]
};
