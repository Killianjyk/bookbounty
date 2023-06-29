# Module3 Project Gamma

# Original Creators
  - Nicholas Fry
  - Rew Wolf
  - Killian Kim
  - Nicolas Murphy

# Specifics

 - [API Design](docs/apidesign.md)
 - [Data Structure](docs/dbstructure.md)
 - [GHI Concept](docs/ghiconcept.md)
 - [Integrations](docs/integrations.md)

## Intended Market

The targeted market is that of people who like books, book reviewers, and as a book focused social media platform.

## Functionality

- Any visitor can...
  - See a users favorited books
  - Search books
  - Search users
  - View books and their reviews
  - View the website's top ten books that are most favorited by users
- Any user can do anything a visitor can but can also...
  - Keep track of books that have been previously read
  - Keep track of books they would like to read next
  - Keep track of their favorite books
  - Leave reviews on books
  - Update their profile
  - Share their tracked books with other visitors and users

## Project Initialization

To add this application on a local machine follow these steps, after having docker-desktop installed on the local machine.

1. Clone the repository from gitlab to local machine
2. Navigate into the top level of the project directory 
  - Name: module3-project-gamma
3. Run docker volume create mongo-data
4. Run docker-compose build
5. Run docker-compose up
6. Navigate to http://localhost:3000 to view the website
