import fs from "fs/promises";
import readline from "readline";

// Read from stdin
export async function readFromStdin() {
  return new Promise((resolve) => {
    let data = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      resolve(data.trim());
    });
  });
}

// Read from file
export async function readFromFile(filepath) {
  try {
    return await fs.readFile(filepath, "utf-8");
  } catch (error) {
    throw new Error(`Failed to read file ${filepath}: ${error.message}`);
  }
}

// Interactive prompt mode
export async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) =>
    new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });

  console.log("\n📝 up-wrytr Interactive Mode\n");

  const input = await question(
    "What would you like help writing? (or paste your draft):\n> "
  );

  const tone = await question(
    "\nWhat tone? (professional/casual/silly/empathetic/mixed) [mixed]: "
  );
  const channel = await question(
    "What platform? (slack/email/github) [slack]: "
  );
  const context = await question(
    "Any additional context? (optional):\n> "
  );

  rl.close();

  return {
    input,
    tone: tone || "mixed",
    channel: channel || "slack",
    context: context || "",
  };
}

// Check if stdin is available (piped input)
export function hasStdinInput() {
  return !process.stdin.isTTY;
}
