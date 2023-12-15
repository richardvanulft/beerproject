import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // ... andere configuratie-opties ...
  resolve: {
    alias: {
      '/views': '/components',
    },
  },
});