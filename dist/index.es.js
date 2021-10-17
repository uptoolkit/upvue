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
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsConfigHelper = {};
(function(exports) {
  exports.__esModule = true;
  var Config2 = function() {
    function Config3(options) {
      this.options = options;
    }
    Config3.prototype.get = function(key, def) {
      var keys = key.split(".");
      var source = this.options;
      keys.forEach(function(k) {
        if (source) {
          source = source[k];
        }
      });
      if (!source && def) {
        if (typeof def === "function") {
          source = def();
        } else {
          source = def;
        }
      }
      return source;
    };
    Config3.prototype.has = function(key) {
      var keys = key.split(".");
      var source = this.options;
      keys.forEach(function(k) {
        if (source) {
          source = source[k];
        }
      });
      return !!source;
    };
    Config3.prototype.set = function(key, value) {
      var keys = key.split(".");
      var source = this.options;
      keys.forEach(function(k) {
        if (source) {
          source = source[k];
        }
      });
      if (source) {
        source = value;
      }
      return source;
    };
    Config3.prototype.all = function() {
      return this.options;
    };
    return Config3;
  }();
  exports["default"] = Config2;
})(jsConfigHelper);
var Config = /* @__PURE__ */ getDefaultExportFromCjs(jsConfigHelper);
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
      i18n: this.i18n,
      t: this.i18n.__.bind(this.i18n),
      choice: this.i18n.choice.bind(this.i18n)
    };
  },
  setup() {
    const loading = ref(false);
    let { config: config2, message: message2, notification: notification2, api: api2, http: http2, i18n: i18n2 } = useUp();
    let locale = ref(config2.get("locale"));
    return {
      loading,
      locale,
      api: api2,
      http: http2,
      config: config2,
      message: message2,
      notification: notification2,
      i18n: i18n2
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
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function _mergeNamespaces(n, m) {
  m.forEach(function(e) {
    Object.keys(e).forEach(function(k) {
      if (k !== "default" && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function() {
            return e[k];
          }
        });
      }
    });
  });
  return Object.freeze(n);
}
class Errors$2 {
  constructor(errors2 = {}) {
    this.record(errors2);
  }
  all() {
    return this.errors;
  }
  has(field) {
    let hasError = this.errors.hasOwnProperty(field);
    if (!hasError) {
      const errors2 = Object.keys(this.errors).filter((e) => e.startsWith(`${field}.`) || e.startsWith(`${field}[`));
      hasError = errors2.length > 0;
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
    let errors2 = {};
    keys.forEach((key) => errors2[key] = this.get(key));
    return errors2;
  }
  record(errors2 = {}) {
    this.errors = errors2;
  }
  clear(field) {
    if (!field) {
      this.errors = {};
      return;
    }
    let errors2 = Object.assign({}, this.errors);
    Object.keys(errors2).filter((e) => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`)).forEach((e) => delete errors2[e]);
    this.errors = errors2;
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
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
function leapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function checkFalsePositiveDates(dateString = "") {
  if (dateString.length === 10) {
    let normalizedDate = dateString.replace(".", "-").replace("/", "-");
    let parts = normalizedDate.split("-");
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        let y = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        let d = parseInt(parts[2]);
        if (m === 2) {
          if (leapYear(y)) {
            if (d > 29) {
              return false;
            }
          } else {
            if (d > 28) {
              return false;
            }
          }
        }
        if (m === 4 || m === 6 || m === 9 || m === 11) {
          if (d > 30) {
            return false;
          }
        }
      }
    }
    return true;
  }
  return true;
}
function isValidDate(dateString) {
  let testDate;
  if (typeof dateString === "number") {
    testDate = new Date(dateString);
    if (typeof testDate === "object") {
      return true;
    }
  }
  testDate = new Date(dateString);
  if (typeof testDate === "object") {
    if (testDate.toString() === "Invalid Date") {
      return false;
    }
    if (!checkFalsePositiveDates(dateString)) {
      return false;
    }
    return true;
  }
  var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
  if (!regex_date.test(dateString)) {
    return false;
  }
  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);
  if (year < 1e3 || year > 3e3 || month == 0 || month > 12) {
    return false;
  }
  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 == 0 || year % 100 != 0 && year % 4 == 0) {
    monthLength[1] = 29;
  }
  return day > 0 && day <= monthLength[month - 1];
}
var rules = {
  required: function(val) {
    var str;
    if (val === void 0 || val === null) {
      return false;
    }
    str = String(val).replace(/\s/g, "");
    return str.length > 0 ? true : false;
  },
  required_if: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
      return this.validator.getRule("required").validate(val);
    }
    return true;
  },
  required_unless: function(val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule("required").validate(val);
    }
    return true;
  },
  required_with: function(val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return this.validator.getRule("required").validate(val);
    }
    return true;
  },
  required_with_all: function(val, req, attribute) {
    req = this.getParameters();
    for (var i = 0; i < req.length; i++) {
      if (!this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }
    return this.validator.getRule("required").validate(val);
  },
  required_without: function(val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }
    return this.validator.getRule("required").validate(val);
  },
  required_without_all: function(val, req, attribute) {
    req = this.getParameters();
    for (var i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }
    return this.validator.getRule("required").validate(val);
  },
  boolean: function(val) {
    return val === true || val === false || val === 0 || val === 1 || val === "0" || val === "1" || val === "true" || val === "false";
  },
  size: function(val, req, attribute) {
    if (val) {
      req = parseFloat(req);
      var size = this.getSize();
      return size === req;
    }
    return true;
  },
  string: function(val, req, attribute) {
    return typeof val === "string";
  },
  sometimes: function(val) {
    return true;
  },
  min: function(val, req, attribute) {
    var size = this.getSize();
    return size >= req;
  },
  max: function(val, req, attribute) {
    var size = this.getSize();
    return size <= req;
  },
  between: function(val, req, attribute) {
    req = this.getParameters();
    var size = this.getSize();
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },
  email: function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)) {
      re = /^((?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)+)*$/;
    }
    return re.test(val);
  },
  numeric: function(val) {
    var num;
    num = Number(val);
    if (typeof num === "number" && !isNaN(num) && typeof val !== "boolean") {
      return true;
    } else {
      return false;
    }
  },
  array: function(val) {
    return val instanceof Array;
  },
  url: function(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
  },
  alpha: function(val) {
    return /^[a-zA-Z]+$/.test(val);
  },
  alpha_dash: function(val) {
    return /^[a-zA-Z0-9_\-]+$/.test(val);
  },
  alpha_num: function(val) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },
  same: function(val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;
    if (val1 === val2) {
      return true;
    }
    return false;
  },
  different: function(val, req) {
    var val1 = this.validator._flattenObject(this.validator.input)[req];
    var val2 = val;
    if (val1 !== val2) {
      return true;
    }
    return false;
  },
  in: function(val, req) {
    var list, i;
    if (val) {
      list = this.getParameters();
    }
    if (val && !(val instanceof Array)) {
      var localValue = val;
      for (i = 0; i < list.length; i++) {
        if (typeof list[i] === "string") {
          localValue = String(val);
        }
        if (localValue === list[i]) {
          return true;
        }
      }
      return false;
    }
    if (val && val instanceof Array) {
      for (i = 0; i < val.length; i++) {
        if (list.indexOf(val[i]) < 0) {
          return false;
        }
      }
    }
    return true;
  },
  not_in: function(val, req) {
    var list = this.getParameters();
    var len = list.length;
    var returnVal = true;
    for (var i = 0; i < len; i++) {
      var localValue = val;
      if (typeof list[i] === "string") {
        localValue = String(val);
      }
      if (localValue === list[i]) {
        returnVal = false;
        break;
      }
    }
    return returnVal;
  },
  accepted: function(val) {
    if (val === "on" || val === "yes" || val === 1 || val === "1" || val === true) {
      return true;
    }
    return false;
  },
  confirmed: function(val, req, key) {
    var confirmedKey = key + "_confirmation";
    if (this.validator.input[confirmedKey] === val) {
      return true;
    }
    return false;
  },
  integer: function(val) {
    return String(parseInt(val, 10)) === String(val);
  },
  digits: function(val, req) {
    var numericRule = this.validator.getRule("numeric");
    if (numericRule.validate(val) && String(val.trim()).length === parseInt(req)) {
      return true;
    }
    return false;
  },
  digits_between: function(val) {
    var numericRule = this.validator.getRule("numeric");
    var req = this.getParameters();
    var valueDigitsCount = String(val).length;
    var min = parseFloat(req[0], 10);
    var max = parseFloat(req[1], 10);
    if (numericRule.validate(val) && valueDigitsCount >= min && valueDigitsCount <= max) {
      return true;
    }
    return false;
  },
  regex: function(val, req) {
    var mod = /[g|i|m]{1,3}$/;
    var flag = req.match(mod);
    flag = flag ? flag[0] : "";
    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },
  date: function(val, format) {
    return isValidDate(val);
  },
  present: function(val) {
    return typeof val !== "undefined";
  },
  after: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    if (new Date(val1).getTime() < new Date(val2).getTime()) {
      return true;
    }
    return false;
  },
  after_or_equal: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    if (new Date(val1).getTime() <= new Date(val2).getTime()) {
      return true;
    }
    return false;
  },
  before: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    if (new Date(val1).getTime() > new Date(val2).getTime()) {
      return true;
    }
    return false;
  },
  before_or_equal: function(val, req) {
    var val1 = this.validator.input[req];
    var val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    if (new Date(val1).getTime() >= new Date(val2).getTime()) {
      return true;
    }
    return false;
  },
  hex: function(val) {
    return /^[0-9a-f]+$/i.test(val);
  },
  ipv4: function(val, req, attribute) {
    if (typeof val != "string")
      return false;
    var er = /^[0-9]+$/;
    octets = val.split(".");
    if (octets.length != 4)
      return false;
    for (let i = 0; i < octets.length; i++) {
      const element = octets[i];
      if (!er.test(element))
        return false;
      var octetValue = parseInt(element);
      if (octetValue >= 256)
        return false;
    }
    return true;
  },
  ipv6: function(val, req, attribute) {
    if (typeof val != "string")
      return false;
    var er = /^[0-9a-f]+$/;
    hextets = val.split(":");
    colons = val.match(/::/);
    if (colons != null && val.match(/::/g).length > 1)
      return false;
    if (val[0] == ":" && (colons == null || colons != null && colons.index != 0))
      return false;
    if (val[val.length - 1] == ":" && (colons == null || colons != null && colons.index != val.length - 2))
      return false;
    if (3 > hextets.length)
      return false;
    var isEdgeCase = hextets.length == 9 && colons != null && (colons.index == 0 || colons.index == val.length - 2);
    if (hextets.length > 8 && !isEdgeCase)
      return false;
    if (hextets.length != 8 && colons == null)
      return false;
    for (let i = 0; i < hextets.length; i++) {
      const element = hextets[i];
      if (element.length == 0)
        continue;
      if (!er.test(element))
        return false;
      if (element.length > 4)
        return false;
    }
    return true;
  },
  ip: function(val, req, attribute) {
    return rules["ipv4"](val, req, attribute) || rules["ipv6"](val, req, attribute);
  }
};
var missedRuleValidator = function() {
  throw new Error("Validator `" + this.name + "` is not defined!");
};
var missedRuleMessage;
function Rule(name, fn, async2) {
  this.name = name;
  this.fn = fn;
  this.passes = null;
  this._customMessage = void 0;
  this.async = async2;
}
Rule.prototype = {
  validate: function(inputValue, ruleValue, attribute, callback) {
    var _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === "function") {
      this.callback = callback;
      var handleResponse = function(passes, message2) {
        _this.response(passes, message2);
      };
      if (this.async) {
        return this._apply(inputValue, ruleValue, attribute, handleResponse);
      } else {
        return handleResponse(this._apply(inputValue, ruleValue, attribute));
      }
    }
    return this._apply(inputValue, ruleValue, attribute);
  },
  _apply: function(inputValue, ruleValue, attribute, callback) {
    var fn = this.isMissed() ? missedRuleValidator : this.fn;
    return fn.apply(this, [inputValue, ruleValue, attribute, callback]);
  },
  _setValidatingData: function(attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  },
  getParameters: function() {
    var value = [];
    if (typeof this.ruleValue === "string") {
      value = this.ruleValue.split(",");
    }
    if (typeof this.ruleValue === "number") {
      value.push(this.ruleValue);
    }
    if (this.ruleValue instanceof Array) {
      value = this.ruleValue;
    }
    return value;
  },
  getSize: function() {
    var value = this.inputValue;
    if (value instanceof Array) {
      return value.length;
    }
    if (typeof value === "number") {
      return value;
    }
    if (this.validator._hasNumericRule(this.attribute)) {
      return parseFloat(value, 10);
    }
    return value.length;
  },
  _getValueType: function() {
    if (typeof this.inputValue === "number" || this.validator._hasNumericRule(this.attribute)) {
      return "numeric";
    }
    return "string";
  },
  response: function(passes, message2) {
    this.passes = passes === void 0 || passes === true;
    this._customMessage = message2;
    this.callback(this.passes, message2);
  },
  setValidator: function(validator2) {
    this.validator = validator2;
  },
  isMissed: function() {
    return typeof this.fn !== "function";
  },
  get customMessage() {
    return this.isMissed() ? missedRuleMessage : this._customMessage;
  }
};
var manager = {
  asyncRules: [],
  implicitRules: [
    "required",
    "required_if",
    "required_unless",
    "required_with",
    "required_with_all",
    "required_without",
    "required_without_all",
    "accepted",
    "present"
  ],
  make: function(name, validator2) {
    var async2 = this.isAsync(name);
    var rule = new Rule(name, rules[name], async2);
    rule.setValidator(validator2);
    return rule;
  },
  isAsync: function(name) {
    for (var i = 0, len = this.asyncRules.length; i < len; i++) {
      if (this.asyncRules[i] === name) {
        return true;
      }
    }
    return false;
  },
  isImplicit: function(name) {
    return this.implicitRules.indexOf(name) > -1;
  },
  register: function(name, fn) {
    rules[name] = fn;
  },
  registerImplicit: function(name, fn) {
    this.register(name, fn);
    this.implicitRules.push(name);
  },
  registerAsync: function(name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  },
  registerAsyncImplicit: function(name, fn) {
    this.registerImplicit(name, fn);
    this.asyncRules.push(name);
  },
  registerMissedRuleValidator: function(fn, message2) {
    missedRuleValidator = fn;
    missedRuleMessage = message2;
  }
};
var rules_1 = manager;
var replacements = {
  between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },
  digits_between: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      min: parameters[0],
      max: parameters[1]
    });
  },
  required_if: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },
  required_unless: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      other: this._getAttributeName(parameters[0]),
      value: parameters[1]
    });
  },
  required_with: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },
  required_with_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(", ")
    });
  },
  required_without: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      field: this._getAttributeName(parameters[0])
    });
  },
  required_without_all: function(template, rule) {
    var parameters = rule.getParameters();
    var getAttributeName = this._getAttributeName.bind(this);
    return this._replacePlaceholders(rule, template, {
      fields: parameters.map(getAttributeName).join(", ")
    });
  },
  after: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after: this._getAttributeName(parameters[0])
    });
  },
  before: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before: this._getAttributeName(parameters[0])
    });
  },
  after_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      after_or_equal: this._getAttributeName(parameters[0])
    });
  },
  before_or_equal: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      before_or_equal: this._getAttributeName(parameters[0])
    });
  },
  same: function(template, rule) {
    var parameters = rule.getParameters();
    return this._replacePlaceholders(rule, template, {
      same: this._getAttributeName(parameters[0])
    });
  }
};
function formatter(attribute) {
  return attribute.replace(/[_\[]/g, " ").replace(/]/g, "");
}
var attributes = {
  replacements,
  formatter
};
var Attributes$1 = attributes;
var Messages$1 = function(lang2, messages2) {
  this.lang = lang2;
  this.messages = messages2;
  this.customMessages = {};
  this.attributeNames = {};
};
Messages$1.prototype = {
  constructor: Messages$1,
  _setCustom: function(customMessages) {
    this.customMessages = customMessages || {};
  },
  _setAttributeNames: function(attributes2) {
    this.attributeNames = attributes2;
  },
  _setAttributeFormatter: function(func) {
    this.attributeFormatter = func;
  },
  _getAttributeName: function(attribute) {
    var name = attribute;
    if (this.attributeNames.hasOwnProperty(attribute)) {
      return this.attributeNames[attribute];
    } else if (this.messages.attributes.hasOwnProperty(attribute)) {
      name = this.messages.attributes[attribute];
    }
    if (this.attributeFormatter) {
      name = this.attributeFormatter(name);
    }
    return name;
  },
  all: function() {
    return this.messages;
  },
  render: function(rule) {
    if (rule.customMessage) {
      return rule.customMessage;
    }
    var template = this._getTemplate(rule);
    var message2;
    if (Attributes$1.replacements[rule.name]) {
      message2 = Attributes$1.replacements[rule.name].apply(this, [template, rule]);
    } else {
      message2 = this._replacePlaceholders(rule, template, {});
    }
    return message2;
  },
  _getTemplate: function(rule) {
    var messages2 = this.messages;
    var template = messages2.def;
    var customMessages = this.customMessages;
    var formats = [rule.name + "." + rule.attribute, rule.name];
    for (var i = 0, format; i < formats.length; i++) {
      format = formats[i];
      if (customMessages.hasOwnProperty(format)) {
        template = customMessages[format];
        break;
      } else if (messages2.hasOwnProperty(format)) {
        template = messages2[format];
        break;
      }
    }
    if (typeof template === "object") {
      template = template[rule._getValueType()];
    }
    return template;
  },
  _replacePlaceholders: function(rule, template, data) {
    var message2, attribute;
    data.attribute = this._getAttributeName(rule.attribute);
    data[rule.name] = data[rule.name] || rule.getParameters().join(",");
    if (typeof template === "string" && typeof data === "object") {
      message2 = template;
      for (attribute in data) {
        message2 = message2.replace(new RegExp(":" + attribute, "g"), data[attribute]);
      }
    }
    return message2;
  }
};
var messages = Messages$1;
var Messages = messages;
var require_method = commonjsRequire;
var container = {
  messages: {},
  _set: function(lang2, rawMessages) {
    this.messages[lang2] = rawMessages;
  },
  _setRuleMessage: function(lang2, attribute, message2) {
    this._load(lang2);
    if (message2 === void 0) {
      message2 = this.messages[lang2].def;
    }
    this.messages[lang2][attribute] = message2;
  },
  _load: function(lang2) {
    if (!this.messages[lang2]) {
      try {
        var rawMessages = require_method("./lang/" + lang2);
        this._set(lang2, rawMessages);
      } catch (e) {
      }
    }
  },
  _get: function(lang2) {
    this._load(lang2);
    return this.messages[lang2];
  },
  _make: function(lang2) {
    this._load(lang2);
    return new Messages(lang2, this.messages[lang2]);
  }
};
var lang = container;
var Errors$1 = function() {
  this.errors = {};
};
Errors$1.prototype = {
  constructor: Errors$1,
  add: function(attribute, message2) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }
    if (this.errors[attribute].indexOf(message2) === -1) {
      this.errors[attribute].push(message2);
    }
  },
  get: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }
    return [];
  },
  first: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }
    return false;
  },
  all: function() {
    return this.errors;
  },
  has: function(attribute) {
    if (this.errors.hasOwnProperty(attribute)) {
      return true;
    }
    return false;
  }
};
var errors = Errors$1;
function AsyncResolvers$1(onFailedOne, onResolvedAll) {
  this.onResolvedAll = onResolvedAll;
  this.onFailedOne = onFailedOne;
  this.resolvers = {};
  this.resolversCount = 0;
  this.passed = [];
  this.failed = [];
  this.firing = false;
}
AsyncResolvers$1.prototype = {
  add: function(rule) {
    var index = this.resolversCount;
    this.resolvers[index] = rule;
    this.resolversCount++;
    return index;
  },
  resolve: function(index) {
    var rule = this.resolvers[index];
    if (rule.passes === true) {
      this.passed.push(rule);
    } else if (rule.passes === false) {
      this.failed.push(rule);
      this.onFailedOne(rule);
    }
    this.fire();
  },
  isAllResolved: function() {
    return this.passed.length + this.failed.length === this.resolversCount;
  },
  fire: function() {
    if (!this.firing) {
      return;
    }
    if (this.isAllResolved()) {
      this.onResolvedAll(this.failed.length === 0);
    }
  },
  enableFiring: function() {
    this.firing = true;
  }
};
var async = AsyncResolvers$1;
var Rules = rules_1;
var Lang = lang;
var Errors = errors;
var Attributes = attributes;
var AsyncResolvers = async;
var Validator = function(input, rules2, customMessages) {
  var lang2 = Validator.getDefaultLang();
  this.input = input || {};
  this.messages = Lang._make(lang2);
  this.messages._setCustom(customMessages);
  this.setAttributeFormatter(Validator.prototype.attributeFormatter);
  this.errors = new Errors();
  this.errorCount = 0;
  this.hasAsync = false;
  this.rules = this._parseRules(rules2);
};
Validator.prototype = {
  constructor: Validator,
  lang: "en",
  numericRules: ["integer", "numeric"],
  attributeFormatter: Attributes.formatter,
  check: function() {
    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);
      if (this._hasRule(attribute, ["sometimes"]) && !this._suppliedWithData(attribute)) {
        continue;
      }
      for (var i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);
        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }
        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);
        if (!rulePassed) {
          this._addFailure(rule);
        }
        if (this._shouldStopValidating(attribute, rulePassed)) {
          break;
        }
      }
    }
    return this.errorCount === 0;
  },
  checkAsync: function(passes, fails) {
    var _this = this;
    passes = passes || function() {
    };
    fails = fails || function() {
    };
    var failsOne = function(rule2, message2) {
      _this._addFailure(rule2, message2);
    };
    var resolvedAll = function(allPassed) {
      if (allPassed) {
        passes();
      } else {
        fails();
      }
    };
    var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);
    var validateRule = function(inputValue2, ruleOptions2, attribute2, rule2) {
      return function() {
        var resolverIndex = asyncResolvers.add(rule2);
        rule2.validate(inputValue2, ruleOptions2.value, attribute2, function() {
          asyncResolvers.resolve(resolverIndex);
        });
      };
    };
    for (var attribute in this.rules) {
      var attributeRules = this.rules[attribute];
      var inputValue = this._objectPath(this.input, attribute);
      if (this._hasRule(attribute, ["sometimes"]) && !this._suppliedWithData(attribute)) {
        continue;
      }
      for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);
        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }
        validateRule(inputValue, ruleOptions, attribute, rule)();
      }
    }
    asyncResolvers.enableFiring();
    asyncResolvers.fire();
  },
  _addFailure: function(rule) {
    var msg = this.messages.render(rule);
    this.errors.add(rule.attribute, msg);
    this.errorCount++;
  },
  _flattenObject: function(obj) {
    var flattened = {};
    function recurse(current, property) {
      if (!property && Object.getOwnPropertyNames(current).length === 0) {
        return;
      }
      if (Object(current) !== current || Array.isArray(current)) {
        flattened[property] = current;
      } else {
        var isEmpty = true;
        for (var p in current) {
          isEmpty = false;
          recurse(current[p], property ? property + "." + p : p);
        }
        if (isEmpty) {
          flattened[property] = {};
        }
      }
    }
    if (obj) {
      recurse(obj);
    }
    return flattened;
  },
  _objectPath: function(obj, path) {
    if (Object.prototype.hasOwnProperty.call(obj, path)) {
      return obj[path];
    }
    var keys = path.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "").split(".");
    var copy = {};
    for (var attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = obj[attr];
      }
    }
    for (var i = 0, l = keys.length; i < l; i++) {
      if (typeof copy === "object" && copy !== null && Object.hasOwnProperty.call(copy, keys[i])) {
        copy = copy[keys[i]];
      } else {
        return;
      }
    }
    return copy;
  },
  _parseRules: function(rules2) {
    var parsedRules = {};
    rules2 = this._flattenObject(rules2);
    for (var attribute in rules2) {
      var rulesArray = rules2[attribute];
      this._parseRulesCheck(attribute, rulesArray, parsedRules);
    }
    return parsedRules;
  },
  _parseRulesCheck: function(attribute, rulesArray, parsedRules, wildCardValues) {
    if (attribute.indexOf("*") > -1) {
      this._parsedRulesRecurse(attribute, rulesArray, parsedRules, wildCardValues);
    } else {
      this._parseRulesDefault(attribute, rulesArray, parsedRules, wildCardValues);
    }
  },
  _parsedRulesRecurse: function(attribute, rulesArray, parsedRules, wildCardValues) {
    var parentPath = attribute.substr(0, attribute.indexOf("*") - 1);
    var propertyValue = this._objectPath(this.input, parentPath);
    if (propertyValue) {
      for (var propertyNumber = 0; propertyNumber < propertyValue.length; propertyNumber++) {
        var workingValues = wildCardValues ? wildCardValues.slice() : [];
        workingValues.push(propertyNumber);
        this._parseRulesCheck(attribute.replace("*", propertyNumber), rulesArray, parsedRules, workingValues);
      }
    }
  },
  _parseRulesDefault: function(attribute, rulesArray, parsedRules, wildCardValues) {
    var attributeRules = [];
    if (rulesArray instanceof Array) {
      rulesArray = this._prepareRulesArray(rulesArray);
    }
    if (typeof rulesArray === "string") {
      rulesArray = rulesArray.split("|");
    }
    for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
      rule = typeof rulesArray[i] === "string" ? this._extractRuleAndRuleValue(rulesArray[i]) : rulesArray[i];
      if (rule.value) {
        rule.value = this._replaceWildCards(rule.value, wildCardValues);
        this._replaceWildCardsMessages(wildCardValues);
      }
      if (Rules.isAsync(rule.name)) {
        this.hasAsync = true;
      }
      attributeRules.push(rule);
    }
    parsedRules[attribute] = attributeRules;
  },
  _replaceWildCards: function(path, nums) {
    if (!nums) {
      return path;
    }
    var path2 = path;
    nums.forEach(function(value) {
      if (Array.isArray(path2)) {
        path2 = path2[0];
      }
      const pos = path2.indexOf("*");
      if (pos === -1) {
        return path2;
      }
      path2 = path2.substr(0, pos) + value + path2.substr(pos + 1);
    });
    if (Array.isArray(path)) {
      path[0] = path2;
      path2 = path;
    }
    return path2;
  },
  _replaceWildCardsMessages: function(nums) {
    var customMessages = this.messages.customMessages;
    var self = this;
    Object.keys(customMessages).forEach(function(key) {
      if (nums) {
        var newKey = self._replaceWildCards(key, nums);
        customMessages[newKey] = customMessages[key];
      }
    });
    this.messages._setCustom(customMessages);
  },
  _prepareRulesArray: function(rulesArray) {
    var rules2 = [];
    for (var i = 0, len = rulesArray.length; i < len; i++) {
      if (typeof rulesArray[i] === "object") {
        for (var rule in rulesArray[i]) {
          rules2.push({
            name: rule,
            value: rulesArray[i][rule]
          });
        }
      } else {
        rules2.push(rulesArray[i]);
      }
    }
    return rules2;
  },
  _suppliedWithData: function(attribute) {
    return this.input.hasOwnProperty(attribute);
  },
  _extractRuleAndRuleValue: function(ruleString) {
    var rule = {}, ruleArray;
    rule.name = ruleString;
    if (ruleString.indexOf(":") >= 0) {
      ruleArray = ruleString.split(":");
      rule.name = ruleArray[0];
      rule.value = ruleArray.slice(1).join(":");
    }
    return rule;
  },
  _hasRule: function(attribute, findRules) {
    var rules2 = this.rules[attribute] || [];
    for (var i = 0, len = rules2.length; i < len; i++) {
      if (findRules.indexOf(rules2[i].name) > -1) {
        return true;
      }
    }
    return false;
  },
  _hasNumericRule: function(attribute) {
    return this._hasRule(attribute, this.numericRules);
  },
  _isValidatable: function(rule, value) {
    if (Array.isArray(value)) {
      return true;
    }
    if (Rules.isImplicit(rule.name)) {
      return true;
    }
    return this.getRule("required").validate(value);
  },
  _shouldStopValidating: function(attribute, rulePassed) {
    var stopOnAttributes = this.stopOnAttributes;
    if (typeof stopOnAttributes === "undefined" || stopOnAttributes === false || rulePassed === true) {
      return false;
    }
    if (stopOnAttributes instanceof Array) {
      return stopOnAttributes.indexOf(attribute) > -1;
    }
    return true;
  },
  setAttributeNames: function(attributes2) {
    this.messages._setAttributeNames(attributes2);
  },
  setAttributeFormatter: function(func) {
    this.messages._setAttributeFormatter(func);
  },
  getRule: function(name) {
    return Rules.make(name, this);
  },
  stopOnError: function(attributes2) {
    this.stopOnAttributes = attributes2;
  },
  passes: function(passes) {
    var async2 = this._checkAsync("passes", passes);
    if (async2) {
      return this.checkAsync(passes);
    }
    return this.check();
  },
  fails: function(fails) {
    var async2 = this._checkAsync("fails", fails);
    if (async2) {
      return this.checkAsync(function() {
      }, fails);
    }
    return !this.check();
  },
  _checkAsync: function(funcName, callback) {
    var hasCallback = typeof callback === "function";
    if (this.hasAsync && !hasCallback) {
      throw funcName + " expects a callback when async rules are being tested.";
    }
    return this.hasAsync || hasCallback;
  }
};
Validator.setMessages = function(lang2, messages2) {
  Lang._set(lang2, messages2);
  return this;
};
Validator.getMessages = function(lang2) {
  return Lang._get(lang2);
};
Validator.useLang = function(lang2) {
  this.prototype.lang = lang2;
};
Validator.getDefaultLang = function() {
  return this.prototype.lang;
};
Validator.setAttributeFormatter = function(func) {
  this.prototype.attributeFormatter = func;
};
Validator.stopOnError = function(attributes2) {
  this.prototype.stopOnAttributes = attributes2;
};
Validator.register = function(name, fn, message2, fnReplacement) {
  var lang2 = Validator.getDefaultLang();
  Rules.register(name, fn);
  Lang._setRuleMessage(lang2, name, message2);
};
Validator.registerImplicit = function(name, fn, message2, fnReplacement) {
  var lang2 = Validator.getDefaultLang();
  Rules.registerImplicit(name, fn);
  Lang._setRuleMessage(lang2, name, message2);
};
Validator.registerAsync = function(name, fn, message2, fnReplacement) {
  var lang2 = Validator.getDefaultLang();
  Rules.registerAsync(name, fn);
  Lang._setRuleMessage(lang2, name, message2);
};
Validator.registerAsyncImplicit = function(name, fn, message2) {
  var lang2 = Validator.getDefaultLang();
  Rules.registerAsyncImplicit(name, fn);
  Lang._setRuleMessage(lang2, name, message2);
};
Validator.registerMissedRuleValidator = function(fn, message2) {
  Rules.registerMissedRuleValidator(fn, message2);
};
var validator = Validator;
var Validator$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": validator
}, [validator]));
class Form {
  constructor(data = {}, options = {}) {
    __publicField(this, "processing");
    __publicField(this, "successful");
    __publicField(this, "errors");
    __publicField(this, "__options");
    __publicField(this, "initial");
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
    this.errors = new Errors$2();
    this.processing = false;
    this.successful = false;
    for (const field in data) {
      guardAgainstReservedFieldName(field);
      this[field] = data[field];
    }
    return this;
  }
  withErrors(errors2) {
    this.errors = new Errors$2(errors2);
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
  validate(rules2, customErrorMessages) {
    this.errors.clear();
    this.processing = true;
    this.successful = false;
    let validation = new Validator$1(this.data(), rules2);
    if (validation.fails()) {
      this.successful = false;
      this.errors.record(validation.errors.all());
    } else {
      this.successful = true;
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
const UpVue = {
  install: (app, options) => {
    config = new Config(options);
    const override = config.get("override") || {};
    app.config.globalProperties.$config = config.get("override.config") || config;
    app.config.globalProperties.$http = http = config.get("override.http") || axios.create();
    app.config.globalProperties.$api = api = config.get("override.api") || axios.create({
      baseURL: options.api.url
    });
    app.config.globalProperties.$message = config.get("override.message") || message;
    app.config.globalProperties.$notification = config.get("override.notification") || notification;
    if (!config.has("exclude.form")) {
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
    }
    if (typeof options.store !== "undefined" && options.storeMode === "vuex") {
      store = options.store;
    } else {
      store = reactive({
        user: null,
        menus: null
      });
    }
    if (!config.has("exclude.i18n")) {
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
    }
    if (!config.has("exclude.antd")) {
      app.use(Antd);
    }
    app.provide("UpVue", options);
    app.component("UpLayout", UpLayout$1);
    if (!useUp) {
      const exported = __spreadValues({
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
      }, override);
      if (config.has("debug")) {
        console.log("\u2934 useUp() accessible vars :", exported);
      }
      useUp = () => {
        return exported;
      };
    }
  }
};
export { UpLayout$1 as UpLayout, UpVue, useUp };
