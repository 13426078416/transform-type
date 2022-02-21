import { compile } from "json-schema-to-typescript";
import jsonSchemaGenerator from "json-schema-generator";
import { castArray, forOwn, random } from "vtils";
import prettier from "prettier";
import path from "path";
import { defaultPrettierConfig, JSTTOptions } from "../config";

/**
 * 转为驼峰
 * @param {*} typeName string
 * @returns
 */
export function getDataTypeName(typeName) {
  const dataTypeName = typeName.replace(/[\-_]([A-z])/g, (_, $1) => {
    return $1.toUpperCase();
  });
  return dataTypeName.trim().replace(/^(.)/, (_, $1) => $1.toUpperCase());
}

function processJsonSchema(jsonSchema) {
  if (!jsonSchema || typeof jsonSchema !== "object") return jsonSchema;
  delete jsonSchema.title;
  delete jsonSchema.id;
  delete jsonSchema.minItems;
  delete jsonSchema.maxItems;
  jsonSchema.additionalProperties = false;
  if (jsonSchema.properties) {
    forOwn(jsonSchema.properties, (_, prop) => {
      const propDef = jsonSchema.properties[prop];
      delete jsonSchema.properties[prop];
      jsonSchema.properties[prop.trim()] = propDef;
    });
    jsonSchema.required =
      jsonSchema.required && jsonSchema.required.map((prop) => prop.trim());
  }

  if (jsonSchema.properties) {
    forOwn(jsonSchema.properties, processJsonSchema);
  }

  if (jsonSchema.items) {
    castArray(jsonSchema.items).forEach(processJsonSchema);
  }

  return jsonSchema;
}

// 格式化jsonSchema
export function dataTypeGenerator(json) {
  return processJsonSchema(json);
}

/**
 * jsonSchema转为type
 * @param {*} jsonSchema
 * @param {*} typeName string
 * @returns
 */
export async function jsonSchemaToType(jsonSchema, typeName) {
  if (!jsonSchema || Object.keys(jsonSchema).length === 0) {
    return `export interface ${typeName} {}`;
  }
  const fakeTypeName = `FAKE${random()}`.toUpperCase();
  const code = await compile(jsonSchema, fakeTypeName, JSTTOptions);
  return code.replace(fakeTypeName, typeName).trim();
}
// 美化代码格式
export function prettierContent(params) {
  return prettier.format(params, defaultPrettierConfig);
}

/**
 * 获取文件内容的列表
 * @param {*} files 读取dir下边的文件列表
 * @param {*} dir // dir文件目录path
 * @returns Promise[]
 */
export function getDataTypes(files, dir) {
  const getType = async (jsonSchema, data) => {
    return new Promise(async (resolve) => {
      const content = await jsonSchemaToType(jsonSchema, data.typeName);
      resolve({ ...data, data: content });
    });
  };
  return files.reduce((res, childPath) => {
    const childFilePath = path.resolve(dir, childPath);
    const content = require(childFilePath);
    Object.entries(content).forEach(([key, value]) => {
      const fileName = childPath.replace(/\.[A-z0-9]+$/, ""); // 去掉文件后缀
      const typeName = getDataTypeName(key); // 转为驼峰
      const jsonSchema = dataTypeGenerator(jsonSchemaGenerator(value));
      res.push(
        getType(jsonSchema, {
          fileName,
          typeName,
        })
      );
    });
    return res;
  }, []);
}
