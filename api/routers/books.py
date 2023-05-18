from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from models.books import BookIn, BookOut, BookList
from queries.books import BooksQueries

router = APIRouter()

@router.post("/api/books/", response_model=BookOut)
def track_book(
    info: BookIn,
    books: BooksQueries = Depends()
):
    try:
        book = books.new_book(info)
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot track this book",
        )
    return book


@router.get("/api/books/", response_model=BookList)
def get_all_tracked_books(
    books: BooksQueries = Depends()
):
    return { "books": books.get_books() }


@router.get("/api/books/{work_id}/", response_model=BookOut)
def get_tracked_book(
    work_id: str,
    books: BooksQueries = Depends()
):
    return books.get_book(work_id)
