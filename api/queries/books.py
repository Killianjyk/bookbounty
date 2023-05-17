from pymongo.errors import DuplicateKeyError
from .client import MongoQueries
from models.books import BookIn

class BookUserError(ValueError):
    pass

class BooksQueries(MongoQueries):
    collection_name = "books"

    def new_book(self, book_data: BookIn):
        pass


    def get_book(self, work_id: str):
        pass


    def get_books(self):
        pass
