from pydantic import BaseModel
from .books import BookOut
from typing import List


class FavoriteIn(BaseModel):
    book_id: str
    book_work_id: str


class FavoriteOut(BaseModel):
    id: str
    user_id: str
    book_id: str
    book_work_id: str


# for view
class FavoritesList(BaseModel):
    favorites: List[BookOut]