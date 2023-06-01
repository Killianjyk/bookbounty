from main import app
from fastapi.testclient import TestClient
from queries.previous import PreviousQueries
from queries.users import UserQueries
from models.authenticator import authenticator as auth
client = TestClient(app)


def fake_get_current_account_data():
    return {"username":"hello"}


class FakePreviousQueries:
    def is_logged(self, work_id: str, user_id: str):
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
    # act
    # assert
    # cleanup
    pass
