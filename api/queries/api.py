import requests
import json


class OpenLibraryQueries():
    api_url = "https://openlibrary.org"
    search = "/search.json?q="
    detail = ".json"

    def get_image(self, image_id):
        return f'https://covers.openlibrary.org/b/id/{image_id}-L.jpg'

    def get_author(self, author_id: str):
        response = requests.get(self.api_url + author_id + ".json").json()
        return response["name"]

    def search_api(self, string: str):
        string = string.replace(" ", "+")
        string = string.replace("%", "+")
        response = requests.get(self.api_url + self.search + string + "&limit=10").json()
        keys = []
        for i in range(0, 10):
            keys.append(response["docs"][i]["key"])
        return keys

    def get_book_details(self, book_id: str):
        book_id = book_id.replace("works", "books")
        response = requests.get(self.api_url + book_id + self.detail).json()
        print(response.keys())
        book = { "work_id": book_id }
        try:
            book["title"] = response["title"]
        except:
            book["title"] = "NO TITLE PROVIDED"
        try:
            book["description"] = response["description"]
        except:
            book["description"] = "NO DESCRIPTION PROVIDED"
        try:
            book["author"] = self.get_author(response["authors"][0]["author"]["key"])
        except:
            book["author"] = "NO AUTHOR PROVIDED"
        try:
            book["image"] = self.get_image(response["covers"][0])
        except:
            book["image"] = "NO COVER PROVIDED"
        return book
