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


class BookOutData(BookOut):
    favorited_by: int


class BookDetailOut(BaseModel):
    work_id: str
    title: str
    author: str
    description: str
    image: str


class BookList(BaseModel):
    books: List[BookOut]
