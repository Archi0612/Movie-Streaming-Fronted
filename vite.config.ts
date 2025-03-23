import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import path from "path";


export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 3012,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
  },
});
