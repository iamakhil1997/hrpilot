# HRPilot — AI HR Business Partner

Free AI HR assistant for Indian SMEs. Handles policies, performance, compliance, hiring, payroll, and employee relations like a real in-house HR professional.

**Live:** [hrpilot.vercel.app](https://hrpilot.vercel.app) · **Free** · **No signup**

---

## Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Groq API (Llama 3.3 70B) via Vercel Serverless Functions
- **Routing:** React Router DOM

## Local Development

```bash
# 1. Install dependencies
npm run install:all

# 2. Create .env in root
GROQ_API_KEY=your_groq_key_here
PORT=3001

# 3. Start dev servers
npm run dev
```

- Client: http://localhost:3000
- Server: http://localhost:3001

## Deploy to Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Add environment variable: `GROQ_API_KEY`
4. Deploy — done ✅

## Built by
Akhil P Kumar · Kochi, Kerala
