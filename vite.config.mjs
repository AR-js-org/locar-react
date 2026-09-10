import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';
import { esmExternalRequirePlugin } from 'vite';

export default defineConfig({
    plugins: [react(), dts({
        include: ["lib/**/*.ts"],
        outDirs: "dist",
        entryRoot: "lib"
    })],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'lib/index.ts'),
            name: 'locar-react',
            fileName: format => `locar-react.${format}.js`
        },
        rolldownOptions: {


            plugins: [esmExternalRequirePlugin({
                external: ['react', 'react-dom', '@react-three/fiber', 'three']
            })],


            output: {
                globals: {
                    'react': "React",
                    'react-dom': "ReactDOM",
                    'three': 'THREE',
                    '@react-three/fiber': 'R3F'
                }
            }

        }
    }
});
