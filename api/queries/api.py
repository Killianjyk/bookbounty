import requests
from typing import Optional


def search_books_by_title(
        title: str,
):
    url = 'https://openlibrary.org/search.json'
    params = {'title': title}
    response = requests.get(url, params=params)
    return response.json()

http://localhost:8000/books?title=python
