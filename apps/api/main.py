"""
AI Writing Tools — FastAPI Backend
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import rewrite, grammar, ai_detect, summarize, citation, plagiarism, auth
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AI Writing Tools API",
    description="AI-powered writing assistant: Rewriter, Grammar Checker, AI Detector, Summarizer, Citation Generator & Plagiarism Checker",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(rewrite.router, prefix="/api")
app.include_router(grammar.router, prefix="/api")
app.include_router(ai_detect.router, prefix="/api")
app.include_router(summarize.router, prefix="/api")
app.include_router(citation.router, prefix="/api")
app.include_router(plagiarism.router, prefix="/api")
app.include_router(auth.router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "AI Writing Tools API", "version": "1.0.0", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
