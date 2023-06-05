import requests


class OpenLibraryQueries:
    api_url = "https://openlibrary.org"
    search = "/search.json?q="
    detail = ".json"

    def get_image(self, image_id):
        return f"https://covers.openlibrary.org/b/id/{image_id}-L.jpg"

    def get_author(self, author_id: str):
        response = requests.get(self.api_url + author_id + ".json").json()
        return response["name"]

    def search_api(self, string: str):
        string = string.replace(" ", "+")
        string = string.replace("%", "+")
        response = requests.get(
            self.api_url + self.search + string + "&limit=10"
        ).json()
        keys = []
        for i in range(0, len(response["docs"])):
            keys.append(response["docs"][i]["key"])
        return keys

    def get_book_details(self, work_id: str):
        work_id = work_id.replace("works", "books")
        response = requests.get(self.api_url + work_id + self.detail).json()

        work_id = work_id.replace("works", "books")
        book = {"work_id": work_id}
        try:
            book["title"] = response["title"]
        except Exception:
            book["title"] = "NO TITLE PROVIDED"
        try:
            book["description"] = response["description"]["value"]
        except Exception:
            try:
                book["description"] = response["description"]
            except Exception:
                try:
                    book["description"] = requests.get(
                        self.api_url
                        + work_id.replace("books", "works")
                        + "/editions"
                        + self.detail
                    ).json()["description"]["value"]
                except Exception:
                    book["description"] = "NO DESCRIPTION PROVIDED"
        try:
            author = response["authors"][0]["author"]["key"]
            book["author"] = self.get_author(author)
        except Exception:
            book["author"] = "NO AUTHOR PROVIDED"
        try:
            book["image"] = self.get_image(response["covers"][0])
        except Exception:
            book["image"] = "NO COVER PROVIDED"
        try:
            book["publish_date"] = requests.get(
                self.api_url
                + work_id.replace("books", "works")
                + "/editions"
                + self.detail
            ).json()["entries"][0]["publish_date"]
        except Exception:
            book["publish_date"] = "NO PUBLISH DATE PROVIDED"
        return book


class RandomWordQuery:
    url = "https://random-word-api.vercel.app/api?words=100"

    def get_random_word(self):
        response = requests.get(self.url).json()
        return response
