import { defineConfig } from 'vite'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

const entries = Object.fromEntries(
 glob.sync('src/**/*.{ts,tsx}').filter(item => !item.includes(".d.ts")).map(file => [
  relative(
      'src',
      file.slice(0, file.length - extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
)

const outputBase = {
  globals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react/jsx-runtime": "jsxRuntime",
  }
 }

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    emptyOutDir: true,
    outDir: "./dist",
    lib: {
      name: "real-estate_ui-kit",
      entry: resolve(__dirname, "src/index.ts"),
      cssFileName: "index",
    },
    ssr: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom"],
      input: entries,
      output:
      [
        {
          ...outputBase,
          exports: "named",
          format: "cjs",
          esModule: true
        },
        {
          ...outputBase,
          exports: "named",
          format: "esm",
          interop: "esModule",
        },
    ],
      plugins: [
      ],
    }
  },
})
