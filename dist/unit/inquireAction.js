"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inquirerOverwrite = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var inquirerOverwrite = exports.inquirerOverwrite = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filePath, hasMerge) {
    var _ref2, action;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (_fsExtra2.default.existsSync(filePath)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", true);

          case 2:
            _context.next = 4;
            return _inquirer2.default.prompt([{
              type: "list",
              name: "action",
              message: "entry dir " + _chalk2.default.cyan(filePath) + " already  exists. Pick an action:",
              choices: [{ name: "Overwrite", value: "overwrite" }].concat((0, _toConsumableArray3.default)(hasMerge && [{ name: "Merge", value: "merge" }] || []), [{ name: "Cancel", value: false }])
            }]);

          case 4:
            _ref2 = _context.sent;
            action = _ref2.action;

            if (action) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", false);

          case 8:
            if (action === "overwrite") {
              console.log("\nRemoving " + _chalk2.default.cyan(filePath) + "...");
              _fsExtra2.default.removeSync(filePath);
              console.log();
            }
            return _context.abrupt("return", true);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function inquirerOverwrite(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=inquireAction.js.map