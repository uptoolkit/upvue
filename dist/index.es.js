var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { defineComponent, ref, resolveComponent, openBlock, createBlock, withCtx, renderSlot, reactive } from "vue";
import Antd, { ConfigProvider, message, notification } from "ant-design-vue";
export { message, notification } from "ant-design-vue";
import collect from "collect.js";
import { axios } from "@bundled-es-modules/axios";
class I18n {
  __(key, data = null, locale = null) {
    return this.get(key, data, locale);
  }
  add(translations, locale = null) {
    if (!locale) {
      locale = this.locale;
    }
    this.translations.set(locale, Object.assign({}, this.translations.get(locale), translations));
  }
  choice(key, count = 1, data = null, locale = null) {
    if (!locale) {
      locale = this.locale;
    }
    let translation = null;
    const translations = this.fetch(`${locale}.${key}`);
    if (!translations) {
      if (this.options.storeNotFounds) {
        window[this.options.globalName]._notFounds.push(key);
      }
      if (this.forceDisplayKeys) {
        if (data) {
          return this.constructor.replaceString(key, data);
        }
        return key;
      }
      return "";
    }
    const parts = translations.split("|");
    parts.some((p) => {
      translation = this.constructor.matchChoiceCount(p, count);
      return translation;
    });
    if (translation === false) {
      translation = count > 1 ? parts[1] : parts[0];
    }
    return this._returnString(key, translation, data);
  }
  constructor(translations = {}, defaultLocale = "en", options = {}) {
    options = Object.assign({
      globalName: "translations",
      forceDisplayKeys: true,
      storeNotFounds: true
    }, options);
    this.forceDisplayKeys = options.forceDisplayKeys;
    this.locale = defaultLocale;
    this.translations = new Map();
    if (options.globalName) {
      if (window[options.globalName] === void 0) {
        window[options.globalName] = {};
      }
      translations = Object.assign({}, window[options.globalName], translations);
      if (options.storeNotFounds) {
        window[options.globalName]._notFounds = [];
      }
    }
    this.set(translations, this.locale);
    this.options = options;
  }
  static decodeHtml(source) {
    const txt = document.createElement("textarea");
    txt.innerHTML = source;
    return txt.value;
  }
  fetch(key) {
    const keys = key.split(".");
    const locale = keys.shift();
    let source = this.translations.get(locale);
    keys.forEach((k) => {
      if (source) {
        source = source[k];
      }
    });
    return source;
  }
  get(key, data = null, locale = null) {
    if (typeof data === "string") {
      locale = data;
      data = null;
    }
    if (!locale) {
      locale = this.locale;
    }
    const content = this.fetch(`${locale}.${key}`);
    return this._returnString(key, content, data);
  }
  has(key, locale = null) {
    if (!locale) {
      locale = this.locale;
    }
    return this.fetch(`${locale}.${key}`) !== void 0;
  }
  static matchChoiceCount(translation, count) {
    const match = translation.match(/^[{[]([^[\]{}]*)[}\]](.*)/);
    if (!match) {
      return false;
    }
    if (match[1].includes(",")) {
      const [from, to] = match[1].split(",", 2);
      if (to === "*" && count >= from || from === "*" && count <= to || count >= from && count <= to) {
        return match[2];
      }
    }
    return parseInt(match[1], 10) === count ? match[2] : null;
  }
  static replaceString(translation, data) {
    if (!data) {
      return translation;
    }
    return Object.entries(data).reduce((acc, [key, value]) => {
      value = String(value);
      const placeholder = key.toLowerCase();
      return acc.replace(`:${placeholder}`, value).replace(`:${placeholder.toUpperCase()}`, value.toUpperCase()).replace(`:${placeholder.charAt(0).toUpperCase()}${placeholder.slice(1)}`, `${value.charAt(0).toUpperCase()}${value.slice(1)}`);
    }, translation);
  }
  _returnString(key, content, data) {
    if (typeof content !== "string" && this.forceDisplayKeys) {
      content = key;
      if (this.options.storeNotFounds) {
        window[this.options.globalName]._notFounds.push(key);
      }
    }
    if (data) {
      content = this.constructor.replaceString(content, data);
    }
    return this.constructor.decodeHtml(content);
  }
  setLocale(locale) {
    this.locale = locale;
  }
  set(translations, locale = null) {
    if (!locale) {
      locale = this.locale;
    }
    this.translations.set(locale, translations);
  }
}
function createI18n(translations = {}, defaultLocale = "en", options = {}) {
  return new I18n(translations, defaultLocale, options);
}
var VueI18n = {
  name: "vue-i18n",
  production: true,
  install(Vue, settings = {}) {
    settings = Object.assign({
      instance: null,
      translations: {},
      language: "en",
      options: {}
    }, settings);
    let instance = settings.instance;
    if (!instance) {
      instance = new I18n({}, settings.language, settings.options);
    }
    instance.add(settings.translations, settings.language);
    if (typeof Vue.config !== "undefined" && typeof Vue.config.globalProperties !== "undefined") {
      Vue.config.globalProperties.$i18n = instance;
      Vue.config.globalProperties.__ = instance.__;
      Vue.config.globalProperties.choice = instance.choice;
    } else {
      Vue.prototype.$i18n = instance;
      Vue.$i18n = instance;
      Vue.mixin({
        methods: {
          __: instance.__,
          choice: instance.choice
        }
      });
    }
  }
};
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const UpLayout = defineComponent({
  components: [
    ConfigProvider
  ],
  provide() {
    return {
      loading: this.loading,
      api: this.api,
      http: this.http,
      config: this.config,
      t: i18n.__.bind(i18n),
      choice: i18n.choice.bind(i18n)
    };
  },
  setup() {
    const loading = ref(false);
    let { config: config2, message: message3, notification: notification3 } = useUp();
    let locale = ref(config2.get("locale"));
    return {
      loading,
      locale,
      api,
      http,
      config: config2,
      message: message3,
      notification: notification3
    };
  }
});
const _sfc_main = UpLayout;
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_config_provider = resolveComponent("a-config-provider");
  return openBlock(), createBlock(_component_a_config_provider, null, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  });
}
var UpLayout$1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
class Errors {
  constructor(errors = {}) {
    this.record(errors);
  }
  all() {
    return this.errors;
  }
  has(field) {
    let hasError = this.errors.hasOwnProperty(field);
    if (!hasError) {
      const errors = Object.keys(this.errors).filter((e) => e.startsWith(`${field}.`) || e.startsWith(`${field}[`));
      hasError = errors.length > 0;
    }
    return hasError;
  }
  first(field) {
    return this.get(field)[0];
  }
  get(field) {
    return this.errors[field] || [];
  }
  any(keys = []) {
    if (keys.length === 0) {
      return Object.keys(this.errors).length > 0;
    }
    let errors = {};
    keys.forEach((key) => errors[key] = this.get(key));
    return errors;
  }
  record(errors = {}) {
    this.errors = errors;
  }
  clear(field) {
    if (!field) {
      this.errors = {};
      return;
    }
    let errors = Object.assign({}, this.errors);
    Object.keys(errors).filter((e) => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`)).forEach((e) => delete errors[e]);
    this.errors = errors;
  }
}
function isArray(object) {
  return Object.prototype.toString.call(object) === "[object Array]";
}
function isFile(object) {
  return object instanceof File || object instanceof FileList;
}
function merge(a, b) {
  for (const key in b) {
    a[key] = cloneDeep(b[key]);
  }
}
function cloneDeep(object) {
  if (object === null) {
    return null;
  }
  if (isFile(object)) {
    return object;
  }
  if (Array.isArray(object)) {
    const clone = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        clone[key] = cloneDeep(object[key]);
      }
    }
    return clone;
  }
  if (typeof object === "object") {
    const clone = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        clone[key] = cloneDeep(object[key]);
      }
    }
    return clone;
  }
  return object;
}
function objectToFormData(object, formData = new FormData(), parent = null) {
  if (object === null || object === "undefined" || object.length === 0) {
    return formData.append(parent, object);
  }
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      appendToFormData(formData, getKey(parent, property), object[property]);
    }
  }
  return formData;
}
function getKey(parent, property) {
  return parent ? parent + "[" + property + "]" : property;
}
function appendToFormData(formData, key, value) {
  if (value instanceof Date) {
    return formData.append(key, value.toISOString());
  }
  if (value instanceof File) {
    return formData.append(key, value, value.name);
  }
  if (typeof value === "boolean") {
    return formData.append(key, value ? "1" : "0");
  }
  if (value === null) {
    return formData.append(key, "");
  }
  if (typeof value !== "object") {
    return formData.append(key, value);
  }
  objectToFormData(value, formData, key);
}
const reservedFieldNames = [
  "__http",
  "__options",
  "__validateRequestType",
  "clear",
  "data",
  "delete",
  "errors",
  "getError",
  "getErrors",
  "hasError",
  "initial",
  "onFail",
  "only",
  "onSuccess",
  "patch",
  "populate",
  "post",
  "processing",
  "successful",
  "put",
  "reset",
  "submit",
  "withData",
  "withErrors",
  "withOptions"
];
function guardAgainstReservedFieldName(fieldName) {
  if (reservedFieldNames.indexOf(fieldName) !== -1) {
    throw new Error(`Field name ${fieldName} isn't allowed to be used in a Form or Errors instance.`);
  }
}
class Form {
  constructor(data = {}, options = {}) {
    this.processing = false;
    this.successful = false;
    this.withData(data).withOptions(options).withErrors({});
  }
  withData(data) {
    if (isArray(data)) {
      data = data.reduce((carry, element) => {
        carry[element] = "";
        return carry;
      }, {});
    }
    this.setInitialValues(data);
    this.errors = new Errors();
    this.processing = false;
    this.successful = false;
    for (const field in data) {
      guardAgainstReservedFieldName(field);
      this[field] = data[field];
    }
    return this;
  }
  withErrors(errors) {
    this.errors = new Errors(errors);
    return this;
  }
  withOptions(options) {
    this.__options = {
      resetOnSuccess: true
    };
    if (options.hasOwnProperty("resetOnSuccess")) {
      this.__options.resetOnSuccess = options.resetOnSuccess;
    }
    if (options.hasOwnProperty("onSuccess")) {
      this.onSuccess = options.onSuccess;
    }
    if (options.hasOwnProperty("onFail")) {
      this.onFail = options.onFail;
    }
    const windowAxios = typeof window === "undefined" ? false : window.axios;
    this.__http = options.http || windowAxios || axios;
    if (!this.__http) {
      throw new Error("No http library provided. Either pass an http option, or install axios.");
    }
    return this;
  }
  data() {
    const data = {};
    for (const property in this.initial) {
      data[property] = this[property];
    }
    return data;
  }
  only(fields) {
    return fields.reduce((filtered, field) => {
      filtered[field] = this[field];
      return filtered;
    }, {});
  }
  reset() {
    merge(this, this.initial);
    this.errors.clear();
  }
  setInitialValues(values) {
    this.initial = {};
    merge(this.initial, values);
  }
  populate(data) {
    Object.keys(data).forEach((field) => {
      guardAgainstReservedFieldName(field);
      if (this.hasOwnProperty(field)) {
        merge(this, { [field]: data[field] });
      }
    });
    return this;
  }
  clear() {
    for (const field in this.initial) {
      this[field] = "";
    }
    this.errors.clear();
  }
  post(url) {
    return this.submit("post", url);
  }
  put(url) {
    return this.submit("put", url);
  }
  patch(url) {
    return this.submit("patch", url);
  }
  delete(url) {
    return this.submit("delete", url);
  }
  submit(requestType, url) {
    this.__validateRequestType(requestType);
    this.errors.clear();
    this.processing = true;
    this.successful = false;
    return new Promise((resolve, reject) => {
      this.__http[requestType](url, this.hasFiles() ? objectToFormData(this.data()) : this.data()).then((response) => {
        this.processing = false;
        this.onSuccess(response.data);
        resolve(response.data);
      }).catch((error) => {
        this.processing = false;
        this.onFail(error);
        reject(error);
      });
    });
  }
  hasFiles() {
    for (const property in this.initial) {
      if (this.hasFilesDeep(this[property])) {
        return true;
      }
    }
    return false;
  }
  hasFilesDeep(object) {
    if (object === null) {
      return false;
    }
    if (typeof object === "object") {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (this.hasFilesDeep(object[key])) {
            return true;
          }
        }
      }
    }
    if (Array.isArray(object)) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          return this.hasFilesDeep(object[key]);
        }
      }
    }
    return isFile(object);
  }
  onSuccess(data) {
    this.successful = true;
    if (this.__options.resetOnSuccess) {
      this.reset();
    }
  }
  onFail(error) {
    this.successful = false;
    if (error.response && error.response.data.errors) {
      this.errors.record(error.response.data.errors);
    }
  }
  hasError(field) {
    return this.errors.has(field);
  }
  getError(field) {
    return this.errors.first(field);
  }
  getErrors(field) {
    return this.errors.get(field);
  }
  __validateRequestType(requestType) {
    const requestTypes = ["get", "delete", "head", "post", "put", "patch"];
    if (requestTypes.indexOf(requestType) === -1) {
      throw new Error(`\`${requestType}\` is not a valid request type, must be one of: \`${requestTypes.join("`, `")}\`.`);
    }
  }
  static create(data = {}) {
    return new Form().withData(data);
  }
}
let api;
let http;
let config;
let i18n;
let store;
let form;
let formApi;
let useUp;
useUp = null;
const UpVue = {
  install: (app, options) => {
    config = collect(options);
    app.config.globalProperties.$config = collect(options);
    app.config.globalProperties.$http = http = axios.create();
    app.config.globalProperties.$api = api = axios.create({
      baseURL: options.api.url
    });
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$notification = notification;
    form = function(data, options2) {
      return new Form(data, __spreadValues(__spreadValues({}, {
        http
      }), options2));
    };
    formApi = function(data, options2) {
      return new Form(data, __spreadValues(__spreadValues({}, {
        http: api
      }), options2));
    };
    if (typeof options.store !== "undefined" && options.storeMode === "vuex") {
      store = options.store;
    } else {
      store = reactive({
        user: null,
        menus: null
      });
    }
    const translations = options.translations[options.locale];
    i18n = createI18n(translations, options.locale, {
      globalName: "translations",
      forceDisplayKeys: true,
      storeNotFounds: true
    });
    app.use(VueI18n, {
      translations,
      language: options.locale,
      options: options.i18n
    });
    if (!config.has("exclude.antd")) {
      app.use(Antd);
    }
    app.provide("UpVue", options);
    app.component("UpLayout", UpLayout$1);
    if (!useUp) {
      useUp = (app2, options2) => {
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
          choice: i18n.choice.bind(i18n)
        };
      };
    }
  }
};
export { UpLayout$1 as UpLayout, UpVue, api, config, form, formApi, http, i18n, store, useUp };
