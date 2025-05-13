import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { vitePluginVitest } from 'vite-plugin-vitest';

// Use type assertion for the import

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: Number(process.env.PORT) || 3012,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});