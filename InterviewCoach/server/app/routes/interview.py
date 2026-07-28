from fastapi import APIRouter
from pydantic import BaseModel

from app.services.interview_generator import generate_interview_questions

router = APIRouter()


class InterviewRequest(BaseModel):
    resume_data: dict
    job_data: dict


@router.post("/generate-interview")
async def generate_interview(request: InterviewRequest):

    questions = generate_interview_questions(
        request.resume_data,
        request.job_data
    )

    return {
        "message": "Interview questions generated successfully",
        "questions": questions
    }