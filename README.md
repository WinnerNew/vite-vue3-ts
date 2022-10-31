# Vue 3 + TypeScript + Vite

## 推荐开发工具及插件

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


## 项目配置

### index.html
1. vite-plugin-html 在vite.config.ts 中配置 plugins 配合 createHtmlPlugin 方法完成hml模版配置

### less
1. less

### sass
1. sass

### node
1. @types/node 识别 nodejs 内置模块

### eslint
1. eslint 基础包
2. eslint-plugin-vue 支持 vue
3. @typescript-eslint/eslint-plugin 支持 TS

### prettier
1. prettier 基础包
2. eslint-config-prettier 关闭与eslint冲突的规则
3. eslint-plugin-prettier 按照eslint规则执行格式化

### npm 命令
1. "eslint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src" 使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .js 和 .vue 的文件
2. "prettier": "prettier --write ." 自动格式化当前目录下的所有文件
 
