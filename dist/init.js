"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var cwd, configFile, inquirerRes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cwd = process.cwd();
            configFile = _path2.default.resolve(cwd, _config.configFileName);
            _context.next = 4;
            return (0, _inquireAction.inquirerOverwrite)(configFile);

          case 4:
            inquirerRes = _context.sent;

            if (inquirerRes) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _fsExtra2.default.outputFile(configFile, (0, _json.prettierContent)("" + (0, _dedent2.default)(_templateObject, _config.defaultConfigTmp)));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

var _templateObject = (0, _taggedTemplateLiteral3.default)(["", ""], ["", ""]);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _dedent = require("dedent");

var _dedent2 = _interopRequireDefault(_dedent);

var _config = require("./config");

var _inquireAction = require("./unit/inquireAction");

var _json = require("./unit/json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.init = init;
//# sourceMappingURL=init.js.map