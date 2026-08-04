from fastapi import APIRouter, Depends
from app.models.user import UserRegister, UserLogin
from app.services.auth_service import (
    register_user, 
    login_user,
    get_user
)

from app.auth.dependencies import get_current_user

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

@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    user = get_user(current_user["sub"])

    if user is None:
        return {
            "message": "User not found"
        }
    return {
        "name": user["name"],
        "email": user["email"]
    }

