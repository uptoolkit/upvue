import {createApp} from 'vue'
import App from './App.vue'
import UpVue from "../lib/core/UpVue";
import router from "./routes";
import store from "./store";
import 'ant-design-vue/dist/antd.css';
import './index.css';

createApp(App)
    /**
     * 1. Import everything in Up to have an access through al your components
     */
    .use(UpVue, {
        project : {
            name: 'Up Toolkit Demo',
            logo: {
                src: '/img/logo.svg',
                srcset: '/img/logo.svg 640w,/img/logo_with_text.svg 1080w',
            },
            url: '/'
        },
        storeMode: 'reactive', // could be reactive|vuex
        // store: store, // if defined you can define your vuex store if you choose vuex
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
