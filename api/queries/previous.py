from .client import MongoQueries
from models.usersbookslists import UsersBooksIn


class PreviousQueries(MongoQueries):
    collection_name = "previous"

    def new_previous(self, previous_in: UsersBooksIn, user_id: str, book_id: str):
        previous = previous_in.dict()
        previous["user_id"] = user_id
        previous["book_id"] = book_id
        search_for = self.collection.find_one(
            { "user_id": user_id, "work_id": previous_in.work_id }
        )
        if search_for:
            return search_for
        added_previous = self.collection.insert_one(previous)
        if added_previous.inserted_id:
            previous["id"] = str(added_previous.inserted_id)
            return previous

    def user_previous(self, user_id: str):
        previous_list = []
        for previous in self.collection.find({ "user_id": user_id }):
            previous_list.append(previous["work_id"])
        return previous_list

    def get_previous(self):
        previous_list = []
        for previous in self.collection.find():
            previous_list.append(previous)
        return previous_list

    def remove_previous(self, work_id: str, user_id: str):
        result = self.collection.delete_one(
            {"user_id": user_id, "work_id": work_id}
        )
        return result.deleted_count > 0
