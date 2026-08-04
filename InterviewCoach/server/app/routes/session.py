from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.auth.dependencies import get_current_user
from app.services.interview_generator import generate_interview_questions
from app.services.session_manager import (
    create_session,
    get_current_question,
    submit_answer,
    get_interview_report,
    get_interview_history,
    get_session_details,
    get_dashboard_stats
)

router = APIRouter()


class SessionRequest(BaseModel):
    resume_data: dict
    job_data: dict


class AnswerRequest(BaseModel):
    answer: str


@router.post("/create-session")
async def create_interview(
    request: SessionRequest,
    current_user=Depends(get_current_user)
):

    questions = generate_interview_questions(
        request.resume_data,
        request.job_data
    )

    session_id = create_session(
        current_user["sub"],
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

@router.get("/session/{session_id}/report")
async def interview_report(session_id: str):
    report = get_interview_report(session_id)

    if report is None:
        return {
            "message": "Session not found"
        }

    return report

@router.get("/history")
async def interview_history(
    current_user=Depends(get_current_user)
):
    history = get_interview_history(current_user["sub"])

    return {
        "total_interviews": len(history),
        "history": history
    }

@router.get("/session/{session_id}")
async def session_details(session_id: str):

    session = get_session_details(session_id)

    if session is None:
        return {
            "message": "Session not found"
        }

    return session


@router.get("/dashboard")
async def dashboard_stats(
    current_user=Depends(get_current_user)
):
    stats = get_dashboard_stats(current_user["sub"])

    return stats