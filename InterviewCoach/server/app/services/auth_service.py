from app.utils.database import users_collection
from app.auth.hashing import (
    hash_password,
    verify_password
)
from app.auth.jwt_handler import create_access_token

def register_user(user):

    existing = users_collection.find_one(
        {"email": user.email}
    )

    if existing:
        return None

    document = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }

    users_collection.insert_one(document)

    return document

def login_user(user):
    existing = users_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing is None:
        return None

    if not verify_password(
        user.password,
        existing["password"]
    ):
        return None
    token = create_access_token(
        {
            "sub": existing["email"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

def get_user(email):
    return users_collection.find_one(
        {
            "email": email
        }
    )