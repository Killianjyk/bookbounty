from pydantic import BaseModel
from typing import List


class Review(BaseModel):
    stars: int
    text: str
    work_id: str


class ReviewOut(Review):
    id: str
    username: str


class ReviewList(BaseModel):
    reviews: List[ReviewOut]
