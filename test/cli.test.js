import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, "..");

function runHelp() {
  return spawnSync(process.execPath, ["src/index.js", "--help"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
}

function runMockedCli(args, stdin = "") {
  const bootstrap = `
import { LLMHelper } from './lib/llm.js';
Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });
LLMHelper.prototype.improve = async function(input, tone, channel, context) {
  return '[MOCK improve] ' + input + ' | tone=' + tone + ' | channel=' + channel + ' | ctx=' + (context || '');
};
LLMHelper.prototype.brainstorm = async function(topic, tone, channel) {
  return '[MOCK brainstorm] ' + topic + ' | tone=' + tone + ' | channel=' + channel;
};
process.env.GITHUB_TOKEN = 'test-token';
process.argv = ['node', 'src/index.js', ...${JSON.stringify(args)}];
await import('./src/index.js');
`;

  return spawnSync(process.execPath, ["--input-type=module", "-e", bootstrap], {
    cwd: repoRoot,
    input: stdin,
    encoding: "utf8",
  });
}

test("help includes iterate option", () => {
  const result = runHelp();
  assert.equal(result.status, 0);
  assert.match(result.stdout, /--iterate/);
  assert.match(result.stdout, /Generate then iteratively refine in-[\s\S]*session/);
});

test("one-shot mode prints a single mocked message", () => {
  const result = runMockedCli(["hello team", "-t", "casual", "-c", "slack"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /\[MOCK improve\] hello team/);
  assert.match(result.stdout, /Slack Message/);
  assert.doesNotMatch(result.stdout, /Action: \[a\]ccept/);
});

test("iterate mode enters refine prompt", () => {
  const result = runMockedCli(["initial draft", "-r"], "r\n");
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Action: \[a\]ccept, \[r\]efine, \[n\]ew draft, \[q\]uit/);
  assert.match(result.stdout, /What should change\?/);
});
