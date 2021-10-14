import {reactive} from 'vue';
import Antd from 'ant-design-vue';
import {message, notification} from 'ant-design-vue';
import {VueI18n, useI18n, createI18n} from '@cherrypulp/i18n';
import collect from 'collect.js';
// @ts-ignore
import {axios} from '@bundled-es-modules/axios';
import UpLayout from '../layouts/UpLayout.vue';
// @ts-ignore
import Form from '../form';
import {AxiosInstance} from "axios";

/**
 * Define the vue options interface
 */
interface VueOptions {
    project: {
        name: string,
        url: string,
        logo: {
            src: string
        }
    };
    i18n: Record<string, unknown>;
    storeMode: string;
    store: any;
    api: {
        url: string;
    };
    translations: Record<string, object>;
    locale: string;
    locales: Record<string, object>;
}

/**
 * If defined we allow to use the window global of axios and translations
 */
declare global {
    interface Window {
        axios: any;
        translations: Record<string, unknown>;
    }
}

let api:AxiosInstance;
let http:AxiosInstance;
let config:'collect.js';
let i18n:object;
let store:object;
let form:object;
let formApi:object;

/**
 * Access to the instance a a singleton
 */
let useUp:any;
useUp = null;

const UpVue = {

    install: (app: any, options: VueOptions) => {

        config = collect(options);

        /**
         * Define the main needed global properties accessible through components or composition API
         */
        app.config.globalProperties.$config = collect(options);

        app.config.globalProperties.$http = http = axios.create();
        app.config.globalProperties.$api = api = axios.create({
            baseURL: options.api.url,
        });
        app.config.globalProperties.$message = message;
        app.config.globalProperties.$notification = notification;

        // Define form helper and wrapper
        form = function (data:object, options:object) {
            return new Form(data, {
                ...{
                    http
                },
                ...options
            });
        }

        formApi = function (data:object, options:object) {
            return new Form(data, {
                ...{
                    http: api
                },
                ...options
            });
        }

        /**
         * Define the store by default we will use the Reactive mode (without using Vuex)
         */
        if (typeof options.store !== 'undefined' && options.storeMode === 'vuex') {
            store = options.store
        } else {
            // Set a minimal reactive store
            store = reactive({
                user: null,
                menus: null
            });
        }

        const translations = options.translations[options.locale];

        i18n = createI18n(translations, options.locale, {
            globalName: 'translations', // name of the autoloaded global variable
            forceDisplayKeys: true, // display the key if the label is not found (else it return an empty string)
            storeNotFounds: true, // store every key that are not found in a variable called "_notFounds" inside the global
        });

        app.use(VueI18n, {
            translations: translations,
            language: options.locale,
            options: options.i18n
        });

        if (!config.has('exclude.antd')) {
            app.use(Antd);
        }

        app.provide('UpVue', options);
        app.component('UpLayout', UpLayout);

        // Initialize the UpInstance singleton instance
        if (!useUp) {
            useUp = (app: any, options: VueOptions) => {
                return {
                    api,
                    http,
                    config,
                    store,
                    form,
                    formApi,
                    message,
                    notification,
                    i18n,
                    __: i18n.__.bind(i18n),
                    t: i18n.__.bind(i18n),
                    choice: i18n.choice.bind(i18n),
                }
            };
        }
    },
}

/**
 * Export composition helpers
 */
export {
    useUp,
    api,
    http,
    config,
    message,
    notification,
    form,
    formApi,
    i18n,
    store,
}

export default UpVue;