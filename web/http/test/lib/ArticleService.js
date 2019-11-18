"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _HttpClient2 = _interopRequireWildcard(require("../../lib/HttpClient"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ArticleService = (_dec = (0, _HttpClient2.Controller)('/articles'), _dec2 = (0, _HttpClient2.POST)(), _dec3 = (0, _HttpClient2.RequestOptions)({
  withCredentials: true
}), _dec4 = (0, _HttpClient2.DELETE)('/:id'), _dec5 = (0, _HttpClient2.Headers)({
  'X-TOKEN': 'x-token'
}), _dec6 = (0, _HttpClient2.PATCH)('/:id'), _dec7 = (0, _HttpClient2.GET)(), _dec8 = (0, _HttpClient2.GET)(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_HttpClient) {
  _inherits(ArticleService, _HttpClient);

  function ArticleService() {
    _classCallCheck(this, ArticleService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ArticleService).call(this, _axios["default"]));
  }

  _createClass(ArticleService, [{
    key: "createArticle",
    value: function createArticle(body) {}
  }, {
    key: "deleteArticle",
    value: function deleteArticle(id) {}
  }, {
    key: "updateArticle",
    value: function updateArticle(id, body) {}
  }, {
    key: "fetchArticles",
    value: function fetchArticles(author, since) {}
  }, {
    key: "searchArticles",
    value: function searchArticles(label, pager, active, optional) {}
  }]);

  (0, _HttpClient2.Query)('optional')(ArticleService.prototype, "searchArticles", 3);
  (0, _HttpClient2.Query)('active')(ArticleService.prototype, "searchArticles", 2);
  (0, _HttpClient2.Query)('pager')(ArticleService.prototype, "searchArticles", 1);
  (0, _HttpClient2.Query)('label')(ArticleService.prototype, "searchArticles", 0);
  (0, _HttpClient2.Query)('since')(ArticleService.prototype, "fetchArticles", 1);
  (0, _HttpClient2.Query)('author')(ArticleService.prototype, "fetchArticles", 0);
  (0, _HttpClient2.Body)(ArticleService.prototype, "updateArticle", 1);
  (0, _HttpClient2.Path)('id')(ArticleService.prototype, "updateArticle", 0);
  (0, _HttpClient2.Path)('id')(ArticleService.prototype, "deleteArticle", 0);
  (0, _HttpClient2.Body)(ArticleService.prototype, "createArticle", 0);
  return ArticleService;
}(_HttpClient2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "createArticle", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "createArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteArticle", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateArticle", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "updateArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchArticles", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchArticles"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchArticles", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "searchArticles"), _class2.prototype)), _class2)) || _class);
exports["default"] = ArticleService;