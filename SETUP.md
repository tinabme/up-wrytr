# Setup

## 1) Install deps

```bash
npm install
```

## 2) Configure auth

Choose one:

### A. `.env` token

```bash
cp .env.example .env
```

Then set `GITHUB_TOKEN` in `.env`.

### B. GitHub CLI

```bash
gh auth login
```

## 3) Run smoke test

```bash
./uw "hello team" -t casual -c slack
```

## 4) Optional: global command

```bash
npm link
uw -i
```
