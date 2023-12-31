from models.usersbookslists import UsersBooksIn
from models.books import BookOut, BookInData
from models.reviews import Review


def fake_get_current_account_data():
    return {
        "id": "user id",
        "username": "username",
        "email": "email",
        "full_name": "full name",
    }


class FakeUserQueries:
    email = "email"
    name = "full name"

    def get(self, username: str):
        return {
            "id": "user id",
            "username": username,
            "email": self.email,
            "full_name": self.name,
        }

    def get_user(self, username: str):
        return {
            "id": "user id",
            "username": username,
            "email": self.email,
            "full_name": self.name,
        }

    def get_by_id(self, user_id: str):
        return "username"

    def get_all(self):
        return [
            {
                "id": "user id",
                "username": "username",
                "email": self.email,
                "full_name": self.name,
            }
        ]

    def get_searched(self, username: str):
        return [
            {
                "id": "user id",
                "username": username,
                "email": self.email,
                "full_name": self.name,
            }
        ]

    def update_user(self, username: str, userinfo):
        self.email = userinfo["$set"]["email"]
        self.name = userinfo["$set"]["full_name"]
        return


class FakeBooksQueries:
    def get_book(self, work_id: str):
        return BookOut(
            **{
                "work_id": work_id,
                "id": "12345",
                "title": "title working",
                "author": "author working",
                "image": "image working",
            }
        )

    def new_book(self, book_data: BookInData):
        book = book_data.dict()
        book["id"] = "12345"
        return BookOut(**book)

    def get_books(self):
        return []

    def decrement_favorites(self, work_id: str):
        return

    def increment_favorites(self, work_id: str):
        return


class FakeOpenLibraryQueries:
    def get_book_image(self, work_id: str):
        return "image working"

    def get_book_details(self, work_id: str):
        return {
            "work_id": work_id,
            "title": "title working",
            "author": "author working",
            "description": "description working",
            "image": "image working",
            "publish_date": "publish date working",
        }

    def search_api(self, string: str):
        return [
            "/books/12345",
            "/books/12346",
            "/books/12347",
            "/books/12348",
            "/books/12349",
            "/books/12350",
            "/books/12351",
            "/books/12352",
            "/books/12353",
            "/books/12354",
        ]


class FakeRandomWordQuery:
    def get_random_word(self):
        return ["word"]


class FakeFavoritesQueries:
    def new_favorite(
        self,
        favorite_in: UsersBooksIn,
        user_id: str,
        book_id: str,
    ):
        favorite = favorite_in.dict()
        favorite["user_id"] = user_id
        favorite["book_id"] = book_id
        favorite["id"] = "fav id"
        return favorite

    def user_favorites(self, user_id: str):
        return ["/books/12345", "/books/12346"]

    def is_favorited(self, work_id: str, user_id: str):
        return True

    def remove_favorite(self, work_id: str, user_id: str):
        return True


class FakeNextQueries:
    def new_next(self, next_in: UsersBooksIn, user_id: str, book_id: str):
        next = next_in.dict()
        next["user_id"] = user_id
        next["book_id"] = book_id
        next["id"] = "nxt id"
        return next

    def user_up_next(self, user_id: str):
        return ["/books/12345", "/books/12346"]

    def is_queued(self, work_id: str, user_id: str):
        return True

    def remove_next(self, work_id: str, user_id: str):
        return True


class FakePreviousQueries:
    def new_previous(
        self,
        previous_in: UsersBooksIn,
        user_id: str,
        book_id: str,
    ):
        previous = previous_in.dict()
        previous["user_id"] = user_id
        previous["book_id"] = book_id
        previous["id"] = "prev id"
        return previous

    def user_previous(self, user_id: str):
        return ["/books/12345", "/books/12346"]

    def is_logged(self, work_id: str, user_id: str):
        return True

    def remove_previous(self, work_id: str, user_id: str):
        return True


class FakeReviewsQueries:
    review_text = "review text"
    stars = 5

    def get_review(self, work_id: str, user_id: str):
        return {
            "id": "review id",
            "user_id": user_id,
            "work_id": work_id,
            "stars": self.stars,
            "text": self.review_text,
        }

    def get_reviews(self):
        return [
            {
                "id": "review id",
                "user_id": "user id",
                "work_id": "/books/12345",
                "stars": self.stars,
                "text": self.review_text,
            }
        ]

    def get_book_reviews(self, work_id: str):
        return [
            {
                "id": "review id",
                "user_id": "user id",
                "work_id": work_id,
                "stars": self.stars,
                "text": self.review_text,
            }
        ]

    def new_review(self, review_in: Review, user_id: str):
        review = review_in.dict()
        review["id"] = "review id"
        review["user_id"] = user_id
        return review

    def update_review(self, review: Review, user_id: str):
        self.review_text = review.text
        self.stars = review.stars

    def get_user_reviews(self, user_id: str):
        return [
            {
                "id": "review id",
                "user_id": user_id,
                "work_id": "/books/12345",
                "stars": self.stars,
                "text": self.review_text,
            }
        ]

    def delete_review(self, work_id: str, user_id: str):
        return True
