from app.utils.database import users_collection
from app.auth.hashing import hash_password

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