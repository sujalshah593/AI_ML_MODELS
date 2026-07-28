import json
import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_job_description(job_description:  str):

    prompt = f"""
You are an expert Technical Recruiter.

Analyze the following Job Description.

Return ONLY valid JSON.

Schema:

{{
    "role": "",
    "experience_level": "",
    "required_skills": [],
    "preferred_skills": [],
    "responsibilities": [],
    "soft_skills": [],
    "difficulty": ""
}}

Jov Description:

{job_description}
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