from pydantic import BaseModel
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
