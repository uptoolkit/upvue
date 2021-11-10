import type { App } from 'vue';
import { message, notification } from 'ant-design-vue';
import { Form } from 'js-form-helper';
import { Axios } from "axios";
import { Store } from "vuex";
/**
 * Define the vue options interface
 */
interface VueOptions {
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
    store: Store<unknown | object>;
    api: {
        url: string;
    };
    graphql?: {
        url?: string;
        client?: any;
    };
    translations: Record<string, object | string>;
    locale: string;
    locales: Record<string, object>;
    exclude: Array<string>;
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
        __app: object;
    }
}
/**
 * Access to the instance a a singleton
 */
export declare let useUp: exportedVars | Function;
export declare const UpVue: {
    install: (app: App, options: VueOptions) => void;
};
export {};
