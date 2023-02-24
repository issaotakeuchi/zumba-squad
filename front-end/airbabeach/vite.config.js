import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      reporter: ["text", "html"],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  },
})
