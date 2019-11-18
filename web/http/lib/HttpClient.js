"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestOptions = RequestOptions;
exports.Controller = exports.OPTIONS = exports.PATCH = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.Body = exports.Header = exports.Query = exports.Path = exports.Headers = exports["default"] = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

var _HttpFactory = _interopRequireDefault(require("./Http/HttpFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HttpClient =
/*#__PURE__*/
function () {
  function HttpClient() {
    var engine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HttpClient.defaults.engine;

    _classCallCheck(this, HttpClient);

    this.http = _HttpFactory["default"].resolve(engine);
  }

  _createClass(HttpClient, [{
    key: "getBaseURL",
    value: function getBaseURL() {
      return HttpClient.defaults.baseURL;
    }
  }]);

  return HttpClient;
}();

exports["default"] = HttpClient;
HttpClient.defaults = {
  baseURL: null,
  engine: null
};

function isNullOrUndefined(value) {
  return value == undefined;
}

function isObject(value) {
  return !isNullOrUndefined(value) && _typeof(value) === 'object';
}

function brewByPath(target, methodName, url, args) {
  var pathMetadata = target["".concat(methodName, "_Path_parameters")] || [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = pathMetadata[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var param = _step.value;
      url = url.replace(":".concat(param.key), args[param.paramIndex]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return url;
}

function brewByQuery(target, methodName, url, args) {
  var queryMetadata = target["".concat(methodName, "_Query_parameters")] || [];

  var URI = _queryString["default"].parseUrl(url);

  var urlQuery = URI.query;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var param = _step2.value;
      var key = param.key;
      var value = args[param.paramIndex];

      if (value instanceof Date) {
        urlQuery[key] = value.getTime().toString();
      } else if (Array.isArray(value)) {
        urlQuery[key] = value.map(function (item) {
          return item;
        }).join(',');
      } else if (isObject(value)) {
        Object.keys(value).filter(function (k) {
          return value[k] !== undefined;
        }).forEach(function (k) {
          urlQuery[k] = value[k];
        });
      } else if (!isNullOrUndefined(value)) {
        urlQuery[key] = value.toString();
      } else {
        urlQuery[key] = '';
      }
    };

    for (var _iterator2 = queryMetadata[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var stringifiedQueries = _queryString["default"].stringify(urlQuery);

  return stringifiedQueries ? "".concat(URI.url, "?").concat(stringifiedQueries) : URI.url;
}

function brewByBody(target, methodName, args) {
  var body = null;
  var bodyMetadata = target["".concat(methodName, "_Body_parameters")];

  if (bodyMetadata) {
    body = args[bodyMetadata[0].paramIndex];
  }

  return body;
}

function brewByHeader(target, methodName, args) {
  var headers = {};
  var headerMetadata = target["".concat(methodName, "_Header_parameters")] || [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = headerMetadata[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var param = _step3.value;
      var key = param.key;
      var value = args[param.paramIndex];
      headers[key] = value;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return headers;
}

function brewByOptions(url, options) {
  var URI = _queryString["default"].parseUrl(url);

  var urlQuery = URI.query;
  var params = options ? options.params || {} : {};
  Object.keys(params).forEach(function (key) {
    urlQuery[key] = params[key].toString();
  });

  var stringifiedQueries = _queryString["default"].stringify(urlQuery);

  return stringifiedQueries ? "".concat(URI.url, "?").concat(stringifiedQueries) : URI.url;
}

function methodBuilder(method) {
  return function () {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return function (target, methodName, descriptor) {
      descriptor.value = function () {
        var pathPrefix = target['path_prefix'] || '';
        var realURL = "".concat(pathPrefix).concat(url); // RequestOptions

        var options = descriptor.requestOptions; // Path

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        realURL = brewByPath(target, methodName, realURL, args); // Query

        realURL = brewByQuery(target, methodName, realURL, args); // Options

        realURL = brewByOptions(realURL, options); // Body

        var body = brewByBody(target, methodName, args); // Header

        var headers = brewByHeader(target, methodName, args);

        var _ref = options || {},
            _ref$headers = _ref.headers,
            headersOption = _ref$headers === void 0 ? {} : _ref$headers,
            credentials = _ref.credentials,
            withCredentials = _ref.withCredentials,
            otherOptions = _objectWithoutProperties(_ref, ["headers", "credentials", "withCredentials"]);

        var baseURL = this.getBaseURL() || this.http.client.defaults && this.http.client.defaults.baseURL;
        return this.http.request(_objectSpread({
          method: method,
          url: realURL,
          data: body,
          headers: _objectSpread({}, headers, {}, headersOption)
        }, otherOptions, {
          baseURL: baseURL,
          credentials: credentials || withCredentials
        }));
      };

      return descriptor;
    };
  };
}

function paramBuilder(type) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (key) {
    if (!optional && !key) {
      throw new Error('Param key required!');
    }

    return function (target, methodName, paramIndex) {
      var metadataKey = "".concat(methodName, "_").concat(type, "_parameters");
      target[metadataKey] = [].concat(_toConsumableArray(target[metadataKey] || []), [{
        key: key,
        paramIndex: paramIndex
      }]);
    };
  };
}

function RequestOptions(options) {
  return function (target, propertyKey, descriptor) {
    var defaultOptions = {
      responseType: 'json'
    };
    descriptor.requestOptions = _objectSpread({}, defaultOptions, {}, descriptor.requestOptions, {}, options);
    return descriptor;
  };
}

var Headers = function Headers(headers) {
  return RequestOptions({
    headers: headers
  });
};

exports.Headers = Headers;
var Path = paramBuilder('Path');
exports.Path = Path;
var Query = paramBuilder('Query');
exports.Query = Query;
var Header = paramBuilder('Header');
exports.Header = Header;
var Body = paramBuilder('Body', true)();
exports.Body = Body;
var GET = methodBuilder('GET');
exports.GET = GET;
var POST = methodBuilder('POST');
exports.POST = POST;
var PUT = methodBuilder('PUT');
exports.PUT = PUT;
var DELETE = methodBuilder('DELETE');
exports.DELETE = DELETE;
var PATCH = methodBuilder('PATCH');
exports.PATCH = PATCH;
var OPTIONS = methodBuilder('OPTIONS');
exports.OPTIONS = OPTIONS;

var Controller = function Controller() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (target) {
    target.prototype['path_prefix'] = prefix;
  };
};

exports.Controller = Controller;