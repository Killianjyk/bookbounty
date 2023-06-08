from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator as auth
from queries.next import NextQueries
from models.usersbookslists import UsersBooksIn, UsersBooksOut, NextList
from typing import Optional
from queries.users import UserQueries
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries
from models.books import BookInData

router = APIRouter()


@router.post("/api/next/", response_model=UsersBooksOut)
def add_to_user_list(
    info: UsersBooksIn,
    next: NextQueries = Depends(),
    books: BooksQueries = Depends(),
    open_library: OpenLibraryQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    book_info = books.get_book(info.work_id)
    if not book_info:
        book_details = open_library.get_book_details(info.work_id)
        book_info = books.new_book(BookInData(**book_details))
    return next.new_next(info, user_data["id"], book_info.id)


@router.get("/api/next/{username}/", response_model=NextList)
def get_user_next(
    username: str,
    next: NextQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends(),
):
    user_id = users.get_user(username)["id"]
    next_books_work_ids = next.user_up_next(user_id)
    next_books = []
    for work_id in next_books_work_ids:
        next_books.append(books.get_book(work_id))
    return {"next": next_books}


@router.get("/api/next/{username}/{work_id}/", response_model=bool)
def check_next(
    work_id: str,
    username: str,
    next: NextQueries = Depends(),
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return next.is_queued(
        "/books/" + work_id,
        users.get_user(username)["id"],
    )


@router.delete("/api/next/{username}/{work_id}/", response_model=bool)
def remove_next(
    work_id: str,
    username: str,
    next: NextQueries = Depends(),
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(auth.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return next.remove_next(
        "/books/" + work_id,
        users.get_user(username)["id"],
    )
