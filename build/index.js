/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;var o = n[r] = { i: r, l: !1, exports: {} };return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
  }var n = {};t.m = e, t.c = n, t.d = function (e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(n, "a", n), n;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 0);
}([function (e, t, n) {
  "use strict";
  function r(e) {
    return e && e.__esModule ? e : { default: e };
  }Object.defineProperty(t, "__esModule", { value: !0 });var o = n(1),
      i = r(o),
      u = n(2),
      s = r(u),
      a = { storeKey: "token", ensureSignedIn: function ensureSignedIn() {
      if (!c.isSignedIn()) throw new Error("signIn() must be called first.");
    }, signedInRequest: function signedInRequest(e, t, n) {
      return a.ensureSignedIn(), s.default[e](t, { token: i.default.get(a.storeKey), params: n });
    }, validateParams: function validateParams(e, t) {
      t.forEach(function (t) {
        if (!e.hasOwnProperty(t)) throw new Error("Required param " + t + " not provided.");
      });
    } },
      c = { changePassword: function changePassword(e) {
      return a.validateParams(e, ["password"]), a.signedInRequest("patch", "/password", e);
    }, createEvent: function createEvent(e) {
      return a.validateParams(e, ["name", "details", "startsAt", "endsAt", "eventType"]), a.signedInRequest("post", "/events", e);
    }, createOrganization: function createOrganization(e) {
      return a.validateParams(e, ["name"]), a.signedInRequest("post", "/admin/organizations", e);
    }, createRSVP: function createRSVP(e) {
      a.validateParams(e, ["eventId", "responseType"]);var t = e.eventId;if (delete e.eventId, -1 === ["declined", "interested", "accepted"].indexOf(e.responseType)) throw new Error("responseType parameter must be one of declined, interested, or accepted");return a.signedInRequest("post", "/events/" + t + "/rsvps", e);
    }, getProfile: function getProfile() {
      return a.signedInRequest("get", "/profile", {});
    }, getUser: function getUser(e) {
      return a.validateParams(e, ["userId"]), a.signedInRequest("get", "/users/" + e.userId, {});
    }, getUserEvents: function getUserEvents(e) {
      return a.validateParams(e, ["userId"]), a.signedInRequest("get", "/users/" + e.userId + "/events", {});
    }, isSignedIn: function isSignedIn() {
      return void 0 !== i.default.get(a.storeKey);
    }, registerUser: function registerUser(e) {
      a.validateParams(e, ["token", "name", "email", "password"]);var t = e.token;return delete e.token, a.signedInRequest("post", "/invites/" + t + "/users", e);
    }, sendInvite: function sendInvite(e) {
      return a.validateParams(e, ["email"]), a.signedInRequest("post", "/invites", e);
    }, signIn: function signIn(e) {
      return a.validateParams(e, ["email", "password"]), s.default.post("/api_keys", { params: e }).then(function (e) {
        return i.default.set(a.storeKey, e.token), e;
      });
    }, signOut: function signOut() {
      i.default.clearAll();
    } };window && (window.CultureHQ = c), t.default = c;
}, function (e, t) {
  e.exports = __webpack_require__(1);
}, function (e, t, n) {
  "use strict";
  (function (e) {
    Object.defineProperty(t, "__esModule", { value: !0 });var r = n(4),
        o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(r),
        i = n(5),
        u = void 0;u = "production" === e.env.NODE_ENV ? "https://api.culturehq.net" : "http://localhost:3000";var s = function s(e, t, n) {
      var r = new URL("" + u + t),
          o = { headers: { "Content-Type": "application/json" } };if (n.token && (o.headers.Authorization = "token " + n.token), "GET" === e) {
        var s = (0, i.snakerize)(n.params);Object.keys(s).forEach(function (e) {
          return r.searchParams.append(e, s[e]);
        });
      } else o.method = e, o.body = JSON.stringify((0, i.snakerize)(n.params));return { url: r.href, options: o };
    },
        a = function a(e, t, n) {
      var r = s(e, t, n);return new Promise(function (e, t) {
        (0, o.default)(r.url, r.options).then(function (n) {
          1 === Math.round(n.status / 200) ? n.json().then(function (t) {
            return e((0, i.camelize)(t));
          }).catch(function (e) {
            return t(e);
          }) : t(n.statusText);
        }).catch(function (e) {
          return t(e);
        });
      });
    };t.default = { get: function get(e, t) {
        return a("GET", e, t);
      }, patch: function patch(e, t) {
        return a("PATCH", e, t);
      }, post: function post(e, t) {
        return a("POST", e, t);
      } };
  }).call(t, n(3));
}, function (e, t) {
  function n() {
    throw new Error("setTimeout has not been defined");
  }function r() {
    throw new Error("clearTimeout has not been defined");
  }function o(e) {
    if (f === setTimeout) return setTimeout(e, 0);if ((f === n || !f) && setTimeout) return f = setTimeout, setTimeout(e, 0);try {
      return f(e, 0);
    } catch (t) {
      try {
        return f.call(null, e, 0);
      } catch (t) {
        return f.call(this, e, 0);
      }
    }
  }function i(e) {
    if (l === clearTimeout) return clearTimeout(e);if ((l === r || !l) && clearTimeout) return l = clearTimeout, clearTimeout(e);try {
      return l(e);
    } catch (t) {
      try {
        return l.call(null, e);
      } catch (t) {
        return l.call(this, e);
      }
    }
  }function u() {
    m && p && (m = !1, p.length ? v = p.concat(v) : h = -1, v.length && s());
  }function s() {
    if (!m) {
      var e = o(u);m = !0;for (var t = v.length; t;) {
        for (p = v, v = []; ++h < t;) {
          p && p[h].run();
        }h = -1, t = v.length;
      }p = null, m = !1, i(e);
    }
  }function a(e, t) {
    this.fun = e, this.array = t;
  }function c() {}var f,
      l,
      d = e.exports = {};!function () {
    try {
      f = "function" == typeof setTimeout ? setTimeout : n;
    } catch (e) {
      f = n;
    }try {
      l = "function" == typeof clearTimeout ? clearTimeout : r;
    } catch (e) {
      l = r;
    }
  }();var p,
      v = [],
      m = !1,
      h = -1;d.nextTick = function (e) {
    var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {
      t[n - 1] = arguments[n];
    }v.push(new a(e, t)), 1 !== v.length || m || o(s);
  }, a.prototype.run = function () {
    this.fun.apply(null, this.array);
  }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, d.removeAllListeners = c, d.emit = c, d.prependListener = c, d.prependOnceListener = c, d.listeners = function (e) {
    return [];
  }, d.binding = function (e) {
    throw new Error("process.binding is not supported");
  }, d.cwd = function () {
    return "/";
  }, d.chdir = function (e) {
    throw new Error("process.chdir is not supported");
  }, d.umask = function () {
    return 0;
  };
}, function (e, t) {
  e.exports = __webpack_require__(2);
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });var r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
    return typeof e === "undefined" ? "undefined" : _typeof(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
  },
      o = function o(e) {
    for (var t = /_([a-z])/, n = void 0; null !== (n = t.exec(e));) {
      e = e.replace(n[0], n[1].toUpperCase());
    }return e;
  },
      i = function i(e) {
    for (var t = /([A-Z])/, n = void 0; null !== (n = t.exec(e));) {
      e = e.replace(n[0], "_" + n[1].toLowerCase());
    }return e;
  },
      u = function e(t, n) {
    var o = {},
        i = void 0;return Object.keys(t).forEach(function (u) {
      i = t[u], "object" === (void 0 === i ? "undefined" : r(i)) && (i = e(i, n)), o[n(u)] = i;
    }), o;
  },
      s = function s(e) {
    return u(e, o);
  },
      a = function a(e) {
    return u(e, i);
  };t.camelize = s, t.snakerize = a;
}]);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("store/dist/store.modern");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ })
/******/ ]);