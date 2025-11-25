import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// Mock API plugin
const mockApi = (): Plugin => ({
  name: 'mock-api',
  configureServer(server) {
    server.middlewares.use('/api', (req, res, next) => {
      if (req.url === '/user') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' }))
        return
      }
      next()
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mockApi(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})

