from main import app
from fastapi.testclient import TestClient
from queries.next import NextQueries
from queries.users import UserQueries
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries
from models.usersbookslists import UsersBooksIn
from models.books import BookOut, BookIn
from models.authenticator import authenticator as auth
client = TestClient(app)

def fake_get_current_account_data():
    return {"username":"username", "id": "user_id"}


class FakeNextQueries:
    def is_queued(self, work_id: str, user_id: str):
        return True

    def remove_next(self, work_id: str, user_id: str):
        return True

    def new_next(self, next_in: UsersBooksIn, user_id: str, book_id: str):
        next = next_in.dict()
        next["user_id"] = user_id
        next["book_id"] = book_id
        next["id"] = "12345"
        return next


class FakeUserQueries:
    def get_user(self, username: str):
        return {"id":"user_id"}


class FakeBooksQueries:
    def get_book(self, work_id: str):
        return BookOut(**{
            "id": "12345",
            "work_id": work_id,
            "title": "title",
            "author": "author",
        })


class FakeOpenLibraryQueries:
    def get_book_details(self, work_id: str):
        return {
            "work_id": work_id,
            "title": "title",
            "author": "author",
            "description": "string",
            "image": "string",
        }


def test_add_to_user_list():
    app.dependency_overrides[NextQueries] = FakeNextQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries
    app.dependency_overrides[OpenLibraryQueries] = FakeOpenLibraryQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    user_book_in = {
        "work_id": "12345"
    }
    # act
    res = client.post("/api/next/", json=user_book_in)
    assert res.status_code == 200
    assert res.json() == {
        "user_id": "user_id",
        "book_id": "12345",
        "id": "12345",
        "work_id": "12345",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_user_next():
    # arrange
    # act
    # assert
    # cleanup
    pass


def test_check_next():
    # arrange
    app.dependency_overrides[NextQueries] = FakeNextQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[auth.try_get_current_account_data] = fake_get_current_account_data
    # act
    response = client.get("/api/next/username/12345/")
    # assert
    assert response.status_code == 200
    assert response.json() == True
    # cleanup
    app.dependency_overrides = {}


def test_remove_next():
    # arrange
    app.dependency_overrides[NextQueries] = FakeNextQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries

    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    # act
    res = client.delete("/api/next/username/123abc")
    data = res.json()
    # assert
    assert res.status_code == 200
    assert data == True
    # cleanup
    app.dependency_overrides = {}
