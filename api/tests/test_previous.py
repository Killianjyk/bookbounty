from main import app
from fastapi.testclient import TestClient
from queries.previous import PreviousQueries
from queries.users import UserQueries
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries
from models.usersbookslists import UsersBooksIn
from models.books import BookOut, BookIn
from models.authenticator import authenticator as auth
client = TestClient(app)


def fake_get_current_account_data():
    return {"username":"username", "id": "user_id"}


class FakePreviousQueries:
    def is_logged(self, work_id: str, user_id: str):
        return True

    def remove_previous(self, work_id: str, user_id: str):
        return True

    def new_previous(
        self,
        previous_in: UsersBooksIn,
        user_id: str,
        book_id: str,
    ):
        previous = previous_in.dict()
        previous["user_id"] = user_id
        previous["book_id"] = book_id
        previous["id"] = "12345"
        return previous

class FakeUserQueries:
    def get_user(self, username: str):
        return {"id":"hello"}


class FakeBooksQueries:
    def decrement_previous(self, work_id: str):
        return

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
    app.dependency_overrides[PreviousQueries] = FakePreviousQueries
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
    res = client.post("/api/previous/", json=user_book_in)
    assert res.status_code == 200
    assert res.json() == {
        "user_id": "user_id",
        "book_id": "12345",
        "id": "12345",
        "work_id": "12345",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_user_previous():
    # arrange
    # act
    # assert
    # cleanup
    pass


def test_check_previous():
    # arrange
    app.dependency_overrides[PreviousQueries] = FakePreviousQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[auth.try_get_current_account_data] = fake_get_current_account_data
    # act
    response = client.get("/api/previous/hello/12345/")
    # assert
    assert response.status_code == 200
    assert response.json() == True
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
    assert res.status_code == 200
    assert data == True
    # cleanup
    app.dependency_overrides = {}
