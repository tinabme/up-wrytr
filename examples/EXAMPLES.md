# Examples

```bash
# Interactive
./uw -i

# Rewrite for Slack
./uw "can we move this to tomorrow" -t casual -c slack

# Rewrite for email
./uw "need more time for the report" -t professional -c email

# Rewrite for GitHub
./uw "this needs tests" -t empathetic -c github

# Pipe from clipboard (macOS)
pbpaste | ./uw -t mixed -c slack

# Read from file
./uw -f draft.txt -t professional -c email

# Brainstorm mode
./uw -b "requesting PTO" -t professional -c email
```
