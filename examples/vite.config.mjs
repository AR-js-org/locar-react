import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

const entries = { main: 'index.html' };
['01-hello-world', '02-geoline'].forEach ( example => {
    entries[example] = resolve(import.meta.dirname, `${example}/index.html`);
});

export default defineConfig({
    base: '/locar-react',
    plugins: [react()],
    build: {
        outDir: '../docs',
        rollupOptions: {
            input: entries 
        }
    }
});