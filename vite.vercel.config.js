// vite.vercel.config.js - Special configuration for Vercel deployment
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Generate a special 404.html file that redirects to index.html
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        // This ensures all routes redirect to the main app
        nested: path.resolve(__dirname, '404.html'),
      },
    },
  },
});
