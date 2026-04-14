"""Grammar Checker Router"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter(prefix="/grammar", tags=["Grammar Checker"])
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class GrammarRequest(BaseModel):
    text: str
    language: str = "en"

class GrammarError(BaseModel):
    position: int
    original: str
    suggestion: str
    error_type: str  # Grammar | Spelling | Punctuation | Word Choice | Sentence Structure

class GrammarResponse(BaseModel):
    corrected_text: str
    errors: list[GrammarError]
    credits_used: int = 5

@router.post("/", response_model=GrammarResponse)
async def check_grammar(req: GrammarRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    if len(req.text) > 5000:
        raise HTTPException(status_code=400, detail="Text exceeds 5000 character limit")

    prompt = f"""You are a professional grammar checker. Analyze the following text and:
1. Provide a corrected version
2. List ALL errors found with: position (character index), original error, correction suggestion, and error type

Error types: Grammar, Spelling, Punctuation, Word Choice, Sentence Structure

Text:
{req.text}

Respond in JSON format:
{{
  "corrected_text": "...",
  "errors": [
    {{"position": 0, "original": "...", "suggestion": "...", "error_type": "..."}}
  ]
}}"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2000,
        response_format={"type": "json_object"}
    )

    import json
    data = json.loads(response.choices[0].message.content)

    errors = [GrammarError(**e) for e in data.get("errors", [])]

    return GrammarResponse(
        corrected_text=data.get("corrected_text", req.text),
        errors=errors
    )
