import {reactive} from 'vue';
import type {App} from 'vue';
import Antd from 'ant-design-vue';
import {message, notification} from 'ant-design-vue';
import {VueI18n, createI18n} from '@cherrypulp/i18n';
import collect, {Collection} from 'collect.js';
// @ts-ignore
import {axios} from '@bundled-es-modules/axios';
import UpLayout from '../layouts/UpLayout.vue';
// @ts-ignore
import Form from '../form';
import {Axios, AxiosInstance} from "axios";
import I18n from "@cherrypulp/i18n/types/I18n";
import {Store} from "vuex";

/**
 * Define the vue options interface
 */
interface VueOptions {
    debug: boolean,
    project: {
        name: string,
        url: string,
        logo: {
            src: string
        }
    };
    i18n: Record<string, unknown>;
    storeMode: "reactive" | "vuex";
    store: Store<unknown|object>;
    api: {
        url: string;
    };
    translations: Record<string, object|string>;
    locale: string;
    locales: Record<string, object>;
    exclude:Array<string>
}

/**
 * If defined we allow to use the window global of axios and translations
 */
declare global {
    interface window {
        axios: Axios;
        translations: Record<string, unknown>;
        __app: object
    }
}

let api: AxiosInstance;
let http: AxiosInstance;
let config: Collection<object>;
let i18n: I18n;
let store: Store<object> | unknown;
let form: Form;
let formApi: Form;

/**
 * Access to the instance a a singleton
 */
export let useUp:unknown|Function;

export const UpVue = {

    install: (app: App, options: VueOptions) => {

        config = collect(options);

        /**
         * Define the main needed global properties accessible through components with globals
         */
        app.config.globalProperties.$config = collect(options);
        app.config.globalProperties.$http = http = axios.create();
        app.config.globalProperties.$api = api = axios.create({
            baseURL: options.api.url,
        });
        app.config.globalProperties.$message = message;
        app.config.globalProperties.$notification = notification;

        // Define form helper and wrapper from the Form Lib
        form = function (data: object, options: object) {
            return new Form(data, {
                ...{
                    http
                },
                ...options
            });
        }

        formApi = function (data: object, options: object) {
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

        // Initialize the UpInstance singleton instance for composition Api
        if (!useUp) {

            /**
             * Add additionnals exported items
             */
            const exported = {
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
                choice: i18n.choice.bind(i18n)
            }

            if (config.has('debug')) {
                console.log('⤴ useUp() accessible vars', exported);
            }

            useUp = () => {
                return exported
            };
        }
    },
}