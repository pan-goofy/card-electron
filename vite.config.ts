import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@": path.resolve("./src")
    }
  },
  build: {
    outDir:'./web'
  },
  pluginOptions: {
    electronBuilder: {
        externals: ["electron-edge-js"],
    },
  },
})
