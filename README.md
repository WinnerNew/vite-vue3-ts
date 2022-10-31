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

### commitizen 规范提交 (交互式提交 + 自定义提示文案 + Commit规范)
1. commitizen 
2. cz-conventional-changelog 
3. @commitlint/config-conventional 
4. @commitlint/cli 
5. commitlint-config-cz 
6. cz-customizable

### husky 提交钩子
1. husky
2. lint-staged

### npm 命令
1. "eslint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src" 使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .js 和 .vue 的文件
2. "prettier": "prettier --write ." 自动格式化当前目录下的所有文件
3. "commit":"git-cz"  引导设置规范化的git提交信息格式
4. "prepare": "husky install"  向项目中方便添加git hooks
5. "lint-staged": "lint-staged" 在git暂存文件上运行linters的工具,在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的

### 开发规范
1. git pull origin master 更新最新的代码
2. do coding... 编码
3. git add .  提交改动的文件到git暂存区
4. npm run commit 备注git改动信息
5. git push   推送变更到远程分支
