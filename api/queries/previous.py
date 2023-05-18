from .client import MongoQueries
from models.usersbookslists import UsersBooksIn


class PreviousQueries(MongoQueries):
    collection_name = "previous"

    def new_previous(self, previous_in: UsersBooksIn, user_id: str):
        previous = previous_in.dict()
        previous["user_id"] = user_id
        search_for = self.collection.find_one({ "user_id": user_id, "book_id": previous_in.book_id })
        if search_for:
            return search_for
        added_previous = self.collection.insert_one(previous)
        if added_previous.inserted_id:
            previous["id"] = str(added_previous.inserted_id)
            return previous
        
    def user_previous(self, user_id: str):
        previous_list = []
        for previous in self.collection.find({ "user_id": user_id }):
            previous_list.append(previous["book_work_id"])
        return previous_list

    def get_previous(self):
        previous_list = []
        for previous in self.collection.find():
            previous_list.append(previous)
        return previous_list