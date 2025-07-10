import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
        tailwindcss(),
  ],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:9000/messages',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/skills':{
        target:'http://localhost:9002/skills',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/skills/, ''),
      },
       '/portfolio':{
        target:'http://localhost:9005/portfolio',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/portfolio/, ''),
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
