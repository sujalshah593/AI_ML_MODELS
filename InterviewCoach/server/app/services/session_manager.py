from datetime import datetime
from bson import ObjectId
from app.utils.database import sessions_collection
from app.services.evaluator import evaluate_answer


def create_session(resume_data, job_data, questions):

    session = {
        "resume_data": resume_data,
        "job_data": job_data,
        "questions": questions,
        "current_question": 0,
        "answers": [],
        "scores": [],
        "feedbacks": [],
        "status": "ongoing",
        "created_at": datetime.utcnow()
    }

    result = sessions_collection.insert_one(session)

    return str(result.inserted_id)


def get_session(session_id):

    session = sessions_collection.find_one(
        {"_id": ObjectId(session_id)}
    )

    return session


def get_current_question(session_id):

    session = get_session(session_id)

    if not session:
        return None

    current_index = session["current_question"]

    all_questions = []

    for category in ["technical", "behavioral", "hr", "coding"]:

        for question in session["questions"][category]:

            all_questions.append({
                "category": category,
                "question": question
            })

    if current_index >= len(all_questions):
        return {
            "completed": True
        }

    return {
        "completed": False,
        "question_number": current_index + 1,
        "total_questions": len(all_questions),
        "category": all_questions[current_index]["category"],
        "question": all_questions[current_index]["question"]
    }

def submit_answer(session_id, answer):
    session = get_session(session_id)

    if not session:
        return None

    current_index = session["current_question"]

    all_questions = []

    for category in ["technical", "behavioral", "hr", "coding"]:
        for question in session["questions"][category]:
            all_questions.append({
                "category": category,
                "question": question
            })

    if current_index >= len(all_questions):
        return {
            "completed": True
        }
    current_question = all_questions[current_index]

    evaluation = evaluate_answer(
        current_question["question"],
        answer,
        session["job_data"]
    )

    sessions_collection.update_one(
        {"_id": ObjectId(session_id)},
        {
            "$push": {
                "answers": answer,
                "scores": evaluation["score"],
                "feedbacks": evaluation["feedback"]
            },
            "$set": {
                "current_question": current_index + 1
            }
        }
    )

    return {
        "question": current_question["question"],
        "evaluation": evaluation,
        "next_question": current_index + 2
    }