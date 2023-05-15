from pydantic import BaseModel
from typing import List

class Book(BaseModel):
    identifier: str

class BookList(BaseModel):
    books: List[Book]