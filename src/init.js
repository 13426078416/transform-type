import path from "path";
import fs from "fs-extra";
import dedent from "dedent";
import { configFileName, defaultConfigTmp } from "./config";
import { inquirerOverwrite } from "./unit/inquireAction";
import { prettierContent } from "./unit/json";

async function init() {
  const cwd = process.cwd();
  const configFile = path.resolve(cwd, configFileName);

  const inquirerRes = await inquirerOverwrite(configFile);
  if (!inquirerRes) return;
  fs.outputFile(configFile, prettierContent(`${dedent`${defaultConfigTmp}`}`));
}
export { init };
