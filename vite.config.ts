import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr  from 'vite-plugin-svgr';

const port = 6006;

export default defineConfig({
    plugins: [reactRefresh(), svgr()],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.styl'], // import引入文件的时候不用加后缀
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port
    }
});
