"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.invalidError = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var invalidError = new Error("Invalid ajax http client. `axios/fetch/request` supported");
exports.invalidError = invalidError;

var IHttp =
/*#__PURE__*/
function () {
  function IHttp(client) {
    _classCallCheck(this, IHttp);

    this.client = client;
  }

  _createClass(IHttp, [{
    key: "request",
    value: function request() {
      throw invalidError;
    }
  }]);

  return IHttp;
}();

exports["default"] = IHttp;