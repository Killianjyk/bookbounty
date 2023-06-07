## 06/06/2023
    Goals:
        - Add styling to review list and cards
            - set up styling for phones and smaller screens as well
        - Edit tags for redux to be smarter for reloading purposes
    Notes:
        - Issues on gitlab need to be understood more clearly
    Worked on:
        - Review user interface
        - Removing all react warnings

## 06/05/2023
    Goals:
        - Finish up reviews reloading and UI ease
    Notes:
        - Tags in redux are extremely useful for knowing when to refetch data
        - Tags can be used with more specific parameters such as ID
    Worked on:
        - Reloading pages at the correct time
        - Review user interface

## 06/01/2023
    Goals:
        - Finish Reviews front end (except styling)
        - Set up reviews so that it can be edited in place
    Notes for myself:
        - Talk to instructors next week about code consistency and formatting
    Worked on:
        - Review user interface
    
## 06/01/2023
    Goals:
        - Finish unit tests for routers
        - Add button integration to book details
    Notes for myself:
        - Backend for reviews is finished
        - Tests for reviews is finished
    Worked on:
        - Backend tests
        - Reviews router
        - Reviews query

## 05/31/2023
    Goals:
        - Set up testing for books routers
            - understand testing
        - Finish integration of user buttons to front end
    Notes for myself:
        - Buttons added under a link are not clickable
            this needs to be fixed (probably with css)
        - Cannot have multiple slices in the same file with current slice formatting
    Worked on:
        - Tests
        - Slice management and readability 

## 05/31/2023
    Goals:
        - Split API slices into manageable chunks 
    Notes for myself:
        - slices need to be registered with the store
        - each slice needs its own middleware and exported data
    Worked on:
        - Slice management and readability 
        
## 05/26/2023
    Goals:
        - Add sign up capabilities to the front end
    Notes for myself:
        - FormData does not work for sign up
    Worked on:
        - Sign up front end form

## 05/17/2023
    Goals:
        - Set up paths for books lists
    Notes for myself:
        - A path can have dependencies on more than one query
    Worked on:
        - Paths for books in books router
        
## 05/16/2023
    Goals:
        - Finish user queries
        - Set up paths for books lists
    Notes for myself:
        - Routers can pass to multiple queries
    Worked on:
        - Paths for books in books router

## 05/15/2023
    Goals:
        - set up the project
            -set up issues
            -set up dockerfiles
        - understand backend auth
    Notes for myself:
        - routers file is for getting data to the front end
        - queries is getting data from the database
    Worked on:
        - Issues creation
        - Dockerfile
        - Routers for books
        - Queries for books