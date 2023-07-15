import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const port = 6006;

export default defineConfig({
    plugins: [
        react(),
        svgr({ exportAsDefault: true })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'], // import引入文件的时候不用加后缀
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        host: true,
        port
    }
});
