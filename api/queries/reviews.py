from .client import MongoQueries
from models.reviews import Review


class ReviewsQueries(MongoQueries):
    collection_name = "reviews"

    def get_review(self, work_id: str, user_id: str):
        review = self.collection.find_one({"work_id": work_id, "user_id": user_id})
        review["id"] = str(review["_id"])
        return review

    def get_reviews(self):
        reviews = self.collection.find()
        review_list = []
        for review in reviews:
            review["id"] = str(review["_id"])
            review_list.append(review)
        return review_list
    
    def get_book_reviews(self, work_id: str):
        reviews = self.collection.find({"work_id": work_id})
        review_list = []
        for review in reviews:
            review["id"] = str(review["_id"])
            review_list.append(review)
        return review_list
    
    def new_review(self, review_in: Review, user_id: str):
        review = review_in.dict()
        review["user_id"] = user_id
        find_repeat = self.collection.find_one({"work_id": review_in.work_id, "user_id": user_id})
        if find_repeat:
            find_repeat["id"] = str(find_repeat["_id"])
            return find_repeat
        added_review = self.collection.insert_one(review)
        if added_review.inserted_id:
            review["id"] = str(added_review.inserted_id)
            return review

    def update_review(self, review: Review, user_id: str):
        self.collection.update_one({"user_id": user_id, "work_id": review.work_id}, {"$set": review.dict()})
    
    def get_user_reviews(self, user_id: str):
        reviews = self.collection.find({"user_id": user_id})
        review_list = []
        for review in reviews:
            review["id"] = str(review["_id"])
            review_list.append(review)
        return review_list

    def delete_review(self, work_id: str, user_id: str):
        result = self.collection.delete_one({"work_id": work_id, "user_id": user_id})
        return result.deleted_count > 0
