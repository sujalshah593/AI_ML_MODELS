from fastapi import APIRouter
from pydantic import BaseModel

from app.services.evaluator import evaluate_answer

router = APIRouter()


class EvaluationRequest(BaseModel):
    question: str
    answer: str
    job_data: dict


@router.post("/evaluate-answer")
async def evaluate(request: EvaluationRequest):

    result = evaluate_answer(
        request.question,
        request.answer,
        request.job_data
    )

    return {
        "message": "Answer evaluated successfully",
        "evaluation": result
    }