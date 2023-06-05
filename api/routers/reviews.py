from fastapi import APIRouter, Depends, status, HTTPException
from typing import Optional
from models.authenticator import authenticator as auth
from queries.reviews import ReviewsQueries
from models.reviews import Review, ReviewList, ReviewOut
from queries.users import UserQueries

router = APIRouter()


@router.get("/api/reviews/all/", response_model=ReviewList)
def get_all_reviews(
    reviews: ReviewsQueries = Depends(),
    users: UserQueries = Depends(),
):
    books_reviews = reviews.get_reviews()
    for book_review in books_reviews:
        book_review["username"] = users.get_by_id(book_review["user_id"])
    return {"reviews": books_reviews}

@router.get("/api/reviews/{work_id}/", response_model=ReviewList)
def get_book_reviews(
    work_id: str,
    reviews: ReviewsQueries = Depends(),
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    users_review = None
    books_reviews = reviews.get_book_reviews("/books/" + work_id)
    for book_review in books_reviews:
        book_review["username"] = users.get_by_id(book_review["user_id"])
        if user_data and user_data["username"] == book_review["username"]:
            users_review = book_review
            books_reviews.remove(book_review)
    if users_review:
        books_reviews.insert(0, users_review)
    return {"reviews": books_reviews}

@router.post("/api/reviews/", response_model=ReviewOut)
def make_book_review(
    review_in: Review,
    reviews: ReviewsQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    new_review = reviews.new_review(review_in, user_data["id"])
    new_review["username"] = user_data["username"]
    return ReviewOut(**new_review)

@router.put("/api/reviews/", response_model=ReviewOut)
def update_book_review(
    review_in: Review,
    reviews: ReviewsQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    reviews.update_review(review_in, user_data["id"])
    review = reviews.get_review(review_in.work_id, user_data["id"])
    review["username"] = user_data["username"]
    return ReviewOut(**review)

@router.get("/api/reviews/", response_model=ReviewList)
def get_user_reviews(
    reviews: ReviewsQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    books_reviews = reviews.get_user_reviews(user_data["id"])
    for book_review in books_reviews:
        book_review["username"] = user_data["username"]
    return {"reviews": books_reviews}

@router.delete("/api/reviews/{work_id}/", response_model=bool)
def delete_review(
    work_id: str,
    reviews: ReviewsQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return reviews.delete_review("/books/" + work_id, user_data["id"])
