import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const entries = Object.fromEntries(
  glob
    .sync('src/**/*.{ts,tsx}')
    .filter((item) => !item.includes('.d.ts'))
    .map((file) => [
      relative('src', file.slice(0, file.length - extname(file).length)),
      fileURLToPath(new URL(file, import.meta.url)),
    ])
)

const outputBase = {
  globals: {
    react: 'React',
    'react/jsx-runtime': 'jsxRuntime',
    'react-dom': 'ReactDOM',
  },
}

// https://vite.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      cssFileName: 'index',
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'real-estate_ui-kit',
    },
    outDir: './dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: entries,
      output: [
        {
          ...outputBase,
          esModule: true,
          exports: 'named',
          format: 'cjs',
        },
        {
          ...outputBase,
          exports: 'named',
          format: 'esm',
          interop: 'esModule',
        },
      ],
      plugins: [],
    },
    ssr: true,
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
