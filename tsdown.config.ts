import { defineConfig } from 'tsdown'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  entry: ['src/get-contributors.ts'],
  // banner: { js: '#!/usr/bin/env node' },
  outDir: 'dist',
  minify: true,
  clean: false,
})
