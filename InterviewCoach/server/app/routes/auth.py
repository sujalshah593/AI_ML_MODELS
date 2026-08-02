from fastapi import APIRouter
from app.models.user import UserRegister, UserLogin
from app.services.auth_service import register_user, login_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
async def register(request: UserRegister):
    user = register_user(request)

    if user is None:
        return {
            "message": "Email already exists"
        }
    return {
        "message": "User registered successfully"
    }

@router.post("/login")
async def login(request: UserLogin):
    token = login_user(request)

    if token is None:
        return {
            "message": "Invalid email or password"
        }
    return token