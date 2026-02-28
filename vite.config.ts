import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, './src'),
        "@components": path.resolve(__dirname, './src/components'),
        "@services": path.resolve(__dirname, './src/services'),
        "@styles": path.resolve(__dirname, './src/styles'),
        "@utils": path.resolve(__dirname, './src/utils'),
        "pages": path.resolve(__dirname, './src/pages'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
  }
})