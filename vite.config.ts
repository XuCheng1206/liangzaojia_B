import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 1. 核心修复：指定 GitHub Pages 的子路径
    base: '/liangzaojia_B/', 
    
    // 2. 插件配置
    plugins: [react(), tailwindcss()],
    
    // 3. 环境变量与全局变量
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'global': 'window',
    },
    
    // 4. 路径别名设置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'node-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'formdata-polyfill': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'cross-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
        'isomorphic-fetch': path.resolve(__dirname, 'src/fetch-shim.ts'),
      },
    },
    
    // 5. 开发服务器设置
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    
    // 6. 打包优化
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
