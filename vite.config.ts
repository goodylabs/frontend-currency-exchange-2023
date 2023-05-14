import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@components/*": path.resolve(__dirname, "src/components/*"),
      "@api": path.resolve(__dirname, "src/api"),
      "@api/*": path.resolve(__dirname, "src/api/*"),
      "@typedefs": path.resolve("src/types"),
      "@typedefs/*": path.resolve("src/types/*"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  plugins: [react()],
});
