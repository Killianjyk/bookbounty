from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from queries.favorites import FavoritesQueries
from models.books import BookIn
from models.usersbookslists import UsersBooksIn, UsersBooksOut, FavoritesList
from typing import Optional
from queries.users import UserQueries
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries

router = APIRouter()


@router.post("/api/favorites/", response_model=UsersBooksOut)
def add_to_user_list(
    info: UsersBooksIn,
    books: BooksQueries = Depends(),
    favorites: FavoritesQueries = Depends(),
    open_library: OpenLibraryQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
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
    favorited_book = favorites.new_favorite(info, user_data["id"], book_info.id)
    books.increment_favorites(info.work_id)
    return favorited_book


@router.get("/api/favorites/{username}/", response_model=FavoritesList)
def get_user_favorites(
    username: str,
    favorites: FavoritesQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends(),
):
    user_id = users.get_user(username)["id"]
    favorite_books_work_ids = favorites.user_favorites(user_id)
    favorite_books = []
    for work_id in favorite_books_work_ids:
        favorite_books.append(books.get_book(work_id))
    return {"favorites": favorite_books}


@router.get("/api/favorites/{username}/{work_id}/", response_model=bool)
def check_favorite(
    work_id: str,
    username: str,
    favorites: FavoritesQueries = Depends(),
    users: UserQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return favorites.is_favorited(
        "/books/" + work_id,
        users.get_user(username)["id"],
    )


@router.delete("/api/favorites/{username}/{work_id}/", response_model=bool)
def remove_favorite(
    work_id: str,
    username: str,
    favorites: FavoritesQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    if favorites.remove_favorite(
        "/books/" + work_id,
        users.get_user(username)["id"],
    ):
        books.decrement_favorites("/books/" + work_id)
        return True
    return False
