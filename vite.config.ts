import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    exclude: ['UpdateApplicationModal']
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
  }
}) 