from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, books, favorites
from models.authenticator import authenticator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }

app.include_router(users.router, tags=["Users"])
app.include_router(authenticator.router, tags=["Log in/out"])
app.include_router(books.router, tags=["Books"])
app.include_router(favorites.router, tags=["Favorites"])
