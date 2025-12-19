import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

// 提取仓库名（便于统一管理）
const GITHUB_REPO_NAME = 'avatar-mirror';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${GITHUB_REPO_NAME}/` : '/',

  plugins: [react()],

  build: {
    outDir: 'dist',
    assetsDir: 'static',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `static/js/[name]-[hash].js`,
        chunkFileNames: `static/js/[name]-[hash].js`,
        assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
        manualChunks: undefined,
        compact: true,
      },
    },
    // 兜底：禁止手动设置 assetsPublicPath（避免叠加斜杠）
    assetsPublicPath: '',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // server: {
  //   host: '0.0.0.0',
  //   port: 3000,
  //   // 本地开发允许外部访问（可选）
  //   allowedHosts: 'all',
  // },
}));