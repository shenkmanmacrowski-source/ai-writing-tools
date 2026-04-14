"""Summarizer Router"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
import httpx

router = APIRouter(prefix="/summarize", tags=["Summarizer"])
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

LENGTH_PROMPTS = {
    "short": "Provide a very brief summary in 2-3 sentences, then list 3 keywords.",
    "medium": "Provide a moderate summary in 1-2 paragraphs, then list 4-5 keywords.",
    "long": "Provide a comprehensive summary in multiple paragraphs, then list 5-7 keywords."
}

class SummarizeRequest(BaseModel):
    text: str = None
    url: str = None
    length: str = "medium"  # short | medium | long
    language: str = "en"

class SummarizeResponse(BaseModel):
    summary: str
    keywords: list[str]
    credits_used: int = 15

@router.post("/", response_model=SummarizeResponse)
async def summarize(req: SummarizeRequest):
    if not req.text and not req.url:
        raise HTTPException(status_code=400, detail="Either text or url must be provided")

    content = req.text

    # If URL provided, fetch and extract content
    if req.url:
        try:
            async with httpx.AsyncClient() as http_client:
                resp = await http_client.get(req.url, timeout=10.0)
                # Simple content extraction (in production use proper scraper)
                content = resp.text[:8000]  # Limit to first 8000 chars
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to fetch URL: {str(e)}")

    if not content.strip():
        raise HTTPException(status_code=400, detail="No content to summarize")

    length_prompt = LENGTH_PROMPTS.get(req.length, LENGTH_PROMPTS["medium"])

    prompt = f"""Summarize the following text. {length_prompt}
Respond in JSON format with "summary" and "keywords" fields.

Text:
{content}"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1500,
        response_format={"type": "json_object"}
    )

    import json
    data = json.loads(response.choices[0].message.content)

    return SummarizeResponse(
        summary=data.get("summary", ""),
        keywords=data.get("keywords", [])
    )
