from datetime import datetime
from bson import ObjectId
from app.utils.database import sessions_collection
from app.services.evaluator import evaluate_answer



def create_session(user_id, resume_data, job_data, questions):

    session = {
        "user_id": user_id,
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

        sessions_collection.update_one(
            {"_id": ObjectId(session_id)},
            {
                "$set": {
                    "status": "completed"
                }
            }
        )
        return {
            "completed": True
        }
    current_question = all_questions[current_index]

    evaluation = evaluate_answer(
        current_question["question"],
        answer,
        session["job_data"]
    )

    next_index = current_index + 1
    status = "ongoing"
    if next_index >= len(all_questions):
        status = "completed"

    sessions_collection.update_one(
        {"_id": ObjectId(session_id)},
        {
            "$push": {
                "answers": answer,
                "scores": evaluation["score"],
                "feedbacks": evaluation
            },
            "$set": {
                "current_question": current_index + 1,
                "status": status
            },
        }
    )

    return {
        "question": current_question["question"],
        "evaluation": evaluation,
        "next_question": current_index + 2
    }

def get_interview_report(session_id):

    session = get_session(session_id)

    if not session:
        return None

    scores = session.get("scores", [])
    feedbacks = session.get("feedbacks", [])

    if len(scores) == 0:
        average_score = 0
    else:
        average_score = round(sum(scores) / len(scores), 2)

    strengths = []
    weaknesses = []

    for feedback in feedbacks:
        strengths.extend(feedback.get("strengths", []))
        weaknesses.extend(feedback.get("weaknesses", []))

    report = {
         "overall_score": average_score,
        "questions_answered": len(scores),
        "total_questions": sum(
            len(session["questions"][category])
            for category in ["technical", "behavioral", "hr", "coding"]
        ),
        "strengths": list(set(strengths)),
        "weaknesses": list(set(weaknesses)),
        "completed": session["status"] == "completed"
    }

    if average_score >= 9:
        report["recommendation"] = "Excellent performance. You are interview ready."
    elif average_score >= 7:
        report["recommendation"] = "Good performance. PRactice a little more."
    elif average_score >= 5:
        report["recommendation"] = "Average performance. Consider more preparation."
    else:
        report["recommendation"] = "Poor performance. Significant improvement needed."

    return report

def get_interview_history(user_id):
    
    sessions = sessions_collection.find({"user_id": user_id})

    history = []

    for session in sessions:

        scores = session.get("scores", [])

        average_score = 0

        if scores:
            average_score = round(sum(scores) / len(scores), 2)

        history.append({
            "session_id": str(session["_id"]),
            "candidate": session["resume_data"].get("name"),
            "role": session["job_data"].get("role"),
            "questions_answered": len(scores),
            "overall_score": average_score,
            "status": session["status"],
            "created_at": session["created_at"].strftime("%Y-%m-%d %H:%M:%S")
        })

    return history

def get_session_details(session_id):
    session = get_session(session_id)

    if not session:
        return None

    session["_id"] = str(session["_id"])

    return session

def get_dashboard_stats(user_id):
    sessions = list(sessions_collection.find({"user_id": user_id}))

    total_interviews = len(sessions)

    completed = 0
    ongoing = 0

    all_scores = []

    for session in sessions:
        if session["status"] == "completed":
            completed += 1
        else:
            ongoing += 1

        all_scores.extend(session.get("scores", []))
    average_score = 0
    highest_score = 0
    lowest_score = 0

    if all_scores:
        average_score = round(sum(all_scores) / len(all_scores), 2)
        highest_score = max(all_scores)
        lowest_score = min(all_scores)

    return {
        "total_interviews": total_interviews,
        "completed_interviews": completed,
        "ongoing_interviews": ongoing,
        "average_score": average_score,
        "highest_score": highest_score,
        "lowest_score": lowest_score
    }