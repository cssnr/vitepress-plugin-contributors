import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const name = 'Contributors'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, `src/${name}.vue`),
      name,
      fileName: (format) => `${name}.${format}.js`,
    },
    cssCodeSplit: true,
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
