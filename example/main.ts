import {createApp} from 'vue'
import App from './App.vue'
import {UpVue} from "../src";
import router from "./routes";
import store from "./store";
import '../src/upui-vue/dist/index.css';
import './index.css';

createApp(App)
    /**
     * 1. Import everything in Up to have an access through al your components
     */
    .use(UpVue, {
        debug: true,
        project : {
            name: 'Up Toolkit Demo',
            logo: {
                src: '/img/logo.svg'
            },
            url: '/'
        },
        graphql: {
            url: 'https://api.mocki.io/v2/c4d7a195/graphql', // Replace with your graphql Api URL using default configuration
            //client: apolloClient, // you can also override with your own apolloClient instance @see https://v4.apollo.vuejs.org/guide-option/setup.html#_2-create-the-apollo-client
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
