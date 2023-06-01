from main import app
from fastapi.testclient import TestClient
from queries.previous import PreviousQueries
from queries.users import UserQueries
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries
from models.authenticator import authenticator as auth
from tests.test_queries import (
    fake_get_current_account_data,
    FakePreviousQueries,
    FakeUserQueries,
    FakeBooksQueries,
    FakeOpenLibraryQueries,
)

client = TestClient(app)


def test_add_to_user_list():
    # arrange
    app.dependency_overrides[PreviousQueries] = FakePreviousQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries
    app.dependency_overrides[OpenLibraryQueries] = FakeOpenLibraryQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    user_book_in = {"work_id": "/books/12345"}
    # act
    res = client.post("/api/previous/", json=user_book_in)
    # assert
    assert res.status_code == 200
    assert res.json() == {
        "user_id": "user id",
        "book_id": "12345",
        "id": "prev id",
        "work_id": "/books/12345",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_user_previous():
    # arrange
    app.dependency_overrides[PreviousQueries] = FakePreviousQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries
    # act
    response = client.get("/api/previous/username/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "previous": [
            {
                "id": "12345",
                "work_id": "/books/12345",
                "title": "title working",
                "author": "author working",
            },
            {
                "id": "12345",
                "work_id": "/books/12346",
                "title": "title working",
                "author": "author working",
            },
        ]
    }
    # cleanup
    app.dependency_overrides = {}


def test_check_previous():
    # arrange
    app.dependency_overrides[PreviousQueries] = FakePreviousQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    # act
    response = client.get("/api/previous/hello/12345/")
    # assert
    correct_response = True
    assert response.status_code == 200
    assert response.json() == correct_response
    # cleanup
    app.dependency_overrides = {}


def test_remove_previous():
    # arrange
    app.dependency_overrides[PreviousQueries] = FakePreviousQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries

    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    # act
    res = client.delete("/api/previous/hello/123abc")
    data = res.json()
    # assert
    correct_response = True
    assert res.status_code == 200
    assert data == correct_response
    # cleanup
    app.dependency_overrides = {}
