/*! For license information please see main.50652191.js.LICENSE.txt */
(() => {
  var e = {
      49: (e, t) => {
        'use strict';
        var r = Symbol.for('react.element'),
          n = Symbol.for('react.portal'),
          a = Symbol.for('react.fragment'),
          s = Symbol.for('react.strict_mode'),
          o = Symbol.for('react.profiler'),
          i = Symbol.for('react.provider'),
          l = Symbol.for('react.context'),
          c = Symbol.for('react.forward_ref'),
          u = Symbol.for('react.suspense'),
          d = Symbol.for('react.memo'),
          m = Symbol.for('react.lazy'),
          f = Symbol.iterator;
        var p = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          h = Object.assign,
          g = {};
        function x(e, t, r) {
          ((this.props = e), (this.context = t), (this.refs = g), (this.updater = r || p));
        }
        function y() {}
        function v(e, t, r) {
          ((this.props = e), (this.context = t), (this.refs = g), (this.updater = r || p));
        }
        ((x.prototype.isReactComponent = {}),
          (x.prototype.setState = function (e, t) {
            if ('object' !== typeof e && 'function' !== typeof e && null != e)
              throw Error(
                'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
              );
            this.updater.enqueueSetState(this, e, t, 'setState');
          }),
          (x.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
          }),
          (y.prototype = x.prototype));
        var b = (v.prototype = new y());
        ((b.constructor = v), h(b, x.prototype), (b.isPureReactComponent = !0));
        var w = Array.isArray,
          j = Object.prototype.hasOwnProperty,
          k = { current: null },
          N = { key: !0, ref: !0, __self: !0, __source: !0 };
        function S(e, t, n) {
          var a,
            s = {},
            o = null,
            i = null;
          if (null != t)
            for (a in (void 0 !== t.ref && (i = t.ref), void 0 !== t.key && (o = '' + t.key), t))
              j.call(t, a) && !N.hasOwnProperty(a) && (s[a] = t[a]);
          var l = arguments.length - 2;
          if (1 === l) s.children = n;
          else if (1 < l) {
            for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
            s.children = c;
          }
          if (e && e.defaultProps) for (a in (l = e.defaultProps)) void 0 === s[a] && (s[a] = l[a]);
          return { $$typeof: r, type: e, key: o, ref: i, props: s, _owner: k.current };
        }
        function E(e) {
          return 'object' === typeof e && null !== e && e.$$typeof === r;
        }
        var C = /\/+/g;
        function P(e, t) {
          return 'object' === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { '=': '=0', ':': '=2' };
                return (
                  '$' +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })('' + e.key)
            : t.toString(36);
        }
        function _(e, t, a, s, o) {
          var i = typeof e;
          ('undefined' !== i && 'boolean' !== i) || (e = null);
          var l = !1;
          if (null === e) l = !0;
          else
            switch (i) {
              case 'string':
              case 'number':
                l = !0;
                break;
              case 'object':
                switch (e.$$typeof) {
                  case r:
                  case n:
                    l = !0;
                }
            }
          if (l)
            return (
              (o = o((l = e))),
              (e = '' === s ? '.' + P(l, 0) : s),
              w(o)
                ? ((a = ''),
                  null != e && (a = e.replace(C, '$&/') + '/'),
                  _(o, t, a, '', function (e) {
                    return e;
                  }))
                : null != o &&
                  (E(o) &&
                    (o = (function (e, t) {
                      return {
                        $$typeof: r,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      o,
                      a +
                        (!o.key || (l && l.key === o.key)
                          ? ''
                          : ('' + o.key).replace(C, '$&/') + '/') +
                        e
                    )),
                  t.push(o)),
              1
            );
          if (((l = 0), (s = '' === s ? '.' : s + ':'), w(e)))
            for (var c = 0; c < e.length; c++) {
              var u = s + P((i = e[c]), c);
              l += _(i, t, a, u, o);
            }
          else if (
            ((u = (function (e) {
              return null === e || 'object' !== typeof e
                ? null
                : 'function' === typeof (e = (f && e[f]) || e['@@iterator'])
                  ? e
                  : null;
            })(e)),
            'function' === typeof u)
          )
            for (e = u.call(e), c = 0; !(i = e.next()).done; )
              l += _((i = i.value), t, a, (u = s + P(i, c++)), o);
          else if ('object' === i)
            throw (
              (t = String(e)),
              Error(
                'Objects are not valid as a React child (found: ' +
                  ('[object Object]' === t
                    ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                    : t) +
                  '). If you meant to render a collection of children, use an array instead.'
              )
            );
          return l;
        }
        function O(e, t, r) {
          if (null == e) return e;
          var n = [],
            a = 0;
          return (
            _(e, n, '', '', function (e) {
              return t.call(r, e, a++);
            }),
            n
          );
        }
        function R(e) {
          if (-1 === e._status) {
            var t = e._result;
            ((t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t)));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var T = { current: null },
          L = { transition: null },
          A = { ReactCurrentDispatcher: T, ReactCurrentBatchConfig: L, ReactCurrentOwner: k };
        function z() {
          throw Error('act(...) is not supported in production builds of React.');
        }
        ((t.Children = {
          map: O,
          forEach: function (e, t, r) {
            O(
              e,
              function () {
                t.apply(this, arguments);
              },
              r
            );
          },
          count: function (e) {
            var t = 0;
            return (
              O(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              O(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!E(e))
              throw Error('React.Children.only expected to receive a single React element child.');
            return e;
          },
        }),
          (t.Component = x),
          (t.Fragment = a),
          (t.Profiler = o),
          (t.PureComponent = v),
          (t.StrictMode = s),
          (t.Suspense = u),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = A),
          (t.act = z),
          (t.cloneElement = function (e, t, n) {
            if (null === e || void 0 === e)
              throw Error(
                'React.cloneElement(...): The argument must be a React element, but you passed ' +
                  e +
                  '.'
              );
            var a = h({}, e.props),
              s = e.key,
              o = e.ref,
              i = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((o = t.ref), (i = k.current)),
                void 0 !== t.key && (s = '' + t.key),
                e.type && e.type.defaultProps)
              )
                var l = e.type.defaultProps;
              for (c in t)
                j.call(t, c) &&
                  !N.hasOwnProperty(c) &&
                  (a[c] = void 0 === t[c] && void 0 !== l ? l[c] : t[c]);
            }
            var c = arguments.length - 2;
            if (1 === c) a.children = n;
            else if (1 < c) {
              l = Array(c);
              for (var u = 0; u < c; u++) l[u] = arguments[u + 2];
              a.children = l;
            }
            return { $$typeof: r, type: e.type, key: s, ref: o, props: a, _owner: i };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: l,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: i, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = S),
          (t.createFactory = function (e) {
            var t = S.bind(null, e);
            return ((t.type = e), t);
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: c, render: e };
          }),
          (t.isValidElement = E),
          (t.lazy = function (e) {
            return { $$typeof: m, _payload: { _status: -1, _result: e }, _init: R };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = L.transition;
            L.transition = {};
            try {
              e();
            } finally {
              L.transition = t;
            }
          }),
          (t.unstable_act = z),
          (t.useCallback = function (e, t) {
            return T.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return T.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return T.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return T.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return T.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, r) {
            return T.current.useImperativeHandle(e, t, r);
          }),
          (t.useInsertionEffect = function (e, t) {
            return T.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return T.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return T.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, r) {
            return T.current.useReducer(e, t, r);
          }),
          (t.useRef = function (e) {
            return T.current.useRef(e);
          }),
          (t.useState = function (e) {
            return T.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, r) {
            return T.current.useSyncExternalStore(e, t, r);
          }),
          (t.useTransition = function () {
            return T.current.useTransition();
          }),
          (t.version = '18.3.1'));
      },
      119: (e, t, r) => {
        'use strict';
        (!(function e() {
          if (
            'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = r(345)));
      },
      340: (e, t, r) => {
        'use strict';
        e.exports = r(761);
      },
      345: (e, t, r) => {
        'use strict';
        var n = r(950),
          a = r(340);
        function s(e) {
          for (
            var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, r = 1;
            r < arguments.length;
            r++
          )
            t += '&args[]=' + encodeURIComponent(arguments[r]);
          return (
            'Minified React error #' +
            e +
            '; visit ' +
            t +
            ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
          );
        }
        var o = new Set(),
          i = {};
        function l(e, t) {
          (c(e, t), c(e + 'Capture', t));
        }
        function c(e, t) {
          for (i[e] = t, e = 0; e < t.length; e++) o.add(t[e]);
        }
        var u = !(
            'undefined' === typeof window ||
            'undefined' === typeof window.document ||
            'undefined' === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          m =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          f = {},
          p = {};
        function h(e, t, r, n, a, s, o) {
          ((this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = n),
            (this.attributeNamespace = a),
            (this.mustUseProperty = r),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = s),
            (this.removeEmptyString = o));
        }
        var g = {};
        ('children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
          .split(' ')
          .forEach(function (e) {
            g[e] = new h(e, 0, !1, e, null, !1, !1);
          }),
          [
            ['acceptCharset', 'accept-charset'],
            ['className', 'class'],
            ['htmlFor', 'for'],
            ['httpEquiv', 'http-equiv'],
          ].forEach(function (e) {
            var t = e[0];
            g[t] = new h(t, 1, !1, e[1], null, !1, !1);
          }),
          ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
            g[e] = new h(e, 2, !1, e.toLowerCase(), null, !1, !1);
          }),
          ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(
            function (e) {
              g[e] = new h(e, 2, !1, e, null, !1, !1);
            }
          ),
          'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
            .split(' ')
            .forEach(function (e) {
              g[e] = new h(e, 3, !1, e.toLowerCase(), null, !1, !1);
            }),
          ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
            g[e] = new h(e, 3, !0, e, null, !1, !1);
          }),
          ['capture', 'download'].forEach(function (e) {
            g[e] = new h(e, 4, !1, e, null, !1, !1);
          }),
          ['cols', 'rows', 'size', 'span'].forEach(function (e) {
            g[e] = new h(e, 6, !1, e, null, !1, !1);
          }),
          ['rowSpan', 'start'].forEach(function (e) {
            g[e] = new h(e, 5, !1, e.toLowerCase(), null, !1, !1);
          }));
        var x = /[\-:]([a-z])/g;
        function y(e) {
          return e[1].toUpperCase();
        }
        function v(e, t, r, n) {
          var a = g.hasOwnProperty(t) ? g[t] : null;
          (null !== a
            ? 0 !== a.type
            : n ||
              !(2 < t.length) ||
              ('o' !== t[0] && 'O' !== t[0]) ||
              ('n' !== t[1] && 'N' !== t[1])) &&
            ((function (e, t, r, n) {
              if (
                null === t ||
                'undefined' === typeof t ||
                (function (e, t, r, n) {
                  if (null !== r && 0 === r.type) return !1;
                  switch (typeof t) {
                    case 'function':
                    case 'symbol':
                      return !0;
                    case 'boolean':
                      return (
                        !n &&
                        (null !== r
                          ? !r.acceptsBooleans
                          : 'data-' !== (e = e.toLowerCase().slice(0, 5)) && 'aria-' !== e)
                      );
                    default:
                      return !1;
                  }
                })(e, t, r, n)
              )
                return !0;
              if (n) return !1;
              if (null !== r)
                switch (r.type) {
                  case 3:
                    return !t;
                  case 4:
                    return !1 === t;
                  case 5:
                    return isNaN(t);
                  case 6:
                    return isNaN(t) || 1 > t;
                }
              return !1;
            })(t, r, a, n) && (r = null),
            n || null === a
              ? (function (e) {
                  return (
                    !!d.call(p, e) ||
                    (!d.call(f, e) && (m.test(e) ? (p[e] = !0) : ((f[e] = !0), !1)))
                  );
                })(t) && (null === r ? e.removeAttribute(t) : e.setAttribute(t, '' + r))
              : a.mustUseProperty
                ? (e[a.propertyName] = null === r ? 3 !== a.type && '' : r)
                : ((t = a.attributeName),
                  (n = a.attributeNamespace),
                  null === r
                    ? e.removeAttribute(t)
                    : ((r = 3 === (a = a.type) || (4 === a && !0 === r) ? '' : '' + r),
                      n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
        }
        ('accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
          .split(' ')
          .forEach(function (e) {
            var t = e.replace(x, y);
            g[t] = new h(t, 1, !1, e, null, !1, !1);
          }),
          'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
            .split(' ')
            .forEach(function (e) {
              var t = e.replace(x, y);
              g[t] = new h(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
            }),
          ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
            var t = e.replace(x, y);
            g[t] = new h(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
          }),
          ['tabIndex', 'crossOrigin'].forEach(function (e) {
            g[e] = new h(e, 1, !1, e.toLowerCase(), null, !1, !1);
          }),
          (g.xlinkHref = new h(
            'xlinkHref',
            1,
            !1,
            'xlink:href',
            'http://www.w3.org/1999/xlink',
            !0,
            !1
          )),
          ['src', 'href', 'action', 'formAction'].forEach(function (e) {
            g[e] = new h(e, 1, !1, e.toLowerCase(), null, !0, !0);
          }));
        var b = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          w = Symbol.for('react.element'),
          j = Symbol.for('react.portal'),
          k = Symbol.for('react.fragment'),
          N = Symbol.for('react.strict_mode'),
          S = Symbol.for('react.profiler'),
          E = Symbol.for('react.provider'),
          C = Symbol.for('react.context'),
          P = Symbol.for('react.forward_ref'),
          _ = Symbol.for('react.suspense'),
          O = Symbol.for('react.suspense_list'),
          R = Symbol.for('react.memo'),
          T = Symbol.for('react.lazy');
        (Symbol.for('react.scope'), Symbol.for('react.debug_trace_mode'));
        var L = Symbol.for('react.offscreen');
        (Symbol.for('react.legacy_hidden'),
          Symbol.for('react.cache'),
          Symbol.for('react.tracing_marker'));
        var A = Symbol.iterator;
        function z(e) {
          return null === e || 'object' !== typeof e
            ? null
            : 'function' === typeof (e = (A && e[A]) || e['@@iterator'])
              ? e
              : null;
        }
        var F,
          M = Object.assign;
        function I(e) {
          if (void 0 === F)
            try {
              throw Error();
            } catch (r) {
              var t = r.stack.trim().match(/\n( *(at )?)/);
              F = (t && t[1]) || '';
            }
          return '\n' + F + e;
        }
        var D = !1;
        function U(e, t) {
          if (!e || D) return '';
          D = !0;
          var r = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error();
                }),
                Object.defineProperty(t.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                'object' === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, []);
                } catch (c) {
                  var n = c;
                }
                Reflect.construct(e, [], t);
              } else {
                try {
                  t.call();
                } catch (c) {
                  n = c;
                }
                e.call(t.prototype);
              }
            else {
              try {
                throw Error();
              } catch (c) {
                n = c;
              }
              e();
            }
          } catch (c) {
            if (c && n && 'string' === typeof c.stack) {
              for (
                var a = c.stack.split('\n'),
                  s = n.stack.split('\n'),
                  o = a.length - 1,
                  i = s.length - 1;
                1 <= o && 0 <= i && a[o] !== s[i];

              )
                i--;
              for (; 1 <= o && 0 <= i; o--, i--)
                if (a[o] !== s[i]) {
                  if (1 !== o || 1 !== i)
                    do {
                      if ((o--, 0 > --i || a[o] !== s[i])) {
                        var l = '\n' + a[o].replace(' at new ', ' at ');
                        return (
                          e.displayName &&
                            l.includes('<anonymous>') &&
                            (l = l.replace('<anonymous>', e.displayName)),
                          l
                        );
                      }
                    } while (1 <= o && 0 <= i);
                  break;
                }
            }
          } finally {
            ((D = !1), (Error.prepareStackTrace = r));
          }
          return (e = e ? e.displayName || e.name : '') ? I(e) : '';
        }
        function B(e) {
          switch (e.tag) {
            case 5:
              return I(e.type);
            case 16:
              return I('Lazy');
            case 13:
              return I('Suspense');
            case 19:
              return I('SuspenseList');
            case 0:
            case 2:
            case 15:
              return (e = U(e.type, !1));
            case 11:
              return (e = U(e.type.render, !1));
            case 1:
              return (e = U(e.type, !0));
            default:
              return '';
          }
        }
        function W(e) {
          if (null == e) return null;
          if ('function' === typeof e) return e.displayName || e.name || null;
          if ('string' === typeof e) return e;
          switch (e) {
            case k:
              return 'Fragment';
            case j:
              return 'Portal';
            case S:
              return 'Profiler';
            case N:
              return 'StrictMode';
            case _:
              return 'Suspense';
            case O:
              return 'SuspenseList';
          }
          if ('object' === typeof e)
            switch (e.$$typeof) {
              case C:
                return (e.displayName || 'Context') + '.Consumer';
              case E:
                return (e._context.displayName || 'Context') + '.Provider';
              case P:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      '' !== (e = t.displayName || t.name || '')
                        ? 'ForwardRef(' + e + ')'
                        : 'ForwardRef'),
                  e
                );
              case R:
                return null !== (t = e.displayName || null) ? t : W(e.type) || 'Memo';
              case T:
                ((t = e._payload), (e = e._init));
                try {
                  return W(e(t));
                } catch (r) {}
            }
          return null;
        }
        function $(e) {
          var t = e.type;
          switch (e.tag) {
            case 24:
              return 'Cache';
            case 9:
              return (t.displayName || 'Context') + '.Consumer';
            case 10:
              return (t._context.displayName || 'Context') + '.Provider';
            case 18:
              return 'DehydratedFragment';
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ''),
                t.displayName || ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
              );
            case 7:
              return 'Fragment';
            case 5:
              return t;
            case 4:
              return 'Portal';
            case 3:
              return 'Root';
            case 6:
              return 'Text';
            case 16:
              return W(t);
            case 8:
              return t === N ? 'StrictMode' : 'Mode';
            case 22:
              return 'Offscreen';
            case 12:
              return 'Profiler';
            case 21:
              return 'Scope';
            case 13:
              return 'Suspense';
            case 19:
              return 'SuspenseList';
            case 25:
              return 'TracingMarker';
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ('function' === typeof t) return t.displayName || t.name || null;
              if ('string' === typeof t) return t;
          }
          return null;
        }
        function H(e) {
          switch (typeof e) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'undefined':
            case 'object':
              return e;
            default:
              return '';
          }
        }
        function q(e) {
          var t = e.type;
          return (
            (e = e.nodeName) && 'input' === e.toLowerCase() && ('checkbox' === t || 'radio' === t)
          );
        }
        function V(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = q(e) ? 'checked' : 'value',
                r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                n = '' + e[t];
              if (
                !e.hasOwnProperty(t) &&
                'undefined' !== typeof r &&
                'function' === typeof r.get &&
                'function' === typeof r.set
              ) {
                var a = r.get,
                  s = r.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return a.call(this);
                    },
                    set: function (e) {
                      ((n = '' + e), s.call(this, e));
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: r.enumerable }),
                  {
                    getValue: function () {
                      return n;
                    },
                    setValue: function (e) {
                      n = '' + e;
                    },
                    stopTracking: function () {
                      ((e._valueTracker = null), delete e[t]);
                    },
                  }
                );
              }
            })(e));
        }
        function G(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var r = t.getValue(),
            n = '';
          return (
            e && (n = q(e) ? (e.checked ? 'true' : 'false') : e.value),
            (e = n) !== r && (t.setValue(e), !0)
          );
        }
        function Q(e) {
          if (
            'undefined' === typeof (e = e || ('undefined' !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        function Y(e, t) {
          var r = t.checked;
          return M({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != r ? r : e._wrapperState.initialChecked,
          });
        }
        function K(e, t) {
          var r = null == t.defaultValue ? '' : t.defaultValue,
            n = null != t.checked ? t.checked : t.defaultChecked;
          ((r = H(null != t.value ? t.value : r)),
            (e._wrapperState = {
              initialChecked: n,
              initialValue: r,
              controlled:
                'checkbox' === t.type || 'radio' === t.type ? null != t.checked : null != t.value,
            }));
        }
        function Z(e, t) {
          null != (t = t.checked) && v(e, 'checked', t, !1);
        }
        function J(e, t) {
          Z(e, t);
          var r = H(t.value),
            n = t.type;
          if (null != r)
            'number' === n
              ? ((0 === r && '' === e.value) || e.value != r) && (e.value = '' + r)
              : e.value !== '' + r && (e.value = '' + r);
          else if ('submit' === n || 'reset' === n) return void e.removeAttribute('value');
          (t.hasOwnProperty('value')
            ? ee(e, t.type, r)
            : t.hasOwnProperty('defaultValue') && ee(e, t.type, H(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked));
        }
        function X(e, t, r) {
          if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
            var n = t.type;
            if (!(('submit' !== n && 'reset' !== n) || (void 0 !== t.value && null !== t.value)))
              return;
            ((t = '' + e._wrapperState.initialValue),
              r || t === e.value || (e.value = t),
              (e.defaultValue = t));
          }
          ('' !== (r = e.name) && (e.name = ''),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            '' !== r && (e.name = r));
        }
        function ee(e, t, r) {
          ('number' === t && Q(e.ownerDocument) === e) ||
            (null == r
              ? (e.defaultValue = '' + e._wrapperState.initialValue)
              : e.defaultValue !== '' + r && (e.defaultValue = '' + r));
        }
        var te = Array.isArray;
        function re(e, t, r, n) {
          if (((e = e.options), t)) {
            t = {};
            for (var a = 0; a < r.length; a++) t['$' + r[a]] = !0;
            for (r = 0; r < e.length; r++)
              ((a = t.hasOwnProperty('$' + e[r].value)),
                e[r].selected !== a && (e[r].selected = a),
                a && n && (e[r].defaultSelected = !0));
          } else {
            for (r = '' + H(r), t = null, a = 0; a < e.length; a++) {
              if (e[a].value === r)
                return ((e[a].selected = !0), void (n && (e[a].defaultSelected = !0)));
              null !== t || e[a].disabled || (t = e[a]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function ne(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(s(91));
          return M({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: '' + e._wrapperState.initialValue,
          });
        }
        function ae(e, t) {
          var r = t.value;
          if (null == r) {
            if (((r = t.children), (t = t.defaultValue), null != r)) {
              if (null != t) throw Error(s(92));
              if (te(r)) {
                if (1 < r.length) throw Error(s(93));
                r = r[0];
              }
              t = r;
            }
            (null == t && (t = ''), (r = t));
          }
          e._wrapperState = { initialValue: H(r) };
        }
        function se(e, t) {
          var r = H(t.value),
            n = H(t.defaultValue);
          (null != r &&
            ((r = '' + r) !== e.value && (e.value = r),
            null == t.defaultValue && e.defaultValue !== r && (e.defaultValue = r)),
            null != n && (e.defaultValue = '' + n));
        }
        function oe(e) {
          var t = e.textContent;
          t === e._wrapperState.initialValue && '' !== t && null !== t && (e.value = t);
        }
        function ie(e) {
          switch (e) {
            case 'svg':
              return 'http://www.w3.org/2000/svg';
            case 'math':
              return 'http://www.w3.org/1998/Math/MathML';
            default:
              return 'http://www.w3.org/1999/xhtml';
          }
        }
        function le(e, t) {
          return null == e || 'http://www.w3.org/1999/xhtml' === e
            ? ie(t)
            : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
              ? 'http://www.w3.org/1999/xhtml'
              : e;
        }
        var ce,
          ue,
          de =
            ((ue = function (e, t) {
              if ('http://www.w3.org/2000/svg' !== e.namespaceURI || 'innerHTML' in e)
                e.innerHTML = t;
              else {
                for (
                  (ce = ce || document.createElement('div')).innerHTML =
                    '<svg>' + t.valueOf().toString() + '</svg>',
                    t = ce.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild);
                for (; t.firstChild; ) e.appendChild(t.firstChild);
              }
            }),
            'undefined' !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, r, n) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ue(e, t);
                  });
                }
              : ue);
        function me(e, t) {
          if (t) {
            var r = e.firstChild;
            if (r && r === e.lastChild && 3 === r.nodeType) return void (r.nodeValue = t);
          }
          e.textContent = t;
        }
        var fe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          pe = ['Webkit', 'ms', 'Moz', 'O'];
        function he(e, t, r) {
          return null == t || 'boolean' === typeof t || '' === t
            ? ''
            : r || 'number' !== typeof t || 0 === t || (fe.hasOwnProperty(e) && fe[e])
              ? ('' + t).trim()
              : t + 'px';
        }
        function ge(e, t) {
          for (var r in ((e = e.style), t))
            if (t.hasOwnProperty(r)) {
              var n = 0 === r.indexOf('--'),
                a = he(r, t[r], n);
              ('float' === r && (r = 'cssFloat'), n ? e.setProperty(r, a) : (e[r] = a));
            }
        }
        Object.keys(fe).forEach(function (e) {
          pe.forEach(function (t) {
            ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (fe[t] = fe[e]));
          });
        });
        var xe = M(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        );
        function ye(e, t) {
          if (t) {
            if (xe[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
              throw Error(s(137, e));
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(s(60));
              if (
                'object' !== typeof t.dangerouslySetInnerHTML ||
                !('__html' in t.dangerouslySetInnerHTML)
              )
                throw Error(s(61));
            }
            if (null != t.style && 'object' !== typeof t.style) throw Error(s(62));
          }
        }
        function ve(e, t) {
          if (-1 === e.indexOf('-')) return 'string' === typeof t.is;
          switch (e) {
            case 'annotation-xml':
            case 'color-profile':
            case 'font-face':
            case 'font-face-src':
            case 'font-face-uri':
            case 'font-face-format':
            case 'font-face-name':
            case 'missing-glyph':
              return !1;
            default:
              return !0;
          }
        }
        var be = null;
        function we(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var je = null,
          ke = null,
          Ne = null;
        function Se(e) {
          if ((e = va(e))) {
            if ('function' !== typeof je) throw Error(s(280));
            var t = e.stateNode;
            t && ((t = wa(t)), je(e.stateNode, e.type, t));
          }
        }
        function Ee(e) {
          ke ? (Ne ? Ne.push(e) : (Ne = [e])) : (ke = e);
        }
        function Ce() {
          if (ke) {
            var e = ke,
              t = Ne;
            if (((Ne = ke = null), Se(e), t)) for (e = 0; e < t.length; e++) Se(t[e]);
          }
        }
        function Pe(e, t) {
          return e(t);
        }
        function _e() {}
        var Oe = !1;
        function Re(e, t, r) {
          if (Oe) return e(t, r);
          Oe = !0;
          try {
            return Pe(e, t, r);
          } finally {
            ((Oe = !1), (null !== ke || null !== Ne) && (_e(), Ce()));
          }
        }
        function Te(e, t) {
          var r = e.stateNode;
          if (null === r) return null;
          var n = wa(r);
          if (null === n) return null;
          r = n[t];
          e: switch (t) {
            case 'onClick':
            case 'onClickCapture':
            case 'onDoubleClick':
            case 'onDoubleClickCapture':
            case 'onMouseDown':
            case 'onMouseDownCapture':
            case 'onMouseMove':
            case 'onMouseMoveCapture':
            case 'onMouseUp':
            case 'onMouseUpCapture':
            case 'onMouseEnter':
              ((n = !n.disabled) ||
                (n = !(
                  'button' === (e = e.type) ||
                  'input' === e ||
                  'select' === e ||
                  'textarea' === e
                )),
                (e = !n));
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (r && 'function' !== typeof r) throw Error(s(231, t, typeof r));
          return r;
        }
        var Le = !1;
        if (u)
          try {
            var Ae = {};
            (Object.defineProperty(Ae, 'passive', {
              get: function () {
                Le = !0;
              },
            }),
              window.addEventListener('test', Ae, Ae),
              window.removeEventListener('test', Ae, Ae));
          } catch (ue) {
            Le = !1;
          }
        function ze(e, t, r, n, a, s, o, i, l) {
          var c = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(r, c);
          } catch (u) {
            this.onError(u);
          }
        }
        var Fe = !1,
          Me = null,
          Ie = !1,
          De = null,
          Ue = {
            onError: function (e) {
              ((Fe = !0), (Me = e));
            },
          };
        function Be(e, t, r, n, a, s, o, i, l) {
          ((Fe = !1), (Me = null), ze.apply(Ue, arguments));
        }
        function We(e) {
          var t = e,
            r = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              (0 !== (4098 & (t = e).flags) && (r = t.return), (e = t.return));
            } while (e);
          }
          return 3 === t.tag ? r : null;
        }
        function $e(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if ((null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t))
              return t.dehydrated;
          }
          return null;
        }
        function He(e) {
          if (We(e) !== e) throw Error(s(188));
        }
        function qe(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = We(e))) throw Error(s(188));
                return t !== e ? null : e;
              }
              for (var r = e, n = t; ; ) {
                var a = r.return;
                if (null === a) break;
                var o = a.alternate;
                if (null === o) {
                  if (null !== (n = a.return)) {
                    r = n;
                    continue;
                  }
                  break;
                }
                if (a.child === o.child) {
                  for (o = a.child; o; ) {
                    if (o === r) return (He(a), e);
                    if (o === n) return (He(a), t);
                    o = o.sibling;
                  }
                  throw Error(s(188));
                }
                if (r.return !== n.return) ((r = a), (n = o));
                else {
                  for (var i = !1, l = a.child; l; ) {
                    if (l === r) {
                      ((i = !0), (r = a), (n = o));
                      break;
                    }
                    if (l === n) {
                      ((i = !0), (n = a), (r = o));
                      break;
                    }
                    l = l.sibling;
                  }
                  if (!i) {
                    for (l = o.child; l; ) {
                      if (l === r) {
                        ((i = !0), (r = o), (n = a));
                        break;
                      }
                      if (l === n) {
                        ((i = !0), (n = o), (r = a));
                        break;
                      }
                      l = l.sibling;
                    }
                    if (!i) throw Error(s(189));
                  }
                }
                if (r.alternate !== n) throw Error(s(190));
              }
              if (3 !== r.tag) throw Error(s(188));
              return r.stateNode.current === r ? e : t;
            })(e))
            ? Ve(e)
            : null;
        }
        function Ve(e) {
          if (5 === e.tag || 6 === e.tag) return e;
          for (e = e.child; null !== e; ) {
            var t = Ve(e);
            if (null !== t) return t;
            e = e.sibling;
          }
          return null;
        }
        var Ge = a.unstable_scheduleCallback,
          Qe = a.unstable_cancelCallback,
          Ye = a.unstable_shouldYield,
          Ke = a.unstable_requestPaint,
          Ze = a.unstable_now,
          Je = a.unstable_getCurrentPriorityLevel,
          Xe = a.unstable_ImmediatePriority,
          et = a.unstable_UserBlockingPriority,
          tt = a.unstable_NormalPriority,
          rt = a.unstable_LowPriority,
          nt = a.unstable_IdlePriority,
          at = null,
          st = null;
        var ot = Math.clz32
            ? Math.clz32
            : function (e) {
                return ((e >>>= 0), 0 === e ? 32 : (31 - ((it(e) / lt) | 0)) | 0);
              },
          it = Math.log,
          lt = Math.LN2;
        var ct = 64,
          ut = 4194304;
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 1073741824;
            default:
              return e;
          }
        }
        function mt(e, t) {
          var r = e.pendingLanes;
          if (0 === r) return 0;
          var n = 0,
            a = e.suspendedLanes,
            s = e.pingedLanes,
            o = 268435455 & r;
          if (0 !== o) {
            var i = o & ~a;
            0 !== i ? (n = dt(i)) : 0 !== (s &= o) && (n = dt(s));
          } else 0 !== (o = r & ~a) ? (n = dt(o)) : 0 !== s && (n = dt(s));
          if (0 === n) return 0;
          if (
            0 !== t &&
            t !== n &&
            0 === (t & a) &&
            ((a = n & -n) >= (s = t & -t) || (16 === a && 0 !== (4194240 & s)))
          )
            return t;
          if ((0 !== (4 & n) && (n |= 16 & r), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= n; 0 < t; )
              ((a = 1 << (r = 31 - ot(t))), (n |= e[r]), (t &= ~a));
          return n;
        }
        function ft(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function pt(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
        }
        function ht() {
          var e = ct;
          return (0 === (4194240 & (ct <<= 1)) && (ct = 64), e);
        }
        function gt(e) {
          for (var t = [], r = 0; 31 > r; r++) t.push(e);
          return t;
        }
        function xt(e, t, r) {
          ((e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - ot(t))] = r));
        }
        function yt(e, t) {
          var r = (e.entangledLanes |= t);
          for (e = e.entanglements; r; ) {
            var n = 31 - ot(r),
              a = 1 << n;
            ((a & t) | (e[n] & t) && (e[n] |= t), (r &= ~a));
          }
        }
        var vt = 0;
        function bt(e) {
          return 1 < (e &= -e) ? (4 < e ? (0 !== (268435455 & e) ? 16 : 536870912) : 4) : 1;
        }
        var wt,
          jt,
          kt,
          Nt,
          St,
          Et = !1,
          Ct = [],
          Pt = null,
          _t = null,
          Ot = null,
          Rt = new Map(),
          Tt = new Map(),
          Lt = [],
          At =
            'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
              ' '
            );
        function zt(e, t) {
          switch (e) {
            case 'focusin':
            case 'focusout':
              Pt = null;
              break;
            case 'dragenter':
            case 'dragleave':
              _t = null;
              break;
            case 'mouseover':
            case 'mouseout':
              Ot = null;
              break;
            case 'pointerover':
            case 'pointerout':
              Rt.delete(t.pointerId);
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
              Tt.delete(t.pointerId);
          }
        }
        function Ft(e, t, r, n, a, s) {
          return null === e || e.nativeEvent !== s
            ? ((e = {
                blockedOn: t,
                domEventName: r,
                eventSystemFlags: n,
                nativeEvent: s,
                targetContainers: [a],
              }),
              null !== t && null !== (t = va(t)) && jt(t),
              e)
            : ((e.eventSystemFlags |= n),
              (t = e.targetContainers),
              null !== a && -1 === t.indexOf(a) && t.push(a),
              e);
        }
        function Mt(e) {
          var t = ya(e.target);
          if (null !== t) {
            var r = We(t);
            if (null !== r)
              if (13 === (t = r.tag)) {
                if (null !== (t = $e(r)))
                  return (
                    (e.blockedOn = t),
                    void St(e.priority, function () {
                      kt(r);
                    })
                  );
              } else if (3 === t && r.stateNode.current.memoizedState.isDehydrated)
                return void (e.blockedOn = 3 === r.tag ? r.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function It(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var r = Yt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (null !== r) return (null !== (t = va(r)) && jt(t), (e.blockedOn = r), !1);
            var n = new (r = e.nativeEvent).constructor(r.type, r);
            ((be = n), r.target.dispatchEvent(n), (be = null), t.shift());
          }
          return !0;
        }
        function Dt(e, t, r) {
          It(e) && r.delete(t);
        }
        function Ut() {
          ((Et = !1),
            null !== Pt && It(Pt) && (Pt = null),
            null !== _t && It(_t) && (_t = null),
            null !== Ot && It(Ot) && (Ot = null),
            Rt.forEach(Dt),
            Tt.forEach(Dt));
        }
        function Bt(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            Et || ((Et = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, Ut)));
        }
        function Wt(e) {
          function t(t) {
            return Bt(t, e);
          }
          if (0 < Ct.length) {
            Bt(Ct[0], e);
            for (var r = 1; r < Ct.length; r++) {
              var n = Ct[r];
              n.blockedOn === e && (n.blockedOn = null);
            }
          }
          for (
            null !== Pt && Bt(Pt, e),
              null !== _t && Bt(_t, e),
              null !== Ot && Bt(Ot, e),
              Rt.forEach(t),
              Tt.forEach(t),
              r = 0;
            r < Lt.length;
            r++
          )
            (n = Lt[r]).blockedOn === e && (n.blockedOn = null);
          for (; 0 < Lt.length && null === (r = Lt[0]).blockedOn; )
            (Mt(r), null === r.blockedOn && Lt.shift());
        }
        var $t = b.ReactCurrentBatchConfig,
          Ht = !0;
        function qt(e, t, r, n) {
          var a = vt,
            s = $t.transition;
          $t.transition = null;
          try {
            ((vt = 1), Gt(e, t, r, n));
          } finally {
            ((vt = a), ($t.transition = s));
          }
        }
        function Vt(e, t, r, n) {
          var a = vt,
            s = $t.transition;
          $t.transition = null;
          try {
            ((vt = 4), Gt(e, t, r, n));
          } finally {
            ((vt = a), ($t.transition = s));
          }
        }
        function Gt(e, t, r, n) {
          if (Ht) {
            var a = Yt(e, t, r, n);
            if (null === a) (Hn(e, t, n, Qt, r), zt(e, n));
            else if (
              (function (e, t, r, n, a) {
                switch (t) {
                  case 'focusin':
                    return ((Pt = Ft(Pt, e, t, r, n, a)), !0);
                  case 'dragenter':
                    return ((_t = Ft(_t, e, t, r, n, a)), !0);
                  case 'mouseover':
                    return ((Ot = Ft(Ot, e, t, r, n, a)), !0);
                  case 'pointerover':
                    var s = a.pointerId;
                    return (Rt.set(s, Ft(Rt.get(s) || null, e, t, r, n, a)), !0);
                  case 'gotpointercapture':
                    return ((s = a.pointerId), Tt.set(s, Ft(Tt.get(s) || null, e, t, r, n, a)), !0);
                }
                return !1;
              })(a, e, t, r, n)
            )
              n.stopPropagation();
            else if ((zt(e, n), 4 & t && -1 < At.indexOf(e))) {
              for (; null !== a; ) {
                var s = va(a);
                if (
                  (null !== s && wt(s),
                  null === (s = Yt(e, t, r, n)) && Hn(e, t, n, Qt, r),
                  s === a)
                )
                  break;
                a = s;
              }
              null !== a && n.stopPropagation();
            } else Hn(e, t, n, null, r);
          }
        }
        var Qt = null;
        function Yt(e, t, r, n) {
          if (((Qt = null), null !== (e = ya((e = we(n))))))
            if (null === (t = We(e))) e = null;
            else if (13 === (r = t.tag)) {
              if (null !== (e = $e(t))) return e;
              e = null;
            } else if (3 === r) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          return ((Qt = e), null);
        }
        function Kt(e) {
          switch (e) {
            case 'cancel':
            case 'click':
            case 'close':
            case 'contextmenu':
            case 'copy':
            case 'cut':
            case 'auxclick':
            case 'dblclick':
            case 'dragend':
            case 'dragstart':
            case 'drop':
            case 'focusin':
            case 'focusout':
            case 'input':
            case 'invalid':
            case 'keydown':
            case 'keypress':
            case 'keyup':
            case 'mousedown':
            case 'mouseup':
            case 'paste':
            case 'pause':
            case 'play':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerup':
            case 'ratechange':
            case 'reset':
            case 'resize':
            case 'seeked':
            case 'submit':
            case 'touchcancel':
            case 'touchend':
            case 'touchstart':
            case 'volumechange':
            case 'change':
            case 'selectionchange':
            case 'textInput':
            case 'compositionstart':
            case 'compositionend':
            case 'compositionupdate':
            case 'beforeblur':
            case 'afterblur':
            case 'beforeinput':
            case 'blur':
            case 'fullscreenchange':
            case 'focus':
            case 'hashchange':
            case 'popstate':
            case 'select':
            case 'selectstart':
              return 1;
            case 'drag':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'scroll':
            case 'toggle':
            case 'touchmove':
            case 'wheel':
            case 'mouseenter':
            case 'mouseleave':
            case 'pointerenter':
            case 'pointerleave':
              return 4;
            case 'message':
              switch (Je()) {
                case Xe:
                  return 1;
                case et:
                  return 4;
                case tt:
                case rt:
                  return 16;
                case nt:
                  return 536870912;
                default:
                  return 16;
              }
            default:
              return 16;
          }
        }
        var Zt = null,
          Jt = null,
          Xt = null;
        function er() {
          if (Xt) return Xt;
          var e,
            t,
            r = Jt,
            n = r.length,
            a = 'value' in Zt ? Zt.value : Zt.textContent,
            s = a.length;
          for (e = 0; e < n && r[e] === a[e]; e++);
          var o = n - e;
          for (t = 1; t <= o && r[n - t] === a[s - t]; t++);
          return (Xt = a.slice(e, 1 < t ? 1 - t : void 0));
        }
        function tr(e) {
          var t = e.keyCode;
          return (
            'charCode' in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function rr() {
          return !0;
        }
        function nr() {
          return !1;
        }
        function ar(e) {
          function t(t, r, n, a, s) {
            for (var o in ((this._reactName = t),
            (this._targetInst = n),
            (this.type = r),
            (this.nativeEvent = a),
            (this.target = s),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(a) : a[o]));
            return (
              (this.isDefaultPrevented = (
                null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue
              )
                ? rr
                : nr),
              (this.isPropagationStopped = nr),
              this
            );
          }
          return (
            M(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : 'unknown' !== typeof e.returnValue && (e.returnValue = !1),
                  (this.isDefaultPrevented = rr));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : 'unknown' !== typeof e.cancelBubble && (e.cancelBubble = !0),
                  (this.isPropagationStopped = rr));
              },
              persist: function () {},
              isPersistent: rr,
            }),
            t
          );
        }
        var sr,
          or,
          ir,
          lr = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          cr = ar(lr),
          ur = M({}, lr, { view: 0, detail: 0 }),
          dr = ar(ur),
          mr = M({}, ur, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: Nr,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return 'movementX' in e
                ? e.movementX
                : (e !== ir &&
                    (ir && 'mousemove' === e.type
                      ? ((sr = e.screenX - ir.screenX), (or = e.screenY - ir.screenY))
                      : (or = sr = 0),
                    (ir = e)),
                  sr);
            },
            movementY: function (e) {
              return 'movementY' in e ? e.movementY : or;
            },
          }),
          fr = ar(mr),
          pr = ar(M({}, mr, { dataTransfer: 0 })),
          hr = ar(M({}, ur, { relatedTarget: 0 })),
          gr = ar(M({}, lr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
          xr = M({}, lr, {
            clipboardData: function (e) {
              return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
            },
          }),
          yr = ar(xr),
          vr = ar(M({}, lr, { data: 0 })),
          br = {
            Esc: 'Escape',
            Spacebar: ' ',
            Left: 'ArrowLeft',
            Up: 'ArrowUp',
            Right: 'ArrowRight',
            Down: 'ArrowDown',
            Del: 'Delete',
            Win: 'OS',
            Menu: 'ContextMenu',
            Apps: 'ContextMenu',
            Scroll: 'ScrollLock',
            MozPrintableKey: 'Unidentified',
          },
          wr = {
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            19: 'Pause',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            45: 'Insert',
            46: 'Delete',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NumLock',
            145: 'ScrollLock',
            224: 'Meta',
          },
          jr = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
        function kr(e) {
          var t = this.nativeEvent;
          return t.getModifierState ? t.getModifierState(e) : !!(e = jr[e]) && !!t[e];
        }
        function Nr() {
          return kr;
        }
        var Sr = M({}, ur, {
            key: function (e) {
              if (e.key) {
                var t = br[e.key] || e.key;
                if ('Unidentified' !== t) return t;
              }
              return 'keypress' === e.type
                ? 13 === (e = tr(e))
                  ? 'Enter'
                  : String.fromCharCode(e)
                : 'keydown' === e.type || 'keyup' === e.type
                  ? wr[e.keyCode] || 'Unidentified'
                  : '';
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Nr,
            charCode: function (e) {
              return 'keypress' === e.type ? tr(e) : 0;
            },
            keyCode: function (e) {
              return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
            },
            which: function (e) {
              return 'keypress' === e.type
                ? tr(e)
                : 'keydown' === e.type || 'keyup' === e.type
                  ? e.keyCode
                  : 0;
            },
          }),
          Er = ar(Sr),
          Cr = ar(
            M({}, mr, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          Pr = ar(
            M({}, ur, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: Nr,
            })
          ),
          _r = ar(M({}, lr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
          Or = M({}, mr, {
            deltaX: function (e) {
              return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
            },
            deltaY: function (e) {
              return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                  ? -e.wheelDeltaY
                  : 'wheelDelta' in e
                    ? -e.wheelDelta
                    : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          Rr = ar(Or),
          Tr = [9, 13, 27, 32],
          Lr = u && 'CompositionEvent' in window,
          Ar = null;
        u && 'documentMode' in document && (Ar = document.documentMode);
        var zr = u && 'TextEvent' in window && !Ar,
          Fr = u && (!Lr || (Ar && 8 < Ar && 11 >= Ar)),
          Mr = String.fromCharCode(32),
          Ir = !1;
        function Dr(e, t) {
          switch (e) {
            case 'keyup':
              return -1 !== Tr.indexOf(t.keyCode);
            case 'keydown':
              return 229 !== t.keyCode;
            case 'keypress':
            case 'mousedown':
            case 'focusout':
              return !0;
            default:
              return !1;
          }
        }
        function Ur(e) {
          return 'object' === typeof (e = e.detail) && 'data' in e ? e.data : null;
        }
        var Br = !1;
        var Wr = {
          color: !0,
          date: !0,
          datetime: !0,
          'datetime-local': !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function $r(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return 'input' === t ? !!Wr[e.type] : 'textarea' === t;
        }
        function Hr(e, t, r, n) {
          (Ee(n),
            0 < (t = Vn(t, 'onChange')).length &&
              ((r = new cr('onChange', 'change', null, r, n)), e.push({ event: r, listeners: t })));
        }
        var qr = null,
          Vr = null;
        function Gr(e) {
          In(e, 0);
        }
        function Qr(e) {
          if (G(ba(e))) return e;
        }
        function Yr(e, t) {
          if ('change' === e) return t;
        }
        var Kr = !1;
        if (u) {
          var Zr;
          if (u) {
            var Jr = 'oninput' in document;
            if (!Jr) {
              var Xr = document.createElement('div');
              (Xr.setAttribute('oninput', 'return;'), (Jr = 'function' === typeof Xr.oninput));
            }
            Zr = Jr;
          } else Zr = !1;
          Kr = Zr && (!document.documentMode || 9 < document.documentMode);
        }
        function en() {
          qr && (qr.detachEvent('onpropertychange', tn), (Vr = qr = null));
        }
        function tn(e) {
          if ('value' === e.propertyName && Qr(Vr)) {
            var t = [];
            (Hr(t, Vr, e, we(e)), Re(Gr, t));
          }
        }
        function rn(e, t, r) {
          'focusin' === e
            ? (en(), (Vr = r), (qr = t).attachEvent('onpropertychange', tn))
            : 'focusout' === e && en();
        }
        function nn(e) {
          if ('selectionchange' === e || 'keyup' === e || 'keydown' === e) return Qr(Vr);
        }
        function an(e, t) {
          if ('click' === e) return Qr(t);
        }
        function sn(e, t) {
          if ('input' === e || 'change' === e) return Qr(t);
        }
        var on =
          'function' === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (e === t && (0 !== e || 1 / e === 1 / t)) || (e !== e && t !== t);
              };
        function ln(e, t) {
          if (on(e, t)) return !0;
          if ('object' !== typeof e || null === e || 'object' !== typeof t || null === t) return !1;
          var r = Object.keys(e),
            n = Object.keys(t);
          if (r.length !== n.length) return !1;
          for (n = 0; n < r.length; n++) {
            var a = r[n];
            if (!d.call(t, a) || !on(e[a], t[a])) return !1;
          }
          return !0;
        }
        function cn(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function un(e, t) {
          var r,
            n = cn(e);
          for (e = 0; n; ) {
            if (3 === n.nodeType) {
              if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
              e = r;
            }
            e: {
              for (; n; ) {
                if (n.nextSibling) {
                  n = n.nextSibling;
                  break e;
                }
                n = n.parentNode;
              }
              n = void 0;
            }
            n = cn(n);
          }
        }
        function dn(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dn(e, t.parentNode)
                  : 'contains' in e
                    ? e.contains(t)
                    : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function mn() {
          for (var e = window, t = Q(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var r = 'string' === typeof t.contentWindow.location.href;
            } catch (n) {
              r = !1;
            }
            if (!r) break;
            t = Q((e = t.contentWindow).document);
          }
          return t;
        }
        function fn(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (('input' === t &&
              ('text' === e.type ||
                'search' === e.type ||
                'tel' === e.type ||
                'url' === e.type ||
                'password' === e.type)) ||
              'textarea' === t ||
              'true' === e.contentEditable)
          );
        }
        function pn(e) {
          var t = mn(),
            r = e.focusedElem,
            n = e.selectionRange;
          if (t !== r && r && r.ownerDocument && dn(r.ownerDocument.documentElement, r)) {
            if (null !== n && fn(r))
              if (((t = n.start), void 0 === (e = n.end) && (e = t), 'selectionStart' in r))
                ((r.selectionStart = t), (r.selectionEnd = Math.min(e, r.value.length)));
              else if (
                (e = ((t = r.ownerDocument || document) && t.defaultView) || window).getSelection
              ) {
                e = e.getSelection();
                var a = r.textContent.length,
                  s = Math.min(n.start, a);
                ((n = void 0 === n.end ? s : Math.min(n.end, a)),
                  !e.extend && s > n && ((a = n), (n = s), (s = a)),
                  (a = un(r, s)));
                var o = un(r, n);
                a &&
                  o &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== a.node ||
                    e.anchorOffset !== a.offset ||
                    e.focusNode !== o.node ||
                    e.focusOffset !== o.offset) &&
                  ((t = t.createRange()).setStart(a.node, a.offset),
                  e.removeAllRanges(),
                  s > n
                    ? (e.addRange(t), e.extend(o.node, o.offset))
                    : (t.setEnd(o.node, o.offset), e.addRange(t)));
              }
            for (t = [], e = r; (e = e.parentNode); )
              1 === e.nodeType && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
            for ('function' === typeof r.focus && r.focus(), r = 0; r < t.length; r++)
              (((e = t[r]).element.scrollLeft = e.left), (e.element.scrollTop = e.top));
          }
        }
        var hn = u && 'documentMode' in document && 11 >= document.documentMode,
          gn = null,
          xn = null,
          yn = null,
          vn = !1;
        function bn(e, t, r) {
          var n = r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument;
          vn ||
            null == gn ||
            gn !== Q(n) ||
            ('selectionStart' in (n = gn) && fn(n)
              ? (n = { start: n.selectionStart, end: n.selectionEnd })
              : (n = {
                  anchorNode: (n = (
                    (n.ownerDocument && n.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: n.anchorOffset,
                  focusNode: n.focusNode,
                  focusOffset: n.focusOffset,
                }),
            (yn && ln(yn, n)) ||
              ((yn = n),
              0 < (n = Vn(xn, 'onSelect')).length &&
                ((t = new cr('onSelect', 'select', null, t, r)),
                e.push({ event: t, listeners: n }),
                (t.target = gn))));
        }
        function wn(e, t) {
          var r = {};
          return (
            (r[e.toLowerCase()] = t.toLowerCase()),
            (r['Webkit' + e] = 'webkit' + t),
            (r['Moz' + e] = 'moz' + t),
            r
          );
        }
        var jn = {
            animationend: wn('Animation', 'AnimationEnd'),
            animationiteration: wn('Animation', 'AnimationIteration'),
            animationstart: wn('Animation', 'AnimationStart'),
            transitionend: wn('Transition', 'TransitionEnd'),
          },
          kn = {},
          Nn = {};
        function Sn(e) {
          if (kn[e]) return kn[e];
          if (!jn[e]) return e;
          var t,
            r = jn[e];
          for (t in r) if (r.hasOwnProperty(t) && t in Nn) return (kn[e] = r[t]);
          return e;
        }
        u &&
          ((Nn = document.createElement('div').style),
          'AnimationEvent' in window ||
            (delete jn.animationend.animation,
            delete jn.animationiteration.animation,
            delete jn.animationstart.animation),
          'TransitionEvent' in window || delete jn.transitionend.transition);
        var En = Sn('animationend'),
          Cn = Sn('animationiteration'),
          Pn = Sn('animationstart'),
          _n = Sn('transitionend'),
          On = new Map(),
          Rn =
            'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
              ' '
            );
        function Tn(e, t) {
          (On.set(e, t), l(t, [e]));
        }
        for (var Ln = 0; Ln < Rn.length; Ln++) {
          var An = Rn[Ln];
          Tn(An.toLowerCase(), 'on' + (An[0].toUpperCase() + An.slice(1)));
        }
        (Tn(En, 'onAnimationEnd'),
          Tn(Cn, 'onAnimationIteration'),
          Tn(Pn, 'onAnimationStart'),
          Tn('dblclick', 'onDoubleClick'),
          Tn('focusin', 'onFocus'),
          Tn('focusout', 'onBlur'),
          Tn(_n, 'onTransitionEnd'),
          c('onMouseEnter', ['mouseout', 'mouseover']),
          c('onMouseLeave', ['mouseout', 'mouseover']),
          c('onPointerEnter', ['pointerout', 'pointerover']),
          c('onPointerLeave', ['pointerout', 'pointerover']),
          l(
            'onChange',
            'change click focusin focusout input keydown keyup selectionchange'.split(' ')
          ),
          l(
            'onSelect',
            'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
              ' '
            )
          ),
          l('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
          l(
            'onCompositionEnd',
            'compositionend focusout keydown keypress keyup mousedown'.split(' ')
          ),
          l(
            'onCompositionStart',
            'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
          ),
          l(
            'onCompositionUpdate',
            'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
          ));
        var zn =
            'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
              ' '
            ),
          Fn = new Set('cancel close invalid load scroll toggle'.split(' ').concat(zn));
        function Mn(e, t, r) {
          var n = e.type || 'unknown-event';
          ((e.currentTarget = r),
            (function (e, t, r, n, a, o, i, l, c) {
              if ((Be.apply(this, arguments), Fe)) {
                if (!Fe) throw Error(s(198));
                var u = Me;
                ((Fe = !1), (Me = null), Ie || ((Ie = !0), (De = u)));
              }
            })(n, t, void 0, e),
            (e.currentTarget = null));
        }
        function In(e, t) {
          t = 0 !== (4 & t);
          for (var r = 0; r < e.length; r++) {
            var n = e[r],
              a = n.event;
            n = n.listeners;
            e: {
              var s = void 0;
              if (t)
                for (var o = n.length - 1; 0 <= o; o--) {
                  var i = n[o],
                    l = i.instance,
                    c = i.currentTarget;
                  if (((i = i.listener), l !== s && a.isPropagationStopped())) break e;
                  (Mn(a, i, c), (s = l));
                }
              else
                for (o = 0; o < n.length; o++) {
                  if (
                    ((l = (i = n[o]).instance),
                    (c = i.currentTarget),
                    (i = i.listener),
                    l !== s && a.isPropagationStopped())
                  )
                    break e;
                  (Mn(a, i, c), (s = l));
                }
            }
          }
          if (Ie) throw ((e = De), (Ie = !1), (De = null), e);
        }
        function Dn(e, t) {
          var r = t[ha];
          void 0 === r && (r = t[ha] = new Set());
          var n = e + '__bubble';
          r.has(n) || ($n(t, e, 2, !1), r.add(n));
        }
        function Un(e, t, r) {
          var n = 0;
          (t && (n |= 4), $n(r, e, n, t));
        }
        var Bn = '_reactListening' + Math.random().toString(36).slice(2);
        function Wn(e) {
          if (!e[Bn]) {
            ((e[Bn] = !0),
              o.forEach(function (t) {
                'selectionchange' !== t && (Fn.has(t) || Un(t, !1, e), Un(t, !0, e));
              }));
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[Bn] || ((t[Bn] = !0), Un('selectionchange', !1, t));
          }
        }
        function $n(e, t, r, n) {
          switch (Kt(t)) {
            case 1:
              var a = qt;
              break;
            case 4:
              a = Vt;
              break;
            default:
              a = Gt;
          }
          ((r = a.bind(null, t, r, e)),
            (a = void 0),
            !Le || ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) || (a = !0),
            n
              ? void 0 !== a
                ? e.addEventListener(t, r, { capture: !0, passive: a })
                : e.addEventListener(t, r, !0)
              : void 0 !== a
                ? e.addEventListener(t, r, { passive: a })
                : e.addEventListener(t, r, !1));
        }
        function Hn(e, t, r, n, a) {
          var s = n;
          if (0 === (1 & t) && 0 === (2 & t) && null !== n)
            e: for (;;) {
              if (null === n) return;
              var o = n.tag;
              if (3 === o || 4 === o) {
                var i = n.stateNode.containerInfo;
                if (i === a || (8 === i.nodeType && i.parentNode === a)) break;
                if (4 === o)
                  for (o = n.return; null !== o; ) {
                    var l = o.tag;
                    if (
                      (3 === l || 4 === l) &&
                      ((l = o.stateNode.containerInfo) === a ||
                        (8 === l.nodeType && l.parentNode === a))
                    )
                      return;
                    o = o.return;
                  }
                for (; null !== i; ) {
                  if (null === (o = ya(i))) return;
                  if (5 === (l = o.tag) || 6 === l) {
                    n = s = o;
                    continue e;
                  }
                  i = i.parentNode;
                }
              }
              n = n.return;
            }
          Re(function () {
            var n = s,
              a = we(r),
              o = [];
            e: {
              var i = On.get(e);
              if (void 0 !== i) {
                var l = cr,
                  c = e;
                switch (e) {
                  case 'keypress':
                    if (0 === tr(r)) break e;
                  case 'keydown':
                  case 'keyup':
                    l = Er;
                    break;
                  case 'focusin':
                    ((c = 'focus'), (l = hr));
                    break;
                  case 'focusout':
                    ((c = 'blur'), (l = hr));
                    break;
                  case 'beforeblur':
                  case 'afterblur':
                    l = hr;
                    break;
                  case 'click':
                    if (2 === r.button) break e;
                  case 'auxclick':
                  case 'dblclick':
                  case 'mousedown':
                  case 'mousemove':
                  case 'mouseup':
                  case 'mouseout':
                  case 'mouseover':
                  case 'contextmenu':
                    l = fr;
                    break;
                  case 'drag':
                  case 'dragend':
                  case 'dragenter':
                  case 'dragexit':
                  case 'dragleave':
                  case 'dragover':
                  case 'dragstart':
                  case 'drop':
                    l = pr;
                    break;
                  case 'touchcancel':
                  case 'touchend':
                  case 'touchmove':
                  case 'touchstart':
                    l = Pr;
                    break;
                  case En:
                  case Cn:
                  case Pn:
                    l = gr;
                    break;
                  case _n:
                    l = _r;
                    break;
                  case 'scroll':
                    l = dr;
                    break;
                  case 'wheel':
                    l = Rr;
                    break;
                  case 'copy':
                  case 'cut':
                  case 'paste':
                    l = yr;
                    break;
                  case 'gotpointercapture':
                  case 'lostpointercapture':
                  case 'pointercancel':
                  case 'pointerdown':
                  case 'pointermove':
                  case 'pointerout':
                  case 'pointerover':
                  case 'pointerup':
                    l = Cr;
                }
                var u = 0 !== (4 & t),
                  d = !u && 'scroll' === e,
                  m = u ? (null !== i ? i + 'Capture' : null) : i;
                u = [];
                for (var f, p = n; null !== p; ) {
                  var h = (f = p).stateNode;
                  if (
                    (5 === f.tag &&
                      null !== h &&
                      ((f = h), null !== m && null != (h = Te(p, m)) && u.push(qn(p, h, f))),
                    d)
                  )
                    break;
                  p = p.return;
                }
                0 < u.length && ((i = new l(i, c, null, r, a)), o.push({ event: i, listeners: u }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((l = 'mouseout' === e || 'pointerout' === e),
                (!(i = 'mouseover' === e || 'pointerover' === e) ||
                  r === be ||
                  !(c = r.relatedTarget || r.fromElement) ||
                  (!ya(c) && !c[pa])) &&
                  (l || i) &&
                  ((i =
                    a.window === a
                      ? a
                      : (i = a.ownerDocument)
                        ? i.defaultView || i.parentWindow
                        : window),
                  l
                    ? ((l = n),
                      null !== (c = (c = r.relatedTarget || r.toElement) ? ya(c) : null) &&
                        (c !== (d = We(c)) || (5 !== c.tag && 6 !== c.tag)) &&
                        (c = null))
                    : ((l = null), (c = n)),
                  l !== c))
              ) {
                if (
                  ((u = fr),
                  (h = 'onMouseLeave'),
                  (m = 'onMouseEnter'),
                  (p = 'mouse'),
                  ('pointerout' !== e && 'pointerover' !== e) ||
                    ((u = Cr), (h = 'onPointerLeave'), (m = 'onPointerEnter'), (p = 'pointer')),
                  (d = null == l ? i : ba(l)),
                  (f = null == c ? i : ba(c)),
                  ((i = new u(h, p + 'leave', l, r, a)).target = d),
                  (i.relatedTarget = f),
                  (h = null),
                  ya(a) === n &&
                    (((u = new u(m, p + 'enter', c, r, a)).target = f),
                    (u.relatedTarget = d),
                    (h = u)),
                  (d = h),
                  l && c)
                )
                  e: {
                    for (m = c, p = 0, f = u = l; f; f = Gn(f)) p++;
                    for (f = 0, h = m; h; h = Gn(h)) f++;
                    for (; 0 < p - f; ) ((u = Gn(u)), p--);
                    for (; 0 < f - p; ) ((m = Gn(m)), f--);
                    for (; p--; ) {
                      if (u === m || (null !== m && u === m.alternate)) break e;
                      ((u = Gn(u)), (m = Gn(m)));
                    }
                    u = null;
                  }
                else u = null;
                (null !== l && Qn(o, i, l, u, !1), null !== c && null !== d && Qn(o, d, c, u, !0));
              }
              if (
                'select' === (l = (i = n ? ba(n) : window).nodeName && i.nodeName.toLowerCase()) ||
                ('input' === l && 'file' === i.type)
              )
                var g = Yr;
              else if ($r(i))
                if (Kr) g = sn;
                else {
                  g = nn;
                  var x = rn;
                }
              else
                (l = i.nodeName) &&
                  'input' === l.toLowerCase() &&
                  ('checkbox' === i.type || 'radio' === i.type) &&
                  (g = an);
              switch (
                (g && (g = g(e, n))
                  ? Hr(o, g, r, a)
                  : (x && x(e, i, n),
                    'focusout' === e &&
                      (x = i._wrapperState) &&
                      x.controlled &&
                      'number' === i.type &&
                      ee(i, 'number', i.value)),
                (x = n ? ba(n) : window),
                e)
              ) {
                case 'focusin':
                  ($r(x) || 'true' === x.contentEditable) && ((gn = x), (xn = n), (yn = null));
                  break;
                case 'focusout':
                  yn = xn = gn = null;
                  break;
                case 'mousedown':
                  vn = !0;
                  break;
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                  ((vn = !1), bn(o, r, a));
                  break;
                case 'selectionchange':
                  if (hn) break;
                case 'keydown':
                case 'keyup':
                  bn(o, r, a);
              }
              var y;
              if (Lr)
                e: {
                  switch (e) {
                    case 'compositionstart':
                      var v = 'onCompositionStart';
                      break e;
                    case 'compositionend':
                      v = 'onCompositionEnd';
                      break e;
                    case 'compositionupdate':
                      v = 'onCompositionUpdate';
                      break e;
                  }
                  v = void 0;
                }
              else
                Br
                  ? Dr(e, r) && (v = 'onCompositionEnd')
                  : 'keydown' === e && 229 === r.keyCode && (v = 'onCompositionStart');
              (v &&
                (Fr &&
                  'ko' !== r.locale &&
                  (Br || 'onCompositionStart' !== v
                    ? 'onCompositionEnd' === v && Br && (y = er())
                    : ((Jt = 'value' in (Zt = a) ? Zt.value : Zt.textContent), (Br = !0))),
                0 < (x = Vn(n, v)).length &&
                  ((v = new vr(v, e, null, r, a)),
                  o.push({ event: v, listeners: x }),
                  y ? (v.data = y) : null !== (y = Ur(r)) && (v.data = y))),
                (y = zr
                  ? (function (e, t) {
                      switch (e) {
                        case 'compositionend':
                          return Ur(t);
                        case 'keypress':
                          return 32 !== t.which ? null : ((Ir = !0), Mr);
                        case 'textInput':
                          return (e = t.data) === Mr && Ir ? null : e;
                        default:
                          return null;
                      }
                    })(e, r)
                  : (function (e, t) {
                      if (Br)
                        return 'compositionend' === e || (!Lr && Dr(e, t))
                          ? ((e = er()), (Xt = Jt = Zt = null), (Br = !1), e)
                          : null;
                      switch (e) {
                        case 'paste':
                        default:
                          return null;
                        case 'keypress':
                          if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case 'compositionend':
                          return Fr && 'ko' !== t.locale ? null : t.data;
                      }
                    })(e, r)) &&
                  0 < (n = Vn(n, 'onBeforeInput')).length &&
                  ((a = new vr('onBeforeInput', 'beforeinput', null, r, a)),
                  o.push({ event: a, listeners: n }),
                  (a.data = y)));
            }
            In(o, t);
          });
        }
        function qn(e, t, r) {
          return { instance: e, listener: t, currentTarget: r };
        }
        function Vn(e, t) {
          for (var r = t + 'Capture', n = []; null !== e; ) {
            var a = e,
              s = a.stateNode;
            (5 === a.tag &&
              null !== s &&
              ((a = s),
              null != (s = Te(e, r)) && n.unshift(qn(e, s, a)),
              null != (s = Te(e, t)) && n.push(qn(e, s, a))),
              (e = e.return));
          }
          return n;
        }
        function Gn(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag);
          return e || null;
        }
        function Qn(e, t, r, n, a) {
          for (var s = t._reactName, o = []; null !== r && r !== n; ) {
            var i = r,
              l = i.alternate,
              c = i.stateNode;
            if (null !== l && l === n) break;
            (5 === i.tag &&
              null !== c &&
              ((i = c),
              a
                ? null != (l = Te(r, s)) && o.unshift(qn(r, l, i))
                : a || (null != (l = Te(r, s)) && o.push(qn(r, l, i)))),
              (r = r.return));
          }
          0 !== o.length && e.push({ event: t, listeners: o });
        }
        var Yn = /\r\n?/g,
          Kn = /\u0000|\uFFFD/g;
        function Zn(e) {
          return ('string' === typeof e ? e : '' + e).replace(Yn, '\n').replace(Kn, '');
        }
        function Jn(e, t, r) {
          if (((t = Zn(t)), Zn(e) !== t && r)) throw Error(s(425));
        }
        function Xn() {}
        var ea = null,
          ta = null;
        function ra(e, t) {
          return (
            'textarea' === e ||
            'noscript' === e ||
            'string' === typeof t.children ||
            'number' === typeof t.children ||
            ('object' === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var na = 'function' === typeof setTimeout ? setTimeout : void 0,
          aa = 'function' === typeof clearTimeout ? clearTimeout : void 0,
          sa = 'function' === typeof Promise ? Promise : void 0,
          oa =
            'function' === typeof queueMicrotask
              ? queueMicrotask
              : 'undefined' !== typeof sa
                ? function (e) {
                    return sa.resolve(null).then(e).catch(ia);
                  }
                : na;
        function ia(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function la(e, t) {
          var r = t,
            n = 0;
          do {
            var a = r.nextSibling;
            if ((e.removeChild(r), a && 8 === a.nodeType))
              if ('/$' === (r = a.data)) {
                if (0 === n) return (e.removeChild(a), void Wt(t));
                n--;
              } else ('$' !== r && '$?' !== r && '$!' !== r) || n++;
            r = a;
          } while (r);
          Wt(t);
        }
        function ca(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if ('$' === (t = e.data) || '$!' === t || '$?' === t) break;
              if ('/$' === t) return null;
            }
          }
          return e;
        }
        function ua(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var r = e.data;
              if ('$' === r || '$!' === r || '$?' === r) {
                if (0 === t) return e;
                t--;
              } else '/$' === r && t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        var da = Math.random().toString(36).slice(2),
          ma = '__reactFiber$' + da,
          fa = '__reactProps$' + da,
          pa = '__reactContainer$' + da,
          ha = '__reactEvents$' + da,
          ga = '__reactListeners$' + da,
          xa = '__reactHandles$' + da;
        function ya(e) {
          var t = e[ma];
          if (t) return t;
          for (var r = e.parentNode; r; ) {
            if ((t = r[pa] || r[ma])) {
              if (((r = t.alternate), null !== t.child || (null !== r && null !== r.child)))
                for (e = ua(e); null !== e; ) {
                  if ((r = e[ma])) return r;
                  e = ua(e);
                }
              return t;
            }
            r = (e = r).parentNode;
          }
          return null;
        }
        function va(e) {
          return !(e = e[ma] || e[pa]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e;
        }
        function ba(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode;
          throw Error(s(33));
        }
        function wa(e) {
          return e[fa] || null;
        }
        var ja = [],
          ka = -1;
        function Na(e) {
          return { current: e };
        }
        function Sa(e) {
          0 > ka || ((e.current = ja[ka]), (ja[ka] = null), ka--);
        }
        function Ea(e, t) {
          (ka++, (ja[ka] = e.current), (e.current = t));
        }
        var Ca = {},
          Pa = Na(Ca),
          _a = Na(!1),
          Oa = Ca;
        function Ra(e, t) {
          var r = e.type.contextTypes;
          if (!r) return Ca;
          var n = e.stateNode;
          if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
            return n.__reactInternalMemoizedMaskedChildContext;
          var a,
            s = {};
          for (a in r) s[a] = t[a];
          return (
            n &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
              (e.__reactInternalMemoizedMaskedChildContext = s)),
            s
          );
        }
        function Ta(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e;
        }
        function La() {
          (Sa(_a), Sa(Pa));
        }
        function Aa(e, t, r) {
          if (Pa.current !== Ca) throw Error(s(168));
          (Ea(Pa, t), Ea(_a, r));
        }
        function za(e, t, r) {
          var n = e.stateNode;
          if (((t = t.childContextTypes), 'function' !== typeof n.getChildContext)) return r;
          for (var a in (n = n.getChildContext()))
            if (!(a in t)) throw Error(s(108, $(e) || 'Unknown', a));
          return M({}, r, n);
        }
        function Fa(e) {
          return (
            (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ca),
            (Oa = Pa.current),
            Ea(Pa, e),
            Ea(_a, _a.current),
            !0
          );
        }
        function Ma(e, t, r) {
          var n = e.stateNode;
          if (!n) throw Error(s(169));
          (r
            ? ((e = za(e, t, Oa)),
              (n.__reactInternalMemoizedMergedChildContext = e),
              Sa(_a),
              Sa(Pa),
              Ea(Pa, e))
            : Sa(_a),
            Ea(_a, r));
        }
        var Ia = null,
          Da = !1,
          Ua = !1;
        function Ba(e) {
          null === Ia ? (Ia = [e]) : Ia.push(e);
        }
        function Wa() {
          if (!Ua && null !== Ia) {
            Ua = !0;
            var e = 0,
              t = vt;
            try {
              var r = Ia;
              for (vt = 1; e < r.length; e++) {
                var n = r[e];
                do {
                  n = n(!0);
                } while (null !== n);
              }
              ((Ia = null), (Da = !1));
            } catch (a) {
              throw (null !== Ia && (Ia = Ia.slice(e + 1)), Ge(Xe, Wa), a);
            } finally {
              ((vt = t), (Ua = !1));
            }
          }
          return null;
        }
        var $a = [],
          Ha = 0,
          qa = null,
          Va = 0,
          Ga = [],
          Qa = 0,
          Ya = null,
          Ka = 1,
          Za = '';
        function Ja(e, t) {
          (($a[Ha++] = Va), ($a[Ha++] = qa), (qa = e), (Va = t));
        }
        function Xa(e, t, r) {
          ((Ga[Qa++] = Ka), (Ga[Qa++] = Za), (Ga[Qa++] = Ya), (Ya = e));
          var n = Ka;
          e = Za;
          var a = 32 - ot(n) - 1;
          ((n &= ~(1 << a)), (r += 1));
          var s = 32 - ot(t) + a;
          if (30 < s) {
            var o = a - (a % 5);
            ((s = (n & ((1 << o) - 1)).toString(32)),
              (n >>= o),
              (a -= o),
              (Ka = (1 << (32 - ot(t) + a)) | (r << a) | n),
              (Za = s + e));
          } else ((Ka = (1 << s) | (r << a) | n), (Za = e));
        }
        function es(e) {
          null !== e.return && (Ja(e, 1), Xa(e, 1, 0));
        }
        function ts(e) {
          for (; e === qa; ) ((qa = $a[--Ha]), ($a[Ha] = null), (Va = $a[--Ha]), ($a[Ha] = null));
          for (; e === Ya; )
            ((Ya = Ga[--Qa]),
              (Ga[Qa] = null),
              (Za = Ga[--Qa]),
              (Ga[Qa] = null),
              (Ka = Ga[--Qa]),
              (Ga[Qa] = null));
        }
        var rs = null,
          ns = null,
          as = !1,
          ss = null;
        function os(e, t) {
          var r = Rc(5, null, null, 0);
          ((r.elementType = 'DELETED'),
            (r.stateNode = t),
            (r.return = e),
            null === (t = e.deletions) ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
        }
        function is(e, t) {
          switch (e.tag) {
            case 5:
              var r = e.type;
              return (
                null !==
                  (t =
                    1 !== t.nodeType || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) &&
                ((e.stateNode = t), (rs = e), (ns = ca(t.firstChild)), !0)
              );
            case 6:
              return (
                null !== (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (rs = e), (ns = null), !0)
              );
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((r = null !== Ya ? { id: Ka, overflow: Za } : null),
                (e.memoizedState = { dehydrated: t, treeContext: r, retryLane: 1073741824 }),
                ((r = Rc(18, null, null, 0)).stateNode = t),
                (r.return = e),
                (e.child = r),
                (rs = e),
                (ns = null),
                !0)
              );
            default:
              return !1;
          }
        }
        function ls(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
        }
        function cs(e) {
          if (as) {
            var t = ns;
            if (t) {
              var r = t;
              if (!is(e, t)) {
                if (ls(e)) throw Error(s(418));
                t = ca(r.nextSibling);
                var n = rs;
                t && is(e, t) ? os(n, r) : ((e.flags = (-4097 & e.flags) | 2), (as = !1), (rs = e));
              }
            } else {
              if (ls(e)) throw Error(s(418));
              ((e.flags = (-4097 & e.flags) | 2), (as = !1), (rs = e));
            }
          }
        }
        function us(e) {
          for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; )
            e = e.return;
          rs = e;
        }
        function ds(e) {
          if (e !== rs) return !1;
          if (!as) return (us(e), (as = !0), !1);
          var t;
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t = 'head' !== (t = e.type) && 'body' !== t && !ra(e.type, e.memoizedProps)),
            t && (t = ns))
          ) {
            if (ls(e)) throw (ms(), Error(s(418)));
            for (; t; ) (os(e, t), (t = ca(t.nextSibling)));
          }
          if ((us(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(s(317));
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var r = e.data;
                  if ('/$' === r) {
                    if (0 === t) {
                      ns = ca(e.nextSibling);
                      break e;
                    }
                    t--;
                  } else ('$' !== r && '$!' !== r && '$?' !== r) || t++;
                }
                e = e.nextSibling;
              }
              ns = null;
            }
          } else ns = rs ? ca(e.stateNode.nextSibling) : null;
          return !0;
        }
        function ms() {
          for (var e = ns; e; ) e = ca(e.nextSibling);
        }
        function fs() {
          ((ns = rs = null), (as = !1));
        }
        function ps(e) {
          null === ss ? (ss = [e]) : ss.push(e);
        }
        var hs = b.ReactCurrentBatchConfig;
        function gs(e, t, r) {
          if (null !== (e = r.ref) && 'function' !== typeof e && 'object' !== typeof e) {
            if (r._owner) {
              if ((r = r._owner)) {
                if (1 !== r.tag) throw Error(s(309));
                var n = r.stateNode;
              }
              if (!n) throw Error(s(147, e));
              var a = n,
                o = '' + e;
              return null !== t &&
                null !== t.ref &&
                'function' === typeof t.ref &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (e) {
                    var t = a.refs;
                    null === e ? delete t[o] : (t[o] = e);
                  }),
                  (t._stringRef = o),
                  t);
            }
            if ('string' !== typeof e) throw Error(s(284));
            if (!r._owner) throw Error(s(290, e));
          }
          return e;
        }
        function xs(e, t) {
          throw (
            (e = Object.prototype.toString.call(t)),
            Error(
              s(
                31,
                '[object Object]' === e ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e
              )
            )
          );
        }
        function ys(e) {
          return (0, e._init)(e._payload);
        }
        function vs(e) {
          function t(t, r) {
            if (e) {
              var n = t.deletions;
              null === n ? ((t.deletions = [r]), (t.flags |= 16)) : n.push(r);
            }
          }
          function r(r, n) {
            if (!e) return null;
            for (; null !== n; ) (t(r, n), (n = n.sibling));
            return null;
          }
          function n(e, t) {
            for (e = new Map(); null !== t; )
              (null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling));
            return e;
          }
          function a(e, t) {
            return (((e = Lc(e, t)).index = 0), (e.sibling = null), e);
          }
          function o(t, r, n) {
            return (
              (t.index = n),
              e
                ? null !== (n = t.alternate)
                  ? (n = n.index) < r
                    ? ((t.flags |= 2), r)
                    : n
                  : ((t.flags |= 2), r)
                : ((t.flags |= 1048576), r)
            );
          }
          function i(t) {
            return (e && null === t.alternate && (t.flags |= 2), t);
          }
          function l(e, t, r, n) {
            return null === t || 6 !== t.tag
              ? (((t = Mc(r, e.mode, n)).return = e), t)
              : (((t = a(t, r)).return = e), t);
          }
          function c(e, t, r, n) {
            var s = r.type;
            return s === k
              ? d(e, t, r.props.children, n, r.key)
              : null !== t &&
                  (t.elementType === s ||
                    ('object' === typeof s && null !== s && s.$$typeof === T && ys(s) === t.type))
                ? (((n = a(t, r.props)).ref = gs(e, t, r)), (n.return = e), n)
                : (((n = Ac(r.type, r.key, r.props, null, e.mode, n)).ref = gs(e, t, r)),
                  (n.return = e),
                  n);
          }
          function u(e, t, r, n) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== r.containerInfo ||
              t.stateNode.implementation !== r.implementation
              ? (((t = Ic(r, e.mode, n)).return = e), t)
              : (((t = a(t, r.children || [])).return = e), t);
          }
          function d(e, t, r, n, s) {
            return null === t || 7 !== t.tag
              ? (((t = zc(r, e.mode, n, s)).return = e), t)
              : (((t = a(t, r)).return = e), t);
          }
          function m(e, t, r) {
            if (('string' === typeof t && '' !== t) || 'number' === typeof t)
              return (((t = Mc('' + t, e.mode, r)).return = e), t);
            if ('object' === typeof t && null !== t) {
              switch (t.$$typeof) {
                case w:
                  return (
                    ((r = Ac(t.type, t.key, t.props, null, e.mode, r)).ref = gs(e, null, t)),
                    (r.return = e),
                    r
                  );
                case j:
                  return (((t = Ic(t, e.mode, r)).return = e), t);
                case T:
                  return m(e, (0, t._init)(t._payload), r);
              }
              if (te(t) || z(t)) return (((t = zc(t, e.mode, r, null)).return = e), t);
              xs(e, t);
            }
            return null;
          }
          function f(e, t, r, n) {
            var a = null !== t ? t.key : null;
            if (('string' === typeof r && '' !== r) || 'number' === typeof r)
              return null !== a ? null : l(e, t, '' + r, n);
            if ('object' === typeof r && null !== r) {
              switch (r.$$typeof) {
                case w:
                  return r.key === a ? c(e, t, r, n) : null;
                case j:
                  return r.key === a ? u(e, t, r, n) : null;
                case T:
                  return f(e, t, (a = r._init)(r._payload), n);
              }
              if (te(r) || z(r)) return null !== a ? null : d(e, t, r, n, null);
              xs(e, r);
            }
            return null;
          }
          function p(e, t, r, n, a) {
            if (('string' === typeof n && '' !== n) || 'number' === typeof n)
              return l(t, (e = e.get(r) || null), '' + n, a);
            if ('object' === typeof n && null !== n) {
              switch (n.$$typeof) {
                case w:
                  return c(t, (e = e.get(null === n.key ? r : n.key) || null), n, a);
                case j:
                  return u(t, (e = e.get(null === n.key ? r : n.key) || null), n, a);
                case T:
                  return p(e, t, r, (0, n._init)(n._payload), a);
              }
              if (te(n) || z(n)) return d(t, (e = e.get(r) || null), n, a, null);
              xs(t, n);
            }
            return null;
          }
          function h(a, s, i, l) {
            for (
              var c = null, u = null, d = s, h = (s = 0), g = null;
              null !== d && h < i.length;
              h++
            ) {
              d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
              var x = f(a, d, i[h], l);
              if (null === x) {
                null === d && (d = g);
                break;
              }
              (e && d && null === x.alternate && t(a, d),
                (s = o(x, s, h)),
                null === u ? (c = x) : (u.sibling = x),
                (u = x),
                (d = g));
            }
            if (h === i.length) return (r(a, d), as && Ja(a, h), c);
            if (null === d) {
              for (; h < i.length; h++)
                null !== (d = m(a, i[h], l)) &&
                  ((s = o(d, s, h)), null === u ? (c = d) : (u.sibling = d), (u = d));
              return (as && Ja(a, h), c);
            }
            for (d = n(a, d); h < i.length; h++)
              null !== (g = p(d, a, h, i[h], l)) &&
                (e && null !== g.alternate && d.delete(null === g.key ? h : g.key),
                (s = o(g, s, h)),
                null === u ? (c = g) : (u.sibling = g),
                (u = g));
            return (
              e &&
                d.forEach(function (e) {
                  return t(a, e);
                }),
              as && Ja(a, h),
              c
            );
          }
          function g(a, i, l, c) {
            var u = z(l);
            if ('function' !== typeof u) throw Error(s(150));
            if (null == (l = u.call(l))) throw Error(s(151));
            for (
              var d = (u = null), h = i, g = (i = 0), x = null, y = l.next();
              null !== h && !y.done;
              g++, y = l.next()
            ) {
              h.index > g ? ((x = h), (h = null)) : (x = h.sibling);
              var v = f(a, h, y.value, c);
              if (null === v) {
                null === h && (h = x);
                break;
              }
              (e && h && null === v.alternate && t(a, h),
                (i = o(v, i, g)),
                null === d ? (u = v) : (d.sibling = v),
                (d = v),
                (h = x));
            }
            if (y.done) return (r(a, h), as && Ja(a, g), u);
            if (null === h) {
              for (; !y.done; g++, y = l.next())
                null !== (y = m(a, y.value, c)) &&
                  ((i = o(y, i, g)), null === d ? (u = y) : (d.sibling = y), (d = y));
              return (as && Ja(a, g), u);
            }
            for (h = n(a, h); !y.done; g++, y = l.next())
              null !== (y = p(h, a, g, y.value, c)) &&
                (e && null !== y.alternate && h.delete(null === y.key ? g : y.key),
                (i = o(y, i, g)),
                null === d ? (u = y) : (d.sibling = y),
                (d = y));
            return (
              e &&
                h.forEach(function (e) {
                  return t(a, e);
                }),
              as && Ja(a, g),
              u
            );
          }
          return function e(n, s, o, l) {
            if (
              ('object' === typeof o &&
                null !== o &&
                o.type === k &&
                null === o.key &&
                (o = o.props.children),
              'object' === typeof o && null !== o)
            ) {
              switch (o.$$typeof) {
                case w:
                  e: {
                    for (var c = o.key, u = s; null !== u; ) {
                      if (u.key === c) {
                        if ((c = o.type) === k) {
                          if (7 === u.tag) {
                            (r(n, u.sibling), ((s = a(u, o.props.children)).return = n), (n = s));
                            break e;
                          }
                        } else if (
                          u.elementType === c ||
                          ('object' === typeof c &&
                            null !== c &&
                            c.$$typeof === T &&
                            ys(c) === u.type)
                        ) {
                          (r(n, u.sibling),
                            ((s = a(u, o.props)).ref = gs(n, u, o)),
                            (s.return = n),
                            (n = s));
                          break e;
                        }
                        r(n, u);
                        break;
                      }
                      (t(n, u), (u = u.sibling));
                    }
                    o.type === k
                      ? (((s = zc(o.props.children, n.mode, l, o.key)).return = n), (n = s))
                      : (((l = Ac(o.type, o.key, o.props, null, n.mode, l)).ref = gs(n, s, o)),
                        (l.return = n),
                        (n = l));
                  }
                  return i(n);
                case j:
                  e: {
                    for (u = o.key; null !== s; ) {
                      if (s.key === u) {
                        if (
                          4 === s.tag &&
                          s.stateNode.containerInfo === o.containerInfo &&
                          s.stateNode.implementation === o.implementation
                        ) {
                          (r(n, s.sibling), ((s = a(s, o.children || [])).return = n), (n = s));
                          break e;
                        }
                        r(n, s);
                        break;
                      }
                      (t(n, s), (s = s.sibling));
                    }
                    (((s = Ic(o, n.mode, l)).return = n), (n = s));
                  }
                  return i(n);
                case T:
                  return e(n, s, (u = o._init)(o._payload), l);
              }
              if (te(o)) return h(n, s, o, l);
              if (z(o)) return g(n, s, o, l);
              xs(n, o);
            }
            return ('string' === typeof o && '' !== o) || 'number' === typeof o
              ? ((o = '' + o),
                null !== s && 6 === s.tag
                  ? (r(n, s.sibling), ((s = a(s, o)).return = n), (n = s))
                  : (r(n, s), ((s = Mc(o, n.mode, l)).return = n), (n = s)),
                i(n))
              : r(n, s);
          };
        }
        var bs = vs(!0),
          ws = vs(!1),
          js = Na(null),
          ks = null,
          Ns = null,
          Ss = null;
        function Es() {
          Ss = Ns = ks = null;
        }
        function Cs(e) {
          var t = js.current;
          (Sa(js), (e._currentValue = t));
        }
        function Ps(e, t, r) {
          for (; null !== e; ) {
            var n = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== n && (n.childLanes |= t))
                : null !== n && (n.childLanes & t) !== t && (n.childLanes |= t),
              e === r)
            )
              break;
            e = e.return;
          }
        }
        function _s(e, t) {
          ((ks = e),
            (Ss = Ns = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (vi = !0), (e.firstContext = null)));
        }
        function Os(e) {
          var t = e._currentValue;
          if (Ss !== e)
            if (((e = { context: e, memoizedValue: t, next: null }), null === Ns)) {
              if (null === ks) throw Error(s(308));
              ((Ns = e), (ks.dependencies = { lanes: 0, firstContext: e }));
            } else Ns = Ns.next = e;
          return t;
        }
        var Rs = null;
        function Ts(e) {
          null === Rs ? (Rs = [e]) : Rs.push(e);
        }
        function Ls(e, t, r, n) {
          var a = t.interleaved;
          return (
            null === a ? ((r.next = r), Ts(t)) : ((r.next = a.next), (a.next = r)),
            (t.interleaved = r),
            As(e, n)
          );
        }
        function As(e, t) {
          e.lanes |= t;
          var r = e.alternate;
          for (null !== r && (r.lanes |= t), r = e, e = e.return; null !== e; )
            ((e.childLanes |= t),
              null !== (r = e.alternate) && (r.childLanes |= t),
              (r = e),
              (e = e.return));
          return 3 === r.tag ? r.stateNode : null;
        }
        var zs = !1;
        function Fs(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          };
        }
        function Ms(e, t) {
          ((e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              }));
        }
        function Is(e, t) {
          return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
        }
        function Ds(e, t, r) {
          var n = e.updateQueue;
          if (null === n) return null;
          if (((n = n.shared), 0 !== (2 & Pl))) {
            var a = n.pending;
            return (
              null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
              (n.pending = t),
              As(e, r)
            );
          }
          return (
            null === (a = n.interleaved)
              ? ((t.next = t), Ts(n))
              : ((t.next = a.next), (a.next = t)),
            (n.interleaved = t),
            As(e, r)
          );
        }
        function Us(e, t, r) {
          if (null !== (t = t.updateQueue) && ((t = t.shared), 0 !== (4194240 & r))) {
            var n = t.lanes;
            ((r |= n &= e.pendingLanes), (t.lanes = r), yt(e, r));
          }
        }
        function Bs(e, t) {
          var r = e.updateQueue,
            n = e.alternate;
          if (null !== n && r === (n = n.updateQueue)) {
            var a = null,
              s = null;
            if (null !== (r = r.firstBaseUpdate)) {
              do {
                var o = {
                  eventTime: r.eventTime,
                  lane: r.lane,
                  tag: r.tag,
                  payload: r.payload,
                  callback: r.callback,
                  next: null,
                };
                (null === s ? (a = s = o) : (s = s.next = o), (r = r.next));
              } while (null !== r);
              null === s ? (a = s = t) : (s = s.next = t);
            } else a = s = t;
            return (
              (r = {
                baseState: n.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: s,
                shared: n.shared,
                effects: n.effects,
              }),
              void (e.updateQueue = r)
            );
          }
          (null === (e = r.lastBaseUpdate) ? (r.firstBaseUpdate = t) : (e.next = t),
            (r.lastBaseUpdate = t));
        }
        function Ws(e, t, r, n) {
          var a = e.updateQueue;
          zs = !1;
          var s = a.firstBaseUpdate,
            o = a.lastBaseUpdate,
            i = a.shared.pending;
          if (null !== i) {
            a.shared.pending = null;
            var l = i,
              c = l.next;
            ((l.next = null), null === o ? (s = c) : (o.next = c), (o = l));
            var u = e.alternate;
            null !== u &&
              (i = (u = u.updateQueue).lastBaseUpdate) !== o &&
              (null === i ? (u.firstBaseUpdate = c) : (i.next = c), (u.lastBaseUpdate = l));
          }
          if (null !== s) {
            var d = a.baseState;
            for (o = 0, u = c = l = null, i = s; ; ) {
              var m = i.lane,
                f = i.eventTime;
              if ((n & m) === m) {
                null !== u &&
                  (u = u.next =
                    {
                      eventTime: f,
                      lane: 0,
                      tag: i.tag,
                      payload: i.payload,
                      callback: i.callback,
                      next: null,
                    });
                e: {
                  var p = e,
                    h = i;
                  switch (((m = t), (f = r), h.tag)) {
                    case 1:
                      if ('function' === typeof (p = h.payload)) {
                        d = p.call(f, d, m);
                        break e;
                      }
                      d = p;
                      break e;
                    case 3:
                      p.flags = (-65537 & p.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (m = 'function' === typeof (p = h.payload) ? p.call(f, d, m) : p) ||
                        void 0 === m
                      )
                        break e;
                      d = M({}, d, m);
                      break e;
                    case 2:
                      zs = !0;
                  }
                }
                null !== i.callback &&
                  0 !== i.lane &&
                  ((e.flags |= 64), null === (m = a.effects) ? (a.effects = [i]) : m.push(i));
              } else
                ((f = {
                  eventTime: f,
                  lane: m,
                  tag: i.tag,
                  payload: i.payload,
                  callback: i.callback,
                  next: null,
                }),
                  null === u ? ((c = u = f), (l = d)) : (u = u.next = f),
                  (o |= m));
              if (null === (i = i.next)) {
                if (null === (i = a.shared.pending)) break;
                ((i = (m = i).next),
                  (m.next = null),
                  (a.lastBaseUpdate = m),
                  (a.shared.pending = null));
              }
            }
            if (
              (null === u && (l = d),
              (a.baseState = l),
              (a.firstBaseUpdate = c),
              (a.lastBaseUpdate = u),
              null !== (t = a.shared.interleaved))
            ) {
              a = t;
              do {
                ((o |= a.lane), (a = a.next));
              } while (a !== t);
            } else null === s && (a.shared.lanes = 0);
            ((Fl |= o), (e.lanes = o), (e.memoizedState = d));
          }
        }
        function $s(e, t, r) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var n = e[t],
                a = n.callback;
              if (null !== a) {
                if (((n.callback = null), (n = r), 'function' !== typeof a)) throw Error(s(191, a));
                a.call(n);
              }
            }
        }
        var Hs = {},
          qs = Na(Hs),
          Vs = Na(Hs),
          Gs = Na(Hs);
        function Qs(e) {
          if (e === Hs) throw Error(s(174));
          return e;
        }
        function Ys(e, t) {
          switch ((Ea(Gs, t), Ea(Vs, e), Ea(qs, Hs), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : le(null, '');
              break;
            default:
              t = le((t = (e = 8 === e ? t.parentNode : t).namespaceURI || null), (e = e.tagName));
          }
          (Sa(qs), Ea(qs, t));
        }
        function Ks() {
          (Sa(qs), Sa(Vs), Sa(Gs));
        }
        function Zs(e) {
          Qs(Gs.current);
          var t = Qs(qs.current),
            r = le(t, e.type);
          t !== r && (Ea(Vs, e), Ea(qs, r));
        }
        function Js(e) {
          Vs.current === e && (Sa(qs), Sa(Vs));
        }
        var Xs = Na(0);
        function eo(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var r = t.memoizedState;
              if (null !== r && (null === (r = r.dehydrated) || '$?' === r.data || '$!' === r.data))
                return t;
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t;
            } else if (null !== t.child) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            ((t.sibling.return = t.return), (t = t.sibling));
          }
          return null;
        }
        var to = [];
        function ro() {
          for (var e = 0; e < to.length; e++) to[e]._workInProgressVersionPrimary = null;
          to.length = 0;
        }
        var no = b.ReactCurrentDispatcher,
          ao = b.ReactCurrentBatchConfig,
          so = 0,
          oo = null,
          io = null,
          lo = null,
          co = !1,
          uo = !1,
          mo = 0,
          fo = 0;
        function po() {
          throw Error(s(321));
        }
        function ho(e, t) {
          if (null === t) return !1;
          for (var r = 0; r < t.length && r < e.length; r++) if (!on(e[r], t[r])) return !1;
          return !0;
        }
        function go(e, t, r, n, a, o) {
          if (
            ((so = o),
            (oo = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (no.current = null === e || null === e.memoizedState ? Xo : ei),
            (e = r(n, a)),
            uo)
          ) {
            o = 0;
            do {
              if (((uo = !1), (mo = 0), 25 <= o)) throw Error(s(301));
              ((o += 1),
                (lo = io = null),
                (t.updateQueue = null),
                (no.current = ti),
                (e = r(n, a)));
            } while (uo);
          }
          if (
            ((no.current = Jo),
            (t = null !== io && null !== io.next),
            (so = 0),
            (lo = io = oo = null),
            (co = !1),
            t)
          )
            throw Error(s(300));
          return e;
        }
        function xo() {
          var e = 0 !== mo;
          return ((mo = 0), e);
        }
        function yo() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (null === lo ? (oo.memoizedState = lo = e) : (lo = lo.next = e), lo);
        }
        function vo() {
          if (null === io) {
            var e = oo.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = io.next;
          var t = null === lo ? oo.memoizedState : lo.next;
          if (null !== t) ((lo = t), (io = e));
          else {
            if (null === e) throw Error(s(310));
            ((e = {
              memoizedState: (io = e).memoizedState,
              baseState: io.baseState,
              baseQueue: io.baseQueue,
              queue: io.queue,
              next: null,
            }),
              null === lo ? (oo.memoizedState = lo = e) : (lo = lo.next = e));
          }
          return lo;
        }
        function bo(e, t) {
          return 'function' === typeof t ? t(e) : t;
        }
        function wo(e) {
          var t = vo(),
            r = t.queue;
          if (null === r) throw Error(s(311));
          r.lastRenderedReducer = e;
          var n = io,
            a = n.baseQueue,
            o = r.pending;
          if (null !== o) {
            if (null !== a) {
              var i = a.next;
              ((a.next = o.next), (o.next = i));
            }
            ((n.baseQueue = a = o), (r.pending = null));
          }
          if (null !== a) {
            ((o = a.next), (n = n.baseState));
            var l = (i = null),
              c = null,
              u = o;
            do {
              var d = u.lane;
              if ((so & d) === d)
                (null !== c &&
                  (c = c.next =
                    {
                      lane: 0,
                      action: u.action,
                      hasEagerState: u.hasEagerState,
                      eagerState: u.eagerState,
                      next: null,
                    }),
                  (n = u.hasEagerState ? u.eagerState : e(n, u.action)));
              else {
                var m = {
                  lane: d,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                };
                (null === c ? ((l = c = m), (i = n)) : (c = c.next = m),
                  (oo.lanes |= d),
                  (Fl |= d));
              }
              u = u.next;
            } while (null !== u && u !== o);
            (null === c ? (i = n) : (c.next = l),
              on(n, t.memoizedState) || (vi = !0),
              (t.memoizedState = n),
              (t.baseState = i),
              (t.baseQueue = c),
              (r.lastRenderedState = n));
          }
          if (null !== (e = r.interleaved)) {
            a = e;
            do {
              ((o = a.lane), (oo.lanes |= o), (Fl |= o), (a = a.next));
            } while (a !== e);
          } else null === a && (r.lanes = 0);
          return [t.memoizedState, r.dispatch];
        }
        function jo(e) {
          var t = vo(),
            r = t.queue;
          if (null === r) throw Error(s(311));
          r.lastRenderedReducer = e;
          var n = r.dispatch,
            a = r.pending,
            o = t.memoizedState;
          if (null !== a) {
            r.pending = null;
            var i = (a = a.next);
            do {
              ((o = e(o, i.action)), (i = i.next));
            } while (i !== a);
            (on(o, t.memoizedState) || (vi = !0),
              (t.memoizedState = o),
              null === t.baseQueue && (t.baseState = o),
              (r.lastRenderedState = o));
          }
          return [o, n];
        }
        function ko() {}
        function No(e, t) {
          var r = oo,
            n = vo(),
            a = t(),
            o = !on(n.memoizedState, a);
          if (
            (o && ((n.memoizedState = a), (vi = !0)),
            (n = n.queue),
            Fo(Co.bind(null, r, n, e), [e]),
            n.getSnapshot !== t || o || (null !== lo && 1 & lo.memoizedState.tag))
          ) {
            if (((r.flags |= 2048), Ro(9, Eo.bind(null, r, n, a, t), void 0, null), null === _l))
              throw Error(s(349));
            0 !== (30 & so) || So(r, t, a);
          }
          return a;
        }
        function So(e, t, r) {
          ((e.flags |= 16384),
            (e = { getSnapshot: t, value: r }),
            null === (t = oo.updateQueue)
              ? ((t = { lastEffect: null, stores: null }), (oo.updateQueue = t), (t.stores = [e]))
              : null === (r = t.stores)
                ? (t.stores = [e])
                : r.push(e));
        }
        function Eo(e, t, r, n) {
          ((t.value = r), (t.getSnapshot = n), Po(t) && _o(e));
        }
        function Co(e, t, r) {
          return r(function () {
            Po(t) && _o(e);
          });
        }
        function Po(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var r = t();
            return !on(e, r);
          } catch (n) {
            return !0;
          }
        }
        function _o(e) {
          var t = As(e, 1);
          null !== t && rc(t, e, 1, -1);
        }
        function Oo(e) {
          var t = yo();
          return (
            'function' === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: bo,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Qo.bind(null, oo, e)),
            [t.memoizedState, e]
          );
        }
        function Ro(e, t, r, n) {
          return (
            (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
            null === (t = oo.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (oo.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (r = t.lastEffect)
                ? (t.lastEffect = e.next = e)
                : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e)),
            e
          );
        }
        function To() {
          return vo().memoizedState;
        }
        function Lo(e, t, r, n) {
          var a = yo();
          ((oo.flags |= e), (a.memoizedState = Ro(1 | t, r, void 0, void 0 === n ? null : n)));
        }
        function Ao(e, t, r, n) {
          var a = vo();
          n = void 0 === n ? null : n;
          var s = void 0;
          if (null !== io) {
            var o = io.memoizedState;
            if (((s = o.destroy), null !== n && ho(n, o.deps)))
              return void (a.memoizedState = Ro(t, r, s, n));
          }
          ((oo.flags |= e), (a.memoizedState = Ro(1 | t, r, s, n)));
        }
        function zo(e, t) {
          return Lo(8390656, 8, e, t);
        }
        function Fo(e, t) {
          return Ao(2048, 8, e, t);
        }
        function Mo(e, t) {
          return Ao(4, 2, e, t);
        }
        function Io(e, t) {
          return Ao(4, 4, e, t);
        }
        function Do(e, t) {
          return 'function' === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null);
              })
            : null !== t && void 0 !== t
              ? ((e = e()),
                (t.current = e),
                function () {
                  t.current = null;
                })
              : void 0;
        }
        function Uo(e, t, r) {
          return (
            (r = null !== r && void 0 !== r ? r.concat([e]) : null),
            Ao(4, 4, Do.bind(null, t, e), r)
          );
        }
        function Bo() {}
        function Wo(e, t) {
          var r = vo();
          t = void 0 === t ? null : t;
          var n = r.memoizedState;
          return null !== n && null !== t && ho(t, n[1]) ? n[0] : ((r.memoizedState = [e, t]), e);
        }
        function $o(e, t) {
          var r = vo();
          t = void 0 === t ? null : t;
          var n = r.memoizedState;
          return null !== n && null !== t && ho(t, n[1])
            ? n[0]
            : ((e = e()), (r.memoizedState = [e, t]), e);
        }
        function Ho(e, t, r) {
          return 0 === (21 & so)
            ? (e.baseState && ((e.baseState = !1), (vi = !0)), (e.memoizedState = r))
            : (on(r, t) || ((r = ht()), (oo.lanes |= r), (Fl |= r), (e.baseState = !0)), t);
        }
        function qo(e, t) {
          var r = vt;
          ((vt = 0 !== r && 4 > r ? r : 4), e(!0));
          var n = ao.transition;
          ao.transition = {};
          try {
            (e(!1), t());
          } finally {
            ((vt = r), (ao.transition = n));
          }
        }
        function Vo() {
          return vo().memoizedState;
        }
        function Go(e, t, r) {
          var n = tc(e);
          if (
            ((r = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null }), Yo(e))
          )
            Ko(t, r);
          else if (null !== (r = Ls(e, t, r, n))) {
            (rc(r, e, n, ec()), Zo(r, t, n));
          }
        }
        function Qo(e, t, r) {
          var n = tc(e),
            a = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
          if (Yo(e)) Ko(t, a);
          else {
            var s = e.alternate;
            if (
              0 === e.lanes &&
              (null === s || 0 === s.lanes) &&
              null !== (s = t.lastRenderedReducer)
            )
              try {
                var o = t.lastRenderedState,
                  i = s(o, r);
                if (((a.hasEagerState = !0), (a.eagerState = i), on(i, o))) {
                  var l = t.interleaved;
                  return (
                    null === l ? ((a.next = a), Ts(t)) : ((a.next = l.next), (l.next = a)),
                    void (t.interleaved = a)
                  );
                }
              } catch (c) {}
            null !== (r = Ls(e, t, a, n)) && (rc(r, e, n, (a = ec())), Zo(r, t, n));
          }
        }
        function Yo(e) {
          var t = e.alternate;
          return e === oo || (null !== t && t === oo);
        }
        function Ko(e, t) {
          uo = co = !0;
          var r = e.pending;
          (null === r ? (t.next = t) : ((t.next = r.next), (r.next = t)), (e.pending = t));
        }
        function Zo(e, t, r) {
          if (0 !== (4194240 & r)) {
            var n = t.lanes;
            ((r |= n &= e.pendingLanes), (t.lanes = r), yt(e, r));
          }
        }
        var Jo = {
            readContext: Os,
            useCallback: po,
            useContext: po,
            useEffect: po,
            useImperativeHandle: po,
            useInsertionEffect: po,
            useLayoutEffect: po,
            useMemo: po,
            useReducer: po,
            useRef: po,
            useState: po,
            useDebugValue: po,
            useDeferredValue: po,
            useTransition: po,
            useMutableSource: po,
            useSyncExternalStore: po,
            useId: po,
            unstable_isNewReconciler: !1,
          },
          Xo = {
            readContext: Os,
            useCallback: function (e, t) {
              return ((yo().memoizedState = [e, void 0 === t ? null : t]), e);
            },
            useContext: Os,
            useEffect: zo,
            useImperativeHandle: function (e, t, r) {
              return (
                (r = null !== r && void 0 !== r ? r.concat([e]) : null),
                Lo(4194308, 4, Do.bind(null, t, e), r)
              );
            },
            useLayoutEffect: function (e, t) {
              return Lo(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              return Lo(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var r = yo();
              return ((t = void 0 === t ? null : t), (e = e()), (r.memoizedState = [e, t]), e);
            },
            useReducer: function (e, t, r) {
              var n = yo();
              return (
                (t = void 0 !== r ? r(t) : t),
                (n.memoizedState = n.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (n.queue = e),
                (e = e.dispatch = Go.bind(null, oo, e)),
                [n.memoizedState, e]
              );
            },
            useRef: function (e) {
              return ((e = { current: e }), (yo().memoizedState = e));
            },
            useState: Oo,
            useDebugValue: Bo,
            useDeferredValue: function (e) {
              return (yo().memoizedState = e);
            },
            useTransition: function () {
              var e = Oo(!1),
                t = e[0];
              return ((e = qo.bind(null, e[1])), (yo().memoizedState = e), [t, e]);
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, r) {
              var n = oo,
                a = yo();
              if (as) {
                if (void 0 === r) throw Error(s(407));
                r = r();
              } else {
                if (((r = t()), null === _l)) throw Error(s(349));
                0 !== (30 & so) || So(n, t, r);
              }
              a.memoizedState = r;
              var o = { value: r, getSnapshot: t };
              return (
                (a.queue = o),
                zo(Co.bind(null, n, o, e), [e]),
                (n.flags |= 2048),
                Ro(9, Eo.bind(null, n, o, r, t), void 0, null),
                r
              );
            },
            useId: function () {
              var e = yo(),
                t = _l.identifierPrefix;
              if (as) {
                var r = Za;
                ((t = ':' + t + 'R' + (r = (Ka & ~(1 << (32 - ot(Ka) - 1))).toString(32) + r)),
                  0 < (r = mo++) && (t += 'H' + r.toString(32)),
                  (t += ':'));
              } else t = ':' + t + 'r' + (r = fo++).toString(32) + ':';
              return (e.memoizedState = t);
            },
            unstable_isNewReconciler: !1,
          },
          ei = {
            readContext: Os,
            useCallback: Wo,
            useContext: Os,
            useEffect: Fo,
            useImperativeHandle: Uo,
            useInsertionEffect: Mo,
            useLayoutEffect: Io,
            useMemo: $o,
            useReducer: wo,
            useRef: To,
            useState: function () {
              return wo(bo);
            },
            useDebugValue: Bo,
            useDeferredValue: function (e) {
              return Ho(vo(), io.memoizedState, e);
            },
            useTransition: function () {
              return [wo(bo)[0], vo().memoizedState];
            },
            useMutableSource: ko,
            useSyncExternalStore: No,
            useId: Vo,
            unstable_isNewReconciler: !1,
          },
          ti = {
            readContext: Os,
            useCallback: Wo,
            useContext: Os,
            useEffect: Fo,
            useImperativeHandle: Uo,
            useInsertionEffect: Mo,
            useLayoutEffect: Io,
            useMemo: $o,
            useReducer: jo,
            useRef: To,
            useState: function () {
              return jo(bo);
            },
            useDebugValue: Bo,
            useDeferredValue: function (e) {
              var t = vo();
              return null === io ? (t.memoizedState = e) : Ho(t, io.memoizedState, e);
            },
            useTransition: function () {
              return [jo(bo)[0], vo().memoizedState];
            },
            useMutableSource: ko,
            useSyncExternalStore: No,
            useId: Vo,
            unstable_isNewReconciler: !1,
          };
        function ri(e, t) {
          if (e && e.defaultProps) {
            for (var r in ((t = M({}, t)), (e = e.defaultProps))) void 0 === t[r] && (t[r] = e[r]);
            return t;
          }
          return t;
        }
        function ni(e, t, r, n) {
          ((r = null === (r = r(n, (t = e.memoizedState))) || void 0 === r ? t : M({}, t, r)),
            (e.memoizedState = r),
            0 === e.lanes && (e.updateQueue.baseState = r));
        }
        var ai = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && We(e) === e;
          },
          enqueueSetState: function (e, t, r) {
            e = e._reactInternals;
            var n = ec(),
              a = tc(e),
              s = Is(n, a);
            ((s.payload = t),
              void 0 !== r && null !== r && (s.callback = r),
              null !== (t = Ds(e, s, a)) && (rc(t, e, a, n), Us(t, e, a)));
          },
          enqueueReplaceState: function (e, t, r) {
            e = e._reactInternals;
            var n = ec(),
              a = tc(e),
              s = Is(n, a);
            ((s.tag = 1),
              (s.payload = t),
              void 0 !== r && null !== r && (s.callback = r),
              null !== (t = Ds(e, s, a)) && (rc(t, e, a, n), Us(t, e, a)));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var r = ec(),
              n = tc(e),
              a = Is(r, n);
            ((a.tag = 2),
              void 0 !== t && null !== t && (a.callback = t),
              null !== (t = Ds(e, a, n)) && (rc(t, e, n, r), Us(t, e, n)));
          },
        };
        function si(e, t, r, n, a, s, o) {
          return 'function' === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(n, s, o)
            : !t.prototype || !t.prototype.isPureReactComponent || !ln(r, n) || !ln(a, s);
        }
        function oi(e, t, r) {
          var n = !1,
            a = Ca,
            s = t.contextType;
          return (
            'object' === typeof s && null !== s
              ? (s = Os(s))
              : ((a = Ta(t) ? Oa : Pa.current),
                (s = (n = null !== (n = t.contextTypes) && void 0 !== n) ? Ra(e, a) : Ca)),
            (t = new t(r, s)),
            (e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = ai),
            (e.stateNode = t),
            (t._reactInternals = e),
            n &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a),
              (e.__reactInternalMemoizedMaskedChildContext = s)),
            t
          );
        }
        function ii(e, t, r, n) {
          ((e = t.state),
            'function' === typeof t.componentWillReceiveProps && t.componentWillReceiveProps(r, n),
            'function' === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(r, n),
            t.state !== e && ai.enqueueReplaceState(t, t.state, null));
        }
        function li(e, t, r, n) {
          var a = e.stateNode;
          ((a.props = r), (a.state = e.memoizedState), (a.refs = {}), Fs(e));
          var s = t.contextType;
          ('object' === typeof s && null !== s
            ? (a.context = Os(s))
            : ((s = Ta(t) ? Oa : Pa.current), (a.context = Ra(e, s))),
            (a.state = e.memoizedState),
            'function' === typeof (s = t.getDerivedStateFromProps) &&
              (ni(e, t, s, r), (a.state = e.memoizedState)),
            'function' === typeof t.getDerivedStateFromProps ||
              'function' === typeof a.getSnapshotBeforeUpdate ||
              ('function' !== typeof a.UNSAFE_componentWillMount &&
                'function' !== typeof a.componentWillMount) ||
              ((t = a.state),
              'function' === typeof a.componentWillMount && a.componentWillMount(),
              'function' === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(),
              t !== a.state && ai.enqueueReplaceState(a, a.state, null),
              Ws(e, r, a, n),
              (a.state = e.memoizedState)),
            'function' === typeof a.componentDidMount && (e.flags |= 4194308));
        }
        function ci(e, t) {
          try {
            var r = '',
              n = t;
            do {
              ((r += B(n)), (n = n.return));
            } while (n);
            var a = r;
          } catch (s) {
            a = '\nError generating stack: ' + s.message + '\n' + s.stack;
          }
          return { value: e, source: t, stack: a, digest: null };
        }
        function ui(e, t, r) {
          return {
            value: e,
            source: null,
            stack: null != r ? r : null,
            digest: null != t ? t : null,
          };
        }
        function di(e, t) {
          try {
            console.error(t.value);
          } catch (r) {
            setTimeout(function () {
              throw r;
            });
          }
        }
        var mi = 'function' === typeof WeakMap ? WeakMap : Map;
        function fi(e, t, r) {
          (((r = Is(-1, r)).tag = 3), (r.payload = { element: null }));
          var n = t.value;
          return (
            (r.callback = function () {
              (Hl || ((Hl = !0), (ql = n)), di(0, t));
            }),
            r
          );
        }
        function pi(e, t, r) {
          (r = Is(-1, r)).tag = 3;
          var n = e.type.getDerivedStateFromError;
          if ('function' === typeof n) {
            var a = t.value;
            ((r.payload = function () {
              return n(a);
            }),
              (r.callback = function () {
                di(0, t);
              }));
          }
          var s = e.stateNode;
          return (
            null !== s &&
              'function' === typeof s.componentDidCatch &&
              (r.callback = function () {
                (di(0, t),
                  'function' !== typeof n && (null === Vl ? (Vl = new Set([this])) : Vl.add(this)));
                var e = t.stack;
                this.componentDidCatch(t.value, { componentStack: null !== e ? e : '' });
              }),
            r
          );
        }
        function hi(e, t, r) {
          var n = e.pingCache;
          if (null === n) {
            n = e.pingCache = new mi();
            var a = new Set();
            n.set(t, a);
          } else void 0 === (a = n.get(t)) && ((a = new Set()), n.set(t, a));
          a.has(r) || (a.add(r), (e = Sc.bind(null, e, t, r)), t.then(e, e));
        }
        function gi(e) {
          do {
            var t;
            if (
              ((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e;
            e = e.return;
          } while (null !== e);
          return null;
        }
        function xi(e, t, r, n, a) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (r.flags |= 131072),
                  (r.flags &= -52805),
                  1 === r.tag &&
                    (null === r.alternate
                      ? (r.tag = 17)
                      : (((t = Is(-1, 1)).tag = 2), Ds(r, t, 1))),
                  (r.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = a), e);
        }
        var yi = b.ReactCurrentOwner,
          vi = !1;
        function bi(e, t, r, n) {
          t.child = null === e ? ws(t, null, r, n) : bs(t, e.child, r, n);
        }
        function wi(e, t, r, n, a) {
          r = r.render;
          var s = t.ref;
          return (
            _s(t, a),
            (n = go(e, t, r, n, s, a)),
            (r = xo()),
            null === e || vi
              ? (as && r && es(t), (t.flags |= 1), bi(e, t, n, a), t.child)
              : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a), Hi(e, t, a))
          );
        }
        function ji(e, t, r, n, a) {
          if (null === e) {
            var s = r.type;
            return 'function' !== typeof s ||
              Tc(s) ||
              void 0 !== s.defaultProps ||
              null !== r.compare ||
              void 0 !== r.defaultProps
              ? (((e = Ac(r.type, null, n, t, t.mode, a)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = s), ki(e, t, s, n, a));
          }
          if (((s = e.child), 0 === (e.lanes & a))) {
            var o = s.memoizedProps;
            if ((r = null !== (r = r.compare) ? r : ln)(o, n) && e.ref === t.ref)
              return Hi(e, t, a);
          }
          return ((t.flags |= 1), ((e = Lc(s, n)).ref = t.ref), (e.return = t), (t.child = e));
        }
        function ki(e, t, r, n, a) {
          if (null !== e) {
            var s = e.memoizedProps;
            if (ln(s, n) && e.ref === t.ref) {
              if (((vi = !1), (t.pendingProps = n = s), 0 === (e.lanes & a)))
                return ((t.lanes = e.lanes), Hi(e, t, a));
              0 !== (131072 & e.flags) && (vi = !0);
            }
          }
          return Ei(e, t, r, n, a);
        }
        function Ni(e, t, r) {
          var n = t.pendingProps,
            a = n.children,
            s = null !== e ? e.memoizedState : null;
          if ('hidden' === n.mode)
            if (0 === (1 & t.mode))
              ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                Ea(Ll, Tl),
                (Tl |= r));
            else {
              if (0 === (1073741824 & r))
                return (
                  (e = null !== s ? s.baseLanes | r : r),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
                  (t.updateQueue = null),
                  Ea(Ll, Tl),
                  (Tl |= e),
                  null
                );
              ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
                (n = null !== s ? s.baseLanes : r),
                Ea(Ll, Tl),
                (Tl |= n));
            }
          else
            (null !== s ? ((n = s.baseLanes | r), (t.memoizedState = null)) : (n = r),
              Ea(Ll, Tl),
              (Tl |= n));
          return (bi(e, t, a, r), t.child);
        }
        function Si(e, t) {
          var r = t.ref;
          ((null === e && null !== r) || (null !== e && e.ref !== r)) &&
            ((t.flags |= 512), (t.flags |= 2097152));
        }
        function Ei(e, t, r, n, a) {
          var s = Ta(r) ? Oa : Pa.current;
          return (
            (s = Ra(t, s)),
            _s(t, a),
            (r = go(e, t, r, n, s, a)),
            (n = xo()),
            null === e || vi
              ? (as && n && es(t), (t.flags |= 1), bi(e, t, r, a), t.child)
              : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~a), Hi(e, t, a))
          );
        }
        function Ci(e, t, r, n, a) {
          if (Ta(r)) {
            var s = !0;
            Fa(t);
          } else s = !1;
          if ((_s(t, a), null === t.stateNode)) ($i(e, t), oi(t, r, n), li(t, r, n, a), (n = !0));
          else if (null === e) {
            var o = t.stateNode,
              i = t.memoizedProps;
            o.props = i;
            var l = o.context,
              c = r.contextType;
            'object' === typeof c && null !== c
              ? (c = Os(c))
              : (c = Ra(t, (c = Ta(r) ? Oa : Pa.current)));
            var u = r.getDerivedStateFromProps,
              d = 'function' === typeof u || 'function' === typeof o.getSnapshotBeforeUpdate;
            (d ||
              ('function' !== typeof o.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof o.componentWillReceiveProps) ||
              ((i !== n || l !== c) && ii(t, o, n, c)),
              (zs = !1));
            var m = t.memoizedState;
            ((o.state = m),
              Ws(t, n, o, a),
              (l = t.memoizedState),
              i !== n || m !== l || _a.current || zs
                ? ('function' === typeof u && (ni(t, r, u, n), (l = t.memoizedState)),
                  (i = zs || si(t, r, i, n, m, l, c))
                    ? (d ||
                        ('function' !== typeof o.UNSAFE_componentWillMount &&
                          'function' !== typeof o.componentWillMount) ||
                        ('function' === typeof o.componentWillMount && o.componentWillMount(),
                        'function' === typeof o.UNSAFE_componentWillMount &&
                          o.UNSAFE_componentWillMount()),
                      'function' === typeof o.componentDidMount && (t.flags |= 4194308))
                    : ('function' === typeof o.componentDidMount && (t.flags |= 4194308),
                      (t.memoizedProps = n),
                      (t.memoizedState = l)),
                  (o.props = n),
                  (o.state = l),
                  (o.context = c),
                  (n = i))
                : ('function' === typeof o.componentDidMount && (t.flags |= 4194308), (n = !1)));
          } else {
            ((o = t.stateNode),
              Ms(e, t),
              (i = t.memoizedProps),
              (c = t.type === t.elementType ? i : ri(t.type, i)),
              (o.props = c),
              (d = t.pendingProps),
              (m = o.context),
              'object' === typeof (l = r.contextType) && null !== l
                ? (l = Os(l))
                : (l = Ra(t, (l = Ta(r) ? Oa : Pa.current))));
            var f = r.getDerivedStateFromProps;
            ((u = 'function' === typeof f || 'function' === typeof o.getSnapshotBeforeUpdate) ||
              ('function' !== typeof o.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof o.componentWillReceiveProps) ||
              ((i !== d || m !== l) && ii(t, o, n, l)),
              (zs = !1),
              (m = t.memoizedState),
              (o.state = m),
              Ws(t, n, o, a));
            var p = t.memoizedState;
            i !== d || m !== p || _a.current || zs
              ? ('function' === typeof f && (ni(t, r, f, n), (p = t.memoizedState)),
                (c = zs || si(t, r, c, n, m, p, l) || !1)
                  ? (u ||
                      ('function' !== typeof o.UNSAFE_componentWillUpdate &&
                        'function' !== typeof o.componentWillUpdate) ||
                      ('function' === typeof o.componentWillUpdate &&
                        o.componentWillUpdate(n, p, l),
                      'function' === typeof o.UNSAFE_componentWillUpdate &&
                        o.UNSAFE_componentWillUpdate(n, p, l)),
                    'function' === typeof o.componentDidUpdate && (t.flags |= 4),
                    'function' === typeof o.getSnapshotBeforeUpdate && (t.flags |= 1024))
                  : ('function' !== typeof o.componentDidUpdate ||
                      (i === e.memoizedProps && m === e.memoizedState) ||
                      (t.flags |= 4),
                    'function' !== typeof o.getSnapshotBeforeUpdate ||
                      (i === e.memoizedProps && m === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = n),
                    (t.memoizedState = p)),
                (o.props = n),
                (o.state = p),
                (o.context = l),
                (n = c))
              : ('function' !== typeof o.componentDidUpdate ||
                  (i === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 4),
                'function' !== typeof o.getSnapshotBeforeUpdate ||
                  (i === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 1024),
                (n = !1));
          }
          return Pi(e, t, r, n, s, a);
        }
        function Pi(e, t, r, n, a, s) {
          Si(e, t);
          var o = 0 !== (128 & t.flags);
          if (!n && !o) return (a && Ma(t, r, !1), Hi(e, t, s));
          ((n = t.stateNode), (yi.current = t));
          var i = o && 'function' !== typeof r.getDerivedStateFromError ? null : n.render();
          return (
            (t.flags |= 1),
            null !== e && o
              ? ((t.child = bs(t, e.child, null, s)), (t.child = bs(t, null, i, s)))
              : bi(e, t, i, s),
            (t.memoizedState = n.state),
            a && Ma(t, r, !0),
            t.child
          );
        }
        function _i(e) {
          var t = e.stateNode;
          (t.pendingContext
            ? Aa(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Aa(0, t.context, !1),
            Ys(e, t.containerInfo));
        }
        function Oi(e, t, r, n, a) {
          return (fs(), ps(a), (t.flags |= 256), bi(e, t, r, n), t.child);
        }
        var Ri,
          Ti,
          Li,
          Ai,
          zi = { dehydrated: null, treeContext: null, retryLane: 0 };
        function Fi(e) {
          return { baseLanes: e, cachePool: null, transitions: null };
        }
        function Mi(e, t, r) {
          var n,
            a = t.pendingProps,
            o = Xs.current,
            i = !1,
            l = 0 !== (128 & t.flags);
          if (
            ((n = l) || (n = (null === e || null !== e.memoizedState) && 0 !== (2 & o)),
            n
              ? ((i = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (o |= 1),
            Ea(Xs, 1 & o),
            null === e)
          )
            return (
              cs(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : '$!' === e.data
                      ? (t.lanes = 8)
                      : (t.lanes = 1073741824),
                  null)
                : ((l = a.children),
                  (e = a.fallback),
                  i
                    ? ((a = t.mode),
                      (i = t.child),
                      (l = { mode: 'hidden', children: l }),
                      0 === (1 & a) && null !== i
                        ? ((i.childLanes = 0), (i.pendingProps = l))
                        : (i = Fc(l, a, 0, null)),
                      (e = zc(e, a, r, null)),
                      (i.return = t),
                      (e.return = t),
                      (i.sibling = e),
                      (t.child = i),
                      (t.child.memoizedState = Fi(r)),
                      (t.memoizedState = zi),
                      e)
                    : Ii(t, l))
            );
          if (null !== (o = e.memoizedState) && null !== (n = o.dehydrated))
            return (function (e, t, r, n, a, o, i) {
              if (r)
                return 256 & t.flags
                  ? ((t.flags &= -257), Di(e, t, i, (n = ui(Error(s(422))))))
                  : null !== t.memoizedState
                    ? ((t.child = e.child), (t.flags |= 128), null)
                    : ((o = n.fallback),
                      (a = t.mode),
                      (n = Fc({ mode: 'visible', children: n.children }, a, 0, null)),
                      ((o = zc(o, a, i, null)).flags |= 2),
                      (n.return = t),
                      (o.return = t),
                      (n.sibling = o),
                      (t.child = n),
                      0 !== (1 & t.mode) && bs(t, e.child, null, i),
                      (t.child.memoizedState = Fi(i)),
                      (t.memoizedState = zi),
                      o);
              if (0 === (1 & t.mode)) return Di(e, t, i, null);
              if ('$!' === a.data) {
                if ((n = a.nextSibling && a.nextSibling.dataset)) var l = n.dgst;
                return ((n = l), Di(e, t, i, (n = ui((o = Error(s(419))), n, void 0))));
              }
              if (((l = 0 !== (i & e.childLanes)), vi || l)) {
                if (null !== (n = _l)) {
                  switch (i & -i) {
                    case 4:
                      a = 2;
                      break;
                    case 16:
                      a = 8;
                      break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      a = 32;
                      break;
                    case 536870912:
                      a = 268435456;
                      break;
                    default:
                      a = 0;
                  }
                  0 !== (a = 0 !== (a & (n.suspendedLanes | i)) ? 0 : a) &&
                    a !== o.retryLane &&
                    ((o.retryLane = a), As(e, a), rc(n, e, a, -1));
                }
                return (hc(), Di(e, t, i, (n = ui(Error(s(421))))));
              }
              return '$?' === a.data
                ? ((t.flags |= 128),
                  (t.child = e.child),
                  (t = Cc.bind(null, e)),
                  (a._reactRetry = t),
                  null)
                : ((e = o.treeContext),
                  (ns = ca(a.nextSibling)),
                  (rs = t),
                  (as = !0),
                  (ss = null),
                  null !== e &&
                    ((Ga[Qa++] = Ka),
                    (Ga[Qa++] = Za),
                    (Ga[Qa++] = Ya),
                    (Ka = e.id),
                    (Za = e.overflow),
                    (Ya = t)),
                  (t = Ii(t, n.children)),
                  (t.flags |= 4096),
                  t);
            })(e, t, l, a, n, o, r);
          if (i) {
            ((i = a.fallback), (l = t.mode), (n = (o = e.child).sibling));
            var c = { mode: 'hidden', children: a.children };
            return (
              0 === (1 & l) && t.child !== o
                ? (((a = t.child).childLanes = 0), (a.pendingProps = c), (t.deletions = null))
                : ((a = Lc(o, c)).subtreeFlags = 14680064 & o.subtreeFlags),
              null !== n ? (i = Lc(n, i)) : ((i = zc(i, l, r, null)).flags |= 2),
              (i.return = t),
              (a.return = t),
              (a.sibling = i),
              (t.child = a),
              (a = i),
              (i = t.child),
              (l =
                null === (l = e.child.memoizedState)
                  ? Fi(r)
                  : { baseLanes: l.baseLanes | r, cachePool: null, transitions: l.transitions }),
              (i.memoizedState = l),
              (i.childLanes = e.childLanes & ~r),
              (t.memoizedState = zi),
              a
            );
          }
          return (
            (e = (i = e.child).sibling),
            (a = Lc(i, { mode: 'visible', children: a.children })),
            0 === (1 & t.mode) && (a.lanes = r),
            (a.return = t),
            (a.sibling = null),
            null !== e &&
              (null === (r = t.deletions) ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
            (t.child = a),
            (t.memoizedState = null),
            a
          );
        }
        function Ii(e, t) {
          return (
            ((t = Fc({ mode: 'visible', children: t }, e.mode, 0, null)).return = e),
            (e.child = t)
          );
        }
        function Di(e, t, r, n) {
          return (
            null !== n && ps(n),
            bs(t, e.child, null, r),
            ((e = Ii(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function Ui(e, t, r) {
          e.lanes |= t;
          var n = e.alternate;
          (null !== n && (n.lanes |= t), Ps(e.return, t, r));
        }
        function Bi(e, t, r, n, a) {
          var s = e.memoizedState;
          null === s
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: n,
                tail: r,
                tailMode: a,
              })
            : ((s.isBackwards = t),
              (s.rendering = null),
              (s.renderingStartTime = 0),
              (s.last = n),
              (s.tail = r),
              (s.tailMode = a));
        }
        function Wi(e, t, r) {
          var n = t.pendingProps,
            a = n.revealOrder,
            s = n.tail;
          if ((bi(e, t, n.children, r), 0 !== (2 & (n = Xs.current))))
            ((n = (1 & n) | 2), (t.flags |= 128));
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && Ui(e, r, t);
                else if (19 === e.tag) Ui(e, r, t);
                else if (null !== e.child) {
                  ((e.child.return = e), (e = e.child));
                  continue;
                }
                if (e === t) break e;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e;
                  e = e.return;
                }
                ((e.sibling.return = e.return), (e = e.sibling));
              }
            n &= 1;
          }
          if ((Ea(Xs, n), 0 === (1 & t.mode))) t.memoizedState = null;
          else
            switch (a) {
              case 'forwards':
                for (r = t.child, a = null; null !== r; )
                  (null !== (e = r.alternate) && null === eo(e) && (a = r), (r = r.sibling));
                (null === (r = a)
                  ? ((a = t.child), (t.child = null))
                  : ((a = r.sibling), (r.sibling = null)),
                  Bi(t, !1, a, r, s));
                break;
              case 'backwards':
                for (r = null, a = t.child, t.child = null; null !== a; ) {
                  if (null !== (e = a.alternate) && null === eo(e)) {
                    t.child = a;
                    break;
                  }
                  ((e = a.sibling), (a.sibling = r), (r = a), (a = e));
                }
                Bi(t, !0, r, null, s);
                break;
              case 'together':
                Bi(t, !1, null, null, void 0);
                break;
              default:
                t.memoizedState = null;
            }
          return t.child;
        }
        function $i(e, t) {
          0 === (1 & t.mode) &&
            null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
        }
        function Hi(e, t, r) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Fl |= t.lanes),
            0 === (r & t.childLanes))
          )
            return null;
          if (null !== e && t.child !== e.child) throw Error(s(153));
          if (null !== t.child) {
            for (
              r = Lc((e = t.child), e.pendingProps), t.child = r, r.return = t;
              null !== e.sibling;

            )
              ((e = e.sibling), ((r = r.sibling = Lc(e, e.pendingProps)).return = t));
            r.sibling = null;
          }
          return t.child;
        }
        function qi(e, t) {
          if (!as)
            switch (e.tailMode) {
              case 'hidden':
                t = e.tail;
                for (var r = null; null !== t; ) (null !== t.alternate && (r = t), (t = t.sibling));
                null === r ? (e.tail = null) : (r.sibling = null);
                break;
              case 'collapsed':
                r = e.tail;
                for (var n = null; null !== r; ) (null !== r.alternate && (n = r), (r = r.sibling));
                null === n
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (n.sibling = null);
            }
        }
        function Vi(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            r = 0,
            n = 0;
          if (t)
            for (var a = e.child; null !== a; )
              ((r |= a.lanes | a.childLanes),
                (n |= 14680064 & a.subtreeFlags),
                (n |= 14680064 & a.flags),
                (a.return = e),
                (a = a.sibling));
          else
            for (a = e.child; null !== a; )
              ((r |= a.lanes | a.childLanes),
                (n |= a.subtreeFlags),
                (n |= a.flags),
                (a.return = e),
                (a = a.sibling));
          return ((e.subtreeFlags |= n), (e.childLanes = r), t);
        }
        function Gi(e, t, r) {
          var n = t.pendingProps;
          switch ((ts(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return (Vi(t), null);
            case 1:
            case 17:
              return (Ta(t.type) && La(), Vi(t), null);
            case 3:
              return (
                (n = t.stateNode),
                Ks(),
                Sa(_a),
                Sa(Pa),
                ro(),
                n.pendingContext && ((n.context = n.pendingContext), (n.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (ds(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024), null !== ss && (oc(ss), (ss = null)))),
                Ti(e, t),
                Vi(t),
                null
              );
            case 5:
              Js(t);
              var a = Qs(Gs.current);
              if (((r = t.type), null !== e && null != t.stateNode))
                (Li(e, t, r, n, a), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
              else {
                if (!n) {
                  if (null === t.stateNode) throw Error(s(166));
                  return (Vi(t), null);
                }
                if (((e = Qs(qs.current)), ds(t))) {
                  ((n = t.stateNode), (r = t.type));
                  var o = t.memoizedProps;
                  switch (((n[ma] = t), (n[fa] = o), (e = 0 !== (1 & t.mode)), r)) {
                    case 'dialog':
                      (Dn('cancel', n), Dn('close', n));
                      break;
                    case 'iframe':
                    case 'object':
                    case 'embed':
                      Dn('load', n);
                      break;
                    case 'video':
                    case 'audio':
                      for (a = 0; a < zn.length; a++) Dn(zn[a], n);
                      break;
                    case 'source':
                      Dn('error', n);
                      break;
                    case 'img':
                    case 'image':
                    case 'link':
                      (Dn('error', n), Dn('load', n));
                      break;
                    case 'details':
                      Dn('toggle', n);
                      break;
                    case 'input':
                      (K(n, o), Dn('invalid', n));
                      break;
                    case 'select':
                      ((n._wrapperState = { wasMultiple: !!o.multiple }), Dn('invalid', n));
                      break;
                    case 'textarea':
                      (ae(n, o), Dn('invalid', n));
                  }
                  for (var l in (ye(r, o), (a = null), o))
                    if (o.hasOwnProperty(l)) {
                      var c = o[l];
                      'children' === l
                        ? 'string' === typeof c
                          ? n.textContent !== c &&
                            (!0 !== o.suppressHydrationWarning && Jn(n.textContent, c, e),
                            (a = ['children', c]))
                          : 'number' === typeof c &&
                            n.textContent !== '' + c &&
                            (!0 !== o.suppressHydrationWarning && Jn(n.textContent, c, e),
                            (a = ['children', '' + c]))
                        : i.hasOwnProperty(l) && null != c && 'onScroll' === l && Dn('scroll', n);
                    }
                  switch (r) {
                    case 'input':
                      (V(n), X(n, o, !0));
                      break;
                    case 'textarea':
                      (V(n), oe(n));
                      break;
                    case 'select':
                    case 'option':
                      break;
                    default:
                      'function' === typeof o.onClick && (n.onclick = Xn);
                  }
                  ((n = a), (t.updateQueue = n), null !== n && (t.flags |= 4));
                } else {
                  ((l = 9 === a.nodeType ? a : a.ownerDocument),
                    'http://www.w3.org/1999/xhtml' === e && (e = ie(r)),
                    'http://www.w3.org/1999/xhtml' === e
                      ? 'script' === r
                        ? (((e = l.createElement('div')).innerHTML = '<script><\/script>'),
                          (e = e.removeChild(e.firstChild)))
                        : 'string' === typeof n.is
                          ? (e = l.createElement(r, { is: n.is }))
                          : ((e = l.createElement(r)),
                            'select' === r &&
                              ((l = e),
                              n.multiple ? (l.multiple = !0) : n.size && (l.size = n.size)))
                      : (e = l.createElementNS(e, r)),
                    (e[ma] = t),
                    (e[fa] = n),
                    Ri(e, t, !1, !1),
                    (t.stateNode = e));
                  e: {
                    switch (((l = ve(r, n)), r)) {
                      case 'dialog':
                        (Dn('cancel', e), Dn('close', e), (a = n));
                        break;
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        (Dn('load', e), (a = n));
                        break;
                      case 'video':
                      case 'audio':
                        for (a = 0; a < zn.length; a++) Dn(zn[a], e);
                        a = n;
                        break;
                      case 'source':
                        (Dn('error', e), (a = n));
                        break;
                      case 'img':
                      case 'image':
                      case 'link':
                        (Dn('error', e), Dn('load', e), (a = n));
                        break;
                      case 'details':
                        (Dn('toggle', e), (a = n));
                        break;
                      case 'input':
                        (K(e, n), (a = Y(e, n)), Dn('invalid', e));
                        break;
                      case 'option':
                      default:
                        a = n;
                        break;
                      case 'select':
                        ((e._wrapperState = { wasMultiple: !!n.multiple }),
                          (a = M({}, n, { value: void 0 })),
                          Dn('invalid', e));
                        break;
                      case 'textarea':
                        (ae(e, n), (a = ne(e, n)), Dn('invalid', e));
                    }
                    for (o in (ye(r, a), (c = a)))
                      if (c.hasOwnProperty(o)) {
                        var u = c[o];
                        'style' === o
                          ? ge(e, u)
                          : 'dangerouslySetInnerHTML' === o
                            ? null != (u = u ? u.__html : void 0) && de(e, u)
                            : 'children' === o
                              ? 'string' === typeof u
                                ? ('textarea' !== r || '' !== u) && me(e, u)
                                : 'number' === typeof u && me(e, '' + u)
                              : 'suppressContentEditableWarning' !== o &&
                                'suppressHydrationWarning' !== o &&
                                'autoFocus' !== o &&
                                (i.hasOwnProperty(o)
                                  ? null != u && 'onScroll' === o && Dn('scroll', e)
                                  : null != u && v(e, o, u, l));
                      }
                    switch (r) {
                      case 'input':
                        (V(e), X(e, n, !1));
                        break;
                      case 'textarea':
                        (V(e), oe(e));
                        break;
                      case 'option':
                        null != n.value && e.setAttribute('value', '' + H(n.value));
                        break;
                      case 'select':
                        ((e.multiple = !!n.multiple),
                          null != (o = n.value)
                            ? re(e, !!n.multiple, o, !1)
                            : null != n.defaultValue && re(e, !!n.multiple, n.defaultValue, !0));
                        break;
                      default:
                        'function' === typeof a.onClick && (e.onclick = Xn);
                    }
                    switch (r) {
                      case 'button':
                      case 'input':
                      case 'select':
                      case 'textarea':
                        n = !!n.autoFocus;
                        break e;
                      case 'img':
                        n = !0;
                        break e;
                      default:
                        n = !1;
                    }
                  }
                  n && (t.flags |= 4);
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              }
              return (Vi(t), null);
            case 6:
              if (e && null != t.stateNode) Ai(e, t, e.memoizedProps, n);
              else {
                if ('string' !== typeof n && null === t.stateNode) throw Error(s(166));
                if (((r = Qs(Gs.current)), Qs(qs.current), ds(t))) {
                  if (
                    ((n = t.stateNode),
                    (r = t.memoizedProps),
                    (n[ma] = t),
                    (o = n.nodeValue !== r) && null !== (e = rs))
                  )
                    switch (e.tag) {
                      case 3:
                        Jn(n.nodeValue, r, 0 !== (1 & e.mode));
                        break;
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          Jn(n.nodeValue, r, 0 !== (1 & e.mode));
                    }
                  o && (t.flags |= 4);
                } else
                  (((n = (9 === r.nodeType ? r : r.ownerDocument).createTextNode(n))[ma] = t),
                    (t.stateNode = n));
              }
              return (Vi(t), null);
            case 13:
              if (
                (Sa(Xs),
                (n = t.memoizedState),
                null === e || (null !== e.memoizedState && null !== e.memoizedState.dehydrated))
              ) {
                if (as && null !== ns && 0 !== (1 & t.mode) && 0 === (128 & t.flags))
                  (ms(), fs(), (t.flags |= 98560), (o = !1));
                else if (((o = ds(t)), null !== n && null !== n.dehydrated)) {
                  if (null === e) {
                    if (!o) throw Error(s(318));
                    if (!(o = null !== (o = t.memoizedState) ? o.dehydrated : null))
                      throw Error(s(317));
                    o[ma] = t;
                  } else (fs(), 0 === (128 & t.flags) && (t.memoizedState = null), (t.flags |= 4));
                  (Vi(t), (o = !1));
                } else (null !== ss && (oc(ss), (ss = null)), (o = !0));
                if (!o) return 65536 & t.flags ? t : null;
              }
              return 0 !== (128 & t.flags)
                ? ((t.lanes = r), t)
                : ((n = null !== n) !== (null !== e && null !== e.memoizedState) &&
                    n &&
                    ((t.child.flags |= 8192),
                    0 !== (1 & t.mode) &&
                      (null === e || 0 !== (1 & Xs.current) ? 0 === Al && (Al = 3) : hc())),
                  null !== t.updateQueue && (t.flags |= 4),
                  Vi(t),
                  null);
            case 4:
              return (Ks(), Ti(e, t), null === e && Wn(t.stateNode.containerInfo), Vi(t), null);
            case 10:
              return (Cs(t.type._context), Vi(t), null);
            case 19:
              if ((Sa(Xs), null === (o = t.memoizedState))) return (Vi(t), null);
              if (((n = 0 !== (128 & t.flags)), null === (l = o.rendering)))
                if (n) qi(o, !1);
                else {
                  if (0 !== Al || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (l = eo(e))) {
                        for (
                          t.flags |= 128,
                            qi(o, !1),
                            null !== (n = l.updateQueue) && ((t.updateQueue = n), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            n = r,
                            r = t.child;
                          null !== r;

                        )
                          ((e = n),
                            ((o = r).flags &= 14680066),
                            null === (l = o.alternate)
                              ? ((o.childLanes = 0),
                                (o.lanes = e),
                                (o.child = null),
                                (o.subtreeFlags = 0),
                                (o.memoizedProps = null),
                                (o.memoizedState = null),
                                (o.updateQueue = null),
                                (o.dependencies = null),
                                (o.stateNode = null))
                              : ((o.childLanes = l.childLanes),
                                (o.lanes = l.lanes),
                                (o.child = l.child),
                                (o.subtreeFlags = 0),
                                (o.deletions = null),
                                (o.memoizedProps = l.memoizedProps),
                                (o.memoizedState = l.memoizedState),
                                (o.updateQueue = l.updateQueue),
                                (o.type = l.type),
                                (e = l.dependencies),
                                (o.dependencies =
                                  null === e
                                    ? null
                                    : { lanes: e.lanes, firstContext: e.firstContext })),
                            (r = r.sibling));
                        return (Ea(Xs, (1 & Xs.current) | 2), t.child);
                      }
                      e = e.sibling;
                    }
                  null !== o.tail &&
                    Ze() > Wl &&
                    ((t.flags |= 128), (n = !0), qi(o, !1), (t.lanes = 4194304));
                }
              else {
                if (!n)
                  if (null !== (e = eo(l))) {
                    if (
                      ((t.flags |= 128),
                      (n = !0),
                      null !== (r = e.updateQueue) && ((t.updateQueue = r), (t.flags |= 4)),
                      qi(o, !0),
                      null === o.tail && 'hidden' === o.tailMode && !l.alternate && !as)
                    )
                      return (Vi(t), null);
                  } else
                    2 * Ze() - o.renderingStartTime > Wl &&
                      1073741824 !== r &&
                      ((t.flags |= 128), (n = !0), qi(o, !1), (t.lanes = 4194304));
                o.isBackwards
                  ? ((l.sibling = t.child), (t.child = l))
                  : (null !== (r = o.last) ? (r.sibling = l) : (t.child = l), (o.last = l));
              }
              return null !== o.tail
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = Ze()),
                  (t.sibling = null),
                  (r = Xs.current),
                  Ea(Xs, n ? (1 & r) | 2 : 1 & r),
                  t)
                : (Vi(t), null);
            case 22:
            case 23:
              return (
                dc(),
                (n = null !== t.memoizedState),
                null !== e && (null !== e.memoizedState) !== n && (t.flags |= 8192),
                n && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & Tl) && (Vi(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : Vi(t),
                null
              );
            case 24:
            case 25:
              return null;
          }
          throw Error(s(156, t.tag));
        }
        function Qi(e, t) {
          switch ((ts(t), t.tag)) {
            case 1:
              return (
                Ta(t.type) && La(),
                65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null
              );
            case 3:
              return (
                Ks(),
                Sa(_a),
                Sa(Pa),
                ro(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 5:
              return (Js(t), null);
            case 13:
              if ((Sa(Xs), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
                if (null === t.alternate) throw Error(s(340));
                fs();
              }
              return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
            case 19:
              return (Sa(Xs), null);
            case 4:
              return (Ks(), null);
            case 10:
              return (Cs(t.type._context), null);
            case 22:
            case 23:
              return (dc(), null);
            default:
              return null;
          }
        }
        ((Ri = function (e, t) {
          for (var r = t.child; null !== r; ) {
            if (5 === r.tag || 6 === r.tag) e.appendChild(r.stateNode);
            else if (4 !== r.tag && null !== r.child) {
              ((r.child.return = r), (r = r.child));
              continue;
            }
            if (r === t) break;
            for (; null === r.sibling; ) {
              if (null === r.return || r.return === t) return;
              r = r.return;
            }
            ((r.sibling.return = r.return), (r = r.sibling));
          }
        }),
          (Ti = function () {}),
          (Li = function (e, t, r, n) {
            var a = e.memoizedProps;
            if (a !== n) {
              ((e = t.stateNode), Qs(qs.current));
              var s,
                o = null;
              switch (r) {
                case 'input':
                  ((a = Y(e, a)), (n = Y(e, n)), (o = []));
                  break;
                case 'select':
                  ((a = M({}, a, { value: void 0 })), (n = M({}, n, { value: void 0 })), (o = []));
                  break;
                case 'textarea':
                  ((a = ne(e, a)), (n = ne(e, n)), (o = []));
                  break;
                default:
                  'function' !== typeof a.onClick &&
                    'function' === typeof n.onClick &&
                    (e.onclick = Xn);
              }
              for (u in (ye(r, n), (r = null), a))
                if (!n.hasOwnProperty(u) && a.hasOwnProperty(u) && null != a[u])
                  if ('style' === u) {
                    var l = a[u];
                    for (s in l) l.hasOwnProperty(s) && (r || (r = {}), (r[s] = ''));
                  } else
                    'dangerouslySetInnerHTML' !== u &&
                      'children' !== u &&
                      'suppressContentEditableWarning' !== u &&
                      'suppressHydrationWarning' !== u &&
                      'autoFocus' !== u &&
                      (i.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
              for (u in n) {
                var c = n[u];
                if (
                  ((l = null != a ? a[u] : void 0),
                  n.hasOwnProperty(u) && c !== l && (null != c || null != l))
                )
                  if ('style' === u)
                    if (l) {
                      for (s in l)
                        !l.hasOwnProperty(s) ||
                          (c && c.hasOwnProperty(s)) ||
                          (r || (r = {}), (r[s] = ''));
                      for (s in c)
                        c.hasOwnProperty(s) && l[s] !== c[s] && (r || (r = {}), (r[s] = c[s]));
                    } else (r || (o || (o = []), o.push(u, r)), (r = c));
                  else
                    'dangerouslySetInnerHTML' === u
                      ? ((c = c ? c.__html : void 0),
                        (l = l ? l.__html : void 0),
                        null != c && l !== c && (o = o || []).push(u, c))
                      : 'children' === u
                        ? ('string' !== typeof c && 'number' !== typeof c) ||
                          (o = o || []).push(u, '' + c)
                        : 'suppressContentEditableWarning' !== u &&
                          'suppressHydrationWarning' !== u &&
                          (i.hasOwnProperty(u)
                            ? (null != c && 'onScroll' === u && Dn('scroll', e),
                              o || l === c || (o = []))
                            : (o = o || []).push(u, c));
              }
              r && (o = o || []).push('style', r);
              var u = o;
              (t.updateQueue = u) && (t.flags |= 4);
            }
          }),
          (Ai = function (e, t, r, n) {
            r !== n && (t.flags |= 4);
          }));
        var Yi = !1,
          Ki = !1,
          Zi = 'function' === typeof WeakSet ? WeakSet : Set,
          Ji = null;
        function Xi(e, t) {
          var r = e.ref;
          if (null !== r)
            if ('function' === typeof r)
              try {
                r(null);
              } catch (n) {
                Nc(e, t, n);
              }
            else r.current = null;
        }
        function el(e, t, r) {
          try {
            r();
          } catch (n) {
            Nc(e, t, n);
          }
        }
        var tl = !1;
        function rl(e, t, r) {
          var n = t.updateQueue;
          if (null !== (n = null !== n ? n.lastEffect : null)) {
            var a = (n = n.next);
            do {
              if ((a.tag & e) === e) {
                var s = a.destroy;
                ((a.destroy = void 0), void 0 !== s && el(t, r, s));
              }
              a = a.next;
            } while (a !== n);
          }
        }
        function nl(e, t) {
          if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
            var r = (t = t.next);
            do {
              if ((r.tag & e) === e) {
                var n = r.create;
                r.destroy = n();
              }
              r = r.next;
            } while (r !== t);
          }
        }
        function al(e) {
          var t = e.ref;
          if (null !== t) {
            var r = e.stateNode;
            (e.tag, (e = r), 'function' === typeof t ? t(e) : (t.current = e));
          }
        }
        function sl(e) {
          var t = e.alternate;
          (null !== t && ((e.alternate = null), sl(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[ma], delete t[fa], delete t[ha], delete t[ga], delete t[xa]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null));
        }
        function ol(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag;
        }
        function il(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || ol(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              ((e.child.return = e), (e = e.child));
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function ll(e, t, r) {
          var n = e.tag;
          if (5 === n || 6 === n)
            ((e = e.stateNode),
              t
                ? 8 === r.nodeType
                  ? r.parentNode.insertBefore(e, t)
                  : r.insertBefore(e, t)
                : (8 === r.nodeType
                    ? (t = r.parentNode).insertBefore(e, r)
                    : (t = r).appendChild(e),
                  (null !== (r = r._reactRootContainer) && void 0 !== r) ||
                    null !== t.onclick ||
                    (t.onclick = Xn)));
          else if (4 !== n && null !== (e = e.child))
            for (ll(e, t, r), e = e.sibling; null !== e; ) (ll(e, t, r), (e = e.sibling));
        }
        function cl(e, t, r) {
          var n = e.tag;
          if (5 === n || 6 === n) ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
          else if (4 !== n && null !== (e = e.child))
            for (cl(e, t, r), e = e.sibling; null !== e; ) (cl(e, t, r), (e = e.sibling));
        }
        var ul = null,
          dl = !1;
        function ml(e, t, r) {
          for (r = r.child; null !== r; ) (fl(e, t, r), (r = r.sibling));
        }
        function fl(e, t, r) {
          if (st && 'function' === typeof st.onCommitFiberUnmount)
            try {
              st.onCommitFiberUnmount(at, r);
            } catch (i) {}
          switch (r.tag) {
            case 5:
              Ki || Xi(r, t);
            case 6:
              var n = ul,
                a = dl;
              ((ul = null),
                ml(e, t, r),
                (dl = a),
                null !== (ul = n) &&
                  (dl
                    ? ((e = ul),
                      (r = r.stateNode),
                      8 === e.nodeType ? e.parentNode.removeChild(r) : e.removeChild(r))
                    : ul.removeChild(r.stateNode)));
              break;
            case 18:
              null !== ul &&
                (dl
                  ? ((e = ul),
                    (r = r.stateNode),
                    8 === e.nodeType ? la(e.parentNode, r) : 1 === e.nodeType && la(e, r),
                    Wt(e))
                  : la(ul, r.stateNode));
              break;
            case 4:
              ((n = ul),
                (a = dl),
                (ul = r.stateNode.containerInfo),
                (dl = !0),
                ml(e, t, r),
                (ul = n),
                (dl = a));
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              if (!Ki && null !== (n = r.updateQueue) && null !== (n = n.lastEffect)) {
                a = n = n.next;
                do {
                  var s = a,
                    o = s.destroy;
                  ((s = s.tag),
                    void 0 !== o && (0 !== (2 & s) || 0 !== (4 & s)) && el(r, t, o),
                    (a = a.next));
                } while (a !== n);
              }
              ml(e, t, r);
              break;
            case 1:
              if (!Ki && (Xi(r, t), 'function' === typeof (n = r.stateNode).componentWillUnmount))
                try {
                  ((n.props = r.memoizedProps),
                    (n.state = r.memoizedState),
                    n.componentWillUnmount());
                } catch (i) {
                  Nc(r, t, i);
                }
              ml(e, t, r);
              break;
            case 21:
              ml(e, t, r);
              break;
            case 22:
              1 & r.mode
                ? ((Ki = (n = Ki) || null !== r.memoizedState), ml(e, t, r), (Ki = n))
                : ml(e, t, r);
              break;
            default:
              ml(e, t, r);
          }
        }
        function pl(e) {
          var t = e.updateQueue;
          if (null !== t) {
            e.updateQueue = null;
            var r = e.stateNode;
            (null === r && (r = e.stateNode = new Zi()),
              t.forEach(function (t) {
                var n = Pc.bind(null, e, t);
                r.has(t) || (r.add(t), t.then(n, n));
              }));
          }
        }
        function hl(e, t) {
          var r = t.deletions;
          if (null !== r)
            for (var n = 0; n < r.length; n++) {
              var a = r[n];
              try {
                var o = e,
                  i = t,
                  l = i;
                e: for (; null !== l; ) {
                  switch (l.tag) {
                    case 5:
                      ((ul = l.stateNode), (dl = !1));
                      break e;
                    case 3:
                    case 4:
                      ((ul = l.stateNode.containerInfo), (dl = !0));
                      break e;
                  }
                  l = l.return;
                }
                if (null === ul) throw Error(s(160));
                (fl(o, i, a), (ul = null), (dl = !1));
                var c = a.alternate;
                (null !== c && (c.return = null), (a.return = null));
              } catch (u) {
                Nc(a, t, u);
              }
            }
          if (12854 & t.subtreeFlags) for (t = t.child; null !== t; ) (gl(t, e), (t = t.sibling));
        }
        function gl(e, t) {
          var r = e.alternate,
            n = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((hl(t, e), xl(e), 4 & n)) {
                try {
                  (rl(3, e, e.return), nl(3, e));
                } catch (g) {
                  Nc(e, e.return, g);
                }
                try {
                  rl(5, e, e.return);
                } catch (g) {
                  Nc(e, e.return, g);
                }
              }
              break;
            case 1:
              (hl(t, e), xl(e), 512 & n && null !== r && Xi(r, r.return));
              break;
            case 5:
              if ((hl(t, e), xl(e), 512 & n && null !== r && Xi(r, r.return), 32 & e.flags)) {
                var a = e.stateNode;
                try {
                  me(a, '');
                } catch (g) {
                  Nc(e, e.return, g);
                }
              }
              if (4 & n && null != (a = e.stateNode)) {
                var o = e.memoizedProps,
                  i = null !== r ? r.memoizedProps : o,
                  l = e.type,
                  c = e.updateQueue;
                if (((e.updateQueue = null), null !== c))
                  try {
                    ('input' === l && 'radio' === o.type && null != o.name && Z(a, o), ve(l, i));
                    var u = ve(l, o);
                    for (i = 0; i < c.length; i += 2) {
                      var d = c[i],
                        m = c[i + 1];
                      'style' === d
                        ? ge(a, m)
                        : 'dangerouslySetInnerHTML' === d
                          ? de(a, m)
                          : 'children' === d
                            ? me(a, m)
                            : v(a, d, m, u);
                    }
                    switch (l) {
                      case 'input':
                        J(a, o);
                        break;
                      case 'textarea':
                        se(a, o);
                        break;
                      case 'select':
                        var f = a._wrapperState.wasMultiple;
                        a._wrapperState.wasMultiple = !!o.multiple;
                        var p = o.value;
                        null != p
                          ? re(a, !!o.multiple, p, !1)
                          : f !== !!o.multiple &&
                            (null != o.defaultValue
                              ? re(a, !!o.multiple, o.defaultValue, !0)
                              : re(a, !!o.multiple, o.multiple ? [] : '', !1));
                    }
                    a[fa] = o;
                  } catch (g) {
                    Nc(e, e.return, g);
                  }
              }
              break;
            case 6:
              if ((hl(t, e), xl(e), 4 & n)) {
                if (null === e.stateNode) throw Error(s(162));
                ((a = e.stateNode), (o = e.memoizedProps));
                try {
                  a.nodeValue = o;
                } catch (g) {
                  Nc(e, e.return, g);
                }
              }
              break;
            case 3:
              if ((hl(t, e), xl(e), 4 & n && null !== r && r.memoizedState.isDehydrated))
                try {
                  Wt(t.containerInfo);
                } catch (g) {
                  Nc(e, e.return, g);
                }
              break;
            case 4:
            default:
              (hl(t, e), xl(e));
              break;
            case 13:
              (hl(t, e),
                xl(e),
                8192 & (a = e.child).flags &&
                  ((o = null !== a.memoizedState),
                  (a.stateNode.isHidden = o),
                  !o ||
                    (null !== a.alternate && null !== a.alternate.memoizedState) ||
                    (Bl = Ze())),
                4 & n && pl(e));
              break;
            case 22:
              if (
                ((d = null !== r && null !== r.memoizedState),
                1 & e.mode ? ((Ki = (u = Ki) || d), hl(t, e), (Ki = u)) : hl(t, e),
                xl(e),
                8192 & n)
              ) {
                if (
                  ((u = null !== e.memoizedState),
                  (e.stateNode.isHidden = u) && !d && 0 !== (1 & e.mode))
                )
                  for (Ji = e, d = e.child; null !== d; ) {
                    for (m = Ji = d; null !== Ji; ) {
                      switch (((p = (f = Ji).child), f.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          rl(4, f, f.return);
                          break;
                        case 1:
                          Xi(f, f.return);
                          var h = f.stateNode;
                          if ('function' === typeof h.componentWillUnmount) {
                            ((n = f), (r = f.return));
                            try {
                              ((t = n),
                                (h.props = t.memoizedProps),
                                (h.state = t.memoizedState),
                                h.componentWillUnmount());
                            } catch (g) {
                              Nc(n, r, g);
                            }
                          }
                          break;
                        case 5:
                          Xi(f, f.return);
                          break;
                        case 22:
                          if (null !== f.memoizedState) {
                            wl(m);
                            continue;
                          }
                      }
                      null !== p ? ((p.return = f), (Ji = p)) : wl(m);
                    }
                    d = d.sibling;
                  }
                e: for (d = null, m = e; ; ) {
                  if (5 === m.tag) {
                    if (null === d) {
                      d = m;
                      try {
                        ((a = m.stateNode),
                          u
                            ? 'function' === typeof (o = a.style).setProperty
                              ? o.setProperty('display', 'none', 'important')
                              : (o.display = 'none')
                            : ((l = m.stateNode),
                              (i =
                                void 0 !== (c = m.memoizedProps.style) &&
                                null !== c &&
                                c.hasOwnProperty('display')
                                  ? c.display
                                  : null),
                              (l.style.display = he('display', i))));
                      } catch (g) {
                        Nc(e, e.return, g);
                      }
                    }
                  } else if (6 === m.tag) {
                    if (null === d)
                      try {
                        m.stateNode.nodeValue = u ? '' : m.memoizedProps;
                      } catch (g) {
                        Nc(e, e.return, g);
                      }
                  } else if (
                    ((22 !== m.tag && 23 !== m.tag) || null === m.memoizedState || m === e) &&
                    null !== m.child
                  ) {
                    ((m.child.return = m), (m = m.child));
                    continue;
                  }
                  if (m === e) break e;
                  for (; null === m.sibling; ) {
                    if (null === m.return || m.return === e) break e;
                    (d === m && (d = null), (m = m.return));
                  }
                  (d === m && (d = null), (m.sibling.return = m.return), (m = m.sibling));
                }
              }
              break;
            case 19:
              (hl(t, e), xl(e), 4 & n && pl(e));
            case 21:
          }
        }
        function xl(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              e: {
                for (var r = e.return; null !== r; ) {
                  if (ol(r)) {
                    var n = r;
                    break e;
                  }
                  r = r.return;
                }
                throw Error(s(160));
              }
              switch (n.tag) {
                case 5:
                  var a = n.stateNode;
                  (32 & n.flags && (me(a, ''), (n.flags &= -33)), cl(e, il(e), a));
                  break;
                case 3:
                case 4:
                  var o = n.stateNode.containerInfo;
                  ll(e, il(e), o);
                  break;
                default:
                  throw Error(s(161));
              }
            } catch (i) {
              Nc(e, e.return, i);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function yl(e, t, r) {
          ((Ji = e), vl(e, t, r));
        }
        function vl(e, t, r) {
          for (var n = 0 !== (1 & e.mode); null !== Ji; ) {
            var a = Ji,
              s = a.child;
            if (22 === a.tag && n) {
              var o = null !== a.memoizedState || Yi;
              if (!o) {
                var i = a.alternate,
                  l = (null !== i && null !== i.memoizedState) || Ki;
                i = Yi;
                var c = Ki;
                if (((Yi = o), (Ki = l) && !c))
                  for (Ji = a; null !== Ji; )
                    ((l = (o = Ji).child),
                      22 === o.tag && null !== o.memoizedState
                        ? jl(a)
                        : null !== l
                          ? ((l.return = o), (Ji = l))
                          : jl(a));
                for (; null !== s; ) ((Ji = s), vl(s, t, r), (s = s.sibling));
                ((Ji = a), (Yi = i), (Ki = c));
              }
              bl(e);
            } else 0 !== (8772 & a.subtreeFlags) && null !== s ? ((s.return = a), (Ji = s)) : bl(e);
          }
        }
        function bl(e) {
          for (; null !== Ji; ) {
            var t = Ji;
            if (0 !== (8772 & t.flags)) {
              var r = t.alternate;
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ki || nl(5, t);
                      break;
                    case 1:
                      var n = t.stateNode;
                      if (4 & t.flags && !Ki)
                        if (null === r) n.componentDidMount();
                        else {
                          var a =
                            t.elementType === t.type
                              ? r.memoizedProps
                              : ri(t.type, r.memoizedProps);
                          n.componentDidUpdate(
                            a,
                            r.memoizedState,
                            n.__reactInternalSnapshotBeforeUpdate
                          );
                        }
                      var o = t.updateQueue;
                      null !== o && $s(t, o, n);
                      break;
                    case 3:
                      var i = t.updateQueue;
                      if (null !== i) {
                        if (((r = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              r = t.child.stateNode;
                          }
                        $s(t, i, r);
                      }
                      break;
                    case 5:
                      var l = t.stateNode;
                      if (null === r && 4 & t.flags) {
                        r = l;
                        var c = t.memoizedProps;
                        switch (t.type) {
                          case 'button':
                          case 'input':
                          case 'select':
                          case 'textarea':
                            c.autoFocus && r.focus();
                            break;
                          case 'img':
                            c.src && (r.src = c.src);
                        }
                      }
                      break;
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break;
                    case 13:
                      if (null === t.memoizedState) {
                        var u = t.alternate;
                        if (null !== u) {
                          var d = u.memoizedState;
                          if (null !== d) {
                            var m = d.dehydrated;
                            null !== m && Wt(m);
                          }
                        }
                      }
                      break;
                    default:
                      throw Error(s(163));
                  }
                Ki || (512 & t.flags && al(t));
              } catch (f) {
                Nc(t, t.return, f);
              }
            }
            if (t === e) {
              Ji = null;
              break;
            }
            if (null !== (r = t.sibling)) {
              ((r.return = t.return), (Ji = r));
              break;
            }
            Ji = t.return;
          }
        }
        function wl(e) {
          for (; null !== Ji; ) {
            var t = Ji;
            if (t === e) {
              Ji = null;
              break;
            }
            var r = t.sibling;
            if (null !== r) {
              ((r.return = t.return), (Ji = r));
              break;
            }
            Ji = t.return;
          }
        }
        function jl(e) {
          for (; null !== Ji; ) {
            var t = Ji;
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var r = t.return;
                  try {
                    nl(4, t);
                  } catch (l) {
                    Nc(t, r, l);
                  }
                  break;
                case 1:
                  var n = t.stateNode;
                  if ('function' === typeof n.componentDidMount) {
                    var a = t.return;
                    try {
                      n.componentDidMount();
                    } catch (l) {
                      Nc(t, a, l);
                    }
                  }
                  var s = t.return;
                  try {
                    al(t);
                  } catch (l) {
                    Nc(t, s, l);
                  }
                  break;
                case 5:
                  var o = t.return;
                  try {
                    al(t);
                  } catch (l) {
                    Nc(t, o, l);
                  }
              }
            } catch (l) {
              Nc(t, t.return, l);
            }
            if (t === e) {
              Ji = null;
              break;
            }
            var i = t.sibling;
            if (null !== i) {
              ((i.return = t.return), (Ji = i));
              break;
            }
            Ji = t.return;
          }
        }
        var kl,
          Nl = Math.ceil,
          Sl = b.ReactCurrentDispatcher,
          El = b.ReactCurrentOwner,
          Cl = b.ReactCurrentBatchConfig,
          Pl = 0,
          _l = null,
          Ol = null,
          Rl = 0,
          Tl = 0,
          Ll = Na(0),
          Al = 0,
          zl = null,
          Fl = 0,
          Ml = 0,
          Il = 0,
          Dl = null,
          Ul = null,
          Bl = 0,
          Wl = 1 / 0,
          $l = null,
          Hl = !1,
          ql = null,
          Vl = null,
          Gl = !1,
          Ql = null,
          Yl = 0,
          Kl = 0,
          Zl = null,
          Jl = -1,
          Xl = 0;
        function ec() {
          return 0 !== (6 & Pl) ? Ze() : -1 !== Jl ? Jl : (Jl = Ze());
        }
        function tc(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & Pl) && 0 !== Rl
              ? Rl & -Rl
              : null !== hs.transition
                ? (0 === Xl && (Xl = ht()), Xl)
                : 0 !== (e = vt)
                  ? e
                  : (e = void 0 === (e = window.event) ? 16 : Kt(e.type));
        }
        function rc(e, t, r, n) {
          if (50 < Kl) throw ((Kl = 0), (Zl = null), Error(s(185)));
          (xt(e, r, n),
            (0 !== (2 & Pl) && e === _l) ||
              (e === _l && (0 === (2 & Pl) && (Ml |= r), 4 === Al && ic(e, Rl)),
              nc(e, n),
              1 === r && 0 === Pl && 0 === (1 & t.mode) && ((Wl = Ze() + 500), Da && Wa())));
        }
        function nc(e, t) {
          var r = e.callbackNode;
          !(function (e, t) {
            for (
              var r = e.suspendedLanes,
                n = e.pingedLanes,
                a = e.expirationTimes,
                s = e.pendingLanes;
              0 < s;

            ) {
              var o = 31 - ot(s),
                i = 1 << o,
                l = a[o];
              (-1 === l
                ? (0 !== (i & r) && 0 === (i & n)) || (a[o] = ft(i, t))
                : l <= t && (e.expiredLanes |= i),
                (s &= ~i));
            }
          })(e, t);
          var n = mt(e, e === _l ? Rl : 0);
          if (0 === n) (null !== r && Qe(r), (e.callbackNode = null), (e.callbackPriority = 0));
          else if (((t = n & -n), e.callbackPriority !== t)) {
            if ((null != r && Qe(r), 1 === t))
              (0 === e.tag
                ? (function (e) {
                    ((Da = !0), Ba(e));
                  })(lc.bind(null, e))
                : Ba(lc.bind(null, e)),
                oa(function () {
                  0 === (6 & Pl) && Wa();
                }),
                (r = null));
            else {
              switch (bt(n)) {
                case 1:
                  r = Xe;
                  break;
                case 4:
                  r = et;
                  break;
                case 16:
                default:
                  r = tt;
                  break;
                case 536870912:
                  r = nt;
              }
              r = _c(r, ac.bind(null, e));
            }
            ((e.callbackPriority = t), (e.callbackNode = r));
          }
        }
        function ac(e, t) {
          if (((Jl = -1), (Xl = 0), 0 !== (6 & Pl))) throw Error(s(327));
          var r = e.callbackNode;
          if (jc() && e.callbackNode !== r) return null;
          var n = mt(e, e === _l ? Rl : 0);
          if (0 === n) return null;
          if (0 !== (30 & n) || 0 !== (n & e.expiredLanes) || t) t = gc(e, n);
          else {
            t = n;
            var a = Pl;
            Pl |= 2;
            var o = pc();
            for ((_l === e && Rl === t) || (($l = null), (Wl = Ze() + 500), mc(e, t)); ; )
              try {
                yc();
                break;
              } catch (l) {
                fc(e, l);
              }
            (Es(),
              (Sl.current = o),
              (Pl = a),
              null !== Ol ? (t = 0) : ((_l = null), (Rl = 0), (t = Al)));
          }
          if (0 !== t) {
            if ((2 === t && 0 !== (a = pt(e)) && ((n = a), (t = sc(e, a))), 1 === t))
              throw ((r = zl), mc(e, 0), ic(e, n), nc(e, Ze()), r);
            if (6 === t) ic(e, n);
            else {
              if (
                ((a = e.current.alternate),
                0 === (30 & n) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var r = t.updateQueue;
                        if (null !== r && null !== (r = r.stores))
                          for (var n = 0; n < r.length; n++) {
                            var a = r[n],
                              s = a.getSnapshot;
                            a = a.value;
                            try {
                              if (!on(s(), a)) return !1;
                            } catch (i) {
                              return !1;
                            }
                          }
                      }
                      if (((r = t.child), 16384 & t.subtreeFlags && null !== r))
                        ((r.return = t), (t = r));
                      else {
                        if (t === e) break;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0;
                          t = t.return;
                        }
                        ((t.sibling.return = t.return), (t = t.sibling));
                      }
                    }
                    return !0;
                  })(a) &&
                  (2 === (t = gc(e, n)) && 0 !== (o = pt(e)) && ((n = o), (t = sc(e, o))), 1 === t))
              )
                throw ((r = zl), mc(e, 0), ic(e, n), nc(e, Ze()), r);
              switch (((e.finishedWork = a), (e.finishedLanes = n), t)) {
                case 0:
                case 1:
                  throw Error(s(345));
                case 2:
                case 5:
                  wc(e, Ul, $l);
                  break;
                case 3:
                  if ((ic(e, n), (130023424 & n) === n && 10 < (t = Bl + 500 - Ze()))) {
                    if (0 !== mt(e, 0)) break;
                    if (((a = e.suspendedLanes) & n) !== n) {
                      (ec(), (e.pingedLanes |= e.suspendedLanes & a));
                      break;
                    }
                    e.timeoutHandle = na(wc.bind(null, e, Ul, $l), t);
                    break;
                  }
                  wc(e, Ul, $l);
                  break;
                case 4:
                  if ((ic(e, n), (4194240 & n) === n)) break;
                  for (t = e.eventTimes, a = -1; 0 < n; ) {
                    var i = 31 - ot(n);
                    ((o = 1 << i), (i = t[i]) > a && (a = i), (n &= ~o));
                  }
                  if (
                    ((n = a),
                    10 <
                      (n =
                        (120 > (n = Ze() - n)
                          ? 120
                          : 480 > n
                            ? 480
                            : 1080 > n
                              ? 1080
                              : 1920 > n
                                ? 1920
                                : 3e3 > n
                                  ? 3e3
                                  : 4320 > n
                                    ? 4320
                                    : 1960 * Nl(n / 1960)) - n))
                  ) {
                    e.timeoutHandle = na(wc.bind(null, e, Ul, $l), n);
                    break;
                  }
                  wc(e, Ul, $l);
                  break;
                default:
                  throw Error(s(329));
              }
            }
          }
          return (nc(e, Ze()), e.callbackNode === r ? ac.bind(null, e) : null);
        }
        function sc(e, t) {
          var r = Dl;
          return (
            e.current.memoizedState.isDehydrated && (mc(e, t).flags |= 256),
            2 !== (e = gc(e, t)) && ((t = Ul), (Ul = r), null !== t && oc(t)),
            e
          );
        }
        function oc(e) {
          null === Ul ? (Ul = e) : Ul.push.apply(Ul, e);
        }
        function ic(e, t) {
          for (
            t &= ~Il, t &= ~Ml, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
            0 < t;

          ) {
            var r = 31 - ot(t),
              n = 1 << r;
            ((e[r] = -1), (t &= ~n));
          }
        }
        function lc(e) {
          if (0 !== (6 & Pl)) throw Error(s(327));
          jc();
          var t = mt(e, 0);
          if (0 === (1 & t)) return (nc(e, Ze()), null);
          var r = gc(e, t);
          if (0 !== e.tag && 2 === r) {
            var n = pt(e);
            0 !== n && ((t = n), (r = sc(e, n)));
          }
          if (1 === r) throw ((r = zl), mc(e, 0), ic(e, t), nc(e, Ze()), r);
          if (6 === r) throw Error(s(345));
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            wc(e, Ul, $l),
            nc(e, Ze()),
            null
          );
        }
        function cc(e, t) {
          var r = Pl;
          Pl |= 1;
          try {
            return e(t);
          } finally {
            0 === (Pl = r) && ((Wl = Ze() + 500), Da && Wa());
          }
        }
        function uc(e) {
          null !== Ql && 0 === Ql.tag && 0 === (6 & Pl) && jc();
          var t = Pl;
          Pl |= 1;
          var r = Cl.transition,
            n = vt;
          try {
            if (((Cl.transition = null), (vt = 1), e)) return e();
          } finally {
            ((vt = n), (Cl.transition = r), 0 === (6 & (Pl = t)) && Wa());
          }
        }
        function dc() {
          ((Tl = Ll.current), Sa(Ll));
        }
        function mc(e, t) {
          ((e.finishedWork = null), (e.finishedLanes = 0));
          var r = e.timeoutHandle;
          if ((-1 !== r && ((e.timeoutHandle = -1), aa(r)), null !== Ol))
            for (r = Ol.return; null !== r; ) {
              var n = r;
              switch ((ts(n), n.tag)) {
                case 1:
                  null !== (n = n.type.childContextTypes) && void 0 !== n && La();
                  break;
                case 3:
                  (Ks(), Sa(_a), Sa(Pa), ro());
                  break;
                case 5:
                  Js(n);
                  break;
                case 4:
                  Ks();
                  break;
                case 13:
                case 19:
                  Sa(Xs);
                  break;
                case 10:
                  Cs(n.type._context);
                  break;
                case 22:
                case 23:
                  dc();
              }
              r = r.return;
            }
          if (
            ((_l = e),
            (Ol = e = Lc(e.current, null)),
            (Rl = Tl = t),
            (Al = 0),
            (zl = null),
            (Il = Ml = Fl = 0),
            (Ul = Dl = null),
            null !== Rs)
          ) {
            for (t = 0; t < Rs.length; t++)
              if (null !== (n = (r = Rs[t]).interleaved)) {
                r.interleaved = null;
                var a = n.next,
                  s = r.pending;
                if (null !== s) {
                  var o = s.next;
                  ((s.next = a), (n.next = o));
                }
                r.pending = n;
              }
            Rs = null;
          }
          return e;
        }
        function fc(e, t) {
          for (;;) {
            var r = Ol;
            try {
              if ((Es(), (no.current = Jo), co)) {
                for (var n = oo.memoizedState; null !== n; ) {
                  var a = n.queue;
                  (null !== a && (a.pending = null), (n = n.next));
                }
                co = !1;
              }
              if (
                ((so = 0),
                (lo = io = oo = null),
                (uo = !1),
                (mo = 0),
                (El.current = null),
                null === r || null === r.return)
              ) {
                ((Al = 1), (zl = t), (Ol = null));
                break;
              }
              e: {
                var o = e,
                  i = r.return,
                  l = r,
                  c = t;
                if (
                  ((t = Rl),
                  (l.flags |= 32768),
                  null !== c && 'object' === typeof c && 'function' === typeof c.then)
                ) {
                  var u = c,
                    d = l,
                    m = d.tag;
                  if (0 === (1 & d.mode) && (0 === m || 11 === m || 15 === m)) {
                    var f = d.alternate;
                    f
                      ? ((d.updateQueue = f.updateQueue),
                        (d.memoizedState = f.memoizedState),
                        (d.lanes = f.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null));
                  }
                  var p = gi(i);
                  if (null !== p) {
                    ((p.flags &= -257), xi(p, i, l, 0, t), 1 & p.mode && hi(o, u, t), (c = u));
                    var h = (t = p).updateQueue;
                    if (null === h) {
                      var g = new Set();
                      (g.add(c), (t.updateQueue = g));
                    } else h.add(c);
                    break e;
                  }
                  if (0 === (1 & t)) {
                    (hi(o, u, t), hc());
                    break e;
                  }
                  c = Error(s(426));
                } else if (as && 1 & l.mode) {
                  var x = gi(i);
                  if (null !== x) {
                    (0 === (65536 & x.flags) && (x.flags |= 256), xi(x, i, l, 0, t), ps(ci(c, l)));
                    break e;
                  }
                }
                ((o = c = ci(c, l)),
                  4 !== Al && (Al = 2),
                  null === Dl ? (Dl = [o]) : Dl.push(o),
                  (o = i));
                do {
                  switch (o.tag) {
                    case 3:
                      ((o.flags |= 65536), (t &= -t), (o.lanes |= t), Bs(o, fi(0, c, t)));
                      break e;
                    case 1:
                      l = c;
                      var y = o.type,
                        v = o.stateNode;
                      if (
                        0 === (128 & o.flags) &&
                        ('function' === typeof y.getDerivedStateFromError ||
                          (null !== v &&
                            'function' === typeof v.componentDidCatch &&
                            (null === Vl || !Vl.has(v))))
                      ) {
                        ((o.flags |= 65536), (t &= -t), (o.lanes |= t), Bs(o, pi(o, l, t)));
                        break e;
                      }
                  }
                  o = o.return;
                } while (null !== o);
              }
              bc(r);
            } catch (b) {
              ((t = b), Ol === r && null !== r && (Ol = r = r.return));
              continue;
            }
            break;
          }
        }
        function pc() {
          var e = Sl.current;
          return ((Sl.current = Jo), null === e ? Jo : e);
        }
        function hc() {
          ((0 !== Al && 3 !== Al && 2 !== Al) || (Al = 4),
            null === _l || (0 === (268435455 & Fl) && 0 === (268435455 & Ml)) || ic(_l, Rl));
        }
        function gc(e, t) {
          var r = Pl;
          Pl |= 2;
          var n = pc();
          for ((_l === e && Rl === t) || (($l = null), mc(e, t)); ; )
            try {
              xc();
              break;
            } catch (a) {
              fc(e, a);
            }
          if ((Es(), (Pl = r), (Sl.current = n), null !== Ol)) throw Error(s(261));
          return ((_l = null), (Rl = 0), Al);
        }
        function xc() {
          for (; null !== Ol; ) vc(Ol);
        }
        function yc() {
          for (; null !== Ol && !Ye(); ) vc(Ol);
        }
        function vc(e) {
          var t = kl(e.alternate, e, Tl);
          ((e.memoizedProps = e.pendingProps), null === t ? bc(e) : (Ol = t), (El.current = null));
        }
        function bc(e) {
          var t = e;
          do {
            var r = t.alternate;
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (r = Gi(r, t, Tl))) return void (Ol = r);
            } else {
              if (null !== (r = Qi(r, t))) return ((r.flags &= 32767), void (Ol = r));
              if (null === e) return ((Al = 6), void (Ol = null));
              ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
            }
            if (null !== (t = t.sibling)) return void (Ol = t);
            Ol = t = e;
          } while (null !== t);
          0 === Al && (Al = 5);
        }
        function wc(e, t, r) {
          var n = vt,
            a = Cl.transition;
          try {
            ((Cl.transition = null),
              (vt = 1),
              (function (e, t, r, n) {
                do {
                  jc();
                } while (null !== Ql);
                if (0 !== (6 & Pl)) throw Error(s(327));
                r = e.finishedWork;
                var a = e.finishedLanes;
                if (null === r) return null;
                if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
                  throw Error(s(177));
                ((e.callbackNode = null), (e.callbackPriority = 0));
                var o = r.lanes | r.childLanes;
                if (
                  ((function (e, t) {
                    var r = e.pendingLanes & ~t;
                    ((e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements));
                    var n = e.eventTimes;
                    for (e = e.expirationTimes; 0 < r; ) {
                      var a = 31 - ot(r),
                        s = 1 << a;
                      ((t[a] = 0), (n[a] = -1), (e[a] = -1), (r &= ~s));
                    }
                  })(e, o),
                  e === _l && ((Ol = _l = null), (Rl = 0)),
                  (0 === (2064 & r.subtreeFlags) && 0 === (2064 & r.flags)) ||
                    Gl ||
                    ((Gl = !0),
                    _c(tt, function () {
                      return (jc(), null);
                    })),
                  (o = 0 !== (15990 & r.flags)),
                  0 !== (15990 & r.subtreeFlags) || o)
                ) {
                  ((o = Cl.transition), (Cl.transition = null));
                  var i = vt;
                  vt = 1;
                  var l = Pl;
                  ((Pl |= 4),
                    (El.current = null),
                    (function (e, t) {
                      if (((ea = Ht), fn((e = mn())))) {
                        if ('selectionStart' in e)
                          var r = { start: e.selectionStart, end: e.selectionEnd };
                        else
                          e: {
                            var n =
                              (r = ((r = e.ownerDocument) && r.defaultView) || window)
                                .getSelection && r.getSelection();
                            if (n && 0 !== n.rangeCount) {
                              r = n.anchorNode;
                              var a = n.anchorOffset,
                                o = n.focusNode;
                              n = n.focusOffset;
                              try {
                                (r.nodeType, o.nodeType);
                              } catch (w) {
                                r = null;
                                break e;
                              }
                              var i = 0,
                                l = -1,
                                c = -1,
                                u = 0,
                                d = 0,
                                m = e,
                                f = null;
                              t: for (;;) {
                                for (
                                  var p;
                                  m !== r || (0 !== a && 3 !== m.nodeType) || (l = i + a),
                                    m !== o || (0 !== n && 3 !== m.nodeType) || (c = i + n),
                                    3 === m.nodeType && (i += m.nodeValue.length),
                                    null !== (p = m.firstChild);

                                )
                                  ((f = m), (m = p));
                                for (;;) {
                                  if (m === e) break t;
                                  if (
                                    (f === r && ++u === a && (l = i),
                                    f === o && ++d === n && (c = i),
                                    null !== (p = m.nextSibling))
                                  )
                                    break;
                                  f = (m = f).parentNode;
                                }
                                m = p;
                              }
                              r = -1 === l || -1 === c ? null : { start: l, end: c };
                            } else r = null;
                          }
                        r = r || { start: 0, end: 0 };
                      } else r = null;
                      for (
                        ta = { focusedElem: e, selectionRange: r }, Ht = !1, Ji = t;
                        null !== Ji;

                      )
                        if (((e = (t = Ji).child), 0 !== (1028 & t.subtreeFlags) && null !== e))
                          ((e.return = t), (Ji = e));
                        else
                          for (; null !== Ji; ) {
                            t = Ji;
                            try {
                              var h = t.alternate;
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break;
                                  case 1:
                                    if (null !== h) {
                                      var g = h.memoizedProps,
                                        x = h.memoizedState,
                                        y = t.stateNode,
                                        v = y.getSnapshotBeforeUpdate(
                                          t.elementType === t.type ? g : ri(t.type, g),
                                          x
                                        );
                                      y.__reactInternalSnapshotBeforeUpdate = v;
                                    }
                                    break;
                                  case 3:
                                    var b = t.stateNode.containerInfo;
                                    1 === b.nodeType
                                      ? (b.textContent = '')
                                      : 9 === b.nodeType &&
                                        b.documentElement &&
                                        b.removeChild(b.documentElement);
                                    break;
                                  default:
                                    throw Error(s(163));
                                }
                            } catch (w) {
                              Nc(t, t.return, w);
                            }
                            if (null !== (e = t.sibling)) {
                              ((e.return = t.return), (Ji = e));
                              break;
                            }
                            Ji = t.return;
                          }
                      ((h = tl), (tl = !1));
                    })(e, r),
                    gl(r, e),
                    pn(ta),
                    (Ht = !!ea),
                    (ta = ea = null),
                    (e.current = r),
                    yl(r, e, a),
                    Ke(),
                    (Pl = l),
                    (vt = i),
                    (Cl.transition = o));
                } else e.current = r;
                if (
                  (Gl && ((Gl = !1), (Ql = e), (Yl = a)),
                  (o = e.pendingLanes),
                  0 === o && (Vl = null),
                  (function (e) {
                    if (st && 'function' === typeof st.onCommitFiberRoot)
                      try {
                        st.onCommitFiberRoot(at, e, void 0, 128 === (128 & e.current.flags));
                      } catch (t) {}
                  })(r.stateNode),
                  nc(e, Ze()),
                  null !== t)
                )
                  for (n = e.onRecoverableError, r = 0; r < t.length; r++)
                    ((a = t[r]), n(a.value, { componentStack: a.stack, digest: a.digest }));
                if (Hl) throw ((Hl = !1), (e = ql), (ql = null), e);
                (0 !== (1 & Yl) && 0 !== e.tag && jc(),
                  (o = e.pendingLanes),
                  0 !== (1 & o) ? (e === Zl ? Kl++ : ((Kl = 0), (Zl = e))) : (Kl = 0),
                  Wa());
              })(e, t, r, n));
          } finally {
            ((Cl.transition = a), (vt = n));
          }
          return null;
        }
        function jc() {
          if (null !== Ql) {
            var e = bt(Yl),
              t = Cl.transition,
              r = vt;
            try {
              if (((Cl.transition = null), (vt = 16 > e ? 16 : e), null === Ql)) var n = !1;
              else {
                if (((e = Ql), (Ql = null), (Yl = 0), 0 !== (6 & Pl))) throw Error(s(331));
                var a = Pl;
                for (Pl |= 4, Ji = e.current; null !== Ji; ) {
                  var o = Ji,
                    i = o.child;
                  if (0 !== (16 & Ji.flags)) {
                    var l = o.deletions;
                    if (null !== l) {
                      for (var c = 0; c < l.length; c++) {
                        var u = l[c];
                        for (Ji = u; null !== Ji; ) {
                          var d = Ji;
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              rl(8, d, o);
                          }
                          var m = d.child;
                          if (null !== m) ((m.return = d), (Ji = m));
                          else
                            for (; null !== Ji; ) {
                              var f = (d = Ji).sibling,
                                p = d.return;
                              if ((sl(d), d === u)) {
                                Ji = null;
                                break;
                              }
                              if (null !== f) {
                                ((f.return = p), (Ji = f));
                                break;
                              }
                              Ji = p;
                            }
                        }
                      }
                      var h = o.alternate;
                      if (null !== h) {
                        var g = h.child;
                        if (null !== g) {
                          h.child = null;
                          do {
                            var x = g.sibling;
                            ((g.sibling = null), (g = x));
                          } while (null !== g);
                        }
                      }
                      Ji = o;
                    }
                  }
                  if (0 !== (2064 & o.subtreeFlags) && null !== i) ((i.return = o), (Ji = i));
                  else
                    e: for (; null !== Ji; ) {
                      if (0 !== (2048 & (o = Ji).flags))
                        switch (o.tag) {
                          case 0:
                          case 11:
                          case 15:
                            rl(9, o, o.return);
                        }
                      var y = o.sibling;
                      if (null !== y) {
                        ((y.return = o.return), (Ji = y));
                        break e;
                      }
                      Ji = o.return;
                    }
                }
                var v = e.current;
                for (Ji = v; null !== Ji; ) {
                  var b = (i = Ji).child;
                  if (0 !== (2064 & i.subtreeFlags) && null !== b) ((b.return = i), (Ji = b));
                  else
                    e: for (i = v; null !== Ji; ) {
                      if (0 !== (2048 & (l = Ji).flags))
                        try {
                          switch (l.tag) {
                            case 0:
                            case 11:
                            case 15:
                              nl(9, l);
                          }
                        } catch (j) {
                          Nc(l, l.return, j);
                        }
                      if (l === i) {
                        Ji = null;
                        break e;
                      }
                      var w = l.sibling;
                      if (null !== w) {
                        ((w.return = l.return), (Ji = w));
                        break e;
                      }
                      Ji = l.return;
                    }
                }
                if (((Pl = a), Wa(), st && 'function' === typeof st.onPostCommitFiberRoot))
                  try {
                    st.onPostCommitFiberRoot(at, e);
                  } catch (j) {}
                n = !0;
              }
              return n;
            } finally {
              ((vt = r), (Cl.transition = t));
            }
          }
          return !1;
        }
        function kc(e, t, r) {
          ((e = Ds(e, (t = fi(0, (t = ci(r, t)), 1)), 1)),
            (t = ec()),
            null !== e && (xt(e, 1, t), nc(e, t)));
        }
        function Nc(e, t, r) {
          if (3 === e.tag) kc(e, e, r);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                kc(t, e, r);
                break;
              }
              if (1 === t.tag) {
                var n = t.stateNode;
                if (
                  'function' === typeof t.type.getDerivedStateFromError ||
                  ('function' === typeof n.componentDidCatch && (null === Vl || !Vl.has(n)))
                ) {
                  ((t = Ds(t, (e = pi(t, (e = ci(r, e)), 1)), 1)),
                    (e = ec()),
                    null !== t && (xt(t, 1, e), nc(t, e)));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Sc(e, t, r) {
          var n = e.pingCache;
          (null !== n && n.delete(t),
            (t = ec()),
            (e.pingedLanes |= e.suspendedLanes & r),
            _l === e &&
              (Rl & r) === r &&
              (4 === Al || (3 === Al && (130023424 & Rl) === Rl && 500 > Ze() - Bl)
                ? mc(e, 0)
                : (Il |= r)),
            nc(e, t));
        }
        function Ec(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = ut), 0 === (130023424 & (ut <<= 1)) && (ut = 4194304)));
          var r = ec();
          null !== (e = As(e, t)) && (xt(e, t, r), nc(e, r));
        }
        function Cc(e) {
          var t = e.memoizedState,
            r = 0;
          (null !== t && (r = t.retryLane), Ec(e, r));
        }
        function Pc(e, t) {
          var r = 0;
          switch (e.tag) {
            case 13:
              var n = e.stateNode,
                a = e.memoizedState;
              null !== a && (r = a.retryLane);
              break;
            case 19:
              n = e.stateNode;
              break;
            default:
              throw Error(s(314));
          }
          (null !== n && n.delete(t), Ec(e, r));
        }
        function _c(e, t) {
          return Ge(e, t);
        }
        function Oc(e, t, r, n) {
          ((this.tag = e),
            (this.key = r),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
            (this.mode = n),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null));
        }
        function Rc(e, t, r, n) {
          return new Oc(e, t, r, n);
        }
        function Tc(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function Lc(e, t) {
          var r = e.alternate;
          return (
            null === r
              ? (((r = Rc(e.tag, t, e.key, e.mode)).elementType = e.elementType),
                (r.type = e.type),
                (r.stateNode = e.stateNode),
                (r.alternate = e),
                (e.alternate = r))
              : ((r.pendingProps = t),
                (r.type = e.type),
                (r.flags = 0),
                (r.subtreeFlags = 0),
                (r.deletions = null)),
            (r.flags = 14680064 & e.flags),
            (r.childLanes = e.childLanes),
            (r.lanes = e.lanes),
            (r.child = e.child),
            (r.memoizedProps = e.memoizedProps),
            (r.memoizedState = e.memoizedState),
            (r.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (r.dependencies = null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
            (r.sibling = e.sibling),
            (r.index = e.index),
            (r.ref = e.ref),
            r
          );
        }
        function Ac(e, t, r, n, a, o) {
          var i = 2;
          if (((n = e), 'function' === typeof e)) Tc(e) && (i = 1);
          else if ('string' === typeof e) i = 5;
          else
            e: switch (e) {
              case k:
                return zc(r.children, a, o, t);
              case N:
                ((i = 8), (a |= 8));
                break;
              case S:
                return (((e = Rc(12, r, t, 2 | a)).elementType = S), (e.lanes = o), e);
              case _:
                return (((e = Rc(13, r, t, a)).elementType = _), (e.lanes = o), e);
              case O:
                return (((e = Rc(19, r, t, a)).elementType = O), (e.lanes = o), e);
              case L:
                return Fc(r, a, o, t);
              default:
                if ('object' === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case E:
                      i = 10;
                      break e;
                    case C:
                      i = 9;
                      break e;
                    case P:
                      i = 11;
                      break e;
                    case R:
                      i = 14;
                      break e;
                    case T:
                      ((i = 16), (n = null));
                      break e;
                  }
                throw Error(s(130, null == e ? e : typeof e, ''));
            }
          return (((t = Rc(i, r, t, a)).elementType = e), (t.type = n), (t.lanes = o), t);
        }
        function zc(e, t, r, n) {
          return (((e = Rc(7, e, n, t)).lanes = r), e);
        }
        function Fc(e, t, r, n) {
          return (
            ((e = Rc(22, e, n, t)).elementType = L),
            (e.lanes = r),
            (e.stateNode = { isHidden: !1 }),
            e
          );
        }
        function Mc(e, t, r) {
          return (((e = Rc(6, e, null, t)).lanes = r), e);
        }
        function Ic(e, t, r) {
          return (
            ((t = Rc(4, null !== e.children ? e.children : [], e.key, t)).lanes = r),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        function Dc(e, t, r, n, a) {
          ((this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = gt(0)),
            (this.expirationTimes = gt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = gt(0)),
            (this.identifierPrefix = n),
            (this.onRecoverableError = a),
            (this.mutableSourceEagerHydrationData = null));
        }
        function Uc(e, t, r, n, a, s, o, i, l) {
          return (
            (e = new Dc(e, t, r, i, l)),
            1 === t ? ((t = 1), !0 === s && (t |= 8)) : (t = 0),
            (s = Rc(3, null, null, t)),
            (e.current = s),
            (s.stateNode = e),
            (s.memoizedState = {
              element: n,
              isDehydrated: r,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Fs(s),
            e
          );
        }
        function Bc(e) {
          if (!e) return Ca;
          e: {
            if (We((e = e._reactInternals)) !== e || 1 !== e.tag) throw Error(s(170));
            var t = e;
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context;
                  break e;
                case 1:
                  if (Ta(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e;
                  }
              }
              t = t.return;
            } while (null !== t);
            throw Error(s(171));
          }
          if (1 === e.tag) {
            var r = e.type;
            if (Ta(r)) return za(e, r, t);
          }
          return t;
        }
        function Wc(e, t, r, n, a, s, o, i, l) {
          return (
            ((e = Uc(r, n, !0, e, 0, s, 0, i, l)).context = Bc(null)),
            (r = e.current),
            ((s = Is((n = ec()), (a = tc(r)))).callback = void 0 !== t && null !== t ? t : null),
            Ds(r, s, a),
            (e.current.lanes = a),
            xt(e, a, n),
            nc(e, n),
            e
          );
        }
        function $c(e, t, r, n) {
          var a = t.current,
            s = ec(),
            o = tc(a);
          return (
            (r = Bc(r)),
            null === t.context ? (t.context = r) : (t.pendingContext = r),
            ((t = Is(s, o)).payload = { element: e }),
            null !== (n = void 0 === n ? null : n) && (t.callback = n),
            null !== (e = Ds(a, t, o)) && (rc(e, a, o, s), Us(e, a, o)),
            o
          );
        }
        function Hc(e) {
          return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
        }
        function qc(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var r = e.retryLane;
            e.retryLane = 0 !== r && r < t ? r : t;
          }
        }
        function Vc(e, t) {
          (qc(e, t), (e = e.alternate) && qc(e, t));
        }
        kl = function (e, t, r) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || _a.current) vi = !0;
            else {
              if (0 === (e.lanes & r) && 0 === (128 & t.flags))
                return (
                  (vi = !1),
                  (function (e, t, r) {
                    switch (t.tag) {
                      case 3:
                        (_i(t), fs());
                        break;
                      case 5:
                        Zs(t);
                        break;
                      case 1:
                        Ta(t.type) && Fa(t);
                        break;
                      case 4:
                        Ys(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        var n = t.type._context,
                          a = t.memoizedProps.value;
                        (Ea(js, n._currentValue), (n._currentValue = a));
                        break;
                      case 13:
                        if (null !== (n = t.memoizedState))
                          return null !== n.dehydrated
                            ? (Ea(Xs, 1 & Xs.current), (t.flags |= 128), null)
                            : 0 !== (r & t.child.childLanes)
                              ? Mi(e, t, r)
                              : (Ea(Xs, 1 & Xs.current),
                                null !== (e = Hi(e, t, r)) ? e.sibling : null);
                        Ea(Xs, 1 & Xs.current);
                        break;
                      case 19:
                        if (((n = 0 !== (r & t.childLanes)), 0 !== (128 & e.flags))) {
                          if (n) return Wi(e, t, r);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (a = t.memoizedState) &&
                            ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
                          Ea(Xs, Xs.current),
                          n)
                        )
                          break;
                        return null;
                      case 22:
                      case 23:
                        return ((t.lanes = 0), Ni(e, t, r));
                    }
                    return Hi(e, t, r);
                  })(e, t, r)
                );
              vi = 0 !== (131072 & e.flags);
            }
          else ((vi = !1), as && 0 !== (1048576 & t.flags) && Xa(t, Va, t.index));
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var n = t.type;
              ($i(e, t), (e = t.pendingProps));
              var a = Ra(t, Pa.current);
              (_s(t, r), (a = go(null, t, n, e, a, r)));
              var o = xo();
              return (
                (t.flags |= 1),
                'object' === typeof a &&
                null !== a &&
                'function' === typeof a.render &&
                void 0 === a.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    Ta(n) ? ((o = !0), Fa(t)) : (o = !1),
                    (t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null),
                    Fs(t),
                    (a.updater = ai),
                    (t.stateNode = a),
                    (a._reactInternals = t),
                    li(t, n, e, r),
                    (t = Pi(null, t, n, !0, o, r)))
                  : ((t.tag = 0), as && o && es(t), bi(null, t, a, r), (t = t.child)),
                t
              );
            case 16:
              n = t.elementType;
              e: {
                switch (
                  ($i(e, t),
                  (e = t.pendingProps),
                  (n = (a = n._init)(n._payload)),
                  (t.type = n),
                  (a = t.tag =
                    (function (e) {
                      if ('function' === typeof e) return Tc(e) ? 1 : 0;
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === P) return 11;
                        if (e === R) return 14;
                      }
                      return 2;
                    })(n)),
                  (e = ri(n, e)),
                  a)
                ) {
                  case 0:
                    t = Ei(null, t, n, e, r);
                    break e;
                  case 1:
                    t = Ci(null, t, n, e, r);
                    break e;
                  case 11:
                    t = wi(null, t, n, e, r);
                    break e;
                  case 14:
                    t = ji(null, t, n, ri(n.type, e), r);
                    break e;
                }
                throw Error(s(306, n, ''));
              }
              return t;
            case 0:
              return (
                (n = t.type),
                (a = t.pendingProps),
                Ei(e, t, n, (a = t.elementType === n ? a : ri(n, a)), r)
              );
            case 1:
              return (
                (n = t.type),
                (a = t.pendingProps),
                Ci(e, t, n, (a = t.elementType === n ? a : ri(n, a)), r)
              );
            case 3:
              e: {
                if ((_i(t), null === e)) throw Error(s(387));
                ((n = t.pendingProps),
                  (a = (o = t.memoizedState).element),
                  Ms(e, t),
                  Ws(t, n, null, r));
                var i = t.memoizedState;
                if (((n = i.element), o.isDehydrated)) {
                  if (
                    ((o = {
                      element: n,
                      isDehydrated: !1,
                      cache: i.cache,
                      pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                      transitions: i.transitions,
                    }),
                    (t.updateQueue.baseState = o),
                    (t.memoizedState = o),
                    256 & t.flags)
                  ) {
                    t = Oi(e, t, n, r, (a = ci(Error(s(423)), t)));
                    break e;
                  }
                  if (n !== a) {
                    t = Oi(e, t, n, r, (a = ci(Error(s(424)), t)));
                    break e;
                  }
                  for (
                    ns = ca(t.stateNode.containerInfo.firstChild),
                      rs = t,
                      as = !0,
                      ss = null,
                      r = ws(t, null, n, r),
                      t.child = r;
                    r;

                  )
                    ((r.flags = (-3 & r.flags) | 4096), (r = r.sibling));
                } else {
                  if ((fs(), n === a)) {
                    t = Hi(e, t, r);
                    break e;
                  }
                  bi(e, t, n, r);
                }
                t = t.child;
              }
              return t;
            case 5:
              return (
                Zs(t),
                null === e && cs(t),
                (n = t.type),
                (a = t.pendingProps),
                (o = null !== e ? e.memoizedProps : null),
                (i = a.children),
                ra(n, a) ? (i = null) : null !== o && ra(n, o) && (t.flags |= 32),
                Si(e, t),
                bi(e, t, i, r),
                t.child
              );
            case 6:
              return (null === e && cs(t), null);
            case 13:
              return Mi(e, t, r);
            case 4:
              return (
                Ys(t, t.stateNode.containerInfo),
                (n = t.pendingProps),
                null === e ? (t.child = bs(t, null, n, r)) : bi(e, t, n, r),
                t.child
              );
            case 11:
              return (
                (n = t.type),
                (a = t.pendingProps),
                wi(e, t, n, (a = t.elementType === n ? a : ri(n, a)), r)
              );
            case 7:
              return (bi(e, t, t.pendingProps, r), t.child);
            case 8:
            case 12:
              return (bi(e, t, t.pendingProps.children, r), t.child);
            case 10:
              e: {
                if (
                  ((n = t.type._context),
                  (a = t.pendingProps),
                  (o = t.memoizedProps),
                  (i = a.value),
                  Ea(js, n._currentValue),
                  (n._currentValue = i),
                  null !== o)
                )
                  if (on(o.value, i)) {
                    if (o.children === a.children && !_a.current) {
                      t = Hi(e, t, r);
                      break e;
                    }
                  } else
                    for (null !== (o = t.child) && (o.return = t); null !== o; ) {
                      var l = o.dependencies;
                      if (null !== l) {
                        i = o.child;
                        for (var c = l.firstContext; null !== c; ) {
                          if (c.context === n) {
                            if (1 === o.tag) {
                              (c = Is(-1, r & -r)).tag = 2;
                              var u = o.updateQueue;
                              if (null !== u) {
                                var d = (u = u.shared).pending;
                                (null === d ? (c.next = c) : ((c.next = d.next), (d.next = c)),
                                  (u.pending = c));
                              }
                            }
                            ((o.lanes |= r),
                              null !== (c = o.alternate) && (c.lanes |= r),
                              Ps(o.return, r, t),
                              (l.lanes |= r));
                            break;
                          }
                          c = c.next;
                        }
                      } else if (10 === o.tag) i = o.type === t.type ? null : o.child;
                      else if (18 === o.tag) {
                        if (null === (i = o.return)) throw Error(s(341));
                        ((i.lanes |= r),
                          null !== (l = i.alternate) && (l.lanes |= r),
                          Ps(i, r, t),
                          (i = o.sibling));
                      } else i = o.child;
                      if (null !== i) i.return = o;
                      else
                        for (i = o; null !== i; ) {
                          if (i === t) {
                            i = null;
                            break;
                          }
                          if (null !== (o = i.sibling)) {
                            ((o.return = i.return), (i = o));
                            break;
                          }
                          i = i.return;
                        }
                      o = i;
                    }
                (bi(e, t, a.children, r), (t = t.child));
              }
              return t;
            case 9:
              return (
                (a = t.type),
                (n = t.pendingProps.children),
                _s(t, r),
                (n = n((a = Os(a)))),
                (t.flags |= 1),
                bi(e, t, n, r),
                t.child
              );
            case 14:
              return ((a = ri((n = t.type), t.pendingProps)), ji(e, t, n, (a = ri(n.type, a)), r));
            case 15:
              return ki(e, t, t.type, t.pendingProps, r);
            case 17:
              return (
                (n = t.type),
                (a = t.pendingProps),
                (a = t.elementType === n ? a : ri(n, a)),
                $i(e, t),
                (t.tag = 1),
                Ta(n) ? ((e = !0), Fa(t)) : (e = !1),
                _s(t, r),
                oi(t, n, a),
                li(t, n, a, r),
                Pi(null, t, n, !0, e, r)
              );
            case 19:
              return Wi(e, t, r);
            case 22:
              return Ni(e, t, r);
          }
          throw Error(s(156, t.tag));
        };
        var Gc =
          'function' === typeof reportError
            ? reportError
            : function (e) {
                console.error(e);
              };
        function Qc(e) {
          this._internalRoot = e;
        }
        function Yc(e) {
          this._internalRoot = e;
        }
        function Kc(e) {
          return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
        }
        function Zc(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType || ' react-mount-point-unstable ' !== e.nodeValue))
          );
        }
        function Jc() {}
        function Xc(e, t, r, n, a) {
          var s = r._reactRootContainer;
          if (s) {
            var o = s;
            if ('function' === typeof a) {
              var i = a;
              a = function () {
                var e = Hc(o);
                i.call(e);
              };
            }
            $c(t, o, e, a);
          } else
            o = (function (e, t, r, n, a) {
              if (a) {
                if ('function' === typeof n) {
                  var s = n;
                  n = function () {
                    var e = Hc(o);
                    s.call(e);
                  };
                }
                var o = Wc(t, n, e, 0, null, !1, 0, '', Jc);
                return (
                  (e._reactRootContainer = o),
                  (e[pa] = o.current),
                  Wn(8 === e.nodeType ? e.parentNode : e),
                  uc(),
                  o
                );
              }
              for (; (a = e.lastChild); ) e.removeChild(a);
              if ('function' === typeof n) {
                var i = n;
                n = function () {
                  var e = Hc(l);
                  i.call(e);
                };
              }
              var l = Uc(e, 0, !1, null, 0, !1, 0, '', Jc);
              return (
                (e._reactRootContainer = l),
                (e[pa] = l.current),
                Wn(8 === e.nodeType ? e.parentNode : e),
                uc(function () {
                  $c(t, l, r, n);
                }),
                l
              );
            })(r, t, e, a, n);
          return Hc(o);
        }
        ((Yc.prototype.render = Qc.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(s(409));
            $c(e, t, null, null);
          }),
          (Yc.prototype.unmount = Qc.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                (uc(function () {
                  $c(null, e, null, null);
                }),
                  (t[pa] = null));
              }
            }),
          (Yc.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = Nt();
              e = { blockedOn: null, target: e, priority: t };
              for (var r = 0; r < Lt.length && 0 !== t && t < Lt[r].priority; r++);
              (Lt.splice(r, 0, e), 0 === r && Mt(e));
            }
          }),
          (wt = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                  var r = dt(t.pendingLanes);
                  0 !== r &&
                    (yt(t, 1 | r), nc(t, Ze()), 0 === (6 & Pl) && ((Wl = Ze() + 500), Wa()));
                }
                break;
              case 13:
                (uc(function () {
                  var t = As(e, 1);
                  if (null !== t) {
                    var r = ec();
                    rc(t, e, 1, r);
                  }
                }),
                  Vc(e, 1));
            }
          }),
          (jt = function (e) {
            if (13 === e.tag) {
              var t = As(e, 134217728);
              if (null !== t) rc(t, e, 134217728, ec());
              Vc(e, 134217728);
            }
          }),
          (kt = function (e) {
            if (13 === e.tag) {
              var t = tc(e),
                r = As(e, t);
              if (null !== r) rc(r, e, t, ec());
              Vc(e, t);
            }
          }),
          (Nt = function () {
            return vt;
          }),
          (St = function (e, t) {
            var r = vt;
            try {
              return ((vt = e), t());
            } finally {
              vt = r;
            }
          }),
          (je = function (e, t, r) {
            switch (t) {
              case 'input':
                if ((J(e, r), (t = r.name), 'radio' === r.type && null != t)) {
                  for (r = e; r.parentNode; ) r = r.parentNode;
                  for (
                    r = r.querySelectorAll(
                      'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < r.length;
                    t++
                  ) {
                    var n = r[t];
                    if (n !== e && n.form === e.form) {
                      var a = wa(n);
                      if (!a) throw Error(s(90));
                      (G(n), J(n, a));
                    }
                  }
                }
                break;
              case 'textarea':
                se(e, r);
                break;
              case 'select':
                null != (t = r.value) && re(e, !!r.multiple, t, !1);
            }
          }),
          (Pe = cc),
          (_e = uc));
        var eu = { usingClientEntryPoint: !1, Events: [va, ba, wa, Ee, Ce, cc] },
          tu = {
            findFiberByHostInstance: ya,
            bundleType: 0,
            version: '18.3.1',
            rendererPackageName: 'react-dom',
          },
          ru = {
            bundleType: tu.bundleType,
            version: tu.version,
            rendererPackageName: tu.rendererPackageName,
            rendererConfig: tu.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: b.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = qe(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance:
              tu.findFiberByHostInstance ||
              function () {
                return null;
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
          };
        if ('undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var nu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!nu.isDisabled && nu.supportsFiber)
            try {
              ((at = nu.inject(ru)), (st = nu));
            } catch (ue) {}
        }
        ((t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eu),
          (t.createPortal = function (e, t) {
            var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
            if (!Kc(t)) throw Error(s(200));
            return (function (e, t, r) {
              var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
              return {
                $$typeof: j,
                key: null == n ? null : '' + n,
                children: e,
                containerInfo: t,
                implementation: r,
              };
            })(e, t, null, r);
          }),
          (t.createRoot = function (e, t) {
            if (!Kc(e)) throw Error(s(299));
            var r = !1,
              n = '',
              a = Gc;
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (r = !0),
                void 0 !== t.identifierPrefix && (n = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (a = t.onRecoverableError)),
              (t = Uc(e, 1, !1, null, 0, r, 0, n, a)),
              (e[pa] = t.current),
              Wn(8 === e.nodeType ? e.parentNode : e),
              new Qc(t)
            );
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternals;
            if (void 0 === t) {
              if ('function' === typeof e.render) throw Error(s(188));
              throw ((e = Object.keys(e).join(',')), Error(s(268, e)));
            }
            return (e = null === (e = qe(t)) ? null : e.stateNode);
          }),
          (t.flushSync = function (e) {
            return uc(e);
          }),
          (t.hydrate = function (e, t, r) {
            if (!Zc(t)) throw Error(s(200));
            return Xc(null, e, t, !0, r);
          }),
          (t.hydrateRoot = function (e, t, r) {
            if (!Kc(e)) throw Error(s(405));
            var n = (null != r && r.hydratedSources) || null,
              a = !1,
              o = '',
              i = Gc;
            if (
              (null !== r &&
                void 0 !== r &&
                (!0 === r.unstable_strictMode && (a = !0),
                void 0 !== r.identifierPrefix && (o = r.identifierPrefix),
                void 0 !== r.onRecoverableError && (i = r.onRecoverableError)),
              (t = Wc(t, null, e, 1, null != r ? r : null, a, 0, o, i)),
              (e[pa] = t.current),
              Wn(e),
              n)
            )
              for (e = 0; e < n.length; e++)
                ((a = (a = (r = n[e])._getVersion)(r._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [r, a])
                    : t.mutableSourceEagerHydrationData.push(r, a));
            return new Yc(t);
          }),
          (t.render = function (e, t, r) {
            if (!Zc(t)) throw Error(s(200));
            return Xc(null, e, t, !1, r);
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Zc(e)) throw Error(s(40));
            return (
              !!e._reactRootContainer &&
              (uc(function () {
                Xc(null, null, e, !1, function () {
                  ((e._reactRootContainer = null), (e[pa] = null));
                });
              }),
              !0)
            );
          }),
          (t.unstable_batchedUpdates = cc),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
            if (!Zc(r)) throw Error(s(200));
            if (null == e || void 0 === e._reactInternals) throw Error(s(38));
            return Xc(e, t, r, !1, n);
          }),
          (t.version = '18.3.1-next-f1338f8080-20240426'));
      },
      352: (e, t, r) => {
        'use strict';
        var n = r(119);
        ((t.createRoot = n.createRoot), (t.hydrateRoot = n.hydrateRoot));
      },
      414: (e, t, r) => {
        'use strict';
        e.exports = r(654);
      },
      604: function (e, t, r) {
        !(function (e, t) {
          'use strict';
          function r(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var n = Object.getOwnPropertySymbols(e);
              (t &&
                (n = n.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                r.push.apply(r, n));
            }
            return r;
          }
          function n(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? r(Object(n), !0).forEach(function (t) {
                    s(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                  : r(Object(n)).forEach(function (t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    });
            }
            return e;
          }
          function a(e) {
            return (
              (a =
                'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        'function' === typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? 'symbol'
                        : typeof e;
                    }),
              a(e)
            );
          }
          function s(e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          }
          function o(e, t) {
            if (null == e) return {};
            var r,
              n,
              a = {},
              s = Object.keys(e);
            for (n = 0; n < s.length; n++) ((r = s[n]), t.indexOf(r) >= 0 || (a[r] = e[r]));
            return a;
          }
          function i(e, t) {
            if (null == e) return {};
            var r,
              n,
              a = o(e, t);
            if (Object.getOwnPropertySymbols) {
              var s = Object.getOwnPropertySymbols(e);
              for (n = 0; n < s.length; n++)
                ((r = s[n]),
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r])));
            }
            return a;
          }
          function l(e, t) {
            return c(e) || u(e, t) || d(e, t) || f();
          }
          function c(e) {
            if (Array.isArray(e)) return e;
          }
          function u(e, t) {
            var r = e && (('undefined' !== typeof Symbol && e[Symbol.iterator]) || e['@@iterator']);
            if (null != r) {
              var n,
                a,
                s = [],
                o = !0,
                i = !1;
              try {
                for (
                  r = r.call(e);
                  !(o = (n = r.next()).done) && (s.push(n.value), !t || s.length !== t);
                  o = !0
                );
              } catch (l) {
                ((i = !0), (a = l));
              } finally {
                try {
                  o || null == r.return || r.return();
                } finally {
                  if (i) throw a;
                }
              }
              return s;
            }
          }
          function d(e, t) {
            if (e) {
              if ('string' === typeof e) return m(e, t);
              var r = Object.prototype.toString.call(e).slice(8, -1);
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(e)
                  : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? m(e, t)
                    : void 0
              );
            }
          }
          function m(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n;
          }
          function f() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          }
          function p(e) {
            return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
              ? e.default
              : e;
          }
          var h,
            g,
            x,
            y,
            v = { exports: {} };
          function b() {
            return g ? h : ((g = 1), (h = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'));
          }
          function w() {
            if (y) return x;
            y = 1;
            var e = b();
            function t() {}
            function r() {}
            return (
              (r.resetWarningCache = t),
              (x = function () {
                function n(t, r, n, a, s, o) {
                  if (o !== e) {
                    var i = new Error(
                      'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
                    );
                    throw ((i.name = 'Invariant Violation'), i);
                  }
                }
                function a() {
                  return n;
                }
                n.isRequired = n;
                var s = {
                  array: n,
                  bool: n,
                  func: n,
                  number: n,
                  object: n,
                  string: n,
                  symbol: n,
                  any: n,
                  arrayOf: a,
                  element: n,
                  elementType: n,
                  instanceOf: a,
                  node: n,
                  objectOf: a,
                  oneOf: a,
                  oneOfType: a,
                  shape: a,
                  exact: a,
                  checkPropTypes: r,
                  resetWarningCache: t,
                };
                return ((s.PropTypes = s), s);
              })
            );
          }
          v.exports = w()();
          var j = p(v.exports),
            k = function (e, r, n) {
              var a = !!n,
                s = t.useRef(n);
              (t.useEffect(
                function () {
                  s.current = n;
                },
                [n]
              ),
                t.useEffect(
                  function () {
                    if (!a || !e) return function () {};
                    var t = function () {
                      s.current && s.current.apply(s, arguments);
                    };
                    return (
                      e.on(r, t),
                      function () {
                        e.off(r, t);
                      }
                    );
                  },
                  [a, r, e, s]
                ));
            },
            N = function (e) {
              var r = t.useRef(e);
              return (
                t.useEffect(
                  function () {
                    r.current = e;
                  },
                  [e]
                ),
                r.current
              );
            },
            S = function (e) {
              return null !== e && 'object' === a(e);
            },
            E = function (e) {
              return S(e) && 'function' === typeof e.then;
            },
            C = function (e) {
              return (
                S(e) &&
                'function' === typeof e.elements &&
                'function' === typeof e.createToken &&
                'function' === typeof e.createPaymentMethod &&
                'function' === typeof e.confirmCardPayment
              );
            },
            P = '[object Object]',
            _ = function e(t, r) {
              if (!S(t) || !S(r)) return t === r;
              var n = Array.isArray(t);
              if (n !== Array.isArray(r)) return !1;
              var a = Object.prototype.toString.call(t) === P;
              if (a !== (Object.prototype.toString.call(r) === P)) return !1;
              if (!a && !n) return t === r;
              var s = Object.keys(t),
                o = Object.keys(r);
              if (s.length !== o.length) return !1;
              for (var i = {}, l = 0; l < s.length; l += 1) i[s[l]] = !0;
              for (var c = 0; c < o.length; c += 1) i[o[c]] = !0;
              var u = Object.keys(i);
              if (u.length !== s.length) return !1;
              var d = t,
                m = r,
                f = function (t) {
                  return e(d[t], m[t]);
                };
              return u.every(f);
            },
            O = function (e, t, r) {
              return S(e)
                ? Object.keys(e).reduce(function (a, o) {
                    var i = !S(t) || !_(e[o], t[o]);
                    return r.includes(o)
                      ? (i &&
                          console.warn(
                            'Unsupported prop change: options.'.concat(
                              o,
                              ' is not a mutable property.'
                            )
                          ),
                        a)
                      : i
                        ? n(n({}, a || {}), {}, s({}, o, e[o]))
                        : a;
                  }, null)
                : null;
            },
            R =
              'Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.',
            T = function (e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : R;
              if (null === e || C(e)) return e;
              throw new Error(t);
            },
            L = function (e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : R;
              if (E(e))
                return {
                  tag: 'async',
                  stripePromise: Promise.resolve(e).then(function (e) {
                    return T(e, t);
                  }),
                };
              var r = T(e, t);
              return null === r ? { tag: 'empty' } : { tag: 'sync', stripe: r };
            },
            A = function (e) {
              e &&
                e._registerWrapper &&
                e.registerAppInfo &&
                (e._registerWrapper({ name: 'react-stripe-js', version: '3.7.0' }),
                e.registerAppInfo({
                  name: 'react-stripe-js',
                  version: '3.7.0',
                  url: 'https://stripe.com/docs/stripe-js/react',
                }));
            },
            z = t.createContext(null);
          z.displayName = 'ElementsContext';
          var F = function (e, t) {
              if (!e)
                throw new Error(
                  'Could not find Elements context; You need to wrap the part of your app that '.concat(
                    t,
                    ' in an <Elements> provider.'
                  )
                );
              return e;
            },
            M = function (e) {
              var r = e.stripe,
                n = e.options,
                a = e.children,
                s = t.useMemo(
                  function () {
                    return L(r);
                  },
                  [r]
                ),
                o = l(
                  t.useState(function () {
                    return {
                      stripe: 'sync' === s.tag ? s.stripe : null,
                      elements: 'sync' === s.tag ? s.stripe.elements(n) : null,
                    };
                  }),
                  2
                ),
                i = o[0],
                c = o[1];
              t.useEffect(
                function () {
                  var e = !0,
                    t = function (e) {
                      c(function (t) {
                        return t.stripe ? t : { stripe: e, elements: e.elements(n) };
                      });
                    };
                  return (
                    'async' !== s.tag || i.stripe
                      ? 'sync' !== s.tag || i.stripe || t(s.stripe)
                      : s.stripePromise.then(function (r) {
                          r && e && t(r);
                        }),
                    function () {
                      e = !1;
                    }
                  );
                },
                [s, i, n]
              );
              var u = N(r);
              t.useEffect(
                function () {
                  null !== u &&
                    u !== r &&
                    console.warn(
                      'Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.'
                    );
                },
                [u, r]
              );
              var d = N(n);
              return (
                t.useEffect(
                  function () {
                    if (i.elements) {
                      var e = O(n, d, ['clientSecret', 'fonts']);
                      e && i.elements.update(e);
                    }
                  },
                  [n, d, i.elements]
                ),
                t.useEffect(
                  function () {
                    A(i.stripe);
                  },
                  [i.stripe]
                ),
                t.createElement(z.Provider, { value: i }, a)
              );
            };
          M.propTypes = { stripe: j.any, options: j.object };
          var I = function (e) {
              var r = t.useContext(z);
              return F(r, e);
            },
            D = function () {
              return I('calls useElements()').elements;
            },
            U = function (e) {
              return (0, e.children)(I('mounts <ElementsConsumer>'));
            };
          U.propTypes = { children: j.func.isRequired };
          var B = ['on', 'session'],
            W = t.createContext(null);
          W.displayName = 'CheckoutSdkContext';
          var $ = function (e, t) {
              if (!e)
                throw new Error(
                  'Could not find CheckoutProvider context; You need to wrap the part of your app that '.concat(
                    t,
                    ' in an <CheckoutProvider> provider.'
                  )
                );
              return e;
            },
            H = t.createContext(null);
          H.displayName = 'CheckoutContext';
          var q = function (e, t) {
              if (!e) return null;
              (e.on, e.session);
              var r = i(e, B);
              return t ? Object.assign(t, r) : Object.assign(e.session(), r);
            },
            V =
              'Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.',
            G = function (e) {
              var r = e.stripe,
                n = e.options,
                a = e.children,
                s = t.useMemo(
                  function () {
                    return L(r, V);
                  },
                  [r]
                ),
                o = l(t.useState(null), 2),
                i = o[0],
                c = o[1],
                u = l(
                  t.useState(function () {
                    return { stripe: 'sync' === s.tag ? s.stripe : null, checkoutSdk: null };
                  }),
                  2
                ),
                d = u[0],
                m = u[1],
                f = function (e, t) {
                  m(function (r) {
                    return r.stripe && r.checkoutSdk ? r : { stripe: e, checkoutSdk: t };
                  });
                },
                p = t.useRef(!1);
              t.useEffect(
                function () {
                  var e = !0;
                  return (
                    'async' !== s.tag || d.stripe
                      ? 'sync' === s.tag &&
                        s.stripe &&
                        !p.current &&
                        ((p.current = !0),
                        s.stripe.initCheckout(n).then(function (e) {
                          e && (f(s.stripe, e), e.on('change', c));
                        }))
                      : s.stripePromise.then(function (t) {
                          t &&
                            e &&
                            !p.current &&
                            ((p.current = !0),
                            t.initCheckout(n).then(function (e) {
                              e && (f(t, e), e.on('change', c));
                            }));
                        }),
                    function () {
                      e = !1;
                    }
                  );
                },
                [s, d, n, c]
              );
              var h = N(r);
              t.useEffect(
                function () {
                  null !== h &&
                    h !== r &&
                    console.warn(
                      'Unsupported prop change on CheckoutProvider: You cannot change the `stripe` prop after setting it.'
                    );
                },
                [h, r]
              );
              var g = N(n),
                x = N(d.checkoutSdk);
              (t.useEffect(
                function () {
                  var e, t;
                  if (d.checkoutSdk) {
                    var r =
                        null === g ||
                        void 0 === g ||
                        null === (e = g.elementsOptions) ||
                        void 0 === e
                          ? void 0
                          : e.appearance,
                      a =
                        null === n ||
                        void 0 === n ||
                        null === (t = n.elementsOptions) ||
                        void 0 === t
                          ? void 0
                          : t.appearance,
                      s = !_(a, r),
                      o = !x && d.checkoutSdk;
                    a && (s || o) && d.checkoutSdk.changeAppearance(a);
                  }
                },
                [n, g, d.checkoutSdk, x]
              ),
                t.useEffect(
                  function () {
                    A(d.stripe);
                  },
                  [d.stripe]
                ));
              var y = t.useMemo(
                function () {
                  return q(d.checkoutSdk, i);
                },
                [d.checkoutSdk, i]
              );
              return d.checkoutSdk
                ? t.createElement(
                    W.Provider,
                    { value: d },
                    t.createElement(H.Provider, { value: y }, a)
                  )
                : null;
            };
          G.propTypes = {
            stripe: j.any,
            options: j.shape({ fetchClientSecret: j.func.isRequired, elementsOptions: j.object })
              .isRequired,
          };
          var Q = function (e) {
              var r = t.useContext(W);
              return $(r, e);
            },
            Y = function (e) {
              var r = t.useContext(W),
                n = t.useContext(z);
              if (r && n)
                throw new Error(
                  'You cannot wrap the part of your app that '.concat(
                    e,
                    ' in both <CheckoutProvider> and <Elements> providers.'
                  )
                );
              return r ? $(r, e) : F(n, e);
            },
            K = function () {
              Q('calls useCheckout()');
              var e = t.useContext(H);
              if (!e)
                throw new Error(
                  'Could not find Checkout Context; You need to wrap the part of your app that calls useCheckout() in an <CheckoutProvider> provider.'
                );
              return e;
            },
            Z = ['mode'],
            J = function (e) {
              return e.charAt(0).toUpperCase() + e.slice(1);
            },
            X = function (e, r) {
              var n = ''.concat(J(e), 'Element'),
                a = r
                  ? function (e) {
                      Y('mounts <'.concat(n, '>'));
                      var r = e.id,
                        a = e.className;
                      return t.createElement('div', { id: r, className: a });
                    }
                  : function (r) {
                      var a,
                        s = r.id,
                        o = r.className,
                        c = r.options,
                        u = void 0 === c ? {} : c,
                        d = r.onBlur,
                        m = r.onFocus,
                        f = r.onReady,
                        p = r.onChange,
                        h = r.onEscape,
                        g = r.onClick,
                        x = r.onLoadError,
                        y = r.onLoaderStart,
                        v = r.onNetworksChange,
                        b = r.onConfirm,
                        w = r.onCancel,
                        j = r.onShippingAddressChange,
                        S = r.onShippingRateChange,
                        E = Y('mounts <'.concat(n, '>')),
                        C = 'elements' in E ? E.elements : null,
                        P = 'checkoutSdk' in E ? E.checkoutSdk : null,
                        _ = l(t.useState(null), 2),
                        R = _[0],
                        T = _[1],
                        L = t.useRef(null),
                        A = t.useRef(null);
                      (k(R, 'blur', d),
                        k(R, 'focus', m),
                        k(R, 'escape', h),
                        k(R, 'click', g),
                        k(R, 'loaderror', x),
                        k(R, 'loaderstart', y),
                        k(R, 'networkschange', v),
                        k(R, 'confirm', b),
                        k(R, 'cancel', w),
                        k(R, 'shippingaddresschange', j),
                        k(R, 'shippingratechange', S),
                        k(R, 'change', p),
                        f &&
                          (a =
                            'expressCheckout' === e
                              ? f
                              : function () {
                                  f(R);
                                }),
                        k(R, 'ready', a),
                        t.useLayoutEffect(
                          function () {
                            if (null === L.current && null !== A.current && (C || P)) {
                              var t = null;
                              if (P)
                                switch (e) {
                                  case 'payment':
                                    t = P.createPaymentElement(u);
                                    break;
                                  case 'address':
                                    if (!('mode' in u))
                                      throw new Error(
                                        "You must supply options.mode. mode must be 'billing' or 'shipping'."
                                      );
                                    var r = u.mode,
                                      a = i(u, Z);
                                    if ('shipping' === r) t = P.createShippingAddressElement(a);
                                    else {
                                      if ('billing' !== r)
                                        throw new Error(
                                          "Invalid options.mode. mode must be 'billing' or 'shipping'."
                                        );
                                      t = P.createBillingAddressElement(a);
                                    }
                                    break;
                                  case 'expressCheckout':
                                    t = P.createExpressCheckoutElement(u);
                                    break;
                                  case 'currencySelector':
                                    t = P.createCurrencySelectorElement();
                                    break;
                                  default:
                                    throw new Error(
                                      'Invalid Element type '.concat(
                                        n,
                                        ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."
                                      )
                                    );
                                }
                              else C && (t = C.create(e, u));
                              ((L.current = t), T(t), t && t.mount(A.current));
                            }
                          },
                          [C, P, u]
                        ));
                      var z = N(u);
                      return (
                        t.useEffect(
                          function () {
                            if (L.current) {
                              var e = O(u, z, ['paymentRequest']);
                              e && 'update' in L.current && L.current.update(e);
                            }
                          },
                          [u, z]
                        ),
                        t.useLayoutEffect(function () {
                          return function () {
                            if (L.current && 'function' === typeof L.current.destroy)
                              try {
                                (L.current.destroy(), (L.current = null));
                              } catch (e) {}
                          };
                        }, []),
                        t.createElement('div', { id: s, className: o, ref: A })
                      );
                    };
              return (
                (a.propTypes = {
                  id: j.string,
                  className: j.string,
                  onChange: j.func,
                  onBlur: j.func,
                  onFocus: j.func,
                  onReady: j.func,
                  onEscape: j.func,
                  onClick: j.func,
                  onLoadError: j.func,
                  onLoaderStart: j.func,
                  onNetworksChange: j.func,
                  onConfirm: j.func,
                  onCancel: j.func,
                  onShippingAddressChange: j.func,
                  onShippingRateChange: j.func,
                  options: j.object,
                }),
                (a.displayName = n),
                (a.__elementType = e),
                a
              );
            },
            ee = 'undefined' === typeof window,
            te = t.createContext(null);
          te.displayName = 'EmbeddedCheckoutProviderContext';
          var re = function () {
              var e = t.useContext(te);
              if (!e)
                throw new Error(
                  '<EmbeddedCheckout> must be used within <EmbeddedCheckoutProvider>'
                );
              return e;
            },
            ne =
              'Invalid prop `stripe` supplied to `EmbeddedCheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.',
            ae = function (e) {
              var r = e.stripe,
                n = e.options,
                a = e.children,
                s = t.useMemo(
                  function () {
                    return L(r, ne);
                  },
                  [r]
                ),
                o = t.useRef(null),
                i = t.useRef(null),
                c = l(t.useState({ embeddedCheckout: null }), 2),
                u = c[0],
                d = c[1];
              (t.useEffect(
                function () {
                  if (!i.current && !o.current) {
                    var e = function (e) {
                      i.current ||
                        o.current ||
                        ((i.current = e),
                        (o.current = i.current.initEmbeddedCheckout(n).then(function (e) {
                          d({ embeddedCheckout: e });
                        })));
                    };
                    'async' !== s.tag || i.current || (!n.clientSecret && !n.fetchClientSecret)
                      ? 'sync' !== s.tag ||
                        i.current ||
                        (!n.clientSecret && !n.fetchClientSecret) ||
                        e(s.stripe)
                      : s.stripePromise.then(function (t) {
                          t && e(t);
                        });
                  }
                },
                [s, n, u, i]
              ),
                t.useEffect(
                  function () {
                    return function () {
                      u.embeddedCheckout
                        ? ((o.current = null), u.embeddedCheckout.destroy())
                        : o.current &&
                          o.current.then(function () {
                            ((o.current = null),
                              u.embeddedCheckout && u.embeddedCheckout.destroy());
                          });
                    };
                  },
                  [u.embeddedCheckout]
                ),
                t.useEffect(
                  function () {
                    A(i);
                  },
                  [i]
                ));
              var m = N(r);
              t.useEffect(
                function () {
                  null !== m &&
                    m !== r &&
                    console.warn(
                      'Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the `stripe` prop after setting it.'
                    );
                },
                [m, r]
              );
              var f = N(n);
              return (
                t.useEffect(
                  function () {
                    null != f &&
                      (null != n
                        ? (void 0 === n.clientSecret &&
                            void 0 === n.fetchClientSecret &&
                            console.warn(
                              'Invalid props passed to EmbeddedCheckoutProvider: You must provide one of either `options.fetchClientSecret` or `options.clientSecret`.'
                            ),
                          null != f.clientSecret &&
                            n.clientSecret !== f.clientSecret &&
                            console.warn(
                              'Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the client secret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.'
                            ),
                          null != f.fetchClientSecret &&
                            n.fetchClientSecret !== f.fetchClientSecret &&
                            console.warn(
                              'Unsupported prop change on EmbeddedCheckoutProvider: You cannot change fetchClientSecret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.'
                            ),
                          null != f.onComplete &&
                            n.onComplete !== f.onComplete &&
                            console.warn(
                              'Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onComplete option after setting it.'
                            ),
                          null != f.onShippingDetailsChange &&
                            n.onShippingDetailsChange !== f.onShippingDetailsChange &&
                            console.warn(
                              'Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onShippingDetailsChange option after setting it.'
                            ),
                          null != f.onLineItemsChange &&
                            n.onLineItemsChange !== f.onLineItemsChange &&
                            console.warn(
                              'Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onLineItemsChange option after setting it.'
                            ))
                        : console.warn(
                            'Unsupported prop change on EmbeddedCheckoutProvider: You cannot unset options after setting them.'
                          ));
                  },
                  [f, n]
                ),
                t.createElement(te.Provider, { value: u }, a)
              );
            },
            se = function (e) {
              var r = e.id,
                n = e.className,
                a = re().embeddedCheckout,
                s = t.useRef(!1),
                o = t.useRef(null);
              return (
                t.useLayoutEffect(
                  function () {
                    return (
                      !s.current &&
                        a &&
                        null !== o.current &&
                        (a.mount(o.current), (s.current = !0)),
                      function () {
                        if (s.current && a)
                          try {
                            (a.unmount(), (s.current = !1));
                          } catch (e) {}
                      }
                    );
                  },
                  [a]
                ),
                t.createElement('div', { ref: o, id: r, className: n })
              );
            },
            oe = function (e) {
              var r = e.id,
                n = e.className;
              return (re(), t.createElement('div', { id: r, className: n }));
            },
            ie = ee ? oe : se,
            le = function () {
              return Y('calls useStripe()').stripe;
            },
            ce = X('auBankAccount', ee),
            ue = X('card', ee),
            de = X('cardNumber', ee),
            me = X('cardExpiry', ee),
            fe = X('cardCvc', ee),
            pe = X('fpxBank', ee),
            he = X('iban', ee),
            ge = X('idealBank', ee),
            xe = X('p24Bank', ee),
            ye = X('epsBank', ee),
            ve = X('payment', ee),
            be = X('expressCheckout', ee),
            we = X('currencySelector', ee),
            je = X('paymentRequestButton', ee),
            ke = X('linkAuthentication', ee),
            Ne = X('address', ee),
            Se = X('shippingAddress', ee),
            Ee = X('paymentMethodMessaging', ee),
            Ce = X('affirmMessage', ee),
            Pe = X('afterpayClearpayMessage', ee);
          ((e.AddressElement = Ne),
            (e.AffirmMessageElement = Ce),
            (e.AfterpayClearpayMessageElement = Pe),
            (e.AuBankAccountElement = ce),
            (e.CardCvcElement = fe),
            (e.CardElement = ue),
            (e.CardExpiryElement = me),
            (e.CardNumberElement = de),
            (e.CheckoutProvider = G),
            (e.CurrencySelectorElement = we),
            (e.Elements = M),
            (e.ElementsConsumer = U),
            (e.EmbeddedCheckout = ie),
            (e.EmbeddedCheckoutProvider = ae),
            (e.EpsBankElement = ye),
            (e.ExpressCheckoutElement = be),
            (e.FpxBankElement = pe),
            (e.IbanElement = he),
            (e.IdealBankElement = ge),
            (e.LinkAuthenticationElement = ke),
            (e.P24BankElement = xe),
            (e.PaymentElement = ve),
            (e.PaymentMethodMessagingElement = Ee),
            (e.PaymentRequestButtonElement = je),
            (e.ShippingAddressElement = Se),
            (e.useCheckout = K),
            (e.useElements = D),
            (e.useStripe = le));
        })(t, r(950));
      },
      654: (e, t, r) => {
        'use strict';
        var n = r(950),
          a = Symbol.for('react.element'),
          s = Symbol.for('react.fragment'),
          o = Object.prototype.hasOwnProperty,
          i = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
          l = { key: !0, ref: !0, __self: !0, __source: !0 };
        function c(e, t, r) {
          var n,
            s = {},
            c = null,
            u = null;
          for (n in (void 0 !== r && (c = '' + r),
          void 0 !== t.key && (c = '' + t.key),
          void 0 !== t.ref && (u = t.ref),
          t))
            o.call(t, n) && !l.hasOwnProperty(n) && (s[n] = t[n]);
          if (e && e.defaultProps) for (n in (t = e.defaultProps)) void 0 === s[n] && (s[n] = t[n]);
          return { $$typeof: a, type: e, key: c, ref: u, props: s, _owner: i.current };
        }
        ((t.jsx = c), (t.jsxs = c));
      },
      761: (e, t) => {
        'use strict';
        function r(e, t) {
          var r = e.length;
          e.push(t);
          e: for (; 0 < r; ) {
            var n = (r - 1) >>> 1,
              a = e[n];
            if (!(0 < s(a, t))) break e;
            ((e[n] = t), (e[r] = a), (r = n));
          }
        }
        function n(e) {
          return 0 === e.length ? null : e[0];
        }
        function a(e) {
          if (0 === e.length) return null;
          var t = e[0],
            r = e.pop();
          if (r !== t) {
            e[0] = r;
            e: for (var n = 0, a = e.length, o = a >>> 1; n < o; ) {
              var i = 2 * (n + 1) - 1,
                l = e[i],
                c = i + 1,
                u = e[c];
              if (0 > s(l, r))
                c < a && 0 > s(u, l)
                  ? ((e[n] = u), (e[c] = r), (n = c))
                  : ((e[n] = l), (e[i] = r), (n = i));
              else {
                if (!(c < a && 0 > s(u, r))) break e;
                ((e[n] = u), (e[c] = r), (n = c));
              }
            }
          }
          return t;
        }
        function s(e, t) {
          var r = e.sortIndex - t.sortIndex;
          return 0 !== r ? r : e.id - t.id;
        }
        if ('object' === typeof performance && 'function' === typeof performance.now) {
          var o = performance;
          t.unstable_now = function () {
            return o.now();
          };
        } else {
          var i = Date,
            l = i.now();
          t.unstable_now = function () {
            return i.now() - l;
          };
        }
        var c = [],
          u = [],
          d = 1,
          m = null,
          f = 3,
          p = !1,
          h = !1,
          g = !1,
          x = 'function' === typeof setTimeout ? setTimeout : null,
          y = 'function' === typeof clearTimeout ? clearTimeout : null,
          v = 'undefined' !== typeof setImmediate ? setImmediate : null;
        function b(e) {
          for (var t = n(u); null !== t; ) {
            if (null === t.callback) a(u);
            else {
              if (!(t.startTime <= e)) break;
              (a(u), (t.sortIndex = t.expirationTime), r(c, t));
            }
            t = n(u);
          }
        }
        function w(e) {
          if (((g = !1), b(e), !h))
            if (null !== n(c)) ((h = !0), L(j));
            else {
              var t = n(u);
              null !== t && A(w, t.startTime - e);
            }
        }
        function j(e, r) {
          ((h = !1), g && ((g = !1), y(E), (E = -1)), (p = !0));
          var s = f;
          try {
            for (b(r), m = n(c); null !== m && (!(m.expirationTime > r) || (e && !_())); ) {
              var o = m.callback;
              if ('function' === typeof o) {
                ((m.callback = null), (f = m.priorityLevel));
                var i = o(m.expirationTime <= r);
                ((r = t.unstable_now()),
                  'function' === typeof i ? (m.callback = i) : m === n(c) && a(c),
                  b(r));
              } else a(c);
              m = n(c);
            }
            if (null !== m) var l = !0;
            else {
              var d = n(u);
              (null !== d && A(w, d.startTime - r), (l = !1));
            }
            return l;
          } finally {
            ((m = null), (f = s), (p = !1));
          }
        }
        'undefined' !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        var k,
          N = !1,
          S = null,
          E = -1,
          C = 5,
          P = -1;
        function _() {
          return !(t.unstable_now() - P < C);
        }
        function O() {
          if (null !== S) {
            var e = t.unstable_now();
            P = e;
            var r = !0;
            try {
              r = S(!0, e);
            } finally {
              r ? k() : ((N = !1), (S = null));
            }
          } else N = !1;
        }
        if ('function' === typeof v)
          k = function () {
            v(O);
          };
        else if ('undefined' !== typeof MessageChannel) {
          var R = new MessageChannel(),
            T = R.port2;
          ((R.port1.onmessage = O),
            (k = function () {
              T.postMessage(null);
            }));
        } else
          k = function () {
            x(O, 0);
          };
        function L(e) {
          ((S = e), N || ((N = !0), k()));
        }
        function A(e, r) {
          E = x(function () {
            e(t.unstable_now());
          }, r);
        }
        ((t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            h || p || ((h = !0), L(j));
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (C = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return f;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return n(c);
          }),
          (t.unstable_next = function (e) {
            switch (f) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = f;
            }
            var r = f;
            f = t;
            try {
              return e();
            } finally {
              f = r;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var r = f;
            f = e;
            try {
              return t();
            } finally {
              f = r;
            }
          }),
          (t.unstable_scheduleCallback = function (e, a, s) {
            var o = t.unstable_now();
            switch (
              ('object' === typeof s && null !== s
                ? (s = 'number' === typeof (s = s.delay) && 0 < s ? o + s : o)
                : (s = o),
              e)
            ) {
              case 1:
                var i = -1;
                break;
              case 2:
                i = 250;
                break;
              case 5:
                i = 1073741823;
                break;
              case 4:
                i = 1e4;
                break;
              default:
                i = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: a,
                priorityLevel: e,
                startTime: s,
                expirationTime: (i = s + i),
                sortIndex: -1,
              }),
              s > o
                ? ((e.sortIndex = s),
                  r(u, e),
                  null === n(c) && e === n(u) && (g ? (y(E), (E = -1)) : (g = !0), A(w, s - o)))
                : ((e.sortIndex = i), r(c, e), h || p || ((h = !0), L(j))),
              e
            );
          }),
          (t.unstable_shouldYield = _),
          (t.unstable_wrapCallback = function (e) {
            var t = f;
            return function () {
              var r = f;
              f = t;
              try {
                return e.apply(this, arguments);
              } finally {
                f = r;
              }
            };
          }));
      },
      950: (e, t, r) => {
        'use strict';
        e.exports = r(49);
      },
    },
    t = {};
  function r(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var s = (t[n] = { exports: {} });
    return (e[n].call(s.exports, s, s.exports, r), s.exports);
  }
  ((() => {
    var e,
      t = Object.getPrototypeOf ? (e) => Object.getPrototypeOf(e) : (e) => e.__proto__;
    r.t = function (n, a) {
      if ((1 & a && (n = this(n)), 8 & a)) return n;
      if ('object' === typeof n && n) {
        if (4 & a && n.__esModule) return n;
        if (16 & a && 'function' === typeof n.then) return n;
      }
      var s = Object.create(null);
      r.r(s);
      var o = {};
      e = e || [null, t({}), t([]), t(t)];
      for (
        var i = 2 & a && n;
        ('object' == typeof i || 'function' == typeof i) && !~e.indexOf(i);
        i = t(i)
      )
        Object.getOwnPropertyNames(i).forEach((e) => (o[e] = () => n[e]));
      return ((o.default = () => n), r.d(s, o), s);
    };
  })(),
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      ('undefined' !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 }));
    }),
    (() => {
      'use strict';
      var e = {};
      (r.r(e),
        r.d(e, {
          hasBrowserEnv: () => Fr,
          hasStandardBrowserEnv: () => Ir,
          hasStandardBrowserWebWorkerEnv: () => Dr,
          navigator: () => Mr,
          origin: () => Ur,
        }));
      var t,
        n = r(950),
        a = r.t(n, 2),
        s = r(352),
        o = r(119),
        i = r.t(o, 2);
      function l() {
        return (
          (l = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
          l.apply(this, arguments)
        );
      }
      !(function (e) {
        ((e.Pop = 'POP'), (e.Push = 'PUSH'), (e.Replace = 'REPLACE'));
      })(t || (t = {}));
      const c = 'popstate';
      function u(e, t) {
        if (!1 === e || null === e || 'undefined' === typeof e) throw new Error(t);
      }
      function d(e, t) {
        if (!e) {
          'undefined' !== typeof console && console.warn(t);
          try {
            throw new Error(t);
          } catch (Ae) {}
        }
      }
      function m(e, t) {
        return { usr: e.state, key: e.key, idx: t };
      }
      function f(e, t, r, n) {
        return (
          void 0 === r && (r = null),
          l(
            { pathname: 'string' === typeof e ? e : e.pathname, search: '', hash: '' },
            'string' === typeof t ? h(t) : t,
            { state: r, key: (t && t.key) || n || Math.random().toString(36).substr(2, 8) }
          )
        );
      }
      function p(e) {
        let { pathname: t = '/', search: r = '', hash: n = '' } = e;
        return (
          r && '?' !== r && (t += '?' === r.charAt(0) ? r : '?' + r),
          n && '#' !== n && (t += '#' === n.charAt(0) ? n : '#' + n),
          t
        );
      }
      function h(e) {
        let t = {};
        if (e) {
          let r = e.indexOf('#');
          r >= 0 && ((t.hash = e.substr(r)), (e = e.substr(0, r)));
          let n = e.indexOf('?');
          (n >= 0 && ((t.search = e.substr(n)), (e = e.substr(0, n))), e && (t.pathname = e));
        }
        return t;
      }
      function g(e, r, n, a) {
        void 0 === a && (a = {});
        let { window: s = document.defaultView, v5Compat: o = !1 } = a,
          i = s.history,
          d = t.Pop,
          h = null,
          g = x();
        function x() {
          return (i.state || { idx: null }).idx;
        }
        function y() {
          d = t.Pop;
          let e = x(),
            r = null == e ? null : e - g;
          ((g = e), h && h({ action: d, location: b.location, delta: r }));
        }
        function v(e) {
          let t = 'null' !== s.location.origin ? s.location.origin : s.location.href,
            r = 'string' === typeof e ? e : p(e);
          return (
            (r = r.replace(/ $/, '%20')),
            u(t, 'No window.location.(origin|href) available to create URL for href: ' + r),
            new URL(r, t)
          );
        }
        null == g && ((g = 0), i.replaceState(l({}, i.state, { idx: g }), ''));
        let b = {
          get action() {
            return d;
          },
          get location() {
            return e(s, i);
          },
          listen(e) {
            if (h) throw new Error('A history only accepts one active listener');
            return (
              s.addEventListener(c, y),
              (h = e),
              () => {
                (s.removeEventListener(c, y), (h = null));
              }
            );
          },
          createHref: (e) => r(s, e),
          createURL: v,
          encodeLocation(e) {
            let t = v(e);
            return { pathname: t.pathname, search: t.search, hash: t.hash };
          },
          push: function (e, r) {
            d = t.Push;
            let a = f(b.location, e, r);
            (n && n(a, e), (g = x() + 1));
            let l = m(a, g),
              c = b.createHref(a);
            try {
              i.pushState(l, '', c);
            } catch (u) {
              if (u instanceof DOMException && 'DataCloneError' === u.name) throw u;
              s.location.assign(c);
            }
            o && h && h({ action: d, location: b.location, delta: 1 });
          },
          replace: function (e, r) {
            d = t.Replace;
            let a = f(b.location, e, r);
            (n && n(a, e), (g = x()));
            let s = m(a, g),
              l = b.createHref(a);
            (i.replaceState(s, '', l), o && h && h({ action: d, location: b.location, delta: 0 }));
          },
          go: (e) => i.go(e),
        };
        return b;
      }
      var x;
      !(function (e) {
        ((e.data = 'data'),
          (e.deferred = 'deferred'),
          (e.redirect = 'redirect'),
          (e.error = 'error'));
      })(x || (x = {}));
      new Set(['lazy', 'caseSensitive', 'path', 'id', 'index', 'children']);
      function y(e, t, r) {
        return (void 0 === r && (r = '/'), v(e, t, r, !1));
      }
      function v(e, t, r, n) {
        let a = L(('string' === typeof t ? h(t) : t).pathname || '/', r);
        if (null == a) return null;
        let s = b(e);
        !(function (e) {
          e.sort((e, t) =>
            e.score !== t.score
              ? t.score - e.score
              : (function (e, t) {
                  let r = e.length === t.length && e.slice(0, -1).every((e, r) => e === t[r]);
                  return r ? e[e.length - 1] - t[t.length - 1] : 0;
                })(
                  e.routesMeta.map((e) => e.childrenIndex),
                  t.routesMeta.map((e) => e.childrenIndex)
                )
          );
        })(s);
        let o = null;
        for (let i = 0; null == o && i < s.length; ++i) {
          let e = T(a);
          o = O(s[i], e, n);
        }
        return o;
      }
      function b(e, t, r, n) {
        (void 0 === t && (t = []), void 0 === r && (r = []), void 0 === n && (n = ''));
        let a = (e, a, s) => {
          let o = {
            relativePath: void 0 === s ? e.path || '' : s,
            caseSensitive: !0 === e.caseSensitive,
            childrenIndex: a,
            route: e,
          };
          o.relativePath.startsWith('/') &&
            (u(
              o.relativePath.startsWith(n),
              'Absolute route path "' +
                o.relativePath +
                '" nested under path "' +
                n +
                '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'
            ),
            (o.relativePath = o.relativePath.slice(n.length)));
          let i = I([n, o.relativePath]),
            l = r.concat(o);
          (e.children &&
            e.children.length > 0 &&
            (u(
              !0 !== e.index,
              'Index routes must not have child routes. Please remove all child routes from route path "' +
                i +
                '".'
            ),
            b(e.children, t, l, i)),
            (null != e.path || e.index) &&
              t.push({ path: i, score: _(i, e.index), routesMeta: l }));
        };
        return (
          e.forEach((e, t) => {
            var r;
            if ('' !== e.path && null != (r = e.path) && r.includes('?'))
              for (let n of w(e.path)) a(e, t, n);
            else a(e, t);
          }),
          t
        );
      }
      function w(e) {
        let t = e.split('/');
        if (0 === t.length) return [];
        let [r, ...n] = t,
          a = r.endsWith('?'),
          s = r.replace(/\?$/, '');
        if (0 === n.length) return a ? [s, ''] : [s];
        let o = w(n.join('/')),
          i = [];
        return (
          i.push(...o.map((e) => ('' === e ? s : [s, e].join('/')))),
          a && i.push(...o),
          i.map((t) => (e.startsWith('/') && '' === t ? '/' : t))
        );
      }
      const j = /^:[\w-]+$/,
        k = 3,
        N = 2,
        S = 1,
        E = 10,
        C = -2,
        P = (e) => '*' === e;
      function _(e, t) {
        let r = e.split('/'),
          n = r.length;
        return (
          r.some(P) && (n += C),
          t && (n += N),
          r.filter((e) => !P(e)).reduce((e, t) => e + (j.test(t) ? k : '' === t ? S : E), n)
        );
      }
      function O(e, t, r) {
        void 0 === r && (r = !1);
        let { routesMeta: n } = e,
          a = {},
          s = '/',
          o = [];
        for (let i = 0; i < n.length; ++i) {
          let e = n[i],
            l = i === n.length - 1,
            c = '/' === s ? t : t.slice(s.length) || '/',
            u = R({ path: e.relativePath, caseSensitive: e.caseSensitive, end: l }, c),
            d = e.route;
          if (
            (!u &&
              l &&
              r &&
              !n[n.length - 1].route.index &&
              (u = R({ path: e.relativePath, caseSensitive: e.caseSensitive, end: !1 }, c)),
            !u)
          )
            return null;
          (Object.assign(a, u.params),
            o.push({
              params: a,
              pathname: I([s, u.pathname]),
              pathnameBase: D(I([s, u.pathnameBase])),
              route: d,
            }),
            '/' !== u.pathnameBase && (s = I([s, u.pathnameBase])));
        }
        return o;
      }
      function R(e, t) {
        'string' === typeof e && (e = { path: e, caseSensitive: !1, end: !0 });
        let [r, n] = (function (e, t, r) {
            void 0 === t && (t = !1);
            void 0 === r && (r = !0);
            d(
              '*' === e || !e.endsWith('*') || e.endsWith('/*'),
              'Route path "' +
                e +
                '" will be treated as if it were "' +
                e.replace(/\*$/, '/*') +
                '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' +
                e.replace(/\*$/, '/*') +
                '".'
            );
            let n = [],
              a =
                '^' +
                e
                  .replace(/\/*\*?$/, '')
                  .replace(/^\/*/, '/')
                  .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
                  .replace(
                    /\/:([\w-]+)(\?)?/g,
                    (e, t, r) => (
                      n.push({ paramName: t, isOptional: null != r }),
                      r ? '/?([^\\/]+)?' : '/([^\\/]+)'
                    )
                  );
            e.endsWith('*')
              ? (n.push({ paramName: '*' }),
                (a += '*' === e || '/*' === e ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
              : r
                ? (a += '\\/*$')
                : '' !== e && '/' !== e && (a += '(?:(?=\\/|$))');
            let s = new RegExp(a, t ? void 0 : 'i');
            return [s, n];
          })(e.path, e.caseSensitive, e.end),
          a = t.match(r);
        if (!a) return null;
        let s = a[0],
          o = s.replace(/(.)\/+$/, '$1'),
          i = a.slice(1);
        return {
          params: n.reduce((e, t, r) => {
            let { paramName: n, isOptional: a } = t;
            if ('*' === n) {
              let e = i[r] || '';
              o = s.slice(0, s.length - e.length).replace(/(.)\/+$/, '$1');
            }
            const l = i[r];
            return ((e[n] = a && !l ? void 0 : (l || '').replace(/%2F/g, '/')), e);
          }, {}),
          pathname: s,
          pathnameBase: o,
          pattern: e,
        };
      }
      function T(e) {
        try {
          return e
            .split('/')
            .map((e) => decodeURIComponent(e).replace(/\//g, '%2F'))
            .join('/');
        } catch (t) {
          return (
            d(
              !1,
              'The URL path "' +
                e +
                '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' +
                t +
                ').'
            ),
            e
          );
        }
      }
      function L(e, t) {
        if ('/' === t) return e;
        if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
        let r = t.endsWith('/') ? t.length - 1 : t.length,
          n = e.charAt(r);
        return n && '/' !== n ? null : e.slice(r) || '/';
      }
      function A(e, t, r, n) {
        return (
          "Cannot include a '" +
          e +
          "' character in a manually specified `to." +
          t +
          '` field [' +
          JSON.stringify(n) +
          '].  Please separate it out to the `to.' +
          r +
          '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
        );
      }
      function z(e) {
        return e.filter((e, t) => 0 === t || (e.route.path && e.route.path.length > 0));
      }
      function F(e, t) {
        let r = z(e);
        return t
          ? r.map((e, t) => (t === r.length - 1 ? e.pathname : e.pathnameBase))
          : r.map((e) => e.pathnameBase);
      }
      function M(e, t, r, n) {
        let a;
        (void 0 === n && (n = !1),
          'string' === typeof e
            ? (a = h(e))
            : ((a = l({}, e)),
              u(!a.pathname || !a.pathname.includes('?'), A('?', 'pathname', 'search', a)),
              u(!a.pathname || !a.pathname.includes('#'), A('#', 'pathname', 'hash', a)),
              u(!a.search || !a.search.includes('#'), A('#', 'search', 'hash', a))));
        let s,
          o = '' === e || '' === a.pathname,
          i = o ? '/' : a.pathname;
        if (null == i) s = r;
        else {
          let e = t.length - 1;
          if (!n && i.startsWith('..')) {
            let t = i.split('/');
            for (; '..' === t[0]; ) (t.shift(), (e -= 1));
            a.pathname = t.join('/');
          }
          s = e >= 0 ? t[e] : '/';
        }
        let c = (function (e, t) {
            void 0 === t && (t = '/');
            let { pathname: r, search: n = '', hash: a = '' } = 'string' === typeof e ? h(e) : e,
              s = r
                ? r.startsWith('/')
                  ? r
                  : (function (e, t) {
                      let r = t.replace(/\/+$/, '').split('/');
                      return (
                        e.split('/').forEach((e) => {
                          '..' === e ? r.length > 1 && r.pop() : '.' !== e && r.push(e);
                        }),
                        r.length > 1 ? r.join('/') : '/'
                      );
                    })(r, t)
                : t;
            return { pathname: s, search: U(n), hash: B(a) };
          })(a, s),
          d = i && '/' !== i && i.endsWith('/'),
          m = (o || '.' === i) && r.endsWith('/');
        return (c.pathname.endsWith('/') || (!d && !m) || (c.pathname += '/'), c);
      }
      const I = (e) => e.join('/').replace(/\/\/+/g, '/'),
        D = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
        U = (e) => (e && '?' !== e ? (e.startsWith('?') ? e : '?' + e) : ''),
        B = (e) => (e && '#' !== e ? (e.startsWith('#') ? e : '#' + e) : '');
      Error;
      function W(e) {
        return (
          null != e &&
          'number' === typeof e.status &&
          'string' === typeof e.statusText &&
          'boolean' === typeof e.internal &&
          'data' in e
        );
      }
      const $ = ['post', 'put', 'patch', 'delete'],
        H = (new Set($), ['get', ...$]);
      (new Set(H), new Set([301, 302, 303, 307, 308]), new Set([307, 308]));
      Symbol('deferred');
      function q() {
        return (
          (q = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
          q.apply(this, arguments)
        );
      }
      const V = n.createContext(null);
      const G = n.createContext(null);
      const Q = n.createContext(null);
      const Y = n.createContext(null);
      const K = n.createContext({ outlet: null, matches: [], isDataRoute: !1 });
      const Z = n.createContext(null);
      function J() {
        return null != n.useContext(Y);
      }
      function X() {
        return (J() || u(!1), n.useContext(Y).location);
      }
      function ee(e) {
        n.useContext(Q).static || n.useLayoutEffect(e);
      }
      function te() {
        let { isDataRoute: e } = n.useContext(K);
        return e
          ? (function () {
              let { router: e } = me(ue.UseNavigateStable),
                t = pe(de.UseNavigateStable),
                r = n.useRef(!1);
              return (
                ee(() => {
                  r.current = !0;
                }),
                n.useCallback(
                  function (n, a) {
                    (void 0 === a && (a = {}),
                      r.current &&
                        ('number' === typeof n
                          ? e.navigate(n)
                          : e.navigate(n, q({ fromRouteId: t }, a))));
                  },
                  [e, t]
                )
              );
            })()
          : (function () {
              J() || u(!1);
              let e = n.useContext(V),
                { basename: t, future: r, navigator: a } = n.useContext(Q),
                { matches: s } = n.useContext(K),
                { pathname: o } = X(),
                i = JSON.stringify(F(s, r.v7_relativeSplatPath)),
                l = n.useRef(!1);
              return (
                ee(() => {
                  l.current = !0;
                }),
                n.useCallback(
                  function (r, n) {
                    if ((void 0 === n && (n = {}), !l.current)) return;
                    if ('number' === typeof r) return void a.go(r);
                    let s = M(r, JSON.parse(i), o, 'path' === n.relative);
                    (null == e &&
                      '/' !== t &&
                      (s.pathname = '/' === s.pathname ? t : I([t, s.pathname])),
                      (n.replace ? a.replace : a.push)(s, n.state, n));
                  },
                  [t, a, i, o, e]
                )
              );
            })();
      }
      function re() {
        let { matches: e } = n.useContext(K),
          t = e[e.length - 1];
        return t ? t.params : {};
      }
      function ne(e, t) {
        let { relative: r } = void 0 === t ? {} : t,
          { future: a } = n.useContext(Q),
          { matches: s } = n.useContext(K),
          { pathname: o } = X(),
          i = JSON.stringify(F(s, a.v7_relativeSplatPath));
        return n.useMemo(() => M(e, JSON.parse(i), o, 'path' === r), [e, i, o, r]);
      }
      function ae(e, r, a, s) {
        J() || u(!1);
        let { navigator: o } = n.useContext(Q),
          { matches: i } = n.useContext(K),
          l = i[i.length - 1],
          c = l ? l.params : {},
          d = (l && l.pathname, l ? l.pathnameBase : '/');
        l && l.route;
        let m,
          f = X();
        if (r) {
          var p;
          let e = 'string' === typeof r ? h(r) : r;
          ('/' === d || (null == (p = e.pathname) ? void 0 : p.startsWith(d)) || u(!1), (m = e));
        } else m = f;
        let g = m.pathname || '/',
          x = g;
        if ('/' !== d) {
          let e = d.replace(/^\//, '').split('/');
          x = '/' + g.replace(/^\//, '').split('/').slice(e.length).join('/');
        }
        let v = y(e, { pathname: x });
        let b = ce(
          v &&
            v.map((e) =>
              Object.assign({}, e, {
                params: Object.assign({}, c, e.params),
                pathname: I([
                  d,
                  o.encodeLocation ? o.encodeLocation(e.pathname).pathname : e.pathname,
                ]),
                pathnameBase:
                  '/' === e.pathnameBase
                    ? d
                    : I([
                        d,
                        o.encodeLocation
                          ? o.encodeLocation(e.pathnameBase).pathname
                          : e.pathnameBase,
                      ]),
              })
            ),
          i,
          a,
          s
        );
        return r && b
          ? n.createElement(
              Y.Provider,
              {
                value: {
                  location: q(
                    { pathname: '/', search: '', hash: '', state: null, key: 'default' },
                    m
                  ),
                  navigationType: t.Pop,
                },
              },
              b
            )
          : b;
      }
      function se() {
        let e = (function () {
            var e;
            let t = n.useContext(Z),
              r = fe(de.UseRouteError),
              a = pe(de.UseRouteError);
            if (void 0 !== t) return t;
            return null == (e = r.errors) ? void 0 : e[a];
          })(),
          t = W(e)
            ? e.status + ' ' + e.statusText
            : e instanceof Error
              ? e.message
              : JSON.stringify(e),
          r = e instanceof Error ? e.stack : null,
          a = 'rgba(200,200,200, 0.5)',
          s = { padding: '0.5rem', backgroundColor: a };
        return n.createElement(
          n.Fragment,
          null,
          n.createElement('h2', null, 'Unexpected Application Error!'),
          n.createElement('h3', { style: { fontStyle: 'italic' } }, t),
          r ? n.createElement('pre', { style: s }, r) : null,
          null
        );
      }
      const oe = n.createElement(se, null);
      class ie extends n.Component {
        constructor(e) {
          (super(e),
            (this.state = { location: e.location, revalidation: e.revalidation, error: e.error }));
        }
        static getDerivedStateFromError(e) {
          return { error: e };
        }
        static getDerivedStateFromProps(e, t) {
          return t.location !== e.location ||
            ('idle' !== t.revalidation && 'idle' === e.revalidation)
            ? { error: e.error, location: e.location, revalidation: e.revalidation }
            : {
                error: void 0 !== e.error ? e.error : t.error,
                location: t.location,
                revalidation: e.revalidation || t.revalidation,
              };
        }
        componentDidCatch(e, t) {
          console.error('React Router caught the following error during render', e, t);
        }
        render() {
          return void 0 !== this.state.error
            ? n.createElement(
                K.Provider,
                { value: this.props.routeContext },
                n.createElement(Z.Provider, {
                  value: this.state.error,
                  children: this.props.component,
                })
              )
            : this.props.children;
        }
      }
      function le(e) {
        let { routeContext: t, match: r, children: a } = e,
          s = n.useContext(V);
        return (
          s &&
            s.static &&
            s.staticContext &&
            (r.route.errorElement || r.route.ErrorBoundary) &&
            (s.staticContext._deepestRenderedBoundaryId = r.route.id),
          n.createElement(K.Provider, { value: t }, a)
        );
      }
      function ce(e, t, r, a) {
        var s;
        if (
          (void 0 === t && (t = []),
          void 0 === r && (r = null),
          void 0 === a && (a = null),
          null == e)
        ) {
          var o;
          if (!r) return null;
          if (r.errors) e = r.matches;
          else {
            if (
              !(
                null != (o = a) &&
                o.v7_partialHydration &&
                0 === t.length &&
                !r.initialized &&
                r.matches.length > 0
              )
            )
              return null;
            e = r.matches;
          }
        }
        let i = e,
          l = null == (s = r) ? void 0 : s.errors;
        if (null != l) {
          let e = i.findIndex((e) => e.route.id && void 0 !== (null == l ? void 0 : l[e.route.id]));
          (e >= 0 || u(!1), (i = i.slice(0, Math.min(i.length, e + 1))));
        }
        let c = !1,
          d = -1;
        if (r && a && a.v7_partialHydration)
          for (let n = 0; n < i.length; n++) {
            let e = i[n];
            if (
              ((e.route.HydrateFallback || e.route.hydrateFallbackElement) && (d = n), e.route.id)
            ) {
              let { loaderData: t, errors: n } = r,
                a = e.route.loader && void 0 === t[e.route.id] && (!n || void 0 === n[e.route.id]);
              if (e.route.lazy || a) {
                ((c = !0), (i = d >= 0 ? i.slice(0, d + 1) : [i[0]]));
                break;
              }
            }
          }
        return i.reduceRight((e, a, s) => {
          let o,
            u = !1,
            m = null,
            f = null;
          var p;
          r &&
            ((o = l && a.route.id ? l[a.route.id] : void 0),
            (m = a.route.errorElement || oe),
            c &&
              (d < 0 && 0 === s
                ? ((p = 'route-fallback'), !1 || he[p] || (he[p] = !0), (u = !0), (f = null))
                : d === s && ((u = !0), (f = a.route.hydrateFallbackElement || null))));
          let h = t.concat(i.slice(0, s + 1)),
            g = () => {
              let t;
              return (
                (t = o
                  ? m
                  : u
                    ? f
                    : a.route.Component
                      ? n.createElement(a.route.Component, null)
                      : a.route.element
                        ? a.route.element
                        : e),
                n.createElement(le, {
                  match: a,
                  routeContext: { outlet: e, matches: h, isDataRoute: null != r },
                  children: t,
                })
              );
            };
          return r && (a.route.ErrorBoundary || a.route.errorElement || 0 === s)
            ? n.createElement(ie, {
                location: r.location,
                revalidation: r.revalidation,
                component: m,
                error: o,
                children: g(),
                routeContext: { outlet: null, matches: h, isDataRoute: !0 },
              })
            : g();
        }, null);
      }
      var ue = (function (e) {
          return (
            (e.UseBlocker = 'useBlocker'),
            (e.UseRevalidator = 'useRevalidator'),
            (e.UseNavigateStable = 'useNavigate'),
            e
          );
        })(ue || {}),
        de = (function (e) {
          return (
            (e.UseBlocker = 'useBlocker'),
            (e.UseLoaderData = 'useLoaderData'),
            (e.UseActionData = 'useActionData'),
            (e.UseRouteError = 'useRouteError'),
            (e.UseNavigation = 'useNavigation'),
            (e.UseRouteLoaderData = 'useRouteLoaderData'),
            (e.UseMatches = 'useMatches'),
            (e.UseRevalidator = 'useRevalidator'),
            (e.UseNavigateStable = 'useNavigate'),
            (e.UseRouteId = 'useRouteId'),
            e
          );
        })(de || {});
      function me(e) {
        let t = n.useContext(V);
        return (t || u(!1), t);
      }
      function fe(e) {
        let t = n.useContext(G);
        return (t || u(!1), t);
      }
      function pe(e) {
        let t = (function () {
            let e = n.useContext(K);
            return (e || u(!1), e);
          })(),
          r = t.matches[t.matches.length - 1];
        return (r.route.id || u(!1), r.route.id);
      }
      const he = {};
      function ge(e, t) {
        (null == e || e.v7_startTransition,
          void 0 === (null == e ? void 0 : e.v7_relativeSplatPath) &&
            (!t || t.v7_relativeSplatPath),
          t &&
            (t.v7_fetcherPersist,
            t.v7_normalizeFormMethod,
            t.v7_partialHydration,
            t.v7_skipActionErrorRevalidation));
      }
      a.startTransition;
      function xe(e) {
        let { to: t, replace: r, state: a, relative: s } = e;
        J() || u(!1);
        let { future: o, static: i } = n.useContext(Q),
          { matches: l } = n.useContext(K),
          { pathname: c } = X(),
          d = te(),
          m = M(t, F(l, o.v7_relativeSplatPath), c, 'path' === s),
          f = JSON.stringify(m);
        return (
          n.useEffect(
            () => d(JSON.parse(f), { replace: r, state: a, relative: s }),
            [d, f, s, r, a]
          ),
          null
        );
      }
      function ye(e) {
        u(!1);
      }
      function ve(e) {
        let {
          basename: r = '/',
          children: a = null,
          location: s,
          navigationType: o = t.Pop,
          navigator: i,
          static: l = !1,
          future: c,
        } = e;
        J() && u(!1);
        let d = r.replace(/^\/*/, '/'),
          m = n.useMemo(
            () => ({
              basename: d,
              navigator: i,
              static: l,
              future: q({ v7_relativeSplatPath: !1 }, c),
            }),
            [d, c, i, l]
          );
        'string' === typeof s && (s = h(s));
        let {
            pathname: f = '/',
            search: p = '',
            hash: g = '',
            state: x = null,
            key: y = 'default',
          } = s,
          v = n.useMemo(() => {
            let e = L(f, d);
            return null == e
              ? null
              : {
                  location: { pathname: e, search: p, hash: g, state: x, key: y },
                  navigationType: o,
                };
          }, [d, f, p, g, x, y, o]);
        return null == v
          ? null
          : n.createElement(
              Q.Provider,
              { value: m },
              n.createElement(Y.Provider, { children: a, value: v })
            );
      }
      function be(e) {
        let { children: t, location: r } = e;
        return ae(we(t), r);
      }
      new Promise(() => {});
      n.Component;
      function we(e, t) {
        void 0 === t && (t = []);
        let r = [];
        return (
          n.Children.forEach(e, (e, a) => {
            if (!n.isValidElement(e)) return;
            let s = [...t, a];
            if (e.type === n.Fragment) return void r.push.apply(r, we(e.props.children, s));
            (e.type !== ye && u(!1), e.props.index && e.props.children && u(!1));
            let o = {
              id: e.props.id || s.join('-'),
              caseSensitive: e.props.caseSensitive,
              element: e.props.element,
              Component: e.props.Component,
              index: e.props.index,
              path: e.props.path,
              loader: e.props.loader,
              action: e.props.action,
              errorElement: e.props.errorElement,
              ErrorBoundary: e.props.ErrorBoundary,
              hasErrorBoundary: null != e.props.ErrorBoundary || null != e.props.errorElement,
              shouldRevalidate: e.props.shouldRevalidate,
              handle: e.props.handle,
              lazy: e.props.lazy,
            };
            (e.props.children && (o.children = we(e.props.children, s)), r.push(o));
          }),
          r
        );
      }
      function je() {
        return (
          (je = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
          je.apply(this, arguments)
        );
      }
      function ke(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = {},
          s = Object.keys(e);
        for (n = 0; n < s.length; n++) ((r = s[n]), t.indexOf(r) >= 0 || (a[r] = e[r]));
        return a;
      }
      function Ne(e) {
        return (
          void 0 === e && (e = ''),
          new URLSearchParams(
            'string' === typeof e || Array.isArray(e) || e instanceof URLSearchParams
              ? e
              : Object.keys(e).reduce((t, r) => {
                  let n = e[r];
                  return t.concat(Array.isArray(n) ? n.map((e) => [r, e]) : [[r, n]]);
                }, [])
          )
        );
      }
      new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
      const Se = [
        'onClick',
        'relative',
        'reloadDocument',
        'replace',
        'state',
        'target',
        'to',
        'preventScrollReset',
        'viewTransition',
      ];
      try {
        window.__reactRouterVersion = '6';
      } catch (Ae) {}
      new Map();
      const Ee = a.startTransition;
      (i.flushSync, a.useId);
      function Ce(e) {
        let { basename: t, children: r, future: a, window: s } = e,
          o = n.useRef();
        var i;
        null == o.current &&
          (o.current =
            (void 0 === (i = { window: s, v5Compat: !0 }) && (i = {}),
            g(
              function (e, t) {
                let { pathname: r, search: n, hash: a } = e.location;
                return f(
                  '',
                  { pathname: r, search: n, hash: a },
                  (t.state && t.state.usr) || null,
                  (t.state && t.state.key) || 'default'
                );
              },
              function (e, t) {
                return 'string' === typeof t ? t : p(t);
              },
              null,
              i
            )));
        let l = o.current,
          [c, u] = n.useState({ action: l.action, location: l.location }),
          { v7_startTransition: d } = a || {},
          m = n.useCallback(
            (e) => {
              d && Ee ? Ee(() => u(e)) : u(e);
            },
            [u, d]
          );
        return (
          n.useLayoutEffect(() => l.listen(m), [l, m]),
          n.useEffect(() => ge(a), [a]),
          n.createElement(ve, {
            basename: t,
            children: r,
            location: c.location,
            navigationType: c.action,
            navigator: l,
            future: a,
          })
        );
      }
      const Pe =
          'undefined' !== typeof window &&
          'undefined' !== typeof window.document &&
          'undefined' !== typeof window.document.createElement,
        _e = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
        Oe = n.forwardRef(function (e, t) {
          let r,
            {
              onClick: a,
              relative: s,
              reloadDocument: o,
              replace: i,
              state: l,
              target: c,
              to: d,
              preventScrollReset: m,
              viewTransition: f,
            } = e,
            h = ke(e, Se),
            { basename: g } = n.useContext(Q),
            x = !1;
          if ('string' === typeof d && _e.test(d) && ((r = d), Pe))
            try {
              let e = new URL(window.location.href),
                t = d.startsWith('//') ? new URL(e.protocol + d) : new URL(d),
                r = L(t.pathname, g);
              t.origin === e.origin && null != r ? (d = r + t.search + t.hash) : (x = !0);
            } catch (Ae) {}
          let y = (function (e, t) {
              let { relative: r } = void 0 === t ? {} : t;
              J() || u(!1);
              let { basename: a, navigator: s } = n.useContext(Q),
                { hash: o, pathname: i, search: l } = ne(e, { relative: r }),
                c = i;
              return (
                '/' !== a && (c = '/' === i ? a : I([a, i])),
                s.createHref({ pathname: c, search: l, hash: o })
              );
            })(d, { relative: s }),
            v = (function (e, t) {
              let {
                  target: r,
                  replace: a,
                  state: s,
                  preventScrollReset: o,
                  relative: i,
                  viewTransition: l,
                } = void 0 === t ? {} : t,
                c = te(),
                u = X(),
                d = ne(e, { relative: i });
              return n.useCallback(
                (t) => {
                  if (
                    (function (e, t) {
                      return (
                        0 === e.button &&
                        (!t || '_self' === t) &&
                        !(function (e) {
                          return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                        })(e)
                      );
                    })(t, r)
                  ) {
                    t.preventDefault();
                    let r = void 0 !== a ? a : p(u) === p(d);
                    c(e, {
                      replace: r,
                      state: s,
                      preventScrollReset: o,
                      relative: i,
                      viewTransition: l,
                    });
                  }
                },
                [u, c, d, a, s, r, e, o, i, l]
              );
            })(d, {
              replace: i,
              state: l,
              target: c,
              preventScrollReset: m,
              relative: s,
              viewTransition: f,
            });
          return n.createElement(
            'a',
            je({}, h, {
              href: r || y,
              onClick:
                x || o
                  ? a
                  : function (e) {
                      (a && a(e), e.defaultPrevented || v(e));
                    },
              ref: t,
              target: c,
            })
          );
        });
      var Re, Te;
      function Le(e) {
        let t = n.useRef(Ne(e)),
          r = n.useRef(!1),
          a = X(),
          s = n.useMemo(
            () =>
              (function (e, t) {
                let r = Ne(e);
                return (
                  t &&
                    t.forEach((e, n) => {
                      r.has(n) ||
                        t.getAll(n).forEach((e) => {
                          r.append(n, e);
                        });
                    }),
                  r
                );
              })(a.search, r.current ? null : t.current),
            [a.search]
          ),
          o = te(),
          i = n.useCallback(
            (e, t) => {
              const n = Ne('function' === typeof e ? e(s) : e);
              ((r.current = !0), o('?' + n, t));
            },
            [o, s]
          );
        return [s, i];
      }
      ((function (e) {
        ((e.UseScrollRestoration = 'useScrollRestoration'),
          (e.UseSubmit = 'useSubmit'),
          (e.UseSubmitFetcher = 'useSubmitFetcher'),
          (e.UseFetcher = 'useFetcher'),
          (e.useViewTransitionState = 'useViewTransitionState'));
      })(Re || (Re = {})),
        (function (e) {
          ((e.UseFetcher = 'useFetcher'),
            (e.UseFetchers = 'useFetchers'),
            (e.UseScrollRestoration = 'useScrollRestoration'));
        })(Te || (Te = {})));
      let Ae = { data: '' },
        ze = (e) =>
          'object' == typeof window
            ? (
                (e ? e.querySelector('#_goober') : window._goober) ||
                Object.assign((e || document.head).appendChild(document.createElement('style')), {
                  innerHTML: ' ',
                  id: '_goober',
                })
              ).firstChild
            : e || Ae,
        Fe = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
        Me = /\/\*[^]*?\*\/|  +/g,
        Ie = /\n+/g,
        De = (e, t) => {
          let r = '',
            n = '',
            a = '';
          for (let s in e) {
            let o = e[s];
            '@' == s[0]
              ? 'i' == s[1]
                ? (r = s + ' ' + o + ';')
                : (n += 'f' == s[1] ? De(o, s) : s + '{' + De(o, 'k' == s[1] ? '' : t) + '}')
              : 'object' == typeof o
                ? (n += De(
                    o,
                    t
                      ? t.replace(/([^,])+/g, (e) =>
                          s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t) =>
                            /&/.test(t) ? t.replace(/&/g, e) : e ? e + ' ' + t : t
                          )
                        )
                      : s
                  ))
                : null != o &&
                  ((s = /^--/.test(s) ? s : s.replace(/[A-Z]/g, '-$&').toLowerCase()),
                  (a += De.p ? De.p(s, o) : s + ':' + o + ';'));
          }
          return r + (t && a ? t + '{' + a + '}' : a) + n;
        },
        Ue = {},
        Be = (e) => {
          if ('object' == typeof e) {
            let t = '';
            for (let r in e) t += r + Be(e[r]);
            return t;
          }
          return e;
        },
        We = (e, t, r, n, a) => {
          let s = Be(e),
            o =
              Ue[s] ||
              (Ue[s] = ((e) => {
                let t = 0,
                  r = 11;
                for (; t < e.length; ) r = (101 * r + e.charCodeAt(t++)) >>> 0;
                return 'go' + r;
              })(s));
          if (!Ue[o]) {
            let t =
              s !== e
                ? e
                : ((e) => {
                    let t,
                      r,
                      n = [{}];
                    for (; (t = Fe.exec(e.replace(Me, ''))); )
                      t[4]
                        ? n.shift()
                        : t[3]
                          ? ((r = t[3].replace(Ie, ' ').trim()),
                            n.unshift((n[0][r] = n[0][r] || {})))
                          : (n[0][t[1]] = t[2].replace(Ie, ' ').trim());
                    return n[0];
                  })(e);
            Ue[o] = De(a ? { ['@keyframes ' + o]: t } : t, r ? '' : '.' + o);
          }
          let i = r && Ue.g ? Ue.g : null;
          return (
            r && (Ue.g = Ue[o]),
            ((e, t, r, n) => {
              n
                ? (t.data = t.data.replace(n, e))
                : -1 === t.data.indexOf(e) && (t.data = r ? e + t.data : t.data + e);
            })(Ue[o], t, n, i),
            o
          );
        };
      function $e(e) {
        let t = this || {},
          r = e.call ? e(t.p) : e;
        return We(
          r.unshift
            ? r.raw
              ? ((e, t, r) =>
                  e.reduce((e, n, a) => {
                    let s = t[a];
                    if (s && s.call) {
                      let e = s(r),
                        t = (e && e.props && e.props.className) || (/^go/.test(e) && e);
                      s = t
                        ? '.' + t
                        : e && 'object' == typeof e
                          ? e.props
                            ? ''
                            : De(e, '')
                          : !1 === e
                            ? ''
                            : e;
                    }
                    return e + n + (null == s ? '' : s);
                  }, ''))(r, [].slice.call(arguments, 1), t.p)
              : r.reduce((e, r) => Object.assign(e, r && r.call ? r(t.p) : r), {})
            : r,
          ze(t.target),
          t.g,
          t.o,
          t.k
        );
      }
      $e.bind({ g: 1 });
      let He,
        qe,
        Ve,
        Ge = $e.bind({ k: 1 });
      function Qe(e, t) {
        let r = this || {};
        return function () {
          let n = arguments;
          function a(s, o) {
            let i = Object.assign({}, s),
              l = i.className || a.className;
            ((r.p = Object.assign({ theme: qe && qe() }, i)),
              (r.o = / *go\d+/.test(l)),
              (i.className = $e.apply(r, n) + (l ? ' ' + l : '')),
              t && (i.ref = o));
            let c = e;
            return (e[0] && ((c = i.as || e), delete i.as), Ve && c[0] && Ve(i), He(c, i));
          }
          return t ? t(a) : a;
        };
      }
      var Ye = (e, t) => (((e) => 'function' == typeof e)(e) ? e(t) : e),
        Ke = (() => {
          let e = 0;
          return () => (++e).toString();
        })(),
        Ze = (() => {
          let e;
          return () => {
            if (void 0 === e && typeof window < 'u') {
              let t = matchMedia('(prefers-reduced-motion: reduce)');
              e = !t || t.matches;
            }
            return e;
          };
        })(),
        Je = (e, t) => {
          switch (t.type) {
            case 0:
              return { ...e, toasts: [t.toast, ...e.toasts].slice(0, 20) };
            case 1:
              return {
                ...e,
                toasts: e.toasts.map((e) => (e.id === t.toast.id ? { ...e, ...t.toast } : e)),
              };
            case 2:
              let { toast: r } = t;
              return Je(e, { type: e.toasts.find((e) => e.id === r.id) ? 1 : 0, toast: r });
            case 3:
              let { toastId: n } = t;
              return {
                ...e,
                toasts: e.toasts.map((e) =>
                  e.id === n || void 0 === n ? { ...e, dismissed: !0, visible: !1 } : e
                ),
              };
            case 4:
              return void 0 === t.toastId
                ? { ...e, toasts: [] }
                : { ...e, toasts: e.toasts.filter((e) => e.id !== t.toastId) };
            case 5:
              return { ...e, pausedAt: t.time };
            case 6:
              let a = t.time - (e.pausedAt || 0);
              return {
                ...e,
                pausedAt: void 0,
                toasts: e.toasts.map((e) => ({ ...e, pauseDuration: e.pauseDuration + a })),
              };
          }
        },
        Xe = [],
        et = { toasts: [], pausedAt: void 0 },
        tt = (e) => {
          ((et = Je(et, e)),
            Xe.forEach((e) => {
              e(et);
            }));
        },
        rt = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 },
        nt = (e) => (t, r) => {
          let n = (function (e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'blank',
              r = arguments.length > 2 ? arguments[2] : void 0;
            return {
              createdAt: Date.now(),
              visible: !0,
              dismissed: !1,
              type: t,
              ariaProps: { role: 'status', 'aria-live': 'polite' },
              message: e,
              pauseDuration: 0,
              ...r,
              id: (null == r ? void 0 : r.id) || Ke(),
            };
          })(t, e, r);
          return (tt({ type: 2, toast: n }), n.id);
        },
        at = (e, t) => nt('blank')(e, t);
      ((at.error = nt('error')),
        (at.success = nt('success')),
        (at.loading = nt('loading')),
        (at.custom = nt('custom')),
        (at.dismiss = (e) => {
          tt({ type: 3, toastId: e });
        }),
        (at.remove = (e) => tt({ type: 4, toastId: e })),
        (at.promise = (e, t, r) => {
          let n = at.loading(t.loading, { ...r, ...(null == r ? void 0 : r.loading) });
          return (
            'function' == typeof e && (e = e()),
            e
              .then((e) => {
                let a = t.success ? Ye(t.success, e) : void 0;
                return (
                  a
                    ? at.success(a, { id: n, ...r, ...(null == r ? void 0 : r.success) })
                    : at.dismiss(n),
                  e
                );
              })
              .catch((e) => {
                let a = t.error ? Ye(t.error, e) : void 0;
                a ? at.error(a, { id: n, ...r, ...(null == r ? void 0 : r.error) }) : at.dismiss(n);
              }),
            e
          );
        }));
      var st = (e, t) => {
          tt({ type: 1, toast: { id: e, height: t } });
        },
        ot = () => {
          tt({ type: 5, time: Date.now() });
        },
        it = new Map(),
        lt = (e) => {
          let { toasts: t, pausedAt: r } = (function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              [t, r] = (0, n.useState)(et),
              a = (0, n.useRef)(et);
            (0, n.useEffect)(
              () => (
                a.current !== et && r(et),
                Xe.push(r),
                () => {
                  let e = Xe.indexOf(r);
                  e > -1 && Xe.splice(e, 1);
                }
              ),
              []
            );
            let s = t.toasts.map((t) => {
              var r, n, a;
              return {
                ...e,
                ...e[t.type],
                ...t,
                removeDelay:
                  t.removeDelay ||
                  (null == (r = e[t.type]) ? void 0 : r.removeDelay) ||
                  (null == e ? void 0 : e.removeDelay),
                duration:
                  t.duration ||
                  (null == (n = e[t.type]) ? void 0 : n.duration) ||
                  (null == e ? void 0 : e.duration) ||
                  rt[t.type],
                style: { ...e.style, ...(null == (a = e[t.type]) ? void 0 : a.style), ...t.style },
              };
            });
            return { ...t, toasts: s };
          })(e);
          (0, n.useEffect)(() => {
            if (r) return;
            let e = Date.now(),
              n = t.map((t) => {
                if (t.duration === 1 / 0) return;
                let r = (t.duration || 0) + t.pauseDuration - (e - t.createdAt);
                if (!(r < 0)) return setTimeout(() => at.dismiss(t.id), r);
                t.visible && at.dismiss(t.id);
              });
            return () => {
              n.forEach((e) => e && clearTimeout(e));
            };
          }, [t, r]);
          let a = (0, n.useCallback)(() => {
              r && tt({ type: 6, time: Date.now() });
            }, [r]),
            s = (0, n.useCallback)(
              (e, r) => {
                let { reverseOrder: n = !1, gutter: a = 8, defaultPosition: s } = r || {},
                  o = t.filter((t) => (t.position || s) === (e.position || s) && t.height),
                  i = o.findIndex((t) => t.id === e.id),
                  l = o.filter((e, t) => t < i && e.visible).length;
                return o
                  .filter((e) => e.visible)
                  .slice(...(n ? [l + 1] : [0, l]))
                  .reduce((e, t) => e + (t.height || 0) + a, 0);
              },
              [t]
            );
          return (
            (0, n.useEffect)(() => {
              t.forEach((e) => {
                if (e.dismissed)
                  !(function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
                    if (it.has(e)) return;
                    let r = setTimeout(() => {
                      (it.delete(e), tt({ type: 4, toastId: e }));
                    }, t);
                    it.set(e, r);
                  })(e.id, e.removeDelay);
                else {
                  let t = it.get(e.id);
                  t && (clearTimeout(t), it.delete(e.id));
                }
              });
            }, [t]),
            {
              toasts: t,
              handlers: { updateHeight: st, startPause: ot, endPause: a, calculateOffset: s },
            }
          );
        },
        ct = Ge`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,
        ut = Ge`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
        dt = Ge`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,
        mt = Qe('div')`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || '#ff4b4b'};
  position: relative;
  transform: rotate(45deg);

  animation: ${ct} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ut} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e) => e.secondary || '#fff'};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${dt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,
        ft = Ge`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,
        pt = Qe('div')`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e) => e.secondary || '#e0e0e0'};
  border-right-color: ${(e) => e.primary || '#616161'};
  animation: ${ft} 1s linear infinite;
`,
        ht = Ge`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,
        gt = Ge`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,
        xt = Qe('div')`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e) => e.primary || '#61d345'};
  position: relative;
  transform: rotate(45deg);

  animation: ${ht} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${gt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e) => e.secondary || '#fff'};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,
        yt = Qe('div')`
  position: absolute;
`,
        vt = Qe('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,
        bt = Ge`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
        wt = Qe('div')`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${bt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,
        jt = (e) => {
          let { toast: t } = e,
            { icon: r, type: a, iconTheme: s } = t;
          return void 0 !== r
            ? 'string' == typeof r
              ? n.createElement(wt, null, r)
              : r
            : 'blank' === a
              ? null
              : n.createElement(
                  vt,
                  null,
                  n.createElement(pt, { ...s }),
                  'loading' !== a &&
                    n.createElement(
                      yt,
                      null,
                      'error' === a ? n.createElement(mt, { ...s }) : n.createElement(xt, { ...s })
                    )
                );
        },
        kt = (e) =>
          `\n0% {transform: translate3d(0,${-200 * e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,
        Nt = (e) =>
          `\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150 * e}%,-1px) scale(.6); opacity:0;}\n`,
        St = Qe('div')`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,
        Et = Qe('div')`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,
        Ct = n.memo((e) => {
          let { toast: t, position: r, style: a, children: s } = e,
            o = t.height
              ? ((e, t) => {
                  let r = e.includes('top') ? 1 : -1,
                    [n, a] = Ze()
                      ? ['0%{opacity:0;} 100%{opacity:1;}', '0%{opacity:1;} 100%{opacity:0;}']
                      : [kt(r), Nt(r)];
                  return {
                    animation: t
                      ? `${Ge(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
                      : `${Ge(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
                  };
                })(t.position || r || 'top-center', t.visible)
              : { opacity: 0 },
            i = n.createElement(jt, { toast: t }),
            l = n.createElement(Et, { ...t.ariaProps }, Ye(t.message, t));
          return n.createElement(
            St,
            { className: t.className, style: { ...o, ...a, ...t.style } },
            'function' == typeof s
              ? s({ icon: i, message: l })
              : n.createElement(n.Fragment, null, i, l)
          );
        });
      !(function (e, t, r, n) {
        ((De.p = t), (He = e), (qe = r), (Ve = n));
      })(n.createElement);
      var Pt = (e) => {
          let { id: t, className: r, style: a, onHeightUpdate: s, children: o } = e,
            i = n.useCallback(
              (e) => {
                if (e) {
                  let r = () => {
                    let r = e.getBoundingClientRect().height;
                    s(t, r);
                  };
                  (r(),
                    new MutationObserver(r).observe(e, {
                      subtree: !0,
                      childList: !0,
                      characterData: !0,
                    }));
                }
              },
              [t, s]
            );
          return n.createElement('div', { ref: i, className: r, style: a }, o);
        },
        _t = $e`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,
        Ot = (e) => {
          let {
              reverseOrder: t,
              position: r = 'top-center',
              toastOptions: a,
              gutter: s,
              children: o,
              containerStyle: i,
              containerClassName: l,
            } = e,
            { toasts: c, handlers: u } = lt(a);
          return n.createElement(
            'div',
            {
              id: '_rht_toaster',
              style: {
                position: 'fixed',
                zIndex: 9999,
                top: 16,
                left: 16,
                right: 16,
                bottom: 16,
                pointerEvents: 'none',
                ...i,
              },
              className: l,
              onMouseEnter: u.startPause,
              onMouseLeave: u.endPause,
            },
            c.map((e) => {
              let a = e.position || r,
                i = ((e, t) => {
                  let r = e.includes('top'),
                    n = r ? { top: 0 } : { bottom: 0 },
                    a = e.includes('center')
                      ? { justifyContent: 'center' }
                      : e.includes('right')
                        ? { justifyContent: 'flex-end' }
                        : {};
                  return {
                    left: 0,
                    right: 0,
                    display: 'flex',
                    position: 'absolute',
                    transition: Ze() ? void 0 : 'all 230ms cubic-bezier(.21,1.02,.73,1)',
                    transform: `translateY(${t * (r ? 1 : -1)}px)`,
                    ...n,
                    ...a,
                  };
                })(a, u.calculateOffset(e, { reverseOrder: t, gutter: s, defaultPosition: r }));
              return n.createElement(
                Pt,
                {
                  id: e.id,
                  key: e.id,
                  onHeightUpdate: u.updateHeight,
                  className: e.visible ? _t : '',
                  style: i,
                },
                'custom' === e.type
                  ? Ye(e.message, e)
                  : o
                    ? o(e)
                    : n.createElement(Ct, { toast: e, position: a })
              );
            })
          );
        },
        Rt = at;
      function Tt(e, t) {
        return function () {
          return e.apply(t, arguments);
        };
      }
      const { toString: Lt } = Object.prototype,
        { getPrototypeOf: At } = Object,
        { iterator: zt, toStringTag: Ft } = Symbol,
        Mt =
          ((It = Object.create(null)),
          (e) => {
            const t = Lt.call(e);
            return It[t] || (It[t] = t.slice(8, -1).toLowerCase());
          });
      var It;
      const Dt = (e) => ((e = e.toLowerCase()), (t) => Mt(t) === e),
        Ut = (e) => (t) => typeof t === e,
        { isArray: Bt } = Array,
        Wt = Ut('undefined');
      const $t = Dt('ArrayBuffer');
      const Ht = Ut('string'),
        qt = Ut('function'),
        Vt = Ut('number'),
        Gt = (e) => null !== e && 'object' === typeof e,
        Qt = (e) => {
          if ('object' !== Mt(e)) return !1;
          const t = At(e);
          return (
            (null === t || t === Object.prototype || null === Object.getPrototypeOf(t)) &&
            !(Ft in e) &&
            !(zt in e)
          );
        },
        Yt = Dt('Date'),
        Kt = Dt('File'),
        Zt = Dt('Blob'),
        Jt = Dt('FileList'),
        Xt = Dt('URLSearchParams'),
        [er, tr, rr, nr] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(Dt);
      function ar(e, t) {
        let r,
          n,
          { allOwnKeys: a = !1 } =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (null !== e && 'undefined' !== typeof e)
          if (('object' !== typeof e && (e = [e]), Bt(e)))
            for (r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e);
          else {
            const n = a ? Object.getOwnPropertyNames(e) : Object.keys(e),
              s = n.length;
            let o;
            for (r = 0; r < s; r++) ((o = n[r]), t.call(null, e[o], o, e));
          }
      }
      function sr(e, t) {
        t = t.toLowerCase();
        const r = Object.keys(e);
        let n,
          a = r.length;
        for (; a-- > 0; ) if (((n = r[a]), t === n.toLowerCase())) return n;
        return null;
      }
      const or =
          'undefined' !== typeof globalThis
            ? globalThis
            : 'undefined' !== typeof self
              ? self
              : 'undefined' !== typeof window
                ? window
                : global,
        ir = (e) => !Wt(e) && e !== or;
      const lr =
        ((cr = 'undefined' !== typeof Uint8Array && At(Uint8Array)), (e) => cr && e instanceof cr);
      var cr;
      const ur = Dt('HTMLFormElement'),
        dr = ((e) => {
          let { hasOwnProperty: t } = e;
          return (e, r) => t.call(e, r);
        })(Object.prototype),
        mr = Dt('RegExp'),
        fr = (e, t) => {
          const r = Object.getOwnPropertyDescriptors(e),
            n = {};
          (ar(r, (r, a) => {
            let s;
            !1 !== (s = t(r, a, e)) && (n[a] = s || r);
          }),
            Object.defineProperties(e, n));
        };
      const pr = Dt('AsyncFunction'),
        hr = ((e, t) => {
          return e
            ? setImmediate
            : t
              ? ((r = `axios@${Math.random()}`),
                (n = []),
                or.addEventListener(
                  'message',
                  (e) => {
                    let { source: t, data: a } = e;
                    t === or && a === r && n.length && n.shift()();
                  },
                  !1
                ),
                (e) => {
                  (n.push(e), or.postMessage(r, '*'));
                })
              : (e) => setTimeout(e);
          var r, n;
        })('function' === typeof setImmediate, qt(or.postMessage)),
        gr =
          'undefined' !== typeof queueMicrotask
            ? queueMicrotask.bind(or)
            : ('undefined' !== typeof process && process.nextTick) || hr,
        xr = {
          isArray: Bt,
          isArrayBuffer: $t,
          isBuffer: function (e) {
            return (
              null !== e &&
              !Wt(e) &&
              null !== e.constructor &&
              !Wt(e.constructor) &&
              qt(e.constructor.isBuffer) &&
              e.constructor.isBuffer(e)
            );
          },
          isFormData: (e) => {
            let t;
            return (
              e &&
              (('function' === typeof FormData && e instanceof FormData) ||
                (qt(e.append) &&
                  ('formdata' === (t = Mt(e)) ||
                    ('object' === t && qt(e.toString) && '[object FormData]' === e.toString()))))
            );
          },
          isArrayBufferView: function (e) {
            let t;
            return (
              (t =
                'undefined' !== typeof ArrayBuffer && ArrayBuffer.isView
                  ? ArrayBuffer.isView(e)
                  : e && e.buffer && $t(e.buffer)),
              t
            );
          },
          isString: Ht,
          isNumber: Vt,
          isBoolean: (e) => !0 === e || !1 === e,
          isObject: Gt,
          isPlainObject: Qt,
          isReadableStream: er,
          isRequest: tr,
          isResponse: rr,
          isHeaders: nr,
          isUndefined: Wt,
          isDate: Yt,
          isFile: Kt,
          isBlob: Zt,
          isRegExp: mr,
          isFunction: qt,
          isStream: (e) => Gt(e) && qt(e.pipe),
          isURLSearchParams: Xt,
          isTypedArray: lr,
          isFileList: Jt,
          forEach: ar,
          merge: function e() {
            const { caseless: t } = (ir(this) && this) || {},
              r = {},
              n = (n, a) => {
                const s = (t && sr(r, a)) || a;
                Qt(r[s]) && Qt(n)
                  ? (r[s] = e(r[s], n))
                  : Qt(n)
                    ? (r[s] = e({}, n))
                    : Bt(n)
                      ? (r[s] = n.slice())
                      : (r[s] = n);
              };
            for (let a = 0, s = arguments.length; a < s; a++) arguments[a] && ar(arguments[a], n);
            return r;
          },
          extend: function (e, t, r) {
            let { allOwnKeys: n } =
              arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            return (
              ar(
                t,
                (t, n) => {
                  r && qt(t) ? (e[n] = Tt(t, r)) : (e[n] = t);
                },
                { allOwnKeys: n }
              ),
              e
            );
          },
          trim: (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')),
          stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
          inherits: (e, t, r, n) => {
            ((e.prototype = Object.create(t.prototype, n)),
              (e.prototype.constructor = e),
              Object.defineProperty(e, 'super', { value: t.prototype }),
              r && Object.assign(e.prototype, r));
          },
          toFlatObject: (e, t, r, n) => {
            let a, s, o;
            const i = {};
            if (((t = t || {}), null == e)) return t;
            do {
              for (a = Object.getOwnPropertyNames(e), s = a.length; s-- > 0; )
                ((o = a[s]), (n && !n(o, e, t)) || i[o] || ((t[o] = e[o]), (i[o] = !0)));
              e = !1 !== r && At(e);
            } while (e && (!r || r(e, t)) && e !== Object.prototype);
            return t;
          },
          kindOf: Mt,
          kindOfTest: Dt,
          endsWith: (e, t, r) => {
            ((e = String(e)), (void 0 === r || r > e.length) && (r = e.length), (r -= t.length));
            const n = e.indexOf(t, r);
            return -1 !== n && n === r;
          },
          toArray: (e) => {
            if (!e) return null;
            if (Bt(e)) return e;
            let t = e.length;
            if (!Vt(t)) return null;
            const r = new Array(t);
            for (; t-- > 0; ) r[t] = e[t];
            return r;
          },
          forEachEntry: (e, t) => {
            const r = (e && e[zt]).call(e);
            let n;
            for (; (n = r.next()) && !n.done; ) {
              const r = n.value;
              t.call(e, r[0], r[1]);
            }
          },
          matchAll: (e, t) => {
            let r;
            const n = [];
            for (; null !== (r = e.exec(t)); ) n.push(r);
            return n;
          },
          isHTMLForm: ur,
          hasOwnProperty: dr,
          hasOwnProp: dr,
          reduceDescriptors: fr,
          freezeMethods: (e) => {
            fr(e, (t, r) => {
              if (qt(e) && -1 !== ['arguments', 'caller', 'callee'].indexOf(r)) return !1;
              const n = e[r];
              qt(n) &&
                ((t.enumerable = !1),
                'writable' in t
                  ? (t.writable = !1)
                  : t.set ||
                    (t.set = () => {
                      throw Error("Can not rewrite read-only method '" + r + "'");
                    }));
            });
          },
          toObjectSet: (e, t) => {
            const r = {},
              n = (e) => {
                e.forEach((e) => {
                  r[e] = !0;
                });
              };
            return (Bt(e) ? n(e) : n(String(e).split(t)), r);
          },
          toCamelCase: (e) =>
            e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, r) {
              return t.toUpperCase() + r;
            }),
          noop: () => {},
          toFiniteNumber: (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
          findKey: sr,
          global: or,
          isContextDefined: ir,
          isSpecCompliantForm: function (e) {
            return !!(e && qt(e.append) && 'FormData' === e[Ft] && e[zt]);
          },
          toJSONObject: (e) => {
            const t = new Array(10),
              r = (e, n) => {
                if (Gt(e)) {
                  if (t.indexOf(e) >= 0) return;
                  if (!('toJSON' in e)) {
                    t[n] = e;
                    const a = Bt(e) ? [] : {};
                    return (
                      ar(e, (e, t) => {
                        const s = r(e, n + 1);
                        !Wt(s) && (a[t] = s);
                      }),
                      (t[n] = void 0),
                      a
                    );
                  }
                }
                return e;
              };
            return r(e, 0);
          },
          isAsyncFn: pr,
          isThenable: (e) => e && (Gt(e) || qt(e)) && qt(e.then) && qt(e.catch),
          setImmediate: hr,
          asap: gr,
          isIterable: (e) => null != e && qt(e[zt]),
        };
      function yr(e, t, r, n, a) {
        (Error.call(this),
          Error.captureStackTrace
            ? Error.captureStackTrace(this, this.constructor)
            : (this.stack = new Error().stack),
          (this.message = e),
          (this.name = 'AxiosError'),
          t && (this.code = t),
          r && (this.config = r),
          n && (this.request = n),
          a && ((this.response = a), (this.status = a.status ? a.status : null)));
      }
      xr.inherits(yr, Error, {
        toJSON: function () {
          return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: xr.toJSONObject(this.config),
            code: this.code,
            status: this.status,
          };
        },
      });
      const vr = yr.prototype,
        br = {};
      ([
        'ERR_BAD_OPTION_VALUE',
        'ERR_BAD_OPTION',
        'ECONNABORTED',
        'ETIMEDOUT',
        'ERR_NETWORK',
        'ERR_FR_TOO_MANY_REDIRECTS',
        'ERR_DEPRECATED',
        'ERR_BAD_RESPONSE',
        'ERR_BAD_REQUEST',
        'ERR_CANCELED',
        'ERR_NOT_SUPPORT',
        'ERR_INVALID_URL',
      ].forEach((e) => {
        br[e] = { value: e };
      }),
        Object.defineProperties(yr, br),
        Object.defineProperty(vr, 'isAxiosError', { value: !0 }),
        (yr.from = (e, t, r, n, a, s) => {
          const o = Object.create(vr);
          return (
            xr.toFlatObject(
              e,
              o,
              function (e) {
                return e !== Error.prototype;
              },
              (e) => 'isAxiosError' !== e
            ),
            yr.call(o, e.message, t, r, n, a),
            (o.cause = e),
            (o.name = e.name),
            s && Object.assign(o, s),
            o
          );
        }));
      const wr = yr;
      function jr(e) {
        return xr.isPlainObject(e) || xr.isArray(e);
      }
      function kr(e) {
        return xr.endsWith(e, '[]') ? e.slice(0, -2) : e;
      }
      function Nr(e, t, r) {
        return e
          ? e
              .concat(t)
              .map(function (e, t) {
                return ((e = kr(e)), !r && t ? '[' + e + ']' : e);
              })
              .join(r ? '.' : '')
          : t;
      }
      const Sr = xr.toFlatObject(xr, {}, null, function (e) {
        return /^is[A-Z]/.test(e);
      });
      const Er = function (e, t, r) {
        if (!xr.isObject(e)) throw new TypeError('target must be an object');
        t = t || new FormData();
        const n = (r = xr.toFlatObject(
            r,
            { metaTokens: !0, dots: !1, indexes: !1 },
            !1,
            function (e, t) {
              return !xr.isUndefined(t[e]);
            }
          )).metaTokens,
          a = r.visitor || c,
          s = r.dots,
          o = r.indexes,
          i = (r.Blob || ('undefined' !== typeof Blob && Blob)) && xr.isSpecCompliantForm(t);
        if (!xr.isFunction(a)) throw new TypeError('visitor must be a function');
        function l(e) {
          if (null === e) return '';
          if (xr.isDate(e)) return e.toISOString();
          if (xr.isBoolean(e)) return e.toString();
          if (!i && xr.isBlob(e)) throw new wr('Blob is not supported. Use a Buffer instead.');
          return xr.isArrayBuffer(e) || xr.isTypedArray(e)
            ? i && 'function' === typeof Blob
              ? new Blob([e])
              : Buffer.from(e)
            : e;
        }
        function c(e, r, a) {
          let i = e;
          if (e && !a && 'object' === typeof e)
            if (xr.endsWith(r, '{}')) ((r = n ? r : r.slice(0, -2)), (e = JSON.stringify(e)));
            else if (
              (xr.isArray(e) &&
                (function (e) {
                  return xr.isArray(e) && !e.some(jr);
                })(e)) ||
              ((xr.isFileList(e) || xr.endsWith(r, '[]')) && (i = xr.toArray(e)))
            )
              return (
                (r = kr(r)),
                i.forEach(function (e, n) {
                  !xr.isUndefined(e) &&
                    null !== e &&
                    t.append(!0 === o ? Nr([r], n, s) : null === o ? r : r + '[]', l(e));
                }),
                !1
              );
          return !!jr(e) || (t.append(Nr(a, r, s), l(e)), !1);
        }
        const u = [],
          d = Object.assign(Sr, { defaultVisitor: c, convertValue: l, isVisitable: jr });
        if (!xr.isObject(e)) throw new TypeError('data must be an object');
        return (
          (function e(r, n) {
            if (!xr.isUndefined(r)) {
              if (-1 !== u.indexOf(r)) throw Error('Circular reference detected in ' + n.join('.'));
              (u.push(r),
                xr.forEach(r, function (r, s) {
                  !0 ===
                    (!(xr.isUndefined(r) || null === r) &&
                      a.call(t, r, xr.isString(s) ? s.trim() : s, n, d)) &&
                    e(r, n ? n.concat(s) : [s]);
                }),
                u.pop());
            }
          })(e),
          t
        );
      };
      function Cr(e) {
        const t = {
          '!': '%21',
          "'": '%27',
          '(': '%28',
          ')': '%29',
          '~': '%7E',
          '%20': '+',
          '%00': '\0',
        };
        return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
          return t[e];
        });
      }
      function Pr(e, t) {
        ((this._pairs = []), e && Er(e, this, t));
      }
      const _r = Pr.prototype;
      ((_r.append = function (e, t) {
        this._pairs.push([e, t]);
      }),
        (_r.toString = function (e) {
          const t = e
            ? function (t) {
                return e.call(this, t, Cr);
              }
            : Cr;
          return this._pairs
            .map(function (e) {
              return t(e[0]) + '=' + t(e[1]);
            }, '')
            .join('&');
        }));
      const Or = Pr;
      function Rr(e) {
        return encodeURIComponent(e)
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
      }
      function Tr(e, t, r) {
        if (!t) return e;
        const n = (r && r.encode) || Rr;
        xr.isFunction(r) && (r = { serialize: r });
        const a = r && r.serialize;
        let s;
        if (
          ((s = a ? a(t, r) : xr.isURLSearchParams(t) ? t.toString() : new Or(t, r).toString(n)), s)
        ) {
          const t = e.indexOf('#');
          (-1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf('?') ? '?' : '&') + s));
        }
        return e;
      }
      const Lr = class {
          constructor() {
            this.handlers = [];
          }
          use(e, t, r) {
            return (
              this.handlers.push({
                fulfilled: e,
                rejected: t,
                synchronous: !!r && r.synchronous,
                runWhen: r ? r.runWhen : null,
              }),
              this.handlers.length - 1
            );
          }
          eject(e) {
            this.handlers[e] && (this.handlers[e] = null);
          }
          clear() {
            this.handlers && (this.handlers = []);
          }
          forEach(e) {
            xr.forEach(this.handlers, function (t) {
              null !== t && e(t);
            });
          }
        },
        Ar = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
        zr = {
          isBrowser: !0,
          classes: {
            URLSearchParams: 'undefined' !== typeof URLSearchParams ? URLSearchParams : Or,
            FormData: 'undefined' !== typeof FormData ? FormData : null,
            Blob: 'undefined' !== typeof Blob ? Blob : null,
          },
          protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
        },
        Fr = 'undefined' !== typeof window && 'undefined' !== typeof document,
        Mr = ('object' === typeof navigator && navigator) || void 0,
        Ir = Fr && (!Mr || ['ReactNative', 'NativeScript', 'NS'].indexOf(Mr.product) < 0),
        Dr =
          'undefined' !== typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          'function' === typeof self.importScripts,
        Ur = (Fr && window.location.href) || 'http://localhost',
        Br = { ...e, ...zr };
      const Wr = function (e) {
        function t(e, r, n, a) {
          let s = e[a++];
          if ('__proto__' === s) return !0;
          const o = Number.isFinite(+s),
            i = a >= e.length;
          if (((s = !s && xr.isArray(n) ? n.length : s), i))
            return (xr.hasOwnProp(n, s) ? (n[s] = [n[s], r]) : (n[s] = r), !o);
          (n[s] && xr.isObject(n[s])) || (n[s] = []);
          return (
            t(e, r, n[s], a) &&
              xr.isArray(n[s]) &&
              (n[s] = (function (e) {
                const t = {},
                  r = Object.keys(e);
                let n;
                const a = r.length;
                let s;
                for (n = 0; n < a; n++) ((s = r[n]), (t[s] = e[s]));
                return t;
              })(n[s])),
            !o
          );
        }
        if (xr.isFormData(e) && xr.isFunction(e.entries)) {
          const r = {};
          return (
            xr.forEachEntry(e, (e, n) => {
              t(
                (function (e) {
                  return xr
                    .matchAll(/\w+|\[(\w*)]/g, e)
                    .map((e) => ('[]' === e[0] ? '' : e[1] || e[0]));
                })(e),
                n,
                r,
                0
              );
            }),
            r
          );
        }
        return null;
      };
      const $r = {
        transitional: Ar,
        adapter: ['xhr', 'http', 'fetch'],
        transformRequest: [
          function (e, t) {
            const r = t.getContentType() || '',
              n = r.indexOf('application/json') > -1,
              a = xr.isObject(e);
            a && xr.isHTMLForm(e) && (e = new FormData(e));
            if (xr.isFormData(e)) return n ? JSON.stringify(Wr(e)) : e;
            if (
              xr.isArrayBuffer(e) ||
              xr.isBuffer(e) ||
              xr.isStream(e) ||
              xr.isFile(e) ||
              xr.isBlob(e) ||
              xr.isReadableStream(e)
            )
              return e;
            if (xr.isArrayBufferView(e)) return e.buffer;
            if (xr.isURLSearchParams(e))
              return (
                t.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1),
                e.toString()
              );
            let s;
            if (a) {
              if (r.indexOf('application/x-www-form-urlencoded') > -1)
                return (function (e, t) {
                  return Er(
                    e,
                    new Br.classes.URLSearchParams(),
                    Object.assign(
                      {
                        visitor: function (e, t, r, n) {
                          return Br.isNode && xr.isBuffer(e)
                            ? (this.append(t, e.toString('base64')), !1)
                            : n.defaultVisitor.apply(this, arguments);
                        },
                      },
                      t
                    )
                  );
                })(e, this.formSerializer).toString();
              if ((s = xr.isFileList(e)) || r.indexOf('multipart/form-data') > -1) {
                const t = this.env && this.env.FormData;
                return Er(s ? { 'files[]': e } : e, t && new t(), this.formSerializer);
              }
            }
            return a || n
              ? (t.setContentType('application/json', !1),
                (function (e, t, r) {
                  if (xr.isString(e))
                    try {
                      return ((t || JSON.parse)(e), xr.trim(e));
                    } catch (Ae) {
                      if ('SyntaxError' !== Ae.name) throw Ae;
                    }
                  return (r || JSON.stringify)(e);
                })(e))
              : e;
          },
        ],
        transformResponse: [
          function (e) {
            const t = this.transitional || $r.transitional,
              r = t && t.forcedJSONParsing,
              n = 'json' === this.responseType;
            if (xr.isResponse(e) || xr.isReadableStream(e)) return e;
            if (e && xr.isString(e) && ((r && !this.responseType) || n)) {
              const r = !(t && t.silentJSONParsing) && n;
              try {
                return JSON.parse(e);
              } catch (Ae) {
                if (r) {
                  if ('SyntaxError' === Ae.name)
                    throw wr.from(Ae, wr.ERR_BAD_RESPONSE, this, null, this.response);
                  throw Ae;
                }
              }
            }
            return e;
          },
        ],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        env: { FormData: Br.classes.FormData, Blob: Br.classes.Blob },
        validateStatus: function (e) {
          return e >= 200 && e < 300;
        },
        headers: {
          common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 },
        },
      };
      xr.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
        $r.headers[e] = {};
      });
      const Hr = $r,
        qr = xr.toObjectSet([
          'age',
          'authorization',
          'content-length',
          'content-type',
          'etag',
          'expires',
          'from',
          'host',
          'if-modified-since',
          'if-unmodified-since',
          'last-modified',
          'location',
          'max-forwards',
          'proxy-authorization',
          'referer',
          'retry-after',
          'user-agent',
        ]),
        Vr = Symbol('internals');
      function Gr(e) {
        return e && String(e).trim().toLowerCase();
      }
      function Qr(e) {
        return !1 === e || null == e ? e : xr.isArray(e) ? e.map(Qr) : String(e);
      }
      function Yr(e, t, r, n, a) {
        return xr.isFunction(n)
          ? n.call(this, t, r)
          : (a && (t = r),
            xr.isString(t)
              ? xr.isString(n)
                ? -1 !== t.indexOf(n)
                : xr.isRegExp(n)
                  ? n.test(t)
                  : void 0
              : void 0);
      }
      class Kr {
        constructor(e) {
          e && this.set(e);
        }
        set(e, t, r) {
          const n = this;
          function a(e, t, r) {
            const a = Gr(t);
            if (!a) throw new Error('header name must be a non-empty string');
            const s = xr.findKey(n, a);
            (!s || void 0 === n[s] || !0 === r || (void 0 === r && !1 !== n[s])) &&
              (n[s || t] = Qr(e));
          }
          const s = (e, t) => xr.forEach(e, (e, r) => a(e, r, t));
          if (xr.isPlainObject(e) || e instanceof this.constructor) s(e, t);
          else if (
            xr.isString(e) &&
            (e = e.trim()) &&
            !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
          )
            s(
              ((e) => {
                const t = {};
                let r, n, a;
                return (
                  e &&
                    e.split('\n').forEach(function (e) {
                      ((a = e.indexOf(':')),
                        (r = e.substring(0, a).trim().toLowerCase()),
                        (n = e.substring(a + 1).trim()),
                        !r ||
                          (t[r] && qr[r]) ||
                          ('set-cookie' === r
                            ? t[r]
                              ? t[r].push(n)
                              : (t[r] = [n])
                            : (t[r] = t[r] ? t[r] + ', ' + n : n)));
                    }),
                  t
                );
              })(e),
              t
            );
          else if (xr.isObject(e) && xr.isIterable(e)) {
            let r,
              n,
              a = {};
            for (const t of e) {
              if (!xr.isArray(t)) throw TypeError('Object iterator must return a key-value pair');
              a[(n = t[0])] = (r = a[n]) ? (xr.isArray(r) ? [...r, t[1]] : [r, t[1]]) : t[1];
            }
            s(a, t);
          } else null != e && a(t, e, r);
          return this;
        }
        get(e, t) {
          if ((e = Gr(e))) {
            const r = xr.findKey(this, e);
            if (r) {
              const e = this[r];
              if (!t) return e;
              if (!0 === t)
                return (function (e) {
                  const t = Object.create(null),
                    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                  let n;
                  for (; (n = r.exec(e)); ) t[n[1]] = n[2];
                  return t;
                })(e);
              if (xr.isFunction(t)) return t.call(this, e, r);
              if (xr.isRegExp(t)) return t.exec(e);
              throw new TypeError('parser must be boolean|regexp|function');
            }
          }
        }
        has(e, t) {
          if ((e = Gr(e))) {
            const r = xr.findKey(this, e);
            return !(!r || void 0 === this[r] || (t && !Yr(0, this[r], r, t)));
          }
          return !1;
        }
        delete(e, t) {
          const r = this;
          let n = !1;
          function a(e) {
            if ((e = Gr(e))) {
              const a = xr.findKey(r, e);
              !a || (t && !Yr(0, r[a], a, t)) || (delete r[a], (n = !0));
            }
          }
          return (xr.isArray(e) ? e.forEach(a) : a(e), n);
        }
        clear(e) {
          const t = Object.keys(this);
          let r = t.length,
            n = !1;
          for (; r--; ) {
            const a = t[r];
            (e && !Yr(0, this[a], a, e, !0)) || (delete this[a], (n = !0));
          }
          return n;
        }
        normalize(e) {
          const t = this,
            r = {};
          return (
            xr.forEach(this, (n, a) => {
              const s = xr.findKey(r, a);
              if (s) return ((t[s] = Qr(n)), void delete t[a]);
              const o = e
                ? (function (e) {
                    return e
                      .trim()
                      .toLowerCase()
                      .replace(/([a-z\d])(\w*)/g, (e, t, r) => t.toUpperCase() + r);
                  })(a)
                : String(a).trim();
              (o !== a && delete t[a], (t[o] = Qr(n)), (r[o] = !0));
            }),
            this
          );
        }
        concat() {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          return this.constructor.concat(this, ...t);
        }
        toJSON(e) {
          const t = Object.create(null);
          return (
            xr.forEach(this, (r, n) => {
              null != r && !1 !== r && (t[n] = e && xr.isArray(r) ? r.join(', ') : r);
            }),
            t
          );
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON())
            .map((e) => {
              let [t, r] = e;
              return t + ': ' + r;
            })
            .join('\n');
        }
        getSetCookie() {
          return this.get('set-cookie') || [];
        }
        get [Symbol.toStringTag]() {
          return 'AxiosHeaders';
        }
        static from(e) {
          return e instanceof this ? e : new this(e);
        }
        static concat(e) {
          const t = new this(e);
          for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            n[a - 1] = arguments[a];
          return (n.forEach((e) => t.set(e)), t);
        }
        static accessor(e) {
          const t = (this[Vr] = this[Vr] = { accessors: {} }).accessors,
            r = this.prototype;
          function n(e) {
            const n = Gr(e);
            t[n] ||
              (!(function (e, t) {
                const r = xr.toCamelCase(' ' + t);
                ['get', 'set', 'has'].forEach((n) => {
                  Object.defineProperty(e, n + r, {
                    value: function (e, r, a) {
                      return this[n].call(this, t, e, r, a);
                    },
                    configurable: !0,
                  });
                });
              })(r, e),
              (t[n] = !0));
          }
          return (xr.isArray(e) ? e.forEach(n) : n(e), this);
        }
      }
      (Kr.accessor([
        'Content-Type',
        'Content-Length',
        'Accept',
        'Accept-Encoding',
        'User-Agent',
        'Authorization',
      ]),
        xr.reduceDescriptors(Kr.prototype, (e, t) => {
          let { value: r } = e,
            n = t[0].toUpperCase() + t.slice(1);
          return {
            get: () => r,
            set(e) {
              this[n] = e;
            },
          };
        }),
        xr.freezeMethods(Kr));
      const Zr = Kr;
      function Jr(e, t) {
        const r = this || Hr,
          n = t || r,
          a = Zr.from(n.headers);
        let s = n.data;
        return (
          xr.forEach(e, function (e) {
            s = e.call(r, s, a.normalize(), t ? t.status : void 0);
          }),
          a.normalize(),
          s
        );
      }
      function Xr(e) {
        return !(!e || !e.__CANCEL__);
      }
      function en(e, t, r) {
        (wr.call(this, null == e ? 'canceled' : e, wr.ERR_CANCELED, t, r),
          (this.name = 'CanceledError'));
      }
      xr.inherits(en, wr, { __CANCEL__: !0 });
      const tn = en;
      function rn(e, t, r) {
        const n = r.config.validateStatus;
        r.status && n && !n(r.status)
          ? t(
              new wr(
                'Request failed with status code ' + r.status,
                [wr.ERR_BAD_REQUEST, wr.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
                r.config,
                r.request,
                r
              )
            )
          : e(r);
      }
      const nn = function (e, t) {
        e = e || 10;
        const r = new Array(e),
          n = new Array(e);
        let a,
          s = 0,
          o = 0;
        return (
          (t = void 0 !== t ? t : 1e3),
          function (i) {
            const l = Date.now(),
              c = n[o];
            (a || (a = l), (r[s] = i), (n[s] = l));
            let u = o,
              d = 0;
            for (; u !== s; ) ((d += r[u++]), (u %= e));
            if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), l - a < t)) return;
            const m = c && l - c;
            return m ? Math.round((1e3 * d) / m) : void 0;
          }
        );
      };
      const an = function (e, t) {
          let r,
            n,
            a = 0,
            s = 1e3 / t;
          const o = function (t) {
            let s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Date.now();
            ((a = s), (r = null), n && (clearTimeout(n), (n = null)), e.apply(null, t));
          };
          return [
            function () {
              const e = Date.now(),
                t = e - a;
              for (var i = arguments.length, l = new Array(i), c = 0; c < i; c++)
                l[c] = arguments[c];
              t >= s
                ? o(l, e)
                : ((r = l),
                  n ||
                    (n = setTimeout(() => {
                      ((n = null), o(r));
                    }, s - t)));
            },
            () => r && o(r),
          ];
        },
        sn = function (e, t) {
          let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3,
            n = 0;
          const a = nn(50, 250);
          return an((r) => {
            const s = r.loaded,
              o = r.lengthComputable ? r.total : void 0,
              i = s - n,
              l = a(i);
            n = s;
            e({
              loaded: s,
              total: o,
              progress: o ? s / o : void 0,
              bytes: i,
              rate: l || void 0,
              estimated: l && o && s <= o ? (o - s) / l : void 0,
              event: r,
              lengthComputable: null != o,
              [t ? 'download' : 'upload']: !0,
            });
          }, r);
        },
        on = (e, t) => {
          const r = null != e;
          return [(n) => t[0]({ lengthComputable: r, total: e, loaded: n }), t[1]];
        },
        ln = (e) =>
          function () {
            for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
            return xr.asap(() => e(...r));
          },
        cn = Br.hasStandardBrowserEnv
          ? ((e, t) => (r) => (
              (r = new URL(r, Br.origin)),
              e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)
            ))(new URL(Br.origin), Br.navigator && /(msie|trident)/i.test(Br.navigator.userAgent))
          : () => !0,
        un = Br.hasStandardBrowserEnv
          ? {
              write(e, t, r, n, a, s) {
                const o = [e + '=' + encodeURIComponent(t)];
                (xr.isNumber(r) && o.push('expires=' + new Date(r).toGMTString()),
                  xr.isString(n) && o.push('path=' + n),
                  xr.isString(a) && o.push('domain=' + a),
                  !0 === s && o.push('secure'),
                  (document.cookie = o.join('; ')));
              },
              read(e) {
                const t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                return t ? decodeURIComponent(t[3]) : null;
              },
              remove(e) {
                this.write(e, '', Date.now() - 864e5);
              },
            }
          : { write() {}, read: () => null, remove() {} };
      function dn(e, t, r) {
        let n = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
        return e && (n || 0 == r)
          ? (function (e, t) {
              return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
            })(e, t)
          : t;
      }
      const mn = (e) => (e instanceof Zr ? { ...e } : e);
      function fn(e, t) {
        t = t || {};
        const r = {};
        function n(e, t, r, n) {
          return xr.isPlainObject(e) && xr.isPlainObject(t)
            ? xr.merge.call({ caseless: n }, e, t)
            : xr.isPlainObject(t)
              ? xr.merge({}, t)
              : xr.isArray(t)
                ? t.slice()
                : t;
        }
        function a(e, t, r, a) {
          return xr.isUndefined(t)
            ? xr.isUndefined(e)
              ? void 0
              : n(void 0, e, 0, a)
            : n(e, t, 0, a);
        }
        function s(e, t) {
          if (!xr.isUndefined(t)) return n(void 0, t);
        }
        function o(e, t) {
          return xr.isUndefined(t) ? (xr.isUndefined(e) ? void 0 : n(void 0, e)) : n(void 0, t);
        }
        function i(r, a, s) {
          return s in t ? n(r, a) : s in e ? n(void 0, r) : void 0;
        }
        const l = {
          url: s,
          method: s,
          data: s,
          baseURL: o,
          transformRequest: o,
          transformResponse: o,
          paramsSerializer: o,
          timeout: o,
          timeoutMessage: o,
          withCredentials: o,
          withXSRFToken: o,
          adapter: o,
          responseType: o,
          xsrfCookieName: o,
          xsrfHeaderName: o,
          onUploadProgress: o,
          onDownloadProgress: o,
          decompress: o,
          maxContentLength: o,
          maxBodyLength: o,
          beforeRedirect: o,
          transport: o,
          httpAgent: o,
          httpsAgent: o,
          cancelToken: o,
          socketPath: o,
          responseEncoding: o,
          validateStatus: i,
          headers: (e, t, r) => a(mn(e), mn(t), 0, !0),
        };
        return (
          xr.forEach(Object.keys(Object.assign({}, e, t)), function (n) {
            const s = l[n] || a,
              o = s(e[n], t[n], n);
            (xr.isUndefined(o) && s !== i) || (r[n] = o);
          }),
          r
        );
      }
      const pn = (e) => {
          const t = fn({}, e);
          let r,
            {
              data: n,
              withXSRFToken: a,
              xsrfHeaderName: s,
              xsrfCookieName: o,
              headers: i,
              auth: l,
            } = t;
          if (
            ((t.headers = i = Zr.from(i)),
            (t.url = Tr(dn(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer)),
            l &&
              i.set(
                'Authorization',
                'Basic ' +
                  btoa(
                    (l.username || '') +
                      ':' +
                      (l.password ? unescape(encodeURIComponent(l.password)) : '')
                  )
              ),
            xr.isFormData(n))
          )
            if (Br.hasStandardBrowserEnv || Br.hasStandardBrowserWebWorkerEnv)
              i.setContentType(void 0);
            else if (!1 !== (r = i.getContentType())) {
              const [e, ...t] = r
                ? r
                    .split(';')
                    .map((e) => e.trim())
                    .filter(Boolean)
                : [];
              i.setContentType([e || 'multipart/form-data', ...t].join('; '));
            }
          if (
            Br.hasStandardBrowserEnv &&
            (a && xr.isFunction(a) && (a = a(t)), a || (!1 !== a && cn(t.url)))
          ) {
            const e = s && o && un.read(o);
            e && i.set(s, e);
          }
          return t;
        },
        hn =
          'undefined' !== typeof XMLHttpRequest &&
          function (e) {
            return new Promise(function (t, r) {
              const n = pn(e);
              let a = n.data;
              const s = Zr.from(n.headers).normalize();
              let o,
                i,
                l,
                c,
                u,
                { responseType: d, onUploadProgress: m, onDownloadProgress: f } = n;
              function p() {
                (c && c(),
                  u && u(),
                  n.cancelToken && n.cancelToken.unsubscribe(o),
                  n.signal && n.signal.removeEventListener('abort', o));
              }
              let h = new XMLHttpRequest();
              function g() {
                if (!h) return;
                const n = Zr.from('getAllResponseHeaders' in h && h.getAllResponseHeaders());
                (rn(
                  function (e) {
                    (t(e), p());
                  },
                  function (e) {
                    (r(e), p());
                  },
                  {
                    data: d && 'text' !== d && 'json' !== d ? h.response : h.responseText,
                    status: h.status,
                    statusText: h.statusText,
                    headers: n,
                    config: e,
                    request: h,
                  }
                ),
                  (h = null));
              }
              (h.open(n.method.toUpperCase(), n.url, !0),
                (h.timeout = n.timeout),
                'onloadend' in h
                  ? (h.onloadend = g)
                  : (h.onreadystatechange = function () {
                      h &&
                        4 === h.readyState &&
                        (0 !== h.status ||
                          (h.responseURL && 0 === h.responseURL.indexOf('file:'))) &&
                        setTimeout(g);
                    }),
                (h.onabort = function () {
                  h && (r(new wr('Request aborted', wr.ECONNABORTED, e, h)), (h = null));
                }),
                (h.onerror = function () {
                  (r(new wr('Network Error', wr.ERR_NETWORK, e, h)), (h = null));
                }),
                (h.ontimeout = function () {
                  let t = n.timeout
                    ? 'timeout of ' + n.timeout + 'ms exceeded'
                    : 'timeout exceeded';
                  const a = n.transitional || Ar;
                  (n.timeoutErrorMessage && (t = n.timeoutErrorMessage),
                    r(new wr(t, a.clarifyTimeoutError ? wr.ETIMEDOUT : wr.ECONNABORTED, e, h)),
                    (h = null));
                }),
                void 0 === a && s.setContentType(null),
                'setRequestHeader' in h &&
                  xr.forEach(s.toJSON(), function (e, t) {
                    h.setRequestHeader(t, e);
                  }),
                xr.isUndefined(n.withCredentials) || (h.withCredentials = !!n.withCredentials),
                d && 'json' !== d && (h.responseType = n.responseType),
                f && (([l, u] = sn(f, !0)), h.addEventListener('progress', l)),
                m &&
                  h.upload &&
                  (([i, c] = sn(m)),
                  h.upload.addEventListener('progress', i),
                  h.upload.addEventListener('loadend', c)),
                (n.cancelToken || n.signal) &&
                  ((o = (t) => {
                    h && (r(!t || t.type ? new tn(null, e, h) : t), h.abort(), (h = null));
                  }),
                  n.cancelToken && n.cancelToken.subscribe(o),
                  n.signal && (n.signal.aborted ? o() : n.signal.addEventListener('abort', o))));
              const x = (function (e) {
                const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                return (t && t[1]) || '';
              })(n.url);
              x && -1 === Br.protocols.indexOf(x)
                ? r(new wr('Unsupported protocol ' + x + ':', wr.ERR_BAD_REQUEST, e))
                : h.send(a || null);
            });
          },
        gn = (e, t) => {
          const { length: r } = (e = e ? e.filter(Boolean) : []);
          if (t || r) {
            let r,
              n = new AbortController();
            const a = function (e) {
              if (!r) {
                ((r = !0), o());
                const t = e instanceof Error ? e : this.reason;
                n.abort(t instanceof wr ? t : new tn(t instanceof Error ? t.message : t));
              }
            };
            let s =
              t &&
              setTimeout(() => {
                ((s = null), a(new wr(`timeout ${t} of ms exceeded`, wr.ETIMEDOUT)));
              }, t);
            const o = () => {
              e &&
                (s && clearTimeout(s),
                (s = null),
                e.forEach((e) => {
                  e.unsubscribe ? e.unsubscribe(a) : e.removeEventListener('abort', a);
                }),
                (e = null));
            };
            e.forEach((e) => e.addEventListener('abort', a));
            const { signal: i } = n;
            return ((i.unsubscribe = () => xr.asap(o)), i);
          }
        },
        xn = function* (e, t) {
          let r = e.byteLength;
          if (!t || r < t) return void (yield e);
          let n,
            a = 0;
          for (; a < r; ) ((n = a + t), yield e.slice(a, n), (a = n));
        },
        yn = async function* (e) {
          if (e[Symbol.asyncIterator]) return void (yield* e);
          const t = e.getReader();
          try {
            for (;;) {
              const { done: e, value: r } = await t.read();
              if (e) break;
              yield r;
            }
          } finally {
            await t.cancel();
          }
        },
        vn = (e, t, r, n) => {
          const a = (async function* (e, t) {
            for await (const r of yn(e)) yield* xn(r, t);
          })(e, t);
          let s,
            o = 0,
            i = (e) => {
              s || ((s = !0), n && n(e));
            };
          return new ReadableStream(
            {
              async pull(e) {
                try {
                  const { done: t, value: n } = await a.next();
                  if (t) return (i(), void e.close());
                  let s = n.byteLength;
                  if (r) {
                    let e = (o += s);
                    r(e);
                  }
                  e.enqueue(new Uint8Array(n));
                } catch (t) {
                  throw (i(t), t);
                }
              },
              cancel: (e) => (i(e), a.return()),
            },
            { highWaterMark: 2 }
          );
        },
        bn =
          'function' === typeof fetch &&
          'function' === typeof Request &&
          'function' === typeof Response,
        wn = bn && 'function' === typeof ReadableStream,
        jn =
          bn &&
          ('function' === typeof TextEncoder
            ? ((kn = new TextEncoder()), (e) => kn.encode(e))
            : async (e) => new Uint8Array(await new Response(e).arrayBuffer()));
      var kn;
      const Nn = function (e) {
          try {
            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
              r[n - 1] = arguments[n];
            return !!e(...r);
          } catch (Ae) {
            return !1;
          }
        },
        Sn =
          wn &&
          Nn(() => {
            let e = !1;
            const t = new Request(Br.origin, {
              body: new ReadableStream(),
              method: 'POST',
              get duplex() {
                return ((e = !0), 'half');
              },
            }).headers.has('Content-Type');
            return e && !t;
          }),
        En = wn && Nn(() => xr.isReadableStream(new Response('').body)),
        Cn = { stream: En && ((e) => e.body) };
      var Pn;
      bn &&
        ((Pn = new Response()),
        ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((e) => {
          !Cn[e] &&
            (Cn[e] = xr.isFunction(Pn[e])
              ? (t) => t[e]()
              : (t, r) => {
                  throw new wr(`Response type '${e}' is not supported`, wr.ERR_NOT_SUPPORT, r);
                });
        }));
      const _n = async (e, t) => {
          const r = xr.toFiniteNumber(e.getContentLength());
          return null == r
            ? (async (e) => {
                if (null == e) return 0;
                if (xr.isBlob(e)) return e.size;
                if (xr.isSpecCompliantForm(e)) {
                  const t = new Request(Br.origin, { method: 'POST', body: e });
                  return (await t.arrayBuffer()).byteLength;
                }
                return xr.isArrayBufferView(e) || xr.isArrayBuffer(e)
                  ? e.byteLength
                  : (xr.isURLSearchParams(e) && (e += ''),
                    xr.isString(e) ? (await jn(e)).byteLength : void 0);
              })(t)
            : r;
        },
        On =
          bn &&
          (async (e) => {
            let {
              url: t,
              method: r,
              data: n,
              signal: a,
              cancelToken: s,
              timeout: o,
              onDownloadProgress: i,
              onUploadProgress: l,
              responseType: c,
              headers: u,
              withCredentials: d = 'same-origin',
              fetchOptions: m,
            } = pn(e);
            c = c ? (c + '').toLowerCase() : 'text';
            let f,
              p = gn([a, s && s.toAbortSignal()], o);
            const h =
              p &&
              p.unsubscribe &&
              (() => {
                p.unsubscribe();
              });
            let g;
            try {
              if (l && Sn && 'get' !== r && 'head' !== r && 0 !== (g = await _n(u, n))) {
                let e,
                  r = new Request(t, { method: 'POST', body: n, duplex: 'half' });
                if (
                  (xr.isFormData(n) && (e = r.headers.get('content-type')) && u.setContentType(e),
                  r.body)
                ) {
                  const [e, t] = on(g, sn(ln(l)));
                  n = vn(r.body, 65536, e, t);
                }
              }
              xr.isString(d) || (d = d ? 'include' : 'omit');
              const a = 'credentials' in Request.prototype;
              f = new Request(t, {
                ...m,
                signal: p,
                method: r.toUpperCase(),
                headers: u.normalize().toJSON(),
                body: n,
                duplex: 'half',
                credentials: a ? d : void 0,
              });
              let s = await fetch(f, m);
              const o = En && ('stream' === c || 'response' === c);
              if (En && (i || (o && h))) {
                const e = {};
                ['status', 'statusText', 'headers'].forEach((t) => {
                  e[t] = s[t];
                });
                const t = xr.toFiniteNumber(s.headers.get('content-length')),
                  [r, n] = (i && on(t, sn(ln(i), !0))) || [];
                s = new Response(
                  vn(s.body, 65536, r, () => {
                    (n && n(), h && h());
                  }),
                  e
                );
              }
              c = c || 'text';
              let x = await Cn[xr.findKey(Cn, c) || 'text'](s, e);
              return (
                !o && h && h(),
                await new Promise((t, r) => {
                  rn(t, r, {
                    data: x,
                    headers: Zr.from(s.headers),
                    status: s.status,
                    statusText: s.statusText,
                    config: e,
                    request: f,
                  });
                })
              );
            } catch (x) {
              if ((h && h(), x && 'TypeError' === x.name && /Load failed|fetch/i.test(x.message)))
                throw Object.assign(new wr('Network Error', wr.ERR_NETWORK, e, f), {
                  cause: x.cause || x,
                });
              throw wr.from(x, x && x.code, e, f);
            }
          }),
        Rn = { http: null, xhr: hn, fetch: On };
      xr.forEach(Rn, (e, t) => {
        if (e) {
          try {
            Object.defineProperty(e, 'name', { value: t });
          } catch (Ae) {}
          Object.defineProperty(e, 'adapterName', { value: t });
        }
      });
      const Tn = (e) => `- ${e}`,
        Ln = (e) => xr.isFunction(e) || null === e || !1 === e,
        An = (e) => {
          e = xr.isArray(e) ? e : [e];
          const { length: t } = e;
          let r, n;
          const a = {};
          for (let s = 0; s < t; s++) {
            let t;
            if (
              ((r = e[s]),
              (n = r),
              !Ln(r) && ((n = Rn[(t = String(r)).toLowerCase()]), void 0 === n))
            )
              throw new wr(`Unknown adapter '${t}'`);
            if (n) break;
            a[t || '#' + s] = n;
          }
          if (!n) {
            const e = Object.entries(a).map((e) => {
              let [t, r] = e;
              return (
                `adapter ${t} ` +
                (!1 === r ? 'is not supported by the environment' : 'is not available in the build')
              );
            });
            let r = t
              ? e.length > 1
                ? 'since :\n' + e.map(Tn).join('\n')
                : ' ' + Tn(e[0])
              : 'as no adapter specified';
            throw new wr(
              'There is no suitable adapter to dispatch the request ' + r,
              'ERR_NOT_SUPPORT'
            );
          }
          return n;
        };
      function zn(e) {
        if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
          throw new tn(null, e);
      }
      function Fn(e) {
        (zn(e),
          (e.headers = Zr.from(e.headers)),
          (e.data = Jr.call(e, e.transformRequest)),
          -1 !== ['post', 'put', 'patch'].indexOf(e.method) &&
            e.headers.setContentType('application/x-www-form-urlencoded', !1));
        return An(e.adapter || Hr.adapter)(e).then(
          function (t) {
            return (
              zn(e),
              (t.data = Jr.call(e, e.transformResponse, t)),
              (t.headers = Zr.from(t.headers)),
              t
            );
          },
          function (t) {
            return (
              Xr(t) ||
                (zn(e),
                t &&
                  t.response &&
                  ((t.response.data = Jr.call(e, e.transformResponse, t.response)),
                  (t.response.headers = Zr.from(t.response.headers)))),
              Promise.reject(t)
            );
          }
        );
      }
      const Mn = '1.10.0',
        In = {};
      ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
        In[e] = function (r) {
          return typeof r === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
        };
      });
      const Dn = {};
      ((In.transitional = function (e, t, r) {
        function n(e, t) {
          return '[Axios v' + Mn + "] Transitional option '" + e + "'" + t + (r ? '. ' + r : '');
        }
        return (r, a, s) => {
          if (!1 === e)
            throw new wr(n(a, ' has been removed' + (t ? ' in ' + t : '')), wr.ERR_DEPRECATED);
          return (
            t &&
              !Dn[a] &&
              ((Dn[a] = !0),
              console.warn(
                n(a, ' has been deprecated since v' + t + ' and will be removed in the near future')
              )),
            !e || e(r, a, s)
          );
        };
      }),
        (In.spelling = function (e) {
          return (t, r) => (console.warn(`${r} is likely a misspelling of ${e}`), !0);
        }));
      const Un = {
          assertOptions: function (e, t, r) {
            if ('object' !== typeof e)
              throw new wr('options must be an object', wr.ERR_BAD_OPTION_VALUE);
            const n = Object.keys(e);
            let a = n.length;
            for (; a-- > 0; ) {
              const s = n[a],
                o = t[s];
              if (o) {
                const t = e[s],
                  r = void 0 === t || o(t, s, e);
                if (!0 !== r)
                  throw new wr('option ' + s + ' must be ' + r, wr.ERR_BAD_OPTION_VALUE);
                continue;
              }
              if (!0 !== r) throw new wr('Unknown option ' + s, wr.ERR_BAD_OPTION);
            }
          },
          validators: In,
        },
        Bn = Un.validators;
      class Wn {
        constructor(e) {
          ((this.defaults = e || {}),
            (this.interceptors = { request: new Lr(), response: new Lr() }));
        }
        async request(e, t) {
          try {
            return await this._request(e, t);
          } catch (r) {
            if (r instanceof Error) {
              let e = {};
              Error.captureStackTrace ? Error.captureStackTrace(e) : (e = new Error());
              const t = e.stack ? e.stack.replace(/^.+\n/, '') : '';
              try {
                r.stack
                  ? t &&
                    !String(r.stack).endsWith(t.replace(/^.+\n.+\n/, '')) &&
                    (r.stack += '\n' + t)
                  : (r.stack = t);
              } catch (Ae) {}
            }
            throw r;
          }
        }
        _request(e, t) {
          ('string' === typeof e ? ((t = t || {}).url = e) : (t = e || {}),
            (t = fn(this.defaults, t)));
          const { transitional: r, paramsSerializer: n, headers: a } = t;
          (void 0 !== r &&
            Un.assertOptions(
              r,
              {
                silentJSONParsing: Bn.transitional(Bn.boolean),
                forcedJSONParsing: Bn.transitional(Bn.boolean),
                clarifyTimeoutError: Bn.transitional(Bn.boolean),
              },
              !1
            ),
            null != n &&
              (xr.isFunction(n)
                ? (t.paramsSerializer = { serialize: n })
                : Un.assertOptions(n, { encode: Bn.function, serialize: Bn.function }, !0)),
            void 0 !== t.allowAbsoluteUrls ||
              (void 0 !== this.defaults.allowAbsoluteUrls
                ? (t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
                : (t.allowAbsoluteUrls = !0)),
            Un.assertOptions(
              t,
              { baseUrl: Bn.spelling('baseURL'), withXsrfToken: Bn.spelling('withXSRFToken') },
              !0
            ),
            (t.method = (t.method || this.defaults.method || 'get').toLowerCase()));
          let s = a && xr.merge(a.common, a[t.method]);
          (a &&
            xr.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (e) => {
              delete a[e];
            }),
            (t.headers = Zr.concat(s, a)));
          const o = [];
          let i = !0;
          this.interceptors.request.forEach(function (e) {
            ('function' === typeof e.runWhen && !1 === e.runWhen(t)) ||
              ((i = i && e.synchronous), o.unshift(e.fulfilled, e.rejected));
          });
          const l = [];
          let c;
          this.interceptors.response.forEach(function (e) {
            l.push(e.fulfilled, e.rejected);
          });
          let u,
            d = 0;
          if (!i) {
            const e = [Fn.bind(this), void 0];
            for (
              e.unshift.apply(e, o), e.push.apply(e, l), u = e.length, c = Promise.resolve(t);
              d < u;

            )
              c = c.then(e[d++], e[d++]);
            return c;
          }
          u = o.length;
          let m = t;
          for (d = 0; d < u; ) {
            const e = o[d++],
              t = o[d++];
            try {
              m = e(m);
            } catch (f) {
              t.call(this, f);
              break;
            }
          }
          try {
            c = Fn.call(this, m);
          } catch (f) {
            return Promise.reject(f);
          }
          for (d = 0, u = l.length; d < u; ) c = c.then(l[d++], l[d++]);
          return c;
        }
        getUri(e) {
          return Tr(
            dn((e = fn(this.defaults, e)).baseURL, e.url, e.allowAbsoluteUrls),
            e.params,
            e.paramsSerializer
          );
        }
      }
      (xr.forEach(['delete', 'get', 'head', 'options'], function (e) {
        Wn.prototype[e] = function (t, r) {
          return this.request(fn(r || {}, { method: e, url: t, data: (r || {}).data }));
        };
      }),
        xr.forEach(['post', 'put', 'patch'], function (e) {
          function t(t) {
            return function (r, n, a) {
              return this.request(
                fn(a || {}, {
                  method: e,
                  headers: t ? { 'Content-Type': 'multipart/form-data' } : {},
                  url: r,
                  data: n,
                })
              );
            };
          }
          ((Wn.prototype[e] = t()), (Wn.prototype[e + 'Form'] = t(!0)));
        }));
      const $n = Wn;
      class Hn {
        constructor(e) {
          if ('function' !== typeof e) throw new TypeError('executor must be a function.');
          let t;
          this.promise = new Promise(function (e) {
            t = e;
          });
          const r = this;
          (this.promise.then((e) => {
            if (!r._listeners) return;
            let t = r._listeners.length;
            for (; t-- > 0; ) r._listeners[t](e);
            r._listeners = null;
          }),
            (this.promise.then = (e) => {
              let t;
              const n = new Promise((e) => {
                (r.subscribe(e), (t = e));
              }).then(e);
              return (
                (n.cancel = function () {
                  r.unsubscribe(t);
                }),
                n
              );
            }),
            e(function (e, n, a) {
              r.reason || ((r.reason = new tn(e, n, a)), t(r.reason));
            }));
        }
        throwIfRequested() {
          if (this.reason) throw this.reason;
        }
        subscribe(e) {
          this.reason
            ? e(this.reason)
            : this._listeners
              ? this._listeners.push(e)
              : (this._listeners = [e]);
        }
        unsubscribe(e) {
          if (!this._listeners) return;
          const t = this._listeners.indexOf(e);
          -1 !== t && this._listeners.splice(t, 1);
        }
        toAbortSignal() {
          const e = new AbortController(),
            t = (t) => {
              e.abort(t);
            };
          return (this.subscribe(t), (e.signal.unsubscribe = () => this.unsubscribe(t)), e.signal);
        }
        static source() {
          let e;
          const t = new Hn(function (t) {
            e = t;
          });
          return { token: t, cancel: e };
        }
      }
      const qn = Hn;
      const Vn = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        PayloadTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        UnprocessableEntity: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511,
      };
      Object.entries(Vn).forEach((e) => {
        let [t, r] = e;
        Vn[r] = t;
      });
      const Gn = Vn;
      const Qn = (function e(t) {
        const r = new $n(t),
          n = Tt($n.prototype.request, r);
        return (
          xr.extend(n, $n.prototype, r, { allOwnKeys: !0 }),
          xr.extend(n, r, null, { allOwnKeys: !0 }),
          (n.create = function (r) {
            return e(fn(t, r));
          }),
          n
        );
      })(Hr);
      ((Qn.Axios = $n),
        (Qn.CanceledError = tn),
        (Qn.CancelToken = qn),
        (Qn.isCancel = Xr),
        (Qn.VERSION = Mn),
        (Qn.toFormData = Er),
        (Qn.AxiosError = wr),
        (Qn.Cancel = Qn.CanceledError),
        (Qn.all = function (e) {
          return Promise.all(e);
        }),
        (Qn.spread = function (e) {
          return function (t) {
            return e.apply(null, t);
          };
        }),
        (Qn.isAxiosError = function (e) {
          return xr.isObject(e) && !0 === e.isAxiosError;
        }),
        (Qn.mergeConfig = fn),
        (Qn.AxiosHeaders = Zr),
        (Qn.formToJSON = (e) => Wr(xr.isHTMLForm(e) ? new FormData(e) : e)),
        (Qn.getAdapter = An),
        (Qn.HttpStatusCode = Gn),
        (Qn.default = Qn));
      const Yn = Qn.create({
        baseURL: 'http://localhost:8001/api',
        timeout: 1e4,
        headers: { 'Content-Type': 'application/json' },
      });
      Yn.interceptors.request.use(
        (e) => {
          const t = localStorage.getItem('token');
          return (t && (e.headers.Authorization = `Bearer ${t}`), e);
        },
        (e) => Promise.reject(e)
      );
      const Kn = (e) => {
        var t, r, n, a;
        return 'string' === typeof e
          ? e
          : null !== (t = e.response) &&
              void 0 !== t &&
              null !== (r = t.data) &&
              void 0 !== r &&
              r.detail
            ? e.response.data.detail
            : null !== (n = e.response) &&
                void 0 !== n &&
                null !== (a = n.data) &&
                void 0 !== a &&
                a.message
              ? e.response.data.message
              : e.message
                ? e.message
                : 'An unexpected error occurred';
      };
      Yn.interceptors.response.use(
        (e) => e,
        (e) => {
          var t;
          if (401 === (null === (t = e.response) || void 0 === t ? void 0 : t.status))
            return (
              localStorage.removeItem('token'),
              localStorage.removeItem('user'),
              (window.location.href = '/login'),
              Promise.reject(new Error('Please log in again.'))
            );
          const r = Kn(e);
          return Promise.reject(new Error(r));
        }
      );
      const Zn = (e) => Yn.post('/auth/register', e),
        Jn = (e) => Yn.post('/auth/login', e),
        Xn = () => Yn.get('/auth/me'),
        ea = function () {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return Yn.get('/products', { params: e });
        },
        ta = (e) => Yn.get(`/products/${e}`),
        ra = () => Yn.get('/cart'),
        na = (e, t) => {
          const r = new FormData();
          return (
            r.append('product_id', e),
            r.append('quantity', t),
            Yn.post('/cart/add', r, { headers: { 'Content-Type': 'multipart/form-data' } })
          );
        },
        aa = (e) => Yn.delete(`/cart/remove/${e}`),
        sa = (e, t) => {
          const r = new FormData();
          return (r.append('quantity', t), Yn.put(`/cart/update/${e}`, r));
        },
        oa = function () {
          let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return Yn.get('/blog', { params: e });
        },
        ia = (e) => Yn.get(`/blog/${e}`),
        la = () => Yn.get('/wishlist'),
        ca = (e) => {
          const t = new FormData();
          return (t.append('product_id', e), Yn.post('/wishlist/add', t));
        },
        ua = (e) => Yn.delete(`/wishlist/remove/${e}`),
        da = async (e) => {
          try {
            var t;
            const r = new FormData();
            r.append('amount', e);
            const n = await Yn.post('/payment/create-intent', r, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (
              null === n ||
              void 0 === n ||
              null === (t = n.data) ||
              void 0 === t ||
              !t.client_secret
            )
              throw new Error('Unable to initialize payment. Please try again.');
            return n;
          } catch (r) {
            const e = Kn(r);
            throw new Error(e);
          }
        },
        ma = async (e, t) => {
          try {
            const r = new FormData();
            r.append('payment_intent_id', e);
            const n = {
              name: `${t.firstName} ${t.lastName}`,
              email: t.email,
              address: t.address,
              city: t.city,
              state: t.state,
              postal_code: t.zipCode,
              country: t.country,
            };
            r.append('shipping_address', JSON.stringify(n));
            return await Yn.post('/payment/confirm', r, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          } catch (r) {
            const e = Kn(r);
            throw new Error(e);
          }
        },
        fa = (e) => Yn.get(`/products/${e}/reviews`),
        pa = (e, t, r) => {
          const n = new FormData();
          return (
            n.append('product_id', e),
            n.append('rating', t),
            n.append('comment', r),
            Yn.post('/reviews', n)
          );
        },
        ha = (e) =>
          new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(e),
        ga = (e) =>
          new Date(e).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
      var xa = r(414);
      const ya = (0, n.createContext)(),
        va = {
          user: ((e) => {
            if ('string' !== typeof e) return null;
            try {
              return JSON.parse(e);
            } catch (Ae) {
              return null;
            }
          })(localStorage.getItem('user')),
          token: localStorage.getItem('token'),
          isLoading: !!localStorage.getItem('token'),
          isAuthenticated: !1,
        },
        ba = (e, t) => {
          switch (t.type) {
            case 'AUTH_START':
              return { ...e, isLoading: !0 };
            case 'AUTH_SUCCESS':
              return {
                ...e,
                isLoading: !1,
                isAuthenticated: !0,
                user: t.payload.user,
                token: t.payload.token,
              };
            case 'AUTH_FAILURE':
              return { ...e, isLoading: !1, isAuthenticated: !1, user: null, token: null };
            case 'LOGOUT':
              return { ...e, user: null, token: null, isAuthenticated: !1 };
            case 'UPDATE_USER':
              return { ...e, user: { ...e.user, ...t.payload } };
            default:
              return e;
          }
        },
        wa = (e) => {
          let { children: t } = e;
          const [r, a] = (0, n.useReducer)(ba, va);
          (0, n.useEffect)(() => {
            (async () => {
              const e = localStorage.getItem('token'),
                t = localStorage.getItem('user');
              if (
                (console.log('AuthContext: Checking authentication on startup', {
                  token: !!e,
                  user: !!t,
                }),
                e && t)
              )
                try {
                  console.log('AuthContext: Verifying token with backend...');
                  const t = await Xn();
                  (console.log('AuthContext: Token verified successfully', t.data),
                    a({ type: 'AUTH_SUCCESS', payload: { user: t.data, token: e } }));
                } catch (r) {
                  (console.log('AuthContext: Token verification failed', r),
                    localStorage.removeItem('token'),
                    localStorage.removeItem('user'),
                    a({ type: 'AUTH_FAILURE' }));
                }
              else
                (console.log('AuthContext: No token or user found in localStorage'),
                  a({ type: 'AUTH_FAILURE' }));
            })();
          }, []);
          const s = {
            user: r.user,
            token: r.token,
            isLoading: r.isLoading,
            isAuthenticated: r.isAuthenticated,
            login: async (e) => {
              try {
                a({ type: 'AUTH_START' });
                const t = await Jn(e),
                  { access_token: r, user: n } = t.data;
                return (
                  localStorage.setItem('token', r),
                  localStorage.setItem('user', JSON.stringify(n)),
                  a({ type: 'AUTH_SUCCESS', payload: { user: n, token: r } }),
                  Rt.success('Login successful!'),
                  { success: !0 }
                );
              } catch (n) {
                var t, r;
                a({ type: 'AUTH_FAILURE' });
                const e =
                  (null === (t = n.response) ||
                  void 0 === t ||
                  null === (r = t.data) ||
                  void 0 === r
                    ? void 0
                    : r.detail) || 'Login failed. Please try again.';
                return (Rt.error(e), { success: !1, error: e });
              }
            },
            register: async (e) => {
              try {
                a({ type: 'AUTH_START' });
                const t = await Zn(e),
                  { access_token: r, user: n } = t.data;
                return (
                  localStorage.setItem('token', r),
                  localStorage.setItem('user', JSON.stringify(n)),
                  a({ type: 'AUTH_SUCCESS', payload: { user: n, token: r } }),
                  Rt.success('Registration successful!'),
                  { success: !0 }
                );
              } catch (n) {
                var t, r;
                a({ type: 'AUTH_FAILURE' });
                const e =
                  (null === (t = n.response) ||
                  void 0 === t ||
                  null === (r = t.data) ||
                  void 0 === r
                    ? void 0
                    : r.detail) || 'Registration failed. Please try again.';
                return (Rt.error(e), { success: !1, error: e });
              }
            },
            logout: () => {
              (localStorage.removeItem('token'),
                localStorage.removeItem('user'),
                a({ type: 'LOGOUT' }),
                Rt.success('Logged out successfully!'));
            },
            updateUser: (e) => {
              (a({ type: 'UPDATE_USER', payload: e }),
                localStorage.setItem('user', JSON.stringify({ ...r.user, ...e })));
            },
          };
          return (0, xa.jsx)(ya.Provider, { value: s, children: t });
        },
        ja = () => {
          const e = (0, n.useContext)(ya);
          if (!e) throw new Error('useAuth must be used within an AuthProvider');
          return e;
        },
        ka = (0, n.createContext)(),
        Na = { items: [], total: 0, isLoading: !1, itemCount: 0 },
        Sa = (e, t) => {
          switch (t.type) {
            case 'SET_LOADING':
              return { ...e, isLoading: t.payload };
            case 'SET_CART':
              return {
                ...e,
                items: t.payload.items,
                total: t.payload.total,
                itemCount: t.payload.items.reduce((e, t) => e + t.quantity, 0),
                isLoading: !1,
              };
            case 'ADD_ITEM':
              if (e.items.find((e) => e.product_id === t.payload.product_id)) {
                const r = e.items.map((e) =>
                    e.product_id === t.payload.product_id
                      ? { ...e, quantity: e.quantity + t.payload.quantity }
                      : e
                  ),
                  n = r.reduce((e, t) => e + t.price * t.quantity, 0);
                return {
                  ...e,
                  items: r,
                  total: n,
                  itemCount: r.reduce((e, t) => e + t.quantity, 0),
                };
              }
              {
                const r = [...e.items, t.payload],
                  n = r.reduce((e, t) => e + t.price * t.quantity, 0);
                return {
                  ...e,
                  items: r,
                  total: n,
                  itemCount: r.reduce((e, t) => e + t.quantity, 0),
                };
              }
            case 'REMOVE_ITEM':
              const r = e.items.filter((e) => e.product_id !== t.payload),
                n = r.reduce((e, t) => e + t.price * t.quantity, 0);
              return { ...e, items: r, total: n, itemCount: r.reduce((e, t) => e + t.quantity, 0) };
            case 'UPDATE_QUANTITY':
              const a = e.items.map((e) =>
                  e.product_id === t.payload.product_id ? { ...e, quantity: t.payload.quantity } : e
                ),
                s = a.reduce((e, t) => e + t.price * t.quantity, 0);
              return { ...e, items: a, total: s, itemCount: a.reduce((e, t) => e + t.quantity, 0) };
            case 'CLEAR_CART':
              return { ...e, items: [], total: 0, itemCount: 0 };
            default:
              return e;
          }
        },
        Ea = (e) => {
          let { children: t } = e;
          const [r, a] = (0, n.useReducer)(Sa, Na),
            { isAuthenticated: s } = ja();
          (0, n.useEffect)(() => {
            s ? i() : a({ type: 'CLEAR_CART' });
          }, [s]);
          const o = (e) => {
              var t, r, n, a;
              return 'string' === typeof e
                ? e
                : null !== (t = e.response) &&
                    void 0 !== t &&
                    null !== (r = t.data) &&
                    void 0 !== r &&
                    r.detail
                  ? e.response.data.detail
                  : null !== (n = e.response) &&
                      void 0 !== n &&
                      null !== (a = n.data) &&
                      void 0 !== a &&
                      a.message
                    ? e.response.data.message
                    : e.message
                      ? e.message
                      : e.toString
                        ? e.toString()
                        : 'An unexpected error occurred';
            },
            i = async () => {
              try {
                a({ type: 'SET_LOADING', payload: !0 });
                const e = await ra();
                a({ type: 'SET_CART', payload: e.data });
              } catch (e) {
                (console.error('Error loading cart:', e),
                  a({ type: 'SET_LOADING', payload: !1 }),
                  Rt.error(o(e)));
              }
            },
            l = async (e) => {
              try {
                (await aa(e),
                  a({ type: 'REMOVE_ITEM', payload: e }),
                  Rt.success('Item removed from cart'));
              } catch (t) {
                (console.error('Error removing from cart:', t), Rt.error(o(t)));
              }
            },
            c = {
              items: r.items,
              total: r.total,
              isLoading: r.isLoading,
              itemCount: r.itemCount,
              addToCart: async function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                try {
                  console.log('Adding to cart:', { productId: e, quantity: t });
                  const r = await na(e, t);
                  (console.log('Cart add response:', r),
                    await i(),
                    Rt.success('Item added to cart successfully!'));
                } catch (m) {
                  var r, n, a, s, l, c, u, d;
                  (console.error('Error adding to cart:', m),
                    console.error('Detailed error info:', {
                      status: null === (r = m.response) || void 0 === r ? void 0 : r.status,
                      statusText: null === (n = m.response) || void 0 === n ? void 0 : n.statusText,
                      data: null === (a = m.response) || void 0 === a ? void 0 : a.data,
                      message: m.message,
                      headers: null === (s = m.response) || void 0 === s ? void 0 : s.headers,
                      config: {
                        url: null === (l = m.config) || void 0 === l ? void 0 : l.url,
                        method: null === (c = m.config) || void 0 === c ? void 0 : c.method,
                        headers: null === (u = m.config) || void 0 === u ? void 0 : u.headers,
                        data: null === (d = m.config) || void 0 === d ? void 0 : d.data,
                      },
                    }));
                  const e = o(m);
                  (console.log('Extracted error message:', e),
                    Rt.error(`Failed to add item to cart: ${e}`));
                }
              },
              removeFromCart: l,
              updateQuantity: async (e, t) => {
                try {
                  if (t <= 0) return void (await l(e));
                  (await sa(e, t),
                    a({ type: 'UPDATE_QUANTITY', payload: { product_id: e, quantity: t } }));
                } catch (r) {
                  (console.error('Error updating quantity:', r), Rt.error(o(r)));
                }
              },
              clearCart: () => {
                a({ type: 'CLEAR_CART' });
              },
              getItemQuantity: (e) => {
                const t = r.items.find((t) => t.product_id === e);
                return t ? t.quantity : 0;
              },
              isInCart: (e) => r.items.some((t) => t.product_id === e),
              loadCart: i,
            };
          return (0, xa.jsx)(ka.Provider, { value: c, children: t });
        },
        Ca = () => {
          const e = (0, n.useContext)(ka);
          if (!e) throw new Error('useCart must be used within a CartProvider');
          return e;
        },
        Pa = (0, n.createContext)(),
        _a = { items: [], isLoading: !1, itemCount: 0 },
        Oa = (e, t) => {
          switch (t.type) {
            case 'SET_LOADING':
              return { ...e, isLoading: t.payload };
            case 'SET_WISHLIST':
              return { ...e, items: t.payload, itemCount: t.payload.length, isLoading: !1 };
            case 'ADD_ITEM':
              if (!e.items.find((e) => e.id === t.payload.id)) {
                const r = [...e.items, t.payload];
                return { ...e, items: r, itemCount: r.length };
              }
              return e;
            case 'REMOVE_ITEM':
              const r = e.items.filter((e) => e.id !== t.payload);
              return { ...e, items: r, itemCount: r.length };
            case 'CLEAR_WISHLIST':
              return { ...e, items: [], itemCount: 0 };
            default:
              return e;
          }
        },
        Ra = (e) => {
          let { children: t } = e;
          const [r, a] = (0, n.useReducer)(Oa, _a),
            { isAuthenticated: s } = ja();
          (0, n.useEffect)(() => {
            s ? o() : a({ type: 'CLEAR_WISHLIST' });
          }, [s]);
          const o = async () => {
              try {
                a({ type: 'SET_LOADING', payload: !0 });
                const e = await la();
                a({ type: 'SET_WISHLIST', payload: e.data.items });
              } catch (e) {
                (console.error('Error loading wishlist:', e),
                  a({ type: 'SET_LOADING', payload: !1 }));
              }
            },
            i = {
              items: r.items,
              isLoading: r.isLoading,
              itemCount: r.itemCount,
              addToWishlist: async (e) => {
                try {
                  (await ca(e.id),
                    a({ type: 'ADD_ITEM', payload: e }),
                    Rt.success('Added to wishlist!'));
                } catch (t) {
                  (console.error('Error adding to wishlist:', t),
                    Rt.error('Failed to add to wishlist'));
                }
              },
              removeFromWishlist: async (e) => {
                try {
                  (await ua(e),
                    a({ type: 'REMOVE_ITEM', payload: e }),
                    Rt.success('Removed from wishlist'));
                } catch (t) {
                  (console.error('Error removing from wishlist:', t),
                    Rt.error('Failed to remove from wishlist'));
                }
              },
              isInWishlist: (e) => r.items.some((t) => t.id === e),
              clearWishlist: () => {
                a({ type: 'CLEAR_WISHLIST' });
              },
              loadWishlist: o,
            };
          return (0, xa.jsx)(Pa.Provider, { value: i, children: t });
        },
        Ta = () => {
          const e = (0, n.useContext)(Pa);
          if (!e) throw new Error('useWishlist must be used within a WishlistProvider');
          return e;
        };
      function La(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
          })
        );
      }
      const Aa = n.forwardRef(La);
      function za(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
          })
        );
      }
      const Fa = n.forwardRef(za);
      function Ma(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z',
          })
        );
      }
      const Ia = n.forwardRef(Ma);
      function Da(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
          })
        );
      }
      const Ua = n.forwardRef(Da);
      function Ba(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M6 18 18 6M6 6l12 12',
          })
        );
      }
      const Wa = n.forwardRef(Ba);
      function $a(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5',
          })
        );
      }
      const Ha = n.forwardRef($a),
        qa = () => {
          const [e, t] = (0, n.useState)(!1),
            [r, a] = (0, n.useState)(''),
            { user: s, isAuthenticated: o, logout: i } = ja(),
            { itemCount: l } = Ca(),
            { itemCount: c } = Ta(),
            u = te(),
            d = (e) => {
              (e.preventDefault(),
                r.trim() && (u(`/products?search=${encodeURIComponent(r)}`), a('')));
            },
            m = () => {
              (i(), u('/'));
            },
            f = [
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'Blog', href: '/blog' },
            ];
          return (0, xa.jsx)('header', {
            className: 'bg-white shadow-md sticky top-0 z-40',
            children: (0, xa.jsxs)('div', {
              className: 'container-max',
              children: [
                (0, xa.jsxs)('div', {
                  className: 'flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8',
                  children: [
                    (0, xa.jsx)('div', {
                      className: 'flex items-center',
                      children: (0, xa.jsxs)(Oe, {
                        to: '/',
                        className: 'flex items-center space-x-2',
                        children: [
                          (0, xa.jsx)('div', {
                            className:
                              'w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center',
                            children: (0, xa.jsx)('span', {
                              className: 'text-white font-bold text-lg',
                              children: 'F',
                            }),
                          }),
                          (0, xa.jsx)('span', {
                            className: 'text-xl font-bold text-gray-900 font-heading',
                            children: 'FitGear',
                          }),
                        ],
                      }),
                    }),
                    (0, xa.jsx)('nav', {
                      className: 'hidden md:flex space-x-8',
                      children: f.map((e) =>
                        (0, xa.jsx)(
                          Oe,
                          {
                            to: e.href,
                            className:
                              'text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                            children: e.name,
                          },
                          e.name
                        )
                      ),
                    }),
                    (0, xa.jsx)('div', {
                      className: 'hidden md:flex flex-1 max-w-md mx-8',
                      children: (0, xa.jsxs)('form', {
                        onSubmit: d,
                        className: 'relative w-full',
                        children: [
                          (0, xa.jsx)('div', {
                            className:
                              'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
                            children: (0, xa.jsx)(Aa, { className: 'h-5 w-5 text-gray-400' }),
                          }),
                          (0, xa.jsx)('input', {
                            type: 'text',
                            value: r,
                            onChange: (e) => a(e.target.value),
                            placeholder: 'Search products...',
                            className:
                              'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                          }),
                        ],
                      }),
                    }),
                    (0, xa.jsxs)('div', {
                      className: 'flex items-center space-x-4',
                      children: [
                        o &&
                          (0, xa.jsxs)(Oe, {
                            to: '/profile?tab=wishlist',
                            className:
                              'relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200',
                            children: [
                              (0, xa.jsx)(Fa, { className: 'h-6 w-6' }),
                              c > 0 &&
                                (0, xa.jsx)('span', {
                                  className:
                                    'absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center',
                                  children: c,
                                }),
                            ],
                          }),
                        (0, xa.jsxs)(Oe, {
                          to: '/cart',
                          className:
                            'relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200',
                          children: [
                            (0, xa.jsx)(Ia, { className: 'h-6 w-6' }),
                            l > 0 &&
                              (0, xa.jsx)('span', {
                                className:
                                  'absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center',
                                children: l,
                              }),
                          ],
                        }),
                        o
                          ? (0, xa.jsxs)('div', {
                              className: 'relative group',
                              children: [
                                (0, xa.jsxs)('button', {
                                  className:
                                    'flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200',
                                  children: [
                                    (0, xa.jsx)(Ua, { className: 'h-6 w-6' }),
                                    (0, xa.jsx)('span', {
                                      className: 'hidden sm:block text-sm font-medium',
                                      children: null === s || void 0 === s ? void 0 : s.first_name,
                                    }),
                                  ],
                                }),
                                (0, xa.jsxs)('div', {
                                  className:
                                    'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200',
                                  children: [
                                    (0, xa.jsx)(Oe, {
                                      to: '/profile',
                                      className:
                                        'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200',
                                      children: 'Profile',
                                    }),
                                    (null === s || void 0 === s ? void 0 : s.is_admin) &&
                                      (0, xa.jsx)(Oe, {
                                        to: '/admin',
                                        className:
                                          'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200',
                                        children: 'Admin Dashboard',
                                      }),
                                    (0, xa.jsx)('button', {
                                      onClick: m,
                                      className:
                                        'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200',
                                      children: 'Logout',
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : (0, xa.jsxs)('div', {
                              className: 'flex items-center space-x-2',
                              children: [
                                (0, xa.jsx)(Oe, {
                                  to: '/login',
                                  className:
                                    'text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                                  children: 'Login',
                                }),
                                (0, xa.jsx)(Oe, {
                                  to: '/register',
                                  className:
                                    'bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-200',
                                  children: 'Sign Up',
                                }),
                              ],
                            }),
                        (0, xa.jsx)('button', {
                          onClick: () => t(!e),
                          className:
                            'md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200',
                          children: e
                            ? (0, xa.jsx)(Wa, { className: 'h-6 w-6' })
                            : (0, xa.jsx)(Ha, { className: 'h-6 w-6' }),
                        }),
                      ],
                    }),
                  ],
                }),
                e &&
                  (0, xa.jsx)('div', {
                    className: 'md:hidden',
                    children: (0, xa.jsxs)('div', {
                      className:
                        'px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200',
                      children: [
                        (0, xa.jsxs)('form', {
                          onSubmit: d,
                          className: 'relative mb-3',
                          children: [
                            (0, xa.jsx)('div', {
                              className:
                                'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
                              children: (0, xa.jsx)(Aa, { className: 'h-5 w-5 text-gray-400' }),
                            }),
                            (0, xa.jsx)('input', {
                              type: 'text',
                              value: r,
                              onChange: (e) => a(e.target.value),
                              placeholder: 'Search products...',
                              className:
                                'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm',
                            }),
                          ],
                        }),
                        f.map((e) =>
                          (0, xa.jsx)(
                            Oe,
                            {
                              to: e.href,
                              className:
                                'text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                              onClick: () => t(!1),
                              children: e.name,
                            },
                            e.name
                          )
                        ),
                        !o &&
                          (0, xa.jsxs)('div', {
                            className: 'border-t border-gray-200 pt-3 mt-3',
                            children: [
                              (0, xa.jsx)(Oe, {
                                to: '/login',
                                className:
                                  'text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                                onClick: () => t(!1),
                                children: 'Login',
                              }),
                              (0, xa.jsx)(Oe, {
                                to: '/register',
                                className:
                                  'text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                                onClick: () => t(!1),
                                children: 'Sign Up',
                              }),
                            ],
                          }),
                        o &&
                          (0, xa.jsxs)('div', {
                            className: 'border-t border-gray-200 pt-3 mt-3',
                            children: [
                              (0, xa.jsx)(Oe, {
                                to: '/profile',
                                className:
                                  'text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                                onClick: () => t(!1),
                                children: 'Profile',
                              }),
                              (null === s || void 0 === s ? void 0 : s.is_admin) &&
                                (0, xa.jsx)(Oe, {
                                  to: '/admin',
                                  className:
                                    'text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                                  onClick: () => t(!1),
                                  children: 'Admin Dashboard',
                                }),
                              (0, xa.jsx)('button', {
                                onClick: () => {
                                  (m(), t(!1));
                                },
                                className:
                                  'w-full text-left text-gray-700 hover:text-primary-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                                children: 'Logout',
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
              ],
            }),
          });
        };
      function Va(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
          })
        );
      }
      const Ga = n.forwardRef(Va);
      function Qa(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
          })
        );
      }
      const Ya = n.forwardRef(Qa);
      function Ka(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
          }),
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
          })
        );
      }
      const Za = n.forwardRef(Ka);
      var Ja = { color: void 0, size: void 0, className: void 0, style: void 0, attr: void 0 },
        Xa = n.createContext && n.createContext(Ja),
        es = ['attr', 'size', 'title'];
      function ts(e, t) {
        if (null == e) return {};
        var r,
          n,
          a = (function (e, t) {
            if (null == e) return {};
            var r = {};
            for (var n in e)
              if (Object.prototype.hasOwnProperty.call(e, n)) {
                if (t.indexOf(n) >= 0) continue;
                r[n] = e[n];
              }
            return r;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var s = Object.getOwnPropertySymbols(e);
          for (n = 0; n < s.length; n++)
            ((r = s[n]),
              t.indexOf(r) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r])));
        }
        return a;
      }
      function rs() {
        return (
          (rs = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
          rs.apply(this, arguments)
        );
      }
      function ns(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function as(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ns(Object(r), !0).forEach(function (t) {
                ss(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : ns(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function ss(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e, t) {
              if ('object' != typeof e || !e) return e;
              var r = e[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(e, t || 'default');
                if ('object' != typeof n) return n;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return ('string' === t ? String : Number)(e);
            })(e, 'string');
            return 'symbol' == typeof t ? t : t + '';
          })(t)),
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function os(e) {
        return e && e.map((e, t) => n.createElement(e.tag, as({ key: t }, e.attr), os(e.child)));
      }
      function is(e) {
        return (t) => n.createElement(ls, rs({ attr: as({}, e.attr) }, t), os(e.child));
      }
      function ls(e) {
        var t = (t) => {
          var r,
            { attr: a, size: s, title: o } = e,
            i = ts(e, es),
            l = s || t.size || '1em';
          return (
            t.className && (r = t.className),
            e.className && (r = (r ? r + ' ' : '') + e.className),
            n.createElement(
              'svg',
              rs({ stroke: 'currentColor', fill: 'currentColor', strokeWidth: '0' }, t.attr, a, i, {
                className: r,
                style: as(as({ color: e.color || t.color }, t.style), e.style),
                height: l,
                width: l,
                xmlns: 'http://www.w3.org/2000/svg',
              }),
              o && n.createElement('title', null, o),
              e.children
            )
          );
        };
        return void 0 !== Xa ? n.createElement(Xa.Consumer, null, (e) => t(e)) : t(Ja);
      }
      function cs(e) {
        return is({
          tag: 'svg',
          attr: { viewBox: '0 0 320 512' },
          child: [
            {
              tag: 'path',
              attr: {
                d: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
              },
              child: [],
            },
          ],
        })(e);
      }
      function us(e) {
        return is({
          tag: 'svg',
          attr: { viewBox: '0 0 448 512' },
          child: [
            {
              tag: 'path',
              attr: {
                d: 'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
              },
              child: [],
            },
          ],
        })(e);
      }
      function ds(e) {
        return is({
          tag: 'svg',
          attr: { viewBox: '0 0 512 512' },
          child: [
            {
              tag: 'path',
              attr: {
                d: 'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z',
              },
              child: [],
            },
          ],
        })(e);
      }
      function ms(e) {
        return is({
          tag: 'svg',
          attr: { viewBox: '0 0 576 512' },
          child: [
            {
              tag: 'path',
              attr: {
                d: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z',
              },
              child: [],
            },
          ],
        })(e);
      }
      const fs = () => {
          const e = new Date().getFullYear(),
            t = {
              products: [
                { name: 'Strength Training', href: '/products?category=Strength Training' },
                { name: 'Cardio Equipment', href: '/products?category=Cardio Equipment' },
                { name: 'Fitness Accessories', href: '/products?category=Fitness Accessories' },
                { name: 'Apparel', href: '/products?category=Apparel' },
              ],
              company: [
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Blog', href: '/blog' },
                { name: 'Careers', href: '/careers' },
              ],
              support: [
                { name: 'Help Center', href: '/help' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Returns', href: '/returns' },
                { name: 'Size Guide', href: '/size-guide' },
              ],
              legal: [
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
                { name: 'Cookie Policy', href: '/cookie-policy' },
                { name: 'Accessibility', href: '/accessibility' },
              ],
            };
          return (0, xa.jsx)('footer', {
            className: 'bg-gray-900 text-white',
            children: (0, xa.jsxs)('div', {
              className: 'container-max px-4 sm:px-6 lg:px-8',
              children: [
                (0, xa.jsxs)('div', {
                  className: 'py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
                  children: [
                    (0, xa.jsxs)('div', {
                      className: 'lg:col-span-1',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'flex items-center space-x-2 mb-4',
                          children: [
                            (0, xa.jsx)('div', {
                              className:
                                'w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center',
                              children: (0, xa.jsx)('span', {
                                className: 'text-white font-bold text-lg',
                                children: 'F',
                              }),
                            }),
                            (0, xa.jsx)('span', {
                              className: 'text-xl font-bold font-heading',
                              children: 'FitGear',
                            }),
                          ],
                        }),
                        (0, xa.jsx)('p', {
                          className: 'text-gray-300 mb-6 text-sm leading-relaxed',
                          children:
                            "Your premier destination for high-quality fitness equipment and accessories. We're committed to helping you achieve your fitness goals with the best gear available.",
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'space-y-3',
                          children: [
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center space-x-3',
                              children: [
                                (0, xa.jsx)(Ga, { className: 'h-5 w-5 text-primary-400' }),
                                (0, xa.jsx)('span', {
                                  className: 'text-sm text-gray-300',
                                  children: '+1 (555) 123-4567',
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center space-x-3',
                              children: [
                                (0, xa.jsx)(Ya, { className: 'h-5 w-5 text-primary-400' }),
                                (0, xa.jsx)('span', {
                                  className: 'text-sm text-gray-300',
                                  children: 'support@fitgear.com',
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center space-x-3',
                              children: [
                                (0, xa.jsx)(Za, { className: 'h-5 w-5 text-primary-400' }),
                                (0, xa.jsx)('span', {
                                  className: 'text-sm text-gray-300',
                                  children: '123 Fitness St, Gym City, GC 12345',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, xa.jsxs)('div', {
                      children: [
                        (0, xa.jsx)('h3', {
                          className: 'text-lg font-semibold mb-4',
                          children: 'Products',
                        }),
                        (0, xa.jsx)('ul', {
                          className: 'space-y-2',
                          children: t.products.map((e) =>
                            (0, xa.jsx)(
                              'li',
                              {
                                children: (0, xa.jsx)(Oe, {
                                  to: e.href,
                                  className:
                                    'text-gray-300 hover:text-white text-sm transition-colors duration-200',
                                  children: e.name,
                                }),
                              },
                              e.name
                            )
                          ),
                        }),
                      ],
                    }),
                    (0, xa.jsxs)('div', {
                      children: [
                        (0, xa.jsx)('h3', {
                          className: 'text-lg font-semibold mb-4',
                          children: 'Company',
                        }),
                        (0, xa.jsx)('ul', {
                          className: 'space-y-2',
                          children: t.company.map((e) =>
                            (0, xa.jsx)(
                              'li',
                              {
                                children: (0, xa.jsx)(Oe, {
                                  to: e.href,
                                  className:
                                    'text-gray-300 hover:text-white text-sm transition-colors duration-200',
                                  children: e.name,
                                }),
                              },
                              e.name
                            )
                          ),
                        }),
                      ],
                    }),
                    (0, xa.jsxs)('div', {
                      children: [
                        (0, xa.jsx)('h3', {
                          className: 'text-lg font-semibold mb-4',
                          children: 'Support',
                        }),
                        (0, xa.jsx)('ul', {
                          className: 'space-y-2',
                          children: t.support.map((e) =>
                            (0, xa.jsx)(
                              'li',
                              {
                                children: (0, xa.jsx)(Oe, {
                                  to: e.href,
                                  className:
                                    'text-gray-300 hover:text-white text-sm transition-colors duration-200',
                                  children: e.name,
                                }),
                              },
                              e.name
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, xa.jsx)('div', {
                  className: 'py-8 border-t border-gray-800',
                  children: (0, xa.jsxs)('div', {
                    className: 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center',
                    children: [
                      (0, xa.jsxs)('div', {
                        children: [
                          (0, xa.jsx)('h3', {
                            className: 'text-lg font-semibold mb-2',
                            children: 'Stay Updated',
                          }),
                          (0, xa.jsx)('p', {
                            className: 'text-gray-300 text-sm',
                            children:
                              'Subscribe to our newsletter for the latest fitness tips, product launches, and exclusive offers.',
                          }),
                        ],
                      }),
                      (0, xa.jsxs)('form', {
                        className: 'flex flex-col sm:flex-row gap-3',
                        children: [
                          (0, xa.jsx)('input', {
                            type: 'email',
                            placeholder: 'Enter your email',
                            className:
                              'flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                          }),
                          (0, xa.jsx)('button', {
                            type: 'submit',
                            className:
                              'px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium',
                            children: 'Subscribe',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, xa.jsxs)('div', {
                  className: 'py-6 border-t border-gray-800',
                  children: [
                    (0, xa.jsxs)('div', {
                      className:
                        'flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'flex space-x-6',
                          children: [
                            (0, xa.jsx)('button', {
                              className:
                                'text-gray-400 hover:text-white transition-colors duration-200',
                              'aria-label': 'Facebook',
                              children: (0, xa.jsx)(cs, { className: 'h-5 w-5' }),
                            }),
                            (0, xa.jsx)('button', {
                              className:
                                'text-gray-400 hover:text-white transition-colors duration-200',
                              'aria-label': 'Instagram',
                              children: (0, xa.jsx)(us, { className: 'h-5 w-5' }),
                            }),
                            (0, xa.jsx)('button', {
                              className:
                                'text-gray-400 hover:text-white transition-colors duration-200',
                              'aria-label': 'Twitter',
                              children: (0, xa.jsx)(ds, { className: 'h-5 w-5' }),
                            }),
                            (0, xa.jsx)('button', {
                              className:
                                'text-gray-400 hover:text-white transition-colors duration-200',
                              'aria-label': 'YouTube',
                              children: (0, xa.jsx)(ms, { className: 'h-5 w-5' }),
                            }),
                          ],
                        }),
                        (0, xa.jsx)('div', {
                          className:
                            'flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6',
                          children: (0, xa.jsx)('div', {
                            className: 'flex space-x-4 text-sm',
                            children: t.legal.map((e) =>
                              (0, xa.jsx)(
                                Oe,
                                {
                                  to: e.href,
                                  className:
                                    'text-gray-400 hover:text-white transition-colors duration-200',
                                  children: e.name,
                                },
                                e.name
                              )
                            ),
                          }),
                        }),
                      ],
                    }),
                    (0, xa.jsx)('div', {
                      className: 'mt-4 pt-4 border-t border-gray-800 text-center',
                      children: (0, xa.jsxs)('p', {
                        className: 'text-gray-400 text-sm',
                        children: [
                          '\xa9 ',
                          e,
                          ' FitGear. All rights reserved. Built with passion for fitness enthusiasts.',
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
        },
        ps = (e) => {
          const t = ((e) =>
            e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) =>
              r ? r.toUpperCase() : t.toLowerCase()
            ))(e);
          return t.charAt(0).toUpperCase() + t.slice(1);
        },
        hs = function () {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          return t
            .filter((e, t, r) => Boolean(e) && '' !== e.trim() && r.indexOf(e) === t)
            .join(' ')
            .trim();
        },
        gs = (e) => {
          for (const t in e) if (t.startsWith('aria-') || 'role' === t || 'title' === t) return !0;
        };
      var xs = {
        xmlns: 'http://www.w3.org/2000/svg',
        width: 24,
        height: 24,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      };
      const ys = (0, n.forwardRef)((e, t) => {
          let {
            color: r = 'currentColor',
            size: a = 24,
            strokeWidth: s = 2,
            absoluteStrokeWidth: o,
            className: i = '',
            children: l,
            iconNode: c,
            ...u
          } = e;
          return (0, n.createElement)(
            'svg',
            {
              ref: t,
              ...xs,
              width: a,
              height: a,
              stroke: r,
              strokeWidth: o ? (24 * Number(s)) / Number(a) : s,
              className: hs('lucide', i),
              ...(!l && !gs(u) && { 'aria-hidden': 'true' }),
              ...u,
            },
            [
              ...c.map((e) => {
                let [t, r] = e;
                return (0, n.createElement)(t, r);
              }),
              ...(Array.isArray(l) ? l : [l]),
            ]
          );
        }),
        vs = (e, t) => {
          const r = (0, n.forwardRef)((r, a) => {
            let { className: s, ...o } = r;
            return (0, n.createElement)(ys, {
              ref: a,
              iconNode: t,
              className: hs(
                `lucide-${((i = ps(e)), i.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase())}`,
                `lucide-${e}`,
                s
              ),
              ...o,
            });
            var i;
          });
          return ((r.displayName = ps(e)), r);
        },
        bs = vs('truck', [
          [
            'path',
            { d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2', key: 'wrbu53' },
          ],
          ['path', { d: 'M15 18H9', key: '1lyqi6' }],
          [
            'path',
            {
              d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
              key: 'lysw3i',
            },
          ],
          ['circle', { cx: '17', cy: '18', r: '2', key: '332jqn' }],
          ['circle', { cx: '7', cy: '18', r: '2', key: '19iecd' }],
        ]),
        ws = vs('shield-check', [
          [
            'path',
            {
              d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
              key: 'oel41y',
            },
          ],
          ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
        ]),
        js = vs('credit-card', [
          ['rect', { width: '20', height: '14', x: '2', y: '5', rx: '2', key: 'ynyp8z' }],
          ['line', { x1: '2', x2: '22', y1: '10', y2: '10', key: '1b3vmo' }],
        ]),
        ks = vs('headphones', [
          [
            'path',
            {
              d: 'M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3',
              key: '1xhozi',
            },
          ],
        ]),
        Ns = vs('arrow-right', [
          ['path', { d: 'M5 12h14', key: '1ays0h' }],
          ['path', { d: 'm12 5 7 7-7 7', key: 'xquz4c' }],
        ]),
        Ss = vs('star', [
          [
            'path',
            {
              d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
              key: 'r04s7s',
            },
          ],
        ]),
        Es = vs('check', [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]]);
      function Cs(e, t) {
        if ('function' === typeof e) return e(t);
        null !== e && void 0 !== e && (e.current = t);
      }
      function Ps() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return (e) => {
          let r = !1;
          const n = t.map((t) => {
            const n = Cs(t, e);
            return (r || 'function' != typeof n || (r = !0), n);
          });
          if (r)
            return () => {
              for (let e = 0; e < n.length; e++) {
                const r = n[e];
                'function' == typeof r ? r() : Cs(t[e], null);
              }
            };
        };
      }
      function _s(e) {
        const t = Rs(e),
          r = n.forwardRef((e, r) => {
            const { children: a, ...s } = e,
              o = n.Children.toArray(a),
              i = o.find(Ls);
            if (i) {
              const e = i.props.children,
                a = o.map((t) =>
                  t === i
                    ? n.Children.count(e) > 1
                      ? n.Children.only(null)
                      : n.isValidElement(e)
                        ? e.props.children
                        : null
                    : t
                );
              return (0, xa.jsx)(t, {
                ...s,
                ref: r,
                children: n.isValidElement(e) ? n.cloneElement(e, void 0, a) : null,
              });
            }
            return (0, xa.jsx)(t, { ...s, ref: r, children: a });
          });
        return ((r.displayName = `${e}.Slot`), r);
      }
      var Os = _s('Slot');
      function Rs(e) {
        const t = n.forwardRef((e, t) => {
          const { children: r, ...a } = e;
          if (n.isValidElement(r)) {
            const e = (function (e) {
                let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
                  r = t && 'isReactWarning' in t && t.isReactWarning;
                if (r) return e.ref;
                if (
                  ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
                  (r = t && 'isReactWarning' in t && t.isReactWarning),
                  r)
                )
                  return e.props.ref;
                return e.props.ref || e.ref;
              })(r),
              s = (function (e, t) {
                const r = { ...t };
                for (const n in t) {
                  const a = e[n],
                    s = t[n];
                  /^on[A-Z]/.test(n)
                    ? a && s
                      ? (r[n] = function () {
                          const e = s(...arguments);
                          return (a(...arguments), e);
                        })
                      : a && (r[n] = a)
                    : 'style' === n
                      ? (r[n] = { ...a, ...s })
                      : 'className' === n && (r[n] = [a, s].filter(Boolean).join(' '));
                }
                return { ...e, ...r };
              })(a, r.props);
            return (r.type !== n.Fragment && (s.ref = t ? Ps(t, e) : e), n.cloneElement(r, s));
          }
          return n.Children.count(r) > 1 ? n.Children.only(null) : null;
        });
        return ((t.displayName = `${e}.SlotClone`), t);
      }
      var Ts = Symbol('radix.slottable');
      function Ls(e) {
        return (
          n.isValidElement(e) &&
          'function' === typeof e.type &&
          '__radixId' in e.type &&
          e.type.__radixId === Ts
        );
      }
      function As(e) {
        var t,
          r,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) {
            var a = e.length;
            for (t = 0; t < a; t++) e[t] && (r = As(e[t])) && (n && (n += ' '), (n += r));
          } else for (r in e) e[r] && (n && (n += ' '), (n += r));
        return n;
      }
      function zs() {
        for (var e, t, r = 0, n = '', a = arguments.length; r < a; r++)
          (e = arguments[r]) && (t = As(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      const Fs = (e) => ('boolean' === typeof e ? `${e}` : 0 === e ? '0' : e),
        Ms = zs,
        Is = (e, t) => (r) => {
          var n;
          if (null == (null === t || void 0 === t ? void 0 : t.variants))
            return Ms(
              e,
              null === r || void 0 === r ? void 0 : r.class,
              null === r || void 0 === r ? void 0 : r.className
            );
          const { variants: a, defaultVariants: s } = t,
            o = Object.keys(a).map((e) => {
              const t = null === r || void 0 === r ? void 0 : r[e],
                n = null === s || void 0 === s ? void 0 : s[e];
              if (null === t) return null;
              const o = Fs(t) || Fs(n);
              return a[e][o];
            }),
            i =
              r &&
              Object.entries(r).reduce((e, t) => {
                let [r, n] = t;
                return (void 0 === n || (e[r] = n), e);
              }, {}),
            l =
              null === t || void 0 === t || null === (n = t.compoundVariants) || void 0 === n
                ? void 0
                : n.reduce((e, t) => {
                    let { class: r, className: n, ...a } = t;
                    return Object.entries(a).every((e) => {
                      let [t, r] = e;
                      return Array.isArray(r)
                        ? r.includes({ ...s, ...i }[t])
                        : { ...s, ...i }[t] === r;
                    })
                      ? [...e, r, n]
                      : e;
                  }, []);
          return Ms(
            e,
            o,
            l,
            null === r || void 0 === r ? void 0 : r.class,
            null === r || void 0 === r ? void 0 : r.className
          );
        },
        Ds = (e) => {
          const t = $s(e),
            { conflictingClassGroups: r, conflictingClassGroupModifiers: n } = e;
          return {
            getClassGroupId: (e) => {
              const r = e.split('-');
              return ('' === r[0] && 1 !== r.length && r.shift(), Us(r, t) || Ws(e));
            },
            getConflictingClassGroupIds: (e, t) => {
              const a = r[e] || [];
              return t && n[e] ? [...a, ...n[e]] : a;
            },
          };
        },
        Us = (e, t) => {
          if (0 === e.length) return t.classGroupId;
          const r = e[0],
            n = t.nextPart.get(r),
            a = n ? Us(e.slice(1), n) : void 0;
          if (a) return a;
          if (0 === t.validators.length) return;
          const s = e.join('-');
          return t.validators.find((e) => {
            let { validator: t } = e;
            return t(s);
          })?.classGroupId;
        },
        Bs = /^\[(.+)\]$/,
        Ws = (e) => {
          if (Bs.test(e)) {
            const t = Bs.exec(e)[1],
              r = t?.substring(0, t.indexOf(':'));
            if (r) return 'arbitrary..' + r;
          }
        },
        $s = (e) => {
          const { theme: t, classGroups: r } = e,
            n = { nextPart: new Map(), validators: [] };
          for (const a in r) Hs(r[a], n, a, t);
          return n;
        },
        Hs = (e, t, r, n) => {
          e.forEach((e) => {
            if ('string' === typeof e) {
              return void (('' === e ? t : qs(t, e)).classGroupId = r);
            }
            if ('function' === typeof e)
              return Vs(e)
                ? void Hs(e(n), t, r, n)
                : void t.validators.push({ validator: e, classGroupId: r });
            Object.entries(e).forEach((e) => {
              let [a, s] = e;
              Hs(s, qs(t, a), r, n);
            });
          });
        },
        qs = (e, t) => {
          let r = e;
          return (
            t.split('-').forEach((e) => {
              (r.nextPart.has(e) || r.nextPart.set(e, { nextPart: new Map(), validators: [] }),
                (r = r.nextPart.get(e)));
            }),
            r
          );
        },
        Vs = (e) => e.isThemeGetter,
        Gs = (e) => {
          if (e < 1) return { get: () => {}, set: () => {} };
          let t = 0,
            r = new Map(),
            n = new Map();
          const a = (a, s) => {
            (r.set(a, s), t++, t > e && ((t = 0), (n = r), (r = new Map())));
          };
          return {
            get(e) {
              let t = r.get(e);
              return void 0 !== t ? t : void 0 !== (t = n.get(e)) ? (a(e, t), t) : void 0;
            },
            set(e, t) {
              r.has(e) ? r.set(e, t) : a(e, t);
            },
          };
        },
        Qs = (e) => {
          const { prefix: t, experimentalParseClassName: r } = e;
          let n = (e) => {
            const t = [];
            let r,
              n = 0,
              a = 0,
              s = 0;
            for (let l = 0; l < e.length; l++) {
              let o = e[l];
              if (0 === n && 0 === a) {
                if (':' === o) {
                  (t.push(e.slice(s, l)), (s = l + 1));
                  continue;
                }
                if ('/' === o) {
                  r = l;
                  continue;
                }
              }
              '[' === o ? n++ : ']' === o ? n-- : '(' === o ? a++ : ')' === o && a--;
            }
            const o = 0 === t.length ? e : e.substring(s),
              i = Ys(o);
            return {
              modifiers: t,
              hasImportantModifier: i !== o,
              baseClassName: i,
              maybePostfixModifierPosition: r && r > s ? r - s : void 0,
            };
          };
          if (t) {
            const e = t + ':',
              r = n;
            n = (t) =>
              t.startsWith(e)
                ? r(t.substring(e.length))
                : {
                    isExternal: !0,
                    modifiers: [],
                    hasImportantModifier: !1,
                    baseClassName: t,
                    maybePostfixModifierPosition: void 0,
                  };
          }
          if (r) {
            const e = n;
            n = (t) => r({ className: t, parseClassName: e });
          }
          return n;
        },
        Ys = (e) =>
          e.endsWith('!') ? e.substring(0, e.length - 1) : e.startsWith('!') ? e.substring(1) : e,
        Ks = (e) => {
          const t = Object.fromEntries(e.orderSensitiveModifiers.map((e) => [e, !0]));
          return (e) => {
            if (e.length <= 1) return e;
            const r = [];
            let n = [];
            return (
              e.forEach((e) => {
                '[' === e[0] || t[e] ? (r.push(...n.sort(), e), (n = [])) : n.push(e);
              }),
              r.push(...n.sort()),
              r
            );
          };
        },
        Zs = /\s+/;
      function Js() {
        let e,
          t,
          r = 0,
          n = '';
        for (; r < arguments.length; )
          (e = arguments[r++]) && (t = Xs(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      const Xs = (e) => {
        if ('string' === typeof e) return e;
        let t,
          r = '';
        for (let n = 0; n < e.length; n++) e[n] && (t = Xs(e[n])) && (r && (r += ' '), (r += t));
        return r;
      };
      function eo(e) {
        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
          r[n - 1] = arguments[n];
        let a,
          s,
          o,
          i = function (t) {
            const n = r.reduce((e, t) => t(e), e());
            return (
              (a = ((e) => ({
                cache: Gs(e.cacheSize),
                parseClassName: Qs(e),
                sortModifiers: Ks(e),
                ...Ds(e),
              }))(n)),
              (s = a.cache.get),
              (o = a.cache.set),
              (i = l),
              l(t)
            );
          };
        function l(e) {
          const t = s(e);
          if (t) return t;
          const r = ((e, t) => {
            const {
                parseClassName: r,
                getClassGroupId: n,
                getConflictingClassGroupIds: a,
                sortModifiers: s,
              } = t,
              o = [],
              i = e.trim().split(Zs);
            let l = '';
            for (let c = i.length - 1; c >= 0; c -= 1) {
              const e = i[c],
                {
                  isExternal: t,
                  modifiers: u,
                  hasImportantModifier: d,
                  baseClassName: m,
                  maybePostfixModifierPosition: f,
                } = r(e);
              if (t) {
                l = e + (l.length > 0 ? ' ' + l : l);
                continue;
              }
              let p = !!f,
                h = n(p ? m.substring(0, f) : m);
              if (!h) {
                if (!p) {
                  l = e + (l.length > 0 ? ' ' + l : l);
                  continue;
                }
                if (((h = n(m)), !h)) {
                  l = e + (l.length > 0 ? ' ' + l : l);
                  continue;
                }
                p = !1;
              }
              const g = s(u).join(':'),
                x = d ? g + '!' : g,
                y = x + h;
              if (o.includes(y)) continue;
              o.push(y);
              const v = a(h, p);
              for (let r = 0; r < v.length; ++r) {
                const e = v[r];
                o.push(x + e);
              }
              l = e + (l.length > 0 ? ' ' + l : l);
            }
            return l;
          })(e, a);
          return (o(e, r), r);
        }
        return function () {
          return i(Js.apply(null, arguments));
        };
      }
      const to = (e) => {
          const t = (t) => t[e] || [];
          return ((t.isThemeGetter = !0), t);
        },
        ro = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
        no = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
        ao = /^\d+\/\d+$/,
        so = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
        oo =
          /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
        io = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
        lo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
        co =
          /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
        uo = (e) => ao.test(e),
        mo = (e) => !!e && !Number.isNaN(Number(e)),
        fo = (e) => !!e && Number.isInteger(Number(e)),
        po = (e) => e.endsWith('%') && mo(e.slice(0, -1)),
        ho = (e) => so.test(e),
        go = () => !0,
        xo = (e) => oo.test(e) && !io.test(e),
        yo = () => !1,
        vo = (e) => lo.test(e),
        bo = (e) => co.test(e),
        wo = (e) => !ko(e) && !_o(e),
        jo = (e) => Fo(e, Uo, yo),
        ko = (e) => ro.test(e),
        No = (e) => Fo(e, Bo, xo),
        So = (e) => Fo(e, Wo, mo),
        Eo = (e) => Fo(e, Io, yo),
        Co = (e) => Fo(e, Do, bo),
        Po = (e) => Fo(e, Ho, vo),
        _o = (e) => no.test(e),
        Oo = (e) => Mo(e, Bo),
        Ro = (e) => Mo(e, $o),
        To = (e) => Mo(e, Io),
        Lo = (e) => Mo(e, Uo),
        Ao = (e) => Mo(e, Do),
        zo = (e) => Mo(e, Ho, !0),
        Fo = (e, t, r) => {
          const n = ro.exec(e);
          return !!n && (n[1] ? t(n[1]) : r(n[2]));
        },
        Mo = function (e, t) {
          let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const n = no.exec(e);
          return !!n && (n[1] ? t(n[1]) : r);
        },
        Io = (e) => 'position' === e || 'percentage' === e,
        Do = (e) => 'image' === e || 'url' === e,
        Uo = (e) => 'length' === e || 'size' === e || 'bg-size' === e,
        Bo = (e) => 'length' === e,
        Wo = (e) => 'number' === e,
        $o = (e) => 'family-name' === e,
        Ho = (e) => 'shadow' === e,
        qo =
          (Symbol.toStringTag,
          () => {
            const e = to('color'),
              t = to('font'),
              r = to('text'),
              n = to('font-weight'),
              a = to('tracking'),
              s = to('leading'),
              o = to('breakpoint'),
              i = to('container'),
              l = to('spacing'),
              c = to('radius'),
              u = to('shadow'),
              d = to('inset-shadow'),
              m = to('text-shadow'),
              f = to('drop-shadow'),
              p = to('blur'),
              h = to('perspective'),
              g = to('aspect'),
              x = to('ease'),
              y = to('animate'),
              v = () => [
                'center',
                'top',
                'bottom',
                'left',
                'right',
                'top-left',
                'left-top',
                'top-right',
                'right-top',
                'bottom-right',
                'right-bottom',
                'bottom-left',
                'left-bottom',
                _o,
                ko,
              ],
              b = () => [_o, ko, l],
              w = () => [uo, 'full', 'auto', ...b()],
              j = () => [fo, 'none', 'subgrid', _o, ko],
              k = () => ['auto', { span: ['full', fo, _o, ko] }, fo, _o, ko],
              N = () => [fo, 'auto', _o, ko],
              S = () => ['auto', 'min', 'max', 'fr', _o, ko],
              E = () => ['auto', ...b()],
              C = () => [
                uo,
                'auto',
                'full',
                'dvw',
                'dvh',
                'lvw',
                'lvh',
                'svw',
                'svh',
                'min',
                'max',
                'fit',
                ...b(),
              ],
              P = () => [e, _o, ko],
              _ = () => [
                'center',
                'top',
                'bottom',
                'left',
                'right',
                'top-left',
                'left-top',
                'top-right',
                'right-top',
                'bottom-right',
                'right-bottom',
                'bottom-left',
                'left-bottom',
                To,
                Eo,
                { position: [_o, ko] },
              ],
              O = () => ['auto', 'cover', 'contain', Lo, jo, { size: [_o, ko] }],
              R = () => [po, Oo, No],
              T = () => ['', 'none', 'full', c, _o, ko],
              L = () => ['', mo, Oo, No],
              A = () => [mo, po, To, Eo],
              z = () => ['', 'none', p, _o, ko],
              F = () => ['none', mo, _o, ko],
              M = () => ['none', mo, _o, ko],
              I = () => [mo, _o, ko],
              D = () => [uo, 'full', ...b()];
            return {
              cacheSize: 500,
              theme: {
                animate: ['spin', 'ping', 'pulse', 'bounce'],
                aspect: ['video'],
                blur: [ho],
                breakpoint: [ho],
                color: [go],
                container: [ho],
                'drop-shadow': [ho],
                ease: ['in', 'out', 'in-out'],
                font: [wo],
                'font-weight': [
                  'thin',
                  'extralight',
                  'light',
                  'normal',
                  'medium',
                  'semibold',
                  'bold',
                  'extrabold',
                  'black',
                ],
                'inset-shadow': [ho],
                leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
                perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
                radius: [ho],
                shadow: [ho],
                spacing: ['px', mo],
                text: [ho],
                'text-shadow': [ho],
                tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
              },
              classGroups: {
                aspect: [{ aspect: ['auto', 'square', uo, ko, _o, g] }],
                container: ['container'],
                columns: [{ columns: [mo, ko, _o, i] }],
                'break-after': [
                  {
                    'break-after': [
                      'auto',
                      'avoid',
                      'all',
                      'avoid-page',
                      'page',
                      'left',
                      'right',
                      'column',
                    ],
                  },
                ],
                'break-before': [
                  {
                    'break-before': [
                      'auto',
                      'avoid',
                      'all',
                      'avoid-page',
                      'page',
                      'left',
                      'right',
                      'column',
                    ],
                  },
                ],
                'break-inside': [
                  { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
                ],
                'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
                box: [{ box: ['border', 'content'] }],
                display: [
                  'block',
                  'inline-block',
                  'inline',
                  'flex',
                  'inline-flex',
                  'table',
                  'inline-table',
                  'table-caption',
                  'table-cell',
                  'table-column',
                  'table-column-group',
                  'table-footer-group',
                  'table-header-group',
                  'table-row-group',
                  'table-row',
                  'flow-root',
                  'grid',
                  'inline-grid',
                  'contents',
                  'list-item',
                  'hidden',
                ],
                sr: ['sr-only', 'not-sr-only'],
                float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
                clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
                isolation: ['isolate', 'isolation-auto'],
                'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
                'object-position': [{ object: v() }],
                overflow: [{ overflow: ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
                'overflow-x': [{ 'overflow-x': ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
                'overflow-y': [{ 'overflow-y': ['auto', 'hidden', 'clip', 'visible', 'scroll'] }],
                overscroll: [{ overscroll: ['auto', 'contain', 'none'] }],
                'overscroll-x': [{ 'overscroll-x': ['auto', 'contain', 'none'] }],
                'overscroll-y': [{ 'overscroll-y': ['auto', 'contain', 'none'] }],
                position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
                inset: [{ inset: w() }],
                'inset-x': [{ 'inset-x': w() }],
                'inset-y': [{ 'inset-y': w() }],
                start: [{ start: w() }],
                end: [{ end: w() }],
                top: [{ top: w() }],
                right: [{ right: w() }],
                bottom: [{ bottom: w() }],
                left: [{ left: w() }],
                visibility: ['visible', 'invisible', 'collapse'],
                z: [{ z: [fo, 'auto', _o, ko] }],
                basis: [{ basis: [uo, 'full', 'auto', i, ...b()] }],
                'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
                'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
                flex: [{ flex: [mo, uo, 'auto', 'initial', 'none', ko] }],
                grow: [{ grow: ['', mo, _o, ko] }],
                shrink: [{ shrink: ['', mo, _o, ko] }],
                order: [{ order: [fo, 'first', 'last', 'none', _o, ko] }],
                'grid-cols': [{ 'grid-cols': j() }],
                'col-start-end': [{ col: k() }],
                'col-start': [{ 'col-start': N() }],
                'col-end': [{ 'col-end': N() }],
                'grid-rows': [{ 'grid-rows': j() }],
                'row-start-end': [{ row: k() }],
                'row-start': [{ 'row-start': N() }],
                'row-end': [{ 'row-end': N() }],
                'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
                'auto-cols': [{ 'auto-cols': S() }],
                'auto-rows': [{ 'auto-rows': S() }],
                gap: [{ gap: b() }],
                'gap-x': [{ 'gap-x': b() }],
                'gap-y': [{ 'gap-y': b() }],
                'justify-content': [
                  {
                    justify: [
                      'start',
                      'end',
                      'center',
                      'between',
                      'around',
                      'evenly',
                      'stretch',
                      'baseline',
                      'center-safe',
                      'end-safe',
                      'normal',
                    ],
                  },
                ],
                'justify-items': [
                  {
                    'justify-items': [
                      'start',
                      'end',
                      'center',
                      'stretch',
                      'center-safe',
                      'end-safe',
                      'normal',
                    ],
                  },
                ],
                'justify-self': [
                  {
                    'justify-self': [
                      'auto',
                      'start',
                      'end',
                      'center',
                      'stretch',
                      'center-safe',
                      'end-safe',
                    ],
                  },
                ],
                'align-content': [
                  {
                    content: [
                      'normal',
                      'start',
                      'end',
                      'center',
                      'between',
                      'around',
                      'evenly',
                      'stretch',
                      'baseline',
                      'center-safe',
                      'end-safe',
                    ],
                  },
                ],
                'align-items': [
                  {
                    items: [
                      'start',
                      'end',
                      'center',
                      'stretch',
                      'center-safe',
                      'end-safe',
                      { baseline: ['', 'last'] },
                    ],
                  },
                ],
                'align-self': [
                  {
                    self: [
                      'auto',
                      'start',
                      'end',
                      'center',
                      'stretch',
                      'center-safe',
                      'end-safe',
                      { baseline: ['', 'last'] },
                    ],
                  },
                ],
                'place-content': [
                  {
                    'place-content': [
                      'start',
                      'end',
                      'center',
                      'between',
                      'around',
                      'evenly',
                      'stretch',
                      'baseline',
                      'center-safe',
                      'end-safe',
                    ],
                  },
                ],
                'place-items': [
                  {
                    'place-items': [
                      'start',
                      'end',
                      'center',
                      'stretch',
                      'center-safe',
                      'end-safe',
                      'baseline',
                    ],
                  },
                ],
                'place-self': [
                  {
                    'place-self': [
                      'auto',
                      'start',
                      'end',
                      'center',
                      'stretch',
                      'center-safe',
                      'end-safe',
                    ],
                  },
                ],
                p: [{ p: b() }],
                px: [{ px: b() }],
                py: [{ py: b() }],
                ps: [{ ps: b() }],
                pe: [{ pe: b() }],
                pt: [{ pt: b() }],
                pr: [{ pr: b() }],
                pb: [{ pb: b() }],
                pl: [{ pl: b() }],
                m: [{ m: E() }],
                mx: [{ mx: E() }],
                my: [{ my: E() }],
                ms: [{ ms: E() }],
                me: [{ me: E() }],
                mt: [{ mt: E() }],
                mr: [{ mr: E() }],
                mb: [{ mb: E() }],
                ml: [{ ml: E() }],
                'space-x': [{ 'space-x': b() }],
                'space-x-reverse': ['space-x-reverse'],
                'space-y': [{ 'space-y': b() }],
                'space-y-reverse': ['space-y-reverse'],
                size: [{ size: C() }],
                w: [{ w: [i, 'screen', ...C()] }],
                'min-w': [{ 'min-w': [i, 'screen', 'none', ...C()] }],
                'max-w': [{ 'max-w': [i, 'screen', 'none', 'prose', { screen: [o] }, ...C()] }],
                h: [{ h: ['screen', 'lh', ...C()] }],
                'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...C()] }],
                'max-h': [{ 'max-h': ['screen', 'lh', ...C()] }],
                'font-size': [{ text: ['base', r, Oo, No] }],
                'font-smoothing': ['antialiased', 'subpixel-antialiased'],
                'font-style': ['italic', 'not-italic'],
                'font-weight': [{ font: [n, _o, So] }],
                'font-stretch': [
                  {
                    'font-stretch': [
                      'ultra-condensed',
                      'extra-condensed',
                      'condensed',
                      'semi-condensed',
                      'normal',
                      'semi-expanded',
                      'expanded',
                      'extra-expanded',
                      'ultra-expanded',
                      po,
                      ko,
                    ],
                  },
                ],
                'font-family': [{ font: [Ro, ko, t] }],
                'fvn-normal': ['normal-nums'],
                'fvn-ordinal': ['ordinal'],
                'fvn-slashed-zero': ['slashed-zero'],
                'fvn-figure': ['lining-nums', 'oldstyle-nums'],
                'fvn-spacing': ['proportional-nums', 'tabular-nums'],
                'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
                tracking: [{ tracking: [a, _o, ko] }],
                'line-clamp': [{ 'line-clamp': [mo, 'none', _o, So] }],
                leading: [{ leading: [s, ...b()] }],
                'list-image': [{ 'list-image': ['none', _o, ko] }],
                'list-style-position': [{ list: ['inside', 'outside'] }],
                'list-style-type': [{ list: ['disc', 'decimal', 'none', _o, ko] }],
                'text-alignment': [
                  { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
                ],
                'placeholder-color': [{ placeholder: P() }],
                'text-color': [{ text: P() }],
                'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
                'text-decoration-style': [
                  { decoration: ['solid', 'dashed', 'dotted', 'double', 'wavy'] },
                ],
                'text-decoration-thickness': [{ decoration: [mo, 'from-font', 'auto', _o, No] }],
                'text-decoration-color': [{ decoration: P() }],
                'underline-offset': [{ 'underline-offset': [mo, 'auto', _o, ko] }],
                'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
                'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
                'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
                indent: [{ indent: b() }],
                'vertical-align': [
                  {
                    align: [
                      'baseline',
                      'top',
                      'middle',
                      'bottom',
                      'text-top',
                      'text-bottom',
                      'sub',
                      'super',
                      _o,
                      ko,
                    ],
                  },
                ],
                whitespace: [
                  {
                    whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'],
                  },
                ],
                break: [{ break: ['normal', 'words', 'all', 'keep'] }],
                wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
                hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
                content: [{ content: ['none', _o, ko] }],
                'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
                'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
                'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
                'bg-position': [{ bg: _() }],
                'bg-repeat': [{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] }],
                'bg-size': [{ bg: O() }],
                'bg-image': [
                  {
                    bg: [
                      'none',
                      {
                        linear: [{ to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, fo, _o, ko],
                        radial: ['', _o, ko],
                        conic: [fo, _o, ko],
                      },
                      Ao,
                      Co,
                    ],
                  },
                ],
                'bg-color': [{ bg: P() }],
                'gradient-from-pos': [{ from: R() }],
                'gradient-via-pos': [{ via: R() }],
                'gradient-to-pos': [{ to: R() }],
                'gradient-from': [{ from: P() }],
                'gradient-via': [{ via: P() }],
                'gradient-to': [{ to: P() }],
                rounded: [{ rounded: T() }],
                'rounded-s': [{ 'rounded-s': T() }],
                'rounded-e': [{ 'rounded-e': T() }],
                'rounded-t': [{ 'rounded-t': T() }],
                'rounded-r': [{ 'rounded-r': T() }],
                'rounded-b': [{ 'rounded-b': T() }],
                'rounded-l': [{ 'rounded-l': T() }],
                'rounded-ss': [{ 'rounded-ss': T() }],
                'rounded-se': [{ 'rounded-se': T() }],
                'rounded-ee': [{ 'rounded-ee': T() }],
                'rounded-es': [{ 'rounded-es': T() }],
                'rounded-tl': [{ 'rounded-tl': T() }],
                'rounded-tr': [{ 'rounded-tr': T() }],
                'rounded-br': [{ 'rounded-br': T() }],
                'rounded-bl': [{ 'rounded-bl': T() }],
                'border-w': [{ border: L() }],
                'border-w-x': [{ 'border-x': L() }],
                'border-w-y': [{ 'border-y': L() }],
                'border-w-s': [{ 'border-s': L() }],
                'border-w-e': [{ 'border-e': L() }],
                'border-w-t': [{ 'border-t': L() }],
                'border-w-r': [{ 'border-r': L() }],
                'border-w-b': [{ 'border-b': L() }],
                'border-w-l': [{ 'border-l': L() }],
                'divide-x': [{ 'divide-x': L() }],
                'divide-x-reverse': ['divide-x-reverse'],
                'divide-y': [{ 'divide-y': L() }],
                'divide-y-reverse': ['divide-y-reverse'],
                'border-style': [
                  { border: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] },
                ],
                'divide-style': [
                  { divide: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'] },
                ],
                'border-color': [{ border: P() }],
                'border-color-x': [{ 'border-x': P() }],
                'border-color-y': [{ 'border-y': P() }],
                'border-color-s': [{ 'border-s': P() }],
                'border-color-e': [{ 'border-e': P() }],
                'border-color-t': [{ 'border-t': P() }],
                'border-color-r': [{ 'border-r': P() }],
                'border-color-b': [{ 'border-b': P() }],
                'border-color-l': [{ 'border-l': P() }],
                'divide-color': [{ divide: P() }],
                'outline-style': [
                  { outline: ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden'] },
                ],
                'outline-offset': [{ 'outline-offset': [mo, _o, ko] }],
                'outline-w': [{ outline: ['', mo, Oo, No] }],
                'outline-color': [{ outline: P() }],
                shadow: [{ shadow: ['', 'none', u, zo, Po] }],
                'shadow-color': [{ shadow: P() }],
                'inset-shadow': [{ 'inset-shadow': ['none', d, zo, Po] }],
                'inset-shadow-color': [{ 'inset-shadow': P() }],
                'ring-w': [{ ring: L() }],
                'ring-w-inset': ['ring-inset'],
                'ring-color': [{ ring: P() }],
                'ring-offset-w': [{ 'ring-offset': [mo, No] }],
                'ring-offset-color': [{ 'ring-offset': P() }],
                'inset-ring-w': [{ 'inset-ring': L() }],
                'inset-ring-color': [{ 'inset-ring': P() }],
                'text-shadow': [{ 'text-shadow': ['none', m, zo, Po] }],
                'text-shadow-color': [{ 'text-shadow': P() }],
                opacity: [{ opacity: [mo, _o, ko] }],
                'mix-blend': [
                  {
                    'mix-blend': [
                      'normal',
                      'multiply',
                      'screen',
                      'overlay',
                      'darken',
                      'lighten',
                      'color-dodge',
                      'color-burn',
                      'hard-light',
                      'soft-light',
                      'difference',
                      'exclusion',
                      'hue',
                      'saturation',
                      'color',
                      'luminosity',
                      'plus-darker',
                      'plus-lighter',
                    ],
                  },
                ],
                'bg-blend': [
                  {
                    'bg-blend': [
                      'normal',
                      'multiply',
                      'screen',
                      'overlay',
                      'darken',
                      'lighten',
                      'color-dodge',
                      'color-burn',
                      'hard-light',
                      'soft-light',
                      'difference',
                      'exclusion',
                      'hue',
                      'saturation',
                      'color',
                      'luminosity',
                    ],
                  },
                ],
                'mask-clip': [
                  { 'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
                  'mask-no-clip',
                ],
                'mask-composite': [{ mask: ['add', 'subtract', 'intersect', 'exclude'] }],
                'mask-image-linear-pos': [{ 'mask-linear': [mo] }],
                'mask-image-linear-from-pos': [{ 'mask-linear-from': A() }],
                'mask-image-linear-to-pos': [{ 'mask-linear-to': A() }],
                'mask-image-linear-from-color': [{ 'mask-linear-from': P() }],
                'mask-image-linear-to-color': [{ 'mask-linear-to': P() }],
                'mask-image-t-from-pos': [{ 'mask-t-from': A() }],
                'mask-image-t-to-pos': [{ 'mask-t-to': A() }],
                'mask-image-t-from-color': [{ 'mask-t-from': P() }],
                'mask-image-t-to-color': [{ 'mask-t-to': P() }],
                'mask-image-r-from-pos': [{ 'mask-r-from': A() }],
                'mask-image-r-to-pos': [{ 'mask-r-to': A() }],
                'mask-image-r-from-color': [{ 'mask-r-from': P() }],
                'mask-image-r-to-color': [{ 'mask-r-to': P() }],
                'mask-image-b-from-pos': [{ 'mask-b-from': A() }],
                'mask-image-b-to-pos': [{ 'mask-b-to': A() }],
                'mask-image-b-from-color': [{ 'mask-b-from': P() }],
                'mask-image-b-to-color': [{ 'mask-b-to': P() }],
                'mask-image-l-from-pos': [{ 'mask-l-from': A() }],
                'mask-image-l-to-pos': [{ 'mask-l-to': A() }],
                'mask-image-l-from-color': [{ 'mask-l-from': P() }],
                'mask-image-l-to-color': [{ 'mask-l-to': P() }],
                'mask-image-x-from-pos': [{ 'mask-x-from': A() }],
                'mask-image-x-to-pos': [{ 'mask-x-to': A() }],
                'mask-image-x-from-color': [{ 'mask-x-from': P() }],
                'mask-image-x-to-color': [{ 'mask-x-to': P() }],
                'mask-image-y-from-pos': [{ 'mask-y-from': A() }],
                'mask-image-y-to-pos': [{ 'mask-y-to': A() }],
                'mask-image-y-from-color': [{ 'mask-y-from': P() }],
                'mask-image-y-to-color': [{ 'mask-y-to': P() }],
                'mask-image-radial': [{ 'mask-radial': [_o, ko] }],
                'mask-image-radial-from-pos': [{ 'mask-radial-from': A() }],
                'mask-image-radial-to-pos': [{ 'mask-radial-to': A() }],
                'mask-image-radial-from-color': [{ 'mask-radial-from': P() }],
                'mask-image-radial-to-color': [{ 'mask-radial-to': P() }],
                'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
                'mask-image-radial-size': [
                  {
                    'mask-radial': [{ closest: ['side', 'corner'], farthest: ['side', 'corner'] }],
                  },
                ],
                'mask-image-radial-pos': [
                  {
                    'mask-radial-at': [
                      'center',
                      'top',
                      'bottom',
                      'left',
                      'right',
                      'top-left',
                      'left-top',
                      'top-right',
                      'right-top',
                      'bottom-right',
                      'right-bottom',
                      'bottom-left',
                      'left-bottom',
                    ],
                  },
                ],
                'mask-image-conic-pos': [{ 'mask-conic': [mo] }],
                'mask-image-conic-from-pos': [{ 'mask-conic-from': A() }],
                'mask-image-conic-to-pos': [{ 'mask-conic-to': A() }],
                'mask-image-conic-from-color': [{ 'mask-conic-from': P() }],
                'mask-image-conic-to-color': [{ 'mask-conic-to': P() }],
                'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
                'mask-origin': [
                  { 'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
                ],
                'mask-position': [{ mask: _() }],
                'mask-repeat': [
                  { mask: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] },
                ],
                'mask-size': [{ mask: O() }],
                'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
                'mask-image': [{ mask: ['none', _o, ko] }],
                filter: [{ filter: ['', 'none', _o, ko] }],
                blur: [{ blur: z() }],
                brightness: [{ brightness: [mo, _o, ko] }],
                contrast: [{ contrast: [mo, _o, ko] }],
                'drop-shadow': [{ 'drop-shadow': ['', 'none', f, zo, Po] }],
                'drop-shadow-color': [{ 'drop-shadow': P() }],
                grayscale: [{ grayscale: ['', mo, _o, ko] }],
                'hue-rotate': [{ 'hue-rotate': [mo, _o, ko] }],
                invert: [{ invert: ['', mo, _o, ko] }],
                saturate: [{ saturate: [mo, _o, ko] }],
                sepia: [{ sepia: ['', mo, _o, ko] }],
                'backdrop-filter': [{ 'backdrop-filter': ['', 'none', _o, ko] }],
                'backdrop-blur': [{ 'backdrop-blur': z() }],
                'backdrop-brightness': [{ 'backdrop-brightness': [mo, _o, ko] }],
                'backdrop-contrast': [{ 'backdrop-contrast': [mo, _o, ko] }],
                'backdrop-grayscale': [{ 'backdrop-grayscale': ['', mo, _o, ko] }],
                'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [mo, _o, ko] }],
                'backdrop-invert': [{ 'backdrop-invert': ['', mo, _o, ko] }],
                'backdrop-opacity': [{ 'backdrop-opacity': [mo, _o, ko] }],
                'backdrop-saturate': [{ 'backdrop-saturate': [mo, _o, ko] }],
                'backdrop-sepia': [{ 'backdrop-sepia': ['', mo, _o, ko] }],
                'border-collapse': [{ border: ['collapse', 'separate'] }],
                'border-spacing': [{ 'border-spacing': b() }],
                'border-spacing-x': [{ 'border-spacing-x': b() }],
                'border-spacing-y': [{ 'border-spacing-y': b() }],
                'table-layout': [{ table: ['auto', 'fixed'] }],
                caption: [{ caption: ['top', 'bottom'] }],
                transition: [
                  {
                    transition: [
                      '',
                      'all',
                      'colors',
                      'opacity',
                      'shadow',
                      'transform',
                      'none',
                      _o,
                      ko,
                    ],
                  },
                ],
                'transition-behavior': [{ transition: ['normal', 'discrete'] }],
                duration: [{ duration: [mo, 'initial', _o, ko] }],
                ease: [{ ease: ['linear', 'initial', x, _o, ko] }],
                delay: [{ delay: [mo, _o, ko] }],
                animate: [{ animate: ['none', y, _o, ko] }],
                backface: [{ backface: ['hidden', 'visible'] }],
                perspective: [{ perspective: [h, _o, ko] }],
                'perspective-origin': [{ 'perspective-origin': v() }],
                rotate: [{ rotate: F() }],
                'rotate-x': [{ 'rotate-x': F() }],
                'rotate-y': [{ 'rotate-y': F() }],
                'rotate-z': [{ 'rotate-z': F() }],
                scale: [{ scale: M() }],
                'scale-x': [{ 'scale-x': M() }],
                'scale-y': [{ 'scale-y': M() }],
                'scale-z': [{ 'scale-z': M() }],
                'scale-3d': ['scale-3d'],
                skew: [{ skew: I() }],
                'skew-x': [{ 'skew-x': I() }],
                'skew-y': [{ 'skew-y': I() }],
                transform: [{ transform: [_o, ko, '', 'none', 'gpu', 'cpu'] }],
                'transform-origin': [{ origin: v() }],
                'transform-style': [{ transform: ['3d', 'flat'] }],
                translate: [{ translate: D() }],
                'translate-x': [{ 'translate-x': D() }],
                'translate-y': [{ 'translate-y': D() }],
                'translate-z': [{ 'translate-z': D() }],
                'translate-none': ['translate-none'],
                accent: [{ accent: P() }],
                appearance: [{ appearance: ['none', 'auto'] }],
                'caret-color': [{ caret: P() }],
                'color-scheme': [
                  { scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light'] },
                ],
                cursor: [
                  {
                    cursor: [
                      'auto',
                      'default',
                      'pointer',
                      'wait',
                      'text',
                      'move',
                      'help',
                      'not-allowed',
                      'none',
                      'context-menu',
                      'progress',
                      'cell',
                      'crosshair',
                      'vertical-text',
                      'alias',
                      'copy',
                      'no-drop',
                      'grab',
                      'grabbing',
                      'all-scroll',
                      'col-resize',
                      'row-resize',
                      'n-resize',
                      'e-resize',
                      's-resize',
                      'w-resize',
                      'ne-resize',
                      'nw-resize',
                      'se-resize',
                      'sw-resize',
                      'ew-resize',
                      'ns-resize',
                      'nesw-resize',
                      'nwse-resize',
                      'zoom-in',
                      'zoom-out',
                      _o,
                      ko,
                    ],
                  },
                ],
                'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
                'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
                resize: [{ resize: ['none', '', 'y', 'x'] }],
                'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
                'scroll-m': [{ 'scroll-m': b() }],
                'scroll-mx': [{ 'scroll-mx': b() }],
                'scroll-my': [{ 'scroll-my': b() }],
                'scroll-ms': [{ 'scroll-ms': b() }],
                'scroll-me': [{ 'scroll-me': b() }],
                'scroll-mt': [{ 'scroll-mt': b() }],
                'scroll-mr': [{ 'scroll-mr': b() }],
                'scroll-mb': [{ 'scroll-mb': b() }],
                'scroll-ml': [{ 'scroll-ml': b() }],
                'scroll-p': [{ 'scroll-p': b() }],
                'scroll-px': [{ 'scroll-px': b() }],
                'scroll-py': [{ 'scroll-py': b() }],
                'scroll-ps': [{ 'scroll-ps': b() }],
                'scroll-pe': [{ 'scroll-pe': b() }],
                'scroll-pt': [{ 'scroll-pt': b() }],
                'scroll-pr': [{ 'scroll-pr': b() }],
                'scroll-pb': [{ 'scroll-pb': b() }],
                'scroll-pl': [{ 'scroll-pl': b() }],
                'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
                'snap-stop': [{ snap: ['normal', 'always'] }],
                'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
                'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
                touch: [{ touch: ['auto', 'none', 'manipulation'] }],
                'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
                'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
                'touch-pz': ['touch-pinch-zoom'],
                select: [{ select: ['none', 'text', 'all', 'auto'] }],
                'will-change': [
                  { 'will-change': ['auto', 'scroll', 'contents', 'transform', _o, ko] },
                ],
                fill: [{ fill: ['none', ...P()] }],
                'stroke-w': [{ stroke: [mo, Oo, No, So] }],
                stroke: [{ stroke: ['none', ...P()] }],
                'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
              },
              conflictingClassGroups: {
                overflow: ['overflow-x', 'overflow-y'],
                overscroll: ['overscroll-x', 'overscroll-y'],
                inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
                'inset-x': ['right', 'left'],
                'inset-y': ['top', 'bottom'],
                flex: ['basis', 'grow', 'shrink'],
                gap: ['gap-x', 'gap-y'],
                p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
                px: ['pr', 'pl'],
                py: ['pt', 'pb'],
                m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
                mx: ['mr', 'ml'],
                my: ['mt', 'mb'],
                size: ['w', 'h'],
                'font-size': ['leading'],
                'fvn-normal': [
                  'fvn-ordinal',
                  'fvn-slashed-zero',
                  'fvn-figure',
                  'fvn-spacing',
                  'fvn-fraction',
                ],
                'fvn-ordinal': ['fvn-normal'],
                'fvn-slashed-zero': ['fvn-normal'],
                'fvn-figure': ['fvn-normal'],
                'fvn-spacing': ['fvn-normal'],
                'fvn-fraction': ['fvn-normal'],
                'line-clamp': ['display', 'overflow'],
                rounded: [
                  'rounded-s',
                  'rounded-e',
                  'rounded-t',
                  'rounded-r',
                  'rounded-b',
                  'rounded-l',
                  'rounded-ss',
                  'rounded-se',
                  'rounded-ee',
                  'rounded-es',
                  'rounded-tl',
                  'rounded-tr',
                  'rounded-br',
                  'rounded-bl',
                ],
                'rounded-s': ['rounded-ss', 'rounded-es'],
                'rounded-e': ['rounded-se', 'rounded-ee'],
                'rounded-t': ['rounded-tl', 'rounded-tr'],
                'rounded-r': ['rounded-tr', 'rounded-br'],
                'rounded-b': ['rounded-br', 'rounded-bl'],
                'rounded-l': ['rounded-tl', 'rounded-bl'],
                'border-spacing': ['border-spacing-x', 'border-spacing-y'],
                'border-w': [
                  'border-w-x',
                  'border-w-y',
                  'border-w-s',
                  'border-w-e',
                  'border-w-t',
                  'border-w-r',
                  'border-w-b',
                  'border-w-l',
                ],
                'border-w-x': ['border-w-r', 'border-w-l'],
                'border-w-y': ['border-w-t', 'border-w-b'],
                'border-color': [
                  'border-color-x',
                  'border-color-y',
                  'border-color-s',
                  'border-color-e',
                  'border-color-t',
                  'border-color-r',
                  'border-color-b',
                  'border-color-l',
                ],
                'border-color-x': ['border-color-r', 'border-color-l'],
                'border-color-y': ['border-color-t', 'border-color-b'],
                translate: ['translate-x', 'translate-y', 'translate-none'],
                'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
                'scroll-m': [
                  'scroll-mx',
                  'scroll-my',
                  'scroll-ms',
                  'scroll-me',
                  'scroll-mt',
                  'scroll-mr',
                  'scroll-mb',
                  'scroll-ml',
                ],
                'scroll-mx': ['scroll-mr', 'scroll-ml'],
                'scroll-my': ['scroll-mt', 'scroll-mb'],
                'scroll-p': [
                  'scroll-px',
                  'scroll-py',
                  'scroll-ps',
                  'scroll-pe',
                  'scroll-pt',
                  'scroll-pr',
                  'scroll-pb',
                  'scroll-pl',
                ],
                'scroll-px': ['scroll-pr', 'scroll-pl'],
                'scroll-py': ['scroll-pt', 'scroll-pb'],
                touch: ['touch-x', 'touch-y', 'touch-pz'],
                'touch-x': ['touch'],
                'touch-y': ['touch'],
                'touch-pz': ['touch'],
              },
              conflictingClassGroupModifiers: { 'font-size': ['leading'] },
              orderSensitiveModifiers: [
                '*',
                '**',
                'after',
                'backdrop',
                'before',
                'details-content',
                'file',
                'first-letter',
                'first-line',
                'marker',
                'placeholder',
                'selection',
              ],
            };
          }),
        Vo = eo(qo);
      function Go() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return Vo(zs(t));
      }
      const Qo = Is(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          {
            variants: {
              variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                  'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline: 'bg-muted hover:bg-accent hover:text-accent-foreground shadow-sm',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4 hover:underline',
              },
              size: {
                default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
                'icon-sm': 'size-8',
                'icon-lg': 'size-10',
              },
            },
            defaultVariants: { variant: 'default', size: 'default' },
          }
        ),
        Yo = n.forwardRef((e, t) => {
          let { className: r, variant: n, size: a, asChild: s = !1, ...o } = e;
          const i = s ? Os : 'button';
          return (0, xa.jsx)(i, {
            className: Go(Qo({ variant: n, size: a, className: r })),
            ref: t,
            ...o,
          });
        });
      Yo.displayName = 'Button';
      const Ko = n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', {
          ref: t,
          className: Go(
            'bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm',
            r
          ),
          ...n,
        });
      });
      Ko.displayName = 'Card';
      n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', {
          ref: t,
          className: Go(
            '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
            r
          ),
          ...n,
        });
      }).displayName = 'CardHeader';
      n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', { ref: t, className: Go('leading-none font-semibold', r), ...n });
      }).displayName = 'CardTitle';
      n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', {
          ref: t,
          className: Go('text-muted-foreground text-sm', r),
          ...n,
        });
      }).displayName = 'CardDescription';
      n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', {
          ref: t,
          className: Go('col-start-2 row-span-2 row-start-1 self-start justify-self-end', r),
          ...n,
        });
      }).displayName = 'CardAction';
      const Zo = n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', { ref: t, className: Go('px-6', r), ...n });
      });
      Zo.displayName = 'CardContent';
      n.forwardRef((e, t) => {
        let { className: r, ...n } = e;
        return (0, xa.jsx)('div', {
          ref: t,
          className: Go('flex items-center px-6 [.border-t]:pt-6', r),
          ...n,
        });
      }).displayName = 'CardFooter';
      const Jo = Is(
          'inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow] overflow-hidden',
          {
            variants: {
              variant: {
                default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                destructive:
                  'bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
              },
            },
            defaultVariants: { variant: 'default' },
          }
        ),
        Xo = n.forwardRef((e, t) => {
          let { className: r, variant: n, asChild: a = !1, ...s } = e;
          const o = a ? Os : 'span';
          return (0, xa.jsx)(o, { className: Go(Jo({ variant: n }), r), ref: t, ...s });
        });
      Xo.displayName = 'Badge';
      const ei = n.forwardRef((e, t) => {
        let { className: r, type: n, ...a } = e;
        return (0, xa.jsx)('input', {
          type: n,
          className: Go(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md bg-muted px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:ring-ring focus-visible:ring-2',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:bg-destructive/10',
            r
          ),
          ref: t,
          ...a,
        });
      });
      function ti(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z',
          })
        );
      }
      ei.displayName = 'Input';
      const ri = n.forwardRef(ti);
      function ni(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              fill: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            d: 'm11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z',
          })
        );
      }
      const ai = n.forwardRef(ni),
        si = (e) =>
          e
            ? e.startsWith('http://') || e.startsWith('https://') || e.startsWith('/')
              ? e
              : `/${e}`
            : '',
        oi = (e) => {
          let { product: t, viewMode: r = 'grid' } = e;
          const { addToCart: n } = Ca(),
            { addToWishlist: a, removeFromWishlist: s, isInWishlist: o } = Ta(),
            { isAuthenticated: i } = ja(),
            l = async () => {
              i ? await n(t.id, 1) : Rt.error('Please login to add items to cart');
            },
            c = async () => {
              i ? (o(t.id) ? await s(t.id) : await a(t)) : Rt.error('Please login to use wishlist');
            },
            u = o(t.id),
            d =
              si(t.images[0]) || t.images[0] || 'https://via.placeholder.com/300x300?text=No+Image';
          return 'list' === r
            ? (0, xa.jsxs)('div', {
                className:
                  'bg-card rounded-lg shadow-md p-4 flex space-x-4 hover:shadow-lg transition-shadow duration-200',
                children: [
                  (0, xa.jsx)('div', {
                    className: 'w-24 h-24 flex-shrink-0',
                    children: (0, xa.jsx)('img', {
                      src: d,
                      alt: t.name,
                      className: 'w-full h-full object-cover rounded-md',
                    }),
                  }),
                  (0, xa.jsx)('div', {
                    className: 'flex-1',
                    children: (0, xa.jsxs)('div', {
                      className: 'flex justify-between items-start',
                      children: [
                        (0, xa.jsxs)('div', {
                          children: [
                            (0, xa.jsx)('h3', {
                              className: 'text-lg font-semibold text-foreground hover:text-primary',
                              children: (0, xa.jsx)(Oe, {
                                to: `/products/${t.id}`,
                                children: t.name,
                              }),
                            }),
                            (0, xa.jsx)('p', {
                              className: 'text-muted-foreground text-sm mb-2 line-clamp-2',
                              children: t.description,
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center mb-2',
                              children: [
                                (0, xa.jsx)('div', {
                                  className: 'flex items-center',
                                  children: [...Array(5)].map((e, r) =>
                                    (0, xa.jsx)(
                                      ri,
                                      {
                                        className:
                                          'h-4 w-4 ' +
                                          (r < Math.floor(t.rating)
                                            ? 'text-yellow-400'
                                            : 'text-muted'),
                                      },
                                      r
                                    )
                                  ),
                                }),
                                (0, xa.jsxs)('span', {
                                  className: 'ml-2 text-sm text-muted-foreground',
                                  children: ['(', t.reviews_count, ')'],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'text-right',
                          children: [
                            (0, xa.jsx)('div', {
                              className: 'text-2xl font-bold text-primary mb-2',
                              children: ha(t.price),
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex space-x-2',
                              children: [
                                (0, xa.jsx)(Yo, {
                                  onClick: c,
                                  variant: 'ghost',
                                  size: 'icon',
                                  children: u
                                    ? (0, xa.jsx)(ai, { className: 'h-5 w-5 text-red-500' })
                                    : (0, xa.jsx)(Fa, { className: 'h-5 w-5' }),
                                }),
                                (0, xa.jsx)(Oe, {
                                  to: `/products/${t.id}`,
                                  className:
                                    'bg-muted text-foreground px-3 py-1 rounded text-sm hover:bg-muted/80 transition-colors duration-200',
                                  children: 'View',
                                }),
                                (0, xa.jsx)(Yo, {
                                  onClick: l,
                                  variant: 'default',
                                  children: 'Add to Cart',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              })
            : (0, xa.jsxs)('div', {
                className:
                  'card-elevated product-card relative group transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl',
                children: [
                  (0, xa.jsx)(Yo, {
                    onClick: c,
                    variant: 'ghost',
                    size: 'icon',
                    className: 'absolute top-3 right-3 z-10 bg-card rounded-full shadow-md',
                    children: u
                      ? (0, xa.jsx)(ai, { className: 'h-5 w-5 text-red-500' })
                      : (0, xa.jsx)(Fa, {
                          className: 'h-5 w-5 text-muted-foreground hover:text-red-500',
                        }),
                  }),
                  (0, xa.jsx)('div', {
                    className: 'aspect-w-1 aspect-h-1 w-full overflow-hidden bg-muted',
                    children: (0, xa.jsx)('img', {
                      src: d,
                      alt: t.name,
                      className:
                        'w-full h-64 object-cover object-center product-image group-hover:scale-105 transition-transform duration-300',
                    }),
                  }),
                  (0, xa.jsxs)('div', {
                    className: 'p-4',
                    children: [
                      (0, xa.jsx)('h3', {
                        className: 'text-lg font-semibold text-foreground mb-2 hover:text-primary',
                        children: (0, xa.jsx)(Oe, { to: `/products/${t.id}`, children: t.name }),
                      }),
                      (0, xa.jsx)('p', {
                        className: 'text-muted-foreground text-sm mb-3 line-clamp-2 h-10',
                        children: t.description,
                      }),
                      (0, xa.jsxs)('div', {
                        className: 'flex items-center mb-3',
                        children: [
                          (0, xa.jsx)('div', {
                            className: 'flex items-center',
                            children: [...Array(5)].map((e, r) =>
                              (0, xa.jsx)(
                                ri,
                                {
                                  className:
                                    'h-5 w-5 ' +
                                    (r < Math.floor(t.rating) ? 'text-yellow-400' : 'text-muted'),
                                },
                                r
                              )
                            ),
                          }),
                          (0, xa.jsxs)('span', {
                            className: 'ml-2 text-sm text-muted-foreground',
                            children: ['(', t.reviews_count, ' reviews)'],
                          }),
                        ],
                      }),
                      (0, xa.jsxs)('div', {
                        className: 'flex items-center justify-between mb-4',
                        children: [
                          (0, xa.jsx)('span', {
                            className: 'text-3xl font-bold text-foreground',
                            children: ha(t.price),
                          }),
                          (0, xa.jsx)('span', {
                            className:
                              'text-sm font-medium text-secondary-foreground bg-secondary px-2 py-1 rounded',
                            children: t.brand,
                          }),
                        ],
                      }),
                      (0, xa.jsxs)('div', {
                        className: 'flex space-x-2',
                        children: [
                          (0, xa.jsx)(Oe, {
                            to: `/products/${t.id}`,
                            className:
                              'flex-1 bg-muted text-foreground py-2 px-4 rounded-md hover:bg-muted/80 transition-colors duration-300 text-center font-semibold',
                            children: 'View Details',
                          }),
                          (0, xa.jsxs)(Yo, {
                            onClick: l,
                            variant: 'default',
                            children: [
                              (0, xa.jsx)(Ia, { className: 'h-5 w-5 mr-2' }),
                              'Add to Cart',
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
        },
        ii = () => {
          const [e, t] = (0, n.useState)([]),
            [r, a] = (0, n.useState)([]),
            [s, o] = (0, n.useState)(!0);
          (0, n.useEffect)(() => {
            (async () => {
              try {
                o(!0);
                const [e, r] = await Promise.all([ea({ limit: 4 }), oa({ limit: 3 })]);
                (t(e.data.products || []), a(r.data.posts || []));
              } catch (e) {
                (console.error('Error fetching home data:', e), t([]), a([]));
              } finally {
                o(!1);
              }
            })();
          }, []);
          const i = [
            { name: 'Free Shipping', description: 'On orders over $100', icon: bs },
            { name: 'Quality Guarantee', description: 'All products warranted', icon: ws },
            { name: 'Secure Payment', description: 'Your data is protected', icon: js },
            { name: '24/7 Support', description: 'Always here to help', icon: ks },
          ];
          return s
            ? (0, xa.jsx)('div', {
                className: 'min-h-screen flex items-center justify-center',
                children: (0, xa.jsx)('div', { className: 'loading-spinner' }),
              })
            : (0, xa.jsxs)('div', {
                className: 'min-h-screen',
                children: [
                  (0, xa.jsxs)('section', {
                    className:
                      'relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background',
                    children: [
                      (0, xa.jsx)('video', {
                        autoPlay: !0,
                        muted: !0,
                        loop: !0,
                        playsInline: !0,
                        className: 'absolute inset-0 w-full h-full object-cover z-0',
                        children: (0, xa.jsx)('source', {
                          src: '/FitGear_Website_Hero_Section_Video.mp4',
                          type: 'video/mp4',
                        }),
                      }),
                      (0, xa.jsx)('div', {
                        className:
                          'absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10 pointer-events-none',
                      }),
                      (0, xa.jsx)('div', {
                        className:
                          'absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.05),transparent_50%)] pointer-events-none z-20',
                      }),
                      (0, xa.jsx)('div', {
                        className: 'container mx-auto px-4 sm:px-6 lg:px-8 relative z-30',
                        children: (0, xa.jsxs)('div', {
                          className:
                            'max-w-4xl mx-auto text-center shadow-xl rounded-2xl bg-black/20 backdrop-blur-sm p-8 md:p-14',
                          children: [
                            (0, xa.jsx)(Xo, {
                              variant: 'secondary',
                              className: 'mb-6 text-sm px-4 py-1.5 shadow',
                              children: 'Premium Fitness Equipment',
                            }),
                            (0, xa.jsx)('h1', {
                              className:
                                'text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight tracking-tight drop-shadow text-white',
                              children: 'Transform Your Fitness Journey',
                            }),
                            (0, xa.jsx)('p', {
                              className:
                                'text-xl md:text-2xl text-white/90 mb-10 text-pretty max-w-2xl mx-auto leading-relaxed drop-shadow-sm',
                              children:
                                'Discover premium sports equipment and accessories designed to help you reach your fitness goals faster.',
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex flex-col sm:flex-row gap-4 justify-center',
                              children: [
                                (0, xa.jsx)(Yo, {
                                  size: 'lg',
                                  className: 'text-lg px-8 h-12',
                                  asChild: !0,
                                  children: (0, xa.jsxs)(Oe, {
                                    to: '/products',
                                    children: [
                                      'Shop Now',
                                      (0, xa.jsx)(Ns, { className: 'ml-2 h-5 w-5' }),
                                    ],
                                  }),
                                }),
                                (0, xa.jsx)(Yo, {
                                  size: 'lg',
                                  variant: 'secondary',
                                  className: 'text-lg px-8 h-12',
                                  asChild: !0,
                                  children: (0, xa.jsx)(Oe, {
                                    to: '/blog',
                                    children: 'Learn More',
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, xa.jsx)('section', {
                    className: 'py-24 bg-background',
                    children: (0, xa.jsxs)('div', {
                      className: 'container mx-auto px-4 sm:px-6 lg:px-8',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'text-center mb-16',
                          children: [
                            (0, xa.jsxs)('h2', {
                              className: 'text-4xl font-bold mb-4 text-balance text-foreground',
                              children: [
                                'Why Choose ',
                                (0, xa.jsx)('span', {
                                  className: 'text-secondary',
                                  children: 'FitGear',
                                }),
                                '?',
                              ],
                            }),
                            (0, xa.jsx)('p', {
                              className:
                                'text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed',
                              children:
                                "We're committed to providing the best fitness equipment and exceptional service to help you succeed.",
                            }),
                          ],
                        }),
                        (0, xa.jsx)('div', {
                          className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
                          children: i.map((e) =>
                            (0, xa.jsx)(
                              Ko,
                              {
                                className:
                                  'border-0 shadow-lg bg-card hover:shadow-xl transition-shadow',
                                children: (0, xa.jsxs)(Zo, {
                                  className: 'pt-8 text-center',
                                  children: [
                                    (0, xa.jsx)('div', {
                                      className:
                                        'w-14 h-14 mx-auto mb-5 bg-secondary rounded-full flex items-center justify-center shadow-md',
                                      children: (0, xa.jsx)(e.icon, {
                                        className: 'w-7 h-7 text-secondary-foreground',
                                      }),
                                    }),
                                    (0, xa.jsx)('h3', {
                                      className: 'text-lg font-semibold mb-2 text-foreground',
                                      children: e.name,
                                    }),
                                    (0, xa.jsx)('p', {
                                      className: 'text-muted-foreground text-sm',
                                      children: e.description,
                                    }),
                                  ],
                                }),
                              },
                              e.name
                            )
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, xa.jsx)('section', {
                    className: 'py-24 bg-background',
                    children: (0, xa.jsxs)('div', {
                      className: 'container mx-auto px-4 sm:px-6 lg:px-8',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'text-center mb-16',
                          children: [
                            (0, xa.jsxs)('h2', {
                              className: 'text-4xl font-bold mb-4 text-balance text-foreground',
                              children: [
                                'Featured ',
                                (0, xa.jsx)('span', {
                                  className: 'text-secondary',
                                  children: 'Products',
                                }),
                              ],
                            }),
                            (0, xa.jsx)('p', {
                              className:
                                'text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed',
                              children:
                                'Discover our most popular fitness equipment, trusted by thousands of satisfied customers.',
                            }),
                          ],
                        }),
                        (0, xa.jsx)('div', {
                          className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
                          children:
                            e.length > 0
                              ? e.map((e) =>
                                  (0, xa.jsxs)(
                                    Ko,
                                    {
                                      className:
                                        'group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg',
                                      children: [
                                        (0, xa.jsx)('div', {
                                          className: 'aspect-square overflow-hidden bg-muted',
                                          children: (0, xa.jsx)('img', {
                                            src: (e.images && e.images[0]) || '/placeholder.svg',
                                            alt: e.name,
                                            className:
                                              'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300',
                                          }),
                                        }),
                                        (0, xa.jsxs)(Zo, {
                                          className: 'p-5',
                                          children: [
                                            (0, xa.jsxs)('div', {
                                              className: 'flex items-center gap-2 mb-2',
                                              children: [
                                                (0, xa.jsx)(Xo, {
                                                  variant: 'secondary',
                                                  className: 'text-xs font-semibold',
                                                  children: e.category,
                                                }),
                                                (0, xa.jsx)('div', {
                                                  className: 'flex items-center gap-1 ml-auto',
                                                  children: [...Array(5)].map((e, t) =>
                                                    (0, xa.jsx)(
                                                      Ss,
                                                      {
                                                        className:
                                                          'w-3.5 h-3.5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]',
                                                      },
                                                      t
                                                    )
                                                  ),
                                                }),
                                              ],
                                            }),
                                            (0, xa.jsx)('h3', {
                                              className:
                                                'font-semibold mb-2 text-balance text-foreground',
                                              children: e.name,
                                            }),
                                            (0, xa.jsxs)('div', {
                                              className: 'flex items-center justify-between',
                                              children: [
                                                (0, xa.jsxs)('span', {
                                                  className: 'text-2xl font-bold text-primary',
                                                  children: ['$', e.price],
                                                }),
                                                (0, xa.jsx)(Yo, {
                                                  size: 'sm',
                                                  variant: 'ghost',
                                                  asChild: !0,
                                                  children: (0, xa.jsxs)(Oe, {
                                                    to: `/products/${e.id}`,
                                                    children: [
                                                      'View',
                                                      (0, xa.jsx)(Ns, {
                                                        className: 'ml-1 h-4 w-4',
                                                      }),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e.id
                                  )
                                )
                              : (0, xa.jsx)('div', {
                                  className: 'col-span-full text-center py-12',
                                  children: (0, xa.jsx)('p', {
                                    className: 'text-muted-foreground text-lg',
                                    children: 'No featured products are available at the moment.',
                                  }),
                                }),
                        }),
                        (0, xa.jsx)('div', {
                          className: 'text-center mt-12',
                          children: (0, xa.jsx)(Yo, {
                            size: 'lg',
                            variant: 'outline',
                            asChild: !0,
                            children: (0, xa.jsxs)(Oe, {
                              to: '/products',
                              children: [
                                'View All Products',
                                (0, xa.jsx)(Ns, { className: 'ml-2 h-5 w-5' }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, xa.jsx)('section', {
                    className: 'py-20 bg-primary/5',
                    children: (0, xa.jsx)('div', {
                      className: 'container mx-auto px-4 sm:px-6 lg:px-8',
                      children: (0, xa.jsx)('div', {
                        className: 'grid grid-cols-2 lg:grid-cols-4 gap-8 text-center',
                        children: [
                          { name: 'Happy Customers', value: '10,000+' },
                          { name: 'Products Sold', value: '50,000+' },
                          { name: 'Years Experience', value: '15+' },
                          { name: 'Countries Served', value: '25+' },
                        ].map((e) =>
                          (0, xa.jsxs)(
                            'div',
                            {
                              className: 'space-y-2',
                              children: [
                                (0, xa.jsx)('div', {
                                  className: 'text-4xl md:text-5xl font-bold text-primary mb-2',
                                  children: e.value,
                                }),
                                (0, xa.jsx)('div', {
                                  className: 'text-lg text-foreground/80',
                                  children: e.name,
                                }),
                              ],
                            },
                            e.name
                          )
                        ),
                      }),
                    }),
                  }),
                  (0, xa.jsx)('section', {
                    className: 'py-24 bg-background',
                    children: (0, xa.jsxs)('div', {
                      className: 'container mx-auto px-4 sm:px-6 lg:px-8',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'text-center mb-16',
                          children: [
                            (0, xa.jsx)('h2', {
                              className: 'text-4xl font-bold mb-4 text-balance text-foreground',
                              children: 'What Our Customers Say',
                            }),
                            (0, xa.jsx)('p', {
                              className:
                                'text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed',
                              children:
                                "Don't just take our word for it. Here's what our customers have to say about their experience.",
                            }),
                          ],
                        }),
                        (0, xa.jsx)('div', {
                          className: 'grid grid-cols-1 md:grid-cols-3 gap-8',
                          children: [
                            {
                              name: 'Sarah Johnson',
                              role: 'Personal Trainer',
                              content:
                                'The quality of FitGear equipment is unmatched. My clients have seen incredible results and the durability is outstanding.',
                              rating: 5,
                            },
                            {
                              name: 'Mike Chen',
                              role: 'Gym Owner',
                              content:
                                'Outstanding customer service and lightning-fast delivery. I recommend FitGear to every fitness enthusiast I meet.',
                              rating: 5,
                            },
                            {
                              name: 'Emma Davis',
                              role: 'Fitness Enthusiast',
                              content:
                                'The yoga mats are incredibly comfortable and built to last. Perfect for my daily practice and they look amazing too.',
                              rating: 5,
                            },
                          ].map((e, t) =>
                            (0, xa.jsx)(
                              Ko,
                              {
                                className: 'border-0 shadow-lg hover:shadow-xl transition-shadow',
                                children: (0, xa.jsxs)(Zo, {
                                  className: 'pt-8',
                                  children: [
                                    (0, xa.jsx)('div', {
                                      className: 'flex items-center gap-1 mb-4',
                                      children: [...Array(e.rating)].map((e, t) =>
                                        (0, xa.jsx)(
                                          Ss,
                                          {
                                            className:
                                              'w-5 h-5 fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))]',
                                          },
                                          t
                                        )
                                      ),
                                    }),
                                    (0, xa.jsxs)('p', {
                                      className: 'text-muted-foreground mb-6 leading-relaxed',
                                      children: ['"', e.content, '"'],
                                    }),
                                    (0, xa.jsxs)('div', {
                                      className: 'flex items-center gap-3',
                                      children: [
                                        (0, xa.jsx)('div', {
                                          className:
                                            'w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-md',
                                          children: (0, xa.jsx)('span', {
                                            className:
                                              'text-secondary-foreground font-semibold text-lg',
                                            children: e.name.charAt(0),
                                          }),
                                        }),
                                        (0, xa.jsxs)('div', {
                                          children: [
                                            (0, xa.jsx)('div', {
                                              className: 'font-semibold text-foreground',
                                              children: e.name,
                                            }),
                                            (0, xa.jsx)('div', {
                                              className: 'text-sm text-muted-foreground',
                                              children: e.role,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              },
                              t
                            )
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, xa.jsx)('section', {
                    className: 'py-24 bg-background',
                    children: (0, xa.jsx)('div', {
                      className: 'container mx-auto px-4 sm:px-6 lg:px-8',
                      children: (0, xa.jsx)(Ko, {
                        className: 'max-w-3xl mx-auto border-0 shadow-xl',
                        children: (0, xa.jsxs)(Zo, {
                          className: 'p-8 md:p-12 text-center',
                          children: [
                            (0, xa.jsxs)('h2', {
                              className:
                                'text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground',
                              children: [
                                'Stay Updated with ',
                                (0, xa.jsx)('span', {
                                  className: 'text-secondary',
                                  children: 'FitGear',
                                }),
                              ],
                            }),
                            (0, xa.jsx)('p', {
                              className:
                                'text-lg text-muted-foreground mb-8 text-pretty leading-relaxed',
                              children:
                                'Get the latest fitness tips, product launches, and exclusive offers delivered to your inbox.',
                            }),
                            (0, xa.jsxs)('form', {
                              className: 'max-w-md mx-auto flex flex-col sm:flex-row gap-3',
                              children: [
                                (0, xa.jsx)(ei, {
                                  type: 'email',
                                  placeholder: 'Enter your email',
                                  className: 'flex-1 h-12 bg-muted',
                                }),
                                (0, xa.jsx)(Yo, {
                                  type: 'submit',
                                  size: 'lg',
                                  className: 'h-12 px-8',
                                  children: 'Subscribe',
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className:
                                'flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground',
                              children: [
                                (0, xa.jsxs)('div', {
                                  className: 'flex items-center gap-2',
                                  children: [
                                    (0, xa.jsx)(Es, {
                                      className: 'w-4 h-4 text-[hsl(var(--secondary))]',
                                    }),
                                    (0, xa.jsx)('span', { children: 'No spam' }),
                                  ],
                                }),
                                (0, xa.jsxs)('div', {
                                  className: 'flex items-center gap-2',
                                  children: [
                                    (0, xa.jsx)(Es, {
                                      className: 'w-4 h-4 text-[hsl(var(--secondary))]',
                                    }),
                                    (0, xa.jsx)('span', { children: 'Unsubscribe anytime' }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                  }),
                ],
              });
        },
        li = (e) => {
          let { viewMode: t } = e;
          return 'list' === t
            ? (0, xa.jsxs)('div', {
                className: 'bg-white rounded-lg shadow-md p-4 flex space-x-4 animate-pulse',
                children: [
                  (0, xa.jsx)('div', { className: 'w-24 h-24 bg-gray-300 rounded-md' }),
                  (0, xa.jsxs)('div', {
                    className: 'flex-1 space-y-4 py-1',
                    children: [
                      (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded w-3/4' }),
                      (0, xa.jsxs)('div', {
                        className: 'space-y-2',
                        children: [
                          (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded' }),
                          (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded w-5/6' }),
                        ],
                      }),
                      (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded w-1/4' }),
                    ],
                  }),
                ],
              })
            : (0, xa.jsxs)('div', {
                className: 'card-elevated product-card animate-pulse',
                children: [
                  (0, xa.jsx)('div', { className: 'w-full h-64 bg-gray-300' }),
                  (0, xa.jsxs)('div', {
                    className: 'p-4 space-y-4',
                    children: [
                      (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded w-3/4' }),
                      (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded' }),
                      (0, xa.jsx)('div', { className: 'h-4 bg-gray-300 rounded w-1/2' }),
                      (0, xa.jsxs)('div', {
                        className: 'flex justify-between items-center',
                        children: [
                          (0, xa.jsx)('div', { className: 'h-8 bg-gray-300 rounded w-1/3' }),
                          (0, xa.jsx)('div', { className: 'h-8 bg-gray-300 rounded w-1/4' }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
        },
        ci = () => {
          const [e, t] = (0, n.useState)([]),
            [r, a] = (0, n.useState)([]),
            [s, o] = (0, n.useState)(!0),
            [i, l] = (0, n.useState)('grid'),
            [c, u] = (0, n.useState)(!1),
            [d, m] = (0, n.useState)({
              category: 'all',
              search: '',
              minPrice: '',
              maxPrice: '',
              sortBy: 'name',
            }),
            [f] = Le(),
            p = te();
          (0, n.useEffect)(() => {
            (h(), g());
          }, [d]);
          const h = async () => {
              o(!0);
              try {
                let e = [
                  {
                    id: 1,
                    name: 'Premium Yoga Mat',
                    price: 49.99,
                    category: 'Yoga',
                    images: ['/premium-yoga-mat.png'],
                    rating: 4.8,
                    reviews_count: 234,
                    inStock: !0,
                    description: 'High-quality yoga mat for all levels.',
                    brand: 'ZenFit',
                  },
                  {
                    id: 2,
                    name: 'Adjustable Dumbbells Set',
                    price: 299.99,
                    category: 'Strength',
                    images: ['/adjustable-dumbbells.jpg'],
                    rating: 4.9,
                    reviews_count: 567,
                    inStock: !0,
                    description: 'Versatile dumbbell set for strength training.',
                    brand: 'FitGear',
                  },
                  {
                    id: 3,
                    name: 'Resistance Bands Set',
                    price: 29.99,
                    category: 'Accessories',
                    images: ['/resistance-bands-exercise.png'],
                    rating: 4.6,
                    reviews_count: 189,
                    inStock: !0,
                    description: 'Set of resistance bands for workouts.',
                    brand: 'FlexFit',
                  },
                  {
                    id: 4,
                    name: 'Smart Jump Rope',
                    price: 39.99,
                    category: 'Cardio',
                    images: ['/smart-jump-rope.jpg'],
                    rating: 4.7,
                    reviews_count: 312,
                    inStock: !0,
                    description: 'Track your cardio with this smart jump rope.',
                    brand: 'CardioMax',
                  },
                  {
                    id: 5,
                    name: 'Foam Roller Pro',
                    price: 34.99,
                    category: 'Recovery',
                    images: ['/foam-roller.jpg'],
                    rating: 4.5,
                    reviews_count: 156,
                    inStock: !0,
                    description: 'Deep tissue foam roller for recovery.',
                    brand: 'RecoverFit',
                  },
                  {
                    id: 6,
                    name: 'Kettlebell Set',
                    price: 149.99,
                    category: 'Strength',
                    images: ['/kettlebell-set.jpg'],
                    rating: 4.8,
                    reviews_count: 423,
                    inStock: !1,
                    description: 'Professional kettlebell set for all levels.',
                    brand: 'KettlePro',
                  },
                  {
                    id: 7,
                    name: "Men's Workout Tank",
                    price: 34.99,
                    category: 'Apparel',
                    images: ['/mens-workout-tank.jpg'],
                    rating: 4.6,
                    reviews_count: 42,
                    inStock: !0,
                    description: 'Moisture-wicking and breathable tank top.',
                    brand: 'FitGear Wear',
                  },
                  {
                    id: 8,
                    name: "Women's Yoga Pants",
                    price: 59.99,
                    category: 'Apparel',
                    images: ['/yoga-pant.jpg'],
                    rating: 4.8,
                    reviews_count: 95,
                    inStock: !0,
                    description: 'High-waisted and squat-proof yoga pants.',
                    brand: 'ZenFit',
                  },
                  {
                    id: 9,
                    name: 'Peloton-Style Bike',
                    price: 999.99,
                    category: 'Cardio',
                    images: ['/peloton-style-bike.jpg'],
                    rating: 4.8,
                    reviews_count: 52,
                    inStock: !0,
                    description: 'High-energy indoor cycling bike.',
                    brand: 'CycleFit',
                  },
                  {
                    id: 10,
                    name: 'Smart Treadmill',
                    price: 1299.99,
                    category: 'Cardio',
                    images: ['/smart-treadmill.jpg'],
                    rating: 4.9,
                    reviews_count: 38,
                    inStock: !0,
                    description: 'Interactive treadmill with touch screen.',
                    brand: 'CardioMax',
                  },
                  {
                    id: 11,
                    name: 'Pro Kettlebell',
                    price: 79.99,
                    category: 'Accessories',
                    images: ['/kettlebell-set.jpg'],
                    rating: 4.9,
                    reviews_count: 60,
                    inStock: !0,
                    description: 'Competition-grade kettlebell.',
                    brand: 'KettlePro',
                  },
                  {
                    id: 12,
                    name: 'Professional Olympic Barbell',
                    price: 299.99,
                    category: 'Strength',
                    images: ['/olympic-barbell.jpg'],
                    rating: 4.8,
                    reviews_count: 24,
                    inStock: !0,
                    description: 'High-quality Olympic barbell.',
                    brand: 'FitGear Pro',
                  },
                ];
                (d.category &&
                  'all' !== d.category &&
                  (e = e.filter((e) => e.category === d.category)),
                  d.search &&
                    (e = e.filter((e) => e.name.toLowerCase().includes(d.search.toLowerCase()))),
                  d.minPrice && (e = e.filter((e) => e.price >= Number.parseFloat(d.minPrice))),
                  d.maxPrice && (e = e.filter((e) => e.price <= Number.parseFloat(d.maxPrice))),
                  'price_low' === d.sortBy
                    ? e.sort((e, t) => e.price - t.price)
                    : 'price_high' === d.sortBy
                      ? e.sort((e, t) => t.price - e.price)
                      : 'rating' === d.sortBy
                        ? e.sort((e, t) => t.rating - e.rating)
                        : e.sort((e, t) => e.name.localeCompare(t.name)),
                  t(e));
              } catch (e) {
                t([]);
              } finally {
                o(!1);
              }
            },
            g = async () => {
              a(['Yoga', 'Strength', 'Cardio', 'Accessories', 'Recovery']);
            },
            x = (e, t) => {
              const r = { ...d, [e]: t };
              m(r);
              const n = new URLSearchParams();
              (Object.entries(r).forEach((e) => {
                let [t, r] = e;
                r && n.set(t, r);
              }),
                p(`/products?${n.toString()}`));
            },
            y = () => {
              (m({ category: 'all', search: '', minPrice: '', maxPrice: '', sortBy: 'name' }),
                p('/products'));
            };
          return (0, xa.jsx)('div', {
            className: 'min-h-screen bg-background',
            children: (0, xa.jsxs)('div', {
              className: 'container mx-auto px-4 py-12',
              children: [
                (0, xa.jsxs)('div', {
                  className: 'mb-12',
                  children: [
                    (0, xa.jsx)('h1', {
                      className: 'text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance',
                      children: 'Premium Fitness Equipment',
                    }),
                    (0, xa.jsxs)('p', {
                      className: 'text-lg text-muted-foreground text-pretty',
                      children: [
                        'Discover our curated collection of',
                        ' ',
                        (0, xa.jsx)('span', {
                          className: 'text-secondary font-semibold',
                          children: 'professional-grade',
                        }),
                        ' fitness gear',
                      ],
                    }),
                  ],
                }),
                (0, xa.jsxs)('div', {
                  className: 'flex flex-col lg:flex-row gap-8',
                  children: [
                    (0, xa.jsx)('aside', {
                      className: 'lg:w-72 ' + (c ? 'block' : 'hidden lg:block'),
                      children: (0, xa.jsxs)('div', {
                        className: 'bg-card rounded-lg p-6 sticky top-24 shadow-sm',
                        children: [
                          (0, xa.jsxs)('div', {
                            className: 'flex items-center justify-between mb-6',
                            children: [
                              (0, xa.jsx)('h2', {
                                className: 'text-lg font-semibold text-foreground',
                                children: 'Filters',
                              }),
                              (0, xa.jsx)(Yo, {
                                onClick: y,
                                size: 'sm',
                                variant: 'ghost',
                                children: 'Clear All',
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mb-6',
                            children: [
                              (0, xa.jsx)('label', {
                                className: 'block text-sm font-medium text-foreground mb-2',
                                children: 'Search',
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'relative',
                                children: [
                                  (0, xa.jsx)('span', {
                                    className:
                                      'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                                    children: '\ud83d\udd0d',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    value: d.search,
                                    onChange: (e) => x('search', e.target.value),
                                    placeholder: 'Search products...',
                                    className:
                                      'pl-10 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mb-6',
                            children: [
                              (0, xa.jsx)('label', {
                                className: 'block text-sm font-medium text-foreground mb-2',
                                children: 'Category',
                              }),
                              (0, xa.jsxs)('select', {
                                value: d.category,
                                onChange: (e) => x('category', e.target.value),
                                className:
                                  'w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted',
                                children: [
                                  (0, xa.jsx)('option', {
                                    value: 'all',
                                    children: 'All Categories',
                                  }),
                                  r.map((e) => (0, xa.jsx)('option', { value: e, children: e }, e)),
                                ],
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mb-6',
                            children: [
                              (0, xa.jsx)('label', {
                                className: 'block text-sm font-medium text-foreground mb-2',
                                children: 'Price Range',
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'flex gap-2',
                                children: [
                                  (0, xa.jsx)('input', {
                                    type: 'number',
                                    value: d.minPrice,
                                    onChange: (e) => x('minPrice', e.target.value),
                                    placeholder: 'Min',
                                    className:
                                      'w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'number',
                                    value: d.maxPrice,
                                    onChange: (e) => x('maxPrice', e.target.value),
                                    placeholder: 'Max',
                                    className:
                                      'w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted',
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, xa.jsxs)('div', {
                      className: 'flex-1',
                      children: [
                        (0, xa.jsx)('div', {
                          className: 'bg-card rounded-lg p-4 mb-6',
                          children: (0, xa.jsxs)('div', {
                            className:
                              'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4',
                            children: [
                              (0, xa.jsxs)('div', {
                                className: 'flex items-center gap-4',
                                children: [
                                  (0, xa.jsxs)(Yo, {
                                    onClick: () => u(!c),
                                    size: 'sm',
                                    variant: 'outline',
                                    className: 'lg:hidden flex items-center space-x-2',
                                    children: [
                                      (0, xa.jsx)('span', {
                                        className: 'h-5 w-5',
                                        children: '\u2630',
                                      }),
                                      (0, xa.jsx)('span', { children: 'Filters' }),
                                    ],
                                  }),
                                  (0, xa.jsxs)('span', {
                                    className: 'text-sm text-muted-foreground',
                                    children: [e.length, ' products found'],
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'flex items-center gap-3',
                                children: [
                                  (0, xa.jsxs)('select', {
                                    value: d.sortBy,
                                    onChange: (e) => x('sortBy', e.target.value),
                                    className:
                                      'px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-muted',
                                    children: [
                                      (0, xa.jsx)('option', {
                                        value: 'name',
                                        children: 'Sort by Name',
                                      }),
                                      (0, xa.jsx)('option', {
                                        value: 'price_low',
                                        children: 'Price: Low to High',
                                      }),
                                      (0, xa.jsx)('option', {
                                        value: 'price_high',
                                        children: 'Price: High to Low',
                                      }),
                                      (0, xa.jsx)('option', {
                                        value: 'rating',
                                        children: 'Rating',
                                      }),
                                    ],
                                  }),
                                  (0, xa.jsxs)('div', {
                                    className: 'flex rounded-md overflow-hidden',
                                    children: [
                                      (0, xa.jsx)(Yo, {
                                        onClick: () => l('grid'),
                                        size: 'icon',
                                        variant: 'grid' === i ? 'default' : 'ghost',
                                        children: (0, xa.jsx)('span', {
                                          className: 'h-5 w-5',
                                          children: '\u25a6',
                                        }),
                                      }),
                                      (0, xa.jsx)(Yo, {
                                        onClick: () => l('list'),
                                        size: 'icon',
                                        variant: 'list' === i ? 'default' : 'ghost',
                                        children: (0, xa.jsx)('span', {
                                          className: 'h-5 w-5',
                                          children: '\u2261',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        s
                          ? (0, xa.jsx)('div', {
                              className:
                                'grid' === i
                                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                  : 'space-y-4',
                              children: [...Array(6)].map((e, t) => (0, xa.jsx)(li, {}, t)),
                            })
                          : 0 === e.length
                            ? (0, xa.jsxs)('div', {
                                className: 'text-center py-16',
                                children: [
                                  (0, xa.jsx)('p', {
                                    className: 'text-lg text-muted-foreground',
                                    children: 'No products found matching your criteria.',
                                  }),
                                  (0, xa.jsx)(Yo, {
                                    onClick: y,
                                    variant: 'outline',
                                    className: 'mt-4',
                                    children: 'Clear Filters',
                                  }),
                                ],
                              })
                            : (0, xa.jsx)('div', {
                                className:
                                  'grid' === i
                                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                    : 'space-y-4',
                                children: e.map((e) =>
                                  (0, xa.jsx)(oi, { product: e, viewMode: i }, e.id)
                                ),
                              }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        };
      function ui(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              fill: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            fillRule: 'evenodd',
            d: 'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z',
            clipRule: 'evenodd',
          })
        );
      }
      const di = n.forwardRef(ui),
        mi = (e) => {
          let { productId: t } = e;
          const [r, a] = (0, n.useState)([]),
            [s, o] = (0, n.useState)(!0),
            [i, l] = (0, n.useState)(!1),
            [c, u] = (0, n.useState)({ rating: 5, comment: '' }),
            [d, m] = (0, n.useState)(!1),
            { isAuthenticated: f } = ja();
          (0, n.useEffect)(() => {
            p();
          }, [t]);
          const p = async () => {
              try {
                o(!0);
                const e = await fa(t);
                (a(e.data.reviews), o(!1));
              } catch (e) {
                (console.error('Error fetching reviews:', e), o(!1));
              }
            },
            h = function (e) {
              let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
              return [...Array(5)].map((n, a) => {
                const s = a < e,
                  o = s ? di : ri;
                return (0, xa.jsx)(
                  o,
                  {
                    className: `h-5 w-5 ${s ? 'text-yellow-400' : 'text-gray-300'} ${t ? 'cursor-pointer hover:text-yellow-400' : ''}`,
                    onClick: () => t && r && r(a + 1),
                  },
                  a
                );
              });
            };
          return s
            ? (0, xa.jsxs)('div', {
                className: 'mt-12',
                children: [
                  (0, xa.jsx)('h3', {
                    className: 'text-xl font-semibold text-gray-900 mb-6',
                    children: 'Reviews',
                  }),
                  (0, xa.jsxs)('div', {
                    className: 'animate-pulse',
                    children: [
                      (0, xa.jsx)('div', { className: 'h-4 bg-gray-200 rounded w-1/4 mb-4' }),
                      (0, xa.jsx)('div', {
                        className: 'space-y-4',
                        children: [...Array(3)].map((e, t) =>
                          (0, xa.jsxs)(
                            'div',
                            {
                              className: 'border-b border-gray-200 pb-4',
                              children: [
                                (0, xa.jsx)('div', {
                                  className: 'h-4 bg-gray-200 rounded w-1/2 mb-2',
                                }),
                                (0, xa.jsx)('div', { className: 'h-3 bg-gray-200 rounded w-3/4' }),
                              ],
                            },
                            t
                          )
                        ),
                      }),
                    ],
                  }),
                ],
              })
            : (0, xa.jsxs)('div', {
                className: 'mt-12',
                children: [
                  (0, xa.jsxs)('div', {
                    className: 'flex justify-between items-center mb-6',
                    children: [
                      (0, xa.jsxs)('h3', {
                        className: 'text-xl font-semibold text-gray-900',
                        children: ['Reviews (', r.length, ')'],
                      }),
                      f &&
                        (0, xa.jsx)('button', {
                          onClick: () => l(!i),
                          className: 'btn-primary',
                          children: 'Write a Review',
                        }),
                    ],
                  }),
                  i &&
                    (0, xa.jsxs)('div', {
                      className: 'bg-gray-50 rounded-lg p-6 mb-6',
                      children: [
                        (0, xa.jsx)('h4', {
                          className: 'text-lg font-medium text-gray-900 mb-4',
                          children: 'Write Your Review',
                        }),
                        (0, xa.jsxs)('form', {
                          onSubmit: async (e) => {
                            if ((e.preventDefault(), f))
                              try {
                                m(!0);
                                const e = await pa(t, c.rating, c.comment);
                                (a([e.data, ...r]),
                                  u({ rating: 5, comment: '' }),
                                  l(!1),
                                  Rt.success('Review added successfully!'));
                              } catch (o) {
                                var n, s;
                                console.error('Error adding review:', o);
                                const e =
                                  (null === (n = o.response) ||
                                  void 0 === n ||
                                  null === (s = n.data) ||
                                  void 0 === s
                                    ? void 0
                                    : s.detail) || 'Failed to add review';
                                Rt.error(e);
                              } finally {
                                m(!1);
                              }
                            else Rt.error('Please login to write a review');
                          },
                          children: [
                            (0, xa.jsxs)('div', {
                              className: 'mb-4',
                              children: [
                                (0, xa.jsx)('label', {
                                  className: 'block text-sm font-medium text-gray-700 mb-2',
                                  children: 'Rating',
                                }),
                                (0, xa.jsx)('div', {
                                  className: 'flex space-x-1',
                                  children: h(c.rating, !0, (e) => u({ ...c, rating: e })),
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'mb-4',
                              children: [
                                (0, xa.jsx)('label', {
                                  className: 'block text-sm font-medium text-gray-700 mb-2',
                                  children: 'Your Review',
                                }),
                                (0, xa.jsx)('textarea', {
                                  value: c.comment,
                                  onChange: (e) => u({ ...c, comment: e.target.value }),
                                  placeholder: 'Share your experience with this product...',
                                  rows: 4,
                                  className:
                                    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                                  required: !0,
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex space-x-3',
                              children: [
                                (0, xa.jsx)('button', {
                                  type: 'submit',
                                  disabled: d,
                                  className: 'btn-primary disabled:opacity-50',
                                  children: d ? 'Submitting...' : 'Submit Review',
                                }),
                                (0, xa.jsx)('button', {
                                  type: 'button',
                                  onClick: () => l(!1),
                                  className: 'btn-outline',
                                  children: 'Cancel',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  (0, xa.jsx)('div', {
                    className: 'space-y-6',
                    children:
                      0 === r.length
                        ? (0, xa.jsx)('div', {
                            className: 'text-center py-8',
                            children: (0, xa.jsx)('p', {
                              className: 'text-gray-500',
                              children: 'No reviews yet. Be the first to review this product!',
                            }),
                          })
                        : r.map((e) => {
                            return (0, xa.jsxs)(
                              'div',
                              {
                                className: 'border-b border-gray-200 pb-6',
                                children: [
                                  (0, xa.jsx)('div', {
                                    className: 'flex items-start justify-between mb-2',
                                    children: (0, xa.jsxs)('div', {
                                      className: 'flex items-center space-x-3',
                                      children: [
                                        (0, xa.jsx)('div', {
                                          className:
                                            'w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center',
                                          children: (0, xa.jsx)('span', {
                                            className: 'text-white font-semibold text-sm',
                                            children: e.user_name.charAt(0),
                                          }),
                                        }),
                                        (0, xa.jsxs)('div', {
                                          children: [
                                            (0, xa.jsx)('p', {
                                              className: 'font-medium text-gray-900',
                                              children: e.user_name,
                                            }),
                                            (0, xa.jsxs)('div', {
                                              className: 'flex items-center space-x-2',
                                              children: [
                                                (0, xa.jsx)('div', {
                                                  className: 'flex space-x-1',
                                                  children: h(e.rating),
                                                }),
                                                (0, xa.jsx)('span', {
                                                  className: 'text-sm text-gray-500',
                                                  children:
                                                    ((t = e.created_at),
                                                    new Date(t).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                    })),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, xa.jsx)('p', {
                                    className: 'text-gray-700 leading-relaxed ml-13',
                                    children: e.comment,
                                  }),
                                ],
                              },
                              e.id
                            );
                            var t;
                          }),
                  }),
                ],
              });
        };
      function fi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18',
          })
        );
      }
      const pi = n.forwardRef(fi);
      function hi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z',
          })
        );
      }
      const gi = n.forwardRef(hi);
      function xi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
          })
        );
      }
      const yi = n.forwardRef(xi);
      function vi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
          })
        );
      }
      const bi = n.forwardRef(vi),
        wi = () => {
          const { id: e } = re(),
            [t, r] = (0, n.useState)(null),
            [a, s] = (0, n.useState)(!0),
            [o, i] = (0, n.useState)(0),
            [l, c] = (0, n.useState)(1),
            [u, d] = (0, n.useState)([]),
            { addToCart: m, isInCart: f, getItemQuantity: p } = Ca(),
            { addToWishlist: h, removeFromWishlist: g, isInWishlist: x } = Ta(),
            { isAuthenticated: y } = ja();
          (0, n.useEffect)(() => {
            v();
          }, [e]);
          const v = async () => {
            try {
              s(!0);
              try {
                const t = await ta(e);
                r(t.data);
              } catch (t) {
                console.log('API fetch failed, using mock data');
                const n = [
                  {
                    id: 1,
                    name: 'Premium Yoga Mat',
                    price: 49.99,
                    category: 'Yoga',
                    images: ['/premium-yoga-mat.png'],
                    rating: 4.8,
                    reviews_count: 234,
                    inventory: 50,
                    description:
                      'High-quality yoga mat with excellent grip and cushioning. Perfect for all levels of yoga practice.',
                    brand: 'ZenFit',
                    specifications: {
                      material: 'TPE',
                      dimensions: '72" x 24"',
                      thickness: '6mm',
                      weight: '2.5 lbs',
                    },
                  },
                  {
                    id: 2,
                    name: 'Adjustable Dumbbells Set',
                    price: 299.99,
                    category: 'Strength',
                    images: ['/adjustable-dumbbells.jpg'],
                    rating: 4.9,
                    reviews_count: 567,
                    inventory: 25,
                    description:
                      'Versatile dumbbell set with quick-adjust mechanism. Replaces 15 sets of weights.',
                    brand: 'FitGear',
                    specifications: {
                      weight_range: '5-52.5 lbs',
                      material: 'Cast Iron',
                      adjustments: '15 settings',
                    },
                  },
                  {
                    id: 3,
                    name: 'Resistance Bands Set',
                    price: 29.99,
                    category: 'Accessories',
                    images: ['/resistance-bands-exercise.png'],
                    rating: 4.6,
                    reviews_count: 189,
                    inventory: 100,
                    description: 'Complete set of resistance bands for full-body workouts.',
                    brand: 'FlexFit',
                    specifications: {
                      resistance_levels: '5 levels',
                      material: 'Natural Latex',
                      includes: 'Handles, Door Anchor, Carry Bag',
                    },
                  },
                  {
                    id: 4,
                    name: 'Smart Jump Rope',
                    price: 39.99,
                    category: 'Cardio',
                    images: ['/smart-jump-rope.jpg'],
                    rating: 4.7,
                    reviews_count: 312,
                    inventory: 75,
                    description:
                      'Track your cardio with this smart jump rope. Bluetooth connectivity and mobile app.',
                    brand: 'CardioMax',
                    specifications: {
                      connectivity: 'Bluetooth 5.0',
                      battery: '30 days',
                      features: 'Calorie Counter, Timer, Jump Counter',
                    },
                  },
                  {
                    id: 5,
                    name: 'Foam Roller Pro',
                    price: 34.99,
                    category: 'Recovery',
                    images: ['/foam-roller.jpg'],
                    rating: 4.5,
                    reviews_count: 156,
                    inventory: 60,
                    description: 'Deep tissue foam roller for muscle recovery and mobility.',
                    brand: 'RecoverFit',
                    specifications: {
                      size: '13" x 5.5"',
                      density: 'High Density',
                      material: 'EVA Foam',
                    },
                  },
                  {
                    id: 6,
                    name: 'Kettlebell Set',
                    price: 149.99,
                    category: 'Strength',
                    images: ['/kettlebell-set.jpg'],
                    rating: 4.8,
                    reviews_count: 423,
                    inventory: 0,
                    description: 'Professional kettlebell set for all levels. Includes 3 weights.',
                    brand: 'KettlePro',
                    specifications: {
                      weights: '10lb, 15lb, 20lb',
                      material: 'Cast Iron',
                      coating: 'Powder Coated',
                    },
                  },
                  {
                    id: 7,
                    name: "Men's Workout Tank",
                    price: 34.99,
                    category: 'Apparel',
                    images: ['/mens-workout-tank.jpg'],
                    rating: 4.6,
                    reviews_count: 42,
                    inventory: 120,
                    description: 'Moisture-wicking and breathable tank top for intense workouts.',
                    brand: 'FitGear Wear',
                    specifications: {
                      material: 'Polyester Blend',
                      sizes: 'S, M, L, XL',
                      features: 'Moisture-Wicking, Quick-Dry',
                    },
                  },
                  {
                    id: 8,
                    name: "Women's Yoga Pants",
                    price: 59.99,
                    category: 'Apparel',
                    images: ['/yoga-pant.jpg'],
                    rating: 4.8,
                    reviews_count: 95,
                    inventory: 85,
                    description: 'High-waisted and squat-proof yoga pants with pocket.',
                    brand: 'ZenFit',
                    specifications: {
                      material: 'Spandex Blend',
                      sizes: 'XS, S, M, L, XL',
                      features: 'High-Waist, Squat-Proof, Pockets',
                    },
                  },
                  {
                    id: 9,
                    name: 'Peloton-Style Bike',
                    price: 999.99,
                    category: 'Cardio',
                    images: ['/peloton-style-bike.jpg'],
                    rating: 4.8,
                    reviews_count: 52,
                    inventory: 15,
                    description: 'High-energy indoor cycling bike with digital display.',
                    brand: 'CycleFit',
                    specifications: {
                      resistance: 'Magnetic',
                      max_user_weight: '300 lbs',
                      display: '10" Touchscreen',
                    },
                  },
                  {
                    id: 10,
                    name: 'Smart Treadmill',
                    price: 1299.99,
                    category: 'Cardio',
                    images: ['/smart-treadmill.jpg'],
                    rating: 4.9,
                    reviews_count: 38,
                    inventory: 8,
                    description: 'Interactive treadmill with touch screen and workout programs.',
                    brand: 'CardioMax',
                    specifications: {
                      speed: '0-12 mph',
                      incline: '0-15%',
                      display: '15" HD Touchscreen',
                    },
                  },
                  {
                    id: 11,
                    name: 'Pro Kettlebell',
                    price: 79.99,
                    category: 'Accessories',
                    images: ['/kettlebell-set.jpg'],
                    rating: 4.9,
                    reviews_count: 60,
                    inventory: 40,
                    description: 'Competition-grade kettlebell with smooth finish.',
                    brand: 'KettlePro',
                    specifications: {
                      weight: '24kg (53 lbs)',
                      material: 'Cast Steel',
                      handle: 'Competition Grade',
                    },
                  },
                  {
                    id: 12,
                    name: 'Professional Olympic Barbell',
                    price: 299.99,
                    category: 'Strength',
                    images: ['/olympic-barbell.jpg'],
                    rating: 4.8,
                    reviews_count: 24,
                    inventory: 20,
                    description: 'High-quality Olympic barbell for serious lifters.',
                    brand: 'FitGear Pro',
                    specifications: {
                      length: '7 feet',
                      weight: '45 lbs',
                      capacity: '1000 lbs',
                      material: 'Chrome Steel',
                    },
                  },
                ].find((t) => t.id === parseInt(e));
                n && r(n);
              }
              s(!1);
            } catch (n) {
              (console.error('Error fetching product:', n), s(!1));
            }
          };
          if (a)
            return (0, xa.jsx)('div', {
              className: 'min-h-screen flex items-center justify-center',
              children: (0, xa.jsx)('div', { className: 'loading-spinner' }),
            });
          if (!t)
            return (0, xa.jsx)('div', {
              className: 'min-h-screen flex items-center justify-center',
              children: (0, xa.jsxs)('div', {
                className: 'text-center',
                children: [
                  (0, xa.jsx)('h2', {
                    className: 'text-2xl font-semibold text-foreground',
                    children: 'Product not found',
                  }),
                  (0, xa.jsx)('p', {
                    className: 'mt-2 text-muted-foreground',
                    children: "The product you're looking for doesn't exist.",
                  }),
                  (0, xa.jsx)(Oe, {
                    to: '/products',
                    children: (0, xa.jsxs)(Yo, {
                      className: 'mt-4',
                      children: [
                        (0, xa.jsx)(pi, { className: 'h-4 w-4 mr-2' }),
                        'Back to Products',
                      ],
                    }),
                  }),
                ],
              }),
            });
          const b =
              t.images && t.images.length > 0
                ? t.images.map(si)
                : ['https://via.placeholder.com/600x600?text=No+Image'],
            w = t.inventory > 0,
            j = p(t.id);
          return (0, xa.jsx)('div', {
            className: 'min-h-screen bg-background',
            children: (0, xa.jsxs)('div', {
              className: 'container-max px-4 sm:px-6 lg:px-8 py-8',
              children: [
                (0, xa.jsx)('nav', {
                  className: 'flex mb-8',
                  'aria-label': 'Breadcrumb',
                  children: (0, xa.jsxs)('ol', {
                    className: 'flex items-center space-x-4',
                    children: [
                      (0, xa.jsx)('li', {
                        children: (0, xa.jsx)(Oe, {
                          to: '/',
                          className: 'text-muted-foreground hover:text-foreground',
                          children: 'Home',
                        }),
                      }),
                      (0, xa.jsx)('li', {
                        children: (0, xa.jsx)('span', {
                          className: 'text-muted-foreground',
                          children: '/',
                        }),
                      }),
                      (0, xa.jsx)('li', {
                        children: (0, xa.jsx)(Oe, {
                          to: '/products',
                          className: 'text-muted-foreground hover:text-foreground',
                          children: 'Products',
                        }),
                      }),
                      (0, xa.jsx)('li', {
                        children: (0, xa.jsx)('span', {
                          className: 'text-muted-foreground',
                          children: '/',
                        }),
                      }),
                      (0, xa.jsx)('li', {
                        children: (0, xa.jsx)('span', {
                          className: 'text-foreground font-medium',
                          children: t.name,
                        }),
                      }),
                    ],
                  }),
                }),
                (0, xa.jsxs)('div', {
                  className: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
                  children: [
                    (0, xa.jsxs)('div', {
                      children: [
                        (0, xa.jsx)('div', {
                          className: 'bg-card rounded-lg shadow-md overflow-hidden',
                          children: (0, xa.jsx)('div', {
                            className: 'aspect-w-1 aspect-h-1',
                            children: (0, xa.jsx)('img', {
                              src: b[o],
                              alt: t.name,
                              className: 'w-full h-96 object-cover object-center',
                            }),
                          }),
                        }),
                        b.length > 1 &&
                          (0, xa.jsx)('div', {
                            className: 'mt-4 grid grid-cols-4 gap-2',
                            children: b.map((e, r) =>
                              (0, xa.jsx)(
                                Yo,
                                {
                                  variant: o === r ? 'default' : 'outline',
                                  onClick: () => i(r),
                                  className: 'aspect-w-1 aspect-h-1 p-0 h-20 overflow-hidden',
                                  children: (0, xa.jsx)('img', {
                                    src: e,
                                    alt: `${t.name} ${r + 1}`,
                                    className: 'w-full h-full object-cover object-center',
                                  }),
                                },
                                r
                              )
                            ),
                          }),
                      ],
                    }),
                    (0, xa.jsx)('div', {
                      children: (0, xa.jsxs)('div', {
                        className: 'bg-card rounded-lg shadow-md p-6',
                        children: [
                          (0, xa.jsxs)('div', {
                            className: 'flex justify-between items-start mb-4',
                            children: [
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('h1', {
                                    className: 'text-3xl font-bold text-foreground font-heading',
                                    children: t.name,
                                  }),
                                  (0, xa.jsx)('p', {
                                    className: 'text-lg text-muted-foreground mt-1',
                                    children: t.brand,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'flex space-x-2',
                                children: [
                                  (0, xa.jsx)(Yo, {
                                    size: 'icon',
                                    variant: 'ghost',
                                    onClick: async () => {
                                      y
                                        ? x(t.id)
                                          ? await g(t.id)
                                          : await h(t)
                                        : Rt.error('Please login to use wishlist');
                                    },
                                    children: x(t.id)
                                      ? (0, xa.jsx)(ai, { className: 'h-6 w-6 text-red-500' })
                                      : (0, xa.jsx)(Fa, { className: 'h-6 w-6' }),
                                  }),
                                  (0, xa.jsx)(Yo, {
                                    size: 'icon',
                                    variant: 'ghost',
                                    onClick: () =>
                                      navigator.share
                                        ? navigator.share({
                                            title: t.name,
                                            url: window.location.href,
                                          })
                                        : Rt.info('Share feature not available'),
                                    children: (0, xa.jsx)(gi, { className: 'h-6 w-6' }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'flex items-center mb-4',
                            children: [
                              (0, xa.jsx)('div', {
                                className: 'flex items-center',
                                children: [...Array(5)].map((e, r) =>
                                  (0, xa.jsx)(
                                    di,
                                    {
                                      className:
                                        'h-5 w-5 ' +
                                        (r < Math.floor(t.rating)
                                          ? 'text-yellow-400'
                                          : 'text-muted'),
                                    },
                                    r
                                  )
                                ),
                              }),
                              (0, xa.jsxs)('span', {
                                className: 'ml-2 text-sm text-muted-foreground',
                                children: [t.rating, ' (', t.reviews_count, ' reviews)'],
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mb-6',
                            children: [
                              (0, xa.jsx)('div', {
                                className: 'text-3xl font-bold text-primary',
                                children: ha(t.price),
                              }),
                              (0, xa.jsx)('p', {
                                className: 'text-sm text-muted-foreground mt-1',
                                children: 'Free shipping on orders over $100',
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mb-6',
                            children: [
                              (0, xa.jsx)('h3', {
                                className: 'text-lg font-medium text-foreground mb-2',
                                children: 'Description',
                              }),
                              (0, xa.jsx)('p', {
                                className: 'text-foreground leading-relaxed',
                                children: t.description,
                              }),
                            ],
                          }),
                          t.specifications &&
                            Object.keys(t.specifications).length > 0 &&
                            (0, xa.jsxs)('div', {
                              className: 'mb-6',
                              children: [
                                (0, xa.jsx)('h3', {
                                  className: 'text-lg font-medium text-foreground mb-2',
                                  children: 'Specifications',
                                }),
                                (0, xa.jsx)('dl', {
                                  className: 'grid grid-cols-1 gap-2',
                                  children: Object.entries(t.specifications).map((e) => {
                                    let [t, r] = e;
                                    return (0, xa.jsxs)(
                                      'div',
                                      {
                                        className: 'flex justify-between',
                                        children: [
                                          (0, xa.jsxs)('dt', {
                                            className: 'text-muted-foreground capitalize',
                                            children: [t.replace('_', ' '), ':'],
                                          }),
                                          (0, xa.jsx)('dd', {
                                            className: 'text-foreground font-medium',
                                            children: r,
                                          }),
                                        ],
                                      },
                                      t
                                    );
                                  }),
                                }),
                              ],
                            }),
                          (0, xa.jsxs)('div', {
                            className: 'mb-6',
                            children: [
                              (0, xa.jsxs)('div', {
                                className: 'flex items-center space-x-4 mb-4',
                                children: [
                                  (0, xa.jsx)('label', {
                                    htmlFor: 'quantity',
                                    className: 'text-sm font-medium text-foreground',
                                    children: 'Quantity:',
                                  }),
                                  (0, xa.jsx)('select', {
                                    id: 'quantity',
                                    value: l,
                                    onChange: (e) => c(parseInt(e.target.value)),
                                    className:
                                      'border border-input rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-ring bg-background',
                                    children: [...Array(Math.min(10, t.inventory))].map((e, t) =>
                                      (0, xa.jsx)(
                                        'option',
                                        { value: t + 1, children: t + 1 },
                                        t + 1
                                      )
                                    ),
                                  }),
                                  w
                                    ? (0, xa.jsxs)('span', {
                                        className:
                                          'text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full',
                                        children: [t.inventory, ' in stock'],
                                      })
                                    : (0, xa.jsx)('span', {
                                        className:
                                          'text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full',
                                        children: 'Out of stock',
                                      }),
                                ],
                              }),
                              j > 0 &&
                                (0, xa.jsx)('div', {
                                  className:
                                    'mb-4 p-3 bg-secondary/10 border border-secondary/20 rounded-md',
                                  children: (0, xa.jsxs)('p', {
                                    className: 'text-sm text-secondary',
                                    children: [j, ' item(s) already in cart'],
                                  }),
                                }),
                              (0, xa.jsxs)('div', {
                                className: 'flex space-x-4',
                                children: [
                                  (0, xa.jsx)(Yo, {
                                    onClick: async () => {
                                      y
                                        ? await m(t.id, l)
                                        : Rt.error('Please login to add items to cart');
                                    },
                                    disabled: !w,
                                    size: 'lg',
                                    className: 'flex-1',
                                    children: w ? 'Add to Cart' : 'Out of Stock',
                                  }),
                                  (0, xa.jsx)(Yo, {
                                    onClick: async () => {
                                      y
                                        ? (await m(t.id, l), (window.location.href = '/checkout'))
                                        : Rt.error('Please login to purchase');
                                    },
                                    disabled: !w,
                                    variant: 'secondary',
                                    size: 'lg',
                                    className: 'flex-1',
                                    children: 'Buy Now',
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, xa.jsx)('div', {
                            className: 'border-t border-gray-200 pt-6',
                            children: (0, xa.jsxs)('div', {
                              className: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
                              children: [
                                (0, xa.jsxs)('div', {
                                  className: 'flex items-center space-x-3',
                                  children: [
                                    (0, xa.jsx)(yi, { className: 'h-6 w-6 text-primary-600' }),
                                    (0, xa.jsxs)('div', {
                                      children: [
                                        (0, xa.jsx)('p', {
                                          className: 'font-medium text-gray-900',
                                          children: 'Free Shipping',
                                        }),
                                        (0, xa.jsx)('p', {
                                          className: 'text-sm text-gray-600',
                                          children: 'On orders over $100',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, xa.jsxs)('div', {
                                  className: 'flex items-center space-x-3',
                                  children: [
                                    (0, xa.jsx)(bi, { className: 'h-6 w-6 text-primary-600' }),
                                    (0, xa.jsxs)('div', {
                                      children: [
                                        (0, xa.jsx)('p', {
                                          className: 'font-medium text-gray-900',
                                          children: 'Quality Guarantee',
                                        }),
                                        (0, xa.jsx)('p', {
                                          className: 'text-sm text-gray-600',
                                          children: '30-day return policy',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, xa.jsx)(mi, { productId: e }),
                (0, xa.jsxs)('div', {
                  className: 'mt-16',
                  children: [
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold text-gray-900 mb-8 font-heading',
                      children: 'Related Products',
                    }),
                    (0, xa.jsx)('div', {
                      className: 'text-center text-gray-500 py-12',
                      children: (0, xa.jsx)('p', {
                        className: 'text-lg',
                        children: 'Related products coming soon...',
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
        };
      function ji(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
          })
        );
      }
      const ki = n.forwardRef(ji);
      function Ni(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M5 12h14',
          })
        );
      }
      const Si = n.forwardRef(Ni);
      function Ei(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M12 4.5v15m7.5-7.5h-15',
          })
        );
      }
      const Ci = n.forwardRef(Ei);
      function Pi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'm14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0',
          })
        );
      }
      const _i = n.forwardRef(Pi),
        Oi = () => {
          const { items: e, total: t, isLoading: r, removeFromCart: n, updateQuantity: a } = Ca(),
            { isAuthenticated: s } = ja();
          if (!s)
            return (0, xa.jsx)('div', {
              className: 'min-h-screen bg-background flex items-center justify-center',
              children: (0, xa.jsxs)('div', {
                className: 'text-center',
                children: [
                  (0, xa.jsx)(ki, { className: 'mx-auto h-12 w-12 text-muted-foreground' }),
                  (0, xa.jsx)('h3', {
                    className: 'mt-2 text-sm font-medium text-foreground',
                    children: 'Please login to view your cart',
                  }),
                  (0, xa.jsx)('p', {
                    className: 'mt-1 text-sm text-muted-foreground',
                    children: 'You need to be logged in to access your shopping cart.',
                  }),
                  (0, xa.jsx)('div', {
                    className: 'mt-6',
                    children: (0, xa.jsx)(Oe, {
                      to: '/login',
                      children: (0, xa.jsx)(Yo, { children: 'Login to Continue' }),
                    }),
                  }),
                ],
              }),
            });
          if (r)
            return (0, xa.jsx)('div', {
              className: 'min-h-screen flex items-center justify-center',
              children: (0, xa.jsx)('div', { className: 'loading-spinner' }),
            });
          if (0 === e.length)
            return (0, xa.jsx)('div', {
              className: 'min-h-screen bg-background flex items-center justify-center',
              children: (0, xa.jsxs)('div', {
                className: 'text-center',
                children: [
                  (0, xa.jsx)(ki, { className: 'mx-auto h-12 w-12 text-muted-foreground' }),
                  (0, xa.jsx)('h3', {
                    className: 'mt-2 text-sm font-medium text-foreground',
                    children: 'Your cart is empty',
                  }),
                  (0, xa.jsx)('p', {
                    className: 'mt-1 text-sm text-muted-foreground',
                    children: 'Start adding some items to your cart!',
                  }),
                  (0, xa.jsx)('div', {
                    className: 'mt-6',
                    children: (0, xa.jsx)(Oe, {
                      to: '/products',
                      children: (0, xa.jsx)(Yo, { children: 'Continue Shopping' }),
                    }),
                  }),
                ],
              }),
            });
          const o = (e, t) => {
              t < 1 ? n(e) : a(e, t);
            },
            i = t >= 100 ? 0 : 9.99,
            l = 0.08 * t,
            c = t + i + l;
          return (0, xa.jsx)('div', {
            className: 'min-h-screen bg-background',
            children: (0, xa.jsxs)('div', {
              className: 'container-max px-4 sm:px-6 lg:px-8 py-8',
              children: [
                (0, xa.jsx)('h1', {
                  className: 'text-3xl font-bold text-foreground mb-8 font-heading',
                  children: 'Shopping Cart',
                }),
                (0, xa.jsxs)('div', {
                  className: 'grid grid-cols-1 lg:grid-cols-3 gap-8',
                  children: [
                    (0, xa.jsx)('div', {
                      className: 'lg:col-span-2',
                      children: (0, xa.jsxs)('div', {
                        className: 'bg-card rounded-lg shadow-md overflow-hidden',
                        children: [
                          (0, xa.jsx)('div', {
                            className: 'px-6 py-4 border-b border-border',
                            children: (0, xa.jsxs)('h2', {
                              className: 'text-lg font-semibold text-foreground',
                              children: ['Cart Items (', e.length, ')'],
                            }),
                          }),
                          (0, xa.jsx)('div', {
                            className: 'divide-y divide-border',
                            children: e.map((e) => {
                              var t, r, a, s;
                              return (0, xa.jsx)(
                                'div',
                                {
                                  className: 'p-6 cart-item',
                                  children: (0, xa.jsxs)('div', {
                                    className: 'flex items-center space-x-4',
                                    children: [
                                      (0, xa.jsx)('div', {
                                        className: 'flex-shrink-0',
                                        children: (0, xa.jsx)('img', {
                                          className: 'h-20 w-20 rounded-md object-cover',
                                          src:
                                            (null === (t = e.product) ||
                                            void 0 === t ||
                                            null === (r = t.images) ||
                                            void 0 === r
                                              ? void 0
                                              : r[0]) ||
                                            'https://via.placeholder.com/150x150?text=No+Image',
                                          alt:
                                            (null === (a = e.product) || void 0 === a
                                              ? void 0
                                              : a.name) || 'Product',
                                        }),
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'flex-1 min-w-0',
                                        children: [
                                          (0, xa.jsx)('h3', {
                                            className: 'text-lg font-medium text-foreground',
                                            children:
                                              (null === (s = e.product) || void 0 === s
                                                ? void 0
                                                : s.name) || 'Product Name',
                                          }),
                                          (0, xa.jsxs)('p', {
                                            className: 'text-sm text-muted-foreground mt-1',
                                            children: ['Unit Price: ', ha(e.price)],
                                          }),
                                        ],
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'flex items-center space-x-3',
                                        children: [
                                          (0, xa.jsx)(Yo, {
                                            size: 'icon',
                                            variant: 'outline',
                                            onClick: () => o(e.product_id, e.quantity - 1),
                                            disabled: 1 === e.quantity,
                                            children: (0, xa.jsx)(Si, { className: 'h-4 w-4' }),
                                          }),
                                          (0, xa.jsx)('span', {
                                            className:
                                              'w-12 text-center font-medium text-foreground',
                                            children: e.quantity,
                                          }),
                                          (0, xa.jsx)(Yo, {
                                            size: 'icon',
                                            variant: 'outline',
                                            onClick: () => o(e.product_id, e.quantity + 1),
                                            children: (0, xa.jsx)(Ci, { className: 'h-4 w-4' }),
                                          }),
                                        ],
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'text-right',
                                        children: [
                                          (0, xa.jsx)('p', {
                                            className: 'text-lg font-semibold text-foreground',
                                            children: ha(e.price * e.quantity),
                                          }),
                                          (0, xa.jsx)(Yo, {
                                            variant: 'ghost',
                                            size: 'icon',
                                            onClick: () => n(e.product_id),
                                            className: 'mt-2',
                                            children: (0, xa.jsx)(_i, {
                                              className: 'h-5 w-5 text-red-600',
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                },
                                e.product_id
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, xa.jsx)('div', {
                      className: 'lg:col-span-1',
                      children: (0, xa.jsxs)('div', {
                        className: 'bg-card rounded-lg shadow-md p-6 sticky top-24',
                        children: [
                          (0, xa.jsx)('h2', {
                            className: 'text-lg font-semibold text-foreground mb-4',
                            children: 'Order Summary',
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'space-y-3',
                            children: [
                              (0, xa.jsxs)('div', {
                                className: 'flex justify-between',
                                children: [
                                  (0, xa.jsx)('span', {
                                    className: 'text-muted-foreground',
                                    children: 'Subtotal',
                                  }),
                                  (0, xa.jsx)('span', {
                                    className: 'font-medium',
                                    children: ha(t),
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'flex justify-between',
                                children: [
                                  (0, xa.jsx)('span', {
                                    className: 'text-muted-foreground',
                                    children: 'Shipping',
                                  }),
                                  (0, xa.jsx)('span', {
                                    className: 'font-medium',
                                    children: 0 === i ? 'Free' : ha(i),
                                  }),
                                ],
                              }),
                              i > 0 &&
                                (0, xa.jsx)('p', {
                                  className: 'text-sm text-muted-foreground',
                                  children: 'Free shipping on orders over $100!',
                                }),
                              (0, xa.jsxs)('div', {
                                className: 'flex justify-between',
                                children: [
                                  (0, xa.jsx)('span', {
                                    className: 'text-muted-foreground',
                                    children: 'Tax',
                                  }),
                                  (0, xa.jsx)('span', {
                                    className: 'font-medium',
                                    children: ha(l),
                                  }),
                                ],
                              }),
                              (0, xa.jsx)('div', {
                                className: 'border-t border-border pt-3',
                                children: (0, xa.jsxs)('div', {
                                  className: 'flex justify-between',
                                  children: [
                                    (0, xa.jsx)('span', {
                                      className: 'text-lg font-semibold text-gray-900',
                                      children: 'Total',
                                    }),
                                    (0, xa.jsx)('span', {
                                      className: 'text-lg font-semibold text-gray-900',
                                      children: ha(c),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          (0, xa.jsx)(Yo, {
                            className: 'w-full mt-6',
                            size: 'lg',
                            onClick: () => (window.location.href = '/checkout'),
                            children: 'Proceed to Checkout',
                          }),
                          (0, xa.jsx)('div', {
                            className: 'mt-4 text-center',
                            children: (0, xa.jsx)(Oe, {
                              to: '/products',
                              className:
                                'text-primary-600 hover:text-primary-800 text-sm font-medium',
                              children: '\u2190 Continue Shopping',
                            }),
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mt-6 pt-6 border-t border-gray-200',
                            children: [
                              (0, xa.jsx)('div', {
                                className:
                                  'flex items-center justify-center space-x-4 text-sm text-gray-500',
                                children: (0, xa.jsxs)('div', {
                                  className: 'flex items-center',
                                  children: [
                                    (0, xa.jsx)('svg', {
                                      className: 'h-5 w-5 mr-1',
                                      fill: 'currentColor',
                                      viewBox: '0 0 20 20',
                                      children: (0, xa.jsx)('path', {
                                        fillRule: 'evenodd',
                                        d: 'M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z',
                                        clipRule: 'evenodd',
                                      }),
                                    }),
                                    (0, xa.jsx)('span', { children: 'Secure Checkout' }),
                                  ],
                                }),
                              }),
                              (0, xa.jsx)('p', {
                                className: 'text-center text-xs text-gray-400 mt-2',
                                children: 'Your payment information is encrypted and secure',
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
        };
      var Ri,
        Ti = 'basil',
        Li = 'https://js.stripe.com',
        Ai = ''.concat(Li, '/').concat(Ti, '/stripe.js'),
        zi = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,
        Fi = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/,
        Mi =
          'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used',
        Ii = function (e) {
          return zi.test(e) || Fi.test(e);
        },
        Di = function (e) {
          var t = e && !e.advancedFraudSignals ? '?advancedFraudSignals=false' : '',
            r = document.createElement('script');
          r.src = ''.concat(Ai).concat(t);
          var n = document.head || document.body;
          if (!n)
            throw new Error(
              'Expected document.body not to be null. Stripe.js requires a <body> element.'
            );
          return (n.appendChild(r), r);
        },
        Ui = null,
        Bi = null,
        Wi = null,
        $i = function (e) {
          return null !== Ui
            ? Ui
            : ((Ui = new Promise(function (t, r) {
                if ('undefined' !== typeof window && 'undefined' !== typeof document)
                  if ((window.Stripe && e && console.warn(Mi), window.Stripe)) t(window.Stripe);
                  else
                    try {
                      var n = (function () {
                        for (
                          var e = document.querySelectorAll('script[src^="'.concat(Li, '"]')),
                            t = 0;
                          t < e.length;
                          t++
                        ) {
                          var r = e[t];
                          if (Ii(r.src)) return r;
                        }
                        return null;
                      })();
                      if (n && e) console.warn(Mi);
                      else if (n) {
                        if (n && null !== Wi && null !== Bi) {
                          var a;
                          (n.removeEventListener('load', Wi),
                            n.removeEventListener('error', Bi),
                            null === (a = n.parentNode) || void 0 === a || a.removeChild(n),
                            (n = Di(e)));
                        }
                      } else n = Di(e);
                      ((Wi = (function (e, t) {
                        return function () {
                          window.Stripe
                            ? e(window.Stripe)
                            : t(new Error('Stripe.js not available'));
                        };
                      })(t, r)),
                        (Bi = (function (e) {
                          return function (t) {
                            e(new Error('Failed to load Stripe.js', { cause: t }));
                          };
                        })(r)),
                        n.addEventListener('load', Wi),
                        n.addEventListener('error', Bi));
                    } catch (s) {
                      return void r(s);
                    }
                else t(null);
              })),
              Ui.catch(function (e) {
                return ((Ui = null), Promise.reject(e));
              }));
        },
        Hi = !1,
        qi = function () {
          return (
            Ri ||
            (Ri = $i(null).catch(function (e) {
              return ((Ri = null), Promise.reject(e));
            }))
          );
        };
      Promise.resolve()
        .then(function () {
          return qi();
        })
        .catch(function (e) {
          Hi || console.warn(e);
        });
      var Vi = r(604);
      function Gi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z',
          })
        );
      }
      const Qi = n.forwardRef(Gi);
      function Yi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
          })
        );
      }
      const Ki = n.forwardRef(Yi);
      function Zi(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
          })
        );
      }
      const Ji = n.forwardRef(Zi),
        Xi = (function () {
          for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
          Hi = !0;
          var n = Date.now();
          return qi().then(function (e) {
            return (function (e, t, r) {
              if (null === e) return null;
              var n = t[0].match(/^pk_test/),
                a = (function (e) {
                  return 3 === e ? 'v3' : e;
                })(e.version),
                s = Ti;
              n &&
                a !== s &&
                console.warn(
                  'Stripe.js@'
                    .concat(a, ' was loaded on the page, but @stripe/stripe-js@')
                    .concat('7.4.0', ' expected Stripe.js@')
                    .concat(
                      s,
                      '. This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning'
                    )
                );
              var o = e.apply(void 0, t);
              return (
                (function (e, t) {
                  e &&
                    e._registerWrapper &&
                    e._registerWrapper({ name: 'stripe-js', version: '7.4.0', startTime: t });
                })(o, r),
                o
              );
            })(e, t, n);
          });
        })(
          'pk_test_51FNIU1B5jZS7Yk3dGZQPC0ATOSWSG6Dvlcmi7KWmyMCeeIEfuDyRCyEEsG0xiW2Yn5yP3Vh6QvI0NzR5wJzOCwzq00g2MMJ3Dc'
        ),
        el = () => {
          const e = (0, Vi.useStripe)(),
            t = (0, Vi.useElements)(),
            { items: r, total: a, clearCart: s } = Ca(),
            { user: o } = ja(),
            i = te(),
            [l, c] = (0, n.useState)(!1),
            [u, d] = (0, n.useState)(''),
            [m, f] = (0, n.useState)(''),
            [p, h] = (0, n.useState)(''),
            [g, x] = (0, n.useState)(''),
            [y, v] = (0, n.useState)({
              firstName: (null === o || void 0 === o ? void 0 : o.first_name) || '',
              lastName: (null === o || void 0 === o ? void 0 : o.last_name) || '',
              email: (null === o || void 0 === o ? void 0 : o.email) || '',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'US',
            }),
            b = a >= 100 ? 0 : 9.99,
            w = 0.08 * a,
            j = a + b + w;
          (0, n.useEffect)(() => {
            r.length > 0 &&
              (async () => {
                try {
                  var e;
                  if ((f(''), h(''), x(''), j <= 0)) return void f('Invalid total amount');
                  const t = await da(j);
                  if (
                    (console.log('Payment intent response:', t),
                    null === t ||
                      void 0 === t ||
                      null === (e = t.data) ||
                      void 0 === e ||
                      !e.client_secret)
                  )
                    throw new Error('Unable to initialize payment. Please try again.');
                  (d(t.data.client_secret), h('ready'));
                } catch (t) {
                  const e =
                    'string' === typeof t
                      ? t
                      : (null === t || void 0 === t ? void 0 : t.message) ||
                        'Failed to initialize payment';
                  (console.error('Payment intent creation failed:', t),
                    f(e),
                    h('failed'),
                    Rt.error(e));
                }
              })();
          }, [j, r]);
          const k = (e) => {
            const { name: t, value: r } = e.target;
            (v((e) => ({ ...e, [t]: r })), f(''));
          };
          return (0, xa.jsxs)('div', {
            className: 'max-w-4xl mx-auto py-8',
            children: [
              (0, xa.jsx)('h1', {
                className: 'text-3xl font-bold text-gray-900 mb-8',
                children: 'Checkout',
              }),
              (0, xa.jsxs)('div', {
                className: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
                children: [
                  (0, xa.jsxs)('div', {
                    className: 'space-y-6',
                    children: [
                      (0, xa.jsxs)('div', {
                        className: 'bg-white rounded-lg shadow-md p-6',
                        children: [
                          (0, xa.jsx)('h2', {
                            className: 'text-xl font-semibold text-gray-900 mb-4',
                            children: 'Shipping Information',
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
                            children: [
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'First Name',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    name: 'firstName',
                                    value: y.firstName,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'Last Name',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    name: 'lastName',
                                    value: y.lastName,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'md:col-span-2',
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'Email',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'email',
                                    name: 'email',
                                    value: y.email,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'md:col-span-2',
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'Address',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    name: 'address',
                                    value: y.address,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'City',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    name: 'city',
                                    value: y.city,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'State',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    name: 'state',
                                    value: y.state,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'ZIP Code',
                                  }),
                                  (0, xa.jsx)('input', {
                                    type: 'text',
                                    name: 'zipCode',
                                    value: y.zipCode,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    required: !0,
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'Country',
                                  }),
                                  (0, xa.jsxs)('select', {
                                    name: 'country',
                                    value: y.country,
                                    onChange: k,
                                    className:
                                      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500',
                                    children: [
                                      (0, xa.jsx)('option', {
                                        value: 'US',
                                        children: 'United States',
                                      }),
                                      (0, xa.jsx)('option', { value: 'CA', children: 'Canada' }),
                                      (0, xa.jsx)('option', {
                                        value: 'UK',
                                        children: 'United Kingdom',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, xa.jsxs)('div', {
                        className: 'bg-white rounded-lg shadow-md p-6',
                        children: [
                          (0, xa.jsxs)('h2', {
                            className: 'text-xl font-semibold text-gray-900 mb-4 flex items-center',
                            children: [
                              (0, xa.jsx)(Qi, { className: 'h-6 w-6 mr-2' }),
                              'Payment Information',
                            ],
                          }),
                          (0, xa.jsxs)('form', {
                            onSubmit: async (r) => {
                              if ((r.preventDefault(), e && t)) {
                                if (
                                  (() => {
                                    const e = [
                                      'firstName',
                                      'lastName',
                                      'email',
                                      'address',
                                      'city',
                                      'state',
                                      'zipCode',
                                    ].filter((e) => {
                                      var t;
                                      return !(null !== (t = y[e]) && void 0 !== t && t.trim());
                                    });
                                    if (e.length > 0) {
                                      const t = `Please fill in all required fields: ${e.join(', ')}`;
                                      return (f(t), !1);
                                    }
                                    return !0;
                                  })()
                                ) {
                                  (c(!0), f(''), x(''));
                                  try {
                                    const r = t.getElement(Vi.CardElement);
                                    if (!r) throw new Error('Payment form is not ready');
                                    const { error: c, paymentIntent: d } =
                                      await e.confirmCardPayment(u, {
                                        payment_method: {
                                          card: r,
                                          billing_details: {
                                            name: `${y.firstName} ${y.lastName}`,
                                            email: y.email,
                                            address: {
                                              line1: y.address,
                                              city: y.city,
                                              state: y.state,
                                              postal_code: y.zipCode,
                                              country: y.country,
                                            },
                                          },
                                        },
                                      });
                                    if (c)
                                      throw (
                                        console.error('Stripe payment error:', c),
                                        new Error(c.message || 'Payment processing failed')
                                      );
                                    if (null === d || void 0 === d || !d.id)
                                      throw new Error('Invalid payment response received');
                                    try {
                                      console.log('Confirming order with backend...');
                                      const e = await ma(d.id, y);
                                      (console.log('Order confirmation response:', e),
                                        h('success'),
                                        Rt.success('Order placed successfully!'),
                                        s(),
                                        i('/profile?tab=orders'));
                                    } catch (l) {
                                      var n, a, o;
                                      console.error('Order confirmation failed:', l);
                                      const e =
                                        null === (n = l.message) || void 0 === n
                                          ? void 0
                                          : n.match(/reference: ([^.]+)/);
                                      throw (
                                        e && x(e[1]),
                                        null !== (a = l.message) &&
                                        void 0 !== a &&
                                        a.includes('out of stock')
                                          ? new Error(
                                              'Some items in your cart are out of stock. Please review your cart and try again.'
                                            )
                                          : null !== (o = l.message) &&
                                              void 0 !== o &&
                                              o.includes('reference:')
                                            ? new Error(
                                                'Your payment was processed but we encountered an issue completing your order. Please contact support with reference: ' +
                                                  (null === e || void 0 === e ? void 0 : e[1])
                                              )
                                            : new Error(
                                                'Payment succeeded but order creation failed. Please contact support.'
                                              )
                                      );
                                    }
                                  } catch (d) {
                                    const e =
                                      'string' === typeof d
                                        ? d
                                        : (null === d || void 0 === d ? void 0 : d.message) ||
                                          'Payment failed';
                                    (console.error('Payment/Order error:', d),
                                      f(e),
                                      h('failed'),
                                      Rt.error(e));
                                  } finally {
                                    c(!1);
                                  }
                                }
                              } else f('Payment system is not ready. Please try again.');
                            },
                            children: [
                              (0, xa.jsxs)('div', {
                                className: 'mb-4',
                                children: [
                                  (0, xa.jsx)('label', {
                                    className: 'block text-sm font-medium text-gray-700 mb-2',
                                    children: 'Card Details',
                                  }),
                                  (0, xa.jsx)('div', {
                                    className:
                                      'border rounded-md p-3 ' +
                                      (m ? 'border-red-300' : 'border-gray-300'),
                                    children: (0, xa.jsx)(Vi.CardElement, {
                                      options: {
                                        style: {
                                          base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': { color: '#aab7c4' },
                                          },
                                          invalid: { color: '#9e2146' },
                                        },
                                      },
                                      onChange: () => {
                                        m && f('');
                                      },
                                    }),
                                  }),
                                ],
                              }),
                              m &&
                                (0, xa.jsxs)('div', {
                                  className: 'mb-4 p-3 bg-red-50 border border-red-200 rounded-md',
                                  children: [
                                    (0, xa.jsx)('p', {
                                      className: 'text-red-600 text-sm',
                                      children: m,
                                    }),
                                    g &&
                                      (0, xa.jsxs)('p', {
                                        className: 'mt-1 text-sm text-gray-600',
                                        children: [
                                          'Reference: ',
                                          (0, xa.jsx)('span', {
                                            className: 'font-mono',
                                            children: g,
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              'failed' === p &&
                                !m &&
                                (0, xa.jsx)('div', {
                                  className: 'mb-4 p-3 bg-red-50 border border-red-200 rounded-md',
                                  children: (0, xa.jsx)('p', {
                                    className: 'text-red-600 text-sm',
                                    children:
                                      'Payment failed. Please check your card details and try again.',
                                  }),
                                }),
                              (0, xa.jsxs)('div', {
                                className: 'flex items-center text-sm text-gray-500 mb-4',
                                children: [
                                  (0, xa.jsx)(Ki, { className: 'h-4 w-4 mr-2' }),
                                  (0, xa.jsx)('span', {
                                    children: 'Your payment information is secure and encrypted',
                                  }),
                                ],
                              }),
                              (0, xa.jsx)('button', {
                                type: 'submit',
                                disabled: !e || l || !u || 0 === r.length,
                                className: `w-full py-3 px-4 rounded-md font-medium transition-colors duration-200\n                  ${l || !u || 0 === r.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}\n                  text-white disabled:opacity-50`,
                                children: l
                                  ? 'Processing...'
                                  : u
                                    ? 0 === r.length
                                      ? 'Cart is empty'
                                      : `Pay ${ha(j)}`
                                    : 'Loading...',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, xa.jsx)('div', {
                    className: 'lg:col-span-1',
                    children: (0, xa.jsxs)('div', {
                      className: 'bg-white rounded-lg shadow-md p-6 sticky top-8',
                      children: [
                        (0, xa.jsx)('h2', {
                          className: 'text-xl font-semibold text-gray-900 mb-4',
                          children: 'Order Summary',
                        }),
                        (0, xa.jsx)('div', {
                          className: 'space-y-3 mb-4',
                          children: r.map((e) => {
                            var t, r, n, a;
                            return (0, xa.jsxs)(
                              'div',
                              {
                                className: 'flex items-center space-x-3',
                                children: [
                                  (0, xa.jsx)('img', {
                                    src:
                                      (null === (t = e.product) ||
                                      void 0 === t ||
                                      null === (r = t.images) ||
                                      void 0 === r
                                        ? void 0
                                        : r[0]) || 'https://via.placeholder.com/60x60',
                                    alt: null === (n = e.product) || void 0 === n ? void 0 : n.name,
                                    className: 'w-12 h-12 object-cover rounded-md',
                                  }),
                                  (0, xa.jsxs)('div', {
                                    className: 'flex-1',
                                    children: [
                                      (0, xa.jsx)('p', {
                                        className: 'font-medium text-gray-900 text-sm',
                                        children:
                                          null === (a = e.product) || void 0 === a
                                            ? void 0
                                            : a.name,
                                      }),
                                      (0, xa.jsxs)('p', {
                                        className: 'text-gray-600 text-sm',
                                        children: ['Qty: ', e.quantity],
                                      }),
                                    ],
                                  }),
                                  (0, xa.jsx)('span', {
                                    className: 'font-medium text-gray-900',
                                    children: ha(e.price * e.quantity),
                                  }),
                                ],
                              },
                              e.product_id
                            );
                          }),
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'border-t border-gray-200 pt-4 space-y-2',
                          children: [
                            (0, xa.jsxs)('div', {
                              className: 'flex justify-between',
                              children: [
                                (0, xa.jsx)('span', {
                                  className: 'text-gray-600',
                                  children: 'Subtotal',
                                }),
                                (0, xa.jsx)('span', { className: 'font-medium', children: ha(a) }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex justify-between',
                              children: [
                                (0, xa.jsx)('span', {
                                  className: 'text-gray-600',
                                  children: 'Shipping',
                                }),
                                (0, xa.jsx)('span', {
                                  className: 'font-medium',
                                  children: 0 === b ? 'Free' : ha(b),
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex justify-between',
                              children: [
                                (0, xa.jsx)('span', {
                                  className: 'text-gray-600',
                                  children: 'Tax',
                                }),
                                (0, xa.jsx)('span', { className: 'font-medium', children: ha(w) }),
                              ],
                            }),
                            (0, xa.jsx)('div', {
                              className: 'border-t border-gray-200 pt-2',
                              children: (0, xa.jsxs)('div', {
                                className: 'flex justify-between',
                                children: [
                                  (0, xa.jsx)('span', {
                                    className: 'text-lg font-semibold text-gray-900',
                                    children: 'Total',
                                  }),
                                  (0, xa.jsx)('span', {
                                    className: 'text-lg font-semibold text-gray-900',
                                    children: ha(j),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'mt-6 space-y-2',
                          children: [
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center text-sm text-gray-600',
                              children: [
                                (0, xa.jsx)(Ji, { className: 'h-4 w-4 mr-2 text-green-500' }),
                                (0, xa.jsx)('span', { children: 'SSL Encrypted Checkout' }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center text-sm text-gray-600',
                              children: [
                                (0, xa.jsx)(Ji, { className: 'h-4 w-4 mr-2 text-green-500' }),
                                (0, xa.jsx)('span', { children: '30-Day Money Back Guarantee' }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center text-sm text-gray-600',
                              children: [
                                (0, xa.jsx)(Ji, { className: 'h-4 w-4 mr-2 text-green-500' }),
                                (0, xa.jsx)('span', {
                                  children: 'Free Shipping on Orders Over $100',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          });
        };
      class tl extends n.Component {
        constructor(e) {
          (super(e), (this.state = { hasError: !1, errorMessage: '' }));
        }
        static getDerivedStateFromError(e) {
          return {
            hasError: !0,
            errorMessage: e.message || 'Something went wrong with the checkout process.',
          };
        }
        componentDidCatch(e, t) {
          console.error('Checkout error:', e, t);
        }
        render() {
          return this.state.hasError
            ? (0, xa.jsx)('div', {
                className: 'min-h-screen bg-gray-50 py-12',
                children: (0, xa.jsx)('div', {
                  className: 'max-w-3xl mx-auto px-4',
                  children: (0, xa.jsxs)('div', {
                    className: 'bg-white rounded-lg shadow-md p-6',
                    children: [
                      (0, xa.jsx)('h2', {
                        className: 'text-xl font-semibold text-red-600 mb-4',
                        children: 'Error',
                      }),
                      (0, xa.jsx)('p', {
                        className: 'text-gray-700 mb-4',
                        children: this.state.errorMessage,
                      }),
                      (0, xa.jsx)('button', {
                        onClick: () => {
                          (this.setState({ hasError: !1, errorMessage: '' }),
                            window.location.reload());
                        },
                        className:
                          'bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700',
                        children: 'Try Again',
                      }),
                    ],
                  }),
                }),
              })
            : this.props.children;
        }
      }
      const rl = () =>
        (0, xa.jsx)(Vi.Elements, {
          stripe: Xi,
          children: (0, xa.jsx)(tl, {
            children: (0, xa.jsx)('div', {
              className: 'min-h-screen bg-gray-50',
              children: (0, xa.jsx)('div', {
                className: 'container-max px-4 sm:px-6 lg:px-8',
                children: (0, xa.jsx)(el, {}),
              }),
            }),
          }),
        });
      function nl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88',
          })
        );
      }
      const al = n.forwardRef(nl);
      function sl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z',
          }),
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
          })
        );
      }
      const ol = n.forwardRef(sl),
        il = () => {
          var e, t;
          const [r, a] = (0, n.useState)({ email: '', password: '' }),
            [s, o] = (0, n.useState)(!1),
            [i, l] = (0, n.useState)(!1),
            { login: c } = ja(),
            u = te(),
            d =
              (null === (e = X().state) || void 0 === e || null === (t = e.from) || void 0 === t
                ? void 0
                : t.pathname) || '/',
            m = (e) => {
              a({ ...r, [e.target.name]: e.target.value });
            };
          return (0, xa.jsxs)('div', {
            className:
              'min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8',
            children: [
              (0, xa.jsxs)('div', {
                className: 'sm:mx-auto sm:w-full sm:max-w-md',
                children: [
                  (0, xa.jsx)('div', {
                    className: 'flex justify-center',
                    children: (0, xa.jsx)('div', {
                      className:
                        'w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center',
                      children: (0, xa.jsx)('span', {
                        className: 'text-primary-foreground font-bold text-2xl',
                        children: 'F',
                      }),
                    }),
                  }),
                  (0, xa.jsx)('h2', {
                    className: 'mt-6 text-center text-3xl font-bold text-foreground font-heading',
                    children: 'Sign in to your account',
                  }),
                  (0, xa.jsxs)('p', {
                    className: 'mt-2 text-center text-sm text-muted-foreground',
                    children: [
                      'Or',
                      ' ',
                      (0, xa.jsx)(Oe, {
                        to: '/register',
                        className: 'font-medium text-primary hover:text-primary/80',
                        children: 'create a new account',
                      }),
                    ],
                  }),
                ],
              }),
              (0, xa.jsx)('div', {
                className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md',
                children: (0, xa.jsxs)('div', {
                  className: 'bg-card py-8 px-4 shadow-lg rounded-lg sm:px-10',
                  children: [
                    (0, xa.jsxs)('form', {
                      className: 'space-y-6',
                      onSubmit: async (e) => {
                        (e.preventDefault(), l(!0));
                        try {
                          (await c(r)).success && u(d, { replace: !0 });
                        } catch (t) {
                          console.error('Login error:', t);
                        } finally {
                          l(!1);
                        }
                      },
                      children: [
                        (0, xa.jsxs)('div', {
                          children: [
                            (0, xa.jsx)('label', {
                              htmlFor: 'email',
                              className: 'block text-sm font-medium text-foreground',
                              children: 'Email address',
                            }),
                            (0, xa.jsx)('div', {
                              className: 'mt-1',
                              children: (0, xa.jsx)('input', {
                                id: 'email',
                                name: 'email',
                                type: 'email',
                                autoComplete: 'email',
                                required: !0,
                                value: r.email,
                                onChange: m,
                                className:
                                  'appearance-none block w-full px-3 py-2 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:text-sm bg-muted',
                                placeholder: 'Enter your email',
                              }),
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          children: [
                            (0, xa.jsx)('label', {
                              htmlFor: 'password',
                              className: 'block text-sm font-medium text-foreground',
                              children: 'Password',
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'mt-1 relative',
                              children: [
                                (0, xa.jsx)('input', {
                                  id: 'password',
                                  name: 'password',
                                  type: s ? 'text' : 'password',
                                  autoComplete: 'current-password',
                                  required: !0,
                                  value: r.password,
                                  onChange: m,
                                  className:
                                    'appearance-none block w-full px-3 py-2 pr-10 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:text-sm bg-muted',
                                  placeholder: 'Enter your password',
                                }),
                                (0, xa.jsx)(Yo, {
                                  type: 'button',
                                  size: 'icon',
                                  variant: 'ghost',
                                  className: 'absolute inset-y-0 right-0 pr-3',
                                  onClick: () => o(!s),
                                  children: s
                                    ? (0, xa.jsx)(al, { className: 'h-5 w-5' })
                                    : (0, xa.jsx)(ol, { className: 'h-5 w-5' }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'flex items-center justify-between',
                          children: [
                            (0, xa.jsxs)('div', {
                              className: 'flex items-center',
                              children: [
                                (0, xa.jsx)('input', {
                                  id: 'remember-me',
                                  name: 'remember-me',
                                  type: 'checkbox',
                                  className:
                                    'h-4 w-4 focus:ring-2 focus:ring-ring rounded accent-primary',
                                }),
                                (0, xa.jsx)('label', {
                                  htmlFor: 'remember-me',
                                  className: 'ml-2 block text-sm text-foreground',
                                  children: 'Remember me',
                                }),
                              ],
                            }),
                            (0, xa.jsx)('div', {
                              className: 'text-sm',
                              children: (0, xa.jsx)('button', {
                                className: 'font-medium text-primary hover:text-primary/80',
                                children: 'Forgot your password?',
                              }),
                            }),
                          ],
                        }),
                        (0, xa.jsx)('div', {
                          children: (0, xa.jsx)(Yo, {
                            type: 'submit',
                            disabled: i,
                            size: 'lg',
                            className: 'w-full',
                            children: i
                              ? (0, xa.jsx)('div', { className: 'loading-spinner w-5 h-5' })
                              : 'Sign in',
                          }),
                        }),
                      ],
                    }),
                    (0, xa.jsxs)('div', {
                      className: 'mt-6',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'relative',
                          children: [
                            (0, xa.jsx)('div', {
                              className: 'absolute inset-0 flex items-center',
                              children: (0, xa.jsx)('div', {
                                className: 'w-full border-t border-gray-300',
                              }),
                            }),
                            (0, xa.jsx)('div', {
                              className: 'relative flex justify-center text-sm',
                              children: (0, xa.jsx)('span', {
                                className: 'px-2 bg-white text-gray-500',
                                children: 'Or continue with',
                              }),
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'mt-6 grid grid-cols-2 gap-3',
                          children: [
                            (0, xa.jsxs)(Yo, {
                              type: 'button',
                              variant: 'outline',
                              className: 'w-full',
                              children: [
                                (0, xa.jsxs)('svg', {
                                  className: 'w-5 h-5',
                                  viewBox: '0 0 24 24',
                                  children: [
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z',
                                    }),
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z',
                                    }),
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z',
                                    }),
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z',
                                    }),
                                  ],
                                }),
                                (0, xa.jsx)('span', { className: 'ml-2', children: 'Google' }),
                              ],
                            }),
                            (0, xa.jsxs)(Yo, {
                              type: 'button',
                              variant: 'outline',
                              className: 'w-full',
                              children: [
                                (0, xa.jsx)('svg', {
                                  className: 'w-5 h-5',
                                  fill: 'currentColor',
                                  viewBox: '0 0 24 24',
                                  children: (0, xa.jsx)('path', {
                                    d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                                  }),
                                }),
                                (0, xa.jsx)('span', { className: 'ml-2', children: 'Facebook' }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, xa.jsx)('div', {
                      className: 'mt-6 p-4 bg-gray-50 rounded-md',
                      children: (0, xa.jsxs)('div', {
                        className: 'text-sm text-gray-600',
                        children: [
                          (0, xa.jsx)('p', {
                            className: 'font-semibold mb-2',
                            children: 'New to FitGear?',
                          }),
                          (0, xa.jsx)('p', {
                            children:
                              'Create a new account to start shopping for fitness equipment and gear.',
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        ll = () => {
          const [e, t] = (0, n.useState)({
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }),
            [r, a] = (0, n.useState)(!1),
            [s, o] = (0, n.useState)(!1),
            [i, l] = (0, n.useState)(!1),
            [c, u] = (0, n.useState)({}),
            { register: d } = ja(),
            m = te(),
            f = (r) => {
              (t({ ...e, [r.target.name]: r.target.value }),
                c[r.target.name] && u({ ...c, [r.target.name]: '' }));
            };
          return (0, xa.jsxs)('div', {
            className:
              'min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8',
            children: [
              (0, xa.jsxs)('div', {
                className: 'sm:mx-auto sm:w-full sm:max-w-md',
                children: [
                  (0, xa.jsx)('div', {
                    className: 'flex justify-center',
                    children: (0, xa.jsx)('div', {
                      className:
                        'w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center',
                      children: (0, xa.jsx)('span', {
                        className: 'text-primary-foreground font-bold text-2xl',
                        children: 'F',
                      }),
                    }),
                  }),
                  (0, xa.jsx)('h2', {
                    className: 'mt-6 text-center text-3xl font-bold text-foreground font-heading',
                    children: 'Create your account',
                  }),
                  (0, xa.jsxs)('p', {
                    className: 'mt-2 text-center text-sm text-muted-foreground',
                    children: [
                      'Or',
                      ' ',
                      (0, xa.jsx)(Oe, {
                        to: '/login',
                        className: 'font-medium text-primary hover:underline',
                        children: 'sign in to your existing account',
                      }),
                    ],
                  }),
                ],
              }),
              (0, xa.jsx)('div', {
                className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md',
                children: (0, xa.jsxs)('div', {
                  className: 'bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10',
                  children: [
                    (0, xa.jsxs)('form', {
                      className: 'space-y-6',
                      onSubmit: async (t) => {
                        if (
                          (t.preventDefault(),
                          (() => {
                            const t = {};
                            return (
                              e.first_name.trim() || (t.first_name = 'First name is required'),
                              e.last_name.trim() || (t.last_name = 'Last name is required'),
                              e.email.trim()
                                ? /\S+@\S+\.\S+/.test(e.email) || (t.email = 'Email is invalid')
                                : (t.email = 'Email is required'),
                              e.password
                                ? e.password.length < 6 &&
                                  (t.password = 'Password must be at least 6 characters')
                                : (t.password = 'Password is required'),
                              e.confirmPassword
                                ? e.password !== e.confirmPassword &&
                                  (t.confirmPassword = 'Passwords do not match')
                                : (t.confirmPassword = 'Please confirm your password'),
                              u(t),
                              0 === Object.keys(t).length
                            );
                          })())
                        ) {
                          l(!0);
                          try {
                            const { confirmPassword: t, ...r } = e;
                            (await d(r)).success && m('/');
                          } catch (r) {
                            console.error('Registration error:', r);
                          } finally {
                            l(!1);
                          }
                        }
                      },
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'grid grid-cols-2 gap-4',
                          children: [
                            (0, xa.jsxs)('div', {
                              children: [
                                (0, xa.jsx)('label', {
                                  htmlFor: 'first_name',
                                  className: 'block text-sm font-medium text-foreground',
                                  children: 'First name',
                                }),
                                (0, xa.jsxs)('div', {
                                  className: 'mt-1',
                                  children: [
                                    (0, xa.jsx)('input', {
                                      id: 'first_name',
                                      name: 'first_name',
                                      type: 'text',
                                      autoComplete: 'given-name',
                                      required: !0,
                                      value: e.first_name,
                                      onChange: f,
                                      className:
                                        'appearance-none block w-full px-3 py-2 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 sm:text-sm ' +
                                        (c.first_name
                                          ? 'bg-destructive/10 focus:ring-destructive'
                                          : 'bg-muted focus:ring-ring'),
                                      placeholder: 'First name',
                                    }),
                                    c.first_name &&
                                      (0, xa.jsx)('p', {
                                        className: 'mt-1 text-sm text-red-600',
                                        children: c.first_name,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            (0, xa.jsxs)('div', {
                              children: [
                                (0, xa.jsx)('label', {
                                  htmlFor: 'last_name',
                                  className: 'block text-sm font-medium text-foreground',
                                  children: 'Last name',
                                }),
                                (0, xa.jsxs)('div', {
                                  className: 'mt-1',
                                  children: [
                                    (0, xa.jsx)('input', {
                                      id: 'last_name',
                                      name: 'last_name',
                                      type: 'text',
                                      autoComplete: 'family-name',
                                      required: !0,
                                      value: e.last_name,
                                      onChange: f,
                                      className:
                                        'appearance-none block w-full px-3 py-2 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 sm:text-sm ' +
                                        (c.last_name
                                          ? 'bg-destructive/10 focus:ring-destructive'
                                          : 'bg-muted focus:ring-ring'),
                                      placeholder: 'Last name',
                                    }),
                                    c.last_name &&
                                      (0, xa.jsx)('p', {
                                        className: 'mt-1 text-sm text-red-600',
                                        children: c.last_name,
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          children: [
                            (0, xa.jsx)('label', {
                              htmlFor: 'email',
                              className: 'block text-sm font-medium text-foreground',
                              children: 'Email address',
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'mt-1',
                              children: [
                                (0, xa.jsx)('input', {
                                  id: 'email-address',
                                  name: 'email',
                                  type: 'email',
                                  autoComplete: 'email',
                                  required: !0,
                                  value: e.email,
                                  onChange: f,
                                  className:
                                    'appearance-none block w-full px-3 py-2 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 sm:text-sm ' +
                                    (c.email
                                      ? 'bg-destructive/10 focus:ring-destructive'
                                      : 'bg-muted focus:ring-ring'),
                                  placeholder: 'Email address',
                                }),
                                c.email &&
                                  (0, xa.jsx)('p', {
                                    className: 'mt-1 text-sm text-red-600',
                                    children: c.email,
                                  }),
                              ],
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          children: [
                            (0, xa.jsx)('label', {
                              htmlFor: 'password',
                              className: 'block text-sm font-medium text-foreground',
                              children: 'Password',
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'mt-1 relative',
                              children: [
                                (0, xa.jsx)('input', {
                                  id: 'password',
                                  name: 'password',
                                  type: r ? 'text' : 'password',
                                  autoComplete: 'new-password',
                                  required: !0,
                                  value: e.password,
                                  onChange: f,
                                  className:
                                    'appearance-none block w-full px-3 py-2 pr-10 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 sm:text-sm ' +
                                    (c.password
                                      ? 'bg-destructive/10 focus:ring-destructive'
                                      : 'bg-muted focus:ring-ring'),
                                  placeholder: 'Password',
                                }),
                                (0, xa.jsx)(Yo, {
                                  type: 'button',
                                  variant: 'ghost',
                                  size: 'icon',
                                  className: 'absolute inset-y-0 right-0 pr-3',
                                  onClick: () => a(!r),
                                  children: r
                                    ? (0, xa.jsx)(al, {
                                        className: 'h-5 w-5 text-muted-foreground',
                                      })
                                    : (0, xa.jsx)(ol, {
                                        className: 'h-5 w-5 text-muted-foreground',
                                      }),
                                }),
                              ],
                            }),
                            c.password &&
                              (0, xa.jsx)('p', {
                                className: 'mt-1 text-sm text-red-600',
                                children: c.password,
                              }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          children: [
                            (0, xa.jsx)('label', {
                              htmlFor: 'confirmPassword',
                              className: 'block text-sm font-medium text-foreground',
                              children: 'Confirm password',
                            }),
                            (0, xa.jsxs)('div', {
                              className: 'mt-1 relative',
                              children: [
                                (0, xa.jsx)('input', {
                                  id: 'confirmPassword',
                                  name: 'confirmPassword',
                                  type: s ? 'text' : 'password',
                                  autoComplete: 'new-password',
                                  required: !0,
                                  value: e.confirmPassword,
                                  onChange: f,
                                  className:
                                    'appearance-none block w-full px-3 py-2 pr-10 rounded-md placeholder-muted-foreground focus:outline-none focus:ring-2 sm:text-sm ' +
                                    (c.confirmPassword
                                      ? 'bg-destructive/10 focus:ring-destructive'
                                      : 'bg-muted focus:ring-ring'),
                                  placeholder: 'Confirm password',
                                }),
                                (0, xa.jsx)(Yo, {
                                  type: 'button',
                                  variant: 'ghost',
                                  size: 'icon',
                                  className: 'absolute inset-y-0 right-0 pr-3',
                                  onClick: () => o(!s),
                                  children: s
                                    ? (0, xa.jsx)(al, {
                                        className: 'h-5 w-5 text-muted-foreground',
                                      })
                                    : (0, xa.jsx)(ol, {
                                        className: 'h-5 w-5 text-muted-foreground',
                                      }),
                                }),
                              ],
                            }),
                            c.confirmPassword &&
                              (0, xa.jsx)('p', {
                                className: 'mt-1 text-sm text-red-600',
                                children: c.confirmPassword,
                              }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'flex items-center',
                          children: [
                            (0, xa.jsx)('input', {
                              id: 'agree-terms',
                              name: 'agree-terms',
                              type: 'checkbox',
                              required: !0,
                              className:
                                'h-4 w-4 focus:ring-2 focus:ring-ring rounded accent-primary',
                            }),
                            (0, xa.jsxs)('label', {
                              htmlFor: 'agree-terms',
                              className: 'ml-2 block text-sm text-foreground',
                              children: [
                                'I agree to the',
                                ' ',
                                (0, xa.jsx)(Yo, {
                                  variant: 'link',
                                  className: 'p-0 h-auto',
                                  children: 'Terms of Service',
                                }),
                                ' ',
                                'and',
                                ' ',
                                (0, xa.jsx)(Yo, {
                                  variant: 'link',
                                  className: 'p-0 h-auto',
                                  children: 'Privacy Policy',
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, xa.jsx)('div', {
                          children: (0, xa.jsx)(Yo, {
                            type: 'submit',
                            disabled: i,
                            size: 'lg',
                            className: 'w-full',
                            children: i
                              ? (0, xa.jsx)('div', { className: 'loading-spinner w-5 h-5' })
                              : 'Create account',
                          }),
                        }),
                      ],
                    }),
                    (0, xa.jsxs)('div', {
                      className: 'mt-6',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'relative',
                          children: [
                            (0, xa.jsx)('div', {
                              className: 'absolute inset-0 flex items-center',
                              children: (0, xa.jsx)('div', {
                                className: 'w-full border-t border-border',
                              }),
                            }),
                            (0, xa.jsx)('div', {
                              className: 'relative flex justify-center text-sm',
                              children: (0, xa.jsx)('span', {
                                className: 'px-2 bg-card text-muted-foreground',
                                children: 'Or sign up with',
                              }),
                            }),
                          ],
                        }),
                        (0, xa.jsxs)('div', {
                          className: 'mt-6 grid grid-cols-2 gap-3',
                          children: [
                            (0, xa.jsxs)(Yo, {
                              type: 'button',
                              variant: 'outline',
                              className: 'w-full',
                              children: [
                                (0, xa.jsxs)('svg', {
                                  className: 'w-5 h-5',
                                  viewBox: '0 0 24 24',
                                  children: [
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z',
                                    }),
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z',
                                    }),
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z',
                                    }),
                                    (0, xa.jsx)('path', {
                                      fill: 'currentColor',
                                      d: 'M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z',
                                    }),
                                  ],
                                }),
                                (0, xa.jsx)('span', { className: 'ml-2', children: 'Google' }),
                              ],
                            }),
                            (0, xa.jsxs)(Yo, {
                              type: 'button',
                              variant: 'outline',
                              className: 'w-full',
                              children: [
                                (0, xa.jsx)('svg', {
                                  className: 'w-5 h-5',
                                  fill: 'currentColor',
                                  viewBox: '0 0 24 24',
                                  children: (0, xa.jsx)('path', {
                                    d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                                  }),
                                }),
                                (0, xa.jsx)('span', { className: 'ml-2', children: 'Facebook' }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          });
        };
      function cl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
          })
        );
      }
      const ul = n.forwardRef(cl),
        dl = () => {
          const [e, t] = (0, n.useState)([]),
            [r, a] = (0, n.useState)(!0),
            [s, o] = (0, n.useState)(''),
            [i, l] = (0, n.useState)('');
          (0, n.useEffect)(() => {
            c();
          }, [i]);
          const c = async () => {
              try {
                a(!0);
                const e = {};
                i && (e.category = i);
                const r = await oa(e);
                (t(r.data.posts || []), a(!1));
              } catch (e) {
                (console.error('Error fetching blog posts:', e), t([]), a(!1));
              }
            },
            u = (e || []).filter(
              (e) =>
                e.title.toLowerCase().includes(s.toLowerCase()) ||
                e.content.toLowerCase().includes(s.toLowerCase())
            );
          return r
            ? (0, xa.jsx)('div', {
                className: 'min-h-screen flex items-center justify-center',
                children: (0, xa.jsx)('div', { className: 'loading-spinner' }),
              })
            : (0, xa.jsx)('div', {
                className: 'min-h-screen bg-gray-50',
                children: (0, xa.jsxs)('div', {
                  className: 'container-max px-4 sm:px-6 lg:px-8 py-8',
                  children: [
                    (0, xa.jsxs)('div', {
                      className: 'text-center mb-12',
                      children: [
                        (0, xa.jsx)('h1', {
                          className: 'text-4xl font-bold text-gray-900 mb-4 font-heading',
                          children: 'FitGear Blog',
                        }),
                        (0, xa.jsx)('p', {
                          className: 'text-xl text-gray-600 max-w-2xl mx-auto',
                          children:
                            'Discover the latest fitness tips, workout routines, and equipment guides to help you reach your goals.',
                        }),
                      ],
                    }),
                    (0, xa.jsx)('div', {
                      className: 'bg-white rounded-lg shadow-md p-6 mb-8',
                      children: (0, xa.jsxs)('div', {
                        className: 'flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4',
                        children: [
                          (0, xa.jsxs)('div', {
                            className: 'flex-1 relative',
                            children: [
                              (0, xa.jsx)(Aa, {
                                className:
                                  'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400',
                              }),
                              (0, xa.jsx)('input', {
                                type: 'text',
                                value: s,
                                onChange: (e) => o(e.target.value),
                                placeholder: 'Search articles...',
                                className:
                                  'w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500',
                              }),
                            ],
                          }),
                          (0, xa.jsx)('div', {
                            className: 'md:w-64',
                            children: (0, xa.jsxs)('select', {
                              value: i,
                              onChange: (e) => l(e.target.value),
                              className:
                                'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500',
                              children: [
                                (0, xa.jsx)('option', { value: '', children: 'All Categories' }),
                                [
                                  'Strength Training',
                                  'Home Gym',
                                  'Nutrition',
                                  'Cardio',
                                  'Recovery',
                                ].map((e) => (0, xa.jsx)('option', { value: e, children: e }, e)),
                              ],
                            }),
                          }),
                        ],
                      }),
                    }),
                    0 === u.length
                      ? (0, xa.jsx)('div', {
                          className: 'text-center py-12',
                          children: (0, xa.jsx)('p', {
                            className: 'text-gray-500 text-lg',
                            children: 'No articles found matching your criteria.',
                          }),
                        })
                      : (0, xa.jsx)('div', {
                          className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
                          children: u.map((e) =>
                            (0, xa.jsxs)(
                              'article',
                              {
                                className:
                                  'blog-card bg-white rounded-lg shadow-md overflow-hidden',
                                children: [
                                  (0, xa.jsx)('div', {
                                    className: 'aspect-w-16 aspect-h-9',
                                    children: (0, xa.jsx)('img', {
                                      src:
                                        e.featured_image ||
                                        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
                                      alt: e.title,
                                      className: 'w-full h-48 object-cover object-center',
                                    }),
                                  }),
                                  (0, xa.jsxs)('div', {
                                    className: 'p-6',
                                    children: [
                                      (0, xa.jsx)('div', {
                                        className:
                                          'flex items-center space-x-2 text-sm text-gray-500 mb-3',
                                        children: (0, xa.jsx)('span', {
                                          className:
                                            'px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium',
                                          children: e.category,
                                        }),
                                      }),
                                      (0, xa.jsx)('h2', {
                                        className:
                                          'text-xl font-semibold text-gray-900 mb-3 font-heading',
                                        children: (0, xa.jsx)(Oe, {
                                          to: `/blog/${e.id}`,
                                          className:
                                            'hover:text-primary-600 transition-colors duration-200',
                                          children: e.title,
                                        }),
                                      }),
                                      (0, xa.jsxs)('p', {
                                        className: 'text-gray-600 mb-4 line-clamp-3',
                                        children: [e.content.substring(0, 150), '...'],
                                      }),
                                      (0, xa.jsx)('div', {
                                        className:
                                          'flex items-center justify-between text-sm text-gray-500',
                                        children: (0, xa.jsxs)('div', {
                                          className: 'flex items-center space-x-4',
                                          children: [
                                            (0, xa.jsxs)('div', {
                                              className: 'flex items-center',
                                              children: [
                                                (0, xa.jsx)(Ua, { className: 'h-4 w-4 mr-1' }),
                                                (0, xa.jsx)('span', { children: e.author }),
                                              ],
                                            }),
                                            (0, xa.jsxs)('div', {
                                              className: 'flex items-center',
                                              children: [
                                                (0, xa.jsx)(ul, { className: 'h-4 w-4 mr-1' }),
                                                (0, xa.jsx)('span', { children: ga(e.created_at) }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, xa.jsx)('div', {
                                        className: 'mt-4',
                                        children: (0, xa.jsx)(Oe, {
                                          to: `/blog/${e.id}`,
                                          className:
                                            'text-primary-600 hover:text-primary-800 font-medium text-sm',
                                          children: 'Read More \u2192',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e.id
                            )
                          ),
                        }),
                  ],
                }),
              });
        };
      function ml(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z',
          }),
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M6 6h.008v.008H6V6Z',
          })
        );
      }
      const fl = n.forwardRef(ml),
        pl = () => {
          const { id: e } = re(),
            [t, r] = (0, n.useState)(null),
            [a, s] = (0, n.useState)(!0);
          (0, n.useEffect)(() => {
            o();
          }, [e]);
          const o = async () => {
            try {
              s(!0);
              const t = await ia(e);
              (r(t.data), s(!1));
            } catch (t) {
              (console.error('Error fetching blog post:', t), s(!1));
            }
          };
          return a
            ? (0, xa.jsx)('div', {
                className: 'min-h-screen flex items-center justify-center',
                children: (0, xa.jsx)('div', { className: 'loading-spinner' }),
              })
            : t
              ? (0, xa.jsx)('div', {
                  className: 'min-h-screen bg-gray-50',
                  children: (0, xa.jsxs)('div', {
                    className: 'container-max px-4 sm:px-6 lg:px-8 py-8',
                    children: [
                      (0, xa.jsx)('div', {
                        className: 'mb-8',
                        children: (0, xa.jsxs)(Oe, {
                          to: '/blog',
                          className:
                            'inline-flex items-center text-primary-600 hover:text-primary-800 font-medium',
                          children: [
                            (0, xa.jsx)(pi, { className: 'h-4 w-4 mr-2' }),
                            'Back to Blog',
                          ],
                        }),
                      }),
                      (0, xa.jsxs)('article', {
                        className: 'max-w-4xl mx-auto',
                        children: [
                          (0, xa.jsx)('div', {
                            className: 'aspect-w-16 aspect-h-9 mb-8',
                            children: (0, xa.jsx)('img', {
                              src:
                                t.featured_image ||
                                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
                              alt: t.title,
                              className:
                                'w-full h-64 md:h-96 object-cover object-center rounded-lg shadow-lg',
                            }),
                          }),
                          (0, xa.jsxs)('header', {
                            className: 'mb-8',
                            children: [
                              (0, xa.jsx)('div', {
                                className: 'flex items-center space-x-2 mb-4',
                                children: (0, xa.jsx)('span', {
                                  className:
                                    'px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium',
                                  children: t.category,
                                }),
                              }),
                              (0, xa.jsx)('h1', {
                                className:
                                  'text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading',
                                children: t.title,
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'flex items-center space-x-6 text-gray-600',
                                children: [
                                  (0, xa.jsxs)('div', {
                                    className: 'flex items-center',
                                    children: [
                                      (0, xa.jsx)(Ua, { className: 'h-5 w-5 mr-2' }),
                                      (0, xa.jsxs)('span', { children: ['By ', t.author] }),
                                    ],
                                  }),
                                  (0, xa.jsxs)('div', {
                                    className: 'flex items-center',
                                    children: [
                                      (0, xa.jsx)(ul, { className: 'h-5 w-5 mr-2' }),
                                      (0, xa.jsx)('span', { children: ga(t.created_at) }),
                                    ],
                                  }),
                                ],
                              }),
                              t.tags &&
                                t.tags.length > 0 &&
                                (0, xa.jsxs)('div', {
                                  className: 'flex items-center space-x-2 mt-4',
                                  children: [
                                    (0, xa.jsx)(fl, { className: 'h-5 w-5 text-gray-400' }),
                                    (0, xa.jsx)('div', {
                                      className: 'flex space-x-2',
                                      children: t.tags.map((e, t) =>
                                        (0, xa.jsx)(
                                          'span',
                                          {
                                            className:
                                              'px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm',
                                            children: e,
                                          },
                                          t
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                            ],
                          }),
                          (0, xa.jsx)('div', {
                            className: 'bg-white rounded-lg shadow-md p-8',
                            children: (0, xa.jsx)('div', {
                              className: 'blog-content prose max-w-none',
                              children: t.content.split('\n').map((e, t) =>
                                (0, xa.jsx)(
                                  'p',
                                  {
                                    className: 'mb-4 text-gray-700 leading-relaxed',
                                    children: e,
                                  },
                                  t
                                )
                              ),
                            }),
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mt-8 bg-white rounded-lg shadow-md p-6',
                            children: [
                              (0, xa.jsx)('h3', {
                                className: 'text-lg font-semibold text-gray-900 mb-4',
                                children: 'Share this article',
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'flex space-x-4',
                                children: [
                                  (0, xa.jsxs)('button', {
                                    className:
                                      'flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200',
                                    children: [
                                      (0, xa.jsx)('svg', {
                                        className: 'w-5 h-5 mr-2',
                                        fill: 'currentColor',
                                        viewBox: '0 0 24 24',
                                        children: (0, xa.jsx)('path', {
                                          d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                                        }),
                                      }),
                                      'Facebook',
                                    ],
                                  }),
                                  (0, xa.jsxs)('button', {
                                    className:
                                      'flex items-center px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors duration-200',
                                    children: [
                                      (0, xa.jsx)('svg', {
                                        className: 'w-5 h-5 mr-2',
                                        fill: 'currentColor',
                                        viewBox: '0 0 24 24',
                                        children: (0, xa.jsx)('path', {
                                          d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
                                        }),
                                      }),
                                      'Twitter',
                                    ],
                                  }),
                                  (0, xa.jsxs)('button', {
                                    className:
                                      'flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200',
                                    children: [
                                      (0, xa.jsx)('svg', {
                                        className: 'w-5 h-5 mr-2',
                                        fill: 'currentColor',
                                        viewBox: '0 0 24 24',
                                        children: (0, xa.jsx)('path', {
                                          d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488',
                                        }),
                                      }),
                                      'WhatsApp',
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, xa.jsxs)('div', {
                            className: 'mt-12',
                            children: [
                              (0, xa.jsx)('h3', {
                                className: 'text-2xl font-bold text-gray-900 mb-6 font-heading',
                                children: 'Related Articles',
                              }),
                              (0, xa.jsx)('div', {
                                className: 'text-center text-gray-500',
                                children: (0, xa.jsx)('p', {
                                  children: 'Related articles coming soon...',
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                })
              : (0, xa.jsx)('div', {
                  className: 'min-h-screen flex items-center justify-center',
                  children: (0, xa.jsxs)('div', {
                    className: 'text-center',
                    children: [
                      (0, xa.jsx)('h2', {
                        className: 'text-2xl font-semibold text-gray-900',
                        children: 'Article not found',
                      }),
                      (0, xa.jsx)('p', {
                        className: 'mt-2 text-gray-600',
                        children: "The article you're looking for doesn't exist.",
                      }),
                      (0, xa.jsxs)(Oe, {
                        to: '/blog',
                        className:
                          'mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700',
                        children: [(0, xa.jsx)(pi, { className: 'h-4 w-4 mr-2' }), 'Back to Blog'],
                      }),
                    ],
                  }),
                });
        };
      function hl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
          })
        );
      }
      const gl = n.forwardRef(hl),
        xl = () => {
          var e, t;
          const { user: r, updateUser: a } = ja(),
            [s, o] = (0, n.useState)('profile'),
            [i, l] = (0, n.useState)(!1),
            [c, u] = (0, n.useState)({
              first_name: (null === r || void 0 === r ? void 0 : r.first_name) || '',
              last_name: (null === r || void 0 === r ? void 0 : r.last_name) || '',
              email: (null === r || void 0 === r ? void 0 : r.email) || '',
            }),
            d = (e) => {
              u({ ...c, [e.target.name]: e.target.value });
            },
            m = [
              { id: 'profile', name: 'Profile', icon: Ua },
              { id: 'orders', name: 'Orders', icon: ki },
              { id: 'wishlist', name: 'Wishlist', icon: Fa },
              { id: 'settings', name: 'Settings', icon: gl },
            ];
          return (0, xa.jsx)('div', {
            className: 'min-h-screen bg-gray-50',
            children: (0, xa.jsx)('div', {
              className: 'container-max px-4 sm:px-6 lg:px-8 py-8',
              children: (0, xa.jsxs)('div', {
                className: 'grid grid-cols-1 lg:grid-cols-4 gap-8',
                children: [
                  (0, xa.jsx)('div', {
                    className: 'lg:col-span-1',
                    children: (0, xa.jsxs)('div', {
                      className: 'bg-white rounded-lg shadow-md p-6',
                      children: [
                        (0, xa.jsxs)('div', {
                          className: 'text-center mb-6',
                          children: [
                            (0, xa.jsx)('div', {
                              className:
                                'w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4',
                              children: (0, xa.jsxs)('span', {
                                className: 'text-white font-bold text-2xl',
                                children: [
                                  null === r ||
                                  void 0 === r ||
                                  null === (e = r.first_name) ||
                                  void 0 === e
                                    ? void 0
                                    : e.charAt(0),
                                  null === r ||
                                  void 0 === r ||
                                  null === (t = r.last_name) ||
                                  void 0 === t
                                    ? void 0
                                    : t.charAt(0),
                                ],
                              }),
                            }),
                            (0, xa.jsxs)('h2', {
                              className: 'text-xl font-semibold text-gray-900',
                              children: [
                                null === r || void 0 === r ? void 0 : r.first_name,
                                ' ',
                                null === r || void 0 === r ? void 0 : r.last_name,
                              ],
                            }),
                            (0, xa.jsx)('p', {
                              className: 'text-gray-600',
                              children: null === r || void 0 === r ? void 0 : r.email,
                            }),
                          ],
                        }),
                        (0, xa.jsx)('nav', {
                          className: 'space-y-2',
                          children: m.map((e) =>
                            (0, xa.jsxs)(
                              'button',
                              {
                                onClick: () => o(e.id),
                                className:
                                  'w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors duration-200 ' +
                                  (s === e.id
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-100'),
                                children: [
                                  (0, xa.jsx)(e.icon, { className: 'h-5 w-5' }),
                                  (0, xa.jsx)('span', { children: e.name }),
                                ],
                              },
                              e.id
                            )
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, xa.jsx)('div', {
                    className: 'lg:col-span-3',
                    children: (0, xa.jsxs)('div', {
                      className: 'bg-white rounded-lg shadow-md p-6',
                      children: [
                        'profile' === s &&
                          (0, xa.jsxs)('div', {
                            children: [
                              (0, xa.jsxs)('div', {
                                className: 'flex justify-between items-center mb-6',
                                children: [
                                  (0, xa.jsx)('h3', {
                                    className: 'text-xl font-semibold text-gray-900',
                                    children: 'Profile Information',
                                  }),
                                  (0, xa.jsx)('button', {
                                    onClick: () => l(!i),
                                    className: 'btn-primary',
                                    children: i ? 'Cancel' : 'Edit',
                                  }),
                                ],
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'space-y-6',
                                children: [
                                  (0, xa.jsxs)('div', {
                                    className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                                    children: [
                                      (0, xa.jsxs)('div', {
                                        children: [
                                          (0, xa.jsx)('label', {
                                            className:
                                              'block text-sm font-medium text-gray-700 mb-2',
                                            children: 'First Name',
                                          }),
                                          i
                                            ? (0, xa.jsx)('input', {
                                                type: 'text',
                                                name: 'first_name',
                                                value: c.first_name,
                                                onChange: d,
                                                className: 'input-field',
                                              })
                                            : (0, xa.jsx)('p', {
                                                className: 'text-gray-900 py-2',
                                                children:
                                                  null === r || void 0 === r
                                                    ? void 0
                                                    : r.first_name,
                                              }),
                                        ],
                                      }),
                                      (0, xa.jsxs)('div', {
                                        children: [
                                          (0, xa.jsx)('label', {
                                            className:
                                              'block text-sm font-medium text-gray-700 mb-2',
                                            children: 'Last Name',
                                          }),
                                          i
                                            ? (0, xa.jsx)('input', {
                                                type: 'text',
                                                name: 'last_name',
                                                value: c.last_name,
                                                onChange: d,
                                                className: 'input-field',
                                              })
                                            : (0, xa.jsx)('p', {
                                                className: 'text-gray-900 py-2',
                                                children:
                                                  null === r || void 0 === r ? void 0 : r.last_name,
                                              }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, xa.jsxs)('div', {
                                    children: [
                                      (0, xa.jsx)('label', {
                                        className: 'block text-sm font-medium text-gray-700 mb-2',
                                        children: 'Email Address',
                                      }),
                                      i
                                        ? (0, xa.jsx)('input', {
                                            type: 'email',
                                            name: 'email',
                                            value: c.email,
                                            onChange: d,
                                            className: 'input-field',
                                          })
                                        : (0, xa.jsx)('p', {
                                            className: 'text-gray-900 py-2',
                                            children: null === r || void 0 === r ? void 0 : r.email,
                                          }),
                                    ],
                                  }),
                                  i &&
                                    (0, xa.jsxs)('div', {
                                      className: 'flex space-x-4',
                                      children: [
                                        (0, xa.jsx)('button', {
                                          onClick: async () => {
                                            try {
                                              (await a(c), l(!1));
                                            } catch (e) {
                                              console.error('Error updating profile:', e);
                                            }
                                          },
                                          className: 'btn-primary',
                                          children: 'Save Changes',
                                        }),
                                        (0, xa.jsx)('button', {
                                          onClick: () => {
                                            (l(!1),
                                              u({
                                                first_name:
                                                  (null === r || void 0 === r
                                                    ? void 0
                                                    : r.first_name) || '',
                                                last_name:
                                                  (null === r || void 0 === r
                                                    ? void 0
                                                    : r.last_name) || '',
                                                email:
                                                  (null === r || void 0 === r ? void 0 : r.email) ||
                                                  '',
                                              }));
                                          },
                                          className: 'btn-outline',
                                          children: 'Cancel',
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                        'orders' === s &&
                          (0, xa.jsxs)('div', {
                            children: [
                              (0, xa.jsx)('h3', {
                                className: 'text-xl font-semibold text-gray-900 mb-6',
                                children: 'Order History',
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'text-center py-12',
                                children: [
                                  (0, xa.jsx)(ki, { className: 'mx-auto h-12 w-12 text-gray-400' }),
                                  (0, xa.jsx)('h3', {
                                    className: 'mt-2 text-sm font-medium text-gray-900',
                                    children: 'No orders yet',
                                  }),
                                  (0, xa.jsx)('p', {
                                    className: 'mt-1 text-sm text-gray-500',
                                    children: "When you place orders, they'll appear here.",
                                  }),
                                  (0, xa.jsx)('div', {
                                    className: 'mt-6',
                                    children: (0, xa.jsx)('a', {
                                      href: '/products',
                                      className:
                                        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700',
                                      children: 'Start Shopping',
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        'wishlist' === s &&
                          (0, xa.jsxs)('div', {
                            children: [
                              (0, xa.jsx)('h3', {
                                className: 'text-xl font-semibold text-gray-900 mb-6',
                                children: 'Wishlist',
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'text-center py-12',
                                children: [
                                  (0, xa.jsx)(Fa, { className: 'mx-auto h-12 w-12 text-gray-400' }),
                                  (0, xa.jsx)('h3', {
                                    className: 'mt-2 text-sm font-medium text-gray-900',
                                    children: 'No items in wishlist',
                                  }),
                                  (0, xa.jsx)('p', {
                                    className: 'mt-1 text-sm text-gray-500',
                                    children:
                                      'Save items you love for later by adding them to your wishlist.',
                                  }),
                                  (0, xa.jsx)('div', {
                                    className: 'mt-6',
                                    children: (0, xa.jsx)('a', {
                                      href: '/products',
                                      className:
                                        'inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700',
                                      children: 'Browse Products',
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        'settings' === s &&
                          (0, xa.jsxs)('div', {
                            children: [
                              (0, xa.jsx)('h3', {
                                className: 'text-xl font-semibold text-gray-900 mb-6',
                                children: 'Account Settings',
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'space-y-6',
                                children: [
                                  (0, xa.jsxs)('div', {
                                    className: 'border-b border-gray-200 pb-6',
                                    children: [
                                      (0, xa.jsx)('h4', {
                                        className: 'text-lg font-medium text-gray-900 mb-4',
                                        children: 'Notifications',
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'space-y-4',
                                        children: [
                                          (0, xa.jsxs)('div', {
                                            className: 'flex items-center justify-between',
                                            children: [
                                              (0, xa.jsxs)('div', {
                                                children: [
                                                  (0, xa.jsx)('p', {
                                                    className: 'text-sm font-medium text-gray-900',
                                                    children: 'Email Notifications',
                                                  }),
                                                  (0, xa.jsx)('p', {
                                                    className: 'text-sm text-gray-500',
                                                    children:
                                                      'Get notified about new products and offers',
                                                  }),
                                                ],
                                              }),
                                              (0, xa.jsxs)('label', {
                                                className:
                                                  'relative inline-flex items-center cursor-pointer',
                                                children: [
                                                  (0, xa.jsx)('input', {
                                                    type: 'checkbox',
                                                    className: 'sr-only peer',
                                                    defaultChecked: !0,
                                                  }),
                                                  (0, xa.jsx)('div', {
                                                    className:
                                                      "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, xa.jsxs)('div', {
                                            className: 'flex items-center justify-between',
                                            children: [
                                              (0, xa.jsxs)('div', {
                                                children: [
                                                  (0, xa.jsx)('p', {
                                                    className: 'text-sm font-medium text-gray-900',
                                                    children: 'Order Updates',
                                                  }),
                                                  (0, xa.jsx)('p', {
                                                    className: 'text-sm text-gray-500',
                                                    children: 'Get updates about your orders',
                                                  }),
                                                ],
                                              }),
                                              (0, xa.jsxs)('label', {
                                                className:
                                                  'relative inline-flex items-center cursor-pointer',
                                                children: [
                                                  (0, xa.jsx)('input', {
                                                    type: 'checkbox',
                                                    className: 'sr-only peer',
                                                    defaultChecked: !0,
                                                  }),
                                                  (0, xa.jsx)('div', {
                                                    className:
                                                      "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600",
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, xa.jsxs)('div', {
                                    className: 'border-b border-gray-200 pb-6',
                                    children: [
                                      (0, xa.jsx)('h4', {
                                        className: 'text-lg font-medium text-gray-900 mb-4',
                                        children: 'Security',
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'space-y-4',
                                        children: [
                                          (0, xa.jsx)('button', {
                                            className: 'btn-outline',
                                            children: 'Change Password',
                                          }),
                                          (0, xa.jsx)('button', {
                                            className: 'btn-outline',
                                            children: 'Two-Factor Authentication',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, xa.jsxs)('div', {
                                    children: [
                                      (0, xa.jsx)('h4', {
                                        className: 'text-lg font-medium text-gray-900 mb-4',
                                        children: 'Account',
                                      }),
                                      (0, xa.jsx)('div', {
                                        className: 'space-y-4',
                                        children: (0, xa.jsx)('button', {
                                          className: 'text-red-600 hover:text-red-800 font-medium',
                                          children: 'Delete Account',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          });
        };
      function yl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
          })
        );
      }
      const vl = n.forwardRef(yl);
      function bl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
          })
        );
      }
      const wl = n.forwardRef(bl);
      function jl(e, t) {
        let { title: r, titleId: a, ...s } = e;
        return n.createElement(
          'svg',
          Object.assign(
            {
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'none',
              viewBox: '0 0 24 24',
              strokeWidth: 1.5,
              stroke: 'currentColor',
              'aria-hidden': 'true',
              'data-slot': 'icon',
              ref: t,
              'aria-labelledby': a,
            },
            s
          ),
          r ? n.createElement('title', { id: a }, r) : null,
          n.createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125',
          })
        );
      }
      const kl = n.forwardRef(jl),
        Nl = () => {
          const [e, t] = (0, n.useState)('dashboard'),
            [r, a] = (0, n.useState)([]),
            [s, o] = (0, n.useState)([]),
            [i, l] = (0, n.useState)(!1);
          (0, n.useEffect)(() => {
            'products' === e ? c() : 'blog' === e && u();
          }, [e]);
          const c = async () => {
              try {
                l(!0);
                const e = await ea({ limit: 100 });
                (a(e.data.products), l(!1));
              } catch (e) {
                (console.error('Error fetching products:', e), l(!1));
              }
            },
            u = async () => {
              try {
                l(!0);
                const e = await oa({ limit: 100 });
                (o(e.data.posts), l(!1));
              } catch (e) {
                (console.error('Error fetching blog posts:', e), l(!1));
              }
            },
            d = [
              { id: 'dashboard', name: 'Dashboard', icon: vl },
              { id: 'products', name: 'Products', icon: ki },
              { id: 'users', name: 'Users', icon: Ua },
              { id: 'blog', name: 'Blog', icon: wl },
            ],
            m = [
              { name: 'Total Products', value: r.length, icon: ki, color: 'blue' },
              { name: 'Total Users', value: '1,234', icon: Ua, color: 'green' },
              { name: 'Total Orders', value: '567', icon: vl, color: 'yellow' },
              { name: 'Blog Posts', value: s.length, icon: wl, color: 'purple' },
            ];
          return (0, xa.jsx)('div', {
            className: 'min-h-screen bg-gray-50',
            children: (0, xa.jsxs)('div', {
              className: 'container-max px-4 sm:px-6 lg:px-8 py-8',
              children: [
                (0, xa.jsxs)('div', {
                  className: 'mb-8',
                  children: [
                    (0, xa.jsx)('h1', {
                      className: 'text-3xl font-bold text-gray-900 font-heading',
                      children: 'Admin Dashboard',
                    }),
                    (0, xa.jsx)('p', {
                      className: 'text-gray-600 mt-2',
                      children: 'Manage your FitGear store',
                    }),
                  ],
                }),
                (0, xa.jsxs)('div', {
                  className: 'grid grid-cols-1 lg:grid-cols-5 gap-8',
                  children: [
                    (0, xa.jsx)('div', {
                      className: 'lg:col-span-1',
                      children: (0, xa.jsx)('div', {
                        className: 'bg-white rounded-lg shadow-md p-6',
                        children: (0, xa.jsx)('nav', {
                          className: 'space-y-2',
                          children: d.map((r) =>
                            (0, xa.jsxs)(
                              'button',
                              {
                                onClick: () => t(r.id),
                                className:
                                  'w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors duration-200 ' +
                                  (e === r.id
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-100'),
                                children: [
                                  (0, xa.jsx)(r.icon, { className: 'h-5 w-5' }),
                                  (0, xa.jsx)('span', { children: r.name }),
                                ],
                              },
                              r.id
                            )
                          ),
                        }),
                      }),
                    }),
                    (0, xa.jsxs)('div', {
                      className: 'lg:col-span-4',
                      children: [
                        'dashboard' === e &&
                          (0, xa.jsxs)('div', {
                            children: [
                              (0, xa.jsx)('div', {
                                className:
                                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8',
                                children: m.map((e) =>
                                  (0, xa.jsx)(
                                    'div',
                                    {
                                      className: 'bg-white rounded-lg shadow-md p-6',
                                      children: (0, xa.jsxs)('div', {
                                        className: 'flex items-center',
                                        children: [
                                          (0, xa.jsx)('div', {
                                            className: `p-3 rounded-md bg-${e.color}-100`,
                                            children: (0, xa.jsx)(e.icon, {
                                              className: `h-6 w-6 text-${e.color}-600`,
                                            }),
                                          }),
                                          (0, xa.jsxs)('div', {
                                            className: 'ml-4',
                                            children: [
                                              (0, xa.jsx)('p', {
                                                className: 'text-sm font-medium text-gray-600',
                                                children: e.name,
                                              }),
                                              (0, xa.jsx)('p', {
                                                className: 'text-2xl font-semibold text-gray-900',
                                                children: e.value,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    },
                                    e.name
                                  )
                                ),
                              }),
                              (0, xa.jsxs)('div', {
                                className: 'bg-white rounded-lg shadow-md p-6',
                                children: [
                                  (0, xa.jsx)('h3', {
                                    className: 'text-lg font-semibold text-gray-900 mb-4',
                                    children: 'Recent Activity',
                                  }),
                                  (0, xa.jsxs)('div', {
                                    className: 'space-y-4',
                                    children: [
                                      (0, xa.jsxs)('div', {
                                        className: 'flex items-center space-x-3',
                                        children: [
                                          (0, xa.jsx)('div', {
                                            className: 'w-2 h-2 bg-green-500 rounded-full',
                                          }),
                                          (0, xa.jsx)('p', {
                                            className: 'text-sm text-gray-600',
                                            children: 'New product "Olympic Barbell" added',
                                          }),
                                          (0, xa.jsx)('span', {
                                            className: 'text-xs text-gray-400',
                                            children: '2 hours ago',
                                          }),
                                        ],
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'flex items-center space-x-3',
                                        children: [
                                          (0, xa.jsx)('div', {
                                            className: 'w-2 h-2 bg-blue-500 rounded-full',
                                          }),
                                          (0, xa.jsx)('p', {
                                            className: 'text-sm text-gray-600',
                                            children: 'New user registered',
                                          }),
                                          (0, xa.jsx)('span', {
                                            className: 'text-xs text-gray-400',
                                            children: '4 hours ago',
                                          }),
                                        ],
                                      }),
                                      (0, xa.jsxs)('div', {
                                        className: 'flex items-center space-x-3',
                                        children: [
                                          (0, xa.jsx)('div', {
                                            className: 'w-2 h-2 bg-yellow-500 rounded-full',
                                          }),
                                          (0, xa.jsx)('p', {
                                            className: 'text-sm text-gray-600',
                                            children: 'Order #1234 completed',
                                          }),
                                          (0, xa.jsx)('span', {
                                            className: 'text-xs text-gray-400',
                                            children: '6 hours ago',
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        'products' === e &&
                          (0, xa.jsx)('div', {
                            children: (0, xa.jsxs)('div', {
                              className: 'bg-white rounded-lg shadow-md',
                              children: [
                                (0, xa.jsxs)('div', {
                                  className:
                                    'px-6 py-4 border-b border-gray-200 flex justify-between items-center',
                                  children: [
                                    (0, xa.jsx)('h3', {
                                      className: 'text-lg font-semibold text-gray-900',
                                      children: 'Products',
                                    }),
                                    (0, xa.jsxs)('button', {
                                      className: 'btn-primary flex items-center',
                                      children: [
                                        (0, xa.jsx)(Ci, { className: 'h-4 w-4 mr-2' }),
                                        'Add Product',
                                      ],
                                    }),
                                  ],
                                }),
                                (0, xa.jsx)('div', {
                                  className: 'overflow-x-auto',
                                  children: (0, xa.jsxs)('table', {
                                    className: 'data-table',
                                    children: [
                                      (0, xa.jsx)('thead', {
                                        children: (0, xa.jsxs)('tr', {
                                          children: [
                                            (0, xa.jsx)('th', { children: 'Product' }),
                                            (0, xa.jsx)('th', { children: 'Category' }),
                                            (0, xa.jsx)('th', { children: 'Price' }),
                                            (0, xa.jsx)('th', { children: 'Inventory' }),
                                            (0, xa.jsx)('th', { children: 'Status' }),
                                            (0, xa.jsx)('th', { children: 'Actions' }),
                                          ],
                                        }),
                                      }),
                                      (0, xa.jsx)('tbody', {
                                        children: r.map((e) =>
                                          (0, xa.jsxs)(
                                            'tr',
                                            {
                                              children: [
                                                (0, xa.jsx)('td', {
                                                  children: (0, xa.jsxs)('div', {
                                                    className: 'flex items-center space-x-3',
                                                    children: [
                                                      (0, xa.jsx)('img', {
                                                        src:
                                                          e.images[0] ||
                                                          'https://via.placeholder.com/50x50',
                                                        alt: e.name,
                                                        className:
                                                          'w-10 h-10 rounded-md object-cover',
                                                      }),
                                                      (0, xa.jsxs)('div', {
                                                        children: [
                                                          (0, xa.jsx)('p', {
                                                            className: 'font-medium text-gray-900',
                                                            children: e.name,
                                                          }),
                                                          (0, xa.jsx)('p', {
                                                            className: 'text-sm text-gray-500',
                                                            children: e.brand,
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                }),
                                                (0, xa.jsx)('td', { children: e.category }),
                                                (0, xa.jsxs)('td', { children: ['$', e.price] }),
                                                (0, xa.jsx)('td', { children: e.inventory }),
                                                (0, xa.jsx)('td', {
                                                  children: (0, xa.jsx)('span', {
                                                    className:
                                                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' +
                                                      (e.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'),
                                                    children: e.is_active ? 'Active' : 'Inactive',
                                                  }),
                                                }),
                                                (0, xa.jsx)('td', {
                                                  children: (0, xa.jsxs)('div', {
                                                    className: 'flex space-x-2',
                                                    children: [
                                                      (0, xa.jsx)('button', {
                                                        className:
                                                          'text-blue-600 hover:text-blue-800',
                                                        children: (0, xa.jsx)(kl, {
                                                          className: 'h-4 w-4',
                                                        }),
                                                      }),
                                                      (0, xa.jsx)('button', {
                                                        className:
                                                          'text-red-600 hover:text-red-800',
                                                        children: (0, xa.jsx)(_i, {
                                                          className: 'h-4 w-4',
                                                        }),
                                                      }),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            },
                                            e.id
                                          )
                                        ),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                        'users' === e &&
                          (0, xa.jsx)('div', {
                            children: (0, xa.jsxs)('div', {
                              className: 'bg-white rounded-lg shadow-md p-6',
                              children: [
                                (0, xa.jsx)('h3', {
                                  className: 'text-lg font-semibold text-gray-900 mb-4',
                                  children: 'Users',
                                }),
                                (0, xa.jsxs)('div', {
                                  className: 'text-center py-12',
                                  children: [
                                    (0, xa.jsx)(Ua, {
                                      className: 'mx-auto h-12 w-12 text-gray-400',
                                    }),
                                    (0, xa.jsx)('h3', {
                                      className: 'mt-2 text-sm font-medium text-gray-900',
                                      children: 'User management',
                                    }),
                                    (0, xa.jsx)('p', {
                                      className: 'mt-1 text-sm text-gray-500',
                                      children: 'User management features coming soon.',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        'blog' === e &&
                          (0, xa.jsx)('div', {
                            children: (0, xa.jsxs)('div', {
                              className: 'bg-white rounded-lg shadow-md',
                              children: [
                                (0, xa.jsxs)('div', {
                                  className:
                                    'px-6 py-4 border-b border-gray-200 flex justify-between items-center',
                                  children: [
                                    (0, xa.jsx)('h3', {
                                      className: 'text-lg font-semibold text-gray-900',
                                      children: 'Blog Posts',
                                    }),
                                    (0, xa.jsxs)('button', {
                                      className: 'btn-primary flex items-center',
                                      children: [
                                        (0, xa.jsx)(Ci, { className: 'h-4 w-4 mr-2' }),
                                        'New Post',
                                      ],
                                    }),
                                  ],
                                }),
                                (0, xa.jsx)('div', {
                                  className: 'overflow-x-auto',
                                  children: (0, xa.jsxs)('table', {
                                    className: 'data-table',
                                    children: [
                                      (0, xa.jsx)('thead', {
                                        children: (0, xa.jsxs)('tr', {
                                          children: [
                                            (0, xa.jsx)('th', { children: 'Title' }),
                                            (0, xa.jsx)('th', { children: 'Category' }),
                                            (0, xa.jsx)('th', { children: 'Author' }),
                                            (0, xa.jsx)('th', { children: 'Created' }),
                                            (0, xa.jsx)('th', { children: 'Status' }),
                                            (0, xa.jsx)('th', { children: 'Actions' }),
                                          ],
                                        }),
                                      }),
                                      (0, xa.jsx)('tbody', {
                                        children: s.map((e) =>
                                          (0, xa.jsxs)(
                                            'tr',
                                            {
                                              children: [
                                                (0, xa.jsx)('td', {
                                                  children: (0, xa.jsx)('p', {
                                                    className: 'font-medium text-gray-900',
                                                    children: e.title,
                                                  }),
                                                }),
                                                (0, xa.jsx)('td', { children: e.category }),
                                                (0, xa.jsx)('td', { children: e.author }),
                                                (0, xa.jsx)('td', {
                                                  children: new Date(
                                                    e.created_at
                                                  ).toLocaleDateString(),
                                                }),
                                                (0, xa.jsx)('td', {
                                                  children: (0, xa.jsx)('span', {
                                                    className:
                                                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full ' +
                                                      (e.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'),
                                                    children: e.is_published
                                                      ? 'Published'
                                                      : 'Draft',
                                                  }),
                                                }),
                                                (0, xa.jsx)('td', {
                                                  children: (0, xa.jsxs)('div', {
                                                    className: 'flex space-x-2',
                                                    children: [
                                                      (0, xa.jsx)('button', {
                                                        className:
                                                          'text-blue-600 hover:text-blue-800',
                                                        children: (0, xa.jsx)(kl, {
                                                          className: 'h-4 w-4',
                                                        }),
                                                      }),
                                                      (0, xa.jsx)('button', {
                                                        className:
                                                          'text-red-600 hover:text-red-800',
                                                        children: (0, xa.jsx)(_i, {
                                                          className: 'h-4 w-4',
                                                        }),
                                                      }),
                                                    ],
                                                  }),
                                                }),
                                              ],
                                            },
                                            e.id
                                          )
                                        ),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          });
        },
        Sl = (e) => {
          let { children: t, adminOnly: r = !1 } = e;
          const { isAuthenticated: n, user: a, isLoading: s } = ja(),
            o = X();
          return (
            console.log('ProtectedRoute: Auth state check', {
              isAuthenticated: n,
              isLoading: s,
              userId: null === a || void 0 === a ? void 0 : a.id,
              userEmail: null === a || void 0 === a ? void 0 : a.email,
              path: o.pathname,
            }),
            s
              ? (console.log('ProtectedRoute: Still loading authentication...'),
                (0, xa.jsx)('div', {
                  className: 'min-h-screen flex items-center justify-center',
                  children: (0, xa.jsx)('div', { className: 'loading-spinner' }),
                }))
              : n
                ? !r || (null !== a && void 0 !== a && a.is_admin)
                  ? (console.log('ProtectedRoute: Access granted'), t)
                  : (console.log('ProtectedRoute: User not admin, redirecting to home'),
                    (0, xa.jsx)(xe, { to: '/', replace: !0 }))
                : (console.log('ProtectedRoute: User not authenticated, redirecting to login'),
                  (0, xa.jsx)(xe, { to: '/login', state: { from: o }, replace: !0 }))
          );
        },
        El = () =>
          (0, xa.jsx)('div', {
            className: 'container-max py-12 px-4 sm:px-6 lg:px-8',
            children: (0, xa.jsxs)('div', {
              className: 'bg-white shadow-md rounded-lg p-8',
              children: [
                (0, xa.jsx)('h1', {
                  className: 'text-3xl font-bold text-gray-900 mb-6',
                  children: 'Privacy Policy',
                }),
                (0, xa.jsxs)('div', {
                  className: 'prose max-w-none',
                  children: [
                    (0, xa.jsx)('p', { children: 'Last updated: July 11, 2025' }),
                    (0, xa.jsx)('p', {
                      children:
                        'FitGear ("us", "we", or "our") operates the FitGear website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Information Collection and Use',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'We collect several different types of information for various purposes to provide and improve our Service to you.',
                    }),
                    (0, xa.jsx)('h3', {
                      className: 'text-xl font-bold mt-6 mb-2',
                      children: 'Types of Data Collected',
                    }),
                    (0, xa.jsx)('h4', { children: 'Personal Data' }),
                    (0, xa.jsx)('p', {
                      children:
                        'While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
                    }),
                    (0, xa.jsxs)('ul', {
                      children: [
                        (0, xa.jsx)('li', { children: 'Email address' }),
                        (0, xa.jsx)('li', { children: 'First name and last name' }),
                        (0, xa.jsx)('li', { children: 'Phone number' }),
                        (0, xa.jsx)('li', {
                          children: 'Address, State, Province, ZIP/Postal code, City',
                        }),
                        (0, xa.jsx)('li', { children: 'Cookies and Usage Data' }),
                      ],
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Use of Data',
                    }),
                    (0, xa.jsx)('p', {
                      children: 'FitGear uses the collected data for various purposes:',
                    }),
                    (0, xa.jsxs)('ul', {
                      children: [
                        (0, xa.jsx)('li', { children: 'To provide and maintain the Service' }),
                        (0, xa.jsx)('li', {
                          children: 'To notify you about changes to our Service',
                        }),
                        (0, xa.jsx)('li', {
                          children:
                            'To allow you to participate in interactive features of our Service when you choose to do so',
                        }),
                        (0, xa.jsx)('li', { children: 'To provide customer care and support' }),
                        (0, xa.jsx)('li', {
                          children:
                            'To provide analysis or valuable information so that we can improve the Service',
                        }),
                        (0, xa.jsx)('li', { children: 'To monitor the usage of the Service' }),
                        (0, xa.jsx)('li', {
                          children: 'To detect, prevent and address technical issues',
                        }),
                      ],
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Contact Us',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'If you have any questions about this Privacy Policy, please contact us by email: support@fitgear.com',
                    }),
                  ],
                }),
              ],
            }),
          }),
        Cl = () =>
          (0, xa.jsx)('div', {
            className: 'container-max py-12 px-4 sm:px-6 lg:px-8',
            children: (0, xa.jsxs)('div', {
              className: 'bg-white shadow-md rounded-lg p-8',
              children: [
                (0, xa.jsx)('h1', {
                  className: 'text-3xl font-bold text-gray-900 mb-6',
                  children: 'Terms of Service',
                }),
                (0, xa.jsxs)('div', {
                  className: 'prose max-w-none',
                  children: [
                    (0, xa.jsx)('p', { children: 'Last updated: July 11, 2025' }),
                    (0, xa.jsx)('p', {
                      children:
                        'Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the FitGear website (the "Service") operated by FitGear ("us", "we", or "our").',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Accounts',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Intellectual Property',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'The Service and its original content, features, and functionality are and will remain the exclusive property of FitGear and its licensors.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Links To Other Web Sites',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'Our Service may contain links to third-party web sites or services that are not owned or controlled by FitGear. FitGear has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Termination',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Contact Us',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'If you have any questions about these Terms, please contact us by email: support@fitgear.com',
                    }),
                  ],
                }),
              ],
            }),
          }),
        Pl = () =>
          (0, xa.jsx)('div', {
            className: 'container-max py-12 px-4 sm:px-6 lg:px-8',
            children: (0, xa.jsxs)('div', {
              className: 'bg-white shadow-md rounded-lg p-8',
              children: [
                (0, xa.jsx)('h1', {
                  className: 'text-3xl font-bold text-gray-900 mb-6',
                  children: 'Cookie Policy',
                }),
                (0, xa.jsxs)('div', {
                  className: 'prose max-w-none',
                  children: [
                    (0, xa.jsx)('p', { children: 'Last updated: July 11, 2025' }),
                    (0, xa.jsx)('p', {
                      children:
                        'FitGear ("us", "we", or "our") uses cookies on the FitGear website (the "Service"). By using the Service, you consent to the use of cookies.',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'Our Cookie Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'What are cookies',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'How FitGear uses cookies',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, to store your preferences.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'What are your choices regarding cookies',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        "If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.",
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Contact Us',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'If you have any questions about this Cookie Policy, please contact us by email: support@fitgear.com',
                    }),
                  ],
                }),
              ],
            }),
          }),
        _l = () =>
          (0, xa.jsx)('div', {
            className: 'container-max py-12 px-4 sm:px-6 lg:px-8',
            children: (0, xa.jsxs)('div', {
              className: 'bg-white shadow-md rounded-lg p-8',
              children: [
                (0, xa.jsx)('h1', {
                  className: 'text-3xl font-bold text-gray-900 mb-6',
                  children: 'Accessibility Statement',
                }),
                (0, xa.jsxs)('div', {
                  className: 'prose max-w-none',
                  children: [
                    (0, xa.jsx)('p', { children: 'Last updated: July 11, 2025' }),
                    (0, xa.jsx)('p', {
                      children:
                        'FitGear is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Conformance status',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. FitGear is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.',
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Feedback',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'We welcome your feedback on the accessibility of FitGear. Please let us know if you encounter accessibility barriers on FitGear:',
                    }),
                    (0, xa.jsx)('ul', {
                      children: (0, xa.jsx)('li', { children: 'E-mail: support@fitgear.com' }),
                    }),
                    (0, xa.jsx)('h2', {
                      className: 'text-2xl font-bold mt-8 mb-4',
                      children: 'Technical specifications',
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'Accessibility of FitGear relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:',
                    }),
                    (0, xa.jsxs)('ul', {
                      children: [
                        (0, xa.jsx)('li', { children: 'HTML' }),
                        (0, xa.jsx)('li', { children: 'WAI-ARIA' }),
                        (0, xa.jsx)('li', { children: 'CSS' }),
                        (0, xa.jsx)('li', { children: 'JavaScript' }),
                      ],
                    }),
                    (0, xa.jsx)('p', {
                      children:
                        'These technologies are relied upon for conformance with the accessibility standards used.',
                    }),
                  ],
                }),
              ],
            }),
          });
      const Ol = function () {
        return (0, xa.jsx)(wa, {
          children: (0, xa.jsx)(Ea, {
            children: (0, xa.jsx)(Ra, {
              children: (0, xa.jsx)(Ce, {
                children: (0, xa.jsxs)('div', {
                  className: 'App min-h-screen bg-gray-50',
                  children: [
                    (0, xa.jsx)(qa, {}),
                    (0, xa.jsx)('main', {
                      className: 'flex-grow',
                      children: (0, xa.jsxs)(be, {
                        children: [
                          (0, xa.jsx)(ye, { path: '/', element: (0, xa.jsx)(ii, {}) }),
                          (0, xa.jsx)(ye, { path: '/products', element: (0, xa.jsx)(ci, {}) }),
                          (0, xa.jsx)(ye, { path: '/products/:id', element: (0, xa.jsx)(wi, {}) }),
                          (0, xa.jsx)(ye, { path: '/cart', element: (0, xa.jsx)(Oi, {}) }),
                          (0, xa.jsx)(ye, {
                            path: '/checkout',
                            element: (0, xa.jsx)(Sl, { children: (0, xa.jsx)(rl, {}) }),
                          }),
                          (0, xa.jsx)(ye, { path: '/login', element: (0, xa.jsx)(il, {}) }),
                          (0, xa.jsx)(ye, { path: '/register', element: (0, xa.jsx)(ll, {}) }),
                          (0, xa.jsx)(ye, { path: '/blog', element: (0, xa.jsx)(dl, {}) }),
                          (0, xa.jsx)(ye, { path: '/blog/:id', element: (0, xa.jsx)(pl, {}) }),
                          (0, xa.jsx)(ye, {
                            path: '/profile',
                            element: (0, xa.jsx)(Sl, { children: (0, xa.jsx)(xl, {}) }),
                          }),
                          (0, xa.jsx)(ye, {
                            path: '/admin',
                            element: (0, xa.jsx)(Sl, {
                              adminOnly: !0,
                              children: (0, xa.jsx)(Nl, {}),
                            }),
                          }),
                          (0, xa.jsx)(ye, {
                            path: '/privacy-policy',
                            element: (0, xa.jsx)(El, {}),
                          }),
                          (0, xa.jsx)(ye, {
                            path: '/terms-of-service',
                            element: (0, xa.jsx)(Cl, {}),
                          }),
                          (0, xa.jsx)(ye, { path: '/cookie-policy', element: (0, xa.jsx)(Pl, {}) }),
                          (0, xa.jsx)(ye, { path: '/accessibility', element: (0, xa.jsx)(_l, {}) }),
                        ],
                      }),
                    }),
                    (0, xa.jsx)(fs, {}),
                    (0, xa.jsx)(Ot, {
                      position: 'top-right',
                      toastOptions: {
                        duration: 4e3,
                        style: { background: '#363636', color: '#fff' },
                        success: {
                          duration: 3e3,
                          theme: { primary: '#10b981', secondary: '#fff' },
                        },
                        error: { duration: 4e3, theme: { primary: '#ef4444', secondary: '#fff' } },
                      },
                    }),
                  ],
                }),
              }),
            }),
          }),
        });
      };
      s.createRoot(document.getElementById('root')).render(
        (0, xa.jsx)(n.StrictMode, { children: (0, xa.jsx)(Ol, {}) })
      );
    })());
})();
