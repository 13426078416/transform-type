import path from "path";
import fs from "fs-extra";
import dedent from "dedent";
import inquirer from "inquirer";
import chalk from "chalk";
import { configFileName } from "./config";

async function init() {
  const cwd = process.cwd();
  const configFile = path.resolve(cwd, configFileName);
  if (fs.existsSync(configFile)) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `config file ${chalk.cyan(
          configFile
        )} already exists. Pick an action:`,
        choices: [
          {
            name: "Overwrite",
            value: "Overwrite",
          },
          {
            name: "Cancel",
            value: false,
          },
        ],
      },
    ]);
    if (!action) {
      return;
    }
    if (action === "Overwrite") {
      console.log(`\nRemoving ${chalk.cyan(configFile)}...`);
      await fs.remove(configFile);
      console.log(`\nRemoved`);
    }
  }
  fs.outputFile(
    configFile,
    dedent`
    module.exports = {
        output: "api/service"
    }
  `
  );
}
export { init };
