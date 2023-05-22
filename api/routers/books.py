from fastapi import APIRouter, Depends, HTTPException, status
from models.authenticator import authenticator
from models.books import BookIn, BookOut, BookList, BookDetailsList
from queries.books import BooksQueries
from queries.api import OpenLibraryQueries

router = APIRouter()

@router.get(path="/api/books/{type}/")
def get_books_of_type():
    pass
