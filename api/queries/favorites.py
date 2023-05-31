from .client import MongoQueries
from models.usersbookslists import UsersBooksIn


class FavoritesQueries(MongoQueries):
    collection_name = "favorites"

    def new_favorite(
        self,
        favorite_in: UsersBooksIn,
        user_id: str,
        book_id: str,
    ):
        favorite = favorite_in.dict()
        favorite["user_id"] = user_id
        favorite["book_id"] = book_id
        search_for = self.collection.find_one(
            {"user_id": user_id, "work_id": favorite_in.work_id}
        )
        if search_for:
            return search_for
        added_favorite = self.collection.insert_one(favorite)
        if added_favorite.inserted_id:
            favorite["id"] = str(added_favorite.inserted_id)
            return favorite

    def user_favorites(self, user_id: str):
        favorites = []
        for favorite in self.collection.find({"user_id": user_id}):
            favorites.append(favorite["work_id"])
        return favorites

    def get_favorites(self):
        favorites = []
        for favorite in self.collection.find():
            favorites.append(favorite)
        return favorites

    def is_favorited(self, work_id: str, user_id: str):
        book = self.collection.find_one(
            {
                "user_id": user_id,
                "work_id": work_id,
            }
        )
        return bool(book)

    def remove_favorite(self, work_id: str, user_id: str):
        result = self.collection.delete_one(
            {
                "user_id": user_id,
                "work_id": work_id,
            }
        )
        return result.deleted_count > 0
