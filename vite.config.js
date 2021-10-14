import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: true,
  plugins: [
    vue()
  ],
  build: {
    publicDir: false,
    lib:
      {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'upvue',
        fileName: (format) => `index.${format}.js`
      }
    ,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "@bundled-es-modules/axios",
        "@rollup/plugin-dynamic-import-vars",
        "@vueuse/core",
        "@vueuse/integrations",
        "@vueuse/router",
        "ant-design-vue",
        "autoprefixer",
        "collect.js",
        "core-js",
        "daisyui",
        "form-backend-validation",
        "lodash",
        "moment",
        "tailwindcss",
        "vue",
        "vue-router",
        "vuex",
        'ant-design-vue',
        'collect.js',
        'axios',
        "@headlessui/vue",
        "@heroicons/vue",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          axios: 'axios'
        }
      }
    }
  }
})