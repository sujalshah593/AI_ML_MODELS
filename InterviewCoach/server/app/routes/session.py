from fastapi import APIRouter
from pydantic import BaseModel

from app.services.interview_generator import generate_interview_questions
from app.services.session_manager import (
    create_session,
    get_current_question,
    submit_answer
)

router = APIRouter()


class SessionRequest(BaseModel):
    resume_data: dict
    job_data: dict


class AnswerRequest(BaseModel):
    answer: str


@router.post("/create-session")
async def create_interview(request: SessionRequest):

    questions = generate_interview_questions(
        request.resume_data,
        request.job_data
    )

    session_id = create_session(
        request.resume_data,
        request.job_data,
        questions
    )

    return {
        "message": "Interview Session Created",
        "session_id": session_id,
        "questions": questions
    }


@router.get("/session/{session_id}/question")
async def current_question(session_id: str):

    question = get_current_question(session_id)

    if question is None:
        return {
            "message": "Session not found"
        }

    return question


@router.post("/session/{session_id}/answer")
async def answer_question(
    session_id: str,
    request: AnswerRequest
):

    result = submit_answer(
        session_id,
        request.answer
    )

    if result is None:
        return {
            "message": "Session not found"
        }

    return result