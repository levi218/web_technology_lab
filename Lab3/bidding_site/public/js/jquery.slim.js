/*!
 * jQuery JavaScript Library v3.4.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
(function (global, factory) {
  "use strict";

  if (typeof module === "object" && typeof module.exports === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }

      return factory(w);
    };
  } else {
    factory(global);
  } // Pass this if window is not defined yet

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  "use strict";

  var arr = [];
  var document = window.document;
  var getProto = Object.getPrototypeOf;
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
  };

  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };

  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };

  function DOMEval(code, node, doc) {
    doc = doc || document;
    var i,
        val,
        script = doc.createElement("script");
    script.text = code;

    if (node) {
      for (i in preservedScriptAttributes) {
        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || node.getAttribute && node.getAttribute(i);

        if (val) {
          script.setAttribute(i, val);
        }
      }
    }

    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  function toType(obj) {
    if (obj == null) {
      return obj + "";
    } // Support: Android <=2.3 only (functionish RegExp)


    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module


  var version = "3.4.1 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector",
      // Define a local copy of jQuery
  jQuery = function (selector, context) {
    // The jQuery object is actually just the init constructor 'enhanced'
    // Need init if jQuery is called (just allow error to be thrown if not included)
    return new jQuery.fn.init(selector, context);
  },
      // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function () {
      return slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
      // Return all the elements in a clean array
      if (num == null) {
        return slice.call(this);
      } // Return just the one element from the set


      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function (elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems); // Add the old object onto the stack (as a reference)

      ret.prevObject = this; // Return the newly-formed element set

      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function (callback) {
      return jQuery.each(this, callback);
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function () {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };

  jQuery.extend = jQuery.fn.extend = function () {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false; // Handle a deep copy situation

    if (typeof target === "boolean") {
      deep = target; // Skip the boolean and the target

      target = arguments[i] || {};
      i++;
    } // Handle case when target is a string or something (possible in deep copy)


    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    } // Extend jQuery itself if only one argument is passed


    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name]; // Prevent Object.prototype pollution
          // Prevent never-ending loop

          if (name === "__proto__" || target === copy) {
            continue;
          } // Recurse if we're merging plain objects or arrays


          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name]; // Ensure proper type for the source value

            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }

            copyIsArray = false; // Never move original objects, clone them

            target[name] = jQuery.extend(deep, clone, copy); // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    } // Return the modified object


    return target;
  };

  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function (msg) {
      throw new Error(msg);
    },
    noop: function () {},
    isPlainObject: function (obj) {
      var proto, Ctor; // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects

      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }

      proto = getProto(obj); // Objects with no prototype (e.g., `Object.create( null )`) are plain

      if (!proto) {
        return true;
      } // Objects with prototype are plain iff they were constructed by a global Object function


      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function (obj) {
      var name;

      for (name in obj) {
        return false;
      }

      return true;
    },
    // Evaluates a script in a global context
    globalEval: function (code, options) {
      DOMEval(code, {
        nonce: options && options.nonce
      });
    },
    each: function (obj, callback) {
      var length,
          i = 0;

      if (isArrayLike(obj)) {
        length = obj.length;

        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }

      return obj;
    },
    // Support: Android <=4.0 only
    trim: function (text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    // results is for internal usage only
    makeArray: function (arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }

      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function (first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;

      for (; j < len; j++) {
        first[i++] = second[j];
      }

      first.length = i;
      return first;
    },
    grep: function (elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert; // Go through the array, only saving the items
      // that pass the validator function

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);

        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }

      return matches;
    },
    // arg is for internal usage only
    map: function (elems, callback, arg) {
      var length,
          value,
          i = 0,
          ret = []; // Go through the array, translating each of the items to their new values

      if (isArrayLike(elems)) {
        length = elems.length;

        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        } // Go through every key on the object,

      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);

          if (value != null) {
            ret.push(value);
          }
        }
      } // Flatten any nested arrays


      return concat.apply([], ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });

  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  } // Populate the class2type map


  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj);

    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }

  var Sizzle =
  /*!
   * Sizzle CSS Selector Engine v2.3.4
   * https://sizzlejs.com/
   *
   * Copyright JS Foundation and other contributors
   * Released under the MIT license
   * https://js.foundation/
   *
   * Date: 2019-04-08
   */
  function (window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        // Local document vars
    setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        // Instance-specific data
    expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        nonnativeSelectorCache = createCache(),
        sortOrder = function (a, b) {
      if (a === b) {
        hasDuplicate = true;
      }

      return 0;
    },
        // Instance methods
    hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        // Use a stripped-down indexOf as it's faster than native
    // https://jsperf.com/thor-indexof-vs-for/5
    indexOf = function (list, elem) {
      var i = 0,
          len = list.length;

      for (; i < len; i++) {
        if (list[i] === elem) {
          return i;
        }
      }

      return -1;
    },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        // Regular expressions
    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",
        // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
    attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
    "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + identifier + ")(?:\\((" + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
    // 1. quoted (capture 3; capture 4 or capture 5)
    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + // 2. simple (capture 6)
    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + // 3. anything else (capture 2)
    ".*" + ")\\)|)",
        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
    rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rdescend = new RegExp(whitespace + "|>"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
      "ID": new RegExp("^#(" + identifier + ")"),
      "CLASS": new RegExp("^\\.(" + identifier + ")"),
      "TAG": new RegExp("^(" + identifier + "|[*])"),
      "ATTR": new RegExp("^" + attributes),
      "PSEUDO": new RegExp("^" + pseudos),
      "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      "bool": new RegExp("^(?:" + booleans + ")$", "i"),
      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
    },
        rhtml = /HTML$/i,
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        // Easily-parseable/retrievable ID or TAG or CLASS selectors
    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        // CSS escapes
    // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
    runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function (_, escaped, escapedWhitespace) {
      var high = "0x" + escaped - 0x10000; // NaN means non-codepoint
      // Support: Firefox<24
      // Workaround erroneous numeric interpretation of +"0x"

      return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
      String.fromCharCode(high + 0x10000) : // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
    },
        // CSS string/identifier serialization
    // https://drafts.csswg.org/cssom/#common-serializing-idioms
    rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function (ch, asCodePoint) {
      if (asCodePoint) {
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if (ch === "\0") {
          return "\uFFFD";
        } // Control characters and (dependent upon position) numbers get escaped as code points


        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
      } // Other potentially-special ASCII characters get backslash-escaped


      return "\\" + ch;
    },
        // Used for iframes
    // See setDocument()
    // Removing the function wrapper causes a "Permission Denied"
    // error in IE
    unloadHandler = function () {
      setDocument();
    },
        inDisabledFieldset = addCombinator(function (elem) {
      return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
    }, {
      dir: "parentNode",
      next: "legend"
    }); // Optimize for push.apply( _, NodeList )


    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes); // Support: Android<4.0
      // Detect silently failing push.apply

      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? // Leverage slice if possible
        function (target, els) {
          push_native.apply(target, slice.call(els));
        } : // Support: IE<9
        // Otherwise append directly
        function (target, els) {
          var j = target.length,
              i = 0; // Can't trust NodeList.length

          while (target[j++] = els[i++]) {}

          target.length = j - 1;
        }
      };
    }

    function Sizzle(selector, context, results, seed) {
      var m,
          i,
          elem,
          nid,
          match,
          groups,
          newSelector,
          newContext = context && context.ownerDocument,
          // nodeType defaults to 9, since context defaults to document
      nodeType = context ? context.nodeType : 9;
      results = results || []; // Return early from calls with invalid selector or context

      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      } // Try to shortcut find operations (as opposed to filters) in HTML documents


      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }

        context = context || document;

        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                } // Element context

              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } // Type selector

            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results; // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          } // Take advantage of querySelectorAll


          if (support.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && ( // Support: IE 8 only
          // Exclude object elements
          nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
            newSelector = selector;
            newContext = context; // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // Thanks to Andrew Dupont for this technique.

            if (nodeType === 1 && rdescend.test(selector)) {
              // Capture the context ID, setting it first if necessary
              if (nid = context.getAttribute("id")) {
                nid = nid.replace(rcssescape, fcssescape);
              } else {
                context.setAttribute("id", nid = expando);
              } // Prefix every selector in the list


              groups = tokenize(selector);
              i = groups.length;

              while (i--) {
                groups[i] = "#" + nid + " " + toSelector(groups[i]);
              }

              newSelector = groups.join(","); // Expand context for sibling selectors

              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }

            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      } // All others


      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */


    function createCache() {
      var keys = [];

      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }

        return cache[key + " "] = value;
      }

      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */


    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */


    function assert(fn) {
      var el = document.createElement("fieldset");

      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } // release memory in IE


        el = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */


    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = arr.length;

      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */


    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex; // Use IE sourceIndex if available on both nodes

      if (diff) {
        return diff;
      } // Check if b follows a


      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }

      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */


    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */


    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */


    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ("form" in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            } // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors


            return elem.isDisabled === disabled || // Where there is no isDisabled, check manually

            /* jshint -W018 */
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }

          return elem.disabled === disabled; // Try to winnow out elements that can't be disabled before trusting the disabled property.
          // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
          // even exist on them, let alone have a boolean value.
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        } // Remaining elements are neither :enabled nor :disabled


        return false;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */


    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length; // Match elements found at the specified indexes

          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */


    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    } // Expose support vars for convenience


    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */

    isXML = Sizzle.isXML = function (elem) {
      var namespace = elem.namespaceURI,
          docElem = (elem.ownerDocument || elem).documentElement; // Support: IE <=8
      // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
      // https://bugs.jquery.com/ticket/4833

      return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */


    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare,
          subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc; // Return early if doc is invalid or already selected

      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      } // Update global variables


      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document); // Support: IE 9-11, Edge
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)

      if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 11, Edge
        if (subWindow.addEventListener) {
          subWindow.addEventListener("unload", unloadHandler, false); // Support: IE 9 - 10 only
        } else if (subWindow.attachEvent) {
          subWindow.attachEvent("onunload", unloadHandler);
        }
      }
      /* Attributes
      ---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)


      support.attributes = assert(function (el) {
        el.className = "i";
        return !el.getAttribute("className");
      });
      /* getElement(s)By*
      ---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements

      support.getElementsByTagName = assert(function (el) {
        el.appendChild(document.createComment(""));
        return !el.getElementsByTagName("*").length;
      }); // Support: IE<9

      support.getElementsByClassName = rnative.test(document.getElementsByClassName); // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test

      support.getById = assert(function (el) {
        docElem.appendChild(el).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      }); // ID filter and find

      if (support.getById) {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId;
          };
        };

        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter["ID"] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        }; // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut


        Expr.find["ID"] = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node,
                i,
                elems,
                elem = context.getElementById(id);

            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode("id");

              if (node && node.value === id) {
                return [elem];
              } // Fall back on getElementsByName


              elems = context.getElementsByName(id);
              i = 0;

              while (elem = elems[i++]) {
                node = elem.getAttributeNode("id");

                if (node && node.value === id) {
                  return [elem];
                }
              }
            }

            return [];
          }
        };
      } // Tag


      Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem,
            tmp = [],
            i = 0,
            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
        results = context.getElementsByTagName(tag); // Filter out possible comments

        if (tag === "*") {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }

          return tmp;
        }

        return results;
      }; // Class

      Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)


      rbuggyMatches = []; // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See https://bugs.jquery.com/ticket/13378

      rbuggyQSA = [];

      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (el) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // https://bugs.jquery.com/ticket/12359
          docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

          if (el.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          } // Support: IE8
          // Boolean attributes and "value" are not treated correctly


          if (!el.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          } // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+


          if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          } // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests


          if (!el.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          } // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibling-combinator selector` fails


          if (!el.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function (el) {
          el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>"; // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment

          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          el.appendChild(input).setAttribute("name", "D"); // Support: IE8
          // Enforce case-sensitivity of name attribute

          if (el.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          } // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests


          if (el.querySelectorAll(":enabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Support: IE9-11+
          // IE's :disabled selector does not pick up the children of disabled fieldsets


          docElem.appendChild(el).disabled = true;

          if (el.querySelectorAll(":disabled").length !== 2) {
            rbuggyQSA.push(":enabled", ":disabled");
          } // Opera 10-11 does not throw on post-comma invalid pseudos


          el.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (el) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(el, "*"); // This should fail with an exception
          // Gecko does not error, returns false instead

          matches.call(el, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      /* Contains
      ---------------------------------------------------------------------- */

      hasCompare = rnative.test(docElem.compareDocumentPosition); // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself

      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }

        return false;
      };
      /* Sorting
      ---------------------------------------------------------------------- */
      // Document order sorting

      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } // Sort on method existence if only one input has compareDocumentPosition


        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;

        if (compare) {
          return compare;
        } // Calculate position if both inputs belong to the same document


        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1; // Disconnected nodes

        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }

          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          } // Maintain original order


          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }

        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b]; // Parentless nodes are either documents or disconnected

        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0; // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        } // Otherwise we need full lists of their ancestors for comparison


        cur = a;

        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }

        cur = b;

        while (cur = cur.parentNode) {
          bp.unshift(cur);
        } // Walk down the tree looking for a discrepancy


        while (ap[i] === bp[i]) {
          i++;
        }

        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };

    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };

    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }

      if (support.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr); // IE 9's matchesSelector returns false on disconnected nodes

          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }

      return Sizzle(expr, document, null, [elem]).length > 0;
    };

    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }

      return contains(context, elem);
    };

    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }

      var fn = Expr.attrHandle[name.toLowerCase()],
          // Don't get fooled by Object.prototype properties (jQuery #13807)
      val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };

    Sizzle.escape = function (sel) {
      return (sel + "").replace(rcssescape, fcssescape);
    };

    Sizzle.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */


    Sizzle.uniqueSort = function (results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0; // Unless we *know* we can detect duplicates, assume their presence

      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);

      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }

        while (j--) {
          results.splice(duplicates[j], 1);
        }
      } // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225


      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */


    getText = Sizzle.getText = function (elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      } // Do not include comment or processing instruction nodes


      return ret;
    };

    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        "ATTR": function (match) {
          match[1] = match[1].replace(runescape, funescape); // Move the given value to match[3] whether quoted or unquoted

          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }

          return match.slice(0, 4);
        },
        "CHILD": function (match) {
          /* matches from matchExpr["CHILD"]
          	1 type (only|nth|...)
          	2 what (child|of-type)
          	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          	4 xn-component of xn+y argument ([+-]?\d*n|)
          	5 sign of xn-component
          	6 x of xn-component
          	7 sign of y-component
          	8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            } // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1


            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd"); // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }

          return match;
        },
        "PSEUDO": function (match) {
          var excess,
              unquoted = !match[6] && match[2];

          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          } // Accept quoted arguments as-is


          if (match[3]) {
            match[2] = match[4] || match[5] || ""; // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && ( // Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && ( // advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          } // Return only captures needed by the pseudo filter method (type and argument)


          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function (className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);

            if (result == null) {
              return operator === "!=";
            }

            if (!operator) {
              return true;
            }

            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache,
                uniqueCache,
                outerCache,
                node,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType,
                diff = false;

            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;

                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  } // Reverse direction for :only-* (if we haven't yet done so)


                  start = dir = type === "only" && !start && "nextSibling";
                }

                return true;
              }

              start = [forward ? parent.firstChild : parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`

              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)

                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];

                while (node = ++nodeIndex && node && node[dir] || ( // Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)

                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                } // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)


                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {}); // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)

                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [dirruns, diff];
                      }

                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              } // Incorporate the offset, then check against cycle size


              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        "PSEUDO": function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does

          if (fn[expando]) {
            return fn(argument);
          } // But maintain support for old signatures


          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;

              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }

          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length; // Match elements unmatched by `matcher`

            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results); // Don't keep the element (issue #299)

            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }

          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;

            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);

            return false;
          };
        }),
        // Miscellaneous
        "target": function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function (elem) {
          return elem === docElem;
        },
        "focus": function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        "enabled": createDisabledPseudo(false),
        "disabled": createDisabledPseudo(true),
        "checked": function (elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
        },
        "selected": function (elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },
        // Contents
        "empty": function (elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }

          return true;
        },
        "parent": function (elem) {
          return !Expr.pseudos["empty"](elem);
        },
        // Element/input types
        "header": function (elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function (elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ( // Support: IE<8
          // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
          (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        "first": createPositionalPseudo(function () {
          return [0];
        }),
        "last": createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;

          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument > length ? length : argument;

          for (; --i >= 0;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;

          for (; ++i < length;) {
            matchIndexes.push(i);
          }

          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"]; // Add button/input type pseudos

    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }

    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    } // Easy API for creating new setFilters


    function setFilters() {}

    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();

    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];

      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }

          groups.push(tokens = []);
        }

        matched = false; // Combinators

        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        } // Filters


        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }

        if (!matched) {
          break;
        }
      } // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens


      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };

    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";

      for (; i < len; i++) {
        selector += tokens[i].value;
      }

      return selector;
    }

    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === "parentNode",
          doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }

        return false;
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache,
            uniqueCache,
            outerCache,
            newCache = [dirruns, doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching

        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {}); // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)

              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

              if (skip && skip === elem.nodeName.toLowerCase()) {
                elem = elem[dir] || elem;
              } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[key] = newCache; // A match means we're done; a fail means we have to keep checking

                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      };
    }

    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;

        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }

        return true;
      } : matchers[0];
    }

    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;

      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }

      return results;
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;

      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);

            if (mapped) {
              map.push(i);
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }

      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }

      return markFunction(function (seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            // Get initial elements from seed or context
        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            // Prefilter to get matcher input, preserving a map for seed-results synchronization
        matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
        [] : // ...otherwise use results directly
        results : matcherIn; // Find primary matches

        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        } // Apply postFilter


        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml); // Un-match failing elements by moving them back to matcherIn

          i = temp.length;

          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }

        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;

              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }

              postFinder(null, matcherOut = [], temp, xml);
            } // Move matched elements from seed to results to keep them synchronized


            i = matcherOut.length;

            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          } // Add elements to results, through postFinder if defined

        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);

          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }

    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          // The foundational matcher ensures that elements are reachable from top-level context(s)
      matchContext = addCombinator(function (elem) {
        return elem === checkContext;
      }, implicitRelative, true),
          matchAnyContext = addCombinator(function (elem) {
        return indexOf(checkContext, elem) > -1;
      }, implicitRelative, true),
          matchers = [function (elem, context, xml) {
        var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml)); // Avoid hanging onto element (issue #299)

        checkContext = null;
        return ret;
      }];

      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches); // Return special upon seeing a positional matcher

          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;

            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }

            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }

          matchers.push(matcher);
        }
      }

      return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function (seed, context, xml, results, outermost) {
        var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
        elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
            len = elems.length;

        if (outermost) {
          outermostContext = context === document || context || outermost;
        } // Add elements passing elementMatchers directly to results
        // Support: IE<9, Safari
        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id


        for (; i !== len && (elem = elems[i]) != null; i++) {
          if (byElement && elem) {
            j = 0;

            if (!context && elem.ownerDocument !== document) {
              setDocument(elem);
              xml = !documentIsHTML;
            }

            while (matcher = elementMatchers[j++]) {
              if (matcher(elem, context || document, xml)) {
                results.push(elem);
                break;
              }
            }

            if (outermost) {
              dirruns = dirrunsUnique;
            }
          } // Track unmatched elements for set filters


          if (bySet) {
            // They will have gone through all possible matchers
            if (elem = !matcher && elem) {
              matchedCount--;
            } // Lengthen the array for every element, matched or not


            if (seed) {
              unmatched.push(elem);
            }
          }
        } // `i` is now the count of elements visited above, and adding it to `matchedCount`
        // makes the latter nonnegative.


        matchedCount += i; // Apply set filters to unmatched elements
        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
        // no element matchers and no seed.
        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
        // numerically zero.

        if (bySet && i !== matchedCount) {
          j = 0;

          while (matcher = setMatchers[j++]) {
            matcher(unmatched, setMatched, context, xml);
          }

          if (seed) {
            // Reintegrate element matches to eliminate the need for sorting
            if (matchedCount > 0) {
              while (i--) {
                if (!(unmatched[i] || setMatched[i])) {
                  setMatched[i] = pop.call(results);
                }
              }
            } // Discard index placeholder values to get only actual matches


            setMatched = condense(setMatched);
          } // Add matches to results


          push.apply(results, setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting

          if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        } // Override manipulation of globals by nested matchers


        if (outermost) {
          dirruns = dirrunsUnique;
          outermostContext = contextBackup;
        }

        return unmatched;
      };

      return bySet ? markFunction(superMatcher) : superMatcher;
    }

    compile = Sizzle.compile = function (selector, match
    /* Internal Use Only */
    ) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];

      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }

        i = match.length;

        while (i--) {
          cached = matcherFromTokens(match[i]);

          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        } // Cache the compiled function


        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)); // Save selector and tokenization

        cached.selector = selector;
      }

      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */


    select = Sizzle.select = function (selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || []; // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)

      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);

        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];

          if (!context) {
            return results; // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }

          selector = selector.slice(tokens.shift().value.length);
        } // Fetch a seed set for right-to-left matching


        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;

        while (i--) {
          token = tokens[i]; // Abort if we hit a combinator

          if (Expr.relative[type = token.type]) {
            break;
          }

          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);

              if (!selector) {
                push.apply(results, seed);
                return results;
              }

              break;
            }
          }
        }
      } // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above


      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    }; // One-time assignments
    // Sort stability


    support.sortStable = expando.split("").sort(sortOrder).join("") === expando; // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function

    support.detectDuplicates = !!hasDuplicate; // Initialize against the default document

    setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*

    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
    }); // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx

    if (!assert(function (el) {
      el.innerHTML = "<a href='#'></a>";
      return el.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    } // Support: IE<9
    // Use defaultValue in place of getAttribute("value")


    if (!support.attributes || !assert(function (el) {
      el.innerHTML = "<input/>";
      el.firstChild.setAttribute("value", "");
      return el.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    } // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies


    if (!assert(function (el) {
      return el.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;

        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }

    return Sizzle;
  }(window);

  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors; // Deprecated

  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  jQuery.escapeSelector = Sizzle.escape;

  var dir = function (elem, dir, until) {
    var matched = [],
        truncate = until !== undefined;

    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }

        matched.push(elem);
      }
    }

    return matched;
  };

  var siblings = function (n, elem) {
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }

    return matched;
  };

  var rneedsContext = jQuery.expr.match.needsContext;

  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }

  ;
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i; // Implement the identical functionality for filter and not

  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    } // Single element


    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    } // Arraylike of elements (jQuery, arguments, Array)


    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    } // Filtered directly for both simple and complex selectors


    return jQuery.filter(qualifier, elements, not);
  }

  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];

    if (not) {
      expr = ":not(" + expr + ")";
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
  };

  jQuery.fn.extend({
    find: function (selector) {
      var i,
          ret,
          len = this.length,
          self = this;

      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }

      ret = this.pushStack([]);

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function (selector) {
      return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  }); // Initialize a jQuery object
  // A central reference to the root jQuery(document)

  var rootjQuery,
      // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  // Strict HTML recognition (#11290: must start with <)
  // Shortcut simple #id case for speed
  rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      init = jQuery.fn.init = function (selector, context, root) {
    var match, elem; // HANDLE: $(""), $(null), $(undefined), $(false)

    if (!selector) {
      return this;
    } // Method init() accepts an alternate rootjQuery
    // so migrate can support jQuery.sub (gh-2101)


    root = root || rootjQuery; // Handle HTML strings

    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [null, selector, null];
      } else {
        match = rquickExpr.exec(selector);
      } // Match html or make sure no context is specified for #id


      if (match && (match[1] || !context)) {
        // HANDLE: $(html) -> $(array)
        if (match[1]) {
          context = context instanceof jQuery ? context[0] : context; // Option to run scripts is true for back-compat
          // Intentionally let the error be thrown if parseHTML is not present

          jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)); // HANDLE: $(html, props)

          if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              // Properties of context are called as methods if possible
              if (isFunction(this[match])) {
                this[match](context[match]); // ...and otherwise set as attributes
              } else {
                this.attr(match, context[match]);
              }
            }
          }

          return this; // HANDLE: $(#id)
        } else {
          elem = document.getElementById(match[2]);

          if (elem) {
            // Inject the element directly into the jQuery object
            this[0] = elem;
            this.length = 1;
          }

          return this;
        } // HANDLE: $(expr, $(...))

      } else if (!context || context.jquery) {
        return (context || root).find(selector); // HANDLE: $(expr, context)
        // (which is just equivalent to: $(context).find(expr)
      } else {
        return this.constructor(context).find(selector);
      } // HANDLE: $(DOMElement)

    } else if (selector.nodeType) {
      this[0] = selector;
      this.length = 1;
      return this; // HANDLE: $(function)
      // Shortcut for document ready
    } else if (isFunction(selector)) {
      return root.ready !== undefined ? root.ready(selector) : // Execute immediately if ready is not present
      selector(jQuery);
    }

    return jQuery.makeArray(selector, this);
  }; // Give the init function the jQuery prototype for later instantiation


  init.prototype = jQuery.fn; // Initialize central reference

  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  };
  jQuery.fn.extend({
    has: function (target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function () {
        var i = 0;

        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function (selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          targets = typeof selectors !== "string" && jQuery(selectors); // Positional selectors never match, since there's no _selection_ context

      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : // Don't pass non-elements to Sizzle
            cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function (elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      } // Index in selector


      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      } // Locate the position of the desired element


      return indexOf.call(this, // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });

  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}

    return cur;
  }

  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function (elem, i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function (elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function (elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function (elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function (elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function (elem, i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function (elem, i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function (elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return siblings(elem.firstChild);
    },
    contents: function (elem) {
      if (typeof elem.contentDocument !== "undefined") {
        return elem.contentDocument;
      } // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.


      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }

      return jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);

      if (name.slice(-5) !== "Until") {
        selector = until;
      }

      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }

      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        } // Reverse order for parents* and prev-derivatives


        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }

      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g; // Convert String-formatted options into Object-formatted ones

  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */


  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

    var // Flag to know if list is currently firing
    firing,
        // Last fire value for non-forgettable lists
    memory,
        // Flag to know if list was already fired
    fired,
        // Flag to prevent firing
    locked,
        // Actual callback list
    list = [],
        // Queue of execution data for repeatable lists
    queue = [],
        // Index of currently firing callback (modified by add/remove as needed)
    firingIndex = -1,
        // Fire callbacks
    fire = function () {
      // Enforce single-firing
      locked = locked || options.once; // Execute callbacks for all pending executions,
      // respecting firingIndex overrides and runtime changes

      fired = firing = true;

      for (; queue.length; firingIndex = -1) {
        memory = queue.shift();

        while (++firingIndex < list.length) {
          // Run callback and check for early termination
          if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
            // Jump to end and forget the data so .add doesn't re-fire
            firingIndex = list.length;
            memory = false;
          }
        }
      } // Forget the data if we're done with it


      if (!options.memory) {
        memory = false;
      }

      firing = false; // Clean up if we're done firing for good

      if (locked) {
        // Keep an empty list if we have data for future add calls
        if (memory) {
          list = []; // Otherwise, this object is spent
        } else {
          list = "";
        }
      }
    },
        // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function () {
        if (list) {
          // If we have memory from a past run, we should fire after adding
          if (memory && !firing) {
            firingIndex = list.length - 1;
            queue.push(memory);
          }

          (function add(args) {
            jQuery.each(args, function (_, arg) {
              if (isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg);
                }
              } else if (arg && arg.length && toType(arg) !== "string") {
                // Inspect recursively
                add(arg);
              }
            });
          })(arguments);

          if (memory && !firing) {
            fire();
          }
        }

        return this;
      },
      // Remove a callback from the list
      remove: function () {
        jQuery.each(arguments, function (_, arg) {
          var index;

          while ((index = jQuery.inArray(arg, list, index)) > -1) {
            list.splice(index, 1); // Handle firing indexes

            if (index <= firingIndex) {
              firingIndex--;
            }
          }
        });
        return this;
      },
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function (fn) {
        return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
      },
      // Remove all callbacks from the list
      empty: function () {
        if (list) {
          list = [];
        }

        return this;
      },
      // Disable .fire and .add
      // Abort any current/pending executions
      // Clear all callbacks and values
      disable: function () {
        locked = queue = [];
        list = memory = "";
        return this;
      },
      disabled: function () {
        return !list;
      },
      // Disable .fire
      // Also disable .add unless we have memory (since it would have no effect)
      // Abort any pending executions
      lock: function () {
        locked = queue = [];

        if (!memory && !firing) {
          list = memory = "";
        }

        return this;
      },
      locked: function () {
        return !!locked;
      },
      // Call all callbacks with the given context and arguments
      fireWith: function (context, args) {
        if (!locked) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);

          if (!firing) {
            fire();
          }
        }

        return this;
      },
      // Call all the callbacks with the given arguments
      fire: function () {
        self.fireWith(this, arguments);
        return this;
      },
      // To know if the callbacks have already been called at least once
      fired: function () {
        return !!fired;
      }
    };

    return self;
  };

  function Identity(v) {
    return v;
  }

  function Thrower(ex) {
    throw ex;
  }

  function adoptValue(value, resolve, reject, noValue) {
    var method;

    try {
      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject); // Other thenables
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject); // Other non-thenables
      } else {
        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      } // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.

    } catch (value) {
      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }

  jQuery.extend({
    Deferred: function (func) {
      var tuples = [// action, add listener, callbacks,
      // ... .then handlers, argument index, [final state]
      ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
          state = "pending",
          promise = {
        state: function () {
          return state;
        },
        always: function () {
          deferred.done(arguments).fail(arguments);
          return this;
        },
        "catch": function (fn) {
          return promise.then(null, fn);
        },
        // Keep pipe for back-compat
        pipe: function ()
        /* fnDone, fnFail, fnProgress */
        {
          var fns = arguments;
          return jQuery.Deferred(function (newDefer) {
            jQuery.each(tuples, function (i, tuple) {
              // Map tuples (progress, done, fail) to arguments (done, fail, progress)
              var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]]; // deferred.progress(function() { bind to newDefer or newDefer.notify })
              // deferred.done(function() { bind to newDefer or newDefer.resolve })
              // deferred.fail(function() { bind to newDefer or newDefer.reject })

              deferred[tuple[1]](function () {
                var returned = fn && fn.apply(this, arguments);

                if (returned && isFunction(returned.promise)) {
                  returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                } else {
                  newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                }
              });
            });
            fns = null;
          }).promise();
        },
        then: function (onFulfilled, onRejected, onProgress) {
          var maxDepth = 0;

          function resolve(depth, deferred, handler, special) {
            return function () {
              var that = this,
                  args = arguments,
                  mightThrow = function () {
                var returned, then; // Support: Promises/A+ section 2.3.3.3.3
                // https://promisesaplus.com/#point-59
                // Ignore double-resolution attempts

                if (depth < maxDepth) {
                  return;
                }

                returned = handler.apply(that, args); // Support: Promises/A+ section 2.3.1
                // https://promisesaplus.com/#point-48

                if (returned === deferred.promise()) {
                  throw new TypeError("Thenable self-resolution");
                } // Support: Promises/A+ sections 2.3.3.1, 3.5
                // https://promisesaplus.com/#point-54
                // https://promisesaplus.com/#point-75
                // Retrieve `then` only once


                then = returned && ( // Support: Promises/A+ section 2.3.4
                // https://promisesaplus.com/#point-64
                // Only check objects and functions for thenability
                typeof returned === "object" || typeof returned === "function") && returned.then; // Handle a returned thenable

                if (isFunction(then)) {
                  // Special processors (notify) just wait for resolution
                  if (special) {
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special)); // Normal processors (resolve) also hook into progress
                  } else {
                    // ...and disregard older resolution values
                    maxDepth++;
                    then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                  } // Handle all other returned values

                } else {
                  // Only substitute handlers pass on context
                  // and multiple values (non-spec behavior)
                  if (handler !== Identity) {
                    that = undefined;
                    args = [returned];
                  } // Process the value(s)
                  // Default process is resolve


                  (special || deferred.resolveWith)(that, args);
                }
              },
                  // Only normal processors (resolve) catch and reject exceptions
              process = special ? mightThrow : function () {
                try {
                  mightThrow();
                } catch (e) {
                  if (jQuery.Deferred.exceptionHook) {
                    jQuery.Deferred.exceptionHook(e, process.stackTrace);
                  } // Support: Promises/A+ section 2.3.3.3.4.1
                  // https://promisesaplus.com/#point-61
                  // Ignore post-resolution exceptions


                  if (depth + 1 >= maxDepth) {
                    // Only substitute handlers pass on context
                    // and multiple values (non-spec behavior)
                    if (handler !== Thrower) {
                      that = undefined;
                      args = [e];
                    }

                    deferred.rejectWith(that, args);
                  }
                }
              }; // Support: Promises/A+ section 2.3.3.3.1
              // https://promisesaplus.com/#point-57
              // Re-resolve promises immediately to dodge false rejection from
              // subsequent errors


              if (depth) {
                process();
              } else {
                // Call an optional hook to record the stack, in case of exception
                // since it's otherwise lost when execution goes async
                if (jQuery.Deferred.getStackHook) {
                  process.stackTrace = jQuery.Deferred.getStackHook();
                }

                window.setTimeout(process);
              }
            };
          }

          return jQuery.Deferred(function (newDefer) {
            // progress_handlers.add( ... )
            tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith)); // fulfilled_handlers.add( ... )

            tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity)); // rejected_handlers.add( ... )

            tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
          }).promise();
        },
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function (obj) {
          return obj != null ? jQuery.extend(obj, promise) : promise;
        }
      },
          deferred = {}; // Add list-specific methods

      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
            stateString = tuple[5]; // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add

        promise[tuple[1]] = list.add; // Handle state

        if (stateString) {
          list.add(function () {
            // state = "resolved" (i.e., fulfilled)
            // state = "rejected"
            state = stateString;
          }, // rejected_callbacks.disable
          // fulfilled_callbacks.disable
          tuples[3 - i][2].disable, // rejected_handlers.disable
          // fulfilled_handlers.disable
          tuples[3 - i][3].disable, // progress_callbacks.lock
          tuples[0][2].lock, // progress_handlers.lock
          tuples[0][3].lock);
        } // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire


        list.add(tuple[3].fire); // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }

        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        }; // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith


        deferred[tuple[0] + "With"] = list.fireWith;
      }); // Make the deferred a promise

      promise.promise(deferred); // Call given func if any

      if (func) {
        func.call(deferred, deferred);
      } // All done!


      return deferred;
    },
    // Deferred helper
    when: function (singleValue) {
      var // count of uncompleted subordinates
      remaining = arguments.length,
          // count of unprocessed arguments
      i = remaining,
          // subordinate fulfillment data
      resolveContexts = Array(i),
          resolveValues = slice.call(arguments),
          // the master Deferred
      master = jQuery.Deferred(),
          // subordinate callback factory
      updateFunc = function (i) {
        return function (value) {
          resolveContexts[i] = this;
          resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;

          if (! --remaining) {
            master.resolveWith(resolveContexts, resolveValues);
          }
        };
      }; // Single- and empty arguments are adopted like Promise.resolve


      if (remaining <= 1) {
        adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining); // Use .then() to unwrap secondary thenables (cf. gh-3000)

        if (master.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return master.then();
        }
      } // Multiple arguments are aggregated like Promise.all array elements


      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), master.reject);
      }

      return master.promise();
    }
  }); // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.

  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  jQuery.Deferred.exceptionHook = function (error, stack) {
    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
    }
  };

  jQuery.readyException = function (error) {
    window.setTimeout(function () {
      throw error;
    });
  }; // The deferred used on DOM ready


  var readyList = jQuery.Deferred();

  jQuery.fn.ready = function (fn) {
    readyList.then(fn) // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
    .catch(function (error) {
      jQuery.readyException(error);
    });
    return this;
  };

  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,
    // Handle when the DOM is ready
    ready: function (wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      } // Remember that the DOM is ready


      jQuery.isReady = true; // If a normal DOM Ready event fired, decrement, and wait if need be

      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      } // If there are functions bound, to execute


      readyList.resolveWith(document, [jQuery]);
    }
  });
  jQuery.ready.then = readyList.then; // The ready event handler and self cleanup method

  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  } // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon


  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);
  } else {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed); // A fallback to window.onload, that will always work

    window.addEventListener("load", completed);
  } // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function


  var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null; // Sets many values

    if (toType(key) === "object") {
      chainable = true;

      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      } // Sets one value

    } else if (value !== undefined) {
      chainable = true;

      if (!isFunction(value)) {
        raw = true;
      }

      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null; // ...except when executing function values
        } else {
          bulk = fn;

          fn = function (elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }

    if (chainable) {
      return elems;
    } // Gets


    if (bulk) {
      return fn.call(elems);
    }

    return len ? fn(elems[0], key) : emptyGet;
  }; // Matches dashed string for camelizing


  var rmsPrefix = /^-ms-/,
      rdashAlpha = /-([a-z])/g; // Used by camelCase as callback to replace()

  function fcamelCase(all, letter) {
    return letter.toUpperCase();
  } // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (#9572)


  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }

  var acceptData = function (owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };

  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }

  Data.uid = 1;
  Data.prototype = {
    cache: function (owner) {
      // Check if the owner object already has a cache
      var value = owner[this.expando]; // If not, create one

      if (!value) {
        value = {}; // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return an empty object.

        if (acceptData(owner)) {
          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value; // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }

      return value;
    },
    set: function (owner, data, value) {
      var prop,
          cache = this.cache(owner); // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)

      if (typeof data === "string") {
        cache[camelCase(data)] = value; // Handle: [ owner, { properties } ] args
      } else {
        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }

      return cache;
    },
    get: function (owner, key) {
      return key === undefined ? this.cache(owner) : // Always use camelCase key (gh-2257)
      owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access: function (owner, key, value) {
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        return this.get(owner, key);
      } // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //


      this.set(owner, key, value); // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]

      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i,
          cache = owner[this.expando];

      if (cache === undefined) {
        return;
      }

      if (key !== undefined) {
        // Support array or space separated string of keys
        if (Array.isArray(key)) {
          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key); // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace

          key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
        }

        i = key.length;

        while (i--) {
          delete cache[key[i]];
        }
      } // Remove the expando if there's no more data


      if (key === undefined || jQuery.isEmptyObject(cache)) {
        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function (owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data(); //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /[A-Z]/g;

  function getData(data) {
    if (data === "true") {
      return true;
    }

    if (data === "false") {
      return false;
    }

    if (data === "null") {
      return null;
    } // Only convert to a number if it doesn't change the string


    if (data === +data + "") {
      return +data;
    }

    if (rbrace.test(data)) {
      return JSON.parse(data);
    }

    return data;
  }

  function dataAttr(elem, key, data) {
    var name; // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute

    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);

      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {} // Make sure we set the data so it isn't changed later


        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }

    return data;
  }

  jQuery.extend({
    hasData: function (elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function (elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function (elem, name) {
      dataUser.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function (elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes; // Gets all values

      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);

          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;

            while (i--) {
              // Support: IE 11 only
              // The attrs elements can be null (#14894)
              if (attrs[i]) {
                name = attrs[i].name;

                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }

            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }

        return data;
      } // Sets multiple values


      if (typeof key === "object") {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }

      return access(this, function (value) {
        var data; // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.

        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);

          if (data !== undefined) {
            return data;
          } // Attempt to "discover" the data in
          // HTML5 custom data-* attrs


          data = dataAttr(elem, key);

          if (data !== undefined) {
            return data;
          } // We tried really hard, but the data doesn't exist.


          return;
        } // Set the data...


        this.each(function () {
          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function (key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;

      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type); // Speed up dequeue by getting out quickly if this is just a lookup

        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }

        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || "fx";

      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function () {
        jQuery.dequeue(elem, type);
      }; // If the fx queue is dequeued, always remove the progress sentinel


      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }

      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        } // Clear up the last queue stop function


        delete hooks.stop;
        fn.call(elem, next, hooks);
      }

      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function (elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;

      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }

      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }

      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data); // Ensure a hooks for this queue

        jQuery._queueHooks(this, type);

        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function (type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function (type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function () {
        if (! --count) {
          defer.resolveWith(elements, [elements]);
        }
      };

      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }

      type = type || "fx";

      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");

        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }

      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var documentElement = document.documentElement;

  var isAttached = function (elem) {
    return jQuery.contains(elem.ownerDocument, elem);
  },
      composed = {
    composed: true
  }; // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.


  if (documentElement.getRootNode) {
    isAttached = function (elem) {
      return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    };
  }

  var isHiddenWithinTree = function (elem, el) {
    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem; // Inline style trumps all

    return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
    // Support: Firefox <=43 - 45
    // Disconnected elements can have computed display: none, so first confirm that elem is
    // in the document.
    isAttached(elem) && jQuery.css(elem, "display") === "none";
  };

  var swap = function (elem, options, callback, args) {
    var ret,
        name,
        old = {}; // Remember the old values, and insert the new ones

    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }

    ret = callback.apply(elem, args || []); // Revert the old values

    for (name in options) {
      elem.style[name] = old[name];
    }

    return ret;
  };

  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
        scale,
        maxIterations = 20,
        currentValue = tween ? function () {
      return tween.cur();
    } : function () {
      return jQuery.css(elem, prop, "");
    },
        initial = currentValue(),
        unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
        // Starting value computation is required for potential unit mismatches
    initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

    if (initialInUnit && initialInUnit[3] !== unit) {
      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial = initial / 2; // Trust units reported by jQuery.css

      unit = unit || initialInUnit[3]; // Iteratively approximate from a nonzero starting point

      initialInUnit = +initial || 1;

      while (maxIterations--) {
        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);

        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }

        initialInUnit = initialInUnit / scale;
      }

      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit); // Make sure we update the tween properties later on

      valueParts = valueParts || [];
    }

    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0; // Apply relative offset (+=/-=) if specified

      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];

      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }

    return adjusted;
  }

  var defaultDisplayMap = {};

  function getDefaultDisplay(elem) {
    var temp,
        doc = elem.ownerDocument,
        nodeName = elem.nodeName,
        display = defaultDisplayMap[nodeName];

    if (display) {
      return display;
    }

    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);

    if (display === "none") {
      display = "block";
    }

    defaultDisplayMap[nodeName] = display;
    return display;
  }

  function showHide(elements, show) {
    var display,
        elem,
        values = [],
        index = 0,
        length = elements.length; // Determine new display value for elements that need to change

    for (; index < length; index++) {
      elem = elements[index];

      if (!elem.style) {
        continue;
      }

      display = elem.style.display;

      if (show) {
        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;

          if (!values[index]) {
            elem.style.display = "";
          }
        }

        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none"; // Remember what we're overwriting

          dataPriv.set(elem, "display", display);
        }
      }
    } // Set the display of the elements in a second loop to avoid constant reflow


    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }

    return elements;
  }

  jQuery.fn.extend({
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }

      return this.each(function () {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i; // We have to close these tags to support XHTML (#13200)

  var wrapMap = {
    // Support: IE <=9 only
    option: [1, "<select multiple='multiple'>", "</select>"],
    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  }; // Support: IE <=9 only

  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;

  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (#15151)
    var ret;

    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }

    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }

    return ret;
  } // Mark scripts as having already been evaluated


  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;

    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }

  var rhtml = /<|&#?\w+;/;

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
        tmp,
        tag,
        wrap,
        attached,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length;

    for (; i < l; i++) {
      elem = elems[i];

      if (elem || elem === 0) {
        // Add nodes directly
        if (toType(elem) === "object") {
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem); // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div")); // Deserialize a standard representation

          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2]; // Descend through wrappers to the right content

          j = wrap[0];

          while (j--) {
            tmp = tmp.lastChild;
          } // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit


          jQuery.merge(nodes, tmp.childNodes); // Remember the top-level container

          tmp = fragment.firstChild; // Ensure the created nodes are orphaned (#12392)

          tmp.textContent = "";
        }
      }
    } // Remove wrapper from fragment


    fragment.textContent = "";
    i = 0;

    while (elem = nodes[i++]) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }

        continue;
      }

      attached = isAttached(elem); // Append to fragment

      tmp = getAll(fragment.appendChild(elem), "script"); // Preserve script evaluation history

      if (attached) {
        setGlobalEval(tmp);
      } // Capture executables


      if (scripts) {
        j = 0;

        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }

    return fragment;
  }

  (function () {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input"); // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (#11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (#14901)

    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input); // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments

    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned

    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();

  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  function returnTrue() {
    return true;
  }

  function returnFalse() {
    return false;
  } // Support: IE <=9 - 11+
  // focus() and blur() are asynchronous, except when they are no-op.
  // So expect focus to be synchronous when the element is already active,
  // and blur to be synchronous when the element is not already active.
  // (focus and blur are always synchronous in other supported browsers,
  // this just defines when we can count on it).


  function expectSync(elem, type) {
    return elem === safeActiveElement() === (type === "focus");
  } // Support: IE <=9 only
  // Accessing document.activeElement can throw unexpectedly
  // https://bugs.jquery.com/ticket/13393


  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  function on(elem, types, selector, data, fn, one) {
    var origFn, type; // Types can be a map of types/handlers

    if (typeof types === "object") {
      // ( types-Object, selector, data )
      if (typeof selector !== "string") {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }

      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }

      return elem;
    }

    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }

    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (one === 1) {
      origFn = fn;

      fn = function (event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      }; // Use same guid so caller can remove using origFn


      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }

    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */


  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.get(elem); // Don't attach events to noData or text/comment nodes (but allow plain objects)

      if (!elemData) {
        return;
      } // Caller can pass in an object of custom data in lieu of the handler


      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      } // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)


      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      } // Make sure that the handler has a unique ID, used to find/remove it later


      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      } // Init the element's event structure and main handler, if this is the first


      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }

      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      } // Handle multiple events separated by a space


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers

        if (!type) {
          continue;
        } // If event changes its type, use the special event handlers for the changed type


        special = jQuery.event.special[type] || {}; // If selector defined, determine special event api type, otherwise given type

        type = (selector ? special.delegateType : special.bindType) || type; // Update special based on newly reset type

        special = jQuery.event.special[type] || {}; // handleObj is passed to all event handlers

        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn); // Init the event handler queue if we're the first

        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0; // Only use addEventListener if the special events handler returns false

          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj);

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        } // Add to the element's handler list, delegates in front


        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        } // Keep track of which events have ever been used, for event optimization


        jQuery.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

      if (!elemData || !(events = elemData.events)) {
        return;
      } // Once for each type.namespace in types; type may be omitted


      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;

      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element

        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }

          continue;
        }

        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"); // Remove matching events

        origCount = j = handlers.length;

        while (j--) {
          handleObj = handlers[j];

          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);

            if (handleObj.selector) {
              handlers.delegateCount--;
            }

            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        } // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)


        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }

          delete events[type];
        }
      } // Remove data and the expando if it's no longer used


      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function (nativeEvent) {
      // Make a writable jQuery.Event from the native event object
      var event = jQuery.event.fix(nativeEvent);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue,
          args = new Array(arguments.length),
          handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {}; // Use the fix-ed jQuery.Event rather than the (read-only) native event

      args[0] = event;

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      event.delegateTarget = this; // Call the preDispatch hook for the mapped type, and let it bail if desired

      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      } // Determine handlers


      handlerQueue = jQuery.event.handlers.call(this, event, handlers); // Run delegates first; they may want to stop propagation beneath us

      i = 0;

      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;

        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // If the event is namespaced, then each handler is only invoked if it is
          // specially universal or its namespaces are a superset of the event's.
          if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      } // Call the postDispatch hook for the mapped type


      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }

      return event.result;
    },
    handlers: function (event, handlers) {
      var i,
          handleObj,
          sel,
          matchedHandlers,
          matchedSelectors,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target; // Find delegate handlers

      if (delegateCount && // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType && // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          // Don't check non-elements (#13208)
          // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};

            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i]; // Don't conflict with Object.prototype properties (#13203)

              sel = handleObj.selector + " ";

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }

              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }

            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      } // Add the remaining (directly-bound) handlers


      cur = this;

      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount)
        });
      }

      return handlerQueue;
    },
    addProp: function (name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function () {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function () {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function (value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },
    fix: function (originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      click: {
        // Utilize native event to ensure correct state for checkable inputs
        setup: function (data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data; // Claim the first handler

          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            // dataPriv.set( el, "click", ... )
            leverageNative(el, "click", returnTrue);
          } // Return false to allow normal processing in the caller


          return false;
        },
        trigger: function (data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data; // Force setup before triggering a click

          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click");
          } // Return non-false to allow normal event-path propagation


          return true;
        },
        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default: function (event) {
          var target = event.target;
          return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  }; // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.

  function leverageNative(el, type, expectSync) {
    // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
    if (!expectSync) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue);
      }

      return;
    } // Register the controller as a special universal handler for all event namespaces


    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function (event) {
        var notAsync,
            result,
            saved = dataPriv.get(this, type);

        if (event.isTrigger & 1 && this[type]) {
          // Interrupt processing of the outer synthetic .trigger()ed event
          // Saved data should be false in such cases, but might be a leftover capture object
          // from an async native handler (gh-4350)
          if (!saved.length) {
            // Store arguments for use when handling the inner native event
            // There will always be at least one argument (an event object), so this array
            // will not be confused with a leftover capture object.
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved); // Trigger the native event and capture its result
            // Support: IE <=9 - 11+
            // focus() and blur() are asynchronous

            notAsync = expectSync(this, type);
            this[type]();
            result = dataPriv.get(this, type);

            if (saved !== result || notAsync) {
              dataPriv.set(this, type, false);
            } else {
              result = {};
            }

            if (saved !== result) {
              // Cancel the outer synthetic event
              event.stopImmediatePropagation();
              event.preventDefault();
              return result.value;
            } // If this is an inner synthetic event for an event with a bubbling surrogate
            // (focus or blur), assume that the surrogate already propagated from triggering the
            // native event and prevent that from happening again here.
            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
            // less bad than duplication.

          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          } // If this is a native event triggered above, everything is now in order
          // Fire an inner synthetic event with the original arguments

        } else if (saved.length) {
          // ...and capture the result
          dataPriv.set(this, type, {
            value: jQuery.event.trigger( // Support: IE <=9 - 11+
            // Extend with the prototype to reset the above stopImmediatePropagation()
            jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
          }); // Abort handling of the native event

          event.stopImmediatePropagation();
        }
      }
    });
  }

  jQuery.removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };

  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    } // Event object


    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type; // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.

      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: Android <=2.3 only
      src.returnValue === false ? returnTrue : returnFalse; // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (#504, #13143)

      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget; // Event type
    } else {
      this.type = src;
    } // Put explicitly provided properties onto the event object


    if (props) {
      jQuery.extend(this, props);
    } // Create a timestamp if incoming event doesn't have one


    this.timeStamp = src && src.timeStamp || Date.now(); // Mark it as fixed

    this[jQuery.expando] = true;
  }; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html


  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;

      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;

      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }

      this.stopPropagation();
    }
  }; // Includes all common event props including KeyEvent and MouseEvent specific props

  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: function (event) {
      var button = event.button; // Add which for key events

      if (event.which == null && rkeyEvent.test(event.type)) {
        return event.charCode != null ? event.charCode : event.keyCode;
      } // Add which for click: 1 === left; 2 === middle; 3 === right


      if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
        if (button & 1) {
          return 1;
        }

        if (button & 2) {
          return 3;
        }

        if (button & 4) {
          return 2;
        }

        return 0;
      }

      return event.which;
    }
  }, jQuery.event.addProp);
  jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function (type, delegateType) {
    jQuery.event.special[type] = {
      // Utilize native event if possible so blur/focus sequence is correct
      setup: function () {
        // Claim the first handler
        // dataPriv.set( this, "focus", ... )
        // dataPriv.set( this, "blur", ... )
        leverageNative(this, type, expectSync); // Return false to allow normal processing in the caller

        return false;
      },
      trigger: function () {
        // Force setup before trigger
        leverageNative(this, type); // Return non-false to allow normal event-path propagation

        return true;
      },
      delegateType: delegateType
    };
  }); // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).

  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window

        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }

        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;

      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }

      if (typeof types === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }

        return this;
      }

      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }

      if (fn === false) {
        fn = returnFalse;
      }

      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var
  /* eslint-disable max-len */
  // See https://github.com/eslint/eslint/issues/3229
  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

  /* eslint-enable */
  // Support: IE <=10 - 11, Edge 12 - 13 only
  // In IE/Edge using regex groups here causes severe slowdowns.
  // See https://connect.microsoft.com/IE/feedback/details/1736512/
  rnoInnerhtml = /<script|<style|<link/i,
      // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Prefer a tbody over its parent table for containing new rows

  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery(elem).children("tbody")[0] || elem;
    }

    return elem;
  } // Replace/restore the type attribute of script elements for safe DOM manipulation


  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }

  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }

    return elem;
  }

  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

    if (dest.nodeType !== 1) {
      return;
    } // 1. Copy private data: events, handlers, etc.


    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.access(src);
      pdataCur = dataPriv.set(dest, pdataOld);
      events = pdataOld.events;

      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};

        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    } // 2. Copy user data


    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  } // Fix IE bugs, see support tests


  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.

    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked; // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }

  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = concat.apply([], args);
    var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = collection.length,
        iNoClone = l - 1,
        value = args[0],
        valueIsFunction = isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit

    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function (index) {
        var self = collection.eq(index);

        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }

        domManip(self, args, callback, ignored);
      });
    }

    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;

      if (fragment.childNodes.length === 1) {
        fragment = first;
      } // Require either new content or an interest in ignored elements to invoke the callback


      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length; // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070).

        for (; i < l; i++) {
          node = fragment;

          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true); // Keep references to cloned scripts for later restoration

            if (hasScripts) {
              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }

          callback.call(collection[i], node, i);
        }

        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument; // Reenable scripts

          jQuery.map(scripts, restoreScript); // Evaluate executable scripts on first document insertion

          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];

            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  });
                }
              } else {
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
              }
            }
          }
        }
      }
    }

    return collection;
  }

  function remove(elem, selector, keepData) {
    var node,
        nodes = selector ? jQuery.filter(selector, elem) : elem,
        i = 0;

    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }

      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"));
        }

        node.parentNode.removeChild(node);
      }
    }

    return elem;
  }

  jQuery.extend({
    htmlPrefilter: function (html) {
      return html.replace(rxhtmlTag, "<$1></$2>");
    },
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = isAttached(elem); // Fix IE cloning issues

      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);

        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      } // Copy the events from the original to the clone


      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);

          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      } // Preserve script evaluation history


      destElements = getAll(clone, "script");

      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      } // Return the cloned set


      return clone;
    },
    cleanData: function (elems) {
      var data,
          elem,
          type,
          special = jQuery.event.special,
          i = 0;

      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type); // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            } // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove


            elem[dataPriv.expando] = undefined;
          }

          if (elem[dataUser.expando]) {
            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function (selector) {
      return remove(this, selector, true);
    },
    remove: function (selector) {
      return remove(this, selector);
    },
    text: function (value) {
      return access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function () {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function () {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function () {
      var elem,
          i = 0;

      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false)); // Remove any remaining nodes

          elem.textContent = "";
        }
      }

      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return access(this, function (value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;

        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        } // See if we can take a shortcut and just use innerHTML


        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);

          try {
            for (; i < l; i++) {
              elem = this[i] || {}; // Remove element nodes and prevent memory leaks

              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }

            elem = 0; // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }

        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function () {
      var ignored = []; // Make the changes, replacing each non-ignored context element with the new content

      return domManip(this, arguments, function (elem) {
        var parent = this.parentNode;

        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));

          if (parent) {
            parent.replaceChild(elem, this);
          }
        } // Force callback invocation

      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems); // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit

        push.apply(ret, elems.get());
      }

      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

  var getStyles = function (elem) {
    // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;

    if (!view || !view.opener) {
      view = window;
    }

    return view.getComputedStyle(elem);
  };

  var rboxStyle = new RegExp(cssExpand.join("|"), "i");

  (function () {
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {
      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }

      container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%"; // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44

      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12; // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't

      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36; // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements

      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36; // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)
      // Support: Chrome <=64
      // Don't get tricked when zoom affects offsetWidth (gh-4029)

      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
      documentElement.removeChild(container); // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed

      div = null;
    }

    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }

    var pixelPositionVal,
        boxSizingReliableVal,
        scrollboxSizeVal,
        pixelBoxStylesVal,
        reliableMarginLeftVal,
        container = document.createElement("div"),
        div = document.createElement("div"); // Finish early in limited (non-browser) environments

    if (!div.style) {
      return;
    } // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (#8908)


    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery.extend(support, {
      boxSizingReliable: function () {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function () {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function () {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function () {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function () {
        computeStyleTests();
        return scrollboxSizeVal;
      }
    });
  })();

  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        // Support: Firefox 51+
    // Retrieving style before computed somehow
    // fixes an issue with getting wrong values
    // on detached elements
    style = elem.style;
    computed = computed || getStyles(elem); // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, #12537)
    //   .css('--customProperty) (#3144)

    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];

      if (ret === "" && !isAttached(elem)) {
        ret = jQuery.style(elem, name);
      } // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values


      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth; // Put in the new values to get a computed value out

        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width; // Revert the changed values

        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }

    return ret !== undefined ? // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" : ret;
  }

  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function () {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        } // Hook needed; redefine it so that the support test is not executed again.


        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }

  var cssPrefixes = ["Webkit", "Moz", "ms"],
      emptyStyle = document.createElement("div").style,
      vendorProps = {}; // Return a vendor-prefixed property or undefined

  function vendorPropName(name) {
    // Check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1),
        i = cssPrefixes.length;

    while (i--) {
      name = cssPrefixes[i] + capName;

      if (name in emptyStyle) {
        return name;
      }
    }
  } // Return a potentially-mapped jQuery.cssProps or vendor prefixed property


  function finalPropName(name) {
    var final = jQuery.cssProps[name] || vendorProps[name];

    if (final) {
      return final;
    }

    if (name in emptyStyle) {
      return name;
    }

    return vendorProps[name] = vendorPropName(name) || name;
  }

  var // Swappable if display is none or starts with table
  // except "table", "table-cell", or "table-caption"
  // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rcustomProp = /^--/,
      cssShow = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      cssNormalTransform = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function setPositiveNumber(elem, value, subtract) {
    // Any relative (+/-) values have already been
    // normalized at this point
    var matches = rcssNum.exec(value);
    return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }

  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
        extra = 0,
        delta = 0; // Adjustment may not be necessary

    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }

    for (; i < 4; i += 2) {
      // Both box models exclude margin
      if (box === "margin") {
        delta += jQuery.css(elem, box + cssExpand[i], true, styles);
      } // If we get here with a content-box, we're seeking "padding" or "border" or "margin"


      if (!isBorderBox) {
        // Add padding
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles); // For "border" or "margin", add border

        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles); // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        } // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"

      } else {
        // For "content", subtract padding
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        } // For "content" or "padding", subtract border


        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    } // Account for positive content-box scroll gutter when requested by providing computedVal


    if (!isBorderBox && computedVal >= 0) {
      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5 // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
      // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }

    return delta;
  }

  function getWidthOrHeight(elem, dimension, extra) {
    // Start with computed style
    var styles = getStyles(elem),
        // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
    // Fake content-box until we know it's needed to know the true value.
    boxSizingNeeded = !support.boxSizingReliable() || extra,
        isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
        valueIsBorderBox = isBorderBox,
        val = curCSS(elem, dimension, styles),
        offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1); // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.

    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }

      val = "auto";
    } // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    // Support: IE 9-11 only
    // Also use offsetWidth/offsetHeight for when box sizing is unreliable
    // We use getClientRects() to check for hidden/disconnected.
    // In those cases, the computed value can be trusted to be border-box


    if ((!support.boxSizingReliable() && isBorderBox || val === "auto" || !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && elem.getClientRects().length) {
      isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box"; // Where available, offsetWidth/offsetHeight approximate border box dimensions.
      // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
      // retrieved value as a content box dimension.

      valueIsBorderBox = offsetProp in elem;

      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    } // Normalize "" and auto


    val = parseFloat(val) || 0; // Adjust for the element's box model

    return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, // Provide the current computed size to request scroll gutter calculation (gh-3589)
    val) + "px";
  }

  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      "animationIterationCount": true,
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "gridArea": true,
      "gridColumn": true,
      "gridColumnEnd": true,
      "gridColumnStart": true,
      "gridRow": true,
      "gridRowEnd": true,
      "gridRowStart": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},
    // Get and set the style property on a DOM Node
    style: function (elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      } // Make sure that we're working with the right name


      var ret,
          type,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name),
          style = elem.style; // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Gets hook for the prefixed version, then unprefixed version


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // Check if we're setting a value

      if (value !== undefined) {
        type = typeof value; // Convert "+=" or "-=" to relative numbers (#7345)

        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret); // Fixes bug #9237

          type = "number";
        } // Make sure that null and NaN values aren't set (#7116)


        if (value == null || value !== value) {
          return;
        } // If a number was passed in, add the unit (except for certain CSS properties)
        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
        // "px" to a few hardcoded values.


        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        } // background-* props affect original clone's values


        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        } // If a hook was provided, use that value, otherwise just set the specified value


        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        } // Otherwise just get the value from the style object


        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = camelCase(name),
          isCustomProp = rcustomProp.test(name); // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.

      if (!isCustomProp) {
        name = finalPropName(origName);
      } // Try prefixed name followed by the unprefixed name


      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there

      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      } // Otherwise, if a way to get the computed value exists, use that


      if (val === undefined) {
        val = curCSS(elem, name, styles);
      } // Convert "normal" to computed value


      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      } // Make numeric if forced or a qualifier was provided and val looks numeric


      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }

      return val;
    }
  });
  jQuery.each(["height", "width"], function (i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function (elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) && ( // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, dimension, extra);
          }) : getWidthOrHeight(elem, dimension, extra);
        }
      },
      set: function (elem, value, extra) {
        var matches,
            styles = getStyles(elem),
            // Only read styles.position if the test has a chance to fail
        // to avoid forcing a reflow.
        scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
        boxSizingNeeded = scrollboxSizeBuggy || extra,
            isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
            subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0; // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)

        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
        } // Convert to pixels if value adjustment is needed


        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }

        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function () {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  }); // These hooks are used by animate to expand properties

  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0,
            expanded = {},
            // Assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" ") : [value];

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }

        return expanded;
      }
    };

    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function (name, value) {
      return access(this, function (elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;

        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }

          return map;
        }

        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }
  }); // Based off of the plugin by Clint Helfers, with permission.
  // https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/

  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);

      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };

  (function () {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox"; // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"

    support.checkOn = input.value !== ""; // Support: IE <=11 only
    // Must access selectedIndex to make default options select

    support.optSelected = opt.selected; // Support: IE <=11 only
    // An input loses its value after becoming a radio

    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();

  var boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function (elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      } // Fallback to prop when attributes are not supported


      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      } // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined


      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }

      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }

        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        elem.setAttribute(name, value + "");
        return value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      ret = jQuery.find.attr(elem, name); // Non-existent attributes return null, we normalize to undefined

      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);

            if (val) {
              elem.value = val;
            }

            return value;
          }
        }
      }
    },
    removeAttr: function (elem, value) {
      var name,
          i = 0,
          // Attribute names can contain non-HTML whitespace characters
      // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
      attrNames = value && value.match(rnothtmlwhite);

      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name);
        }
      }
    }
  }); // Hooks for boolean attributes

  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }

      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;

    attrHandle[name] = function (elem, name, isXML) {
      var ret,
          handle,
          lowercaseName = name.toLowerCase();

      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }

      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
      rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function (name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function (elem, name, value) {
      var ret,
          hooks,
          nType = elem.nodeType; // Don't get/set properties on text, comment and attribute nodes

      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }

      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }

        return elem[name] = value;
      }

      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }

      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
          // Use proper attribute retrieval(#12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");

          if (tabindex) {
            return parseInt(tabindex, 10);
          }

          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }

          return -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }); // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop

  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }

        return null;
      },
      set: function (elem) {
        /* eslint no-unused-expressions: "off" */
        var parent = elem.parentNode;

        if (parent) {
          parent.selectedIndex;

          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }

  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  }); // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace

  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }

  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }

  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }

    return [];
  }

  jQuery.fn.extend({
    addClass: function (value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem);
          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    removeClass: function (value) {
      var classes,
          elem,
          cur,
          curValue,
          clazz,
          j,
          finalValue,
          i = 0;

      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }

      if (!arguments.length) {
        return this.attr("class", "");
      }

      classes = classesToArray(value);

      if (classes.length) {
        while (elem = this[i++]) {
          curValue = getClass(elem); // This expression is here for better compressibility (see addClass)

          cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

          if (cur) {
            j = 0;

            while (clazz = classes[j++]) {
              // Remove *all* instances
              while (cur.indexOf(" " + clazz + " ") > -1) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            } // Only assign if different to avoid unneeded rendering.


            finalValue = stripAndCollapse(cur);

            if (curValue !== finalValue) {
              elem.setAttribute("class", finalValue);
            }
          }
        }
      }

      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value,
          isValidValue = type === "string" || Array.isArray(value);

      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }

      if (isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }

      return this.each(function () {
        var className, i, self, classNames;

        if (isValidValue) {
          // Toggle individual class names
          i = 0;
          self = jQuery(this);
          classNames = classesToArray(value);

          while (className = classNames[i++]) {
            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          } // Toggle whole class name

        } else if (value === undefined || type === "boolean") {
          className = getClass(this);

          if (className) {
            // Store className if set
            dataPriv.set(this, "__className__", className);
          } // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.


          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function (selector) {
      var className,
          elem,
          i = 0;
      className = " " + selector + " ";

      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }

      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function (value) {
      var hooks,
          ret,
          valueIsFunction,
          elem = this[0];

      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }

          ret = elem.value; // Handle most common string cases

          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          } // Handle cases where value is null/undef or number


          return ret == null ? "" : ret;
        }

        return;
      }

      valueIsFunction = isFunction(value);
      return this.each(function (i) {
        var val;

        if (this.nodeType !== 1) {
          return;
        }

        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        } // Treat null/undefined as ""; convert numbers to string


        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }

        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting

        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : // Support: IE <=10 - 11 only
          // option.text throws exceptions (#14686, #14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse(jQuery.text(elem));
        }
      },
      select: {
        get: function (elem) {
          var value,
              option,
              i,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one",
              values = one ? null : [],
              max = one ? index + 1 : options.length;

          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          } // Loop through all the selected options


          for (; i < max; i++) {
            option = options[i]; // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (#2551)

            if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
            !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val(); // We don't need an array for one selects

              if (one) {
                return value;
              } // Multi-Selects return an array


              values.push(value);
            }
          }

          return values;
        },
        set: function (elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;

          while (i--) {
            option = options[i];
            /* eslint-disable no-cond-assign */

            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }
            /* eslint-enable no-cond-assign */

          } // Force browsers to behave consistently when non-matching value is set


          if (!optionSet) {
            elem.selectedIndex = -1;
          }

          return values;
        }
      }
    }
  }); // Radios and checkboxes getter/setter

  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
        }
      }
    };

    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  }); // Return jQuery for attributes-only inclusion

  support.focusin = "onfocusin" in window;

  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      stopPropagationCallback = function (e) {
    e.stopPropagation();
  };

  jQuery.extend(jQuery.event, {
    trigger: function (event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          lastElement,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document; // Don't do events on text and comment nodes

      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      } // focus/blur morphs to focusin/out; ensure we're not firing them right now


      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }

      if (type.indexOf(".") > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }

      ontype = type.indexOf(":") < 0 && "on" + type; // Caller can pass in a jQuery.Event object, Object, or just an event type string

      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)

      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null; // Clean up the event in case it is being reused

      event.result = undefined;

      if (!event.target) {
        event.target = elem;
      } // Clone any incoming data and prepend the event, creating the handler arg list


      data = data == null ? [event] : jQuery.makeArray(data, [event]); // Allow special events to draw outside the lines

      special = jQuery.event.special[type] || {};

      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      } // Determine event propagation path in advance, per W3C events spec (#9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)


      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;

        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }

        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        } // Only add window if we got to document (e.g., not plain obj or detached DOM)


        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      } // Fire handlers on the event path


      i = 0;

      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type; // jQuery handler

        handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");

        if (handle) {
          handle.apply(cur, data);
        } // Native handler


        handle = ontype && cur[ontype];

        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);

          if (event.result === false) {
            event.preventDefault();
          }
        }
      }

      event.type = type; // If nobody prevented the default action, do it now

      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (#6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];

            if (tmp) {
              elem[ontype] = null;
            } // Prevent re-triggering of the same event, since we already bubbled it above


            jQuery.event.triggered = type;

            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }

            elem[type]();

            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }

            jQuery.event.triggered = undefined;

            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }

      return event.result;
    },
    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function (type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];

      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  }); // Support: Firefox <=44
  // Firefox doesn't have focus(in | out) events
  // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
  //
  // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
  // focus(in | out) events fire after focus & blur events,
  // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
  // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857

  if (!support.focusin) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function (orig, fix) {
      // Attach a single capturing handler on the document while someone wants focusin/focusout
      var handler = function (event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
      };

      jQuery.event.special[fix] = {
        setup: function () {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix);

          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }

          dataPriv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function () {
          var doc = this.ownerDocument || this,
              attaches = dataPriv.access(doc, fix) - 1;

          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            dataPriv.remove(doc, fix);
          } else {
            dataPriv.access(doc, fix, attaches);
          }
        }
      };
    });
  }

  var rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && toType(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  } // Serialize an array of form elements or a set of
  // key/values into a query string


  jQuery.param = function (a, traditional) {
    var prefix,
        s = [],
        add = function (key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
    };

    if (a == null) {
      return "";
    } // If an array was passed in, assume that it is an array of form elements.


    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    } // Return the resulting serialization


    return s.join("&");
  };

  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works

        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();

        if (val == null) {
          return null;
        }

        if (Array.isArray(val)) {
          return jQuery.map(val, function (val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }

        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;

      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        } // The elements to wrap the target around


        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }

        wrap.map(function () {
          var elem = this;

          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }

          return elem;
        }).append(this);
      }

      return this;
    },
    wrapInner: function (html) {
      if (isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }

      return this.each(function () {
        var self = jQuery(this),
            contents = self.contents();

        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function (selector) {
      this.parent(selector).not("body").each(function () {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });

  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };

  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  }; // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337


  support.createHTMLDocument = function () {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  }(); // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string


  jQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }

    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }

    var base, parsed, scripts;

    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument(""); // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)

        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }

    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && []; // Single tag

    if (parsed) {
      return [context.createElement(parsed[1])];
    }

    parsed = buildFragment([data], context, scripts);

    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }

    return jQuery.merge([], parsed.childNodes);
  };

  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {}; // Set position first, in-case top/left are set even on static elem

      if (position === "static") {
        elem.style.position = "relative";
      }

      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1; // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed

      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }

      if (isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }

      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }

      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }

      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    // offset() relates an element's border box to the document origin
    offset: function (options) {
      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined ? this : this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }

      var rect,
          win,
          elem = this[0];

      if (!elem) {
        return;
      } // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error


      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      } // Get document-relative position by adding viewport scroll to viewport-relative gBCR


      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function () {
      if (!this[0]) {
        return;
      }

      var offsetParent,
          offset,
          doc,
          elem = this[0],
          parentOffset = {
        top: 0,
        left: 0
      }; // position:fixed elements are offset from the viewport, which itself always has zero offset

      if (jQuery.css(elem, "position") === "fixed") {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset(); // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified

        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;

        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode;
        }

        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
        }
      } // Subtract parent offsets and element margins


      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent;

        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || documentElement;
      });
    }
  }); // Create scrollLeft and scrollTop methods

  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = "pageYOffset" === prop;

    jQuery.fn[method] = function (val) {
      return access(this, function (elem, method, val) {
        // Coalesce documents and windows
        var win;

        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }

        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }

        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  }); // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here

  jQuery.each(["top", "left"], function (i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop); // If curCSS returns percentage, fallback to offset

        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  }); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function (elem, type, value) {
          var doc;

          if (isWindow(elem)) {
            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          } // Get document width or height


          if (elem.nodeType === 9) {
            doc = elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest

            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }

          return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css(elem, type, extra) : // Set width or height on the element
          jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
    // Handle event binding
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.fn.extend({
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }
  }); // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon

  jQuery.proxy = function (fn, context) {
    var tmp, args, proxy;

    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    } // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.


    if (!isFunction(fn)) {
      return undefined;
    } // Simulated bind


    args = slice.call(arguments, 2);

    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    }; // Set the guid of unique handler to the same of original handler, so it can be removed


    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy;
  };

  jQuery.holdReady = function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };

  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;
  jQuery.now = Date.now;

  jQuery.isNumeric = function (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN(obj - parseFloat(obj));
  }; // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.
  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon


  if (typeof define === "function" && define.amd) {
    define("jquery", [], function () {
      return jQuery;
    });
  }

  var // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,
      // Map over the $ in case of overwrite
  _$ = window.$;

  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }

    return jQuery;
  }; // Expose jQuery and $ identifiers, even in AMD
  // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (#13566)


  if (!noGlobal) {
    window.jQuery = window.$ = jQuery;
  }

  return jQuery;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5zbGltLmpzIl0sIm5hbWVzIjpbImdsb2JhbCIsImZhY3RvcnkiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9jdW1lbnQiLCJ3IiwiRXJyb3IiLCJ3aW5kb3ciLCJub0dsb2JhbCIsImFyciIsImdldFByb3RvIiwiT2JqZWN0IiwiZ2V0UHJvdG90eXBlT2YiLCJzbGljZSIsImNvbmNhdCIsInB1c2giLCJpbmRleE9mIiwiY2xhc3MydHlwZSIsInRvU3RyaW5nIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJmblRvU3RyaW5nIiwiT2JqZWN0RnVuY3Rpb25TdHJpbmciLCJjYWxsIiwic3VwcG9ydCIsImlzRnVuY3Rpb24iLCJvYmoiLCJub2RlVHlwZSIsImlzV2luZG93IiwicHJlc2VydmVkU2NyaXB0QXR0cmlidXRlcyIsInR5cGUiLCJzcmMiLCJub25jZSIsIm5vTW9kdWxlIiwiRE9NRXZhbCIsImNvZGUiLCJub2RlIiwiZG9jIiwiaSIsInZhbCIsInNjcmlwdCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0IiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiaGVhZCIsImFwcGVuZENoaWxkIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidG9UeXBlIiwidmVyc2lvbiIsImpRdWVyeSIsInNlbGVjdG9yIiwiY29udGV4dCIsImZuIiwiaW5pdCIsInJ0cmltIiwicHJvdG90eXBlIiwianF1ZXJ5IiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJ0b0FycmF5IiwiZ2V0IiwibnVtIiwicHVzaFN0YWNrIiwiZWxlbXMiLCJyZXQiLCJtZXJnZSIsInByZXZPYmplY3QiLCJlYWNoIiwiY2FsbGJhY2siLCJtYXAiLCJlbGVtIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJmaXJzdCIsImVxIiwibGFzdCIsImxlbiIsImoiLCJlbmQiLCJzb3J0Iiwic3BsaWNlIiwiZXh0ZW5kIiwib3B0aW9ucyIsIm5hbWUiLCJjb3B5IiwiY29weUlzQXJyYXkiLCJjbG9uZSIsInRhcmdldCIsImRlZXAiLCJpc1BsYWluT2JqZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiZXhwYW5kbyIsIk1hdGgiLCJyYW5kb20iLCJyZXBsYWNlIiwiaXNSZWFkeSIsImVycm9yIiwibXNnIiwibm9vcCIsInByb3RvIiwiQ3RvciIsImlzRW1wdHlPYmplY3QiLCJnbG9iYWxFdmFsIiwiaXNBcnJheUxpa2UiLCJ0cmltIiwibWFrZUFycmF5IiwicmVzdWx0cyIsImluQXJyYXkiLCJzZWNvbmQiLCJncmVwIiwiaW52ZXJ0IiwiY2FsbGJhY2tJbnZlcnNlIiwibWF0Y2hlcyIsImNhbGxiYWNrRXhwZWN0IiwiYXJnIiwidmFsdWUiLCJndWlkIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwiU2l6emxlIiwiRXhwciIsImdldFRleHQiLCJpc1hNTCIsInRva2VuaXplIiwiY29tcGlsZSIsInNlbGVjdCIsIm91dGVybW9zdENvbnRleHQiLCJzb3J0SW5wdXQiLCJoYXNEdXBsaWNhdGUiLCJzZXREb2N1bWVudCIsImRvY0VsZW0iLCJkb2N1bWVudElzSFRNTCIsInJidWdneVFTQSIsInJidWdneU1hdGNoZXMiLCJjb250YWlucyIsIkRhdGUiLCJwcmVmZXJyZWREb2MiLCJkaXJydW5zIiwiZG9uZSIsImNsYXNzQ2FjaGUiLCJjcmVhdGVDYWNoZSIsInRva2VuQ2FjaGUiLCJjb21waWxlckNhY2hlIiwibm9ubmF0aXZlU2VsZWN0b3JDYWNoZSIsInNvcnRPcmRlciIsImEiLCJiIiwicG9wIiwicHVzaF9uYXRpdmUiLCJsaXN0IiwiYm9vbGVhbnMiLCJ3aGl0ZXNwYWNlIiwiaWRlbnRpZmllciIsImF0dHJpYnV0ZXMiLCJwc2V1ZG9zIiwicndoaXRlc3BhY2UiLCJSZWdFeHAiLCJyY29tbWEiLCJyY29tYmluYXRvcnMiLCJyZGVzY2VuZCIsInJwc2V1ZG8iLCJyaWRlbnRpZmllciIsIm1hdGNoRXhwciIsInJodG1sIiwicmlucHV0cyIsInJoZWFkZXIiLCJybmF0aXZlIiwicnF1aWNrRXhwciIsInJzaWJsaW5nIiwicnVuZXNjYXBlIiwiZnVuZXNjYXBlIiwiXyIsImVzY2FwZWQiLCJlc2NhcGVkV2hpdGVzcGFjZSIsImhpZ2giLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJyY3NzZXNjYXBlIiwiZmNzc2VzY2FwZSIsImNoIiwiYXNDb2RlUG9pbnQiLCJjaGFyQ29kZUF0IiwidW5sb2FkSGFuZGxlciIsImluRGlzYWJsZWRGaWVsZHNldCIsImFkZENvbWJpbmF0b3IiLCJkaXNhYmxlZCIsIm5vZGVOYW1lIiwiZGlyIiwibmV4dCIsImNoaWxkTm9kZXMiLCJlIiwiZWxzIiwic2VlZCIsIm0iLCJuaWQiLCJtYXRjaCIsImdyb3VwcyIsIm5ld1NlbGVjdG9yIiwibmV3Q29udGV4dCIsIm93bmVyRG9jdW1lbnQiLCJleGVjIiwiZ2V0RWxlbWVudEJ5SWQiLCJpZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInFzYSIsInRlc3QiLCJ0b1NlbGVjdG9yIiwiam9pbiIsInRlc3RDb250ZXh0IiwicXVlcnlTZWxlY3RvckFsbCIsInFzYUVycm9yIiwicmVtb3ZlQXR0cmlidXRlIiwia2V5cyIsImNhY2hlIiwia2V5IiwiY2FjaGVMZW5ndGgiLCJzaGlmdCIsIm1hcmtGdW5jdGlvbiIsImFzc2VydCIsImVsIiwiYWRkSGFuZGxlIiwiYXR0cnMiLCJoYW5kbGVyIiwiYXR0ckhhbmRsZSIsInNpYmxpbmdDaGVjayIsImN1ciIsImRpZmYiLCJzb3VyY2VJbmRleCIsIm5leHRTaWJsaW5nIiwiY3JlYXRlSW5wdXRQc2V1ZG8iLCJjcmVhdGVCdXR0b25Qc2V1ZG8iLCJjcmVhdGVEaXNhYmxlZFBzZXVkbyIsImlzRGlzYWJsZWQiLCJjcmVhdGVQb3NpdGlvbmFsUHNldWRvIiwiYXJndW1lbnQiLCJtYXRjaEluZGV4ZXMiLCJuYW1lc3BhY2UiLCJuYW1lc3BhY2VVUkkiLCJkb2N1bWVudEVsZW1lbnQiLCJoYXNDb21wYXJlIiwic3ViV2luZG93IiwiZGVmYXVsdFZpZXciLCJ0b3AiLCJhZGRFdmVudExpc3RlbmVyIiwiYXR0YWNoRXZlbnQiLCJjbGFzc05hbWUiLCJjcmVhdGVDb21tZW50IiwiZ2V0QnlJZCIsImdldEVsZW1lbnRzQnlOYW1lIiwiZmlsdGVyIiwiYXR0cklkIiwiZmluZCIsImdldEF0dHJpYnV0ZU5vZGUiLCJ0YWciLCJ0bXAiLCJpbm5lckhUTUwiLCJpbnB1dCIsIm1hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsIm1vek1hdGNoZXNTZWxlY3RvciIsIm9NYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsImRpc2Nvbm5lY3RlZE1hdGNoIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJhZG93biIsImJ1cCIsImNvbXBhcmUiLCJzb3J0RGV0YWNoZWQiLCJhdXAiLCJhcCIsImJwIiwidW5zaGlmdCIsImV4cHIiLCJlbGVtZW50cyIsImF0dHIiLCJzcGVjaWZpZWQiLCJlc2NhcGUiLCJzZWwiLCJ1bmlxdWVTb3J0IiwiZHVwbGljYXRlcyIsImRldGVjdER1cGxpY2F0ZXMiLCJzb3J0U3RhYmxlIiwidGV4dENvbnRlbnQiLCJmaXJzdENoaWxkIiwibm9kZVZhbHVlIiwic2VsZWN0b3JzIiwiY3JlYXRlUHNldWRvIiwicmVsYXRpdmUiLCJwcmVGaWx0ZXIiLCJleGNlc3MiLCJ1bnF1b3RlZCIsIm5vZGVOYW1lU2VsZWN0b3IiLCJwYXR0ZXJuIiwib3BlcmF0b3IiLCJjaGVjayIsInJlc3VsdCIsIndoYXQiLCJzaW1wbGUiLCJmb3J3YXJkIiwib2ZUeXBlIiwieG1sIiwidW5pcXVlQ2FjaGUiLCJvdXRlckNhY2hlIiwibm9kZUluZGV4Iiwic3RhcnQiLCJwYXJlbnQiLCJ1c2VDYWNoZSIsImxhc3RDaGlsZCIsInVuaXF1ZUlEIiwicHNldWRvIiwiYXJncyIsInNldEZpbHRlcnMiLCJpZHgiLCJtYXRjaGVkIiwibWF0Y2hlciIsInVubWF0Y2hlZCIsImxhbmciLCJlbGVtTGFuZyIsImhhc2giLCJsb2NhdGlvbiIsImFjdGl2ZUVsZW1lbnQiLCJoYXNGb2N1cyIsImhyZWYiLCJ0YWJJbmRleCIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkSW5kZXgiLCJyYWRpbyIsImNoZWNrYm94IiwiZmlsZSIsInBhc3N3b3JkIiwiaW1hZ2UiLCJzdWJtaXQiLCJyZXNldCIsImZpbHRlcnMiLCJwYXJzZU9ubHkiLCJ0b2tlbnMiLCJzb0ZhciIsInByZUZpbHRlcnMiLCJjYWNoZWQiLCJjb21iaW5hdG9yIiwiYmFzZSIsInNraXAiLCJjaGVja05vbkVsZW1lbnRzIiwiZG9uZU5hbWUiLCJvbGRDYWNoZSIsIm5ld0NhY2hlIiwiZWxlbWVudE1hdGNoZXIiLCJtYXRjaGVycyIsIm11bHRpcGxlQ29udGV4dHMiLCJjb250ZXh0cyIsImNvbmRlbnNlIiwibmV3VW5tYXRjaGVkIiwibWFwcGVkIiwic2V0TWF0Y2hlciIsInBvc3RGaWx0ZXIiLCJwb3N0RmluZGVyIiwicG9zdFNlbGVjdG9yIiwidGVtcCIsInByZU1hcCIsInBvc3RNYXAiLCJwcmVleGlzdGluZyIsIm1hdGNoZXJJbiIsIm1hdGNoZXJPdXQiLCJtYXRjaGVyRnJvbVRva2VucyIsImNoZWNrQ29udGV4dCIsImxlYWRpbmdSZWxhdGl2ZSIsImltcGxpY2l0UmVsYXRpdmUiLCJtYXRjaENvbnRleHQiLCJtYXRjaEFueUNvbnRleHQiLCJtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMiLCJlbGVtZW50TWF0Y2hlcnMiLCJzZXRNYXRjaGVycyIsImJ5U2V0IiwiYnlFbGVtZW50Iiwic3VwZXJNYXRjaGVyIiwib3V0ZXJtb3N0IiwibWF0Y2hlZENvdW50Iiwic2V0TWF0Y2hlZCIsImNvbnRleHRCYWNrdXAiLCJkaXJydW5zVW5pcXVlIiwidG9rZW4iLCJjb21waWxlZCIsImRlZmF1bHRWYWx1ZSIsInVuaXF1ZSIsImlzWE1MRG9jIiwiZXNjYXBlU2VsZWN0b3IiLCJ1bnRpbCIsInRydW5jYXRlIiwiaXMiLCJzaWJsaW5ncyIsIm4iLCJybmVlZHNDb250ZXh0IiwibmVlZHNDb250ZXh0IiwicnNpbmdsZVRhZyIsIndpbm5vdyIsInF1YWxpZmllciIsIm5vdCIsInNlbGYiLCJyb290alF1ZXJ5Iiwicm9vdCIsInBhcnNlSFRNTCIsInJlYWR5IiwicnBhcmVudHNwcmV2IiwiZ3VhcmFudGVlZFVuaXF1ZSIsImNoaWxkcmVuIiwiY29udGVudHMiLCJwcmV2IiwiaGFzIiwidGFyZ2V0cyIsImwiLCJjbG9zZXN0IiwiaW5kZXgiLCJwcmV2QWxsIiwiYWRkIiwiYWRkQmFjayIsInNpYmxpbmciLCJwYXJlbnRzIiwicGFyZW50c1VudGlsIiwibmV4dEFsbCIsIm5leHRVbnRpbCIsInByZXZVbnRpbCIsImNvbnRlbnREb2N1bWVudCIsImNvbnRlbnQiLCJyZXZlcnNlIiwicm5vdGh0bWx3aGl0ZSIsImNyZWF0ZU9wdGlvbnMiLCJvYmplY3QiLCJmbGFnIiwiQ2FsbGJhY2tzIiwiZmlyaW5nIiwibWVtb3J5IiwiZmlyZWQiLCJsb2NrZWQiLCJxdWV1ZSIsImZpcmluZ0luZGV4IiwiZmlyZSIsIm9uY2UiLCJzdG9wT25GYWxzZSIsInJlbW92ZSIsImVtcHR5IiwiZGlzYWJsZSIsImxvY2siLCJmaXJlV2l0aCIsIklkZW50aXR5IiwidiIsIlRocm93ZXIiLCJleCIsImFkb3B0VmFsdWUiLCJyZXNvbHZlIiwicmVqZWN0Iiwibm9WYWx1ZSIsIm1ldGhvZCIsInByb21pc2UiLCJmYWlsIiwidGhlbiIsIkRlZmVycmVkIiwiZnVuYyIsInR1cGxlcyIsInN0YXRlIiwiYWx3YXlzIiwiZGVmZXJyZWQiLCJwaXBlIiwiZm5zIiwibmV3RGVmZXIiLCJ0dXBsZSIsInJldHVybmVkIiwicHJvZ3Jlc3MiLCJub3RpZnkiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJvblByb2dyZXNzIiwibWF4RGVwdGgiLCJkZXB0aCIsInNwZWNpYWwiLCJ0aGF0IiwibWlnaHRUaHJvdyIsIlR5cGVFcnJvciIsIm5vdGlmeVdpdGgiLCJyZXNvbHZlV2l0aCIsInByb2Nlc3MiLCJleGNlcHRpb25Ib29rIiwic3RhY2tUcmFjZSIsInJlamVjdFdpdGgiLCJnZXRTdGFja0hvb2siLCJzZXRUaW1lb3V0Iiwic3RhdGVTdHJpbmciLCJ3aGVuIiwic2luZ2xlVmFsdWUiLCJyZW1haW5pbmciLCJyZXNvbHZlQ29udGV4dHMiLCJyZXNvbHZlVmFsdWVzIiwibWFzdGVyIiwidXBkYXRlRnVuYyIsInJlcnJvck5hbWVzIiwic3RhY2siLCJjb25zb2xlIiwid2FybiIsIm1lc3NhZ2UiLCJyZWFkeUV4Y2VwdGlvbiIsInJlYWR5TGlzdCIsImNhdGNoIiwicmVhZHlXYWl0Iiwid2FpdCIsImNvbXBsZXRlZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZWFkeVN0YXRlIiwiZG9TY3JvbGwiLCJhY2Nlc3MiLCJjaGFpbmFibGUiLCJlbXB0eUdldCIsInJhdyIsImJ1bGsiLCJybXNQcmVmaXgiLCJyZGFzaEFscGhhIiwiZmNhbWVsQ2FzZSIsImFsbCIsImxldHRlciIsInRvVXBwZXJDYXNlIiwiY2FtZWxDYXNlIiwic3RyaW5nIiwiYWNjZXB0RGF0YSIsIm93bmVyIiwiRGF0YSIsInVpZCIsImRlZmluZVByb3BlcnR5IiwiY29uZmlndXJhYmxlIiwic2V0IiwiZGF0YSIsInByb3AiLCJoYXNEYXRhIiwiZGF0YVByaXYiLCJkYXRhVXNlciIsInJicmFjZSIsInJtdWx0aURhc2giLCJnZXREYXRhIiwiSlNPTiIsInBhcnNlIiwiZGF0YUF0dHIiLCJyZW1vdmVEYXRhIiwiX2RhdGEiLCJfcmVtb3ZlRGF0YSIsImRlcXVldWUiLCJzdGFydExlbmd0aCIsImhvb2tzIiwiX3F1ZXVlSG9va3MiLCJzdG9wIiwic2V0dGVyIiwiY2xlYXJRdWV1ZSIsImNvdW50IiwiZGVmZXIiLCJwbnVtIiwic291cmNlIiwicmNzc051bSIsImNzc0V4cGFuZCIsImlzQXR0YWNoZWQiLCJjb21wb3NlZCIsImdldFJvb3ROb2RlIiwiaXNIaWRkZW5XaXRoaW5UcmVlIiwic3R5bGUiLCJkaXNwbGF5IiwiY3NzIiwic3dhcCIsIm9sZCIsImFkanVzdENTUyIsInZhbHVlUGFydHMiLCJ0d2VlbiIsImFkanVzdGVkIiwic2NhbGUiLCJtYXhJdGVyYXRpb25zIiwiY3VycmVudFZhbHVlIiwiaW5pdGlhbCIsInVuaXQiLCJjc3NOdW1iZXIiLCJpbml0aWFsSW5Vbml0IiwiZGVmYXVsdERpc3BsYXlNYXAiLCJnZXREZWZhdWx0RGlzcGxheSIsImJvZHkiLCJzaG93SGlkZSIsInNob3ciLCJ2YWx1ZXMiLCJoaWRlIiwidG9nZ2xlIiwicmNoZWNrYWJsZVR5cGUiLCJydGFnTmFtZSIsInJzY3JpcHRUeXBlIiwid3JhcE1hcCIsIm9wdGlvbiIsInRoZWFkIiwiY29sIiwidHIiLCJ0ZCIsIl9kZWZhdWx0Iiwib3B0Z3JvdXAiLCJ0Ym9keSIsInRmb290IiwiY29sZ3JvdXAiLCJjYXB0aW9uIiwidGgiLCJnZXRBbGwiLCJzZXRHbG9iYWxFdmFsIiwicmVmRWxlbWVudHMiLCJidWlsZEZyYWdtZW50Iiwic2NyaXB0cyIsInNlbGVjdGlvbiIsImlnbm9yZWQiLCJ3cmFwIiwiYXR0YWNoZWQiLCJmcmFnbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJub2RlcyIsImNyZWF0ZVRleHROb2RlIiwiaHRtbFByZWZpbHRlciIsImRpdiIsImNoZWNrQ2xvbmUiLCJjbG9uZU5vZGUiLCJub0Nsb25lQ2hlY2tlZCIsInJrZXlFdmVudCIsInJtb3VzZUV2ZW50IiwicnR5cGVuYW1lc3BhY2UiLCJyZXR1cm5UcnVlIiwicmV0dXJuRmFsc2UiLCJleHBlY3RTeW5jIiwic2FmZUFjdGl2ZUVsZW1lbnQiLCJlcnIiLCJvbiIsInR5cGVzIiwib25lIiwib3JpZ0ZuIiwiZXZlbnQiLCJvZmYiLCJoYW5kbGVPYmpJbiIsImV2ZW50SGFuZGxlIiwiZXZlbnRzIiwidCIsImhhbmRsZU9iaiIsImhhbmRsZXJzIiwibmFtZXNwYWNlcyIsIm9yaWdUeXBlIiwiZWxlbURhdGEiLCJoYW5kbGUiLCJ0cmlnZ2VyZWQiLCJkaXNwYXRjaCIsImRlbGVnYXRlVHlwZSIsImJpbmRUeXBlIiwiZGVsZWdhdGVDb3VudCIsInNldHVwIiwibWFwcGVkVHlwZXMiLCJvcmlnQ291bnQiLCJ0ZWFyZG93biIsInJlbW92ZUV2ZW50IiwibmF0aXZlRXZlbnQiLCJmaXgiLCJoYW5kbGVyUXVldWUiLCJkZWxlZ2F0ZVRhcmdldCIsInByZURpc3BhdGNoIiwiaXNQcm9wYWdhdGlvblN0b3BwZWQiLCJjdXJyZW50VGFyZ2V0IiwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQiLCJybmFtZXNwYWNlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwb3N0RGlzcGF0Y2giLCJtYXRjaGVkSGFuZGxlcnMiLCJtYXRjaGVkU2VsZWN0b3JzIiwiYnV0dG9uIiwiYWRkUHJvcCIsImhvb2siLCJFdmVudCIsImVudW1lcmFibGUiLCJvcmlnaW5hbEV2ZW50Iiwid3JpdGFibGUiLCJsb2FkIiwibm9CdWJibGUiLCJjbGljayIsImxldmVyYWdlTmF0aXZlIiwidHJpZ2dlciIsImJlZm9yZXVubG9hZCIsInJldHVyblZhbHVlIiwibm90QXN5bmMiLCJzYXZlZCIsImlzVHJpZ2dlciIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInByb3BzIiwiaXNEZWZhdWx0UHJldmVudGVkIiwiZGVmYXVsdFByZXZlbnRlZCIsInJlbGF0ZWRUYXJnZXQiLCJ0aW1lU3RhbXAiLCJub3ciLCJpc1NpbXVsYXRlZCIsImFsdEtleSIsImJ1YmJsZXMiLCJjYW5jZWxhYmxlIiwiY2hhbmdlZFRvdWNoZXMiLCJjdHJsS2V5IiwiZGV0YWlsIiwiZXZlbnRQaGFzZSIsIm1ldGFLZXkiLCJwYWdlWCIsInBhZ2VZIiwic2hpZnRLZXkiLCJ2aWV3IiwiY2hhckNvZGUiLCJrZXlDb2RlIiwiYnV0dG9ucyIsImNsaWVudFgiLCJjbGllbnRZIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJwb2ludGVySWQiLCJwb2ludGVyVHlwZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwidGFyZ2V0VG91Y2hlcyIsInRvRWxlbWVudCIsInRvdWNoZXMiLCJ3aGljaCIsImZvY3VzIiwiYmx1ciIsIm1vdXNlZW50ZXIiLCJtb3VzZWxlYXZlIiwicG9pbnRlcmVudGVyIiwicG9pbnRlcmxlYXZlIiwib3JpZyIsInJlbGF0ZWQiLCJyeGh0bWxUYWciLCJybm9Jbm5lcmh0bWwiLCJyY2hlY2tlZCIsInJjbGVhblNjcmlwdCIsIm1hbmlwdWxhdGlvblRhcmdldCIsImRpc2FibGVTY3JpcHQiLCJyZXN0b3JlU2NyaXB0IiwiY2xvbmVDb3B5RXZlbnQiLCJkZXN0IiwicGRhdGFPbGQiLCJwZGF0YUN1ciIsInVkYXRhT2xkIiwidWRhdGFDdXIiLCJmaXhJbnB1dCIsImRvbU1hbmlwIiwiY29sbGVjdGlvbiIsImhhc1NjcmlwdHMiLCJpTm9DbG9uZSIsInZhbHVlSXNGdW5jdGlvbiIsImh0bWwiLCJfZXZhbFVybCIsImtlZXBEYXRhIiwiY2xlYW5EYXRhIiwiZGF0YUFuZEV2ZW50cyIsImRlZXBEYXRhQW5kRXZlbnRzIiwic3JjRWxlbWVudHMiLCJkZXN0RWxlbWVudHMiLCJpblBhZ2UiLCJkZXRhY2giLCJhcHBlbmQiLCJwcmVwZW5kIiwiaW5zZXJ0QmVmb3JlIiwiYmVmb3JlIiwiYWZ0ZXIiLCJyZXBsYWNlV2l0aCIsInJlcGxhY2VDaGlsZCIsImFwcGVuZFRvIiwicHJlcGVuZFRvIiwiaW5zZXJ0QWZ0ZXIiLCJyZXBsYWNlQWxsIiwib3JpZ2luYWwiLCJpbnNlcnQiLCJybnVtbm9ucHgiLCJnZXRTdHlsZXMiLCJvcGVuZXIiLCJnZXRDb21wdXRlZFN0eWxlIiwicmJveFN0eWxlIiwiY29tcHV0ZVN0eWxlVGVzdHMiLCJjb250YWluZXIiLCJjc3NUZXh0IiwiZGl2U3R5bGUiLCJwaXhlbFBvc2l0aW9uVmFsIiwicmVsaWFibGVNYXJnaW5MZWZ0VmFsIiwicm91bmRQaXhlbE1lYXN1cmVzIiwibWFyZ2luTGVmdCIsInJpZ2h0IiwicGl4ZWxCb3hTdHlsZXNWYWwiLCJib3hTaXppbmdSZWxpYWJsZVZhbCIsIndpZHRoIiwicG9zaXRpb24iLCJzY3JvbGxib3hTaXplVmFsIiwib2Zmc2V0V2lkdGgiLCJtZWFzdXJlIiwicm91bmQiLCJwYXJzZUZsb2F0IiwiYmFja2dyb3VuZENsaXAiLCJjbGVhckNsb25lU3R5bGUiLCJib3hTaXppbmdSZWxpYWJsZSIsInBpeGVsQm94U3R5bGVzIiwicGl4ZWxQb3NpdGlvbiIsInJlbGlhYmxlTWFyZ2luTGVmdCIsInNjcm9sbGJveFNpemUiLCJjdXJDU1MiLCJjb21wdXRlZCIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYWRkR2V0SG9va0lmIiwiY29uZGl0aW9uRm4iLCJob29rRm4iLCJjc3NQcmVmaXhlcyIsImVtcHR5U3R5bGUiLCJ2ZW5kb3JQcm9wcyIsInZlbmRvclByb3BOYW1lIiwiY2FwTmFtZSIsImZpbmFsUHJvcE5hbWUiLCJmaW5hbCIsImNzc1Byb3BzIiwicmRpc3BsYXlzd2FwIiwicmN1c3RvbVByb3AiLCJjc3NTaG93IiwidmlzaWJpbGl0eSIsImNzc05vcm1hbFRyYW5zZm9ybSIsImxldHRlclNwYWNpbmciLCJmb250V2VpZ2h0Iiwic2V0UG9zaXRpdmVOdW1iZXIiLCJzdWJ0cmFjdCIsIm1heCIsImJveE1vZGVsQWRqdXN0bWVudCIsImRpbWVuc2lvbiIsImJveCIsImlzQm9yZGVyQm94Iiwic3R5bGVzIiwiY29tcHV0ZWRWYWwiLCJleHRyYSIsImRlbHRhIiwiY2VpbCIsImdldFdpZHRoT3JIZWlnaHQiLCJib3hTaXppbmdOZWVkZWQiLCJ2YWx1ZUlzQm9yZGVyQm94Iiwib2Zmc2V0UHJvcCIsImdldENsaWVudFJlY3RzIiwiY3NzSG9va3MiLCJvcGFjaXR5Iiwib3JpZ05hbWUiLCJpc0N1c3RvbVByb3AiLCJzZXRQcm9wZXJ0eSIsImlzRmluaXRlIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsYm94U2l6ZUJ1Z2d5IiwibGVmdCIsIm1hcmdpbiIsInBhZGRpbmciLCJib3JkZXIiLCJwcmVmaXgiLCJzdWZmaXgiLCJleHBhbmQiLCJleHBhbmRlZCIsInBhcnRzIiwiZGVsYXkiLCJ0aW1lIiwiZngiLCJzcGVlZHMiLCJ0aW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwib3B0IiwiY2hlY2tPbiIsIm9wdFNlbGVjdGVkIiwicmFkaW9WYWx1ZSIsImJvb2xIb29rIiwicmVtb3ZlQXR0ciIsIm5UeXBlIiwiYXR0ckhvb2tzIiwiYm9vbCIsImF0dHJOYW1lcyIsImdldHRlciIsImxvd2VyY2FzZU5hbWUiLCJyZm9jdXNhYmxlIiwicmNsaWNrYWJsZSIsInJlbW92ZVByb3AiLCJwcm9wRml4IiwicHJvcEhvb2tzIiwidGFiaW5kZXgiLCJwYXJzZUludCIsInN0cmlwQW5kQ29sbGFwc2UiLCJnZXRDbGFzcyIsImNsYXNzZXNUb0FycmF5IiwiYWRkQ2xhc3MiLCJjbGFzc2VzIiwiY3VyVmFsdWUiLCJjbGF6eiIsImZpbmFsVmFsdWUiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwic3RhdGVWYWwiLCJpc1ZhbGlkVmFsdWUiLCJjbGFzc05hbWVzIiwiaGFzQ2xhc3MiLCJycmV0dXJuIiwidmFsSG9va3MiLCJvcHRpb25TZXQiLCJmb2N1c2luIiwicmZvY3VzTW9ycGgiLCJzdG9wUHJvcGFnYXRpb25DYWxsYmFjayIsIm9ubHlIYW5kbGVycyIsImJ1YmJsZVR5cGUiLCJvbnR5cGUiLCJsYXN0RWxlbWVudCIsImV2ZW50UGF0aCIsInBhcmVudFdpbmRvdyIsInNpbXVsYXRlIiwidHJpZ2dlckhhbmRsZXIiLCJhdHRhY2hlcyIsInJicmFja2V0IiwickNSTEYiLCJyc3VibWl0dGVyVHlwZXMiLCJyc3VibWl0dGFibGUiLCJidWlsZFBhcmFtcyIsInRyYWRpdGlvbmFsIiwicGFyYW0iLCJzIiwidmFsdWVPckZ1bmN0aW9uIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic2VyaWFsaXplIiwic2VyaWFsaXplQXJyYXkiLCJ3cmFwQWxsIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJ3cmFwSW5uZXIiLCJodG1sSXNGdW5jdGlvbiIsInVud3JhcCIsImhpZGRlbiIsInZpc2libGUiLCJvZmZzZXRIZWlnaHQiLCJjcmVhdGVIVE1MRG9jdW1lbnQiLCJpbXBsZW1lbnRhdGlvbiIsImtlZXBTY3JpcHRzIiwicGFyc2VkIiwib2Zmc2V0Iiwic2V0T2Zmc2V0IiwiY3VyUG9zaXRpb24iLCJjdXJMZWZ0IiwiY3VyQ1NTVG9wIiwiY3VyVG9wIiwiY3VyT2Zmc2V0IiwiY3VyQ1NTTGVmdCIsImNhbGN1bGF0ZVBvc2l0aW9uIiwiY3VyRWxlbSIsInVzaW5nIiwicmVjdCIsIndpbiIsInBhZ2VZT2Zmc2V0IiwicGFnZVhPZmZzZXQiLCJvZmZzZXRQYXJlbnQiLCJwYXJlbnRPZmZzZXQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwic2Nyb2xsVG8iLCJIZWlnaHQiLCJXaWR0aCIsImRlZmF1bHRFeHRyYSIsImZ1bmNOYW1lIiwiaG92ZXIiLCJmbk92ZXIiLCJmbk91dCIsImJpbmQiLCJ1bmJpbmQiLCJkZWxlZ2F0ZSIsInVuZGVsZWdhdGUiLCJwcm94eSIsImhvbGRSZWFkeSIsImhvbGQiLCJwYXJzZUpTT04iLCJpc051bWVyaWMiLCJpc05hTiIsImRlZmluZSIsImFtZCIsIl9qUXVlcnkiLCJfJCIsIiQiLCJub0NvbmZsaWN0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztBQWFBLENBQUUsVUFBVUEsTUFBVixFQUFrQkMsT0FBbEIsRUFBNEI7QUFFN0I7O0FBRUEsTUFBSyxPQUFPQyxNQUFQLEtBQWtCLFFBQWxCLElBQThCLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBZCxLQUEwQixRQUE3RCxFQUF3RTtBQUV2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBRCxJQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUJILE1BQU0sQ0FBQ0ksUUFBUCxHQUNoQkgsT0FBTyxDQUFFRCxNQUFGLEVBQVUsSUFBVixDQURTLEdBRWhCLFVBQVVLLENBQVYsRUFBYztBQUNiLFVBQUssQ0FBQ0EsQ0FBQyxDQUFDRCxRQUFSLEVBQW1CO0FBQ2xCLGNBQU0sSUFBSUUsS0FBSixDQUFXLDBD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O0FBQ0E7QUFDQTs7O0FBRUEsTUFBSyxPQUFPczdCLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE1BQU0sQ0FBQ0MsR0FBNUMsRUFBa0Q7QUFDakRELElBQUFBLE1BQU0sQ0FBRSxRQUFGLEVBQVksRUFBWixFQUFnQixZQUFXO0FBQ2hDLGFBQU83NUIsTUFBUDtBQUNBLEtBRkssQ0FBTjtBQUdBOztBQUtELE1BRUM7QUFDQSs1QixFQUFBQSxPQUFPLEdBQUczOEIsTUFBTSxDQUFDNEMsTUFIbEI7QUFBQSxNQUtDO0FBQ0FnNkIsRUFBQUEsRUFBRSxHQUFHNThCLE1BQU0sQ0FBQzY4QixDQU5iOztBQVFBajZCLEVBQUFBLE1BQU0sQ0FBQ2s2QixVQUFQLEdBQW9CLFVBQVUzM0IsSUFBVixFQUFpQjtBQUNwQyxRQUFLbkYsTUFBTSxDQUFDNjhCLENBQVAsS0FBYWo2QixNQUFsQixFQUEyQjtBQUMxQjVDLE1BQUFBLE1BQU0sQ0FBQzY4QixDQUFQLEdBQVdELEVBQVg7QUFDQTs7QUFFRCxRQUFLejNCLElBQUksSUFBSW5GLE1BQU0sQ0FBQzRDLE1BQVAsS0FBa0JBLE1BQS9CLEVBQXdDO0FBQ3ZDNUMsTUFBQUEsTUFBTSxDQUFDNEMsTUFBUCxHQUFnQis1QixPQUFoQjtBQUNBOztBQUVELFdBQU8vNUIsTUFBUDtBQUNBLEdBVkQsQ0FodlFpRixDQTR2UWpGO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBSyxDQUFDM0MsUUFBTixFQUFpQjtBQUNoQkQsSUFBQUEsTUFBTSxDQUFDNEMsTUFBUCxHQUFnQjVDLE1BQU0sQ0FBQzY4QixDQUFQLEdBQVdqNkIsTUFBM0I7QUFDQTs7QUFLRCxTQUFPQSxNQUFQO0FBQ0MsQ0FqeVFEIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYzLjQuMSAtYWpheCwtYWpheC9qc29ucCwtYWpheC9sb2FkLC1hamF4L3BhcnNlWE1MLC1hamF4L3NjcmlwdCwtYWpheC92YXIvbG9jYXRpb24sLWFqYXgvdmFyL25vbmNlLC1hamF4L3Zhci9ycXVlcnksLWFqYXgveGhyLC1tYW5pcHVsYXRpb24vX2V2YWxVcmwsLWV2ZW50L2FqYXgsLWVmZmVjdHMsLWVmZmVjdHMvVHdlZW4sLWVmZmVjdHMvYW5pbWF0ZWRTZWxlY3RvclxuICogaHR0cHM6Ly9qcXVlcnkuY29tL1xuICpcbiAqIEluY2x1ZGVzIFNpenpsZS5qc1xuICogaHR0cHM6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IEpTIEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTktMDUtMDFUMjE6MDRaXG4gKi9cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRpZiAoIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gRm9yIENvbW1vbkpTIGFuZCBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB3aGVyZSBhIHByb3BlciBgd2luZG93YFxuXHRcdC8vIGlzIHByZXNlbnQsIGV4ZWN1dGUgdGhlIGZhY3RvcnkgYW5kIGdldCBqUXVlcnkuXG5cdFx0Ly8gRm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBoYXZlIGEgYHdpbmRvd2Agd2l0aCBhIGBkb2N1bWVudGBcblx0XHQvLyAoc3VjaCBhcyBOb2RlLmpzKSwgZXhwb3NlIGEgZmFjdG9yeSBhcyBtb2R1bGUuZXhwb3J0cy5cblx0XHQvLyBUaGlzIGFjY2VudHVhdGVzIHRoZSBuZWVkIGZvciB0aGUgY3JlYXRpb24gb2YgYSByZWFsIGB3aW5kb3dgLlxuXHRcdC8vIGUuZy4gdmFyIGpRdWVyeSA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcblx0XHQvLyBTZWUgdGlja2V0ICMxNDU0OSBmb3IgbW9yZSBpbmZvLlxuXHRcdG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmRvY3VtZW50ID9cblx0XHRcdGZhY3RvcnkoIGdsb2JhbCwgdHJ1ZSApIDpcblx0XHRcdGZ1bmN0aW9uKCB3ICkge1xuXHRcdFx0XHRpZiAoICF3LmRvY3VtZW50ICkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFjdG9yeSggdyApO1xuXHRcdFx0fTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KCBnbG9iYWwgKTtcblx0fVxuXG4vLyBQYXNzIHRoaXMgaWYgd2luZG93IGlzIG5vdCBkZWZpbmVkIHlldFxufSApKCB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oIHdpbmRvdywgbm9HbG9iYWwgKSB7XG5cbi8vIEVkZ2UgPD0gMTIgLSAxMyssIEZpcmVmb3ggPD0xOCAtIDQ1KywgSUUgMTAgLSAxMSwgU2FmYXJpIDUuMSAtIDkrLCBpT1MgNiAtIDkuMVxuLy8gdGhyb3cgZXhjZXB0aW9ucyB3aGVuIG5vbi1zdHJpY3QgY29kZSAoZS5nLiwgQVNQLk5FVCA0LjUpIGFjY2Vzc2VzIHN0cmljdCBtb2RlXG4vLyBhcmd1bWVudHMuY2FsbGVlLmNhbGxlciAodHJhYy0xMzMzNSkuIEJ1dCBhcyBvZiBqUXVlcnkgMy4wICgyMDE2KSwgc3RyaWN0IG1vZGUgc2hvdWxkIGJlIGNvbW1vblxuLy8gZW5vdWdoIHRoYXQgYWxsIHN1Y2ggYXR0ZW1wdHMgYXJlIGd1YXJkZWQgaW4gYSB0cnkgYmxvY2suXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFyciA9IFtdO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxudmFyIHNsaWNlID0gYXJyLnNsaWNlO1xuXG52YXIgY29uY2F0ID0gYXJyLmNvbmNhdDtcblxudmFyIHB1c2ggPSBhcnIucHVzaDtcblxudmFyIGluZGV4T2YgPSBhcnIuaW5kZXhPZjtcblxudmFyIGNsYXNzMnR5cGUgPSB7fTtcblxudmFyIHRvU3RyaW5nID0gY2xhc3MydHlwZS50b1N0cmluZztcblxudmFyIGhhc093biA9IGNsYXNzMnR5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmblRvU3RyaW5nID0gaGFzT3duLnRvU3RyaW5nO1xuXG52YXIgT2JqZWN0RnVuY3Rpb25TdHJpbmcgPSBmblRvU3RyaW5nLmNhbGwoIE9iamVjdCApO1xuXG52YXIgc3VwcG9ydCA9IHt9O1xuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzRnVuY3Rpb24oIG9iaiApIHtcblxuICAgICAgLy8gU3VwcG9ydDogQ2hyb21lIDw9NTcsIEZpcmVmb3ggPD01MlxuICAgICAgLy8gSW4gc29tZSBicm93c2VycywgdHlwZW9mIHJldHVybnMgXCJmdW5jdGlvblwiIGZvciBIVE1MIDxvYmplY3Q+IGVsZW1lbnRzXG4gICAgICAvLyAoaS5lLiwgYHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcIm9iamVjdFwiICkgPT09IFwiZnVuY3Rpb25cImApLlxuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBjbGFzc2lmeSAqYW55KiBET00gbm9kZSBhcyBhIGZ1bmN0aW9uLlxuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2Ygb2JqLm5vZGVUeXBlICE9PSBcIm51bWJlclwiO1xuICB9O1xuXG5cbnZhciBpc1dpbmRvdyA9IGZ1bmN0aW9uIGlzV2luZG93KCBvYmogKSB7XG5cdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqLndpbmRvdztcblx0fTtcblxuXG5cblxuXHR2YXIgcHJlc2VydmVkU2NyaXB0QXR0cmlidXRlcyA9IHtcblx0XHR0eXBlOiB0cnVlLFxuXHRcdHNyYzogdHJ1ZSxcblx0XHRub25jZTogdHJ1ZSxcblx0XHRub01vZHVsZTogdHJ1ZVxuXHR9O1xuXG5cdGZ1bmN0aW9uIERPTUV2YWwoIGNvZGUsIG5vZGUsIGRvYyApIHtcblx0XHRkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG5cblx0XHR2YXIgaSwgdmFsLFxuXHRcdFx0c2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoIFwic2NyaXB0XCIgKTtcblxuXHRcdHNjcmlwdC50ZXh0ID0gY29kZTtcblx0XHRpZiAoIG5vZGUgKSB7XG5cdFx0XHRmb3IgKCBpIGluIHByZXNlcnZlZFNjcmlwdEF0dHJpYnV0ZXMgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA2NCssIEVkZ2UgMTgrXG5cdFx0XHRcdC8vIFNvbWUgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCB0aGUgXCJub25jZVwiIHByb3BlcnR5IG9uIHNjcmlwdHMuXG5cdFx0XHRcdC8vIE9uIHRoZSBvdGhlciBoYW5kLCBqdXN0IHVzaW5nIGBnZXRBdHRyaWJ1dGVgIGlzIG5vdCBlbm91Z2ggYXNcblx0XHRcdFx0Ly8gdGhlIGBub25jZWAgYXR0cmlidXRlIGlzIHJlc2V0IHRvIGFuIGVtcHR5IHN0cmluZyB3aGVuZXZlciBpdFxuXHRcdFx0XHQvLyBiZWNvbWVzIGJyb3dzaW5nLWNvbnRleHQgY29ubmVjdGVkLlxuXHRcdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3doYXR3Zy9odG1sL2lzc3Vlcy8yMzY5XG5cdFx0XHRcdC8vIFNlZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnLyNub25jZS1hdHRyaWJ1dGVzXG5cdFx0XHRcdC8vIFRoZSBgbm9kZS5nZXRBdHRyaWJ1dGVgIGNoZWNrIHdhcyBhZGRlZCBmb3IgdGhlIHNha2Ugb2Zcblx0XHRcdFx0Ly8gYGpRdWVyeS5nbG9iYWxFdmFsYCBzbyB0aGF0IGl0IGNhbiBmYWtlIGEgbm9uY2UtY29udGFpbmluZyBub2RlXG5cdFx0XHRcdC8vIHZpYSBhbiBvYmplY3QuXG5cdFx0XHRcdHZhbCA9IG5vZGVbIGkgXSB8fCBub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZSggaSApO1xuXHRcdFx0XHRpZiAoIHZhbCApIHtcblx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKCBpLCB2YWwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRkb2MuaGVhZC5hcHBlbmRDaGlsZCggc2NyaXB0ICkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggc2NyaXB0ICk7XG5cdH1cblxuXG5mdW5jdGlvbiB0b1R5cGUoIG9iaiApIHtcblx0aWYgKCBvYmogPT0gbnVsbCApIHtcblx0XHRyZXR1cm4gb2JqICsgXCJcIjtcblx0fVxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seSAoZnVuY3Rpb25pc2ggUmVnRXhwKVxuXHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgP1xuXHRcdGNsYXNzMnR5cGVbIHRvU3RyaW5nLmNhbGwoIG9iaiApIF0gfHwgXCJvYmplY3RcIiA6XG5cdFx0dHlwZW9mIG9iajtcbn1cbi8qIGdsb2JhbCBTeW1ib2wgKi9cbi8vIERlZmluaW5nIHRoaXMgZ2xvYmFsIGluIC5lc2xpbnRyYy5qc29uIHdvdWxkIGNyZWF0ZSBhIGRhbmdlciBvZiB1c2luZyB0aGUgZ2xvYmFsXG4vLyB1bmd1YXJkZWQgaW4gYW5vdGhlciBwbGFjZSwgaXQgc2VlbXMgc2FmZXIgdG8gZGVmaW5lIGdsb2JhbCBvbmx5IGZvciB0aGlzIG1vZHVsZVxuXG5cblxudmFyXG5cdHZlcnNpb24gPSBcIjMuNC4xIC1hamF4LC1hamF4L2pzb25wLC1hamF4L2xvYWQsLWFqYXgvcGFyc2VYTUwsLWFqYXgvc2NyaXB0LC1hamF4L3Zhci9sb2NhdGlvbiwtYWpheC92YXIvbm9uY2UsLWFqYXgvdmFyL3JxdWVyeSwtYWpheC94aHIsLW1hbmlwdWxhdGlvbi9fZXZhbFVybCwtZXZlbnQvYWpheCwtZWZmZWN0cywtZWZmZWN0cy9Ud2VlbiwtZWZmZWN0cy9hbmltYXRlZFNlbGVjdG9yXCIsXG5cblx0Ly8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcblx0alF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXG5cdFx0Ly8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXG5cdFx0Ly8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5mbi5pbml0KCBzZWxlY3RvciwgY29udGV4dCApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seVxuXHQvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1Bcblx0cnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cbmpRdWVyeS5mbiA9IGpRdWVyeS5wcm90b3R5cGUgPSB7XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBqUXVlcnkgYmVpbmcgdXNlZFxuXHRqcXVlcnk6IHZlcnNpb24sXG5cblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblxuXHQvLyBUaGUgZGVmYXVsdCBsZW5ndGggb2YgYSBqUXVlcnkgb2JqZWN0IGlzIDBcblx0bGVuZ3RoOiAwLFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdH0sXG5cblx0Ly8gR2V0IHRoZSBOdGggZWxlbWVudCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldCBPUlxuXHQvLyBHZXQgdGhlIHdob2xlIG1hdGNoZWQgZWxlbWVudCBzZXQgYXMgYSBjbGVhbiBhcnJheVxuXHRnZXQ6IGZ1bmN0aW9uKCBudW0gKSB7XG5cblx0XHQvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBpbiBhIGNsZWFuIGFycmF5XG5cdFx0aWYgKCBudW0gPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiBzbGljZS5jYWxsKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9uZSBlbGVtZW50IGZyb20gdGhlIHNldFxuXHRcdHJldHVybiBudW0gPCAwID8gdGhpc1sgbnVtICsgdGhpcy5sZW5ndGggXSA6IHRoaXNbIG51bSBdO1xuXHR9LFxuXG5cdC8vIFRha2UgYW4gYXJyYXkgb2YgZWxlbWVudHMgYW5kIHB1c2ggaXQgb250byB0aGUgc3RhY2tcblx0Ly8gKHJldHVybmluZyB0aGUgbmV3IG1hdGNoZWQgZWxlbWVudCBzZXQpXG5cdHB1c2hTdGFjazogZnVuY3Rpb24oIGVsZW1zICkge1xuXG5cdFx0Ly8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cblx0XHQvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuXHRcdHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuXHRcdC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHQvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuXHRlYWNoOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5lYWNoKCB0aGlzLCBjYWxsYmFjayApO1xuXHR9LFxuXG5cdG1hcDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5Lm1hcCggdGhpcywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdH0gKSApO1xuXHR9LFxuXG5cdHNsaWNlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHNsaWNlLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSApO1xuXHR9LFxuXG5cdGZpcnN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggMCApO1xuXHR9LFxuXG5cdGxhc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAtMSApO1xuXHR9LFxuXG5cdGVxOiBmdW5jdGlvbiggaSApIHtcblx0XHR2YXIgbGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRqID0gK2kgKyAoIGkgPCAwID8gbGVuIDogMCApO1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggaiA+PSAwICYmIGogPCBsZW4gPyBbIHRoaXNbIGogXSBdIDogW10gKTtcblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnByZXZPYmplY3QgfHwgdGhpcy5jb25zdHJ1Y3RvcigpO1xuXHR9LFxuXG5cdC8vIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cblx0Ly8gQmVoYXZlcyBsaWtlIGFuIEFycmF5J3MgbWV0aG9kLCBub3QgbGlrZSBhIGpRdWVyeSBtZXRob2QuXG5cdHB1c2g6IHB1c2gsXG5cdHNvcnQ6IGFyci5zb3J0LFxuXHRzcGxpY2U6IGFyci5zcGxpY2Vcbn07XG5cbmpRdWVyeS5leHRlbmQgPSBqUXVlcnkuZm4uZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIDAgXSB8fCB7fSxcblx0XHRpID0gMSxcblx0XHRsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHRcdGRlZXAgPSBmYWxzZTtcblxuXHQvLyBIYW5kbGUgYSBkZWVwIGNvcHkgc2l0dWF0aW9uXG5cdGlmICggdHlwZW9mIHRhcmdldCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblxuXHRcdC8vIFNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbIGkgXSB8fCB7fTtcblx0XHRpKys7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFpc0Z1bmN0aW9uKCB0YXJnZXQgKSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdC8vIEV4dGVuZCBqUXVlcnkgaXRzZWxmIGlmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHBhc3NlZFxuXHRpZiAoIGkgPT09IGxlbmd0aCApIHtcblx0XHR0YXJnZXQgPSB0aGlzO1xuXHRcdGktLTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKCBvcHRpb25zID0gYXJndW1lbnRzWyBpIF0gKSAhPSBudWxsICkge1xuXG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBPYmplY3QucHJvdG90eXBlIHBvbGx1dGlvblxuXHRcdFx0XHQvLyBQcmV2ZW50IG5ldmVyLWVuZGluZyBsb29wXG5cdFx0XHRcdGlmICggbmFtZSA9PT0gXCJfX3Byb3RvX19cIiB8fCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29weSApIHx8XG5cdFx0XHRcdFx0KCBjb3B5SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIGNvcHkgKSApICkgKSB7XG5cdFx0XHRcdFx0c3JjID0gdGFyZ2V0WyBuYW1lIF07XG5cblx0XHRcdFx0XHQvLyBFbnN1cmUgcHJvcGVyIHR5cGUgZm9yIHRoZSBzb3VyY2UgdmFsdWVcblx0XHRcdFx0XHRpZiAoIGNvcHlJc0FycmF5ICYmICFBcnJheS5pc0FycmF5KCBzcmMgKSApIHtcblx0XHRcdFx0XHRcdGNsb25lID0gW107XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggIWNvcHlJc0FycmF5ICYmICFqUXVlcnkuaXNQbGFpbk9iamVjdCggc3JjICkgKSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHt9O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblxuXHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0galF1ZXJ5LmV4dGVuZCggZGVlcCwgY2xvbmUsIGNvcHkgKTtcblxuXHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNvcHkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGNvcHk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuXHRyZXR1cm4gdGFyZ2V0O1xufTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXG5cdC8vIFVuaXF1ZSBmb3IgZWFjaCBjb3B5IG9mIGpRdWVyeSBvbiB0aGUgcGFnZVxuXHRleHBhbmRvOiBcImpRdWVyeVwiICsgKCB2ZXJzaW9uICsgTWF0aC5yYW5kb20oKSApLnJlcGxhY2UoIC9cXEQvZywgXCJcIiApLFxuXG5cdC8vIEFzc3VtZSBqUXVlcnkgaXMgcmVhZHkgd2l0aG91dCB0aGUgcmVhZHkgbW9kdWxlXG5cdGlzUmVhZHk6IHRydWUsXG5cblx0ZXJyb3I6IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBtc2cgKTtcblx0fSxcblxuXHRub29wOiBmdW5jdGlvbigpIHt9LFxuXG5cdGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIHByb3RvLCBDdG9yO1xuXG5cdFx0Ly8gRGV0ZWN0IG9idmlvdXMgbmVnYXRpdmVzXG5cdFx0Ly8gVXNlIHRvU3RyaW5nIGluc3RlYWQgb2YgalF1ZXJ5LnR5cGUgdG8gY2F0Y2ggaG9zdCBvYmplY3RzXG5cdFx0aWYgKCAhb2JqIHx8IHRvU3RyaW5nLmNhbGwoIG9iaiApICE9PSBcIltvYmplY3QgT2JqZWN0XVwiICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHByb3RvID0gZ2V0UHJvdG8oIG9iaiApO1xuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIG5vIHByb3RvdHlwZSAoZS5nLiwgYE9iamVjdC5jcmVhdGUoIG51bGwgKWApIGFyZSBwbGFpblxuXHRcdGlmICggIXByb3RvICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gT2JqZWN0cyB3aXRoIHByb3RvdHlwZSBhcmUgcGxhaW4gaWZmIHRoZXkgd2VyZSBjb25zdHJ1Y3RlZCBieSBhIGdsb2JhbCBPYmplY3QgZnVuY3Rpb25cblx0XHRDdG9yID0gaGFzT3duLmNhbGwoIHByb3RvLCBcImNvbnN0cnVjdG9yXCIgKSAmJiBwcm90by5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gdHlwZW9mIEN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBmblRvU3RyaW5nLmNhbGwoIEN0b3IgKSA9PT0gT2JqZWN0RnVuY3Rpb25TdHJpbmc7XG5cdH0sXG5cblx0aXNFbXB0eU9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHR2YXIgbmFtZTtcblxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHQvLyBFdmFsdWF0ZXMgYSBzY3JpcHQgaW4gYSBnbG9iYWwgY29udGV4dFxuXHRnbG9iYWxFdmFsOiBmdW5jdGlvbiggY29kZSwgb3B0aW9ucyApIHtcblx0XHRET01FdmFsKCBjb2RlLCB7IG5vbmNlOiBvcHRpb25zICYmIG9wdGlvbnMubm9uY2UgfSApO1xuXHR9LFxuXG5cdGVhY2g6IGZ1bmN0aW9uKCBvYmosIGNhbGxiYWNrICkge1xuXHRcdHZhciBsZW5ndGgsIGkgPSAwO1xuXG5cdFx0aWYgKCBpc0FycmF5TGlrZSggb2JqICkgKSB7XG5cdFx0XHRsZW5ndGggPSBvYmoubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGlmICggY2FsbGJhY2suY2FsbCggb2JqWyBpIF0sIGksIG9ialsgaSBdICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGkgaW4gb2JqICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5XG5cdHRyaW06IGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XCJcIiA6XG5cdFx0XHQoIHRleHQgKyBcIlwiICkucmVwbGFjZSggcnRyaW0sIFwiXCIgKTtcblx0fSxcblxuXHQvLyByZXN1bHRzIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1ha2VBcnJheTogZnVuY3Rpb24oIGFyciwgcmVzdWx0cyApIHtcblx0XHR2YXIgcmV0ID0gcmVzdWx0cyB8fCBbXTtcblxuXHRcdGlmICggYXJyICE9IG51bGwgKSB7XG5cdFx0XHRpZiAoIGlzQXJyYXlMaWtlKCBPYmplY3QoIGFyciApICkgKSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LFxuXHRcdFx0XHRcdHR5cGVvZiBhcnIgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRcdFsgYXJyIF0gOiBhcnJcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0cmV0dXJuIGFyciA9PSBudWxsID8gLTEgOiBpbmRleE9mLmNhbGwoIGFyciwgZWxlbSwgaSApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbGVuID0gK3NlY29uZC5sZW5ndGgsXG5cdFx0XHRqID0gMCxcblx0XHRcdGkgPSBmaXJzdC5sZW5ndGg7XG5cblx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdGZpcnN0WyBpKysgXSA9IHNlY29uZFsgaiBdO1xuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ZXJ0ICkge1xuXHRcdHZhciBjYWxsYmFja0ludmVyc2UsXG5cdFx0XHRtYXRjaGVzID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdGNhbGxiYWNrRXhwZWN0ID0gIWludmVydDtcblxuXHRcdC8vIEdvIHRocm91Z2ggdGhlIGFycmF5LCBvbmx5IHNhdmluZyB0aGUgaXRlbXNcblx0XHQvLyB0aGF0IHBhc3MgdGhlIHZhbGlkYXRvciBmdW5jdGlvblxuXHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y2FsbGJhY2tJbnZlcnNlID0gIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGNhbGxiYWNrSW52ZXJzZSAhPT0gY2FsbGJhY2tFeHBlY3QgKSB7XG5cdFx0XHRcdG1hdGNoZXMucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBtYXRjaGVzO1xuXHR9LFxuXG5cdC8vIGFyZyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGFyZyApIHtcblx0XHR2YXIgbGVuZ3RoLCB2YWx1ZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0cmV0ID0gW107XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXIgbmV3IHZhbHVlc1xuXHRcdGlmICggaXNBcnJheUxpa2UoIGVsZW1zICkgKSB7XG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGg7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBHbyB0aHJvdWdoIGV2ZXJ5IGtleSBvbiB0aGUgb2JqZWN0LFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIGVsZW1zICkge1xuXHRcdFx0XHR2YWx1ZSA9IGNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpLCBhcmcgKTtcblxuXHRcdFx0XHRpZiAoIHZhbHVlICE9IG51bGwgKSB7XG5cdFx0XHRcdFx0cmV0LnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0cmV0dXJuIGNvbmNhdC5hcHBseSggW10sIHJldCApO1xuXHR9LFxuXG5cdC8vIEEgZ2xvYmFsIEdVSUQgY291bnRlciBmb3Igb2JqZWN0c1xuXHRndWlkOiAxLFxuXG5cdC8vIGpRdWVyeS5zdXBwb3J0IGlzIG5vdCB1c2VkIGluIENvcmUgYnV0IG90aGVyIHByb2plY3RzIGF0dGFjaCB0aGVpclxuXHQvLyBwcm9wZXJ0aWVzIHRvIGl0IHNvIGl0IG5lZWRzIHRvIGV4aXN0LlxuXHRzdXBwb3J0OiBzdXBwb3J0XG59ICk7XG5cbmlmICggdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRqUXVlcnkuZm5bIFN5bWJvbC5pdGVyYXRvciBdID0gYXJyWyBTeW1ib2wuaXRlcmF0b3IgXTtcbn1cblxuLy8gUG9wdWxhdGUgdGhlIGNsYXNzMnR5cGUgbWFwXG5qUXVlcnkuZWFjaCggXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yIFN5bWJvbFwiLnNwbGl0KCBcIiBcIiApLFxuZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSApO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZSggb2JqICkge1xuXG5cdC8vIFN1cHBvcnQ6IHJlYWwgaU9TIDguMiBvbmx5IChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcblx0Ly8gYGluYCBjaGVjayB1c2VkIHRvIHByZXZlbnQgSklUIGVycm9yIChnaC0yMTQ1KVxuXHQvLyBoYXNPd24gaXNuJ3QgdXNlZCBoZXJlIGR1ZSB0byBmYWxzZSBuZWdhdGl2ZXNcblx0Ly8gcmVnYXJkaW5nIE5vZGVsaXN0IGxlbmd0aCBpbiBJRVxuXHR2YXIgbGVuZ3RoID0gISFvYmogJiYgXCJsZW5ndGhcIiBpbiBvYmogJiYgb2JqLmxlbmd0aCxcblx0XHR0eXBlID0gdG9UeXBlKCBvYmogKTtcblxuXHRpZiAoIGlzRnVuY3Rpb24oIG9iaiApIHx8IGlzV2luZG93KCBvYmogKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHlwZSA9PT0gXCJhcnJheVwiIHx8IGxlbmd0aCA9PT0gMCB8fFxuXHRcdHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgbGVuZ3RoID4gMCAmJiAoIGxlbmd0aCAtIDEgKSBpbiBvYmo7XG59XG52YXIgU2l6emxlID1cbi8qIVxuICogU2l6emxlIENTUyBTZWxlY3RvciBFbmdpbmUgdjIuMy40XG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vanMuZm91bmRhdGlvbi9cbiAqXG4gKiBEYXRlOiAyMDE5LTA0LTA4XG4gKi9cbihmdW5jdGlvbiggd2luZG93ICkge1xuXG52YXIgaSxcblx0c3VwcG9ydCxcblx0RXhwcixcblx0Z2V0VGV4dCxcblx0aXNYTUwsXG5cdHRva2VuaXplLFxuXHRjb21waWxlLFxuXHRzZWxlY3QsXG5cdG91dGVybW9zdENvbnRleHQsXG5cdHNvcnRJbnB1dCxcblx0aGFzRHVwbGljYXRlLFxuXG5cdC8vIExvY2FsIGRvY3VtZW50IHZhcnNcblx0c2V0RG9jdW1lbnQsXG5cdGRvY3VtZW50LFxuXHRkb2NFbGVtLFxuXHRkb2N1bWVudElzSFRNTCxcblx0cmJ1Z2d5UVNBLFxuXHRyYnVnZ3lNYXRjaGVzLFxuXHRtYXRjaGVzLFxuXHRjb250YWlucyxcblxuXHQvLyBJbnN0YW5jZS1zcGVjaWZpYyBkYXRhXG5cdGV4cGFuZG8gPSBcInNpenpsZVwiICsgMSAqIG5ldyBEYXRlKCksXG5cdHByZWZlcnJlZERvYyA9IHdpbmRvdy5kb2N1bWVudCxcblx0ZGlycnVucyA9IDAsXG5cdGRvbmUgPSAwLFxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0dG9rZW5DYWNoZSA9IGNyZWF0ZUNhY2hlKCksXG5cdGNvbXBpbGVyQ2FjaGUgPSBjcmVhdGVDYWNoZSgpLFxuXHRub25uYXRpdmVTZWxlY3RvckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcblx0c29ydE9yZGVyID0gZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0aWYgKCBhID09PSBiICkge1xuXHRcdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0Ly8gSW5zdGFuY2UgbWV0aG9kc1xuXHRoYXNPd24gPSAoe30pLmhhc093blByb3BlcnR5LFxuXHRhcnIgPSBbXSxcblx0cG9wID0gYXJyLnBvcCxcblx0cHVzaF9uYXRpdmUgPSBhcnIucHVzaCxcblx0cHVzaCA9IGFyci5wdXNoLFxuXHRzbGljZSA9IGFyci5zbGljZSxcblx0Ly8gVXNlIGEgc3RyaXBwZWQtZG93biBpbmRleE9mIGFzIGl0J3MgZmFzdGVyIHRoYW4gbmF0aXZlXG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS90aG9yLWluZGV4b2YtdnMtZm9yLzVcblx0aW5kZXhPZiA9IGZ1bmN0aW9uKCBsaXN0LCBlbGVtICkge1xuXHRcdHZhciBpID0gMCxcblx0XHRcdGxlbiA9IGxpc3QubGVuZ3RoO1xuXHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0aWYgKCBsaXN0W2ldID09PSBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdGJvb2xlYW5zID0gXCJjaGVja2VkfHNlbGVjdGVkfGFzeW5jfGF1dG9mb2N1c3xhdXRvcGxheXxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58aXNtYXB8bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZFwiLFxuXG5cdC8vIFJlZ3VsYXIgZXhwcmVzc2lvbnNcblxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXNlbGVjdG9ycy8jd2hpdGVzcGFjZVxuXHR3aGl0ZXNwYWNlID0gXCJbXFxcXHgyMFxcXFx0XFxcXHJcXFxcblxcXFxmXVwiLFxuXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCN2YWx1ZS1kZWYtaWRlbnRpZmllclxuXHRpZGVudGlmaWVyID0gXCIoPzpcXFxcXFxcXC58W1xcXFx3LV18W15cXDAtXFxcXHhhMF0pK1wiLFxuXG5cdC8vIEF0dHJpYnV0ZSBzZWxlY3RvcnM6IGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jYXR0cmlidXRlLXNlbGVjdG9yc1xuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGlkZW50aWZpZXIgKyBcIikoPzpcIiArIHdoaXRlc3BhY2UgK1xuXHRcdC8vIE9wZXJhdG9yIChjYXB0dXJlIDIpXG5cdFx0XCIqKFsqXiR8IX5dPz0pXCIgKyB3aGl0ZXNwYWNlICtcblx0XHQvLyBcIkF0dHJpYnV0ZSB2YWx1ZXMgbXVzdCBiZSBDU1MgaWRlbnRpZmllcnMgW2NhcHR1cmUgNV0gb3Igc3RyaW5ncyBbY2FwdHVyZSAzIG9yIGNhcHR1cmUgNF1cIlxuXHRcdFwiKig/OicoKD86XFxcXFxcXFwufFteXFxcXFxcXFwnXSkqKSd8XFxcIigoPzpcXFxcXFxcXC58W15cXFxcXFxcXFxcXCJdKSopXFxcInwoXCIgKyBpZGVudGlmaWVyICsgXCIpKXwpXCIgKyB3aGl0ZXNwYWNlICtcblx0XHRcIipcXFxcXVwiLFxuXG5cdHBzZXVkb3MgPSBcIjooXCIgKyBpZGVudGlmaWVyICsgXCIpKD86XFxcXCgoXCIgK1xuXHRcdC8vIFRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHNlbGVjdG9ycyBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBwcmVGaWx0ZXIsIHByZWZlciBhcmd1bWVudHM6XG5cdFx0Ly8gMS4gcXVvdGVkIChjYXB0dXJlIDM7IGNhcHR1cmUgNCBvciBjYXB0dXJlIDUpXG5cdFx0XCIoJygoPzpcXFxcXFxcXC58W15cXFxcXFxcXCddKSopJ3xcXFwiKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcXFxcIl0pKilcXFwiKXxcIiArXG5cdFx0Ly8gMi4gc2ltcGxlIChjYXB0dXJlIDYpXG5cdFx0XCIoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKVtcXFxcXV18XCIgKyBhdHRyaWJ1dGVzICsgXCIpKil8XCIgK1xuXHRcdC8vIDMuIGFueXRoaW5nIGVsc2UgKGNhcHR1cmUgMilcblx0XHRcIi4qXCIgK1xuXHRcdFwiKVxcXFwpfClcIixcblxuXHQvLyBMZWFkaW5nIGFuZCBub24tZXNjYXBlZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBjYXB0dXJpbmcgc29tZSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXJzIHByZWNlZGluZyB0aGUgbGF0dGVyXG5cdHJ3aGl0ZXNwYWNlID0gbmV3IFJlZ0V4cCggd2hpdGVzcGFjZSArIFwiK1wiLCBcImdcIiApLFxuXHRydHJpbSA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiK3woKD86XnxbXlxcXFxcXFxcXSkoPzpcXFxcXFxcXC4pKilcIiArIHdoaXRlc3BhY2UgKyBcIiskXCIsIFwiZ1wiICksXG5cblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXG5cdHJjb21iaW5hdG9ycyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKihbPit+XXxcIiArIHdoaXRlc3BhY2UgKyBcIilcIiArIHdoaXRlc3BhY2UgKyBcIipcIiApLFxuXHRyZGVzY2VuZCA9IG5ldyBSZWdFeHAoIHdoaXRlc3BhY2UgKyBcInw+XCIgKSxcblxuXHRycHNldWRvID0gbmV3IFJlZ0V4cCggcHNldWRvcyApLFxuXHRyaWRlbnRpZmllciA9IG5ldyBSZWdFeHAoIFwiXlwiICsgaWRlbnRpZmllciArIFwiJFwiICksXG5cblx0bWF0Y2hFeHByID0ge1xuXHRcdFwiSURcIjogbmV3IFJlZ0V4cCggXCJeIyhcIiArIGlkZW50aWZpZXIgKyBcIilcIiApLFxuXHRcdFwiQ0xBU1NcIjogbmV3IFJlZ0V4cCggXCJeXFxcXC4oXCIgKyBpZGVudGlmaWVyICsgXCIpXCIgKSxcblx0XHRcIlRBR1wiOiBuZXcgUmVnRXhwKCBcIl4oXCIgKyBpZGVudGlmaWVyICsgXCJ8WypdKVwiICksXG5cdFx0XCJBVFRSXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgYXR0cmlidXRlcyApLFxuXHRcdFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgcHNldWRvcyApLFxuXHRcdFwiQ0hJTERcIjogbmV3IFJlZ0V4cCggXCJeOihvbmx5fGZpcnN0fGxhc3R8bnRofG50aC1sYXN0KS0oY2hpbGR8b2YtdHlwZSkoPzpcXFxcKFwiICsgd2hpdGVzcGFjZSArXG5cdFx0XHRcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArIHdoaXRlc3BhY2UgK1xuXHRcdFx0XCIqKFxcXFxkKyl8KSlcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcKXwpXCIsIFwiaVwiICksXG5cdFx0XCJib29sXCI6IG5ldyBSZWdFeHAoIFwiXig/OlwiICsgYm9vbGVhbnMgKyBcIikkXCIsIFwiaVwiICksXG5cdFx0Ly8gRm9yIHVzZSBpbiBsaWJyYXJpZXMgaW1wbGVtZW50aW5nIC5pcygpXG5cdFx0Ly8gV2UgdXNlIHRoaXMgZm9yIFBPUyBtYXRjaGluZyBpbiBgc2VsZWN0YFxuXHRcdFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIiArXG5cdFx0XHR3aGl0ZXNwYWNlICsgXCIqKCg/Oi1cXFxcZCk/XFxcXGQqKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfCkoPz1bXi1dfCQpXCIsIFwiaVwiIClcblx0fSxcblxuXHRyaHRtbCA9IC9IVE1MJC9pLFxuXHRyaW5wdXRzID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaSxcblx0cmhlYWRlciA9IC9eaFxcZCQvaSxcblxuXHRybmF0aXZlID0gL15bXntdK1xce1xccypcXFtuYXRpdmUgXFx3LyxcblxuXHQvLyBFYXNpbHktcGFyc2VhYmxlL3JldHJpZXZhYmxlIElEIG9yIFRBRyBvciBDTEFTUyBzZWxlY3RvcnNcblx0cnF1aWNrRXhwciA9IC9eKD86IyhbXFx3LV0rKXwoXFx3Kyl8XFwuKFtcXHctXSspKSQvLFxuXG5cdHJzaWJsaW5nID0gL1srfl0vLFxuXG5cdC8vIENTUyBlc2NhcGVzXG5cdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3N5bmRhdGEuaHRtbCNlc2NhcGVkLWNoYXJhY3RlcnNcblx0cnVuZXNjYXBlID0gbmV3IFJlZ0V4cCggXCJcXFxcXFxcXChbXFxcXGRhLWZdezEsNn1cIiArIHdoaXRlc3BhY2UgKyBcIj98KFwiICsgd2hpdGVzcGFjZSArIFwiKXwuKVwiLCBcImlnXCIgKSxcblx0ZnVuZXNjYXBlID0gZnVuY3Rpb24oIF8sIGVzY2FwZWQsIGVzY2FwZWRXaGl0ZXNwYWNlICkge1xuXHRcdHZhciBoaWdoID0gXCIweFwiICsgZXNjYXBlZCAtIDB4MTAwMDA7XG5cdFx0Ly8gTmFOIG1lYW5zIG5vbi1jb2RlcG9pbnRcblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94PDI0XG5cdFx0Ly8gV29ya2Fyb3VuZCBlcnJvbmVvdXMgbnVtZXJpYyBpbnRlcnByZXRhdGlvbiBvZiArXCIweFwiXG5cdFx0cmV0dXJuIGhpZ2ggIT09IGhpZ2ggfHwgZXNjYXBlZFdoaXRlc3BhY2UgP1xuXHRcdFx0ZXNjYXBlZCA6XG5cdFx0XHRoaWdoIDwgMCA/XG5cdFx0XHRcdC8vIEJNUCBjb2RlcG9pbnRcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSggaGlnaCArIDB4MTAwMDAgKSA6XG5cdFx0XHRcdC8vIFN1cHBsZW1lbnRhbCBQbGFuZSBjb2RlcG9pbnQgKHN1cnJvZ2F0ZSBwYWlyKVxuXHRcdFx0XHRTdHJpbmcuZnJvbUNoYXJDb2RlKCBoaWdoID4+IDEwIHwgMHhEODAwLCBoaWdoICYgMHgzRkYgfCAweERDMDAgKTtcblx0fSxcblxuXHQvLyBDU1Mgc3RyaW5nL2lkZW50aWZpZXIgc2VyaWFsaXphdGlvblxuXHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI2NvbW1vbi1zZXJpYWxpemluZy1pZGlvbXNcblx0cmNzc2VzY2FwZSA9IC8oW1xcMC1cXHgxZlxceDdmXXxeLT9cXGQpfF4tJHxbXlxcMC1cXHgxZlxceDdmLVxcdUZGRkZcXHctXS9nLFxuXHRmY3NzZXNjYXBlID0gZnVuY3Rpb24oIGNoLCBhc0NvZGVQb2ludCApIHtcblx0XHRpZiAoIGFzQ29kZVBvaW50ICkge1xuXG5cdFx0XHQvLyBVKzAwMDAgTlVMTCBiZWNvbWVzIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVJcblx0XHRcdGlmICggY2ggPT09IFwiXFwwXCIgKSB7XG5cdFx0XHRcdHJldHVybiBcIlxcdUZGRkRcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udHJvbCBjaGFyYWN0ZXJzIGFuZCAoZGVwZW5kZW50IHVwb24gcG9zaXRpb24pIG51bWJlcnMgZ2V0IGVzY2FwZWQgYXMgY29kZSBwb2ludHNcblx0XHRcdHJldHVybiBjaC5zbGljZSggMCwgLTEgKSArIFwiXFxcXFwiICsgY2guY2hhckNvZGVBdCggY2gubGVuZ3RoIC0gMSApLnRvU3RyaW5nKCAxNiApICsgXCIgXCI7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXIgcG90ZW50aWFsbHktc3BlY2lhbCBBU0NJSSBjaGFyYWN0ZXJzIGdldCBiYWNrc2xhc2gtZXNjYXBlZFxuXHRcdHJldHVybiBcIlxcXFxcIiArIGNoO1xuXHR9LFxuXG5cdC8vIFVzZWQgZm9yIGlmcmFtZXNcblx0Ly8gU2VlIHNldERvY3VtZW50KClcblx0Ly8gUmVtb3ZpbmcgdGhlIGZ1bmN0aW9uIHdyYXBwZXIgY2F1c2VzIGEgXCJQZXJtaXNzaW9uIERlbmllZFwiXG5cdC8vIGVycm9yIGluIElFXG5cdHVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcblx0XHRzZXREb2N1bWVudCgpO1xuXHR9LFxuXG5cdGluRGlzYWJsZWRGaWVsZHNldCA9IGFkZENvbWJpbmF0b3IoXG5cdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZSAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiZmllbGRzZXRcIjtcblx0XHR9LFxuXHRcdHsgZGlyOiBcInBhcmVudE5vZGVcIiwgbmV4dDogXCJsZWdlbmRcIiB9XG5cdCk7XG5cbi8vIE9wdGltaXplIGZvciBwdXNoLmFwcGx5KCBfLCBOb2RlTGlzdCApXG50cnkge1xuXHRwdXNoLmFwcGx5KFxuXHRcdChhcnIgPSBzbGljZS5jYWxsKCBwcmVmZXJyZWREb2MuY2hpbGROb2RlcyApKSxcblx0XHRwcmVmZXJyZWREb2MuY2hpbGROb2Rlc1xuXHQpO1xuXHQvLyBTdXBwb3J0OiBBbmRyb2lkPDQuMFxuXHQvLyBEZXRlY3Qgc2lsZW50bHkgZmFpbGluZyBwdXNoLmFwcGx5XG5cdGFyclsgcHJlZmVycmVkRG9jLmNoaWxkTm9kZXMubGVuZ3RoIF0ubm9kZVR5cGU7XG59IGNhdGNoICggZSApIHtcblx0cHVzaCA9IHsgYXBwbHk6IGFyci5sZW5ndGggP1xuXG5cdFx0Ly8gTGV2ZXJhZ2Ugc2xpY2UgaWYgcG9zc2libGVcblx0XHRmdW5jdGlvbiggdGFyZ2V0LCBlbHMgKSB7XG5cdFx0XHRwdXNoX25hdGl2ZS5hcHBseSggdGFyZ2V0LCBzbGljZS5jYWxsKGVscykgKTtcblx0XHR9IDpcblxuXHRcdC8vIFN1cHBvcnQ6IElFPDlcblx0XHQvLyBPdGhlcndpc2UgYXBwZW5kIGRpcmVjdGx5XG5cdFx0ZnVuY3Rpb24oIHRhcmdldCwgZWxzICkge1xuXHRcdFx0dmFyIGogPSB0YXJnZXQubGVuZ3RoLFxuXHRcdFx0XHRpID0gMDtcblx0XHRcdC8vIENhbid0IHRydXN0IE5vZGVMaXN0Lmxlbmd0aFxuXHRcdFx0d2hpbGUgKCAodGFyZ2V0W2orK10gPSBlbHNbaSsrXSkgKSB7fVxuXHRcdFx0dGFyZ2V0Lmxlbmd0aCA9IGogLSAxO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gU2l6emxlKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0dmFyIG0sIGksIGVsZW0sIG5pZCwgbWF0Y2gsIGdyb3VwcywgbmV3U2VsZWN0b3IsXG5cdFx0bmV3Q29udGV4dCA9IGNvbnRleHQgJiYgY29udGV4dC5vd25lckRvY3VtZW50LFxuXG5cdFx0Ly8gbm9kZVR5cGUgZGVmYXVsdHMgdG8gOSwgc2luY2UgY29udGV4dCBkZWZhdWx0cyB0byBkb2N1bWVudFxuXHRcdG5vZGVUeXBlID0gY29udGV4dCA/IGNvbnRleHQubm9kZVR5cGUgOiA5O1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFJldHVybiBlYXJseSBmcm9tIGNhbGxzIHdpdGggaW52YWxpZCBzZWxlY3RvciBvciBjb250ZXh0XG5cdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiIHx8ICFzZWxlY3RvciB8fFxuXHRcdG5vZGVUeXBlICE9PSAxICYmIG5vZGVUeXBlICE9PSA5ICYmIG5vZGVUeXBlICE9PSAxMSApIHtcblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9XG5cblx0Ly8gVHJ5IHRvIHNob3J0Y3V0IGZpbmQgb3BlcmF0aW9ucyAoYXMgb3Bwb3NlZCB0byBmaWx0ZXJzKSBpbiBIVE1MIGRvY3VtZW50c1xuXHRpZiAoICFzZWVkICkge1xuXG5cdFx0aWYgKCAoIGNvbnRleHQgPyBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dCA6IHByZWZlcnJlZERvYyApICE9PSBkb2N1bWVudCApIHtcblx0XHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdFx0fVxuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0aWYgKCBkb2N1bWVudElzSFRNTCApIHtcblxuXHRcdFx0Ly8gSWYgdGhlIHNlbGVjdG9yIGlzIHN1ZmZpY2llbnRseSBzaW1wbGUsIHRyeSB1c2luZyBhIFwiZ2V0KkJ5KlwiIERPTSBtZXRob2Rcblx0XHRcdC8vIChleGNlcHRpbmcgRG9jdW1lbnRGcmFnbWVudCBjb250ZXh0LCB3aGVyZSB0aGUgbWV0aG9kcyBkb24ndCBleGlzdClcblx0XHRcdGlmICggbm9kZVR5cGUgIT09IDExICYmIChtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKSkgKSB7XG5cblx0XHRcdFx0Ly8gSUQgc2VsZWN0b3Jcblx0XHRcdFx0aWYgKCAobSA9IG1hdGNoWzFdKSApIHtcblxuXHRcdFx0XHRcdC8vIERvY3VtZW50IGNvbnRleHRcblx0XHRcdFx0XHRpZiAoIG5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0aWYgKCAoZWxlbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIG0gKSkgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogaWRlbnRpZnkgdmVyc2lvbnNcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0RWxlbWVudEJ5SWQgY2FuIG1hdGNoIGVsZW1lbnRzIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxuXHRcdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRWxlbWVudCBjb250ZXh0XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUsIE9wZXJhLCBXZWJraXRcblx0XHRcdFx0XHRcdC8vIFRPRE86IGlkZW50aWZ5IHZlcnNpb25zXG5cdFx0XHRcdFx0XHQvLyBnZXRFbGVtZW50QnlJZCBjYW4gbWF0Y2ggZWxlbWVudHMgYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIG5ld0NvbnRleHQgJiYgKGVsZW0gPSBuZXdDb250ZXh0LmdldEVsZW1lbnRCeUlkKCBtICkpICYmXG5cdFx0XHRcdFx0XHRcdGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICkgJiZcblx0XHRcdFx0XHRcdFx0ZWxlbS5pZCA9PT0gbSApIHtcblxuXHRcdFx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFR5cGUgc2VsZWN0b3Jcblx0XHRcdFx0fSBlbHNlIGlmICggbWF0Y2hbMl0gKSB7XG5cdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSApO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXG5cdFx0XHRcdC8vIENsYXNzIHNlbGVjdG9yXG5cdFx0XHRcdH0gZWxzZSBpZiAoIChtID0gbWF0Y2hbM10pICYmIHN1cHBvcnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSAmJlxuXHRcdFx0XHRcdGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVGFrZSBhZHZhbnRhZ2Ugb2YgcXVlcnlTZWxlY3RvckFsbFxuXHRcdFx0aWYgKCBzdXBwb3J0LnFzYSAmJlxuXHRcdFx0XHQhbm9ubmF0aXZlU2VsZWN0b3JDYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdICYmXG5cdFx0XHRcdCghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA4IG9ubHlcblx0XHRcdFx0Ly8gRXhjbHVkZSBvYmplY3QgZWxlbWVudHNcblx0XHRcdFx0KG5vZGVUeXBlICE9PSAxIHx8IGNvbnRleHQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJvYmplY3RcIikgKSB7XG5cblx0XHRcdFx0bmV3U2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0XHRcdFx0bmV3Q29udGV4dCA9IGNvbnRleHQ7XG5cblx0XHRcdFx0Ly8gcVNBIGNvbnNpZGVycyBlbGVtZW50cyBvdXRzaWRlIGEgc2NvcGluZyByb290IHdoZW4gZXZhbHVhdGluZyBjaGlsZCBvclxuXHRcdFx0XHQvLyBkZXNjZW5kYW50IGNvbWJpbmF0b3JzLCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50LlxuXHRcdFx0XHQvLyBJbiBzdWNoIGNhc2VzLCB3ZSB3b3JrIGFyb3VuZCB0aGUgYmVoYXZpb3IgYnkgcHJlZml4aW5nIGV2ZXJ5IHNlbGVjdG9yIGluIHRoZVxuXHRcdFx0XHQvLyBsaXN0IHdpdGggYW4gSUQgc2VsZWN0b3IgcmVmZXJlbmNpbmcgdGhlIHNjb3BlIGNvbnRleHQuXG5cdFx0XHRcdC8vIFRoYW5rcyB0byBBbmRyZXcgRHVwb250IGZvciB0aGlzIHRlY2huaXF1ZS5cblx0XHRcdFx0aWYgKCBub2RlVHlwZSA9PT0gMSAmJiByZGVzY2VuZC50ZXN0KCBzZWxlY3RvciApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2FwdHVyZSB0aGUgY29udGV4dCBJRCwgc2V0dGluZyBpdCBmaXJzdCBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRpZiAoIChuaWQgPSBjb250ZXh0LmdldEF0dHJpYnV0ZSggXCJpZFwiICkpICkge1xuXHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5zZXRBdHRyaWJ1dGUoIFwiaWRcIiwgKG5pZCA9IGV4cGFuZG8pICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGV2ZXJ5IHNlbGVjdG9yIGluIHRoZSBsaXN0XG5cdFx0XHRcdFx0Z3JvdXBzID0gdG9rZW5pemUoIHNlbGVjdG9yICk7XG5cdFx0XHRcdFx0aSA9IGdyb3Vwcy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRncm91cHNbaV0gPSBcIiNcIiArIG5pZCArIFwiIFwiICsgdG9TZWxlY3RvciggZ3JvdXBzW2ldICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5ld1NlbGVjdG9yID0gZ3JvdXBzLmpvaW4oIFwiLFwiICk7XG5cblx0XHRcdFx0XHQvLyBFeHBhbmQgY29udGV4dCBmb3Igc2libGluZyBzZWxlY3RvcnNcblx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHxcblx0XHRcdFx0XHRcdGNvbnRleHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsXG5cdFx0XHRcdFx0XHRuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIG5ld1NlbGVjdG9yIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdFx0XHR9IGNhdGNoICggcXNhRXJyb3IgKSB7XG5cdFx0XHRcdFx0bm9ubmF0aXZlU2VsZWN0b3JDYWNoZSggc2VsZWN0b3IsIHRydWUgKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRpZiAoIG5pZCA9PT0gZXhwYW5kbyApIHtcblx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKCBcImlkXCIgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBbGwgb3RoZXJzXG5cdHJldHVybiBzZWxlY3QoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApO1xufVxuXG4vKipcbiAqIENyZWF0ZSBrZXktdmFsdWUgY2FjaGVzIG9mIGxpbWl0ZWQgc2l6ZVxuICogQHJldHVybnMge2Z1bmN0aW9uKHN0cmluZywgb2JqZWN0KX0gUmV0dXJucyB0aGUgT2JqZWN0IGRhdGEgYWZ0ZXIgc3RvcmluZyBpdCBvbiBpdHNlbGYgd2l0aFxuICpcdHByb3BlcnR5IG5hbWUgdGhlIChzcGFjZS1zdWZmaXhlZCkgc3RyaW5nIGFuZCAoaWYgdGhlIGNhY2hlIGlzIGxhcmdlciB0aGFuIEV4cHIuY2FjaGVMZW5ndGgpXG4gKlx0ZGVsZXRpbmcgdGhlIG9sZGVzdCBlbnRyeVxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSgpIHtcblx0dmFyIGtleXMgPSBbXTtcblxuXHRmdW5jdGlvbiBjYWNoZSgga2V5LCB2YWx1ZSApIHtcblx0XHQvLyBVc2UgKGtleSArIFwiIFwiKSB0byBhdm9pZCBjb2xsaXNpb24gd2l0aCBuYXRpdmUgcHJvdG90eXBlIHByb3BlcnRpZXMgKHNlZSBJc3N1ZSAjMTU3KVxuXHRcdGlmICgga2V5cy5wdXNoKCBrZXkgKyBcIiBcIiApID4gRXhwci5jYWNoZUxlbmd0aCApIHtcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBrZXlzLnNoaWZ0KCkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIChjYWNoZVsga2V5ICsgXCIgXCIgXSA9IHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gY2FjaGU7XG59XG5cbi8qKlxuICogTWFyayBhIGZ1bmN0aW9uIGZvciBzcGVjaWFsIHVzZSBieSBTaXp6bGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXJrXG4gKi9cbmZ1bmN0aW9uIG1hcmtGdW5jdGlvbiggZm4gKSB7XG5cdGZuWyBleHBhbmRvIF0gPSB0cnVlO1xuXHRyZXR1cm4gZm47XG59XG5cbi8qKlxuICogU3VwcG9ydCB0ZXN0aW5nIHVzaW5nIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFBhc3NlZCB0aGUgY3JlYXRlZCBlbGVtZW50IGFuZCByZXR1cm5zIGEgYm9vbGVhbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0KCBmbiApIHtcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuXG5cdHRyeSB7XG5cdFx0cmV0dXJuICEhZm4oIGVsICk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZmluYWxseSB7XG5cdFx0Ly8gUmVtb3ZlIGZyb20gaXRzIHBhcmVudCBieSBkZWZhdWx0XG5cdFx0aWYgKCBlbC5wYXJlbnROb2RlICkge1xuXHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWwgKTtcblx0XHR9XG5cdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcblx0XHRlbCA9IG51bGw7XG5cdH1cbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBzYW1lIGhhbmRsZXIgZm9yIGFsbCBvZiB0aGUgc3BlY2lmaWVkIGF0dHJzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0cnMgUGlwZS1zZXBhcmF0ZWQgbGlzdCBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIFRoZSBtZXRob2QgdGhhdCB3aWxsIGJlIGFwcGxpZWRcbiAqL1xuZnVuY3Rpb24gYWRkSGFuZGxlKCBhdHRycywgaGFuZGxlciApIHtcblx0dmFyIGFyciA9IGF0dHJzLnNwbGl0KFwifFwiKSxcblx0XHRpID0gYXJyLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRFeHByLmF0dHJIYW5kbGVbIGFycltpXSBdID0gaGFuZGxlcjtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBkb2N1bWVudCBvcmRlciBvZiB0d28gc2libGluZ3NcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGxlc3MgdGhhbiAwIGlmIGEgcHJlY2VkZXMgYiwgZ3JlYXRlciB0aGFuIDAgaWYgYSBmb2xsb3dzIGJcbiAqL1xuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiICkge1xuXHR2YXIgY3VyID0gYiAmJiBhLFxuXHRcdGRpZmYgPSBjdXIgJiYgYS5ub2RlVHlwZSA9PT0gMSAmJiBiLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRhLnNvdXJjZUluZGV4IC0gYi5zb3VyY2VJbmRleDtcblxuXHQvLyBVc2UgSUUgc291cmNlSW5kZXggaWYgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcblx0aWYgKCBkaWZmICkge1xuXHRcdHJldHVybiBkaWZmO1xuXHR9XG5cblx0Ly8gQ2hlY2sgaWYgYiBmb2xsb3dzIGFcblx0aWYgKCBjdXIgKSB7XG5cdFx0d2hpbGUgKCAoY3VyID0gY3VyLm5leHRTaWJsaW5nKSApIHtcblx0XHRcdGlmICggY3VyID09PSBiICkge1xuXHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGEgPyAxIDogLTE7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBpbnB1dCB0eXBlc1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblBzZXVkbyggdHlwZSApIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiAobmFtZSA9PT0gXCJpbnB1dFwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCIpICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIDplbmFibGVkLzpkaXNhYmxlZFxuICogQHBhcmFtIHtCb29sZWFufSBkaXNhYmxlZCB0cnVlIGZvciA6ZGlzYWJsZWQ7IGZhbHNlIGZvciA6ZW5hYmxlZFxuICovXG5mdW5jdGlvbiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggZGlzYWJsZWQgKSB7XG5cblx0Ly8gS25vd24gOmRpc2FibGVkIGZhbHNlIHBvc2l0aXZlczogZmllbGRzZXRbZGlzYWJsZWRdID4gbGVnZW5kOm50aC1vZi10eXBlKG4rMikgOmNhbi1kaXNhYmxlXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE9ubHkgY2VydGFpbiBlbGVtZW50cyBjYW4gbWF0Y2ggOmVuYWJsZWQgb3IgOmRpc2FibGVkXG5cdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2NyaXB0aW5nLmh0bWwjc2VsZWN0b3ItZW5hYmxlZFxuXHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3NjcmlwdGluZy5odG1sI3NlbGVjdG9yLWRpc2FibGVkXG5cdFx0aWYgKCBcImZvcm1cIiBpbiBlbGVtICkge1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgaW5oZXJpdGVkIGRpc2FibGVkbmVzcyBvbiByZWxldmFudCBub24tZGlzYWJsZWQgZWxlbWVudHM6XG5cdFx0XHQvLyAqIGxpc3RlZCBmb3JtLWFzc29jaWF0ZWQgZWxlbWVudHMgaW4gYSBkaXNhYmxlZCBmaWVsZHNldFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxpc3RlZFxuXHRcdFx0Ly8gICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9mb3Jtcy5odG1sI2NvbmNlcHQtZmUtZGlzYWJsZWRcblx0XHRcdC8vICogb3B0aW9uIGVsZW1lbnRzIGluIGEgZGlzYWJsZWQgb3B0Z3JvdXBcblx0XHRcdC8vICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCNjb25jZXB0LW9wdGlvbi1kaXNhYmxlZFxuXHRcdFx0Ly8gQWxsIHN1Y2ggZWxlbWVudHMgaGF2ZSBhIFwiZm9ybVwiIHByb3BlcnR5LlxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbS5kaXNhYmxlZCA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0Ly8gT3B0aW9uIGVsZW1lbnRzIGRlZmVyIHRvIGEgcGFyZW50IG9wdGdyb3VwIGlmIHByZXNlbnRcblx0XHRcdFx0aWYgKCBcImxhYmVsXCIgaW4gZWxlbSApIHtcblx0XHRcdFx0XHRpZiAoIFwibGFiZWxcIiBpbiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5wYXJlbnROb2RlLmRpc2FibGVkID09PSBkaXNhYmxlZDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGRpc2FibGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDYgLSAxMVxuXHRcdFx0XHQvLyBVc2UgdGhlIGlzRGlzYWJsZWQgc2hvcnRjdXQgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGRpc2FibGVkIGZpZWxkc2V0IGFuY2VzdG9yc1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pc0Rpc2FibGVkID09PSBkaXNhYmxlZCB8fFxuXG5cdFx0XHRcdFx0Ly8gV2hlcmUgdGhlcmUgaXMgbm8gaXNEaXNhYmxlZCwgY2hlY2sgbWFudWFsbHlcblx0XHRcdFx0XHQvKiBqc2hpbnQgLVcwMTggKi9cblx0XHRcdFx0XHRlbGVtLmlzRGlzYWJsZWQgIT09ICFkaXNhYmxlZCAmJlxuXHRcdFx0XHRcdFx0aW5EaXNhYmxlZEZpZWxkc2V0KCBlbGVtICkgPT09IGRpc2FibGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cblx0XHQvLyBUcnkgdG8gd2lubm93IG91dCBlbGVtZW50cyB0aGF0IGNhbid0IGJlIGRpc2FibGVkIGJlZm9yZSB0cnVzdGluZyB0aGUgZGlzYWJsZWQgcHJvcGVydHkuXG5cdFx0Ly8gU29tZSB2aWN0aW1zIGdldCBjYXVnaHQgaW4gb3VyIG5ldCAobGFiZWwsIGxlZ2VuZCwgbWVudSwgdHJhY2spLCBidXQgaXQgc2hvdWxkbid0XG5cdFx0Ly8gZXZlbiBleGlzdCBvbiB0aGVtLCBsZXQgYWxvbmUgaGF2ZSBhIGJvb2xlYW4gdmFsdWUuXG5cdFx0fSBlbHNlIGlmICggXCJsYWJlbFwiIGluIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gZGlzYWJsZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtYWluaW5nIGVsZW1lbnRzIGFyZSBuZWl0aGVyIDplbmFibGVkIG5vciA6ZGlzYWJsZWRcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRvIHVzZSBpbiBwc2V1ZG9zIGZvciBwb3NpdGlvbmFsc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb25hbFBzZXVkbyggZm4gKSB7XG5cdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIGFyZ3VtZW50ICkge1xuXHRcdGFyZ3VtZW50ID0gK2FyZ3VtZW50O1xuXHRcdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlZWQsIG1hdGNoZXMgKSB7XG5cdFx0XHR2YXIgaixcblx0XHRcdFx0bWF0Y2hJbmRleGVzID0gZm4oIFtdLCBzZWVkLmxlbmd0aCwgYXJndW1lbnQgKSxcblx0XHRcdFx0aSA9IG1hdGNoSW5kZXhlcy5sZW5ndGg7XG5cblx0XHRcdC8vIE1hdGNoIGVsZW1lbnRzIGZvdW5kIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhlc1xuXHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdGlmICggc2VlZFsgKGogPSBtYXRjaEluZGV4ZXNbaV0pIF0gKSB7XG5cdFx0XHRcdFx0c2VlZFtqXSA9ICEobWF0Y2hlc1tqXSA9IHNlZWRbal0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBhIG5vZGUgZm9yIHZhbGlkaXR5IGFzIGEgU2l6emxlIGNvbnRleHRcbiAqIEBwYXJhbSB7RWxlbWVudHxPYmplY3Q9fSBjb250ZXh0XG4gKiBAcmV0dXJucyB7RWxlbWVudHxPYmplY3R8Qm9vbGVhbn0gVGhlIGlucHV0IG5vZGUgaWYgYWNjZXB0YWJsZSwgb3RoZXJ3aXNlIGEgZmFsc3kgdmFsdWVcbiAqL1xuZnVuY3Rpb24gdGVzdENvbnRleHQoIGNvbnRleHQgKSB7XG5cdHJldHVybiBjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnRleHQ7XG59XG5cbi8vIEV4cG9zZSBzdXBwb3J0IHZhcnMgZm9yIGNvbnZlbmllbmNlXG5zdXBwb3J0ID0gU2l6emxlLnN1cHBvcnQgPSB7fTtcblxuLyoqXG4gKiBEZXRlY3RzIFhNTCBub2Rlc1xuICogQHBhcmFtIHtFbGVtZW50fE9iamVjdH0gZWxlbSBBbiBlbGVtZW50IG9yIGEgZG9jdW1lbnRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmZiBlbGVtIGlzIGEgbm9uLUhUTUwgWE1MIG5vZGVcbiAqL1xuaXNYTUwgPSBTaXp6bGUuaXNYTUwgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0dmFyIG5hbWVzcGFjZSA9IGVsZW0ubmFtZXNwYWNlVVJJLFxuXHRcdGRvY0VsZW0gPSAoZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0pLmRvY3VtZW50RWxlbWVudDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PThcblx0Ly8gQXNzdW1lIEhUTUwgd2hlbiBkb2N1bWVudEVsZW1lbnQgZG9lc24ndCB5ZXQgZXhpc3QsIHN1Y2ggYXMgaW5zaWRlIGxvYWRpbmcgaWZyYW1lc1xuXHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNDgzM1xuXHRyZXR1cm4gIXJodG1sLnRlc3QoIG5hbWVzcGFjZSB8fCBkb2NFbGVtICYmIGRvY0VsZW0ubm9kZU5hbWUgfHwgXCJIVE1MXCIgKTtcbn07XG5cbi8qKlxuICogU2V0cyBkb2N1bWVudC1yZWxhdGVkIHZhcmlhYmxlcyBvbmNlIGJhc2VkIG9uIHRoZSBjdXJyZW50IGRvY3VtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR8T2JqZWN0fSBbZG9jXSBBbiBlbGVtZW50IG9yIGRvY3VtZW50IG9iamVjdCB0byB1c2UgdG8gc2V0IHRoZSBkb2N1bWVudFxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3VycmVudCBkb2N1bWVudFxuICovXG5zZXREb2N1bWVudCA9IFNpenpsZS5zZXREb2N1bWVudCA9IGZ1bmN0aW9uKCBub2RlICkge1xuXHR2YXIgaGFzQ29tcGFyZSwgc3ViV2luZG93LFxuXHRcdGRvYyA9IG5vZGUgPyBub2RlLm93bmVyRG9jdW1lbnQgfHwgbm9kZSA6IHByZWZlcnJlZERvYztcblxuXHQvLyBSZXR1cm4gZWFybHkgaWYgZG9jIGlzIGludmFsaWQgb3IgYWxyZWFkeSBzZWxlY3RlZFxuXHRpZiAoIGRvYyA9PT0gZG9jdW1lbnQgfHwgZG9jLm5vZGVUeXBlICE9PSA5IHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50ICkge1xuXHRcdHJldHVybiBkb2N1bWVudDtcblx0fVxuXG5cdC8vIFVwZGF0ZSBnbG9iYWwgdmFyaWFibGVzXG5cdGRvY3VtZW50ID0gZG9jO1xuXHRkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRkb2N1bWVudElzSFRNTCA9ICFpc1hNTCggZG9jdW1lbnQgKTtcblxuXHQvLyBTdXBwb3J0OiBJRSA5LTExLCBFZGdlXG5cdC8vIEFjY2Vzc2luZyBpZnJhbWUgZG9jdW1lbnRzIGFmdGVyIHVubG9hZCB0aHJvd3MgXCJwZXJtaXNzaW9uIGRlbmllZFwiIGVycm9ycyAoalF1ZXJ5ICMxMzkzNilcblx0aWYgKCBwcmVmZXJyZWREb2MgIT09IGRvY3VtZW50ICYmXG5cdFx0KHN1YldpbmRvdyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3KSAmJiBzdWJXaW5kb3cudG9wICE9PSBzdWJXaW5kb3cgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSAxMSwgRWRnZVxuXHRcdGlmICggc3ViV2luZG93LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRzdWJXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJ1bmxvYWRcIiwgdW5sb2FkSGFuZGxlciwgZmFsc2UgKTtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgLSAxMCBvbmx5XG5cdFx0fSBlbHNlIGlmICggc3ViV2luZG93LmF0dGFjaEV2ZW50ICkge1xuXHRcdFx0c3ViV2luZG93LmF0dGFjaEV2ZW50KCBcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIgKTtcblx0XHR9XG5cdH1cblxuXHQvKiBBdHRyaWJ1dGVzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXHQvLyBTdXBwb3J0OiBJRTw4XG5cdC8vIFZlcmlmeSB0aGF0IGdldEF0dHJpYnV0ZSByZWFsbHkgcmV0dXJucyBhdHRyaWJ1dGVzIGFuZCBub3QgcHJvcGVydGllc1xuXHQvLyAoZXhjZXB0aW5nIElFOCBib29sZWFucylcblx0c3VwcG9ydC5hdHRyaWJ1dGVzID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5jbGFzc05hbWUgPSBcImlcIjtcblx0XHRyZXR1cm4gIWVsLmdldEF0dHJpYnV0ZShcImNsYXNzTmFtZVwiKTtcblx0fSk7XG5cblx0LyogZ2V0RWxlbWVudChzKUJ5KlxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gQ2hlY2sgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpIHJldHVybnMgb25seSBlbGVtZW50c1xuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRlbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKSApO1xuXHRcdHJldHVybiAhZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLmxlbmd0aDtcblx0fSk7XG5cblx0Ly8gU3VwcG9ydDogSUU8OVxuXHRzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBybmF0aXZlLnRlc3QoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgKTtcblxuXHQvLyBTdXBwb3J0OiBJRTwxMFxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcblx0Ly8gVGhlIGJyb2tlbiBnZXRFbGVtZW50QnlJZCBtZXRob2RzIGRvbid0IHBpY2sgdXAgcHJvZ3JhbW1hdGljYWxseS1zZXQgbmFtZXMsXG5cdC8vIHNvIHVzZSBhIHJvdW5kYWJvdXQgZ2V0RWxlbWVudHNCeU5hbWUgdGVzdFxuXHRzdXBwb3J0LmdldEJ5SWQgPSBhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaWQgPSBleHBhbmRvO1xuXHRcdHJldHVybiAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUgfHwgIWRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICkubGVuZ3RoO1xuXHR9KTtcblxuXHQvLyBJRCBmaWx0ZXIgYW5kIGZpbmRcblx0aWYgKCBzdXBwb3J0LmdldEJ5SWQgKSB7XG5cdFx0RXhwci5maWx0ZXJbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXHRcdEV4cHIuZmluZFtcIklEXCJdID0gZnVuY3Rpb24oIGlkLCBjb250ZXh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudElzSFRNTCApIHtcblx0XHRcdFx0dmFyIGVsZW0gPSBjb250ZXh0LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXHRcdFx0XHRyZXR1cm4gZWxlbSA/IFsgZWxlbSBdIDogW107XG5cdFx0XHR9XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRFeHByLmZpbHRlcltcIklEXCJdID0gIGZ1bmN0aW9uKCBpZCApIHtcblx0XHRcdHZhciBhdHRySWQgPSBpZC5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0XHRcdFx0XHRlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gYXR0cklkO1xuXHRcdFx0fTtcblx0XHR9O1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgNiAtIDcgb25seVxuXHRcdC8vIGdldEVsZW1lbnRCeUlkIGlzIG5vdCByZWxpYWJsZSBhcyBhIGZpbmQgc2hvcnRjdXRcblx0XHRFeHByLmZpbmRbXCJJRFwiXSA9IGZ1bmN0aW9uKCBpZCwgY29udGV4dCApIHtcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRcdHZhciBub2RlLCBpLCBlbGVtcyxcblx0XHRcdFx0XHRlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggaWQgKTtcblxuXHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHQvLyBWZXJpZnkgdGhlIGlkIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS52YWx1ZSA9PT0gaWQgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gWyBlbGVtIF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gRmFsbCBiYWNrIG9uIGdldEVsZW1lbnRzQnlOYW1lXG5cdFx0XHRcdFx0ZWxlbXMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlOYW1lKCBpZCApO1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlICggKGVsZW0gPSBlbGVtc1tpKytdKSApIHtcblx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcblx0XHRcdFx0XHRcdGlmICggbm9kZSAmJiBub2RlLnZhbHVlID09PSBpZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFsgZWxlbSBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0Ly8gVGFnXG5cdEV4cHIuZmluZFtcIlRBR1wiXSA9IHN1cHBvcnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgP1xuXHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggdGFnICk7XG5cblx0XHRcdC8vIERvY3VtZW50RnJhZ21lbnQgbm9kZXMgZG9uJ3QgaGF2ZSBnRUJUTlxuXHRcdFx0fSBlbHNlIGlmICggc3VwcG9ydC5xc2EgKSB7XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHRhZyApO1xuXHRcdFx0fVxuXHRcdH0gOlxuXG5cdFx0ZnVuY3Rpb24oIHRhZywgY29udGV4dCApIHtcblx0XHRcdHZhciBlbGVtLFxuXHRcdFx0XHR0bXAgPSBbXSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdC8vIEJ5IGhhcHB5IGNvaW5jaWRlbmNlLCBhIChicm9rZW4pIGdFQlROIGFwcGVhcnMgb24gRG9jdW1lbnRGcmFnbWVudCBub2RlcyB0b29cblx0XHRcdFx0cmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xuXG5cdFx0XHQvLyBGaWx0ZXIgb3V0IHBvc3NpYmxlIGNvbW1lbnRzXG5cdFx0XHRpZiAoIHRhZyA9PT0gXCIqXCIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGVsZW0gPSByZXN1bHRzW2krK10pICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdHRtcC5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0Ly8gQ2xhc3Ncblx0RXhwci5maW5kW1wiQ0xBU1NcIl0gPSBzdXBwb3J0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgJiYgZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCApIHtcblx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnRJc0hUTUwgKSB7XG5cdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCBjbGFzc05hbWUgKTtcblx0XHR9XG5cdH07XG5cblx0LyogUVNBL21hdGNoZXNTZWxlY3RvclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gUVNBIGFuZCBtYXRjaGVzU2VsZWN0b3Igc3VwcG9ydFxuXG5cdC8vIG1hdGNoZXNTZWxlY3Rvcig6YWN0aXZlKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoSUU5L09wZXJhIDExLjUpXG5cdHJidWdneU1hdGNoZXMgPSBbXTtcblxuXHQvLyBxU2EoOmZvY3VzKSByZXBvcnRzIGZhbHNlIHdoZW4gdHJ1ZSAoQ2hyb21lIDIxKVxuXHQvLyBXZSBhbGxvdyB0aGlzIGJlY2F1c2Ugb2YgYSBidWcgaW4gSUU4LzkgdGhhdCB0aHJvd3MgYW4gZXJyb3Jcblx0Ly8gd2hlbmV2ZXIgYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIGFjY2Vzc2VkIG9uIGFuIGlmcmFtZVxuXHQvLyBTbywgd2UgYWxsb3cgOmZvY3VzIHRvIHBhc3MgdGhyb3VnaCBRU0EgYWxsIHRoZSB0aW1lIHRvIGF2b2lkIHRoZSBJRSBlcnJvclxuXHQvLyBTZWUgaHR0cHM6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEzMzc4XG5cdHJidWdneVFTQSA9IFtdO1xuXG5cdGlmICggKHN1cHBvcnQucXNhID0gcm5hdGl2ZS50ZXN0KCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICkpICkge1xuXHRcdC8vIEJ1aWxkIFFTQSByZWdleFxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0Ly8gU2VsZWN0IGlzIHNldCB0byBlbXB0eSBzdHJpbmcgb24gcHVycG9zZVxuXHRcdFx0Ly8gVGhpcyBpcyB0byB0ZXN0IElFJ3MgdHJlYXRtZW50IG9mIG5vdCBleHBsaWNpdGx5XG5cdFx0XHQvLyBzZXR0aW5nIGEgYm9vbGVhbiBjb250ZW50IGF0dHJpYnV0ZSxcblx0XHRcdC8vIHNpbmNlIGl0cyBwcmVzZW5jZSBzaG91bGQgYmUgZW5vdWdoXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzNTlcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuaW5uZXJIVE1MID0gXCI8YSBpZD0nXCIgKyBleHBhbmRvICsgXCInPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBpZD0nXCIgKyBleHBhbmRvICsgXCItXFxyXFxcXCcgbXNhbGxvd2NhcHR1cmU9Jyc+XCIgK1xuXHRcdFx0XHRcIjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOCwgT3BlcmEgMTEtMTIuMTZcblx0XHRcdC8vIE5vdGhpbmcgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gZW1wdHkgc3RyaW5ncyBmb2xsb3cgXj0gb3IgJD0gb3IgKj1cblx0XHRcdC8vIFRoZSB0ZXN0IGF0dHJpYnV0ZSBtdXN0IGJlIHVua25vd24gaW4gT3BlcmEgYnV0IFwic2FmZVwiIGZvciBXaW5SVFxuXHRcdFx0Ly8gaHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9oaDQ2NTM4OC5hc3B4I2F0dHJpYnV0ZV9zZWN0aW9uXG5cdFx0XHRpZiAoIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbXNhbGxvd2NhcHR1cmVePScnXVwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKCBcIlsqXiRdPVwiICsgd2hpdGVzcGFjZSArIFwiKig/OicnfFxcXCJcXFwiKVwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFOFxuXHRcdFx0Ly8gQm9vbGVhbiBhdHRyaWJ1dGVzIGFuZCBcInZhbHVlXCIgYXJlIG5vdCB0cmVhdGVkIGNvcnJlY3RseVxuXHRcdFx0aWYgKCAhZWwucXVlcnlTZWxlY3RvckFsbChcIltzZWxlY3RlZF1cIikubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaCggXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKig/OnZhbHVlfFwiICsgYm9vbGVhbnMgKyBcIilcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWU8MjksIEFuZHJvaWQ8NC40LCBTYWZhcmk8Ny4wKywgaU9TPDcuMCssIFBoYW50b21KUzwxLjkuOCtcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiW2lkfj1cIiArIGV4cGFuZG8gKyBcIi1dXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwifj1cIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggIWVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiOmNoZWNrZWRcIik7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4KywgaU9TIDgrXG5cdFx0XHQvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM2ODUxXG5cdFx0XHQvLyBJbi1wYWdlIGBzZWxlY3RvciNpZCBzaWJsaW5nLWNvbWJpbmF0b3Igc2VsZWN0b3JgIGZhaWxzXG5cdFx0XHRpZiAoICFlbC5xdWVyeVNlbGVjdG9yQWxsKCBcImEjXCIgKyBleHBhbmRvICsgXCIrKlwiICkubGVuZ3RoICkge1xuXHRcdFx0XHRyYnVnZ3lRU0EucHVzaChcIi4jLitbK35dXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nJyBkaXNhYmxlZD0nZGlzYWJsZWQnPjwvYT5cIiArXG5cdFx0XHRcdFwiPHNlbGVjdCBkaXNhYmxlZD0nZGlzYWJsZWQnPjxvcHRpb24vPjwvc2VsZWN0PlwiO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBXaW5kb3dzIDggTmF0aXZlIEFwcHNcblx0XHRcdC8vIFRoZSB0eXBlIGFuZCBuYW1lIGF0dHJpYnV0ZXMgYXJlIHJlc3RyaWN0ZWQgZHVyaW5nIC5pbm5lckhUTUwgYXNzaWdubWVudFxuXHRcdFx0dmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJoaWRkZW5cIiApO1xuXHRcdFx0ZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICkuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJEXCIgKTtcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUU4XG5cdFx0XHQvLyBFbmZvcmNlIGNhc2Utc2Vuc2l0aXZpdHkgb2YgbmFtZSBhdHRyaWJ1dGVcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIltuYW1lPWRdXCIpLmxlbmd0aCApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwibmFtZVwiICsgd2hpdGVzcGFjZSArIFwiKlsqXiR8IX5dPz1cIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGRiAzLjUgLSA6ZW5hYmxlZC86ZGlzYWJsZWQgYW5kIGhpZGRlbiBlbGVtZW50cyAoaGlkZGVuIGVsZW1lbnRzIGFyZSBzdGlsbCBlbmFibGVkKVxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIGFuZCB3aWxsIG5vdCBzZWUgbGF0ZXIgdGVzdHNcblx0XHRcdGlmICggZWwucXVlcnlTZWxlY3RvckFsbChcIjplbmFibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTktMTErXG5cdFx0XHQvLyBJRSdzIDpkaXNhYmxlZCBzZWxlY3RvciBkb2VzIG5vdCBwaWNrIHVwIHRoZSBjaGlsZHJlbiBvZiBkaXNhYmxlZCBmaWVsZHNldHNcblx0XHRcdGRvY0VsZW0uYXBwZW5kQ2hpbGQoIGVsICkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0aWYgKCBlbC5xdWVyeVNlbGVjdG9yQWxsKFwiOmRpc2FibGVkXCIpLmxlbmd0aCAhPT0gMiApIHtcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPcGVyYSAxMC0xMSBkb2VzIG5vdCB0aHJvdyBvbiBwb3N0LWNvbW1hIGludmFsaWQgcHNldWRvc1xuXHRcdFx0ZWwucXVlcnlTZWxlY3RvckFsbChcIiosOnhcIik7XG5cdFx0XHRyYnVnZ3lRU0EucHVzaChcIiwuKjpcIik7XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoIChzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciA9IHJuYXRpdmUudGVzdCggKG1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcblx0XHRkb2NFbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY0VsZW0ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvcikgKSkgKSB7XG5cblx0XHRhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRcdFx0Ly8gQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZG8gbWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHQvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxuXHRcdFx0c3VwcG9ydC5kaXNjb25uZWN0ZWRNYXRjaCA9IG1hdGNoZXMuY2FsbCggZWwsIFwiKlwiICk7XG5cblx0XHRcdC8vIFRoaXMgc2hvdWxkIGZhaWwgd2l0aCBhbiBleGNlcHRpb25cblx0XHRcdC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcblx0XHRcdG1hdGNoZXMuY2FsbCggZWwsIFwiW3MhPScnXTp4XCIgKTtcblx0XHRcdHJidWdneU1hdGNoZXMucHVzaCggXCIhPVwiLCBwc2V1ZG9zICk7XG5cdFx0fSk7XG5cdH1cblxuXHRyYnVnZ3lRU0EgPSByYnVnZ3lRU0EubGVuZ3RoICYmIG5ldyBSZWdFeHAoIHJidWdneVFTQS5qb2luKFwifFwiKSApO1xuXHRyYnVnZ3lNYXRjaGVzID0gcmJ1Z2d5TWF0Y2hlcy5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5TWF0Y2hlcy5qb2luKFwifFwiKSApO1xuXG5cdC8qIENvbnRhaW5zXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblx0aGFzQ29tcGFyZSA9IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiApO1xuXG5cdC8vIEVsZW1lbnQgY29udGFpbnMgYW5vdGhlclxuXHQvLyBQdXJwb3NlZnVsbHkgc2VsZi1leGNsdXNpdmVcblx0Ly8gQXMgaW4sIGFuIGVsZW1lbnQgZG9lcyBub3QgY29udGFpbiBpdHNlbGZcblx0Y29udGFpbnMgPSBoYXNDb21wYXJlIHx8IHJuYXRpdmUudGVzdCggZG9jRWxlbS5jb250YWlucyApID9cblx0XHRmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdHZhciBhZG93biA9IGEubm9kZVR5cGUgPT09IDkgPyBhLmRvY3VtZW50RWxlbWVudCA6IGEsXG5cdFx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdFx0cmV0dXJuIGEgPT09IGJ1cCB8fCAhISggYnVwICYmIGJ1cC5ub2RlVHlwZSA9PT0gMSAmJiAoXG5cdFx0XHRcdGFkb3duLmNvbnRhaW5zID9cblx0XHRcdFx0XHRhZG93bi5jb250YWlucyggYnVwICkgOlxuXHRcdFx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiYgYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYnVwICkgJiAxNlxuXHRcdFx0KSk7XG5cdFx0fSA6XG5cdFx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGIgKSB7XG5cdFx0XHRcdHdoaWxlICggKGIgPSBiLnBhcmVudE5vZGUpICkge1xuXHRcdFx0XHRcdGlmICggYiA9PT0gYSApIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0LyogU29ydGluZ1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0Ly8gRG9jdW1lbnQgb3JkZXIgc29ydGluZ1xuXHRzb3J0T3JkZXIgPSBoYXNDb21wYXJlID9cblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cblx0XHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHQvLyBTb3J0IG9uIG1ldGhvZCBleGlzdGVuY2UgaWYgb25seSBvbmUgaW5wdXQgaGFzIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uXG5cdFx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRcdGlmICggY29tcGFyZSApIHtcblx0XHRcdHJldHVybiBjb21wYXJlO1xuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBwb3NpdGlvbiBpZiBib3RoIGlucHV0cyBiZWxvbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnRcblx0XHRjb21wYXJlID0gKCBhLm93bmVyRG9jdW1lbnQgfHwgYSApID09PSAoIGIub3duZXJEb2N1bWVudCB8fCBiICkgP1xuXHRcdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIHdlIGtub3cgdGhleSBhcmUgZGlzY29ubmVjdGVkXG5cdFx0XHQxO1xuXG5cdFx0Ly8gRGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0aWYgKCBjb21wYXJlICYgMSB8fFxuXHRcdFx0KCFzdXBwb3J0LnNvcnREZXRhY2hlZCAmJiBiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKCBhICkgPT09IGNvbXBhcmUpICkge1xuXG5cdFx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRcdGlmICggYSA9PT0gZG9jdW1lbnQgfHwgYS5vd25lckRvY3VtZW50ID09PSBwcmVmZXJyZWREb2MgJiYgY29udGFpbnMocHJlZmVycmVkRG9jLCBhKSApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBiID09PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT09IHByZWZlcnJlZERvYyAmJiBjb250YWlucyhwcmVmZXJyZWREb2MsIGIpICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcblx0XHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0XHQoIGluZGV4T2YoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZiggc29ydElucHV0LCBiICkgKSA6XG5cdFx0XHRcdDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbXBhcmUgJiA0ID8gLTEgOiAxO1xuXHR9IDpcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0Ly8gRXhpdCBlYXJseSBpZiB0aGUgbm9kZXMgYXJlIGlkZW50aWNhbFxuXHRcdGlmICggYSA9PT0gYiApIHtcblx0XHRcdGhhc0R1cGxpY2F0ZSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRhdXAgPSBhLnBhcmVudE5vZGUsXG5cdFx0XHRidXAgPSBiLnBhcmVudE5vZGUsXG5cdFx0XHRhcCA9IFsgYSBdLFxuXHRcdFx0YnAgPSBbIGIgXTtcblxuXHRcdC8vIFBhcmVudGxlc3Mgbm9kZXMgYXJlIGVpdGhlciBkb2N1bWVudHMgb3IgZGlzY29ubmVjdGVkXG5cdFx0aWYgKCAhYXVwIHx8ICFidXAgKSB7XG5cdFx0XHRyZXR1cm4gYSA9PT0gZG9jdW1lbnQgPyAtMSA6XG5cdFx0XHRcdGIgPT09IGRvY3VtZW50ID8gMSA6XG5cdFx0XHRcdGF1cCA/IC0xIDpcblx0XHRcdFx0YnVwID8gMSA6XG5cdFx0XHRcdHNvcnRJbnB1dCA/XG5cdFx0XHRcdCggaW5kZXhPZiggc29ydElucHV0LCBhICkgLSBpbmRleE9mKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdFx0MDtcblxuXHRcdC8vIElmIHRoZSBub2RlcyBhcmUgc2libGluZ3MsIHdlIGNhbiBkbyBhIHF1aWNrIGNoZWNrXG5cdFx0fSBlbHNlIGlmICggYXVwID09PSBidXAgKSB7XG5cdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhLCBiICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlIG5lZWQgZnVsbCBsaXN0cyBvZiB0aGVpciBhbmNlc3RvcnMgZm9yIGNvbXBhcmlzb25cblx0XHRjdXIgPSBhO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGFwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblx0XHRjdXIgPSBiO1xuXHRcdHdoaWxlICggKGN1ciA9IGN1ci5wYXJlbnROb2RlKSApIHtcblx0XHRcdGJwLnVuc2hpZnQoIGN1ciApO1xuXHRcdH1cblxuXHRcdC8vIFdhbGsgZG93biB0aGUgdHJlZSBsb29raW5nIGZvciBhIGRpc2NyZXBhbmN5XG5cdFx0d2hpbGUgKCBhcFtpXSA9PT0gYnBbaV0gKSB7XG5cdFx0XHRpKys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGkgP1xuXHRcdFx0Ly8gRG8gYSBzaWJsaW5nIGNoZWNrIGlmIHRoZSBub2RlcyBoYXZlIGEgY29tbW9uIGFuY2VzdG9yXG5cdFx0XHRzaWJsaW5nQ2hlY2soIGFwW2ldLCBicFtpXSApIDpcblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIG5vZGVzIGluIG91ciBkb2N1bWVudCBzb3J0IGZpcnN0XG5cdFx0XHRhcFtpXSA9PT0gcHJlZmVycmVkRG9jID8gLTEgOlxuXHRcdFx0YnBbaV0gPT09IHByZWZlcnJlZERvYyA/IDEgOlxuXHRcdFx0MDtcblx0fTtcblxuXHRyZXR1cm4gZG9jdW1lbnQ7XG59O1xuXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcblx0cmV0dXJuIFNpenpsZSggZXhwciwgbnVsbCwgbnVsbCwgZWxlbWVudHMgKTtcbn07XG5cblNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcblx0Ly8gU2V0IGRvY3VtZW50IHZhcnMgaWYgbmVlZGVkXG5cdGlmICggKCBlbGVtLm93bmVyRG9jdW1lbnQgfHwgZWxlbSApICE9PSBkb2N1bWVudCApIHtcblx0XHRzZXREb2N1bWVudCggZWxlbSApO1xuXHR9XG5cblx0aWYgKCBzdXBwb3J0Lm1hdGNoZXNTZWxlY3RvciAmJiBkb2N1bWVudElzSFRNTCAmJlxuXHRcdCFub25uYXRpdmVTZWxlY3RvckNhY2hlWyBleHByICsgXCIgXCIgXSAmJlxuXHRcdCggIXJidWdneU1hdGNoZXMgfHwgIXJidWdneU1hdGNoZXMudGVzdCggZXhwciApICkgJiZcblx0XHQoICFyYnVnZ3lRU0EgICAgIHx8ICFyYnVnZ3lRU0EudGVzdCggZXhwciApICkgKSB7XG5cblx0XHR0cnkge1xuXHRcdFx0dmFyIHJldCA9IG1hdGNoZXMuY2FsbCggZWxlbSwgZXhwciApO1xuXG5cdFx0XHQvLyBJRSA5J3MgbWF0Y2hlc1NlbGVjdG9yIHJldHVybnMgZmFsc2Ugb24gZGlzY29ubmVjdGVkIG5vZGVzXG5cdFx0XHRpZiAoIHJldCB8fCBzdXBwb3J0LmRpc2Nvbm5lY3RlZE1hdGNoIHx8XG5cdFx0XHRcdFx0Ly8gQXMgd2VsbCwgZGlzY29ubmVjdGVkIG5vZGVzIGFyZSBzYWlkIHRvIGJlIGluIGEgZG9jdW1lbnRcblx0XHRcdFx0XHQvLyBmcmFnbWVudCBpbiBJRSA5XG5cdFx0XHRcdFx0ZWxlbS5kb2N1bWVudCAmJiBlbGVtLmRvY3VtZW50Lm5vZGVUeXBlICE9PSAxMSApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRub25uYXRpdmVTZWxlY3RvckNhY2hlKCBleHByLCB0cnVlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFNpenpsZSggZXhwciwgZG9jdW1lbnQsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcbn07XG5cblNpenpsZS5jb250YWlucyA9IGZ1bmN0aW9uKCBjb250ZXh0LCBlbGVtICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0ICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBjb250ZXh0ICk7XG5cdH1cblx0cmV0dXJuIGNvbnRhaW5zKCBjb250ZXh0LCBlbGVtICk7XG59O1xuXG5TaXp6bGUuYXR0ciA9IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHQvLyBTZXQgZG9jdW1lbnQgdmFycyBpZiBuZWVkZWRcblx0aWYgKCAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkgIT09IGRvY3VtZW50ICkge1xuXHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdH1cblxuXHR2YXIgZm4gPSBFeHByLmF0dHJIYW5kbGVbIG5hbWUudG9Mb3dlckNhc2UoKSBdLFxuXHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdHZhbCA9IGZuICYmIGhhc093bi5jYWxsKCBFeHByLmF0dHJIYW5kbGUsIG5hbWUudG9Mb3dlckNhc2UoKSApID9cblx0XHRcdGZuKCBlbGVtLCBuYW1lLCAhZG9jdW1lbnRJc0hUTUwgKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cblx0cmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID9cblx0XHR2YWwgOlxuXHRcdHN1cHBvcnQuYXR0cmlidXRlcyB8fCAhZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0ZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKSA6XG5cdFx0XHQodmFsID0gZWxlbS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpKSAmJiB2YWwuc3BlY2lmaWVkID9cblx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcbn07XG5cblNpenpsZS5lc2NhcGUgPSBmdW5jdGlvbiggc2VsICkge1xuXHRyZXR1cm4gKHNlbCArIFwiXCIpLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcbn07XG5cblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJTeW50YXggZXJyb3IsIHVucmVjb2duaXplZCBleHByZXNzaW9uOiBcIiArIG1zZyApO1xufTtcblxuLyoqXG4gKiBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXG4gKiBAcGFyYW0ge0FycmF5TGlrZX0gcmVzdWx0c1xuICovXG5TaXp6bGUudW5pcXVlU29ydCA9IGZ1bmN0aW9uKCByZXN1bHRzICkge1xuXHR2YXIgZWxlbSxcblx0XHRkdXBsaWNhdGVzID0gW10sXG5cdFx0aiA9IDAsXG5cdFx0aSA9IDA7XG5cblx0Ly8gVW5sZXNzIHdlICprbm93KiB3ZSBjYW4gZGV0ZWN0IGR1cGxpY2F0ZXMsIGFzc3VtZSB0aGVpciBwcmVzZW5jZVxuXHRoYXNEdXBsaWNhdGUgPSAhc3VwcG9ydC5kZXRlY3REdXBsaWNhdGVzO1xuXHRzb3J0SW5wdXQgPSAhc3VwcG9ydC5zb3J0U3RhYmxlICYmIHJlc3VsdHMuc2xpY2UoIDAgKTtcblx0cmVzdWx0cy5zb3J0KCBzb3J0T3JkZXIgKTtcblxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcblx0XHR3aGlsZSAoIChlbGVtID0gcmVzdWx0c1tpKytdKSApIHtcblx0XHRcdGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xuXHRcdFx0XHRqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuXHRzb3J0SW5wdXQgPSBudWxsO1xuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIHRoZSB0ZXh0IHZhbHVlIG9mIGFuIGFycmF5IG9mIERPTSBub2Rlc1xuICogQHBhcmFtIHtBcnJheXxFbGVtZW50fSBlbGVtXG4gKi9cbmdldFRleHQgPSBTaXp6bGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHR2YXIgbm9kZSxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGkgPSAwLFxuXHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRpZiAoICFub2RlVHlwZSApIHtcblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdHdoaWxlICggKG5vZGUgPSBlbGVtW2krK10pICkge1xuXHRcdFx0Ly8gRG8gbm90IHRyYXZlcnNlIGNvbW1lbnQgbm9kZXNcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XG5cdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdC8vIGlubmVyVGV4dCB1c2FnZSByZW1vdmVkIGZvciBjb25zaXN0ZW5jeSBvZiBuZXcgbGluZXMgKGpRdWVyeSAjMTExNTMpXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLnRleHRDb250ZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUcmF2ZXJzZSBpdHMgY2hpbGRyZW5cblx0XHRcdGZvciAoIGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7IGVsZW07IGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nICkge1xuXHRcdFx0XHRyZXQgKz0gZ2V0VGV4dCggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xuXHR9XG5cdC8vIERvIG5vdCBpbmNsdWRlIGNvbW1lbnQgb3IgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiBub2Rlc1xuXG5cdHJldHVybiByZXQ7XG59O1xuXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcblxuXHQvLyBDYW4gYmUgYWRqdXN0ZWQgYnkgdGhlIHVzZXJcblx0Y2FjaGVMZW5ndGg6IDUwLFxuXG5cdGNyZWF0ZVBzZXVkbzogbWFya0Z1bmN0aW9uLFxuXG5cdG1hdGNoOiBtYXRjaEV4cHIsXG5cblx0YXR0ckhhbmRsZToge30sXG5cblx0ZmluZDoge30sXG5cblx0cmVsYXRpdmU6IHtcblx0XHRcIj5cIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiLCBmaXJzdDogdHJ1ZSB9LFxuXHRcdFwiIFwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIgfSxcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXG5cdFx0XCJ+XCI6IHsgZGlyOiBcInByZXZpb3VzU2libGluZ1wiIH1cblx0fSxcblxuXHRwcmVGaWx0ZXI6IHtcblx0XHRcIkFUVFJcIjogZnVuY3Rpb24oIG1hdGNoICkge1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHQvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxuXHRcdFx0bWF0Y2hbM10gPSAoIG1hdGNoWzNdIHx8IG1hdGNoWzRdIHx8IG1hdGNoWzVdIHx8IFwiXCIgKS5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzJdID09PSBcIn49XCIgKSB7XG5cdFx0XHRcdG1hdGNoWzNdID0gXCIgXCIgKyBtYXRjaFszXSArIFwiIFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDQgKTtcblx0XHR9LFxuXG5cdFx0XCJDSElMRFwiOiBmdW5jdGlvbiggbWF0Y2ggKSB7XG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByW1wiQ0hJTERcIl1cblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXG5cdFx0XHRcdDIgd2hhdCAoY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0MyBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcblx0XHRcdFx0NCB4bi1jb21wb25lbnQgb2YgeG4reSBhcmd1bWVudCAoWystXT9cXGQqbnwpXG5cdFx0XHRcdDUgc2lnbiBvZiB4bi1jb21wb25lbnRcblx0XHRcdFx0NiB4IG9mIHhuLWNvbXBvbmVudFxuXHRcdFx0XHQ3IHNpZ24gb2YgeS1jb21wb25lbnRcblx0XHRcdFx0OCB5IG9mIHktY29tcG9uZW50XG5cdFx0XHQqL1xuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRpZiAoIG1hdGNoWzFdLnNsaWNlKCAwLCAzICkgPT09IFwibnRoXCIgKSB7XG5cdFx0XHRcdC8vIG50aC0qIHJlcXVpcmVzIGFyZ3VtZW50XG5cdFx0XHRcdGlmICggIW1hdGNoWzNdICkge1xuXHRcdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIG51bWVyaWMgeCBhbmQgeSBwYXJhbWV0ZXJzIGZvciBFeHByLmZpbHRlci5DSElMRFxuXHRcdFx0XHQvLyByZW1lbWJlciB0aGF0IGZhbHNlL3RydWUgY2FzdCByZXNwZWN0aXZlbHkgdG8gMC8xXG5cdFx0XHRcdG1hdGNoWzRdID0gKyggbWF0Y2hbNF0gPyBtYXRjaFs1XSArIChtYXRjaFs2XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzNdID09PSBcImV2ZW5cIiB8fCBtYXRjaFszXSA9PT0gXCJvZGRcIiApICk7XG5cdFx0XHRcdG1hdGNoWzVdID0gKyggKCBtYXRjaFs3XSArIG1hdGNoWzhdICkgfHwgbWF0Y2hbM10gPT09IFwib2RkXCIgKTtcblxuXHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXG5cdFx0XHR9IGVsc2UgaWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcblx0XHRcdHZhciBleGNlc3MsXG5cdFx0XHRcdHVucXVvdGVkID0gIW1hdGNoWzZdICYmIG1hdGNoWzJdO1xuXG5cdFx0XHRpZiAoIG1hdGNoRXhwcltcIkNISUxEXCJdLnRlc3QoIG1hdGNoWzBdICkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBY2NlcHQgcXVvdGVkIGFyZ3VtZW50cyBhcy1pc1xuXHRcdFx0aWYgKCBtYXRjaFszXSApIHtcblx0XHRcdFx0bWF0Y2hbMl0gPSBtYXRjaFs0XSB8fCBtYXRjaFs1XSB8fCBcIlwiO1xuXG5cdFx0XHQvLyBTdHJpcCBleGNlc3MgY2hhcmFjdGVycyBmcm9tIHVucXVvdGVkIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggdW5xdW90ZWQgJiYgcnBzZXVkby50ZXN0KCB1bnF1b3RlZCApICYmXG5cdFx0XHRcdC8vIEdldCBleGNlc3MgZnJvbSB0b2tlbml6ZSAocmVjdXJzaXZlbHkpXG5cdFx0XHRcdChleGNlc3MgPSB0b2tlbml6ZSggdW5xdW90ZWQsIHRydWUgKSkgJiZcblx0XHRcdFx0Ly8gYWR2YW5jZSB0byB0aGUgbmV4dCBjbG9zaW5nIHBhcmVudGhlc2lzXG5cdFx0XHRcdChleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGgpICkge1xuXG5cdFx0XHRcdC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XG5cdFx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xuXHRcdFx0XHRtYXRjaFsyXSA9IHVucXVvdGVkLnNsaWNlKCAwLCBleGNlc3MgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV0dXJuIG9ubHkgY2FwdHVyZXMgbmVlZGVkIGJ5IHRoZSBwc2V1ZG8gZmlsdGVyIG1ldGhvZCAodHlwZSBhbmQgYXJndW1lbnQpXG5cdFx0XHRyZXR1cm4gbWF0Y2guc2xpY2UoIDAsIDMgKTtcblx0XHR9XG5cdH0sXG5cblx0ZmlsdGVyOiB7XG5cblx0XHRcIlRBR1wiOiBmdW5jdGlvbiggbm9kZU5hbWVTZWxlY3RvciApIHtcblx0XHRcdHZhciBub2RlTmFtZSA9IG5vZGVOYW1lU2VsZWN0b3IucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIG5vZGVOYW1lU2VsZWN0b3IgPT09IFwiKlwiID9cblx0XHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9IDpcblx0XHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcblx0XHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xuXHRcdFx0dmFyIHBhdHRlcm4gPSBjbGFzc0NhY2hlWyBjbGFzc05hbWUgKyBcIiBcIiBdO1xuXG5cdFx0XHRyZXR1cm4gcGF0dGVybiB8fFxuXHRcdFx0XHQocGF0dGVybiA9IG5ldyBSZWdFeHAoIFwiKF58XCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIgKyBjbGFzc05hbWUgKyBcIihcIiArIHdoaXRlc3BhY2UgKyBcInwkKVwiICkpICYmXG5cdFx0XHRcdGNsYXNzQ2FjaGUoIGNsYXNzTmFtZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdCggdHlwZW9mIGVsZW0uY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW0uY2xhc3NOYW1lIHx8IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIgKTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdFwiQVRUUlwiOiBmdW5jdGlvbiggbmFtZSwgb3BlcmF0b3IsIGNoZWNrICkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gU2l6emxlLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdFx0XHRpZiAoIHJlc3VsdCA9PSBudWxsICkge1xuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciA9PT0gXCIhPVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggIW9wZXJhdG9yICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzdWx0ICs9IFwiXCI7XG5cblx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIj1cIiA/IHJlc3VsdCA9PT0gY2hlY2sgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIiE9XCIgPyByZXN1bHQgIT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJePVwiID8gY2hlY2sgJiYgcmVzdWx0LmluZGV4T2YoIGNoZWNrICkgPT09IDAgOlxuXHRcdFx0XHRcdG9wZXJhdG9yID09PSBcIio9XCIgPyBjaGVjayAmJiByZXN1bHQuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCIkPVwiID8gY2hlY2sgJiYgcmVzdWx0LnNsaWNlKCAtY2hlY2subGVuZ3RoICkgPT09IGNoZWNrIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ+PVwiID8gKCBcIiBcIiArIHJlc3VsdC5yZXBsYWNlKCByd2hpdGVzcGFjZSwgXCIgXCIgKSArIFwiIFwiICkuaW5kZXhPZiggY2hlY2sgKSA+IC0xIDpcblx0XHRcdFx0XHRvcGVyYXRvciA9PT0gXCJ8PVwiID8gcmVzdWx0ID09PSBjaGVjayB8fCByZXN1bHQuc2xpY2UoIDAsIGNoZWNrLmxlbmd0aCArIDEgKSA9PT0gY2hlY2sgKyBcIi1cIiA6XG5cdFx0XHRcdFx0ZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRcIkNISUxEXCI6IGZ1bmN0aW9uKCB0eXBlLCB3aGF0LCBhcmd1bWVudCwgZmlyc3QsIGxhc3QgKSB7XG5cdFx0XHR2YXIgc2ltcGxlID0gdHlwZS5zbGljZSggMCwgMyApICE9PSBcIm50aFwiLFxuXHRcdFx0XHRmb3J3YXJkID0gdHlwZS5zbGljZSggLTQgKSAhPT0gXCJsYXN0XCIsXG5cdFx0XHRcdG9mVHlwZSA9IHdoYXQgPT09IFwib2YtdHlwZVwiO1xuXG5cdFx0XHRyZXR1cm4gZmlyc3QgPT09IDEgJiYgbGFzdCA9PT0gMCA/XG5cblx0XHRcdFx0Ly8gU2hvcnRjdXQgZm9yIDpudGgtKihuKVxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRyZXR1cm4gISFlbGVtLnBhcmVudE5vZGU7XG5cdFx0XHRcdH0gOlxuXG5cdFx0XHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGNhY2hlLCB1bmlxdWVDYWNoZSwgb3V0ZXJDYWNoZSwgbm9kZSwgbm9kZUluZGV4LCBzdGFydCxcblx0XHRcdFx0XHRcdGRpciA9IHNpbXBsZSAhPT0gZm9yd2FyZCA/IFwibmV4dFNpYmxpbmdcIiA6IFwicHJldmlvdXNTaWJsaW5nXCIsXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUsXG5cdFx0XHRcdFx0XHRuYW1lID0gb2ZUeXBlICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdHVzZUNhY2hlID0gIXhtbCAmJiAhb2ZUeXBlLFxuXHRcdFx0XHRcdFx0ZGlmZiA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cblx0XHRcdFx0XHRcdC8vIDooZmlyc3R8bGFzdHxvbmx5KS0oY2hpbGR8b2YtdHlwZSlcblx0XHRcdFx0XHRcdGlmICggc2ltcGxlICkge1xuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIGRpciApIHtcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbTtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gbm9kZVsgZGlyIF0pICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBvZlR5cGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmV2ZXJzZSBkaXJlY3Rpb24gZm9yIDpvbmx5LSogKGlmIHdlIGhhdmVuJ3QgeWV0IGRvbmUgc28pXG5cdFx0XHRcdFx0XHRcdFx0c3RhcnQgPSBkaXIgPSB0eXBlID09PSBcIm9ubHlcIiAmJiAhc3RhcnQgJiYgXCJuZXh0U2libGluZ1wiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzdGFydCA9IFsgZm9yd2FyZCA/IHBhcmVudC5maXJzdENoaWxkIDogcGFyZW50Lmxhc3RDaGlsZCBdO1xuXG5cdFx0XHRcdFx0XHQvLyBub24teG1sIDpudGgtY2hpbGQoLi4uKSBzdG9yZXMgY2FjaGUgZGF0YSBvbiBgcGFyZW50YFxuXHRcdFx0XHRcdFx0aWYgKCBmb3J3YXJkICYmIHVzZUNhY2hlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIFNlZWsgYGVsZW1gIGZyb20gYSBwcmV2aW91c2x5LWNhY2hlZCBpbmRleFxuXG5cdFx0XHRcdFx0XHRcdC8vIC4uLmluIGEgZ3ppcC1mcmllbmRseSB3YXlcblx0XHRcdFx0XHRcdFx0bm9kZSA9IHBhcmVudDtcblx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRjYWNoZSA9IHVuaXF1ZUNhY2hlWyB0eXBlIF0gfHwgW107XG5cdFx0XHRcdFx0XHRcdG5vZGVJbmRleCA9IGNhY2hlWyAwIF0gPT09IGRpcnJ1bnMgJiYgY2FjaGVbIDEgXTtcblx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleCAmJiBjYWNoZVsgMiBdO1xuXHRcdFx0XHRcdFx0XHRub2RlID0gbm9kZUluZGV4ICYmIHBhcmVudC5jaGlsZE5vZGVzWyBub2RlSW5kZXggXTtcblxuXHRcdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gKytub2RlSW5kZXggJiYgbm9kZSAmJiBub2RlWyBkaXIgXSB8fFxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gc2Vla2luZyBgZWxlbWAgZnJvbSB0aGUgc3RhcnRcblx0XHRcdFx0XHRcdFx0XHQoZGlmZiA9IG5vZGVJbmRleCA9IDApIHx8IHN0YXJ0LnBvcCgpKSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFdoZW4gZm91bmQsIGNhY2hlIGluZGV4ZXMgb24gYHBhcmVudGAgYW5kIGJyZWFrXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlID09PSAxICYmICsrZGlmZiAmJiBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgbm9kZUluZGV4LCBkaWZmIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gVXNlIHByZXZpb3VzbHktY2FjaGVkIGVsZW1lbnQgaW5kZXggaWYgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gLi4uaW4gYSBnemlwLWZyaWVuZGx5IHdheVxuXHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBlbGVtO1xuXHRcdFx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBub2RlWyBleHBhbmRvIF0gfHwgKG5vZGVbIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw5IG9ubHlcblx0XHRcdFx0XHRcdFx0XHQvLyBEZWZlbmQgYWdhaW5zdCBjbG9uZWQgYXR0cm9wZXJ0aWVzIChqUXVlcnkgZ2gtMTcwOSlcblx0XHRcdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0KG91dGVyQ2FjaGVbIG5vZGUudW5pcXVlSUQgXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0XHRcdGNhY2hlID0gdW5pcXVlQ2FjaGVbIHR5cGUgXSB8fCBbXTtcblx0XHRcdFx0XHRcdFx0XHRub2RlSW5kZXggPSBjYWNoZVsgMCBdID09PSBkaXJydW5zICYmIGNhY2hlWyAxIF07XG5cdFx0XHRcdFx0XHRcdFx0ZGlmZiA9IG5vZGVJbmRleDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIHhtbCA6bnRoLWNoaWxkKC4uLilcblx0XHRcdFx0XHRcdFx0Ly8gb3IgOm50aC1sYXN0LWNoaWxkKC4uLikgb3IgOm50aCgtbGFzdCk/LW9mLXR5cGUoLi4uKVxuXHRcdFx0XHRcdFx0XHRpZiAoIGRpZmYgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFVzZSB0aGUgc2FtZSBsb29wIGFzIGFib3ZlIHRvIHNlZWsgYGVsZW1gIGZyb20gdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9ICsrbm9kZUluZGV4ICYmIG5vZGUgJiYgbm9kZVsgZGlyIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRcdChkaWZmID0gbm9kZUluZGV4ID0gMCkgfHwgc3RhcnQucG9wKCkpICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICggb2ZUeXBlID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9PT0gMSApICYmXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCsrZGlmZiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBDYWNoZSB0aGUgaW5kZXggb2YgZWFjaCBlbmNvdW50ZXJlZCBlbGVtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggdXNlQ2FjaGUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3V0ZXJDYWNoZSA9IG5vZGVbIGV4cGFuZG8gXSB8fCAobm9kZVsgZXhwYW5kbyBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmVuZCBhZ2FpbnN0IGNsb25lZCBhdHRyb3BlcnRpZXMgKGpRdWVyeSBnaC0xNzA5KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVuaXF1ZUNhY2hlID0gb3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQob3V0ZXJDYWNoZVsgbm9kZS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIHR5cGUgXSA9IFsgZGlycnVucywgZGlmZiBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBub2RlID09PSBlbGVtICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEluY29ycG9yYXRlIHRoZSBvZmZzZXQsIHRoZW4gY2hlY2sgYWdhaW5zdCBjeWNsZSBzaXplXG5cdFx0XHRcdFx0XHRkaWZmIC09IGxhc3Q7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlmZiA9PT0gZmlyc3QgfHwgKCBkaWZmICUgZmlyc3QgPT09IDAgJiYgZGlmZiAvIGZpcnN0ID49IDAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0fSxcblxuXHRcdFwiUFNFVURPXCI6IGZ1bmN0aW9uKCBwc2V1ZG8sIGFyZ3VtZW50ICkge1xuXHRcdFx0Ly8gcHNldWRvLWNsYXNzIG5hbWVzIGFyZSBjYXNlLWluc2Vuc2l0aXZlXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI3BzZXVkby1jbGFzc2VzXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xuXHRcdFx0Ly8gUmVtZW1iZXIgdGhhdCBzZXRGaWx0ZXJzIGluaGVyaXRzIGZyb20gcHNldWRvc1xuXHRcdFx0dmFyIGFyZ3MsXG5cdFx0XHRcdGZuID0gRXhwci5wc2V1ZG9zWyBwc2V1ZG8gXSB8fCBFeHByLnNldEZpbHRlcnNbIHBzZXVkby50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgcHNldWRvOiBcIiArIHBzZXVkbyApO1xuXG5cdFx0XHQvLyBUaGUgdXNlciBtYXkgdXNlIGNyZWF0ZVBzZXVkbyB0byBpbmRpY2F0ZSB0aGF0XG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxuXHRcdFx0Ly8ganVzdCBhcyBTaXp6bGUgZG9lc1xuXHRcdFx0aWYgKCBmblsgZXhwYW5kbyBdICkge1xuXHRcdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1dCBtYWludGFpbiBzdXBwb3J0IGZvciBvbGQgc2lnbmF0dXJlc1xuXHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRhcmdzID0gWyBwc2V1ZG8sIHBzZXVkbywgXCJcIiwgYXJndW1lbnQgXTtcblx0XHRcdFx0cmV0dXJuIEV4cHIuc2V0RmlsdGVycy5oYXNPd25Qcm9wZXJ0eSggcHNldWRvLnRvTG93ZXJDYXNlKCkgKSA/XG5cdFx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzICkge1xuXHRcdFx0XHRcdFx0dmFyIGlkeCxcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZCA9IGZuKCBzZWVkLCBhcmd1bWVudCApLFxuXHRcdFx0XHRcdFx0XHRpID0gbWF0Y2hlZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0XHRcdFx0aWR4ID0gaW5kZXhPZiggc2VlZCwgbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0XHRzZWVkWyBpZHggXSA9ICEoIG1hdGNoZXNbIGlkeCBdID0gbWF0Y2hlZFtpXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pIDpcblx0XHRcdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xuXHRcdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbjtcblx0XHR9XG5cdH0sXG5cblx0cHNldWRvczoge1xuXHRcdC8vIFBvdGVudGlhbGx5IGNvbXBsZXggcHNldWRvc1xuXHRcdFwibm90XCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0XHQvLyBUcmltIHRoZSBzZWxlY3RvciBwYXNzZWQgdG8gY29tcGlsZVxuXHRcdFx0Ly8gdG8gYXZvaWQgdHJlYXRpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmdcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xuXHRcdFx0dmFyIGlucHV0ID0gW10sXG5cdFx0XHRcdHJlc3VsdHMgPSBbXSxcblx0XHRcdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSApO1xuXG5cdFx0XHRyZXR1cm4gbWF0Y2hlclsgZXhwYW5kbyBdID9cblx0XHRcdFx0bWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCBtYXRjaGVzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHRcdFx0dmFyIGVsZW0sXG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQgPSBtYXRjaGVyKCBzZWVkLCBudWxsLCB4bWwsIFtdICksXG5cdFx0XHRcdFx0XHRpID0gc2VlZC5sZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBNYXRjaCBlbGVtZW50cyB1bm1hdGNoZWQgYnkgYG1hdGNoZXJgXG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdFx0XHRcdFx0c2VlZFtpXSA9ICEobWF0Y2hlc1tpXSA9IGVsZW0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkgOlxuXHRcdFx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0XHRcdGlucHV0WzBdID0gZWxlbTtcblx0XHRcdFx0XHRtYXRjaGVyKCBpbnB1dCwgbnVsbCwgeG1sLCByZXN1bHRzICk7XG5cdFx0XHRcdFx0Ly8gRG9uJ3Qga2VlcCB0aGUgZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdFx0XHRpbnB1dFswXSA9IG51bGw7XG5cdFx0XHRcdFx0cmV0dXJuICFyZXN1bHRzLnBvcCgpO1xuXHRcdFx0XHR9O1xuXHRcdH0pLFxuXG5cdFx0XCJoYXNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xuXHRcdFx0fTtcblx0XHR9KSxcblxuXHRcdFwiY29udGFpbnNcIjogbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCB0ZXh0ICkge1xuXHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0cmV0dXJuICggZWxlbS50ZXh0Q29udGVudCB8fCBnZXRUZXh0KCBlbGVtICkgKS5pbmRleE9mKCB0ZXh0ICkgPiAtMTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBcIldoZXRoZXIgYW4gZWxlbWVudCBpcyByZXByZXNlbnRlZCBieSBhIDpsYW5nKCkgc2VsZWN0b3Jcblx0XHQvLyBpcyBiYXNlZCBzb2xlbHkgb24gdGhlIGVsZW1lbnQncyBsYW5ndWFnZSB2YWx1ZVxuXHRcdC8vIGJlaW5nIGVxdWFsIHRvIHRoZSBpZGVudGlmaWVyIEMsXG5cdFx0Ly8gb3IgYmVnaW5uaW5nIHdpdGggdGhlIGlkZW50aWZpZXIgQyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBcIi1cIi5cblx0XHQvLyBUaGUgbWF0Y2hpbmcgb2YgQyBhZ2FpbnN0IHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UgdmFsdWUgaXMgcGVyZm9ybWVkIGNhc2UtaW5zZW5zaXRpdmVseS5cblx0XHQvLyBUaGUgaWRlbnRpZmllciBDIGRvZXMgbm90IGhhdmUgdG8gYmUgYSB2YWxpZCBsYW5ndWFnZSBuYW1lLlwiXG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNsYW5nLXBzZXVkb1xuXHRcdFwibGFuZ1wiOiBtYXJrRnVuY3Rpb24oIGZ1bmN0aW9uKCBsYW5nICkge1xuXHRcdFx0Ly8gbGFuZyB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclxuXHRcdFx0aWYgKCAhcmlkZW50aWZpZXIudGVzdChsYW5nIHx8IFwiXCIpICkge1xuXHRcdFx0XHRTaXp6bGUuZXJyb3IoIFwidW5zdXBwb3J0ZWQgbGFuZzogXCIgKyBsYW5nICk7XG5cdFx0XHR9XG5cdFx0XHRsYW5nID0gbGFuZy5yZXBsYWNlKCBydW5lc2NhcGUsIGZ1bmVzY2FwZSApLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciBlbGVtTGFuZztcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdGlmICggKGVsZW1MYW5nID0gZG9jdW1lbnRJc0hUTUwgP1xuXHRcdFx0XHRcdFx0ZWxlbS5sYW5nIDpcblx0XHRcdFx0XHRcdGVsZW0uZ2V0QXR0cmlidXRlKFwieG1sOmxhbmdcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpKSApIHtcblxuXHRcdFx0XHRcdFx0ZWxlbUxhbmcgPSBlbGVtTGFuZy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1MYW5nID09PSBsYW5nIHx8IGVsZW1MYW5nLmluZGV4T2YoIGxhbmcgKyBcIi1cIiApID09PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSB3aGlsZSAoIChlbGVtID0gZWxlbS5wYXJlbnROb2RlKSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH07XG5cdFx0fSksXG5cblx0XHQvLyBNaXNjZWxsYW5lb3VzXG5cdFx0XCJ0YXJnZXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubG9jYXRpb24uaGFzaDtcblx0XHRcdHJldHVybiBoYXNoICYmIGhhc2guc2xpY2UoIDEgKSA9PT0gZWxlbS5pZDtcblx0XHR9LFxuXG5cdFx0XCJyb290XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvY0VsZW07XG5cdFx0fSxcblxuXHRcdFwiZm9jdXNcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIWRvY3VtZW50Lmhhc0ZvY3VzIHx8IGRvY3VtZW50Lmhhc0ZvY3VzKCkpICYmICEhKGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgfHwgfmVsZW0udGFiSW5kZXgpO1xuXHRcdH0sXG5cblx0XHQvLyBCb29sZWFuIHByb3BlcnRpZXNcblx0XHRcImVuYWJsZWRcIjogY3JlYXRlRGlzYWJsZWRQc2V1ZG8oIGZhbHNlICksXG5cdFx0XCJkaXNhYmxlZFwiOiBjcmVhdGVEaXNhYmxlZFBzZXVkbyggdHJ1ZSApLFxuXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0Ly8gSW4gQ1NTMywgOmNoZWNrZWQgc2hvdWxkIHJldHVybiBib3RoIGNoZWNrZWQgYW5kIHNlbGVjdGVkIGVsZW1lbnRzXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1JFQy1jc3MzLXNlbGVjdG9ycy0yMDExMDkyOS8jY2hlY2tlZFxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0cmV0dXJuIChub2RlTmFtZSA9PT0gXCJpbnB1dFwiICYmICEhZWxlbS5jaGVja2VkKSB8fCAobm9kZU5hbWUgPT09IFwib3B0aW9uXCIgJiYgISFlbGVtLnNlbGVjdGVkKTtcblx0XHR9LFxuXG5cdFx0XCJzZWxlY3RlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIEFjY2Vzc2luZyB0aGlzIHByb3BlcnR5IG1ha2VzIHNlbGVjdGVkLWJ5LWRlZmF1bHRcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcblx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRlbGVtLnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGVsZW0uc2VsZWN0ZWQgPT09IHRydWU7XG5cdFx0fSxcblxuXHRcdC8vIENvbnRlbnRzXG5cdFx0XCJlbXB0eVwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3NlbGVjdG9ycy8jZW1wdHktcHNldWRvXG5cdFx0XHQvLyA6ZW1wdHkgaXMgbmVnYXRlZCBieSBlbGVtZW50ICgxKSBvciBjb250ZW50IG5vZGVzICh0ZXh0OiAzOyBjZGF0YTogNDsgZW50aXR5IHJlZjogNSksXG5cdFx0XHQvLyAgIGJ1dCBub3QgYnkgb3RoZXJzIChjb21tZW50OiA4OyBwcm9jZXNzaW5nIGluc3RydWN0aW9uOiA3OyBldGMuKVxuXHRcdFx0Ly8gbm9kZVR5cGUgPCA2IHdvcmtzIGJlY2F1c2UgYXR0cmlidXRlcyAoMikgZG8gbm90IGFwcGVhciBhcyBjaGlsZHJlblxuXHRcdFx0Zm9yICggZWxlbSA9IGVsZW0uZmlyc3RDaGlsZDsgZWxlbTsgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmcgKSB7XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA8IDYgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0XCJwYXJlbnRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gIUV4cHIucHNldWRvc1tcImVtcHR5XCJdKCBlbGVtICk7XG5cdFx0fSxcblxuXHRcdC8vIEVsZW1lbnQvaW5wdXQgdHlwZXNcblx0XHRcImhlYWRlclwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJpbnB1dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcblx0XHR9LFxuXG5cdFx0XCJidXR0b25cIjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgbmFtZSA9IGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XG5cdFx0fSxcblxuXHRcdFwidGV4dFwiOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBhdHRyO1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiICYmXG5cdFx0XHRcdGVsZW0udHlwZSA9PT0gXCJ0ZXh0XCIgJiZcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBJRTw4XG5cdFx0XHRcdC8vIE5ldyBIVE1MNSBhdHRyaWJ1dGUgdmFsdWVzIChlLmcuLCBcInNlYXJjaFwiKSBhcHBlYXIgd2l0aCBlbGVtLnR5cGUgPT09IFwidGV4dFwiXG5cdFx0XHRcdCggKGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIikpID09IG51bGwgfHwgYXR0ci50b0xvd2VyQ2FzZSgpID09PSBcInRleHRcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBQb3NpdGlvbi1pbi1jb2xsZWN0aW9uXG5cdFx0XCJmaXJzdFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIFsgMCBdO1xuXHRcdH0pLFxuXG5cdFx0XCJsYXN0XCI6IGNyZWF0ZVBvc2l0aW9uYWxQc2V1ZG8oZnVuY3Rpb24oIG1hdGNoSW5kZXhlcywgbGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIFsgbGVuZ3RoIC0gMSBdO1xuXHRcdH0pLFxuXG5cdFx0XCJlcVwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gWyBhcmd1bWVudCA8IDAgPyBhcmd1bWVudCArIGxlbmd0aCA6IGFyZ3VtZW50IF07XG5cdFx0fSksXG5cblx0XHRcImV2ZW5cIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGggKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkgKz0gMiApIHtcblx0XHRcdFx0bWF0Y2hJbmRleGVzLnB1c2goIGkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtYXRjaEluZGV4ZXM7XG5cdFx0fSksXG5cblx0XHRcIm9kZFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCApIHtcblx0XHRcdHZhciBpID0gMTtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSArPSAyICkge1xuXHRcdFx0XHRtYXRjaEluZGV4ZXMucHVzaCggaSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1hdGNoSW5kZXhlcztcblx0XHR9KSxcblxuXHRcdFwibHRcIjogY3JlYXRlUG9zaXRpb25hbFBzZXVkbyhmdW5jdGlvbiggbWF0Y2hJbmRleGVzLCBsZW5ndGgsIGFyZ3VtZW50ICkge1xuXHRcdFx0dmFyIGkgPSBhcmd1bWVudCA8IDAgP1xuXHRcdFx0XHRhcmd1bWVudCArIGxlbmd0aCA6XG5cdFx0XHRcdGFyZ3VtZW50ID4gbGVuZ3RoID9cblx0XHRcdFx0XHRsZW5ndGggOlxuXHRcdFx0XHRcdGFyZ3VtZW50O1xuXHRcdFx0Zm9yICggOyAtLWkgPj0gMDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pLFxuXG5cdFx0XCJndFwiOiBjcmVhdGVQb3NpdGlvbmFsUHNldWRvKGZ1bmN0aW9uKCBtYXRjaEluZGV4ZXMsIGxlbmd0aCwgYXJndW1lbnQgKSB7XG5cdFx0XHR2YXIgaSA9IGFyZ3VtZW50IDwgMCA/IGFyZ3VtZW50ICsgbGVuZ3RoIDogYXJndW1lbnQ7XG5cdFx0XHRmb3IgKCA7ICsraSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdG1hdGNoSW5kZXhlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWF0Y2hJbmRleGVzO1xuXHRcdH0pXG5cdH1cbn07XG5cbkV4cHIucHNldWRvc1tcIm50aFwiXSA9IEV4cHIucHNldWRvc1tcImVxXCJdO1xuXG4vLyBBZGQgYnV0dG9uL2lucHV0IHR5cGUgcHNldWRvc1xuZm9yICggaSBpbiB7IHJhZGlvOiB0cnVlLCBjaGVja2JveDogdHJ1ZSwgZmlsZTogdHJ1ZSwgcGFzc3dvcmQ6IHRydWUsIGltYWdlOiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlSW5wdXRQc2V1ZG8oIGkgKTtcbn1cbmZvciAoIGkgaW4geyBzdWJtaXQ6IHRydWUsIHJlc2V0OiB0cnVlIH0gKSB7XG5cdEV4cHIucHNldWRvc1sgaSBdID0gY3JlYXRlQnV0dG9uUHNldWRvKCBpICk7XG59XG5cbi8vIEVhc3kgQVBJIGZvciBjcmVhdGluZyBuZXcgc2V0RmlsdGVyc1xuZnVuY3Rpb24gc2V0RmlsdGVycygpIHt9XG5zZXRGaWx0ZXJzLnByb3RvdHlwZSA9IEV4cHIuZmlsdGVycyA9IEV4cHIucHNldWRvcztcbkV4cHIuc2V0RmlsdGVycyA9IG5ldyBzZXRGaWx0ZXJzKCk7XG5cbnRva2VuaXplID0gU2l6emxlLnRva2VuaXplID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBwYXJzZU9ubHkgKSB7XG5cdHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxuXHRcdHNvRmFyLCBncm91cHMsIHByZUZpbHRlcnMsXG5cdFx0Y2FjaGVkID0gdG9rZW5DYWNoZVsgc2VsZWN0b3IgKyBcIiBcIiBdO1xuXG5cdGlmICggY2FjaGVkICkge1xuXHRcdHJldHVybiBwYXJzZU9ubHkgPyAwIDogY2FjaGVkLnNsaWNlKCAwICk7XG5cdH1cblxuXHRzb0ZhciA9IHNlbGVjdG9yO1xuXHRncm91cHMgPSBbXTtcblx0cHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xuXG5cdHdoaWxlICggc29GYXIgKSB7XG5cblx0XHQvLyBDb21tYSBhbmQgZmlyc3QgcnVuXG5cdFx0aWYgKCAhbWF0Y2hlZCB8fCAobWF0Y2ggPSByY29tbWEuZXhlYyggc29GYXIgKSkgKSB7XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXHRcdFx0XHQvLyBEb24ndCBjb25zdW1lIHRyYWlsaW5nIGNvbW1hcyBhcyB2YWxpZFxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFswXS5sZW5ndGggKSB8fCBzb0Zhcjtcblx0XHRcdH1cblx0XHRcdGdyb3Vwcy5wdXNoKCAodG9rZW5zID0gW10pICk7XG5cdFx0fVxuXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xuXG5cdFx0Ly8gQ29tYmluYXRvcnNcblx0XHRpZiAoIChtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApKSApIHtcblx0XHRcdG1hdGNoZWQgPSBtYXRjaC5zaGlmdCgpO1xuXHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHR2YWx1ZTogbWF0Y2hlZCxcblx0XHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXG5cdFx0XHRcdHR5cGU6IG1hdGNoWzBdLnJlcGxhY2UoIHJ0cmltLCBcIiBcIiApXG5cdFx0XHR9KTtcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0fVxuXG5cdFx0Ly8gRmlsdGVyc1xuXHRcdGZvciAoIHR5cGUgaW4gRXhwci5maWx0ZXIgKSB7XG5cdFx0XHRpZiAoIChtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkpICYmICghcHJlRmlsdGVyc1sgdHlwZSBdIHx8XG5cdFx0XHRcdChtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXSggbWF0Y2ggKSkpICkge1xuXHRcdFx0XHRtYXRjaGVkID0gbWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dG9rZW5zLnB1c2goe1xuXHRcdFx0XHRcdHZhbHVlOiBtYXRjaGVkLFxuXHRcdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdFx0bWF0Y2hlczogbWF0Y2hcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoZWQubGVuZ3RoICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCAhbWF0Y2hlZCApIHtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbGVuZ3RoIG9mIHRoZSBpbnZhbGlkIGV4Y2Vzc1xuXHQvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcblx0Ly8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvciBvciByZXR1cm4gdG9rZW5zXG5cdHJldHVybiBwYXJzZU9ubHkgP1xuXHRcdHNvRmFyLmxlbmd0aCA6XG5cdFx0c29GYXIgP1xuXHRcdFx0U2l6emxlLmVycm9yKCBzZWxlY3RvciApIDpcblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcblx0XHRcdHRva2VuQ2FjaGUoIHNlbGVjdG9yLCBncm91cHMgKS5zbGljZSggMCApO1xufTtcblxuZnVuY3Rpb24gdG9TZWxlY3RvciggdG9rZW5zICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gdG9rZW5zLmxlbmd0aCxcblx0XHRzZWxlY3RvciA9IFwiXCI7XG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHNlbGVjdG9yICs9IHRva2Vuc1tpXS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGFkZENvbWJpbmF0b3IoIG1hdGNoZXIsIGNvbWJpbmF0b3IsIGJhc2UgKSB7XG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcblx0XHRza2lwID0gY29tYmluYXRvci5uZXh0LFxuXHRcdGtleSA9IHNraXAgfHwgZGlyLFxuXHRcdGNoZWNrTm9uRWxlbWVudHMgPSBiYXNlICYmIGtleSA9PT0gXCJwYXJlbnROb2RlXCIsXG5cdFx0ZG9uZU5hbWUgPSBkb25lKys7XG5cblx0cmV0dXJuIGNvbWJpbmF0b3IuZmlyc3QgP1xuXHRcdC8vIENoZWNrIGFnYWluc3QgY2xvc2VzdCBhbmNlc3Rvci9wcmVjZWRpbmcgZWxlbWVudFxuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xuXHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IDpcblxuXHRcdC8vIENoZWNrIGFnYWluc3QgYWxsIGFuY2VzdG9yL3ByZWNlZGluZyBlbGVtZW50c1xuXHRcdGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgb2xkQ2FjaGUsIHVuaXF1ZUNhY2hlLCBvdXRlckNhY2hlLFxuXHRcdFx0XHRuZXdDYWNoZSA9IFsgZGlycnVucywgZG9uZU5hbWUgXTtcblxuXHRcdFx0Ly8gV2UgY2FuJ3Qgc2V0IGFyYml0cmFyeSBkYXRhIG9uIFhNTCBub2Rlcywgc28gdGhleSBkb24ndCBiZW5lZml0IGZyb20gY29tYmluYXRvciBjYWNoaW5nXG5cdFx0XHRpZiAoIHhtbCApIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlciggZWxlbSwgY29udGV4dCwgeG1sICkgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcblx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgY2hlY2tOb25FbGVtZW50cyApIHtcblx0XHRcdFx0XHRcdG91dGVyQ2FjaGUgPSBlbGVtWyBleHBhbmRvIF0gfHwgKGVsZW1bIGV4cGFuZG8gXSA9IHt9KTtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPDkgb25seVxuXHRcdFx0XHRcdFx0Ly8gRGVmZW5kIGFnYWluc3QgY2xvbmVkIGF0dHJvcGVydGllcyAoalF1ZXJ5IGdoLTE3MDkpXG5cdFx0XHRcdFx0XHR1bmlxdWVDYWNoZSA9IG91dGVyQ2FjaGVbIGVsZW0udW5pcXVlSUQgXSB8fCAob3V0ZXJDYWNoZVsgZWxlbS51bmlxdWVJRCBdID0ge30pO1xuXG5cdFx0XHRcdFx0XHRpZiAoIHNraXAgJiYgc2tpcCA9PT0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRcdFx0XHRlbGVtID0gZWxlbVsgZGlyIF0gfHwgZWxlbTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIChvbGRDYWNoZSA9IHVuaXF1ZUNhY2hlWyBrZXkgXSkgJiZcblx0XHRcdFx0XHRcdFx0b2xkQ2FjaGVbIDAgXSA9PT0gZGlycnVucyAmJiBvbGRDYWNoZVsgMSBdID09PSBkb25lTmFtZSApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBc3NpZ24gdG8gbmV3Q2FjaGUgc28gcmVzdWx0cyBiYWNrLXByb3BhZ2F0ZSB0byBwcmV2aW91cyBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKG5ld0NhY2hlWyAyIF0gPSBvbGRDYWNoZVsgMiBdKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJldXNlIG5ld2NhY2hlIHNvIHJlc3VsdHMgYmFjay1wcm9wYWdhdGUgdG8gcHJldmlvdXMgZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0dW5pcXVlQ2FjaGVbIGtleSBdID0gbmV3Q2FjaGU7XG5cblx0XHRcdFx0XHRcdFx0Ly8gQSBtYXRjaCBtZWFucyB3ZSdyZSBkb25lOyBhIGZhaWwgbWVhbnMgd2UgaGF2ZSB0byBrZWVwIGNoZWNraW5nXG5cdFx0XHRcdFx0XHRcdGlmICggKG5ld0NhY2hlWyAyIF0gPSBtYXRjaGVyKCBlbGVtLCBjb250ZXh0LCB4bWwgKSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSB7XG5cdHJldHVybiBtYXRjaGVycy5sZW5ndGggPiAxID9cblx0XHRmdW5jdGlvbiggZWxlbSwgY29udGV4dCwgeG1sICkge1xuXHRcdFx0dmFyIGkgPSBtYXRjaGVycy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdFx0aWYgKCAhbWF0Y2hlcnNbaV0oIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSA6XG5cdFx0bWF0Y2hlcnNbMF07XG59XG5cbmZ1bmN0aW9uIG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yLCBjb250ZXh0cywgcmVzdWx0cyApIHtcblx0dmFyIGkgPSAwLFxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0U2l6emxlKCBzZWxlY3RvciwgY29udGV4dHNbaV0sIHJlc3VsdHMgKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gY29uZGVuc2UoIHVubWF0Y2hlZCwgbWFwLCBmaWx0ZXIsIGNvbnRleHQsIHhtbCApIHtcblx0dmFyIGVsZW0sXG5cdFx0bmV3VW5tYXRjaGVkID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bGVuID0gdW5tYXRjaGVkLmxlbmd0aCxcblx0XHRtYXBwZWQgPSBtYXAgIT0gbnVsbDtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChlbGVtID0gdW5tYXRjaGVkW2ldKSApIHtcblx0XHRcdGlmICggIWZpbHRlciB8fCBmaWx0ZXIoIGVsZW0sIGNvbnRleHQsIHhtbCApICkge1xuXHRcdFx0XHRuZXdVbm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRpZiAoIG1hcHBlZCApIHtcblx0XHRcdFx0XHRtYXAucHVzaCggaSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG5ld1VubWF0Y2hlZDtcbn1cblxuZnVuY3Rpb24gc2V0TWF0Y2hlciggcHJlRmlsdGVyLCBzZWxlY3RvciwgbWF0Y2hlciwgcG9zdEZpbHRlciwgcG9zdEZpbmRlciwgcG9zdFNlbGVjdG9yICkge1xuXHRpZiAoIHBvc3RGaWx0ZXIgJiYgIXBvc3RGaWx0ZXJbIGV4cGFuZG8gXSApIHtcblx0XHRwb3N0RmlsdGVyID0gc2V0TWF0Y2hlciggcG9zdEZpbHRlciApO1xuXHR9XG5cdGlmICggcG9zdEZpbmRlciAmJiAhcG9zdEZpbmRlclsgZXhwYW5kbyBdICkge1xuXHRcdHBvc3RGaW5kZXIgPSBzZXRNYXRjaGVyKCBwb3N0RmluZGVyLCBwb3N0U2VsZWN0b3IgKTtcblx0fVxuXHRyZXR1cm4gbWFya0Z1bmN0aW9uKGZ1bmN0aW9uKCBzZWVkLCByZXN1bHRzLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0dmFyIHRlbXAsIGksIGVsZW0sXG5cdFx0XHRwcmVNYXAgPSBbXSxcblx0XHRcdHBvc3RNYXAgPSBbXSxcblx0XHRcdHByZWV4aXN0aW5nID0gcmVzdWx0cy5sZW5ndGgsXG5cblx0XHRcdC8vIEdldCBpbml0aWFsIGVsZW1lbnRzIGZyb20gc2VlZCBvciBjb250ZXh0XG5cdFx0XHRlbGVtcyA9IHNlZWQgfHwgbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IgfHwgXCIqXCIsIGNvbnRleHQubm9kZVR5cGUgPyBbIGNvbnRleHQgXSA6IGNvbnRleHQsIFtdICksXG5cblx0XHRcdC8vIFByZWZpbHRlciB0byBnZXQgbWF0Y2hlciBpbnB1dCwgcHJlc2VydmluZyBhIG1hcCBmb3Igc2VlZC1yZXN1bHRzIHN5bmNocm9uaXphdGlvblxuXHRcdFx0bWF0Y2hlckluID0gcHJlRmlsdGVyICYmICggc2VlZCB8fCAhc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGNvbmRlbnNlKCBlbGVtcywgcHJlTWFwLCBwcmVGaWx0ZXIsIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0ZWxlbXMsXG5cblx0XHRcdG1hdGNoZXJPdXQgPSBtYXRjaGVyID9cblx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIHBvc3RGaW5kZXIsIG9yIGZpbHRlcmVkIHNlZWQsIG9yIG5vbi1zZWVkIHBvc3RGaWx0ZXIgb3IgcHJlZXhpc3RpbmcgcmVzdWx0cyxcblx0XHRcdFx0cG9zdEZpbmRlciB8fCAoIHNlZWQgPyBwcmVGaWx0ZXIgOiBwcmVleGlzdGluZyB8fCBwb3N0RmlsdGVyICkgP1xuXG5cdFx0XHRcdFx0Ly8gLi4uaW50ZXJtZWRpYXRlIHByb2Nlc3NpbmcgaXMgbmVjZXNzYXJ5XG5cdFx0XHRcdFx0W10gOlxuXG5cdFx0XHRcdFx0Ly8gLi4ub3RoZXJ3aXNlIHVzZSByZXN1bHRzIGRpcmVjdGx5XG5cdFx0XHRcdFx0cmVzdWx0cyA6XG5cdFx0XHRcdG1hdGNoZXJJbjtcblxuXHRcdC8vIEZpbmQgcHJpbWFyeSBtYXRjaGVzXG5cdFx0aWYgKCBtYXRjaGVyICkge1xuXHRcdFx0bWF0Y2hlciggbWF0Y2hlckluLCBtYXRjaGVyT3V0LCBjb250ZXh0LCB4bWwgKTtcblx0XHR9XG5cblx0XHQvLyBBcHBseSBwb3N0RmlsdGVyXG5cdFx0aWYgKCBwb3N0RmlsdGVyICkge1xuXHRcdFx0dGVtcCA9IGNvbmRlbnNlKCBtYXRjaGVyT3V0LCBwb3N0TWFwICk7XG5cdFx0XHRwb3N0RmlsdGVyKCB0ZW1wLCBbXSwgY29udGV4dCwgeG1sICk7XG5cblx0XHRcdC8vIFVuLW1hdGNoIGZhaWxpbmcgZWxlbWVudHMgYnkgbW92aW5nIHRoZW0gYmFjayB0byBtYXRjaGVySW5cblx0XHRcdGkgPSB0ZW1wLmxlbmd0aDtcblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRpZiAoIChlbGVtID0gdGVtcFtpXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlck91dFsgcG9zdE1hcFtpXSBdID0gIShtYXRjaGVySW5bIHBvc3RNYXBbaV0gXSA9IGVsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0aWYgKCBwb3N0RmluZGVyIHx8IHByZUZpbHRlciApIHtcblx0XHRcdFx0aWYgKCBwb3N0RmluZGVyICkge1xuXHRcdFx0XHRcdC8vIEdldCB0aGUgZmluYWwgbWF0Y2hlck91dCBieSBjb25kZW5zaW5nIHRoaXMgaW50ZXJtZWRpYXRlIGludG8gcG9zdEZpbmRlciBjb250ZXh0c1xuXHRcdFx0XHRcdHRlbXAgPSBbXTtcblx0XHRcdFx0XHRpID0gbWF0Y2hlck91dC5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRpZiAoIChlbGVtID0gbWF0Y2hlck91dFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFJlc3RvcmUgbWF0Y2hlckluIHNpbmNlIGVsZW0gaXMgbm90IHlldCBhIGZpbmFsIG1hdGNoXG5cdFx0XHRcdFx0XHRcdHRlbXAucHVzaCggKG1hdGNoZXJJbltpXSA9IGVsZW0pICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHBvc3RGaW5kZXIoIG51bGwsIChtYXRjaGVyT3V0ID0gW10pLCB0ZW1wLCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIE1vdmUgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlZWQgdG8gcmVzdWx0cyB0byBrZWVwIHRoZW0gc3luY2hyb25pemVkXG5cdFx0XHRcdGkgPSBtYXRjaGVyT3V0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0aWYgKCAoZWxlbSA9IG1hdGNoZXJPdXRbaV0pICYmXG5cdFx0XHRcdFx0XHQodGVtcCA9IHBvc3RGaW5kZXIgPyBpbmRleE9mKCBzZWVkLCBlbGVtICkgOiBwcmVNYXBbaV0pID4gLTEgKSB7XG5cblx0XHRcdFx0XHRcdHNlZWRbdGVtcF0gPSAhKHJlc3VsdHNbdGVtcF0gPSBlbGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEFkZCBlbGVtZW50cyB0byByZXN1bHRzLCB0aHJvdWdoIHBvc3RGaW5kZXIgaWYgZGVmaW5lZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtYXRjaGVyT3V0ID0gY29uZGVuc2UoXG5cdFx0XHRcdG1hdGNoZXJPdXQgPT09IHJlc3VsdHMgP1xuXHRcdFx0XHRcdG1hdGNoZXJPdXQuc3BsaWNlKCBwcmVleGlzdGluZywgbWF0Y2hlck91dC5sZW5ndGggKSA6XG5cdFx0XHRcdFx0bWF0Y2hlck91dFxuXHRcdFx0KTtcblx0XHRcdGlmICggcG9zdEZpbmRlciApIHtcblx0XHRcdFx0cG9zdEZpbmRlciggbnVsbCwgcmVzdWx0cywgbWF0Y2hlck91dCwgeG1sICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBtYXRjaGVyT3V0ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlckZyb21Ub2tlbnMoIHRva2VucyApIHtcblx0dmFyIGNoZWNrQ29udGV4dCwgbWF0Y2hlciwgaixcblx0XHRsZW4gPSB0b2tlbnMubGVuZ3RoLFxuXHRcdGxlYWRpbmdSZWxhdGl2ZSA9IEV4cHIucmVsYXRpdmVbIHRva2Vuc1swXS50eXBlIF0sXG5cdFx0aW1wbGljaXRSZWxhdGl2ZSA9IGxlYWRpbmdSZWxhdGl2ZSB8fCBFeHByLnJlbGF0aXZlW1wiIFwiXSxcblx0XHRpID0gbGVhZGluZ1JlbGF0aXZlID8gMSA6IDAsXG5cblx0XHQvLyBUaGUgZm91bmRhdGlvbmFsIG1hdGNoZXIgZW5zdXJlcyB0aGF0IGVsZW1lbnRzIGFyZSByZWFjaGFibGUgZnJvbSB0b3AtbGV2ZWwgY29udGV4dChzKVxuXHRcdG1hdGNoQ29udGV4dCA9IGFkZENvbWJpbmF0b3IoIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGNoZWNrQ29udGV4dDtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hBbnlDb250ZXh0ID0gYWRkQ29tYmluYXRvciggZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZiggY2hlY2tDb250ZXh0LCBlbGVtICkgPiAtMTtcblx0XHR9LCBpbXBsaWNpdFJlbGF0aXZlLCB0cnVlICksXG5cdFx0bWF0Y2hlcnMgPSBbIGZ1bmN0aW9uKCBlbGVtLCBjb250ZXh0LCB4bWwgKSB7XG5cdFx0XHR2YXIgcmV0ID0gKCAhbGVhZGluZ1JlbGF0aXZlICYmICggeG1sIHx8IGNvbnRleHQgIT09IG91dGVybW9zdENvbnRleHQgKSApIHx8IChcblx0XHRcdFx0KGNoZWNrQ29udGV4dCA9IGNvbnRleHQpLm5vZGVUeXBlID9cblx0XHRcdFx0XHRtYXRjaENvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApIDpcblx0XHRcdFx0XHRtYXRjaEFueUNvbnRleHQoIGVsZW0sIGNvbnRleHQsIHhtbCApICk7XG5cdFx0XHQvLyBBdm9pZCBoYW5naW5nIG9udG8gZWxlbWVudCAoaXNzdWUgIzI5OSlcblx0XHRcdGNoZWNrQ29udGV4dCA9IG51bGw7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH0gXTtcblxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRpZiAoIChtYXRjaGVyID0gRXhwci5yZWxhdGl2ZVsgdG9rZW5zW2ldLnR5cGUgXSkgKSB7XG5cdFx0XHRtYXRjaGVycyA9IFsgYWRkQ29tYmluYXRvcihlbGVtZW50TWF0Y2hlciggbWF0Y2hlcnMgKSwgbWF0Y2hlcikgXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWF0Y2hlciA9IEV4cHIuZmlsdGVyWyB0b2tlbnNbaV0udHlwZSBdLmFwcGx5KCBudWxsLCB0b2tlbnNbaV0ubWF0Y2hlcyApO1xuXG5cdFx0XHQvLyBSZXR1cm4gc3BlY2lhbCB1cG9uIHNlZWluZyBhIHBvc2l0aW9uYWwgbWF0Y2hlclxuXHRcdFx0aWYgKCBtYXRjaGVyWyBleHBhbmRvIF0gKSB7XG5cdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgcmVsYXRpdmUgb3BlcmF0b3IgKGlmIGFueSkgZm9yIHByb3BlciBoYW5kbGluZ1xuXHRcdFx0XHRqID0gKytpO1xuXHRcdFx0XHRmb3IgKCA7IGogPCBsZW47IGorKyApIHtcblx0XHRcdFx0XHRpZiAoIEV4cHIucmVsYXRpdmVbIHRva2Vuc1tqXS50eXBlIF0gKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNldE1hdGNoZXIoXG5cdFx0XHRcdFx0aSA+IDEgJiYgZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICksXG5cdFx0XHRcdFx0aSA+IDEgJiYgdG9TZWxlY3Rvcihcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBwcmVjZWRpbmcgdG9rZW4gd2FzIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yLCBpbnNlcnQgYW4gaW1wbGljaXQgYW55LWVsZW1lbnQgYCpgXG5cdFx0XHRcdFx0XHR0b2tlbnMuc2xpY2UoIDAsIGkgLSAxICkuY29uY2F0KHsgdmFsdWU6IHRva2Vuc1sgaSAtIDIgXS50eXBlID09PSBcIiBcIiA/IFwiKlwiIDogXCJcIiB9KVxuXHRcdFx0XHRcdCkucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApLFxuXHRcdFx0XHRcdG1hdGNoZXIsXG5cdFx0XHRcdFx0aSA8IGogJiYgbWF0Y2hlckZyb21Ub2tlbnMoIHRva2Vucy5zbGljZSggaSwgaiApICksXG5cdFx0XHRcdFx0aiA8IGxlbiAmJiBtYXRjaGVyRnJvbVRva2VucyggKHRva2VucyA9IHRva2Vucy5zbGljZSggaiApKSApLFxuXHRcdFx0XHRcdGogPCBsZW4gJiYgdG9TZWxlY3RvciggdG9rZW5zIClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdG1hdGNoZXJzLnB1c2goIG1hdGNoZXIgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudE1hdGNoZXIoIG1hdGNoZXJzICk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApIHtcblx0dmFyIGJ5U2V0ID0gc2V0TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRieUVsZW1lbnQgPSBlbGVtZW50TWF0Y2hlcnMubGVuZ3RoID4gMCxcblx0XHRzdXBlck1hdGNoZXIgPSBmdW5jdGlvbiggc2VlZCwgY29udGV4dCwgeG1sLCByZXN1bHRzLCBvdXRlcm1vc3QgKSB7XG5cdFx0XHR2YXIgZWxlbSwgaiwgbWF0Y2hlcixcblx0XHRcdFx0bWF0Y2hlZENvdW50ID0gMCxcblx0XHRcdFx0aSA9IFwiMFwiLFxuXHRcdFx0XHR1bm1hdGNoZWQgPSBzZWVkICYmIFtdLFxuXHRcdFx0XHRzZXRNYXRjaGVkID0gW10sXG5cdFx0XHRcdGNvbnRleHRCYWNrdXAgPSBvdXRlcm1vc3RDb250ZXh0LFxuXHRcdFx0XHQvLyBXZSBtdXN0IGFsd2F5cyBoYXZlIGVpdGhlciBzZWVkIGVsZW1lbnRzIG9yIG91dGVybW9zdCBjb250ZXh0XG5cdFx0XHRcdGVsZW1zID0gc2VlZCB8fCBieUVsZW1lbnQgJiYgRXhwci5maW5kW1wiVEFHXCJdKCBcIipcIiwgb3V0ZXJtb3N0ICksXG5cdFx0XHRcdC8vIFVzZSBpbnRlZ2VyIGRpcnJ1bnMgaWZmIHRoaXMgaXMgdGhlIG91dGVybW9zdCBtYXRjaGVyXG5cdFx0XHRcdGRpcnJ1bnNVbmlxdWUgPSAoZGlycnVucyArPSBjb250ZXh0QmFja3VwID09IG51bGwgPyAxIDogTWF0aC5yYW5kb20oKSB8fCAwLjEpLFxuXHRcdFx0XHRsZW4gPSBlbGVtcy5sZW5ndGg7XG5cblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRvdXRlcm1vc3RDb250ZXh0ID0gY29udGV4dCA9PT0gZG9jdW1lbnQgfHwgY29udGV4dCB8fCBvdXRlcm1vc3Q7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyBwYXNzaW5nIGVsZW1lbnRNYXRjaGVycyBkaXJlY3RseSB0byByZXN1bHRzXG5cdFx0XHQvLyBTdXBwb3J0OiBJRTw5LCBTYWZhcmlcblx0XHRcdC8vIFRvbGVyYXRlIE5vZGVMaXN0IHByb3BlcnRpZXMgKElFOiBcImxlbmd0aFwiOyBTYWZhcmk6IDxudW1iZXI+KSBtYXRjaGluZyBlbGVtZW50cyBieSBpZFxuXHRcdFx0Zm9yICggOyBpICE9PSBsZW4gJiYgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGJ5RWxlbWVudCAmJiBlbGVtICkge1xuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHRcdGlmICggIWNvbnRleHQgJiYgZWxlbS5vd25lckRvY3VtZW50ICE9PSBkb2N1bWVudCApIHtcblx0XHRcdFx0XHRcdHNldERvY3VtZW50KCBlbGVtICk7XG5cdFx0XHRcdFx0XHR4bWwgPSAhZG9jdW1lbnRJc0hUTUw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHdoaWxlICggKG1hdGNoZXIgPSBlbGVtZW50TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZXIoIGVsZW0sIGNvbnRleHQgfHwgZG9jdW1lbnQsIHhtbCkgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBvdXRlcm1vc3QgKSB7XG5cdFx0XHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBUcmFjayB1bm1hdGNoZWQgZWxlbWVudHMgZm9yIHNldCBmaWx0ZXJzXG5cdFx0XHRcdGlmICggYnlTZXQgKSB7XG5cdFx0XHRcdFx0Ly8gVGhleSB3aWxsIGhhdmUgZ29uZSB0aHJvdWdoIGFsbCBwb3NzaWJsZSBtYXRjaGVyc1xuXHRcdFx0XHRcdGlmICggKGVsZW0gPSAhbWF0Y2hlciAmJiBlbGVtKSApIHtcblx0XHRcdFx0XHRcdG1hdGNoZWRDb3VudC0tO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIExlbmd0aGVuIHRoZSBhcnJheSBmb3IgZXZlcnkgZWxlbWVudCwgbWF0Y2hlZCBvciBub3Rcblx0XHRcdFx0XHRpZiAoIHNlZWQgKSB7XG5cdFx0XHRcdFx0XHR1bm1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBgaWAgaXMgbm93IHRoZSBjb3VudCBvZiBlbGVtZW50cyB2aXNpdGVkIGFib3ZlLCBhbmQgYWRkaW5nIGl0IHRvIGBtYXRjaGVkQ291bnRgXG5cdFx0XHQvLyBtYWtlcyB0aGUgbGF0dGVyIG5vbm5lZ2F0aXZlLlxuXHRcdFx0bWF0Y2hlZENvdW50ICs9IGk7XG5cblx0XHRcdC8vIEFwcGx5IHNldCBmaWx0ZXJzIHRvIHVubWF0Y2hlZCBlbGVtZW50c1xuXHRcdFx0Ly8gTk9URTogVGhpcyBjYW4gYmUgc2tpcHBlZCBpZiB0aGVyZSBhcmUgbm8gdW5tYXRjaGVkIGVsZW1lbnRzIChpLmUuLCBgbWF0Y2hlZENvdW50YFxuXHRcdFx0Ly8gZXF1YWxzIGBpYCksIHVubGVzcyB3ZSBkaWRuJ3QgdmlzaXQgX2FueV8gZWxlbWVudHMgaW4gdGhlIGFib3ZlIGxvb3AgYmVjYXVzZSB3ZSBoYXZlXG5cdFx0XHQvLyBubyBlbGVtZW50IG1hdGNoZXJzIGFuZCBubyBzZWVkLlxuXHRcdFx0Ly8gSW5jcmVtZW50aW5nIGFuIGluaXRpYWxseS1zdHJpbmcgXCIwXCIgYGlgIGFsbG93cyBgaWAgdG8gcmVtYWluIGEgc3RyaW5nIG9ubHkgaW4gdGhhdFxuXHRcdFx0Ly8gY2FzZSwgd2hpY2ggd2lsbCByZXN1bHQgaW4gYSBcIjAwXCIgYG1hdGNoZWRDb3VudGAgdGhhdCBkaWZmZXJzIGZyb20gYGlgIGJ1dCBpcyBhbHNvXG5cdFx0XHQvLyBudW1lcmljYWxseSB6ZXJvLlxuXHRcdFx0aWYgKCBieVNldCAmJiBpICE9PSBtYXRjaGVkQ291bnQgKSB7XG5cdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR3aGlsZSAoIChtYXRjaGVyID0gc2V0TWF0Y2hlcnNbaisrXSkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlciggdW5tYXRjaGVkLCBzZXRNYXRjaGVkLCBjb250ZXh0LCB4bWwgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggc2VlZCApIHtcblx0XHRcdFx0XHQvLyBSZWludGVncmF0ZSBlbGVtZW50IG1hdGNoZXMgdG8gZWxpbWluYXRlIHRoZSBuZWVkIGZvciBzb3J0aW5nXG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkQ291bnQgPiAwICkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggISh1bm1hdGNoZWRbaV0gfHwgc2V0TWF0Y2hlZFtpXSkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0TWF0Y2hlZFtpXSA9IHBvcC5jYWxsKCByZXN1bHRzICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBEaXNjYXJkIGluZGV4IHBsYWNlaG9sZGVyIHZhbHVlcyB0byBnZXQgb25seSBhY3R1YWwgbWF0Y2hlc1xuXHRcdFx0XHRcdHNldE1hdGNoZWQgPSBjb25kZW5zZSggc2V0TWF0Y2hlZCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWRkIG1hdGNoZXMgdG8gcmVzdWx0c1xuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZXRNYXRjaGVkICk7XG5cblx0XHRcdFx0Ly8gU2VlZGxlc3Mgc2V0IG1hdGNoZXMgc3VjY2VlZGluZyBtdWx0aXBsZSBzdWNjZXNzZnVsIG1hdGNoZXJzIHN0aXB1bGF0ZSBzb3J0aW5nXG5cdFx0XHRcdGlmICggb3V0ZXJtb3N0ICYmICFzZWVkICYmIHNldE1hdGNoZWQubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdCggbWF0Y2hlZENvdW50ICsgc2V0TWF0Y2hlcnMubGVuZ3RoICkgPiAxICkge1xuXG5cdFx0XHRcdFx0U2l6emxlLnVuaXF1ZVNvcnQoIHJlc3VsdHMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdmVycmlkZSBtYW5pcHVsYXRpb24gb2YgZ2xvYmFscyBieSBuZXN0ZWQgbWF0Y2hlcnNcblx0XHRcdGlmICggb3V0ZXJtb3N0ICkge1xuXHRcdFx0XHRkaXJydW5zID0gZGlycnVuc1VuaXF1ZTtcblx0XHRcdFx0b3V0ZXJtb3N0Q29udGV4dCA9IGNvbnRleHRCYWNrdXA7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB1bm1hdGNoZWQ7XG5cdFx0fTtcblxuXHRyZXR1cm4gYnlTZXQgP1xuXHRcdG1hcmtGdW5jdGlvbiggc3VwZXJNYXRjaGVyICkgOlxuXHRcdHN1cGVyTWF0Y2hlcjtcbn1cblxuY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBtYXRjaCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0dmFyIGksXG5cdFx0c2V0TWF0Y2hlcnMgPSBbXSxcblx0XHRlbGVtZW50TWF0Y2hlcnMgPSBbXSxcblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlWyBzZWxlY3RvciArIFwiIFwiIF07XG5cblx0aWYgKCAhY2FjaGVkICkge1xuXHRcdC8vIEdlbmVyYXRlIGEgZnVuY3Rpb24gb2YgcmVjdXJzaXZlIGZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNoZWNrIGVhY2ggZWxlbWVudFxuXHRcdGlmICggIW1hdGNoICkge1xuXHRcdFx0bWF0Y2ggPSB0b2tlbml6ZSggc2VsZWN0b3IgKTtcblx0XHR9XG5cdFx0aSA9IG1hdGNoLmxlbmd0aDtcblx0XHR3aGlsZSAoIGktLSApIHtcblx0XHRcdGNhY2hlZCA9IG1hdGNoZXJGcm9tVG9rZW5zKCBtYXRjaFtpXSApO1xuXHRcdFx0aWYgKCBjYWNoZWRbIGV4cGFuZG8gXSApIHtcblx0XHRcdFx0c2V0TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtZW50TWF0Y2hlcnMucHVzaCggY2FjaGVkICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2FjaGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0Y2FjaGVkID0gY29tcGlsZXJDYWNoZSggc2VsZWN0b3IsIG1hdGNoZXJGcm9tR3JvdXBNYXRjaGVycyggZWxlbWVudE1hdGNoZXJzLCBzZXRNYXRjaGVycyApICk7XG5cblx0XHQvLyBTYXZlIHNlbGVjdG9yIGFuZCB0b2tlbml6YXRpb25cblx0XHRjYWNoZWQuc2VsZWN0b3IgPSBzZWxlY3Rvcjtcblx0fVxuXHRyZXR1cm4gY2FjaGVkO1xufTtcblxuLyoqXG4gKiBBIGxvdy1sZXZlbCBzZWxlY3Rpb24gZnVuY3Rpb24gdGhhdCB3b3JrcyB3aXRoIFNpenpsZSdzIGNvbXBpbGVkXG4gKiAgc2VsZWN0b3IgZnVuY3Rpb25zXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gc2VsZWN0b3IgQSBzZWxlY3RvciBvciBhIHByZS1jb21waWxlZFxuICogIHNlbGVjdG9yIGZ1bmN0aW9uIGJ1aWx0IHdpdGggU2l6emxlLmNvbXBpbGVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGV4dFxuICogQHBhcmFtIHtBcnJheX0gW3Jlc3VsdHNdXG4gKiBAcGFyYW0ge0FycmF5fSBbc2VlZF0gQSBzZXQgb2YgZWxlbWVudHMgdG8gbWF0Y2ggYWdhaW5zdFxuICovXG5zZWxlY3QgPSBTaXp6bGUuc2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xuXHR2YXIgaSwgdG9rZW5zLCB0b2tlbiwgdHlwZSwgZmluZCxcblx0XHRjb21waWxlZCA9IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHNlbGVjdG9yLFxuXHRcdG1hdGNoID0gIXNlZWQgJiYgdG9rZW5pemUoIChzZWxlY3RvciA9IGNvbXBpbGVkLnNlbGVjdG9yIHx8IHNlbGVjdG9yKSApO1xuXG5cdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG5cdC8vIFRyeSB0byBtaW5pbWl6ZSBvcGVyYXRpb25zIGlmIHRoZXJlIGlzIG9ubHkgb25lIHNlbGVjdG9yIGluIHRoZSBsaXN0IGFuZCBubyBzZWVkXG5cdC8vICh0aGUgbGF0dGVyIG9mIHdoaWNoIGd1YXJhbnRlZXMgdXMgY29udGV4dClcblx0aWYgKCBtYXRjaC5sZW5ndGggPT09IDEgKSB7XG5cblx0XHQvLyBSZWR1Y2UgY29udGV4dCBpZiB0aGUgbGVhZGluZyBjb21wb3VuZCBzZWxlY3RvciBpcyBhbiBJRFxuXHRcdHRva2VucyA9IG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAgKTtcblx0XHRpZiAoIHRva2Vucy5sZW5ndGggPiAyICYmICh0b2tlbiA9IHRva2Vuc1swXSkudHlwZSA9PT0gXCJJRFwiICYmXG5cdFx0XHRcdGNvbnRleHQubm9kZVR5cGUgPT09IDkgJiYgZG9jdW1lbnRJc0hUTUwgJiYgRXhwci5yZWxhdGl2ZVsgdG9rZW5zWzFdLnR5cGUgXSApIHtcblxuXHRcdFx0Y29udGV4dCA9ICggRXhwci5maW5kW1wiSURcIl0oIHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZShydW5lc2NhcGUsIGZ1bmVzY2FwZSksIGNvbnRleHQgKSB8fCBbXSApWzBdO1xuXHRcdFx0aWYgKCAhY29udGV4dCApIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cblx0XHRcdC8vIFByZWNvbXBpbGVkIG1hdGNoZXJzIHdpbGwgc3RpbGwgdmVyaWZ5IGFuY2VzdHJ5LCBzbyBzdGVwIHVwIGEgbGV2ZWxcblx0XHRcdH0gZWxzZSBpZiAoIGNvbXBpbGVkICkge1xuXHRcdFx0XHRjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKCB0b2tlbnMuc2hpZnQoKS52YWx1ZS5sZW5ndGggKTtcblx0XHR9XG5cblx0XHQvLyBGZXRjaCBhIHNlZWQgc2V0IGZvciByaWdodC10by1sZWZ0IG1hdGNoaW5nXG5cdFx0aSA9IG1hdGNoRXhwcltcIm5lZWRzQ29udGV4dFwiXS50ZXN0KCBzZWxlY3RvciApID8gMCA6IHRva2Vucy5sZW5ndGg7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHR0b2tlbiA9IHRva2Vuc1tpXTtcblxuXHRcdFx0Ly8gQWJvcnQgaWYgd2UgaGl0IGEgY29tYmluYXRvclxuXHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyAodHlwZSA9IHRva2VuLnR5cGUpIF0gKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAoZmluZCA9IEV4cHIuZmluZFsgdHlwZSBdKSApIHtcblx0XHRcdFx0Ly8gU2VhcmNoLCBleHBhbmRpbmcgY29udGV4dCBmb3IgbGVhZGluZyBzaWJsaW5nIGNvbWJpbmF0b3JzXG5cdFx0XHRcdGlmICggKHNlZWQgPSBmaW5kKFxuXHRcdFx0XHRcdHRva2VuLm1hdGNoZXNbMF0ucmVwbGFjZSggcnVuZXNjYXBlLCBmdW5lc2NhcGUgKSxcblx0XHRcdFx0XHRyc2libGluZy50ZXN0KCB0b2tlbnNbMF0udHlwZSApICYmIHRlc3RDb250ZXh0KCBjb250ZXh0LnBhcmVudE5vZGUgKSB8fCBjb250ZXh0XG5cdFx0XHRcdCkpICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgc2VlZCBpcyBlbXB0eSBvciBubyB0b2tlbnMgcmVtYWluLCB3ZSBjYW4gcmV0dXJuIGVhcmx5XG5cdFx0XHRcdFx0dG9rZW5zLnNwbGljZSggaSwgMSApO1xuXHRcdFx0XHRcdHNlbGVjdG9yID0gc2VlZC5sZW5ndGggJiYgdG9TZWxlY3RvciggdG9rZW5zICk7XG5cdFx0XHRcdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzZWVkICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIENvbXBpbGUgYW5kIGV4ZWN1dGUgYSBmaWx0ZXJpbmcgZnVuY3Rpb24gaWYgb25lIGlzIG5vdCBwcm92aWRlZFxuXHQvLyBQcm92aWRlIGBtYXRjaGAgdG8gYXZvaWQgcmV0b2tlbml6YXRpb24gaWYgd2UgbW9kaWZpZWQgdGhlIHNlbGVjdG9yIGFib3ZlXG5cdCggY29tcGlsZWQgfHwgY29tcGlsZSggc2VsZWN0b3IsIG1hdGNoICkgKShcblx0XHRzZWVkLFxuXHRcdGNvbnRleHQsXG5cdFx0IWRvY3VtZW50SXNIVE1MLFxuXHRcdHJlc3VsdHMsXG5cdFx0IWNvbnRleHQgfHwgcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiB0ZXN0Q29udGV4dCggY29udGV4dC5wYXJlbnROb2RlICkgfHwgY29udGV4dFxuXHQpO1xuXHRyZXR1cm4gcmVzdWx0cztcbn07XG5cbi8vIE9uZS10aW1lIGFzc2lnbm1lbnRzXG5cbi8vIFNvcnQgc3RhYmlsaXR5XG5zdXBwb3J0LnNvcnRTdGFibGUgPSBleHBhbmRvLnNwbGl0KFwiXCIpLnNvcnQoIHNvcnRPcmRlciApLmpvaW4oXCJcIikgPT09IGV4cGFuZG87XG5cbi8vIFN1cHBvcnQ6IENocm9tZSAxNC0zNStcbi8vIEFsd2F5cyBhc3N1bWUgZHVwbGljYXRlcyBpZiB0aGV5IGFyZW4ndCBwYXNzZWQgdG8gdGhlIGNvbXBhcmlzb24gZnVuY3Rpb25cbnN1cHBvcnQuZGV0ZWN0RHVwbGljYXRlcyA9ICEhaGFzRHVwbGljYXRlO1xuXG4vLyBJbml0aWFsaXplIGFnYWluc3QgdGhlIGRlZmF1bHQgZG9jdW1lbnRcbnNldERvY3VtZW50KCk7XG5cbi8vIFN1cHBvcnQ6IFdlYmtpdDw1MzcuMzIgLSBTYWZhcmkgNi4wLjMvQ2hyb21lIDI1IChmaXhlZCBpbiBDaHJvbWUgMjcpXG4vLyBEZXRhY2hlZCBub2RlcyBjb25mb3VuZGluZ2x5IGZvbGxvdyAqZWFjaCBvdGhlcipcbnN1cHBvcnQuc29ydERldGFjaGVkID0gYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0Ly8gU2hvdWxkIHJldHVybiAxLCBidXQgcmV0dXJucyA0IChmb2xsb3dpbmcpXG5cdHJldHVybiBlbC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpICkgJiAxO1xufSk7XG5cbi8vIFN1cHBvcnQ6IElFPDhcbi8vIFByZXZlbnQgYXR0cmlidXRlL3Byb3BlcnR5IFwiaW50ZXJwb2xhdGlvblwiXG4vLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDI5JTI4VlMuODUlMjkuYXNweFxuaWYgKCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8YSBocmVmPScjJz48L2E+XCI7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiIDtcbn0pICkge1xuXHRhZGRIYW5kbGUoIFwidHlwZXxocmVmfGhlaWdodHx3aWR0aFwiLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0aWYgKCAhaXNYTUwgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0eXBlXCIgPyAxIDogMiApO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1cHBvcnQ6IElFPDlcbi8vIFVzZSBkZWZhdWx0VmFsdWUgaW4gcGxhY2Ugb2YgZ2V0QXR0cmlidXRlKFwidmFsdWVcIilcbmlmICggIXN1cHBvcnQuYXR0cmlidXRlcyB8fCAhYXNzZXJ0KGZ1bmN0aW9uKCBlbCApIHtcblx0ZWwuaW5uZXJIVE1MID0gXCI8aW5wdXQvPlwiO1xuXHRlbC5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiLCBcIlwiICk7XG5cdHJldHVybiBlbC5maXJzdENoaWxkLmdldEF0dHJpYnV0ZSggXCJ2YWx1ZVwiICkgPT09IFwiXCI7XG59KSApIHtcblx0YWRkSGFuZGxlKCBcInZhbHVlXCIsIGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBpc1hNTCApIHtcblx0XHRpZiAoICFpc1hNTCAmJiBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiApIHtcblx0XHRcdHJldHVybiBlbGVtLmRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBTdXBwb3J0OiBJRTw5XG4vLyBVc2UgZ2V0QXR0cmlidXRlTm9kZSB0byBmZXRjaCBib29sZWFucyB3aGVuIGdldEF0dHJpYnV0ZSBsaWVzXG5pZiAoICFhc3NlcnQoZnVuY3Rpb24oIGVsICkge1xuXHRyZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIikgPT0gbnVsbDtcbn0pICkge1xuXHRhZGRIYW5kbGUoIGJvb2xlYW5zLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHZhbDtcblx0XHRpZiAoICFpc1hNTCApIHtcblx0XHRcdHJldHVybiBlbGVtWyBuYW1lIF0gPT09IHRydWUgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOlxuXHRcdFx0XHRcdCh2YWwgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKSkgJiYgdmFsLnNwZWNpZmllZCA/XG5cdFx0XHRcdFx0dmFsLnZhbHVlIDpcblx0XHRcdFx0bnVsbDtcblx0XHR9XG5cdH0pO1xufVxuXG5yZXR1cm4gU2l6emxlO1xuXG59KSggd2luZG93ICk7XG5cblxuXG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcblxuLy8gRGVwcmVjYXRlZFxualF1ZXJ5LmV4cHJbIFwiOlwiIF0gPSBqUXVlcnkuZXhwci5wc2V1ZG9zO1xualF1ZXJ5LnVuaXF1ZVNvcnQgPSBqUXVlcnkudW5pcXVlID0gU2l6emxlLnVuaXF1ZVNvcnQ7XG5qUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xualF1ZXJ5LmlzWE1MRG9jID0gU2l6emxlLmlzWE1MO1xualF1ZXJ5LmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zO1xualF1ZXJ5LmVzY2FwZVNlbGVjdG9yID0gU2l6emxlLmVzY2FwZTtcblxuXG5cblxudmFyIGRpciA9IGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdLFxuXHRcdHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuXHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRpZiAoIHRydW5jYXRlICYmIGpRdWVyeSggZWxlbSApLmlzKCB1bnRpbCApICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHNpYmxpbmdzID0gZnVuY3Rpb24oIG4sIGVsZW0gKSB7XG5cdHZhciBtYXRjaGVkID0gW107XG5cblx0Zm9yICggOyBuOyBuID0gbi5uZXh0U2libGluZyApIHtcblx0XHRpZiAoIG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gZWxlbSApIHtcblx0XHRcdG1hdGNoZWQucHVzaCggbiApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgcm5lZWRzQ29udGV4dCA9IGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dDtcblxuXG5cbmZ1bmN0aW9uIG5vZGVOYW1lKCBlbGVtLCBuYW1lICkge1xuXG4gIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG59O1xudmFyIHJzaW5nbGVUYWcgPSAoIC9ePChbYS16XVteXFwvXFwwPjpcXHgyMFxcdFxcclxcblxcZl0qKVtcXHgyMFxcdFxcclxcblxcZl0qXFwvPz4oPzo8XFwvXFwxPnwpJC9pICk7XG5cblxuXG4vLyBJbXBsZW1lbnQgdGhlIGlkZW50aWNhbCBmdW5jdGlvbmFsaXR5IGZvciBmaWx0ZXIgYW5kIG5vdFxuZnVuY3Rpb24gd2lubm93KCBlbGVtZW50cywgcXVhbGlmaWVyLCBub3QgKSB7XG5cdGlmICggaXNGdW5jdGlvbiggcXVhbGlmaWVyICkgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHRyZXR1cm4gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApICE9PSBub3Q7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2luZ2xlIGVsZW1lbnRcblx0aWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBlbGVtID09PSBxdWFsaWZpZXIgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEFycmF5bGlrZSBvZiBlbGVtZW50cyAoalF1ZXJ5LCBhcmd1bWVudHMsIEFycmF5KVxuXHRpZiAoIHR5cGVvZiBxdWFsaWZpZXIgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCBpbmRleE9mLmNhbGwoIHF1YWxpZmllciwgZWxlbSApID4gLTEgKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIEZpbHRlcmVkIGRpcmVjdGx5IGZvciBib3RoIHNpbXBsZSBhbmQgY29tcGxleCBzZWxlY3RvcnNcblx0cmV0dXJuIGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMsIG5vdCApO1xufVxuXG5qUXVlcnkuZmlsdGVyID0gZnVuY3Rpb24oIGV4cHIsIGVsZW1zLCBub3QgKSB7XG5cdHZhciBlbGVtID0gZWxlbXNbIDAgXTtcblxuXHRpZiAoIG5vdCApIHtcblx0XHRleHByID0gXCI6bm90KFwiICsgZXhwciArIFwiKVwiO1xuXHR9XG5cblx0aWYgKCBlbGVtcy5sZW5ndGggPT09IDEgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBleHByICkgPyBbIGVsZW0gXSA6IFtdO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5maW5kLm1hdGNoZXMoIGV4cHIsIGpRdWVyeS5ncmVwKCBlbGVtcywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdH0gKSApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmaW5kOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGksIHJldCxcblx0XHRcdGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0c2VsZiA9IHRoaXM7XG5cblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggalF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0aWYgKCBqUXVlcnkuY29udGFpbnMoIHNlbGZbIGkgXSwgdGhpcyApICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICkgKTtcblx0XHR9XG5cblx0XHRyZXQgPSB0aGlzLnB1c2hTdGFjayggW10gKTtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRqUXVlcnkuZmluZCggc2VsZWN0b3IsIHNlbGZbIGkgXSwgcmV0ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGxlbiA+IDEgPyBqUXVlcnkudW5pcXVlU29ydCggcmV0ICkgOiByZXQ7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgZmFsc2UgKSApO1xuXHR9LFxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyggdGhpcywgc2VsZWN0b3IgfHwgW10sIHRydWUgKSApO1xuXHR9LFxuXHRpczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiAhIXdpbm5vdyhcblx0XHRcdHRoaXMsXG5cblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwb3NpdGlvbmFsL3JlbGF0aXZlIHNlbGVjdG9yLCBjaGVjayBtZW1iZXJzaGlwIGluIHRoZSByZXR1cm5lZCBzZXRcblx0XHRcdC8vIHNvICQoXCJwOmZpcnN0XCIpLmlzKFwicDpsYXN0XCIpIHdvbid0IHJldHVybiB0cnVlIGZvciBhIGRvYyB3aXRoIHR3byBcInBcIi5cblx0XHRcdHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBybmVlZHNDb250ZXh0LnRlc3QoIHNlbGVjdG9yICkgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yICkgOlxuXHRcdFx0XHRzZWxlY3RvciB8fCBbXSxcblx0XHRcdGZhbHNlXG5cdFx0KS5sZW5ndGg7XG5cdH1cbn0gKTtcblxuXG4vLyBJbml0aWFsaXplIGEgalF1ZXJ5IG9iamVjdFxuXG5cbi8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxudmFyIHJvb3RqUXVlcnksXG5cblx0Ly8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3Ncblx0Ly8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuXHQvLyBTdHJpY3QgSFRNTCByZWNvZ25pdGlvbiAoIzExMjkwOiBtdXN0IHN0YXJ0IHdpdGggPClcblx0Ly8gU2hvcnRjdXQgc2ltcGxlICNpZCBjYXNlIGZvciBzcGVlZFxuXHRycXVpY2tFeHByID0gL14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qfCMoW1xcdy1dKykpJC8sXG5cblx0aW5pdCA9IGpRdWVyeS5mbi5pbml0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByb290ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbTtcblxuXHRcdC8vIEhBTkRMRTogJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gTWV0aG9kIGluaXQoKSBhY2NlcHRzIGFuIGFsdGVybmF0ZSByb290alF1ZXJ5XG5cdFx0Ly8gc28gbWlncmF0ZSBjYW4gc3VwcG9ydCBqUXVlcnkuc3ViIChnaC0yMTAxKVxuXHRcdHJvb3QgPSByb290IHx8IHJvb3RqUXVlcnk7XG5cblx0XHQvLyBIYW5kbGUgSFRNTCBzdHJpbmdzXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRpZiAoIHNlbGVjdG9yWyAwIF0gPT09IFwiPFwiICYmXG5cdFx0XHRcdHNlbGVjdG9yWyBzZWxlY3Rvci5sZW5ndGggLSAxIF0gPT09IFwiPlwiICYmXG5cdFx0XHRcdHNlbGVjdG9yLmxlbmd0aCA+PSAzICkge1xuXG5cdFx0XHRcdC8vIEFzc3VtZSB0aGF0IHN0cmluZ3MgdGhhdCBzdGFydCBhbmQgZW5kIHdpdGggPD4gYXJlIEhUTUwgYW5kIHNraXAgdGhlIHJlZ2V4IGNoZWNrXG5cdFx0XHRcdG1hdGNoID0gWyBudWxsLCBzZWxlY3RvciwgbnVsbCBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaCA9IHJxdWlja0V4cHIuZXhlYyggc2VsZWN0b3IgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWF0Y2ggaHRtbCBvciBtYWtlIHN1cmUgbm8gY29udGV4dCBpcyBzcGVjaWZpZWQgZm9yICNpZFxuXHRcdFx0aWYgKCBtYXRjaCAmJiAoIG1hdGNoWyAxIF0gfHwgIWNvbnRleHQgKSApIHtcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCkgLT4gJChhcnJheSlcblx0XHRcdFx0aWYgKCBtYXRjaFsgMSBdICkge1xuXHRcdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5ID8gY29udGV4dFsgMCBdIDogY29udGV4dDtcblxuXHRcdFx0XHRcdC8vIE9wdGlvbiB0byBydW4gc2NyaXB0cyBpcyB0cnVlIGZvciBiYWNrLWNvbXBhdFxuXHRcdFx0XHRcdC8vIEludGVudGlvbmFsbHkgbGV0IHRoZSBlcnJvciBiZSB0aHJvd24gaWYgcGFyc2VIVE1MIGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCB0aGlzLCBqUXVlcnkucGFyc2VIVE1MKFxuXHRcdFx0XHRcdFx0bWF0Y2hbIDEgXSxcblx0XHRcdFx0XHRcdGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQsXG5cdFx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdFx0KSApO1xuXG5cdFx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwsIHByb3BzKVxuXHRcdFx0XHRcdGlmICggcnNpbmdsZVRhZy50ZXN0KCBtYXRjaFsgMSBdICkgJiYgalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGNvbnRleHQgKSApIHtcblx0XHRcdFx0XHRcdGZvciAoIG1hdGNoIGluIGNvbnRleHQgKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gUHJvcGVydGllcyBvZiBjb250ZXh0IGFyZSBjYWxsZWQgYXMgbWV0aG9kcyBpZiBwb3NzaWJsZVxuXHRcdFx0XHRcdFx0XHRpZiAoIGlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzWyBtYXRjaCBdKCBjb250ZXh0WyBtYXRjaCBdICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJCgjaWQpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtYXRjaFsgMiBdICk7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHRcdC8vIEluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzWyAwIF0gPSBlbGVtO1xuXHRcdFx0XHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgJCguLi4pKVxuXHRcdFx0fSBlbHNlIGlmICggIWNvbnRleHQgfHwgY29udGV4dC5qcXVlcnkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGNvbnRleHQgfHwgcm9vdCApLmZpbmQoIHNlbGVjdG9yICk7XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCBjb250ZXh0KVxuXHRcdFx0Ly8gKHdoaWNoIGlzIGp1c3QgZXF1aXZhbGVudCB0bzogJChjb250ZXh0KS5maW5kKGV4cHIpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHQvLyBIQU5ETEU6ICQoRE9NRWxlbWVudClcblx0XHR9IGVsc2UgaWYgKCBzZWxlY3Rvci5ub2RlVHlwZSApIHtcblx0XHRcdHRoaXNbIDAgXSA9IHNlbGVjdG9yO1xuXHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHQvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXG5cdFx0Ly8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XG5cdFx0fSBlbHNlIGlmICggaXNGdW5jdGlvbiggc2VsZWN0b3IgKSApIHtcblx0XHRcdHJldHVybiByb290LnJlYWR5ICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRyb290LnJlYWR5KCBzZWxlY3RvciApIDpcblxuXHRcdFx0XHQvLyBFeGVjdXRlIGltbWVkaWF0ZWx5IGlmIHJlYWR5IGlzIG5vdCBwcmVzZW50XG5cdFx0XHRcdHNlbGVjdG9yKCBqUXVlcnkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcblx0fTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxuaW5pdC5wcm90b3R5cGUgPSBqUXVlcnkuZm47XG5cbi8vIEluaXRpYWxpemUgY2VudHJhbCByZWZlcmVuY2VcbnJvb3RqUXVlcnkgPSBqUXVlcnkoIGRvY3VtZW50ICk7XG5cblxudmFyIHJwYXJlbnRzcHJldiA9IC9eKD86cGFyZW50c3xwcmV2KD86VW50aWx8QWxsKSkvLFxuXG5cdC8vIE1ldGhvZHMgZ3VhcmFudGVlZCB0byBwcm9kdWNlIGEgdW5pcXVlIHNldCB3aGVuIHN0YXJ0aW5nIGZyb20gYSB1bmlxdWUgc2V0XG5cdGd1YXJhbnRlZWRVbmlxdWUgPSB7XG5cdFx0Y2hpbGRyZW46IHRydWUsXG5cdFx0Y29udGVudHM6IHRydWUsXG5cdFx0bmV4dDogdHJ1ZSxcblx0XHRwcmV2OiB0cnVlXG5cdH07XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0aGFzOiBmdW5jdGlvbiggdGFyZ2V0ICkge1xuXHRcdHZhciB0YXJnZXRzID0galF1ZXJ5KCB0YXJnZXQsIHRoaXMgKSxcblx0XHRcdGwgPSB0YXJnZXRzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCB0aGlzLCB0YXJnZXRzWyBpIF0gKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRjbG9zZXN0OiBmdW5jdGlvbiggc2VsZWN0b3JzLCBjb250ZXh0ICkge1xuXHRcdHZhciBjdXIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aCxcblx0XHRcdG1hdGNoZWQgPSBbXSxcblx0XHRcdHRhcmdldHMgPSB0eXBlb2Ygc2VsZWN0b3JzICE9PSBcInN0cmluZ1wiICYmIGpRdWVyeSggc2VsZWN0b3JzICk7XG5cblx0XHQvLyBQb3NpdGlvbmFsIHNlbGVjdG9ycyBuZXZlciBtYXRjaCwgc2luY2UgdGhlcmUncyBubyBfc2VsZWN0aW9uXyBjb250ZXh0XG5cdFx0aWYgKCAhcm5lZWRzQ29udGV4dC50ZXN0KCBzZWxlY3RvcnMgKSApIHtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zm9yICggY3VyID0gdGhpc1sgaSBdOyBjdXIgJiYgY3VyICE9PSBjb250ZXh0OyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblxuXHRcdFx0XHRcdC8vIEFsd2F5cyBza2lwIGRvY3VtZW50IGZyYWdtZW50c1xuXHRcdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlIDwgMTEgJiYgKCB0YXJnZXRzID9cblx0XHRcdFx0XHRcdHRhcmdldHMuaW5kZXgoIGN1ciApID4gLTEgOlxuXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBwYXNzIG5vbi1lbGVtZW50cyB0byBTaXp6bGVcblx0XHRcdFx0XHRcdGN1ci5ub2RlVHlwZSA9PT0gMSAmJlxuXHRcdFx0XHRcdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGN1ciwgc2VsZWN0b3JzICkgKSApIHtcblxuXHRcdFx0XHRcdFx0bWF0Y2hlZC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZC5sZW5ndGggPiAxID8galF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKSA6IG1hdGNoZWQgKTtcblx0fSxcblxuXHQvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBzZXRcblx0aW5kZXg6IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gTm8gYXJndW1lbnQsIHJldHVybiBpbmRleCBpbiBwYXJlbnRcblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuICggdGhpc1sgMCBdICYmIHRoaXNbIDAgXS5wYXJlbnROb2RlICkgPyB0aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aCA6IC0xO1xuXHRcdH1cblxuXHRcdC8vIEluZGV4IGluIHNlbGVjdG9yXG5cdFx0aWYgKCB0eXBlb2YgZWxlbSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBpbmRleE9mLmNhbGwoIGpRdWVyeSggZWxlbSApLCB0aGlzWyAwIF0gKTtcblx0XHR9XG5cblx0XHQvLyBMb2NhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkZXNpcmVkIGVsZW1lbnRcblx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCB0aGlzLFxuXG5cdFx0XHQvLyBJZiBpdCByZWNlaXZlcyBhIGpRdWVyeSBvYmplY3QsIHRoZSBmaXJzdCBlbGVtZW50IGlzIHVzZWRcblx0XHRcdGVsZW0uanF1ZXJ5ID8gZWxlbVsgMCBdIDogZWxlbVxuXHRcdCk7XG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKFxuXHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoXG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggdGhpcy5nZXQoKSwgalF1ZXJ5KCBzZWxlY3RvciwgY29udGV4dCApIClcblx0XHRcdClcblx0XHQpO1xuXHR9LFxuXG5cdGFkZEJhY2s6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGQoIHNlbGVjdG9yID09IG51bGwgP1xuXHRcdFx0dGhpcy5wcmV2T2JqZWN0IDogdGhpcy5wcmV2T2JqZWN0LmZpbHRlciggc2VsZWN0b3IgKVxuXHRcdCk7XG5cdH1cbn0gKTtcblxuZnVuY3Rpb24gc2libGluZyggY3VyLCBkaXIgKSB7XG5cdHdoaWxlICggKCBjdXIgPSBjdXJbIGRpciBdICkgJiYgY3VyLm5vZGVUeXBlICE9PSAxICkge31cblx0cmV0dXJuIGN1cjtcbn1cblxualF1ZXJ5LmVhY2goIHtcblx0cGFyZW50OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAxMSA/IHBhcmVudCA6IG51bGw7XG5cdH0sXG5cdHBhcmVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiICk7XG5cdH0sXG5cdHBhcmVudHNVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiLCB1bnRpbCApO1xuXHR9LFxuXHRuZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXY6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5nKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0cHJldlVudGlsOiBmdW5jdGlvbiggZWxlbSwgaSwgdW50aWwgKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiwgdW50aWwgKTtcblx0fSxcblx0c2libGluZ3M6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBzaWJsaW5ncyggKCBlbGVtLnBhcmVudE5vZGUgfHwge30gKS5maXJzdENoaWxkLCBlbGVtICk7XG5cdH0sXG5cdGNoaWxkcmVuOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoIGVsZW0uZmlyc3RDaGlsZCApO1xuXHR9LFxuXHRjb250ZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0aWYgKCB0eXBlb2YgZWxlbS5jb250ZW50RG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5jb250ZW50RG9jdW1lbnQ7XG5cdFx0fVxuXG5cdFx0Ly8gU3VwcG9ydDogSUUgOSAtIDExIG9ubHksIGlPUyA3IG9ubHksIEFuZHJvaWQgQnJvd3NlciA8PTQuMyBvbmx5XG5cdFx0Ly8gVHJlYXQgdGhlIHRlbXBsYXRlIGVsZW1lbnQgYXMgYSByZWd1bGFyIG9uZSBpbiBicm93c2VycyB0aGF0XG5cdFx0Ly8gZG9uJ3Qgc3VwcG9ydCBpdC5cblx0XHRpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRlbXBsYXRlXCIgKSApIHtcblx0XHRcdGVsZW0gPSBlbGVtLmNvbnRlbnQgfHwgZWxlbTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbXSwgZWxlbS5jaGlsZE5vZGVzICk7XG5cdH1cbn0sIGZ1bmN0aW9uKCBuYW1lLCBmbiApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggdW50aWwsIHNlbGVjdG9yICkge1xuXHRcdHZhciBtYXRjaGVkID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cblx0XHRpZiAoIG5hbWUuc2xpY2UoIC01ICkgIT09IFwiVW50aWxcIiApIHtcblx0XHRcdHNlbGVjdG9yID0gdW50aWw7XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWxlY3RvciAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRtYXRjaGVkID0galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIG1hdGNoZWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHRoaXMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZXNcblx0XHRcdGlmICggIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSApIHtcblx0XHRcdFx0alF1ZXJ5LnVuaXF1ZVNvcnQoIG1hdGNoZWQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmV2ZXJzZSBvcmRlciBmb3IgcGFyZW50cyogYW5kIHByZXYtZGVyaXZhdGl2ZXNcblx0XHRcdGlmICggcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdFx0bWF0Y2hlZC5yZXZlcnNlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBtYXRjaGVkICk7XG5cdH07XG59ICk7XG52YXIgcm5vdGh0bWx3aGl0ZSA9ICggL1teXFx4MjBcXHRcXHJcXG5cXGZdKy9nICk7XG5cblxuXG4vLyBDb252ZXJ0IFN0cmluZy1mb3JtYXR0ZWQgb3B0aW9ucyBpbnRvIE9iamVjdC1mb3JtYXR0ZWQgb25lc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IHt9O1xuXHRqUXVlcnkuZWFjaCggb3B0aW9ucy5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0gKTtcblx0cmV0dXJuIG9iamVjdDtcbn1cblxuLypcbiAqIENyZWF0ZSBhIGNhbGxiYWNrIGxpc3QgdXNpbmcgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxuICpcbiAqXHRvcHRpb25zOiBhbiBvcHRpb25hbCBsaXN0IG9mIHNwYWNlLXNlcGFyYXRlZCBvcHRpb25zIHRoYXQgd2lsbCBjaGFuZ2UgaG93XG4gKlx0XHRcdHRoZSBjYWxsYmFjayBsaXN0IGJlaGF2ZXMgb3IgYSBtb3JlIHRyYWRpdGlvbmFsIG9wdGlvbiBvYmplY3RcbiAqXG4gKiBCeSBkZWZhdWx0IGEgY2FsbGJhY2sgbGlzdCB3aWxsIGFjdCBsaWtlIGFuIGV2ZW50IGNhbGxiYWNrIGxpc3QgYW5kIGNhbiBiZVxuICogXCJmaXJlZFwiIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIFBvc3NpYmxlIG9wdGlvbnM6XG4gKlxuICpcdG9uY2U6XHRcdFx0d2lsbCBlbnN1cmUgdGhlIGNhbGxiYWNrIGxpc3QgY2FuIG9ubHkgYmUgZmlyZWQgb25jZSAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHRtZW1vcnk6XHRcdFx0d2lsbCBrZWVwIHRyYWNrIG9mIHByZXZpb3VzIHZhbHVlcyBhbmQgd2lsbCBjYWxsIGFueSBjYWxsYmFjayBhZGRlZFxuICpcdFx0XHRcdFx0YWZ0ZXIgdGhlIGxpc3QgaGFzIGJlZW4gZmlyZWQgcmlnaHQgYXdheSB3aXRoIHRoZSBsYXRlc3QgXCJtZW1vcml6ZWRcIlxuICpcdFx0XHRcdFx0dmFsdWVzIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdHVuaXF1ZTpcdFx0XHR3aWxsIGVuc3VyZSBhIGNhbGxiYWNrIGNhbiBvbmx5IGJlIGFkZGVkIG9uY2UgKG5vIGR1cGxpY2F0ZSBpbiB0aGUgbGlzdClcbiAqXG4gKlx0c3RvcE9uRmFsc2U6XHRpbnRlcnJ1cHQgY2FsbGluZ3Mgd2hlbiBhIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAqXG4gKi9cbmpRdWVyeS5DYWxsYmFja3MgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuXHQvLyBDb252ZXJ0IG9wdGlvbnMgZnJvbSBTdHJpbmctZm9ybWF0dGVkIHRvIE9iamVjdC1mb3JtYXR0ZWQgaWYgbmVlZGVkXG5cdC8vICh3ZSBjaGVjayBpbiBjYWNoZSBmaXJzdClcblx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiID9cblx0XHRjcmVhdGVPcHRpb25zKCBvcHRpb25zICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IGlzIGN1cnJlbnRseSBmaXJpbmdcblx0XHRmaXJpbmcsXG5cblx0XHQvLyBMYXN0IGZpcmUgdmFsdWUgZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0c1xuXHRcdG1lbW9yeSxcblxuXHRcdC8vIEZsYWcgdG8ga25vdyBpZiBsaXN0IHdhcyBhbHJlYWR5IGZpcmVkXG5cdFx0ZmlyZWQsXG5cblx0XHQvLyBGbGFnIHRvIHByZXZlbnQgZmlyaW5nXG5cdFx0bG9ja2VkLFxuXG5cdFx0Ly8gQWN0dWFsIGNhbGxiYWNrIGxpc3Rcblx0XHRsaXN0ID0gW10sXG5cblx0XHQvLyBRdWV1ZSBvZiBleGVjdXRpb24gZGF0YSBmb3IgcmVwZWF0YWJsZSBsaXN0c1xuXHRcdHF1ZXVlID0gW10sXG5cblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSBhZGQvcmVtb3ZlIGFzIG5lZWRlZClcblx0XHRmaXJpbmdJbmRleCA9IC0xLFxuXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIEVuZm9yY2Ugc2luZ2xlLWZpcmluZ1xuXHRcdFx0bG9ja2VkID0gbG9ja2VkIHx8IG9wdGlvbnMub25jZTtcblxuXHRcdFx0Ly8gRXhlY3V0ZSBjYWxsYmFja3MgZm9yIGFsbCBwZW5kaW5nIGV4ZWN1dGlvbnMsXG5cdFx0XHQvLyByZXNwZWN0aW5nIGZpcmluZ0luZGV4IG92ZXJyaWRlcyBhbmQgcnVudGltZSBjaGFuZ2VzXG5cdFx0XHRmaXJlZCA9IGZpcmluZyA9IHRydWU7XG5cdFx0XHRmb3IgKCA7IHF1ZXVlLmxlbmd0aDsgZmlyaW5nSW5kZXggPSAtMSApIHtcblx0XHRcdFx0bWVtb3J5ID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdFx0d2hpbGUgKCArK2ZpcmluZ0luZGV4IDwgbGlzdC5sZW5ndGggKSB7XG5cblx0XHRcdFx0XHQvLyBSdW4gY2FsbGJhY2sgYW5kIGNoZWNrIGZvciBlYXJseSB0ZXJtaW5hdGlvblxuXHRcdFx0XHRcdGlmICggbGlzdFsgZmlyaW5nSW5kZXggXS5hcHBseSggbWVtb3J5WyAwIF0sIG1lbW9yeVsgMSBdICkgPT09IGZhbHNlICYmXG5cdFx0XHRcdFx0XHRvcHRpb25zLnN0b3BPbkZhbHNlICkge1xuXG5cdFx0XHRcdFx0XHQvLyBKdW1wIHRvIGVuZCBhbmQgZm9yZ2V0IHRoZSBkYXRhIHNvIC5hZGQgZG9lc24ndCByZS1maXJlXG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoO1xuXHRcdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvcmdldCB0aGUgZGF0YSBpZiB3ZSdyZSBkb25lIHdpdGggaXRcblx0XHRcdGlmICggIW9wdGlvbnMubWVtb3J5ICkge1xuXHRcdFx0XHRtZW1vcnkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cblx0XHRcdC8vIENsZWFuIHVwIGlmIHdlJ3JlIGRvbmUgZmlyaW5nIGZvciBnb29kXG5cdFx0XHRpZiAoIGxvY2tlZCApIHtcblxuXHRcdFx0XHQvLyBLZWVwIGFuIGVtcHR5IGxpc3QgaWYgd2UgaGF2ZSBkYXRhIGZvciBmdXR1cmUgYWRkIGNhbGxzXG5cdFx0XHRcdGlmICggbWVtb3J5ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIHRoaXMgb2JqZWN0IGlzIHNwZW50XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGlzdCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gQWN0dWFsIENhbGxiYWNrcyBvYmplY3Rcblx0XHRzZWxmID0ge1xuXG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBoYXZlIG1lbW9yeSBmcm9tIGEgcGFzdCBydW4sIHdlIHNob3VsZCBmaXJlIGFmdGVyIGFkZGluZ1xuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdJbmRleCA9IGxpc3QubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdHF1ZXVlLnB1c2goIG1lbW9yeSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCggZnVuY3Rpb24gYWRkKCBhcmdzICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3MsIGZ1bmN0aW9uKCBfLCBhcmcgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggaXNGdW5jdGlvbiggYXJnICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBhcmcgJiYgYXJnLmxlbmd0aCAmJiB0b1R5cGUoIGFyZyApICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSW5zcGVjdCByZWN1cnNpdmVseVxuXHRcdFx0XHRcdFx0XHRcdGFkZCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9ICkoIGFyZ3VtZW50cyApO1xuXG5cdFx0XHRcdFx0aWYgKCBtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBSZW1vdmUgYSBjYWxsYmFjayBmcm9tIHRoZSBsaXN0XG5cdFx0XHRyZW1vdmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdHZhciBpbmRleDtcblx0XHRcdFx0XHR3aGlsZSAoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKCBpbmRleCwgMSApO1xuXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgZmlyaW5nIGluZGV4ZXNcblx0XHRcdFx0XHRcdGlmICggaW5kZXggPD0gZmlyaW5nSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRcdGZpcmluZ0luZGV4LS07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBnaXZlbiBjYWxsYmFjayBpcyBpbiB0aGUgbGlzdC5cblx0XHRcdC8vIElmIG5vIGFyZ3VtZW50IGlzIGdpdmVuLCByZXR1cm4gd2hldGhlciBvciBub3QgbGlzdCBoYXMgY2FsbGJhY2tzIGF0dGFjaGVkLlxuXHRcdFx0aGFzOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdHJldHVybiBmbiA/XG5cdFx0XHRcdFx0alF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMSA6XG5cdFx0XHRcdFx0bGlzdC5sZW5ndGggPiAwO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGFsbCBjYWxsYmFja3MgZnJvbSB0aGUgbGlzdFxuXHRcdFx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZSBhbmQgLmFkZFxuXHRcdFx0Ly8gQWJvcnQgYW55IGN1cnJlbnQvcGVuZGluZyBleGVjdXRpb25zXG5cdFx0XHQvLyBDbGVhciBhbGwgY2FsbGJhY2tzIGFuZCB2YWx1ZXNcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBEaXNhYmxlIC5maXJlXG5cdFx0XHQvLyBBbHNvIGRpc2FibGUgLmFkZCB1bmxlc3Mgd2UgaGF2ZSBtZW1vcnkgKHNpbmNlIGl0IHdvdWxkIGhhdmUgbm8gZWZmZWN0KVxuXHRcdFx0Ly8gQWJvcnQgYW55IHBlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxvY2tlZCA9IHF1ZXVlID0gW107XG5cdFx0XHRcdGlmICggIW1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdGxpc3QgPSBtZW1vcnkgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdGxvY2tlZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiAhIWxvY2tlZDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIENhbGwgYWxsIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBjb250ZXh0IGFuZCBhcmd1bWVudHNcblx0XHRcdGZpcmVXaXRoOiBmdW5jdGlvbiggY29udGV4dCwgYXJncyApIHtcblx0XHRcdFx0aWYgKCAhbG9ja2VkICkge1xuXHRcdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRcdGFyZ3MgPSBbIGNvbnRleHQsIGFyZ3Muc2xpY2UgPyBhcmdzLnNsaWNlKCkgOiBhcmdzIF07XG5cdFx0XHRcdFx0cXVldWUucHVzaCggYXJncyApO1xuXHRcdFx0XHRcdGlmICggIWZpcmluZyApIHtcblx0XHRcdFx0XHRcdGZpcmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFRvIGtub3cgaWYgdGhlIGNhbGxiYWNrcyBoYXZlIGFscmVhZHkgYmVlbiBjYWxsZWQgYXQgbGVhc3Qgb25jZVxuXHRcdFx0ZmlyZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gISFmaXJlZDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdHJldHVybiBzZWxmO1xufTtcblxuXG5mdW5jdGlvbiBJZGVudGl0eSggdiApIHtcblx0cmV0dXJuIHY7XG59XG5mdW5jdGlvbiBUaHJvd2VyKCBleCApIHtcblx0dGhyb3cgZXg7XG59XG5cbmZ1bmN0aW9uIGFkb3B0VmFsdWUoIHZhbHVlLCByZXNvbHZlLCByZWplY3QsIG5vVmFsdWUgKSB7XG5cdHZhciBtZXRob2Q7XG5cblx0dHJ5IHtcblxuXHRcdC8vIENoZWNrIGZvciBwcm9taXNlIGFzcGVjdCBmaXJzdCB0byBwcml2aWxlZ2Ugc3luY2hyb25vdXMgYmVoYXZpb3Jcblx0XHRpZiAoIHZhbHVlICYmIGlzRnVuY3Rpb24oICggbWV0aG9kID0gdmFsdWUucHJvbWlzZSApICkgKSB7XG5cdFx0XHRtZXRob2QuY2FsbCggdmFsdWUgKS5kb25lKCByZXNvbHZlICkuZmFpbCggcmVqZWN0ICk7XG5cblx0XHQvLyBPdGhlciB0aGVuYWJsZXNcblx0XHR9IGVsc2UgaWYgKCB2YWx1ZSAmJiBpc0Z1bmN0aW9uKCAoIG1ldGhvZCA9IHZhbHVlLnRoZW4gKSApICkge1xuXHRcdFx0bWV0aG9kLmNhbGwoIHZhbHVlLCByZXNvbHZlLCByZWplY3QgKTtcblxuXHRcdC8vIE90aGVyIG5vbi10aGVuYWJsZXNcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb250cm9sIGByZXNvbHZlYCBhcmd1bWVudHMgYnkgbGV0dGluZyBBcnJheSNzbGljZSBjYXN0IGJvb2xlYW4gYG5vVmFsdWVgIHRvIGludGVnZXI6XG5cdFx0XHQvLyAqIGZhbHNlOiBbIHZhbHVlIF0uc2xpY2UoIDAgKSA9PiByZXNvbHZlKCB2YWx1ZSApXG5cdFx0XHQvLyAqIHRydWU6IFsgdmFsdWUgXS5zbGljZSggMSApID0+IHJlc29sdmUoKVxuXHRcdFx0cmVzb2x2ZS5hcHBseSggdW5kZWZpbmVkLCBbIHZhbHVlIF0uc2xpY2UoIG5vVmFsdWUgKSApO1xuXHRcdH1cblxuXHQvLyBGb3IgUHJvbWlzZXMvQSssIGNvbnZlcnQgZXhjZXB0aW9ucyBpbnRvIHJlamVjdGlvbnNcblx0Ly8gU2luY2UgalF1ZXJ5LndoZW4gZG9lc24ndCB1bndyYXAgdGhlbmFibGVzLCB3ZSBjYW4gc2tpcCB0aGUgZXh0cmEgY2hlY2tzIGFwcGVhcmluZyBpblxuXHQvLyBEZWZlcnJlZCN0aGVuIHRvIGNvbmRpdGlvbmFsbHkgc3VwcHJlc3MgcmVqZWN0aW9uLlxuXHR9IGNhdGNoICggdmFsdWUgKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCBvbmx5XG5cdFx0Ly8gU3RyaWN0IG1vZGUgZnVuY3Rpb25zIGludm9rZWQgd2l0aG91dCAuY2FsbC8uYXBwbHkgZ2V0IGdsb2JhbC1vYmplY3QgY29udGV4dFxuXHRcdHJlamVjdC5hcHBseSggdW5kZWZpbmVkLCBbIHZhbHVlIF0gKTtcblx0fVxufVxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0RGVmZXJyZWQ6IGZ1bmN0aW9uKCBmdW5jICkge1xuXHRcdHZhciB0dXBsZXMgPSBbXG5cblx0XHRcdFx0Ly8gYWN0aW9uLCBhZGQgbGlzdGVuZXIsIGNhbGxiYWNrcyxcblx0XHRcdFx0Ly8gLi4uIC50aGVuIGhhbmRsZXJzLCBhcmd1bWVudCBpbmRleCwgW2ZpbmFsIHN0YXRlXVxuXHRcdFx0XHRbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJtZW1vcnlcIiApLFxuXHRcdFx0XHRcdGpRdWVyeS5DYWxsYmFja3MoIFwibWVtb3J5XCIgKSwgMiBdLFxuXHRcdFx0XHRbIFwicmVzb2x2ZVwiLCBcImRvbmVcIiwgalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksXG5cdFx0XHRcdFx0alF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICksIDAsIFwicmVzb2x2ZWRcIiBdLFxuXHRcdFx0XHRbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSxcblx0XHRcdFx0XHRqUXVlcnkuQ2FsbGJhY2tzKCBcIm9uY2UgbWVtb3J5XCIgKSwgMSwgXCJyZWplY3RlZFwiIF1cblx0XHRcdF0sXG5cdFx0XHRzdGF0ZSA9IFwicGVuZGluZ1wiLFxuXHRcdFx0cHJvbWlzZSA9IHtcblx0XHRcdFx0c3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YWx3YXlzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5kb25lKCBhcmd1bWVudHMgKS5mYWlsKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJjYXRjaFwiOiBmdW5jdGlvbiggZm4gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByb21pc2UudGhlbiggbnVsbCwgZm4gKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBLZWVwIHBpcGUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdHBpcGU6IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcblx0XHRcdFx0XHR2YXIgZm5zID0gYXJndW1lbnRzO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5EZWZlcnJlZCggZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE1hcCB0dXBsZXMgKHByb2dyZXNzLCBkb25lLCBmYWlsKSB0byBhcmd1bWVudHMgKGRvbmUsIGZhaWwsIHByb2dyZXNzKVxuXHRcdFx0XHRcdFx0XHR2YXIgZm4gPSBpc0Z1bmN0aW9uKCBmbnNbIHR1cGxlWyA0IF0gXSApICYmIGZuc1sgdHVwbGVbIDQgXSBdO1xuXG5cdFx0XHRcdFx0XHRcdC8vIGRlZmVycmVkLnByb2dyZXNzKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLm5vdGlmeSB9KVxuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZC5kb25lKGZ1bmN0aW9uKCkgeyBiaW5kIHRvIG5ld0RlZmVyIG9yIG5ld0RlZmVyLnJlc29sdmUgfSlcblx0XHRcdFx0XHRcdFx0Ly8gZGVmZXJyZWQuZmFpbChmdW5jdGlvbigpIHsgYmluZCB0byBuZXdEZWZlciBvciBuZXdEZWZlci5yZWplY3QgfSlcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAxIF0gXSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkID0gZm4gJiYgZm4uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgJiYgaXNGdW5jdGlvbiggcmV0dXJuZWQucHJvbWlzZSApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5IClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZmFpbCggbmV3RGVmZXIucmVqZWN0ICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXShcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm4gPyBbIHJldHVybmVkIF0gOiBhcmd1bWVudHNcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0XHRmbnMgPSBudWxsO1xuXHRcdFx0XHRcdH0gKS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRoZW46IGZ1bmN0aW9uKCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgb25Qcm9ncmVzcyApIHtcblx0XHRcdFx0XHR2YXIgbWF4RGVwdGggPSAwO1xuXHRcdFx0XHRcdGZ1bmN0aW9uIHJlc29sdmUoIGRlcHRoLCBkZWZlcnJlZCwgaGFuZGxlciwgc3BlY2lhbCApIHtcblx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdGFyZ3MgPSBhcmd1bWVudHMsXG5cdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHJldHVybmVkLCB0aGVuO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4zLjMuM1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTlcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElnbm9yZSBkb3VibGUtcmVzb2x1dGlvbiBhdHRlbXB0c1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBkZXB0aCA8IG1heERlcHRoICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkID0gaGFuZGxlci5hcHBseSggdGhhdCwgYXJncyApO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy4xXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwczovL3Byb21pc2VzYXBsdXMuY29tLyNwb2ludC00OFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCByZXR1cm5lZCA9PT0gZGVmZXJyZWQucHJvbWlzZSgpICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCBcIlRoZW5hYmxlIHNlbGYtcmVzb2x1dGlvblwiICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFByb21pc2VzL0ErIHNlY3Rpb25zIDIuMy4zLjEsIDMuNVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTRcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTc1XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBSZXRyaWV2ZSBgdGhlbmAgb25seSBvbmNlXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGVuID0gcmV0dXJuZWQgJiZcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBQcm9taXNlcy9BKyBzZWN0aW9uIDIuMy40XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTY0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgY2hlY2sgb2JqZWN0cyBhbmQgZnVuY3Rpb25zIGZvciB0aGVuYWJpbGl0eVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQoIHR5cGVvZiByZXR1cm5lZCA9PT0gXCJvYmplY3RcIiB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiByZXR1cm5lZCA9PT0gXCJmdW5jdGlvblwiICkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQudGhlbjtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGEgcmV0dXJuZWQgdGhlbmFibGVcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggaXNGdW5jdGlvbiggdGhlbiApICkge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFNwZWNpYWwgcHJvY2Vzc29ycyAobm90aWZ5KSBqdXN0IHdhaXQgZm9yIHJlc29sdXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBzcGVjaWFsICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBUaHJvd2VyLCBzcGVjaWFsIClcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE5vcm1hbCBwcm9jZXNzb3JzIChyZXNvbHZlKSBhbHNvIGhvb2sgaW50byBwcm9ncmVzc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIGRpc3JlZ2FyZCBvbGRlciByZXNvbHV0aW9uIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1heERlcHRoKys7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGVuLmNhbGwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5lZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgSWRlbnRpdHksIHNwZWNpYWwgKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoIG1heERlcHRoLCBkZWZlcnJlZCwgVGhyb3dlciwgc3BlY2lhbCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSggbWF4RGVwdGgsIGRlZmVycmVkLCBJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgYWxsIG90aGVyIHJldHVybmVkIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IHN1YnN0aXR1dGUgaGFuZGxlcnMgcGFzcyBvbiBjb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIGhhbmRsZXIgIT09IElkZW50aXR5ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoYXQgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJncyA9IFsgcmV0dXJuZWQgXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIFByb2Nlc3MgdGhlIHZhbHVlKHMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vIERlZmF1bHQgcHJvY2VzcyBpcyByZXNvbHZlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCggc3BlY2lhbCB8fCBkZWZlcnJlZC5yZXNvbHZlV2l0aCApKCB0aGF0LCBhcmdzICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgbm9ybWFsIHByb2Nlc3NvcnMgKHJlc29sdmUpIGNhdGNoIGFuZCByZWplY3QgZXhjZXB0aW9uc1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3MgPSBzcGVjaWFsID9cblx0XHRcdFx0XHRcdFx0XHRcdG1pZ2h0VGhyb3cgOlxuXHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWlnaHRUaHJvdygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoICggZSApIHtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LkRlZmVycmVkLmV4Y2VwdGlvbkhvb2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayggZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzcy5zdGFja1RyYWNlICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjQuMVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGh0dHBzOi8vcHJvbWlzZXNhcGx1cy5jb20vI3BvaW50LTYxXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWdub3JlIHBvc3QtcmVzb2x1dGlvbiBleGNlcHRpb25zXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBkZXB0aCArIDEgPj0gbWF4RGVwdGggKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgc3Vic3RpdHV0ZSBoYW5kbGVycyBwYXNzIG9uIGNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIGFuZCBtdWx0aXBsZSB2YWx1ZXMgKG5vbi1zcGVjIGJlaGF2aW9yKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBoYW5kbGVyICE9PSBUaHJvd2VyICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGF0ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmdzID0gWyBlIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIHRoYXQsIGFyZ3MgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogUHJvbWlzZXMvQSsgc2VjdGlvbiAyLjMuMy4zLjFcblx0XHRcdFx0XHRcdFx0Ly8gaHR0cHM6Ly9wcm9taXNlc2FwbHVzLmNvbS8jcG9pbnQtNTdcblx0XHRcdFx0XHRcdFx0Ly8gUmUtcmVzb2x2ZSBwcm9taXNlcyBpbW1lZGlhdGVseSB0byBkb2RnZSBmYWxzZSByZWplY3Rpb24gZnJvbVxuXHRcdFx0XHRcdFx0XHQvLyBzdWJzZXF1ZW50IGVycm9yc1xuXHRcdFx0XHRcdFx0XHRpZiAoIGRlcHRoICkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3MoKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIENhbGwgYW4gb3B0aW9uYWwgaG9vayB0byByZWNvcmQgdGhlIHN0YWNrLCBpbiBjYXNlIG9mIGV4Y2VwdGlvblxuXHRcdFx0XHRcdFx0XHRcdC8vIHNpbmNlIGl0J3Mgb3RoZXJ3aXNlIGxvc3Qgd2hlbiBleGVjdXRpb24gZ29lcyBhc3luY1xuXHRcdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LkRlZmVycmVkLmdldFN0YWNrSG9vayApIHtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3Muc3RhY2tUcmFjZSA9IGpRdWVyeS5EZWZlcnJlZC5nZXRTdGFja0hvb2soKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoIHByb2Nlc3MgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4galF1ZXJ5LkRlZmVycmVkKCBmdW5jdGlvbiggbmV3RGVmZXIgKSB7XG5cblx0XHRcdFx0XHRcdC8vIHByb2dyZXNzX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMCBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0aXNGdW5jdGlvbiggb25Qcm9ncmVzcyApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uUHJvZ3Jlc3MgOlxuXHRcdFx0XHRcdFx0XHRcdFx0SWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIubm90aWZ5V2l0aFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfaGFuZGxlcnMuYWRkKCAuLi4gKVxuXHRcdFx0XHRcdFx0dHVwbGVzWyAxIF1bIDMgXS5hZGQoXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoXG5cdFx0XHRcdFx0XHRcdFx0MCxcblx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlcixcblx0XHRcdFx0XHRcdFx0XHRpc0Z1bmN0aW9uKCBvbkZ1bGZpbGxlZCApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uRnVsZmlsbGVkIDpcblx0XHRcdFx0XHRcdFx0XHRcdElkZW50aXR5XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdC8vIHJlamVjdGVkX2hhbmRsZXJzLmFkZCggLi4uIClcblx0XHRcdFx0XHRcdHR1cGxlc1sgMiBdWyAzIF0uYWRkKFxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKFxuXHRcdFx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRcdFx0bmV3RGVmZXIsXG5cdFx0XHRcdFx0XHRcdFx0aXNGdW5jdGlvbiggb25SZWplY3RlZCApID9cblx0XHRcdFx0XHRcdFx0XHRcdG9uUmVqZWN0ZWQgOlxuXHRcdFx0XHRcdFx0XHRcdFx0VGhyb3dlclxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gKS5wcm9taXNlKCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gR2V0IGEgcHJvbWlzZSBmb3IgdGhpcyBkZWZlcnJlZFxuXHRcdFx0XHQvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XG5cdFx0XHRcdHByb21pc2U6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iaiAhPSBudWxsID8galF1ZXJ5LmV4dGVuZCggb2JqLCBwcm9taXNlICkgOiBwcm9taXNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGVmZXJyZWQgPSB7fTtcblxuXHRcdC8vIEFkZCBsaXN0LXNwZWNpZmljIG1ldGhvZHNcblx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHR1cGxlWyAyIF0sXG5cdFx0XHRcdHN0YXRlU3RyaW5nID0gdHVwbGVbIDUgXTtcblxuXHRcdFx0Ly8gcHJvbWlzZS5wcm9ncmVzcyA9IGxpc3QuYWRkXG5cdFx0XHQvLyBwcm9taXNlLmRvbmUgPSBsaXN0LmFkZFxuXHRcdFx0Ly8gcHJvbWlzZS5mYWlsID0gbGlzdC5hZGRcblx0XHRcdHByb21pc2VbIHR1cGxlWyAxIF0gXSA9IGxpc3QuYWRkO1xuXG5cdFx0XHQvLyBIYW5kbGUgc3RhdGVcblx0XHRcdGlmICggc3RhdGVTdHJpbmcgKSB7XG5cdFx0XHRcdGxpc3QuYWRkKFxuXHRcdFx0XHRcdGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQvLyBzdGF0ZSA9IFwicmVzb2x2ZWRcIiAoaS5lLiwgZnVsZmlsbGVkKVxuXHRcdFx0XHRcdFx0Ly8gc3RhdGUgPSBcInJlamVjdGVkXCJcblx0XHRcdFx0XHRcdHN0YXRlID0gc3RhdGVTdHJpbmc7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8vIHJlamVjdGVkX2NhbGxiYWNrcy5kaXNhYmxlXG5cdFx0XHRcdFx0Ly8gZnVsZmlsbGVkX2NhbGxiYWNrcy5kaXNhYmxlXG5cdFx0XHRcdFx0dHVwbGVzWyAzIC0gaSBdWyAyIF0uZGlzYWJsZSxcblxuXHRcdFx0XHRcdC8vIHJlamVjdGVkX2hhbmRsZXJzLmRpc2FibGVcblx0XHRcdFx0XHQvLyBmdWxmaWxsZWRfaGFuZGxlcnMuZGlzYWJsZVxuXHRcdFx0XHRcdHR1cGxlc1sgMyAtIGkgXVsgMyBdLmRpc2FibGUsXG5cblx0XHRcdFx0XHQvLyBwcm9ncmVzc19jYWxsYmFja3MubG9ja1xuXHRcdFx0XHRcdHR1cGxlc1sgMCBdWyAyIF0ubG9jayxcblxuXHRcdFx0XHRcdC8vIHByb2dyZXNzX2hhbmRsZXJzLmxvY2tcblx0XHRcdFx0XHR0dXBsZXNbIDAgXVsgMyBdLmxvY2tcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJvZ3Jlc3NfaGFuZGxlcnMuZmlyZVxuXHRcdFx0Ly8gZnVsZmlsbGVkX2hhbmRsZXJzLmZpcmVcblx0XHRcdC8vIHJlamVjdGVkX2hhbmRsZXJzLmZpcmVcblx0XHRcdGxpc3QuYWRkKCB0dXBsZVsgMyBdLmZpcmUgKTtcblxuXHRcdFx0Ly8gZGVmZXJyZWQubm90aWZ5ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLm5vdGlmeVdpdGgoLi4uKSB9XG5cdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlc29sdmVXaXRoKC4uLikgfVxuXHRcdFx0Ly8gZGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24oKSB7IGRlZmVycmVkLnJlamVjdFdpdGgoLi4uKSB9XG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbIDAgXSBdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRlZmVycmVkWyB0dXBsZVsgMCBdICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gZGVmZXJyZWQgPyB1bmRlZmluZWQgOiB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBkZWZlcnJlZC5ub3RpZnlXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0Ly8gZGVmZXJyZWQucmVzb2x2ZVdpdGggPSBsaXN0LmZpcmVXaXRoXG5cdFx0XHQvLyBkZWZlcnJlZC5yZWplY3RXaXRoID0gbGlzdC5maXJlV2l0aFxuXHRcdFx0ZGVmZXJyZWRbIHR1cGxlWyAwIF0gKyBcIldpdGhcIiBdID0gbGlzdC5maXJlV2l0aDtcblx0XHR9ICk7XG5cblx0XHQvLyBNYWtlIHRoZSBkZWZlcnJlZCBhIHByb21pc2Vcblx0XHRwcm9taXNlLnByb21pc2UoIGRlZmVycmVkICk7XG5cblx0XHQvLyBDYWxsIGdpdmVuIGZ1bmMgaWYgYW55XG5cdFx0aWYgKCBmdW5jICkge1xuXHRcdFx0ZnVuYy5jYWxsKCBkZWZlcnJlZCwgZGVmZXJyZWQgKTtcblx0XHR9XG5cblx0XHQvLyBBbGwgZG9uZSFcblx0XHRyZXR1cm4gZGVmZXJyZWQ7XG5cdH0sXG5cblx0Ly8gRGVmZXJyZWQgaGVscGVyXG5cdHdoZW46IGZ1bmN0aW9uKCBzaW5nbGVWYWx1ZSApIHtcblx0XHR2YXJcblxuXHRcdFx0Ly8gY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXG5cdFx0XHRyZW1haW5pbmcgPSBhcmd1bWVudHMubGVuZ3RoLFxuXG5cdFx0XHQvLyBjb3VudCBvZiB1bnByb2Nlc3NlZCBhcmd1bWVudHNcblx0XHRcdGkgPSByZW1haW5pbmcsXG5cblx0XHRcdC8vIHN1Ym9yZGluYXRlIGZ1bGZpbGxtZW50IGRhdGFcblx0XHRcdHJlc29sdmVDb250ZXh0cyA9IEFycmF5KCBpICksXG5cdFx0XHRyZXNvbHZlVmFsdWVzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cblx0XHRcdC8vIHRoZSBtYXN0ZXIgRGVmZXJyZWRcblx0XHRcdG1hc3RlciA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXG5cdFx0XHQvLyBzdWJvcmRpbmF0ZSBjYWxsYmFjayBmYWN0b3J5XG5cdFx0XHR1cGRhdGVGdW5jID0gZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZUNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHJlc29sdmVWYWx1ZXNbIGkgXSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gc2xpY2UuY2FsbCggYXJndW1lbnRzICkgOiB2YWx1ZTtcblx0XHRcdFx0XHRpZiAoICEoIC0tcmVtYWluaW5nICkgKSB7XG5cdFx0XHRcdFx0XHRtYXN0ZXIucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH07XG5cblx0XHQvLyBTaW5nbGUtIGFuZCBlbXB0eSBhcmd1bWVudHMgYXJlIGFkb3B0ZWQgbGlrZSBQcm9taXNlLnJlc29sdmVcblx0XHRpZiAoIHJlbWFpbmluZyA8PSAxICkge1xuXHRcdFx0YWRvcHRWYWx1ZSggc2luZ2xlVmFsdWUsIG1hc3Rlci5kb25lKCB1cGRhdGVGdW5jKCBpICkgKS5yZXNvbHZlLCBtYXN0ZXIucmVqZWN0LFxuXHRcdFx0XHQhcmVtYWluaW5nICk7XG5cblx0XHRcdC8vIFVzZSAudGhlbigpIHRvIHVud3JhcCBzZWNvbmRhcnkgdGhlbmFibGVzIChjZi4gZ2gtMzAwMClcblx0XHRcdGlmICggbWFzdGVyLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiIHx8XG5cdFx0XHRcdGlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXSAmJiByZXNvbHZlVmFsdWVzWyBpIF0udGhlbiApICkge1xuXG5cdFx0XHRcdHJldHVybiBtYXN0ZXIudGhlbigpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE11bHRpcGxlIGFyZ3VtZW50cyBhcmUgYWdncmVnYXRlZCBsaWtlIFByb21pc2UuYWxsIGFycmF5IGVsZW1lbnRzXG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRhZG9wdFZhbHVlKCByZXNvbHZlVmFsdWVzWyBpIF0sIHVwZGF0ZUZ1bmMoIGkgKSwgbWFzdGVyLnJlamVjdCApO1xuXHRcdH1cblxuXHRcdHJldHVybiBtYXN0ZXIucHJvbWlzZSgpO1xuXHR9XG59ICk7XG5cblxuLy8gVGhlc2UgdXN1YWxseSBpbmRpY2F0ZSBhIHByb2dyYW1tZXIgbWlzdGFrZSBkdXJpbmcgZGV2ZWxvcG1lbnQsXG4vLyB3YXJuIGFib3V0IHRoZW0gQVNBUCByYXRoZXIgdGhhbiBzd2FsbG93aW5nIHRoZW0gYnkgZGVmYXVsdC5cbnZhciByZXJyb3JOYW1lcyA9IC9eKEV2YWx8SW50ZXJuYWx8UmFuZ2V8UmVmZXJlbmNlfFN5bnRheHxUeXBlfFVSSSlFcnJvciQvO1xuXG5qUXVlcnkuRGVmZXJyZWQuZXhjZXB0aW9uSG9vayA9IGZ1bmN0aW9uKCBlcnJvciwgc3RhY2sgKSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgOCAtIDkgb25seVxuXHQvLyBDb25zb2xlIGV4aXN0cyB3aGVuIGRldiB0b29scyBhcmUgb3Blbiwgd2hpY2ggY2FuIGhhcHBlbiBhdCBhbnkgdGltZVxuXHRpZiAoIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLndhcm4gJiYgZXJyb3IgJiYgcmVycm9yTmFtZXMudGVzdCggZXJyb3IubmFtZSApICkge1xuXHRcdHdpbmRvdy5jb25zb2xlLndhcm4oIFwialF1ZXJ5LkRlZmVycmVkIGV4Y2VwdGlvbjogXCIgKyBlcnJvci5tZXNzYWdlLCBlcnJvci5zdGFjaywgc3RhY2sgKTtcblx0fVxufTtcblxuXG5cblxualF1ZXJ5LnJlYWR5RXhjZXB0aW9uID0gZnVuY3Rpb24oIGVycm9yICkge1xuXHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gKTtcbn07XG5cblxuXG5cbi8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxudmFyIHJlYWR5TGlzdCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG5qUXVlcnkuZm4ucmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cblx0cmVhZHlMaXN0XG5cdFx0LnRoZW4oIGZuIClcblxuXHRcdC8vIFdyYXAgalF1ZXJ5LnJlYWR5RXhjZXB0aW9uIGluIGEgZnVuY3Rpb24gc28gdGhhdCB0aGUgbG9va3VwXG5cdFx0Ly8gaGFwcGVucyBhdCB0aGUgdGltZSBvZiBlcnJvciBoYW5kbGluZyBpbnN0ZWFkIG9mIGNhbGxiYWNrXG5cdFx0Ly8gcmVnaXN0cmF0aW9uLlxuXHRcdC5jYXRjaCggZnVuY3Rpb24oIGVycm9yICkge1xuXHRcdFx0alF1ZXJ5LnJlYWR5RXhjZXB0aW9uKCBlcnJvciApO1xuXHRcdH0gKTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBJcyB0aGUgRE9NIHJlYWR5IHRvIGJlIHVzZWQ/IFNldCB0byB0cnVlIG9uY2UgaXQgb2NjdXJzLlxuXHRpc1JlYWR5OiBmYWxzZSxcblxuXHQvLyBBIGNvdW50ZXIgdG8gdHJhY2sgaG93IG1hbnkgaXRlbXMgdG8gd2FpdCBmb3IgYmVmb3JlXG5cdC8vIHRoZSByZWFkeSBldmVudCBmaXJlcy4gU2VlICM2NzgxXG5cdHJlYWR5V2FpdDogMSxcblxuXHQvLyBIYW5kbGUgd2hlbiB0aGUgRE9NIGlzIHJlYWR5XG5cdHJlYWR5OiBmdW5jdGlvbiggd2FpdCApIHtcblxuXHRcdC8vIEFib3J0IGlmIHRoZXJlIGFyZSBwZW5kaW5nIGhvbGRzIG9yIHdlJ3JlIGFscmVhZHkgcmVhZHlcblx0XHRpZiAoIHdhaXQgPT09IHRydWUgPyAtLWpRdWVyeS5yZWFkeVdhaXQgOiBqUXVlcnkuaXNSZWFkeSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZW1lbWJlciB0aGF0IHRoZSBET00gaXMgcmVhZHlcblx0XHRqUXVlcnkuaXNSZWFkeSA9IHRydWU7XG5cblx0XHQvLyBJZiBhIG5vcm1hbCBET00gUmVhZHkgZXZlbnQgZmlyZWQsIGRlY3JlbWVudCwgYW5kIHdhaXQgaWYgbmVlZCBiZVxuXHRcdGlmICggd2FpdCAhPT0gdHJ1ZSAmJiAtLWpRdWVyeS5yZWFkeVdhaXQgPiAwICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZXJlIGFyZSBmdW5jdGlvbnMgYm91bmQsIHRvIGV4ZWN1dGVcblx0XHRyZWFkeUxpc3QucmVzb2x2ZVdpdGgoIGRvY3VtZW50LCBbIGpRdWVyeSBdICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LnJlYWR5LnRoZW4gPSByZWFkeUxpc3QudGhlbjtcblxuLy8gVGhlIHJlYWR5IGV2ZW50IGhhbmRsZXIgYW5kIHNlbGYgY2xlYW51cCBtZXRob2RcbmZ1bmN0aW9uIGNvbXBsZXRlZCgpIHtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJsb2FkXCIsIGNvbXBsZXRlZCApO1xuXHRqUXVlcnkucmVhZHkoKTtcbn1cblxuLy8gQ2F0Y2ggY2FzZXMgd2hlcmUgJChkb2N1bWVudCkucmVhZHkoKSBpcyBjYWxsZWRcbi8vIGFmdGVyIHRoZSBicm93c2VyIGV2ZW50IGhhcyBhbHJlYWR5IG9jY3VycmVkLlxuLy8gU3VwcG9ydDogSUUgPD05IC0gMTAgb25seVxuLy8gT2xkZXIgSUUgc29tZXRpbWVzIHNpZ25hbHMgXCJpbnRlcmFjdGl2ZVwiIHRvbyBzb29uXG5pZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fFxuXHQoIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiICYmICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwgKSApIHtcblxuXHQvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcblx0d2luZG93LnNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSApO1xuXG59IGVsc2Uge1xuXG5cdC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXG5cdC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG59XG5cblxuXG5cbi8vIE11bHRpZnVuY3Rpb25hbCBtZXRob2QgdG8gZ2V0IGFuZCBzZXQgdmFsdWVzIG9mIGEgY29sbGVjdGlvblxuLy8gVGhlIHZhbHVlL3MgY2FuIG9wdGlvbmFsbHkgYmUgZXhlY3V0ZWQgaWYgaXQncyBhIGZ1bmN0aW9uXG52YXIgYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gZWxlbXMubGVuZ3RoLFxuXHRcdGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuXHQvLyBTZXRzIG1hbnkgdmFsdWVzXG5cdGlmICggdG9UeXBlKCBrZXkgKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXHRcdGZvciAoIGkgaW4ga2V5ICkge1xuXHRcdFx0YWNjZXNzKCBlbGVtcywgZm4sIGksIGtleVsgaSBdLCB0cnVlLCBlbXB0eUdldCwgcmF3ICk7XG5cdFx0fVxuXG5cdC8vIFNldHMgb25lIHZhbHVlXG5cdH0gZWxzZSBpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0Y2hhaW5hYmxlID0gdHJ1ZTtcblxuXHRcdGlmICggIWlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyYXcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICggYnVsayApIHtcblxuXHRcdFx0Ly8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG5cdFx0XHRpZiAoIHJhdyApIHtcblx0XHRcdFx0Zm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XG5cdFx0XHRcdGZuID0gbnVsbDtcblxuXHRcdFx0Ly8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YnVsayA9IGZuO1xuXHRcdFx0XHRmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggZm4gKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0Zm4oXG5cdFx0XHRcdFx0ZWxlbXNbIGkgXSwga2V5LCByYXcgP1xuXHRcdFx0XHRcdHZhbHVlIDpcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCBlbGVtc1sgaSBdLCBpLCBmbiggZWxlbXNbIGkgXSwga2V5ICkgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICggY2hhaW5hYmxlICkge1xuXHRcdHJldHVybiBlbGVtcztcblx0fVxuXG5cdC8vIEdldHNcblx0aWYgKCBidWxrICkge1xuXHRcdHJldHVybiBmbi5jYWxsKCBlbGVtcyApO1xuXHR9XG5cblx0cmV0dXJuIGxlbiA/IGZuKCBlbGVtc1sgMCBdLCBrZXkgKSA6IGVtcHR5R2V0O1xufTtcblxuXG4vLyBNYXRjaGVzIGRhc2hlZCBzdHJpbmcgZm9yIGNhbWVsaXppbmdcbnZhciBybXNQcmVmaXggPSAvXi1tcy0vLFxuXHRyZGFzaEFscGhhID0gLy0oW2Etel0pL2c7XG5cbi8vIFVzZWQgYnkgY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuZnVuY3Rpb24gZmNhbWVsQ2FzZSggYWxsLCBsZXR0ZXIgKSB7XG5cdHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbn1cblxuLy8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xuLy8gU3VwcG9ydDogSUUgPD05IC0gMTEsIEVkZ2UgMTIgLSAxNVxuLy8gTWljcm9zb2Z0IGZvcmdvdCB0byBodW1wIHRoZWlyIHZlbmRvciBwcmVmaXggKCM5NTcyKVxuZnVuY3Rpb24gY2FtZWxDYXNlKCBzdHJpbmcgKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSggcm1zUHJlZml4LCBcIm1zLVwiICkucmVwbGFjZSggcmRhc2hBbHBoYSwgZmNhbWVsQ2FzZSApO1xufVxudmFyIGFjY2VwdERhdGEgPSBmdW5jdGlvbiggb3duZXIgKSB7XG5cblx0Ly8gQWNjZXB0cyBvbmx5OlxuXHQvLyAgLSBOb2RlXG5cdC8vICAgIC0gTm9kZS5FTEVNRU5UX05PREVcblx0Ly8gICAgLSBOb2RlLkRPQ1VNRU5UX05PREVcblx0Ly8gIC0gT2JqZWN0XG5cdC8vICAgIC0gQW55XG5cdHJldHVybiBvd25lci5ub2RlVHlwZSA9PT0gMSB8fCBvd25lci5ub2RlVHlwZSA9PT0gOSB8fCAhKCArb3duZXIubm9kZVR5cGUgKTtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIERhdGEoKSB7XG5cdHRoaXMuZXhwYW5kbyA9IGpRdWVyeS5leHBhbmRvICsgRGF0YS51aWQrKztcbn1cblxuRGF0YS51aWQgPSAxO1xuXG5EYXRhLnByb3RvdHlwZSA9IHtcblxuXHRjYWNoZTogZnVuY3Rpb24oIG93bmVyICkge1xuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIG93bmVyIG9iamVjdCBhbHJlYWR5IGhhcyBhIGNhY2hlXG5cdFx0dmFyIHZhbHVlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0Ly8gSWYgbm90LCBjcmVhdGUgb25lXG5cdFx0aWYgKCAhdmFsdWUgKSB7XG5cdFx0XHR2YWx1ZSA9IHt9O1xuXG5cdFx0XHQvLyBXZSBjYW4gYWNjZXB0IGRhdGEgZm9yIG5vbi1lbGVtZW50IG5vZGVzIGluIG1vZGVybiBicm93c2Vycyxcblx0XHRcdC8vIGJ1dCB3ZSBzaG91bGQgbm90LCBzZWUgIzgzMzUuXG5cdFx0XHQvLyBBbHdheXMgcmV0dXJuIGFuIGVtcHR5IG9iamVjdC5cblx0XHRcdGlmICggYWNjZXB0RGF0YSggb3duZXIgKSApIHtcblxuXHRcdFx0XHQvLyBJZiBpdCBpcyBhIG5vZGUgdW5saWtlbHkgdG8gYmUgc3RyaW5naWZ5LWVkIG9yIGxvb3BlZCBvdmVyXG5cdFx0XHRcdC8vIHVzZSBwbGFpbiBhc3NpZ25tZW50XG5cdFx0XHRcdGlmICggb3duZXIubm9kZVR5cGUgKSB7XG5cdFx0XHRcdFx0b3duZXJbIHRoaXMuZXhwYW5kbyBdID0gdmFsdWU7XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHNlY3VyZSBpdCBpbiBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5XG5cdFx0XHRcdC8vIGNvbmZpZ3VyYWJsZSBtdXN0IGJlIHRydWUgdG8gYWxsb3cgdGhlIHByb3BlcnR5IHRvIGJlXG5cdFx0XHRcdC8vIGRlbGV0ZWQgd2hlbiBkYXRhIGlzIHJlbW92ZWRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoIG93bmVyLCB0aGlzLmV4cGFuZG8sIHtcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSxcblx0c2V0OiBmdW5jdGlvbiggb3duZXIsIGRhdGEsIHZhbHVlICkge1xuXHRcdHZhciBwcm9wLFxuXHRcdFx0Y2FjaGUgPSB0aGlzLmNhY2hlKCBvd25lciApO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCBrZXksIHZhbHVlIF0gYXJnc1xuXHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Y2FjaGVbIGNhbWVsQ2FzZSggZGF0YSApIF0gPSB2YWx1ZTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwgeyBwcm9wZXJ0aWVzIH0gXSBhcmdzXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gQ29weSB0aGUgcHJvcGVydGllcyBvbmUtYnktb25lIHRvIHRoZSBjYWNoZSBvYmplY3Rcblx0XHRcdGZvciAoIHByb3AgaW4gZGF0YSApIHtcblx0XHRcdFx0Y2FjaGVbIGNhbWVsQ2FzZSggcHJvcCApIF0gPSBkYXRhWyBwcm9wIF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjYWNoZTtcblx0fSxcblx0Z2V0OiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcy5jYWNoZSggb3duZXIgKSA6XG5cblx0XHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSAmJiBvd25lclsgdGhpcy5leHBhbmRvIF1bIGNhbWVsQ2FzZSgga2V5ICkgXTtcblx0fSxcblx0YWNjZXNzOiBmdW5jdGlvbiggb3duZXIsIGtleSwgdmFsdWUgKSB7XG5cblx0XHQvLyBJbiBjYXNlcyB3aGVyZSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIE5vIGtleSB3YXMgc3BlY2lmaWVkXG5cdFx0Ly8gICAyLiBBIHN0cmluZyBrZXkgd2FzIHNwZWNpZmllZCwgYnV0IG5vIHZhbHVlIHByb3ZpZGVkXG5cdFx0Ly9cblx0XHQvLyBUYWtlIHRoZSBcInJlYWRcIiBwYXRoIGFuZCBhbGxvdyB0aGUgZ2V0IG1ldGhvZCB0byBkZXRlcm1pbmVcblx0XHQvLyB3aGljaCB2YWx1ZSB0byByZXR1cm4sIHJlc3BlY3RpdmVseSBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIFRoZSBlbnRpcmUgY2FjaGUgb2JqZWN0XG5cdFx0Ly8gICAyLiBUaGUgZGF0YSBzdG9yZWQgYXQgdGhlIGtleVxuXHRcdC8vXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHQoICgga2V5ICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgKSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkgKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLmdldCggb3duZXIsIGtleSApO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gdGhlIGtleSBpcyBub3QgYSBzdHJpbmcsIG9yIGJvdGggYSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly8gYXJlIHNwZWNpZmllZCwgc2V0IG9yIGV4dGVuZCAoZXhpc3Rpbmcgb2JqZWN0cykgd2l0aCBlaXRoZXI6XG5cdFx0Ly9cblx0XHQvLyAgIDEuIEFuIG9iamVjdCBvZiBwcm9wZXJ0aWVzXG5cdFx0Ly8gICAyLiBBIGtleSBhbmQgdmFsdWVcblx0XHQvL1xuXHRcdHRoaXMuc2V0KCBvd25lciwga2V5LCB2YWx1ZSApO1xuXG5cdFx0Ly8gU2luY2UgdGhlIFwic2V0XCIgcGF0aCBjYW4gaGF2ZSB0d28gcG9zc2libGUgZW50cnkgcG9pbnRzXG5cdFx0Ly8gcmV0dXJuIHRoZSBleHBlY3RlZCBkYXRhIGJhc2VkIG9uIHdoaWNoIHBhdGggd2FzIHRha2VuWypdXG5cdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IGtleTtcblx0fSxcblx0cmVtb3ZlOiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHR2YXIgaSxcblx0XHRcdGNhY2hlID0gb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXG5cdFx0aWYgKCBjYWNoZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICgga2V5ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdC8vIFN1cHBvcnQgYXJyYXkgb3Igc3BhY2Ugc2VwYXJhdGVkIHN0cmluZyBvZiBrZXlzXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIGtleSApICkge1xuXG5cdFx0XHRcdC8vIElmIGtleSBpcyBhbiBhcnJheSBvZiBrZXlzLi4uXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzZXQgY2FtZWxDYXNlIGtleXMsIHNvIHJlbW92ZSB0aGF0LlxuXHRcdFx0XHRrZXkgPSBrZXkubWFwKCBjYW1lbENhc2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtleSA9IGNhbWVsQ2FzZSgga2V5ICk7XG5cblx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIGNyZWF0ZSBhbiBhcnJheSBieSBtYXRjaGluZyBub24td2hpdGVzcGFjZVxuXHRcdFx0XHRrZXkgPSBrZXkgaW4gY2FjaGUgP1xuXHRcdFx0XHRcdFsga2V5IF0gOlxuXHRcdFx0XHRcdCgga2V5Lm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10gKTtcblx0XHRcdH1cblxuXHRcdFx0aSA9IGtleS5sZW5ndGg7XG5cblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRkZWxldGUgY2FjaGVbIGtleVsgaSBdIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIHRoZXJlJ3Mgbm8gbW9yZSBkYXRhXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fCBqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKSApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NVxuXHRcdFx0Ly8gV2Via2l0ICYgQmxpbmsgcGVyZm9ybWFuY2Ugc3VmZmVycyB3aGVuIGRlbGV0aW5nIHByb3BlcnRpZXNcblx0XHRcdC8vIGZyb20gRE9NIG5vZGVzLCBzbyBzZXQgdG8gdW5kZWZpbmVkIGluc3RlYWRcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM3ODYwNyAoYnVnIHJlc3RyaWN0ZWQpXG5cdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuXHRcdHZhciBjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRyZXR1cm4gY2FjaGUgIT09IHVuZGVmaW5lZCAmJiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICk7XG5cdH1cbn07XG52YXIgZGF0YVByaXYgPSBuZXcgRGF0YSgpO1xuXG52YXIgZGF0YVVzZXIgPSBuZXcgRGF0YSgpO1xuXG5cblxuLy9cdEltcGxlbWVudGF0aW9uIFN1bW1hcnlcbi8vXG4vL1x0MS4gRW5mb3JjZSBBUEkgc3VyZmFjZSBhbmQgc2VtYW50aWMgY29tcGF0aWJpbGl0eSB3aXRoIDEuOS54IGJyYW5jaFxuLy9cdDIuIEltcHJvdmUgdGhlIG1vZHVsZSdzIG1haW50YWluYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgc3RvcmFnZVxuLy9cdFx0cGF0aHMgdG8gYSBzaW5nbGUgbWVjaGFuaXNtLlxuLy9cdDMuIFVzZSB0aGUgc2FtZSBzaW5nbGUgbWVjaGFuaXNtIHRvIHN1cHBvcnQgXCJwcml2YXRlXCIgYW5kIFwidXNlclwiIGRhdGEuXG4vL1x0NC4gX05ldmVyXyBleHBvc2UgXCJwcml2YXRlXCIgZGF0YSB0byB1c2VyIGNvZGUgKFRPRE86IERyb3AgX2RhdGEsIF9yZW1vdmVEYXRhKVxuLy9cdDUuIEF2b2lkIGV4cG9zaW5nIGltcGxlbWVudGF0aW9uIGRldGFpbHMgb24gdXNlciBvYmplY3RzIChlZy4gZXhwYW5kbyBwcm9wZXJ0aWVzKVxuLy9cdDYuIFByb3ZpZGUgYSBjbGVhciBwYXRoIGZvciBpbXBsZW1lbnRhdGlvbiB1cGdyYWRlIHRvIFdlYWtNYXAgaW4gMjAxNFxuXG52YXIgcmJyYWNlID0gL14oPzpcXHtbXFx3XFxXXSpcXH18XFxbW1xcd1xcV10qXFxdKSQvLFxuXHRybXVsdGlEYXNoID0gL1tBLVpdL2c7XG5cbmZ1bmN0aW9uIGdldERhdGEoIGRhdGEgKSB7XG5cdGlmICggZGF0YSA9PT0gXCJ0cnVlXCIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwiZmFsc2VcIiApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwibnVsbFwiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0aWYgKCBkYXRhID09PSArZGF0YSArIFwiXCIgKSB7XG5cdFx0cmV0dXJuICtkYXRhO1xuXHR9XG5cblx0aWYgKCByYnJhY2UudGVzdCggZGF0YSApICkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKCBkYXRhICk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0dmFyIG5hbWU7XG5cblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRhdGEgPSBnZXREYXRhKCBkYXRhICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHt9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuXHRcdFx0ZGF0YVVzZXIuc2V0KCBlbGVtLCBrZXksIGRhdGEgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGE7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aGFzRGF0YTogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmhhc0RhdGEoIGVsZW0gKSB8fCBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFVc2VyLnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9LFxuXG5cdC8vIFRPRE86IE5vdyB0aGF0IGFsbCBjYWxscyB0byBfZGF0YSBhbmQgX3JlbW92ZURhdGEgaGF2ZSBiZWVuIHJlcGxhY2VkXG5cdC8vIHdpdGggZGlyZWN0IGNhbGxzIHRvIGRhdGFQcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhZGF0YVByaXYuZ2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiICkgKSB7XG5cdFx0XHRcdFx0aSA9IGF0dHJzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0gY2FtZWxDYXNlKCBuYW1lLnNsaWNlKCA1ICkgKTtcblx0XHRcdFx0XHRcdFx0XHRkYXRhQXR0ciggZWxlbSwgbmFtZSwgZGF0YVsgbmFtZSBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0cyBtdWx0aXBsZSB2YWx1ZXNcblx0XHRpZiAoIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZGF0YTtcblxuXHRcdFx0Ly8gVGhlIGNhbGxpbmcgalF1ZXJ5IG9iamVjdCAoZWxlbWVudCBtYXRjaGVzKSBpcyBub3QgZW1wdHlcblx0XHRcdC8vIChhbmQgdGhlcmVmb3JlIGhhcyBhbiBlbGVtZW50IGFwcGVhcnMgYXQgdGhpc1sgMCBdKSBhbmQgdGhlXG5cdFx0XHQvLyBgdmFsdWVgIHBhcmFtZXRlciB3YXMgbm90IHVuZGVmaW5lZC4gQW4gZW1wdHkgalF1ZXJ5IG9iamVjdFxuXHRcdFx0Ly8gd2lsbCByZXN1bHQgaW4gYHVuZGVmaW5lZGAgZm9yIGVsZW0gPSB0aGlzWyAwIF0gd2hpY2ggd2lsbFxuXHRcdFx0Ly8gdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFuIGF0dGVtcHQgdG8gcmVhZCBhIGRhdGEgY2FjaGUgaXMgbWFkZS5cblx0XHRcdGlmICggZWxlbSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gZ2V0IGRhdGEgZnJvbSB0aGUgY2FjaGVcblx0XHRcdFx0Ly8gVGhlIGtleSB3aWxsIGFsd2F5cyBiZSBjYW1lbENhc2VkIGluIERhdGFcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSwga2V5ICk7XG5cdFx0XHRcdGlmICggZGF0YSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBkYXRhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQXR0ZW1wdCB0byBcImRpc2NvdmVyXCIgdGhlIGRhdGEgaW5cblx0XHRcdFx0Ly8gSFRNTDUgY3VzdG9tIGRhdGEtKiBhdHRyc1xuXHRcdFx0XHRkYXRhID0gZGF0YUF0dHIoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlIHRyaWVkIHJlYWxseSBoYXJkLCBidXQgdGhlIGRhdGEgZG9lc24ndCBleGlzdC5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGRhdGEuLi5cblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gV2UgYWx3YXlzIHN0b3JlIHRoZSBjYW1lbENhc2VkIGtleVxuXHRcdFx0XHRkYXRhVXNlci5zZXQoIHRoaXMsIGtleSwgdmFsdWUgKTtcblx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIHRydWUgKTtcblx0fSxcblxuXHRyZW1vdmVEYXRhOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZGF0YVVzZXIucmVtb3ZlKCB0aGlzLCBrZXkgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdHF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSwgZGF0YSApIHtcblx0XHR2YXIgcXVldWU7XG5cblx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHR0eXBlID0gKCB0eXBlIHx8IFwiZnhcIiApICsgXCJxdWV1ZVwiO1xuXHRcdFx0cXVldWUgPSBkYXRhUHJpdi5nZXQoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0Ly8gU3BlZWQgdXAgZGVxdWV1ZSBieSBnZXR0aW5nIG91dCBxdWlja2x5IGlmIHRoaXMgaXMganVzdCBhIGxvb2t1cFxuXHRcdFx0aWYgKCBkYXRhICkge1xuXHRcdFx0XHRpZiAoICFxdWV1ZSB8fCBBcnJheS5pc0FycmF5KCBkYXRhICkgKSB7XG5cdFx0XHRcdFx0cXVldWUgPSBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIHR5cGUsIGpRdWVyeS5tYWtlQXJyYXkoIGRhdGEgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHF1ZXVlLnB1c2goIGRhdGEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHF1ZXVlIHx8IFtdO1xuXHRcdH1cblx0fSxcblxuXHRkZXF1ZXVlOiBmdW5jdGlvbiggZWxlbSwgdHlwZSApIHtcblx0XHR0eXBlID0gdHlwZSB8fCBcImZ4XCI7XG5cblx0XHR2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIGVsZW0sIHR5cGUgKSxcblx0XHRcdHN0YXJ0TGVuZ3RoID0gcXVldWUubGVuZ3RoLFxuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpLFxuXHRcdFx0aG9va3MgPSBqUXVlcnkuX3F1ZXVlSG9va3MoIGVsZW0sIHR5cGUgKSxcblx0XHRcdG5leHQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIGVsZW0sIHR5cGUgKTtcblx0XHRcdH07XG5cblx0XHQvLyBJZiB0aGUgZnggcXVldWUgaXMgZGVxdWV1ZWQsIGFsd2F5cyByZW1vdmUgdGhlIHByb2dyZXNzIHNlbnRpbmVsXG5cdFx0aWYgKCBmbiA9PT0gXCJpbnByb2dyZXNzXCIgKSB7XG5cdFx0XHRmbiA9IHF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRzdGFydExlbmd0aC0tO1xuXHRcdH1cblxuXHRcdGlmICggZm4gKSB7XG5cblx0XHRcdC8vIEFkZCBhIHByb2dyZXNzIHNlbnRpbmVsIHRvIHByZXZlbnQgdGhlIGZ4IHF1ZXVlIGZyb20gYmVpbmdcblx0XHRcdC8vIGF1dG9tYXRpY2FsbHkgZGVxdWV1ZWRcblx0XHRcdGlmICggdHlwZSA9PT0gXCJmeFwiICkge1xuXHRcdFx0XHRxdWV1ZS51bnNoaWZ0KCBcImlucHJvZ3Jlc3NcIiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDbGVhciB1cCB0aGUgbGFzdCBxdWV1ZSBzdG9wIGZ1bmN0aW9uXG5cdFx0XHRkZWxldGUgaG9va3Muc3RvcDtcblx0XHRcdGZuLmNhbGwoIGVsZW0sIG5leHQsIGhvb2tzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCAhc3RhcnRMZW5ndGggJiYgaG9va3MgKSB7XG5cdFx0XHRob29rcy5lbXB0eS5maXJlKCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIE5vdCBwdWJsaWMgLSBnZW5lcmF0ZSBhIHF1ZXVlSG9va3Mgb2JqZWN0LCBvciByZXR1cm4gdGhlIGN1cnJlbnQgb25lXG5cdF9xdWV1ZUhvb2tzOiBmdW5jdGlvbiggZWxlbSwgdHlwZSApIHtcblx0XHR2YXIga2V5ID0gdHlwZSArIFwicXVldWVIb29rc1wiO1xuXHRcdHJldHVybiBkYXRhUHJpdi5nZXQoIGVsZW0sIGtleSApIHx8IGRhdGFQcml2LmFjY2VzcyggZWxlbSwga2V5LCB7XG5cdFx0XHRlbXB0eTogalF1ZXJ5LkNhbGxiYWNrcyggXCJvbmNlIG1lbW9yeVwiICkuYWRkKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0ZGF0YVByaXYucmVtb3ZlKCBlbGVtLCBbIHR5cGUgKyBcInF1ZXVlXCIsIGtleSBdICk7XG5cdFx0XHR9IClcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRxdWV1ZTogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHNldHRlciA9IDI7XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0ZGF0YSA9IHR5cGU7XG5cdFx0XHR0eXBlID0gXCJmeFwiO1xuXHRcdFx0c2V0dGVyLS07XG5cdFx0fVxuXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoIDwgc2V0dGVyICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5xdWV1ZSggdGhpc1sgMCBdLCB0eXBlICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGEgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHR0aGlzIDpcblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBxdWV1ZSA9IGpRdWVyeS5xdWV1ZSggdGhpcywgdHlwZSwgZGF0YSApO1xuXG5cdFx0XHRcdC8vIEVuc3VyZSBhIGhvb2tzIGZvciB0aGlzIHF1ZXVlXG5cdFx0XHRcdGpRdWVyeS5fcXVldWVIb29rcyggdGhpcywgdHlwZSApO1xuXG5cdFx0XHRcdGlmICggdHlwZSA9PT0gXCJmeFwiICYmIHF1ZXVlWyAwIF0gIT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCB0eXBlICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0fSxcblx0ZGVxdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdH0gKTtcblx0fSxcblx0Y2xlYXJRdWV1ZTogZnVuY3Rpb24oIHR5cGUgKSB7XG5cdFx0cmV0dXJuIHRoaXMucXVldWUoIHR5cGUgfHwgXCJmeFwiLCBbXSApO1xuXHR9LFxuXG5cdC8vIEdldCBhIHByb21pc2UgcmVzb2x2ZWQgd2hlbiBxdWV1ZXMgb2YgYSBjZXJ0YWluIHR5cGVcblx0Ly8gYXJlIGVtcHRpZWQgKGZ4IGlzIHRoZSB0eXBlIGJ5IGRlZmF1bHQpXG5cdHByb21pc2U6IGZ1bmN0aW9uKCB0eXBlLCBvYmogKSB7XG5cdFx0dmFyIHRtcCxcblx0XHRcdGNvdW50ID0gMSxcblx0XHRcdGRlZmVyID0galF1ZXJ5LkRlZmVycmVkKCksXG5cdFx0XHRlbGVtZW50cyA9IHRoaXMsXG5cdFx0XHRpID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRyZXNvbHZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggISggLS1jb3VudCApICkge1xuXHRcdFx0XHRcdGRlZmVyLnJlc29sdmVXaXRoKCBlbGVtZW50cywgWyBlbGVtZW50cyBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRpZiAoIHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0b2JqID0gdHlwZTtcblx0XHRcdHR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHR5cGUgPSB0eXBlIHx8IFwiZnhcIjtcblxuXHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0dG1wID0gZGF0YVByaXYuZ2V0KCBlbGVtZW50c1sgaSBdLCB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgKTtcblx0XHRcdGlmICggdG1wICYmIHRtcC5lbXB0eSApIHtcblx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0dG1wLmVtcHR5LmFkZCggcmVzb2x2ZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXNvbHZlKCk7XG5cdFx0cmV0dXJuIGRlZmVyLnByb21pc2UoIG9iaiApO1xuXHR9XG59ICk7XG52YXIgcG51bSA9ICggL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8gKS5zb3VyY2U7XG5cbnZhciByY3NzTnVtID0gbmV3IFJlZ0V4cCggXCJeKD86KFsrLV0pPXwpKFwiICsgcG51bSArIFwiKShbYS16JV0qKSRcIiwgXCJpXCIgKTtcblxuXG52YXIgY3NzRXhwYW5kID0gWyBcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiIF07XG5cbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG5cdHZhciBpc0F0dGFjaGVkID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKTtcblx0XHR9LFxuXHRcdGNvbXBvc2VkID0geyBjb21wb3NlZDogdHJ1ZSB9O1xuXG5cdC8vIFN1cHBvcnQ6IElFIDkgLSAxMSssIEVkZ2UgMTIgLSAxOCssIGlPUyAxMC4wIC0gMTAuMiBvbmx5XG5cdC8vIENoZWNrIGF0dGFjaG1lbnQgYWNyb3NzIHNoYWRvdyBET00gYm91bmRhcmllcyB3aGVuIHBvc3NpYmxlIChnaC0zNTA0KVxuXHQvLyBTdXBwb3J0OiBpT1MgMTAuMC0xMC4yIG9ubHlcblx0Ly8gRWFybHkgaU9TIDEwIHZlcnNpb25zIHN1cHBvcnQgYGF0dGFjaFNoYWRvd2AgYnV0IG5vdCBgZ2V0Um9vdE5vZGVgLFxuXHQvLyBsZWFkaW5nIHRvIGVycm9ycy4gV2UgbmVlZCB0byBjaGVjayBmb3IgYGdldFJvb3ROb2RlYC5cblx0aWYgKCBkb2N1bWVudEVsZW1lbnQuZ2V0Um9vdE5vZGUgKSB7XG5cdFx0aXNBdHRhY2hlZCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICkgfHxcblx0XHRcdFx0ZWxlbS5nZXRSb290Tm9kZSggY29tcG9zZWQgKSA9PT0gZWxlbS5vd25lckRvY3VtZW50O1xuXHRcdH07XG5cdH1cbnZhciBpc0hpZGRlbldpdGhpblRyZWUgPSBmdW5jdGlvbiggZWxlbSwgZWwgKSB7XG5cblx0XHQvLyBpc0hpZGRlbldpdGhpblRyZWUgbWlnaHQgYmUgY2FsbGVkIGZyb20galF1ZXJ5I2ZpbHRlciBmdW5jdGlvbjtcblx0XHQvLyBpbiB0aGF0IGNhc2UsIGVsZW1lbnQgd2lsbCBiZSBzZWNvbmQgYXJndW1lbnRcblx0XHRlbGVtID0gZWwgfHwgZWxlbTtcblxuXHRcdC8vIElubGluZSBzdHlsZSB0cnVtcHMgYWxsXG5cdFx0cmV0dXJuIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIgfHxcblx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJlxuXG5cdFx0XHQvLyBPdGhlcndpc2UsIGNoZWNrIGNvbXB1dGVkIHN0eWxlXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9NDMgLSA0NVxuXHRcdFx0Ly8gRGlzY29ubmVjdGVkIGVsZW1lbnRzIGNhbiBoYXZlIGNvbXB1dGVkIGRpc3BsYXk6IG5vbmUsIHNvIGZpcnN0IGNvbmZpcm0gdGhhdCBlbGVtIGlzXG5cdFx0XHQvLyBpbiB0aGUgZG9jdW1lbnQuXG5cdFx0XHRpc0F0dGFjaGVkKCBlbGVtICkgJiZcblxuXHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCI7XG5cdH07XG5cbnZhciBzd2FwID0gZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrLCBhcmdzICkge1xuXHR2YXIgcmV0LCBuYW1lLFxuXHRcdG9sZCA9IHt9O1xuXG5cdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0b2xkWyBuYW1lIF0gPSBlbGVtLnN0eWxlWyBuYW1lIF07XG5cdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHR9XG5cblx0cmV0ID0gY2FsbGJhY2suYXBwbHkoIGVsZW0sIGFyZ3MgfHwgW10gKTtcblxuXHQvLyBSZXZlcnQgdGhlIG9sZCB2YWx1ZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG5cblxuXG5cbmZ1bmN0aW9uIGFkanVzdENTUyggZWxlbSwgcHJvcCwgdmFsdWVQYXJ0cywgdHdlZW4gKSB7XG5cdHZhciBhZGp1c3RlZCwgc2NhbGUsXG5cdFx0bWF4SXRlcmF0aW9ucyA9IDIwLFxuXHRcdGN1cnJlbnRWYWx1ZSA9IHR3ZWVuID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdHdlZW4uY3VyKCk7XG5cdFx0XHR9IDpcblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgcHJvcCwgXCJcIiApO1xuXHRcdFx0fSxcblx0XHRpbml0aWFsID0gY3VycmVudFZhbHVlKCksXG5cdFx0dW5pdCA9IHZhbHVlUGFydHMgJiYgdmFsdWVQYXJ0c1sgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdID8gXCJcIiA6IFwicHhcIiApLFxuXG5cdFx0Ly8gU3RhcnRpbmcgdmFsdWUgY29tcHV0YXRpb24gaXMgcmVxdWlyZWQgZm9yIHBvdGVudGlhbCB1bml0IG1pc21hdGNoZXNcblx0XHRpbml0aWFsSW5Vbml0ID0gZWxlbS5ub2RlVHlwZSAmJlxuXHRcdFx0KCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gfHwgdW5pdCAhPT0gXCJweFwiICYmICtpbml0aWFsICkgJiZcblx0XHRcdHJjc3NOdW0uZXhlYyggalF1ZXJ5LmNzcyggZWxlbSwgcHJvcCApICk7XG5cblx0aWYgKCBpbml0aWFsSW5Vbml0ICYmIGluaXRpYWxJblVuaXRbIDMgXSAhPT0gdW5pdCApIHtcblxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggPD01NFxuXHRcdC8vIEhhbHZlIHRoZSBpdGVyYXRpb24gdGFyZ2V0IHZhbHVlIHRvIHByZXZlbnQgaW50ZXJmZXJlbmNlIGZyb20gQ1NTIHVwcGVyIGJvdW5kcyAoZ2gtMjE0NClcblx0XHRpbml0aWFsID0gaW5pdGlhbCAvIDI7XG5cblx0XHQvLyBUcnVzdCB1bml0cyByZXBvcnRlZCBieSBqUXVlcnkuY3NzXG5cdFx0dW5pdCA9IHVuaXQgfHwgaW5pdGlhbEluVW5pdFsgMyBdO1xuXG5cdFx0Ly8gSXRlcmF0aXZlbHkgYXBwcm94aW1hdGUgZnJvbSBhIG5vbnplcm8gc3RhcnRpbmcgcG9pbnRcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWwgfHwgMTtcblxuXHRcdHdoaWxlICggbWF4SXRlcmF0aW9ucy0tICkge1xuXG5cdFx0XHQvLyBFdmFsdWF0ZSBhbmQgdXBkYXRlIG91ciBiZXN0IGd1ZXNzIChkb3VibGluZyBndWVzc2VzIHRoYXQgemVybyBvdXQpLlxuXHRcdFx0Ly8gRmluaXNoIGlmIHRoZSBzY2FsZSBlcXVhbHMgb3IgY3Jvc3NlcyAxIChtYWtpbmcgdGhlIG9sZCpuZXcgcHJvZHVjdCBub24tcG9zaXRpdmUpLlxuXHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBpbml0aWFsSW5Vbml0ICsgdW5pdCApO1xuXHRcdFx0aWYgKCAoIDEgLSBzY2FsZSApICogKCAxIC0gKCBzY2FsZSA9IGN1cnJlbnRWYWx1ZSgpIC8gaW5pdGlhbCB8fCAwLjUgKSApIDw9IDAgKSB7XG5cdFx0XHRcdG1heEl0ZXJhdGlvbnMgPSAwO1xuXHRcdFx0fVxuXHRcdFx0aW5pdGlhbEluVW5pdCA9IGluaXRpYWxJblVuaXQgLyBzY2FsZTtcblxuXHRcdH1cblxuXHRcdGluaXRpYWxJblVuaXQgPSBpbml0aWFsSW5Vbml0ICogMjtcblx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIGluaXRpYWxJblVuaXQgKyB1bml0ICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgd2UgdXBkYXRlIHRoZSB0d2VlbiBwcm9wZXJ0aWVzIGxhdGVyIG9uXG5cdFx0dmFsdWVQYXJ0cyA9IHZhbHVlUGFydHMgfHwgW107XG5cdH1cblxuXHRpZiAoIHZhbHVlUGFydHMgKSB7XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsSW5Vbml0IHx8ICtpbml0aWFsIHx8IDA7XG5cblx0XHQvLyBBcHBseSByZWxhdGl2ZSBvZmZzZXQgKCs9Ly09KSBpZiBzcGVjaWZpZWRcblx0XHRhZGp1c3RlZCA9IHZhbHVlUGFydHNbIDEgXSA/XG5cdFx0XHRpbml0aWFsSW5Vbml0ICsgKCB2YWx1ZVBhcnRzWyAxIF0gKyAxICkgKiB2YWx1ZVBhcnRzWyAyIF0gOlxuXHRcdFx0K3ZhbHVlUGFydHNbIDIgXTtcblx0XHRpZiAoIHR3ZWVuICkge1xuXHRcdFx0dHdlZW4udW5pdCA9IHVuaXQ7XG5cdFx0XHR0d2Vlbi5zdGFydCA9IGluaXRpYWxJblVuaXQ7XG5cdFx0XHR0d2Vlbi5lbmQgPSBhZGp1c3RlZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFkanVzdGVkO1xufVxuXG5cbnZhciBkZWZhdWx0RGlzcGxheU1hcCA9IHt9O1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0RGlzcGxheSggZWxlbSApIHtcblx0dmFyIHRlbXAsXG5cdFx0ZG9jID0gZWxlbS5vd25lckRvY3VtZW50LFxuXHRcdG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZSxcblx0XHRkaXNwbGF5ID0gZGVmYXVsdERpc3BsYXlNYXBbIG5vZGVOYW1lIF07XG5cblx0aWYgKCBkaXNwbGF5ICkge1xuXHRcdHJldHVybiBkaXNwbGF5O1xuXHR9XG5cblx0dGVtcCA9IGRvYy5ib2R5LmFwcGVuZENoaWxkKCBkb2MuY3JlYXRlRWxlbWVudCggbm9kZU5hbWUgKSApO1xuXHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggdGVtcCwgXCJkaXNwbGF5XCIgKTtcblxuXHR0ZW1wLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRlbXAgKTtcblxuXHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuXHRcdGRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdH1cblx0ZGVmYXVsdERpc3BsYXlNYXBbIG5vZGVOYW1lIF0gPSBkaXNwbGF5O1xuXG5cdHJldHVybiBkaXNwbGF5O1xufVxuXG5mdW5jdGlvbiBzaG93SGlkZSggZWxlbWVudHMsIHNob3cgKSB7XG5cdHZhciBkaXNwbGF5LCBlbGVtLFxuXHRcdHZhbHVlcyA9IFtdLFxuXHRcdGluZGV4ID0gMCxcblx0XHRsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG5cblx0Ly8gRGV0ZXJtaW5lIG5ldyBkaXNwbGF5IHZhbHVlIGZvciBlbGVtZW50cyB0aGF0IG5lZWQgdG8gY2hhbmdlXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuXHRcdGlmICggIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRkaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5O1xuXHRcdGlmICggc2hvdyApIHtcblxuXHRcdFx0Ly8gU2luY2Ugd2UgZm9yY2UgdmlzaWJpbGl0eSB1cG9uIGNhc2NhZGUtaGlkZGVuIGVsZW1lbnRzLCBhbiBpbW1lZGlhdGUgKGFuZCBzbG93KVxuXHRcdFx0Ly8gY2hlY2sgaXMgcmVxdWlyZWQgaW4gdGhpcyBmaXJzdCBsb29wIHVubGVzcyB3ZSBoYXZlIGEgbm9uZW1wdHkgZGlzcGxheSB2YWx1ZSAoZWl0aGVyXG5cdFx0XHQvLyBpbmxpbmUgb3IgYWJvdXQtdG8tYmUtcmVzdG9yZWQpXG5cdFx0XHRpZiAoIGRpc3BsYXkgPT09IFwibm9uZVwiICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBkYXRhUHJpdi5nZXQoIGVsZW0sIFwiZGlzcGxheVwiICkgfHwgbnVsbDtcblx0XHRcdFx0aWYgKCAhdmFsdWVzWyBpbmRleCBdICkge1xuXHRcdFx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuV2l0aGluVHJlZSggZWxlbSApICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBnZXREZWZhdWx0RGlzcGxheSggZWxlbSApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIGRpc3BsYXkgIT09IFwibm9uZVwiICkge1xuXHRcdFx0XHR2YWx1ZXNbIGluZGV4IF0gPSBcIm5vbmVcIjtcblxuXHRcdFx0XHQvLyBSZW1lbWJlciB3aGF0IHdlJ3JlIG92ZXJ3cml0aW5nXG5cdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJkaXNwbGF5XCIsIGRpc3BsYXkgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgdGhlIGRpc3BsYXkgb2YgdGhlIGVsZW1lbnRzIGluIGEgc2Vjb25kIGxvb3AgdG8gYXZvaWQgY29uc3RhbnQgcmVmbG93XG5cdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0aWYgKCB2YWx1ZXNbIGluZGV4IF0gIT0gbnVsbCApIHtcblx0XHRcdGVsZW1lbnRzWyBpbmRleCBdLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZXNbIGluZGV4IF07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNob3c6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcywgdHJ1ZSApO1xuXHR9LFxuXHRoaWRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2hvd0hpZGUoIHRoaXMgKTtcblx0fSxcblx0dG9nZ2xlOiBmdW5jdGlvbiggc3RhdGUgKSB7XG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0cmV0dXJuIHN0YXRlID8gdGhpcy5zaG93KCkgOiB0aGlzLmhpZGUoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggaXNIaWRkZW5XaXRoaW5UcmVlKCB0aGlzICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnNob3coKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLmhpZGUoKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcbnZhciByY2hlY2thYmxlVHlwZSA9ICggL14oPzpjaGVja2JveHxyYWRpbykkL2kgKTtcblxudmFyIHJ0YWdOYW1lID0gKCAvPChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopL2kgKTtcblxudmFyIHJzY3JpcHRUeXBlID0gKCAvXiR8Xm1vZHVsZSR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pICk7XG5cblxuXG4vLyBXZSBoYXZlIHRvIGNsb3NlIHRoZXNlIHRhZ3MgdG8gc3VwcG9ydCBYSFRNTCAoIzEzMjAwKVxudmFyIHdyYXBNYXAgPSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IG9ubHlcblx0b3B0aW9uOiBbIDEsIFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPlwiLCBcIjwvc2VsZWN0PlwiIF0sXG5cblx0Ly8gWEhUTUwgcGFyc2VycyBkbyBub3QgbWFnaWNhbGx5IGluc2VydCBlbGVtZW50cyBpbiB0aGVcblx0Ly8gc2FtZSB3YXkgdGhhdCB0YWcgc291cCBwYXJzZXJzIGRvLiBTbyB3ZSBjYW5ub3Qgc2hvcnRlblxuXHQvLyB0aGlzIGJ5IG9taXR0aW5nIDx0Ym9keT4gb3Igb3RoZXIgcmVxdWlyZWQgZWxlbWVudHMuXG5cdHRoZWFkOiBbIDEsIFwiPHRhYmxlPlwiLCBcIjwvdGFibGU+XCIgXSxcblx0Y29sOiBbIDIsIFwiPHRhYmxlPjxjb2xncm91cD5cIiwgXCI8L2NvbGdyb3VwPjwvdGFibGU+XCIgXSxcblx0dHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXHR0ZDogWyAzLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiIF0sXG5cblx0X2RlZmF1bHQ6IFsgMCwgXCJcIiwgXCJcIiBdXG59O1xuXG4vLyBTdXBwb3J0OiBJRSA8PTkgb25seVxud3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXG53cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xud3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblxuZnVuY3Rpb24gZ2V0QWxsKCBjb250ZXh0LCB0YWcgKSB7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBVc2UgdHlwZW9mIHRvIGF2b2lkIHplcm8tYXJndW1lbnQgbWV0aG9kIGludm9jYXRpb24gb24gaG9zdCBvYmplY3RzICgjMTUxNTEpXG5cdHZhciByZXQ7XG5cblx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXQgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgfHwgXCIqXCIgKTtcblxuXHR9IGVsc2UgaWYgKCB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldCA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggdGFnIHx8IFwiKlwiICk7XG5cblx0fSBlbHNlIHtcblx0XHRyZXQgPSBbXTtcblx0fVxuXG5cdGlmICggdGFnID09PSB1bmRlZmluZWQgfHwgdGFnICYmIG5vZGVOYW1lKCBjb250ZXh0LCB0YWcgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5Lm1lcmdlKCBbIGNvbnRleHQgXSwgcmV0ICk7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG5cbi8vIE1hcmsgc2NyaXB0cyBhcyBoYXZpbmcgYWxyZWFkeSBiZWVuIGV2YWx1YXRlZFxuZnVuY3Rpb24gc2V0R2xvYmFsRXZhbCggZWxlbXMsIHJlZkVsZW1lbnRzICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZGF0YVByaXYuc2V0KFxuXHRcdFx0ZWxlbXNbIGkgXSxcblx0XHRcdFwiZ2xvYmFsRXZhbFwiLFxuXHRcdFx0IXJlZkVsZW1lbnRzIHx8IGRhdGFQcml2LmdldCggcmVmRWxlbWVudHNbIGkgXSwgXCJnbG9iYWxFdmFsXCIgKVxuXHRcdCk7XG5cdH1cbn1cblxuXG52YXIgcmh0bWwgPSAvPHwmIz9cXHcrOy87XG5cbmZ1bmN0aW9uIGJ1aWxkRnJhZ21lbnQoIGVsZW1zLCBjb250ZXh0LCBzY3JpcHRzLCBzZWxlY3Rpb24sIGlnbm9yZWQgKSB7XG5cdHZhciBlbGVtLCB0bXAsIHRhZywgd3JhcCwgYXR0YWNoZWQsIGosXG5cdFx0ZnJhZ21lbnQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcblx0XHRub2RlcyA9IFtdLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBlbGVtcy5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdGVsZW0gPSBlbGVtc1sgaSBdO1xuXG5cdFx0aWYgKCBlbGVtIHx8IGVsZW0gPT09IDAgKSB7XG5cblx0XHRcdC8vIEFkZCBub2RlcyBkaXJlY3RseVxuXHRcdFx0aWYgKCB0b1R5cGUoIGVsZW0gKSA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCBlbGVtLm5vZGVUeXBlID8gWyBlbGVtIF0gOiBlbGVtICk7XG5cblx0XHRcdC8vIENvbnZlcnQgbm9uLWh0bWwgaW50byBhIHRleHQgbm9kZVxuXHRcdFx0fSBlbHNlIGlmICggIXJodG1sLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0bm9kZXMucHVzaCggY29udGV4dC5jcmVhdGVUZXh0Tm9kZSggZWxlbSApICk7XG5cblx0XHRcdC8vIENvbnZlcnQgaHRtbCBpbnRvIERPTSBub2Rlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dG1wID0gdG1wIHx8IGZyYWdtZW50LmFwcGVuZENoaWxkKCBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApO1xuXG5cdFx0XHRcdC8vIERlc2VyaWFsaXplIGEgc3RhbmRhcmQgcmVwcmVzZW50YXRpb25cblx0XHRcdFx0dGFnID0gKCBydGFnTmFtZS5leGVjKCBlbGVtICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHdyYXAgPSB3cmFwTWFwWyB0YWcgXSB8fCB3cmFwTWFwLl9kZWZhdWx0O1xuXHRcdFx0XHR0bXAuaW5uZXJIVE1MID0gd3JhcFsgMSBdICsgalF1ZXJ5Lmh0bWxQcmVmaWx0ZXIoIGVsZW0gKSArIHdyYXBbIDIgXTtcblxuXHRcdFx0XHQvLyBEZXNjZW5kIHRocm91Z2ggd3JhcHBlcnMgdG8gdGhlIHJpZ2h0IGNvbnRlbnRcblx0XHRcdFx0aiA9IHdyYXBbIDAgXTtcblx0XHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdFx0dG1wID0gdG1wLmxhc3RDaGlsZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggbm9kZXMsIHRtcC5jaGlsZE5vZGVzICk7XG5cblx0XHRcdFx0Ly8gUmVtZW1iZXIgdGhlIHRvcC1sZXZlbCBjb250YWluZXJcblx0XHRcdFx0dG1wID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdFx0XHQvLyBFbnN1cmUgdGhlIGNyZWF0ZWQgbm9kZXMgYXJlIG9ycGhhbmVkICgjMTIzOTIpXG5cdFx0XHRcdHRtcC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmVtb3ZlIHdyYXBwZXIgZnJvbSBmcmFnbWVudFxuXHRmcmFnbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cblx0aSA9IDA7XG5cdHdoaWxlICggKCBlbGVtID0gbm9kZXNbIGkrKyBdICkgKSB7XG5cblx0XHQvLyBTa2lwIGVsZW1lbnRzIGFscmVhZHkgaW4gdGhlIGNvbnRleHQgY29sbGVjdGlvbiAodHJhYy00MDg3KVxuXHRcdGlmICggc2VsZWN0aW9uICYmIGpRdWVyeS5pbkFycmF5KCBlbGVtLCBzZWxlY3Rpb24gKSA+IC0xICkge1xuXHRcdFx0aWYgKCBpZ25vcmVkICkge1xuXHRcdFx0XHRpZ25vcmVkLnB1c2goIGVsZW0gKTtcblx0XHRcdH1cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGF0dGFjaGVkID0gaXNBdHRhY2hlZCggZWxlbSApO1xuXG5cdFx0Ly8gQXBwZW5kIHRvIGZyYWdtZW50XG5cdFx0dG1wID0gZ2V0QWxsKCBmcmFnbWVudC5hcHBlbmRDaGlsZCggZWxlbSApLCBcInNjcmlwdFwiICk7XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0aWYgKCBhdHRhY2hlZCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIHRtcCApO1xuXHRcdH1cblxuXHRcdC8vIENhcHR1cmUgZXhlY3V0YWJsZXNcblx0XHRpZiAoIHNjcmlwdHMgKSB7XG5cdFx0XHRqID0gMDtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gdG1wWyBqKysgXSApICkge1xuXHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIGVsZW0udHlwZSB8fCBcIlwiICkgKSB7XG5cdFx0XHRcdFx0c2NyaXB0cy5wdXNoKCBlbGVtICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZnJhZ21lbnQ7XG59XG5cblxuKCBmdW5jdGlvbigpIHtcblx0dmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdGRpdiA9IGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKSxcblx0XHRpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgNC4wIC0gNC4zIG9ubHlcblx0Ly8gQ2hlY2sgc3RhdGUgbG9zdCBpZiB0aGUgbmFtZSBpcyBzZXQgKCMxMTIxNylcblx0Ly8gU3VwcG9ydDogV2luZG93cyBXZWIgQXBwcyAoV1dBKVxuXHQvLyBgbmFtZWAgYW5kIGB0eXBlYCBtdXN0IHVzZSAuc2V0QXR0cmlidXRlIGZvciBXV0EgKCMxNDkwMSlcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgXCJyYWRpb1wiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjEgb25seVxuXHQvLyBPbGRlciBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZGl2LmNsb25lTm9kZSggdHJ1ZSApLmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5jaGVja2VkO1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHQvLyBNYWtlIHN1cmUgdGV4dGFyZWEgKGFuZCBjaGVja2JveCkgZGVmYXVsdFZhbHVlIGlzIHByb3Blcmx5IGNsb25lZFxuXHRkaXYuaW5uZXJIVE1MID0gXCI8dGV4dGFyZWE+eDwvdGV4dGFyZWE+XCI7XG5cdHN1cHBvcnQubm9DbG9uZUNoZWNrZWQgPSAhIWRpdi5jbG9uZU5vZGUoIHRydWUgKS5sYXN0Q2hpbGQuZGVmYXVsdFZhbHVlO1xufSApKCk7XG5cblxudmFyXG5cdHJrZXlFdmVudCA9IC9ea2V5Lyxcblx0cm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wKXxjbGljay8sXG5cdHJ0eXBlbmFtZXNwYWNlID0gL14oW14uXSopKD86XFwuKC4rKXwpLztcblxuZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSAtIDExK1xuLy8gZm9jdXMoKSBhbmQgYmx1cigpIGFyZSBhc3luY2hyb25vdXMsIGV4Y2VwdCB3aGVuIHRoZXkgYXJlIG5vLW9wLlxuLy8gU28gZXhwZWN0IGZvY3VzIHRvIGJlIHN5bmNocm9ub3VzIHdoZW4gdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBhY3RpdmUsXG4vLyBhbmQgYmx1ciB0byBiZSBzeW5jaHJvbm91cyB3aGVuIHRoZSBlbGVtZW50IGlzIG5vdCBhbHJlYWR5IGFjdGl2ZS5cbi8vIChmb2N1cyBhbmQgYmx1ciBhcmUgYWx3YXlzIHN5bmNocm9ub3VzIGluIG90aGVyIHN1cHBvcnRlZCBicm93c2Vycyxcbi8vIHRoaXMganVzdCBkZWZpbmVzIHdoZW4gd2UgY2FuIGNvdW50IG9uIGl0KS5cbmZ1bmN0aW9uIGV4cGVjdFN5bmMoIGVsZW0sIHR5cGUgKSB7XG5cdHJldHVybiAoIGVsZW0gPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgKSA9PT0gKCB0eXBlID09PSBcImZvY3VzXCIgKTtcbn1cblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbi8vIEFjY2Vzc2luZyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiB0aHJvdyB1bmV4cGVjdGVkbHlcbi8vIGh0dHBzOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMzM5M1xuZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdH0gY2F0Y2ggKCBlcnIgKSB7IH1cbn1cblxuZnVuY3Rpb24gb24oIGVsZW0sIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSApIHtcblx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHQvLyBUeXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcblx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG5cdFx0XHRkYXRhID0gZGF0YSB8fCBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0b24oIGVsZW0sIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIGRhdGEgPT0gbnVsbCAmJiBmbiA9PSBudWxsICkge1xuXG5cdFx0Ly8gKCB0eXBlcywgZm4gKVxuXHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0ZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0fSBlbHNlIGlmICggIWZuICkge1xuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBvbmUgPT09IDEgKSB7XG5cdFx0b3JpZ0ZuID0gZm47XG5cdFx0Zm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuXHRcdFx0alF1ZXJ5KCkub2ZmKCBldmVudCApO1xuXHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fTtcblxuXHRcdC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG5cdFx0Zm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XG5cdH1cblx0cmV0dXJuIGVsZW0uZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgdHlwZXMsIGZuLCBkYXRhLCBzZWxlY3RvciApO1xuXHR9ICk7XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHQvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuXHRcdGlmICggIWVsZW1EYXRhICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxuXHRcdGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuXHRcdFx0aGFuZGxlT2JqSW4gPSBoYW5kbGVyO1xuXHRcdFx0aGFuZGxlciA9IGhhbmRsZU9iakluLmhhbmRsZXI7XG5cdFx0XHRzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuXHRcdH1cblxuXHRcdC8vIEVuc3VyZSB0aGF0IGludmFsaWQgc2VsZWN0b3JzIHRocm93IGV4Y2VwdGlvbnMgYXQgYXR0YWNoIHRpbWVcblx0XHQvLyBFdmFsdWF0ZSBhZ2FpbnN0IGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGVsZW0gaXMgYSBub24tZWxlbWVudCBub2RlIChlLmcuLCBkb2N1bWVudClcblx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBkb2N1bWVudEVsZW1lbnQsIHNlbGVjdG9yICk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG5cdFx0aWYgKCAhaGFuZGxlci5ndWlkICkge1xuXHRcdFx0aGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcblx0XHR9XG5cblx0XHQvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG5cdFx0aWYgKCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlICkgKSB7XG5cdFx0XHRldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSA9IGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0XHRcdC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG5cdFx0XHRcdC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCAhPT0gZS50eXBlID9cblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGVsZW0sIGFyZ3VtZW50cyApIDogdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0b3JpZ1R5cGU6IG9yaWdUeXBlLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdFx0XHRndWlkOiBoYW5kbGVyLmd1aWQsXG5cdFx0XHRcdHNlbGVjdG9yOiBzZWxlY3Rvcixcblx0XHRcdFx0bmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcblx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiIClcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gKSApIHtcblx0XHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSA9IFtdO1xuXHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcblxuXHRcdFx0XHQvLyBPbmx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGlmIHRoZSBzcGVjaWFsIGV2ZW50cyBoYW5kbGVyIHJldHVybnMgZmFsc2Vcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC5zZXR1cCB8fFxuXHRcdFx0XHRcdHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzcGVjaWFsLmFkZCApIHtcblx0XHRcdFx0c3BlY2lhbC5hZGQuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cblx0XHRcdFx0aWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0byB0aGUgZWxlbWVudCdzIGhhbmRsZXIgbGlzdCwgZGVsZWdhdGVzIGluIGZyb250XG5cdFx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuXHRcdFx0alF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdID0gdHJ1ZTtcblx0XHR9XG5cblx0fSxcblxuXHQvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcblx0cmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcblxuXHRcdHZhciBqLCBvcmlnQ291bnQsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICkgJiYgZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsgMiBdICYmXG5cdFx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApO1xuXG5cdFx0XHQvLyBSZW1vdmUgbWF0Y2hpbmcgZXZlbnRzXG5cdFx0XHRvcmlnQ291bnQgPSBqID0gaGFuZGxlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBqIF07XG5cblx0XHRcdFx0aWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuXHRcdFx0XHRcdCggIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCApICYmXG5cdFx0XHRcdFx0KCAhdG1wIHx8IHRtcC50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSAmJlxuXHRcdFx0XHRcdCggIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBoYW5kbGVPYmouc2VsZWN0b3IgfHxcblx0XHRcdFx0XHRcdHNlbGVjdG9yID09PSBcIioqXCIgJiYgaGFuZGxlT2JqLnNlbGVjdG9yICkgKSB7XG5cdFx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBqLCAxICk7XG5cblx0XHRcdFx0XHRpZiAoIGhhbmRsZU9iai5zZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBzcGVjaWFsLnJlbW92ZSApIHtcblx0XHRcdFx0XHRcdHNwZWNpYWwucmVtb3ZlLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XG5cdFx0XHQvLyAoYXZvaWRzIHBvdGVudGlhbCBmb3IgZW5kbGVzcyByZWN1cnNpb24gZHVyaW5nIHJlbW92YWwgb2Ygc3BlY2lhbCBldmVudCBoYW5kbGVycylcblx0XHRcdGlmICggb3JpZ0NvdW50ICYmICFoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdGlmICggIXNwZWNpYWwudGVhcmRvd24gfHxcblx0XHRcdFx0XHRzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGRhdGEgYW5kIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgXCJoYW5kbGUgZXZlbnRzXCIgKTtcblx0XHR9XG5cdH0sXG5cblx0ZGlzcGF0Y2g6IGZ1bmN0aW9uKCBuYXRpdmVFdmVudCApIHtcblxuXHRcdC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxuXHRcdHZhciBldmVudCA9IGpRdWVyeS5ldmVudC5maXgoIG5hdGl2ZUV2ZW50ICk7XG5cblx0XHR2YXIgaSwgaiwgcmV0LCBtYXRjaGVkLCBoYW5kbGVPYmosIGhhbmRsZXJRdWV1ZSxcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGFyZ3VtZW50cy5sZW5ndGggKSxcblx0XHRcdGhhbmRsZXJzID0gKCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGV2ZW50LnR5cGUgXSB8fCB7fTtcblxuXHRcdC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG5cdFx0YXJnc1sgMCBdID0gZXZlbnQ7XG5cblx0XHRmb3IgKCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuXHRcdC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcblx0XHRpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgaGFuZGxlcnNcblx0XHRoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XG5cblx0XHQvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggaGFuZGxlT2JqID0gbWF0Y2hlZC5oYW5kbGVyc1sgaisrIF0gKSAmJlxuXHRcdFx0XHQhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0XHQvLyBJZiB0aGUgZXZlbnQgaXMgbmFtZXNwYWNlZCwgdGhlbiBlYWNoIGhhbmRsZXIgaXMgb25seSBpbnZva2VkIGlmIGl0IGlzXG5cdFx0XHRcdC8vIHNwZWNpYWxseSB1bml2ZXJzYWwgb3IgaXRzIG5hbWVzcGFjZXMgYXJlIGEgc3VwZXJzZXQgb2YgdGhlIGV2ZW50J3MuXG5cdFx0XHRcdGlmICggIWV2ZW50LnJuYW1lc3BhY2UgfHwgaGFuZGxlT2JqLm5hbWVzcGFjZSA9PT0gZmFsc2UgfHxcblx0XHRcdFx0XHRldmVudC5ybmFtZXNwYWNlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuXHRcdFx0XHRcdGV2ZW50LmhhbmRsZU9iaiA9IGhhbmRsZU9iajtcblx0XHRcdFx0XHRldmVudC5kYXRhID0gaGFuZGxlT2JqLmRhdGE7XG5cblx0XHRcdFx0XHRyZXQgPSAoICggalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGhhbmRsZU9iai5vcmlnVHlwZSBdIHx8IHt9ICkuaGFuZGxlIHx8XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlciApLmFwcGx5KCBtYXRjaGVkLmVsZW0sIGFyZ3MgKTtcblxuXHRcdFx0XHRcdGlmICggcmV0ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICggZXZlbnQucmVzdWx0ID0gcmV0ICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRoYW5kbGVyczogZnVuY3Rpb24oIGV2ZW50LCBoYW5kbGVycyApIHtcblx0XHR2YXIgaSwgaGFuZGxlT2JqLCBzZWwsIG1hdGNoZWRIYW5kbGVycywgbWF0Y2hlZFNlbGVjdG9ycyxcblx0XHRcdGhhbmRsZXJRdWV1ZSA9IFtdLFxuXHRcdFx0ZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG5cdFx0XHRjdXIgPSBldmVudC50YXJnZXQ7XG5cblx0XHQvLyBGaW5kIGRlbGVnYXRlIGhhbmRsZXJzXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmXG5cblx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OVxuXHRcdFx0Ly8gQmxhY2staG9sZSBTVkcgPHVzZT4gaW5zdGFuY2UgdHJlZXMgKHRyYWMtMTMxODApXG5cdFx0XHRjdXIubm9kZVR5cGUgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogRmlyZWZveCA8PTQyXG5cdFx0XHQvLyBTdXBwcmVzcyBzcGVjLXZpb2xhdGluZyBjbGlja3MgaW5kaWNhdGluZyBhIG5vbi1wcmltYXJ5IHBvaW50ZXIgYnV0dG9uICh0cmFjLTM4NjEpXG5cdFx0XHQvLyBodHRwczovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC10eXBlLWNsaWNrXG5cdFx0XHQvLyBTdXBwb3J0OiBJRSAxMSBvbmx5XG5cdFx0XHQvLyAuLi5idXQgbm90IGFycm93IGtleSBcImNsaWNrc1wiIG9mIHJhZGlvIGlucHV0cywgd2hpY2ggY2FuIGhhdmUgYGJ1dHRvbmAgLTEgKGdoLTIzNDMpXG5cdFx0XHQhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgZXZlbnQuYnV0dG9uID49IDEgKSApIHtcblxuXHRcdFx0Zm9yICggOyBjdXIgIT09IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgY2hlY2sgbm9uLWVsZW1lbnRzICgjMTMyMDgpXG5cdFx0XHRcdC8vIERvbid0IHByb2Nlc3MgY2xpY2tzIG9uIGRpc2FibGVkIGVsZW1lbnRzICgjNjkxMSwgIzgxNjUsICMxMTM4MiwgIzExNzY0KVxuXHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA9PT0gMSAmJiAhKCBldmVudC50eXBlID09PSBcImNsaWNrXCIgJiYgY3VyLmRpc2FibGVkID09PSB0cnVlICkgKSB7XG5cdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9ycyA9IHt9O1xuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgZGVsZWdhdGVDb3VudDsgaSsrICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlT2JqID0gaGFuZGxlcnNbIGkgXTtcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgY29uZmxpY3Qgd2l0aCBPYmplY3QucHJvdG90eXBlIHByb3BlcnRpZXMgKCMxMzIwMylcblx0XHRcdFx0XHRcdHNlbCA9IGhhbmRsZU9iai5zZWxlY3RvciArIFwiIFwiO1xuXG5cdFx0XHRcdFx0XHRpZiAoIG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRTZWxlY3RvcnNbIHNlbCBdID0gaGFuZGxlT2JqLm5lZWRzQ29udGV4dCA/XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCBzZWwsIHRoaXMgKS5pbmRleCggY3VyICkgPiAtMSA6XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQoIHNlbCwgdGhpcywgbnVsbCwgWyBjdXIgXSApLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZWRIYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBtYXRjaGVkSGFuZGxlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goIHsgZWxlbTogY3VyLCBoYW5kbGVyczogbWF0Y2hlZEhhbmRsZXJzIH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG5cdFx0Y3VyID0gdGhpcztcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgPCBoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaGFuZGxlclF1ZXVlO1xuXHR9LFxuXG5cdGFkZFByb3A6IGZ1bmN0aW9uKCBuYW1lLCBob29rICkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSggalF1ZXJ5LkV2ZW50LnByb3RvdHlwZSwgbmFtZSwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblxuXHRcdFx0Z2V0OiBpc0Z1bmN0aW9uKCBob29rICkgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGhvb2soIHRoaXMub3JpZ2luYWxFdmVudCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcmlnaW5hbEV2ZW50WyBuYW1lIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggb3JpZ2luYWxFdmVudCApIHtcblx0XHRyZXR1cm4gb3JpZ2luYWxFdmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG5cdFx0XHRvcmlnaW5hbEV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXG5cdFx0XHQvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXG5cdFx0XHRub0J1YmJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0Y2xpY2s6IHtcblxuXHRcdFx0Ly8gVXRpbGl6ZSBuYXRpdmUgZXZlbnQgdG8gZW5zdXJlIGNvcnJlY3Qgc3RhdGUgZm9yIGNoZWNrYWJsZSBpbnB1dHNcblx0XHRcdHNldHVwOiBmdW5jdGlvbiggZGF0YSApIHtcblxuXHRcdFx0XHQvLyBGb3IgbXV0dWFsIGNvbXByZXNzaWJpbGl0eSB3aXRoIF9kZWZhdWx0LCByZXBsYWNlIGB0aGlzYCBhY2Nlc3Mgd2l0aCBhIGxvY2FsIHZhci5cblx0XHRcdFx0Ly8gYHx8IGRhdGFgIGlzIGRlYWQgY29kZSBtZWFudCBvbmx5IHRvIHByZXNlcnZlIHRoZSB2YXJpYWJsZSB0aHJvdWdoIG1pbmlmaWNhdGlvbi5cblx0XHRcdFx0dmFyIGVsID0gdGhpcyB8fCBkYXRhO1xuXG5cdFx0XHRcdC8vIENsYWltIHRoZSBmaXJzdCBoYW5kbGVyXG5cdFx0XHRcdGlmICggcmNoZWNrYWJsZVR5cGUudGVzdCggZWwudHlwZSApICYmXG5cdFx0XHRcdFx0ZWwuY2xpY2sgJiYgbm9kZU5hbWUoIGVsLCBcImlucHV0XCIgKSApIHtcblxuXHRcdFx0XHRcdC8vIGRhdGFQcml2LnNldCggZWwsIFwiY2xpY2tcIiwgLi4uIClcblx0XHRcdFx0XHRsZXZlcmFnZU5hdGl2ZSggZWwsIFwiY2xpY2tcIiwgcmV0dXJuVHJ1ZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmV0dXJuIGZhbHNlIHRvIGFsbG93IG5vcm1hbCBwcm9jZXNzaW5nIGluIHRoZSBjYWxsZXJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCBkYXRhICkge1xuXG5cdFx0XHRcdC8vIEZvciBtdXR1YWwgY29tcHJlc3NpYmlsaXR5IHdpdGggX2RlZmF1bHQsIHJlcGxhY2UgYHRoaXNgIGFjY2VzcyB3aXRoIGEgbG9jYWwgdmFyLlxuXHRcdFx0XHQvLyBgfHwgZGF0YWAgaXMgZGVhZCBjb2RlIG1lYW50IG9ubHkgdG8gcHJlc2VydmUgdGhlIHZhcmlhYmxlIHRocm91Z2ggbWluaWZpY2F0aW9uLlxuXHRcdFx0XHR2YXIgZWwgPSB0aGlzIHx8IGRhdGE7XG5cblx0XHRcdFx0Ly8gRm9yY2Ugc2V0dXAgYmVmb3JlIHRyaWdnZXJpbmcgYSBjbGlja1xuXHRcdFx0XHRpZiAoIHJjaGVja2FibGVUeXBlLnRlc3QoIGVsLnR5cGUgKSAmJlxuXHRcdFx0XHRcdGVsLmNsaWNrICYmIG5vZGVOYW1lKCBlbCwgXCJpbnB1dFwiICkgKSB7XG5cblx0XHRcdFx0XHRsZXZlcmFnZU5hdGl2ZSggZWwsIFwiY2xpY2tcIiApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmV0dXJuIG5vbi1mYWxzZSB0byBhbGxvdyBub3JtYWwgZXZlbnQtcGF0aCBwcm9wYWdhdGlvblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIEZvciBjcm9zcy1icm93c2VyIGNvbnNpc3RlbmN5LCBzdXBwcmVzcyBuYXRpdmUgLmNsaWNrKCkgb24gbGlua3Ncblx0XHRcdC8vIEFsc28gcHJldmVudCBpdCBpZiB3ZSdyZSBjdXJyZW50bHkgaW5zaWRlIGEgbGV2ZXJhZ2VkIG5hdGl2ZS1ldmVudCBzdGFja1xuXHRcdFx0X2RlZmF1bHQ6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblx0XHRcdFx0cmV0dXJuIHJjaGVja2FibGVUeXBlLnRlc3QoIHRhcmdldC50eXBlICkgJiZcblx0XHRcdFx0XHR0YXJnZXQuY2xpY2sgJiYgbm9kZU5hbWUoIHRhcmdldCwgXCJpbnB1dFwiICkgJiZcblx0XHRcdFx0XHRkYXRhUHJpdi5nZXQoIHRhcmdldCwgXCJjbGlja1wiICkgfHxcblx0XHRcdFx0XHRub2RlTmFtZSggdGFyZ2V0LCBcImFcIiApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmV1bmxvYWQ6IHtcblx0XHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggMjArXG5cdFx0XHRcdC8vIEZpcmVmb3ggZG9lc24ndCBhbGVydCBpZiB0aGUgcmV0dXJuVmFsdWUgZmllbGQgaXMgbm90IHNldC5cblx0XHRcdFx0aWYgKCBldmVudC5yZXN1bHQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdGV2ZW50Lm9yaWdpbmFsRXZlbnQucmV0dXJuVmFsdWUgPSBldmVudC5yZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbi8vIEVuc3VyZSB0aGUgcHJlc2VuY2Ugb2YgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBoYW5kbGVzIG1hbnVhbGx5LXRyaWdnZXJlZFxuLy8gc3ludGhldGljIGV2ZW50cyBieSBpbnRlcnJ1cHRpbmcgcHJvZ3Jlc3MgdW50aWwgcmVpbnZva2VkIGluIHJlc3BvbnNlIHRvXG4vLyAqbmF0aXZlKiBldmVudHMgdGhhdCBpdCBmaXJlcyBkaXJlY3RseSwgZW5zdXJpbmcgdGhhdCBzdGF0ZSBjaGFuZ2VzIGhhdmVcbi8vIGFscmVhZHkgb2NjdXJyZWQgYmVmb3JlIG90aGVyIGxpc3RlbmVycyBhcmUgaW52b2tlZC5cbmZ1bmN0aW9uIGxldmVyYWdlTmF0aXZlKCBlbCwgdHlwZSwgZXhwZWN0U3luYyApIHtcblxuXHQvLyBNaXNzaW5nIGV4cGVjdFN5bmMgaW5kaWNhdGVzIGEgdHJpZ2dlciBjYWxsLCB3aGljaCBtdXN0IGZvcmNlIHNldHVwIHRocm91Z2ggalF1ZXJ5LmV2ZW50LmFkZFxuXHRpZiAoICFleHBlY3RTeW5jICkge1xuXHRcdGlmICggZGF0YVByaXYuZ2V0KCBlbCwgdHlwZSApID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBlbCwgdHlwZSwgcmV0dXJuVHJ1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBSZWdpc3RlciB0aGUgY29udHJvbGxlciBhcyBhIHNwZWNpYWwgdW5pdmVyc2FsIGhhbmRsZXIgZm9yIGFsbCBldmVudCBuYW1lc3BhY2VzXG5cdGRhdGFQcml2LnNldCggZWwsIHR5cGUsIGZhbHNlICk7XG5cdGpRdWVyeS5ldmVudC5hZGQoIGVsLCB0eXBlLCB7XG5cdFx0bmFtZXNwYWNlOiBmYWxzZSxcblx0XHRoYW5kbGVyOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgbm90QXN5bmMsIHJlc3VsdCxcblx0XHRcdFx0c2F2ZWQgPSBkYXRhUHJpdi5nZXQoIHRoaXMsIHR5cGUgKTtcblxuXHRcdFx0aWYgKCAoIGV2ZW50LmlzVHJpZ2dlciAmIDEgKSAmJiB0aGlzWyB0eXBlIF0gKSB7XG5cblx0XHRcdFx0Ly8gSW50ZXJydXB0IHByb2Nlc3Npbmcgb2YgdGhlIG91dGVyIHN5bnRoZXRpYyAudHJpZ2dlcigpZWQgZXZlbnRcblx0XHRcdFx0Ly8gU2F2ZWQgZGF0YSBzaG91bGQgYmUgZmFsc2UgaW4gc3VjaCBjYXNlcywgYnV0IG1pZ2h0IGJlIGEgbGVmdG92ZXIgY2FwdHVyZSBvYmplY3Rcblx0XHRcdFx0Ly8gZnJvbSBhbiBhc3luYyBuYXRpdmUgaGFuZGxlciAoZ2gtNDM1MClcblx0XHRcdFx0aWYgKCAhc2F2ZWQubGVuZ3RoICkge1xuXG5cdFx0XHRcdFx0Ly8gU3RvcmUgYXJndW1lbnRzIGZvciB1c2Ugd2hlbiBoYW5kbGluZyB0aGUgaW5uZXIgbmF0aXZlIGV2ZW50XG5cdFx0XHRcdFx0Ly8gVGhlcmUgd2lsbCBhbHdheXMgYmUgYXQgbGVhc3Qgb25lIGFyZ3VtZW50IChhbiBldmVudCBvYmplY3QpLCBzbyB0aGlzIGFycmF5XG5cdFx0XHRcdFx0Ly8gd2lsbCBub3QgYmUgY29uZnVzZWQgd2l0aCBhIGxlZnRvdmVyIGNhcHR1cmUgb2JqZWN0LlxuXHRcdFx0XHRcdHNhdmVkID0gc2xpY2UuY2FsbCggYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCB0aGlzLCB0eXBlLCBzYXZlZCApO1xuXG5cdFx0XHRcdFx0Ly8gVHJpZ2dlciB0aGUgbmF0aXZlIGV2ZW50IGFuZCBjYXB0dXJlIGl0cyByZXN1bHRcblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMStcblx0XHRcdFx0XHQvLyBmb2N1cygpIGFuZCBibHVyKCkgYXJlIGFzeW5jaHJvbm91c1xuXHRcdFx0XHRcdG5vdEFzeW5jID0gZXhwZWN0U3luYyggdGhpcywgdHlwZSApO1xuXHRcdFx0XHRcdHRoaXNbIHR5cGUgXSgpO1xuXHRcdFx0XHRcdHJlc3VsdCA9IGRhdGFQcml2LmdldCggdGhpcywgdHlwZSApO1xuXHRcdFx0XHRcdGlmICggc2F2ZWQgIT09IHJlc3VsdCB8fCBub3RBc3luYyApIHtcblx0XHRcdFx0XHRcdGRhdGFQcml2LnNldCggdGhpcywgdHlwZSwgZmFsc2UgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0ge307XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggc2F2ZWQgIT09IHJlc3VsdCApIHtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FuY2VsIHRoZSBvdXRlciBzeW50aGV0aWMgZXZlbnRcblx0XHRcdFx0XHRcdGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQudmFsdWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIHRoaXMgaXMgYW4gaW5uZXIgc3ludGhldGljIGV2ZW50IGZvciBhbiBldmVudCB3aXRoIGEgYnViYmxpbmcgc3Vycm9nYXRlXG5cdFx0XHRcdC8vIChmb2N1cyBvciBibHVyKSwgYXNzdW1lIHRoYXQgdGhlIHN1cnJvZ2F0ZSBhbHJlYWR5IHByb3BhZ2F0ZWQgZnJvbSB0cmlnZ2VyaW5nIHRoZVxuXHRcdFx0XHQvLyBuYXRpdmUgZXZlbnQgYW5kIHByZXZlbnQgdGhhdCBmcm9tIGhhcHBlbmluZyBhZ2FpbiBoZXJlLlxuXHRcdFx0XHQvLyBUaGlzIHRlY2huaWNhbGx5IGdldHMgdGhlIG9yZGVyaW5nIHdyb25nIHcuci50LiB0byBgLnRyaWdnZXIoKWAgKGluIHdoaWNoIHRoZVxuXHRcdFx0XHQvLyBidWJibGluZyBzdXJyb2dhdGUgcHJvcGFnYXRlcyAqYWZ0ZXIqIHRoZSBub24tYnViYmxpbmcgYmFzZSksIGJ1dCB0aGF0IHNlZW1zXG5cdFx0XHRcdC8vIGxlc3MgYmFkIHRoYW4gZHVwbGljYXRpb24uXG5cdFx0XHRcdH0gZWxzZSBpZiAoICggalF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fSApLmRlbGVnYXRlVHlwZSApIHtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgbmF0aXZlIGV2ZW50IHRyaWdnZXJlZCBhYm92ZSwgZXZlcnl0aGluZyBpcyBub3cgaW4gb3JkZXJcblx0XHRcdC8vIEZpcmUgYW4gaW5uZXIgc3ludGhldGljIGV2ZW50IHdpdGggdGhlIG9yaWdpbmFsIGFyZ3VtZW50c1xuXHRcdFx0fSBlbHNlIGlmICggc2F2ZWQubGVuZ3RoICkge1xuXG5cdFx0XHRcdC8vIC4uLmFuZCBjYXB0dXJlIHRoZSByZXN1bHRcblx0XHRcdFx0ZGF0YVByaXYuc2V0KCB0aGlzLCB0eXBlLCB7XG5cdFx0XHRcdFx0dmFsdWU6IGpRdWVyeS5ldmVudC50cmlnZ2VyKFxuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMStcblx0XHRcdFx0XHRcdC8vIEV4dGVuZCB3aXRoIHRoZSBwcm90b3R5cGUgdG8gcmVzZXQgdGhlIGFib3ZlIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG5cdFx0XHRcdFx0XHRqUXVlcnkuZXh0ZW5kKCBzYXZlZFsgMCBdLCBqUXVlcnkuRXZlbnQucHJvdG90eXBlICksXG5cdFx0XHRcdFx0XHRzYXZlZC5zbGljZSggMSApLFxuXHRcdFx0XHRcdFx0dGhpc1xuXHRcdFx0XHRcdClcblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdC8vIEFib3J0IGhhbmRsaW5nIG9mIHRoZSBuYXRpdmUgZXZlbnRcblx0XHRcdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9ICk7XG59XG5cbmpRdWVyeS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG5cblx0Ly8gVGhpcyBcImlmXCIgaXMgbmVlZGVkIGZvciBwbGFpbiBvYmplY3RzXG5cdGlmICggZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuXHRcdGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlICk7XG5cdH1cbn07XG5cbmpRdWVyeS5FdmVudCA9IGZ1bmN0aW9uKCBzcmMsIHByb3BzICkge1xuXG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBqUXVlcnkuRXZlbnQgKSApIHtcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5FdmVudCggc3JjLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gRXZlbnQgb2JqZWN0XG5cdGlmICggc3JjICYmIHNyYy50eXBlICkge1xuXHRcdHRoaXMub3JpZ2luYWxFdmVudCA9IHNyYztcblx0XHR0aGlzLnR5cGUgPSBzcmMudHlwZTtcblxuXHRcdC8vIEV2ZW50cyBidWJibGluZyB1cCB0aGUgZG9jdW1lbnQgbWF5IGhhdmUgYmVlbiBtYXJrZWQgYXMgcHJldmVudGVkXG5cdFx0Ly8gYnkgYSBoYW5kbGVyIGxvd2VyIGRvd24gdGhlIHRyZWU7IHJlZmxlY3QgdGhlIGNvcnJlY3QgdmFsdWUuXG5cdFx0dGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fFxuXHRcdFx0XHRzcmMuZGVmYXVsdFByZXZlbnRlZCA9PT0gdW5kZWZpbmVkICYmXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTIuMyBvbmx5XG5cdFx0XHRcdHNyYy5yZXR1cm5WYWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0cmV0dXJuVHJ1ZSA6XG5cdFx0XHRyZXR1cm5GYWxzZTtcblxuXHRcdC8vIENyZWF0ZSB0YXJnZXQgcHJvcGVydGllc1xuXHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA8PTYgLSA3IG9ubHlcblx0XHQvLyBUYXJnZXQgc2hvdWxkIG5vdCBiZSBhIHRleHQgbm9kZSAoIzUwNCwgIzEzMTQzKVxuXHRcdHRoaXMudGFyZ2V0ID0gKCBzcmMudGFyZ2V0ICYmIHNyYy50YXJnZXQubm9kZVR5cGUgPT09IDMgKSA/XG5cdFx0XHRzcmMudGFyZ2V0LnBhcmVudE5vZGUgOlxuXHRcdFx0c3JjLnRhcmdldDtcblxuXHRcdHRoaXMuY3VycmVudFRhcmdldCA9IHNyYy5jdXJyZW50VGFyZ2V0O1xuXHRcdHRoaXMucmVsYXRlZFRhcmdldCA9IHNyYy5yZWxhdGVkVGFyZ2V0O1xuXG5cdC8vIEV2ZW50IHR5cGVcblx0fSBlbHNlIHtcblx0XHR0aGlzLnR5cGUgPSBzcmM7XG5cdH1cblxuXHQvLyBQdXQgZXhwbGljaXRseSBwcm92aWRlZCBwcm9wZXJ0aWVzIG9udG8gdGhlIGV2ZW50IG9iamVjdFxuXHRpZiAoIHByb3BzICkge1xuXHRcdGpRdWVyeS5leHRlbmQoIHRoaXMsIHByb3BzICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSB0aW1lc3RhbXAgaWYgaW5jb21pbmcgZXZlbnQgZG9lc24ndCBoYXZlIG9uZVxuXHR0aGlzLnRpbWVTdGFtcCA9IHNyYyAmJiBzcmMudGltZVN0YW1wIHx8IERhdGUubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeS5FdmVudCxcblx0aXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcblx0aXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzU2ltdWxhdGVkOiBmYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59O1xuXG4vLyBJbmNsdWRlcyBhbGwgY29tbW9uIGV2ZW50IHByb3BzIGluY2x1ZGluZyBLZXlFdmVudCBhbmQgTW91c2VFdmVudCBzcGVjaWZpYyBwcm9wc1xualF1ZXJ5LmVhY2goIHtcblx0YWx0S2V5OiB0cnVlLFxuXHRidWJibGVzOiB0cnVlLFxuXHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRjaGFuZ2VkVG91Y2hlczogdHJ1ZSxcblx0Y3RybEtleTogdHJ1ZSxcblx0ZGV0YWlsOiB0cnVlLFxuXHRldmVudFBoYXNlOiB0cnVlLFxuXHRtZXRhS2V5OiB0cnVlLFxuXHRwYWdlWDogdHJ1ZSxcblx0cGFnZVk6IHRydWUsXG5cdHNoaWZ0S2V5OiB0cnVlLFxuXHR2aWV3OiB0cnVlLFxuXHRcImNoYXJcIjogdHJ1ZSxcblx0Y29kZTogdHJ1ZSxcblx0Y2hhckNvZGU6IHRydWUsXG5cdGtleTogdHJ1ZSxcblx0a2V5Q29kZTogdHJ1ZSxcblx0YnV0dG9uOiB0cnVlLFxuXHRidXR0b25zOiB0cnVlLFxuXHRjbGllbnRYOiB0cnVlLFxuXHRjbGllbnRZOiB0cnVlLFxuXHRvZmZzZXRYOiB0cnVlLFxuXHRvZmZzZXRZOiB0cnVlLFxuXHRwb2ludGVySWQ6IHRydWUsXG5cdHBvaW50ZXJUeXBlOiB0cnVlLFxuXHRzY3JlZW5YOiB0cnVlLFxuXHRzY3JlZW5ZOiB0cnVlLFxuXHR0YXJnZXRUb3VjaGVzOiB0cnVlLFxuXHR0b0VsZW1lbnQ6IHRydWUsXG5cdHRvdWNoZXM6IHRydWUsXG5cblx0d2hpY2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuXG5cdFx0Ly8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG5cdFx0aWYgKCBldmVudC53aGljaCA9PSBudWxsICYmIHJrZXlFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnQuY2hhckNvZGUgIT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcblx0XHR9XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgcm1vdXNlRXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuXHRcdFx0aWYgKCBidXR0b24gJiAxICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiAyICkge1xuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiA0ICkge1xuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LndoaWNoO1xuXHR9XG59LCBqUXVlcnkuZXZlbnQuYWRkUHJvcCApO1xuXG5qUXVlcnkuZWFjaCggeyBmb2N1czogXCJmb2N1c2luXCIsIGJsdXI6IFwiZm9jdXNvdXRcIiB9LCBmdW5jdGlvbiggdHlwZSwgZGVsZWdhdGVUeXBlICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdID0ge1xuXG5cdFx0Ly8gVXRpbGl6ZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0c2V0dXA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBDbGFpbSB0aGUgZmlyc3QgaGFuZGxlclxuXHRcdFx0Ly8gZGF0YVByaXYuc2V0KCB0aGlzLCBcImZvY3VzXCIsIC4uLiApXG5cdFx0XHQvLyBkYXRhUHJpdi5zZXQoIHRoaXMsIFwiYmx1clwiLCAuLi4gKVxuXHRcdFx0bGV2ZXJhZ2VOYXRpdmUoIHRoaXMsIHR5cGUsIGV4cGVjdFN5bmMgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIGZhbHNlIHRvIGFsbG93IG5vcm1hbCBwcm9jZXNzaW5nIGluIHRoZSBjYWxsZXJcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBGb3JjZSBzZXR1cCBiZWZvcmUgdHJpZ2dlclxuXHRcdFx0bGV2ZXJhZ2VOYXRpdmUoIHRoaXMsIHR5cGUgKTtcblxuXHRcdFx0Ly8gUmV0dXJuIG5vbi1mYWxzZSB0byBhbGxvdyBub3JtYWwgZXZlbnQtcGF0aCBwcm9wYWdhdGlvblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdGRlbGVnYXRlVHlwZTogZGVsZWdhdGVUeXBlXG5cdH07XG59ICk7XG5cbi8vIENyZWF0ZSBtb3VzZWVudGVyL2xlYXZlIGV2ZW50cyB1c2luZyBtb3VzZW92ZXIvb3V0IGFuZCBldmVudC10aW1lIGNoZWNrc1xuLy8gc28gdGhhdCBldmVudCBkZWxlZ2F0aW9uIHdvcmtzIGluIGpRdWVyeS5cbi8vIERvIHRoZSBzYW1lIGZvciBwb2ludGVyZW50ZXIvcG9pbnRlcmxlYXZlIGFuZCBwb2ludGVyb3Zlci9wb2ludGVyb3V0XG4vL1xuLy8gU3VwcG9ydDogU2FmYXJpIDcgb25seVxuLy8gU2FmYXJpIHNlbmRzIG1vdXNlZW50ZXIgdG9vIG9mdGVuOyBzZWU6XG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NzAyNThcbi8vIGZvciB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIGJ1ZyAoaXQgZXhpc3RlZCBpbiBvbGRlciBDaHJvbWUgdmVyc2lvbnMgYXMgd2VsbCkuXG5qUXVlcnkuZWFjaCgge1xuXHRtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuXHRtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCIsXG5cdHBvaW50ZXJlbnRlcjogXCJwb2ludGVyb3ZlclwiLFxuXHRwb2ludGVybGVhdmU6IFwicG9pbnRlcm91dFwiXG59LCBmdW5jdGlvbiggb3JpZywgZml4ICkge1xuXHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgb3JpZyBdID0ge1xuXHRcdGRlbGVnYXRlVHlwZTogZml4LFxuXHRcdGJpbmRUeXBlOiBmaXgsXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciByZXQsXG5cdFx0XHRcdHRhcmdldCA9IHRoaXMsXG5cdFx0XHRcdHJlbGF0ZWQgPSBldmVudC5yZWxhdGVkVGFyZ2V0LFxuXHRcdFx0XHRoYW5kbGVPYmogPSBldmVudC5oYW5kbGVPYmo7XG5cblx0XHRcdC8vIEZvciBtb3VzZWVudGVyL2xlYXZlIGNhbGwgdGhlIGhhbmRsZXIgaWYgcmVsYXRlZCBpcyBvdXRzaWRlIHRoZSB0YXJnZXQuXG5cdFx0XHQvLyBOQjogTm8gcmVsYXRlZFRhcmdldCBpZiB0aGUgbW91c2UgbGVmdC9lbnRlcmVkIHRoZSBicm93c2VyIHdpbmRvd1xuXHRcdFx0aWYgKCAhcmVsYXRlZCB8fCAoIHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSApICkge1xuXHRcdFx0XHRldmVudC50eXBlID0gaGFuZGxlT2JqLm9yaWdUeXBlO1xuXHRcdFx0XHRyZXQgPSBoYW5kbGVPYmouaGFuZGxlci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBmaXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdG9uOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gb24oIHRoaXMsIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIDEgKTtcblx0fSxcblx0b2ZmOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBmbiApIHtcblx0XHR2YXIgaGFuZGxlT2JqLCB0eXBlO1xuXHRcdGlmICggdHlwZXMgJiYgdHlwZXMucHJldmVudERlZmF1bHQgJiYgdHlwZXMuaGFuZGxlT2JqICkge1xuXG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID9cblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUgKyBcIi5cIiArIGhhbmRsZU9iai5uYW1lc3BhY2UgOlxuXHRcdFx0XHRcdGhhbmRsZU9iai5vcmlnVHlwZSxcblx0XHRcdFx0aGFuZGxlT2JqLnNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlclxuXHRcdFx0KTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHR5cGVvZiB0eXBlcyA9PT0gXCJvYmplY3RcIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzIFssIGZuXSApXG5cdFx0XHRmbiA9IHNlbGVjdG9yO1xuXHRcdFx0c2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICggZm4gPT09IGZhbHNlICkge1xuXHRcdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cblxudmFyXG5cblx0LyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZXNsaW50L2VzbGludC9pc3N1ZXMvMzIyOVxuXHRyeGh0bWxUYWcgPSAvPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbYS16XVteXFwvXFwwPlxceDIwXFx0XFxyXFxuXFxmXSopW14+XSopXFwvPi9naSxcblxuXHQvKiBlc2xpbnQtZW5hYmxlICovXG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMCAtIDExLCBFZGdlIDEyIC0gMTMgb25seVxuXHQvLyBJbiBJRS9FZGdlIHVzaW5nIHJlZ2V4IGdyb3VwcyBoZXJlIGNhdXNlcyBzZXZlcmUgc2xvd2Rvd25zLlxuXHQvLyBTZWUgaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy8xNzM2NTEyL1xuXHRybm9Jbm5lcmh0bWwgPSAvPHNjcmlwdHw8c3R5bGV8PGxpbmsvaSxcblxuXHQvLyBjaGVja2VkPVwiY2hlY2tlZFwiIG9yIGNoZWNrZWRcblx0cmNoZWNrZWQgPSAvY2hlY2tlZFxccyooPzpbXj1dfD1cXHMqLmNoZWNrZWQuKS9pLFxuXHRyY2xlYW5TY3JpcHQgPSAvXlxccyo8ISg/OlxcW0NEQVRBXFxbfC0tKXwoPzpcXF1cXF18LS0pPlxccyokL2c7XG5cbi8vIFByZWZlciBhIHRib2R5IG92ZXIgaXRzIHBhcmVudCB0YWJsZSBmb3IgY29udGFpbmluZyBuZXcgcm93c1xuZnVuY3Rpb24gbWFuaXB1bGF0aW9uVGFyZ2V0KCBlbGVtLCBjb250ZW50ICkge1xuXHRpZiAoIG5vZGVOYW1lKCBlbGVtLCBcInRhYmxlXCIgKSAmJlxuXHRcdG5vZGVOYW1lKCBjb250ZW50Lm5vZGVUeXBlICE9PSAxMSA/IGNvbnRlbnQgOiBjb250ZW50LmZpcnN0Q2hpbGQsIFwidHJcIiApICkge1xuXG5cdFx0cmV0dXJuIGpRdWVyeSggZWxlbSApLmNoaWxkcmVuKCBcInRib2R5XCIgKVsgMCBdIHx8IGVsZW07XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKCBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSAhPT0gbnVsbCApICsgXCIvXCIgKyBlbGVtLnR5cGU7XG5cdHJldHVybiBlbGVtO1xufVxuZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcblx0aWYgKCAoIGVsZW0udHlwZSB8fCBcIlwiICkuc2xpY2UoIDAsIDUgKSA9PT0gXCJ0cnVlL1wiICkge1xuXHRcdGVsZW0udHlwZSA9IGVsZW0udHlwZS5zbGljZSggNSApO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBcInR5cGVcIiApO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBpLCBsLCB0eXBlLCBwZGF0YU9sZCwgcGRhdGFDdXIsIHVkYXRhT2xkLCB1ZGF0YUN1ciwgZXZlbnRzO1xuXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyAxLiBDb3B5IHByaXZhdGUgZGF0YTogZXZlbnRzLCBoYW5kbGVycywgZXRjLlxuXHRpZiAoIGRhdGFQcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YVByaXYuYWNjZXNzKCBzcmMgKTtcblx0XHRwZGF0YUN1ciA9IGRhdGFQcml2LnNldCggZGVzdCwgcGRhdGFPbGQgKTtcblx0XHRldmVudHMgPSBwZGF0YU9sZC5ldmVudHM7XG5cblx0XHRpZiAoIGV2ZW50cyApIHtcblx0XHRcdGRlbGV0ZSBwZGF0YUN1ci5oYW5kbGU7XG5cdFx0XHRwZGF0YUN1ci5ldmVudHMgPSB7fTtcblxuXHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIGRlc3QsIHR5cGUsIGV2ZW50c1sgdHlwZSBdWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIDIuIENvcHkgdXNlciBkYXRhXG5cdGlmICggZGF0YVVzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhVXNlci5hY2Nlc3MoIHNyYyApO1xuXHRcdHVkYXRhQ3VyID0galF1ZXJ5LmV4dGVuZCgge30sIHVkYXRhT2xkICk7XG5cblx0XHRkYXRhVXNlci5zZXQoIGRlc3QsIHVkYXRhQ3VyICk7XG5cdH1cbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gZG9tTWFuaXAoIGNvbGxlY3Rpb24sIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICkge1xuXG5cdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHR2YXIgZnJhZ21lbnQsIGZpcnN0LCBzY3JpcHRzLCBoYXNTY3JpcHRzLCBub2RlLCBkb2MsXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuXHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0dmFsdWUgPSBhcmdzWyAwIF0sXG5cdFx0dmFsdWVJc0Z1bmN0aW9uID0gaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0aWYgKCB2YWx1ZUlzRnVuY3Rpb24gfHxcblx0XHRcdCggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdHJldHVybiBjb2xsZWN0aW9uLmVhY2goIGZ1bmN0aW9uKCBpbmRleCApIHtcblx0XHRcdHZhciBzZWxmID0gY29sbGVjdGlvbi5lcSggaW5kZXggKTtcblx0XHRcdGlmICggdmFsdWVJc0Z1bmN0aW9uICkge1xuXHRcdFx0XHRhcmdzWyAwIF0gPSB2YWx1ZS5jYWxsKCB0aGlzLCBpbmRleCwgc2VsZi5odG1sKCkgKTtcblx0XHRcdH1cblx0XHRcdGRvbU1hbmlwKCBzZWxmLCBhcmdzLCBjYWxsYmFjaywgaWdub3JlZCApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGlmICggbCApIHtcblx0XHRmcmFnbWVudCA9IGJ1aWxkRnJhZ21lbnQoIGFyZ3MsIGNvbGxlY3Rpb25bIDAgXS5vd25lckRvY3VtZW50LCBmYWxzZSwgY29sbGVjdGlvbiwgaWdub3JlZCApO1xuXHRcdGZpcnN0ID0gZnJhZ21lbnQuZmlyc3RDaGlsZDtcblxuXHRcdGlmICggZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgKSB7XG5cdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdH1cblxuXHRcdC8vIFJlcXVpcmUgZWl0aGVyIG5ldyBjb250ZW50IG9yIGFuIGludGVyZXN0IGluIGlnbm9yZWQgZWxlbWVudHMgdG8gaW52b2tlIHRoZSBjYWxsYmFja1xuXHRcdGlmICggZmlyc3QgfHwgaWdub3JlZCApIHtcblx0XHRcdHNjcmlwdHMgPSBqUXVlcnkubWFwKCBnZXRBbGwoIGZyYWdtZW50LCBcInNjcmlwdFwiICksIGRpc2FibGVTY3JpcHQgKTtcblx0XHRcdGhhc1NjcmlwdHMgPSBzY3JpcHRzLmxlbmd0aDtcblxuXHRcdFx0Ly8gVXNlIHRoZSBvcmlnaW5hbCBmcmFnbWVudCBmb3IgdGhlIGxhc3QgaXRlbVxuXHRcdFx0Ly8gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG5cdFx0XHQvLyBiZWluZyBlbXB0aWVkIGluY29ycmVjdGx5IGluIGNlcnRhaW4gc2l0dWF0aW9ucyAoIzgwNzApLlxuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRub2RlID0gZnJhZ21lbnQ7XG5cblx0XHRcdFx0aWYgKCBpICE9PSBpTm9DbG9uZSApIHtcblx0XHRcdFx0XHRub2RlID0galF1ZXJ5LmNsb25lKCBub2RlLCB0cnVlLCB0cnVlICk7XG5cblx0XHRcdFx0XHQvLyBLZWVwIHJlZmVyZW5jZXMgdG8gY2xvbmVkIHNjcmlwdHMgZm9yIGxhdGVyIHJlc3RvcmF0aW9uXG5cdFx0XHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXG5cdFx0XHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0XHRcdGpRdWVyeS5tZXJnZSggc2NyaXB0cywgZ2V0QWxsKCBub2RlLCBcInNjcmlwdFwiICkgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYWxsYmFjay5jYWxsKCBjb2xsZWN0aW9uWyBpIF0sIG5vZGUsIGkgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBoYXNTY3JpcHRzICkge1xuXHRcdFx0XHRkb2MgPSBzY3JpcHRzWyBzY3JpcHRzLmxlbmd0aCAtIDEgXS5vd25lckRvY3VtZW50O1xuXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHNjcmlwdHNcblx0XHRcdFx0alF1ZXJ5Lm1hcCggc2NyaXB0cywgcmVzdG9yZVNjcmlwdCApO1xuXG5cdFx0XHRcdC8vIEV2YWx1YXRlIGV4ZWN1dGFibGUgc2NyaXB0cyBvbiBmaXJzdCBkb2N1bWVudCBpbnNlcnRpb25cblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBoYXNTY3JpcHRzOyBpKysgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IHNjcmlwdHNbIGkgXTtcblx0XHRcdFx0XHRpZiAoIHJzY3JpcHRUeXBlLnRlc3QoIG5vZGUudHlwZSB8fCBcIlwiICkgJiZcblx0XHRcdFx0XHRcdCFkYXRhUHJpdi5hY2Nlc3MoIG5vZGUsIFwiZ2xvYmFsRXZhbFwiICkgJiZcblx0XHRcdFx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jLCBub2RlICkgKSB7XG5cblx0XHRcdFx0XHRcdGlmICggbm9kZS5zcmMgJiYgKCBub2RlLnR5cGUgfHwgXCJcIiApLnRvTG93ZXJDYXNlKCkgICE9PSBcIm1vZHVsZVwiICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5Ll9ldmFsVXJsICYmICFub2RlLm5vTW9kdWxlICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMsIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5vbmNlOiBub2RlLm5vbmNlIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCBcIm5vbmNlXCIgKVxuXHRcdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0RE9NRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSwgbm9kZSwgZG9jICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHR2YXIgbm9kZSxcblx0XHRub2RlcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIGVsZW0gKSA6IGVsZW0sXG5cdFx0aSA9IDA7XG5cblx0Zm9yICggOyAoIG5vZGUgPSBub2Rlc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIG5vZGUgKSApO1xuXHRcdH1cblxuXHRcdGlmICggbm9kZS5wYXJlbnROb2RlICkge1xuXHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBpc0F0dGFjaGVkKCBub2RlICkgKSB7XG5cdFx0XHRcdHNldEdsb2JhbEV2YWwoIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHR9XG5cdFx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIG5vZGUgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHRodG1sUHJlZmlsdGVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRyZXR1cm4gaHRtbC5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGVsZW0sIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdHZhciBpLCBsLCBzcmNFbGVtZW50cywgZGVzdEVsZW1lbnRzLFxuXHRcdFx0Y2xvbmUgPSBlbGVtLmNsb25lTm9kZSggdHJ1ZSApLFxuXHRcdFx0aW5QYWdlID0gaXNBdHRhY2hlZCggZWxlbSApO1xuXG5cdFx0Ly8gRml4IElFIGNsb25pbmcgaXNzdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCAmJiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgfHwgZWxlbS5ub2RlVHlwZSA9PT0gMTEgKSAmJlxuXHRcdFx0XHQhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIFdlIGVzY2hldyBTaXp6bGUgaGVyZSBmb3IgcGVyZm9ybWFuY2UgcmVhc29uczogaHR0cHM6Ly9qc3BlcmYuY29tL2dldGFsbC12cy1zaXp6bGUvMlxuXHRcdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuXHRcdFx0c3JjRWxlbWVudHMgPSBnZXRBbGwoIGVsZW0gKTtcblxuXHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZpeElucHV0KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENvcHkgdGhlIGV2ZW50cyBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgY2xvbmVcblx0XHRpZiAoIGRhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRpZiAoIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0XHRzcmNFbGVtZW50cyA9IHNyY0VsZW1lbnRzIHx8IGdldEFsbCggZWxlbSApO1xuXHRcdFx0XHRkZXN0RWxlbWVudHMgPSBkZXN0RWxlbWVudHMgfHwgZ2V0QWxsKCBjbG9uZSApO1xuXG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gc3JjRWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGNsb25lQ29weUV2ZW50KCBzcmNFbGVtZW50c1sgaSBdLCBkZXN0RWxlbWVudHNbIGkgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbG9uZUNvcHlFdmVudCggZWxlbSwgY2xvbmUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmVzZXJ2ZSBzY3JpcHQgZXZhbHVhdGlvbiBoaXN0b3J5XG5cdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSwgXCJzY3JpcHRcIiApO1xuXHRcdGlmICggZGVzdEVsZW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRzZXRHbG9iYWxFdmFsKCBkZXN0RWxlbWVudHMsICFpblBhZ2UgJiYgZ2V0QWxsKCBlbGVtLCBcInNjcmlwdFwiICkgKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gdGhlIGNsb25lZCBzZXRcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMgKSB7XG5cdFx0dmFyIGRhdGEsIGVsZW0sIHR5cGUsXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWwsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgKCBlbGVtID0gZWxlbXNbIGkgXSApICE9PSB1bmRlZmluZWQ7IGkrKyApIHtcblx0XHRcdGlmICggYWNjZXB0RGF0YSggZWxlbSApICkge1xuXHRcdFx0XHRpZiAoICggZGF0YSA9IGVsZW1bIGRhdGFQcml2LmV4cGFuZG8gXSApICkge1xuXHRcdFx0XHRcdGlmICggZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCB0eXBlIGluIGRhdGEuZXZlbnRzICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNwZWNpYWxbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIHNob3J0Y3V0IHRvIGF2b2lkIGpRdWVyeS5ldmVudC5yZW1vdmUncyBvdmVyaGVhZFxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZGF0YS5oYW5kbGUgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IENocm9tZSA8PTM1IC0gNDUrXG5cdFx0XHRcdFx0Ly8gQXNzaWduIHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHVzaW5nIGRlbGV0ZSwgc2VlIERhdGEjcmVtb3ZlXG5cdFx0XHRcdFx0ZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggZWxlbVsgZGF0YVVzZXIuZXhwYW5kbyBdICkge1xuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRkZXRhY2g6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gcmVtb3ZlKCB0aGlzLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yICk7XG5cdH0sXG5cblx0dGV4dDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0alF1ZXJ5LnRleHQoIHRoaXMgKSA6XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdGFwcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdHByZXBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gbWFuaXB1bGF0aW9uVGFyZ2V0KCB0aGlzLCBlbGVtICk7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoIGVsZW0sIHRhcmdldC5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGJlZm9yZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YWZ0ZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICkge1xuXHRcdFx0XHR0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKCBlbGVtLCB0aGlzLm5leHRTaWJsaW5nICk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9LFxuXG5cdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWxlbSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSB0aGlzWyBpIF0gKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cblx0XHRcdFx0Ly8gUHJldmVudCBtZW1vcnkgbGVha3Ncblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCBlbGVtLCBmYWxzZSApICk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGFueSByZW1haW5pbmcgbm9kZXNcblx0XHRcdFx0ZWxlbS50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRkYXRhQW5kRXZlbnRzID0gZGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZmFsc2UgOiBkYXRhQW5kRXZlbnRzO1xuXHRcdGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcblxuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LmNsb25lKCB0aGlzLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApO1xuXHRcdH0gKTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF0gfHwge30sXG5cdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQhd3JhcE1hcFsgKCBydGFnTmFtZS5leGVjKCB2YWx1ZSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkuaHRtbFByZWZpbHRlciggdmFsdWUgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdGVsZW0gPSB0aGlzWyBpIF0gfHwge307XG5cblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBlbGVtZW50IG5vZGVzIGFuZCBwcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblx0XHRcdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtID0gMDtcblxuXHRcdFx0XHQvLyBJZiB1c2luZyBpbm5lckhUTUwgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgdXNlIHRoZSBmYWxsYmFjayBtZXRob2Rcblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMuZW1wdHkoKS5hcHBlbmQoIHZhbHVlICk7XG5cdFx0XHR9XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHRyZXBsYWNlV2l0aDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGlnbm9yZWQgPSBbXTtcblxuXHRcdC8vIE1ha2UgdGhlIGNoYW5nZXMsIHJlcGxhY2luZyBlYWNoIG5vbi1pZ25vcmVkIGNvbnRleHQgZWxlbWVudCB3aXRoIHRoZSBuZXcgY29udGVudFxuXHRcdHJldHVybiBkb21NYW5pcCggdGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmICggalF1ZXJ5LmluQXJyYXkoIHRoaXMsIGlnbm9yZWQgKSA8IDAgKSB7XG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggdGhpcyApICk7XG5cdFx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQoIGVsZW0sIHRoaXMgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gRm9yY2UgY2FsbGJhY2sgaW52b2NhdGlvblxuXHRcdH0sIGlnbm9yZWQgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZWFjaCgge1xuXHRhcHBlbmRUbzogXCJhcHBlbmRcIixcblx0cHJlcGVuZFRvOiBcInByZXBlbmRcIixcblx0aW5zZXJ0QmVmb3JlOiBcImJlZm9yZVwiLFxuXHRpbnNlcnRBZnRlcjogXCJhZnRlclwiLFxuXHRyZXBsYWNlQWxsOiBcInJlcGxhY2VXaXRoXCJcbn0sIGZ1bmN0aW9uKCBuYW1lLCBvcmlnaW5hbCApIHtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0dmFyIGVsZW1zLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG5cdFx0XHRsYXN0ID0gaW5zZXJ0Lmxlbmd0aCAtIDEsXG5cdFx0XHRpID0gMDtcblxuXHRcdGZvciAoIDsgaSA8PSBsYXN0OyBpKysgKSB7XG5cdFx0XHRlbGVtcyA9IGkgPT09IGxhc3QgPyB0aGlzIDogdGhpcy5jbG9uZSggdHJ1ZSApO1xuXHRcdFx0alF1ZXJ5KCBpbnNlcnRbIGkgXSApWyBvcmlnaW5hbCBdKCBlbGVtcyApO1xuXG5cdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdC8vIC5nZXQoKSBiZWNhdXNlIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdHB1c2guYXBwbHkoIHJldCwgZWxlbXMuZ2V0KCkgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHJldCApO1xuXHR9O1xufSApO1xudmFyIHJudW1ub25weCA9IG5ldyBSZWdFeHAoIFwiXihcIiArIHBudW0gKyBcIikoPyFweClbYS16JV0rJFwiLCBcImlcIiApO1xuXG52YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHksIEZpcmVmb3ggPD0zMCAoIzE1MDk4LCAjMTQxNTApXG5cdFx0Ly8gSUUgdGhyb3dzIG9uIGVsZW1lbnRzIGNyZWF0ZWQgaW4gcG9wdXBzXG5cdFx0Ly8gRkYgbWVhbndoaWxlIHRocm93cyBvbiBmcmFtZSBlbGVtZW50cyB0aHJvdWdoIFwiZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZVwiXG5cdFx0dmFyIHZpZXcgPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5cblx0XHRpZiAoICF2aWV3IHx8ICF2aWV3Lm9wZW5lciApIHtcblx0XHRcdHZpZXcgPSB3aW5kb3c7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuXHR9O1xuXG52YXIgcmJveFN0eWxlID0gbmV3IFJlZ0V4cCggY3NzRXhwYW5kLmpvaW4oIFwifFwiICksIFwiaVwiICk7XG5cblxuXG4oIGZ1bmN0aW9uKCkge1xuXG5cdC8vIEV4ZWN1dGluZyBib3RoIHBpeGVsUG9zaXRpb24gJiBib3hTaXppbmdSZWxpYWJsZSB0ZXN0cyByZXF1aXJlIG9ubHkgb25lIGxheW91dFxuXHQvLyBzbyB0aGV5J3JlIGV4ZWN1dGVkIGF0IHRoZSBzYW1lIHRpbWUgdG8gc2F2ZSB0aGUgc2Vjb25kIGNvbXB1dGF0aW9uLlxuXHRmdW5jdGlvbiBjb21wdXRlU3R5bGVUZXN0cygpIHtcblxuXHRcdC8vIFRoaXMgaXMgYSBzaW5nbGV0b24sIHdlIG5lZWQgdG8gZXhlY3V0ZSBpdCBvbmx5IG9uY2Vcblx0XHRpZiAoICFkaXYgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTExMTExcHg7d2lkdGg6NjBweDtcIiArXG5cdFx0XHRcIm1hcmdpbi10b3A6MXB4O3BhZGRpbmc6MDtib3JkZXI6MFwiO1xuXHRcdGRpdi5zdHlsZS5jc3NUZXh0ID1cblx0XHRcdFwicG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3g7b3ZlcmZsb3c6c2Nyb2xsO1wiICtcblx0XHRcdFwibWFyZ2luOmF1dG87Ym9yZGVyOjFweDtwYWRkaW5nOjFweDtcIiArXG5cdFx0XHRcIndpZHRoOjYwJTt0b3A6MSVcIjtcblx0XHRkb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoIGNvbnRhaW5lciApLmFwcGVuZENoaWxkKCBkaXYgKTtcblxuXHRcdHZhciBkaXZTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYgKTtcblx0XHRwaXhlbFBvc2l0aW9uVmFsID0gZGl2U3R5bGUudG9wICE9PSBcIjElXCI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5LCBGaXJlZm94IDw9MyAtIDQ0XG5cdFx0cmVsaWFibGVNYXJnaW5MZWZ0VmFsID0gcm91bmRQaXhlbE1lYXN1cmVzKCBkaXZTdHlsZS5tYXJnaW5MZWZ0ICkgPT09IDEyO1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seSwgU2FmYXJpIDw9OS4xIC0gMTAuMSwgaU9TIDw9Ny4wIC0gOS4zXG5cdFx0Ly8gU29tZSBzdHlsZXMgY29tZSBiYWNrIHdpdGggcGVyY2VudGFnZSB2YWx1ZXMsIGV2ZW4gdGhvdWdoIHRoZXkgc2hvdWxkbid0XG5cdFx0ZGl2LnN0eWxlLnJpZ2h0ID0gXCI2MCVcIjtcblx0XHRwaXhlbEJveFN0eWxlc1ZhbCA9IHJvdW5kUGl4ZWxNZWFzdXJlcyggZGl2U3R5bGUucmlnaHQgKSA9PT0gMzY7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA5IC0gMTEgb25seVxuXHRcdC8vIERldGVjdCBtaXNyZXBvcnRpbmcgb2YgY29udGVudCBkaW1lbnNpb25zIGZvciBib3gtc2l6aW5nOmJvcmRlci1ib3ggZWxlbWVudHNcblx0XHRib3hTaXppbmdSZWxpYWJsZVZhbCA9IHJvdW5kUGl4ZWxNZWFzdXJlcyggZGl2U3R5bGUud2lkdGggKSA9PT0gMzY7XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA5IG9ubHlcblx0XHQvLyBEZXRlY3Qgb3ZlcmZsb3c6c2Nyb2xsIHNjcmV3aW5lc3MgKGdoLTM2OTkpXG5cdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9NjRcblx0XHQvLyBEb24ndCBnZXQgdHJpY2tlZCB3aGVuIHpvb20gYWZmZWN0cyBvZmZzZXRXaWR0aCAoZ2gtNDAyOSlcblx0XHRkaXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdFx0c2Nyb2xsYm94U2l6ZVZhbCA9IHJvdW5kUGl4ZWxNZWFzdXJlcyggZGl2Lm9mZnNldFdpZHRoIC8gMyApID09PSAxMjtcblxuXHRcdGRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHQvLyBOdWxsaWZ5IHRoZSBkaXYgc28gaXQgd291bGRuJ3QgYmUgc3RvcmVkIGluIHRoZSBtZW1vcnkgYW5kXG5cdFx0Ly8gaXQgd2lsbCBhbHNvIGJlIGEgc2lnbiB0aGF0IGNoZWNrcyBhbHJlYWR5IHBlcmZvcm1lZFxuXHRcdGRpdiA9IG51bGw7XG5cdH1cblxuXHRmdW5jdGlvbiByb3VuZFBpeGVsTWVhc3VyZXMoIG1lYXN1cmUgKSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoIHBhcnNlRmxvYXQoIG1lYXN1cmUgKSApO1xuXHR9XG5cblx0dmFyIHBpeGVsUG9zaXRpb25WYWwsIGJveFNpemluZ1JlbGlhYmxlVmFsLCBzY3JvbGxib3hTaXplVmFsLCBwaXhlbEJveFN0eWxlc1ZhbCxcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwsXG5cdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuXHRcdGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuXHQvLyBGaW5pc2ggZWFybHkgaW4gbGltaXRlZCAobm9uLWJyb3dzZXIpIGVudmlyb25tZW50c1xuXHRpZiAoICFkaXYuc3R5bGUgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBTdHlsZSBvZiBjbG9uZWQgZWxlbWVudCBhZmZlY3RzIHNvdXJjZSBlbGVtZW50IGNsb25lZCAoIzg5MDgpXG5cdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIjtcblx0ZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcblx0c3VwcG9ydC5jbGVhckNsb25lU3R5bGUgPSBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPT09IFwiY29udGVudC1ib3hcIjtcblxuXHRqUXVlcnkuZXh0ZW5kKCBzdXBwb3J0LCB7XG5cdFx0Ym94U2l6aW5nUmVsaWFibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBib3hTaXppbmdSZWxpYWJsZVZhbDtcblx0XHR9LFxuXHRcdHBpeGVsQm94U3R5bGVzOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxCb3hTdHlsZXNWYWw7XG5cdFx0fSxcblx0XHRwaXhlbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxQb3NpdGlvblZhbDtcblx0XHR9LFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHJlbGlhYmxlTWFyZ2luTGVmdFZhbDtcblx0XHR9LFxuXHRcdHNjcm9sbGJveFNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcHV0ZVN0eWxlVGVzdHMoKTtcblx0XHRcdHJldHVybiBzY3JvbGxib3hTaXplVmFsO1xuXHRcdH1cblx0fSApO1xufSApKCk7XG5cblxuZnVuY3Rpb24gY3VyQ1NTKCBlbGVtLCBuYW1lLCBjb21wdXRlZCApIHtcblx0dmFyIHdpZHRoLCBtaW5XaWR0aCwgbWF4V2lkdGgsIHJldCxcblxuXHRcdC8vIFN1cHBvcnQ6IEZpcmVmb3ggNTErXG5cdFx0Ly8gUmV0cmlldmluZyBzdHlsZSBiZWZvcmUgY29tcHV0ZWQgc29tZWhvd1xuXHRcdC8vIGZpeGVzIGFuIGlzc3VlIHdpdGggZ2V0dGluZyB3cm9uZyB2YWx1ZXNcblx0XHQvLyBvbiBkZXRhY2hlZCBlbGVtZW50c1xuXHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRjb21wdXRlZCA9IGNvbXB1dGVkIHx8IGdldFN0eWxlcyggZWxlbSApO1xuXG5cdC8vIGdldFByb3BlcnR5VmFsdWUgaXMgbmVlZGVkIGZvcjpcblx0Ly8gICAuY3NzKCdmaWx0ZXInKSAoSUUgOSBvbmx5LCAjMTI1MzcpXG5cdC8vICAgLmNzcygnLS1jdXN0b21Qcm9wZXJ0eSkgKCMzMTQ0KVxuXHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdHJldCA9IGNvbXB1dGVkLmdldFByb3BlcnR5VmFsdWUoIG5hbWUgKSB8fCBjb21wdXRlZFsgbmFtZSBdO1xuXG5cdFx0aWYgKCByZXQgPT09IFwiXCIgJiYgIWlzQXR0YWNoZWQoIGVsZW0gKSApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHQvLyBBbmRyb2lkIEJyb3dzZXIgcmV0dXJucyBwZXJjZW50YWdlIGZvciBzb21lIHZhbHVlcyxcblx0XHQvLyBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzLlxuXHRcdC8vIFRoaXMgaXMgYWdhaW5zdCB0aGUgQ1NTT00gZHJhZnQgc3BlYzpcblx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3Nzb20vI3Jlc29sdmVkLXZhbHVlc1xuXHRcdGlmICggIXN1cHBvcnQucGl4ZWxCb3hTdHlsZXMoKSAmJiBybnVtbm9ucHgudGVzdCggcmV0ICkgJiYgcmJveFN0eWxlLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0d2lkdGggPSBzdHlsZS53aWR0aDtcblx0XHRcdG1pbldpZHRoID0gc3R5bGUubWluV2lkdGg7XG5cdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRzdHlsZS5taW5XaWR0aCA9IHN0eWxlLm1heFdpZHRoID0gc3R5bGUud2lkdGggPSByZXQ7XG5cdFx0XHRyZXQgPSBjb21wdXRlZC53aWR0aDtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gbWluV2lkdGg7XG5cdFx0XHRzdHlsZS5tYXhXaWR0aCA9IG1heFdpZHRoO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXQgIT09IHVuZGVmaW5lZCA/XG5cblx0XHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdFx0Ly8gSUUgcmV0dXJucyB6SW5kZXggdmFsdWUgYXMgYW4gaW50ZWdlci5cblx0XHRyZXQgKyBcIlwiIDpcblx0XHRyZXQ7XG59XG5cblxuZnVuY3Rpb24gYWRkR2V0SG9va0lmKCBjb25kaXRpb25GbiwgaG9va0ZuICkge1xuXG5cdC8vIERlZmluZSB0aGUgaG9vaywgd2UnbGwgY2hlY2sgb24gdGhlIGZpcnN0IHJ1biBpZiBpdCdzIHJlYWxseSBuZWVkZWQuXG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZGl0aW9uRm4oKSApIHtcblxuXHRcdFx0XHQvLyBIb29rIG5vdCBuZWVkZWQgKG9yIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBpdCBkdWVcblx0XHRcdFx0Ly8gdG8gbWlzc2luZyBkZXBlbmRlbmN5KSwgcmVtb3ZlIGl0LlxuXHRcdFx0XHRkZWxldGUgdGhpcy5nZXQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSG9vayBuZWVkZWQ7IHJlZGVmaW5lIGl0IHNvIHRoYXQgdGhlIHN1cHBvcnQgdGVzdCBpcyBub3QgZXhlY3V0ZWQgYWdhaW4uXG5cdFx0XHRyZXR1cm4gKCB0aGlzLmdldCA9IGhvb2tGbiApLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9XG5cdH07XG59XG5cblxudmFyIGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk1velwiLCBcIm1zXCIgXSxcblx0ZW1wdHlTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKS5zdHlsZSxcblx0dmVuZG9yUHJvcHMgPSB7fTtcblxuLy8gUmV0dXJuIGEgdmVuZG9yLXByZWZpeGVkIHByb3BlcnR5IG9yIHVuZGVmaW5lZFxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB7XG5cblx0Ly8gQ2hlY2sgZm9yIHZlbmRvciBwcmVmaXhlZCBuYW1lc1xuXHR2YXIgY2FwTmFtZSA9IG5hbWVbIDAgXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSggMSApLFxuXHRcdGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0bmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xuXHRcdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9XG59XG5cbi8vIFJldHVybiBhIHBvdGVudGlhbGx5LW1hcHBlZCBqUXVlcnkuY3NzUHJvcHMgb3IgdmVuZG9yIHByZWZpeGVkIHByb3BlcnR5XG5mdW5jdGlvbiBmaW5hbFByb3BOYW1lKCBuYW1lICkge1xuXHR2YXIgZmluYWwgPSBqUXVlcnkuY3NzUHJvcHNbIG5hbWUgXSB8fCB2ZW5kb3JQcm9wc1sgbmFtZSBdO1xuXG5cdGlmICggZmluYWwgKSB7XG5cdFx0cmV0dXJuIGZpbmFsO1xuXHR9XG5cdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cdHJldHVybiB2ZW5kb3JQcm9wc1sgbmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIG5hbWUgKSB8fCBuYW1lO1xufVxuXG5cbnZhclxuXG5cdC8vIFN3YXBwYWJsZSBpZiBkaXNwbGF5IGlzIG5vbmUgb3Igc3RhcnRzIHdpdGggdGFibGVcblx0Ly8gZXhjZXB0IFwidGFibGVcIiwgXCJ0YWJsZS1jZWxsXCIsIG9yIFwidGFibGUtY2FwdGlvblwiXG5cdC8vIFNlZSBoZXJlIGZvciBkaXNwbGF5IHZhbHVlczogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9DU1MvZGlzcGxheVxuXHRyZGlzcGxheXN3YXAgPSAvXihub25lfHRhYmxlKD8hLWNbZWFdKS4rKS8sXG5cdHJjdXN0b21Qcm9wID0gL14tLS8sXG5cdGNzc1Nob3cgPSB7IHBvc2l0aW9uOiBcImFic29sdXRlXCIsIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsIGRpc3BsYXk6IFwiYmxvY2tcIiB9LFxuXHRjc3NOb3JtYWxUcmFuc2Zvcm0gPSB7XG5cdFx0bGV0dGVyU3BhY2luZzogXCIwXCIsXG5cdFx0Zm9udFdlaWdodDogXCI0MDBcIlxuXHR9O1xuXG5mdW5jdGlvbiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICkge1xuXG5cdC8vIEFueSByZWxhdGl2ZSAoKy8tKSB2YWx1ZXMgaGF2ZSBhbHJlYWR5IGJlZW5cblx0Ly8gbm9ybWFsaXplZCBhdCB0aGlzIHBvaW50XG5cdHZhciBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApO1xuXHRyZXR1cm4gbWF0Y2hlcyA/XG5cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAyIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBib3hNb2RlbEFkanVzdG1lbnQoIGVsZW0sIGRpbWVuc2lvbiwgYm94LCBpc0JvcmRlckJveCwgc3R5bGVzLCBjb21wdXRlZFZhbCApIHtcblx0dmFyIGkgPSBkaW1lbnNpb24gPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXHRcdGV4dHJhID0gMCxcblx0XHRkZWx0YSA9IDA7XG5cblx0Ly8gQWRqdXN0bWVudCBtYXkgbm90IGJlIG5lY2Vzc2FyeVxuXHRpZiAoIGJveCA9PT0gKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApICkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgNDsgaSArPSAyICkge1xuXG5cdFx0Ly8gQm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luXG5cdFx0aWYgKCBib3ggPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRkZWx0YSArPSBqUXVlcnkuY3NzKCBlbGVtLCBib3ggKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2UgZ2V0IGhlcmUgd2l0aCBhIGNvbnRlbnQtYm94LCB3ZSdyZSBzZWVraW5nIFwicGFkZGluZ1wiIG9yIFwiYm9yZGVyXCIgb3IgXCJtYXJnaW5cIlxuXHRcdGlmICggIWlzQm9yZGVyQm94ICkge1xuXG5cdFx0XHQvLyBBZGQgcGFkZGluZ1xuXHRcdFx0ZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cblx0XHRcdC8vIEZvciBcImJvcmRlclwiIG9yIFwibWFyZ2luXCIsIGFkZCBib3JkZXJcblx0XHRcdGlmICggYm94ICE9PSBcInBhZGRpbmdcIiApIHtcblx0XHRcdFx0ZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblxuXHRcdFx0Ly8gQnV0IHN0aWxsIGtlZXAgdHJhY2sgb2YgaXQgb3RoZXJ3aXNlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRleHRyYSArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSWYgd2UgZ2V0IGhlcmUgd2l0aCBhIGJvcmRlci1ib3ggKGNvbnRlbnQgKyBwYWRkaW5nICsgYm9yZGVyKSwgd2UncmUgc2Vla2luZyBcImNvbnRlbnRcIiBvclxuXHRcdC8vIFwicGFkZGluZ1wiIG9yIFwibWFyZ2luXCJcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBGb3IgXCJjb250ZW50XCIsIHN1YnRyYWN0IHBhZGRpbmdcblx0XHRcdGlmICggYm94ID09PSBcImNvbnRlbnRcIiApIHtcblx0XHRcdFx0ZGVsdGEgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBcImNvbnRlbnRcIiBvciBcInBhZGRpbmdcIiwgc3VidHJhY3QgYm9yZGVyXG5cdFx0XHRpZiAoIGJveCAhPT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdFx0ZGVsdGEgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBY2NvdW50IGZvciBwb3NpdGl2ZSBjb250ZW50LWJveCBzY3JvbGwgZ3V0dGVyIHdoZW4gcmVxdWVzdGVkIGJ5IHByb3ZpZGluZyBjb21wdXRlZFZhbFxuXHRpZiAoICFpc0JvcmRlckJveCAmJiBjb21wdXRlZFZhbCA+PSAwICkge1xuXG5cdFx0Ly8gb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IGlzIGEgcm91bmRlZCBzdW0gb2YgY29udGVudCwgcGFkZGluZywgc2Nyb2xsIGd1dHRlciwgYW5kIGJvcmRlclxuXHRcdC8vIEFzc3VtaW5nIGludGVnZXIgc2Nyb2xsIGd1dHRlciwgc3VidHJhY3QgdGhlIHJlc3QgYW5kIHJvdW5kIGRvd25cblx0XHRkZWx0YSArPSBNYXRoLm1heCggMCwgTWF0aC5jZWlsKFxuXHRcdFx0ZWxlbVsgXCJvZmZzZXRcIiArIGRpbWVuc2lvblsgMCBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoIDEgKSBdIC1cblx0XHRcdGNvbXB1dGVkVmFsIC1cblx0XHRcdGRlbHRhIC1cblx0XHRcdGV4dHJhIC1cblx0XHRcdDAuNVxuXG5cdFx0Ly8gSWYgb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IGlzIHVua25vd24sIHRoZW4gd2UgY2FuJ3QgZGV0ZXJtaW5lIGNvbnRlbnQtYm94IHNjcm9sbCBndXR0ZXJcblx0XHQvLyBVc2UgYW4gZXhwbGljaXQgemVybyB0byBhdm9pZCBOYU4gKGdoLTM5NjQpXG5cdFx0KSApIHx8IDA7XG5cdH1cblxuXHRyZXR1cm4gZGVsdGE7XG59XG5cbmZ1bmN0aW9uIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIGRpbWVuc2lvbiwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBjb21wdXRlZCBzdHlsZVxuXHR2YXIgc3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cblx0XHQvLyBUbyBhdm9pZCBmb3JjaW5nIGEgcmVmbG93LCBvbmx5IGZldGNoIGJveFNpemluZyBpZiB3ZSBuZWVkIGl0IChnaC00MzIyKS5cblx0XHQvLyBGYWtlIGNvbnRlbnQtYm94IHVudGlsIHdlIGtub3cgaXQncyBuZWVkZWQgdG8ga25vdyB0aGUgdHJ1ZSB2YWx1ZS5cblx0XHRib3hTaXppbmdOZWVkZWQgPSAhc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IGV4dHJhLFxuXHRcdGlzQm9yZGVyQm94ID0gYm94U2l6aW5nTmVlZGVkICYmXG5cdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxuXHRcdHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveCxcblxuXHRcdHZhbCA9IGN1ckNTUyggZWxlbSwgZGltZW5zaW9uLCBzdHlsZXMgKSxcblx0XHRvZmZzZXRQcm9wID0gXCJvZmZzZXRcIiArIGRpbWVuc2lvblsgMCBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoIDEgKTtcblxuXHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9NTRcblx0Ly8gUmV0dXJuIGEgY29uZm91bmRpbmcgbm9uLXBpeGVsIHZhbHVlIG9yIGZlaWduIGlnbm9yYW5jZSwgYXMgYXBwcm9wcmlhdGUuXG5cdGlmICggcm51bW5vbnB4LnRlc3QoIHZhbCApICkge1xuXHRcdGlmICggIWV4dHJhICkge1xuXHRcdFx0cmV0dXJuIHZhbDtcblx0XHR9XG5cdFx0dmFsID0gXCJhdXRvXCI7XG5cdH1cblxuXG5cdC8vIEZhbGwgYmFjayB0byBvZmZzZXRXaWR0aC9vZmZzZXRIZWlnaHQgd2hlbiB2YWx1ZSBpcyBcImF1dG9cIlxuXHQvLyBUaGlzIGhhcHBlbnMgZm9yIGlubGluZSBlbGVtZW50cyB3aXRoIG5vIGV4cGxpY2l0IHNldHRpbmcgKGdoLTM1NzEpXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjEgLSA0LjMgb25seVxuXHQvLyBBbHNvIHVzZSBvZmZzZXRXaWR0aC9vZmZzZXRIZWlnaHQgZm9yIG1pc3JlcG9ydGVkIGlubGluZSBkaW1lbnNpb25zIChnaC0zNjAyKVxuXHQvLyBTdXBwb3J0OiBJRSA5LTExIG9ubHlcblx0Ly8gQWxzbyB1c2Ugb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IGZvciB3aGVuIGJveCBzaXppbmcgaXMgdW5yZWxpYWJsZVxuXHQvLyBXZSB1c2UgZ2V0Q2xpZW50UmVjdHMoKSB0byBjaGVjayBmb3IgaGlkZGVuL2Rpc2Nvbm5lY3RlZC5cblx0Ly8gSW4gdGhvc2UgY2FzZXMsIHRoZSBjb21wdXRlZCB2YWx1ZSBjYW4gYmUgdHJ1c3RlZCB0byBiZSBib3JkZXItYm94XG5cdGlmICggKCAhc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpICYmIGlzQm9yZGVyQm94IHx8XG5cdFx0dmFsID09PSBcImF1dG9cIiB8fFxuXHRcdCFwYXJzZUZsb2F0KCB2YWwgKSAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImlubGluZVwiICkgJiZcblx0XHRlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoICkge1xuXG5cdFx0aXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiO1xuXG5cdFx0Ly8gV2hlcmUgYXZhaWxhYmxlLCBvZmZzZXRXaWR0aC9vZmZzZXRIZWlnaHQgYXBwcm94aW1hdGUgYm9yZGVyIGJveCBkaW1lbnNpb25zLlxuXHRcdC8vIFdoZXJlIG5vdCBhdmFpbGFibGUgKGUuZy4sIFNWRyksIGFzc3VtZSB1bnJlbGlhYmxlIGJveC1zaXppbmcgYW5kIGludGVycHJldCB0aGVcblx0XHQvLyByZXRyaWV2ZWQgdmFsdWUgYXMgYSBjb250ZW50IGJveCBkaW1lbnNpb24uXG5cdFx0dmFsdWVJc0JvcmRlckJveCA9IG9mZnNldFByb3AgaW4gZWxlbTtcblx0XHRpZiAoIHZhbHVlSXNCb3JkZXJCb3ggKSB7XG5cdFx0XHR2YWwgPSBlbGVtWyBvZmZzZXRQcm9wIF07XG5cdFx0fVxuXHR9XG5cblx0Ly8gTm9ybWFsaXplIFwiXCIgYW5kIGF1dG9cblx0dmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcblxuXHQvLyBBZGp1c3QgZm9yIHRoZSBlbGVtZW50J3MgYm94IG1vZGVsXG5cdHJldHVybiAoIHZhbCArXG5cdFx0Ym94TW9kZWxBZGp1c3RtZW50KFxuXHRcdFx0ZWxlbSxcblx0XHRcdGRpbWVuc2lvbixcblx0XHRcdGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcblx0XHRcdHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0XHRzdHlsZXMsXG5cblx0XHRcdC8vIFByb3ZpZGUgdGhlIGN1cnJlbnQgY29tcHV0ZWQgc2l6ZSB0byByZXF1ZXN0IHNjcm9sbCBndXR0ZXIgY2FsY3VsYXRpb24gKGdoLTM1ODkpXG5cdFx0XHR2YWxcblx0XHQpXG5cdCkgKyBcInB4XCI7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcblx0Ly8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG5cdGNzc0hvb2tzOiB7XG5cdFx0b3BhY2l0eToge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG5cdGNzc051bWJlcjoge1xuXHRcdFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSxcblx0XHRcImNvbHVtbkNvdW50XCI6IHRydWUsXG5cdFx0XCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwiZmxleEdyb3dcIjogdHJ1ZSxcblx0XHRcImZsZXhTaHJpbmtcIjogdHJ1ZSxcblx0XHRcImZvbnRXZWlnaHRcIjogdHJ1ZSxcblx0XHRcImdyaWRBcmVhXCI6IHRydWUsXG5cdFx0XCJncmlkQ29sdW1uXCI6IHRydWUsXG5cdFx0XCJncmlkQ29sdW1uRW5kXCI6IHRydWUsXG5cdFx0XCJncmlkQ29sdW1uU3RhcnRcIjogdHJ1ZSxcblx0XHRcImdyaWRSb3dcIjogdHJ1ZSxcblx0XHRcImdyaWRSb3dFbmRcIjogdHJ1ZSxcblx0XHRcImdyaWRSb3dTdGFydFwiOiB0cnVlLFxuXHRcdFwibGluZUhlaWdodFwiOiB0cnVlLFxuXHRcdFwib3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwib3JkZXJcIjogdHJ1ZSxcblx0XHRcIm9ycGhhbnNcIjogdHJ1ZSxcblx0XHRcIndpZG93c1wiOiB0cnVlLFxuXHRcdFwiekluZGV4XCI6IHRydWUsXG5cdFx0XCJ6b29tXCI6IHRydWVcblx0fSxcblxuXHQvLyBBZGQgaW4gcHJvcGVydGllcyB3aG9zZSBuYW1lcyB5b3Ugd2lzaCB0byBmaXggYmVmb3JlXG5cdC8vIHNldHRpbmcgb3IgZ2V0dGluZyB0aGUgdmFsdWVcblx0Y3NzUHJvcHM6IHt9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2V0IHN0eWxlcyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCAhZWxlbSB8fCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lXG5cdFx0dmFyIHJldCwgdHlwZSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0aXNDdXN0b21Qcm9wID0gcmN1c3RvbVByb3AudGVzdCggbmFtZSApLFxuXHRcdFx0c3R5bGUgPSBlbGVtLnN0eWxlO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lLiBXZSBkb24ndFxuXHRcdC8vIHdhbnQgdG8gcXVlcnkgdGhlIHZhbHVlIGlmIGl0IGlzIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuXHRcdC8vIHNpbmNlIHRoZXkgYXJlIHVzZXItZGVmaW5lZC5cblx0XHRpZiAoICFpc0N1c3RvbVByb3AgKSB7XG5cdFx0XHRuYW1lID0gZmluYWxQcm9wTmFtZSggb3JpZ05hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBHZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uLCB0aGVuIHVucHJlZml4ZWQgdmVyc2lvblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UncmUgc2V0dGluZyBhIHZhbHVlXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdFx0Ly8gQ29udmVydCBcIis9XCIgb3IgXCItPVwiIHRvIHJlbGF0aXZlIG51bWJlcnMgKCM3MzQ1KVxuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICYmICggcmV0ID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiYgcmV0WyAxIF0gKSB7XG5cdFx0XHRcdHZhbHVlID0gYWRqdXN0Q1NTKCBlbGVtLCBuYW1lLCByZXQgKTtcblxuXHRcdFx0XHQvLyBGaXhlcyBidWcgIzkyMzdcblx0XHRcdFx0dHlwZSA9IFwibnVtYmVyXCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IG51bGwgYW5kIE5hTiB2YWx1ZXMgYXJlbid0IHNldCAoIzcxMTYpXG5cdFx0XHRpZiAoIHZhbHVlID09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCB0aGUgdW5pdCAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxuXHRcdFx0Ly8gVGhlIGlzQ3VzdG9tUHJvcCBjaGVjayBjYW4gYmUgcmVtb3ZlZCBpbiBqUXVlcnkgNC4wIHdoZW4gd2Ugb25seSBhdXRvLWFwcGVuZFxuXHRcdFx0Ly8gXCJweFwiIHRvIGEgZmV3IGhhcmRjb2RlZCB2YWx1ZXMuXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgJiYgIWlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdFx0dmFsdWUgKz0gcmV0ICYmIHJldFsgMyBdIHx8ICggalF1ZXJ5LmNzc051bWJlclsgb3JpZ05hbWUgXSA/IFwiXCIgOiBcInB4XCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYmFja2dyb3VuZC0qIHByb3BzIGFmZmVjdCBvcmlnaW5hbCBjbG9uZSdzIHZhbHVlc1xuXHRcdFx0aWYgKCAhc3VwcG9ydC5jbGVhckNsb25lU3R5bGUgJiYgdmFsdWUgPT09IFwiXCIgJiYgbmFtZS5pbmRleE9mKCBcImJhY2tncm91bmRcIiApID09PSAwICkge1xuXHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gXCJpbmhlcml0XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgISggXCJzZXRcIiBpbiBob29rcyApIHx8XG5cdFx0XHRcdCggdmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApICkgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRpZiAoIGlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdFx0XHRzdHlsZS5zZXRQcm9wZXJ0eSggbmFtZSwgdmFsdWUgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQgZ2V0IHRoZSBub24tY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBleHRyYSwgc3R5bGVzICkge1xuXHRcdHZhciB2YWwsIG51bSwgaG9va3MsXG5cdFx0XHRvcmlnTmFtZSA9IGNhbWVsQ2FzZSggbmFtZSApLFxuXHRcdFx0aXNDdXN0b21Qcm9wID0gcmN1c3RvbVByb3AudGVzdCggbmFtZSApO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UncmUgd29ya2luZyB3aXRoIHRoZSByaWdodCBuYW1lLiBXZSBkb24ndFxuXHRcdC8vIHdhbnQgdG8gbW9kaWZ5IHRoZSB2YWx1ZSBpZiBpdCBpcyBhIENTUyBjdXN0b20gcHJvcGVydHlcblx0XHQvLyBzaW5jZSB0aGV5IGFyZSB1c2VyLWRlZmluZWQuXG5cdFx0aWYgKCAhaXNDdXN0b21Qcm9wICkge1xuXHRcdFx0bmFtZSA9IGZpbmFsUHJvcE5hbWUoIG9yaWdOYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJ5IHByZWZpeGVkIG5hbWUgZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgbmFtZVxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gSWYgYSBob29rIHdhcyBwcm92aWRlZCBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRpZiAoIGhvb2tzICYmIFwiZ2V0XCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWwgPSBob29rcy5nZXQoIGVsZW0sIHRydWUsIGV4dHJhICk7XG5cdFx0fVxuXG5cdFx0Ly8gT3RoZXJ3aXNlLCBpZiBhIHdheSB0byBnZXQgdGhlIGNvbXB1dGVkIHZhbHVlIGV4aXN0cywgdXNlIHRoYXRcblx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lLCBzdHlsZXMgKTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IFwibm9ybWFsXCIgdG8gY29tcHV0ZWQgdmFsdWVcblx0XHRpZiAoIHZhbCA9PT0gXCJub3JtYWxcIiAmJiBuYW1lIGluIGNzc05vcm1hbFRyYW5zZm9ybSApIHtcblx0XHRcdHZhbCA9IGNzc05vcm1hbFRyYW5zZm9ybVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIE1ha2UgbnVtZXJpYyBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuXHRcdGlmICggZXh0cmEgPT09IFwiXCIgfHwgZXh0cmEgKSB7XG5cdFx0XHRudW0gPSBwYXJzZUZsb2F0KCB2YWwgKTtcblx0XHRcdHJldHVybiBleHRyYSA9PT0gdHJ1ZSB8fCBpc0Zpbml0ZSggbnVtICkgPyBudW0gfHwgMCA6IHZhbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCBbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgZGltZW5zaW9uICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIGRpbWVuc2lvbiBdID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkLCBleHRyYSApIHtcblx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0Ly8gQ2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGJ1dCBpdCBtdXN0IGhhdmUgYSBjdXJyZW50IGRpc3BsYXkgc3R5bGUgdGhhdCB3b3VsZCBiZW5lZml0XG5cdFx0XHRcdHJldHVybiByZGlzcGxheXN3YXAudGVzdCggalF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSApICYmXG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgOCtcblx0XHRcdFx0XHQvLyBUYWJsZSBjb2x1bW5zIGluIFNhZmFyaSBoYXZlIG5vbi16ZXJvIG9mZnNldFdpZHRoICYgemVyb1xuXHRcdFx0XHRcdC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIHVubGVzcyBkaXNwbGF5IGlzIGNoYW5nZWQuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0XHRcdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYSBkaXNjb25uZWN0ZWQgbm9kZVxuXHRcdFx0XHRcdC8vIGluIElFIHRocm93cyBhbiBlcnJvci5cblx0XHRcdFx0XHQoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoIHx8ICFlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoICkgP1xuXHRcdFx0XHRcdFx0c3dhcCggZWxlbSwgY3NzU2hvdywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICk7XG5cdFx0XHRcdFx0XHR9ICkgOlxuXHRcdFx0XHRcdFx0Z2V0V2lkdGhPckhlaWdodCggZWxlbSwgZGltZW5zaW9uLCBleHRyYSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSB7XG5cdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0c3R5bGVzID0gZ2V0U3R5bGVzKCBlbGVtICksXG5cblx0XHRcdFx0Ly8gT25seSByZWFkIHN0eWxlcy5wb3NpdGlvbiBpZiB0aGUgdGVzdCBoYXMgYSBjaGFuY2UgdG8gZmFpbFxuXHRcdFx0XHQvLyB0byBhdm9pZCBmb3JjaW5nIGEgcmVmbG93LlxuXHRcdFx0XHRzY3JvbGxib3hTaXplQnVnZ3kgPSAhc3VwcG9ydC5zY3JvbGxib3hTaXplKCkgJiZcblx0XHRcdFx0XHRzdHlsZXMucG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIixcblxuXHRcdFx0XHQvLyBUbyBhdm9pZCBmb3JjaW5nIGEgcmVmbG93LCBvbmx5IGZldGNoIGJveFNpemluZyBpZiB3ZSBuZWVkIGl0IChnaC0zOTkxKVxuXHRcdFx0XHRib3hTaXppbmdOZWVkZWQgPSBzY3JvbGxib3hTaXplQnVnZ3kgfHwgZXh0cmEsXG5cdFx0XHRcdGlzQm9yZGVyQm94ID0gYm94U2l6aW5nTmVlZGVkICYmXG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJib3hTaXppbmdcIiwgZmFsc2UsIHN0eWxlcyApID09PSBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0c3VidHJhY3QgPSBleHRyYSA/XG5cdFx0XHRcdFx0Ym94TW9kZWxBZGp1c3RtZW50KFxuXHRcdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRcdGRpbWVuc2lvbixcblx0XHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdFx0aXNCb3JkZXJCb3gsXG5cdFx0XHRcdFx0XHRzdHlsZXNcblx0XHRcdFx0XHQpIDpcblx0XHRcdFx0XHQwO1xuXG5cdFx0XHQvLyBBY2NvdW50IGZvciB1bnJlbGlhYmxlIGJvcmRlci1ib3ggZGltZW5zaW9ucyBieSBjb21wYXJpbmcgb2Zmc2V0KiB0byBjb21wdXRlZCBhbmRcblx0XHRcdC8vIGZha2luZyBhIGNvbnRlbnQtYm94IHRvIGdldCBib3JkZXIgYW5kIHBhZGRpbmcgKGdoLTM2OTkpXG5cdFx0XHRpZiAoIGlzQm9yZGVyQm94ICYmIHNjcm9sbGJveFNpemVCdWdneSApIHtcblx0XHRcdFx0c3VidHJhY3QgLT0gTWF0aC5jZWlsKFxuXHRcdFx0XHRcdGVsZW1bIFwib2Zmc2V0XCIgKyBkaW1lbnNpb25bIDAgXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKCAxICkgXSAtXG5cdFx0XHRcdFx0cGFyc2VGbG9hdCggc3R5bGVzWyBkaW1lbnNpb24gXSApIC1cblx0XHRcdFx0XHRib3hNb2RlbEFkanVzdG1lbnQoIGVsZW0sIGRpbWVuc2lvbiwgXCJib3JkZXJcIiwgZmFsc2UsIHN0eWxlcyApIC1cblx0XHRcdFx0XHQwLjVcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ29udmVydCB0byBwaXhlbHMgaWYgdmFsdWUgYWRqdXN0bWVudCBpcyBuZWVkZWRcblx0XHRcdGlmICggc3VidHJhY3QgJiYgKCBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApICkgJiZcblx0XHRcdFx0KCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgIT09IFwicHhcIiApIHtcblxuXHRcdFx0XHRlbGVtLnN0eWxlWyBkaW1lbnNpb24gXSA9IHZhbHVlO1xuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5jc3MoIGVsZW0sIGRpbWVuc2lvbiApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0UG9zaXRpdmVOdW1iZXIoIGVsZW0sIHZhbHVlLCBzdWJ0cmFjdCApO1xuXHRcdH1cblx0fTtcbn0gKTtcblxualF1ZXJ5LmNzc0hvb2tzLm1hcmdpbkxlZnQgPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucmVsaWFibGVNYXJnaW5MZWZ0LFxuXHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdHJldHVybiAoIHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIgKSApIHx8XG5cdFx0XHRcdGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtXG5cdFx0XHRcdFx0c3dhcCggZWxlbSwgeyBtYXJnaW5MZWZ0OiAwIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcblx0XHRcdFx0XHR9IClcblx0XHRcdFx0KSArIFwicHhcIjtcblx0XHR9XG5cdH1cbik7XG5cbi8vIFRoZXNlIGhvb2tzIGFyZSB1c2VkIGJ5IGFuaW1hdGUgdG8gZXhwYW5kIHByb3BlcnRpZXNcbmpRdWVyeS5lYWNoKCB7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpID0gMCxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fSxcblxuXHRcdFx0XHQvLyBBc3N1bWVzIGEgc2luZ2xlIG51bWJlciBpZiBub3QgYSBzdHJpbmdcblx0XHRcdFx0cGFydHMgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZS5zcGxpdCggXCIgXCIgKSA6IFsgdmFsdWUgXTtcblxuXHRcdFx0Zm9yICggOyBpIDwgNDsgaSsrICkge1xuXHRcdFx0XHRleHBhbmRlZFsgcHJlZml4ICsgY3NzRXhwYW5kWyBpIF0gKyBzdWZmaXggXSA9XG5cdFx0XHRcdFx0cGFydHNbIGkgXSB8fCBwYXJ0c1sgaSAtIDIgXSB8fCBwYXJ0c1sgMCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZXhwYW5kZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICggcHJlZml4ICE9PSBcIm1hcmdpblwiICkge1xuXHRcdGpRdWVyeS5jc3NIb29rc1sgcHJlZml4ICsgc3VmZml4IF0uc2V0ID0gc2V0UG9zaXRpdmVOdW1iZXI7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRjc3M6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgc3R5bGVzLCBsZW4sXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRpID0gMDtcblxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBuYW1lICkgKSB7XG5cdFx0XHRcdHN0eWxlcyA9IGdldFN0eWxlcyggZWxlbSApO1xuXHRcdFx0XHRsZW4gPSBuYW1lLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRtYXBbIG5hbWVbIGkgXSBdID0galF1ZXJ5LmNzcyggZWxlbSwgbmFtZVsgaSBdLCBmYWxzZSwgc3R5bGVzICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbWFwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG5cdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHR9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fVxufSApO1xuXG5cbi8vIEJhc2VkIG9mZiBvZiB0aGUgcGx1Z2luIGJ5IENsaW50IEhlbGZlcnMsIHdpdGggcGVybWlzc2lvbi5cbi8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDEwMDMyNDAxNDc0Ny9odHRwOi8vYmxpbmRzaWduYWxzLmNvbS9pbmRleC5waHAvMjAwOS8wNy9qcXVlcnktZGVsYXkvXG5qUXVlcnkuZm4uZGVsYXkgPSBmdW5jdGlvbiggdGltZSwgdHlwZSApIHtcblx0dGltZSA9IGpRdWVyeS5meCA/IGpRdWVyeS5meC5zcGVlZHNbIHRpbWUgXSB8fCB0aW1lIDogdGltZTtcblx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlLCBmdW5jdGlvbiggbmV4dCwgaG9va3MgKSB7XG5cdFx0dmFyIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuXHRcdGhvb2tzLnN0b3AgPSBmdW5jdGlvbigpIHtcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHR9O1xuXHR9ICk7XG59O1xuXG5cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiaW5wdXRcIiApLFxuXHRcdHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic2VsZWN0XCIgKSxcblx0XHRvcHQgPSBzZWxlY3QuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib3B0aW9uXCIgKSApO1xuXG5cdGlucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMyBvbmx5XG5cdC8vIERlZmF1bHQgdmFsdWUgZm9yIGEgY2hlY2tib3ggc2hvdWxkIGJlIFwib25cIlxuXHRzdXBwb3J0LmNoZWNrT24gPSBpbnB1dC52YWx1ZSAhPT0gXCJcIjtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gTXVzdCBhY2Nlc3Mgc2VsZWN0ZWRJbmRleCB0byBtYWtlIGRlZmF1bHQgb3B0aW9ucyBzZWxlY3Rcblx0c3VwcG9ydC5vcHRTZWxlY3RlZCA9IG9wdC5zZWxlY3RlZDtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0Ly8gQW4gaW5wdXQgbG9zZXMgaXRzIHZhbHVlIGFmdGVyIGJlY29taW5nIGEgcmFkaW9cblx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKTtcblx0aW5wdXQudmFsdWUgPSBcInRcIjtcblx0aW5wdXQudHlwZSA9IFwicmFkaW9cIjtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xufSApKCk7XG5cblxudmFyIGJvb2xIb29rLFxuXHRhdHRySGFuZGxlID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIHRoaXMsIG5hbWUgKTtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsXG5cdFx0XHRuVHlwZSA9IGVsZW0ubm9kZVR5cGU7XG5cblx0XHQvLyBEb24ndCBnZXQvc2V0IGF0dHJpYnV0ZXMgb24gdGV4dCwgY29tbWVudCBhbmQgYXR0cmlidXRlIG5vZGVzXG5cdFx0aWYgKCBuVHlwZSA9PT0gMyB8fCBuVHlwZSA9PT0gOCB8fCBuVHlwZSA9PT0gMiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayB0byBwcm9wIHdoZW4gYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZFxuXHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0QXR0cmlidXRlID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5wcm9wKCBlbGVtLCBuYW1lLCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEF0dHJpYnV0ZSBob29rcyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgbG93ZXJjYXNlIHZlcnNpb25cblx0XHQvLyBHcmFiIG5lY2Vzc2FyeSBob29rIGlmIG9uZSBpcyBkZWZpbmVkXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8XG5cdFx0XHRcdCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC50ZXN0KCBuYW1lICkgPyBib29sSG9vayA6IHVuZGVmaW5lZCApO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBob29rcyAmJiBcInNldFwiIGluIGhvb2tzICYmXG5cdFx0XHRcdCggcmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIHZhbHVlICsgXCJcIiApO1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldCA9IGpRdWVyeS5maW5kLmF0dHIoIGVsZW0sIG5hbWUgKTtcblxuXHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0cmV0dXJuIHJldCA9PSBudWxsID8gdW5kZWZpbmVkIDogcmV0O1xuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoICFzdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJlxuXHRcdFx0XHRcdG5vZGVOYW1lKCBlbGVtLCBcImlucHV0XCIgKSApIHtcblx0XHRcdFx0XHR2YXIgdmFsID0gZWxlbS52YWx1ZTtcblx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggXCJ0eXBlXCIsIHZhbHVlICk7XG5cdFx0XHRcdFx0aWYgKCB2YWwgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdHZhciBuYW1lLFxuXHRcdFx0aSA9IDAsXG5cblx0XHRcdC8vIEF0dHJpYnV0ZSBuYW1lcyBjYW4gY29udGFpbiBub24tSFRNTCB3aGl0ZXNwYWNlIGNoYXJhY3RlcnNcblx0XHRcdC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuXHRcdFx0YXR0ck5hbWVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblxuXHRcdGlmICggYXR0ck5hbWVzICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHR3aGlsZSAoICggbmFtZSA9IGF0dHJOYW1lc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIG5hbWUgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0gKTtcblxuLy8gSG9va3MgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuYm9vbEhvb2sgPSB7XG5cdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdGlmICggdmFsdWUgPT09IGZhbHNlICkge1xuXG5cdFx0XHQvLyBSZW1vdmUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdoZW4gc2V0IHRvIGZhbHNlXG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggZWxlbSwgbmFtZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgbmFtZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcblxualF1ZXJ5LmVhY2goIGpRdWVyeS5leHByLm1hdGNoLmJvb2wuc291cmNlLm1hdGNoKCAvXFx3Ky9nICksIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgZ2V0dGVyID0gYXR0ckhhbmRsZVsgbmFtZSBdIHx8IGpRdWVyeS5maW5kLmF0dHI7XG5cblx0YXR0ckhhbmRsZVsgbmFtZSBdID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGlzWE1MICkge1xuXHRcdHZhciByZXQsIGhhbmRsZSxcblx0XHRcdGxvd2VyY2FzZU5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAoICFpc1hNTCApIHtcblxuXHRcdFx0Ly8gQXZvaWQgYW4gaW5maW5pdGUgbG9vcCBieSB0ZW1wb3JhcmlseSByZW1vdmluZyB0aGlzIGZ1bmN0aW9uIGZyb20gdGhlIGdldHRlclxuXHRcdFx0aGFuZGxlID0gYXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gcmV0O1xuXHRcdFx0cmV0ID0gZ2V0dGVyKCBlbGVtLCBuYW1lLCBpc1hNTCApICE9IG51bGwgP1xuXHRcdFx0XHRsb3dlcmNhc2VOYW1lIDpcblx0XHRcdFx0bnVsbDtcblx0XHRcdGF0dHJIYW5kbGVbIGxvd2VyY2FzZU5hbWUgXSA9IGhhbmRsZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn0gKTtcblxuXG5cblxudmFyIHJmb2N1c2FibGUgPSAvXig/OmlucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24pJC9pLFxuXHRyY2xpY2thYmxlID0gL14oPzphfGFyZWEpJC9pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHByb3A6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkucHJvcCwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cblx0cmVtb3ZlUHJvcDogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRkZWxldGUgdGhpc1sgalF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lIF07XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0cHJvcDogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdHZhciByZXQsIGhvb2tzLFxuXHRcdFx0blR5cGUgPSBlbGVtLm5vZGVUeXBlO1xuXG5cdFx0Ly8gRG9uJ3QgZ2V0L3NldCBwcm9wZXJ0aWVzIG9uIHRleHQsIGNvbW1lbnQgYW5kIGF0dHJpYnV0ZSBub2Rlc1xuXHRcdGlmICggblR5cGUgPT09IDMgfHwgblR5cGUgPT09IDggfHwgblR5cGUgPT09IDIgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCBuVHlwZSAhPT0gMSB8fCAhalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSB7XG5cblx0XHRcdC8vIEZpeCBuYW1lIGFuZCBhdHRhY2ggaG9va3Ncblx0XHRcdG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5wcm9wSG9va3NbIG5hbWUgXTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKCBlbGVtWyBuYW1lIF0gPSB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgbmFtZSApICkgIT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gcmV0O1xuXHRcdH1cblxuXHRcdHJldHVybiBlbGVtWyBuYW1lIF07XG5cdH0sXG5cblx0cHJvcEhvb2tzOiB7XG5cdFx0dGFiSW5kZXg6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHRcdFx0XHQvLyBlbGVtLnRhYkluZGV4IGRvZXNuJ3QgYWx3YXlzIHJldHVybiB0aGVcblx0XHRcdFx0Ly8gY29ycmVjdCB2YWx1ZSB3aGVuIGl0IGhhc24ndCBiZWVuIGV4cGxpY2l0bHkgc2V0XG5cdFx0XHRcdC8vIGh0dHBzOi8vd2ViLmFyY2hpdmUub3JnL3dlYi8yMDE0MTExNjIzMzM0Ny9odHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuXHRcdFx0XHQvLyBVc2UgcHJvcGVyIGF0dHJpYnV0ZSByZXRyaWV2YWwoIzEyMDcyKVxuXHRcdFx0XHR2YXIgdGFiaW5kZXggPSBqUXVlcnkuZmluZC5hdHRyKCBlbGVtLCBcInRhYmluZGV4XCIgKTtcblxuXHRcdFx0XHRpZiAoIHRhYmluZGV4ICkge1xuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludCggdGFiaW5kZXgsIDEwICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHxcblx0XHRcdFx0XHRyY2xpY2thYmxlLnRlc3QoIGVsZW0ubm9kZU5hbWUgKSAmJlxuXHRcdFx0XHRcdGVsZW0uaHJlZlxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAtMTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cHJvcEZpeDoge1xuXHRcdFwiZm9yXCI6IFwiaHRtbEZvclwiLFxuXHRcdFwiY2xhc3NcIjogXCJjbGFzc05hbWVcIlxuXHR9XG59ICk7XG5cbi8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuLy8gQWNjZXNzaW5nIHRoZSBzZWxlY3RlZEluZGV4IHByb3BlcnR5XG4vLyBmb3JjZXMgdGhlIGJyb3dzZXIgdG8gcmVzcGVjdCBzZXR0aW5nIHNlbGVjdGVkXG4vLyBvbiB0aGUgb3B0aW9uXG4vLyBUaGUgZ2V0dGVyIGVuc3VyZXMgYSBkZWZhdWx0IG9wdGlvbiBpcyBzZWxlY3RlZFxuLy8gd2hlbiBpbiBhbiBvcHRncm91cFxuLy8gZXNsaW50IHJ1bGUgXCJuby11bnVzZWQtZXhwcmVzc2lvbnNcIiBpcyBkaXNhYmxlZCBmb3IgdGhpcyBjb2RlXG4vLyBzaW5jZSBpdCBjb25zaWRlcnMgc3VjaCBhY2Nlc3Npb25zIG5vb3BcbmlmICggIXN1cHBvcnQub3B0U2VsZWN0ZWQgKSB7XG5cdGpRdWVyeS5wcm9wSG9va3Muc2VsZWN0ZWQgPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0LyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogXCJvZmZcIiAqL1xuXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKCBwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHRcdC8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFwib2ZmXCIgKi9cblxuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRcdGlmICggcGFyZW50ICkge1xuXHRcdFx0XHRwYXJlbnQuc2VsZWN0ZWRJbmRleDtcblxuXHRcdFx0XHRpZiAoIHBhcmVudC5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdHBhcmVudC5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmpRdWVyeS5lYWNoKCBbXG5cdFwidGFiSW5kZXhcIixcblx0XCJyZWFkT25seVwiLFxuXHRcIm1heExlbmd0aFwiLFxuXHRcImNlbGxTcGFjaW5nXCIsXG5cdFwiY2VsbFBhZGRpbmdcIixcblx0XCJyb3dTcGFuXCIsXG5cdFwiY29sU3BhblwiLFxuXHRcInVzZU1hcFwiLFxuXHRcImZyYW1lQm9yZGVyXCIsXG5cdFwiY29udGVudEVkaXRhYmxlXCJcbl0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkucHJvcEZpeFsgdGhpcy50b0xvd2VyQ2FzZSgpIF0gPSB0aGlzO1xufSApO1xuXG5cblxuXG5cdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlIGFjY29yZGluZyB0byBIVE1MIHNwZWNcblx0Ly8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS1hc2NpaS13aGl0ZXNwYWNlXG5cdGZ1bmN0aW9uIHN0cmlwQW5kQ29sbGFwc2UoIHZhbHVlICkge1xuXHRcdHZhciB0b2tlbnMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXHRcdHJldHVybiB0b2tlbnMuam9pbiggXCIgXCIgKTtcblx0fVxuXG5cbmZ1bmN0aW9uIGdldENsYXNzKCBlbGVtICkge1xuXHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiApIHx8IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZXNUb0FycmF5KCB2YWx1ZSApIHtcblx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXHRpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRyZXR1cm4gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblx0fVxuXHRyZXR1cm4gW107XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCggdGhpcywgaiwgZ2V0Q2xhc3MoIHRoaXMgKSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0Y2xhc3NlcyA9IGNsYXNzZXNUb0FycmF5KCB2YWx1ZSApO1xuXG5cdFx0aWYgKCBjbGFzc2VzLmxlbmd0aCApIHtcblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgKz0gY2xhenogKyBcIiBcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hdHRyKCBcImNsYXNzXCIsIFwiXCIgKTtcblx0XHR9XG5cblx0XHRjbGFzc2VzID0gY2xhc3Nlc1RvQXJyYXkoIHZhbHVlICk7XG5cblx0XHRpZiAoIGNsYXNzZXMubGVuZ3RoICkge1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cblx0XHRcdFx0Ly8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggY3VyVmFsdWUgKSArIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0Y3VyID0gY3VyLnJlcGxhY2UoIFwiIFwiICsgY2xhenogKyBcIiBcIiwgXCIgXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlLFxuXHRcdFx0aXNWYWxpZFZhbHVlID0gdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KCB2YWx1ZSApO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIGlzVmFsaWRWYWx1ZSApIHtcblx0XHRcdHJldHVybiBzdGF0ZVZhbCA/IHRoaXMuYWRkQ2xhc3MoIHZhbHVlICkgOiB0aGlzLnJlbW92ZUNsYXNzKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdGlmICggaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS50b2dnbGVDbGFzcyhcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCB0aGlzLCBpLCBnZXRDbGFzcyggdGhpcyApLCBzdGF0ZVZhbCApLFxuXHRcdFx0XHRcdHN0YXRlVmFsXG5cdFx0XHRcdCk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY2xhc3NOYW1lLCBpLCBzZWxmLCBjbGFzc05hbWVzO1xuXG5cdFx0XHRpZiAoIGlzVmFsaWRWYWx1ZSApIHtcblxuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0XHRjbGFzc05hbWVzID0gY2xhc3Nlc1RvQXJyYXkoIHZhbHVlICk7XG5cblx0XHRcdFx0d2hpbGUgKCAoIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXNbIGkrKyBdICkgKSB7XG5cblx0XHRcdFx0XHQvLyBDaGVjayBlYWNoIGNsYXNzTmFtZSBnaXZlbiwgc3BhY2Ugc2VwYXJhdGVkIGxpc3Rcblx0XHRcdFx0XHRpZiAoIHNlbGYuaGFzQ2xhc3MoIGNsYXNzTmFtZSApICkge1xuXHRcdFx0XHRcdFx0c2VsZi5yZW1vdmVDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNlbGYuYWRkQ2xhc3MoIGNsYXNzTmFtZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBUb2dnbGUgd2hvbGUgY2xhc3MgbmFtZVxuXHRcdFx0fSBlbHNlIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB0eXBlID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRcdFx0Y2xhc3NOYW1lID0gZ2V0Q2xhc3MoIHRoaXMgKTtcblx0XHRcdFx0aWYgKCBjbGFzc05hbWUgKSB7XG5cblx0XHRcdFx0XHQvLyBTdG9yZSBjbGFzc05hbWUgaWYgc2V0XG5cdFx0XHRcdFx0ZGF0YVByaXYuc2V0KCB0aGlzLCBcIl9fY2xhc3NOYW1lX19cIiwgY2xhc3NOYW1lICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGUgZWxlbWVudCBoYXMgYSBjbGFzcyBuYW1lIG9yIGlmIHdlJ3JlIHBhc3NlZCBgZmFsc2VgLFxuXHRcdFx0XHQvLyB0aGVuIHJlbW92ZSB0aGUgd2hvbGUgY2xhc3NuYW1lIChpZiB0aGVyZSB3YXMgb25lLCB0aGUgYWJvdmUgc2F2ZWQgaXQpLlxuXHRcdFx0XHQvLyBPdGhlcndpc2UgYnJpbmcgYmFjayB3aGF0ZXZlciB3YXMgcHJldmlvdXNseSBzYXZlZCAoaWYgYW55dGhpbmcpLFxuXHRcdFx0XHQvLyBmYWxsaW5nIGJhY2sgdG8gdGhlIGVtcHR5IHN0cmluZyBpZiBub3RoaW5nIHdhcyBzdG9yZWQuXG5cdFx0XHRcdGlmICggdGhpcy5zZXRBdHRyaWJ1dGUgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIixcblx0XHRcdFx0XHRcdGNsYXNzTmFtZSB8fCB2YWx1ZSA9PT0gZmFsc2UgP1xuXHRcdFx0XHRcdFx0XCJcIiA6XG5cdFx0XHRcdFx0XHRkYXRhUHJpdi5nZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0aGFzQ2xhc3M6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgY2xhc3NOYW1lLCBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCI7XG5cdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmXG5cdFx0XHRcdCggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBnZXRDbGFzcyggZWxlbSApICkgKyBcIiBcIiApLmluZGV4T2YoIGNsYXNzTmFtZSApID4gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59ICk7XG5cblxuXG5cbnZhciBycmV0dXJuID0gL1xcci9nO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHZhbDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciBob29rcywgcmV0LCB2YWx1ZUlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0XHRpZiAoIGhvb2tzICYmXG5cdFx0XHRcdFx0XCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSApICE9PSB1bmRlZmluZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldCA9IGVsZW0udmFsdWU7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRpZiAoIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldC5yZXBsYWNlKCBycmV0dXJuLCBcIlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0cmV0dXJuIHJldCA9PSBudWxsID8gXCJcIiA6IHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhbHVlSXNGdW5jdGlvbiA9IGlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdHZhciB2YWw7XG5cblx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHZhbHVlSXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmVhdCBudWxsL3VuZGVmaW5lZCBhcyBcIlwiOyBjb252ZXJ0IG51bWJlcnMgdG8gc3RyaW5nXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHR2YWwgPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggQXJyYXkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHZhbCA9IGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIjtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fCBob29rcy5zZXQoIHRoaXMsIHZhbCwgXCJ2YWx1ZVwiICkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHR2YWxIb29rczoge1xuXHRcdG9wdGlvbjoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHR2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XG5cdFx0XHRcdHJldHVybiB2YWwgIT0gbnVsbCA/XG5cdFx0XHRcdFx0dmFsIDpcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSBvbmx5XG5cdFx0XHRcdFx0Ly8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuXHRcdFx0XHRcdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jc3RyaXAtYW5kLWNvbGxhcHNlLXdoaXRlc3BhY2Vcblx0XHRcdFx0XHRzdHJpcEFuZENvbGxhcHNlKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLCBpLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIixcblx0XHRcdFx0XHR2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXG5cdFx0XHRcdFx0bWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKCBpbmRleCA8IDAgKSB7XG5cdFx0XHRcdFx0aSA9IG1heDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGkgPSBvbmUgPyBpbmRleCA6IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0XHRcdFx0Ly8gSUU4LTkgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldCAoIzI1NTEpXG5cdFx0XHRcdFx0aWYgKCAoIG9wdGlvbi5zZWxlY3RlZCB8fCBpID09PSBpbmRleCApICYmXG5cblx0XHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0XHRcdFx0XHQhb3B0aW9uLmRpc2FibGVkICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0IW5vZGVOYW1lKCBvcHRpb24ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiICkgKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBzcGVjaWZpYyB2YWx1ZSBmb3IgdGhlIG9wdGlvblxuXHRcdFx0XHRcdFx0dmFsdWUgPSBqUXVlcnkoIG9wdGlvbiApLnZhbCgpO1xuXG5cdFx0XHRcdFx0XHQvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xuXHRcdFx0XHRcdFx0aWYgKCBvbmUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcblx0XHRcdFx0XHRcdHZhbHVlcy5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIG9wdGlvblNldCwgb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0dmFsdWVzID0galF1ZXJ5Lm1ha2VBcnJheSggdmFsdWUgKSxcblx0XHRcdFx0XHRpID0gb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0b3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cblxuXHRcdFx0XHRcdGlmICggb3B0aW9uLnNlbGVjdGVkID1cblx0XHRcdFx0XHRcdGpRdWVyeS5pbkFycmF5KCBqUXVlcnkudmFsSG9va3Mub3B0aW9uLmdldCggb3B0aW9uICksIHZhbHVlcyApID4gLTFcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG9wdGlvblNldCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9yY2UgYnJvd3NlcnMgdG8gYmVoYXZlIGNvbnNpc3RlbnRseSB3aGVuIG5vbi1tYXRjaGluZyB2YWx1ZSBpcyBzZXRcblx0XHRcdFx0aWYgKCAhb3B0aW9uU2V0ICkge1xuXHRcdFx0XHRcdGVsZW0uc2VsZWN0ZWRJbmRleCA9IC0xO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaCggWyBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiBdLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0gPSB7XG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoIGVsZW0gKS52YWwoKSwgdmFsdWUgKSA+IC0xICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRpZiAoICFzdXBwb3J0LmNoZWNrT24gKSB7XG5cdFx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0uZ2V0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBudWxsID8gXCJvblwiIDogZWxlbS52YWx1ZTtcblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFJldHVybiBqUXVlcnkgZm9yIGF0dHJpYnV0ZXMtb25seSBpbmNsdXNpb25cblxuXG5zdXBwb3J0LmZvY3VzaW4gPSBcIm9uZm9jdXNpblwiIGluIHdpbmRvdztcblxuXG52YXIgcmZvY3VzTW9ycGggPSAvXig/OmZvY3VzaW5mb2N1c3xmb2N1c291dGJsdXIpJC8sXG5cdHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0fTtcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLCBsYXN0RWxlbWVudCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdCggXCIuXCIgKSA6IFtdO1xuXG5cdFx0Y3VyID0gbGFzdEVsZW1lbnQgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdGJ1YmJsZVR5cGUgPSBzcGVjaWFsLmRlbGVnYXRlVHlwZSB8fCB0eXBlO1xuXHRcdFx0aWYgKCAhcmZvY3VzTW9ycGgudGVzdCggYnViYmxlVHlwZSArIHR5cGUgKSApIHtcblx0XHRcdFx0Y3VyID0gY3VyLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKCA7IGN1cjsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0dG1wID0gY3VyO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcblx0XHRcdGlmICggdG1wID09PSAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBjdXIgPSBldmVudFBhdGhbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRsYXN0RWxlbWVudCA9IGN1cjtcblx0XHRcdGV2ZW50LnR5cGUgPSBpID4gMSA/XG5cdFx0XHRcdGJ1YmJsZVR5cGUgOlxuXHRcdFx0XHRzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XG5cblx0XHRcdC8vIGpRdWVyeSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSAoIGRhdGFQcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmXG5cdFx0XHRcdGRhdGFQcml2LmdldCggY3VyLCBcImhhbmRsZVwiICk7XG5cdFx0XHRpZiAoIGhhbmRsZSApIHtcblx0XHRcdFx0aGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTmF0aXZlIGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbIG9udHlwZSBdO1xuXHRcdFx0aWYgKCBoYW5kbGUgJiYgaGFuZGxlLmFwcGx5ICYmIGFjY2VwdERhdGEoIGN1ciApICkge1xuXHRcdFx0XHRldmVudC5yZXN1bHQgPSBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRldmVudC50eXBlID0gdHlwZTtcblxuXHRcdC8vIElmIG5vYm9keSBwcmV2ZW50ZWQgdGhlIGRlZmF1bHQgYWN0aW9uLCBkbyBpdCBub3dcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xuXG5cdFx0XHRpZiAoICggIXNwZWNpYWwuX2RlZmF1bHQgfHxcblx0XHRcdFx0c3BlY2lhbC5fZGVmYXVsdC5hcHBseSggZXZlbnRQYXRoLnBvcCgpLCBkYXRhICkgPT09IGZhbHNlICkgJiZcblx0XHRcdFx0YWNjZXB0RGF0YSggZWxlbSApICkge1xuXG5cdFx0XHRcdC8vIENhbGwgYSBuYXRpdmUgRE9NIG1ldGhvZCBvbiB0aGUgdGFyZ2V0IHdpdGggdGhlIHNhbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgaXNGdW5jdGlvbiggZWxlbVsgdHlwZSBdICkgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZS10cmlnZ2VyIGFuIG9uRk9PIGV2ZW50IHdoZW4gd2UgY2FsbCBpdHMgRk9PKCkgbWV0aG9kXG5cdFx0XHRcdFx0dG1wID0gZWxlbVsgb250eXBlIF07XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IHJlLXRyaWdnZXJpbmcgb2YgdGhlIHNhbWUgZXZlbnQsIHNpbmNlIHdlIGFscmVhZHkgYnViYmxlZCBpdCBhYm92ZVxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB0eXBlO1xuXG5cdFx0XHRcdFx0aWYgKCBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0XHRcdFx0bGFzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgc3RvcFByb3BhZ2F0aW9uQ2FsbGJhY2sgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRlbGVtWyB0eXBlIF0oKTtcblxuXHRcdFx0XHRcdGlmICggZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdFx0XHRcdGxhc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggdG1wICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBQaWdneWJhY2sgb24gYSBkb25vciBldmVudCB0byBzaW11bGF0ZSBhIGRpZmZlcmVudCBvbmVcblx0Ly8gVXNlZCBvbmx5IGZvciBgZm9jdXMoaW4gfCBvdXQpYCBldmVudHNcblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCApIHtcblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWVcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXIoIGUsIG51bGwsIGVsZW0gKTtcblx0fVxuXG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggdHlwZSwgZGF0YSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzICk7XG5cdFx0fSApO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIGVsZW0gPSB0aGlzWyAwIF07XG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCBlbGVtLCB0cnVlICk7XG5cdFx0fVxuXHR9XG59ICk7XG5cblxuLy8gU3VwcG9ydDogRmlyZWZveCA8PTQ0XG4vLyBGaXJlZm94IGRvZXNuJ3QgaGF2ZSBmb2N1cyhpbiB8IG91dCkgZXZlbnRzXG4vLyBSZWxhdGVkIHRpY2tldCAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY4Nzc4N1xuLy9cbi8vIFN1cHBvcnQ6IENocm9tZSA8PTQ4IC0gNDksIFNhZmFyaSA8PTkuMCAtIDkuMVxuLy8gZm9jdXMoaW4gfCBvdXQpIGV2ZW50cyBmaXJlIGFmdGVyIGZvY3VzICYgYmx1ciBldmVudHMsXG4vLyB3aGljaCBpcyBzcGVjIHZpb2xhdGlvbiAtIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLWZvY3VzZXZlbnQtZXZlbnQtb3JkZXJcbi8vIFJlbGF0ZWQgdGlja2V0IC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDQ5ODU3XG5pZiAoICFzdXBwb3J0LmZvY3VzaW4gKSB7XG5cdGpRdWVyeS5lYWNoKCB7IGZvY3VzOiBcImZvY3VzaW5cIiwgYmx1cjogXCJmb2N1c291dFwiIH0sIGZ1bmN0aW9uKCBvcmlnLCBmaXggKSB7XG5cblx0XHQvLyBBdHRhY2ggYSBzaW5nbGUgY2FwdHVyaW5nIGhhbmRsZXIgb24gdGhlIGRvY3VtZW50IHdoaWxlIHNvbWVvbmUgd2FudHMgZm9jdXNpbi9mb2N1c291dFxuXHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSApO1xuXHRcdH07XG5cblx0XHRqUXVlcnkuZXZlbnQuc3BlY2lhbFsgZml4IF0gPSB7XG5cdFx0XHRzZXR1cDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgdGhpcyxcblx0XHRcdFx0XHRhdHRhY2hlcyA9IGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXggKTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MuYWRkRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsICggYXR0YWNoZXMgfHwgMCApICsgMSApO1xuXHRcdFx0fSxcblx0XHRcdHRlYXJkb3duOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCB0aGlzLFxuXHRcdFx0XHRcdGF0dGFjaGVzID0gZGF0YVByaXYuYWNjZXNzKCBkb2MsIGZpeCApIC0gMTtcblxuXHRcdFx0XHRpZiAoICFhdHRhY2hlcyApIHtcblx0XHRcdFx0XHRkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lciggb3JpZywgaGFuZGxlciwgdHJ1ZSApO1xuXHRcdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZG9jLCBmaXggKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGFQcml2LmFjY2VzcyggZG9jLCBmaXgsIGF0dGFjaGVzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9ICk7XG59XG5cblxudmFyXG5cdHJicmFja2V0ID0gL1xcW1xcXSQvLFxuXHRyQ1JMRiA9IC9cXHI/XFxuL2csXG5cdHJzdWJtaXR0ZXJUeXBlcyA9IC9eKD86c3VibWl0fGJ1dHRvbnxpbWFnZXxyZXNldHxmaWxlKSQvaSxcblx0cnN1Ym1pdHRhYmxlID0gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8a2V5Z2VuKS9pO1xuXG5mdW5jdGlvbiBidWlsZFBhcmFtcyggcHJlZml4LCBvYmosIHRyYWRpdGlvbmFsLCBhZGQgKSB7XG5cdHZhciBuYW1lO1xuXG5cdGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cblx0XHRcdFx0Ly8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuXHRcdFx0XHRhZGQoIHByZWZpeCwgdiApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEl0ZW0gaXMgbm9uLXNjYWxhciAoYXJyYXkgb3Igb2JqZWN0KSwgZW5jb2RlIGl0cyBudW1lcmljIGluZGV4LlxuXHRcdFx0XHRidWlsZFBhcmFtcyhcblx0XHRcdFx0XHRwcmVmaXggKyBcIltcIiArICggdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPSBudWxsID8gaSA6IFwiXCIgKSArIFwiXVwiLFxuXHRcdFx0XHRcdHYsXG5cdFx0XHRcdFx0dHJhZGl0aW9uYWwsXG5cdFx0XHRcdFx0YWRkXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdH0gZWxzZSBpZiAoICF0cmFkaXRpb25hbCAmJiB0b1R5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgbmFtZSArIFwiXVwiLCBvYmpbIG5hbWUgXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuXHRcdGFkZCggcHJlZml4LCBvYmogKTtcblx0fVxufVxuXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxuLy8ga2V5L3ZhbHVlcyBpbnRvIGEgcXVlcnkgc3RyaW5nXG5qUXVlcnkucGFyYW0gPSBmdW5jdGlvbiggYSwgdHJhZGl0aW9uYWwgKSB7XG5cdHZhciBwcmVmaXgsXG5cdFx0cyA9IFtdLFxuXHRcdGFkZCA9IGZ1bmN0aW9uKCBrZXksIHZhbHVlT3JGdW5jdGlvbiApIHtcblxuXHRcdFx0Ly8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCB1c2UgaXRzIHJldHVybiB2YWx1ZVxuXHRcdFx0dmFyIHZhbHVlID0gaXNGdW5jdGlvbiggdmFsdWVPckZ1bmN0aW9uICkgP1xuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb24oKSA6XG5cdFx0XHRcdHZhbHVlT3JGdW5jdGlvbjtcblxuXHRcdFx0c1sgcy5sZW5ndGggXSA9IGVuY29kZVVSSUNvbXBvbmVudCgga2V5ICkgKyBcIj1cIiArXG5cdFx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCggdmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSApO1xuXHRcdH07XG5cblx0aWYgKCBhID09IG51bGwgKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cblxuXHQvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIGEgKSB8fCAoIGEuanF1ZXJ5ICYmICFqUXVlcnkuaXNQbGFpbk9iamVjdCggYSApICkgKSB7XG5cblx0XHQvLyBTZXJpYWxpemUgdGhlIGZvcm0gZWxlbWVudHNcblx0XHRqUXVlcnkuZWFjaCggYSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRhZGQoIHRoaXMubmFtZSwgdGhpcy52YWx1ZSApO1xuXHRcdH0gKTtcblxuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gSWYgdHJhZGl0aW9uYWwsIGVuY29kZSB0aGUgXCJvbGRcIiB3YXkgKHRoZSB3YXkgMS4zLjIgb3Igb2xkZXJcblx0XHQvLyBkaWQgaXQpLCBvdGhlcndpc2UgZW5jb2RlIHBhcmFtcyByZWN1cnNpdmVseS5cblx0XHRmb3IgKCBwcmVmaXggaW4gYSApIHtcblx0XHRcdGJ1aWxkUGFyYW1zKCBwcmVmaXgsIGFbIHByZWZpeCBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSByZXN1bHRpbmcgc2VyaWFsaXphdGlvblxuXHRyZXR1cm4gcy5qb2luKCBcIiZcIiApO1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkucGFyYW0oIHRoaXMuc2VyaWFsaXplQXJyYXkoKSApO1xuXHR9LFxuXHRzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gQ2FuIGFkZCBwcm9wSG9vayBmb3IgXCJlbGVtZW50c1wiIHRvIGZpbHRlciBvciBhZGQgZm9ybSBlbGVtZW50c1xuXHRcdFx0dmFyIGVsZW1lbnRzID0galF1ZXJ5LnByb3AoIHRoaXMsIFwiZWxlbWVudHNcIiApO1xuXHRcdFx0cmV0dXJuIGVsZW1lbnRzID8galF1ZXJ5Lm1ha2VBcnJheSggZWxlbWVudHMgKSA6IHRoaXM7XG5cdFx0fSApXG5cdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdHlwZSA9IHRoaXMudHlwZTtcblxuXHRcdFx0Ly8gVXNlIC5pcyggXCI6ZGlzYWJsZWRcIiApIHNvIHRoYXQgZmllbGRzZXRbZGlzYWJsZWRdIHdvcmtzXG5cdFx0XHRyZXR1cm4gdGhpcy5uYW1lICYmICFqUXVlcnkoIHRoaXMgKS5pcyggXCI6ZGlzYWJsZWRcIiApICYmXG5cdFx0XHRcdHJzdWJtaXR0YWJsZS50ZXN0KCB0aGlzLm5vZGVOYW1lICkgJiYgIXJzdWJtaXR0ZXJUeXBlcy50ZXN0KCB0eXBlICkgJiZcblx0XHRcdFx0KCB0aGlzLmNoZWNrZWQgfHwgIXJjaGVja2FibGVUeXBlLnRlc3QoIHR5cGUgKSApO1xuXHRcdH0gKVxuXHRcdC5tYXAoIGZ1bmN0aW9uKCBpLCBlbGVtICkge1xuXHRcdFx0dmFyIHZhbCA9IGpRdWVyeSggdGhpcyApLnZhbCgpO1xuXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0fSApLmdldCgpO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHR3cmFwQWxsOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHR2YXIgd3JhcDtcblxuXHRcdGlmICggdGhpc1sgMCBdICkge1xuXHRcdFx0aWYgKCBpc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRcdGh0bWwgPSBodG1sLmNhbGwoIHRoaXNbIDAgXSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUaGUgZWxlbWVudHMgdG8gd3JhcCB0aGUgdGFyZ2V0IGFyb3VuZFxuXHRcdFx0d3JhcCA9IGpRdWVyeSggaHRtbCwgdGhpc1sgMCBdLm93bmVyRG9jdW1lbnQgKS5lcSggMCApLmNsb25lKCB0cnVlICk7XG5cblx0XHRcdGlmICggdGhpc1sgMCBdLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHdyYXAuaW5zZXJ0QmVmb3JlKCB0aGlzWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0d3JhcC5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0RWxlbWVudENoaWxkICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVsZW07XG5cdFx0XHR9ICkuYXBwZW5kKCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0d3JhcElubmVyOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRpZiAoIGlzRnVuY3Rpb24oIGh0bWwgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS53cmFwSW5uZXIoIGh0bWwuY2FsbCggdGhpcywgaSApICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IGpRdWVyeSggdGhpcyApLFxuXHRcdFx0XHRjb250ZW50cyA9IHNlbGYuY29udGVudHMoKTtcblxuXHRcdFx0aWYgKCBjb250ZW50cy5sZW5ndGggKSB7XG5cdFx0XHRcdGNvbnRlbnRzLndyYXBBbGwoIGh0bWwgKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZi5hcHBlbmQoIGh0bWwgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0d3JhcDogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0dmFyIGh0bWxJc0Z1bmN0aW9uID0gaXNGdW5jdGlvbiggaHRtbCApO1xuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRqUXVlcnkoIHRoaXMgKS53cmFwQWxsKCBodG1sSXNGdW5jdGlvbiA/IGh0bWwuY2FsbCggdGhpcywgaSApIDogaHRtbCApO1xuXHRcdH0gKTtcblx0fSxcblxuXHR1bndyYXA6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR0aGlzLnBhcmVudCggc2VsZWN0b3IgKS5ub3QoIFwiYm9keVwiICkuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkoIHRoaXMgKS5yZXBsYWNlV2l0aCggdGhpcy5jaGlsZE5vZGVzICk7XG5cdFx0fSApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59ICk7XG5cblxualF1ZXJ5LmV4cHIucHNldWRvcy5oaWRkZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICFqUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUoIGVsZW0gKTtcbn07XG5qUXVlcnkuZXhwci5wc2V1ZG9zLnZpc2libGUgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0cmV0dXJuICEhKCBlbGVtLm9mZnNldFdpZHRoIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0IHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKTtcbn07XG5cblxuXG5cbi8vIFN1cHBvcnQ6IFNhZmFyaSA4IG9ubHlcbi8vIEluIFNhZmFyaSA4IGRvY3VtZW50cyBjcmVhdGVkIHZpYSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnRcbi8vIGNvbGxhcHNlIHNpYmxpbmcgZm9ybXM6IHRoZSBzZWNvbmQgb25lIGJlY29tZXMgYSBjaGlsZCBvZiB0aGUgZmlyc3Qgb25lLlxuLy8gQmVjYXVzZSBvZiB0aGF0LCB0aGlzIHNlY3VyaXR5IG1lYXN1cmUgaGFzIHRvIGJlIGRpc2FibGVkIGluIFNhZmFyaSA4LlxuLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNzMzN1xuc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgPSAoIGZ1bmN0aW9uKCkge1xuXHR2YXIgYm9keSA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApLmJvZHk7XG5cdGJvZHkuaW5uZXJIVE1MID0gXCI8Zm9ybT48L2Zvcm0+PGZvcm0+PC9mb3JtPlwiO1xuXHRyZXR1cm4gYm9keS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMjtcbn0gKSgpO1xuXG5cbi8vIEFyZ3VtZW50IFwiZGF0YVwiIHNob3VsZCBiZSBzdHJpbmcgb2YgaHRtbFxuLy8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LFxuLy8gZGVmYXVsdHMgdG8gZG9jdW1lbnRcbi8vIGtlZXBTY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcbmpRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwga2VlcFNjcmlwdHMgKSB7XG5cdGlmICggdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGtlZXBTY3JpcHRzID0gY29udGV4dDtcblx0XHRjb250ZXh0ID0gZmFsc2U7XG5cdH1cblxuXHR2YXIgYmFzZSwgcGFyc2VkLCBzY3JpcHRzO1xuXG5cdGlmICggIWNvbnRleHQgKSB7XG5cblx0XHQvLyBTdG9wIHNjcmlwdHMgb3IgaW5saW5lIGV2ZW50IGhhbmRsZXJzIGZyb20gYmVpbmcgZXhlY3V0ZWQgaW1tZWRpYXRlbHlcblx0XHQvLyBieSB1c2luZyBkb2N1bWVudC5pbXBsZW1lbnRhdGlvblxuXHRcdGlmICggc3VwcG9ydC5jcmVhdGVIVE1MRG9jdW1lbnQgKSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCBcIlwiICk7XG5cblx0XHRcdC8vIFNldCB0aGUgYmFzZSBocmVmIGZvciB0aGUgY3JlYXRlZCBkb2N1bWVudFxuXHRcdFx0Ly8gc28gYW55IHBhcnNlZCBlbGVtZW50cyB3aXRoIFVSTHNcblx0XHRcdC8vIGFyZSBiYXNlZCBvbiB0aGUgZG9jdW1lbnQncyBVUkwgKGdoLTI5NjUpXG5cdFx0XHRiYXNlID0gY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImJhc2VcIiApO1xuXHRcdFx0YmFzZS5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcblx0XHRcdGNvbnRleHQuaGVhZC5hcHBlbmRDaGlsZCggYmFzZSApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZXh0ID0gZG9jdW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0cGFyc2VkID0gcnNpbmdsZVRhZy5leGVjKCBkYXRhICk7XG5cdHNjcmlwdHMgPSAha2VlcFNjcmlwdHMgJiYgW107XG5cblx0Ly8gU2luZ2xlIHRhZ1xuXHRpZiAoIHBhcnNlZCApIHtcblx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsgMSBdICkgXTtcblx0fVxuXG5cdHBhcnNlZCA9IGJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzICk7XG5cblx0aWYgKCBzY3JpcHRzICYmIHNjcmlwdHMubGVuZ3RoICkge1xuXHRcdGpRdWVyeSggc2NyaXB0cyApLnJlbW92ZSgpO1xuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIHBhcnNlZC5jaGlsZE5vZGVzICk7XG59O1xuXG5cbmpRdWVyeS5vZmZzZXQgPSB7XG5cdHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XG5cdFx0dmFyIGN1clBvc2l0aW9uLCBjdXJMZWZ0LCBjdXJDU1NUb3AsIGN1clRvcCwgY3VyT2Zmc2V0LCBjdXJDU1NMZWZ0LCBjYWxjdWxhdGVQb3NpdGlvbixcblx0XHRcdHBvc2l0aW9uID0galF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICksXG5cdFx0XHRjdXJFbGVtID0galF1ZXJ5KCBlbGVtICksXG5cdFx0XHRwcm9wcyA9IHt9O1xuXG5cdFx0Ly8gU2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuXHRcdGlmICggcG9zaXRpb24gPT09IFwic3RhdGljXCIgKSB7XG5cdFx0XHRlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHRcdH1cblxuXHRcdGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCk7XG5cdFx0Y3VyQ1NTVG9wID0galF1ZXJ5LmNzcyggZWxlbSwgXCJ0b3BcIiApO1xuXHRcdGN1ckNTU0xlZnQgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImxlZnRcIiApO1xuXHRcdGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJlxuXHRcdFx0KCBjdXJDU1NUb3AgKyBjdXJDU1NMZWZ0ICkuaW5kZXhPZiggXCJhdXRvXCIgKSA+IC0xO1xuXG5cdFx0Ly8gTmVlZCB0byBiZSBhYmxlIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbiBpZiBlaXRoZXJcblx0XHQvLyB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcblx0XHRpZiAoIGNhbGN1bGF0ZVBvc2l0aW9uICkge1xuXHRcdFx0Y3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG5cdFx0XHRjdXJUb3AgPSBjdXJQb3NpdGlvbi50b3A7XG5cdFx0XHRjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJUb3AgPSBwYXJzZUZsb2F0KCBjdXJDU1NUb3AgKSB8fCAwO1xuXHRcdFx0Y3VyTGVmdCA9IHBhcnNlRmxvYXQoIGN1ckNTU0xlZnQgKSB8fCAwO1xuXHRcdH1cblxuXHRcdGlmICggaXNGdW5jdGlvbiggb3B0aW9ucyApICkge1xuXG5cdFx0XHQvLyBVc2UgalF1ZXJ5LmV4dGVuZCBoZXJlIHRvIGFsbG93IG1vZGlmaWNhdGlvbiBvZiBjb29yZGluYXRlcyBhcmd1bWVudCAoZ2gtMTg0OClcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoIGVsZW0sIGksIGpRdWVyeS5leHRlbmQoIHt9LCBjdXJPZmZzZXQgKSApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0aW9ucy50b3AgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLnRvcCA9ICggb3B0aW9ucy50b3AgLSBjdXJPZmZzZXQudG9wICkgKyBjdXJUb3A7XG5cdFx0fVxuXHRcdGlmICggb3B0aW9ucy5sZWZ0ICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy5sZWZ0ID0gKCBvcHRpb25zLmxlZnQgLSBjdXJPZmZzZXQubGVmdCApICsgY3VyTGVmdDtcblx0XHR9XG5cblx0XHRpZiAoIFwidXNpbmdcIiBpbiBvcHRpb25zICkge1xuXHRcdFx0b3B0aW9ucy51c2luZy5jYWxsKCBlbGVtLCBwcm9wcyApO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1ckVsZW0uY3NzKCBwcm9wcyApO1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdC8vIG9mZnNldCgpIHJlbGF0ZXMgYW4gZWxlbWVudCdzIGJvcmRlciBib3ggdG8gdGhlIGRvY3VtZW50IG9yaWdpblxuXHRvZmZzZXQ6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdFx0Ly8gUHJlc2VydmUgY2hhaW5pbmcgZm9yIHNldHRlclxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHJldHVybiBvcHRpb25zID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHR0aGlzIDpcblx0XHRcdFx0dGhpcy5lYWNoKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0XHRqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlY3QsIHdpbixcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF07XG5cblx0XHRpZiAoICFlbGVtICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB6ZXJvcyBmb3IgZGlzY29ubmVjdGVkIGFuZCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpIGVsZW1lbnRzIChnaC0yMzEwKVxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9MTEgb25seVxuXHRcdC8vIFJ1bm5pbmcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG9uIGFcblx0XHQvLyBkaXNjb25uZWN0ZWQgbm9kZSBpbiBJRSB0aHJvd3MgYW4gZXJyb3Jcblx0XHRpZiAoICFlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIHsgdG9wOiAwLCBsZWZ0OiAwIH07XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IGRvY3VtZW50LXJlbGF0aXZlIHBvc2l0aW9uIGJ5IGFkZGluZyB2aWV3cG9ydCBzY3JvbGwgdG8gdmlld3BvcnQtcmVsYXRpdmUgZ0JDUlxuXHRcdHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdHdpbiA9IGVsZW0ub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldztcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiByZWN0LnRvcCArIHdpbi5wYWdlWU9mZnNldCxcblx0XHRcdGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldFxuXHRcdH07XG5cdH0sXG5cblx0Ly8gcG9zaXRpb24oKSByZWxhdGVzIGFuIGVsZW1lbnQncyBtYXJnaW4gYm94IHRvIGl0cyBvZmZzZXQgcGFyZW50J3MgcGFkZGluZyBib3hcblx0Ly8gVGhpcyBjb3JyZXNwb25kcyB0byB0aGUgYmVoYXZpb3Igb2YgQ1NTIGFic29sdXRlIHBvc2l0aW9uaW5nXG5cdHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICF0aGlzWyAwIF0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIG9mZnNldFBhcmVudCwgb2Zmc2V0LCBkb2MsXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdLFxuXHRcdFx0cGFyZW50T2Zmc2V0ID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblxuXHRcdC8vIHBvc2l0aW9uOmZpeGVkIGVsZW1lbnRzIGFyZSBvZmZzZXQgZnJvbSB0aGUgdmlld3BvcnQsIHdoaWNoIGl0c2VsZiBhbHdheXMgaGFzIHplcm8gb2Zmc2V0XG5cdFx0aWYgKCBqUXVlcnkuY3NzKCBlbGVtLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJmaXhlZFwiICkge1xuXG5cdFx0XHQvLyBBc3N1bWUgcG9zaXRpb246Zml4ZWQgaW1wbGllcyBhdmFpbGFiaWxpdHkgb2YgZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG5cdFx0XHRvZmZzZXQgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG5cblx0XHRcdC8vIEFjY291bnQgZm9yIHRoZSAqcmVhbCogb2Zmc2V0IHBhcmVudCwgd2hpY2ggY2FuIGJlIHRoZSBkb2N1bWVudCBvciBpdHMgcm9vdCBlbGVtZW50XG5cdFx0XHQvLyB3aGVuIGEgc3RhdGljYWxseSBwb3NpdGlvbmVkIGVsZW1lbnQgaXMgaWRlbnRpZmllZFxuXHRcdFx0ZG9jID0gZWxlbS5vd25lckRvY3VtZW50O1xuXHRcdFx0b2Zmc2V0UGFyZW50ID0gZWxlbS5vZmZzZXRQYXJlbnQgfHwgZG9jLmRvY3VtZW50RWxlbWVudDtcblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmXG5cdFx0XHRcdCggb2Zmc2V0UGFyZW50ID09PSBkb2MuYm9keSB8fCBvZmZzZXRQYXJlbnQgPT09IGRvYy5kb2N1bWVudEVsZW1lbnQgKSAmJlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkge1xuXG5cdFx0XHRcdG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBvZmZzZXRQYXJlbnQgJiYgb2Zmc2V0UGFyZW50ICE9PSBlbGVtICYmIG9mZnNldFBhcmVudC5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBJbmNvcnBvcmF0ZSBib3JkZXJzIGludG8gaXRzIG9mZnNldCwgc2luY2UgdGhleSBhcmUgb3V0c2lkZSBpdHMgY29udGVudCBvcmlnaW5cblx0XHRcdFx0cGFyZW50T2Zmc2V0ID0galF1ZXJ5KCBvZmZzZXRQYXJlbnQgKS5vZmZzZXQoKTtcblx0XHRcdFx0cGFyZW50T2Zmc2V0LnRvcCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwiYm9yZGVyVG9wV2lkdGhcIiwgdHJ1ZSApO1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQubGVmdCArPSBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwiYm9yZGVyTGVmdFdpZHRoXCIsIHRydWUgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTdWJ0cmFjdCBwYXJlbnQgb2Zmc2V0cyBhbmQgZWxlbWVudCBtYXJnaW5zXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvcDogb2Zmc2V0LnRvcCAtIHBhcmVudE9mZnNldC50b3AgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpblRvcFwiLCB0cnVlICksXG5cdFx0XHRsZWZ0OiBvZmZzZXQubGVmdCAtIHBhcmVudE9mZnNldC5sZWZ0IC0galF1ZXJ5LmNzcyggZWxlbSwgXCJtYXJnaW5MZWZ0XCIsIHRydWUgKVxuXHRcdH07XG5cdH0sXG5cblx0Ly8gVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gZG9jdW1lbnRFbGVtZW50IGluIHRoZSBmb2xsb3dpbmcgY2FzZXM6XG5cdC8vIDEpIEZvciB0aGUgZWxlbWVudCBpbnNpZGUgdGhlIGlmcmFtZSB3aXRob3V0IG9mZnNldFBhcmVudCwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm5cblx0Ly8gICAgZG9jdW1lbnRFbGVtZW50IG9mIHRoZSBwYXJlbnQgd2luZG93XG5cdC8vIDIpIEZvciB0aGUgaGlkZGVuIG9yIGRldGFjaGVkIGVsZW1lbnRcblx0Ly8gMykgRm9yIGJvZHkgb3IgaHRtbCBlbGVtZW50LCBpLmUuIGluIGNhc2Ugb2YgdGhlIGh0bWwgbm9kZSAtIGl0IHdpbGwgcmV0dXJuIGl0c2VsZlxuXHQvL1xuXHQvLyBidXQgdGhvc2UgZXhjZXB0aW9ucyB3ZXJlIG5ldmVyIHByZXNlbnRlZCBhcyBhIHJlYWwgbGlmZSB1c2UtY2FzZXNcblx0Ly8gYW5kIG1pZ2h0IGJlIGNvbnNpZGVyZWQgYXMgbW9yZSBwcmVmZXJhYmxlIHJlc3VsdHMuXG5cdC8vXG5cdC8vIFRoaXMgbG9naWMsIGhvd2V2ZXIsIGlzIG5vdCBndWFyYW50ZWVkIGFuZCBjYW4gY2hhbmdlIGF0IGFueSBwb2ludCBpbiB0aGUgZnV0dXJlXG5cdG9mZnNldFBhcmVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudDtcblxuXHRcdFx0d2hpbGUgKCBvZmZzZXRQYXJlbnQgJiYgalF1ZXJ5LmNzcyggb2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9mZnNldFBhcmVudCB8fCBkb2N1bWVudEVsZW1lbnQ7XG5cdFx0fSApO1xuXHR9XG59ICk7XG5cbi8vIENyZWF0ZSBzY3JvbGxMZWZ0IGFuZCBzY3JvbGxUb3AgbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgc2Nyb2xsTGVmdDogXCJwYWdlWE9mZnNldFwiLCBzY3JvbGxUb3A6IFwicGFnZVlPZmZzZXRcIiB9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuXHR2YXIgdG9wID0gXCJwYWdlWU9mZnNldFwiID09PSBwcm9wO1xuXG5cdGpRdWVyeS5mblsgbWV0aG9kIF0gPSBmdW5jdGlvbiggdmFsICkge1xuXHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBtZXRob2QsIHZhbCApIHtcblxuXHRcdFx0Ly8gQ29hbGVzY2UgZG9jdW1lbnRzIGFuZCB3aW5kb3dzXG5cdFx0XHR2YXIgd2luO1xuXHRcdFx0aWYgKCBpc1dpbmRvdyggZWxlbSApICkge1xuXHRcdFx0XHR3aW4gPSBlbGVtO1xuXHRcdFx0fSBlbHNlIGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0d2luID0gZWxlbS5kZWZhdWx0Vmlldztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB2YWwgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHdpbiA/IHdpblsgcHJvcCBdIDogZWxlbVsgbWV0aG9kIF07XG5cdFx0XHR9XG5cblx0XHRcdGlmICggd2luICkge1xuXHRcdFx0XHR3aW4uc2Nyb2xsVG8oXG5cdFx0XHRcdFx0IXRvcCA/IHZhbCA6IHdpbi5wYWdlWE9mZnNldCxcblx0XHRcdFx0XHR0b3AgPyB2YWwgOiB3aW4ucGFnZVlPZmZzZXRcblx0XHRcdFx0KTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbVsgbWV0aG9kIF0gPSB2YWw7XG5cdFx0XHR9XG5cdFx0fSwgbWV0aG9kLCB2YWwsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fTtcbn0gKTtcblxuLy8gU3VwcG9ydDogU2FmYXJpIDw9NyAtIDkuMSwgQ2hyb21lIDw9MzcgLSA0OVxuLy8gQWRkIHRoZSB0b3AvbGVmdCBjc3NIb29rcyB1c2luZyBqUXVlcnkuZm4ucG9zaXRpb25cbi8vIFdlYmtpdCBidWc6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yOTA4NFxuLy8gQmxpbmsgYnVnOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD01ODkzNDdcbi8vIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBwZXJjZW50IHdoZW4gc3BlY2lmaWVkIGZvciB0b3AvbGVmdC9ib3R0b20vcmlnaHQ7XG4vLyByYXRoZXIgdGhhbiBtYWtlIHRoZSBjc3MgbW9kdWxlIGRlcGVuZCBvbiB0aGUgb2Zmc2V0IG1vZHVsZSwganVzdCBjaGVjayBmb3IgaXQgaGVyZVxualF1ZXJ5LmVhY2goIFsgXCJ0b3BcIiwgXCJsZWZ0XCIgXSwgZnVuY3Rpb24oIGksIHByb3AgKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgcHJvcCBdID0gYWRkR2V0SG9va0lmKCBzdXBwb3J0LnBpeGVsUG9zaXRpb24sXG5cdFx0ZnVuY3Rpb24oIGVsZW0sIGNvbXB1dGVkICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0Y29tcHV0ZWQgPSBjdXJDU1MoIGVsZW0sIHByb3AgKTtcblxuXHRcdFx0XHQvLyBJZiBjdXJDU1MgcmV0dXJucyBwZXJjZW50YWdlLCBmYWxsYmFjayB0byBvZmZzZXRcblx0XHRcdFx0cmV0dXJuIHJudW1ub25weC50ZXN0KCBjb21wdXRlZCApID9cblx0XHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5wb3NpdGlvbigpWyBwcm9wIF0gKyBcInB4XCIgOlxuXHRcdFx0XHRcdGNvbXB1dGVkO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcbn0gKTtcblxuXG4vLyBDcmVhdGUgaW5uZXJIZWlnaHQsIGlubmVyV2lkdGgsIGhlaWdodCwgd2lkdGgsIG91dGVySGVpZ2h0IGFuZCBvdXRlcldpZHRoIG1ldGhvZHNcbmpRdWVyeS5lYWNoKCB7IEhlaWdodDogXCJoZWlnaHRcIiwgV2lkdGg6IFwid2lkdGhcIiB9LCBmdW5jdGlvbiggbmFtZSwgdHlwZSApIHtcblx0alF1ZXJ5LmVhY2goIHsgcGFkZGluZzogXCJpbm5lclwiICsgbmFtZSwgY29udGVudDogdHlwZSwgXCJcIjogXCJvdXRlclwiICsgbmFtZSB9LFxuXHRcdGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuXG5cdFx0Ly8gTWFyZ2luIGlzIG9ubHkgZm9yIG91dGVySGVpZ2h0LCBvdXRlcldpZHRoXG5cdFx0alF1ZXJ5LmZuWyBmdW5jTmFtZSBdID0gZnVuY3Rpb24oIG1hcmdpbiwgdmFsdWUgKSB7XG5cdFx0XHR2YXIgY2hhaW5hYmxlID0gYXJndW1lbnRzLmxlbmd0aCAmJiAoIGRlZmF1bHRFeHRyYSB8fCB0eXBlb2YgbWFyZ2luICE9PSBcImJvb2xlYW5cIiApLFxuXHRcdFx0XHRleHRyYSA9IGRlZmF1bHRFeHRyYSB8fCAoIG1hcmdpbiA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdHJ1ZSA/IFwibWFyZ2luXCIgOiBcImJvcmRlclwiICk7XG5cblx0XHRcdHJldHVybiBhY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIGRvYztcblxuXHRcdFx0XHRpZiAoIGlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdFx0XHQvLyAkKCB3aW5kb3cgKS5vdXRlcldpZHRoL0hlaWdodCByZXR1cm4gdy9oIGluY2x1ZGluZyBzY3JvbGxiYXJzIChnaC0xNzI5KVxuXHRcdFx0XHRcdHJldHVybiBmdW5jTmFtZS5pbmRleE9mKCBcIm91dGVyXCIgKSA9PT0gMCA/XG5cdFx0XHRcdFx0XHRlbGVtWyBcImlubmVyXCIgKyBuYW1lIF0gOlxuXHRcdFx0XHRcdFx0ZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSxcblx0XHRcdFx0XHQvLyB3aGljaGV2ZXIgaXMgZ3JlYXRlc3Rcblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblxuXHRcdFx0XHRcdC8vIEdldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnQsIHJlcXVlc3RpbmcgYnV0IG5vdCBmb3JjaW5nIHBhcnNlRmxvYXRcblx0XHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCB0eXBlLCBleHRyYSApIDpcblxuXHRcdFx0XHRcdC8vIFNldCB3aWR0aCBvciBoZWlnaHQgb24gdGhlIGVsZW1lbnRcblx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHR5cGUsIHZhbHVlLCBleHRyYSApO1xuXHRcdFx0fSwgdHlwZSwgY2hhaW5hYmxlID8gbWFyZ2luIDogdW5kZWZpbmVkLCBjaGFpbmFibGUgKTtcblx0XHR9O1xuXHR9ICk7XG59ICk7XG5cblxualF1ZXJ5LmVhY2goICggXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgcmVzaXplIHNjcm9sbCBjbGljayBkYmxjbGljayBcIiArXG5cdFwibW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgXCIgK1xuXHRcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgY29udGV4dG1lbnVcIiApLnNwbGl0KCBcIiBcIiApLFxuXHRmdW5jdGlvbiggaSwgbmFtZSApIHtcblxuXHQvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuXHRcdFx0dGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XG5cdFx0XHR0aGlzLnRyaWdnZXIoIG5hbWUgKTtcblx0fTtcbn0gKTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRob3ZlcjogZnVuY3Rpb24oIGZuT3ZlciwgZm5PdXQgKSB7XG5cdFx0cmV0dXJuIHRoaXMubW91c2VlbnRlciggZm5PdmVyICkubW91c2VsZWF2ZSggZm5PdXQgfHwgZm5PdmVyICk7XG5cdH1cbn0gKTtcblxuXG5cblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXG5cdGJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBudWxsLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmJpbmQ6IGZ1bmN0aW9uKCB0eXBlcywgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub2ZmKCB0eXBlcywgbnVsbCwgZm4gKTtcblx0fSxcblxuXHRkZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIHRoaXMub24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKTtcblx0fSxcblx0dW5kZWxlZ2F0ZTogZnVuY3Rpb24oIHNlbGVjdG9yLCB0eXBlcywgZm4gKSB7XG5cblx0XHQvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgP1xuXHRcdFx0dGhpcy5vZmYoIHNlbGVjdG9yLCBcIioqXCIgKSA6XG5cdFx0XHR0aGlzLm9mZiggdHlwZXMsIHNlbGVjdG9yIHx8IFwiKipcIiwgZm4gKTtcblx0fVxufSApO1xuXG4vLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcbi8vIGFyZ3VtZW50cy5cbi8vIGpRdWVyeS5wcm94eSBpcyBkZXByZWNhdGVkIHRvIHByb21vdGUgc3RhbmRhcmRzIChzcGVjaWZpY2FsbHkgRnVuY3Rpb24jYmluZClcbi8vIEhvd2V2ZXIsIGl0IGlzIG5vdCBzbGF0ZWQgZm9yIHJlbW92YWwgYW55IHRpbWUgc29vblxualF1ZXJ5LnByb3h5ID0gZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHR2YXIgdG1wLCBhcmdzLCBwcm94eTtcblxuXHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcInN0cmluZ1wiICkge1xuXHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0Y29udGV4dCA9IGZuO1xuXHRcdGZuID0gdG1wO1xuXHR9XG5cblx0Ly8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcblx0Ly8gdGhpcyB0aHJvd3MgYSBUeXBlRXJyb3IsIGJ1dCB3ZSB3aWxsIGp1c3QgcmV0dXJuIHVuZGVmaW5lZC5cblx0aWYgKCAhaXNGdW5jdGlvbiggZm4gKSApIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Ly8gU2ltdWxhdGVkIGJpbmRcblx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRwcm94eSA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmbi5hcHBseSggY29udGV4dCB8fCB0aGlzLCBhcmdzLmNvbmNhdCggc2xpY2UuY2FsbCggYXJndW1lbnRzICkgKSApO1xuXHR9O1xuXG5cdC8vIFNldCB0aGUgZ3VpZCBvZiB1bmlxdWUgaGFuZGxlciB0byB0aGUgc2FtZSBvZiBvcmlnaW5hbCBoYW5kbGVyLCBzbyBpdCBjYW4gYmUgcmVtb3ZlZFxuXHRwcm94eS5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuXHRyZXR1cm4gcHJveHk7XG59O1xuXG5qUXVlcnkuaG9sZFJlYWR5ID0gZnVuY3Rpb24oIGhvbGQgKSB7XG5cdGlmICggaG9sZCApIHtcblx0XHRqUXVlcnkucmVhZHlXYWl0Kys7XG5cdH0gZWxzZSB7XG5cdFx0alF1ZXJ5LnJlYWR5KCB0cnVlICk7XG5cdH1cbn07XG5qUXVlcnkuaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5qUXVlcnkucGFyc2VKU09OID0gSlNPTi5wYXJzZTtcbmpRdWVyeS5ub2RlTmFtZSA9IG5vZGVOYW1lO1xualF1ZXJ5LmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xualF1ZXJ5LmlzV2luZG93ID0gaXNXaW5kb3c7XG5qUXVlcnkuY2FtZWxDYXNlID0gY2FtZWxDYXNlO1xualF1ZXJ5LnR5cGUgPSB0b1R5cGU7XG5cbmpRdWVyeS5ub3cgPSBEYXRlLm5vdztcblxualF1ZXJ5LmlzTnVtZXJpYyA9IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0Ly8gQXMgb2YgalF1ZXJ5IDMuMCwgaXNOdW1lcmljIGlzIGxpbWl0ZWQgdG9cblx0Ly8gc3RyaW5ncyBhbmQgbnVtYmVycyAocHJpbWl0aXZlcyBvciBvYmplY3RzKVxuXHQvLyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGZpbml0ZSBudW1iZXJzIChnaC0yNjYyKVxuXHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblx0cmV0dXJuICggdHlwZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlID09PSBcInN0cmluZ1wiICkgJiZcblxuXHRcdC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChcIlwiKVxuXHRcdC8vIC4uLmJ1dCBtaXNpbnRlcnByZXRzIGxlYWRpbmctbnVtYmVyIHN0cmluZ3MsIHBhcnRpY3VsYXJseSBoZXggbGl0ZXJhbHMgKFwiMHguLi5cIilcblx0XHQvLyBzdWJ0cmFjdGlvbiBmb3JjZXMgaW5maW5pdGllcyB0byBOYU5cblx0XHQhaXNOYU4oIG9iaiAtIHBhcnNlRmxvYXQoIG9iaiApICk7XG59O1xuXG5cblxuXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcbi8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcbi8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxuLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXG4vLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cblxuLy8gTm90ZSB0aGF0IGZvciBtYXhpbXVtIHBvcnRhYmlsaXR5LCBsaWJyYXJpZXMgdGhhdCBhcmUgbm90IGpRdWVyeSBzaG91bGRcbi8vIGRlY2xhcmUgdGhlbXNlbHZlcyBhcyBhbm9ueW1vdXMgbW9kdWxlcywgYW5kIGF2b2lkIHNldHRpbmcgYSBnbG9iYWwgaWYgYW5cbi8vIEFNRCBsb2FkZXIgaXMgcHJlc2VudC4galF1ZXJ5IGlzIGEgc3BlY2lhbCBjYXNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanJidXJrZS9yZXF1aXJlanMvd2lraS9VcGRhdGluZy1leGlzdGluZy1saWJyYXJpZXMjd2lraS1hbm9uXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnk7XG5cdH0gKTtcbn1cblxuXG5cblxudmFyXG5cblx0Ly8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG5cdC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF8kID0gd2luZG93LiQ7XG5cbmpRdWVyeS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oIGRlZXAgKSB7XG5cdGlmICggd2luZG93LiQgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cuJCA9IF8kO1xuXHR9XG5cblx0aWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnk7XG59O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluIEFNRFxuLy8gKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuaWYgKCAhbm9HbG9iYWwgKSB7XG5cdHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IGpRdWVyeTtcbn1cblxuXG5cblxucmV0dXJuIGpRdWVyeTtcbn0gKTtcbiJdLCJmaWxlIjoianF1ZXJ5LnNsaW0uanMifQ==