import chalk from "chalk";
import { Command } from "commander";
import {} from "hygen";
import packageJson from "../package.json";

const genChainByTemplate = (str: any, options: any) => {
  console.log(
    chalk.green("Generating a new chain using template"),
    str,
    options
  );
};

const run = () => {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .description("CLI for XDEFI Wallet chain management");

  program
    .command("generate")
    .description("Generate a new project for chain with specified template")
    .argument("<name>", "chain name")
    .option("--template", "Use template for a new chain (e.g. evm)")
    .action(genChainByTemplate);

  program.parse(process.argv);
};

run();
