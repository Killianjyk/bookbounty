from pydantic import BaseModel
from typing import List
from books import BookList


class UserIn(BaseModel):
    email: str
    username: str
    password: str
    full_name: str


class UsersBooks(BaseModel):
    favorites: BookList
    previous: BookList
    next: BookList


class UserData(UserIn):
    book_list: UsersBooks


class UserOut(BaseModel):
    id: str
    email: str
    username: str
    full_name: str


class UserOutPassword(UserOut):
    password: str


class UserList(BaseModel):
    users: List[UserOut]
