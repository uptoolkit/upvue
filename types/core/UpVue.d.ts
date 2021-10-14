import { message, notification } from 'ant-design-vue';
/**
 * Define the vue options interface
 */
interface VueOptions {
    project: {
        name: string;
        url: string;
        logo: {
            src: string;
        };
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
declare let api: any;
declare let http: any;
declare let config: any;
declare let i18n: any;
declare let store: any;
declare let form: any;
declare let formApi: any;
/**
 * Access to the instance a a singleton
 */
declare let useUp: any;
declare const UpVue: {
    install: (app: any, options: VueOptions) => void;
};
/**
 * Export composition helpers
 */
export { useUp, api, http, config, message, notification, form, formApi, i18n, store, };
export default UpVue;
