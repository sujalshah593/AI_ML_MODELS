from fastapi import APIRouter
from pydantic import BaseModel

from app.services.matcher import compare_resume_job

router = APIRouter()


class MatchRequest(BaseModel):
    resume_data: dict
    job_data: dict


@router.post("/match-resume")
async def match_resume(request: MatchRequest):

    result = compare_resume_job(
        request.resume_data,
        request.job_data
    )

    return {
        "message": "Resume matched successfully",
        "result": result
    }