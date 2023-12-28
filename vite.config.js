import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    Vue(),
    eslintPlugin(),
  ],
});
