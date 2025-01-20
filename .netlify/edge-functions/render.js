var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb2, mod) => function __require2() {
  return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || a2 && typeof a2 === "object" || typeof a2 === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
  return rest;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_current_component(component5) {
  current_component = component5;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component5, name) {
  if (!component5 || !component5.$$render) {
    if (name === "svelte:component") name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component5;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css3) => css3.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
var current_component, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/ssr2.js
function onMount() {
}
function afterUpdate() {
}
var init_ssr2 = __esm({
  ".svelte-kit/output/server/chunks/ssr2.js"() {
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/") return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore") return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback, allow_hash = false) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  const tracked_url_properties = ["href", "pathname", "search", "toString", "toJSON"];
  if (allow_hash) tracked_url_properties.push("hash");
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  if (!allow_hash) {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html")) return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module, file) {
    if (!module) return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2)) continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// .svelte-kit/output/server/chunks/index.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function derived(stores2, fn, initial_value) {
  const single = !Array.isArray(stores2);
  const stores_array = single ? [stores2] : stores2;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto2 = fn.length < 2;
  return readable(initial_value, (set, update2) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync2 = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update2);
      if (auto2) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync2();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync2();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
var subscriber_queue;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    init_ssr();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index5 = 0;
      while (index5 < str.length) {
        var eqIdx = str.indexOf("=", index5);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index5);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index5 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index5, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index5 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else if (key2 === "partitioned") {
          cookie.partitioned = true;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/highlight.js/lib/core.js
var require_core = __commonJS({
  "node_modules/highlight.js/lib/core.js"(exports, module) {
    function deepFreeze(obj) {
      if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function() {
          throw new Error("map is read-only");
        };
      } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function() {
          throw new Error("set is read-only");
        };
      }
      Object.freeze(obj);
      Object.getOwnPropertyNames(obj).forEach((name) => {
        const prop = obj[name];
        const type = typeof prop;
        if ((type === "object" || type === "function") && !Object.isFrozen(prop)) {
          deepFreeze(prop);
        }
      });
      return obj;
    }
    var Response2 = class {
      /**
       * @param {CompiledMode} mode
       */
      constructor(mode) {
        if (mode.data === void 0) mode.data = {};
        this.data = mode.data;
        this.isMatchIgnored = false;
      }
      ignoreMatch() {
        this.isMatchIgnored = true;
      }
    };
    function escapeHTML(value) {
      return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    }
    function inherit$1(original, ...objects) {
      const result = /* @__PURE__ */ Object.create(null);
      for (const key2 in original) {
        result[key2] = original[key2];
      }
      objects.forEach(function(obj) {
        for (const key2 in obj) {
          result[key2] = obj[key2];
        }
      });
      return (
        /** @type {T} */
        result
      );
    }
    var SPAN_CLOSE = "</span>";
    var emitsWrappingTags = (node) => {
      return !!node.scope;
    };
    var scopeToCSSClass = (name, { prefix: prefix2 }) => {
      if (name.startsWith("language:")) {
        return name.replace("language:", "language-");
      }
      if (name.includes(".")) {
        const pieces = name.split(".");
        return [
          `${prefix2}${pieces.shift()}`,
          ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
        ].join(" ");
      }
      return `${prefix2}${name}`;
    };
    var HTMLRenderer = class {
      /**
       * Creates a new HTMLRenderer
       *
       * @param {Tree} parseTree - the parse tree (must support `walk` API)
       * @param {{classPrefix: string}} options
       */
      constructor(parseTree, options2) {
        this.buffer = "";
        this.classPrefix = options2.classPrefix;
        parseTree.walk(this);
      }
      /**
       * Adds texts to the output stream
       *
       * @param {string} text */
      addText(text2) {
        this.buffer += escapeHTML(text2);
      }
      /**
       * Adds a node open to the output stream (if needed)
       *
       * @param {Node} node */
      openNode(node) {
        if (!emitsWrappingTags(node)) return;
        const className = scopeToCSSClass(
          node.scope,
          { prefix: this.classPrefix }
        );
        this.span(className);
      }
      /**
       * Adds a node close to the output stream (if needed)
       *
       * @param {Node} node */
      closeNode(node) {
        if (!emitsWrappingTags(node)) return;
        this.buffer += SPAN_CLOSE;
      }
      /**
       * returns the accumulated buffer
      */
      value() {
        return this.buffer;
      }
      // helpers
      /**
       * Builds a span element
       *
       * @param {string} className */
      span(className) {
        this.buffer += `<span class="${className}">`;
      }
    };
    var newNode = (opts = {}) => {
      const result = { children: [] };
      Object.assign(result, opts);
      return result;
    };
    var TokenTree = class _TokenTree {
      constructor() {
        this.rootNode = newNode();
        this.stack = [this.rootNode];
      }
      get top() {
        return this.stack[this.stack.length - 1];
      }
      get root() {
        return this.rootNode;
      }
      /** @param {Node} node */
      add(node) {
        this.top.children.push(node);
      }
      /** @param {string} scope */
      openNode(scope) {
        const node = newNode({ scope });
        this.add(node);
        this.stack.push(node);
      }
      closeNode() {
        if (this.stack.length > 1) {
          return this.stack.pop();
        }
        return void 0;
      }
      closeAllNodes() {
        while (this.closeNode()) ;
      }
      toJSON() {
        return JSON.stringify(this.rootNode, null, 4);
      }
      /**
       * @typedef { import("./html_renderer").Renderer } Renderer
       * @param {Renderer} builder
       */
      walk(builder) {
        return this.constructor._walk(builder, this.rootNode);
      }
      /**
       * @param {Renderer} builder
       * @param {Node} node
       */
      static _walk(builder, node) {
        if (typeof node === "string") {
          builder.addText(node);
        } else if (node.children) {
          builder.openNode(node);
          node.children.forEach((child) => this._walk(builder, child));
          builder.closeNode(node);
        }
        return builder;
      }
      /**
       * @param {Node} node
       */
      static _collapse(node) {
        if (typeof node === "string") return;
        if (!node.children) return;
        if (node.children.every((el) => typeof el === "string")) {
          node.children = [node.children.join("")];
        } else {
          node.children.forEach((child) => {
            _TokenTree._collapse(child);
          });
        }
      }
    };
    var TokenTreeEmitter = class extends TokenTree {
      /**
       * @param {*} options
       */
      constructor(options2) {
        super();
        this.options = options2;
      }
      /**
       * @param {string} text
       */
      addText(text2) {
        if (text2 === "") {
          return;
        }
        this.add(text2);
      }
      /** @param {string} scope */
      startScope(scope) {
        this.openNode(scope);
      }
      endScope() {
        this.closeNode();
      }
      /**
       * @param {Emitter & {root: DataNode}} emitter
       * @param {string} name
       */
      __addSublanguage(emitter, name) {
        const node = emitter.root;
        if (name) node.scope = `language:${name}`;
        this.add(node);
      }
      toHTML() {
        const renderer = new HTMLRenderer(this, this.options);
        return renderer.value();
      }
      finalize() {
        this.closeAllNodes();
        return true;
      }
    };
    function source(re) {
      if (!re) return null;
      if (typeof re === "string") return re;
      return re.source;
    }
    function lookahead(re) {
      return concat("(?=", re, ")");
    }
    function anyNumberOfTimes(re) {
      return concat("(?:", re, ")*");
    }
    function optional(re) {
      return concat("(?:", re, ")?");
    }
    function concat(...args) {
      const joined = args.map((x) => source(x)).join("");
      return joined;
    }
    function stripOptionsFromArgs(args) {
      const opts = args[args.length - 1];
      if (typeof opts === "object" && opts.constructor === Object) {
        args.splice(args.length - 1, 1);
        return opts;
      } else {
        return {};
      }
    }
    function either(...args) {
      const opts = stripOptionsFromArgs(args);
      const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
      return joined;
    }
    function countMatchGroups(re) {
      return new RegExp(re.toString() + "|").exec("").length - 1;
    }
    function startsWith(re, lexeme) {
      const match = re && re.exec(lexeme);
      return match && match.index === 0;
    }
    var BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
    function _rewriteBackreferences(regexps, { joinWith }) {
      let numCaptures = 0;
      return regexps.map((regex) => {
        numCaptures += 1;
        const offset = numCaptures;
        let re = source(regex);
        let out = "";
        while (re.length > 0) {
          const match = BACKREF_RE.exec(re);
          if (!match) {
            out += re;
            break;
          }
          out += re.substring(0, match.index);
          re = re.substring(match.index + match[0].length);
          if (match[0][0] === "\\" && match[1]) {
            out += "\\" + String(Number(match[1]) + offset);
          } else {
            out += match[0];
            if (match[0] === "(") {
              numCaptures++;
            }
          }
        }
        return out;
      }).map((re) => `(${re})`).join(joinWith);
    }
    var MATCH_NOTHING_RE = /\b\B/;
    var IDENT_RE3 = "[a-zA-Z]\\w*";
    var UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
    var NUMBER_RE = "\\b\\d+(\\.\\d+)?";
    var C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    var BINARY_NUMBER_RE = "\\b(0b[01]+)";
    var RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    var SHEBANG = (opts = {}) => {
      const beginShebang = /^#![ ]*\//;
      if (opts.binary) {
        opts.begin = concat(
          beginShebang,
          /.*\b/,
          opts.binary,
          /\b.*/
        );
      }
      return inherit$1({
        scope: "meta",
        begin: beginShebang,
        end: /$/,
        relevance: 0,
        /** @type {ModeCallback} */
        "on:begin": (m, resp) => {
          if (m.index !== 0) resp.ignoreMatch();
        }
      }, opts);
    };
    var BACKSLASH_ESCAPE = {
      begin: "\\\\[\\s\\S]",
      relevance: 0
    };
    var APOS_STRING_MODE = {
      scope: "string",
      begin: "'",
      end: "'",
      illegal: "\\n",
      contains: [BACKSLASH_ESCAPE]
    };
    var QUOTE_STRING_MODE = {
      scope: "string",
      begin: '"',
      end: '"',
      illegal: "\\n",
      contains: [BACKSLASH_ESCAPE]
    };
    var PHRASAL_WORDS_MODE = {
      begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    };
    var COMMENT = function(begin, end, modeOptions = {}) {
      const mode = inherit$1(
        {
          scope: "comment",
          begin,
          end,
          contains: []
        },
        modeOptions
      );
      mode.contains.push({
        scope: "doctag",
        // hack to avoid the space from being included. the space is necessary to
        // match here to prevent the plain text rule below from gobbling up doctags
        begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
        end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
        excludeBegin: true,
        relevance: 0
      });
      const ENGLISH_WORD = either(
        // list of common 1 and 2 letter words in English
        "I",
        "a",
        "is",
        "so",
        "us",
        "to",
        "at",
        "if",
        "in",
        "it",
        "on",
        // note: this is not an exhaustive list of contractions, just popular ones
        /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
        // contractions - can't we'd they're let's, etc
        /[A-Za-z]+[-][a-z]+/,
        // `no-way`, etc.
        /[A-Za-z][a-z]{2,}/
        // allow capitalized words at beginning of sentences
      );
      mode.contains.push(
        {
          // TODO: how to include ", (, ) without breaking grammars that use these for
          // comment delimiters?
          // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
          // ---
          // this tries to find sequences of 3 english words in a row (without any
          // "programming" type syntax) this gives us a strong signal that we've
          // TRULY found a comment - vs perhaps scanning with the wrong language.
          // It's possible to find something that LOOKS like the start of the
          // comment - but then if there is no readable text - good chance it is a
          // false match and not a comment.
          //
          // for a visual example please see:
          // https://github.com/highlightjs/highlight.js/issues/2827
          begin: concat(
            /[ ]+/,
            // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
            "(",
            ENGLISH_WORD,
            /[.]?[:]?([.][ ]|[ ])/,
            "){3}"
          )
          // look for 3 words in a row
        }
      );
      return mode;
    };
    var C_LINE_COMMENT_MODE = COMMENT("//", "$");
    var C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
    var HASH_COMMENT_MODE = COMMENT("#", "$");
    var NUMBER_MODE = {
      scope: "number",
      begin: NUMBER_RE,
      relevance: 0
    };
    var C_NUMBER_MODE = {
      scope: "number",
      begin: C_NUMBER_RE,
      relevance: 0
    };
    var BINARY_NUMBER_MODE = {
      scope: "number",
      begin: BINARY_NUMBER_RE,
      relevance: 0
    };
    var REGEXP_MODE = {
      scope: "regexp",
      begin: /\/(?=[^/\n]*\/)/,
      end: /\/[gimuy]*/,
      contains: [
        BACKSLASH_ESCAPE,
        {
          begin: /\[/,
          end: /\]/,
          relevance: 0,
          contains: [BACKSLASH_ESCAPE]
        }
      ]
    };
    var TITLE_MODE = {
      scope: "title",
      begin: IDENT_RE3,
      relevance: 0
    };
    var UNDERSCORE_TITLE_MODE = {
      scope: "title",
      begin: UNDERSCORE_IDENT_RE,
      relevance: 0
    };
    var METHOD_GUARD = {
      // excludes method names from keyword processing
      begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
      relevance: 0
    };
    var END_SAME_AS_BEGIN = function(mode) {
      return Object.assign(
        mode,
        {
          /** @type {ModeCallback} */
          "on:begin": (m, resp) => {
            resp.data._beginMatch = m[1];
          },
          /** @type {ModeCallback} */
          "on:end": (m, resp) => {
            if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
          }
        }
      );
    };
    var MODES2 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      APOS_STRING_MODE,
      BACKSLASH_ESCAPE,
      BINARY_NUMBER_MODE,
      BINARY_NUMBER_RE,
      COMMENT,
      C_BLOCK_COMMENT_MODE,
      C_LINE_COMMENT_MODE,
      C_NUMBER_MODE,
      C_NUMBER_RE,
      END_SAME_AS_BEGIN,
      HASH_COMMENT_MODE,
      IDENT_RE: IDENT_RE3,
      MATCH_NOTHING_RE,
      METHOD_GUARD,
      NUMBER_MODE,
      NUMBER_RE,
      PHRASAL_WORDS_MODE,
      QUOTE_STRING_MODE,
      REGEXP_MODE,
      RE_STARTERS_RE,
      SHEBANG,
      TITLE_MODE,
      UNDERSCORE_IDENT_RE,
      UNDERSCORE_TITLE_MODE
    });
    function skipIfHasPrecedingDot(match, response) {
      const before = match.input[match.index - 1];
      if (before === ".") {
        response.ignoreMatch();
      }
    }
    function scopeClassName(mode, _parent) {
      if (mode.className !== void 0) {
        mode.scope = mode.className;
        delete mode.className;
      }
    }
    function beginKeywords(mode, parent) {
      if (!parent) return;
      if (!mode.beginKeywords) return;
      mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
      mode.__beforeBegin = skipIfHasPrecedingDot;
      mode.keywords = mode.keywords || mode.beginKeywords;
      delete mode.beginKeywords;
      if (mode.relevance === void 0) mode.relevance = 0;
    }
    function compileIllegal(mode, _parent) {
      if (!Array.isArray(mode.illegal)) return;
      mode.illegal = either(...mode.illegal);
    }
    function compileMatch(mode, _parent) {
      if (!mode.match) return;
      if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
      mode.begin = mode.match;
      delete mode.match;
    }
    function compileRelevance(mode, _parent) {
      if (mode.relevance === void 0) mode.relevance = 1;
    }
    var beforeMatchExt = (mode, parent) => {
      if (!mode.beforeMatch) return;
      if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
      const originalMode = Object.assign({}, mode);
      Object.keys(mode).forEach((key2) => {
        delete mode[key2];
      });
      mode.keywords = originalMode.keywords;
      mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
      mode.starts = {
        relevance: 0,
        contains: [
          Object.assign(originalMode, { endsParent: true })
        ]
      };
      mode.relevance = 0;
      delete originalMode.beforeMatch;
    };
    var COMMON_KEYWORDS = [
      "of",
      "and",
      "for",
      "in",
      "not",
      "or",
      "if",
      "then",
      "parent",
      // common variable name
      "list",
      // common variable name
      "value"
      // common variable name
    ];
    var DEFAULT_KEYWORD_SCOPE = "keyword";
    function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
      const compiledKeywords = /* @__PURE__ */ Object.create(null);
      if (typeof rawKeywords === "string") {
        compileList(scopeName, rawKeywords.split(" "));
      } else if (Array.isArray(rawKeywords)) {
        compileList(scopeName, rawKeywords);
      } else {
        Object.keys(rawKeywords).forEach(function(scopeName2) {
          Object.assign(
            compiledKeywords,
            compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2)
          );
        });
      }
      return compiledKeywords;
      function compileList(scopeName2, keywordList) {
        if (caseInsensitive) {
          keywordList = keywordList.map((x) => x.toLowerCase());
        }
        keywordList.forEach(function(keyword) {
          const pair = keyword.split("|");
          compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
        });
      }
    }
    function scoreForKeyword(keyword, providedScore) {
      if (providedScore) {
        return Number(providedScore);
      }
      return commonKeyword(keyword) ? 0 : 1;
    }
    function commonKeyword(keyword) {
      return COMMON_KEYWORDS.includes(keyword.toLowerCase());
    }
    var seenDeprecations = {};
    var error = (message) => {
      console.error(message);
    };
    var warn = (message, ...args) => {
      console.log(`WARN: ${message}`, ...args);
    };
    var deprecated = (version2, message) => {
      if (seenDeprecations[`${version2}/${message}`]) return;
      console.log(`Deprecated as of ${version2}. ${message}`);
      seenDeprecations[`${version2}/${message}`] = true;
    };
    var MultiClassError = new Error();
    function remapScopeNames(mode, regexes, { key: key2 }) {
      let offset = 0;
      const scopeNames = mode[key2];
      const emit = {};
      const positions = {};
      for (let i = 1; i <= regexes.length; i++) {
        positions[i + offset] = scopeNames[i];
        emit[i + offset] = true;
        offset += countMatchGroups(regexes[i - 1]);
      }
      mode[key2] = positions;
      mode[key2]._emit = emit;
      mode[key2]._multi = true;
    }
    function beginMultiClass(mode) {
      if (!Array.isArray(mode.begin)) return;
      if (mode.skip || mode.excludeBegin || mode.returnBegin) {
        error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
        throw MultiClassError;
      }
      if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
        error("beginScope must be object");
        throw MultiClassError;
      }
      remapScopeNames(mode, mode.begin, { key: "beginScope" });
      mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
    }
    function endMultiClass(mode) {
      if (!Array.isArray(mode.end)) return;
      if (mode.skip || mode.excludeEnd || mode.returnEnd) {
        error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
        throw MultiClassError;
      }
      if (typeof mode.endScope !== "object" || mode.endScope === null) {
        error("endScope must be object");
        throw MultiClassError;
      }
      remapScopeNames(mode, mode.end, { key: "endScope" });
      mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
    }
    function scopeSugar(mode) {
      if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
        mode.beginScope = mode.scope;
        delete mode.scope;
      }
    }
    function MultiClass(mode) {
      scopeSugar(mode);
      if (typeof mode.beginScope === "string") {
        mode.beginScope = { _wrap: mode.beginScope };
      }
      if (typeof mode.endScope === "string") {
        mode.endScope = { _wrap: mode.endScope };
      }
      beginMultiClass(mode);
      endMultiClass(mode);
    }
    function compileLanguage(language) {
      function langRe(value, global) {
        return new RegExp(
          source(value),
          "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : "")
        );
      }
      class MultiRegex {
        constructor() {
          this.matchIndexes = {};
          this.regexes = [];
          this.matchAt = 1;
          this.position = 0;
        }
        // @ts-ignore
        addRule(re, opts) {
          opts.position = this.position++;
          this.matchIndexes[this.matchAt] = opts;
          this.regexes.push([opts, re]);
          this.matchAt += countMatchGroups(re) + 1;
        }
        compile() {
          if (this.regexes.length === 0) {
            this.exec = () => null;
          }
          const terminators = this.regexes.map((el) => el[1]);
          this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
          this.lastIndex = 0;
        }
        /** @param {string} s */
        exec(s2) {
          this.matcherRe.lastIndex = this.lastIndex;
          const match = this.matcherRe.exec(s2);
          if (!match) {
            return null;
          }
          const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
          const matchData = this.matchIndexes[i];
          match.splice(0, i);
          return Object.assign(match, matchData);
        }
      }
      class ResumableMultiRegex {
        constructor() {
          this.rules = [];
          this.multiRegexes = [];
          this.count = 0;
          this.lastIndex = 0;
          this.regexIndex = 0;
        }
        // @ts-ignore
        getMatcher(index5) {
          if (this.multiRegexes[index5]) return this.multiRegexes[index5];
          const matcher = new MultiRegex();
          this.rules.slice(index5).forEach(([re, opts]) => matcher.addRule(re, opts));
          matcher.compile();
          this.multiRegexes[index5] = matcher;
          return matcher;
        }
        resumingScanAtSamePosition() {
          return this.regexIndex !== 0;
        }
        considerAll() {
          this.regexIndex = 0;
        }
        // @ts-ignore
        addRule(re, opts) {
          this.rules.push([re, opts]);
          if (opts.type === "begin") this.count++;
        }
        /** @param {string} s */
        exec(s2) {
          const m = this.getMatcher(this.regexIndex);
          m.lastIndex = this.lastIndex;
          let result = m.exec(s2);
          if (this.resumingScanAtSamePosition()) {
            if (result && result.index === this.lastIndex) ;
            else {
              const m2 = this.getMatcher(0);
              m2.lastIndex = this.lastIndex + 1;
              result = m2.exec(s2);
            }
          }
          if (result) {
            this.regexIndex += result.position + 1;
            if (this.regexIndex === this.count) {
              this.considerAll();
            }
          }
          return result;
        }
      }
      function buildModeRegex(mode) {
        const mm = new ResumableMultiRegex();
        mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
        if (mode.terminatorEnd) {
          mm.addRule(mode.terminatorEnd, { type: "end" });
        }
        if (mode.illegal) {
          mm.addRule(mode.illegal, { type: "illegal" });
        }
        return mm;
      }
      function compileMode(mode, parent) {
        const cmode = (
          /** @type CompiledMode */
          mode
        );
        if (mode.isCompiled) return cmode;
        [
          scopeClassName,
          // do this early so compiler extensions generally don't have to worry about
          // the distinction between match/begin
          compileMatch,
          MultiClass,
          beforeMatchExt
        ].forEach((ext) => ext(mode, parent));
        language.compilerExtensions.forEach((ext) => ext(mode, parent));
        mode.__beforeBegin = null;
        [
          beginKeywords,
          // do this later so compiler extensions that come earlier have access to the
          // raw array if they wanted to perhaps manipulate it, etc.
          compileIllegal,
          // default to 1 relevance if not specified
          compileRelevance
        ].forEach((ext) => ext(mode, parent));
        mode.isCompiled = true;
        let keywordPattern = null;
        if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
          mode.keywords = Object.assign({}, mode.keywords);
          keywordPattern = mode.keywords.$pattern;
          delete mode.keywords.$pattern;
        }
        keywordPattern = keywordPattern || /\w+/;
        if (mode.keywords) {
          mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
        }
        cmode.keywordPatternRe = langRe(keywordPattern, true);
        if (parent) {
          if (!mode.begin) mode.begin = /\B|\b/;
          cmode.beginRe = langRe(cmode.begin);
          if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
          if (mode.end) cmode.endRe = langRe(cmode.end);
          cmode.terminatorEnd = source(cmode.end) || "";
          if (mode.endsWithParent && parent.terminatorEnd) {
            cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
          }
        }
        if (mode.illegal) cmode.illegalRe = langRe(
          /** @type {RegExp | string} */
          mode.illegal
        );
        if (!mode.contains) mode.contains = [];
        mode.contains = [].concat(...mode.contains.map(function(c2) {
          return expandOrCloneMode(c2 === "self" ? mode : c2);
        }));
        mode.contains.forEach(function(c2) {
          compileMode(
            /** @type Mode */
            c2,
            cmode
          );
        });
        if (mode.starts) {
          compileMode(mode.starts, parent);
        }
        cmode.matcher = buildModeRegex(cmode);
        return cmode;
      }
      if (!language.compilerExtensions) language.compilerExtensions = [];
      if (language.contains && language.contains.includes("self")) {
        throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
      }
      language.classNameAliases = inherit$1(language.classNameAliases || {});
      return compileMode(
        /** @type Mode */
        language
      );
    }
    function dependencyOnParent(mode) {
      if (!mode) return false;
      return mode.endsWithParent || dependencyOnParent(mode.starts);
    }
    function expandOrCloneMode(mode) {
      if (mode.variants && !mode.cachedVariants) {
        mode.cachedVariants = mode.variants.map(function(variant) {
          return inherit$1(mode, { variants: null }, variant);
        });
      }
      if (mode.cachedVariants) {
        return mode.cachedVariants;
      }
      if (dependencyOnParent(mode)) {
        return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
      }
      if (Object.isFrozen(mode)) {
        return inherit$1(mode);
      }
      return mode;
    }
    var version = "11.11.1";
    var HTMLInjectionError = class extends Error {
      constructor(reason, html) {
        super(reason);
        this.name = "HTMLInjectionError";
        this.html = html;
      }
    };
    var escape2 = escapeHTML;
    var inherit = inherit$1;
    var NO_MATCH = Symbol("nomatch");
    var MAX_KEYWORD_HITS = 7;
    var HLJS = function(hljs) {
      const languages = /* @__PURE__ */ Object.create(null);
      const aliases = /* @__PURE__ */ Object.create(null);
      const plugins = [];
      let SAFE_MODE = true;
      const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
      const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
      let options2 = {
        ignoreUnescapedHTML: false,
        throwUnescapedHTML: false,
        noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
        classPrefix: "hljs-",
        cssSelector: "pre code",
        languages: null,
        // beta configuration options, subject to change, welcome to discuss
        // https://github.com/highlightjs/highlight.js/issues/1086
        __emitter: TokenTreeEmitter
      };
      function shouldNotHighlight(languageName) {
        return options2.noHighlightRe.test(languageName);
      }
      function blockLanguage(block) {
        let classes = block.className + " ";
        classes += block.parentNode ? block.parentNode.className : "";
        const match = options2.languageDetectRe.exec(classes);
        if (match) {
          const language = getLanguage(match[1]);
          if (!language) {
            warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
            warn("Falling back to no-highlight mode for this block.", block);
          }
          return language ? match[1] : "no-highlight";
        }
        return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
      }
      function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
        let code = "";
        let languageName = "";
        if (typeof optionsOrCode === "object") {
          code = codeOrLanguageName;
          ignoreIllegals = optionsOrCode.ignoreIllegals;
          languageName = optionsOrCode.language;
        } else {
          deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
          deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
          languageName = codeOrLanguageName;
          code = optionsOrCode;
        }
        if (ignoreIllegals === void 0) {
          ignoreIllegals = true;
        }
        const context = {
          code,
          language: languageName
        };
        fire("before:highlight", context);
        const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
        result.code = context.code;
        fire("after:highlight", result);
        return result;
      }
      function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
        const keywordHits = /* @__PURE__ */ Object.create(null);
        function keywordData(mode, matchText) {
          return mode.keywords[matchText];
        }
        function processKeywords() {
          if (!top.keywords) {
            emitter.addText(modeBuffer);
            return;
          }
          let lastIndex = 0;
          top.keywordPatternRe.lastIndex = 0;
          let match = top.keywordPatternRe.exec(modeBuffer);
          let buf = "";
          while (match) {
            buf += modeBuffer.substring(lastIndex, match.index);
            const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
            const data = keywordData(top, word);
            if (data) {
              const [kind, keywordRelevance] = data;
              emitter.addText(buf);
              buf = "";
              keywordHits[word] = (keywordHits[word] || 0) + 1;
              if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
              if (kind.startsWith("_")) {
                buf += match[0];
              } else {
                const cssClass = language.classNameAliases[kind] || kind;
                emitKeyword(match[0], cssClass);
              }
            } else {
              buf += match[0];
            }
            lastIndex = top.keywordPatternRe.lastIndex;
            match = top.keywordPatternRe.exec(modeBuffer);
          }
          buf += modeBuffer.substring(lastIndex);
          emitter.addText(buf);
        }
        function processSubLanguage() {
          if (modeBuffer === "") return;
          let result2 = null;
          if (typeof top.subLanguage === "string") {
            if (!languages[top.subLanguage]) {
              emitter.addText(modeBuffer);
              return;
            }
            result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
            continuations[top.subLanguage] = /** @type {CompiledMode} */
            result2._top;
          } else {
            result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
          }
          if (top.relevance > 0) {
            relevance += result2.relevance;
          }
          emitter.__addSublanguage(result2._emitter, result2.language);
        }
        function processBuffer() {
          if (top.subLanguage != null) {
            processSubLanguage();
          } else {
            processKeywords();
          }
          modeBuffer = "";
        }
        function emitKeyword(keyword, scope) {
          if (keyword === "") return;
          emitter.startScope(scope);
          emitter.addText(keyword);
          emitter.endScope();
        }
        function emitMultiClass(scope, match) {
          let i = 1;
          const max = match.length - 1;
          while (i <= max) {
            if (!scope._emit[i]) {
              i++;
              continue;
            }
            const klass = language.classNameAliases[scope[i]] || scope[i];
            const text2 = match[i];
            if (klass) {
              emitKeyword(text2, klass);
            } else {
              modeBuffer = text2;
              processKeywords();
              modeBuffer = "";
            }
            i++;
          }
        }
        function startNewMode(mode, match) {
          if (mode.scope && typeof mode.scope === "string") {
            emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
          }
          if (mode.beginScope) {
            if (mode.beginScope._wrap) {
              emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
              modeBuffer = "";
            } else if (mode.beginScope._multi) {
              emitMultiClass(mode.beginScope, match);
              modeBuffer = "";
            }
          }
          top = Object.create(mode, { parent: { value: top } });
          return top;
        }
        function endOfMode(mode, match, matchPlusRemainder) {
          let matched = startsWith(mode.endRe, matchPlusRemainder);
          if (matched) {
            if (mode["on:end"]) {
              const resp = new Response2(mode);
              mode["on:end"](match, resp);
              if (resp.isMatchIgnored) matched = false;
            }
            if (matched) {
              while (mode.endsParent && mode.parent) {
                mode = mode.parent;
              }
              return mode;
            }
          }
          if (mode.endsWithParent) {
            return endOfMode(mode.parent, match, matchPlusRemainder);
          }
        }
        function doIgnore(lexeme) {
          if (top.matcher.regexIndex === 0) {
            modeBuffer += lexeme[0];
            return 1;
          } else {
            resumeScanAtSamePosition = true;
            return 0;
          }
        }
        function doBeginMatch(match) {
          const lexeme = match[0];
          const newMode = match.rule;
          const resp = new Response2(newMode);
          const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
          for (const cb2 of beforeCallbacks) {
            if (!cb2) continue;
            cb2(match, resp);
            if (resp.isMatchIgnored) return doIgnore(lexeme);
          }
          if (newMode.skip) {
            modeBuffer += lexeme;
          } else {
            if (newMode.excludeBegin) {
              modeBuffer += lexeme;
            }
            processBuffer();
            if (!newMode.returnBegin && !newMode.excludeBegin) {
              modeBuffer = lexeme;
            }
          }
          startNewMode(newMode, match);
          return newMode.returnBegin ? 0 : lexeme.length;
        }
        function doEndMatch(match) {
          const lexeme = match[0];
          const matchPlusRemainder = codeToHighlight.substring(match.index);
          const endMode = endOfMode(top, match, matchPlusRemainder);
          if (!endMode) {
            return NO_MATCH;
          }
          const origin = top;
          if (top.endScope && top.endScope._wrap) {
            processBuffer();
            emitKeyword(lexeme, top.endScope._wrap);
          } else if (top.endScope && top.endScope._multi) {
            processBuffer();
            emitMultiClass(top.endScope, match);
          } else if (origin.skip) {
            modeBuffer += lexeme;
          } else {
            if (!(origin.returnEnd || origin.excludeEnd)) {
              modeBuffer += lexeme;
            }
            processBuffer();
            if (origin.excludeEnd) {
              modeBuffer = lexeme;
            }
          }
          do {
            if (top.scope) {
              emitter.closeNode();
            }
            if (!top.skip && !top.subLanguage) {
              relevance += top.relevance;
            }
            top = top.parent;
          } while (top !== endMode.parent);
          if (endMode.starts) {
            startNewMode(endMode.starts, match);
          }
          return origin.returnEnd ? 0 : lexeme.length;
        }
        function processContinuations() {
          const list = [];
          for (let current = top; current !== language; current = current.parent) {
            if (current.scope) {
              list.unshift(current.scope);
            }
          }
          list.forEach((item) => emitter.openNode(item));
        }
        let lastMatch = {};
        function processLexeme(textBeforeMatch, match) {
          const lexeme = match && match[0];
          modeBuffer += textBeforeMatch;
          if (lexeme == null) {
            processBuffer();
            return 0;
          }
          if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
            modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
            if (!SAFE_MODE) {
              const err = new Error(`0 width match regex (${languageName})`);
              err.languageName = languageName;
              err.badRule = lastMatch.rule;
              throw err;
            }
            return 1;
          }
          lastMatch = match;
          if (match.type === "begin") {
            return doBeginMatch(match);
          } else if (match.type === "illegal" && !ignoreIllegals) {
            const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
            err.mode = top;
            throw err;
          } else if (match.type === "end") {
            const processed = doEndMatch(match);
            if (processed !== NO_MATCH) {
              return processed;
            }
          }
          if (match.type === "illegal" && lexeme === "") {
            modeBuffer += "\n";
            return 1;
          }
          if (iterations > 1e5 && iterations > match.index * 3) {
            const err = new Error("potential infinite loop, way more iterations than matches");
            throw err;
          }
          modeBuffer += lexeme;
          return lexeme.length;
        }
        const language = getLanguage(languageName);
        if (!language) {
          error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
          throw new Error('Unknown language: "' + languageName + '"');
        }
        const md = compileLanguage(language);
        let result = "";
        let top = continuation || md;
        const continuations = {};
        const emitter = new options2.__emitter(options2);
        processContinuations();
        let modeBuffer = "";
        let relevance = 0;
        let index5 = 0;
        let iterations = 0;
        let resumeScanAtSamePosition = false;
        try {
          if (!language.__emitTokens) {
            top.matcher.considerAll();
            for (; ; ) {
              iterations++;
              if (resumeScanAtSamePosition) {
                resumeScanAtSamePosition = false;
              } else {
                top.matcher.considerAll();
              }
              top.matcher.lastIndex = index5;
              const match = top.matcher.exec(codeToHighlight);
              if (!match) break;
              const beforeMatch = codeToHighlight.substring(index5, match.index);
              const processedCount = processLexeme(beforeMatch, match);
              index5 = match.index + processedCount;
            }
            processLexeme(codeToHighlight.substring(index5));
          } else {
            language.__emitTokens(codeToHighlight, emitter);
          }
          emitter.finalize();
          result = emitter.toHTML();
          return {
            language: languageName,
            value: result,
            relevance,
            illegal: false,
            _emitter: emitter,
            _top: top
          };
        } catch (err) {
          if (err.message && err.message.includes("Illegal")) {
            return {
              language: languageName,
              value: escape2(codeToHighlight),
              illegal: true,
              relevance: 0,
              _illegalBy: {
                message: err.message,
                index: index5,
                context: codeToHighlight.slice(index5 - 100, index5 + 100),
                mode: err.mode,
                resultSoFar: result
              },
              _emitter: emitter
            };
          } else if (SAFE_MODE) {
            return {
              language: languageName,
              value: escape2(codeToHighlight),
              illegal: false,
              relevance: 0,
              errorRaised: err,
              _emitter: emitter,
              _top: top
            };
          } else {
            throw err;
          }
        }
      }
      function justTextHighlightResult(code) {
        const result = {
          value: escape2(code),
          illegal: false,
          relevance: 0,
          _top: PLAINTEXT_LANGUAGE,
          _emitter: new options2.__emitter(options2)
        };
        result._emitter.addText(code);
        return result;
      }
      function highlightAuto(code, languageSubset) {
        languageSubset = languageSubset || options2.languages || Object.keys(languages);
        const plaintext = justTextHighlightResult(code);
        const results = languageSubset.filter(getLanguage).filter(autoDetection).map(
          (name) => _highlight(name, code, false)
        );
        results.unshift(plaintext);
        const sorted = results.sort((a2, b2) => {
          if (a2.relevance !== b2.relevance) return b2.relevance - a2.relevance;
          if (a2.language && b2.language) {
            if (getLanguage(a2.language).supersetOf === b2.language) {
              return 1;
            } else if (getLanguage(b2.language).supersetOf === a2.language) {
              return -1;
            }
          }
          return 0;
        });
        const [best, secondBest] = sorted;
        const result = best;
        result.secondBest = secondBest;
        return result;
      }
      function updateClassName(element, currentLang, resultLang) {
        const language = currentLang && aliases[currentLang] || resultLang;
        element.classList.add("hljs");
        element.classList.add(`language-${language}`);
      }
      function highlightElement(element) {
        let node = null;
        const language = blockLanguage(element);
        if (shouldNotHighlight(language)) return;
        fire(
          "before:highlightElement",
          { el: element, language }
        );
        if (element.dataset.highlighted) {
          console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
          return;
        }
        if (element.children.length > 0) {
          if (!options2.ignoreUnescapedHTML) {
            console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
            console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
            console.warn("The element with unescaped HTML:");
            console.warn(element);
          }
          if (options2.throwUnescapedHTML) {
            const err = new HTMLInjectionError(
              "One of your code blocks includes unescaped HTML.",
              element.innerHTML
            );
            throw err;
          }
        }
        node = element;
        const text2 = node.textContent;
        const result = language ? highlight2(text2, { language, ignoreIllegals: true }) : highlightAuto(text2);
        element.innerHTML = result.value;
        element.dataset.highlighted = "yes";
        updateClassName(element, language, result.language);
        element.result = {
          language: result.language,
          // TODO: remove with version 11.0
          re: result.relevance,
          relevance: result.relevance
        };
        if (result.secondBest) {
          element.secondBest = {
            language: result.secondBest.language,
            relevance: result.secondBest.relevance
          };
        }
        fire("after:highlightElement", { el: element, result, text: text2 });
      }
      function configure(userOptions) {
        options2 = inherit(options2, userOptions);
      }
      const initHighlighting = () => {
        highlightAll();
        deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
      };
      function initHighlightingOnLoad() {
        highlightAll();
        deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
      }
      let wantsHighlight = false;
      function highlightAll() {
        function boot() {
          highlightAll();
        }
        if (document.readyState === "loading") {
          if (!wantsHighlight) {
            window.addEventListener("DOMContentLoaded", boot, false);
          }
          wantsHighlight = true;
          return;
        }
        const blocks = document.querySelectorAll(options2.cssSelector);
        blocks.forEach(highlightElement);
      }
      function registerLanguage(languageName, languageDefinition) {
        let lang = null;
        try {
          lang = languageDefinition(hljs);
        } catch (error$1) {
          error("Language definition for '{}' could not be registered.".replace("{}", languageName));
          if (!SAFE_MODE) {
            throw error$1;
          } else {
            error(error$1);
          }
          lang = PLAINTEXT_LANGUAGE;
        }
        if (!lang.name) lang.name = languageName;
        languages[languageName] = lang;
        lang.rawDefinition = languageDefinition.bind(null, hljs);
        if (lang.aliases) {
          registerAliases(lang.aliases, { languageName });
        }
      }
      function unregisterLanguage(languageName) {
        delete languages[languageName];
        for (const alias of Object.keys(aliases)) {
          if (aliases[alias] === languageName) {
            delete aliases[alias];
          }
        }
      }
      function listLanguages() {
        return Object.keys(languages);
      }
      function getLanguage(name) {
        name = (name || "").toLowerCase();
        return languages[name] || languages[aliases[name]];
      }
      function registerAliases(aliasList, { languageName }) {
        if (typeof aliasList === "string") {
          aliasList = [aliasList];
        }
        aliasList.forEach((alias) => {
          aliases[alias.toLowerCase()] = languageName;
        });
      }
      function autoDetection(name) {
        const lang = getLanguage(name);
        return lang && !lang.disableAutodetect;
      }
      function upgradePluginAPI(plugin) {
        if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
          plugin["before:highlightElement"] = (data) => {
            plugin["before:highlightBlock"](
              Object.assign({ block: data.el }, data)
            );
          };
        }
        if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
          plugin["after:highlightElement"] = (data) => {
            plugin["after:highlightBlock"](
              Object.assign({ block: data.el }, data)
            );
          };
        }
      }
      function addPlugin(plugin) {
        upgradePluginAPI(plugin);
        plugins.push(plugin);
      }
      function removePlugin(plugin) {
        const index5 = plugins.indexOf(plugin);
        if (index5 !== -1) {
          plugins.splice(index5, 1);
        }
      }
      function fire(event, args) {
        const cb2 = event;
        plugins.forEach(function(plugin) {
          if (plugin[cb2]) {
            plugin[cb2](args);
          }
        });
      }
      function deprecateHighlightBlock(el) {
        deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
        deprecated("10.7.0", "Please use highlightElement now.");
        return highlightElement(el);
      }
      Object.assign(hljs, {
        highlight: highlight2,
        highlightAuto,
        highlightAll,
        highlightElement,
        // TODO: Remove with v12 API
        highlightBlock: deprecateHighlightBlock,
        configure,
        initHighlighting,
        initHighlightingOnLoad,
        registerLanguage,
        unregisterLanguage,
        listLanguages,
        getLanguage,
        registerAliases,
        autoDetection,
        inherit,
        addPlugin,
        removePlugin
      });
      hljs.debugMode = function() {
        SAFE_MODE = false;
      };
      hljs.safeMode = function() {
        SAFE_MODE = true;
      };
      hljs.versionString = version;
      hljs.regex = {
        concat,
        lookahead,
        either,
        optional,
        anyNumberOfTimes
      };
      for (const key2 in MODES2) {
        if (typeof MODES2[key2] === "object") {
          deepFreeze(MODES2[key2]);
        }
      }
      Object.assign(hljs, MODES2);
      return hljs;
    };
    var highlight = HLJS({});
    highlight.newInstance = () => HLJS({});
    module.exports = highlight;
    highlight.HighlightJS = highlight;
    highlight.default = highlight;
  }
});

