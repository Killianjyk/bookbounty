from pydantic import BaseModel
from typing import List


class BookIn(BaseModel):
    work_id: str
    title: str
    author: str


class BookInData(BookIn):
    image: str


class BookOut(BaseModel):
    id: str
    work_id: str
    title: str
    author: str
    image: str


class BookOutData(BookOut):
    favorited_by: int


class BookDetailOut(BaseModel):
    work_id: str
    title: str
    author: str
    description: str
    image: str
    publish_date: str


class BookList(BaseModel):
    books: List[BookOut]


class BookDataList(BaseModel):
    books: List[BookOutData]


class BookDetailsList(BaseModel):
    books: List[BookDetailOut] = []
