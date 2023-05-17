from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from typing import Optional

router = APIRouter()


@router.get("/api/books/{type}/")
def get_books_of_type(
    type: str
):
    pass


@router.post("/api/books/{type}/")
async def add_book_to_a_list(
    type: str,
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if not user_data:
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    await user_data["list"][type].append()

