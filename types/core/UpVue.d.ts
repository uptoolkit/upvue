import { Ref } from 'vue';
import type { App } from 'vue';
import { message, notification } from 'ant-design-vue';
import { ApolloClient } from '@apollo/client/core';
import { UseQueryReturn } from '@vue/apollo-composable';
import { useQuery } from '@vue/apollo-composable';
import { Config } from 'js-config-helper';
import { Form } from 'js-form-helper';
import { Axios, AxiosInstance } from "axios";
import I18n from "@cherrypulp/i18n/types/I18n";
import { Store } from "vuex";
import { DeepNonNullable, DeepRequired } from "ts-essentials";
/**
 * Define the vue options interface
 */
export interface VueOptions {
    debug: boolean;
    project: {
        name: string;
        url: string;
        logo: {
            src: string;
        };
    };
    i18n: Record<string, unknown>;
    storeMode: "reactive" | "vuex";
    store: Store<unknown | object> | object;
    api: {
        url: string;
    };
    graphql?: {
        url?: string;
        client?: any;
    };
    gql: typeof useQuery;
    translations: Record<string, object | string>;
    locale: string;
    locales: Record<string, object>;
    exclude: Array<string>;
}
export interface graphqlQuery {
    (Document: undefined): UseQueryReturn<any, any>;
}
export interface graphqlResult<TResult, TDefaultValue, TReturnValue> {
    result: Ref<TResult>;
    defaultValue?: TDefaultValue;
    pick?: (data: DeepRequired<DeepNonNullable<TResult>>) => TReturnValue;
}
export declare type FormFunction = (data?: object, options?: object) => Form;
export interface exportedVars {
    config: typeof config;
    api: AxiosInstance;
    http: AxiosInstance;
    i18n: typeof I18n;
    form: FormFunction;
    formApi: FormFunction;
    store?: typeof Store | any;
    t?(key: string, data?: object, lang?: string): string | any;
    trans?(key: string, data?: object, lang?: string): string | any;
    __?(key: string, data?: object, lang?: string): string | any;
    choice?(key: string, count?: number, data?: any, locale?: string): string | any;
    graphql: ApolloClient<object>;
    graphqlQuery: graphqlQuery;
    graphqlResult: graphqlResult<any, any, any>;
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
        __app: object;
    }
}
declare let config: Config;
/**
 * Access to the instance a a singleton
 */
export declare let useUp: () => exportedVars;
export declare const UpVue: {
    install: (app: App, options: VueOptions) => void;
};
export {};
