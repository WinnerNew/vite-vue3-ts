import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path'; //pnpm i @types/node --save-dev 安装 @type/node 保证 node 的使用
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [vue()],
    server: {
        port: 8080, //启动端口
        open: true,
        hmr: true,
        // hmr: {
        // host: "127.0.0.1",
        // port: 8080,
        // },
        // 设置 https 代理
        proxy: {
            '/api': {
                target: 'http://Alvin/api.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
});
