const { defineConfig } = require("vite");
const axios = require("axios");
const path = require("path");
const react = require("@vitejs/plugin-react-swc");
const wasm = require("vite-plugin-wasm");

module.exports = defineConfig(async ({ mode }) => {
  // ESM-only plugin. Must be loaded via dynamic import in a CJS config.
  // const { nodePolyfills } = await import("vite-plugin-node-polyfills");

  // ⚠️ SECURITY: Removed remote eval. Do not execute code fetched from the internet here.
  // If you need runtime config, load JSON and use it as data, not executable code.

  return {
    plugins: [
      react(),
      // nodePolyfills({
      //   include: ["buffer"],
      //   globals: {
      //     Buffer: true,
      //   },
      // }),
      wasm(),
    ],
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ["@stellar/stellar-xdr-json"],
      include: ["react-is"],
    },
    define: {
      global: "window",
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
        },
        "/friendbot": {
          target: "http://localhost:8000/friendbot",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
