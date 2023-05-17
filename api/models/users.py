from pydantic import BaseModel
from typing import List
from .books import BookList


class UserIn(BaseModel):
    email: str
    username: str
    password: str
    full_name: str


class UsersBooks(BaseModel):
    favorites: BookList
    previous: BookList
    next: BookList


class UserOut(BaseModel):
    id: str
    email: str
    username: str
    full_name: str


class UserData(UserOut):
    book_list: UsersBooks


class UserOutPassword(UserOut):
    password: str


# for view
class UserList(BaseModel):
    users: List[UserData]
