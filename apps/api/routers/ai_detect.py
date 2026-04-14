"""AI Detector Router"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import httpx

router = APIRouter(prefix="/ai-detect", tags=["AI Detector"])

class AIDetectRequest(BaseModel):
    text: str

class AIDetectResponse(BaseModel):
    ai_probability: int  # 0-100
    label: str  # AI Generated | Human Written | Mixed
    high_risk_sentences: list[dict]  # [{"sentence": "...", "prob": 85}]
    credits_used: int = 8

@router.post("/", response_model=AIDetectResponse)
async def detect_ai(req: AIDetectRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    if len(req.text) < 50:
        raise HTTPException(status_code=400, detail="Text must be at least 50 characters")
    if len(req.text) > 5000:
        raise HTTPException(status_code=400, detail="Text exceeds 5000 character limit")

    # Use GPTZero API
    api_key = os.getenv("GPTZERO_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="AI Detector not configured")

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.gptzero.me/v3/predict/text",
                headers={"Authorization": f"Bearer {api_key}"},
                json={"text": req.text},
                timeout=15.0
            )
            data = resp.json()

            # Parse GPTZero response
            avg_prob = data.get("predicted_percent", [0])[0] if data.get("predicted_percent") else 0

            if avg_prob > 70:
                label = "AI Generated"
            elif avg_prob < 30:
                label = "Human Written"
            else:
                label = "Mixed"

            return AIDetectResponse(
                ai_probability=int(avg_prob),
                label=label,
                high_risk_sentences=[]
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Detection failed: {str(e)}")
