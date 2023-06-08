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

# Deployment 

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Initialize CapRover

1. Attain IP address and domain from an instructor
1. Follow the steps in the CD Cookbook in Learn.

### Update GitLab CI/CD variables

Copy the service URL for your CapRover service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.
