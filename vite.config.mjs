import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'; // Make sure to import vue here

export default defineConfig({
  plugins: [
    vue(), // Now vue() is correctly referenced
    laravel({
      input: './resources/js/app.js', // Path to your main JS entry file
      refresh: true, // Enable hot-module replacement
      // Add other configuration options as needed
    }),
    // Other plugins...
  ],
});
