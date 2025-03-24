// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration with proxy setup
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:6000', // Proxy requests starting with /api to the backend
  //   }
  // }
});
