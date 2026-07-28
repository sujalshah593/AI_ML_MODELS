import json
import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_interview_questions(resume_data, job_data):

    prompt = f"""
You are a Senior Technical Interviewer.

Candidate Resume:

{json.dumps(resume_data, indent=2)}

Job Description:

{json.dumps(job_data, indent=2)}

Generate interview questions based on both.

Return ONLY valid JSON.

Schema:

{{
    "technical": [],
    "behavioral": [],
    "hr": [],
    "coding": []
}}

Requirements:

- 8 Technical Questions
- 5 Behavioral Questions
- 5 HR Questions
- 5 Coding Questions

Coding questions should be DSA based according to the job.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    result = response.choices[0].message.content

    cleaned = (
        result.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)