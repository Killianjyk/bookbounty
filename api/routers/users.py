from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from models.authenticator import authenticator as auth
from pydantic import BaseModel
from queries.users import UserQueries, DuplicateUserError
from models.users import UserIn, UserOut, UserList, UserUpdate
from typing import Optional

router = APIRouter()


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


@router.post("/api/users/", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    users: UserQueries = Depends(),
):
    hashed_password = auth.hash_password(info.password)
    try:
        user = users.signup(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an user with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await auth.login(response, request, form, users)
    return UserToken(user=user, **token.dict())


@router.get("/api/users/", response_model=UserList)
def get_all_users(users: UserQueries = Depends()):
    return {"users": users.get_all()}


@router.get("/api/users/{searched_username}", response_model=UserList)
def get_searched_users(searched_username: str, users: UserQueries = Depends()):
    return {"users": users.get_searched(searched_username)}


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(auth.try_get_current_account_data),
) -> UserToken | None:
    if user and auth.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[auth.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.put("/api/users/", response_model=UserOut)
def update_user(
    user_update: UserUpdate,
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    user_update = user_update.dict()
    if user_update["password"] != "":
        user_update["password"] = auth.hash_password(user_update["password"])
    if user_update["password"] == "":
        del user_update["password"]
    if user_update["email"] == "":
        del user_update["email"]
    if user_update["full_name"] == "":
        del user_update["full_name"]
    users.update_user(user_data["username"], {"$set": user_update})
    return users.get(user_data["username"])
