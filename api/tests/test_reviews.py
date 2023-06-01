from main import app
from fastapi.testclient import TestClient
from models.authenticator import authenticator as auth
from queries.reviews import ReviewsQueries
from tests.test_queries import (
    fake_get_current_account_data,
    FakeReviewsQueries,
)

client = TestClient(app)


def test_get_all_reviews():
    # arrange
    app.dependency_overrides[ReviewsQueries] = FakeReviewsQueries
    # act
    response = client.get("/api/reviews/all/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "reviews": [{
            "id": "review id",
            "user_id": "user id",
            "work_id": "/books/12345",
            "stars": 5,
            "text": "review text",
        }]
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_book_reviews():
    # arrange
    app.dependency_overrides[ReviewsQueries] = FakeReviewsQueries
    # act
    response = client.get("/api/reviews/12345")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "reviews": [{
            "id": "review id",
            "user_id": "user id",
            "work_id": "/books/12345",
            "stars": 5,
            "text": "review text",
        }]
    }
    # cleanup
    app.dependency_overrides = {}


def test_make_book_review():
    # arrange
    app.dependency_overrides[ReviewsQueries] = FakeReviewsQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    review_in = {
        "work_id": "/books/12345",
        "stars": 5,
        "text": "review text",
    }
    # act
    response = client.post("/api/reviews/", json=review_in)
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "id": "review id",
        "user_id": "user id",
        "work_id": "/books/12345",
        "stars": 5,
        "text": "review text",
    }
    # cleanup
    app.dependency_overrides = {}


def test_get_user_reviews():
    # arrange
    app.dependency_overrides[ReviewsQueries] = FakeReviewsQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    # act
    response = client.get("/api/reviews/")
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "reviews": [{
            "id": "review id",
            "user_id": "user id",
            "work_id": "/books/12345",
            "stars": 5,
            "text": "review text",
        }]
    }
    # cleanup
    app.dependency_overrides = {}


def test_update_book_review():
    # arrange
    app.dependency_overrides[ReviewsQueries] = FakeReviewsQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    review_in = {
        "work_id": "/books/12345",
        "stars": 4,
        "text": "review text update",
    }
    # act
    response = client.put("/api/reviews/", json=review_in)
    # assert
    assert response.status_code == 200
    assert response.json() == {
        "id": "review id",
        "user_id": "user id",
        "work_id": "/books/12345",
        "stars": 4,
        "text": "review text update",
    }
    # cleanup
    app.dependency_overrides = {}


def test_delete_review():
    # arrange
    app.dependency_overrides[ReviewsQueries] = FakeReviewsQueries
    app.dependency_overrides[
        auth.try_get_current_account_data
    ] = fake_get_current_account_data
    # act
    response = client.delete("/api/reviews/{work_id}")
    # assert
    correct_response = True
    assert response.status_code == 200
    assert response.json() == correct_response
    # cleanup
    app.dependency_overrides = {}
