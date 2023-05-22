from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from models.books import BookIn, BookOut, BookList, BookDetailsList
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries

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


@router.get("/api/books/discover/{search_bar}/", response_model=BookDetailsList)
def search_books(
    search_bar: str,
    api_books: OpenLibraryQueries = Depends()
):
    print(search_bar)
    print("started search")
    matching_books = api_books.search_api(search_bar)
    print("found results")
    print(matching_books)
    matching_details = []
    for book in matching_books:
        matching_details.append(api_books.get_book_details(book))
    return { "books": matching_details }


@router.get("/api/books/random/")
def random_book():
    pass
