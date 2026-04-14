"""Rewriter Router"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter(prefix="/rewrite", tags=["Rewriter"])
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), base_url=os.getenv("OPENAI_BASE_URL"))

MODES = {
    "social": "Rewrite this for social media. Make it engaging, concise (max 280 chars for Twitter), and suitable for Twitter/LinkedIn/Instagram. Use emojis naturally where appropriate:",
    "academic": "Rewrite this in academic writing style. Be formal, objective, precise, and avoid colloquialisms. Use proper academic tone:",
    "formal": "Rewrite this in formal business style. Professional, clear, and courteous:",
    "casual": "Rewrite this in casual conversational style. Natural, friendly, and relaxed:"
}

class RewriteRequest(BaseModel):
    text: str
    mode: str = "general"  # social | academic | formal | casual | general

class RewriteResponse(BaseModel):
    result: str
    mode: str
    credits_used: int = 10

@router.post("/", response_model=RewriteResponse)
async def rewrite(req: RewriteRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    if len(req.text) > 5000:
        raise HTTPException(status_code=400, detail="Text exceeds 5000 character limit")

    prompt = MODES.get(req.mode, MODES["casual"]) + f"\n\n{req.text}"

    response = client.chat.completions.create(
        model="MiniMax-M2.7",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000,
        temperature=0.7
    )

    return RewriteResponse(
        result=response.choices[0].message.content,
        mode=req.mode
    )
