from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from queries.next import NextQueries
from models.usersbookslists import UsersBooksIn, UsersBooksOut, NextList
from typing import Optional
from queries.users import UserQueries
from queries.books import BooksQueries

router = APIRouter()


@router.post("/api/next/", response_model=UsersBooksOut)
def add_to_user_list(
    info: UsersBooksIn,
    next: NextQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return next.new_favorite(info, user_data["id"])


@router.get("/api/next/{username}/", response_model=NextList)
def get_user_next(
    username: str,
    next: NextQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends()
):
    user_id = users.get_user(username)["id"]
    favorite_books_ids = next.user_next(user_id)
    favorite_books = []
    for book_ids in favorite_books_ids:
        favorite_books.append(books.get_book(book_ids))
    return { "next": favorite_books }
    


