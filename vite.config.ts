import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  // 🔒 Server configuration
  server: {
    port: 5173,
    strictPort: true,
    // ⚠️ Em desenvolvimento, permite hot-reload de outros hosts
    // Em produção, usar HTTPS via reverse proxy (nginx/apache)
    host: 'localhost',
  },

  // 📦 Build optimizations
  build: {
    target: 'ES2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa vendor chunks para melhor caching
          bootstrap: ['bootstrap'],
          react: ['react', 'react-dom', 'react-router-dom'],
          icons: ['react-icons'],
        },
      },
    },
  },

  // 🔧 Resolve aliases
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
