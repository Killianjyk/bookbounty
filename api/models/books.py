from pydantic import BaseModel
from typing import List


#object where we store the book
class BookIn(BaseModel):
    work_id: str
    title: str
    author: str


class BookOut(BaseModel):
    id: str
    work_id: str
    title: str
    author: str


class BookList(BaseModel):
    books: List[BookOut]
