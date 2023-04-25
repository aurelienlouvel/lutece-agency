import { splitVendorChunkPlugin } from "vite";

const { resolve } = require("path");
const { defineConfig } = require("vite");

const root = resolve(__dirname, "./");

module.exports = defineConfig({
  root,
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
      },
    },
  },
});
