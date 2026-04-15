import { defineConfig } from 'tsdown'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: ['src/get-contributors.ts'],
  outDir: 'dist',
  minify: true,
  clean: false,
})
