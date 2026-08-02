from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.resume import router as resume_router
from app.routes.job import router as job_router
from app.routes.match import router as match_router
from app.routes.interview import router as interview_router
from app.routes.evaluate import router as evaluate_router
from app.routes.session import router as session_router
from app.routes.auth import router as auth_router

app = FastAPI(
    title="Interview Coach API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router, prefix="/api")
app.include_router(job_router, prefix="/api")
app.include_router(match_router, prefix="/api")
app.include_router(interview_router, prefix="/api")
app.include_router(evaluate_router, prefix="/api")
app.include_router(session_router, prefix="/api")
app.include_router(auth_router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "Interview Coach API is running"
    }

from app.config import GROQ_API_KEY

print(GROQ_API_KEY)