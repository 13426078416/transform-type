"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Generate = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["", ""], ["", ""]);

var _config = require("./config");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _json = require("./unit/json");

var _dedent = require("dedent");

var _dedent2 = _interopRequireDefault(_dedent);

var _inquireAction = require("./unit/inquireAction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Generate = exports.Generate = function () {
  function Generate() {
    (0, _classCallCheck3.default)(this, Generate);

    this.configFilName = _config.configFileName;
    this.path = process.cwd();
    this.filePath = _path2.default.resolve(this.path, this.configFilName);
    this.config = this.resolveConfig();
  }

  (0, _createClass3.default)(Generate, [{
    key: "init",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var outPath, inquirerRes;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                outPath = "" + this.path + this.config.output;
                _context.next = 3;
                return (0, _inquireAction.inquirerOverwrite)(outPath, true);

              case 3:
                inquirerRes = _context.sent;

                if (inquirerRes) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                this.generate();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "generate",
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var entryDir, outDir, files, data, newData;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                entryDir = "" + this.path + this.config.entry;
                outDir = "" + this.path + this.config.output;
                files = void 0;
                _context2.prev = 3;
                _context2.next = 6;
                return _fsExtra2.default.readdirSync(entryDir);

              case 6:
                files = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);

                console.error(_context2.t0);

              case 12:
                if (files) {
                  _context2.next = 15;
                  break;
                }

                console.error("File directory does not exist");
                return _context2.abrupt("return");

              case 15:
                data = void 0;
                _context2.prev = 16;
                _context2.next = 19;
                return _promise2.default.all((0, _json.getDataTypes)(files, entryDir));

              case 19:
                data = _context2.sent;
                _context2.next = 25;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t1 = _context2["catch"](16);

                console.error(_context2.t1);

              case 25:
                if (!data) console.error("Failed to get type file correctly");
                newData = data.reduce(function (res, cur) {
                  if (!res[cur.fileName]) res[cur.fileName] = [];
                  res[cur.fileName].push(cur.data);
                  return res;
                }, {});

                (0, _entries2.default)(newData).forEach(function (_ref3) {
                  var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
                      key = _ref4[0],
                      value = _ref4[1];

                  var filePath = _path2.default.resolve("" + outDir, key + ".ts");
                  //   if (!fs.existsSync(filePath)) fs.createFileSync(filePath);
                  var finalContent = (0, _dedent2.default)(_templateObject, (0, _config.outputFileTmp)(key, value.join("\n"))) + "\n";
                  var res = _fsExtra2.default.outputFileSync(filePath, (0, _json.prettierContent)(finalContent));
                });

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9], [16, 22]]);
      }));

      function generate() {
        return _ref2.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: "resolveConfig",
    value: function resolveConfig() {
      var config = require(this.filePath);
      if (!config) {
        console.error("Error load " + _chalk2.default.bold("" + this.configFilName) + ": should export an object \n");
        config = _config.defaultConfig;
      }
      return config;
    }
  }, {
    key: "createEntry",
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(name) {
        var filePath, inquirerRes;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                filePath = _path2.default.resolve("" + this.path + this.config.entry, name);
                _context3.next = 3;
                return (0, _inquireAction.inquirerOverwrite)(filePath);

              case 3:
                inquirerRes = _context3.sent;

                if (inquirerRes) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return");

              case 6:
                _fsExtra2.default.outputFileSync(filePath, (0, _json.prettierContent)("" + (0, _dedent2.default)(_templateObject, _config.entryFileTmp)));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createEntry(_x) {
        return _ref5.apply(this, arguments);
      }

      return createEntry;
    }()
  }]);
  return Generate;
}();
//# sourceMappingURL=generate.js.map