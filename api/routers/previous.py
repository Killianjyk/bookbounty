from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from queries.previous import PreviousQueries
from models.usersbookslists import UsersBooksIn, UsersBooksOut, PreviousList
from typing import Optional
from queries.users import UserQueries
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries
from models.books import BookIn

router = APIRouter()


@router.post("/api/previous/", response_model=UsersBooksOut)
def add_to_user_list(
    info: UsersBooksIn,
    books: BooksQueries = Depends(),
    previous: PreviousQueries = Depends(),
    open_library: OpenLibraryQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    book_info = books.get_book(info.work_id)
    if not book_info:
        book_details = open_library.get_book_details(info.work_id)
        book_info = books.new_book(BookIn(**book_details))
    return previous.new_previous(info, user_data["id"], book_info.id)


@router.get("/api/previous/{username}/", response_model=PreviousList)
def get_user_previous(
    username: str,
    previous: PreviousQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends()
):
    user_id = users.get_user(username)["id"]
    previous_books_work_ids = previous.user_previous(user_id)
    previous_books = []
    for work_id in previous_books_work_ids:
        previous_books.append(books.get_book(work_id))
    return { "previous": previous_books }


@router.delete("/api/previous/{username}/{work_id}/", response_model=bool)
def remove_previous(
    work_id: str,
    username: str,
    users: UserQueries = Depends(),
    previous: PreviousQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return previous.remove_previous("/books/" + work_id, users.get_user(username)["id"])
