import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    setupNodeEvents(on, config) {
      on("file:preprocessor", vitePreprocessor());
    },
  },
});
