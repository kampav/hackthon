# Local Setup

## 1. Install dependencies
```bash
npm install
```

## 2. Configure environment
```bash
cp .env.local.example .env.local
# Fill in your Firebase + Anthropic values in .env.local
```

## 3a. Run against live Firebase (simplest)
```bash
npm run dev
# → http://localhost:3000
```

## 3b. Run with local Firestore emulator (no cloud needed)
```bash
# Terminal 1 — start emulator
docker compose up firestore-emulator

# Terminal 2 — start Next.js pointed at emulator
npm run dev:emulator
```

## 4. Run in Docker (mirrors production)
```bash
cp .env.local.example .env.local   # fill values
docker compose up --build
# → http://localhost:8080
```

## GitHub Secrets (for CI/CD)
See the secrets checklist in the README or ask Claude to regenerate the setup guide.

## Hackathon day workflow
1. Paste PRD → implement features in `src/`
2. `git push origin main` → GitHub Actions builds + deploys to Cloud Run automatically
3. Deploy URL printed at end of Actions run
