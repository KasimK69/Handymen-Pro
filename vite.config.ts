import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Enable SPA fallback for client-side routing
    proxy: {},
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: mode === 'development',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Ensure output is optimized for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        // Optimize chunk naming for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            // Add other UI libraries as needed
          ],
        },
      },
    },
  },
  // Optimize for production
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // Ensure proper handling of dynamic imports
  experimental: {
    renderBuiltUrl(filename) {
      return '/' + filename;
    },
  },
}));
