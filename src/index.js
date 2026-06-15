#!/usr/bin/env node

import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { execSync } from "child_process";
import readline from "readline";
import { LLMHelper } from "../lib/llm.js";
import { CHANNELS, formatForChannel } from "../lib/channels.js";
import { readFromStdin, readFromFile, interactiveMode, hasStdinInput } from "../lib/input.js";
import { TONES } from "../lib/tones.js";

dotenv.config();

function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execSync("gh auth token", { stdio: ["pipe", "pipe", "pipe"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

const apiKey = resolveToken();

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option("tone", {
      alias: "t",
      describe: `Tone of voice: ${Object.keys(TONES).join(", ")}`,
      type: "string",
      default: process.env.DEFAULT_TONE || "mixed",
    })
    .option("channel", {
      alias: "c",
      describe: `Target platform: ${Object.keys(CHANNELS).join(", ")}`,
      type: "string",
      default: process.env.DEFAULT_CHANNEL || "slack",
    })
    .option("context", {
      alias: "x",
      describe: "Additional context for the LLM",
      type: "string",
    })
    .option("file", {
      alias: "f",
      describe: "Read input from file",
      type: "string",
    })
    .option("brainstorm", {
      alias: "b",
      describe: "Brainstorm mode: generate ideas for a topic",
      type: "boolean",
    })
    .option("interactive", {
      alias: "i",
      describe: "Interactive mode with prompts",
      type: "boolean",
    })
    .option("iterate", {
      alias: "r",
      describe: "Iterate on outputs in-session (terminal only, no persistence)",
      type: "boolean",
    })
    .help()
    .alias("help", "h")
    .example("$0 'draft message here' -t casual -c slack", "Quick write with options")
    .example("echo 'draft' | $0 -t professional -c email", "Pipe from stdin")
    .example("$0 -f message.txt -t silly -c github", "Read from file")
    .example("$0 -i", "Interactive mode")
    .example("$0 'draft message' -r", "Generate then iteratively refine in-session").argv;

  if (!apiKey) {
    console.error(chalk.red("❌ No GitHub token found."));
    console.error(chalk.yellow("Either:"));
    console.error(chalk.yellow("  1. Run: gh auth login"));
    console.error(chalk.yellow("  2. Or add GITHUB_TOKEN=... to your .env file"));
    process.exit(1);
  }

  try {
    const helper = new LLMHelper(apiKey, process.env.LLM_MODEL || "gpt-4o-mini");

    let input;
    let tone = argv.tone;
    let channel = argv.channel;
    let context = argv.context || "";

    // Determine input source
    if (argv.interactive) {
      const result = await interactiveMode();
      input = result.input;
      tone = result.tone;
      channel = result.channel;
      context = result.context;
    } else if (argv.file) {
      input = await readFromFile(argv.file);
    } else if (hasStdinInput()) {
      input = await readFromStdin();
    } else if (argv._[0]) {
      input = String(argv._[0]);
    } else {
      console.log(chalk.blue("No input provided. Use -i for interactive mode."));
      console.log("Type --help for usage examples.");
      process.exit(0);
    }

    const printResult = (text, currentTone, currentChannel) => {
      const formatted = formatForChannel(text, currentChannel);

      console.log(chalk.green("━".repeat(50)));
      console.log(chalk.bold.blue(`📮 ${CHANNELS[currentChannel].name} Message`));
      console.log(chalk.dim(`Tone: ${TONES[currentTone].description}`));
      console.log(chalk.green("━".repeat(50)));
      console.log("\n" + formatted + "\n");
      console.log(chalk.green("━".repeat(50)));
    };

    const askQuestion = async (prompt) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise((resolve) => {
        rl.question(prompt, (value) => resolve(value.trim()));
      });

      rl.close();
      return answer;
    };

    const runImprove = async (draft, extraContext = "") => {
      console.log(chalk.dim(`\n✨ Thinking with ${process.env.LLM_MODEL || "gpt-4o-mini"}...\n`));
      return helper.improve(draft, tone, channel, extraContext);
    };

    let result;
    if (argv.brainstorm) {
      console.log(chalk.dim(`\n✨ Thinking with ${process.env.LLM_MODEL || "gpt-4o-mini"}...\n`));
      result = await helper.brainstorm(input, tone, channel);
    } else {
      result = await runImprove(input, context);
    }

    printResult(result, tone, channel);

    if (!argv.brainstorm && (argv.interactive || argv.iterate)) {
      let currentResult = result;
      let done = false;

      while (!done) {
        const action = (await askQuestion(
          "\nAction: [a]ccept, [r]efine, [n]ew draft, [q]uit [a]: "
        )).toLowerCase() || "a";

        if (action === "a") {
          done = true;
          break;
        }

        if (action === "q") {
          console.log(chalk.dim("Session ended. Nothing was saved."));
          process.exit(0);
        }

        if (action === "n") {
          const newDraft = await askQuestion("\nPaste new draft:\n> ");
          if (!newDraft) {
            console.log(chalk.yellow("No new draft entered. Keeping current result."));
            continue;
          }
          currentResult = await runImprove(newDraft, context);
          printResult(currentResult, tone, channel);
          continue;
        }

        if (action === "r") {
          const refineInstruction = await askQuestion("\nWhat should change?\n> ");
          if (!refineInstruction) {
            console.log(chalk.yellow("No refinement provided. Keeping current result."));
            continue;
          }

          const refineContext = [
            context,
            `Refinement request: ${refineInstruction}`,
            "Treat the input as the current draft. Apply only the requested changes and return only the revised message.",
          ]
            .filter(Boolean)
            .join("\n");

          currentResult = await runImprove(currentResult, refineContext);
          printResult(currentResult, tone, channel);
          continue;
        }

        console.log(chalk.yellow("Unknown action. Choose a, r, n, or q."));
      }
    }

    console.log(chalk.dim("💡 Tip: Copy this to your clipboard or save it!"));

  } catch (error) {
    console.error(chalk.red("❌ Error:"), error.message);
    process.exit(1);
  }
}

main();
