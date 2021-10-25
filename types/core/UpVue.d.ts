import type { App } from 'vue';
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
export declare let useUp: unknown | Function;
export declare const UpVue: {
    install: (app: App, options: VueOptions) => void;
};
export {};
