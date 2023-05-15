from fastapi import APIRouter

router = APIRouter()

@router.get(path="/api/books/{type}/")
def get_books_of_type():
    pass