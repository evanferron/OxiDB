import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],

    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/**",
        "src/test/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/vite-env.d.ts",
        "src-tauri/**",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },

    exclude: ["node_modules/**", "src-tauri/**"],
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
