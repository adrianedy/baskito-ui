/// <reference types="vitest" />

import {defineConfig, PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import {visualizer} from 'rollup-plugin-visualizer'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/Baskito.ts'),
      name: 'baskito',
      fileName: (format) => `baskito.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        exports: 'named',
        assetFileNames: `baskito.[ext]`, //without this, it generates build/styles.css
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'vue': 'Vue'
        },
      },
    },
  },

  css: {preprocessorOptions: {scss: {charset: false}}},

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    visualizer() as unknown as PluginOption,
    dts({
      cleanVueFileName: true
    })
  ],

  server: {
    host: true,
  },

  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html'],
    },
  },
})
