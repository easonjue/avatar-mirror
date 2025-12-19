import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// 提取仓库名（便于统一管理）
const GITHUB_REPO_NAME = 'avatar-mirror';

export default defineConfig(({ mode }) => ({
  // 修复：确保 base 路径正确，GitHub Pages 需要以 / 结尾
  base: mode === 'production' ? `/${GITHUB_REPO_NAME}/` : '/',

  plugins: [react()],

  build: {
    outDir: 'dist',
    // 修复：assetsDir 不要以 / 开头，避免与 base 拼接时产生双斜杠
    assetsDir: 'static',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // 修复：路径不要以 / 开头
        entryFileNames: `static/js/[name]-[hash].js`,
        chunkFileNames: `static/js/[name]-[hash].js`,
        assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
        manualChunks: undefined,
        compact: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },
}));