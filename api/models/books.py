from pydantic import BaseModel
from typing import List


class Book(BaseModel):
    work_id: str
    title: str
    author: str


# for view
class BookList(BaseModel):
    books: List[Book]
