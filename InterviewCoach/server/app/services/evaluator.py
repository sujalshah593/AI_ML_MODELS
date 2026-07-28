import json
import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def evaluate_answer(question, answer, job_data):

    prompt = f"""
You are a Senior Technical Interviewer.

Job Role:

{job_data}

Interview Question:

{question}

Candidate Answer:

{answer}

Evaluate the answer.

Return ONLY valid JSON.

Schema:

{{
    "score": 0,
    "feedback": "",
    "strengths": [],
    "weaknesses": [],
    "ideal_answer": ""
}}

Scoring:

0-3 Poor

4-6 Average

7-8 Good

9-10 Excellent
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