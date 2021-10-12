# double-ui：
- 基于react的ui库

## config
- 开发预览 `dev.js`
- 组件打包 `single.js`


## 安装
- `npm i -S double-ui`

## 按需引入
- 引入组件 `import { Button } from 'double-ui'`
- 安装依赖包   `npm i -D babel-plugin-import`
- 在 babel.config.js 中的plugins里添加
```js
    [
          "import",
          {
            "libraryName": "double-ui",
            "style": (name) => `${name}/style.css`
          }
    ]
```

## 启动说明
- npm run dev ` 启动开发预览 `
- npm run vite ` 启动开发预览 `

## z-index规范
- message 9000～9499
- loading 8000～8499
- 下拉列表 7000～7499
- 模态弹窗 6000～6499
- 遮罩层/Popover 5500～5999
- 全局菜单 5000～5499
- 顶栏 4000～4499
- 侧边栏（侧拉窗/局部loading）3000～3499
- **注意：loading 小于 message，因为在loading过程中可能会出现报错等提示**
    
