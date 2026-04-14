"""Auth Router — Credit Check & Deduction"""
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from supabase import create_client, Client
import os

router = APIRouter(prefix="/auth", tags=["Auth"])
supabase: Client = create_client(
    os.getenv("SUPABASE_URL", ""),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
)

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

@router.post("/check", response_model=CreditCheckResponse)
async def check_credits(req: CreditCheckRequest):
    cost = CREDIT_COSTS.get(req.tool, 1)

    user = supabase.table("users").select("credits").eq("id", req.user_id).single().execute()

    if not user.data:
        raise HTTPException(status_code=404, detail="User not found")

    return CreditCheckResponse(
        has_credits=user.data["credits"] >= cost,
        current_credits=user.data["credits"],
        cost=cost
    )

@router.post("/deduct", response_model=DeductResponse)
async def deduct_credits(req: DeductRequest):
    cost = CREDIT_COSTS.get(req.tool, 1)

    try:
        supabase.rpc("deduct_credits", {"user_id": req.user_id, "amount": cost}).execute()

        user = supabase.table("users").select("credits").eq("id", req.user_id).single().execute()

        # Log usage
        supabase.table("usage_logs").insert({
            "user_id": req.user_id,
            "tool": req.tool,
            "input_tokens": req.input_tokens,
            "output_tokens": req.output_tokens,
            "credits_used": cost
        }).execute()

        return DeductResponse(success=True, remaining_credits=user.data["credits"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
