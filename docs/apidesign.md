# Back End Design

## Books

  - **Method**: `GET`, `POST`
  - **Paths**: `/api/books/`, `/api/books/<str:work_id>/`, `/api/books/discover/<str:search_bar>/`
Input: 
```
{
    "work_id": string,
    "author": string,
    "title": string,
}
```
Output: 
```
{
    "id": string,
    "work_id": string,
    "author": string,
    "title": string,
    "image": string,
}
```
**or**
```
{
  books: [
    {
      "id": string,
      "work_id": string,
      "author": string,
      "title": string,
      "image": string,
    }
  ]
}
```
## Favorites/Previous/Next
  - **Method**: `GET`, `POST`, `DELETE`
  - **Paths**: `/api/<str:type>/`, `/api/<str:type>/<str:username>/`, `/api/<str:type>/<str:username>/<str:work_id>/`
Input: 
```
{
    "work_id": string,
}
```
Output: 
```
{
    "id": string,
    "user_id": string,
    "book_id": string,
    "work_id": string,
}
```
## Reviews
    -Methods: `GET`, `POST`, `PUT`, `DELETE`
    -Paths: `/api/reviews/`, `/api/reviews/<str:work_id>/`
Input: 
```
{
  "stars": int,
  "text": "string",
  "work_id": "string",
}
```
Output: 
```
{
  "stars": int,
  "text": "string",
  "work_id": "string",
  "id": "string",
  "username": "string"
}
```
## Users
  - **Method**: `GET`, `POST`, `PUT`, `DELETE`
  - **Paths**: `/api/users/`, `/api/reviews/<str:searched_username>/`, `/token`
Input: 
```
{
  "email": "string",
  "username": "string",
  "password": "string",
  "full_name": "string"
}
```
Output: 
```
{
  "access_token": "string",
  "token_type": "Bearer",
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "full_name": "string"
  }
}
```
**or**
```
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "username": "string",
      "full_name": "string"
    }
  ]
}
```
**or**
```
{
  "access_token": "string",
  "token_type": "Bearer"
}
```