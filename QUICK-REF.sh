#!/usr/bin/env bash

# QUICK REFERENCE - Copy this to your notes or shell config
# up-wrytr Quick Command Reference

# Interactive (best for first time)
# ./uw -i

# Basic usage
# ./uw "message" -t [tone] -c [channel]

# EXAMPLES:
# ./uw "hey what's up" -t casual -c slack
# ./uw "schedule a meeting" -t professional -c email
# ./uw "great work!" -t silly -c github
# pbpaste | ./uw -t empathetic -c slack
# ./uw -f file.txt -t professional -c email
# ./uw -b "topic" -t professional -c email

# TONES:
# professional  - business-appropriate, clear, respectful
# casual        - friendly, conversational, relaxed
# silly         - humorous, witty, personality-filled
# empathetic    - warm, understanding, supportive
# mixed         - balanced of all styles (DEFAULT)

# CHANNELS:
# slack   - short, punchy, emoji-friendly (DEFAULT)
# email   - full structured messages, formal
# github  - markdown, code blocks, references

# OPTIONS:
# -t, --tone        [professional|casual|silly|empathetic|mixed]
# -c, --channel     [slack|email|github]
# -x, --context     "additional info"
# -f, --file        path/to/file.txt
# -b, --brainstorm  generate ideas
# -i, --interactive interactive mode
# -h, --help        show help

# ALIASES (add to ~/.zshrc or ~/.bash_profile):
# alias wa='up-wrytr'
# alias wa-i='up-wrytr -i'
# alias wa-slack='up-wrytr -t casual -c slack'
# alias wa-email='up-wrytr -t professional -c email'
# alias wa-gh='up-wrytr -c github'

# WORKFLOWS:

# Check tone of copied text
# pbpaste | up-wrytr -t professional -c email
# pbpaste | up-wrytr -t casual -c slack
# pbpaste | up-wrytr -t empathetic -c slack

# Brainstorm difficult message
# up-wrytr -b "topic" -t professional -c email

# Batch process files
# for f in messages/*.txt; do up-wrytr -f "$f" -t professional -c email; done

# Pipe from curl/API
# curl https://api.example.com/message | up-wrytr -t professional -c slack

echo "Quick Reference loaded! Try: up-wrytr -i"
