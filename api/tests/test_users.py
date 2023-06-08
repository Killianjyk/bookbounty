from main import app
from tests.test_queries import FakeUserQueries, fake_get_current_account_data
from queries.users import UserQueries
from models.authenticator import authenticator as auth
from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_all_users():
    # arrange
    app.dependency_overrides[UserQueries] = FakeUserQueries
    # act
    response = client.get("/api/users/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "users": [
            {
                "username": "username",
                "id": "user id",
                "email": "email",
                "full_name": "full name",
            }
        ]
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_searched_users():
    # arrange
    app.dependency_overrides[UserQueries] = FakeUserQueries
    # act
    response = client.get("/api/users/username/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "users": [
            {
                "username": "username",
                "id": "user id",
                "email": "email",
                "full_name": "full name",
            }
        ]
    }
    # cleanup
    app.dependency_overrides = {}


def test_update_user():
    # arrange
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    user_update = {
        "email": "email@email.com",
        "password": "password",
        "full_name": "name",
    }
    # act
    response = client.put("/api/users/", json=user_update)
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "id": "user id",
        "username": "username",
        "email": "email@email.com",
        "full_name": "name",
    }
    # cleanup
    app.dependency_overrides = {}
