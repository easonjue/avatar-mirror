import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// 完整的 GitHub Pages 根域名（必须填你的用户名）
const GITHUB_PAGES_DOMAIN = "easonjue.github.io";
// 仓库名
const GITHUB_REPO_NAME = "avatar-mirror";

export default defineConfig(({ mode }) => {
  console.log(mode, "mode");
  return {
    // 生产环境：完整的路径前缀（域名+仓库名），确保资源URL根正确
    base:
      mode === "production"
        ? `https://${GITHUB_PAGES_DOMAIN}/${GITHUB_REPO_NAME}/`
        : "/",

    plugins: [react()],

    build: {
      outDir: "dist",
      assetsDir: "static",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // 资源路径：去掉开头的/，避免和base拼接出//
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          // 强制所有资源路径为相对路径，由base统一拼接完整域名
          paths: {
            // 兜底：所有静态资源都基于base路径
            static: `${
              mode === "production"
                ? `https://${GITHUB_PAGES_DOMAIN}/${GITHUB_REPO_NAME}/`
                : "/"
            }/static`,
          },
        },
      },
      // 禁止自动添加路径前缀，避免叠加
      assetsPublicPath: "",
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  };
});
