"""Auth Router — Credit Check & Deduction via Supabase REST API"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os

router = APIRouter(prefix="/auth", tags=["Auth"])

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")

CREDIT_COSTS = {
    "rewriter": 10,
    "grammar": 5,
    "ai_detect": 8,
    "summarize": 15,
    "citation": 3,
    "plagiarism": 20
}

class CreditCheckRequest(BaseModel):
    user_id: str
    tool: str

class CreditCheckResponse(BaseModel):
    has_credits: bool
    current_credits: int
    cost: int

class DeductRequest(BaseModel):
    user_id: str
    tool: str
    input_tokens: int = 0
    output_tokens: int = 0

class DeductResponse(BaseModel):
    success: bool
    remaining_credits: int


def get_supabase_headers():
    return {
        "apikey": SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
    }


@router.post("/check", response_model=CreditCheckResponse)
async def check_credits(req: CreditCheckRequest):
    cost = CREDIT_COSTS.get(req.tool, 1)

    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/users?id=eq.{req.user_id}&select=credits",
            headers=get_supabase_headers(),
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to check credits")

    data = resp.json()
    if not data:
        raise HTTPException(status_code=404, detail="User not found")

    current_credits = data[0].get("credits", 0)
    return CreditCheckResponse(
        has_credits=current_credits >= cost,
        current_credits=current_credits,
        cost=cost
    )


@router.post("/deduct", response_model=DeductResponse)
async def deduct_credits(req: DeductRequest):
    cost = CREDIT_COSTS.get(req.tool, 1)

    async with httpx.AsyncClient() as client:
        # Get current credits
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/users?id=eq.{req.user_id}&select=credits",
            headers=get_supabase_headers(),
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch user")

        data = resp.json()
        if not data:
            raise HTTPException(status_code=404, detail="User not found")

        current = data[0].get("credits", 0)
        if current < cost:
            raise HTTPException(status_code=400, detail="Insufficient credits")

        new_credits = current - cost

        # Update credits
        update_resp = await client.patch(
            f"{SUPABASE_URL}/rest/v1/users?id=eq.{req.user_id}",
            headers=get_supabase_headers(),
            json={"credits": new_credits},
        )

        if update_resp.status_code not in (200, 204):
            raise HTTPException(status_code=500, detail="Failed to deduct credits")

        # Log usage
        await client.post(
            f"{SUPABASE_URL}/rest/v1/usage_logs",
            headers=get_supabase_headers(),
            json={
                "user_id": req.user_id,
                "tool": req.tool,
                "input_tokens": req.input_tokens,
                "output_tokens": req.output_tokens,
                "credits_used": cost,
            },
        )

    return DeductResponse(success=True, remaining_credits=new_credits)
