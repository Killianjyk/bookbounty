from main import app
from fastapi.testclient import TestClient
from queries.next import NextQueries
from queries.users import UserQueries
from models.authenticator import authenticator as auth
client = TestClient(app)

def fake_get_current_account_data():
    return {"username":"hello"}


class FakeNextQueries:
    def is_queued(self, work_id: str, user_id: str):
        return True


class FakeUserQueries:
    def get_user(self, username: str):
        return {"id":"hello"}

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
    # act
    # assert
    # cleanup
    pass
