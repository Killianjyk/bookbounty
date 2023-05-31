from pydantic import BaseModel
from .books import BookOut
from typing import List


class UsersBooksIn(BaseModel):
    work_id: str  # in form "books/work_id_str"


class UsersBooksOut(BaseModel):
    id: str
    user_id: str
    book_id: str
    work_id: str


# for view
class FavoritesList(BaseModel):
    favorites: List[BookOut]


class PreviousList(BaseModel):
    previous: List[BookOut]


class NextList(BaseModel):
    next: List[BookOut]
