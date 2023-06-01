from fastapi import APIRouter, Depends, status, HTTPException
from typing import Optional
from models.authenticator import authenticator as auth
from queries.reviews import ReviewsQueries
from models.reviews import Review, ReviewList, ReviewOut

router = APIRouter()


@router.get("/api/reviews/all/", response_model=ReviewList)
def get_all_reviews(
    reviews: ReviewsQueries = Depends(),
):
    return {"reviews": reviews.get_reviews()}

@router.get("/api/reviews/{work_id}", response_model=ReviewList)
def get_book_reviews(
    work_id: str,
    reviews: ReviewsQueries = Depends()
):
    return {"reviews": reviews.get_book_reviews("/books/" + work_id)}

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
    return ReviewOut(**reviews.new_review(review_in, user_data["id"]))

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
    return {"reviews": reviews.get_user_reviews(user_data["id"])}

@router.delete("/api/reviews/{work_id}")
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
