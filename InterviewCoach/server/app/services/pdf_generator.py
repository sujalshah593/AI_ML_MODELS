import os 

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from reportlab.lib.styles import getSampleStyleSheet

from app.services.session_manager import get_session

def generate_pdf(session_id):

    session = get_session(session_id)

    if session is None:
        return None

    if not os.path.exists("reports"):
        os.makedirs("reports")

    pdf_path = f"reports/interview{session_id}.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "<b>AI Interview Coach Report</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    story.append(
         Paragraph(
            f"<b>Candidate:</b> {session['resume_data'].get('name','N/A')}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Email:</b> {session['resume_data'].get('email','N/A')}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Role:</b> {session['job_data'].get('role','N/A')}",
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 20))

    questions = []

    for category in ["technical", "behavioral", "hr", "coding"]:
        for q in session["questions"][category]:

            if isinstance(q, dict):
                questions.append(q["question"])
            else:
                questions.append(q)

    answers = session.get("answers", [])
    scores = session.get("scores", [])
    feedbacks = session.get("feedbacks", [])

    for i in range(len(questions)):

        story.append(
            Paragraph(
                f"<b>Question {i+1}</b>",
                styles["Heading2"]
            )
        )

        story.append(
            Paragraph(
                str(questions[i]),
                styles["Normal"]
            )
        )

        if i < len(answers):

            story.append(
                Paragraph(
                    f"<b>Answer:</b> {answers[i]}",
                    styles["Normal"]
                )
            )

        if i < len(scores):

            story.append(
                Paragraph(
                    f"<b>Score:</b> {scores[i]}/10",
                    styles["Normal"]
                )
            )

        if i < len(feedbacks):

            story.append(
                Paragraph(
                    f"<b>Feedback:</b> {feedbacks[i]}",
                    styles["Normal"]
                )
            )

        story.append(Spacer(1, 15))

        if scores:

            average = round(sum(scores)/len(scores),2)

            story.append(
                Paragraph(
                    f"<b>Overall Score:</b> {average}/10",
                    styles["Heading1"]
                )
            )

        doc.build(story)

        return pdf_path