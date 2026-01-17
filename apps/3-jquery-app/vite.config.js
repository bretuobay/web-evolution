import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3002,
    fs: {
      allow: ['..', '../../packages', '../node_modules'],
    },
  },
  resolve: {
    alias: {
      '@design-system': resolve(__dirname, '../../packages/design-system/src/styles'),
    },
  },
  css: {
    preprocessorOptions: {},
  },
});
