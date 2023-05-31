from fastapi import APIRouter, Depends, HTTPException, status
from models.books import (
    BookIn,
    BookOut,
    BookDataList,
    BookDetailsList,
    BookDetailOut,
)
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries, RandomWordQuery

router = APIRouter()


@router.post("/api/books/", response_model=BookOut)
def track_book(info: BookIn, books: BooksQueries = Depends()):
    try:
        book = books.new_book(info)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot track this book",
        )
    return book


@router.get("/api/books/", response_model=BookDataList)
def get_top_favorited_books(books: BooksQueries = Depends()):
    return {"books": books.get_books()}


@router.get("/api/books/{work_id}/", response_model=BookDetailOut)
def get_book(work_id: str, api_books: OpenLibraryQueries = Depends()):
    return api_books.get_book_details("/books/" + work_id)


@router.get("/api/books/discover/random/", response_model=BookDetailOut)
def random_book(
    random_word: RandomWordQuery = Depends(),
    api_books: OpenLibraryQueries = Depends(),
):
    books = []
    while len(books) == 0:
        word = random_word.get_random_word()
        books = api_books.search_api(word[0])
    return api_books.get_book_details(books[0])


@router.get(
    "/api/books/discover/{search_bar}/",
    response_model=BookDetailsList,
)
def search_books(search_bar: str, api_books: OpenLibraryQueries = Depends()):
    matching_books = api_books.search_api(search_bar)
    matching_details = []
    for book in matching_books:
        matching_details.append(api_books.get_book_details(book))
    return {"books": matching_details}
