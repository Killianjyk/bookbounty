from main import app
from queries.books import BooksQueries
from fastapi.testclient import TestClient
from queries.api import OpenLibraryQueries, RandomWordQuery
from tests.test_queries import (
    FakeBooksQueries,
    FakeOpenLibraryQueries,
    FakeRandomWordQuery,
)

client = TestClient(app)


def test_track_book():
    # arrange
    app.dependency_overrides[BooksQueries] = FakeBooksQueries
    book_in = {
        "work_id": "/books/12345",
        "title": "title working",
        "author": "author working",
    }
    # act
    response = client.post("/api/books/", json=book_in)
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "id": "12345",
        "work_id": "/books/12345",
        "title": "title working",
        "author": "author working",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_top_favorited_books():
    # arrange
    app.dependency_overrides[BooksQueries] = FakeBooksQueries
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
        "title": "title working",
        "author": "author working",
        "description": "description working",
        "image": "image working",
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
        "title": "title working",
        "author": "author working",
        "description": "description working",
        "image": "image working",
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
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12346",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12347",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12348",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12349",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12350",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12351",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12352",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12353",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
            {
                "work_id": "/books/12354",
                "title": "title working",
                "author": "author working",
                "description": "description working",
                "image": "image working",
            },
        ]
    }
    # cleanup
    app.dependency_overrides = {}
