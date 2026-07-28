import json
import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def compare_resume_job(resume_data, job_data):

    prompt = f"""
You are an expert ATS and Technical Recruiter.

Compare the candidate's resume with the job description.

Resume:

{json.dumps(resume_data, indent=2)}

Job:

{json.dumps(job_data, indent=2)}

Return ONLY valid JSON.

Schema:

{{
    "match_score": 0,
    "matched_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": [],
    "recommendations": []
}}
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