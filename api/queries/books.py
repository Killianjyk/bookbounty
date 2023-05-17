from models.users import UsersBooks
from pymongo.errors import DuplicateKeyError
from .client import MongoQueries


class DuplicateUserError(ValueError):
    pass


class BooksQueries(MongoQueries):
    collection_name = "books"

    def newbooklists(self):
        booklists = UsersBooks()

        response = self.collection.insert_one(booklists)

        return str(response)
