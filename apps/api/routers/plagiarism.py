"""Plagiarism Checker Router"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import httpx

router = APIRouter(prefix="/plagiarism", tags=["Plagiarism Checker"])

class PlagiarismRequest(BaseModel):
    text: str

class SimilarSource(BaseModel):
    url: str
    matched_text: str
    similarity_percent: int

class PlagiarismResponse(BaseModel):
    originality_score: int  # 0-100
    similar_sources: list[SimilarSource]
    credits_used: int = 20

@router.post("/", response_model=PlagiarismResponse)
async def check_plagiarism(req: PlagiarismRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    if len(req.text) < 100:
        raise HTTPException(status_code=400, detail="Text must be at least 100 characters")
    if len(req.text) > 10000:
        raise HTTPException(status_code=400, detail="Text exceeds 10000 character limit")

    api_key = os.getenv("COPYSCRAPE_API_KEY") or os.getenv("TURNITIN_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Plagiarism Checker not configured")

    # Use Copyscape API (simplified v1)
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.copyscape.com/cgi-bin/copysentry.pl",
                data={
                    "k": api_key,
                    "o": "csearch",
                    "t": req.text[:5000],
                    "f": "json"
                },
                timeout=30.0
            )
            data = resp.json()

            # Simplified response parsing
            count = data.get("count", 0)

            return PlagiarismResponse(
                originality_score=max(0, 100 - count * 10),  # Rough estimate
                similar_sources=[]
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Plagiarism check failed: {str(e)}")
