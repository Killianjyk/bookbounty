from pymongo import MongoClient
from bson.objectid import ObjectId
import os

MONGO_USER = os.environ.get("MONGO_USER", "username")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "password")
MONGO_HOST = os.environ.get("MONGO_HOST", "mongo")
MONGO_DB = os.environ.get("MONGO_DB", "book-bounty-db")

client = MongoClient(f'mongodb://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_HOST}')
db = client[MONGO_DB]

class MongoQueries:
    @property
    def collection(self):
        return db[self.collection_name]
