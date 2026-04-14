# AI Writing Tools — MVP Specification

> Version: 1.0  
> Date: 2026-04-14  
> Status: 🟡 Draft

---

## 1. Product Overview

### 1.1 Product Positioning

**One-liner:**  
AI-powered writing assistant toolkit for global users, covering social media content creation and academic writing.

**Core Value:**
- Lower the barrier to quality writing (especially for non-native English speakers)
- Improve content quality (grammar, professionalism, originality)
- Save time (rewriting, summarizing, citation automation)

### 1.2 Target Users

| User Group | Use Case | Core Pain Points |
|------------|----------|-----------------|
| Social Media Managers | Twitter, LinkedIn, Instagram posts | Language not natural, repetitive expressions, word count control |
| Students / Academic Writers | Papers, reports, assignments | Grammar errors, complex citation formats, AI detection anxiety |
| Cross-border Marketing Teams | Product copy, ad creative | Need multi-version rewriting, localized expression |
| English Learners | Daily writing practice | Uncertain if expressions are correct and natural |

### 1.3 Core Tool Matrix

| # | Tool | Scenario | Priority |
|---|------|----------|----------|
| 1 | Rewriter | Social + Academic | P0 |
| 2 | Grammar Checker | Social + Academic | P0 |
| 3 | AI Detector | Academic | P0 |
| 4 | Summarizer | Academic | P1 |
| 5 | Citation Generator | Academic | P1 |
| 6 | Plagiarism Checker | Academic | P1 |

---

## 2. Functional Requirements

### 2.1 Rewriter
- **Input:** Raw text (5-5000 chars) + mode (social/academic/formal/casual)
- **Output:** Rewritten text + optional diff highlight
- **Engine:** OpenAI GPT-4o

### 2.2 Grammar Checker
- **Input:** Text (5-5000 chars)
- **Output:** Corrected text + error list (position, original, suggestion, type)
- **Error types:** Grammar, Spelling, Punctuation, Word Choice, Sentence Structure

### 2.3 AI Detector
- **Input:** Text (50-5000 chars)
- **Output:** AI probability (0-100%), label (AI/Human/Mixed), high-risk sentence highlighting
- **Engine:** GPTZero API or Originality.ai API

### 2.4 Summarizer
- **Input:** Text or URL + length (Short/Medium/Long)
- **Output:** Summary text + keyword tags (3-5)
- **Engine:** GPT-4o with URL fetch support

### 2.5 Citation Generator
- **Input:** Source type + known fields (Title, Author, Year, DOI, URL) + format (APA/MLA/Chicago/IEEE/Harvard)
- **Output:** Formatted citation string
- **Engine:** CrossRef API for DOI metadata + local formatting

### 2.6 Plagiarism Checker
- **Input:** Text (100-10000 chars)
- **Output:** Originality score (0-100%), similar sources list
- **Engine:** Copyscape API or Turnitin API

---

## 3. Non-Functional Requirements

### 3.1 i18n
- MVP: English only (UI + tool prompts)
- Phase 2: Chinese, Japanese, Korean, Spanish

### 3.2 Responsive Design
- Mobile (375px+): Single column, tool cards
- Tablet (768px+): Two-column cards
- Desktop (1200px+): Three-column cards + sidebar nav

### 3.3 Performance
- FCP < 2.5s
- API P95 < 5s
- Availability: 99.5%

### 3.4 Compliance
- GDPR (EU): Privacy policy page + Cookie consent
- CCPA (California): No data sale declaration
- AI Content: Label as "AI-assisted", not sole decision-maker

---

## 4. Pricing Model

| Plan | Price | Credits/mo | Access |
|------|-------|-----------|--------|
| Free | $0 | 100 | Basic rewriter + grammar (500 chars/req) |
| Pro | $12/mo | 2000 | All tools + long text support |
| Team | $39/mo | 10000 | Pro + 5 sub-accounts + API access |

**Credit Cost (v1):**
| Tool | Per Use |
|------|---------|
| Rewriter | 10 |
| Grammar Checker | 5 |
| AI Detector | 8 |
| Summarizer | 15 |
| Citation Generator | 3 |
| Plagiarism Checker | 20 |

---

## 5. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + next-intl |
| Backend API | FastAPI (Python) |
| AI Engine | OpenAI GPT-4o / Claude-3.5 |
| External APIs | GPTZero, Copyscape, CrossRef |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | Stripe |
| CDN/Deploy | Cloudflare Pages + Workers |
| Domain | Custom (optional) |

---

## 6. MVP Phases

| Phase | Duration | Deliverables |
|-------|---------|-------------|
| Phase 1 | Week 1-2 | Next.js scaffold + Supabase + CF Pages + UI components |
| Phase 2 | Week 3-4 | FastAPI + 6 tool APIs + OpenAI + credit deduction |
| Phase 3 | Week 5-6 | 6 tool pages + result display + home page |
| Phase 4 | Week 7-8 | Supabase Auth + Stripe + dashboard |
| Phase 5 | Week 9 | Privacy/Terms + GDPR cookie banner + launch |

---

## 7. Out of Scope (MVP)

- Chrome extension
- Word / Google Docs plugin
- Team collaboration
- Non-English UI
- Batch processing
- Public API
- White-label

---

*This spec will be updated as user feedback comes in.*
