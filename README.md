# AI Writing Tools

> AI-powered writing assistant toolkit for global users — covering social media content creation and academic writing.

## 🛠️ Tools

| Tool | Description | Scene |
|------|-------------|-------|
| **Rewriter** | AI-powered text rewriting in multiple styles | Social + Academic |
| **Grammar Checker** | Grammar, spelling & punctuation correction | Social + Academic |
| **AI Detector** | Detect AI-generated content | Academic |
| **Summarizer** | Long-text summarization with keywords | Academic |
| **Citation Generator** | Auto-generate APA/MLA/Chicago/IEEE/Harvard citations | Academic |
| **Plagiarism Checker** | Check text originality against web sources | Academic |

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router) + Tailwind CSS + next-intl
- **Backend:** FastAPI (Python)
- **AI:** OpenAI GPT-4o / Claude-3.5
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Deploy:** Cloudflare Pages + Workers

## 📦 Project Structure

```
ai-writing-tools/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/             # FastAPI backend
├── docs/                 # Documentation
│   └── MVP-Requirements.md
├── supabase/
│   └── schema.sql        # Database schema
└── SPEC.md               # Product specification
```

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Supabase account
- Cloudflare account
- Stripe account
- OpenAI API key

### Setup

```bash
# Clone the repo
git clone https://github.com/shenkmanmacrowski-source/ai-writing-tools.git
cd ai-writing-tools

# Install frontend dependencies
cd apps/web
npm install

# Install backend dependencies
cd ../api
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys

# Run locally
npm run dev          # Frontend (http://localhost:3000)
uvicorn main:app     # Backend (http://localhost:8000)
```

## 🌐 Deployment

### Cloudflare Pages (Frontend)

```bash
wrangler pages deploy apps/web/out --project-name=ai-writing-tools
```

### Database (Supabase)

Run the schema migration in your Supabase SQL editor:

```bash
cat supabase/schema.sql | psql $SUPABASE_DB_URL
```

## 📄 Documentation

- [SPEC.md](./SPEC.md) — Product specification
- [docs/MVP-Requirements.md](./docs/MVP-Requirements.md) — Detailed MVP requirements (Chinese)

## ⚖️ License

MIT License
