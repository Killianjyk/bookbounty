from models.users import UserIn, UserOut, UserOutPassword
from .client import MongoQueries
from bson.objectid import ObjectId


class DuplicateUserError(ValueError):
    pass


class UserQueries(MongoQueries):
    collection_name = "users"

    def signup(self, user_in: UserIn, hashed_password: str):
        user = user_in.dict()
        user["password"] = hashed_password
        if self.get_user({"username": user["username"]}):
            raise DuplicateUserError
        response = self.collection.insert_one(user)
        if response.inserted_id:
            user["id"] = str(response.inserted_id)
        return UserOutPassword(**user)

    def get_by_id(self, user_id: str):
        user = self.collection.find_one({"_id": ObjectId(user_id)})
        return user["username"]

    def get(self, username: str):
        user = self.collection.find_one(
            {"username": username}
        ) or self.collection.find_one({"email": username})
        if not user:
            return None
        user["id"] = str(user["_id"])
        return UserOutPassword(**user)

    def get_user(self, username: str):
        user = self.collection.find_one(
            {"username": username}
        ) or self.collection.find_one({"email": username})
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

    def get_searched(self, username):
        users = []
        for user in self.collection.find(
            {"username": {"$regex": username, "$options": "i"}}
        ).limit(10):
            user["id"] = str(user["_id"])
            users.append(user)
        return users

    def update_user(self, username: str, userinfo):
        self.collection.update_one({"username": username}, userinfo)
