
LOG IN
path name:      /api/users/
Method:         POST
Request Shape:  form
        username: string
        password: string
Response:       Just account info and token
Response Shape: (JSON)
        {
            "account": {
                <<key>>:<<type>>
            },
            "token": string
        }

LOG OUT
path name:      /api/users/
Method:         DELETE
Headers:
        Authorization: Bearer Token
Response:       Always True
Response Shape: (JSON)
        {
            "message": "logout successful"
        }

SIGN UP / CREATE USER
path name:      /api/users/signup/
Method:         POST
Request Shape:  form
        username: string
        password: string
Response:       Just account info and token
Response Shape: (JSON)
        {
            "account": {
                <<key>>:<<type>>
            },
            "token": string
        }

LIST USERS
path name:      /api/users/
Method:         GET
Headers:
        Authorization: Bearer token
Response:       Return a list of users with links to their lists
Response Shape: (JSON)
        {
            "users":{
                <<user's name>>:{
                    <<favorites>>:<<favorites page>>,
                    <<read previously>>:<<previous page>>,
                    <<read next>>:<<read next page>>
                },
                <<user's name>>:{
                    <<favorites>>:<<favorites page>>,
                    <<read previously>>:<<previous page>>,
                    <<read next>>:<<read next page>>
                },
            }
        }

LIST USERS FAVORITES/PREV/NEXT
path name:      /api/users/<str:user>/<str:type>/
Method:         GET
Headers:
        Authorization: Bearer token
Response:       Return a list of a users favorite/previously/next books
Response Shape: (JSON)
        {
            <<type>>:{
                <<book>>:<<book data>>,
                <<book>>:<<book data>>
            }
        }

ADD USER FAVORITE/PREV/NEXT
path name:      /api/users/<str:user>/<str:type>/
Method:         PUT
Headers:
        Authorization: Bearer token
Request:       Give a book to add to favorite/previously/next
Request Shape: (JSON)
        {
            <<book>>:<<book data>>
        }
Response:       Return the book added
Response Shape: (JSON)
        {
            <<book>>:<<book data>>
        }

LIST BOOKS
path name:      /api/books/<str:type>/
Method:         GET
Headers:
        Authorization: Bearer token
Response:       Get all books of a type
Response Shape: (JSON)
        {
            "books":{
                <<book>>:<<book data>>,
                <<book>>:<<book data>>
            }
        }

DETAIL BOOK
path name:      /api/books/details/
Method:         GET
Headers:
        Authorization: Bearer token
Request Shape:  JSON
Response:       All the data from one book for its details
Response Shape: (JSON)
        {
            <<book>>:<<book data>>
        }

BOOK DISCOVER
path name:      /api/books/discover/
Method:         POST 
Headers:
        Authorization: Bearer token
Request Shape:  JSON
        {
            "search": <<search data>>
        }
Response:       Get all books matching search
Response Shape: (JSON)
        {
            "search":{
                <<book>>:<<book data>>,
                <<book>>:<<book data>>
            }
        }
        
BOOK RANDOM
path name:      /api/books/random/
Method:         GET
Headers:
        Authorization: Bearer token
Response:       All the data from one book
Response Shape: (JSON)
        {
            <<book>>:<<book data>>
        }