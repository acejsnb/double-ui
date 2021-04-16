module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: true,
        amd: true
    },
    settings: {
        react: {
            version: '17.0.2'
        },
        polyfills: ['Promise', 'URL'],
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    globals: {
        Babel: true,
        React: true,
        ReactDOM: true,
        mountNode: true
    },
    plugins: [
        'react', 'babel', '@typescript-eslint', 'react-hooks'
    ],
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:compat/recommended',
        'plugin:react/recommended',
        'plugin:import/typescript'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        'react/jsx-uses-react': 'error', // 防止react被错误地标记为未使用
        'react/jsx-uses-vars': 'error',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': [2, { ignore: [''] }],
        'import/no-webpack-loader-syntax': 0,
        'import/prefer-default-export': 0,
        'arrow-body-style': [2, 'as-needed'], // 箭头函数
        'class-methods-use-this': 0, // 强制类方法使用 this
        // 缩进Indent with 4 spaces
        indent: ['error', 4],
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],
        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        'no-console': 0, // 不禁用console
        'no-debugger': 2, // 禁用debugger
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'comma-dangle': [2, 'never'],
        'no-use-before-define': 'off',
        'import/extensions': ['error', {
            js: 'never',
            ts: 'never',
            tsx: 'never'
        }]
    }
};
