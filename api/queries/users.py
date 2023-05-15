from models.users import UserIn, UserOut, UserOutPassword
from pymongo.errors import DuplicateKeyError
from .queries import MongoQueries

class DuplicateUserError(ValueError):
    pass

class UserQueries(MongoQueries):
    collection_name = "users"

    def signup(self, user_in: UserIn, hashed_password: str):
        props = user_in.dict()
        props["password"] = hashed_password
        for user in self.collection.find():
            if user["username"] == props["username"] or user["email"] == props["email"]:
                raise DuplicateUserError()
        props["id"] = str(props["_id"])
        return UserOutPassword(**props)
    
    def get(self, username: str):
        props = self.collection.find_one({"username": username}) or self.collection.find_one({"email": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return UserOutPassword(**props)
    
    def get_user(self, username: str):
        props = self.collection.find_one({"username": username}) or self.collection.find_one({"email": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return UserOut(**props).dict()

    def get_all(self):
        users = []
        for user in self.collection.find():
            user["id"] = str(user["_id"])
            users.append(user)
        return users
    
    def login(self):
        pass
    
    def logout(self):
        pass