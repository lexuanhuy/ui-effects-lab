import { defineConfig } from 'vite'

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/ui-effects-lab/' : '/',
    preview: {
        cors: true
    },
    server: {
        cors: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        hmr: {
            protocol: 'ws', // Change to 'wss' if you are using HTTPS
            host: 'localhost',
        }
    }
})