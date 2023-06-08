from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, books, favorites, next, previous, reviews
from models.authenticator import authenticator

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return 204


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


app.include_router(users.router, tags=["Users"])
app.include_router(authenticator.router, tags=["Log in/out"])
app.include_router(books.router, tags=["Books"])
app.include_router(favorites.router, tags=["Favorites"])
app.include_router(next.router, tags=["Read Next"])
app.include_router(previous.router, tags=["Read Previously"])
app.include_router(reviews.router, tags=["Reviews"])
