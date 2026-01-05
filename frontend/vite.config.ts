import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: mode === "development"
      ? {
          "/api": {
            target: "http://localhost:4000",
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
        drop_debugger: mode === "production",
        pure_funcs: mode === "production" ? ["console.log", "console.info", "console.debug"] : [],
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Node modules
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "react-vendor";
            }
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            if (id.includes("@radix-ui")) {
              return "ui-vendor";
            }
            if (id.includes("framer-motion")) {
              return "animation-vendor";
            }
            if (id.includes("gsap")) {
              return "gsap-vendor";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query-vendor";
            }
            if (id.includes("axios")) {
              return "http-vendor";
            }
            if (id.includes("recharts")) {
              return "charts-vendor";
            }
            // Other vendor chunks
            return "vendor";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    cssMinify: true,
    sourcemap: mode === "development",
    reportCompressedSize: false, // Faster builds
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
