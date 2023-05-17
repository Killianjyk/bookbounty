from .client import MongoQueries
from models.favorites import FavoriteIn


class FavoritesQueries(MongoQueries):
    collection_name = "favorites"

    def new_favorite(self, favorite_in: FavoriteIn, user_id: str):
        favorite = favorite_in.dict()
        favorite["user_id"] = user_id
        search_for = self.collection.find_one({ "user_id": user_id, "book_id": favorite_in.book_id })
        if search_for:
            return search_for
        added_favorite = self.collection.insert_one(favorite)
        if added_favorite.inserted_id:
            favorite["id"] = str(added_favorite.inserted_id)
            return favorite
        
    def user_favorites(self, user_id: str):
        favorites = []
        for favorite in self.collection.find({ "user_id": user_id }):
            favorites.append(favorite["book_work_id"])
        return favorites

    def get_favorites(self):
        favorites = []
        for favorite in self.collection.find():
            favorites.append(favorite)
        return favorites