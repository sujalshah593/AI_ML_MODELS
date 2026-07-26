from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.parser import extract_pdf_text, extract_docx_text

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extension = file.filename.split(".")[-1].lower()

    if extension == "pdf":
        resume_text = extract_pdf_text(file_path)

    elif extension == "docx":
        resume_text = extract_docx_text(file_path)

    else:
        return {"error": "Unsupported file type"}

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "resume_text": resume_text
    }