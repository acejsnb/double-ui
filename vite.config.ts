import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
// @ts-ignore
import reactSvgPlugin from 'vite-plugin-react-svg';

const port = 6006;

export default defineConfig({
    plugins: [reactRefresh(), reactSvgPlugin({ defaultExport: 'component' })],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port
    }
});
