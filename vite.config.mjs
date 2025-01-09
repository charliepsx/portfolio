import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio/', 
  build: {
    outDir: 'dist', 
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html', 
        es: 'index_es.html', 
      },
    },
  },
  server: {
    open: '/index.html', 
  },
});