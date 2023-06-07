from pydantic import BaseModel
from .books import Search
from typing import List


class UserIn(BaseModel):
    email: str
    username: str
    password: str
    full_name: str


class UserOut(BaseModel):
    id: str
    email: str
    username: str
    full_name: str


class UserOutPassword(UserOut):
    password: str


# for view
class UserList(BaseModel):
    users: List[UserOut]


class UserUpdate(BaseModel):
    email: str
    password: str
    full_name: str
