---
sidebar: auto
---

# Up Vue

## Why ?

🥸 : Bootstrapping a project is unexpectedly very difficult because there are so many choices, too many setups and configs to do before just working on a project...

😩 : "Hell yeah, you're right. Javascript fatigue..."

🥸 : Up Vue help you to have everything you need to start for creating a webapp as simple as that :

- [Vue 3 for the Javascript framework](https://vuejs.org/)
- [Tailwind as a Front-End Utilities](https://tailwindcss.com/)
- [DaisyUI a Tailwind components extension](https://daisyui.com/)
- [AntDesignVue as Ui Library](https://antdv.com/)
- [Axios for the ajax request](https://axios-http.com/)
- [I18n for the translations helpers](https://www.npmjs.com/package/@cherrypulp/i18n)
- [Collect.js for config provider](https://collect.js.org/)
- [VueUse as Vue3 helpers](https://vueuse.org/)
- [FormBackendValidation as form helper](https://github.com/spatie/form-backend-validation)
- [DayJS as date helper](https://day.js.org/)
- [Usefull middlewares and libs for VueX](https://vuex.vuejs.org/)

🧐 : "Mmh, interesting..."

🥸 : At the best, you can just use our components or layouts making a breeze for your quick prototyping or web development with everything to start included.

🧐 : "Mmh, yes but what if I want to..."

🥸 : Shut ! I know your dev syndrom... At the minimum, you will have a good boilerplate and UP to you to
override it when you will feel the need. Thanks to our "[convention over configuration philosophy](https://en.wikipedia.org/wiki/Convention_over_configuration)" and [S.O.L.I.D principle](https://en.wikipedia.org/wiki/SOLID) :-).

😁 : "Ok now I want to start !!!"

## Getting started

In your Vue project just make :

````bash
yarn add upvue #or npm i upvue --save
````

Then in your main app, do :

````javascript
import {createApp} from 'vue'
import {UpVue} from "upvue"
import router from "./routes"
import store from "./store"
import App from './App.vue'

import 'ant-design-vue/dist/antd.css' // optionnal
import './index.css' // import tailwind base see: https://tailwindcss.com/

createApp(App)
  /**
   * 1. One base config to setup them all, this is the philosophy
   */
  .use(UpVue, {
    project: {
      name: 'Up Toolkit Demo',
      logo: {
        src: '/img/logo.svg',
      },
      url: '/'
    },
    storeMode: 'reactive', // could be reactive or vuex
    // store: store, // if vuex you must define vuex store
    api: {
      url: '/api', // Replace with your api endpoint
    },
    translations: {
      en_EN: {
        hello: 'Hello World !',
      },
      fr_FR: {
        hello: 'Bonjour le monde',
      },
    },
    locale: 'en_EN',
    locales: [
      'en_EN', 'fr_FR'
    ],
    //exclude: [
    // 'antd' //-> if you don't want to include the Antd Design Ui Kit
    //],
    //override: {
    // 'i18n' //-> if you want to override a package (just make sure that you implement the interface)
    //}
  })
  .use(store) // Store for demo purpose
  .use(router) // Routing For Demo purpose
  .mount('#app');
````

### Accessing to helpers using useUp in your Composition Api

In your component you can do :

`````javascript
<script setup>
import {useUp} from 'upvue'
const {
  api,
  http,
  config,
  message,
  notification,
  form,
  formApi,
  i18n,
  store,
} = useUp()
</script>
`````

### Accessing to helpers using Inject methods

In your main Layout App.vue, you can do :

`````javascript
<template>
  <UpLayout>
    <router-view></router-view>
  </UpLayout>
</template>

<script>
import {inject} from "vue";
import {UpLayout} from "upvue";

export default {
  name: 'App',
  components: {
      UpLayout
  },
  setup(){
      const inject('config'); // collectjs helper exemple config.get('project.name')
      const inject('http'); // axios ajax helper
      const inject('api');  // axios ajax helper with your baseUrl Api as base
      const inject('i18n'); // i18n helper
      const inject('store'); // store helper
      const inject('form');  // form helper 
      const inject('formApi'); // form helper with your api endpoint as base
      const inject('message'); // message helper with your api endpoint as base
      const inject('notification'); // notification helper with your api endpoint as base
      const inject('t'); // i18n helper similar to __ from laravel
      const inject('choice'); // i18n helper similar to __ from laravel
    }
}
</script>
`````
### What's the difference between inject and useUp() ?

This is mainly a design pattern UP to you :-). With inject you can abstract the injection and replace the helper with the one you want and import UpVue in one place but with useUp() you can also simply change the useUp import by a search and replace.

## Digging deeper

You can get full documentation or check our complete example :

- [https://vue.uptoolkit.com](https://vue.uptoolkit.com)
- [https://github.com/uptoolkit/upvue/tree/main/example](https://github.com/uptoolkit/upvue/tree/main/example)

### Discover the whole ecosystem of Up Toolkit

Up Vue is a part of the Up Toolkit ecosystem a set of packages and utilities for changemakers.

For more information go to :

- [https://uptoolkit.com](https://uptoolkit.com)

# How to contribute ?

Everyone can contribute and propose any components or post an issues, make a suggestion :

- [https://github.com/uptoolkit/upvue/issues](https://github.com/uptoolkit/upvue/issues)
- [You can also share your package in Awesome Up](https://github.com/uptoolkit)

# To dos :

- [x] Testing using Jest
- [x] Customising AntDesign style
- [x] Documenting code
- [x] Setting up Storybook
- [x] More typehint and typescript
- [x] Add more useful components and libs :-)

Any helps wanted !

# Support us

Support us on Open Collective or buy us a Tree :

- [https://opencollective.com/uptoolkit](https://opencollective.com/uptoolkit)

# License

MIT

This package is [Treeware](https://treeware.earth).

If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/uptoolkit/upvue) to thank us for our work.

By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.