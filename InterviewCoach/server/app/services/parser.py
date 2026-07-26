import fitz
from docx import Document

def extract_pdf_text(file_path: str):
    text = ""

    doc = fitz.open(file_path)

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


def extract_docx_text(file_path: str):
    doc = Document(file_path)

    text = "\n".join([para.text for para in doc.paragraphs])

    return text