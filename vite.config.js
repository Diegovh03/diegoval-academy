import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Evita crash EBUSY en Windows cuando un PDF está abierto
      ignored: ['**/public/docs/**'],
    },
  },
})
