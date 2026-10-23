# HRPilot — AI HR Business Partner

AI assistant for Indian SME HR questions and first-draft documents. It can retrieve relevant passages from company documents uploaded by the user. It is not connected to a maintained legal-source library and must not make employee decisions.

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

## Company knowledge

In the chat sidebar, open **Company knowledge** to add `.txt`, `.md`, `.csv`, or `.json` files (up to 20 files, 1 MB each). HRPilot splits the text into passages, searches them locally for relevant terms, and sends only matching passages with the question to Groq. Responses are instructed to identify those file sources and to distinguish company policy from legal requirements.

Files are stored in browser local storage on that device and are not shared across users or devices. This public app has no sign-in, company workspaces, role-based access controls, central document store, or employee-data protections. Do not upload employee names, payroll records, health information, complaints, or other sensitive personal data. For PDFs or Word files, copy non-sensitive policy text into a supported format first.

This is retrieval-augmented generation (RAG), not model training: uploaded files ground answers about your company but do not permanently change the underlying language model. HRPilot still has no maintained, verified current-law source library; check current rules with official sources or a qualified professional.

## Built by
Akhil P Kumar · Kochi, Kerala
