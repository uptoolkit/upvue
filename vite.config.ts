import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib:
        {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'UpVue',
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
        "AntD",
        "autoprefixer",
        "collect",
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
          "@bundled-es-modules/axios": "axios",
          "ant-design-vue": "Antd",
          "collect.js": "collect",
          axios: 'axios'
        }
      }
    }
  }
})