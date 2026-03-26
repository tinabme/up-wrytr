# Architecture & How It Works

## Flow Diagram

```
┌─────────────────────┐
│   User Input        │
├─────────────────────┤
│ • Interactive (-i)  │
│ • Piped (stdin)     │
│ • File (-f)         │
│ • Command line arg  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Parse Options      │
├─────────────────────┤
│ • Tone (-t)         │
│ • Channel (-c)      │
│ • Context (-x)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Build Prompt        │
├─────────────────────┤
│ System instructions │
│ + Tone guidelines   │
│ + Channel rules     │
│ + User input        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ LLM API             │
├─────────────────────┤
│ Generate refined    │
│ message with        │
│ conversational tone │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Format Output       │
├─────────────────────┤
│ Apply channel rules │
│ (Slack/Email/GitHub)│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Display Result      │
├─────────────────────┤
│ Pretty-printed with │
│ chalk formatting    │
└─────────────────────┘
```

## File Structure

```
up-wrytr/
│
├── up-wrytr              # Bash wrapper (entry point)
├── src/
│   └── index.js             # Main CLI (yargs, orchestration)
│
├── lib/
│   ├── llm.js               # LLM API client (OpenAI)
│   ├── tones.js             # Tone definitions & guidance
│   ├── channels.js          # Format rules per platform
│   └── input.js             # Handle stdin/file/interactive
│
├── examples/
│   └── EXAMPLES.md          # Usage examples
│
├── README.md                # Main documentation
├── SETUP.md                 # Setup instructions
├── QUICK-REF.sh             # Quick reference
├── package.json             # Dependencies
├── .env.example             # Config template
└── .gitignore              # Git exclusions
```

## Data Flow - Example

**User Input:**

```bash
./uw "we need to talk about the deadline" -t empathetic -c slack
```

**Step 1: Parse Input**

- Message: "we need to talk about the deadline"
- Tone: "empathetic"
- Channel: "slack"

**Step 2: Build System Prompt**

```
You are a writing assistant...

TONE GUIDELINES:
Lead with empathy and understanding...

CHANNEL GUIDELINES:
Format for Slack: keep messages concise...
```

**Step 3: Create User Prompt**

```
Please help me write this slack message (empathetic tone):
we need to talk about the deadline
```

**Step 4: Call LLM API**
Returns refined message

**Step 5: Format for Slack**

- Reduce excessive line breaks
- Convert markdown bullets to Slack bullets

**Step 6: Output**

```
✨ Crafting your message with AI...

══════════════════════════════════════════════════
📮 Slack Message
Tone: Warm and understanding
══════════════════════════════════════════════════

Hey! I know things have been hectic lately, and I don't 
want to add pressure. But I wanted to touch base when 
you have a moment about the deadline. No rush—just 
wanted to make sure we're on the same page. 💙

══════════════════════════════════════════════════
💡 Tip: Copy this to your clipboard or save it!
```

## Key Components

### Input Layer (`lib/input.js`)

- Detects if stdin is piped
- Reads from files
- Interactive prompts with readline
- Command-line arguments

### Tone System (`lib/tones.js`)

- 5 predefined tone profiles
- Each has: description, LLM instructions, examples
- Can be easy extended with custom tones

### Channel Formatters (`lib/channels.js`)

- Platform-specific rules
- Markdown handling
- Length preferences
- Special formatting (code blocks for GitHub, etc.)

### LLM Integration (`lib/llm.js`)

- OpenAI API client (via GitHub token)
- Builds context-aware prompts
- Two modes: improve existing text, brainstorm new
- Error handling & API management

### CLI Orchestration (`src/index.js`)

- yargs for argument parsing
- Determines input source
- Coordinates all components
- Pretty output with chalk

## Processing Pipeline

```
Input Detection
    ↓
Parse Arguments & Config
    ↓
Load Tone Definition
    ↓
Load Channel Definition
    ↓
Build LLM Prompt
    ↓
[Call LLM API]
    ↓
Format Output
    ↓
Display with Styling
    ↓
Ready to Copy!
```

## Technology Choices

| Layer | Technology | Why |
|-------|-----------|-----|
| Runtime | Node.js | Easy async, good for I/O |
| LLM | OpenAI (GitHub token) | Fast, smart, works with GitHub CLI |
| CLI Framework | yargs | Mature, flexible argument parsing |
| Styling | chalk | Simple, colorful terminal output |
| Config | dotenv | Standard for environment variables |
| Shell | Bash | Universal, simple wrapper |

## Extensibility

### Add a New Tone

Edit `lib/tones.js`:

```javascript
export const TONES = {
  ...existing tones...,
  mynewTone: {
    description: "My custom tone",
    instructions: "Your LLM instructions here",
    examples: ["Example 1", "Example 2"],
  }
}
```

### Add a New Channel

Edit `lib/channels.js`:

```javascript
export const CHANNELS = {
  ...existing channels...,
  mychannel: {
    name: "My Channel",
    format: (text) => { /* formatting logic */ },
    instructions: "LLM guidelines for this channel"
  }
}
```

### Add New Input Method

Edit `lib/input.js` and `src/index.js`

## Security & Privacy

- API key stored in `.env` (excluded from git)
- No local caching of messages
- No telemetry
- Direct API calls to Google only
- Messages not logged locally

---

Built to be simple, extensible, and conversational! 💬
