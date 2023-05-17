from pymongo.errors import DuplicateKeyError
from .client import MongoQueries
from models.books import BookIn, BookOut, BookList
from models.users import UsersBooks


class BookUserError(ValueError):
    pass


class BooksQueries(MongoQueries):
    collection_name = "books"

    def new_book(self, book_data: BookIn):
        book = book_data.dict()
        book["favorited_by"] = 0
        response = self.collection.insert_one(book)
        if response.inserted_id:
            book["id"] = str(response.inserted_id)
        return BookOut(**book)

    def get_books(self):
        books = []
        for book in self.collection.find():
            book["id"] = str(book["_id"])
            books.append(book)
        return books

    def get_book(self, work_id: str):
        book = self.collection.find_one({ "work_id": work_id })
        if not book:
            return None
        book["id"] = str(book["_id"])
        return BookOut(**book)