// node_modules/highlight.js/es/core.js
var import_core, core_default;
var init_core = __esm({
  "node_modules/highlight.js/es/core.js"() {
    import_core = __toESM(require_core(), 1);
    core_default = import_core.default;
  }
});

// node_modules/highlight.js/es/languages/xml.js
function xml(hljs) {
  const regex = hljs.regex;
  const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
  const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
  const XML_ENTITIES = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [XML_ENTITIES]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [XML_ENTITIES]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: true,
    unicodeRegex: true,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              QUOTE_META_STRING_MODE
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: regex.concat(
          /</,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            // <tag/>
            // <tag>
            // <tag ...
            regex.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: regex.concat(
          /<\//,
          regex.lookahead(regex.concat(
            TAG_NAME_RE,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}
var init_xml = __esm({
  "node_modules/highlight.js/es/languages/xml.js"() {
  }
});

// node_modules/highlight.js/es/languages/css.js
function css(hljs) {
  const regex = hljs.regex;
  const modes = MODES(hljs);
  const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
  const IDENT_RE3 = "[a-zA-Z-][a-zA-Z0-9_-]*";
  const STRINGS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      modes.BLOCK_COMMENT,
      VENDOR_PREFIX,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      modes.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + IDENT_RE3,
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + PSEUDO_CLASSES.join("|") + ")" },
          { begin: ":(:)?(" + PSEUDO_ELEMENTS.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      modes.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          modes.BLOCK_COMMENT,
          modes.HEXCOLOR,
          modes.IMPORTANT,
          modes.CSS_NUMBER_MODE,
          ...STRINGS,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...STRINGS,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          modes.FUNCTION_DISPATCH
        ]
      },
      {
        begin: regex.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: AT_MODIFIERS,
              attribute: MEDIA_FEATURES.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...STRINGS,
              modes.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + TAGS.join("|") + ")\\b"
      }
    ]
  };
}
var MODES, HTML_TAGS, SVG_TAGS, TAGS, MEDIA_FEATURES, PSEUDO_CLASSES, PSEUDO_ELEMENTS, ATTRIBUTES;
var init_css = __esm({
  "node_modules/highlight.js/es/languages/css.js"() {
    MODES = (hljs) => {
      return {
        IMPORTANT: {
          scope: "meta",
          begin: "!important"
        },
        BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
        HEXCOLOR: {
          scope: "number",
          begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
        },
        FUNCTION_DISPATCH: {
          className: "built_in",
          begin: /[\w-]+(?=\()/
        },
        ATTRIBUTE_SELECTOR_MODE: {
          scope: "selector-attr",
          begin: /\[/,
          end: /\]/,
          illegal: "$",
          contains: [
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
          ]
        },
        CSS_NUMBER_MODE: {
          scope: "number",
          begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
          relevance: 0
        },
        CSS_VARIABLE: {
          className: "attr",
          begin: /--[A-Za-z_][A-Za-z0-9_-]*/
        }
      };
    };
    HTML_TAGS = [
      "a",
      "abbr",
      "address",
      "article",
      "aside",
      "audio",
      "b",
      "blockquote",
      "body",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "dd",
      "del",
      "details",
      "dfn",
      "div",
      "dl",
      "dt",
      "em",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "main",
      "mark",
      "menu",
      "nav",
      "object",
      "ol",
      "optgroup",
      "option",
      "p",
      "picture",
      "q",
      "quote",
      "samp",
      "section",
      "select",
      "source",
      "span",
      "strong",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "ul",
      "var",
      "video"
    ];
    SVG_TAGS = [
      "defs",
      "g",
      "marker",
      "mask",
      "pattern",
      "svg",
      "switch",
      "symbol",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feFlood",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMorphology",
      "feOffset",
      "feSpecularLighting",
      "feTile",
      "feTurbulence",
      "linearGradient",
      "radialGradient",
      "stop",
      "circle",
      "ellipse",
      "image",
      "line",
      "path",
      "polygon",
      "polyline",
      "rect",
      "text",
      "use",
      "textPath",
      "tspan",
      "foreignObject",
      "clipPath"
    ];
    TAGS = [
      ...HTML_TAGS,
      ...SVG_TAGS
    ];
    MEDIA_FEATURES = [
      "any-hover",
      "any-pointer",
      "aspect-ratio",
      "color",
      "color-gamut",
      "color-index",
      "device-aspect-ratio",
      "device-height",
      "device-width",
      "display-mode",
      "forced-colors",
      "grid",
      "height",
      "hover",
      "inverted-colors",
      "monochrome",
      "orientation",
      "overflow-block",
      "overflow-inline",
      "pointer",
      "prefers-color-scheme",
      "prefers-contrast",
      "prefers-reduced-motion",
      "prefers-reduced-transparency",
      "resolution",
      "scan",
      "scripting",
      "update",
      "width",
      // TODO: find a better solution?
      "min-width",
      "max-width",
      "min-height",
      "max-height"
    ].sort().reverse();
    PSEUDO_CLASSES = [
      "active",
      "any-link",
      "blank",
      "checked",
      "current",
      "default",
      "defined",
      "dir",
      // dir()
      "disabled",
      "drop",
      "empty",
      "enabled",
      "first",
      "first-child",
      "first-of-type",
      "fullscreen",
      "future",
      "focus",
      "focus-visible",
      "focus-within",
      "has",
      // has()
      "host",
      // host or host()
      "host-context",
      // host-context()
      "hover",
      "indeterminate",
      "in-range",
      "invalid",
      "is",
      // is()
      "lang",
      // lang()
      "last-child",
      "last-of-type",
      "left",
      "link",
      "local-link",
      "not",
      // not()
      "nth-child",
      // nth-child()
      "nth-col",
      // nth-col()
      "nth-last-child",
      // nth-last-child()
      "nth-last-col",
      // nth-last-col()
      "nth-last-of-type",
      //nth-last-of-type()
      "nth-of-type",
      //nth-of-type()
      "only-child",
      "only-of-type",
      "optional",
      "out-of-range",
      "past",
      "placeholder-shown",
      "read-only",
      "read-write",
      "required",
      "right",
      "root",
      "scope",
      "target",
      "target-within",
      "user-invalid",
      "valid",
      "visited",
      "where"
      // where()
    ].sort().reverse();
    PSEUDO_ELEMENTS = [
      "after",
      "backdrop",
      "before",
      "cue",
      "cue-region",
      "first-letter",
      "first-line",
      "grammar-error",
      "marker",
      "part",
      "placeholder",
      "selection",
      "slotted",
      "spelling-error"
    ].sort().reverse();
    ATTRIBUTES = [
      "accent-color",
      "align-content",
      "align-items",
      "align-self",
      "alignment-baseline",
      "all",
      "anchor-name",
      "animation",
      "animation-composition",
      "animation-delay",
      "animation-direction",
      "animation-duration",
      "animation-fill-mode",
      "animation-iteration-count",
      "animation-name",
      "animation-play-state",
      "animation-range",
      "animation-range-end",
      "animation-range-start",
      "animation-timeline",
      "animation-timing-function",
      "appearance",
      "aspect-ratio",
      "backdrop-filter",
      "backface-visibility",
      "background",
      "background-attachment",
      "background-blend-mode",
      "background-clip",
      "background-color",
      "background-image",
      "background-origin",
      "background-position",
      "background-position-x",
      "background-position-y",
      "background-repeat",
      "background-size",
      "baseline-shift",
      "block-size",
      "border",
      "border-block",
      "border-block-color",
      "border-block-end",
      "border-block-end-color",
      "border-block-end-style",
      "border-block-end-width",
      "border-block-start",
      "border-block-start-color",
      "border-block-start-style",
      "border-block-start-width",
      "border-block-style",
      "border-block-width",
      "border-bottom",
      "border-bottom-color",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
      "border-bottom-style",
      "border-bottom-width",
      "border-collapse",
      "border-color",
      "border-end-end-radius",
      "border-end-start-radius",
      "border-image",
      "border-image-outset",
      "border-image-repeat",
      "border-image-slice",
      "border-image-source",
      "border-image-width",
      "border-inline",
      "border-inline-color",
      "border-inline-end",
      "border-inline-end-color",
      "border-inline-end-style",
      "border-inline-end-width",
      "border-inline-start",
      "border-inline-start-color",
      "border-inline-start-style",
      "border-inline-start-width",
      "border-inline-style",
      "border-inline-width",
      "border-left",
      "border-left-color",
      "border-left-style",
      "border-left-width",
      "border-radius",
      "border-right",
      "border-right-color",
      "border-right-style",
      "border-right-width",
      "border-spacing",
      "border-start-end-radius",
      "border-start-start-radius",
      "border-style",
      "border-top",
      "border-top-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-top-style",
      "border-top-width",
      "border-width",
      "bottom",
      "box-align",
      "box-decoration-break",
      "box-direction",
      "box-flex",
      "box-flex-group",
      "box-lines",
      "box-ordinal-group",
      "box-orient",
      "box-pack",
      "box-shadow",
      "box-sizing",
      "break-after",
      "break-before",
      "break-inside",
      "caption-side",
      "caret-color",
      "clear",
      "clip",
      "clip-path",
      "clip-rule",
      "color",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "color-scheme",
      "column-count",
      "column-fill",
      "column-gap",
      "column-rule",
      "column-rule-color",
      "column-rule-style",
      "column-rule-width",
      "column-span",
      "column-width",
      "columns",
      "contain",
      "contain-intrinsic-block-size",
      "contain-intrinsic-height",
      "contain-intrinsic-inline-size",
      "contain-intrinsic-size",
      "contain-intrinsic-width",
      "container",
      "container-name",
      "container-type",
      "content",
      "content-visibility",
      "counter-increment",
      "counter-reset",
      "counter-set",
      "cue",
      "cue-after",
      "cue-before",
      "cursor",
      "cx",
      "cy",
      "direction",
      "display",
      "dominant-baseline",
      "empty-cells",
      "enable-background",
      "field-sizing",
      "fill",
      "fill-opacity",
      "fill-rule",
      "filter",
      "flex",
      "flex-basis",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "float",
      "flood-color",
      "flood-opacity",
      "flow",
      "font",
      "font-display",
      "font-family",
      "font-feature-settings",
      "font-kerning",
      "font-language-override",
      "font-optical-sizing",
      "font-palette",
      "font-size",
      "font-size-adjust",
      "font-smooth",
      "font-smoothing",
      "font-stretch",
      "font-style",
      "font-synthesis",
      "font-synthesis-position",
      "font-synthesis-small-caps",
      "font-synthesis-style",
      "font-synthesis-weight",
      "font-variant",
      "font-variant-alternates",
      "font-variant-caps",
      "font-variant-east-asian",
      "font-variant-emoji",
      "font-variant-ligatures",
      "font-variant-numeric",
      "font-variant-position",
      "font-variation-settings",
      "font-weight",
      "forced-color-adjust",
      "gap",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "grid",
      "grid-area",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-column",
      "grid-column-end",
      "grid-column-start",
      "grid-gap",
      "grid-row",
      "grid-row-end",
      "grid-row-start",
      "grid-template",
      "grid-template-areas",
      "grid-template-columns",
      "grid-template-rows",
      "hanging-punctuation",
      "height",
      "hyphenate-character",
      "hyphenate-limit-chars",
      "hyphens",
      "icon",
      "image-orientation",
      "image-rendering",
      "image-resolution",
      "ime-mode",
      "initial-letter",
      "initial-letter-align",
      "inline-size",
      "inset",
      "inset-area",
      "inset-block",
      "inset-block-end",
      "inset-block-start",
      "inset-inline",
      "inset-inline-end",
      "inset-inline-start",
      "isolation",
      "justify-content",
      "justify-items",
      "justify-self",
      "kerning",
      "left",
      "letter-spacing",
      "lighting-color",
      "line-break",
      "line-height",
      "line-height-step",
      "list-style",
      "list-style-image",
      "list-style-position",
      "list-style-type",
      "margin",
      "margin-block",
      "margin-block-end",
      "margin-block-start",
      "margin-bottom",
      "margin-inline",
      "margin-inline-end",
      "margin-inline-start",
      "margin-left",
      "margin-right",
      "margin-top",
      "margin-trim",
      "marker",
      "marker-end",
      "marker-mid",
      "marker-start",
      "marks",
      "mask",
      "mask-border",
      "mask-border-mode",
      "mask-border-outset",
      "mask-border-repeat",
      "mask-border-slice",
      "mask-border-source",
      "mask-border-width",
      "mask-clip",
      "mask-composite",
      "mask-image",
      "mask-mode",
      "mask-origin",
      "mask-position",
      "mask-repeat",
      "mask-size",
      "mask-type",
      "masonry-auto-flow",
      "math-depth",
      "math-shift",
      "math-style",
      "max-block-size",
      "max-height",
      "max-inline-size",
      "max-width",
      "min-block-size",
      "min-height",
      "min-inline-size",
      "min-width",
      "mix-blend-mode",
      "nav-down",
      "nav-index",
      "nav-left",
      "nav-right",
      "nav-up",
      "none",
      "normal",
      "object-fit",
      "object-position",
      "offset",
      "offset-anchor",
      "offset-distance",
      "offset-path",
      "offset-position",
      "offset-rotate",
      "opacity",
      "order",
      "orphans",
      "outline",
      "outline-color",
      "outline-offset",
      "outline-style",
      "outline-width",
      "overflow",
      "overflow-anchor",
      "overflow-block",
      "overflow-clip-margin",
      "overflow-inline",
      "overflow-wrap",
      "overflow-x",
      "overflow-y",
      "overlay",
      "overscroll-behavior",
      "overscroll-behavior-block",
      "overscroll-behavior-inline",
      "overscroll-behavior-x",
      "overscroll-behavior-y",
      "padding",
      "padding-block",
      "padding-block-end",
      "padding-block-start",
      "padding-bottom",
      "padding-inline",
      "padding-inline-end",
      "padding-inline-start",
      "padding-left",
      "padding-right",
      "padding-top",
      "page",
      "page-break-after",
      "page-break-before",
      "page-break-inside",
      "paint-order",
      "pause",
      "pause-after",
      "pause-before",
      "perspective",
      "perspective-origin",
      "place-content",
      "place-items",
      "place-self",
      "pointer-events",
      "position",
      "position-anchor",
      "position-visibility",
      "print-color-adjust",
      "quotes",
      "r",
      "resize",
      "rest",
      "rest-after",
      "rest-before",
      "right",
      "rotate",
      "row-gap",
      "ruby-align",
      "ruby-position",
      "scale",
      "scroll-behavior",
      "scroll-margin",
      "scroll-margin-block",
      "scroll-margin-block-end",
      "scroll-margin-block-start",
      "scroll-margin-bottom",
      "scroll-margin-inline",
      "scroll-margin-inline-end",
      "scroll-margin-inline-start",
      "scroll-margin-left",
      "scroll-margin-right",
      "scroll-margin-top",
      "scroll-padding",
      "scroll-padding-block",
      "scroll-padding-block-end",
      "scroll-padding-block-start",
      "scroll-padding-bottom",
      "scroll-padding-inline",
      "scroll-padding-inline-end",
      "scroll-padding-inline-start",
      "scroll-padding-left",
      "scroll-padding-right",
      "scroll-padding-top",
      "scroll-snap-align",
      "scroll-snap-stop",
      "scroll-snap-type",
      "scroll-timeline",
      "scroll-timeline-axis",
      "scroll-timeline-name",
      "scrollbar-color",
      "scrollbar-gutter",
      "scrollbar-width",
      "shape-image-threshold",
      "shape-margin",
      "shape-outside",
      "shape-rendering",
      "speak",
      "speak-as",
      "src",
      // @font-face
      "stop-color",
      "stop-opacity",
      "stroke",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "tab-size",
      "table-layout",
      "text-align",
      "text-align-all",
      "text-align-last",
      "text-anchor",
      "text-combine-upright",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-line",
      "text-decoration-skip",
      "text-decoration-skip-ink",
      "text-decoration-style",
      "text-decoration-thickness",
      "text-emphasis",
      "text-emphasis-color",
      "text-emphasis-position",
      "text-emphasis-style",
      "text-indent",
      "text-justify",
      "text-orientation",
      "text-overflow",
      "text-rendering",
      "text-shadow",
      "text-size-adjust",
      "text-transform",
      "text-underline-offset",
      "text-underline-position",
      "text-wrap",
      "text-wrap-mode",
      "text-wrap-style",
      "timeline-scope",
      "top",
      "touch-action",
      "transform",
      "transform-box",
      "transform-origin",
      "transform-style",
      "transition",
      "transition-behavior",
      "transition-delay",
      "transition-duration",
      "transition-property",
      "transition-timing-function",
      "translate",
      "unicode-bidi",
      "user-modify",
      "user-select",
      "vector-effect",
      "vertical-align",
      "view-timeline",
      "view-timeline-axis",
      "view-timeline-inset",
      "view-timeline-name",
      "view-transition-name",
      "visibility",
      "voice-balance",
      "voice-duration",
      "voice-family",
      "voice-pitch",
      "voice-range",
      "voice-rate",
      "voice-stress",
      "voice-volume",
      "white-space",
      "white-space-collapse",
      "widows",
      "width",
      "will-change",
      "word-break",
      "word-spacing",
      "word-wrap",
      "writing-mode",
      "x",
      "y",
      "z-index",
      "zoom"
    ].sort().reverse();
  }
});

// node_modules/highlight.js/es/languages/javascript.js
function javascript(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$1 = IDENT_RE;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };
  const decimalDigits = "[0-9](_?[0-9])*";
  const frac = `\\.(${decimalDigits})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS,
        "super",
        "import"
      ].map((x) => `${x}\\s*\\(`)),
      IDENT_RE$1,
      regex.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$1,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: "attr",
        match: IDENT_RE$1 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
var IDENT_RE, KEYWORDS, LITERALS, TYPES, ERROR_TYPES, BUILT_IN_GLOBALS, BUILT_IN_VARIABLES, BUILT_INS;
var init_javascript = __esm({
  "node_modules/highlight.js/es/languages/javascript.js"() {
    IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
    KEYWORDS = [
      "as",
      // for exports
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      // JS handles these with a special rule
      // "get",
      // "set",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends",
      // It's reached stage 3, which is "recommended for implementation":
      "using"
    ];
    LITERALS = [
      "true",
      "false",
      "null",
      "undefined",
      "NaN",
      "Infinity"
    ];
    TYPES = [
      // Fundamental objects
      "Object",
      "Function",
      "Boolean",
      "Symbol",
      // numbers and dates
      "Math",
      "Date",
      "Number",
      "BigInt",
      // text
      "String",
      "RegExp",
      // Indexed collections
      "Array",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Int32Array",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array",
      // Keyed collections
      "Set",
      "Map",
      "WeakSet",
      "WeakMap",
      // Structured data
      "ArrayBuffer",
      "SharedArrayBuffer",
      "Atomics",
      "DataView",
      "JSON",
      // Control abstraction objects
      "Promise",
      "Generator",
      "GeneratorFunction",
      "AsyncFunction",
      // Reflection
      "Reflect",
      "Proxy",
      // Internationalization
      "Intl",
      // WebAssembly
      "WebAssembly"
    ];
    ERROR_TYPES = [
      "Error",
      "EvalError",
      "InternalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError"
    ];
    BUILT_IN_GLOBALS = [
      "setInterval",
      "setTimeout",
      "clearInterval",
      "clearTimeout",
      "require",
      "exports",
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "unescape"
    ];
    BUILT_IN_VARIABLES = [
      "arguments",
      "this",
      "super",
      "console",
      "window",
      "document",
      "localStorage",
      "sessionStorage",
      "module",
      "global"
      // Node.js
    ];
    BUILT_INS = [].concat(
      BUILT_IN_GLOBALS,
      TYPES,
      ERROR_TYPES
    );
  }
});

// node_modules/highlight.js/es/languages/typescript.js
function javascript2(hljs) {
  const regex = hljs.regex;
  const hasClosingTag = (match, { after }) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
    return pos !== -1;
  };
  const IDENT_RE$1 = IDENT_RE2;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        nextChar === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        nextChar === ","
      ) {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, { after: afterMatchIndex })) {
          response.ignoreMatch();
        }
      }
      let m;
      const afterMatch = match.input.substring(afterMatchIndex);
      if (m = afterMatch.match(/^\s*=/)) {
        response.ignoreMatch();
        return;
      }
      if (m = afterMatch.match(/^\s+extends\s+/)) {
        if (m.index === 0) {
          response.ignoreMatch();
          return;
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE2,
    keyword: KEYWORDS2,
    literal: LITERALS2,
    built_in: BUILT_INS2,
    "variable.language": BUILT_IN_VARIABLES2
  };
  const decimalDigits = "[0-9](_?[0-9])*";
  const frac = `\\.(${decimalDigits})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
      { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
      // DecimalBigIntegerLiteral
      { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1,
    contains: []
    // defined later
  };
  const HTML_TEMPLATE = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const GRAPHQL_TEMPLATE = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "graphql"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(
    /\/\*\*(?!\/)/,
    "\\*/",
    {
      relevance: 0,
      contains: [
        {
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            },
            {
              className: "type",
              begin: "\\{",
              end: "\\}",
              excludeEnd: true,
              excludeBegin: true,
              relevance: 0
            },
            {
              className: "variable",
              begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
              endsParent: true,
              relevance: 0
            },
            // eat spaces (not newlines) so we can find
            // types or variables
            {
              begin: /(?=[^\n])\s/,
              relevance: 0
            }
          ]
        }
      ]
    }
  );
  const COMMENT = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    GRAPHQL_TEMPLATE,
    TEMPLATE_STRING,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    NUMBER
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1,
          /\s+/,
          /extends/,
          /\s+/,
          regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$1
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: regex.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...TYPES2,
        ...ERROR_TYPES2
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$1,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return regex.concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: regex.concat(
      /\b/,
      noneOf([
        ...BUILT_IN_GLOBALS2,
        "super",
        "import"
      ].map((x) => `${x}\\s*\\(`)),
      IDENT_RE$1,
      regex.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: regex.concat(/\./, regex.lookahead(
      regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
    )),
    end: IDENT_RE$1,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$1,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$1,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      regex.lookahead(FUNC_LEAD_IN_RE)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER,
      CLASS_REFERENCE,
      {
        scope: "attr",
        match: IDENT_RE$1 + regex.lookahead(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        // "value" container
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT,
          hljs.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: FRAGMENT.begin, end: FRAGMENT.end },
              { match: XML_SELF_CLOSING },
              {
                begin: XML_TAG.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + IDENT_RE$1,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function typescript(hljs) {
  const regex = hljs.regex;
  const tsLanguage = javascript2(hljs);
  const IDENT_RE$1 = IDENT_RE2;
  const TYPES3 = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ];
  const NAMESPACE = {
    begin: [
      /namespace/,
      /\s+/,
      hljs.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  };
  const INTERFACE = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: true,
    keywords: {
      keyword: "interface extends",
      built_in: TYPES3
    },
    contains: [tsLanguage.exports.CLASS_REFERENCE]
  };
  const USE_STRICT = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  };
  const TS_SPECIFIC_KEYWORDS = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ];
  const KEYWORDS$1 = {
    $pattern: IDENT_RE2,
    keyword: KEYWORDS2.concat(TS_SPECIFIC_KEYWORDS),
    literal: LITERALS2,
    built_in: BUILT_INS2.concat(TYPES3),
    "variable.language": BUILT_IN_VARIABLES2
  };
  const DECORATOR = {
    className: "meta",
    begin: "@" + IDENT_RE$1
  };
  const swapMode = (mode, label, replacement) => {
    const indx = mode.contains.findIndex((m) => m.label === label);
    if (indx === -1) {
      throw new Error("can not find mode to replace");
    }
    mode.contains.splice(indx, 1, replacement);
  };
  Object.assign(tsLanguage.keywords, KEYWORDS$1);
  tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
  const ATTRIBUTE_HIGHLIGHT = tsLanguage.contains.find((c2) => c2.scope === "attr");
  const OPTIONAL_KEY_OR_ARGUMENT = Object.assign(
    {},
    ATTRIBUTE_HIGHLIGHT,
    { match: regex.concat(IDENT_RE$1, regex.lookahead(/\s*\?:/)) }
  );
  tsLanguage.exports.PARAMS_CONTAINS.push([
    tsLanguage.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    ATTRIBUTE_HIGHLIGHT,
    // highlight the params key
    OPTIONAL_KEY_OR_ARGUMENT
    // Added for optional property assignment highlighting
  ]);
  tsLanguage.contains = tsLanguage.contains.concat([
    DECORATOR,
    NAMESPACE,
    INTERFACE,
    OPTIONAL_KEY_OR_ARGUMENT
    // Added for optional property assignment highlighting
  ]);
  swapMode(tsLanguage, "shebang", hljs.SHEBANG());
  swapMode(tsLanguage, "use_strict", USE_STRICT);
  const functionDeclaration = tsLanguage.contains.find((m) => m.label === "func.def");
  functionDeclaration.relevance = 0;
  Object.assign(tsLanguage, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  });
  return tsLanguage;
}
var IDENT_RE2, KEYWORDS2, LITERALS2, TYPES2, ERROR_TYPES2, BUILT_IN_GLOBALS2, BUILT_IN_VARIABLES2, BUILT_INS2;
var init_typescript = __esm({
  "node_modules/highlight.js/es/languages/typescript.js"() {
    IDENT_RE2 = "[A-Za-z$_][0-9A-Za-z$_]*";
    KEYWORDS2 = [
      "as",
      // for exports
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      // JS handles these with a special rule
      // "get",
      // "set",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends",
      // It's reached stage 3, which is "recommended for implementation":
      "using"
    ];
    LITERALS2 = [
      "true",
      "false",
      "null",
      "undefined",
      "NaN",
      "Infinity"
    ];
    TYPES2 = [
      // Fundamental objects
      "Object",
      "Function",
      "Boolean",
      "Symbol",
      // numbers and dates
      "Math",
      "Date",
      "Number",
      "BigInt",
      // text
      "String",
      "RegExp",
      // Indexed collections
      "Array",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Int32Array",
      "Uint16Array",
      "Uint32Array",
      "BigInt64Array",
      "BigUint64Array",
      // Keyed collections
      "Set",
      "Map",
      "WeakSet",
      "WeakMap",
      // Structured data
      "ArrayBuffer",
      "SharedArrayBuffer",
      "Atomics",
      "DataView",
      "JSON",
      // Control abstraction objects
      "Promise",
      "Generator",
      "GeneratorFunction",
      "AsyncFunction",
      // Reflection
      "Reflect",
      "Proxy",
      // Internationalization
      "Intl",
      // WebAssembly
      "WebAssembly"
    ];
    ERROR_TYPES2 = [
      "Error",
      "EvalError",
      "InternalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError"
    ];
    BUILT_IN_GLOBALS2 = [
      "setInterval",
      "setTimeout",
      "clearInterval",
      "clearTimeout",
      "require",
      "exports",
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "unescape"
    ];
    BUILT_IN_VARIABLES2 = [
      "arguments",
      "this",
      "super",
      "console",
      "window",
      "document",
      "localStorage",
      "sessionStorage",
      "module",
      "global"
      // Node.js
    ];
    BUILT_INS2 = [].concat(
      BUILT_IN_GLOBALS2,
      TYPES2,
      ERROR_TYPES2
    );
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function localStorageStore(key2, initialValue, options2) {
  if (!stores[key2]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe: subscribe2, set } = store;
    stores[key2] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key2];
}
function prefersReducedMotion() {
  return false;
}
var storeHighlightJs, stores, Navigation, Footer, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_ssr();
    init_core();
    init_chunks();
    init_xml();
    init_css();
    init_javascript();
    init_typescript();
    storeHighlightJs = writable(void 0);
    stores = {};
    localStorageStore("modeOsPrefers", false);
    localStorageStore("modeUserPrefers", void 0);
    localStorageStore("modeCurrent", false);
    readable(prefersReducedMotion(), (set) => {
    });
    Navigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<nav class="max-w-[1024px] mx-auto" data-svelte-h="svelte-13kxe3x"><ul class="p-10 flex flex-row items-center justify-between w-full"><li><a href="/"><img src="/Frame 9.svg" alt=""></a></li> <ul class="flex flex-row items-center justify-center gap-6"><li><button class="btn text-white btn-base bg-slate-800">Theme</button></li> <li><a href="/"><img src="/github.svg" alt=""></a></li></ul></ul></nav>`;
    });
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="" data-svelte-h="svelte-1ra1ge7">our nice footer</div>`;
    });
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      core_default.registerLanguage("xml", xml);
      core_default.registerLanguage("css", css);
      core_default.registerLanguage("javascript", javascript);
      core_default.registerLanguage("typescript", typescript);
      storeHighlightJs.set(core_default);
      return `<main class="bg-[#1a1a1a] text-white ">${validate_component(Navigation, "Navigation").$$render($$result, {}, {}, {})}  ${slots.default ? slots.default({ class: "w-[1024px] " }) : ``}  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</main>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.DBnnChvK.js", "_app/immutable/chunks/DnX5n_Gx.js", "_app/immutable/chunks/a9s_Je2Y.js", "_app/immutable/chunks/DQvBfhtt.js"];
    stylesheets = ["_app/immutable/assets/0.DAXccSrl.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/escape.js
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
var ATTR_REGEX, CONTENT_REGEX;
var init_escape = __esm({
  ".svelte-kit/output/server/chunks/escape.js"() {
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function get(key2, parse3 = JSON.parse) {
  try {
    return parse3(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, is_legacy, getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_exports();
    init_ssr2();
    init_escape();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    is_legacy = onMount.toString().includes("$$") || /function \w+\(\) \{\}/.test(onMount.toString());
    if (is_legacy) {
      ({
        data: {},
        form: null,
        error: null,
        params: {},
        route: { id: null },
        state: {},
        status: -1,
        url: new URL("https://example.com")
      });
    }
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores2 = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores2.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores2.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores2.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.Xq44OI8h.js", "_app/immutable/chunks/DnX5n_Gx.js", "_app/immutable/chunks/a9s_Je2Y.js", "_app/immutable/chunks/BmMq1TOt.js", "_app/immutable/chunks/DQvBfhtt.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var init_clsx = __esm({
  "node_modules/clsx/dist/clsx.mjs"() {
  }
});

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
function twJoin() {
  let index5 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index5 < arguments.length) {
    if (argument = arguments[index5++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var CLASS_PART_SEPARATOR, createClassGroupUtils, getGroupRecursive, arbitraryPropertyRegex, getGroupIdForArbitraryProperty, createClassMap, processClassesRecursively, getPart, isThemeGetter, getPrefixedClassGroupEntries, createLruCache, IMPORTANT_MODIFIER, createParseClassName, sortModifiers, createConfigUtils, SPLIT_CLASSES_REGEX, mergeClassList, toValue, fromTheme, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, isLength, isArbitraryLength, isNumber, isArbitraryNumber, isInteger, isPercent, isArbitraryValue, isTshirtSize, sizeLabels, isArbitrarySize, isArbitraryPosition, imageLabels, isArbitraryImage, isArbitraryShadow, isAny, getIsArbitraryValue, isLengthOnly, isNever, isShadow, isImage, getDefaultConfig, twMerge;
var init_bundle_mjs = __esm({
  "node_modules/tailwind-merge/dist/bundle-mjs.mjs"() {
    CLASS_PART_SEPARATOR = "-";
    createClassGroupUtils = (config) => {
      const classMap = createClassMap(config);
      const {
        conflictingClassGroups,
        conflictingClassGroupModifiers
      } = config;
      const getClassGroupId = (className) => {
        const classParts = className.split(CLASS_PART_SEPARATOR);
        if (classParts[0] === "" && classParts.length !== 1) {
          classParts.shift();
        }
        return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
      };
      const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
        const conflicts = conflictingClassGroups[classGroupId] || [];
        if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
          return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
        }
        return conflicts;
      };
      return {
        getClassGroupId,
        getConflictingClassGroupIds
      };
    };
    getGroupRecursive = (classParts, classPartObject) => {
      if (classParts.length === 0) {
        return classPartObject.classGroupId;
      }
      const currentClassPart = classParts[0];
      const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
      const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
      if (classGroupFromNextClassPart) {
        return classGroupFromNextClassPart;
      }
      if (classPartObject.validators.length === 0) {
        return void 0;
      }
      const classRest = classParts.join(CLASS_PART_SEPARATOR);
      return classPartObject.validators.find(({
        validator: validator2
      }) => validator2(classRest))?.classGroupId;
    };
    arbitraryPropertyRegex = /^\[(.+)\]$/;
    getGroupIdForArbitraryProperty = (className) => {
      if (arbitraryPropertyRegex.test(className)) {
        const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
        const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
        if (property) {
          return "arbitrary.." + property;
        }
      }
    };
    createClassMap = (config) => {
      const {
        theme,
        prefix: prefix2
      } = config;
      const classMap = {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      };
      const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix2);
      prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
        processClassesRecursively(classGroup, classMap, classGroupId, theme);
      });
      return classMap;
    };
    processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
      classGroup.forEach((classDefinition) => {
        if (typeof classDefinition === "string") {
          const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
          classPartObjectToEdit.classGroupId = classGroupId;
          return;
        }
        if (typeof classDefinition === "function") {
          if (isThemeGetter(classDefinition)) {
            processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
            return;
          }
          classPartObject.validators.push({
            validator: classDefinition,
            classGroupId
          });
          return;
        }
        Object.entries(classDefinition).forEach(([key2, classGroup2]) => {
          processClassesRecursively(classGroup2, getPart(classPartObject, key2), classGroupId, theme);
        });
      });
    };
    getPart = (classPartObject, path) => {
      let currentClassPartObject = classPartObject;
      path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
        if (!currentClassPartObject.nextPart.has(pathPart)) {
          currentClassPartObject.nextPart.set(pathPart, {
            nextPart: /* @__PURE__ */ new Map(),
            validators: []
          });
        }
        currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
      });
      return currentClassPartObject;
    };
    isThemeGetter = (func) => func.isThemeGetter;
    getPrefixedClassGroupEntries = (classGroupEntries, prefix2) => {
      if (!prefix2) {
        return classGroupEntries;
      }
      return classGroupEntries.map(([classGroupId, classGroup]) => {
        const prefixedClassGroup = classGroup.map((classDefinition) => {
          if (typeof classDefinition === "string") {
            return prefix2 + classDefinition;
          }
          if (typeof classDefinition === "object") {
            return Object.fromEntries(Object.entries(classDefinition).map(([key2, value]) => [prefix2 + key2, value]));
          }
          return classDefinition;
        });
        return [classGroupId, prefixedClassGroup];
      });
    };
    createLruCache = (maxCacheSize) => {
      if (maxCacheSize < 1) {
        return {
          get: () => void 0,
          set: () => {
          }
        };
      }
      let cacheSize = 0;
      let cache = /* @__PURE__ */ new Map();
      let previousCache = /* @__PURE__ */ new Map();
      const update2 = (key2, value) => {
        cache.set(key2, value);
        cacheSize++;
        if (cacheSize > maxCacheSize) {
          cacheSize = 0;
          previousCache = cache;
          cache = /* @__PURE__ */ new Map();
        }
      };
      return {
        get(key2) {
          let value = cache.get(key2);
          if (value !== void 0) {
            return value;
          }
          if ((value = previousCache.get(key2)) !== void 0) {
            update2(key2, value);
            return value;
          }
        },
        set(key2, value) {
          if (cache.has(key2)) {
            cache.set(key2, value);
          } else {
            update2(key2, value);
          }
        }
      };
    };
    IMPORTANT_MODIFIER = "!";
    createParseClassName = (config) => {
      const {
        separator,
        experimentalParseClassName
      } = config;
      const isSeparatorSingleCharacter = separator.length === 1;
      const firstSeparatorCharacter = separator[0];
      const separatorLength = separator.length;
      const parseClassName = (className) => {
        const modifiers = [];
        let bracketDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        for (let index5 = 0; index5 < className.length; index5++) {
          let currentCharacter = className[index5];
          if (bracketDepth === 0) {
            if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index5, index5 + separatorLength) === separator)) {
              modifiers.push(className.slice(modifierStart, index5));
              modifierStart = index5 + separatorLength;
              continue;
            }
            if (currentCharacter === "/") {
              postfixModifierPosition = index5;
              continue;
            }
          }
          if (currentCharacter === "[") {
            bracketDepth++;
          } else if (currentCharacter === "]") {
            bracketDepth--;
          }
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
        const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
        const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
        return {
          modifiers,
          hasImportantModifier,
          baseClassName,
          maybePostfixModifierPosition
        };
      };
      if (experimentalParseClassName) {
        return (className) => experimentalParseClassName({
          className,
          parseClassName
        });
      }
      return parseClassName;
    };
    sortModifiers = (modifiers) => {
      if (modifiers.length <= 1) {
        return modifiers;
      }
      const sortedModifiers = [];
      let unsortedModifiers = [];
      modifiers.forEach((modifier) => {
        const isArbitraryVariant = modifier[0] === "[";
        if (isArbitraryVariant) {
          sortedModifiers.push(...unsortedModifiers.sort(), modifier);
          unsortedModifiers = [];
        } else {
          unsortedModifiers.push(modifier);
        }
      });
      sortedModifiers.push(...unsortedModifiers.sort());
      return sortedModifiers;
    };
    createConfigUtils = (config) => ({
      cache: createLruCache(config.cacheSize),
      parseClassName: createParseClassName(config),
      ...createClassGroupUtils(config)
    });
    SPLIT_CLASSES_REGEX = /\s+/;
    mergeClassList = (classList, configUtils) => {
      const {
        parseClassName,
        getClassGroupId,
        getConflictingClassGroupIds
      } = configUtils;
      const classGroupsInConflict = [];
      const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
      let result = "";
      for (let index5 = classNames.length - 1; index5 >= 0; index5 -= 1) {
        const originalClassName = classNames[index5];
        const {
          modifiers,
          hasImportantModifier,
          baseClassName,
          maybePostfixModifierPosition
        } = parseClassName(originalClassName);
        let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
        let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        if (!classGroupId) {
          if (!hasPostfixModifier) {
            result = originalClassName + (result.length > 0 ? " " + result : result);
            continue;
          }
          classGroupId = getClassGroupId(baseClassName);
          if (!classGroupId) {
            result = originalClassName + (result.length > 0 ? " " + result : result);
            continue;
          }
          hasPostfixModifier = false;
        }
        const variantModifier = sortModifiers(modifiers).join(":");
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.includes(classId)) {
          continue;
        }
        classGroupsInConflict.push(classId);
        const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
        for (let i = 0; i < conflictGroups.length; ++i) {
          const group = conflictGroups[i];
          classGroupsInConflict.push(modifierId + group);
        }
        result = originalClassName + (result.length > 0 ? " " + result : result);
      }
      return result;
    };
    toValue = (mix2) => {
      if (typeof mix2 === "string") {
        return mix2;
      }
      let resolvedValue;
      let string = "";
      for (let k = 0; k < mix2.length; k++) {
        if (mix2[k]) {
          if (resolvedValue = toValue(mix2[k])) {
            string && (string += " ");
            string += resolvedValue;
          }
        }
      }
      return string;
    };
    fromTheme = (key2) => {
      const themeGetter = (theme) => theme[key2] || [];
      themeGetter.isThemeGetter = true;
      return themeGetter;
    };
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
    isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
    isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
    isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
    isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
    isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
    isArbitraryValue = (value) => arbitraryValueRegex.test(value);
    isTshirtSize = (value) => tshirtUnitRegex.test(value);
    sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
    isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
    imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
    isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
    isAny = () => true;
    getIsArbitraryValue = (value, label, testValue) => {
      const result = arbitraryValueRegex.exec(value);
      if (result) {
        if (result[1]) {
          return typeof label === "string" ? result[1] === label : label.has(result[1]);
        }
        return testValue(result[2]);
      }
      return false;
    };
    isLengthOnly = (value) => (
      // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
      // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
      // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
      lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
    );
    isNever = () => false;
    isShadow = (value) => shadowRegex.test(value);
    isImage = (value) => imageRegex.test(value);
    getDefaultConfig = () => {
      const colors = fromTheme("colors");
      const spacing = fromTheme("spacing");
      const blur = fromTheme("blur");
      const brightness = fromTheme("brightness");
      const borderColor = fromTheme("borderColor");
      const borderRadius = fromTheme("borderRadius");
      const borderSpacing = fromTheme("borderSpacing");
      const borderWidth = fromTheme("borderWidth");
      const contrast = fromTheme("contrast");
      const grayscale = fromTheme("grayscale");
      const hueRotate = fromTheme("hueRotate");
      const invert = fromTheme("invert");
      const gap = fromTheme("gap");
      const gradientColorStops = fromTheme("gradientColorStops");
      const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
      const inset = fromTheme("inset");
      const margin = fromTheme("margin");
      const opacity = fromTheme("opacity");
      const padding = fromTheme("padding");
      const saturate = fromTheme("saturate");
      const scale2 = fromTheme("scale");
      const sepia = fromTheme("sepia");
      const skew = fromTheme("skew");
      const space = fromTheme("space");
      const translate = fromTheme("translate");
      const getOverscroll = () => ["auto", "contain", "none"];
      const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
      const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
      const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
      const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
      const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
      const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
      const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
      const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
      const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
      const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
      const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
      const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [isAny],
          spacing: [isLength, isArbitraryLength],
          blur: ["none", "", isTshirtSize, isArbitraryValue],
          brightness: getNumberAndArbitrary(),
          borderColor: [colors],
          borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
          borderSpacing: getSpacingWithArbitrary(),
          borderWidth: getLengthWithEmptyAndArbitrary(),
          contrast: getNumberAndArbitrary(),
          grayscale: getZeroAndEmpty(),
          hueRotate: getNumberAndArbitrary(),
          invert: getZeroAndEmpty(),
          gap: getSpacingWithArbitrary(),
          gradientColorStops: [colors],
          gradientColorStopPositions: [isPercent, isArbitraryLength],
          inset: getSpacingWithAutoAndArbitrary(),
          margin: getSpacingWithAutoAndArbitrary(),
          opacity: getNumberAndArbitrary(),
          padding: getSpacingWithArbitrary(),
          saturate: getNumberAndArbitrary(),
          scale: getNumberAndArbitrary(),
          sepia: getZeroAndEmpty(),
          skew: getNumberAndArbitrary(),
          space: getSpacingWithArbitrary(),
          translate: getSpacingWithArbitrary()
        },
        classGroups: {
          // Layout
          /**
           * Aspect Ratio
           * @see https://tailwindcss.com/docs/aspect-ratio
           */
          aspect: [{
            aspect: ["auto", "square", "video", isArbitraryValue]
          }],
          /**
           * Container
           * @see https://tailwindcss.com/docs/container
           */
          container: ["container"],
          /**
           * Columns
           * @see https://tailwindcss.com/docs/columns
           */
          columns: [{
            columns: [isTshirtSize]
          }],
          /**
           * Break After
           * @see https://tailwindcss.com/docs/break-after
           */
          "break-after": [{
            "break-after": getBreaks()
          }],
          /**
           * Break Before
           * @see https://tailwindcss.com/docs/break-before
           */
          "break-before": [{
            "break-before": getBreaks()
          }],
          /**
           * Break Inside
           * @see https://tailwindcss.com/docs/break-inside
           */
          "break-inside": [{
            "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
          }],
          /**
           * Box Decoration Break
           * @see https://tailwindcss.com/docs/box-decoration-break
           */
          "box-decoration": [{
            "box-decoration": ["slice", "clone"]
          }],
          /**
           * Box Sizing
           * @see https://tailwindcss.com/docs/box-sizing
           */
          box: [{
            box: ["border", "content"]
          }],
          /**
           * Display
           * @see https://tailwindcss.com/docs/display
           */
          display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
          /**
           * Floats
           * @see https://tailwindcss.com/docs/float
           */
          float: [{
            float: ["right", "left", "none", "start", "end"]
          }],
          /**
           * Clear
           * @see https://tailwindcss.com/docs/clear
           */
          clear: [{
            clear: ["left", "right", "both", "none", "start", "end"]
          }],
          /**
           * Isolation
           * @see https://tailwindcss.com/docs/isolation
           */
          isolation: ["isolate", "isolation-auto"],
          /**
           * Object Fit
           * @see https://tailwindcss.com/docs/object-fit
           */
          "object-fit": [{
            object: ["contain", "cover", "fill", "none", "scale-down"]
          }],
          /**
           * Object Position
           * @see https://tailwindcss.com/docs/object-position
           */
          "object-position": [{
            object: [...getPositions(), isArbitraryValue]
          }],
          /**
           * Overflow
           * @see https://tailwindcss.com/docs/overflow
           */
          overflow: [{
            overflow: getOverflow()
          }],
          /**
           * Overflow X
           * @see https://tailwindcss.com/docs/overflow
           */
          "overflow-x": [{
            "overflow-x": getOverflow()
          }],
          /**
           * Overflow Y
           * @see https://tailwindcss.com/docs/overflow
           */
          "overflow-y": [{
            "overflow-y": getOverflow()
          }],
          /**
           * Overscroll Behavior
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          overscroll: [{
            overscroll: getOverscroll()
          }],
          /**
           * Overscroll Behavior X
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          "overscroll-x": [{
            "overscroll-x": getOverscroll()
          }],
          /**
           * Overscroll Behavior Y
           * @see https://tailwindcss.com/docs/overscroll-behavior
           */
          "overscroll-y": [{
            "overscroll-y": getOverscroll()
          }],
          /**
           * Position
           * @see https://tailwindcss.com/docs/position
           */
          position: ["static", "fixed", "absolute", "relative", "sticky"],
          /**
           * Top / Right / Bottom / Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          inset: [{
            inset: [inset]
          }],
          /**
           * Right / Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          "inset-x": [{
            "inset-x": [inset]
          }],
          /**
           * Top / Bottom
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          "inset-y": [{
            "inset-y": [inset]
          }],
          /**
           * Start
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          start: [{
            start: [inset]
          }],
          /**
           * End
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          end: [{
            end: [inset]
          }],
          /**
           * Top
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          top: [{
            top: [inset]
          }],
          /**
           * Right
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          right: [{
            right: [inset]
          }],
          /**
           * Bottom
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          bottom: [{
            bottom: [inset]
          }],
          /**
           * Left
           * @see https://tailwindcss.com/docs/top-right-bottom-left
           */
          left: [{
            left: [inset]
          }],
          /**
           * Visibility
           * @see https://tailwindcss.com/docs/visibility
           */
          visibility: ["visible", "invisible", "collapse"],
          /**
           * Z-Index
           * @see https://tailwindcss.com/docs/z-index
           */
          z: [{
            z: ["auto", isInteger, isArbitraryValue]
          }],
          // Flexbox and Grid
          /**
           * Flex Basis
           * @see https://tailwindcss.com/docs/flex-basis
           */
          basis: [{
            basis: getSpacingWithAutoAndArbitrary()
          }],
          /**
           * Flex Direction
           * @see https://tailwindcss.com/docs/flex-direction
           */
          "flex-direction": [{
            flex: ["row", "row-reverse", "col", "col-reverse"]
          }],
          /**
           * Flex Wrap
           * @see https://tailwindcss.com/docs/flex-wrap
           */
          "flex-wrap": [{
            flex: ["wrap", "wrap-reverse", "nowrap"]
          }],
          /**
           * Flex
           * @see https://tailwindcss.com/docs/flex
           */
          flex: [{
            flex: ["1", "auto", "initial", "none", isArbitraryValue]
          }],
          /**
           * Flex Grow
           * @see https://tailwindcss.com/docs/flex-grow
           */
          grow: [{
            grow: getZeroAndEmpty()
          }],
          /**
           * Flex Shrink
           * @see https://tailwindcss.com/docs/flex-shrink
           */
          shrink: [{
            shrink: getZeroAndEmpty()
          }],
          /**
           * Order
           * @see https://tailwindcss.com/docs/order
           */
          order: [{
            order: ["first", "last", "none", isInteger, isArbitraryValue]
          }],
          /**
           * Grid Template Columns
           * @see https://tailwindcss.com/docs/grid-template-columns
           */
          "grid-cols": [{
            "grid-cols": [isAny]
          }],
          /**
           * Grid Column Start / End
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-start-end": [{
            col: ["auto", {
              span: ["full", isInteger, isArbitraryValue]
            }, isArbitraryValue]
          }],
          /**
           * Grid Column Start
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-start": [{
            "col-start": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Column End
           * @see https://tailwindcss.com/docs/grid-column
           */
          "col-end": [{
            "col-end": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Template Rows
           * @see https://tailwindcss.com/docs/grid-template-rows
           */
          "grid-rows": [{
            "grid-rows": [isAny]
          }],
          /**
           * Grid Row Start / End
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-start-end": [{
            row: ["auto", {
              span: [isInteger, isArbitraryValue]
            }, isArbitraryValue]
          }],
          /**
           * Grid Row Start
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-start": [{
            "row-start": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Row End
           * @see https://tailwindcss.com/docs/grid-row
           */
          "row-end": [{
            "row-end": getNumberWithAutoAndArbitrary()
          }],
          /**
           * Grid Auto Flow
           * @see https://tailwindcss.com/docs/grid-auto-flow
           */
          "grid-flow": [{
            "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
          }],
          /**
           * Grid Auto Columns
           * @see https://tailwindcss.com/docs/grid-auto-columns
           */
          "auto-cols": [{
            "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
          }],
          /**
           * Grid Auto Rows
           * @see https://tailwindcss.com/docs/grid-auto-rows
           */
          "auto-rows": [{
            "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
          }],
          /**
           * Gap
           * @see https://tailwindcss.com/docs/gap
           */
          gap: [{
            gap: [gap]
          }],
          /**
           * Gap X
           * @see https://tailwindcss.com/docs/gap
           */
          "gap-x": [{
            "gap-x": [gap]
          }],
          /**
           * Gap Y
           * @see https://tailwindcss.com/docs/gap
           */
          "gap-y": [{
            "gap-y": [gap]
          }],
          /**
           * Justify Content
           * @see https://tailwindcss.com/docs/justify-content
           */
          "justify-content": [{
            justify: ["normal", ...getAlign()]
          }],
          /**
           * Justify Items
           * @see https://tailwindcss.com/docs/justify-items
           */
          "justify-items": [{
            "justify-items": ["start", "end", "center", "stretch"]
          }],
          /**
           * Justify Self
           * @see https://tailwindcss.com/docs/justify-self
           */
          "justify-self": [{
            "justify-self": ["auto", "start", "end", "center", "stretch"]
          }],
          /**
           * Align Content
           * @see https://tailwindcss.com/docs/align-content
           */
          "align-content": [{
            content: ["normal", ...getAlign(), "baseline"]
          }],
          /**
           * Align Items
           * @see https://tailwindcss.com/docs/align-items
           */
          "align-items": [{
            items: ["start", "end", "center", "baseline", "stretch"]
          }],
          /**
           * Align Self
           * @see https://tailwindcss.com/docs/align-self
           */
          "align-self": [{
            self: ["auto", "start", "end", "center", "stretch", "baseline"]
          }],
          /**
           * Place Content
           * @see https://tailwindcss.com/docs/place-content
           */
          "place-content": [{
            "place-content": [...getAlign(), "baseline"]
          }],
          /**
           * Place Items
           * @see https://tailwindcss.com/docs/place-items
           */
          "place-items": [{
            "place-items": ["start", "end", "center", "baseline", "stretch"]
          }],
          /**
           * Place Self
           * @see https://tailwindcss.com/docs/place-self
           */
          "place-self": [{
            "place-self": ["auto", "start", "end", "center", "stretch"]
          }],
          // Spacing
          /**
           * Padding
           * @see https://tailwindcss.com/docs/padding
           */
          p: [{
            p: [padding]
          }],
          /**
           * Padding X
           * @see https://tailwindcss.com/docs/padding
           */
          px: [{
            px: [padding]
          }],
          /**
           * Padding Y
           * @see https://tailwindcss.com/docs/padding
           */
          py: [{
            py: [padding]
          }],
          /**
           * Padding Start
           * @see https://tailwindcss.com/docs/padding
           */
          ps: [{
            ps: [padding]
          }],
          /**
           * Padding End
           * @see https://tailwindcss.com/docs/padding
           */
          pe: [{
            pe: [padding]
          }],
          /**
           * Padding Top
           * @see https://tailwindcss.com/docs/padding
           */
          pt: [{
            pt: [padding]
          }],
          /**
           * Padding Right
           * @see https://tailwindcss.com/docs/padding
           */
          pr: [{
            pr: [padding]
          }],
          /**
           * Padding Bottom
           * @see https://tailwindcss.com/docs/padding
           */
          pb: [{
            pb: [padding]
          }],
          /**
           * Padding Left
           * @see https://tailwindcss.com/docs/padding
           */
          pl: [{
            pl: [padding]
          }],
          /**
           * Margin
           * @see https://tailwindcss.com/docs/margin
           */
          m: [{
            m: [margin]
          }],
          /**
           * Margin X
           * @see https://tailwindcss.com/docs/margin
           */
          mx: [{
            mx: [margin]
          }],
          /**
           * Margin Y
           * @see https://tailwindcss.com/docs/margin
           */
          my: [{
            my: [margin]
          }],
          /**
           * Margin Start
           * @see https://tailwindcss.com/docs/margin
           */
          ms: [{
            ms: [margin]
          }],
          /**
           * Margin End
           * @see https://tailwindcss.com/docs/margin
           */
          me: [{
            me: [margin]
          }],
          /**
           * Margin Top
           * @see https://tailwindcss.com/docs/margin
           */
          mt: [{
            mt: [margin]
          }],
          /**
           * Margin Right
           * @see https://tailwindcss.com/docs/margin
           */
          mr: [{
            mr: [margin]
          }],
          /**
           * Margin Bottom
           * @see https://tailwindcss.com/docs/margin
           */
          mb: [{
            mb: [margin]
          }],
          /**
           * Margin Left
           * @see https://tailwindcss.com/docs/margin
           */
          ml: [{
            ml: [margin]
          }],
          /**
           * Space Between X
           * @see https://tailwindcss.com/docs/space
           */
          "space-x": [{
            "space-x": [space]
          }],
          /**
           * Space Between X Reverse
           * @see https://tailwindcss.com/docs/space
           */
          "space-x-reverse": ["space-x-reverse"],
          /**
           * Space Between Y
           * @see https://tailwindcss.com/docs/space
           */
          "space-y": [{
            "space-y": [space]
          }],
          /**
           * Space Between Y Reverse
           * @see https://tailwindcss.com/docs/space
           */
          "space-y-reverse": ["space-y-reverse"],
          // Sizing
          /**
           * Width
           * @see https://tailwindcss.com/docs/width
           */
          w: [{
            w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
          }],
          /**
           * Min-Width
           * @see https://tailwindcss.com/docs/min-width
           */
          "min-w": [{
            "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
          }],
          /**
           * Max-Width
           * @see https://tailwindcss.com/docs/max-width
           */
          "max-w": [{
            "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
              screen: [isTshirtSize]
            }, isTshirtSize]
          }],
          /**
           * Height
           * @see https://tailwindcss.com/docs/height
           */
          h: [{
            h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Min-Height
           * @see https://tailwindcss.com/docs/min-height
           */
          "min-h": [{
            "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Max-Height
           * @see https://tailwindcss.com/docs/max-height
           */
          "max-h": [{
            "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          /**
           * Size
           * @see https://tailwindcss.com/docs/size
           */
          size: [{
            size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
          }],
          // Typography
          /**
           * Font Size
           * @see https://tailwindcss.com/docs/font-size
           */
          "font-size": [{
            text: ["base", isTshirtSize, isArbitraryLength]
          }],
          /**
           * Font Smoothing
           * @see https://tailwindcss.com/docs/font-smoothing
           */
          "font-smoothing": ["antialiased", "subpixel-antialiased"],
          /**
           * Font Style
           * @see https://tailwindcss.com/docs/font-style
           */
          "font-style": ["italic", "not-italic"],
          /**
           * Font Weight
           * @see https://tailwindcss.com/docs/font-weight
           */
          "font-weight": [{
            font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
          }],
          /**
           * Font Family
           * @see https://tailwindcss.com/docs/font-family
           */
          "font-family": [{
            font: [isAny]
          }],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-normal": ["normal-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-ordinal": ["ordinal"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-slashed-zero": ["slashed-zero"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-figure": ["lining-nums", "oldstyle-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-spacing": ["proportional-nums", "tabular-nums"],
          /**
           * Font Variant Numeric
           * @see https://tailwindcss.com/docs/font-variant-numeric
           */
          "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
          /**
           * Letter Spacing
           * @see https://tailwindcss.com/docs/letter-spacing
           */
          tracking: [{
            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
          }],
          /**
           * Line Clamp
           * @see https://tailwindcss.com/docs/line-clamp
           */
          "line-clamp": [{
            "line-clamp": ["none", isNumber, isArbitraryNumber]
          }],
          /**
           * Line Height
           * @see https://tailwindcss.com/docs/line-height
           */
          leading: [{
            leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
          }],
          /**
           * List Style Image
           * @see https://tailwindcss.com/docs/list-style-image
           */
          "list-image": [{
            "list-image": ["none", isArbitraryValue]
          }],
          /**
           * List Style Type
           * @see https://tailwindcss.com/docs/list-style-type
           */
          "list-style-type": [{
            list: ["none", "disc", "decimal", isArbitraryValue]
          }],
          /**
           * List Style Position
           * @see https://tailwindcss.com/docs/list-style-position
           */
          "list-style-position": [{
            list: ["inside", "outside"]
          }],
          /**
           * Placeholder Color
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/placeholder-color
           */
          "placeholder-color": [{
            placeholder: [colors]
          }],
          /**
           * Placeholder Opacity
           * @see https://tailwindcss.com/docs/placeholder-opacity
           */
          "placeholder-opacity": [{
            "placeholder-opacity": [opacity]
          }],
          /**
           * Text Alignment
           * @see https://tailwindcss.com/docs/text-align
           */
          "text-alignment": [{
            text: ["left", "center", "right", "justify", "start", "end"]
          }],
          /**
           * Text Color
           * @see https://tailwindcss.com/docs/text-color
           */
          "text-color": [{
            text: [colors]
          }],
          /**
           * Text Opacity
           * @see https://tailwindcss.com/docs/text-opacity
           */
          "text-opacity": [{
            "text-opacity": [opacity]
          }],
          /**
           * Text Decoration
           * @see https://tailwindcss.com/docs/text-decoration
           */
          "text-decoration": ["underline", "overline", "line-through", "no-underline"],
          /**
           * Text Decoration Style
           * @see https://tailwindcss.com/docs/text-decoration-style
           */
          "text-decoration-style": [{
            decoration: [...getLineStyles(), "wavy"]
          }],
          /**
           * Text Decoration Thickness
           * @see https://tailwindcss.com/docs/text-decoration-thickness
           */
          "text-decoration-thickness": [{
            decoration: ["auto", "from-font", isLength, isArbitraryLength]
          }],
          /**
           * Text Underline Offset
           * @see https://tailwindcss.com/docs/text-underline-offset
           */
          "underline-offset": [{
            "underline-offset": ["auto", isLength, isArbitraryValue]
          }],
          /**
           * Text Decoration Color
           * @see https://tailwindcss.com/docs/text-decoration-color
           */
          "text-decoration-color": [{
            decoration: [colors]
          }],
          /**
           * Text Transform
           * @see https://tailwindcss.com/docs/text-transform
           */
          "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
          /**
           * Text Overflow
           * @see https://tailwindcss.com/docs/text-overflow
           */
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          /**
           * Text Wrap
           * @see https://tailwindcss.com/docs/text-wrap
           */
          "text-wrap": [{
            text: ["wrap", "nowrap", "balance", "pretty"]
          }],
          /**
           * Text Indent
           * @see https://tailwindcss.com/docs/text-indent
           */
          indent: [{
            indent: getSpacingWithArbitrary()
          }],
          /**
           * Vertical Alignment
           * @see https://tailwindcss.com/docs/vertical-align
           */
          "vertical-align": [{
            align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
          }],
          /**
           * Whitespace
           * @see https://tailwindcss.com/docs/whitespace
           */
          whitespace: [{
            whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
          }],
          /**
           * Word Break
           * @see https://tailwindcss.com/docs/word-break
           */
          break: [{
            break: ["normal", "words", "all", "keep"]
          }],
          /**
           * Hyphens
           * @see https://tailwindcss.com/docs/hyphens
           */
          hyphens: [{
            hyphens: ["none", "manual", "auto"]
          }],
          /**
           * Content
           * @see https://tailwindcss.com/docs/content
           */
          content: [{
            content: ["none", isArbitraryValue]
          }],
          // Backgrounds
          /**
           * Background Attachment
           * @see https://tailwindcss.com/docs/background-attachment
           */
          "bg-attachment": [{
            bg: ["fixed", "local", "scroll"]
          }],
          /**
           * Background Clip
           * @see https://tailwindcss.com/docs/background-clip
           */
          "bg-clip": [{
            "bg-clip": ["border", "padding", "content", "text"]
          }],
          /**
           * Background Opacity
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/background-opacity
           */
          "bg-opacity": [{
            "bg-opacity": [opacity]
          }],
          /**
           * Background Origin
           * @see https://tailwindcss.com/docs/background-origin
           */
          "bg-origin": [{
            "bg-origin": ["border", "padding", "content"]
          }],
          /**
           * Background Position
           * @see https://tailwindcss.com/docs/background-position
           */
          "bg-position": [{
            bg: [...getPositions(), isArbitraryPosition]
          }],
          /**
           * Background Repeat
           * @see https://tailwindcss.com/docs/background-repeat
           */
          "bg-repeat": [{
            bg: ["no-repeat", {
              repeat: ["", "x", "y", "round", "space"]
            }]
          }],
          /**
           * Background Size
           * @see https://tailwindcss.com/docs/background-size
           */
          "bg-size": [{
            bg: ["auto", "cover", "contain", isArbitrarySize]
          }],
          /**
           * Background Image
           * @see https://tailwindcss.com/docs/background-image
           */
          "bg-image": [{
            bg: ["none", {
              "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, isArbitraryImage]
          }],
          /**
           * Background Color
           * @see https://tailwindcss.com/docs/background-color
           */
          "bg-color": [{
            bg: [colors]
          }],
          /**
           * Gradient Color Stops From Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-from-pos": [{
            from: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops Via Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-via-pos": [{
            via: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops To Position
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-to-pos": [{
            to: [gradientColorStopPositions]
          }],
          /**
           * Gradient Color Stops From
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-from": [{
            from: [gradientColorStops]
          }],
          /**
           * Gradient Color Stops Via
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-via": [{
            via: [gradientColorStops]
          }],
          /**
           * Gradient Color Stops To
           * @see https://tailwindcss.com/docs/gradient-color-stops
           */
          "gradient-to": [{
            to: [gradientColorStops]
          }],
          // Borders
          /**
           * Border Radius
           * @see https://tailwindcss.com/docs/border-radius
           */
          rounded: [{
            rounded: [borderRadius]
          }],
          /**
           * Border Radius Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-s": [{
            "rounded-s": [borderRadius]
          }],
          /**
           * Border Radius End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-e": [{
            "rounded-e": [borderRadius]
          }],
          /**
           * Border Radius Top
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-t": [{
            "rounded-t": [borderRadius]
          }],
          /**
           * Border Radius Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-r": [{
            "rounded-r": [borderRadius]
          }],
          /**
           * Border Radius Bottom
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-b": [{
            "rounded-b": [borderRadius]
          }],
          /**
           * Border Radius Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-l": [{
            "rounded-l": [borderRadius]
          }],
          /**
           * Border Radius Start Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-ss": [{
            "rounded-ss": [borderRadius]
          }],
          /**
           * Border Radius Start End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-se": [{
            "rounded-se": [borderRadius]
          }],
          /**
           * Border Radius End End
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-ee": [{
            "rounded-ee": [borderRadius]
          }],
          /**
           * Border Radius End Start
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-es": [{
            "rounded-es": [borderRadius]
          }],
          /**
           * Border Radius Top Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-tl": [{
            "rounded-tl": [borderRadius]
          }],
          /**
           * Border Radius Top Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-tr": [{
            "rounded-tr": [borderRadius]
          }],
          /**
           * Border Radius Bottom Right
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-br": [{
            "rounded-br": [borderRadius]
          }],
          /**
           * Border Radius Bottom Left
           * @see https://tailwindcss.com/docs/border-radius
           */
          "rounded-bl": [{
            "rounded-bl": [borderRadius]
          }],
          /**
           * Border Width
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w": [{
            border: [borderWidth]
          }],
          /**
           * Border Width X
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-x": [{
            "border-x": [borderWidth]
          }],
          /**
           * Border Width Y
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-y": [{
            "border-y": [borderWidth]
          }],
          /**
           * Border Width Start
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-s": [{
            "border-s": [borderWidth]
          }],
          /**
           * Border Width End
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-e": [{
            "border-e": [borderWidth]
          }],
          /**
           * Border Width Top
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-t": [{
            "border-t": [borderWidth]
          }],
          /**
           * Border Width Right
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-r": [{
            "border-r": [borderWidth]
          }],
          /**
           * Border Width Bottom
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-b": [{
            "border-b": [borderWidth]
          }],
          /**
           * Border Width Left
           * @see https://tailwindcss.com/docs/border-width
           */
          "border-w-l": [{
            "border-l": [borderWidth]
          }],
          /**
           * Border Opacity
           * @see https://tailwindcss.com/docs/border-opacity
           */
          "border-opacity": [{
            "border-opacity": [opacity]
          }],
          /**
           * Border Style
           * @see https://tailwindcss.com/docs/border-style
           */
          "border-style": [{
            border: [...getLineStyles(), "hidden"]
          }],
          /**
           * Divide Width X
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-x": [{
            "divide-x": [borderWidth]
          }],
          /**
           * Divide Width X Reverse
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-x-reverse": ["divide-x-reverse"],
          /**
           * Divide Width Y
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-y": [{
            "divide-y": [borderWidth]
          }],
          /**
           * Divide Width Y Reverse
           * @see https://tailwindcss.com/docs/divide-width
           */
          "divide-y-reverse": ["divide-y-reverse"],
          /**
           * Divide Opacity
           * @see https://tailwindcss.com/docs/divide-opacity
           */
          "divide-opacity": [{
            "divide-opacity": [opacity]
          }],
          /**
           * Divide Style
           * @see https://tailwindcss.com/docs/divide-style
           */
          "divide-style": [{
            divide: getLineStyles()
          }],
          /**
           * Border Color
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color": [{
            border: [borderColor]
          }],
          /**
           * Border Color X
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-x": [{
            "border-x": [borderColor]
          }],
          /**
           * Border Color Y
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-y": [{
            "border-y": [borderColor]
          }],
          /**
           * Border Color S
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-s": [{
            "border-s": [borderColor]
          }],
          /**
           * Border Color E
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-e": [{
            "border-e": [borderColor]
          }],
          /**
           * Border Color Top
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-t": [{
            "border-t": [borderColor]
          }],
          /**
           * Border Color Right
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-r": [{
            "border-r": [borderColor]
          }],
          /**
           * Border Color Bottom
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-b": [{
            "border-b": [borderColor]
          }],
          /**
           * Border Color Left
           * @see https://tailwindcss.com/docs/border-color
           */
          "border-color-l": [{
            "border-l": [borderColor]
          }],
          /**
           * Divide Color
           * @see https://tailwindcss.com/docs/divide-color
           */
          "divide-color": [{
            divide: [borderColor]
          }],
          /**
           * Outline Style
           * @see https://tailwindcss.com/docs/outline-style
           */
          "outline-style": [{
            outline: ["", ...getLineStyles()]
          }],
          /**
           * Outline Offset
           * @see https://tailwindcss.com/docs/outline-offset
           */
          "outline-offset": [{
            "outline-offset": [isLength, isArbitraryValue]
          }],
          /**
           * Outline Width
           * @see https://tailwindcss.com/docs/outline-width
           */
          "outline-w": [{
            outline: [isLength, isArbitraryLength]
          }],
          /**
           * Outline Color
           * @see https://tailwindcss.com/docs/outline-color
           */
          "outline-color": [{
            outline: [colors]
          }],
          /**
           * Ring Width
           * @see https://tailwindcss.com/docs/ring-width
           */
          "ring-w": [{
            ring: getLengthWithEmptyAndArbitrary()
          }],
          /**
           * Ring Width Inset
           * @see https://tailwindcss.com/docs/ring-width
           */
          "ring-w-inset": ["ring-inset"],
          /**
           * Ring Color
           * @see https://tailwindcss.com/docs/ring-color
           */
          "ring-color": [{
            ring: [colors]
          }],
          /**
           * Ring Opacity
           * @see https://tailwindcss.com/docs/ring-opacity
           */
          "ring-opacity": [{
            "ring-opacity": [opacity]
          }],
          /**
           * Ring Offset Width
           * @see https://tailwindcss.com/docs/ring-offset-width
           */
          "ring-offset-w": [{
            "ring-offset": [isLength, isArbitraryLength]
          }],
          /**
           * Ring Offset Color
           * @see https://tailwindcss.com/docs/ring-offset-color
           */
          "ring-offset-color": [{
            "ring-offset": [colors]
          }],
          // Effects
          /**
           * Box Shadow
           * @see https://tailwindcss.com/docs/box-shadow
           */
          shadow: [{
            shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
          }],
          /**
           * Box Shadow Color
           * @see https://tailwindcss.com/docs/box-shadow-color
           */
          "shadow-color": [{
            shadow: [isAny]
          }],
          /**
           * Opacity
           * @see https://tailwindcss.com/docs/opacity
           */
          opacity: [{
            opacity: [opacity]
          }],
          /**
           * Mix Blend Mode
           * @see https://tailwindcss.com/docs/mix-blend-mode
           */
          "mix-blend": [{
            "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
          }],
          /**
           * Background Blend Mode
           * @see https://tailwindcss.com/docs/background-blend-mode
           */
          "bg-blend": [{
            "bg-blend": getBlendModes()
          }],
          // Filters
          /**
           * Filter
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/filter
           */
          filter: [{
            filter: ["", "none"]
          }],
          /**
           * Blur
           * @see https://tailwindcss.com/docs/blur
           */
          blur: [{
            blur: [blur]
          }],
          /**
           * Brightness
           * @see https://tailwindcss.com/docs/brightness
           */
          brightness: [{
            brightness: [brightness]
          }],
          /**
           * Contrast
           * @see https://tailwindcss.com/docs/contrast
           */
          contrast: [{
            contrast: [contrast]
          }],
          /**
           * Drop Shadow
           * @see https://tailwindcss.com/docs/drop-shadow
           */
          "drop-shadow": [{
            "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
          }],
          /**
           * Grayscale
           * @see https://tailwindcss.com/docs/grayscale
           */
          grayscale: [{
            grayscale: [grayscale]
          }],
          /**
           * Hue Rotate
           * @see https://tailwindcss.com/docs/hue-rotate
           */
          "hue-rotate": [{
            "hue-rotate": [hueRotate]
          }],
          /**
           * Invert
           * @see https://tailwindcss.com/docs/invert
           */
          invert: [{
            invert: [invert]
          }],
          /**
           * Saturate
           * @see https://tailwindcss.com/docs/saturate
           */
          saturate: [{
            saturate: [saturate]
          }],
          /**
           * Sepia
           * @see https://tailwindcss.com/docs/sepia
           */
          sepia: [{
            sepia: [sepia]
          }],
          /**
           * Backdrop Filter
           * @deprecated since Tailwind CSS v3.0.0
           * @see https://tailwindcss.com/docs/backdrop-filter
           */
          "backdrop-filter": [{
            "backdrop-filter": ["", "none"]
          }],
          /**
           * Backdrop Blur
           * @see https://tailwindcss.com/docs/backdrop-blur
           */
          "backdrop-blur": [{
            "backdrop-blur": [blur]
          }],
          /**
           * Backdrop Brightness
           * @see https://tailwindcss.com/docs/backdrop-brightness
           */
          "backdrop-brightness": [{
            "backdrop-brightness": [brightness]
          }],
          /**
           * Backdrop Contrast
           * @see https://tailwindcss.com/docs/backdrop-contrast
           */
          "backdrop-contrast": [{
            "backdrop-contrast": [contrast]
          }],
          /**
           * Backdrop Grayscale
           * @see https://tailwindcss.com/docs/backdrop-grayscale
           */
          "backdrop-grayscale": [{
            "backdrop-grayscale": [grayscale]
          }],
          /**
           * Backdrop Hue Rotate
           * @see https://tailwindcss.com/docs/backdrop-hue-rotate
           */
          "backdrop-hue-rotate": [{
            "backdrop-hue-rotate": [hueRotate]
          }],
          /**
           * Backdrop Invert
           * @see https://tailwindcss.com/docs/backdrop-invert
           */
          "backdrop-invert": [{
            "backdrop-invert": [invert]
          }],
          /**
           * Backdrop Opacity
           * @see https://tailwindcss.com/docs/backdrop-opacity
           */
          "backdrop-opacity": [{
            "backdrop-opacity": [opacity]
          }],
          /**
           * Backdrop Saturate
           * @see https://tailwindcss.com/docs/backdrop-saturate
           */
          "backdrop-saturate": [{
            "backdrop-saturate": [saturate]
          }],
          /**
           * Backdrop Sepia
           * @see https://tailwindcss.com/docs/backdrop-sepia
           */
          "backdrop-sepia": [{
            "backdrop-sepia": [sepia]
          }],
          // Tables
          /**
           * Border Collapse
           * @see https://tailwindcss.com/docs/border-collapse
           */
          "border-collapse": [{
            border: ["collapse", "separate"]
          }],
          /**
           * Border Spacing
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing": [{
            "border-spacing": [borderSpacing]
          }],
          /**
           * Border Spacing X
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing-x": [{
            "border-spacing-x": [borderSpacing]
          }],
          /**
           * Border Spacing Y
           * @see https://tailwindcss.com/docs/border-spacing
           */
          "border-spacing-y": [{
            "border-spacing-y": [borderSpacing]
          }],
          /**
           * Table Layout
           * @see https://tailwindcss.com/docs/table-layout
           */
          "table-layout": [{
            table: ["auto", "fixed"]
          }],
          /**
           * Caption Side
           * @see https://tailwindcss.com/docs/caption-side
           */
          caption: [{
            caption: ["top", "bottom"]
          }],
          // Transitions and Animation
          /**
           * Tranisition Property
           * @see https://tailwindcss.com/docs/transition-property
           */
          transition: [{
            transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
          }],
          /**
           * Transition Duration
           * @see https://tailwindcss.com/docs/transition-duration
           */
          duration: [{
            duration: getNumberAndArbitrary()
          }],
          /**
           * Transition Timing Function
           * @see https://tailwindcss.com/docs/transition-timing-function
           */
          ease: [{
            ease: ["linear", "in", "out", "in-out", isArbitraryValue]
          }],
          /**
           * Transition Delay
           * @see https://tailwindcss.com/docs/transition-delay
           */
          delay: [{
            delay: getNumberAndArbitrary()
          }],
          /**
           * Animation
           * @see https://tailwindcss.com/docs/animation
           */
          animate: [{
            animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
          }],
          // Transforms
          /**
           * Transform
           * @see https://tailwindcss.com/docs/transform
           */
          transform: [{
            transform: ["", "gpu", "none"]
          }],
          /**
           * Scale
           * @see https://tailwindcss.com/docs/scale
           */
          scale: [{
            scale: [scale2]
          }],
          /**
           * Scale X
           * @see https://tailwindcss.com/docs/scale
           */
          "scale-x": [{
            "scale-x": [scale2]
          }],
          /**
           * Scale Y
           * @see https://tailwindcss.com/docs/scale
           */
          "scale-y": [{
            "scale-y": [scale2]
          }],
          /**
           * Rotate
           * @see https://tailwindcss.com/docs/rotate
           */
          rotate: [{
            rotate: [isInteger, isArbitraryValue]
          }],
          /**
           * Translate X
           * @see https://tailwindcss.com/docs/translate
           */
          "translate-x": [{
            "translate-x": [translate]
          }],
          /**
           * Translate Y
           * @see https://tailwindcss.com/docs/translate
           */
          "translate-y": [{
            "translate-y": [translate]
          }],
          /**
           * Skew X
           * @see https://tailwindcss.com/docs/skew
           */
          "skew-x": [{
            "skew-x": [skew]
          }],
          /**
           * Skew Y
           * @see https://tailwindcss.com/docs/skew
           */
          "skew-y": [{
            "skew-y": [skew]
          }],
          /**
           * Transform Origin
           * @see https://tailwindcss.com/docs/transform-origin
           */
          "transform-origin": [{
            origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
          }],
          // Interactivity
          /**
           * Accent Color
           * @see https://tailwindcss.com/docs/accent-color
           */
          accent: [{
            accent: ["auto", colors]
          }],
          /**
           * Appearance
           * @see https://tailwindcss.com/docs/appearance
           */
          appearance: [{
            appearance: ["none", "auto"]
          }],
          /**
           * Cursor
           * @see https://tailwindcss.com/docs/cursor
           */
          cursor: [{
            cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
          }],
          /**
           * Caret Color
           * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
           */
          "caret-color": [{
            caret: [colors]
          }],
          /**
           * Pointer Events
           * @see https://tailwindcss.com/docs/pointer-events
           */
          "pointer-events": [{
            "pointer-events": ["none", "auto"]
          }],
          /**
           * Resize
           * @see https://tailwindcss.com/docs/resize
           */
          resize: [{
            resize: ["none", "y", "x", ""]
          }],
          /**
           * Scroll Behavior
           * @see https://tailwindcss.com/docs/scroll-behavior
           */
          "scroll-behavior": [{
            scroll: ["auto", "smooth"]
          }],
          /**
           * Scroll Margin
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-m": [{
            "scroll-m": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin X
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mx": [{
            "scroll-mx": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Y
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-my": [{
            "scroll-my": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Start
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-ms": [{
            "scroll-ms": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin End
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-me": [{
            "scroll-me": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Top
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mt": [{
            "scroll-mt": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Right
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mr": [{
            "scroll-mr": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Bottom
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-mb": [{
            "scroll-mb": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Margin Left
           * @see https://tailwindcss.com/docs/scroll-margin
           */
          "scroll-ml": [{
            "scroll-ml": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-p": [{
            "scroll-p": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding X
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-px": [{
            "scroll-px": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Y
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-py": [{
            "scroll-py": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Start
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-ps": [{
            "scroll-ps": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding End
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pe": [{
            "scroll-pe": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Top
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pt": [{
            "scroll-pt": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Right
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pr": [{
            "scroll-pr": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Bottom
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pb": [{
            "scroll-pb": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Padding Left
           * @see https://tailwindcss.com/docs/scroll-padding
           */
          "scroll-pl": [{
            "scroll-pl": getSpacingWithArbitrary()
          }],
          /**
           * Scroll Snap Align
           * @see https://tailwindcss.com/docs/scroll-snap-align
           */
          "snap-align": [{
            snap: ["start", "end", "center", "align-none"]
          }],
          /**
           * Scroll Snap Stop
           * @see https://tailwindcss.com/docs/scroll-snap-stop
           */
          "snap-stop": [{
            snap: ["normal", "always"]
          }],
          /**
           * Scroll Snap Type
           * @see https://tailwindcss.com/docs/scroll-snap-type
           */
          "snap-type": [{
            snap: ["none", "x", "y", "both"]
          }],
          /**
           * Scroll Snap Type Strictness
           * @see https://tailwindcss.com/docs/scroll-snap-type
           */
          "snap-strictness": [{
            snap: ["mandatory", "proximity"]
          }],
          /**
           * Touch Action
           * @see https://tailwindcss.com/docs/touch-action
           */
          touch: [{
            touch: ["auto", "none", "manipulation"]
          }],
          /**
           * Touch Action X
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-x": [{
            "touch-pan": ["x", "left", "right"]
          }],
          /**
           * Touch Action Y
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-y": [{
            "touch-pan": ["y", "up", "down"]
          }],
          /**
           * Touch Action Pinch Zoom
           * @see https://tailwindcss.com/docs/touch-action
           */
          "touch-pz": ["touch-pinch-zoom"],
          /**
           * User Select
           * @see https://tailwindcss.com/docs/user-select
           */
          select: [{
            select: ["none", "text", "all", "auto"]
          }],
          /**
           * Will Change
           * @see https://tailwindcss.com/docs/will-change
           */
          "will-change": [{
            "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
          }],
          // SVG
          /**
           * Fill
           * @see https://tailwindcss.com/docs/fill
           */
          fill: [{
            fill: [colors, "none"]
          }],
          /**
           * Stroke Width
           * @see https://tailwindcss.com/docs/stroke-width
           */
          "stroke-w": [{
            stroke: [isLength, isArbitraryLength, isArbitraryNumber]
          }],
          /**
           * Stroke
           * @see https://tailwindcss.com/docs/stroke
           */
          stroke: [{
            stroke: [colors, "none"]
          }],
          // Accessibility
          /**
           * Screen Readers
           * @see https://tailwindcss.com/docs/screen-readers
           */
          sr: ["sr-only", "not-sr-only"],
          /**
           * Forced Color Adjust
           * @see https://tailwindcss.com/docs/forced-color-adjust
           */
          "forced-color-adjust": [{
            "forced-color-adjust": ["auto", "none"]
          }]
        },
        conflictingClassGroups: {
          overflow: ["overflow-x", "overflow-y"],
          overscroll: ["overscroll-x", "overscroll-y"],
          inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
          "inset-x": ["right", "left"],
          "inset-y": ["top", "bottom"],
          flex: ["basis", "grow", "shrink"],
          gap: ["gap-x", "gap-y"],
          p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
          px: ["pr", "pl"],
          py: ["pt", "pb"],
          m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
          mx: ["mr", "ml"],
          my: ["mt", "mb"],
          size: ["w", "h"],
          "font-size": ["leading"],
          "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
          "fvn-ordinal": ["fvn-normal"],
          "fvn-slashed-zero": ["fvn-normal"],
          "fvn-figure": ["fvn-normal"],
          "fvn-spacing": ["fvn-normal"],
          "fvn-fraction": ["fvn-normal"],
          "line-clamp": ["display", "overflow"],
          rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
          "rounded-s": ["rounded-ss", "rounded-es"],
          "rounded-e": ["rounded-se", "rounded-ee"],
          "rounded-t": ["rounded-tl", "rounded-tr"],
          "rounded-r": ["rounded-tr", "rounded-br"],
          "rounded-b": ["rounded-br", "rounded-bl"],
          "rounded-l": ["rounded-tl", "rounded-bl"],
          "border-spacing": ["border-spacing-x", "border-spacing-y"],
          "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
          "border-w-x": ["border-w-r", "border-w-l"],
          "border-w-y": ["border-w-t", "border-w-b"],
          "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
          "border-color-x": ["border-color-r", "border-color-l"],
          "border-color-y": ["border-color-t", "border-color-b"],
          "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
          "scroll-mx": ["scroll-mr", "scroll-ml"],
          "scroll-my": ["scroll-mt", "scroll-mb"],
          "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
          "scroll-px": ["scroll-pr", "scroll-pl"],
          "scroll-py": ["scroll-pt", "scroll-pb"],
          touch: ["touch-x", "touch-y", "touch-pz"],
          "touch-x": ["touch"],
          "touch-y": ["touch"],
          "touch-pz": ["touch"]
        },
        conflictingClassGroupModifiers: {
          "font-size": ["leading"]
        }
      };
    };
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// node_modules/framesync/dist/es/on-next-frame.mjs
var defaultTimestep, getCurrentTime, onNextFrame;
var init_on_next_frame = __esm({
  "node_modules/framesync/dist/es/on-next-frame.mjs"() {
    defaultTimestep = 1 / 60 * 1e3;
    getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
    onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
  }
});

// node_modules/framesync/dist/es/create-render-step.mjs
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index5 = toRunNextFrame.indexOf(callback);
      if (index5 !== -1)
        toRunNextFrame.splice(index5, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}
var init_create_render_step = __esm({
  "node_modules/framesync/dist/es/create-render-step.mjs"() {
  }
});

// node_modules/framesync/dist/es/index.mjs
var maxElapsed, useDefaultElapsed, runNextFrame, isProcessing, frame, stepsOrder, steps, sync, cancelSync, flushSync, processStep, processFrame, startLoop, getFrameData, es_default;
var init_es = __esm({
  "node_modules/framesync/dist/es/index.mjs"() {
    init_on_next_frame();
    init_create_render_step();
    maxElapsed = 40;
    useDefaultElapsed = true;
    runNextFrame = false;
    isProcessing = false;
    frame = {
      delta: 0,
      timestamp: 0
    };
    stepsOrder = [
      "read",
      "update",
      "preRender",
      "render",
      "postRender"
    ];
    steps = stepsOrder.reduce((acc, key2) => {
      acc[key2] = createRenderStep(() => runNextFrame = true);
      return acc;
    }, {});
    sync = stepsOrder.reduce((acc, key2) => {
      const step = steps[key2];
      acc[key2] = (process2, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
          startLoop();
        return step.schedule(process2, keepAlive, immediate);
      };
      return acc;
    }, {});
    cancelSync = stepsOrder.reduce((acc, key2) => {
      acc[key2] = steps[key2].cancel;
      return acc;
    }, {});
    flushSync = stepsOrder.reduce((acc, key2) => {
      acc[key2] = () => steps[key2].process(frame);
      return acc;
    }, {});
    processStep = (stepId) => steps[stepId].process(frame);
    processFrame = (timestamp) => {
      runNextFrame = false;
      frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
      frame.timestamp = timestamp;
      isProcessing = true;
      stepsOrder.forEach(processStep);
      isProcessing = false;
      if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
      }
    };
    startLoop = () => {
      runNextFrame = true;
      useDefaultElapsed = true;
      if (!isProcessing)
        onNextFrame(processFrame);
    };
    getFrameData = () => frame;
    es_default = sync;
  }
});

// node_modules/popmotion/node_modules/tslib/tslib.es6.js
function __rest(s2, e) {
  var t = {};
  for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
    t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
var init_tslib_es6 = __esm({
  "node_modules/popmotion/node_modules/tslib/tslib.es6.js"() {
  }
});

// node_modules/hey-listen/dist/hey-listen.es.js
var warning, invariant;
var init_hey_listen_es = __esm({
  "node_modules/hey-listen/dist/hey-listen.es.js"() {
    warning = function() {
    };
    invariant = function() {
    };
    if (true) {
      warning = function(check, message) {
        if (!check && typeof console !== "undefined") {
          console.warn(message);
        }
      };
      invariant = function(check, message) {
        if (!check) {
          throw new Error(message);
        }
      };
    }
  }
});

// node_modules/popmotion/dist/es/utils/clamp.mjs
var clamp;
var init_clamp = __esm({
  "node_modules/popmotion/dist/es/utils/clamp.mjs"() {
    clamp = (min, max, v) => Math.min(Math.max(v, min), max);
  }
});

// node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta2 = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta2);
      return safeMin - a2 / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta2 = exponentialDecay * duration;
      const d = delta2 * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta2);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    };
    derivative = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var safeMin, minDuration, maxDuration, minDamping, maxDamping, rootIterations;
var init_find_spring = __esm({
  "node_modules/popmotion/dist/es/animations/utils/find-spring.mjs"() {
    init_hey_listen_es();
    init_clamp();
    safeMin = 1e-3;
    minDuration = 0.01;
    maxDuration = 10;
    minDamping = 0.05;
    maxDamping = 1;
    rootIterations = 12;
  }
});

// node_modules/popmotion/dist/es/animations/generators/spring.mjs
function isSpringType(options2, keys) {
  return keys.some((key2) => options2[key2] !== void 0);
}
function getSpringOptions(options2) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options2);
  if (!isSpringType(options2, physicsKeys) && isSpringType(options2, durationKeys)) {
    const derived2 = findSpring(options2);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived2), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options2 = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options2);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    if (restDelta === void 0) {
      restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
    }
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      };
      resolveVelocity = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
var durationKeys, physicsKeys, zero;
var init_spring = __esm({
  "node_modules/popmotion/dist/es/animations/generators/spring.mjs"() {
    init_tslib_es6();
    init_find_spring();
    durationKeys = ["duration", "bounce"];
    physicsKeys = ["stiffness", "damping", "mass"];
    spring.needsInterpolation = (a2, b2) => typeof a2 === "string" || typeof b2 === "string";
    zero = (_t) => 0;
  }
});

// node_modules/popmotion/dist/es/utils/progress.mjs
var progress;
var init_progress = __esm({
  "node_modules/popmotion/dist/es/utils/progress.mjs"() {
    progress = (from, to, value) => {
      const toFromDifference = to - from;
      return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    };
  }
});

// node_modules/popmotion/dist/es/utils/mix.mjs
var mix;
var init_mix = __esm({
  "node_modules/popmotion/dist/es/utils/mix.mjs"() {
    mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;
  }
});

// node_modules/style-value-types/dist/es/utils.mjs
function isString(v) {
  return typeof v === "string";
}
var clamp2, sanitize, floatRegex, colorRegex, singleColorRegex;
var init_utils = __esm({
  "node_modules/style-value-types/dist/es/utils.mjs"() {
    clamp2 = (min, max) => (v) => Math.max(Math.min(v, max), min);
    sanitize = (v) => v % 1 ? Number(v.toFixed(5)) : v;
    floatRegex = /(-)?([\d]*\.?[\d])+/g;
    colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
    singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
  }
});

// node_modules/style-value-types/dist/es/numbers/index.mjs
var number, alpha, scale;
var init_numbers = __esm({
  "node_modules/style-value-types/dist/es/numbers/index.mjs"() {
    init_utils();
    number = {
      test: (v) => typeof v === "number",
      parse: parseFloat,
      transform: (v) => v
    };
    alpha = Object.assign(Object.assign({}, number), { transform: clamp2(0, 1) });
    scale = Object.assign(Object.assign({}, number), { default: 1 });
  }
});

// node_modules/style-value-types/dist/es/numbers/units.mjs
var createUnitType, degrees, percent, px, vh, vw, progressPercentage;
var init_units = __esm({
  "node_modules/style-value-types/dist/es/numbers/units.mjs"() {
    init_utils();
    createUnitType = (unit) => ({
      test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
      parse: parseFloat,
      transform: (v) => `${v}${unit}`
    });
    degrees = createUnitType("deg");
    percent = createUnitType("%");
    px = createUnitType("px");
    vh = createUnitType("vh");
    vw = createUnitType("vw");
    progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });
  }
});

// node_modules/style-value-types/dist/es/color/utils.mjs
var isColorString, splitColor;
var init_utils2 = __esm({
  "node_modules/style-value-types/dist/es/color/utils.mjs"() {
    init_utils();
    isColorString = (type, testProp) => (v) => {
      return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
    };
    splitColor = (aName, bName, cName) => (v) => {
      if (!isString(v))
        return v;
      const [a2, b2, c2, alpha2] = v.match(floatRegex);
      return {
        [aName]: parseFloat(a2),
        [bName]: parseFloat(b2),
        [cName]: parseFloat(c2),
        alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
      };
    };
  }
});

// node_modules/style-value-types/dist/es/color/hsla.mjs
var hsla;
var init_hsla = __esm({
  "node_modules/style-value-types/dist/es/color/hsla.mjs"() {
    init_numbers();
    init_units();
    init_utils();
    init_utils2();
    hsla = {
      test: isColorString("hsl", "hue"),
      parse: splitColor("hue", "saturation", "lightness"),
      transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
      }
    };
  }
});

// node_modules/style-value-types/dist/es/color/rgba.mjs
var clampRgbUnit, rgbUnit, rgba;
var init_rgba = __esm({
  "node_modules/style-value-types/dist/es/color/rgba.mjs"() {
    init_numbers();
    init_utils();
    init_utils2();
    clampRgbUnit = clamp2(0, 255);
    rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
    rgba = {
      test: isColorString("rgb", "red"),
      parse: splitColor("red", "green", "blue"),
      transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
    };
  }
});

// node_modules/style-value-types/dist/es/color/hex.mjs
function parseHex(v) {
  let r2 = "";
  let g = "";
  let b2 = "";
  let a2 = "";
  if (v.length > 5) {
    r2 = v.substr(1, 2);
    g = v.substr(3, 2);
    b2 = v.substr(5, 2);
    a2 = v.substr(7, 2);
  } else {
    r2 = v.substr(1, 1);
    g = v.substr(2, 1);
    b2 = v.substr(3, 1);
    a2 = v.substr(4, 1);
    r2 += r2;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r2, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
var hex;
var init_hex = __esm({
  "node_modules/style-value-types/dist/es/color/hex.mjs"() {
    init_rgba();
    init_utils2();
    hex = {
      test: isColorString("#"),
      parse: parseHex,
      transform: rgba.transform
    };
  }
});

// node_modules/style-value-types/dist/es/color/index.mjs
var color;
var init_color = __esm({
  "node_modules/style-value-types/dist/es/color/index.mjs"() {
    init_utils();
    init_hex();
    init_hsla();
    init_rgba();
    color = {
      test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
      parse: (v) => {
        if (rgba.test(v)) {
          return rgba.parse(v);
        } else if (hsla.test(v)) {
          return hsla.parse(v);
        } else {
          return hex.parse(v);
        }
      },
      transform: (v) => {
        return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
      }
    };
  }
});

// node_modules/style-value-types/dist/es/complex/index.mjs
function test(v) {
  var _a, _b, _c, _d;
  return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v) {
  if (typeof v === "number")
    v = `${v}`;
  const values = [];
  let numColors = 0;
  const colors = v.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v.match(floatRegex);
  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v };
}
function parse2(v) {
  return analyse(v).values;
}
function createTransformer(v) {
  const { values, numColors, tokenised } = analyse(v);
  const numValues = values.length;
  return (v2) => {
    let output = tokenised;
    for (let i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
function getAnimatableNone(v) {
  const parsed = parse2(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var colorToken, numberToken, convertNumbersToZero, complex;
var init_complex = __esm({
  "node_modules/style-value-types/dist/es/complex/index.mjs"() {
    init_color();
    init_numbers();
    init_utils();
    colorToken = "${c}";
    numberToken = "${n}";
    convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
    complex = { test, parse: parse2, createTransformer, getAnimatableNone };
  }
});

// node_modules/style-value-types/dist/es/complex/filter.mjs
function applyDefaultFilter(v) {
  let [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var maxDefaults, functionRegex, filter;
var init_filter = __esm({
  "node_modules/style-value-types/dist/es/complex/filter.mjs"() {
    init_complex();
    init_utils();
    maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
    functionRegex = /([a-z-]*)\(.*?\)/g;
    filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
      const functions = v.match(functionRegex);
      return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    } });
  }
});

// node_modules/style-value-types/dist/es/index.mjs
var init_es2 = __esm({
  "node_modules/style-value-types/dist/es/index.mjs"() {
    init_numbers();
    init_units();
    init_hsla();
    init_rgba();
    init_hex();
    init_color();
    init_complex();
    init_filter();
  }
});

// node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
var init_hsla_to_rgba = __esm({
  "node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs"() {
  }
});

// node_modules/popmotion/dist/es/utils/mix-color.mjs
var mixLinearColor, colorTypes, getColorType, notAnimatable, mixColor;
var init_mix_color = __esm({
  "node_modules/popmotion/dist/es/utils/mix-color.mjs"() {
    init_mix();
    init_es2();
    init_hey_listen_es();
    init_hsla_to_rgba();
    mixLinearColor = (from, to, v) => {
      const fromExpo = from * from;
      const toExpo = to * to;
      return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
    };
    colorTypes = [hex, rgba, hsla];
    getColorType = (v) => colorTypes.find((type) => type.test(v));
    notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
    mixColor = (from, to) => {
      let fromColorType = getColorType(from);
      let toColorType = getColorType(to);
      invariant(!!fromColorType, notAnimatable(from));
      invariant(!!toColorType, notAnimatable(to));
      let fromColor = fromColorType.parse(from);
      let toColor = toColorType.parse(to);
      if (fromColorType === hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = rgba;
      }
      if (toColorType === hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = rgba;
      }
      const blended = Object.assign({}, fromColor);
      return (v) => {
        for (const key2 in blended) {
          if (key2 !== "alpha") {
            blended[key2] = mixLinearColor(fromColor[key2], toColor[key2], v);
          }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
        return fromColorType.transform(blended);
      };
    };
  }
});

// node_modules/popmotion/dist/es/utils/inc.mjs
var isNum;
var init_inc = __esm({
  "node_modules/popmotion/dist/es/utils/inc.mjs"() {
    isNum = (v) => typeof v === "number";
  }
});

// node_modules/popmotion/dist/es/utils/pipe.mjs
var combineFunctions, pipe;
var init_pipe = __esm({
  "node_modules/popmotion/dist/es/utils/pipe.mjs"() {
    combineFunctions = (a2, b2) => (v) => b2(a2(v));
    pipe = (...transformers) => transformers.reduce(combineFunctions);
  }
});

// node_modules/popmotion/dist/es/utils/mix-complex.mjs
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v) => mix(origin, target, v);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
function analyse2(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixArray, mixObject, mixComplex;
var init_mix_complex = __esm({
  "node_modules/popmotion/dist/es/utils/mix-complex.mjs"() {
    init_es2();
    init_mix();
    init_mix_color();
    init_inc();
    init_pipe();
    init_hey_listen_es();
    mixArray = (from, to) => {
      const output = [...from];
      const numValues = output.length;
      const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
      return (v) => {
        for (let i = 0; i < numValues; i++) {
          output[i] = blendValue[i](v);
        }
        return output;
      };
    };
    mixObject = (origin, target) => {
      const output = Object.assign(Object.assign({}, origin), target);
      const blendValue = {};
      for (const key2 in output) {
        if (origin[key2] !== void 0 && target[key2] !== void 0) {
          blendValue[key2] = getMixer(origin[key2], target[key2]);
        }
      }
      return (v) => {
        for (const key2 in blendValue) {
          output[key2] = blendValue[key2](v);
        }
        return output;
      };
    };
    mixComplex = (origin, target) => {
      const template = complex.createTransformer(target);
      const originStats = analyse2(origin);
      const targetStats = analyse2(target);
      const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
      if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
      } else {
        warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p) => `${p > 0 ? target : origin}`;
      }
    };
  }
});

// node_modules/popmotion/dist/es/utils/interpolate.mjs
function detectMixerFactory(v) {
  if (typeof v === "number") {
    return mixNumber;
  } else if (typeof v === "string") {
    if (color.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}
var mixNumber;
var init_interpolate = __esm({
  "node_modules/popmotion/dist/es/utils/interpolate.mjs"() {
    init_progress();
    init_mix();
    init_mix_color();
    init_mix_complex();
    init_es2();
    init_clamp();
    init_pipe();
    init_hey_listen_es();
    mixNumber = (from, to) => (p) => mix(from, to, p);
  }
});

// node_modules/popmotion/dist/es/easing/utils.mjs
var reverseEasing, mirrorEasing, createExpoIn, createBackIn, createAnticipate;
var init_utils3 = __esm({
  "node_modules/popmotion/dist/es/easing/utils.mjs"() {
    reverseEasing = (easing) => (p) => 1 - easing(1 - p);
    mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
    createExpoIn = (power) => (p) => Math.pow(p, power);
    createBackIn = (power) => (p) => p * p * ((power + 1) * p - power);
    createAnticipate = (power) => {
      const backEasing = createBackIn(power);
      return (p) => (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    };
  }
});

// node_modules/popmotion/dist/es/easing/index.mjs
var DEFAULT_OVERSHOOT_STRENGTH, BOUNCE_FIRST_THRESHOLD, BOUNCE_SECOND_THRESHOLD, BOUNCE_THIRD_THRESHOLD, linear, easeIn, easeOut, easeInOut, circIn, circOut, circInOut, backIn, backOut, backInOut, anticipate, ca, cb, cc, bounceOut, bounceIn, bounceInOut;
var init_easing = __esm({
  "node_modules/popmotion/dist/es/easing/index.mjs"() {
    init_utils3();
    DEFAULT_OVERSHOOT_STRENGTH = 1.525;
    BOUNCE_FIRST_THRESHOLD = 4 / 11;
    BOUNCE_SECOND_THRESHOLD = 8 / 11;
    BOUNCE_THIRD_THRESHOLD = 9 / 10;
    linear = (p) => p;
    easeIn = createExpoIn(2);
    easeOut = reverseEasing(easeIn);
    easeInOut = mirrorEasing(easeIn);
    circIn = (p) => 1 - Math.sin(Math.acos(p));
    circOut = reverseEasing(circIn);
    circInOut = mirrorEasing(circOut);
    backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
    backOut = reverseEasing(backIn);
    backInOut = mirrorEasing(backIn);
    anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
    ca = 4356 / 361;
    cb = 35442 / 1805;
    cc = 16061 / 1805;
    bounceOut = (p) => {
      if (p === 1 || p === 0)
        return p;
      const p2 = p * p;
      return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
    };
    bounceIn = reverseEasing(bounceOut);
    bounceInOut = (p) => p < 0.5 ? 0.5 * (1 - bounceOut(1 - p * 2)) : 0.5 * bounceOut(p * 2 - 1) + 0.5;
  }
});

// node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t) => {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}
var init_keyframes = __esm({
  "node_modules/popmotion/dist/es/animations/generators/keyframes.mjs"() {
    init_interpolate();
    init_easing();
  }
});

// node_modules/popmotion/dist/es/animations/generators/decay.mjs
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t) => {
      const delta2 = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta2 > restDelta || delta2 < -restDelta);
      state.value = state.done ? target : target + delta2;
      return state;
    },
    flipTarget: () => {
    }
  };
}
var init_decay = __esm({
  "node_modules/popmotion/dist/es/animations/generators/decay.mjs"() {
  }
});

// node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes;
}
var types;
var init_detect_animation_from_options = __esm({
  "node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs"() {
    init_spring();
    init_keyframes();
    init_decay();
    types = { keyframes, spring, decay };
  }
});

// node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}
var init_elapsed = __esm({
  "node_modules/popmotion/dist/es/animations/utils/elapsed.mjs"() {
  }
});

// node_modules/popmotion/dist/es/animations/index.mjs
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options2 = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options2;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options2.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options2);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options2), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update2(delta2) {
    if (!isForwardPlayback)
      delta2 = -delta2;
    elapsed += delta2;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update2);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
var framesync;
var init_animations = __esm({
  "node_modules/popmotion/dist/es/animations/index.mjs"() {
    init_tslib_es6();
    init_detect_animation_from_options();
    init_es();
    init_interpolate();
    init_elapsed();
    framesync = (update2) => {
      const passTimestamp = ({ delta: delta2 }) => update2(delta2);
      return {
        start: () => es_default.update(passTimestamp, true),
        stop: () => cancelSync.update(passTimestamp)
      };
    };
  }
});

// node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
var init_velocity_per_second = __esm({
  "node_modules/popmotion/dist/es/utils/velocity-per-second.mjs"() {
  }
});

// node_modules/popmotion/dist/es/animations/inertia.mjs
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  function startAnimation2(options2) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options2), {
      driver,
      onUpdate: (v) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
        (_a = options2.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options2, v);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options2) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options2));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v) => {
      prev = current;
      current = v;
      velocity = velocityPerSecond(v - prev, getFrameData().delta);
      if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
        startSpring({ from: v, to: boundary, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}
var init_inertia = __esm({
  "node_modules/popmotion/dist/es/animations/inertia.mjs"() {
    init_animations();
    init_velocity_per_second();
    init_es();
  }
});

// node_modules/popmotion/dist/es/utils/is-point.mjs
var isPoint;
var init_is_point = __esm({
  "node_modules/popmotion/dist/es/utils/is-point.mjs"() {
    isPoint = (point) => point.hasOwnProperty("x") && point.hasOwnProperty("y");
  }
});

// node_modules/popmotion/dist/es/utils/is-point-3d.mjs
var isPoint3D;
var init_is_point_3d = __esm({
  "node_modules/popmotion/dist/es/utils/is-point-3d.mjs"() {
    init_is_point();
    isPoint3D = (point) => isPoint(point) && point.hasOwnProperty("z");
  }
});

// node_modules/popmotion/dist/es/utils/distance.mjs
function distance(a2, b2) {
  if (isNum(a2) && isNum(b2)) {
    return distance1D(a2, b2);
  } else if (isPoint(a2) && isPoint(b2)) {
    const xDelta = distance1D(a2.x, b2.x);
    const yDelta = distance1D(a2.y, b2.y);
    const zDelta = isPoint3D(a2) && isPoint3D(b2) ? distance1D(a2.z, b2.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}
var distance1D;
var init_distance = __esm({
  "node_modules/popmotion/dist/es/utils/distance.mjs"() {
    init_is_point();
    init_is_point_3d();
    init_inc();
    distance1D = (a2, b2) => Math.abs(a2 - b2);
  }
});

// node_modules/popmotion/dist/es/easing/cubic-bezier.mjs
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < newtonIterations; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
var a, b, c, calcBezier, getSlope, subdivisionPrecision, subdivisionMaxIterations, newtonIterations, newtonMinSlope, kSplineTableSize, kSampleStepSize;
var init_cubic_bezier = __esm({
  "node_modules/popmotion/dist/es/easing/cubic-bezier.mjs"() {
    init_easing();
    a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
    b = (a1, a2) => 3 * a2 - 6 * a1;
    c = (a1) => 3 * a1;
    calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
    getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
    subdivisionPrecision = 1e-7;
    subdivisionMaxIterations = 10;
    newtonIterations = 8;
    newtonMinSlope = 1e-3;
    kSplineTableSize = 11;
    kSampleStepSize = 1 / (kSplineTableSize - 1);
  }
});

// node_modules/popmotion/dist/es/index.mjs
var init_es3 = __esm({
  "node_modules/popmotion/dist/es/index.mjs"() {
    init_animations();
    init_inertia();
    init_clamp();
    init_distance();
    init_mix();
    init_pipe();
    init_progress();
    init_velocity_per_second();
    init_easing();
    init_cubic_bezier();
  }
});

// node_modules/tslib/tslib.es6.mjs
function __rest2(s2, e) {
  var t = {};
  for (var p in s2) if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
    t[p] = s2[p];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
        t[p[i]] = s2[p[i]];
    }
  return t;
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r2, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r2 = i.next()).done) ar.push(r2.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var init_tslib_es62 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
  }
});

// .svelte-kit/output/server/chunks/MagicCard.js
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component5 = dirty_components[flushidx];
        flushidx++;
        set_current_component(component5);
        update(component5.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index5 = arr.indexOf(item);
  index5 > -1 && arr.splice(index5, 1);
}
function motionValue(init2, startStopNotifier) {
  return new MotionValue(init2, startStopNotifier);
}
function getAnimatableNone2(key2, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key2);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition = __rest2(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = __rest2(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options2 = Object.assign({}, transition);
  if (times)
    options2["offset"] = times;
  if (transition.duration)
    options2["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options2.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options2["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options2.type = "keyframes";
  if (yoyo || loop || flip) {
    warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
    legacyRepeatWarning = true;
    if (yoyo) {
      options2.repeatType = "reverse";
    } else if (loop) {
      options2.repeatType = "loop";
    } else if (flip) {
      options2.repeatType = "mirror";
    }
    options2.repeat = loop || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options2.type = "keyframes";
  return options2;
}
function getDelayFromTransition(transition, key2) {
  var _a;
  var valueTransition = getValueTransition(transition, key2) || {};
  return (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : 0;
}
function hydrateKeyframes(options2) {
  if (Array.isArray(options2.to) && options2.to[0] === null) {
    options2.to = __spreadArray([], __read(options2.to));
    options2.to[0] = options2.from;
  }
  return options2;
}
function getPopmotionAnimationOptions(transition, options2, key2) {
  var _a;
  if (Array.isArray(options2.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }
  hydrateKeyframes(options2);
  if (!isTransitionDefined(transition)) {
    transition = Object.assign(Object.assign({}, transition), getDefaultTransition(key2, options2.to));
  }
  return Object.assign(Object.assign({}, options2), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key2, value, target, transition, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition, key2);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key2, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key2, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key2, origin);
  warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate " + key2 + ' from "' + origin + '" to "' + target + '". ' + origin + " is not an animatable value - to enable this animation set " + origin + " to a value animatable to " + target + " via the `style` property.");
  function start() {
    var options2 = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia(Object.assign(Object.assign({}, options2), valueTransition)) : animate(Object.assign(Object.assign({}, getPopmotionAnimationOptions(valueTransition, options2, key2)), { onUpdate: function(v) {
      var _a2;
      options2.onUpdate(v);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v);
    }, onComplete: function() {
      var _a2;
      options2.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2;
    value.set(target);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    return { stop: function() {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
function getValueTransition(transition, key2) {
  return transition[key2] || transition["default"] || transition;
}
function startAnimation(key2, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key2, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key2);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}
function isVariantLabels(v) {
  return Array.isArray(v);
}
function isVariantLabel(v) {
  return typeof v === "string" || isVariantLabels(v);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key2) {
    return current[key2] = value.get();
  });
  return current;
}
function getVelocity$1(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key2) {
    return velocity[key2] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  return typeof definition === "function" ? definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity) : definition;
}
function resolveVariant(visualElement2, definition, custom) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity$1(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}
function setMotionValue(visualElement2, key2, value) {
  if (visualElement2.hasValue(key2)) {
    visualElement2.getValue(key2).set(value);
  } else {
    visualElement2.addValue(key2, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = __rest2(_a, ["transitionEnd", "transition"]);
  target = Object.assign(Object.assign({}, target), transitionEnd);
  for (var key2 in target) {
    var value = resolveFinalValueInKeyframes(target[key2]);
    setMotionValue(visualElement2, key2, value);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key22) {
    return !visualElement2.hasValue(key22);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i = 0; i < numNewValues; i++) {
    var key2 = newValueKeys[i];
    var targetValue = target[key2];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key2]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key2)) !== null && _b !== void 0 ? _b : target[key2];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && isNumericalString(value)) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key2, targetValue);
    }
    visualElement2.addValue(key2, motionValue(value));
    (_c = (_d = origin)[key2]) !== null && _c !== void 0 ? _c : _d[key2] = value;
    visualElement2.setBaseTarget(key2, value);
  }
}
function getOriginFromTransition(key2, transition) {
  if (!transition)
    return;
  var valueTransition = transition[key2] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key2 in target) {
    origin[key2] = (_a = getOriginFromTransition(key2, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key2)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}
function animateVisualElement(visualElement2, definition, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  visualElement2.notifyAnimationStart();
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options2);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options2);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options2.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options2);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options2) {
  var _a;
  if (options2 === void 0) {
    options2 = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options2.custom);
  var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options2.transitionOverride) {
    transition = options2.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options2);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options2);
  } : function() {
    return Promise.resolve();
  };
  var when = transition.when;
  if (when) {
    var _c = __read(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options2.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = __rest2(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key2 in target) {
    var value = visualElement2.getValue(key2);
    var valueTarget = target[key2];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key2)) {
      continue;
    }
    var animation = startAnimation(key2, value, valueTarget, Object.assign({ delay }, transition));
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options2) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i) {
    if (i === void 0) {
      i = 0;
    }
    return i * staggerChildren;
  } : function(i) {
    if (i === void 0) {
      i = 0;
    }
    return maxStaggerDuration - i * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i) {
    animations2.push(animateVariant(child, variant, Object.assign(Object.assign({}, options2), { delay: delayChildren + generateStaggerDuration(i) })).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a2, b2) {
  return a2.sortNodePosition(b2);
}
function shouldBlockAnimation(_a, key2) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key2) && needsAnimating[key2] !== true;
  needsAnimating[key2] = false;
  return shouldBlock;
}
function eachAxis(handler2) {
  return [handler2("x"), handler2("y")];
}
function noop2(any) {
  return any;
}
function convertBoundingBoxToAxisBox(_a) {
  var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertAxisBoxToBoundingBox(_a) {
  var x = _a.x, y = _a.y;
  return {
    top: y.min,
    bottom: y.max,
    left: x.min,
    right: x.max
  };
}
function transformBoundingBox(_a, transformPoint2) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  if (transformPoint2 === void 0) {
    transformPoint2 = noop2;
  }
  var topLeft = transformPoint2({ x: left, y: top });
  var bottomRight = transformPoint2({ x: right, y: bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
function axisBox() {
  return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };
}
function copyAxisBox(box) {
  return {
    x: Object.assign({}, box.x),
    y: Object.assign({}, box.y)
  };
}
function delta() {
  return {
    x: Object.assign({}, zeroDelta),
    y: Object.assign({}, zeroDelta)
  };
}
function isDraggable(visualElement2) {
  var _a = visualElement2.getProps(), drag2 = _a.drag, _dragX = _a._dragX;
  return drag2 && !_dragX;
}
function resetAxis(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function resetBox(box, originBox) {
  resetAxis(box.x, originBox.x);
  resetAxis(box.y, originBox.y);
}
function scalePoint(point, scale2, originPoint) {
  var distanceFromOrigin = point - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x = _a.x, y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyAxisTransforms(final, axis, transforms, _a) {
  var _b = __read(_a, 3), key2 = _b[0], scaleKey = _b[1], originKey = _b[2];
  final.min = axis.min;
  final.max = axis.max;
  var axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(final, transforms[key2], transforms[scaleKey], originPoint, transforms.scale);
}
function applyBoxTransforms(finalBox, box, transforms) {
  applyAxisTransforms(finalBox.x, box.x, transforms, xKeys);
  applyAxisTransforms(finalBox.y, box.y, transforms, yKeys);
}
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  var originPoint = mix(axis.min, axis.max, origin) - translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, _a) {
  var _b = __read(_a, 3), key2 = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms[key2], transforms[scaleKey], transforms[originKey], transforms.scale);
}
function removeBoxTransforms(box, transforms) {
  removeAxisTransforms(box.x, transforms, xKeys);
  removeAxisTransforms(box.y, transforms, yKeys);
}
function applyTreeDeltas(box, treeScale, treePath) {
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node;
  var delta2;
  for (var i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta2 = node.getLayoutState().delta;
    treeScale.x *= delta2.x.scale;
    treeScale.y *= delta2.y.scale;
    applyBoxDelta(box, delta2);
    if (isDraggable(node)) {
      applyBoxTransforms(box, box, node.getLatestValues());
    }
  }
}
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcLength(axis) {
  return axis.max - axis.min;
}
function calcOrigin$1(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clampProgress(origin);
}
function updateAxisDelta(delta2, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta2.origin = origin;
  delta2.originPoint = mix(source.min, source.max, delta2.origin);
  delta2.scale = calcLength(target) / calcLength(source);
  if (isNear(delta2.scale, 1, 1e-4))
    delta2.scale = 1;
  delta2.translate = mix(target.min, target.max, delta2.origin) - delta2.originPoint;
  if (isNear(delta2.translate))
    delta2.translate = 0;
}
function updateBoxDelta(delta2, source, target, origin) {
  updateAxisDelta(delta2.x, source.x, target.x, defaultOrigin(origin.originX));
  updateAxisDelta(delta2.y, source.y, target.y, defaultOrigin(origin.originY));
}
function defaultOrigin(origin) {
  return typeof origin === "number" ? origin : 0.5;
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(projection, parentProjection) {
  calcRelativeAxis(projection.target.x, projection.relativeTarget.x, parentProjection.target.x);
  calcRelativeAxis(projection.target.y, projection.relativeTarget.y, parentProjection.target.y);
}
function createLayoutState() {
  return {
    isHydrated: false,
    layout: axisBox(),
    layoutCorrected: axisBox(),
    treeScale: { x: 1, y: 1 },
    delta: delta(),
    deltaFinal: delta(),
    deltaTransform: ""
  };
}
function buildLayoutProjectionTransform(_a, treeScale, latestTransform) {
  var x = _a.x, y = _a.y;
  var xTranslate = x.translate / treeScale.x;
  var yTranslate = y.translate / treeScale.y;
  var transform = "translate3d(" + xTranslate + "px, " + yTranslate + "px, 0) ";
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform += "rotate(" + rotate + ") ";
    if (rotateX)
      transform += "rotateX(" + rotateX + ") ";
    if (rotateY)
      transform += "rotateY(" + rotateY + ") ";
  }
  transform += "scale(" + x.scale + ", " + y.scale + ")";
  return !latestTransform && transform === identityProjection ? "" : transform;
}
function buildLayoutProjectionTransformOrigin(_a) {
  var deltaFinal = _a.deltaFinal;
  return deltaFinal.x.origin * 100 + "% " + deltaFinal.y.origin * 100 + "% 0";
}
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options2 = _a.options;
      return animateVisualElement(visualElement2, animation, options2);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate2 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = __rest2(resolved, ["transition", "transitionEnd"]);
      acc = Object.assign(Object.assign(Object.assign({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key2) {
    return allAnimatedKeys[key2] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate2 = makeAnimator(visualElement2);
  }
  function animateChanges(options2, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = /* @__PURE__ */ new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i2) {
      var type = reversePriorityOrder[i2];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = Object.assign({}, encounteredKeys);
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        return "continue";
      }
      var shouldAnimateType = variantsHaveChanged(typeState.prevProp, prop) || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i2 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = Object.assign(Object.assign({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key22) {
        shouldAnimateType = true;
        removedKeys.delete(key22);
        typeState.needsAnimating[key22] = true;
      };
      for (var key2 in allKeys) {
        var next = resolvedValues[key2];
        var prev = prevResolvedValues[key2];
        if (encounteredKeys.hasOwnProperty(key2))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev)) {
              markToAnimate(key2);
            } else {
              typeState.protectedKeys[key2] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key2);
          } else {
            removedKeys.add(key2);
          }
        } else if (next !== void 0 && removedKeys.has(key2)) {
          markToAnimate(key2);
        } else {
          typeState.protectedKeys[key2] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = Object.assign(Object.assign({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, __spreadArray([], __read(definitionList.map(function(animation) {
          return {
            animation,
            options: Object.assign({ type }, options2)
          };
        }))));
      }
    };
    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }
    allAnimatedKeys = Object.assign({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key2) {
        var fallbackTarget = visualElement2.getBaseTarget(key2);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key2] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate2(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options2) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    return animateChanges(options2, type);
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function variantsHaveChanged(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      return names.forEach(function(name) {
        var _a;
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        var on = "on" + name;
        var propListener = props[on];
        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i) {
    lifecycles["on" + names[i]] = function(handler2) {
      return manager.add(handler2);
    };
    lifecycles["notify" + names[i]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, __spreadArray([], __read(args)));
    };
  });
  return lifecycles;
}
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key2 in next) {
    var nextValue = next[key2];
    var prevValue = prev[key2];
    if (isMotionValue(nextValue)) {
      element.addValue(key2, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key2, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key2)) {
        var existingValue = element.getValue(key2);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key2, motionValue((_a = element.getStaticValue(key2)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key2 in prev) {
    if (next[key2] === void 0)
      element.removeValue(key2);
  }
  return next;
}
function updateLayoutDeltas(_a, _b, treePath, transformOrigin) {
  var delta2 = _a.delta, layout = _a.layout, layoutCorrected = _a.layoutCorrected, treeScale = _a.treeScale;
  var target = _b.target;
  resetBox(layoutCorrected, layout);
  applyTreeDeltas(layoutCorrected, treeScale, treePath);
  updateBoxDelta(delta2, layoutCorrected, target, transformOrigin);
}
function calcRelativeOffsetAxis(parent, child) {
  return {
    min: child.min - parent.min,
    max: child.max - parent.min
  };
}
function calcRelativeOffset(parent, child) {
  return {
    x: calcRelativeOffsetAxis(parent.x, child.x),
    y: calcRelativeOffsetAxis(parent.y, child.y)
  };
}
function setCurrentViewportBox(visualElement2) {
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent) {
    visualElement2.rebaseProjectionTarget();
    return;
  }
  var relativeOffset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  eachAxis(function(axis) {
    visualElement2.setProjectionTargetAxis(axis, relativeOffset[axis].min, relativeOffset[axis].max, true);
  });
}
function fireResolveRelativeTargetBox(child) {
  child.resolveRelativeTargetBox();
}
function fireUpdateLayoutProjection(child) {
  child.updateLayoutProjection();
}
function isValidMotionProp(key2) {
  return validMotionProps.has(key2);
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}
function isProjecting(visualElement2) {
  var isEnabled = visualElement2.projection.isEnabled;
  return isEnabled || visualElement2.shouldResetTransform();
}
function collectProjectingAncestors(visualElement2, ancestors) {
  if (ancestors === void 0) {
    ancestors = [];
  }
  var parent = visualElement2.parent;
  if (parent)
    collectProjectingAncestors(parent, ancestors);
  if (isProjecting(visualElement2))
    ancestors.push(visualElement2);
  return ancestors;
}
function collectProjectingChildren(visualElement2) {
  var children = [];
  var addChild = function(child) {
    if (isProjecting(child))
      children.push(child);
    child.children.forEach(addChild);
  };
  visualElement2.children.forEach(addChild);
  return children.sort(compareByDepth);
}
function updateLayoutMeasurement(visualElement2) {
  if (visualElement2.shouldResetTransform())
    return;
  var layoutState = visualElement2.getLayoutState();
  visualElement2.notifyBeforeLayoutMeasure(layoutState.layout);
  layoutState.isHydrated = true;
  layoutState.layout = visualElement2.measureViewportBox();
  layoutState.layoutCorrected = copyAxisBox(layoutState.layout);
  visualElement2.notifyLayoutMeasure(layoutState.layout, visualElement2.prevViewportBox || layoutState.layout);
  es_default.update(function() {
    return visualElement2.rebaseProjectionTarget();
  });
}
function snapshotViewportBox(visualElement2, nc) {
  if (visualElement2.shouldResetTransform())
    return;
  if (!nc) visualElement2.prevViewportBox = visualElement2.measureViewportBox(false);
  visualElement2.rebaseProjectionTarget(false, visualElement2.prevViewportBox);
}
function pushJob(stack, job, pointer) {
  if (!stack[pointer])
    stack[pointer] = [];
  stack[pointer].push(job);
}
function batchLayout(callback) {
  unresolvedJobs.add(callback);
  return function() {
    return unresolvedJobs.delete(callback);
  };
}
function flushLayout() {
  if (!unresolvedJobs.size)
    return;
  var pointer = 0;
  var reads = [[]];
  var writes = [];
  var setRead = function(job) {
    return pushJob(reads, job, pointer);
  };
  var setWrite = function(job) {
    pushJob(writes, job, pointer);
    pointer++;
  };
  unresolvedJobs.forEach(function(callback) {
    callback(setRead, setWrite);
    pointer = 0;
  });
  unresolvedJobs.clear();
  es_default.postRender(function() {
    setTimeout(function() {
      return false;
    }, 10);
  });
  var numStacks = writes.length;
  for (var i = 0; i <= numStacks; i++) {
    reads[i] && reads[i].forEach(executeJob);
    writes[i] && writes[i].forEach(executeJob);
  }
}
function createBatcher() {
  var queue = /* @__PURE__ */ new Set();
  return {
    add: function(child) {
      return queue.add(child);
    },
    flush: function(_a) {
      var _b = _a === void 0 ? defaultHandler : _a, layoutReady = _b.layoutReady, parent = _b.parent;
      batchLayout(function(read, write) {
        var order2 = Array.from(queue).sort(compareByDepth);
        var ancestors = parent ? collectProjectingAncestors(parent) : [];
        write(function() {
          var allElements = __spreadArray(__spreadArray([], __read(ancestors)), __read(order2));
          allElements.forEach(function(element) {
            return element.resetTransform();
          });
        });
        read(function() {
          order2.forEach(updateLayoutMeasurement);
        });
        write(function() {
          ancestors.forEach(function(element) {
            return element.restoreTransform();
          });
          order2.forEach(layoutReady);
        });
        read(function() {
          order2.forEach(function(child) {
            if (child.isPresent)
              child.presence = Presence.Present;
          });
        });
        write(function() {
          flushSync.preRender();
          flushSync.render();
        });
        read(function() {
          es_default.postRender(function() {
            return order2.forEach(assignProjectionToSnapshot);
          });
          queue.clear();
        });
      });
      flushLayout();
    }
  };
}
function assignProjectionToSnapshot(child) {
  child.prevViewportBox = child.projection.target;
}
function isSharedLayout(context) {
  return !!context.forceUpdate;
}
function loadFeatures(features) {
  for (var key2 in features) {
    var Component = features[key2];
    if (Component !== null) {
      featureDefinitions[key2].Component = Component;
    }
  }
}
function sortTransformProps(a2, b2) {
  return transformProps.indexOf(a2) - transformProps.indexOf(b2);
}
function isTransformProp(key2) {
  return transformPropSet.has(key2);
}
function isTransformOriginProp(key2) {
  return transformOriginProps.has(key2);
}
function isForcedMotionValue(key2, _a) {
  var layout = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key2) || isTransformOriginProp(key2) || (layout || layoutId !== void 0) && !!valueScaleCorrection[key2];
}
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i = 0; i < numTransformKeys; i++) {
    var key2 = transformKeys2[i];
    transformString += (translateAlias[key2] || key2) + "(" + transform[key2] + ") ";
    if (key2 === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return originX + " " + originY + " " + originZ;
}
function isCSSVariable$1(key2) {
  return key2.startsWith("--");
}
function buildHTMLStyles(state, latestValues, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var _a;
  var style = state.style, vars = state.vars, transform = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key2 in latestValues) {
    var value = latestValues[key2];
    if (isCSSVariable$1(key2)) {
      vars[key2] = value;
      continue;
    }
    var valueType = numberValueTypes[key2];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key2)) {
      hasTransform = true;
      transform[key2] = valueAsType;
      transformKeys2.push(key2);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key2)) {
      transformOrigin[key2] = valueAsType;
      hasTransformOrigin = true;
    } else {
      if (layoutState && projection && layoutState.isHydrated && valueScaleCorrection[key2]) {
        var correctedValue = valueScaleCorrection[key2].process(value, layoutState, projection);
        var applyTo = valueScaleCorrection[key2].applyTo;
        if (applyTo) {
          var num = applyTo.length;
          for (var i = 0; i < num; i++) {
            style[applyTo[i]] = correctedValue;
          }
        } else {
          style[key2] = correctedValue;
        }
      } else {
        style[key2] = valueAsType;
      }
    }
  }
  if (layoutState && projection && buildProjectionTransform && buildProjectionTransformOrigin) {
    style.transform = buildProjectionTransform(layoutState.deltaFinal, layoutState.treeScale, hasTransform ? transform : void 0);
    if (transformTemplate) {
      style.transform = transformTemplate(transform, style.transform);
    }
    style.transformOrigin = buildProjectionTransformOrigin(layoutState);
  } else {
    if (hasTransform) {
      style.transform = buildTransform(state, options2, transformIsNone, transformTemplate);
    }
    if (hasTransformOrigin) {
      style.transformOrigin = buildTransformOrigin(transformOrigin);
    }
  }
}
function copyRawValuesOnly(target, source, props) {
  for (const key2 in source) {
    if (!isMotionValue(source[key2]) && !isForcedMotionValue(key2, props)) {
      target[key2] = source[key2];
    }
  }
}
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return pxOriginX + " " + pxOriginY;
}
function buildSVGPath(attrs, totalLength, length, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  var keys = camelKeys;
  attrs[keys.offset] = progressToPixels(-offset, totalLength);
  var pathLength = progressToPixels(length, totalLength);
  var pathSpacing = progressToPixels(spacing, totalLength);
  attrs[keys.array] = pathLength + " " + pathSpacing;
}
function buildSVGAttrs(state, _a, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = __rest2(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, projection, layoutState, options2, transformTemplate, buildProjectionTransform, buildProjectionTransformOrigin);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style = state.style, dimensions = state.dimensions, totalPathLength = state.totalPathLength;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (totalPathLength !== void 0 && pathLength !== void 0) {
    buildSVGPath(attrs, totalPathLength, pathLength, pathSpacing, pathOffset);
  }
}
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key2 in props) {
    if (shouldForward(key2) || forwardMotionProps === true && isValidMotionProp(key2) || !isDom && !isValidMotionProp(key2)) {
      filteredProps[key2] = props[key2];
    }
  }
  return filteredProps;
}
function getBoundingBox(element, transformPagePoint) {
  var box = element.getBoundingClientRect();
  return convertBoundingBoxToAxisBox(transformBoundingBox(box, transformPagePoint));
}
function isCSSVariable(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  var _a = __read(match, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
function getVariableValue(current, element, depth) {
  var _a = __read(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable(fallback)) {
    return getVariableValue(fallback, element);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = __rest2(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof HTMLElement))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = Object.assign({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key2 in target) {
    var current = target[key2];
    if (!isCSSVariable(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key2] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key2]) !== null && _b !== void 0 ? _b : transitionEnd[key2] = current;
  }
  return { target, transitionEnd };
}
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key2) {
    var value = visualElement2.getValue(key2);
    if (value !== void 0) {
      removedTransforms.push([key2, value.get()]);
      value.set(key2.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}
function scrapeMotionValuesFromProps$1(props) {
  var style = props.style;
  var newValues = {};
  for (var key2 in style) {
    if (isMotionValue(style[key2]) || isForcedMotionValue(key2, props)) {
      newValues[key2] = style[key2];
    }
  }
  return newValues;
}
function renderHTML(element, _a) {
  var style = _a.style, vars = _a.vars;
  Object.assign(element.style, style);
  for (var key2 in vars) {
    element.style.setProperty(key2, vars[key2]);
  }
}
function getComputedStyle$1(element) {
  return window.getComputedStyle(element);
}
function scrapeMotionValuesFromProps(props) {
  var newValues = scrapeMotionValuesFromProps$1(props);
  for (var key2 in props) {
    if (isMotionValue(props[key2])) {
      var targetKey = key2 === "x" || key2 === "y" ? "attr" + key2.toUpperCase() : key2;
      newValues[targetKey] = props[key2];
    }
  }
  return newValues;
}
function renderSVG(element, renderState) {
  renderHTML(element, renderState);
  for (var key2 in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key2) ? camelToDash(key2) : key2, renderState.attrs[key2]);
  }
}
function isPath(element) {
  return element.tagName === "path";
}
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial2 = props.initial, animate2 = props.animate;
    return {
      initial: initial2 === false || isVariantLabel(initial2) ? initial2 : void 0,
      animate: isVariantLabel(animate2) ? animate2 : void 0
    };
  }
  return props.inherit !== false ? context || {} : {};
}
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const blockInitialAnimation = presenceContext?.initial === false;
  const motionValues = scrapeMotionValues(props);
  for (const key2 in motionValues) {
    values[key2] = resolveMotionValue(motionValues[key2]);
  }
  let { initial: initial2, animate: animate2 } = props;
  const isControllingVariants = checkIfControllingVariants(props);
  const isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial2 !== null && initial2 !== void 0 ? initial2 : initial2 = context.initial;
    animate2 !== null && animate2 !== void 0 ? animate2 : animate2 = context.animate;
  }
  const variantToSet = blockInitialAnimation || initial2 === false ? animate2 : initial2;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved) return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key2 in target) values[key2] = target[key2];
      for (const key2 in transitionEnd) values[key2] = transitionEnd[key2];
    });
  }
  return values;
}
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useMotionRef(visualState, visualElement2, externalRef) {
  return function(instance) {
    var _a;
    instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
    if (visualElement2) {
      instance ? visualElement2.mount(instance) : visualElement2.unmount();
    }
    if (externalRef) {
      if (typeof externalRef === "function") {
        externalRef(instance);
      } else if (isRefObject(externalRef)) {
        externalRef.current = instance;
      }
    }
  };
}
function addDomEvent(target, eventName, handler2, options2) {
  target.addEventListener(eventName, handler2, options2);
  return function() {
    return target.removeEventListener(eventName, handler2, options2);
  };
}
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function pointFromMouse(point, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
function getViewportPointFromEvent(event) {
  return extractEventInfo(event, "client");
}
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler2, options2) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler2, eventName === "pointerdown"), options2);
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a2, b2) {
  return { x: a2.x - b2.x, y: a2.y - b2.y };
}
function getPanInfo(_a, history) {
  var point = _a.point;
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
function createLock(name) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
function createHoverEvent(visualElement2, isActive, callback) {
  return (event, info) => {
    if (!isMouseEvent(event) || isDragActive()) return;
    callback?.(event, info);
    visualElement2.animationState?.setActive(AnimationType.Hover, isActive);
  };
}
function applyConstraints(point, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcConstrainedMinPoint(point, length, progress2, constraints, elastic) {
  var min = point - length * progress2;
  return constraints ? applyConstraints(min, constraints, elastic) : min;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = __read([max, min], 2), min = _a[0], max = _a[1];
  }
  return {
    min: layoutAxis.min + min,
    max: layoutAxis.min + max
  };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcPositionFromProgress(axis, constraints, progress2) {
  var axisLength = axis.max - axis.min;
  var min = mix(constraints.min, constraints.max - axisLength, progress2);
  return { min, max: min + axisLength };
}
function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
function resolveDragElastic(dragElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
function convertToRelativeProjection(visualElement2, isLayoutDrag) {
  if (isLayoutDrag === void 0) {
    isLayoutDrag = true;
  }
  var projectionParent = visualElement2.getProjectionParent();
  if (!projectionParent)
    return false;
  var offset;
  if (isLayoutDrag) {
    offset = calcRelativeOffset(projectionParent.projection.target, visualElement2.projection.target);
    removeBoxTransforms(offset, projectionParent.getLatestValues());
  } else {
    offset = calcRelativeOffset(projectionParent.getLayoutState().layout, visualElement2.getLayoutState().layout);
  }
  eachAxis(function(axis) {
    return visualElement2.setProjectionTargetAxis(axis, offset[axis].min, offset[axis].max, true);
  });
  return true;
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var dirty_components, binding_callbacks, render_callbacks, flush_callbacks, resolved_promise, update_scheduled, seen_callbacks, flushidx, Presence, VisibilityAction, SubscriptionManager, isFloat, MotionValue, getDomContext, setDomContext, MotionConfigContext, ScaleCorrectionContext, ScaleCorrectionParentContext, provideScaleCorrection, ScaleCorrectionProvider, secondsToMilliseconds, easingLookup, easingDefinitionToFunction, isEasingArray, isAnimatable, isKeyframesTarget, underDampedSpring, criticallyDampedSpring, linearTween, keyframes2, defaultTransitions, getDefaultTransition, int, numberValueTypes, defaultValueTypes, getDefaultValueType, legacyRepeatWarning, isNumericalString, isCustomValue, resolveFinalValueInKeyframes, testValueType, auto, dimensionValueTypes, findDimensionValueType, valueTypes, findValueType, valueScaleCorrection, zeroDelta, xKeys, yKeys, clampProgress, isMotionValue, createProjectionState, zeroLayout, identityProjection, isAnimationControls, AnimationType, variantPriorityOrder, reversePriorityOrder, numAnimationTypes, names, compareByDepth, FlatTree, visualElement, variantProps, numVariantProps, validMotionProps, PresenceContext, counter, incrementId, usePresence, LayoutGroupContext, unresolvedJobs, executeJob, defaultHandler, SharedLayoutContext, FramerTreeLayoutContext, LazyContext, MotionContext, UseVisualElement, createDefinition, featureDefinitions, UseFeatures, MotionContextProvider, createHtmlRenderState, createSvgRenderState, transformAxes, order, transformProps, transformPropSet, transformOriginProps, translateAlias, getValueAsType, UseInitialMotionValues, UseStyle, UseHTMLProps, progressToPixels, camelKeys, UseSVGProps, shouldForward, emotionIsPropValid_1, UseRender, cssVariableRegex, positionalKeys, isPositionalKey, hasPositionalKey, setAndResetVelocity, isNumOrPxType, BoundingBoxDimension, getPosFromMatrix, getTranslateFromMatrix, transformKeys, nonTranslationalTransformKeys, positionalValues, convertChangedValueTypes, checkAndConvertChangedValueTypes, parseDomVariant, htmlConfig, htmlVisualElement, CAMEL_CASE_PATTERN, REPLACE_TEMPLATE, camelToDash, camelCaseAttributes, svgVisualElement, createDomVisualElement, svgMotionConfig, htmlMotionConfig, UseCreateMotionContext, makeState, UseVisualState, Motion, UseDomEvent, defaultPagePoint, wrapHandler, isBrowser, supportsPointerEvents, supportsTouchEvents, supportsMouseEvents, mouseEventNames, touchEventNames, UsePointerEvent, PanSession, UsePanGesture, isNodeOrChild, globalHorizontalLock, globalVerticalLock, UseTapGesture, UseHoverGesture, UseFocusGesture, createMotionClass, gestureAnimations, defaultElastic, elementDragControls, lastPointerEvent, VisualElementDragControls, UseDrag, drag, Animate, AnimateLayoutContextProvider, Measure, MeasureContextProvider, layoutAnimations, AnimationState, Exit, animations, featureBundle, motion, useCombineMotionValues, useMotionTemplate, css2, MagicCard;
var init_MagicCard = __esm({
  ".svelte-kit/output/server/chunks/MagicCard.js"() {
    init_ssr();
    init_clsx();
    init_bundle_mjs();
    init_es();
    init_es3();
    init_chunks();
    init_tslib_es62();
    init_es2();
    init_hey_listen_es();
    init_escape();
    dirty_components = [];
    binding_callbacks = [];
    render_callbacks = [];
    flush_callbacks = [];
    resolved_promise = /* @__PURE__ */ Promise.resolve();
    update_scheduled = false;
    seen_callbacks = /* @__PURE__ */ new Set();
    flushidx = 0;
    (function(Presence2) {
      Presence2[Presence2["Entering"] = 0] = "Entering";
      Presence2[Presence2["Present"] = 1] = "Present";
      Presence2[Presence2["Exiting"] = 2] = "Exiting";
    })(Presence || (Presence = {}));
    (function(VisibilityAction2) {
      VisibilityAction2[VisibilityAction2["Hide"] = 0] = "Hide";
      VisibilityAction2[VisibilityAction2["Show"] = 1] = "Show";
    })(VisibilityAction || (VisibilityAction = {}));
    SubscriptionManager = /** @class */
    function() {
      function SubscriptionManager2() {
        this.subscriptions = [];
      }
      SubscriptionManager2.prototype.add = function(handler2) {
        var _this = this;
        addUniqueItem(this.subscriptions, handler2);
        return function() {
          return removeItem(_this.subscriptions, handler2);
        };
      };
      SubscriptionManager2.prototype.notify = function(a2, b2, c2) {
        var numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
          return;
        if (numSubscriptions === 1) {
          this.subscriptions[0](a2, b2, c2);
        } else {
          for (var i = 0; i < numSubscriptions; i++) {
            var handler2 = this.subscriptions[i];
            handler2 && handler2(a2, b2, c2);
          }
        }
      };
      SubscriptionManager2.prototype.getSize = function() {
        return this.subscriptions.length;
      };
      SubscriptionManager2.prototype.clear = function() {
        this.subscriptions.length = 0;
      };
      return SubscriptionManager2;
    }();
    isFloat = function(value) {
      return !isNaN(parseFloat(value));
    };
    MotionValue = /** @class */
    function() {
      function MotionValue2(init2, startStopNotifier) {
        var _this = this;
        this.timeDelta = 0;
        this.lastUpdated = 0;
        this.updateSubscribers = new SubscriptionManager();
        this.velocityUpdateSubscribers = new SubscriptionManager();
        this.renderSubscribers = new SubscriptionManager();
        this.canTrackVelocity = false;
        this.updateAndNotify = function(v, render) {
          if (render === void 0) {
            render = true;
          }
          _this.prev = _this.current;
          _this.current = v;
          var _a = getFrameData(), delta2 = _a.delta, timestamp = _a.timestamp;
          if (_this.lastUpdated !== timestamp) {
            _this.timeDelta = delta2;
            _this.lastUpdated = timestamp;
            es_default.postRender(_this.scheduleVelocityCheck);
          }
          if (_this.prev !== _this.current) {
            _this.updateSubscribers.notify(_this.current);
          }
          if (_this.velocityUpdateSubscribers.getSize()) {
            _this.velocityUpdateSubscribers.notify(_this.getVelocity());
          }
          if (render) {
            _this.renderSubscribers.notify(_this.current);
          }
        };
        this.scheduleVelocityCheck = function() {
          return es_default.postRender(_this.velocityCheck);
        };
        this.velocityCheck = function(_a) {
          var timestamp = _a.timestamp;
          if (timestamp !== _this.lastUpdated) {
            _this.prev = _this.current;
            _this.velocityUpdateSubscribers.notify(_this.getVelocity());
          }
        };
        this.hasAnimated = false;
        this.prev = this.current = init2;
        this.canTrackVelocity = isFloat(this.current);
        this.onSubscription = () => {
        };
        this.onUnsubscription = () => {
        };
        if (startStopNotifier) {
          this.onSubscription = () => {
            if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
              const unsub = startStopNotifier();
              this.onUnsubscription = () => {
              };
              if (unsub) {
                this.onUnsubscription = () => {
                  if (this.updateSubscribers.getSize() + this.velocityUpdateSubscribers.getSize() + this.renderSubscribers.getSize() === 0) {
                    unsub();
                  }
                };
              }
            }
          };
        }
      }
      MotionValue2.prototype.onChange = function(subscription) {
        this.onSubscription();
        const unsub = this.updateSubscribers.add(subscription);
        return () => {
          unsub();
          this.onUnsubscription();
        };
      };
      MotionValue2.prototype.subscribe = function(subscription) {
        return this.onChange(subscription);
      };
      MotionValue2.prototype.clearListeners = function() {
        this.updateSubscribers.clear();
        this.onUnsubscription();
      };
      MotionValue2.prototype.onRenderRequest = function(subscription) {
        this.onSubscription();
        subscription(this.get());
        const unsub = this.renderSubscribers.add(subscription);
        return () => {
          unsub();
          this.onUnsubscription();
        };
      };
      MotionValue2.prototype.attach = function(passiveEffect) {
        this.passiveEffect = passiveEffect;
      };
      MotionValue2.prototype.set = function(v, render) {
        if (render === void 0) {
          render = true;
        }
        if (!render || !this.passiveEffect) {
          this.updateAndNotify(v, render);
        } else {
          this.passiveEffect(v, this.updateAndNotify);
        }
      };
      MotionValue2.prototype.update = function(v) {
        this.set(v(this.get()));
      };
      MotionValue2.prototype.get = function() {
        this.onSubscription();
        const curr = this.current;
        this.onUnsubscription();
        return curr;
      };
      MotionValue2.prototype.getPrevious = function() {
        return this.prev;
      };
      MotionValue2.prototype.getVelocity = function() {
        this.onSubscription();
        const vel = this.canTrackVelocity ? (
          // These casts could be avoided if parseFloat would be typed better
          velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
        ) : 0;
        this.onUnsubscription();
        return vel;
      };
      MotionValue2.prototype.start = function(animation) {
        var _this = this;
        this.stop();
        return new Promise(function(resolve2) {
          _this.hasAnimated = true;
          _this.stopAnimation = animation(resolve2);
        }).then(function() {
          return _this.clearAnimation();
        });
      };
      MotionValue2.prototype.stop = function() {
        if (this.stopAnimation)
          this.stopAnimation();
        this.clearAnimation();
      };
      MotionValue2.prototype.isAnimating = function() {
        return !!this.stopAnimation;
      };
      MotionValue2.prototype.clearAnimation = function() {
        this.stopAnimation = null;
      };
      MotionValue2.prototype.destroy = function() {
        this.updateSubscribers.clear();
        this.renderSubscribers.clear();
        this.stop();
        this.onUnsubscription();
      };
      return MotionValue2;
    }();
    getDomContext = (name, el) => {
      if (!el || !window) {
        return void 0;
      }
      let par = el;
      while (par = par.parentNode) {
        if (par.motionDomContext && par.motionDomContext.has(name)) {
          return par.motionDomContext.get(name);
        }
      }
      return void 0;
    };
    setDomContext = (name, el, value) => {
      if (el && window) {
        if (!el.motionDomContext) {
          el.motionDomContext = /* @__PURE__ */ new Map();
        }
        el.motionDomContext.set(name, value);
      }
    };
    MotionConfigContext = (c2) => getDomContext("MotionConfig", c2) || writable({
      transformPagePoint: function(p) {
        return p;
      },
      isStatic: false
    });
    ScaleCorrectionContext = (isCustom) => getDomContext("ScaleCorrection", isCustom) || writable([]);
    ScaleCorrectionParentContext = () => writable([]);
    provideScaleCorrection = (isCustom) => {
      const fromParent = getContext(ScaleCorrectionContext) || ScaleCorrectionContext(isCustom);
      const ctx = ScaleCorrectionContext();
      setContext(ScaleCorrectionContext, ctx);
      setDomContext("ScaleCorrection", isCustom, ctx);
      setContext(ScaleCorrectionParentContext, fromParent);
    };
    ScaleCorrectionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { isCustom } = $$props;
      provideScaleCorrection(isCustom);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      return `${slots.default ? slots.default({}) : ``}`;
    });
    secondsToMilliseconds = function(seconds) {
      return seconds * 1e3;
    };
    easingLookup = {
      linear,
      easeIn,
      easeInOut,
      easeOut,
      circIn,
      circInOut,
      circOut,
      backIn,
      backInOut,
      backOut,
      anticipate,
      bounceIn,
      bounceInOut,
      bounceOut
    };
    easingDefinitionToFunction = function(definition) {
      if (Array.isArray(definition)) {
        var _a = __read(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
        return cubicBezier(x1, y1, x2, y2);
      } else if (typeof definition === "string") {
        return easingLookup[definition];
      }
      return definition;
    };
    isEasingArray = function(ease) {
      return Array.isArray(ease) && typeof ease[0] !== "number";
    };
    isAnimatable = function(key2, value) {
      if (key2 === "zIndex")
        return false;
      if (typeof value === "number" || Array.isArray(value))
        return true;
      if (typeof value === "string" && // It's animatable if we have a string
      complex.test(value) && // And it contains numbers and/or colors
      !value.startsWith("url(")) {
        return true;
      }
      return false;
    };
    isKeyframesTarget = function(v) {
      return Array.isArray(v);
    };
    underDampedSpring = function() {
      return {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restDelta: 0.5,
        restSpeed: 10
      };
    };
    criticallyDampedSpring = function(to) {
      return {
        type: "spring",
        stiffness: 550,
        damping: to === 0 ? 2 * Math.sqrt(550) : 30,
        restDelta: 0.01,
        restSpeed: 10
      };
    };
    linearTween = function() {
      return {
        type: "keyframes",
        ease: "linear",
        duration: 0.3
      };
    };
    keyframes2 = function(values) {
      return {
        type: "keyframes",
        duration: 0.8,
        values
      };
    };
    defaultTransitions = {
      x: underDampedSpring,
      y: underDampedSpring,
      z: underDampedSpring,
      rotate: underDampedSpring,
      rotateX: underDampedSpring,
      rotateY: underDampedSpring,
      rotateZ: underDampedSpring,
      scaleX: criticallyDampedSpring,
      scaleY: criticallyDampedSpring,
      scale: criticallyDampedSpring,
      opacity: linearTween,
      backgroundColor: linearTween,
      color: linearTween,
      default: criticallyDampedSpring
    };
    getDefaultTransition = function(valueKey, to) {
      var transitionFactory;
      if (isKeyframesTarget(to)) {
        transitionFactory = keyframes2;
      } else {
        transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
      }
      return Object.assign({ to }, transitionFactory(to));
    };
    int = Object.assign(Object.assign({}, number), { transform: Math.round });
    numberValueTypes = {
      // Border props
      borderWidth: px,
      borderTopWidth: px,
      borderRightWidth: px,
      borderBottomWidth: px,
      borderLeftWidth: px,
      borderRadius: px,
      radius: px,
      borderTopLeftRadius: px,
      borderTopRightRadius: px,
      borderBottomRightRadius: px,
      borderBottomLeftRadius: px,
      // Positioning props
      width: px,
      maxWidth: px,
      height: px,
      maxHeight: px,
      size: px,
      top: px,
      right: px,
      bottom: px,
      left: px,
      // Spacing props
      padding: px,
      paddingTop: px,
      paddingRight: px,
      paddingBottom: px,
      paddingLeft: px,
      margin: px,
      marginTop: px,
      marginRight: px,
      marginBottom: px,
      marginLeft: px,
      // Transform props
      rotate: degrees,
      rotateX: degrees,
      rotateY: degrees,
      rotateZ: degrees,
      scale,
      scaleX: scale,
      scaleY: scale,
      scaleZ: scale,
      skew: degrees,
      skewX: degrees,
      skewY: degrees,
      distance: px,
      translateX: px,
      translateY: px,
      translateZ: px,
      x: px,
      y: px,
      z: px,
      perspective: px,
      transformPerspective: px,
      opacity: alpha,
      originX: progressPercentage,
      originY: progressPercentage,
      originZ: px,
      // Misc
      zIndex: int,
      // SVG
      fillOpacity: alpha,
      strokeOpacity: alpha,
      numOctaves: int
    };
    defaultValueTypes = Object.assign(Object.assign({}, numberValueTypes), {
      // Color props
      color,
      backgroundColor: color,
      outlineColor: color,
      fill: color,
      stroke: color,
      // Border props
      borderColor: color,
      borderTopColor: color,
      borderRightColor: color,
      borderBottomColor: color,
      borderLeftColor: color,
      filter,
      WebkitFilter: filter
    });
    getDefaultValueType = function(key2) {
      return defaultValueTypes[key2];
    };
    legacyRepeatWarning = false;
    isNumericalString = function(v) {
      return /^\-?\d*\.?\d+$/.test(v);
    };
    isCustomValue = function(v) {
      return Boolean(v && typeof v === "object" && v.mix && v.toValue);
    };
    resolveFinalValueInKeyframes = function(v) {
      return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
    };
    testValueType = function(v) {
      return function(type) {
        return type.test(v);
      };
    };
    auto = {
      test: function(v) {
        return v === "auto";
      },
      parse: function(v) {
        return v;
      }
    };
    dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
    findDimensionValueType = function(v) {
      return dimensionValueTypes.find(testValueType(v));
    };
    valueTypes = __spreadArray(__spreadArray([], __read(dimensionValueTypes)), [color, complex]);
    findValueType = function(v) {
      return valueTypes.find(testValueType(v));
    };
    valueScaleCorrection = {};
    zeroDelta = {
      translate: 0,
      scale: 1,
      origin: 0,
      originPoint: 0
    };
    xKeys = ["x", "scaleX", "originX"];
    yKeys = ["y", "scaleY", "originY"];
    clampProgress = function(v) {
      return clamp(0, 1, v);
    };
    isMotionValue = function(value) {
      return value !== null && typeof value === "object" && value.getVelocity;
    };
    createProjectionState = function() {
      return {
        isEnabled: false,
        isTargetLocked: false,
        target: axisBox(),
        targetFinal: axisBox()
      };
    };
    zeroLayout = createLayoutState();
    identityProjection = buildLayoutProjectionTransform(zeroLayout.delta, zeroLayout.treeScale, { x: 1, y: 1 });
    isAnimationControls = function(v) {
      return typeof v === "object" && typeof v.start === "function";
    };
    (function(AnimationType2) {
      AnimationType2["Animate"] = "animate";
      AnimationType2["Hover"] = "whileHover";
      AnimationType2["Tap"] = "whileTap";
      AnimationType2["Drag"] = "whileDrag";
      AnimationType2["Focus"] = "whileFocus";
      AnimationType2["Exit"] = "exit";
    })(AnimationType || (AnimationType = {}));
    variantPriorityOrder = [
      AnimationType.Animate,
      AnimationType.Hover,
      AnimationType.Tap,
      AnimationType.Drag,
      AnimationType.Focus,
      AnimationType.Exit
    ];
    reversePriorityOrder = __spreadArray([], __read(variantPriorityOrder)).reverse();
    numAnimationTypes = variantPriorityOrder.length;
    names = [
      "LayoutMeasure",
      "BeforeLayoutMeasure",
      "LayoutUpdate",
      "ViewportBoxUpdate",
      "Update",
      "Render",
      "AnimationComplete",
      "LayoutAnimationComplete",
      "AnimationStart",
      "SetAxisTarget",
      "Unmount"
    ];
    compareByDepth = function(a2, b2) {
      return a2.depth - b2.depth;
    };
    FlatTree = /** @class */
    function() {
      function FlatTree2() {
        this.children = [];
        this.isDirty = false;
      }
      FlatTree2.prototype.add = function(child) {
        addUniqueItem(this.children, child);
        this.isDirty = true;
      };
      FlatTree2.prototype.remove = function(child) {
        removeItem(this.children, child);
        this.isDirty = true;
      };
      FlatTree2.prototype.forEach = function(callback) {
        this.isDirty && this.children.sort(compareByDepth);
        var numChildren = this.children.length;
        for (var i = 0; i < numChildren; i++) {
          callback(this.children[i]);
        }
      };
      return FlatTree2;
    }();
    visualElement = function(_a) {
      var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, resetTransform = _a.resetTransform, restoreTransform = _a.restoreTransform, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps2 = _a.scrapeMotionValuesFromProps;
      return function(_a2, options2) {
        var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState;
        if (options2 === void 0) {
          options2 = {};
        }
        var latestValues = visualState.latestValues, renderState = visualState.renderState;
        var instance;
        var lifecycles = createLifecycles();
        var projection = createProjectionState();
        var projectionParent;
        var leadProjection = projection;
        var leadLatestValues = latestValues;
        var unsubscribeFromLeadVisualElement;
        var layoutState = createLayoutState();
        var crossfader;
        var hasViewportBoxUpdated = false;
        var values = /* @__PURE__ */ new Map();
        var valueSubscriptions = /* @__PURE__ */ new Map();
        var prevMotionValues = {};
        var projectionTargetProgress;
        var baseTarget = Object.assign({}, latestValues);
        var removeFromVariantTree;
        function render() {
          if (!instance)
            return;
          if (element.isProjectionReady()) {
            applyBoxTransforms(leadProjection.targetFinal, leadProjection.target, leadLatestValues);
            updateBoxDelta(layoutState.deltaFinal, layoutState.layoutCorrected, leadProjection.targetFinal, latestValues);
          }
          triggerBuild();
          renderInstance(instance, renderState);
        }
        function triggerBuild() {
          var valuesToRender = latestValues;
          if (crossfader && crossfader.isActive()) {
            var crossfadedValues = crossfader.getCrossfadeState(element);
            if (crossfadedValues)
              valuesToRender = crossfadedValues;
          }
          build(element, renderState, valuesToRender, leadProjection, layoutState, options2, props);
        }
        function update2() {
          lifecycles.notifyUpdate(latestValues);
        }
        function updateLayoutProjection() {
          if (!element.isProjectionReady())
            return;
          var delta2 = layoutState.delta, treeScale = layoutState.treeScale;
          var prevTreeScaleX = treeScale.x;
          var prevTreeScaleY = treeScale.y;
          var prevDeltaTransform = layoutState.deltaTransform;
          updateLayoutDeltas(layoutState, leadProjection, element.path, latestValues);
          hasViewportBoxUpdated && element.notifyViewportBoxUpdate(leadProjection.target, delta2);
          hasViewportBoxUpdated = false;
          var deltaTransform = buildLayoutProjectionTransform(delta2, treeScale);
          if (deltaTransform !== prevDeltaTransform || // Also compare calculated treeScale, for values that rely on this only for scale correction
          prevTreeScaleX !== treeScale.x || prevTreeScaleY !== treeScale.y) {
            element.scheduleRender();
          }
          layoutState.deltaTransform = deltaTransform;
        }
        function updateTreeLayoutProjection() {
          element.layoutTree.forEach(fireUpdateLayoutProjection);
        }
        function bindToMotionValue(key22, value2) {
          var removeOnChange = value2.onChange(function(latestValue) {
            latestValues[key22] = latestValue;
            props.onUpdate && es_default.update(update2, false, true);
          });
          var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
          valueSubscriptions.set(key22, function() {
            removeOnChange();
            removeOnRenderRequest();
          });
        }
        var initialMotionValues = scrapeMotionValuesFromProps2(props);
        for (var key2 in initialMotionValues) {
          var value = initialMotionValues[key2];
          if (latestValues[key2] !== void 0 && isMotionValue(value)) {
            value.set(latestValues[key2], false);
          }
        }
        var isControllingVariants = checkIfControllingVariants(props);
        var isVariantNode = checkIfVariantNode(props);
        var element = Object.assign(Object.assign({
          treeType,
          /**
           * This is a mirror of the internal instance prop, which keeps
           * VisualElement type-compatible with React's RefObject.
           */
          current: null,
          /**
           * The depth of this visual element within the visual element tree.
           */
          depth: parent ? parent.depth + 1 : 0,
          parent,
          children: /* @__PURE__ */ new Set(),
          /**
           * An ancestor path back to the root visual element. This is used
           * by layout projection to quickly recurse back up the tree.
           */
          path: parent ? __spreadArray(__spreadArray([], __read(parent.path)), [parent]) : [],
          layoutTree: parent ? parent.layoutTree : new FlatTree(),
          /**
           *
           */
          presenceId,
          projection,
          /**
           * If this component is part of the variant tree, it should track
           * any children that are also part of the tree. This is essentially
           * a shadow tree to simplify logic around how to stagger over children.
           */
          variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
          /**
           * Whether this instance is visible. This can be changed imperatively
           * by AnimateSharedLayout, is analogous to CSS's visibility in that
           * hidden elements should take up layout, and needs enacting by the configured
           * render function.
           */
          isVisible: void 0,
          /**
           * Normally, if a component is controlled by a parent's variants, it can
           * rely on that ancestor to trigger animations further down the tree.
           * However, if a component is created after its parent is mounted, the parent
           * won't trigger that mount animation so the child needs to.
           *
           * TODO: This might be better replaced with a method isParentMounted
           */
          manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
          /**
           * This can be set by AnimatePresence to force components that mount
           * at the same time as it to mount as if they have initial={false} set.
           */
          blockInitialAnimation,
          /**
           * Determine whether this component has mounted yet. This is mostly used
           * by variant children to determine whether they need to trigger their
           * own animations on mount.
           */
          isMounted: function() {
            return Boolean(instance);
          },
          mount: function(newInstance) {
            instance = element.current = newInstance;
            element.pointTo(element);
            if (isVariantNode && parent && !isControllingVariants) {
              removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
            }
            parent === null || parent === void 0 ? void 0 : parent.children.add(element);
          },
          /**
           *
           */
          unmount: function() {
            cancelSync.update(update2);
            cancelSync.render(render);
            cancelSync.preRender(element.updateLayoutProjection);
            valueSubscriptions.forEach(function(remove) {
              return remove();
            });
            element.stopLayoutAnimation();
            element.layoutTree.remove(element);
            removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
            parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
            unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
            lifecycles.clearAllListeners();
          },
          /**
           * Add a child visual element to our set of children.
           */
          addVariantChild: function(child) {
            var _a3;
            var closestVariantNode = element.getClosestVariantNode();
            if (closestVariantNode) {
              (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
              return function() {
                return closestVariantNode.variantChildren.delete(child);
              };
            }
          },
          sortNodePosition: function(other) {
            if (!sortNodePosition || treeType !== other.treeType)
              return 0;
            return sortNodePosition(element.getInstance(), other.getInstance());
          },
          /**
           * Returns the closest variant node in the tree starting from
           * this visual element.
           */
          getClosestVariantNode: function() {
            return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
          },
          /**
           * A method that schedules an update to layout projections throughout
           * the tree. We inherit from the parent so there's only ever one
           * job scheduled on the next frame - that of the root visual element.
           */
          scheduleUpdateLayoutProjection: parent ? parent.scheduleUpdateLayoutProjection : function() {
            return es_default.preRender(element.updateTreeLayoutProjection, false, true);
          },
          /**
           * Expose the latest layoutId prop.
           */
          getLayoutId: function() {
            return props.layoutId;
          },
          /**
           * Returns the current instance.
           */
          getInstance: function() {
            return instance;
          },
          /**
           * Get/set the latest static values.
           */
          getStaticValue: function(key22) {
            return latestValues[key22];
          },
          setStaticValue: function(key22, value2) {
            return latestValues[key22] = value2;
          },
          /**
           * Returns the latest motion value state. Currently only used to take
           * a snapshot of the visual element - perhaps this can return the whole
           * visual state
           */
          getLatestValues: function() {
            return latestValues;
          },
          /**
           * Set the visiblity of the visual element. If it's changed, schedule
           * a render to reflect these changes.
           */
          setVisibility: function(visibility) {
            if (element.isVisible === visibility)
              return;
            element.isVisible = visibility;
            element.scheduleRender();
          },
          /**
           * Make a target animatable by Popmotion. For instance, if we're
           * trying to animate width from 100px to 100vw we need to measure 100vw
           * in pixels to determine what we really need to animate to. This is also
           * pluggable to support Framer's custom value types like Color,
           * and CSS variables.
           */
          makeTargetAnimatable: function(target, canMutate) {
            if (canMutate === void 0) {
              canMutate = true;
            }
            return makeTargetAnimatable(element, target, props, canMutate);
          },
          // Motion values ========================
          /**
           * Add a motion value and bind it to this visual element.
           */
          addValue: function(key22, value2) {
            if (element.hasValue(key22))
              element.removeValue(key22);
            values.set(key22, value2);
            latestValues[key22] = value2.get();
            bindToMotionValue(key22, value2);
          },
          /**
           * Remove a motion value and unbind any active subscriptions.
           */
          removeValue: function(key22) {
            var _a3;
            values.delete(key22);
            (_a3 = valueSubscriptions.get(key22)) === null || _a3 === void 0 ? void 0 : _a3();
            valueSubscriptions.delete(key22);
            delete latestValues[key22];
            removeValueFromRenderState(key22, renderState);
          },
          /**
           * Check whether we have a motion value for this key
           */
          hasValue: function(key22) {
            return values.has(key22);
          },
          /**
           * Get a motion value for this key. If called with a default
           * value, we'll create one if none exists.
           */
          getValue: function(key22, defaultValue) {
            var value2 = values.get(key22);
            if (value2 === void 0 && defaultValue !== void 0) {
              value2 = motionValue(defaultValue);
              element.addValue(key22, value2);
            }
            return value2;
          },
          /**
           * Iterate over our motion values.
           */
          forEachValue: function(callback) {
            return values.forEach(callback);
          },
          /**
           * If we're trying to animate to a previously unencountered value,
           * we need to check for it in our state and as a last resort read it
           * directly from the instance (which might have performance implications).
           */
          readValue: function(key22) {
            var _a3;
            return (_a3 = latestValues[key22]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key22, options2);
          },
          /**
           * Set the base target to later animate back to. This is currently
           * only hydrated on creation and when we first read a value.
           */
          setBaseTarget: function(key22, value2) {
            baseTarget[key22] = value2;
          },
          /**
           * Find the base target for a value thats been removed from all animation
           * props.
           */
          getBaseTarget: function(key22) {
            if (getBaseTarget) {
              var target = getBaseTarget(props, key22);
              if (target !== void 0 && !isMotionValue(target))
                return target;
            }
            return baseTarget[key22];
          }
        }, lifecycles), {
          /**
           * Build the renderer state based on the latest visual state.
           */
          build: function() {
            triggerBuild();
            return renderState;
          },
          /**
           * Schedule a render on the next animation frame.
           */
          scheduleRender: function() {
            es_default.render(render, false, true);
          },
          /**
           * Synchronously fire render. It's prefered that we batch renders but
           * in many circumstances, like layout measurement, we need to run this
           * synchronously. However in those instances other measures should be taken
           * to batch reads/writes.
           */
          syncRender: render,
          /**
           * Update the provided props. Ensure any newly-added motion values are
           * added to our map, old ones removed, and listeners updated.
           */
          setProps: function(newProps) {
            props = newProps;
            lifecycles.updatePropListeners(newProps);
            prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps2(props), prevMotionValues);
          },
          getProps: function() {
            return props;
          },
          // Variants ==============================
          /**
           * Returns the variant definition with a given name.
           */
          getVariant: function(name) {
            var _a3;
            return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
          },
          /**
           * Returns the defined default transition on this component.
           */
          getDefaultTransition: function() {
            return props.transition;
          },
          /**
           * Used by child variant nodes to get the closest ancestor variant props.
           */
          getVariantContext: function(startAtParent) {
            if (startAtParent === void 0) {
              startAtParent = false;
            }
            if (startAtParent)
              return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
            if (!isControllingVariants) {
              var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
              if (props.initial !== void 0) {
                context_1.initial = props.initial;
              }
              return context_1;
            }
            var context = {};
            for (var i = 0; i < numVariantProps; i++) {
              var name_1 = variantProps[i];
              var prop = props[name_1];
              if (isVariantLabel(prop) || prop === false) {
                context[name_1] = prop;
              }
            }
            return context;
          },
          // Layout projection ==============================
          /**
           * Enable layout projection for this visual element. Won't actually
           * occur until we also have hydrated layout measurements.
           */
          enableLayoutProjection: function() {
            projection.isEnabled = true;
            element.layoutTree.add(element);
          },
          /**
           * Lock the projection target, for instance when dragging, so
           * nothing else can try and animate it.
           */
          lockProjectionTarget: function() {
            projection.isTargetLocked = true;
          },
          unlockProjectionTarget: function() {
            element.stopLayoutAnimation();
            projection.isTargetLocked = false;
          },
          getLayoutState: function() {
            return layoutState;
          },
          setCrossfader: function(newCrossfader) {
            crossfader = newCrossfader;
          },
          isProjectionReady: function() {
            return projection.isEnabled && projection.isHydrated && layoutState.isHydrated;
          },
          /**
           * Start a layout animation on a given axis.
           */
          startLayoutAnimation: function(axis, transition, isRelative) {
            if (isRelative === void 0) {
              isRelative = false;
            }
            var progress2 = element.getProjectionAnimationProgress()[axis];
            var _a3 = isRelative ? projection.relativeTarget[axis] : projection.target[axis], min = _a3.min, max = _a3.max;
            var length = max - min;
            progress2.clearListeners();
            progress2.set(min);
            progress2.set(min);
            progress2.onChange(function(v) {
              element.setProjectionTargetAxis(axis, v, v + length, isRelative);
            });
            return element.animateMotionValue(axis, progress2, 0, transition);
          },
          /**
           * Stop layout animations.
           */
          stopLayoutAnimation: function() {
            eachAxis(function(axis) {
              return element.getProjectionAnimationProgress()[axis].stop();
            });
          },
          /**
           * Measure the current viewport box with or without transforms.
           * Only measures axis-aligned boxes, rotate and skew must be manually
           * removed with a re-render to work.
           */
          measureViewportBox: function(withTransform) {
            if (withTransform === void 0) {
              withTransform = true;
            }
            var viewportBox = measureViewportBox(instance, options2);
            if (!withTransform)
              removeBoxTransforms(viewportBox, latestValues);
            return viewportBox;
          },
          /**
           * Get the motion values tracking the layout animations on each
           * axis. Lazy init if not already created.
           */
          getProjectionAnimationProgress: function() {
            projectionTargetProgress || (projectionTargetProgress = {
              x: motionValue(0),
              y: motionValue(0)
            });
            return projectionTargetProgress;
          },
          /**
           * Update the projection of a single axis. Schedule an update to
           * the tree layout projection.
           */
          setProjectionTargetAxis: function(axis, min, max, isRelative) {
            if (isRelative === void 0) {
              isRelative = false;
            }
            var target;
            if (isRelative) {
              if (!projection.relativeTarget) {
                projection.relativeTarget = axisBox();
              }
              target = projection.relativeTarget[axis];
            } else {
              projection.relativeTarget = void 0;
              target = projection.target[axis];
            }
            projection.isHydrated = true;
            target.min = min;
            target.max = max;
            hasViewportBoxUpdated = true;
            lifecycles.notifySetAxisTarget();
          },
          /**
           * Rebase the projection target on top of the provided viewport box
           * or the measured layout. This ensures that non-animating elements
           * don't fall out of sync differences in measurements vs projections
           * after a page scroll or other relayout.
           */
          rebaseProjectionTarget: function(force, box) {
            if (box === void 0) {
              box = layoutState.layout;
            }
            var _a3 = element.getProjectionAnimationProgress(), x = _a3.x, y = _a3.y;
            var shouldRebase = !projection.relativeTarget && !projection.isTargetLocked && !x.isAnimating() && !y.isAnimating();
            if (force || shouldRebase) {
              eachAxis(function(axis) {
                var _a4 = box[axis], min = _a4.min, max = _a4.max;
                element.setProjectionTargetAxis(axis, min, max);
              });
            }
          },
          /**
           * Notify the visual element that its layout is up-to-date.
           * Currently Animate.tsx uses this to check whether a layout animation
           * needs to be performed.
           */
          notifyLayoutReady: function(config) {
            setCurrentViewportBox(element);
            element.notifyLayoutUpdate(layoutState.layout, element.prevViewportBox || layoutState.layout, config);
          },
          /**
           * Temporarily reset the transform of the instance.
           */
          resetTransform: function() {
            return resetTransform(element, instance, props);
          },
          restoreTransform: function() {
            return restoreTransform(instance, renderState);
          },
          updateLayoutProjection,
          updateTreeLayoutProjection: function() {
            element.layoutTree.forEach(fireResolveRelativeTargetBox);
            es_default.preRender(updateTreeLayoutProjection, false, true);
          },
          getProjectionParent: function() {
            if (projectionParent === void 0) {
              var foundParent = false;
              for (var i = element.path.length - 1; i >= 0; i--) {
                var ancestor = element.path[i];
                if (ancestor.projection.isEnabled) {
                  foundParent = ancestor;
                  break;
                }
              }
              projectionParent = foundParent;
            }
            return projectionParent;
          },
          resolveRelativeTargetBox: function() {
            var relativeParent = element.getProjectionParent();
            if (!projection.relativeTarget || !relativeParent)
              return;
            calcRelativeBox(projection, relativeParent.projection);
            if (isDraggable(relativeParent)) {
              var target = projection.target;
              applyBoxTransforms(target, target, relativeParent.getLatestValues());
            }
          },
          shouldResetTransform: function() {
            return Boolean(props._layoutResetTransform);
          },
          /**
           *
           */
          pointTo: function(newLead) {
            leadProjection = newLead.projection;
            leadLatestValues = newLead.getLatestValues();
            unsubscribeFromLeadVisualElement === null || unsubscribeFromLeadVisualElement === void 0 ? void 0 : unsubscribeFromLeadVisualElement();
            unsubscribeFromLeadVisualElement = pipe(newLead.onSetAxisTarget(element.scheduleUpdateLayoutProjection), newLead.onLayoutAnimationComplete(function() {
              var _a3;
              if (element.isPresent) {
                element.presence = Presence.Present;
              } else {
                (_a3 = element.layoutSafeToRemove) === null || _a3 === void 0 ? void 0 : _a3.call(element);
              }
            }));
          },
          // TODO: Clean this up
          isPresent: true,
          presence: Presence.Entering
        });
        return element;
      };
    };
    variantProps = __spreadArray(["initial"], __read(variantPriorityOrder));
    numVariantProps = variantProps.length;
    validMotionProps = /* @__PURE__ */ new Set([
      "initial",
      "animate",
      "exit",
      "style",
      "variants",
      "transition",
      "transformTemplate",
      "transformValues",
      "custom",
      "inherit",
      "layout",
      "layoutId",
      "onLayoutAnimationComplete",
      "onViewportBoxUpdate",
      "onLayoutMeasure",
      "onBeforeLayoutMeasure",
      "onAnimationStart",
      "onAnimationComplete",
      "onUpdate",
      "onDragStart",
      "onDrag",
      "onDragEnd",
      "onMeasureDragConstraints",
      "onDirectionLock",
      "onDragTransitionEnd",
      "drag",
      "dragControls",
      "dragListener",
      "dragConstraints",
      "dragDirectionLock",
      "_dragX",
      "_dragY",
      "dragElastic",
      "dragMomentum",
      "dragPropagation",
      "dragTransition",
      "whileDrag",
      "onPan",
      "onPanStart",
      "onPanEnd",
      "onPanSessionStart",
      "onTap",
      "onTapStart",
      "onTapCancel",
      "onHoverStart",
      "onHoverEnd",
      "whileFocus",
      "whileTap",
      "whileHover"
    ]);
    PresenceContext = (c2) => getDomContext("Presence", c2) || writable(null);
    counter = 0;
    incrementId = () => counter++;
    usePresence = (isCustom = false) => {
      const context = getContext(PresenceContext) || PresenceContext(isCustom);
      const id = get_store_value(context) === null ? void 0 : incrementId();
      if (get_store_value(context) === null) {
        return readable([true, null]);
      }
      return derived(
        context,
        ($v) => !$v.isPresent && $v.onExitComplete ? [false, () => $v.onExitComplete?.(id)] : [true]
      );
    };
    LayoutGroupContext = (c2) => getDomContext("LayoutGroup", c2) || writable(null);
    unresolvedJobs = /* @__PURE__ */ new Set();
    executeJob = function(job) {
      return job();
    };
    defaultHandler = {
      layoutReady: function(child) {
        return child.notifyLayoutReady();
      }
    };
    SharedLayoutContext = (custom) => getDomContext("SharedLayout", custom) || writable(createBatcher());
    FramerTreeLayoutContext = () => writable(createBatcher());
    LazyContext = (c2) => getDomContext("Lazy", c2) || writable({ strict: false });
    MotionContext = (c2) => getDomContext("Motion", c2) || writable({});
    UseVisualElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $presenceContext, $$unsubscribe_presenceContext;
      let $config, $$unsubscribe_config;
      let $lazyContext, $$unsubscribe_lazyContext;
      let $layoutGroupId, $$unsubscribe_layoutGroupId;
      let $mc, $$unsubscribe_mc;
      let { createVisualElement = void 0, props, Component, visualState, isCustom } = $$props;
      const config = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_config = subscribe(config, (value) => $config = value);
      const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
      $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
      const lazyContext = getContext(LazyContext) || LazyContext(isCustom);
      $$unsubscribe_lazyContext = subscribe(lazyContext, (value) => $lazyContext = value);
      const mc = getContext(MotionContext) || MotionContext(isCustom);
      $$unsubscribe_mc = subscribe(mc, (value) => $mc = value);
      let parent = get_store_value(mc).visualElement;
      const layoutGroupId = getContext(LayoutGroupContext) || LayoutGroupContext(isCustom);
      $$unsubscribe_layoutGroupId = subscribe(layoutGroupId, (value) => $layoutGroupId = value);
      let layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
      let visualElementRef = void 0;
      if (!createVisualElement) {
        createVisualElement = $lazyContext.renderer;
      }
      let visualElement2 = visualElementRef;
      onDestroy(() => {
        visualElement2?.notifyUnmount();
      });
      if ($$props.createVisualElement === void 0 && $$bindings.createVisualElement && createVisualElement !== void 0) $$bindings.createVisualElement(createVisualElement);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      parent = $mc.visualElement;
      layoutId = $layoutGroupId && props.layoutId !== void 0 ? $layoutGroupId + "-" + props.layoutId : props.layoutId;
      {
        if (!visualElementRef && createVisualElement) {
          visualElementRef = createVisualElement(Component, {
            visualState,
            parent,
            props: { ...props, layoutId },
            presenceId: $presenceContext?.id,
            blockInitialAnimation: $presenceContext?.initial === false
          });
        }
      }
      visualElement2 = visualElementRef;
      {
        if (visualElement2) {
          visualElement2.setProps({ ...$config, ...props, layoutId });
          visualElement2.isPresent = isPresent($presenceContext);
          visualElement2.isPresenceRoot = !parent || parent.presenceId !== $presenceContext?.id;
          visualElement2.syncRender();
        }
      }
      $$unsubscribe_presenceContext();
      $$unsubscribe_config();
      $$unsubscribe_lazyContext();
      $$unsubscribe_layoutGroupId();
      $$unsubscribe_mc();
      return `${slots.default ? slots.default({ visualElement: visualElement2 }) : ``}`;
    });
    createDefinition = function(propNames) {
      return {
        isEnabled: function(props) {
          return propNames.some(function(name) {
            return !!props[name];
          });
        }
      };
    };
    featureDefinitions = {
      measureLayout: createDefinition(["layout", "layoutId", "drag"]),
      animation: createDefinition([
        "animate",
        "exit",
        "variants",
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag"
      ]),
      exit: createDefinition(["exit"]),
      drag: createDefinition(["drag", "dragControls"]),
      focus: createDefinition(["whileFocus"]),
      hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
      tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
      pan: createDefinition([
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
      ]),
      layoutAnimation: createDefinition(["layout", "layoutId"])
    };
    UseFeatures = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const featureNames = Object.keys(featureDefinitions);
      const numFeatures = featureNames.length;
      let { visualElement: visualElement2, props } = $$props;
      let features = [];
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      {
        {
          features = [];
          for (let i = 0; i < numFeatures; i++) {
            const name = featureNames[i];
            const { isEnabled, Component } = featureDefinitions[name];
            if (isEnabled(props) && Component) {
              features.push({
                Component,
                key: name,
                props,
                visualElement: visualElement2
              });
            }
          }
        }
      }
      return `${visualElement2 ? `${slots.default ? slots.default({ features }) : ``}` : ``}`;
    });
    MotionContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { value, isCustom } = $$props;
      let store = writable(value);
      setContext(MotionContext, store);
      setDomContext("Motion", isCustom, store);
      onDestroy(() => {
        value?.visualElement?.unmount();
      });
      if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      {
        store.set(value);
      }
      return `${slots.default ? slots.default({}) : ``}`;
    });
    createHtmlRenderState = function() {
      return {
        style: {},
        transform: {},
        transformKeys: [],
        transformOrigin: {},
        vars: {}
      };
    };
    createSvgRenderState = function() {
      return Object.assign(Object.assign({}, createHtmlRenderState()), { attrs: {} });
    };
    transformAxes = ["", "X", "Y", "Z"];
    order = ["translate", "scale", "rotate", "skew"];
    transformProps = ["transformPerspective", "x", "y", "z"];
    order.forEach(function(operationKey) {
      return transformAxes.forEach(function(axesKey) {
        return transformProps.push(operationKey + axesKey);
      });
    });
    transformPropSet = new Set(transformProps);
    transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
    translateAlias = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective"
    };
    getValueAsType = function(value, type) {
      return type && typeof value === "number" ? type.transform(value) : value;
    };
    UseInitialMotionValues = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let styles;
      let { visualState, isStatic, props } = $$props;
      const memo = () => {
        let state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, void 0, void 0, { enableHardwareAcceleration: !isStatic }, props.transformTemplate);
        const { vars, style } = state;
        return { ...vars, ...style };
      };
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      styles = memo();
      return `${slots.default ? slots.default({ styles }) : ``}`;
    });
    UseStyle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let styleProp;
      let { visualState, props, isStatic } = $$props;
      let style = {};
      const cRVO = copyRawValuesOnly;
      const toStyle = (s1) => {
        Object.assign(style, s1);
        if (props.transformValues) {
          style = props.transformValues(style);
        }
        return style;
      };
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      styleProp = props.style || {};
      {
        cRVO(style, styleProp, props);
      }
      return `${validate_component(UseInitialMotionValues, "UseInitialMotionValues").$$render($$result, { props, visualState, isStatic }, {}, {
        default: ({ styles: s1 }) => {
          return `${slots.default ? slots.default({ styles: toStyle(s1) }) : ``}`;
        }
      })}`;
    });
    UseHTMLProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { props, visualState, isStatic } = $$props;
      const getHTMLProps = (style, props2) => {
        let htmlProps = {};
        if (Boolean(props2.drag)) {
          htmlProps.draggable = false;
          style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
          style.touchAction = props2.drag === true ? "none" : `pan-${props2.drag === "x" ? "y" : "x"}`;
        }
        htmlProps.style = style;
        return htmlProps;
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      return `${validate_component(UseStyle, "UseStyle").$$render($$result, { visualState, props, isStatic }, {}, {
        default: ({ styles }) => {
          return `${slots.default ? slots.default({ visualProps: getHTMLProps(styles, props) }) : ``}`;
        }
      })}`;
    });
    progressToPixels = function(progress2, length) {
      return px.transform(progress2 * length);
    };
    camelKeys = {
      offset: "strokeDashoffset",
      array: "strokeDasharray"
    };
    UseSVGProps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let visualProps;
      let { visualState, props } = $$props;
      let memo = () => {
        const state = createSvgRenderState();
        buildSVGAttrs(state, visualState, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
        return {
          ...state.attrs,
          style: { ...state.style }
        };
      };
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      visualProps = memo();
      {
        if (props.style) {
          const rawStyles = {};
          copyRawValuesOnly(rawStyles, props.style, props);
          visualProps.style = { ...rawStyles, ...visualProps.style };
        }
      }
      return `${slots.default ? slots.default({ visualProps }) : ``}`;
    });
    shouldForward = function(key2) {
      return !isValidMotionProp(key2);
    };
    try {
      emotionIsPropValid_1 = __require("@emotion/is-prop-valid").default;
      shouldForward = function(key2) {
        if (key2.startsWith("on")) {
          return !isValidMotionProp(key2);
        } else {
          return emotionIsPropValid_1(key2);
        }
      };
    } catch (_a) {
    }
    UseRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let filteredProps;
      let { props, visualState, Component, forwardMotionProps = false, isStatic, ref, targetEl = void 0 } = $$props;
      const motion2 = (node) => {
        ref(node);
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualState === void 0 && $$bindings.visualState && visualState !== void 0) $$bindings.visualState(visualState);
      if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0) $$bindings.Component(Component);
      if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0) $$bindings.forwardMotionProps(forwardMotionProps);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0) $$bindings.targetEl(targetEl);
      filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
      {
        if (targetEl) {
          motion2(targetEl);
        }
      }
      return `${validate_component((Component === "SVG" ? UseSVGProps : UseHTMLProps) || missing_component, "svelte:component").$$render($$result, { visualState, isStatic, props }, {}, {
        default: ({ visualProps }) => {
          return `${slots.default ? slots.default({
            motion: motion2,
            props: { ...filteredProps, ...visualProps }
          }) : ``}`;
        }
      })}`;
    });
    cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
    positionalKeys = /* @__PURE__ */ new Set([
      "width",
      "height",
      "top",
      "left",
      "right",
      "bottom",
      "x",
      "y"
    ]);
    isPositionalKey = function(key2) {
      return positionalKeys.has(key2);
    };
    hasPositionalKey = function(target) {
      return Object.keys(target).some(isPositionalKey);
    };
    setAndResetVelocity = function(value, to) {
      value.set(to, false);
      value.set(to);
    };
    isNumOrPxType = function(v) {
      return v === number || v === px;
    };
    (function(BoundingBoxDimension2) {
      BoundingBoxDimension2["width"] = "width";
      BoundingBoxDimension2["height"] = "height";
      BoundingBoxDimension2["left"] = "left";
      BoundingBoxDimension2["right"] = "right";
      BoundingBoxDimension2["top"] = "top";
      BoundingBoxDimension2["bottom"] = "bottom";
    })(BoundingBoxDimension || (BoundingBoxDimension = {}));
    getPosFromMatrix = function(matrix, pos) {
      return parseFloat(matrix.split(", ")[pos]);
    };
    getTranslateFromMatrix = function(pos2, pos3) {
      return function(_bbox, _a) {
        var transform = _a.transform;
        if (transform === "none" || !transform)
          return 0;
        var matrix3d = transform.match(/^matrix3d\((.+)\)$/);
        if (matrix3d) {
          return getPosFromMatrix(matrix3d[1], pos3);
        } else {
          var matrix = transform.match(/^matrix\((.+)\)$/);
          if (matrix) {
            return getPosFromMatrix(matrix[1], pos2);
          } else {
            return 0;
          }
        }
      };
    };
    transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
    nonTranslationalTransformKeys = transformProps.filter(function(key2) {
      return !transformKeys.has(key2);
    });
    positionalValues = {
      // Dimensions
      width: function(_a) {
        var x = _a.x;
        return x.max - x.min;
      },
      height: function(_a) {
        var y = _a.y;
        return y.max - y.min;
      },
      top: function(_bbox, _a) {
        var top = _a.top;
        return parseFloat(top);
      },
      left: function(_bbox, _a) {
        var left = _a.left;
        return parseFloat(left);
      },
      bottom: function(_a, _b) {
        var y = _a.y;
        var top = _b.top;
        return parseFloat(top) + (y.max - y.min);
      },
      right: function(_a, _b) {
        var x = _a.x;
        var left = _b.left;
        return parseFloat(left) + (x.max - x.min);
      },
      // Transform
      x: getTranslateFromMatrix(4, 13),
      y: getTranslateFromMatrix(5, 14)
    };
    convertChangedValueTypes = function(target, visualElement2, changedKeys) {
      var originBbox = visualElement2.measureViewportBox();
      var element = visualElement2.getInstance();
      var elementComputedStyle = getComputedStyle(element);
      var display = elementComputedStyle.display, top = elementComputedStyle.top, left = elementComputedStyle.left, bottom = elementComputedStyle.bottom, right = elementComputedStyle.right, transform = elementComputedStyle.transform;
      var originComputedStyle = { top, left, bottom, right, transform };
      if (display === "none") {
        visualElement2.setStaticValue("display", target.display || "block");
      }
      visualElement2.syncRender();
      var targetBbox = visualElement2.measureViewportBox();
      changedKeys.forEach(function(key2) {
        var value = visualElement2.getValue(key2);
        setAndResetVelocity(value, positionalValues[key2](originBbox, originComputedStyle));
        target[key2] = positionalValues[key2](targetBbox, elementComputedStyle);
      });
      return target;
    };
    checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
      if (origin === void 0) {
        origin = {};
      }
      if (transitionEnd === void 0) {
        transitionEnd = {};
      }
      target = Object.assign({}, target);
      transitionEnd = Object.assign({}, transitionEnd);
      var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
      var removedTransformValues = [];
      var hasAttemptedToRemoveTransformValues = false;
      var changedValueTypeKeys = [];
      targetPositionalKeys.forEach(function(key2) {
        var value = visualElement2.getValue(key2);
        if (!visualElement2.hasValue(key2))
          return;
        var from = origin[key2];
        var to = target[key2];
        var fromType = findDimensionValueType(from);
        var toType;
        if (isKeyframesTarget(to)) {
          var numKeyframes = to.length;
          for (var i = to[0] === null ? 1 : 0; i < numKeyframes; i++) {
            if (!toType) {
              toType = findDimensionValueType(to[i]);
            }
          }
        } else {
          toType = findDimensionValueType(to);
        }
        if (fromType !== toType) {
          if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
            var current = value.get();
            if (typeof current === "string") {
              value.set(parseFloat(current));
            }
            if (typeof to === "string") {
              target[key2] = parseFloat(to);
            } else if (Array.isArray(to) && toType === px) {
              target[key2] = to.map(parseFloat);
            }
          } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
            if (from === 0) {
              value.set(toType.transform(from));
            } else {
              target[key2] = fromType.transform(to);
            }
          } else {
            if (!hasAttemptedToRemoveTransformValues) {
              removedTransformValues = removeNonTranslationalTransform(visualElement2);
              hasAttemptedToRemoveTransformValues = true;
            }
            changedValueTypeKeys.push(key2);
            transitionEnd[key2] = transitionEnd[key2] !== void 0 ? transitionEnd[key2] : target[key2];
            setAndResetVelocity(value, to);
          }
        }
      });
      if (changedValueTypeKeys.length) {
        var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
        if (removedTransformValues.length) {
          removedTransformValues.forEach(function(_a) {
            var _b = __read(_a, 2), key2 = _b[0], value = _b[1];
            visualElement2.getValue(key2).set(value);
          });
        }
        visualElement2.syncRender();
        return { target: convertedTarget, transitionEnd };
      } else {
        return { target, transitionEnd };
      }
    };
    parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
      var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
      target = resolved.target;
      transitionEnd = resolved.transitionEnd;
      return unitConversion(visualElement2, target, origin, transitionEnd);
    };
    htmlConfig = {
      treeType: "dom",
      readValueFromInstance: function(domElement, key2) {
        if (isTransformProp(key2)) {
          var defaultType = getDefaultValueType(key2);
          return defaultType ? defaultType.default || 0 : 0;
        } else {
          var computedStyle = getComputedStyle$1(domElement);
          return (isCSSVariable$1(key2) ? computedStyle.getPropertyValue(key2) : computedStyle[key2]) || 0;
        }
      },
      sortNodePosition: function(a2, b2) {
        return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
      },
      getBaseTarget: function(props, key2) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key2];
      },
      measureViewportBox: function(element, _a) {
        var transformPagePoint = _a.transformPagePoint;
        return getBoundingBox(element, transformPagePoint);
      },
      /**
       * Reset the transform on the current Element. This is called as part
       * of a batched process across the entire layout tree. To remove this write
       * cycle it'd be interesting to see if it's possible to "undo" all the current
       * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
       * works
       */
      resetTransform: function(element, domElement, props) {
        var transformTemplate = props.transformTemplate;
        domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        element.scheduleRender();
      },
      restoreTransform: function(instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
      },
      removeValueFromRenderState: function(key2, _a) {
        var vars = _a.vars, style = _a.style;
        delete vars[key2];
        delete style[key2];
      },
      /**
       * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
       * can be animated by Motion.
       */
      makeTargetAnimatable: function(element, _a, _b, isMounted) {
        var transformValues = _b.transformValues;
        if (isMounted === void 0) {
          isMounted = true;
        }
        var transition = _a.transition, transitionEnd = _a.transitionEnd, target = __rest2(_a, ["transition", "transitionEnd"]);
        var origin = getOrigin(target, transition || {}, element);
        if (transformValues) {
          if (transitionEnd)
            transitionEnd = transformValues(transitionEnd);
          if (target)
            target = transformValues(target);
          if (origin)
            origin = transformValues(origin);
        }
        if (isMounted) {
          checkTargetForNewValues(element, target, origin);
          var parsed = parseDomVariant(element, target, origin, transitionEnd);
          transitionEnd = parsed.transitionEnd;
          target = parsed.target;
        }
        return Object.assign({
          transition,
          transitionEnd
        }, target);
      },
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
      build: function(element, renderState, latestValues, projection, layoutState, options2, props) {
        if (element.isVisible !== void 0) {
          renderState.style.visibility = element.isVisible ? "visible" : "hidden";
        }
        var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
        buildHTMLStyles(renderState, latestValues, projection, layoutState, options2, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
      },
      render: renderHTML
    };
    htmlVisualElement = visualElement(htmlConfig);
    CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
    REPLACE_TEMPLATE = "$1-$2";
    camelToDash = function(str) {
      return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
    };
    camelCaseAttributes = /* @__PURE__ */ new Set([
      "baseFrequency",
      "diffuseConstant",
      "kernelMatrix",
      "kernelUnitLength",
      "keySplines",
      "keyTimes",
      "limitingConeAngle",
      "markerHeight",
      "markerWidth",
      "numOctaves",
      "targetX",
      "targetY",
      "surfaceScale",
      "specularConstant",
      "specularExponent",
      "stdDeviation",
      "tableValues",
      "viewBox"
    ]);
    svgVisualElement = visualElement(Object.assign(Object.assign({}, htmlConfig), {
      getBaseTarget: function(props, key2) {
        return props[key2];
      },
      readValueFromInstance: function(domElement, key2) {
        var _a;
        if (isTransformProp(key2)) {
          return ((_a = getDefaultValueType(key2)) === null || _a === void 0 ? void 0 : _a.default) || 0;
        }
        key2 = !camelCaseAttributes.has(key2) ? camelToDash(key2) : key2;
        return domElement.getAttribute(key2);
      },
      scrapeMotionValuesFromProps,
      build: function(_element, renderState, latestValues, projection, layoutState, options2, props) {
        var isProjectionTranform = projection.isEnabled && layoutState.isHydrated;
        buildSVGAttrs(renderState, latestValues, projection, layoutState, options2, props.transformTemplate, isProjectionTranform ? buildLayoutProjectionTransform : void 0, isProjectionTranform ? buildLayoutProjectionTransformOrigin : void 0);
      },
      render: renderSVG
    }));
    createDomVisualElement = function(Component, options2) {
      return Component === "SVG" ? svgVisualElement(options2, { enableHardwareAcceleration: false }) : htmlVisualElement(options2, { enableHardwareAcceleration: true });
    };
    svgMotionConfig = {
      scrapeMotionValuesFromProps,
      createRenderState: createSvgRenderState,
      onMount: function(props, instance, _a) {
        var renderState = _a.renderState, latestValues = _a.latestValues;
        try {
          renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
        } catch (e) {
          renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
          };
        }
        if (isPath(instance)) {
          renderState.totalPathLength = instance.getTotalLength();
        }
        buildSVGAttrs(renderState, latestValues, void 0, void 0, { enableHardwareAcceleration: false }, props.transformTemplate);
        renderSVG(instance, renderState);
      }
    };
    htmlMotionConfig = {
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
      createRenderState: createHtmlRenderState
    };
    UseCreateMotionContext = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $mc, $$unsubscribe_mc;
      let { props, isStatic, isCustom } = $$props;
      let mc = getContext(MotionContext) || MotionContext(isCustom);
      $$unsubscribe_mc = subscribe(mc, (value2) => $mc = value2);
      let { initial: initial2, animate: animate2 } = getCurrentTreeVariants(props, get_store_value(mc));
      const variantLabelsAsDependency = (prop) => {
        return Array.isArray(prop) ? prop.join(" ") : prop;
      };
      const memo = () => {
        return { initial: initial2, animate: animate2 };
      };
      let value = memo();
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ initial: initial2, animate: animate2 } = getCurrentTreeVariants(props, $mc));
      {
        if (isStatic) {
          value = memo(variantLabelsAsDependency(initial2), variantLabelsAsDependency(animate2));
        }
      }
      $$unsubscribe_mc();
      return `${slots.default ? slots.default({ value }) : ``}`;
    });
    makeState = ({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount: onMount2 }, props, context, presenceContext) => {
      const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
        renderState: createRenderState()
      };
      if (onMount2) {
        state.mount = (instance) => onMount2(props, instance, state);
      }
      return state;
    };
    UseVisualState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $presenceContext, $$unsubscribe_presenceContext;
      let $context, $$unsubscribe_context;
      let { config, props, isStatic, isCustom } = $$props;
      const context = getContext(MotionContext) || MotionContext(isCustom);
      $$unsubscribe_context = subscribe(context, (value) => $context = value);
      const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
      $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
      let state = makeState(config, props, get_store_value(context), get_store_value(presenceContext));
      const ms = makeState;
      if ($$props.config === void 0 && $$bindings.config && config !== void 0) $$bindings.config(config);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isStatic === void 0 && $$bindings.isStatic && isStatic !== void 0) $$bindings.isStatic(isStatic);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      {
        if (isStatic) {
          state = ms(config, props, $context, $presenceContext);
        }
      }
      $$unsubscribe_presenceContext();
      $$unsubscribe_context();
      return `${slots.default ? slots.default({ state }) : ``}`;
    });
    Motion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let motionProps;
      let isStatic;
      let $$restProps = compute_rest_props($$props, ["isSVG", "forwardMotionProps", "externalRef", "targetEl"]);
      let $a, $$unsubscribe_a;
      let { isSVG = false, forwardMotionProps = false, externalRef = void 0, targetEl = void 0 } = $$props;
      const isCustom = targetEl;
      let Component = isSVG ? "SVG" : "DOM";
      let createVisualElement = createDomVisualElement;
      let visualStateConfig = isSVG ? svgMotionConfig : htmlMotionConfig;
      const a2 = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_a = subscribe(a2, (value) => $a = value);
      const setContext2 = (c2, v) => {
        c2.visualElement = v;
        return v;
      };
      if ($$props.isSVG === void 0 && $$bindings.isSVG && isSVG !== void 0) $$bindings.isSVG(isSVG);
      if ($$props.forwardMotionProps === void 0 && $$bindings.forwardMotionProps && forwardMotionProps !== void 0) $$bindings.forwardMotionProps(forwardMotionProps);
      if ($$props.externalRef === void 0 && $$bindings.externalRef && externalRef !== void 0) $$bindings.externalRef(externalRef);
      if ($$props.targetEl === void 0 && $$bindings.targetEl && targetEl !== void 0) $$bindings.targetEl(targetEl);
      motionProps = $$restProps;
      ({ isStatic } = $a || {});
      $$unsubscribe_a();
      return `${validate_component(ScaleCorrectionProvider, "ScaleCorrectionProvider").$$render($$result, { isCustom }, {}, {
        default: () => {
          return `${validate_component(UseCreateMotionContext, "UseCreateMotionContext").$$render($$result, { props: motionProps, isStatic, isCustom }, {}, {
            default: ({ value: context }) => {
              return `${validate_component(UseVisualState, "UseVisualState").$$render(
                $$result,
                {
                  config: visualStateConfig,
                  props: motionProps,
                  isStatic,
                  isCustom
                },
                {},
                {
                  default: ({ state: visualState }) => {
                    return `${validate_component(UseVisualElement, "UseVisualElement").$$render(
                      $$result,
                      {
                        Component,
                        visualState,
                        createVisualElement,
                        props: motionProps,
                        isCustom
                      },
                      {},
                      {
                        default: ({ visualElement: visualElement2 }) => {
                          return `${validate_component(UseFeatures, "UseFeatures").$$render(
                            $$result,
                            {
                              visualElement: setContext2(context, visualElement2),
                              props: motionProps
                            },
                            {},
                            {
                              default: ({ features: _features }) => {
                                return `${validate_component(MotionContextProvider, "MotionContextProvider").$$render($$result, { value: context, isCustom }, {}, {
                                  default: () => {
                                    return `${validate_component(UseRender, "UseRender").$$render(
                                      $$result,
                                      {
                                        Component,
                                        props: motionProps,
                                        ref: useMotionRef(visualState, context.visualElement, externalRef),
                                        visualState,
                                        isStatic,
                                        forwardMotionProps
                                      },
                                      {},
                                      {
                                        default: ({ motion: motion2, props: renderProps }) => {
                                          return `${slots.default ? slots.default({ motion: motion2, props: renderProps }) : ``}`;
                                        }
                                      }
                                    )}`;
                                  }
                                })} ${``}`;
                              }
                            }
                          )}`;
                        }
                      }
                    )}`;
                  }
                }
              )}`;
            }
          })}`;
        }
      })}`;
    });
    UseDomEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { ref, eventName, handler: handler2 = void 0, options: options2 = void 0 } = $$props;
      let cleanup = () => {
      };
      const effect = () => {
        cleanup();
        if (!ref) {
          return () => {
          };
        }
        const element = ref.current;
        if (handler2 && element) {
          return addDomEvent(element, eventName, handler2, options2);
        }
        return () => {
        };
      };
      onDestroy(cleanup);
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0) $$bindings.eventName(eventName);
      if ($$props.handler === void 0 && $$bindings.handler && handler2 !== void 0) $$bindings.handler(handler2);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      cleanup = effect();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    defaultPagePoint = { pageX: 0, pageY: 0 };
    wrapHandler = function(handler2, shouldFilterPrimaryPointer) {
      if (shouldFilterPrimaryPointer === void 0) {
        shouldFilterPrimaryPointer = false;
      }
      var listener = function(event) {
        return handler2(event, extractEventInfo(event));
      };
      return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
    };
    isBrowser = typeof window !== "undefined";
    supportsPointerEvents = function() {
      return isBrowser && window.onpointerdown === null;
    };
    supportsTouchEvents = function() {
      return isBrowser && window.ontouchstart === null;
    };
    supportsMouseEvents = function() {
      return isBrowser && window.onmousedown === null;
    };
    mouseEventNames = {
      pointerdown: "mousedown",
      pointermove: "mousemove",
      pointerup: "mouseup",
      pointercancel: "mousecancel",
      pointerover: "mouseover",
      pointerout: "mouseout",
      pointerenter: "mouseenter",
      pointerleave: "mouseleave"
    };
    touchEventNames = {
      pointerdown: "touchstart",
      pointermove: "touchmove",
      pointerup: "touchend",
      pointercancel: "touchcancel"
    };
    UsePointerEvent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { ref, eventName, handler: handler2 = void 0, options: options2 = void 0 } = $$props;
      if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
      if ($$props.eventName === void 0 && $$bindings.eventName && eventName !== void 0) $$bindings.eventName(eventName);
      if ($$props.handler === void 0 && $$bindings.handler && handler2 !== void 0) $$bindings.handler(handler2);
      if ($$props.options === void 0 && $$bindings.options && options2 !== void 0) $$bindings.options(options2);
      return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
        $$result,
        {
          ref,
          eventName: getPointerEventName(eventName),
          handler: handler2 && wrapHandler(handler2, eventName === "pointerdown"),
          options: options2
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    PanSession = /** @class */
    function() {
      function PanSession2(event, handlers, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
        this.startEvent = null;
        this.lastMoveEvent = null;
        this.lastMoveEventInfo = null;
        this.handlers = {};
        this.updatePoint = function() {
          if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
            return;
          var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
          var isPanStarted = _this.startEvent !== null;
          var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
          if (!isPanStarted && !isDistancePastThreshold)
            return;
          var point2 = info2.point;
          var timestamp2 = getFrameData().timestamp;
          _this.history.push(Object.assign(Object.assign({}, point2), { timestamp: timestamp2 }));
          var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
          if (!isPanStarted) {
            onStart && onStart(_this.lastMoveEvent, info2);
            _this.startEvent = _this.lastMoveEvent;
          }
          onMove && onMove(_this.lastMoveEvent, info2);
        };
        this.handlePointerMove = function(event2, info2) {
          _this.lastMoveEvent = event2;
          _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
          if (isMouseEvent(event2) && event2.buttons === 0) {
            _this.handlePointerUp(event2, info2);
            return;
          }
          es_default.update(_this.updatePoint, true);
        };
        this.handlePointerUp = function(event2, info2) {
          _this.end();
          var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
          var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
          if (_this.startEvent && onEnd) {
            onEnd(event2, panInfo);
          }
          onSessionEnd && onSessionEnd(event2, panInfo);
        };
        if (isTouchEvent(event) && event.touches.length > 1)
          return;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        var info = extractEventInfo(event);
        var initialInfo = transformPoint(info, this.transformPagePoint);
        var point = initialInfo.point;
        var timestamp = getFrameData().timestamp;
        this.history = [Object.assign(Object.assign({}, point), { timestamp })];
        var onSessionStart = handlers.onSessionStart;
        onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
      }
      PanSession2.prototype.updateHandlers = function(handlers) {
        this.handlers = handlers;
      };
      PanSession2.prototype.end = function() {
        this.removeListeners && this.removeListeners();
        cancelSync.update(this.updatePoint);
      };
      return PanSession2;
    }();
    UsePanGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let hasPanEvents;
      let $mcc, $$unsubscribe_mcc;
      let { props, visualElement: visualElement2, isCustom } = $$props;
      let { onPan, onPanStart, onPanEnd, onPanSessionStart } = props;
      let panSession = null;
      const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
      let { transformPagePoint } = get_store_value(mcc);
      let handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
          panSession = null;
          onPanEnd && onPanEnd(event, info);
        }
      };
      function onPointerDown(event) {
        panSession = new PanSession(event, handlers, { transformPagePoint });
      }
      onDestroy(() => panSession && panSession.end());
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ onPan, onPanStart, onPanEnd, onPanSessionStart } = props);
      hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
      ({ transformPagePoint } = $mcc);
      handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
          panSession = null;
          onPanEnd && onPanEnd(event, info);
        }
      };
      $$unsubscribe_mcc();
      return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerdown",
          handler: hasPanEvents && onPointerDown
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    isNodeOrChild = function(parent, child) {
      if (!child) {
        return false;
      } else if (parent === child) {
        return true;
      } else {
        return isNodeOrChild(parent, child.parentElement);
      }
    };
    globalHorizontalLock = createLock("dragHorizontal");
    globalVerticalLock = createLock("dragVertical");
    UseTapGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let onTap;
      let onTapStart;
      let onTapCancel;
      let whileTap;
      let hasPressListeners;
      let { props, visualElement: visualElement2 } = $$props;
      let isPressing = false;
      let cancelPointerEndListeners = null;
      function removePointerEndListener() {
        cancelPointerEndListeners?.();
        cancelPointerEndListeners = null;
      }
      function checkPointerEnd() {
        removePointerEndListener();
        isPressing = false;
        visualElement2.animationState?.setActive(AnimationType.Tap, false);
        return !isDragActive();
      }
      function onPointerUp(event, info) {
        if (!checkPointerEnd()) return;
        !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel?.(event, info) : onTap?.(event, info);
      }
      function onPointerCancel(event, info) {
        if (!checkPointerEnd()) return;
        onTapCancel?.(event, info);
      }
      function onPointerDown(event, info) {
        if (isPressing) return;
        removePointerEndListener();
        isPressing = true;
        cancelPointerEndListeners = pipe(addPointerEvent(window, "pointerup", onPointerUp), addPointerEvent(window, "pointercancel", onPointerCancel));
        onTapStart?.(event, info);
        visualElement2.animationState?.setActive(AnimationType.Tap, true);
      }
      onDestroy(removePointerEndListener);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      ({ onTap, onTapStart, onTapCancel, whileTap } = props);
      hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
      return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerdown",
          handler: hasPressListeners ? onPointerDown : void 0
        },
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    });
    UseHoverGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { props, visualElement: visualElement2 } = $$props;
      let { onHoverStart, onHoverEnd, whileHover } = props;
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      ({ onHoverStart, onHoverEnd, whileHover } = props);
      return `${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerenter",
          handler: onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0
        },
        {},
        {}
      )} ${validate_component(UsePointerEvent, "UsePointerEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "pointerleave",
          handler: onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0
        },
        {},
        {}
      )} ${slots.default ? slots.default({}) : ``}`;
    });
    UseFocusGesture = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let whileFocus;
      let { props, visualElement: visualElement2 } = $$props;
      const onFocus = () => {
        visualElement2.animationState?.setActive(AnimationType.Focus, true);
      };
      const onBlur = () => {
        visualElement2.animationState?.setActive(AnimationType.Focus, false);
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      ({ whileFocus } = props);
      return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
        $$result,
        {
          ref: visualElement2,
          eventName: "focus",
          handler: whileFocus ? onFocus : void 0
        },
        {},
        {
          default: () => {
            return `${validate_component(UseDomEvent, "UseDomEvent").$$render(
              $$result,
              {
                ref: visualElement2,
                eventName: "blur",
                handler: whileFocus ? onBlur : void 0
              },
              {},
              {
                default: () => {
                  return `${slots.default ? slots.default({}) : ``}`;
                }
              }
            )}`;
          }
        }
      )}`;
    });
    createMotionClass = (features) => {
      loadFeatures(features);
      return Motion;
    };
    gestureAnimations = {
      tap: UseTapGesture,
      focus: UseFocusGesture,
      hover: UseHoverGesture
    };
    defaultElastic = 0.35;
    elementDragControls = /* @__PURE__ */ new WeakMap();
    VisualElementDragControls = /** @class */
    function() {
      function VisualElementDragControls2(_a) {
        var visualElement2 = _a.visualElement;
        this.isDragging = false;
        this.currentDirection = null;
        this.constraints = false;
        this.elastic = axisBox();
        this.props = {};
        this.hasMutatedConstraints = false;
        this.cursorProgress = {
          x: 0.5,
          y: 0.5
        };
        this.originPoint = {};
        this.openGlobalLock = null;
        this.panSession = null;
        this.visualElement = visualElement2;
        this.visualElement.enableLayoutProjection();
        elementDragControls.set(visualElement2, this);
      }
      VisualElementDragControls2.prototype.start = function(originEvent, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c, cursorProgress = _b.cursorProgress;
        var onSessionStart = function(event) {
          var _a2;
          _this.stopMotion();
          var initialPoint = getViewportPointFromEvent(event).point;
          (_a2 = _this.cancelLayout) === null || _a2 === void 0 ? void 0 : _a2.call(_this);
          _this.cancelLayout = batchLayout(function(read, write) {
            var ancestors = collectProjectingAncestors(_this.visualElement);
            var children = collectProjectingChildren(_this.visualElement);
            var tree = __spreadArray(__spreadArray([], __read(ancestors)), __read(children));
            var hasManuallySetCursorOrigin = false;
            _this.isLayoutDrag() && _this.visualElement.lockProjectionTarget();
            write(function() {
              tree.forEach(function(element) {
                return element.resetTransform();
              });
            });
            read(function() {
              updateLayoutMeasurement(_this.visualElement);
              children.forEach(updateLayoutMeasurement);
            });
            write(function() {
              tree.forEach(function(element) {
                return element.restoreTransform();
              });
              if (snapToCursor) {
                hasManuallySetCursorOrigin = _this.snapToCursor(initialPoint);
              }
            });
            read(function() {
              var isRelativeDrag = Boolean(_this.getAxisMotionValue("x") && !_this.isExternalDrag());
              if (!isRelativeDrag) {
                _this.visualElement.rebaseProjectionTarget(true, _this.visualElement.measureViewportBox(false));
              }
              _this.visualElement.scheduleUpdateLayoutProjection();
              var projection = _this.visualElement.projection;
              eachAxis(function(axis) {
                if (!hasManuallySetCursorOrigin) {
                  var _a3 = projection.target[axis], min = _a3.min, max = _a3.max;
                  _this.cursorProgress[axis] = cursorProgress ? cursorProgress[axis] : progress(min, max, initialPoint[axis]);
                }
                var axisValue = _this.getAxisMotionValue(axis);
                if (axisValue) {
                  _this.originPoint[axis] = axisValue.get();
                }
              });
            });
            write(function() {
              flushSync.update();
              flushSync.preRender();
              flushSync.render();
              flushSync.postRender();
            });
            read(function() {
              return _this.resolveDragConstraints();
            });
          });
        };
        var onStart = function(event, info) {
          var _a2, _b2, _c2;
          var _d = _this.props, drag2 = _d.drag, dragPropagation = _d.dragPropagation;
          if (drag2 && !dragPropagation) {
            if (_this.openGlobalLock)
              _this.openGlobalLock();
            _this.openGlobalLock = getGlobalLock(drag2);
            if (!_this.openGlobalLock)
              return;
          }
          flushLayout();
          _this.isDragging = true;
          _this.currentDirection = null;
          (_b2 = (_a2 = _this.props).onDragStart) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, event, info);
          (_c2 = _this.visualElement.animationState) === null || _c2 === void 0 ? void 0 : _c2.setActive(AnimationType.Drag, true);
        };
        var onMove = function(event, info) {
          var _a2, _b2, _c2, _d;
          var _e = _this.props, dragPropagation = _e.dragPropagation, dragDirectionLock = _e.dragDirectionLock;
          if (!dragPropagation && !_this.openGlobalLock)
            return;
          var offset = info.offset;
          if (dragDirectionLock && _this.currentDirection === null) {
            _this.currentDirection = getCurrentDirection(offset);
            if (_this.currentDirection !== null) {
              (_b2 = (_a2 = _this.props).onDirectionLock) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, _this.currentDirection);
            }
            return;
          }
          _this.updateAxis("x", info.point, offset);
          _this.updateAxis("y", info.point, offset);
          (_d = (_c2 = _this.props).onDrag) === null || _d === void 0 ? void 0 : _d.call(_c2, event, info);
          lastPointerEvent = event;
        };
        var onSessionEnd = function(event, info) {
          return _this.stop(event, info);
        };
        var transformPagePoint = this.props.transformPagePoint;
        this.panSession = new PanSession(originEvent, {
          onSessionStart,
          onStart,
          onMove,
          onSessionEnd
        }, { transformPagePoint });
      };
      VisualElementDragControls2.prototype.resolveDragConstraints = function() {
        var _this = this;
        var _a = this.props, dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
        var layout = this.visualElement.getLayoutState().layoutCorrected;
        if (dragConstraints) {
          this.constraints = isRefObject(dragConstraints) ? this.resolveRefConstraints(layout, dragConstraints) : calcRelativeConstraints(layout, dragConstraints);
        } else {
          this.constraints = false;
        }
        this.elastic = resolveDragElastic(dragElastic);
        if (this.constraints && !this.hasMutatedConstraints) {
          eachAxis(function(axis) {
            if (_this.getAxisMotionValue(axis)) {
              _this.constraints[axis] = rebaseAxisConstraints(layout[axis], _this.constraints[axis]);
            }
          });
        }
      };
      VisualElementDragControls2.prototype.resolveRefConstraints = function(layoutBox, constraints) {
        var _a = this.props, onMeasureDragConstraints = _a.onMeasureDragConstraints, transformPagePoint = _a.transformPagePoint;
        var constraintsElement = constraints.current;
        invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        this.constraintsBox = getBoundingBox(constraintsElement, transformPagePoint);
        var measuredConstraints = calcViewportConstraints(layoutBox, this.constraintsBox);
        if (onMeasureDragConstraints) {
          var userConstraints = onMeasureDragConstraints(convertAxisBoxToBoundingBox(measuredConstraints));
          this.hasMutatedConstraints = !!userConstraints;
          if (userConstraints) {
            measuredConstraints = convertBoundingBoxToAxisBox(userConstraints);
          }
        }
        return measuredConstraints;
      };
      VisualElementDragControls2.prototype.cancelDrag = function() {
        var _a, _b;
        this.visualElement.unlockProjectionTarget();
        (_a = this.cancelLayout) === null || _a === void 0 ? void 0 : _a.call(this);
        this.isDragging = false;
        this.panSession && this.panSession.end();
        this.panSession = null;
        if (!this.props.dragPropagation && this.openGlobalLock) {
          this.openGlobalLock();
          this.openGlobalLock = null;
        }
        (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
      };
      VisualElementDragControls2.prototype.stop = function(event, info) {
        var _a, _b, _c;
        (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
        this.panSession = null;
        var isDragging = this.isDragging;
        this.cancelDrag();
        if (!isDragging)
          return;
        var velocity = info.velocity;
        this.animateDragEnd(velocity);
        (_c = (_b = this.props).onDragEnd) === null || _c === void 0 ? void 0 : _c.call(_b, event, info);
      };
      VisualElementDragControls2.prototype.snapToCursor = function(point) {
        var _this = this;
        return eachAxis(function(axis) {
          var drag2 = _this.props.drag;
          if (!shouldDrag(axis, drag2, _this.currentDirection))
            return;
          var axisValue = _this.getAxisMotionValue(axis);
          if (axisValue) {
            var box = _this.visualElement.getLayoutState().layout;
            var length_1 = box[axis].max - box[axis].min;
            var center = box[axis].min + length_1 / 2;
            var offset = point[axis] - center;
            _this.originPoint[axis] = point[axis];
            axisValue.set(offset);
          } else {
            _this.cursorProgress[axis] = 0.5;
            return true;
          }
        }).includes(true);
      };
      VisualElementDragControls2.prototype.updateAxis = function(axis, point, offset) {
        var drag2 = this.props.drag;
        if (!shouldDrag(axis, drag2, this.currentDirection))
          return;
        return this.getAxisMotionValue(axis) ? this.updateAxisMotionValue(axis, offset) : this.updateVisualElementAxis(axis, point);
      };
      VisualElementDragControls2.prototype.updateAxisMotionValue = function(axis, offset) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!offset || !axisValue)
          return;
        var nextValue = this.originPoint[axis] + offset[axis];
        var update2 = this.constraints ? applyConstraints(nextValue, this.constraints[axis], this.elastic[axis]) : nextValue;
        axisValue.set(update2);
      };
      VisualElementDragControls2.prototype.updateVisualElementAxis = function(axis, point) {
        var _a;
        var axisLayout = this.visualElement.getLayoutState().layout[axis];
        var axisLength = axisLayout.max - axisLayout.min;
        var axisProgress = this.cursorProgress[axis];
        var min = calcConstrainedMinPoint(point[axis], axisLength, axisProgress, (_a = this.constraints) === null || _a === void 0 ? void 0 : _a[axis], this.elastic[axis]);
        this.visualElement.setProjectionTargetAxis(axis, min, min + axisLength);
      };
      VisualElementDragControls2.prototype.setProps = function(_a) {
        var _b = _a.drag, drag2 = _b === void 0 ? false : _b, _c = _a.dragDirectionLock, dragDirectionLock = _c === void 0 ? false : _c, _d = _a.dragPropagation, dragPropagation = _d === void 0 ? false : _d, _e = _a.dragConstraints, dragConstraints = _e === void 0 ? false : _e, _f = _a.dragElastic, dragElastic = _f === void 0 ? defaultElastic : _f, _g = _a.dragMomentum, dragMomentum = _g === void 0 ? true : _g, remainingProps = __rest2(_a, ["drag", "dragDirectionLock", "dragPropagation", "dragConstraints", "dragElastic", "dragMomentum"]);
        this.props = Object.assign({
          drag: drag2,
          dragDirectionLock,
          dragPropagation,
          dragConstraints,
          dragElastic,
          dragMomentum
        }, remainingProps);
      };
      VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
        var _a = this.props, layout = _a.layout, layoutId = _a.layoutId;
        var dragKey = "_drag" + axis.toUpperCase();
        if (this.props[dragKey]) {
          return this.props[dragKey];
        } else if (!layout && layoutId === void 0) {
          return this.visualElement.getValue(axis, 0);
        }
      };
      VisualElementDragControls2.prototype.isLayoutDrag = function() {
        return !this.getAxisMotionValue("x");
      };
      VisualElementDragControls2.prototype.isExternalDrag = function() {
        var _a = this.props, _dragX = _a._dragX, _dragY = _a._dragY;
        return _dragX || _dragY;
      };
      VisualElementDragControls2.prototype.animateDragEnd = function(velocity) {
        var _this = this;
        var _a = this.props, drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition;
        var isRelative = convertToRelativeProjection(this.visualElement, this.isLayoutDrag() && !this.isExternalDrag());
        var constraints = this.constraints || {};
        if (isRelative && Object.keys(constraints).length && this.isLayoutDrag()) {
          var projectionParent = this.visualElement.getProjectionParent();
          if (projectionParent) {
            var relativeConstraints_1 = calcRelativeOffset(projectionParent.projection.targetFinal, constraints);
            eachAxis(function(axis) {
              var _a2 = relativeConstraints_1[axis], min = _a2.min, max = _a2.max;
              constraints[axis] = {
                min: isNaN(min) ? void 0 : min,
                max: isNaN(max) ? void 0 : max
              };
            });
          }
        }
        var momentumAnimations = eachAxis(function(axis) {
          var _a2;
          if (!shouldDrag(axis, drag2, _this.currentDirection)) {
            return;
          }
          var transition = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
          var bounceStiffness = dragElastic ? 200 : 1e6;
          var bounceDamping = dragElastic ? 40 : 1e7;
          var inertia2 = Object.assign(Object.assign({
            type: "inertia",
            velocity: dragMomentum ? velocity[axis] : 0,
            bounceStiffness,
            bounceDamping,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10
          }, dragTransition), transition);
          return _this.getAxisMotionValue(axis) ? _this.startAxisValueAnimation(axis, inertia2) : _this.visualElement.startLayoutAnimation(axis, inertia2, isRelative);
        });
        return Promise.all(momentumAnimations).then(function() {
          var _a2, _b;
          (_b = (_a2 = _this.props).onDragTransitionEnd) === null || _b === void 0 ? void 0 : _b.call(_a2);
        });
      };
      VisualElementDragControls2.prototype.stopMotion = function() {
        var _this = this;
        eachAxis(function(axis) {
          var axisValue = _this.getAxisMotionValue(axis);
          axisValue ? axisValue.stop() : _this.visualElement.stopLayoutAnimation();
        });
      };
      VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
        var axisValue = this.getAxisMotionValue(axis);
        if (!axisValue)
          return;
        var currentValue = axisValue.get();
        axisValue.set(currentValue);
        axisValue.set(currentValue);
        return startAnimation(axis, axisValue, 0, transition);
      };
      VisualElementDragControls2.prototype.scalePoint = function() {
        var _this = this;
        var _a = this.props, drag2 = _a.drag, dragConstraints = _a.dragConstraints;
        if (!isRefObject(dragConstraints) || !this.constraintsBox)
          return;
        this.stopMotion();
        var boxProgress = { x: 0, y: 0 };
        eachAxis(function(axis) {
          boxProgress[axis] = calcOrigin$1(_this.visualElement.projection.target[axis], _this.constraintsBox[axis]);
        });
        this.updateConstraints(function() {
          eachAxis(function(axis) {
            if (!shouldDrag(axis, drag2, null))
              return;
            var _a2 = calcPositionFromProgress(_this.visualElement.projection.target[axis], _this.constraintsBox[axis], boxProgress[axis]), min = _a2.min, max = _a2.max;
            _this.visualElement.setProjectionTargetAxis(axis, min, max);
          });
        });
        setTimeout(flushLayout, 1);
      };
      VisualElementDragControls2.prototype.updateConstraints = function(onReady) {
        var _this = this;
        this.cancelLayout = batchLayout(function(read, write) {
          var ancestors = collectProjectingAncestors(_this.visualElement);
          write(function() {
            return ancestors.forEach(function(element) {
              return element.resetTransform();
            });
          });
          read(function() {
            return updateLayoutMeasurement(_this.visualElement);
          });
          write(function() {
            return ancestors.forEach(function(element) {
              return element.restoreTransform();
            });
          });
          read(function() {
            _this.resolveDragConstraints();
          });
          if (onReady)
            write(onReady);
        });
      };
      VisualElementDragControls2.prototype.mount = function(visualElement2) {
        var _this = this;
        var element = visualElement2.getInstance();
        var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
          var _a = _this.props, drag2 = _a.drag, _b = _a.dragListener, dragListener = _b === void 0 ? true : _b;
          drag2 && dragListener && _this.start(event);
        });
        var stopResizeListener = addDomEvent(window, "resize", function() {
          _this.scalePoint();
        });
        var stopLayoutUpdateListener = visualElement2.onLayoutUpdate(function() {
          if (_this.isDragging) {
            _this.resolveDragConstraints();
          }
        });
        var prevDragCursor = visualElement2.prevDragCursor;
        if (prevDragCursor) {
          this.start(lastPointerEvent, { cursorProgress: prevDragCursor });
        }
        return function() {
          stopPointerListener === null || stopPointerListener === void 0 ? void 0 : stopPointerListener();
          stopResizeListener === null || stopResizeListener === void 0 ? void 0 : stopResizeListener();
          stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
          _this.cancelDrag();
        };
      };
      return VisualElementDragControls2;
    }();
    UseDrag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $mcc, $$unsubscribe_mcc;
      let { visualElement: visualElement2, props, isCustom } = $$props;
      const mcc = getContext(MotionConfigContext) || MotionConfigContext(isCustom);
      $$unsubscribe_mcc = subscribe(mcc, (value) => $mcc = value);
      let dragControls = new VisualElementDragControls({ visualElement: visualElement2 });
      let cleanup;
      const dragEffect = () => {
        if (cleanup) {
          cleanup();
        }
        if (groupDragControls) {
          cleanup = groupDragControls.subscribe(dragControls);
        }
      };
      let { dragControls: groupDragControls } = props;
      let { transformPagePoint } = get_store_value(mcc);
      dragControls.setProps({ ...props, transformPagePoint });
      onDestroy(() => {
        if (cleanup) {
          cleanup();
        }
      });
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ dragControls: groupDragControls } = props);
      ({ transformPagePoint } = $mcc);
      {
        dragControls.setProps({ ...props, transformPagePoint });
      }
      {
        dragEffect();
      }
      $$unsubscribe_mcc();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    drag = {
      pan: UsePanGesture,
      drag: UseDrag
    };
    Animate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visualElement: visualElement2, layout = void 0, safeToRemove } = $$props;
      let stopAxisAnimation = { x: void 0, y: void 0 };
      let unsubLayoutReady;
      onDestroy(() => {
        unsubLayoutReady();
        eachAxis((axis) => stopAxisAnimation[axis]?.());
      });
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0) $$bindings.layout(layout);
      if ($$props.safeToRemove === void 0 && $$bindings.safeToRemove && safeToRemove !== void 0) $$bindings.safeToRemove(safeToRemove);
      return ``;
    });
    AnimateLayoutContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $presence, $$unsubscribe_presence;
      let { visualElement: visualElement2, props, isCustom } = $$props;
      let { layout } = props;
      const presence = usePresence(isCustom);
      $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ layout } = props);
      $$unsubscribe_presence();
      return `${validate_component(Animate, "Animate").$$render(
        $$result,
        {
          visualElement: visualElement2,
          layout,
          safeToRemove: $presence[1]
        },
        {},
        {}
      )}`;
    });
    Measure = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visualElement: visualElement2, syncLayout, framerSyncLayout, update: update2 } = $$props;
      const scaleCorrectionContext = getContext(ScaleCorrectionContext);
      const scaleCorrectionParentContext = getContext(ScaleCorrectionParentContext);
      let updated2 = false;
      const updater = (nc = false) => {
        if (updated2) {
          return null;
        }
        updated2 = true;
        get_store_value(scaleCorrectionContext).forEach((v) => {
          v.updater?.(true);
        });
        if (isSharedLayout(syncLayout)) {
          syncLayout.syncUpdate();
        } else {
          snapshotViewportBox(visualElement2, nc);
          syncLayout.add(visualElement2);
        }
        return null;
      };
      const afterU = (nc = false) => {
        updated2 = false;
        const scc = get_store_value(scaleCorrectionContext);
        scc.forEach((v, i) => {
          v.afterU?.(true);
        });
        if (!isSharedLayout(syncLayout)) {
          syncLayout.flush();
        }
      };
      scaleCorrectionParentContext.update((v) => v.concat([{ updater, afterU }]));
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.syncLayout === void 0 && $$bindings.syncLayout && syncLayout !== void 0) $$bindings.syncLayout(syncLayout);
      if ($$props.framerSyncLayout === void 0 && $$bindings.framerSyncLayout && framerSyncLayout !== void 0) $$bindings.framerSyncLayout(framerSyncLayout);
      if ($$props.update === void 0 && $$bindings.update && update2 !== void 0) $$bindings.update(update2);
      update2 !== void 0 && updater(update2);
      return ``;
    });
    MeasureContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let update2;
      let $syncLayout, $$unsubscribe_syncLayout;
      let $framerSyncLayout, $$unsubscribe_framerSyncLayout;
      let { visualElement: visualElement2, props, isCustom } = $$props;
      const syncLayout = getContext(SharedLayoutContext) || SharedLayoutContext(isCustom);
      $$unsubscribe_syncLayout = subscribe(syncLayout, (value) => $syncLayout = value);
      const framerSyncLayout = getContext(FramerTreeLayoutContext) || FramerTreeLayoutContext();
      $$unsubscribe_framerSyncLayout = subscribe(framerSyncLayout, (value) => $framerSyncLayout = value);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ update: update2 } = props);
      $$unsubscribe_syncLayout();
      $$unsubscribe_framerSyncLayout();
      return `${validate_component(Measure, "Measure").$$render(
        $$result,
        {
          syncLayout: $syncLayout,
          framerSyncLayout: $framerSyncLayout,
          visualElement: visualElement2,
          update: update2
        },
        {},
        {}
      )}`;
    });
    layoutAnimations = {
      measureLayout: MeasureContextProvider,
      layoutAnimation: AnimateLayoutContextProvider
    };
    AnimationState = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { visualElement: visualElement2, props } = $$props;
      let { animate: animate2 } = props;
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      ({ animate: animate2 } = props);
      {
        {
          visualElement2.animationState = visualElement2.animationState || createAnimationState(visualElement2);
        }
      }
      {
        if (isAnimationControls(animate2)) {
          tick().then(() => animate2.subscribe(visualElement2));
        }
      }
      return ``;
    });
    Exit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let custom;
      let $presence, $$unsubscribe_presence;
      let $presenceContext, $$unsubscribe_presenceContext;
      let { props, visualElement: visualElement2, isCustom } = $$props;
      const presenceContext = getContext(PresenceContext) || PresenceContext(isCustom);
      $$unsubscribe_presenceContext = subscribe(presenceContext, (value) => $presenceContext = value);
      const presence = usePresence(isCustom);
      $$unsubscribe_presence = subscribe(presence, (value) => $presence = value);
      const effect = (pres) => {
        const [isPresent2, onExitComplete] = pres;
        const animation = visualElement2.animationState?.setActive(AnimationType.Exit, !isPresent2, {
          custom: $presenceContext?.custom ?? custom
        });
        !isPresent2 && animation?.then(onExitComplete);
        return "";
      };
      if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
      if ($$props.visualElement === void 0 && $$bindings.visualElement && visualElement2 !== void 0) $$bindings.visualElement(visualElement2);
      if ($$props.isCustom === void 0 && $$bindings.isCustom && isCustom !== void 0) $$bindings.isCustom(isCustom);
      ({ custom } = props);
      {
        effect($presence);
      }
      $$unsubscribe_presence();
      $$unsubscribe_presenceContext();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    animations = {
      animation: AnimationState,
      exit: Exit
    };
    featureBundle = {
      ...animations,
      ...gestureAnimations,
      ...drag,
      ...layoutAnimations
    };
    motion = //createMotionProxy(allMotionFeatures);
    /* @__PURE__ */ createMotionClass(featureBundle);
    useCombineMotionValues = (values, combineValues) => {
      let subscriptions = [];
      let vals = values;
      const unsubscribe = () => {
        subscriptions.forEach((unsubscribe2) => unsubscribe2());
      };
      const subscribe2 = () => {
        subscriptions = vals.map((val) => val.onChange(handler2));
        updateValue();
      };
      const value = motionValue(combineValues(), () => {
        unsubscribe();
        subscribe2();
        return unsubscribe;
      });
      let updateValue = () => {
        value.set(combineValues());
      };
      const handler2 = () => {
        es_default.update(updateValue, false, true);
      };
      value.reset = (_values, _combineValues) => {
        vals = _values;
        unsubscribe();
        updateValue = () => {
          value.set(_combineValues());
        };
        subscribe2();
      };
      return value;
    };
    useMotionTemplate = (fragments, ...values) => {
      let numFragments = fragments.length;
      const buildValue = () => {
        let output = ``;
        for (let i = 0; i < numFragments; i++) {
          output += fragments[i];
          const value2 = values[i];
          if (value2) output += values[i].get();
        }
        return output;
      };
      const value = useCombineMotionValues(values, buildValue);
      value.resetInner = value.reset;
      value.reset = (f, ...vs) => {
        numFragments = f.length;
        value.resetInner(vs, buildValue);
      };
      return value;
    };
    css2 = {
      code: ".size-full.svelte-1dd4shl{width:100%;height:100%}",
      map: '{"version":3,"file":"MagicCard.svelte","sources":["MagicCard.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Motion, useMotionValue, useMotionTemplate } from \\"svelte-motion\\";\\nimport { onMount } from \\"svelte\\";\\nimport { cn } from \\"$lib/utils\\";\\nexport let gradientSize = 200;\\nexport let gradientColor = \\"#262626\\";\\nexport let gradientOpacity = 0.8;\\nlet className = \\"\\";\\nexport { className as class };\\nlet gradSize = useMotionValue(gradientSize);\\nlet gradColor = useMotionValue(gradientColor);\\nlet mouseX = useMotionValue(-gradientSize);\\nlet mouseY = useMotionValue(-gradientSize);\\nfunction handleMouseMove(e) {\\n  const rect = e.currentTarget.getBoundingClientRect();\\n  mouseX.set(e.clientX - rect.left);\\n  mouseY.set(e.clientY - rect.top);\\n}\\nfunction handleMouseLeave() {\\n  mouseX.set(-gradientSize);\\n  mouseY.set(-gradientSize);\\n}\\nonMount(() => {\\n  mouseX.set(-gradientSize);\\n  mouseY.set(-gradientSize);\\n});\\nlet bg = useMotionTemplate`radial-gradient(${gradSize}px circle at ${mouseX}px ${mouseY}px, ${gradColor}, transparent 100%)`;\\n<\/script>\\n  \\n  <!-- svelte-ignore a11y-no-static-element-interactions -->\\n  <!-- I have added py-4 in below code, you can customize the component as per needs -->\\n  <div\\n    on:mousemove={handleMouseMove}\\n    on:mouseleave={handleMouseLeave}\\n    class={cn(\\n      \\"group relative flex size-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border text-black dark:text-white justify-center py-4\\",\\n      className\\n    )}\\n  >\\n    <div class=\\"relative z-10\\">\\n      <!-- Default  -->\\n      <slot>\\n        <div class=\\"flex items-center justify-center h-full text-center\\">\\n          <p class=\\"text-2xl\\">Magic Card</p>\\n        </div>\\n      </slot>\\n    </div>\\n    <Motion\\n      style={{\\n        background: bg,\\n        opacity: gradientOpacity,\\n      }}\\n      let:motion\\n    >\\n      <div\\n        use:motion\\n        class=\\"pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100\\"\\n      />\\n    </Motion>\\n  </div>\\n  \\n  <style>\\n    .size-full {\\n      width: 100%;\\n      height: 100%;\\n    }\\n  </style>\\n  "],"names":[],"mappings":"AA6DI,yBAAW,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV"}'
    };
    MagicCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { gradientSize = 200 } = $$props;
      let { gradientColor = "#262626" } = $$props;
      let { gradientOpacity = 0.8 } = $$props;
      let { class: className = "" } = $$props;
      let gradSize = motionValue(gradientSize);
      let gradColor = motionValue(gradientColor);
      let mouseX = motionValue(-gradientSize);
      let mouseY = motionValue(-gradientSize);
      let bg = useMotionTemplate`radial-gradient(${gradSize}px circle at ${mouseX}px ${mouseY}px, ${gradColor}, transparent 100%)`;
      if ($$props.gradientSize === void 0 && $$bindings.gradientSize && gradientSize !== void 0) $$bindings.gradientSize(gradientSize);
      if ($$props.gradientColor === void 0 && $$bindings.gradientColor && gradientColor !== void 0) $$bindings.gradientColor(gradientColor);
      if ($$props.gradientOpacity === void 0 && $$bindings.gradientOpacity && gradientOpacity !== void 0) $$bindings.gradientOpacity(gradientOpacity);
      if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
      $$result.css.add(css2);
      return `  <div class="${escape(null_to_empty(cn("group relative flex size-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border text-black dark:text-white justify-center py-4", className)), true) + " svelte-1dd4shl"}"><div class="relative z-10"> ${slots.default ? slots.default({}) : ` <div class="flex items-center justify-center h-full text-center" data-svelte-h="svelte-hd4sv6"><p class="text-2xl">Magic Card</p></div> `}</div> ${validate_component(motion, "Motion").$$render(
        $$result,
        {
          style: { background: bg, opacity: gradientOpacity }
        },
        {},
        {
          default: ({ motion: motion2 }) => {
            return `<div class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>`;
          }
        }
      )} </div>`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_MagicCard();
    init_escape();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const designer = [
        {
          name: "Designer name",
          avatar: "/works.svg"
        }
      ];
      return `<section class="w-[1024px] h-fit mx-auto p-10 justify-center items-center flex-col flex"><h1 class="h1 mb-5 " data-svelte-h="svelte-n6ncpt">Nigerians who Design</h1> <p class="text-center" data-svelte-h="svelte-1pr1va2">Your Favourite Designers, their Pixels,  their Philosopy.</p> <a class="btn variant-filled my-5" href="/directory" data-svelte-h="svelte-1b2glav">See directory</a>  <div class="flex flex-cols min-h-fit w-full mt-10 gap-4">${each(designer, (data) => {
        return `${designer.length > 0 ? `<div class="w-full h-fit"><a href="/directory"><div class="h-fit">${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} ${validate_component(MagicCard, "MagicCard").$$render(
          $$result,
          {
            class: "cursor-pointer w-full flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
            gradientColor: "#ffffff",
            gradientSize: 300
          },
          {},
          {
            default: () => {
              return `${escape(data.name)} `;
            }
          }
        )} </div></a> </div>` : ``}`;
      })}</div> </section>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    imports3 = ["_app/immutable/nodes/2.B1VehKN4.js", "_app/immutable/chunks/DnX5n_Gx.js", "_app/immutable/chunks/a9s_Je2Y.js", "_app/immutable/chunks/Bd87CVZz.js", "_app/immutable/chunks/DQvBfhtt.js"];
    stylesheets3 = ["_app/immutable/assets/MagicCard.DxWaHxfu.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/directory/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/directory/_page.svelte.js"() {
    init_ssr();
    init_MagicCard();
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="grid grid-row gap-6 w-[1024px] mx-auto px-[100px] justify-normal"><div class="flex flex-row gap-10 rounded-3xl items-center justify-center p-10 w-full" data-svelte-h="svelte-ns6ek7"><div class="image w-[200px] h-[200px] bg-slate-800 rounded-[31px] border border-solid border-white "></div> <div class="w-[50%]"><h1 class="h1 mb-5">Faye seun</h1> <p>Every pixel drawn is a delight.......
                some other quotes and design stuffs from me,, cant seem to find a concise sentence smh</p></div></div> <div class="px-[100px]"><h1 class="h3 mb-4" data-svelte-h="svelte-11k6zov">Pixels</h1> <div class="flex h-full flex-row gap-5">${validate_component(MagicCard, "MagicCard").$$render(
        $$result,
        {
          class: "cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
          gradientColor: "#ff009ff",
          gradientSize: 300
        },
        {},
        {
          default: () => {
            return `works`;
          }
        }
      )} ${validate_component(MagicCard, "MagicCard").$$render(
        $$result,
        {
          class: "cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
          gradientColor: "#ff009ff",
          gradientSize: 300
        },
        {},
        {
          default: () => {
            return `works`;
          }
        }
      )} ${validate_component(MagicCard, "MagicCard").$$render(
        $$result,
        {
          class: "cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
          gradientColor: "#ff009ff",
          gradientSize: 300
        },
        {},
        {
          default: () => {
            return `works`;
          }
        }
      )} ${validate_component(MagicCard, "MagicCard").$$render(
        $$result,
        {
          class: "cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap  group hover:border-[#0c19159e] transition-all duration-300",
          gradientColor: "#ff009ff",
          gradientSize: 300
        },
        {},
        {
          default: () => {
            return `works`;
          }
        }
      )}</div></div> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index4 = 3;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    imports4 = ["_app/immutable/nodes/3.DNrosSo3.js", "_app/immutable/chunks/DnX5n_Gx.js", "_app/immutable/chunks/a9s_Je2Y.js", "_app/immutable/chunks/Bd87CVZz.js", "_app/immutable/chunks/DQvBfhtt.js"];
    stylesheets4 = ["_app/immutable/assets/MagicCard.DxWaHxfu.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
init_ssr2();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores: stores2 } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores2);
  }
  afterUpdate(stores2.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores2 !== void 0) $$bindings.stores(stores2);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0) $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0) $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0) $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0) $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0) $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores2.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en" class="light">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover" data-theme="seafoam">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "h1w8gn"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let init2;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    init: init2,
    reroute,
    transport
  };
}

// .svelte-kit/output/server/index.js
init_exports();

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return;
        case "ArrayBuffer":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names2 = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a2, b2) => b2[1] - a2[1]).forEach((entry, i) => {
    names2.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names2.has(thing)) {
      return names2.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        const typedArray = thing;
        return `new ${type}([${typedArray.toString()}])`;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names2.size) {
    const params = [];
    const statements = [];
    const values = [];
    names2.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string") return stringify_string(thing);
  if (thing === void 0) return "void 0";
  if (thing === 0 && 1 / thing < 0) return "-0";
  const str = String(thing);
  if (typeof thing === "number") return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint") return thing + "n";
  return str;
}

// node_modules/devalue/src/base64.js
function encode64(arraybuffer) {
  const dv = new DataView(arraybuffer);
  let binaryString = "";
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    binaryString += String.fromCharCode(dv.getUint8(i));
  }
  return binaryToAscii(binaryString);
}
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function binaryToAscii(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 3) {
    const groupsOfSix = [void 0, void 0, void 0, void 0];
    groupsOfSix[0] = str.charCodeAt(i) >> 2;
    groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
    if (str.length > i + 1) {
      groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
    }
    if (str.length > i + 2) {
      groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += KEY_STRING[groupsOfSix[j]];
      }
    }
  }
  return out;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing)) return indexes.get(thing);
    if (thing === void 0) return UNDEFINED;
    if (Number.isNaN(thing)) return NAN;
    if (thing === Infinity) return POSITIVE_INFINITY;
    if (thing === -Infinity) return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;
    const index6 = p++;
    indexes.set(thing, index6);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index6] = `["${key2}",${flatten(value2)}]`;
        return index6;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0) str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const typedArray = thing;
          const base642 = encode64(typedArray.buffer);
          str = '["' + type + '","' + base642 + '"]';
          break;
        }
        case "ArrayBuffer": {
          const arraybuffer = thing;
          const base642 = encode64(arraybuffer);
          str = `["ArrayBuffer","${base642}"]`;
          break;
        }
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started) str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index6] = str;
    return index6;
  }
  const index5 = flatten(value);
  if (index5 < 0) return `${index5}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string") return stringify_string(thing);
  if (thing instanceof String) return stringify_string(thing.toString());
  if (thing === void 0) return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
  if (type === "bigint") return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_chunks();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var BROWSER = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types2) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a2, b2) => {
    if (a2.q !== b2.q) {
      return b2.q - a2.q;
    }
    if (a2.subtype === "*" !== (b2.subtype === "*")) {
      return a2.subtype === "*" ? 1 : -1;
    }
    if (a2.type === "*" !== (b2.type === "*")) {
      return a2.type === "*" ? 1 : -1;
    }
    return a2.i - b2.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types2) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types2.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
  // Svelte also escapes < because the escape function could be called inside a `noscript` there
  // https://github.com/sveltejs/svelte/security/advisories/GHSA-8266-84wp-wv5c
  // However, that doesn't apply in SvelteKit
};
var escape_html_dict = {
  "&": "&amp;",
  "<": "&lt;"
};
var surrogates = (
  // high surrogate without paired low surrogate
  "[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]"
);
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|` + surrogates,
  "g"
);
var escape_html_regex = new RegExp(
  `[${Object.keys(escape_html_dict).join("")}]|` + surrogates,
  "g"
);
function escape_html(str, is_attr) {
  const dict = is_attr ? escape_html_attr_dict : escape_html_dict;
  const escaped_str = str.replace(is_attr ? escape_html_attr_regex : escape_html_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return escaped_str;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod) allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message: escape_html(message) });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent) uses.push('"parent":1');
  if (node.uses?.route) uses.push('"route":1');
  if (node.uses?.url) uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler2(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true") return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      `POST method not allowed. No form actions exist for ${"this page"}`
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        `POST method not allowed. No form actions exist for ${"this page"}`
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false) ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id, transport) {
  const replacer = (thing) => {
    for (const key2 in transport) {
      const encoded = transport[key2].encode(thing);
      if (encoded) {
        return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
      }
    }
  };
  return try_serialize(data, (value) => uneval(value, replacer), route_id);
}
function stringify_action_response(data, route_id, transport) {
  const encoders = Object.fromEntries(
    Object.entries(transport).map(([key2, value]) => [key2, value.encode])
  );
  return try_serialize(data, (value) => stringify(value, encoders), route_id);
}
function try_serialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`
      );
    }
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "") message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server) return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#Server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i) hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i) hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter2, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter2(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control") cache_control = value;
    else if (key2 === "age") age = value;
    else if (key2 === "vary" && value.trim() === "*") varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url="${escape_html(fetched.url, true)}"`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0]) precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a2;
    let b2;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a2 = w[i2 + 1 & 15];
        b2 = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b2 >>> 17 ^ b2 >>> 19 ^ b2 >>> 10 ^ b2 << 15 ^ b2 << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a2 = bytes[i + 0];
    const b2 = bytes[i + 1];
    const c2 = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c2;
    bytes[i + 2] = b2;
    bytes[i + 3] = a2;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _script_src_needs_csp, _script_src_elem_needs_csp, _style_needs_csp, _style_src_needs_csp, _style_src_attr_needs_csp, _style_src_elem_needs_csp, _directives, _script_src, _script_src_elem, _style_src, _style_src_attr, _style_src_elem, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _script_src_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _script_src_elem_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_src_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_src_attr_needs_csp);
    /** @type {boolean} */
    __privateAdd(this, _style_src_elem_needs_csp);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src_elem);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_attr);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_elem);
    /** @type {string} */
    __privateAdd(this, _nonce);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _script_src_elem, []);
    __privateSet(this, _style_src, []);
    __privateSet(this, _style_src_attr, []);
    __privateSet(this, _style_src_elem, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    const needs_csp = (directive) => !!directive && !directive.some((value) => value === "unsafe-inline");
    __privateSet(this, _script_src_needs_csp, needs_csp(effective_script_src));
    __privateSet(this, _script_src_elem_needs_csp, needs_csp(script_src_elem));
    __privateSet(this, _style_src_needs_csp, needs_csp(effective_style_src));
    __privateSet(this, _style_src_attr_needs_csp, needs_csp(style_src_attr));
    __privateSet(this, _style_src_elem_needs_csp, needs_csp(style_src_elem));
    __privateSet(this, _script_needs_csp, __privateGet(this, _script_src_needs_csp) || __privateGet(this, _script_src_elem_needs_csp));
    __privateSet(this, _style_needs_csp, __privateGet(this, _style_src_needs_csp) || __privateGet(this, _style_src_attr_needs_csp) || __privateGet(this, _style_src_elem_needs_csp));
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (!__privateGet(this, _script_needs_csp)) return;
    const source = __privateGet(this, _use_hashes) ? `sha256-${sha256(content)}` : `nonce-${__privateGet(this, _nonce)}`;
    if (__privateGet(this, _script_src_needs_csp)) {
      __privateGet(this, _script_src).push(source);
    }
    if (__privateGet(this, _script_src_elem_needs_csp)) {
      __privateGet(this, _script_src_elem).push(source);
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (!__privateGet(this, _style_needs_csp)) return;
    const source = __privateGet(this, _use_hashes) ? `sha256-${sha256(content)}` : `nonce-${__privateGet(this, _nonce)}`;
    if (__privateGet(this, _style_src_needs_csp)) {
      __privateGet(this, _style_src).push(source);
    }
    if (__privateGet(this, _style_src_attr_needs_csp)) {
      __privateGet(this, _style_src_attr).push(source);
    }
    if (__privateGet(this, _style_src_elem_needs_csp)) {
      const sha256_empty_comment_hash = "sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = __privateGet(this, _directives);
      if (d["style-src-elem"] && !d["style-src-elem"].includes(sha256_empty_comment_hash) && !__privateGet(this, _style_src_elem).includes(sha256_empty_comment_hash)) {
        __privateGet(this, _style_src_elem).push(sha256_empty_comment_hash);
      }
      if (source !== sha256_empty_comment_hash) {
        __privateGet(this, _style_src_elem).push(source);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _style_src_attr).length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...__privateGet(this, _style_src_attr)
      ];
    }
    if (__privateGet(this, _style_src_elem).length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...__privateGet(this, _style_src_elem)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    if (__privateGet(this, _script_src_elem).length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...__privateGet(this, _script_src_elem)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value) continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_script_src_needs_csp = new WeakMap();
_script_src_elem_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_style_src_needs_csp = new WeakMap();
_style_src_attr_needs_csp = new WeakMap();
_style_src_elem_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_script_src_elem = new WeakMap();
_style_src = new WeakMap();
_style_src_attr = new WeakMap();
_style_src_elem = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content="${escape_html(content, true)}">`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r2) => {
    fulfil = f;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done) deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets5 = new Set(client.stylesheets);
  const fonts5 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  {
    if (!state.prerendering?.fallback) {
      const segments = event.url.pathname.slice(base.length).split("/").slice(2);
      base$1 = segments.map(() => "..").join("/") || ".";
      base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
      if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
        assets$1 = base$1;
      }
    } else if (options2.hash_routing) {
      base_expression = "new URL('.', location).pathname.slice(0, -1)";
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    const render_opts = {
      context: /* @__PURE__ */ new Map([
        [
          "__request__",
          {
            page: props.page
          }
        ]
      ])
    };
    {
      try {
        rendered = options2.root.render(props, render_opts);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports) modulepreloads.add(url);
      for (const url of node.stylesheets) stylesheets5.add(url);
      for (const url of node.fonts) fonts5.add(url);
      if (node.inline_styles && !client.inline) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  const style = client.inline ? client.inline?.style : Array.from(inline_styles.values()).join("\n");
  if (style) {
    const attributes = [];
    if (csp.style_needs_nonce) attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(style);
    head += `
	<style${attributes.join("")}>${style}</style>`;
  }
  for (const dep of stylesheets5) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts5) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b2) => b2.server_data),
    csp,
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    if (!client.inline) {
      const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
        (path) => resolve_opts.preload({ type: "js", path })
      );
      for (const path of included_modulepreloads) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (options2.preload_strategy !== "modulepreload") {
          head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
        } else if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const try_to_resolve = () => {
								if (!deferred.has(id)) {
									setTimeout(try_to_resolve, 0);
									return;
								}
								const { fulfil, reject } = deferred.get(id);
								deferred.delete(id);
								if (error) reject(error);
								else fulfil(data);
							}
							try_to_resolve();
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id,
          options2.hooks.transport
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    const boot = client.inline ? `${client.inline.script}

					__sveltekit_${options2.version_hash}.app.start(${args.join(", ")});` : client.app ? `Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(app, ${args.join(", ")});
					});` : `import(${s(prefixed(client.start))}).then((app) => {
						app.start(${args.join(", ")})
					});`;
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						${boot.replace(/\n/g, "\n	")}
					});`);
    } else {
      blocks.push(boot);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
function get_data(event, options2, nodes, csp, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          const nonce = csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : "";
          push(`<script${nonce}>${global}.resolve(${str})<\/script>
