import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // 重要：如果是项目仓库，请改为 '/仓库名/'
  // 如果是个人/组织主页 (username.github.io)，保持 '/' 或 './'
  base: '/avatar-mirror/',

  plugins: [react()],

  build: {
    outDir: 'dist',
    assetsDir: 'static',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // 保持这种结构可以让缓存清理更高效
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  resolve: {
    alias: {
      // 使用 path.resolve 确保绝对路径正确
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
    // 仅在 Vite 6+ 且有外部访问需求时开启
    // allowedHosts: true, 
  },
});