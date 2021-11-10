import {reactive} from 'vue';
import type {App} from 'vue';
import Antd from 'ant-design-vue';
import {message, notification} from 'ant-design-vue';
import {VueI18n, createI18n} from '@cherrypulp/i18n';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import { createApolloProvider } from '@vue/apollo-option';
import {Config} from 'js-config-helper';
import axios from "axios";
import UpLayout from '../layouts/UpLayout.vue';
import {Form} from 'js-form-helper';
import {Axios, AxiosInstance} from "axios";
import I18n from "@cherrypulp/i18n/types/I18n";
import {Store} from "vuex";
import {ApolloProviderOptions} from "@vue/apollo-option/types/apollo-provider";

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
    graphql?: {
        url?: string;
        client?: any;
    };
    translations: Record<string, object|string>;
    locale: string;
    locales: Record<string, object>;
    exclude:Array<string>
}

export interface exportedVars {
    config: boolean;
    api: boolean;
    http: boolean;
    i18n: boolean;
    form: Form;
    formApi: Form;
    store?: boolean;
    t?(key: string, data?: object, lang?: string): string | any;
    __?(key: string, data?: object, lang?: string): string | any;
    choice?(key: string, count?: number, data?: any, locale?: string): string | any;
    message?: typeof message;
    notification?: typeof notification;
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

let api: object|AxiosInstance;
let http: object|AxiosInstance;
let config: Config;
let i18n: I18n;
let store: Store<object> | unknown;
let form: Form;
let formApi: Form;
let graphql: ApolloClient<any>| unknown;

/**
 * Access to the instance a a singleton
 */
export let useUp:() => exportedVars;

export const UpVue = {

    install: (app: App, options: VueOptions) => {

        config = new Config(options);

        // Define overriden method
        const override = config.get('override') || {};

        /**
         * Define the main needed global properties accessible through components with globals
         *
         * This might be overwritten using override
         */
        app.config.globalProperties.$config = config.get('override.config') || config;
        app.config.globalProperties.$http = http = config.get('override.http') || axios.create();
        app.config.globalProperties.$api = api = config.get('override.api') || axios.create({
            baseURL: options.api.url,
        });
        app.config.globalProperties.$message = config.get('override.message') || message;
        app.config.globalProperties.$notification = config.get('override.notification') || notification;

        // Optionnals packages but loaded by default

        // Define form helper and wrapper from the Form Lib
        if (!config.has('exclude.form')) {
            // @ts-ignore
            form = function (data: object, options: object):Form {
                return new Form(data, {
                    ...{
                        http
                    },
                    ...options
                });
            }

            // @ts-ignore
            formApi = function(data: object, options: object):Form {
                return new Form(data, {
                    ...{
                        http: api
                    },
                    ...options
                });
            }
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

        if (!config.has('exclude.i18n')) {
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
        }

        /**
         * Include Antd if it's not excluded
         */
        if (!config.has('exclude.antd')) {
            app.use(Antd);
        }

        /**
         * Add graphql
         */
        if (!config.has('exclude.graphql')) {

            if (!config.has('graphql.client')) {
                // @ts-ignore
                const httpLink = createHttpLink({
                    uri: config.get('graphql.url'),
                });

                const cache = new InMemoryCache()

                const apolloClient = new ApolloClient({
                    link: httpLink,
                    cache,
                });

                const apolloProvider = createApolloProvider({
                    defaultClient: apolloClient,
                });

                provideApolloClient(apolloClient);

                app.use(apolloProvider);
                app.provide(DefaultApolloClient, apolloClient);
            } else {

                const apolloClient = config.get('graphql.client');

                const apolloProvider = createApolloProvider(<ApolloProviderOptions>{
                    defaultClient: apolloClient,
                });

                provideApolloClient(apolloClient);
                app.use(apolloProvider);
                app.provide(DefaultApolloClient, apolloClient);
            }
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
                graphql,
                message,
                notification,
                i18n,
                __: i18n.__.bind(i18n),
                t: i18n.__.bind(i18n),
                choice: i18n.choice.bind(i18n),
                ...override
            }

            if (config.has('debug')) {
                console.log('⤴ useUp() accessible vars :', exported);
            }

            useUp = () => {
                return exported
            };
        }
    },
}