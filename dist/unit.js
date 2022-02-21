"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonSchemaToType = undefined;

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

/**
 * jsonSchema转为type
 * @param {*} jsonSchema
 * @param {*} typeName string
 * @returns
 */
var jsonSchemaToType = exports.jsonSchemaToType = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(jsonSchema, typeName) {
    var fakeTypeName, code;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!jsonSchema || (0, _keys2.default)(jsonSchema).length === 0)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", "export interface " + typeName + " {}");

          case 2:
            fakeTypeName = ("FAKE" + (0, _vtils.random)()).toUpperCase();
            _context.next = 5;
            return (0, _jsonSchemaToTypescript.compile)(jsonSchema, fakeTypeName, JSTTOptions);

          case 5:
            code = _context.sent;
            return _context.abrupt("return", code.replace(fakeTypeName, typeName).trim());

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function jsonSchemaToType(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// 美化代码格式


exports.getDataTypeName = getDataTypeName;
exports.dataTypeGenerator = dataTypeGenerator;
exports.prettierContent = prettierContent;
exports.getDataTypes = getDataTypes;

var _jsonSchemaToTypescript = require("json-schema-to-typescript");

var _jsonSchemaGenerator = require("json-schema-generator");

var _jsonSchemaGenerator2 = _interopRequireDefault(_jsonSchemaGenerator);

var _vtils = require("vtils");

var _prettier = require("prettier");

var _prettier2 = _interopRequireDefault(_prettier);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultPrettierConfig = {
  parser: "typescript",
  trailingComma: "all",
  printWidth: 100,
  arrowParens: "always",
  jsxBracketSameLine: false,
  endOfLine: "lf",
  proseWrap: "always"
};
var JSTTOptions = {
  bannerComment: "",
  style: defaultPrettierConfig
};

/**
 * 转为驼峰
 * @param {*} typeName string
 * @returns
 */
function getDataTypeName(typeName) {
  var dataTypeName = typeName.replace(/[\-_]([A-z])/g, function (_, $1) {
    return $1.toUpperCase();
  });
  return dataTypeName.trim().replace(/^(.)/, function (_, $1) {
    return $1.toUpperCase();
  });
}

function processJsonSchema(jsonSchema) {
  if (!jsonSchema || (typeof jsonSchema === "undefined" ? "undefined" : (0, _typeof3.default)(jsonSchema)) !== "object") return jsonSchema;
  delete jsonSchema.title;
  delete jsonSchema.id;
  delete jsonSchema.minItems;
  delete jsonSchema.maxItems;
  jsonSchema.additionalProperties = false;
  if (jsonSchema.properties) {
    (0, _vtils.forOwn)(jsonSchema.properties, function (_, prop) {
      var propDef = jsonSchema.properties[prop];
      delete jsonSchema.properties[prop];
      jsonSchema.properties[prop.trim()] = propDef;
    });
    jsonSchema.required = jsonSchema.required && jsonSchema.required.map(function (prop) {
      return prop.trim();
    });
  }

  if (jsonSchema.properties) {
    (0, _vtils.forOwn)(jsonSchema.properties, processJsonSchema);
  }

  if (jsonSchema.items) {
    (0, _vtils.castArray)(jsonSchema.items).forEach(processJsonSchema);
  }

  return jsonSchema;
}

// 格式化jsonSchema
function dataTypeGenerator(json) {
  return processJsonSchema(json);
}function prettierContent(params) {
  return _prettier2.default.format(params, defaultPrettierConfig);
}

/**
 * 获取文件内容的列表
 * @param {*} files 读取dir下边的文件列表
 * @param {*} dir // dir文件目录path
 * @returns Promise[]
 */
function getDataTypes(files, dir) {
  var _this = this;

  var getType = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(jsonSchema, data) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new _promise2.default(function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve) {
                  var content;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return jsonSchemaToType(jsonSchema, data.typeName);

                        case 2:
                          content = _context2.sent;

                          resolve((0, _extends3.default)({}, data, { data: content }));

                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                }));

                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function getType(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
  return files.reduce(function (res, childPath) {
    var childFilePath = _path2.default.resolve(dir, childPath);
    var content = require(childFilePath);
    (0, _entries2.default)(content).forEach(function (_ref4) {
      var _ref5 = (0, _slicedToArray3.default)(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

      var fileName = childPath.replace(/\.[A-z0-9]+$/, ""); // 去掉文件后缀
      var typeName = getDataTypeName(key); // 转为驼峰
      var jsonSchema = dataTypeGenerator((0, _jsonSchemaGenerator2.default)(value));
      res.push(getType(jsonSchema, {
        fileName: fileName,
        typeName: typeName
      }));
    });
    return res;
  }, []);
}
//# sourceMappingURL=unit.js.map