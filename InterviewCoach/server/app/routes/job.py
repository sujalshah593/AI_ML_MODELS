from fastapi import APIRouter
from pydantic import BaseModel

from app.services.job_analyzer import analyze_job_description

router = APIRouter()

class JobRequest(BaseModel):
    job_description: str

@router.post("/analyze-job")
async def analyze_job(request: JobRequest):

    data = analyze_job_description(request.job_description)

    return {
        "message": "Job description analyzed successfully",
        "job_data": data
    }