from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from models.books import BookIn, BookOut
from queries.books import BooksQueries
from typing import Optional

router = APIRouter()


# @router.get("/api/books/{work_id}/{type}/")
# def get_books_of_type(
#     type: str
# ):
#     if type == "favorites":
#         pass
#     elif type == "previously":
#         pass
#     elif type == "next":
#         pass
#     pass


# @router.post("/api/books/{work_id}/{type}/")
# def add_book_to_list(
#     type: str,
#     user_data: Optional[dict] = Depends(authenticator.try_get_current_account_data)
# ):
#     if not user_data:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Not signed in",
#         )
#     elif type == "favorites":
#         pass
#     elif type == "previously":
#         pass
#     elif type == "next":
#         pass
#     pass


@router.post("/api/books/", response_model=BookOut)
def track_book(
    books: BooksQueries,
    info: BookIn
):
    try:
        book = books.new_book(info)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot track this book",
        )
    return book


@router.get("/api/books/", response_model=BookOut)
def get_all_tracked_book(
    books: BooksQueries
):
    return books.get_books()


@router.get("/api/books/{work_id}/", response_model=BookOut)
def get_tracked_book(
    books: BooksQueries,
    work_id: str
):
    return books.get_book(work_id)
