from main import app
from fastapi.testclient import TestClient
from queries.favorites import FavoritesQueries
from queries.users import UserQueries
from queries.books import BooksQueries
from models.authenticator import authenticator as auth
from models.usersbookslists import UsersBooksIn
from models.books import BookOut, BookIn
from queries.api import OpenLibraryQueries

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "username": "username",
        "id": "user_id",
    }


class FakeFavoritesQueries:
    def is_favorited(self, work_id: str, user_id: str):
        return True

    def remove_favorite(self, work_id: str, user_id: str):
        return True

    def new_favorite(
        self,
        favorite_in: UsersBooksIn,
        user_id: str,
        book_id: str,
    ):
        favorite = favorite_in.dict()
        favorite["user_id"] = user_id
        favorite["book_id"] = book_id
        favorite["id"] = "12345"
        return favorite
    
    def user_favorites(self, user_id: str):
        return ["/books/12345", "/books/12346"]


class FakeUserQueries:
    def get_user(self, username: str):
        return {"id": "username"}


class FakeBooksQueries:
    def decrement_favorites(self, work_id: str):
        return

    def increment_favorites(self, work_id: str):
        return

    def get_book(self, work_id: str):
        return BookOut(**{
            "id": "12345",
            "work_id": work_id,
            "title": "title",
            "author": "author",
        })

    def new_book(self, book_data: BookIn):
        book = book_data.dict()
        book["id"] = "12345"
        return BookOut(**book)


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
    # arrange
    app.dependency_overrides[FavoritesQueries] = FakeFavoritesQueries
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
    res = client.post("/api/favorites/", json=user_book_in)
    data = res.json()
    assert res.status_code == 200
    assert data == {
        "user_id": "user_id",
        "book_id": "12345",
        "id": "12345",
        "work_id": "12345",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_user_favorites():
    # arrange
    app.dependency_overrides[FavoritesQueries] = FakeFavoritesQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries
    # act
    response = client.get("/api/favorites/username/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "favorites": [{
            "id": "12345",
            "work_id": "/books/12345",
            "title": "title",
            "author": "author",
        }, {
            "id": "12345",
            "work_id": "/books/12346",
            "title": "title",
            "author": "author",
        }]
    }
    # cleanup
    app.dependency_overrides = {}


def test_check_favorite():
    # arrange
    app.dependency_overrides[FavoritesQueries] = FakeFavoritesQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[auth.try_get_current_account_data] = fake_get_current_account_data
    # act
    response = client.get("/api/favorites/username/12345/")
    # assert
    assert response.status_code == 200
    assert response.json() == True
    # cleanup
    app.dependency_overrides = {}


def test_remove_favorite():
    # arrange
    app.dependency_overrides[FavoritesQueries] = FakeFavoritesQueries
    app.dependency_overrides[UserQueries] = FakeUserQueries
    app.dependency_overrides[BooksQueries] = FakeBooksQueries

    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    # act
    res = client.delete("/api/favorites/username/123abc")
    data = res.json()
    # assert
    assert res.status_code == 200
    assert data == True
    # cleanup
    app.dependency_overrides = {}
