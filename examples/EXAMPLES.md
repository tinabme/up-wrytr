# Quick Examples

## Interactive Mode (Easiest)
```bash
./uw -i
```
You'll be prompted for your message, tone, and platform.

## Quick Commands

### Slack - Casual
```bash
./uw "hey just wanted to check in on that project" -t casual -c slack
```

### Email - Professional
```bash
./uw "i wanted to ask about the deadline for the report" -t professional -c email
```

### GitHub - Empathetic
```bash
./uw "I disagree with this approach and think we should do it differently" -t empathetic -c github
```

### Mixed Tone (Default)
```bash
./uw "thanks for the feedback on the code" -c github
```

## Piping Input

### From echo
```bash
echo "we should probably update the docs" | ./uw -t casual -c slack
```

### From clipboard (Mac)
```bash
pbpaste | ./uw -t professional -c email
```

### From file
```bash
./uw -f draft-message.txt -t professional -c email
```

## Brainstorm Mode
Generate ideas and suggestions:
```bash
./uw -b "need to tell my manager I'm taking PTO" -t professional -c email
```

## With Context
Add context for better suggestions:
```bash
./uw "can we push the deadline?" -t empathetic -c slack --context "we hit some technical blockers"
```

## All Options Shown
```bash
./uw --help
```

---

## Real World Examples

### Example 1: Difficult Slack Message
**Raw Draft:** "why hasn't the code review been done yet?"
```bash
./uw "why hasn't the code review been done yet?" -t empathetic -c slack
```
**Result:** Might become something like:
> "Hey! Wanted to check in on the code review—no rush at all. Just let me know if you need any clarification on the PR or if there's anything I can help with! 🙌"

### Example 2: Apologetic Email
**Raw:** "im sorry i messed up the deployment"
```bash
./uw "im sorry i messed up the deployment" -t empathetic -c email
```

### Example 3: Funny GitHub Comment
```bash
./uw "this code is really hard to understand" -t silly -c github
```

### Example 4: Brainstorm Session
```bash
./uw -b "how to ask for a raise" -t professional -c email
```

---

## Tips

1. **Tone Matters**: Try different tones for the same message:
   ```bash
   echo "we need to talk about performance" | ./uw -t professional -c email
   echo "we need to talk about performance" | ./uw -t casual -c slack
   echo "we need to talk about performance" | ./uw -t empathetic -c slack
   ```

2. **Use Context**: Give the LLM background info:
   ```bash
   ./uw "request time off" -t professional -c email \
     --context "it's the holidays and I know we're busy"
   ```

3. **Draft First**: Write your rough ideas first, then refine:
   ```bash
   ./uw "rough draft stuff..." -t casual -c slack
   ```

4. **Try Brainstorm**: When you're not sure what to say:
   ```bash
   ./uw -b "announcing a team restructure" -t professional -c email
   ```
