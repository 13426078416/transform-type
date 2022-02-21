import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";

export async function inquirerOverwrite(filePath, hasMerge) {
  if (!fs.existsSync(filePath)) return true;
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: `entry dir ${chalk.cyan(
        filePath
      )} already  exists. Pick an action:`,
      choices: [
        { name: "Overwrite", value: "overwrite" },
        ...((hasMerge && [{ name: "Merge", value: "merge" }]) || []),
        { name: "Cancel", value: false },
      ],
    },
  ]);
  if (!action) return false;
  if (action === "overwrite") {
    console.log(`\nRemoving ${chalk.cyan(filePath)}...`);
    fs.removeSync(filePath);
    console.log();
  }
  return true;
}
