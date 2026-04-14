"""
AI Writing Tools — FastAPI Backend
"""
import os
from dotenv import load_dotenv

# Load env FIRST, before importing routers
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import rewrite, grammar, ai_detect, summarize, citation, plagiarism, auth

app = FastAPI(
    title="AI Writing Tools API",
    description="AI-powered writing assistant: Rewriter, Grammar Checker, AI Detector, Summarizer, Citation Generator & Plagiarism Checker",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rewrite.router)
app.include_router(grammar.router)
app.include_router(ai_detect.router)
app.include_router(summarize.router)
app.include_router(citation.router)
app.include_router(plagiarism.router)
app.include_router(auth.router)


@app.get("/")
async def root():
    return {"message": "AI Writing Tools API", "version": "1.0.0", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
