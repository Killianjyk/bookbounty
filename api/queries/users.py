from models.users import UserIn, UserOut, UserOutPassword
from pymongo.errors import DuplicateKeyError
from .client import MongoQueries
from .books import BooksQueries

class DuplicateUserError(ValueError):
    pass

class UserQueries(MongoQueries):
    collection_name = "users"

    def signup(self, user_in: UserIn, hashed_password: str):
        user = user_in.dict()
        user["password"] = hashed_password
        if self.get_user(user["username"]) or self.get_user(user["email"]):
            raise DuplicateUserError

        user_data = user
        user_data["book_list"] = BooksQueries.new_book_lists()
        response = self.collection.insert_one(user_data)

        if response.inserted_id:
            user["id"] = str(response.inserted_id)

        return UserOutPassword(**user)

    def get(self, username: str):
        user = self.collection.find_one({"username": username}) or self.collection.find_one({"email": username})
        if not user:
            return None
        user["id"] = str(user["_id"])
        return UserOutPassword(**user)

    def get_user(self, username: str):
        user = self.collection.find_one({"username": username}) or self.collection.find_one({"email": username})
        if not user:
            return None
        user["id"] = str(user["_id"])
        return UserOut(**user).dict()

    def get_all(self):
        users = []
        for user in self.collection.find():
            user["id"] = str(user["_id"])
            users.append(user)
        return users
