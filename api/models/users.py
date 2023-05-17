from pydantic import BaseModel
from typing import List
from books import UsersBookList


class UserIn(BaseModel):
    email: str
    username: str
    password: str
    full_name: str


class UserInData(UserIn):
    list: UsersBookList


class UserOut(BaseModel):
    id: str
    email: str
    username: str
    full_name: str


class UserOutPassword(UserOut):
    password: str


class UserList(BaseModel):
    users: List[UserOut]
