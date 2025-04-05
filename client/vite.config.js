// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration with proxy setup
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  }
});
