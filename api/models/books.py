from pydantic import BaseModel
from typing import List


class BookIn(BaseModel):
    work_id: str
    title: str
    author: str


class BookOut(BaseModel):
    id: str
    work_id: str
    title: str
    author: str
    favorited_by: int


# for view
class BookList(BaseModel):
    books: List[BookOut]
