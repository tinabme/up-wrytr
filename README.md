# up-wrytr

Tiny CLI to rewrite drafts for Slack, email, and GitHub in a chosen tone.

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
