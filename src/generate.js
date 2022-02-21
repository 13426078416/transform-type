import {
  configFileName,
  defaultConfig,
  entryFileTmp,
  outputFileTmp,
} from "./config";
import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import { getDataTypes, prettierContent } from "./unit/json";
import dedent from "dedent";
import { inquirerOverwrite } from "./unit/inquireAction";

export class Generate {
  constructor() {
    this.configFilName = configFileName;
    this.path = process.cwd();
    this.filePath = path.resolve(this.path, this.configFilName);
    this.config = this.resolveConfig();
  }
  async init() {
    const outPath = `${this.path}${this.config.output}`;
    const inquirerRes = await inquirerOverwrite(outPath, true);
    if (!inquirerRes) return;
    this.generate();
  }
  async generate() {
    const entryDir = `${this.path}${this.config.entry}`;
    const outDir = `${this.path}${this.config.output}`;
    let files;
    try {
      files = await fs.readdirSync(entryDir);
    } catch (error) {
      console.error(error);
    }
    if (!files) {
      console.error("File directory does not exist");
      return;
    }
    let data;
    try {
      data = await Promise.all(getDataTypes(files, entryDir));
    } catch (error) {
      console.error(error);
    }
    if (!data) console.error("Failed to get type file correctly");
    const newData = data.reduce((res, cur) => {
      if (!res[cur.fileName]) res[cur.fileName] = [];
      res[cur.fileName].push(cur.data);
      return res;
    }, {});
    Object.entries(newData).forEach(([key, value]) => {
      const filePath = path.resolve(`${outDir}`, `${key}.ts`);
      //   if (!fs.existsSync(filePath)) fs.createFileSync(filePath);
      const finalContent = `${dedent`${outputFileTmp(
        key,
        value.join("\n")
      )}`}\n`;
      const res = fs.outputFileSync(filePath, prettierContent(finalContent));
    });
  }
  resolveConfig() {
    let config = require(this.filePath);
    if (!config) {
      console.error(
        `Error load ${chalk.bold(
          `${this.configFilName}`
        )}: should export an object \n`
      );
      config = defaultConfig;
    }
    return config;
  }
  async createEntry(name) {
    const filePath = path.resolve(`${this.path}${this.config.entry}`, name);
    const inquirerRes = await inquirerOverwrite(filePath);
    if (!inquirerRes) return;
    fs.outputFileSync(filePath, prettierContent(`${dedent`${entryFileTmp}`}`));
  }
}
