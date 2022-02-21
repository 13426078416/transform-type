import { compile } from "json-schema-to-typescript";
import { castArray, forOwn, random } from "vtils";
import prettier from "prettier";
const defaultPrettierConfig = {
  parser: "typescript",
  trailingComma: "all",
  printWidth: 100,
  arrowParens: "always",
  jsxBracketSameLine: false,
  endOfLine: "lf",
  proseWrap: "always",
};
const JSTTOptions = {
  bannerComment: "",
  style: defaultPrettierConfig,
};

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
export function dataTypeGenerator(json) {
  return processJsonSchema(json);
}

export async function jsonSchemaToType(jsonSchema, typeName) {
  if (!jsonSchema || Object.keys(jsonSchema).length === 0) {
    return `export interface ${typeName} {}`;
  }
  const fakeTypeName = `FAKE${random()}`.toUpperCase();
  const code = await compile(jsonSchema, fakeTypeName, JSTTOptions);
  return code.replace(fakeTypeName, typeName).trim();
}
export function prettierContent(params) {
  return prettier.format(params, defaultPrettierConfig);
}
