// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint' as any;

// export default defineConfig({
//   plugins: [
//     react(),
//     eslint({
//       // Configure options if needed
//       failOnError: false, // This will not crash the server on lint errors
//       include: ['src/**/*.ts', 'src/**/*.tsx'], // Files to lint
//       emitWarning: true, // Show warnings in console
//       emitError: true, // Show errors in console
//     }),
//   ],
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Use type assertion for the import

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: Number(process.env.PORT) || 3012,
  }
});