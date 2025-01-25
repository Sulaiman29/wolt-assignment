// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Use jsdom environment for testing
    setupFiles: './src/setupTests.js', // Adjust the path if necessary
  },
});
