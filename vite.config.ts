import { defineConfig, UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as path from 'path'; //pnpm i @types/node --save-dev 安装 @type/node 保证 node 的使用
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '');
    return {
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@components': path.join(__dirname, './src/components'),
                '@utils': path.join(__dirname, './src/utils'),
                '@router': path.join(__dirname, './src/router'),
            },
        },
        plugins: [
            vue(),
            createHtmlPlugin({
                minify: true,
                /**
                 * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
                 * @default src/main.ts
                 */
                entry: 'src/main.ts',
                /**
                 * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
                 * @default index.html
                 */
                template: '/index.html',
                /**
                 * 需要注入 index.html ejs 模版的数据
                 */
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE,
                        injectScript: `<script src="./inject.js"></script>`,
                        echartScript: `<script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>`,
                    },
                },
            }),
        ],
        server: {
            // port: 8080, //启动端口
            host: '0.0.0.0', //配置ip 从ip启动
            open: true,
            // hmr: true,
            hmr: {
                // host: '0.0.0.0',
                // port: 8080,
            },
            // 设置 https 代理
            proxy: {
                '/api': {
                    target: env.VITE_RES_URL,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
});
