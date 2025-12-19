import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@assets': resolve(__dirname, './src/assets'),
            '@components': resolve(__dirname, './src/components'),
            '@models': resolve(__dirname, './src/models'),
            '@pages': resolve(__dirname, './src/pages'),
            '@services': resolve(__dirname, './src/services'),
        },
    },
    css: {
        preprocessorOptions: {
            // nothing special needed for swiper here usually
        },
    },
    plugins: [react(), tailwindcss()],
})

