import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test-setup.js",
    coverage: {
      exclude: [
        "postcss.config.js",
        "tailwind.config.js",
        "eslint.config.js",
        "vite.config.js",
        "src/main.jsx",
        "src/App.jsx",
      ],
    },
  },
});
