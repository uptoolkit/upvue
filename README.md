# Up Vue

## Why ?

Bootstraping a project is somewhat very difficult because there are too much choices, too much setups and configs to do
before just working on a project...

Up Vue help you to have everything you need to start for creating a webapp as simple as that :

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

At the best, you can just copy-paste a component or a layout making a breeze for your quick prototyping.

At the minimum, you have a good boilerplate to adapt for your own component and UP to you to
override it when you will feel the need :-).

# Getting started

In your Vue project just make :

````bash
yarn add upvue #or npm i upvue --save
````

Then in your main app, do :

````javascript
import {createApp} from 'vue'
import UpVue from "upvue"
import router from "./routes"
import store from "./store"
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import './index.css'

createApp(App)
  /**
   * 1. Import everything in Up to have an access through al your components of the config
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
  })
  .use(store) // Store for demo purpose
  .use(router) // Routing For Demo purpose
  .mount('#app');
````

### Accessing to helpers using useUp

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
### What's the difference between Inject and useUp ?

This is mainly a design pattern choice UP to you :-). With inject you can abstract the injection and replace the helper with the one you want and override Upvue without import but you can also simply change the useUp import by yours.

# Digging deeper

You can get more informations with the Documentation or check your complete example :

- [https://vue.uptoolkit.com/docs](https://vue.uptoolkit.com)

## Discover the whole ecosystem of Up Toolkit

Up Vue is a part of the Up Toolkit ecosystem a set of packages and utilities for changemakers. For more informations go to :

- [https://uptoolkit.com](https://uptoolkit.com)

# How to contribute ?

Everyone can contribute and propose any components or post an issues, make a suggestion :

- [https://github.com/uptoolkit/upvue/issues](https://github.com/uptoolkit/upvue/issues)
- [You can also share your package in Awesome Up](https://github.com/uptoolkit)

# To dos : 

[x] Testing using Jest 
[x] Customising AntDesign style 
[x] Documenting code
[x] Setting up Storybook
[x] More typehint and typescript
[x] Add useful components and libs forever :-)

# License

MIT