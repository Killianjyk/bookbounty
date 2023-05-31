from main import app
from queries.books import BooksQueries
from models.books import BookIn
from fastapi.testclient import TestClient
from queries.api import OpenLibraryQueries

client = TestClient(app)


class FakeBookQueries:
    def new_book(self, book_data: BookIn):
        return {
            "id": "12345",
            "work_id": book_data.work_id,
            "title": book_data.title,
            "author": book_data.author,
        }

    def get_books(self):
        return []


class FakeOpenLibraryQueries:
    def get_book_details(self, work_id: str):
        return {
            "work_id": work_id,
            "title": "string",
            "author": "string",
            "description": "string",
            "image": "string",
        }


# # faked logged in user
# from models.authenticator import authenticator
# def fake_get_current_account_data():
#     return {}


def test_track_book():
    # arrange
    app.dependency_overrides[BooksQueries] = FakeBookQueries
    book_in = {
        "work_id": "working id",
        "title": "title working",
        "author": "working author",
    }
    # act
    response = client.post("/api/books/", json=book_in)
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "id": "12345",
        "work_id": "working id",
        "title": "title working",
        "author": "working author",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_top_favorited_books():
    # arrange
    app.dependency_overrides[BooksQueries] = FakeBookQueries
    # act
    response = client.get("/api/books/")
    # assert
    assert response.status_code == 200
    assert response.json() == {"books": []}
    # cleanup
    app.dependency_overrides = {}


def test_get_book():
    # arrange
    app.dependency_overrides[OpenLibraryQueries] = FakeOpenLibraryQueries
    # act
    response = client.get("/api/books/12345/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "work_id": "/books/12345",
        "title": "string",
        "author": "string",
        "description": "string",
        "image": "string",
    }
    # cleanup
    app.dependency_overrides = {}


def test_random_book():
    # arrange
    # act
    # assert
    # cleanup
    pass


def test_search_books():
    # arrange
    # act
    # assert
    # cleanup
    pass
