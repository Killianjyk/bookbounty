from main import app
from fastapi.testclient import TestClient
from queries.next import NextQueries
from queries.users import UserQueries
from queries.books import BooksQueries
from models.authenticator import authenticator as auth
client = TestClient(app)

def fake_get_current_account_data():
    return {"username":"hello"}


class FakeNextQueries:
    def is_queued(self, work_id: str, user_id: str):
        return True

    def remove_next(self, work_id: str, user_id: str):
        return True

class FakeUserQueries:
    def get_user(self, username: str):
        return {"id":"hello"}

class FakeBooksQueries:
    def decrement_next(self, work_id: str):
        return


def test_add_to_user_list():
    # arrange
    # act
    # assert
    # cleanup
    pass


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
    response = client.get("/api/next/hello/12345/")
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
    res = client.delete("/api/next/hello/123abc")
    data = res.json()
    # assert
    assert res.status_code == 200
    assert data == True
    # cleanup
    app.dependency_overrides = {}
