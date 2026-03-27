# up-wrytr 📝

A conversational CLI tool powered by an LLM to help you craft better
communications for Slack, email, and GitHub.
Never stare at a blank message again. Get AI assistance writing messages
that are professional, casual, silly, empathetic, or perfectly mixed.

## The Story Behind up-wrytr 📝

I’m a chronic over-editor. No matter how many times I proofread, I always spot something the exact millisecond after I hit send. 🤦‍♀️

I found myself asking Copilot to help me "vibe check" my messages so often that I decided to wrap it into a simple tool. **up-wrytr** started as a tiny personal script, but after spiffing it up with Copilot, I figured—hey, maybe I’m not the only one who does this?

I’m sharing it here in case it’s a help to any other "accidental editors" out there!

That is exactly what up-wrytr is built for.


## Features

✨ **Multi-Tone Support**: Professional, casual, silly, empathetic,
and mixed voices  
💬 **Multi-Channel**: Optimized formatting for Slack, email, and GitHub.
⚡ **Multiple Input Methods**: Interactive prompts, stdin piping, or file input  
🧠 **Smart Assistance**: Improve drafts or brainstorm completely new messages  
🎯 **Conversational**: Designed to sound natural and human, not robotic  
🚀 **Easy to Use**: Simple CLI with sensible defaults  

## Quick Start

Detailed setup instructions are in [SETUP.md](SETUP.md). Quick version:

```bash
cd up-wrytr
npm install
./uw -i  # Try interactive mode
```

You'll need either:

- A GitHub token in your `.env` file, OR
- The GitHub CLI (`gh`) installed and authenticated

## Usage

### Interactive Mode (Recommended for First Time)

```bash
./uw -i
```

You'll be prompted for your message, tone, and platform.

### Quick Command

```bash
./uw "your message here" -t casual -c slack
```

### Pipe from stdin

```bash
echo "message draft" | ./uw -t professional -c email
```

### Read from file

```bash
./uw -f my-draft.txt -t professional -c github
```

### Brainstorm mode

```bash
./uw -b "need to tell team bad news" -t empathetic -c slack
```

## Options

```text
-t, --tone [type]      Tone: professional, casual, silly, empathetic, mixed
                       (default: mixed)
-c, --channel [type]   Platform: slack, email, github (default: slack)
-x, --context [text]   Additional context for better results
-f, --file [path]      Read message from file
-b, --brainstorm       Generate ideas and suggestions
-i, --interactive      Interactive mode with prompts
-h, --help             Show help
```

## Tones Explained

- **Professional**
  - Best for: Work communication and formal requests
  - Style: Clear, respectful, business-appropriate
- **Casual**
  - Best for: Relaxed team chat and close colleagues
  - Style: Friendly, conversational, uses contractions
- **Silly**
  - Best for: Fun team moments and creative messages
  - Style: Humorous, witty, personality-filled
- **Empathetic**
  - Best for: Sensitive situations, feedback, apologies
  - Style: Warm, understanding, supportive
- **Mixed**
  - Best for: Most situations (recommended default)
  - Style: Balanced blend of all styles

## Channels

### Slack

- Short and punchy messages
- Emoji-friendly
- Thread-aware formatting

### Email

- Full structured messages
- Professional formatting
- Proper greetings and sign-offs

### GitHub

- Markdown formatting
- Code block support
- Issue/PR references with # and @mentions

## Examples

See [examples/EXAMPLES.md](examples/EXAMPLES.md) for detailed examples.

### Quick Examples

```bash
# Casual Slack
./uw "hey what's the status on that thing?" -t casual -c slack

# Professional Email
./uw "i need more time on the project" -t professional -c email

# Empathetic GitHub Comment
./uw "i think this approach has issues" -t empathetic -c github

# Brainstorm ideas
./uw -b "how to ask for a raise" -t professional -c email
```

## Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```dotenv
GITHUB_TOKEN=your_token_here    # Required for LLM API access
DEFAULT_TONE=mixed              # Default tone (optional)
DEFAULT_CHANNEL=slack           # Default channel (optional)
```

## How It Works

1. **You provide input** (interactive, piped, file, or command line)
2. **You specify tone and channel** (or use defaults)
3. **The LLM refines your message** with conversational language
4. **Output is formatted** for your chosen platform
5. **Result is displayed** ready to copy and use

## Tips & Tricks

- **Draft first, then refine**: Write your rough idea, then run up-wrytr
- **Try different tones**: Same message, different tone = different vibe
- **Use context**: Give the AI background info with `--context`
- **Brainstorm when stuck**: Use `-b` when you don't know what to say
- **Pipe from clipboard**:
  - Mac: `pbpaste | ./uw -t casual -c slack`
  - Linux: `xclip -o | ./uw -t casual -c slack`

## Limitations

- Requires internet connection
- API rate limits apply (but generous for typical daily usage)
- Always review edited messages before sending
- AI assists, but you decide: it is your reputation

## Privacy

- Your messages are sent to the LLM provider's API
- Messages are not permanently stored by up-wrytr
- Your GitHub token should be kept in `.env` and **never** committed to git

## Troubleshooting

### "GITHUB_TOKEN not found"

Make sure you:

1. Created `.env` file from `.env.example`
2. Added your GitHub token (generate one at <https://github.com/settings/tokens>)
3. The token is actually in the file (not commented out)

### Command not found

Make sure the script is executable:

```bash
chmod +x up-wrytr
```

### API Errors

- Check your internet connection
- Verify your GitHub token is valid and has repo access
- Check [GitHub's status page](https://www.githubstatus.com/)

## Project Structure

```text
up-wrytr/
├── src/
│   └── index.js          # Main CLI entry point
├── lib/
│   ├── llm.js            # LLM integration (AI magic happens here)
│   ├── tones.js          # Tone configurations
│   ├── channels.js       # Channel formatters
│   └── input.js          # Input handlers
├── examples/
│   └── EXAMPLES.md       # Usage examples
├── package.json
├── .env.example
└── up-wrytr          # Bash wrapper
```

## Technical Stack

- **Runtime**: Node.js
- **LLM**: OpenAI API (via GitHub token)
- **CLI Framework**: yargs
- **Styling**: chalk
- **Config**: dotenv

## Future Ideas

- Config file support for custom tones
- Integration with actual Slack/email/GitHub APIs to send directly
- History/saved messages
- Custom tone templates
- Batch processing
- Advanced options (length preference, formality levels, etc.)

## License

MIT

## Contributing

Feel free to fork and enhance! Some ideas:

- Additional tones or channels
- Better formatting
- Caching
- Performance improvements
- Testing

---

## Made with Love

Built to help you communicate better.

Having issues? [Report them](TODO) or reach out!
