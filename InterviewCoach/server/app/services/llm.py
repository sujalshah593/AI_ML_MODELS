import json
import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def analyze_resume(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Parser.

Extract the following information from the resume.

Return ONLY valid JSON.

Schema:

{{
    "name": "",
    "email": "",
    "phone": "",
    "skills": [],
    "projects": [],
    "experience": [],
    "education": [],
    "certifications": [],
    "summary": ""
}}

Resume:

{resume_text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    result = response.choices[0].message.content

    cleaned = (
        result.replace("```json", "")
              .replace("```", "")
              .strip()
    )

    return json.loads(cleaned)