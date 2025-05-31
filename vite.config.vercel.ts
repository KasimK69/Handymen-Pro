import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Special Vite config for Vercel deployment
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Minimize output size
    minify: 'terser',
    // Generate source maps for better debugging
    sourcemap: false,
    // Ensure proper output structure
    outDir: 'dist',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  // Ensure proper handling of static assets
  publicDir: 'public',
});
