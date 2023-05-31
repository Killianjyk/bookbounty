from .client import MongoQueries
from models.books import BookIn, BookOut


class BookUserError(ValueError):
    pass


class BooksQueries(MongoQueries):
    collection_name = "books"

    def new_book(self, book_data: BookIn):
        book = book_data.dict()
        search_for = self.collection.find_one({"work_id": book_data.work_id})
        if search_for:
            search_for["id"] = str(search_for["_id"])
            return BookOut(**search_for)
        book["favorited_by"] = 0
        response = self.collection.insert_one(book)
        if response.inserted_id:
            book["id"] = str(response.inserted_id)
        return BookOut(**book)

    def get_books(self):
        books = []
        for book in self.collection.find().sort("favorited_by", -1).limit(10):
            book["id"] = str(book["_id"])
            books.append(book)
        return books

    def get_book(self, work_id: str):
        book = self.collection.find_one({"work_id": work_id})
        if not book:
            return None
        book["id"] = str(book["_id"])
        return BookOut(**book)

    def increment_favorites(self, work_id: str):
        book = self.collection.find_one({"work_id": work_id})
        book["favorited_by"] += 1
        return

    def decrement_favorites(self, work_id: str):
        book = self.collection.find_one({"work_id": work_id})
        book["favorited_by"] -= 1
        return
