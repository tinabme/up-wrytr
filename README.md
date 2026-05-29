# up-wrytr

Tiny CLI powered by an LLM, to help you craft better communicationsfor Slack, email, and git issues, etc.. in a chosen tone.


## The Story Behind up-wrytr

I’m a chronic over-editor. No matter how many times I proofread, I always spot something the exact millisecond after I hit send. 🤦‍♀️

I found myself asking Copilot to help me "vibe check" my messages so often that I decided to wrap it into a simple CLI tool **up-wrytr**.

Sharing it here in case it’s a help to any other "accidental editors" out there!

## Install

```bash
npm install
```

## Auth

Use either:

1. `.env` with `GITHUB_TOKEN`
2. `gh` CLI (`gh auth login`)

Minimal `.env`:

```dotenv
GITHUB_TOKEN=your_token_here
DEFAULT_TONE=mixed
DEFAULT_CHANNEL=slack
```

## Use

```bash
./uw -i
./uw "need to ask for more time" -t professional -c email
pbpaste | ./uw -t casual -c slack
./uw -f draft.txt -t empathetic -c github
./uw -b "need to share bad news" -t empathetic -c slack
```

## Options

```text
-t, --tone       professional | casual | silly | empathetic | mixed
-c, --channel    slack | email | github
-x, --context    extra context for the rewrite
-f, --file       read input from file
-b, --brainstorm generate ideas instead of rewriting
-i, --interactive prompt for input
-h, --help       show help
```

## Files

- `src/index.js`: CLI entry
- `lib/llm.js`: LLM call + prompt assembly
- `lib/tones.js`: tone presets
- `lib/channels.js`: channel formatting rules
- `lib/input.js`: stdin/file/interactive input handling

MIT License.
