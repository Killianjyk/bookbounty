from .client import MongoQueries
from models.usersbookslists import UsersBooksIn


class NextQueries(MongoQueries):
    collection_name = "up_next"

    def new_next(self, next_in: UsersBooksIn, user_id: str, book_id: str):
        next = next_in.dict()
        next["user_id"] = user_id
        next["book_id"] = book_id
        search_for = self.collection.find_one(
            { "user_id": user_id, "work_id": next_in.work_id }
        )
        if search_for:
            return search_for
        added_next = self.collection.insert_one(next)
        if added_next.inserted_id:
            next["id"] = str(added_next.inserted_id)
            return next

    def user_up_next(self, user_id: str):
        up_next = []
        for next in self.collection.find({ "user_id": user_id }):
            up_next.append(next["work_id"])
        return up_next

    def get_up_next(self):
        up_next = []
        for next in self.collection.find():
            up_next.append(next)
        return up_next

    def remove_next(self, work_id: str, user_id: str):
        result = self.collection.delete_one(
            {"user_id": user_id, "work_id": work_id}
        )
        return result.deleted_count > 0
