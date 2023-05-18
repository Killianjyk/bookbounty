from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from queries.favorites import FavoritesQueries
from models.usersbookslists import UsersBooksIn, UsersBooksOut, FavoritesList
from typing import Optional
from queries.users import UserQueries
from queries.books import BooksQueries

router = APIRouter()


@router.post("/api/favorites/", response_model=UsersBooksOut)
def add_to_user_list(
    info: UsersBooksIn,
    favorites: FavoritesQueries = Depends(),
    user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
):
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in",
        )
    return favorites.new_favorite(info, user_data["id"])


@router.get("/api/favorites/{username}/", response_model=FavoritesList)
def get_user_favorites(
    username: str,
    favorites: FavoritesQueries = Depends(),
    users: UserQueries = Depends(),
    books: BooksQueries = Depends()
):
    user_id = users.get_user(username)["id"]
    favorite_books_ids = favorites.user_favorites(user_id)
    favorite_books = []
    for book_ids in favorite_books_ids:
        favorite_books.append(books.get_book(book_ids))
    return { "favorites": favorite_books }
    


