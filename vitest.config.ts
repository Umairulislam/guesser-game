import { defineConfig } from "vitest/config"
import path from "path"

// Export the configuration for Vitest
export default defineConfig({
  test: {
    // Set the test environment to jsdom (simulates a browser environment in Node.js)
    environment: "jsdom",
    // Specify setup files to run before each test suite
    setupFiles: ["./tests/setup.ts"],
    // Include all .test.ts or .test.tsx files inside the src folder and its subfolders
    include: ["./src/**/*.test.tsx"],
    // Allow usage of global variables in tests (like describe, it, expect)
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
