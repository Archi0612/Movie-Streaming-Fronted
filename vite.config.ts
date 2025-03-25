import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {} from "vitest/config"
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 3012,
  },
  test: {
    globals: true,
    environment: "jsdom", // Simulates a browser environment for React components
    setupFiles: "src/setupTest.ts", // Setup file for global test configurations
    // exclude: [...configDefaults.exclude, "node_modules/"], // Exclude unnecessary files
    // coverage: {
    //   provider: "v8", // Uses V8 to generate coverage reports
    //   reporter: ["text", "json", "html"], // Generates coverage reports
    // },
  },
})
