# Getting Started with up-wrytr

## Authentication Options

up-wrytr supports two ways to authenticate:

### Option 1: GitHub Token in .env (Recommended)

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)" or "Generate new fine-grained token"
3. For **classic tokens**: Give it at least `repo` scope
4. For **fine-grained tokens**: No special permissions needed
   (works with public access)
5. Copy your token and add to `.env`:

```dotenv
GITHUB_TOKEN=ghp_... (your token)
```

### Option 2: GitHub CLI (gh)

If you have the [GitHub CLI](https://cli.github.com/) installed and authenticated:

```bash
gh auth login  # If not already authenticated
```

Then up-wrytr will automatically use `gh auth token` — no `.env` needed!

---

## Installation

```bash
# Install dependencies
npm install

# Create .env file (skip if using gh CLI)
cp .env.example .env

# IF using GitHub token: edit .env and add your token
nano .env
```

Your `.env` should look like:

```dotenv
GITHUB_TOKEN=ghp_... (your actual token here)
DEFAULT_TONE=mixed
DEFAULT_CHANNEL=slack
```

(If you're using `gh CLI` authentication, you can skip the .env setup)

## Step 3: Make it Executable

```bash
chmod +x up-wrytr
```

## Step 4: Test It Out

```bash
# Simple test
./uw "hey can you check that code for me" -t casual -c slack

# Or interactive mode (recommended)
./uw -i
```

You should see your message refined and formatted!

## Step 5: Optional - Add to PATH

Make it accessible from anywhere:

```bash
# Option A: Add to PATH
sudo ln -s /Users/tinabme/webroot/up-wrytr/up-wrytr /usr/local/bin/uw

# Then use from anywhere:
up-wrytr -i

# Option B: Create alias in your shell config (~/.zshrc or ~/.bash_profile)
alias up-wrytr='/Users/tinabme/webroot/up-wrytr/up-wrytr'
```

## Now You're Ready! 🎉

Try these:

```bash
# Interactive mode (best for learning)
./uw -i

# Quick casual Slack
./uw "this is taking forever" -t casual -c slack

# Professional email
./uw "we need to discuss the timeline" -t professional -c email

# Brainstorm ideas
./uw -b "need to request emergency time off" -t professional -c email

# From clipboard (Mac)
pbpaste | ./uw -t empathetic -c slack

# Read from file
echo "rough draft message" > draft.txt
./uw -f draft.txt -t casual -c slack
```

## Common Issues

### Error: "GITHUB_TOKEN not found"

- Check `.env` file exists and has your token
- Make sure the token is not commented out
- Try `cat .env` to verify it's there
- Generate a new token at <https://github.com/settings/tokens> if needed

### Error: "Cannot find module"

- Run `npm install` again
- Make sure you're in the up-wrytr directory

### Troubleshooting - API Issues

- The free tier has limits, but they're generous
- Wait a bit then try again
- For production use, consider using GitHub CLI for automatic token refresh

## Next Steps

- Read [EXAMPLES.md](examples/EXAMPLES.md) for more ideas
- Explore different tones and channels
- Check `./uw --help` for all options
- Consider adding it to your shell profile for easy access

## Workflow Ideas

1. **Draft in Notes, Refine Here**

   ```bash
   ./uw -f ~/notes/my-message.txt -t professional -c email
   ```

2. **Quick Tone Check**

   ```bash
   # Copy to clipboard, then:
   pbpaste | ./uw -t professional -c email
   pbpaste | ./uw -t casual -c slack
   # Compare and pick your favorite
   ```

3. **Brainstorm Session**

   ```bash
   ./uw -b "topic" -t professional -c email
   ```

---

Need help? Check the [README.md](README.md) or look at [EXAMPLES.md](examples/EXAMPLES.md)!
