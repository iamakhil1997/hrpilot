# HRPilot — AI HR Business Partner

AI assistant for Indian SME HR questions and first-draft documents. It provides general guidance, is not connected to a maintained legal-source library, and must not make employee decisions.

**Live:** [hrpilot.vercel.app](https://hrpilot.vercel.app) · **Free** · **No signup**

---

## Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Groq API (configurable model) via Vercel Serverless Functions
- **Routing:** React Router DOM

## Local Development

```bash
# 1. Install dependencies
npm run install:all

# 2. Create .env in root
GROQ_API_KEY=your_groq_key_here
GROQ_MODEL=openai/gpt-oss-120b
PORT=3001

# 3. Start dev servers
npm run dev
```

- Client: http://localhost:3000
- Server: http://localhost:3001

## Deploy to Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variables: `GROQ_API_KEY` and (optionally) `GROQ_MODEL`. The default model is `openai/gpt-oss-120b`.
4. Deploy — done ✅

## Built by
Akhil P Kumar · Kochi, Kerala
