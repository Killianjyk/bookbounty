from fastapi import APIRouter

router = APIRouter()

@router.get("/api/books/{type}/")
def get_books_of_type():
    pass