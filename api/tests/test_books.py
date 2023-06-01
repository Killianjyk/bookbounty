from main import app
from queries.books import BooksQueries
from models.books import BookIn
from fastapi.testclient import TestClient
from queries.api import OpenLibraryQueries, RandomWordQuery

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

    def search_api(self, string: str):
        return [
            "/books/12345",
            "/books/12346",
            "/books/12347",
            "/books/12348",
            "/books/12349",
            "/books/12350",
            "/books/12351",
            "/books/12352",
            "/books/12353",
            "/books/12354",
        ]


class FakeRandomWordQuery:
    def get_random_word(self):
        return ["word"]


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
    app.dependency_overrides[OpenLibraryQueries] = FakeOpenLibraryQueries
    app.dependency_overrides[RandomWordQuery] = FakeRandomWordQuery
    # act
    response = client.get("/api/books/discover/random/")
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


def test_search_books():
    # arrange
    app.dependency_overrides[OpenLibraryQueries] = FakeOpenLibraryQueries
    # act
    response = client.get("/api/books/discover/word/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "books": [
            {
                "work_id": "/books/12345",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12346",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12347",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12348",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12349",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12350",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12351",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12352",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12353",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
            {
                "work_id": "/books/12354",
                "title": "string",
                "author": "string",
                "description": "string",
                "image": "string",
            },
        ]
    }
    # cleanup
    app.dependency_overrides = {}
