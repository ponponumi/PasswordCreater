// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    manifest: true,
    outDir: './test/html/build',
    rollupOptions: {
      input: [
        './test/js/test.js',
        './test/scss/style.scss',
      ],
    },
  },
});
