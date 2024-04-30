import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {  
  //   proxy: {  
  //     '/api': {  
  //       target: 'http://localhost:8000', // 你的本地HTTP服务器地址  
  //       changeOrigin: true, // 允许跨域  
  //       rewrite: (path) => path.replace(/^\/api/, '') // 移除前缀，根据你的实际情况可能需要调整  
  //     }  
  //   }  
  // } 
})
