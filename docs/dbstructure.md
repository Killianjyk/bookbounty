# Data Structuring

Original Concept of data management can be found in docs/BooksProjectV1.excalidraw

## Books
|name   |type  |unique|optional|
|-------|------|------|--------|
|title  |string|no    |no      |
|author |string|no    |no      |
|image  |string|no    |no      |
|work_id|string|yes   |no      |

The books held in the database are books that a user has interacted with. 
For each book, the title, author, image, and work_id are remembered.
The work ID is Open Library's identifier for books.
## Favorites/Previous/Next
|name   |type  |unique|optional|
|-------|------|------|--------|
|user_id|string|yes   |no      |
|book_id|string|yes   |no      |
|work_id|string|yes   |no      |

The Favorites/Next/Previous databases hold the ID of the user that favorited a book, the ID of the book favorited, and the work ID of the book favorited.
The ID of the user is the ID of the user's data.
The ID of the book is the ID of the book's data.
The work ID is Open Library's identifier for books.
## Reviews
|name   |type  |unique|optional|
|-------|------|------|--------|
|user_id|string|yes   |no      |
|work_id|string|yes   |no      |
|stars  |int   |no    |no      |
|text   |string|no    |no      |

The Reviews tables hold the ID of the user who wrote it, the work ID of the book given a review, the comment given with the review, and the rating given with the review.
## Users
|name     |type  |unique|optional|
|---------|------|------|--------|
|username |string|yes   |no      |
|email    |string|no    |no      |
|full_name|string|no    |no      |
|password |string|no    |no      |

The Users table holds the username, email, full name, and encoded passwords for each user.
