import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 补全核心配置：设置基础路径为仓库名，解决 GitHub Pages 资源 404 问题
    // 注意：如果你的仓库名是 liangzaojia_B，这里必须匹配
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
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
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
