from pydantic import BaseModel
from typing import List


#object where we store the book
class Book(BaseModel):
    identifier: str


class BookList(BaseModel):
    books: List[Book]


class UsersBookList(BaseModel):
    favorites: BookList
    previous: BookList
    next: BookList
