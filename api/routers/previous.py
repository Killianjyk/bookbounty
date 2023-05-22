from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from queries.previous import PreviousQueries
from models.usersbookslists import UsersBooksIn, UsersBooksOut, PreviousList
from typing import Optional
from queries.users import UserQueries
from queries.books import BooksQueries

router = APIRouter()


@router.post("/api/previous/", response_model=UsersBooksOut)
def add_to_user_list(
    info: UsersBooksIn,
    previous: PreviousQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return previous.new_previous(info, user_data["id"])


@router.get("/api/previous/{username}/", response_model=PreviousList)
def get_user_previous(
    username: str,
    previous: PreviousQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends()
):
    user_id = users.get_user(username)["id"]
    previous_books_ids = previous.user_previous(user_id)
    previous_books = []
    for book_ids in previous_books_ids:
        previous_books.append(books.get_book(book_ids))
    return { "previous": previous_books }


@router.delete("/api/previous/{username}/{work_id}/", response_model=bool)
def remove_previous(
    work_id: str,
    username: str,
    previous: PreviousQueries = Depends(),
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return previous.remove_previous(work_id, users.get_user(username)["id"])