`);
          if (count === 0) done();
        }
      );
      return `${global}.defer(${id})`;
    } else {
      for (const key2 in options2.hooks.transport) {
        const encoded = options2.hooks.transport[key2].encode(thing);
        if (encoded) {
          return `app.decode('${key2}', ${uneval(encoded, replacer)})`;
        }
      }
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done) return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    ...Object.fromEntries(
      Object.entries(options2.hooks.transport).map(([key2, value]) => [key2, value.encode])
    ),
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0) done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node) return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some(
      // prerender in case of trailingSlash because the client retrieves that value from the server
      (node) => node?.server?.load || node?.server?.trailingSlash !== void 0
    );
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      if (BROWSER && action_result && !event.request.headers.has("x-sveltekit-action")) ;
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent) Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error) throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises) p.catch(() => {
    });
    for (const p of load_promises) p.catch(() => {
    });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index5 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index5]();
              let j = i;
              while (!branch[j]) j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest) result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered) return;
  return result;
}
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    get(name, opts) {
      const c2 = new_cookies[name];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const req_cookies = (0, import_cookie.parse)(header, { decode: opts?.decode });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} [opts]
     */
    getAll(opts) {
      const cookies2 = (0, import_cookie.parse)(header, { decode: opts?.decode });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(
            " and "
          )}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain)) continue;
      if (!path_matches(destination.pathname, cookie.options.path)) continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint) return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized) return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint) return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized) return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie) request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type
              }
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ?? (body = `export const env=${JSON.stringify(public_env)}`);
  etag ?? (etag = `W/${Date.now()}`);
  headers ?? (headers = new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  }));
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config) continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  if (options2.hash_routing && url.pathname !== base + "/" && url.pathname !== "/[fallback]") {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(url.pathname);
  let invalidated_data_nodes;
  if (is_data_request) {
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match) continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (BROWSER) ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (BROWSER) ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    } else if (state.emulator?.platform) {
      event.platform = await state.emulator.platform({
        config: {},
        prerender: !!state.prerendering?.fallback
      });
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback) disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value) headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (options2.hash_routing || state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var init_promise;
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: __privateGet(this, _options).env_public_prefix,
      private_prefix: __privateGet(this, _options).env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (read) {
      set_read_implementation(read);
    }
    await (init_promise ?? (init_promise = (async () => {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          }),
          transport: module.transport || {}
        };
        if (module.init) {
          await module.init();
        }
      } catch (error) {
        {
          throw error;
        }
      }
    })()));
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["Avatar.png", "Frame 9.svg", "favicon.png", "fonts/AbrilFatface.ttf", "fonts/PlayfairDisplay-Italic.ttf", "fonts/Quicksand.ttf", "fonts/SpaceGrotesk.ttf", "github.svg", "works.svg"]),
    mimeTypes: { ".png": "image/png", ".svg": "image/svg+xml", ".ttf": "font/ttf" },
    _: {
      client: { "start": "_app/immutable/entry/start.CDELTBjD.js", "app": "_app/immutable/entry/app.CyF4Vct_.js", "imports": ["_app/immutable/entry/start.CDELTBjD.js", "_app/immutable/chunks/BmMq1TOt.js", "_app/immutable/chunks/DnX5n_Gx.js", "_app/immutable/chunks/DQvBfhtt.js", "_app/immutable/entry/app.CyF4Vct_.js", "_app/immutable/chunks/DnX5n_Gx.js", "_app/immutable/chunks/a9s_Je2Y.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/directory",
          pattern: /^\/directory\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch {
  }
  return manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || file in manifest._.server_assets || file + "/index.html" in manifest._.server_assets || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=render.js.map
