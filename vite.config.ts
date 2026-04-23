import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 【关键】这一行告诉 GitHub Pages 你的资源在 /liangzaojia_B/ 目录下
    base: '/liangzaojia_B/', 

    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'global': 'window',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'node-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'formdata-polyfill': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'cross-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'isomorphic-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-icons': ['lucide-react'],
            'vendor-motion': ['motion/react'],
          },
        },
      },
    },
  };
});
