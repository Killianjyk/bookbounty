from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from models.authenticator import authenticator
from pydantic import BaseModel
from queries.users import UserQueries, DuplicateUserError
from models.users import (
    UserIn,
    UserOut,
    UserList
)
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
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = users.signup(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an user with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, users)
    return UserToken(user=user, **token.dict())


@router.get("/api/users/", response_model=UserList)
def get_all_users(
    users: UserQueries = Depends()
):
    return { "users": users.get_all() }


@router.get("/api/users/account/", response_model=UserOut)
def get_user(
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return users.get_user(user_data["username"])
